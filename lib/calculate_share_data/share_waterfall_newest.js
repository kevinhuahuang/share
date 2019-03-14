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


var sqlSentence;
var waterfallArray = [];
//==================================================================================


function start() {


    //when to be use: after data be refresh
    // ep.after("updateNewestDate",1,refreshShareLive);
    // updateNewestDate();


    ep.all('getNewestDate','getShareLive',function(data,shares){
        //console.log(shares);
        getChangeRateSamllGap(data,shares);
    });
    getBaseData();

}

var oneRowSmallGap = [];
function getChangeRateSamllGap(data,shareArray){
    var i,t,length;

    i=-1;
    length = shareArray.length;
    oneRowSmallGap.length = 0;
    async.whilst(
        function(){
            i++;
            return i < length;
        },

        function(callback){
            readChangeRateSmallGap(shareArray[i],callback);
        },

        function(err){
            if(err){
                console.log('ERROR: getChangeRateSmallGap', err.message);
            }else{
                writeMySQLSmallGap(oneRowSmallGap);
            }
        }
    );
}

function readChangeRateSmallGap(shares,callback){
    var shareCode = shares[1];
    var shareName = shares[0];

    var sqlSentence,i;
    var rareSum=[];
    var current;

    async.parallel([
        function(callback){
            sqlSentence = "SELECT close FROM _" + shareCode + " ORDER BY Date(date) DESC  LIMIT 1";
            //console.log(sqlSentence);
            connection163.query(sqlSentence, function(err, result) {
                if (err) {
                    console.log("ERROR== SELECT  close FROM" + shareCode, err.message);
                    return 0;
                }else{
                    current = result[0]['close'];
                    callback(null);
                }
            });
        },

        function(callback){
            sqlSentence = "SELECT  MAX(close), MIN(close), AVG(close), close FROM _" + shareCode + " ORDER BY Date(date) DESC  LIMIT 1";
            //console.log(sqlSentence);
            connection163.query(sqlSentence, function(err, result) {
                if (err) {
                    console.log("ERROR== SELECT  MAX(close) FROM" + shareCode, err.message);
                    return 0;
                }else{

                    callback(null,result[0]['MAX(close)'],result[0]['MIN(close)'],result[0]['AVG(close)'],current,
                        Math.abs(current/result[0]['MIN(close)']),
                        Math.abs(current/result[0]['AVG(close)']),
                        Math.abs(current/result[0]['MAX(close)']));
                }
            });
        },

        function(callback){
            sqlSentence = "SELECT  change_rate FROM _" + shareCode + " ORDER BY Date(date) DESC  LIMIT 360";
            //console.log(sqlSentence);
            connection163.query(sqlSentence, function(err, result) {
                if (err) {
                    console.log("ERROR== SELECT date FROM" + shareCode, err.message);
                    return 0;
                }else{
                    if(result.length < 10){
                        return;
                    }

                    var resultArray = [];

                    for(i=0;i<result.length;i++){
                        resultArray.push(result[i]['change_rate']);
                    }

                    rareSum[0] = resultArray[0] + resultArray[1];
                    for(i=1; i<9; i++){
                        rareSum[i] = rareSum[i-1] + resultArray[i+1];
                    }

                    if(resultArray.length > 10){
                        rareSum[9] = getSum(resultArray, 30);
                        if(resultArray.length > 30){
                            rareSum[10] = getSum(resultArray, 90);
                            if(resultArray.length > 90){
                                rareSum[11] = getSum(resultArray, 180);
                                if(resultArray.length > 180){
                                    rareSum[12] = getSum(resultArray, 360);
                                }else{
                                    rareSum[12] = 0;
                                }
                            } else{
                                rareSum[11] = 0;
                                rareSum[12] = 0;
                            }
                        }else{
                            rareSum[10] = 0;
                            rareSum[11] = 0;
                            rareSum[12] = 0;
                        }
                    }else{
                        rareSum[9] = 0;
                        rareSum[10] = 0;
                        rareSum[11] = 0;
                        rareSum[12] = 0;
                    }

                    callback(null,rareSum)
                }
            });
        }


    ],function(err,result){
        if(err){
            console.log('read share_waterfall_newest err');
        }else{
            oneRowSmallGap.push([shareCode,shareName,result[1][0],result[1][1],result[1][2],result[1][3],result[1][4],result[1][5],result[1][6],
                result[2][0],result[2][1],result[2][2],result[2][3],result[2][4],result[2][5],result[2][6],
                result[2][7],result[2][8],result[2][9],result[2][10],result[2][11],result[2][12]]);
            //console.log(oneRowSmallGap);
            callback(null);
        }
    });


}

function getSum(dataArray,length){
    var sum;
    sum = 0;
    length = (length > dataArray.length) ? dataArray.length : length;
    for(var i=0; i<length;i++){
        sum += dataArray[i];
    }
    return sum;
}

//==================================================================================


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
        //console.log('shareLive');
        ep.emit('getShareLive',shareLive);
    });

}

exports.start = start;





