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
function getShareWaterfall(shares,dateGap,changeRateMin,dateContinuous,tableStatArray, callback){
    var dateArray = [],
        statArray=[],
        dataFullArray = [],
        dateTempArray = [],
        dateContinuousArray = [];

    var i,t;

    var shareCode = shares[1];
    var shareName = shares[0];
    async.waterfall([
        function(callback){
            sqlSentence = "SELECT  date, change_rate, close FROM _" + shareCode;
            //console.log(sqlSentence);
            connection163.query(sqlSentence, function(err, result) {
                if (err) {
                    console.log("SELECT date FROM" + shareCode, err.message);
                    return 0;
                }
                //console.log(result);
                for(i=0; i<result.length; i++){
                    if(result[i]['change_rate'] <= changeRateMin){
                        dateArray.push([i,getDateString(result[i]['date']),result[i]['change_rate'],result[i]['close']]);
                    }
                    dataFullArray.push(result[i]['change_rate']);
                }

                dateTempArray.push(dateArray[0]);
                for(i=1; i<dateArray.length;i++){
                    if((dateArray[i][0] - dateArray[i-1][0]) <= dateGap ){
                        dateTempArray.push(dateArray[i]);
                    }else{
                        if(dateTempArray.length >= dateContinuous){
                            for(t=0; t<dateTempArray.length;t++){
                                dateContinuousArray.push([shareCode, dateTempArray[t][0], dateTempArray[t][1], dateTempArray[t][2], dateTempArray[t][3]]);
                            }
                            waterfallArray.push(dateContinuousArray);
                            dateContinuousArray = [];
                        }else{

                        }
                        dateTempArray.length = 0;
                        dateTempArray.push(dateArray[i]);
                    }
                }

                callback(null);
            });
        },

        function(callback){
            var max,min,avg;
            sqlSentence = "SELECT  MAX(close),MIN(close),AVG(close) FROM _" + shareCode;
            //console.log(sqlSentence);
            connection163.query(sqlSentence, function(err, result) {
                if(err){
                    console.log("SELECT  MAX(close),Min(close)" + err.message);
                }else{
                    //console.log(result);
                    min = result[0]['MIN(close)'];
                    max = result[0]['MAX(close)'];
                    avg = result[0]['AVG(close)'];
                    callback(null,min,max,avg);
                }
            });
        },

        function(min,max,avg,callback){
            var t,index,maxIndex,sum=[],cur,minR,avgR,maxR,sumRate,startIndex;
            maxIndex = dataFullArray.length;

            for(t=0;t<waterfallArray.length;t++){
                startIndex = waterfallArray[t][0][1];
                index = waterfallArray[t][waterfallArray[t].length-1][1];

                sumRate = getWaterfallSumRate(startIndex,index,dataFullArray);

                sum[0] = getSumRate(index,3,maxIndex,dataFullArray);
                sum[1] = getSumRate(index,5,maxIndex,dataFullArray);
                sum[2] = getSumRate(index,10,maxIndex,dataFullArray);
                sum[3] = getSumRate(index,20,maxIndex,dataFullArray);
                sum[4] = getSumRate(index,30,maxIndex,dataFullArray);
                sum[5] = getSumRate(index,60,maxIndex,dataFullArray);
                sum[6] = getSumRate(index,90,maxIndex,dataFullArray);

                sum[7] = getBeforeSumRate(startIndex,30,dataFullArray);
                sum[8] = getBeforeSumRate(startIndex,90,dataFullArray);
                sum[9] = getBeforeSumRate(startIndex,180,dataFullArray);
                sum[10] = getBeforeSumRate(startIndex,360,dataFullArray);
                sum[11] = getBeforeSumRate(startIndex,500,dataFullArray);
                cur = waterfallArray[t][0][4];
                minR = cur/min;
                avgR = cur/avg;
                maxR = cur/max;
                statArray.push([shareCode, shareName,waterfallArray[t].length,sumRate,min,max,avg,cur,minR,avgR,maxR,
                    waterfallArray[t][0][2],waterfallArray[t][waterfallArray[t].length-1][2],
                    sum[0],sum[1],sum[2],sum[3],sum[4],sum[5],sum[6],
                    sum[7],sum[8],sum[9],sum[10],sum[11]]);
            }
            waterfallArray.length=0;
            callback(null);
        }

        ],
        function(err){
            if(err){

            }else{

                for(i=0;i<statArray.length;i++){
                    tableStatArray.push(statArray[i]);
                }
                callback(null);
                //console.log('statArray:' + statArray);
            }
    });
}


function getWaterfallSumRate(startIndex, endIndex,dataFullArray){
    var sum = 0;
    for(var i=startIndex; i<=endIndex;i++){
        sum += dataFullArray[i];
    }
    return sum;
}


function getSumRate(index,dateAfter,maxIndex,dataFullArray){
    var i,dateCounts,sum=0;

    if((index+dateAfter) > maxIndex){
        dateCounts = maxIndex-index;
    } else {
        dateCounts = dateAfter;
    }
    for(i=1; i<dateCounts; i++){
        sum += dataFullArray[index+i];
    }
    return sum;
}


function getBeforeSumRate(index,dataBefore,dataFullArray){
    var i,dataCounts,sum=0;

    if((index-dataBefore) < 0){
        dataCounts = index;
    } else {
        dataCounts = dataBefore;
    }

    for(i=index-dataCounts; i<index; i++){
        sum += dataFullArray[i];
    }
    return sum;
}


function start() {
    //when to be use: after data be refresh
    // ep.after("updateNewestDate",1,refreshShareLive);
    // updateNewestDate();
    ep.all('getNewestDate','getShareLive',function(date,shares){
        getRowDataArray(date, shares);
    });
    getBaseData();

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
        //console.log('shareLive');
        ep.emit('getShareLive',shareLive);
    });

}

