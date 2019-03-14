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
    database : 'share_waterfall'
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


var tableData = [];


function queryData(option, callback) {
    var i;

    var sqlSentence = 'SELECT * FROM small_gap ORDER BY ' + option  + ' LIMIT 100';

    tableData.length = 0;
    //console.log(sqlSentence);
    connection.query(sqlSentence, function(err, result){
        if(err){
            console.log('ERROR: SELECT * FROM small_gap', err.message);
        }else {
            var name, code, curr, avg, min, max, minR, avgR, maxR, day2, day3, day4, day5, day6, day7, day8, day9,
                day10, day30, day90, day180, day360;
            //console.log(result[0]);
            for (i = 0; i < result.length; i++) {
                name = result[i]['name'];
                code = result[i]['code'];
                curr = result[i]['current'];
                avg = result[i]['avg'];
                min = result[i]['min'];
                max = result[i]['max'];
                avgR = result[i]['avg_rate'];
                minR = result[i]['min_rate'];
                maxR = result[i]['max_rate'];
                day2 = result[i]['day2'];
                day3 = result[i]['day3'];
                day4 = result[i]['day4'];
                day5 = result[i]['day5'];
                day6 = result[i]['day6'];
                day7 = result[i]['day7'];
                day8 = result[i]['day8'];
                day9 = result[i]['day9'];
                day10 = result[i]['day10'];
                day30 = result[i]['day30'];
                day90 = result[i]['day90'];
                day180 = result[i]['day180'];
                day360 = result[i]['day360'];


                tableData.push([name, code, curr, avg, min, max, minR, avgR, maxR, day2, day3, day4, day5, day6, day7, day8, day9, day10, day30, day90, day180, day360]);
            }
            callback(null);
        }
    });
}


exports.queryData = queryData;
exports.tableData = tableData;