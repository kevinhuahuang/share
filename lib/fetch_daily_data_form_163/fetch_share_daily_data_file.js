const http = require("http"),
    async = require("async"),
    fs = require("fs"),
    mysql = require("mysql"),
    path = require("path"),
    eventproxy = require("eventproxy");

var ep = new eventproxy();

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'AGR670A4',
    port: '3306',
    database : 'share_data'
});


var fileDir = ".//daily_data/",
    pageUrl,
    stockCode = [],
    startDate = [],
    endDate = [],
    codeAndDate = [];

function getCodeAndDate() {
    var sqlContent;
    var sqlResult;

    var code,startD,endD,startT,endT;

    connection.connect();
    sqlContent = "SELECT code, start_date, end_date FROM share_name_code_date WHERE start_date IS NOT NULL AND end_date IS NOT NULL";
    connection.query(sqlContent,function(err,result){
        if(err) {
            console.log("read mysql fail", err.message);
            return;
        }

        fs.writeFile(".//run_record/fetchDailyDataFileRecord.txt","files counts: "+ result.length + '\r\n' , { 'flag': 'a'}, function (err){
            if(err) {
                console.log('write fetchDailyDataFileRecord.txt error');
                throw err;
            }
        });

        for(var i=0; i<result.length; i++){
            if(result[i].code && (result[i].start_date.length===10) &&  (result[i].end_date.length===10)) {
                if(result[i].code >= 600000){
                    code = '0' + result[i].code;
                } else {
                    code = '1' + result[i].code;
                }
                startT = result[i].start_date.match(/.{10}/);
                endT = result[i].end_date.match(/.{10}/);
                startD = startT[0].replace(/-/g,'');
                endD = endT[0].replace(/-/g,'');
                codeAndDate.push([code, startD, endD]);
            } else {
                fs.writeFile(".//run_record/fetchDailyDataFileRecord.txt","ERROR: get mysql index: "+ i + " fail"+ '\r\n' , { 'flag': 'a'}, function (err){
                    if(err) {
                        console.log('write fetchDailyDataFileRecord error');
                        throw err;
                    }
                });
            }
        }
        //console.log(codeAndDate);
        ep.emit("getMysqlData");
    });

    connection.end();
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
            var fileName = code[0].slice(1) + path.basename(".csv");
            var callback = function(res) {
                var fileBuff = [];
                res.on('data', function (chunk) {
                    var buffer = new Buffer(chunk);
                    fileBuff.push(buffer);
                });
                res.on('end', function() {
                    var totalBuff = Buffer.concat(fileBuff);
                    fs.appendFile(fileDir + "/" + fileName, totalBuff, function(err){
                        if(err) {
                            console.log("ERROR: write code:  "+ code[0] + " file fail", err.message);
                            fs.writeFile(".//run_record/fetchDailyDataFileRecord.txt","ERROR: get file "+ code[0] + ".csv fail"+ err.message+ '\r\n' , { 'flag': 'a'}, function (err){
                                if(err) {
                                    console.log('write fetchDailyDataFileRecord error fail');
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
            fs.writeFile(".//run_record/fetchDailyDataFileRecord.txt","ERROR: request code: "+ code[0] + ".csv from net fail " +  err.message + '\r\n' , { 'flag': 'a'}, function (err){
                if(err) {
                    console.log('write fetchDailyDataFileRecord error');
                    throw err;
                }
            });
        });
        req.end();

        setTimeout(function() {
            callback();
        }, 10000);
    };

    async.mapLimit(codeAndDate,10,function(code, callback){
        reptileMove(code, callback);
    },function (err, result){

    });
}

function emptyRecordFile(){
    fs.writeFile(".//run_record/fetchDailyDataFileRecord.txt",'' , { 'flag': 'w'}, function (err){
        if(err) {
            console.log('empty fetchDailyDataFileRecord error');
            throw err;
        }
    });
}


function start() {
    emptyRecordFile();

    ep.after("getMysqlData", 1, fetchDailyData);
    getCodeAndDate();

}



exports.start = start;