exports.start = start;



function getRowDataArray(){
    var i=0,t=0,n,e,h;
    console.log('begin waterfall');
    async.whilst(
        function(){
            i++;
            return i<11;
        },

        function(callback){
            if(i<5){
                t=1;
                n=0;
                e=0;
                h=0;
            }else if(t<8){
                t=2;
                n=8;
                e=4;
                h=2;
            } else{
                t=3;
                n=12;
                e=6;
                h=3;
            }
            async.series([
                function(callback){ //when gap>5 min=1-5
                    //share gap rateMin continuous
                    getOneTableData(shareLive,i,1,10*t+n+e+h,callback);
                },

                function(callback){
                    getOneTableData(shareLive,i,2,8*t+e+h,callback);
                },

                function(callback){
                    getOneTableData(shareLive,i,3,7*t+e,callback);
                },

                function(callback){
                    getOneTableData(shareLive,i,4,6*t+e,callback);
                },

                function(callback){
                    getOneTableData(shareLive,i,5,5*t+h,callback);
                },

                function(callback){
                    getOneTableData(shareLive,i,6,4*t+h,callback);
                },

                function(callback){
                    getOneTableData(shareLive,i,7,3*t+h,callback);
                },

                function(callback){
                    getOneTableData(shareLive,i,8,3*t+h,callback);
                },

                function(callback){
                    getOneTableData(shareLive,i,9,2*t,callback);
                },

                function(callback){
                    getOneTableData(shareLive,i,10,2*t,callback);
                }

            ],function(err, result){
                if(err){
                    console.log('manage waterfall err index:' + i, err.message);
                }else{
                    console.log('gap:'+ i + 'finished');
                    callback(null);
                }
            });

        },

        function(err, result){
            if(err){
                console.log('whilst fail:', err.message);
            }else{
                console.log('=============waterfall  finished');
            }
        }

    );
}


function getOneTableData(shares,gap,rateMin,continuous,callback){
    var length,i=-1;
    var tableName = 'gap' + gap + '_' + 'min' + rateMin;
    length = shares.length;
    rateMin = 0 - rateMin;

    var tableStatArray = [];
    //console.log('begin getShareWaterfall: ' +　shares[1]);
    async.whilst(
        function(){
            i++;
            return i < shares.length;
           //return i<6;
        },

        function(callback){
            //console.log(shares[i]);
            getShareWaterfall(shares[i],gap,rateMin,continuous,tableStatArray,callback);
            //getShareWaterfall(['大唐电信','600198'],gap,rateMin,continuous,tableStatArray,callback);
        },

        function(err, result){
            if(err){
                console.log('getShareWaterfall Fail:'+ tableName);
            }else{
                if(tableStatArray.length===0){
                    console.log(tableName + ' data is empty');
                }else{
                    writeMySQLWaterfall(tableName,tableStatArray,callback);
                }

                //console.log(tableStatArray);
            }

        }
    )
}

function writeMySQLWaterfall(tableName,data,callback) {
    var counts = 0;
    counts = data.length;

    async.series([
        function(callback){
            sqlSentence = "DROP TABLE IF EXISTS " + tableName;

            connection.query(sqlSentence, function (err) {
                if (err) {
                    console.log("DROP TABLE FAIL：" + tableName, err.message);
                }
                callback(null);
            });

        },

        function(callback){
            sqlSentence = "CREATE TABLE IF NOT EXISTS " + tableName
                + " (code VARCHAR(10) , name VARCHAR(20), continuous SMALLINT, sum_rate FLOAT, "
                + "min FLOAT, max FLOAT, avg FLOAT, current FLOAT, min_rate FLOAT, avg_rate FLOAT, max_rate FLOAT, "
                + "start_date VARCHAR(10), end_date VARCHAR(10), "
                + "rate_sum3 FLOAT,rate_sum5 FLOAT,rate_sum10 FLOAT,rate_sum20 FLOAT,rate_sum30 FLOAT,rate_sum60 FLOAT,rate_sum90 FLOAT, "
                + "pre_rate30 FLOAT, pre_rate90 FLOAT, pre_rate180 FLOAT, pre_rate360 FLOAT, pre_rate500 FLOAT)"
                + "charset utf8 collate utf8_general_ci";

            //console.log(sqlSentence);
            connection.query(sqlSentence, function (err) {
                if (err) {
                    console.log("ERROR: CREATE ", err.message);
                    console.log(counts + " : " + index + "code:" + data[0][1]);
                }
                callback(null);
            });
        },


        function(callback){
            sqlSentence = "INSERT INTO " + tableName
                + " (code, name, continuous, sum_rate, "
                + "min, max, avg, current, min_rate, avg_rate, max_rate, "
                + "start_date, end_date, "
                + "rate_sum3, rate_sum5, rate_sum10, rate_sum20, rate_sum30, rate_sum60, rate_sum90, "
                + "pre_rate30, pre_rate90, pre_rate180, pre_rate360, pre_rate500)"
                + " VALUES ?;";
            //console.log(sqlSentence);
            connection.query(sqlSentence, [data], function (err, rows, fields) {
                if (err) {
                    console.log(data.length);
                    console.log("ERROR INSERT  :" + tableName, err.message);
                } else {
                    console.log(tableName + ' write mysql finished length:' + data.length);

                }
                callback(null);
            });
        }
    ],function(err){
        if(err){
            console.log('operate mysql fail:' + tableName);
        }else{
            callback(null);
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
            //console.log(sqlSentence);
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


