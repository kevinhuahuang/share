const http = require("http"),
    async = require("async"),
    fs = require("fs"),
    mysql = require("mysql"),
    csv = require("fast-csv"),
    iconv = require('iconv-lite'),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    eventproxy = require("eventproxy");

var ep = new eventproxy();

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'AGR670A4',
    port: '3306',
    database : 'share_daily_163'
});

var pageAdr = "http://quote.eastmoney.com/stocklist.html#sh";

var pageUrl,
    shareCode = [],
    codeAndDate = [];


var startDate, endDate;

var index = 0;
var codeCounts = 0;

function getStockNameAndCode() {
    var code;
    var allCode;

    superagent.get(pageAdr)
        .charset('gb2312') // new add sentence "require('superagent-charset')(superagent);"
        .end(function(err,pres){

            if(err) {
                console.log(err);

            }
            console.log('fetch  ' + pageAdr + '  successful');

            var $ = cheerio.load(pres.text);
            var stockData = $('a[target="_blank"]','#quotesearch');
            var stockText = [];

            var temp = [];
            for(var i=0; i<stockData.length; i++){
                stockText.push(stockData.eq(i).text());
            }

            for(i=0; i<stockText.length; i++){
                temp = stockText[i].match(/[^\(\)]+/g);
                if(temp !== null){
                    shareCode.push(temp[1]);
                }
                else {
                    console.log("index: " + i + "  nothing is match");
                    return;
                }
            }

            function numAsc(a,b){
                return a - b;
            }

            shareCode.sort(numAsc);

            allCode = '';
            for(i=0; i<shareCode.length; i++){
                allCode = allCode + shareCode[i] + '\r\n';
                if(shareCode[i] >= 600000){
                    code = '0' + shareCode[i];
                } else {
                    code = '1' + shareCode[i];
                }
                codeAndDate.push([code, startDate, endDate]);
            }
            codeCounts = codeAndDate.length;

            fs.writeFile(".//run_record/fetchRangeDailyDataFileCode.txt", allCode , { 'flag': 'a'}, function (err){
                if(err) {
                    console.log('write fetchRangeDailyDataFileRecord error');
                    throw err;
                }
            });
            ep.emit("allShareCodeHaveBeRead");
        });
}


function fetchDailyData() {
    var reptileMove = function (code, callback){
        pageUrl = "http://quotes.money.163.com/service/chddata.html?code="
            + code[0]
            + "&start="
            + code[1]
            + "&end="
            + code[2]
            + "&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;TURNOVER;VOTURNOVER;VATURNOVER;TCAP;MCAP";

        //console.log(pageUrl);

        function getHttpReqCallback(code ) {
            var dataResult =[];
            var callback = function(res) {
                var fileBuff = [];
                res.on('data', function (chunk) {
                    var buffer = new Buffer(chunk);
                    fileBuff.push(buffer);
                });
                res.on('end', function() {
                     var totalBuff = Buffer.concat(fileBuff);
                    csv
                        .fromString(totalBuff.toString('binary'))
                        .on("data", function(data){
                            dataResult.push(data);
                        })
                        .on("end", function(counts){
                            if(dataResult.length>1){
                                dataResult.shift(); //remove the header of data
                                //console.log(dataResult);
                                getOneRowData(dataResult);
                            }else{
                                index++;
                                console.log('total:' + codeCounts + " index: "+ index + " code:" + code[0].slice(1) + " 无数据");
                                fs.writeFile(".//run_record/fetchRangeDailyDataFileRecord.txt", 'Empty data index:' + index + ' code:' + code[0].slice(1)  + '\r\n' , { 'flag': 'a'}, function (err){
                                    if(err) {
                                        console.log('write fetchRangeDailyDataFileRecord error');
                                        throw err;
                                    }
                                });
                            }
                        });
                });
            };
            return callback;
        }

        var req = http.request(pageUrl, getHttpReqCallback(code));
        req.on('error', function(err){
            console.log("ERROR: request code: "+ code[0] + " fail", err.message);
            fs.writeFile(".//run_record/fetchRangeDailyDataFileErrorRecord.txt","ERROR: request code: "+ code[0] + ".csv from net fail " +  err.message + '\r\n' , { 'flag': 'a'}, function (err){
                if(err) {
                    console.log('write fetchRangeDailyDataFileRecord error');
                    throw err;
                }
            });
        });
        req.end();

        setTimeout(function() {
            callback();
        }, 1000);
    };

    async.mapLimit(codeAndDate,10,function(code, callback){
        reptileMove(code, callback);
    },function (err, result){ //when finish thin function happen
        console.log('async mapLimit error');
    });
}

