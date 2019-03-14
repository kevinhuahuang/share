/**
 * fetch name, code, start & end date of stock
 * 页面上显示的数据与下载的数据并不一致，所以暂时放弃爬取页面上的数据  2018-01-27
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
    database : 'share_daily_163'
});

var currentDate = '2018-01-25';
var mySQLData =[];
var newShareCode = [];
var oneRowData = {
    date: 0,
    name: 0,
    code: 0,
    close: 0,
    high: 0,
    low: 0,
    open: 0,
    pre_close: 0,
    change_amount: 0,
    change_rate: 0,
    exchange_rate: 0,
    volume: 0,
    turnover: 0,
    total_value: 0,
    circulation_value: 0
};



function getStockNameAndCode() {
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
                    //shareName.push(temp[0]);
                    shareCode.push(temp[1]);
                }
                else {
                    console.log("index: " + i + "  nothing is match");
                    return;
                }
            }
            console.log(shareCode.length);
            ep.emit("AllShareCodeHaveBeRead");

        });
}

function emptyFileContent(){

    fs.writeFile(".//run_record/todayShareDataRecord.txt", '', {'flag': 'w'}, function (err) {
        if (err) {
            console.log('empty todayShareDataRecord.txt error');
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
    //ep.after("allDateBeRead", shareCode.length,writeMySQL);
    var reptileMove = function (code, callback){
        var address = pageAdrHead + code + pageAdrTail;
        superagent.get(address)
            .end(function (err, ares){
                counts++;
                if (err){
                    if(err.message !== "Not Found"){
                        console.log('index: ' + counts + ' fetch share: ' + code + ' date err: ' , err.message);
                        codeNoHistory.push(code);
                    }

                    fs.writeFile(".//run_record/fetchShareTodayDataError.txt",'index: ' + counts + ' fetch share: ' + code + ' date err: '+ err.message + '\r\n' , { 'flag': 'a'}, function (err){
                        if(err) {
                            console.log('write fetchShareTodayDataError.txt error index: ' + counts);
                            throw err;
                        }
                    });
                     return;
                }

                console.log('index: ' + counts + ' fetch share: ' + code + ' date successful');
                if(ares){
                    var $ = cheerio.load(ares.text);

                    //'2018-01-25' match(/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)
                    // //way  1
                    // oneRowData.date = $('table.table_bg001.border_box.limit_sale tr').eq(1).children().eq(0).text();

                    //way 2
                    //oneRowData.date = $('table.table_bg001.border_box.limit_sale tr:nth-child(1) td:nth-child(1)').text();

                    //way 3
                    var trArray = $('table.table_bg001.border_box.limit_sale tr');
                    var trArrayLength = trArray.length;
                    var tdArray = [];
                    //console.log(trArrayLength);
                    var data = trArray.eq(1).children().eq(0).text();

                    newShareCode.length = 0;
                    mySQLData.length = 0;
                    var singleSQLData = [];
                    for(var i=1; i<trArrayLength; i++){
                        tdArray = trArray.eq(i).children();
                        oneRowData.date = tdArray.eq(0).text();
                        if(oneRowData.date){
                            if(isRightDate(oneRowData.date)){
                                for(var t=0; t<11;t++){
                                    singleSQLData.push(tdArray.eq(t).text());
                                }
                                mySQLData.push(singleSQLData);
                                newShareCode.push(code)
                            } else {
                                break;
                            }
                        }
                    }

                    if(newShareCode.length>0){
                        //writeMySQL();
                        for(i=0; i<mySQLData.length;i++){
                            console.log(mySQLData.pop());
                        }
                    }
                }else {

                }


                ep.emit("allDateBeRead");
            });

        setTimeout(function() {
            callback(null,address +'Call back content');  //AsyncFunction() :callback(err, results...)
        }, 800);
    };

    async.mapLimit(shareCode,1,function(code, callback){
        reptileMove(code, callback);
    },function (err, result){
        if(err){
            console.log("mapLimit fetch share date fail: ", err.message);
        } else {
            console.log("mapLimit fetch share date successful");
        }
    });
}

function getCurrentDateFromMySQL(code){
    connection.connect();
    var sqlSentence = 'SELECT * FROM _' + code + " limit 1";

    console.log(sqlSentence);
    connection.query(sqlSentence,function(err,result){
        if (err) {
            console.log('[CREATE ERROR] - ', err.message);
        } else {
            if(result){
                currentDate = result[0].date;
                console.log(currentDate);
            }
        }

    });

    connection.end();
}

function createNewTable(code){
    connection.connect();
    var sqlSentence = "CREATE TABLE IF NOT EXISTS _" +  code
        + " (date CHAR(10), code VARCHAR(10), name VARCHAR(20), close FLOAT, high FLOAT, low FLOAT, open FLOAT,"
        + "pre_close FLOAT, change_amount FLOAT, change_rate FLOAT, exchange_rate FLOAT, "
        + "volume FLOAT, turnover FLOAT, total_value FLOAT, circulation_value FLOAT)charset utf8 collate utf8_general_ci;";

    connection.query(sqlSentence,function(err){
        if(err) {
            console.log("CREATE ERROR:", err.message);
            console.log(counts + " : "+ index + "name:" + code);
        }
    });

    connection.end();
}

function insertCurrentDateToMySQL(code){
    connection.connect();

    var sqlSentence = "INSERT INTO _" +  code
        + "  (date, code, name, close, high, low, open, pre_close, change_amount, change_rate,"
        + " exchange_rate, volume, turnover, total_value, circulation_value)"
        + " VALUES ?;";

    connection.query(sqlSentence,[oneRowData],function(err,  rows, fields){
        if (err){
            console.log("INSERT ERROR", err.message);
            console.log(counts + " : "+ index + "name:" + code);
        }
    });
}

function isRightDate(date){
    var dataT = date;
    if(dataT !== currentDate){
        if((parseInt(dataT.replace(/-/g,''))) > (parseInt(currentDate.replace(/-/g,'')))){
            return true;
        }
    }
    return false;
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


function start(){
    emptyFileContent();

    //option 1: fetch share_date from internet and write into file and mysql
    //ep.after("allCodeBeRead", 1, fetchShareDate);
    //fetchShareNameAndCode();

    shareCode = [600197,600198,600199];
    fetchShareDate();

    for(var i=0; i<5;i++){
        if(codeNoHistory.length>0){
            shareCode.length = 0;
            for(var t=0; t<codeNoHistory.length; t++){
                shareCode.push(codeNoHistory.pop());
            }
            fetchShareDate();
        }else{
            break;
        }
    }


    // //option2: fetch share_date form file and write to mysql
    // ep.after("finishReading", 1, writeMySQL);
    // readShareDateFile();
}



exports.start = start;