function writeMySQLSmallGap(data) {

    async.series([
        function(callback){
            sqlSentence = "DROP TABLE IF EXISTS small_gap";

            connection.query(sqlSentence, function (err) {
                if (err) {
                    console.log("ERROR: DROP small_gap FAIL：", err.message);
                }
                callback(null);
            });

        },

        function(callback){
            sqlSentence = "CREATE TABLE IF NOT EXISTS small_gap"
                + " (code VARCHAR(10) , name VARCHAR(20), "
                + "max FLOAT, min FLOAT, avg FLOAT, current FLOAT, min_rate FLOAT, avg_rate FLOAT, max_rate FLOAT, "
                + "day2 FLOAT,day3 FLOAT,day4 FLOAT,day5 FLOAT,day6 FLOAT,day7 FLOAT,day8 FLOAT,day9 FLOAT,day10 FLOAT, "
                + "day30 FLOAT, day90 FLOAT, day180 FLOAT, day360 FLOAT)"
                + "charset utf8 collate utf8_general_ci";

            //console.log(sqlSentence);
            connection.query(sqlSentence, function (err) {
                if (err) {
                    console.log("ERROR: CREATE small_gap", err.message);
                }
                callback(null);
            });
        },

        function(callback){
            sqlSentence = "INSERT INTO small_gap"
            + " (code, name, "
            + "max, min, avg, current, min_rate, avg_rate, max_rate, "
            + "day2,day3,day4,day5,day6,day7,day8,day9,day10,day30,day90,day180,day360)"
                + " VALUES ?;";

            connection.query(sqlSentence, [data], function (err, rows, fields) {
                if (err) {
                    //console.log(data.length);
                    console.log("ERROR: INSERT INTO small_gap" , err.message);
                } else {
                    //console.log('small_gap write mysql finished length:' + data.length);

                }
                callback(null);
            });
        }
    ],function(err){
        if(err){
            console.log('ERROR operate mysql small_gap:', err.message);
        }else{
            console.log('small_gap write mysql finished' );
        }
    });
}

function getDateString(dateObject){
    var year = dateObject.getFullYear();
    var month = dateObject.getMonth() + 1;
    var date  = dateObject.getDate();

    if(month < 10){
        month = '0' + month;
    }

    if(date < 10){
        date = '0' + date;
    }

    return year + '-' + month + '-' + date;
}
//==================================================================================





//=====================================================================================
var newestDate, yearStartDate;
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

        if(month < 10){
            month = '0' + month;
        }

        if(date < 10){
            date = '0' + date;
        }

        newestDate = year + '-' + month + '-' + date;
        yearStartDate = year-1 + '-' + month + '-' + date;
        console.log("newestDate: " + newestDate);
        ep.emit('getNewestDate', newestDate);
    });
}



function updateNewestDate(){
    var i;

    async.waterfall([

        function(callback){
            sqlSentence = "SHOW TABLES";
            var tables = [];
            connection163.query(sqlSentence, function(err, result){
                if(err){
                    console.log("SHOW TABLES ERROR", err.message);
                }

                for(i in result){
                    tables.push(result[i]['Tables_in_share_daily_163'].slice(1));
                }

                //console.log(tables);
                callback(null, tables);
            });
        },

        function(tables, callback){
            var tableEndDate = [];

            var i,length;
            i=-1;
            length = tables.length;
            async.whilst(

                function(){
                    i++;
                    return i < length;
                },

                function(callback){
                    //console.log(i);
                    getTableEndDate(tables[i], tableEndDate,callback);
                },

                function(){
                    callback(null, tableEndDate);
                }

            );
        },

        function(tableEndDate, callback){
            var i,length;
            i=-1;
            length = tableEndDate.length;
            async.whilst(
                function(){
                    i++;
                    return i<length;
                },

                function(callback){
                    updateTableEndDate(tableEndDate[i],callback);
                },

                function(){
                    callback(null);
                }

            );
        }

    ], function(err,result){
        if(err){
            console.log('ERROR: update newestDate fail', err.message);
        }else{
            console.log('update newestDate finish');
        }
        ep.emit('updateNewestDate',null);
    });
}


function getTableEndDate(table, tableEndDate,callback){
    sqlSentence = "SELECT MAX(date) FROM _" + table;
    var endDate;
    connection163.query(sqlSentence, function(err, result){
        if(err){
            console.log("ERROR: SELECT MAX(date) FROM _" + table, err.message);
        }

        if(result){
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

            endDate = year + '-' + month + '-' + date;
            tableEndDate.push([table, endDate]);
        }

        //console.log(endDate);
        callback(null);
    });
}


function updateTableEndDate(tableEndDate, callback){
    sqlSentence = "UPDATE share_name_code_date set end_date = " + "'" +  tableEndDate[1] + "'" + " where code = " + "'" + tableEndDate[0]  + "'";
    //console.log(sqlSentence);
    connectionData.query(sqlSentence, function(err, result){
        if(err){
            console.log("ERROR: UPDATE share_name_code_date set date = " + tableEndDate[1] , err.message);
        }else{
            //console.log("UPDATE share_name_code_date set date = " + tableEndDate[1] + ' finish');
        }
        callback(null);
    });
}


