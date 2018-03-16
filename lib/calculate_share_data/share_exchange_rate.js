const async = require("async"),
    fs = require("fs"),
    mysql = require("mysql"),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    eventproxy = require("eventproxy");

var ep = new eventproxy();

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'AGR670A4',
    port: '3306',
    database : 'share_max_min'
});


var connection163 = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'AGR670A4',
    port : '3306',
    database : 'share_daily_163'
});


var connectionData = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'AGR670A4',
    port : '3306',
    database : 'share_data'
});



var sqlSentence;
var rowDataArray = [];


function writeMySQLData(data) {

    sqlSentence = "CREATE TABLE IF NOT EXISTS share_exchange_rate_list"
        + " (code VARCHAR(10) PRIMARY KEY, name VARCHAR(20),"
        +   "weekRate FLOAT, monthRate FLOAT, seasonRate FLOAT, halfYearRate FLOAT,"
        +    "oneYearRate FLOAT, twoYearRate FLOAT, threeYearRate FLOAT, fourYearRate FLOAT, "
        +   "volume FLOAT, turnover FLOAT, total_value FLOAT, circulation_value FLOAT)charset utf8 collate utf8_general_ci";

    //console.log(sqlSentence);
    connection.query(sqlSentence,function(err){
        if(err) {
            console.log("CREATE ERROR:", err.message);
        }
    });

    sqlSentence = "INSERT INTO share_exchange_rate_list"
        + " (code, name,"
        +   "weekRate, monthRate, seasonRate, halfYearRate,"
        +    "oneYearRate, twoYearRate, threeYearRate, fourYearRate, volume, turnover, total_value, circulation_value)"
        +   " VALUES ?;";

    //console.log(sqlSentence);
    connection.query(sqlSentence,[data],function(err,  rows, fields){
        if (err){
            console.log("INSERT share_exchange_rate_list Error", err.message);
        }else {
            console.log('write mysql share_exchange_rate_list finished');
        }

    });

}


function getExchangeRate(shareCode, startDate, endDate, callback){
    sqlSentence = "SELECT AVG(exchange_rate) FROM _" + shareCode + " WHERE Date(date) BETWEEN " + "'" + startDate + "'" + " AND " + "'" + endDate + "'" ;

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT AVG(exchange_rate) YEAR ERROR" + shareCode, err.message);
            return 0;
        }

        //console.log(result);
        callback(null,result[0]['AVG(exchange_rate)']);
    });
}

function getVolume(shareCode, callback){
    sqlSentence = "SELECT volume FROM _" + shareCode + " ORDER BY Date(date) DESC LIMIT 1";

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT volume ERROR" + shareCode, err.message);
            return 0;
        }

        //console.log(result);
        callback(null,result[0]['volume']);
    });
}

function getTurnover(shareCode, callback){
    sqlSentence = "SELECT turnover FROM _" + shareCode + " ORDER BY Date(date) DESC LIMIT 1";

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT turnover ERROR" + shareCode, err.message);
            return 0;
        }

        //console.log(result);
        callback(null,result[0]['turnover']);
    });
}

function getTotalValue(shareCode, callback){
    sqlSentence = "SELECT total_value FROM _" + shareCode + " ORDER BY Date(date) DESC LIMIT 1";

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT total_value ERROR" + shareCode, err.message);
            return 0;
        }

        //console.log(result);
        callback(null,result[0]['total_value']);
    });
}

function getCirculationValue(shareCode, callback){
    sqlSentence = "SELECT circulation_value FROM _" + shareCode + " ORDER BY Date(date) DESC LIMIT 1";

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT circulation_value ERROR" + shareCode, err.message);
            return 0;
        }

        //console.log(result);
        callback(null,result[0]['circulation_value']);
    });
}

function start() {
    //when to be use: after data be refresh
    //refreshShareLive();

    ep.all('getNewestDate','getShareLive',function(date,shares){
        getChangeDataArray(date,shares);
    });
    getBaseData();


}


exports.start = start;


function getChangeDataArray(date, shares){

    var j=-1;
    var length = shares.length;

    rowDataArray.length = 0;
    async.whilst(
        function(){
            j++;
            return j < length;
        },

        function(callback){
            getExchangeRateData(shares[j], callback);
        },

        function(err, result){
            if(err){
                console.log(err.message);
            } else {
                //console.log(rowDataArray[0]);
                writeMySQLData(rowDataArray);
                console.log(' get rowDataArray finished');
            }

        }
    );
}