function getOneRowData(dataResult) {
    var wrongRow = [];
    var code = dataResult[0][1];

    for(var i=0; i<dataResult.length; i++) {
        if(dataResult[i][0].length<8){ //data type date
            //console.log(dataResult[i][0] + "index:" + i + "is not a date");
            wrongRow.push(i);
            continue;
        }

        dataResult[i][1] = dataResult[i][1].slice(1); //share code
        dataResult[i][2] = iconv.decode(dataResult[i][2], 'GBK'); //share name


        for(var t=3; t < dataResult[i].length; t++){ //share data
            if(isNaN(dataResult[i][t])) { //not a number
                wrongRow.push(i);
                break;
            }
        }
    }

    var length = wrongRow.length;  // operate pop will change Array length, so do not use Array length in the for clause
    for(i=0; i<length; i++){
        dataResult.splice(wrongRow.pop(),1); //此行数据有误，忽略该数据行
    }

    if(dataResult.length > 1){//如果该文件没有一行正确的数据，将不写入数据库
        dataResult.pop();  //remove the same date (thd data of the start date is exit)
        //console.log(dataResult);
        writeMySQLData(dataResult);
    } else {
        index++;
        console.log('total:' + codeCounts + " index: "+ index + " code:" + code.slice(1) + "  正确数据长度： 0");
        fs.writeFile(".//run_record/fetchRangeDailyDataFileRecord.txt", 'No right data index:' + index + ' code:' + code.slice(1) + '\r\n' , { 'flag': 'a'}, function (err){
            if(err) {
                console.log('write fetchRangeDailyDataFileRecord error');
                throw err;
            }
        });
    }
}


function writeMySQLData(data) {
    var sqlSentence;
    var isEnd = false;
    var record;
    var counts =0 ;
    counts = data.length;

    sqlSentence = "CREATE TABLE IF NOT EXISTS _" +  data[0][1]
        + " (date Date  primary key, code VARCHAR(10), name VARCHAR(20), close FLOAT, high FLOAT, low FLOAT, open FLOAT,"
        + "pre_close FLOAT, change_amount FLOAT, change_rate FLOAT, exchange_rate FLOAT, "
        + "volume FLOAT, turnover FLOAT, total_value FLOAT, circulation_value FLOAT)charset utf8 collate utf8_general_ci;";

    connection.query(sqlSentence,function(err){
        if(err) {
            console.log("CREATE ERROR:", err.message);
            console.log(counts + " : "+ index + "code:" + data[0][1]);
        }
    });

    sqlSentence = "INSERT INTO _" +  data[0][1]
        + "  (date, code, name, close, high, low, open, pre_close, change_amount, change_rate,"
        + " exchange_rate, volume, turnover, total_value, circulation_value)"
        + " VALUES ?;";

    connection.query(sqlSentence,[data],function(err,  rows, fields){
        if (err){
            console.log("INSERT ERROR code:" + data[0][1] + ' ', err.message);
            fs.writeFile(".//run_record/fetchRangeDailyDataFileErrorRecord.txt","ERROR: INSERT MYSQL code: "+ data[0][1] +  err.message + '\r\n' , { 'flag': 'a'}, function (err){
                if(err) {
                    console.log('write fetchRangeDailyDataFileRecord error');
                    throw err;
                }
            });
        }

        index++;
        record = 'total:' + codeCounts + " index: "+ index + " code:" + data[0][1] + "  数据长度： " + counts;
        console.log(record);
        fs.writeFile(".//run_record/fetchRangeDailyDataFileRecord.txt",record + '\r\n' , { 'flag': 'a'}, function (err){
            if(err) {
                console.log('write fetchRangeDailyDataFileRecord error');
                throw err;
            }
        });

        if(index === codeCounts) isEnd =true;
    });



    if(isEnd === true) {
        console.log('Done: ' + codeCounts + " : "+ index);
        connection.end();
    }
}




function emptyRecordFile(){
    fs.writeFile(".//run_record/fetchRangeDailyDataFileRecord.txt", '', { 'flag': 'w'}, function (err){
        if(err) {
            console.log('empty fetchRangeDailyDataFileRecord error');
            throw err;
        }
    });

    fs.writeFile(".//run_record/fetchRangeDailyDataFileErrorRecord.txt", '', { 'flag': 'w'}, function (err){
        if(err) {
            console.log('empty fetchRangeDailyDataFileRecord error');
            throw err;
        }
    });

    fs.writeFile(".//run_record/fetchRangeDailyDataFileCode.txt", '', { 'flag': 'w'}, function (err){
        if(err) {
            console.log('empty fetchRangeDailyDataFileRecord error');
            throw err;
        }
    });

}


function start() {
    emptyRecordFile();

    ep.after('getDate',2,startFetch);
    getStartDate();
    getEndDate();

}

function getEndDate(){
    var dateTemp = new Date();
    var year = dateTemp.getFullYear();
    var month = dateTemp.getMonth() + 1;
    var date  = dateTemp.getDate();

    if(month < 10){
        month = '0' + month;
    }

    if(date < 10){
        date = '0' + date;
    }

    endDate = year + '-' + month + '-' + date;
    ep.emit('getDate');
}



function startFetch(){
    if(!startDate.length | !endDate.length){
        return;
    }
    startDate = startDate.replace(/\-/g, '');
    endDate = endDate.replace(/[\-\/]/g, '');


    ep.after("allShareCodeHaveBeRead", 1, fetchDailyData);
    getStockNameAndCode();

}

function getStartDate(){
    var sqlSentence = "SELECT MAX(date) FROM _000001";  //important about 'Date'
    connection.query(sqlSentence,function(err, result){
        if (err){
            console.log("SELECT ERROR", err.message);
            startDate = '';
            return false;
        }

        var dateTemp = result[0]['MAX(date)'];
        var year = dateTemp.getFullYear();
        var month = dateTemp.getMonth() + 1;
        var date  = dateTemp.getDate();

        if(month < 10){
            month = '0' + month;
        }

        if(date < 10){
            date = '0' + date;
        }

        startDate = year + '-' + month + '-' + date;
        //console.log(startDate);
        ep.emit('getDate');
    });
}



exports.start = start;