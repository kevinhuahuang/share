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
function queryTableData(sqlSentence, callback) {
    var i;

    //var sqlSentence = 'SELECT * FROM small_gap ORDER BY ' + option  + ' LIMIT 100';

    tableData.length = 0;
    //console.log(sqlSentence);
    connection.query(sqlSentence, function(err, result){
        if(err){
            console.log('ERROR:::'+sqlSentence, err.message);
        }else {
            var name, code, startDate,endDate,pre30,pre90,pre180,pre360,pre500,curr,continuous, minR, avgR, maxR,sumRate,
                rate3,rate5,rate10,rate20,rate30,rate60,rate90;
            //console.log(result[0]);
            for (i = 0; i < result.length; i++) {
                name = result[i]['name'];
                code = result[i]['code'];
                startDate = result[i]['start_date'];
                endDate = result[i]['end_date'];
                pre30= result[i]['pre_rate30'];
                pre90= result[i]['pre_rate90'];
                pre180=result[i]['pre_rate180'];
                pre360=result[i]['pre_rate360'];
                pre500=result[i]['pre_rate500'];
                curr = result[i]['current'];
                continuous = result[i]['continuous'];
                minR = result[i]['min_rate'];
                avgR = result[i]['avg_rate'];
                maxR = result[i]['max_rate'];
                sumRate = result[i]['sum_rate'];
                rate3 = result[i]['rate_sum3'];
                rate5 = result[i]['rate_sum5'];
                rate10= result[i]['rate_sum10'];
                rate20= result[i]['rate_sum20'];
                rate30= result[i]['rate_sum30'];
                rate60= result[i]['rate_sum60'];
                rate90= result[i]['rate_sum90'];


                tableData.push([name, code, startDate,endDate,pre30,pre90,pre180,pre360,pre500,curr,continuous, minR, avgR, maxR,sumRate,
                    rate3,rate5,rate10,rate20,rate30,rate60,rate90]);
            }
            callback(null);
        }
    });
}



var scatterData = [];
function queryScatterData(sqlSentence, callback) {

    connection.query(sqlSentence, function(err, result){
        if(err){
            console.log('ERROR:::'+sqlSentence, err.message);
        }else {
            var data=[];

            scatterData.length = 0;
            for(var n=0; n<result.length; n++){
                data.length = [];
                for(var i in result[n]){
                    data.push(result[n][i]);
                }
                scatterData.push([data[0],data[1]]);
            }
            callback(null);
        }
    });
}


exports.queryScatterData = queryScatterData;
exports.queryTableData = queryTableData;
exports.scatterData = scatterData;
exports.tableData = tableData;