function getExchangeRateData(share, callback) { // shareCode is string
    var shareCode, rowData = [];
    shareCode = share[1].toString();

    async.parallel([
            function(callback){
                getExchangeRate(shareCode, weekStartDate, newestDate, callback);
            },

            function(callback){
                getExchangeRate(shareCode, monthStartDate, newestDate, callback);
            },

            function(callback){
                getExchangeRate(shareCode, seasonStartDate, newestDate, callback);
            },

            function(callback){
                getExchangeRate(shareCode, halfYearStartDate, newestDate, callback);
            },

            function(callback){
                getExchangeRate(shareCode, yearStartDate, newestDate, callback);
            },

            function(callback){
                getExchangeRate(shareCode, twoYearStartDate, newestDate, callback);
            },

            function(callback){
                getExchangeRate(shareCode, threeYearStartDate, newestDate, callback);
            },

            function(callback){
                getExchangeRate(shareCode, fourYearStartDate, newestDate, callback);
            },

            function(callback){
                getVolume(shareCode, callback);
            },

            function(callback){
                getTurnover(shareCode, callback);
            },

            function(callback){
                getTotalValue(shareCode, callback);
            },

            function(callback){
                getCirculationValue(shareCode, callback);
            }

    ], function(err, results){
        if(err){

        }else{
            rowData.push(share[1]);
            rowData.push(share[0]);
            for(var i=0; i< results.length; i++){
                rowData.push(results[i]);
            }

            //console.log(rowData);
            rowDataArray.push(rowData);
            callback(null);
        }
    });
}


function getBaseData(){
    getShareLive();
    getNewestDate();
}

var shareLive = [];
function getShareLive(){
    shareLive.length = 0;

    sqlSentence = "SELECT name , code FROM share_name_code_date WHERE status = 1";

    connectionData.query(sqlSentence, function(err, result){
        if(err){
            console.log("SELECT * FROM share_name_code_date WHERE status = 1", err.message);
        }

        for(var i=0 in result){
            shareLive.push([result[i].name,  result[i].code]);
        }
        //console.log(shareLive);

        //shareLive.sort(sortAsc);  //not work ,shareLive is multiple array
        //console.log(shareLive);
        ep.emit('getShareLive',shareLive);
    });

}

var newestDate,halfYearStartDate, yearStartDate,twoYearStartDate,threeYearStartDate,fourYearStartDate;
var seasonStartDate, monthStartDate,weekStartDate;
function getNewestDate(){
    sqlSentence = 'SELECT MAX(date) from _000001';
    connection163.query(sqlSentence, function(err ,result){
        if(err){
            console.log('SELECT MAX(date) from _000001 ERROR', err.message);
            return false;
        }

        var dateTemp = result[0]['MAX(date)'];
        var year = dateTemp.getFullYear();
        var month = dateTemp.getMonth() + 1;
        var date  = dateTemp.getDate();
        var halfMonth,seasonMonth,oneMonth,weekDate,weekYear;

        weekYear = year;
        if(date > 7){
            weekDate = date - 7;
            weekStartDate = month;
        } else {//every month have 30 days except 2(28days) and 12
            if(month===1){
                weekStartDate = 12;
                weekDate = 24 + date;
                weekYear = year - 1;
            }else{
                weekStartDate = month - 1;
                if(weekStartDate===2){
                    weekDate = 21 + date;
                }else{
                    weekDate = 23 + date;
                }
            }
        }

        if(month > 6){
            halfMonth = month - 6;
            halfYearStartDate = year;
        }else{
            halfMonth = month + 6;
            halfYearStartDate = year-1;
        }

        if(month > 3){
            seasonMonth = month - 3;
            seasonStartDate = year;
        }else{
            seasonMonth = month + 10;
            seasonStartDate = year-1;
        }


        if(month===1){
            oneMonth = 12;
            monthStartDate = year - 1;
        }else {
            oneMonth = month - 1;
            monthStartDate = year;
        }

        if(oneMonth < 10){
            oneMonth = '0' + oneMonth;
        }

        if(seasonMonth < 10){
            seasonMonth = '0' + seasonMonth;
        }

        if(halfMonth < 10){
            halfMonth = '0' + halfMonth;
        }

        if(month < 10){
            month = '0' + month;
        }

        if(date < 10){
            date = '0' + date;
        }

        if(weekDate < 10){
            weekDate = '0' + weekDate;
        }

        weekStartDate = weekYear + '-' + weekStartDate + '-' + weekDate;
        monthStartDate = monthStartDate + '-' + oneMonth + '-' + date;
        seasonStartDate = seasonStartDate + '-' + seasonMonth + '-' + date;
        halfYearStartDate = halfYearStartDate + '-' + halfMonth + '-' + date;
        newestDate = year + '-' + month + '-' + date;
        yearStartDate = year-1 + '-' + month + '-' + date;
        twoYearStartDate = year-2 + '-' + month + '-' + date;
        threeYearStartDate = year-3 + '-' + month + '-' + date;
        fourYearStartDate = year-4 + '-' + month + '-' + date;
        console.log("newestDate: " + newestDate);
        ep.emit('getNewestDate', newestDate);
    });
}
