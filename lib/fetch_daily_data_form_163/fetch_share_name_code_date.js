/**
 * fetch name, code, start & end date of stock
 *
 */
const superagent = require("superagent"),
    cheerio = require("cheerio"),
    mysql = require("mysql"),
    async = require("async"),
    fs = require("fs"),
    eventproxy = require("eventproxy");

var ep = new eventproxy();

require('superagent-charset')(superagent);

var pageAdr = "http://quote.eastmoney.com/stocklist.html#sh";
var shareCode = [];
var shareName = [];

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'AGR670A4',
    port: '3306',
    database : 'share_data'
});


function fetchShareNameAndCode() {

    superagent.get(pageAdr)
        .charset('gb2312') // new add sentence "require('superagent-charset')(superagent);"
        .end(function(err,pres){
            if(err) {
                console.log('fetch  ' + pageAdr + ' fail:' + err.message);
                return;
            }
            console.log('fetch  ' + pageAdr + '  successful');

            var $ = cheerio.load(pres.text);
            var shareData = $('a[target="_blank"]','#quotesearch');
            var shareText = [];

            var temp = [];
            for(var i=0; i<shareData.length; i++){
                shareText.push(shareData.eq(i).text());
            }

            for(i=0; i<shareText.length; i++){
                temp = shareText[i].match(/[^\(\)]+/g);
                if(temp !== null){
                    shareName.push(temp[0]);
                    shareCode.push(temp[1]);
                }
                else {
                    console.log("index: " + i + "  nothing is match");
                    return;
                }
            }

            console.log("share amount: " + shareCode.length);
            ep.emit("allCodeBeRead");
            // write in file stockName&code.txt
            var fileContent = '';
            for(i=0; i<shareText.length; i++){
                fileContent = fileContent + shareText[i] + '\r\n';
            }

            fs.writeFile(".//run_record/shareName&code.txt",fileContent, { 'flag': 'a'}, function (err){
                if(err) {
                    console.log('write shareName&code.txt error index:' + i);
                    throw err;
                }
            });
        });
}

function emptyFileContent(){
    fs.writeFile(".//run_record/shareName&code.txt",'' , { 'flag': 'w'}, function (err){
        if(err) {
            console.log('empty shareName&code.txt error index:' + i);
            throw err;
        }
    });

    fs.writeFile(".//run_record/fetchShareDateError.txt",'' , { 'flag': 'w'}, function (err){
        if(err) {
            console.log('empty fetchShareDateError.txt error index: ' + counts);
            throw err;
        }
    });

    fs.writeFile(".//run_record/shareName&Code&Date.txt", '', {'flag': 'w'}, function (err) {
        if (err) {
            console.log('empty shareName&Code&Date.txt error');
            throw err;
        }
    });
}

var pageAdrHead = "http://quotes.money.163.com/trade/lsjysj_";
var pageAdrTail = ".html#06f01";
var codeNoHistory = []; //record share when it's start date and end date is empty;
var codeAndDate = [];
var startDate = [];
var endDate = [];
var counts = 0;

function fetchShareDate() {
    codeAndDate.length = 0;
    ep.after("allDateBeRead", shareCode.length,writeMySQL);
    var reptileMove = function (code, callback){
        var address = pageAdrHead + code + pageAdrTail;
        //console.log(address);
        superagent.get(address)
            .end(function (err, ares){
                counts++;
                if (err){
                    console.log('index: ' + counts + ' fetch share: ' + code + ' date err: ' , err.message);
                    codeAndDate.push([shareName[getArrayIndex(shareCode,code)],code, null, null]);
                    startDate.push(null);
                    endDate.push(null);
                    ep.emit("allDateBeRead");
                    writeFile();
                    fs.writeFile(".//run_record/fetchShareDateError.txt",'index: ' + counts + ' fetch share: ' + code + ' date err: '+ err.message + '\r\n' , { 'flag': 'a'}, function (err){
                        if(err) {
                            console.log('write fetchShareDateError.txt error index: ' + counts);
                            throw err;
                        }
                    });
                    return;
                }

                console.log('index: ' + counts + ' fetch share: ' + code + ' date successful');
                if(ares){
                    var $ = cheerio.load(ares.text);
                    var start = $('input[name="date_start_type"][checked="checked"]').attr('value');
                    var end = $('input[name="date_end_type"][checked="checked"]').attr('value');
                } else {
                    codeAndDate.push([shareName[getArrayIndex(shareCode,code)],code, null, null]);
                    startDate.push(null);
                    endDate.push(null);
                    ep.emit("allDateBeRead");
                    writeFile();
                    return;
                }


                if(start){
                    if (start.match( /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/) === null){
                        codeNoHistory.push(code);
                        start = null;
                        startDate.push(null);
                    } else {
                        startDate.push(start);
                    }
                } else {
                    codeNoHistory.push(code);
                    start = null;
                    startDate.push(null);
                }

                if(end){
                    if (end.match( /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/) === null){
                        codeNoHistory.push(code);
                        end = null;
                        endDate.push(null);
                    } else {
                        endDate.push(end);
                    }
                } else{
                    codeNoHistory.push(code);
                    end = null;
                    endDate.push(null);
                }
                codeAndDate.push([shareName[getArrayIndex(shareCode,code)],code, start, end]);
                writeFile();
                ep.emit("allDateBeRead");
            });

        setTimeout(function() {
            callback(null,address +'Call back content');  //AsyncFunction() :callback(err, results...)
        }, 800);
    };

    async.mapLimit(shareCode,10,function(code, callback){
        reptileMove(code, callback);
    },function (err, result){
        if(err){
            console.log("mapLimit fetch share date fail: ", err.message);
        } else {
            console.log("mapLimit fetch share date successful");
        }
    });
}