function refreshShareLive(){
    var shareLive = [];
    var endDate;
    async.waterfall([
        function (callback){

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

                if(month < 10){
                    month = '0' + month;
                }

                if(date < 10){
                    date = '0' + date;
                }

                endDate = year + '-' + month + '-' + date;
                //console.log(endDate);
                callback(null,endDate);
            });

        },

        function (endDate,callback){
            sqlSentence = "SELECT code from share_name_code_date where Date(end_date) >= " + "'" + endDate  + "'"; //don't miss the "'"

            //console.log(sqlSentence);
            var shares = [];
            connectionData.query(sqlSentence, function(err, result){
                if(err){
                    console.log("SHOW TABLES ERROR", err.message);
                }

                for(var i in result){
                    shares.push(result[i]['code']);
                }

            });

            sqlSentence = "UPDATE share_name_code_date set status = 1 ";

            connectionData.query(sqlSentence,function(err){
                if(err){
                    console.log("UPDATE share_name_code_date  status = 1 ERROR", err.message);
                }
            });

            sqlSentence = "UPDATE share_name_code_date set status = 0 where Date(end_date) <" + "'" + endDate  + "'";
            console.log(sqlSentence);
            connectionData.query(sqlSentence,function(err){
                if(err){
                    console.log("FIRST : UPDATE share_name_code_date ERROR status = 0", err.message);
                }
            });

            callback(null, shares);
        },

        function (shares, callback){
            sqlSentence = "SHOW TABLES";

            var tables = [];
            connection163.query(sqlSentence, function(err, result){
                if(err){
                    console.log("SHOW TABLES ERROR", err.message);
                }

                for(var i in result){
                    tables.push(result[i]['Tables_in_share_daily_163'].slice(1));
                }

                //console.log(tables);
                callback(null,shares, tables);
            });

        },

        function (shares,tables, callback){
            shares.sort(sortAsc);
            tables.sort(sortAsc);

            var shareLength,tableLength;
            shareLength = shares.length;
            tableLength = tables.length;
            shareLive.length = 0;
            //console.log('shareLength:' + shareLength + '   tableLength:' + tableLength);
            var shareDeath = [];
            var shareMiss = [];
            for(var i=0,t=0; i<shareLength;){
                if(shares[i] === tables[t]){
                    shareLive.push(shares[i]);
                    t++;
                    i++;
                } else if(shares[i] > tables[t]){
                    shareDeath.push(tables[t]);
                    t++;
                } else {
                    shareMiss.push(shares[i]);
                    i++;
                }

                if( t > tableLength || i > shareLength){
                    break;
                }
            }

            callback(null, shareMiss, shareDeath);
        },

        function (shareMiss, shareDeath,callback) {
            var i;

            for (i = 0; i < shareMiss.length; i++) {
                sqlSentence = "UPDATE share_name_code_date set status = 0 where  code = " + shareMiss[i];
                connectionData.query(sqlSentence, function (err) {
                    if (err) {
                        console.log("SECOND: UPDATE share_name_code_date  status = 0 ERROR", err.message);
                    }
                });
            }

            for (i = 0; i < shareDeath.length; i++) {
                sqlSentence = "UPDATE share_name_code_date set status = 0 where  code = " + shareDeath[i];
                connectionData.query(sqlSentence, function (err) {
                    if (err) {
                        console.log("THIRD: UPDATE share_name_code_date  status = 0 ERROR", err.message);
                    }
                });
            }

            callback(null);
        },

        function(callback){

            var j,length;
            j = -1;
            length = shareLive.length;
            (function(){
                async.whilst(
                    function(){
                        j++;
                        return j < length;
                    },

                    function(callback){
                        sqlSentence = "SELECT close FROM _" + shareLive[j] + " WHERE Date(date) = " + "'" + endDate + "'";
                        //console.log(sqlSentence);
                        //var share = shareLive[i]; //don't use the shareLive[i] on the second query function ,all shareLive[i] be same
                        connection163.query(sqlSentence,function(err,result){
                            if(err){
                                console.log("SELECT WHERE THE END_DATE ERR", err.message);
                            }

                            //console.log(result);
                            if(result.length<1){
                                sqlSentence = "UPDATE share_name_code_date set status = 0 where  code = " + shareLive[j];
                                //console.log(sqlSentence);
                                connectionData.query(sqlSentence,function(err){
                                    if(err){
                                        console.log("FOURTH: UPDATE share_name_code_date where status = 0 ERROR", err.message);
                                    }
                                });
                                //console.log(shareLive[j]);
                                callback();
                            } else {
                                callback();
                            }

                        });
                    },

                    function(err, result){
                        if(err){
                            console.log('whilst fail');
                        }else {
                            console.log('whilst finished');
                        }
                        callback();
                    });
            }());
        }

    ], function(err, result){
        connection.end();
        connection163.end();
        if(err){
            console.log('waterfall fail');
        } else {
            console.log('refreshShareLive finished');
        }
    });

}

function sortAsc(a,b){
    return a-b;
}


