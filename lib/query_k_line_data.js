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


var kLineData = [];


function queryData(code, callback) {

    var i,name,date,open,close,high,low;


    var sqlSentence = 'SELECT open, close, high, low, date FROM _' + code + ' ORDER BY date DESC';

    connection163.query(sqlSentence, function(err, result){
        if(err){
            console.log('ERROR:SELECT open, close, high, low FROM _' + code, err.message);
        }else{


            //console.log(result[0]);
            var dateTemp, year, month, day;
            kLineData.length =0;
            for(i=0; i< result.length; i++){
                open = result[i]['open'];
                close = result[i]['close'];
                high = result[i]['high'];
                low = result[i]['low'];

                dateTemp = result[i]['date'];
                year = dateTemp.getFullYear();
                month = dateTemp.getMonth() + 1;
                day  = dateTemp.getDate();

                if(month < 10){
                    month = '0' + month;
                }

                if(date < 10){
                    date = '0' + date;
                }

                date = year + '-' + month + '-' + day;

                kLineData.unshift([date, open, close, high, low]);
            }
            //console.log(kLineData.length);
            callback(null);
        }
    });
}


exports.queryData = queryData;
exports.kLineData = kLineData;