function getArrayIndex(targetArray, content){//the targetArray element should be different, the first element index is 0
    if(targetArray.indexOf(content) !==-1 ){
        for(var i=0; i<targetArray.length; i++){
            if(targetArray[i] === content){
                return i;
            }
        }
    }
    return -1;
}

function writeFile() {
    fs.writeFile(".//run_record/shareName&Code&Date.txt", codeAndDate[codeAndDate.length-1] + '\r\n', {'flag': 'a'}, function (err) {
        if (err) {
            console.log('write shareName&Code&Date.txt error');
            throw err;
        }
    });
}


function readShareDateFile() {
    var resultFromFile = [];
    var counts = 0;
    var matchResult=[],name,code,start,end;

    codeAndDate.length = 0; //empty the array
    fs.readFile(".//run_record/shareName&Code&Date.txt", function (err, data) {
        if (err) {
            console.log('read shareName&code&Date.txt error');
            throw err;
        } else {
            var result = data.toString();
            resultFromFile = result.match(/[^\r\n]+/g);

            //console.log(resultFromFile[500]);
            for(var i=0; i<resultFromFile.length; i++) {
                if (resultFromFile[i]) {
                    matchResult = resultFromFile[i].match(/[^,]+/g);
                    //console.log(resultFromFile[i]);
                    //console.log(matchResult);
                    name = matchResult[0];
                    code = matchResult[1];
                    start = matchResult[2];
                    end = matchResult[3];

                    if(name && code  && start && end){
                        //console.log(code + "  " + start + " " + end);
                        if(start==='0'){
                            start = null;
                        }

                        if(end === '0') {
                            end = null;
                        }

                        codeAndDate.push([name, code, start, end]);
                    } else {
                        console.log("ERROR: index:" + i + " "  + name + "  " + code + "  " + start + " " + end);
                    }
                } else {
                    console.log("ERROR: index:" + i + " get data from file error: " + resultFromFile);
                }
                counts++;
            }

            if(counts===resultFromFile.length){
                ep.emit("finishReading");
            }
        }
    });
}


function writeMySQL() {
    var addSql;
    var addSqlParams;

    connection.connect();

    addSql = 'CREATE TABLE IF NOT EXISTS share_name_code_date(name VARCHAR(12), code VARCHAR(6) PRIMARY KEY,start_date CHAR(10), end_date CHAR(10))charset utf8 collate utf8_general_ci';

    connection.query(addSql,[0,0,0,0],function(err){
        if (err) {
            console.log('[CREATE ERROR] - ', err.message);
        }
    });

    for (var i = 0; i < codeAndDate.length; i++) {
        addSql = 'INSERT INTO share_name_code_date(name, code, start_date, end_date) VALUES(?,?,?,?)';
        addSqlParams = [codeAndDate[i][0],codeAndDate[i][1],codeAndDate[i][2],codeAndDate[i][3]];
        connection.query(addSql, addSqlParams, function (err) {
            if (err) {
                console.log("INSERT ERROR", err.message);
                //console.log('[INSERT ERROR] - code:' + codeAndDate[i][1], err.message);
            }else {
                //console.log('[INSERT] - index: ' + i);  i=codeAndDate, because only one movement happen not codeAndDate.length
                //console.log("INSERT DONE");
            }
        });
    }

    console.log("finished the insert  rows: " + codeAndDate.length);
    connection.end();
}


function start(){
    //option 1: fetch share_date from internet and write into file and mysql
    // emptyFileContent();
    // ep.after("allCodeBeRead", 1, fetchShareDate);
    // fetchShareNameAndCode();

    // //option2: fetch share_date form file and write to mysql
    ep.after("finishReading", 1, writeMySQL);
    readShareDateFile();
}



exports.start = start;

