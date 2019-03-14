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


var rowData = {
    code : '',
    name : '',
    max : 0,
    min : 0,
    max_year : 0,
    min_year : 0,
    average : 0,
    average_year : 0,
    max_rate : 0,
    min_rate : 0,
    max_year_rate  : 0,
    min_year_rate  : 0,
    average_rate  : 0,
    average_year_rate  : 0,
    current_value   : 0
};

var rowDataArray = [];


function writeMySQLData(data) {
    var counts =0 ;
    counts = data.length;

    sqlSentence = "DROP TABLE IF EXISTS share_close_max_min";

    connection.query(sqlSentence,function(err){
       if(err){
           console.log("DROP TABLE FAIL", err.message);
       }

    });


    sqlSentence = "CREATE TABLE IF NOT EXISTS share_close_max_min"
        + " (code VARCHAR(10) PRIMARY KEY, name VARCHAR(20), max FLOAT, min FLOAT, "
        + "max_year FLOAT, min_year FLOAT, average FLOAT, average_year FLOAT, "
        + "max_rate FLOAT, min_rate FLOAT, "
        + "max_year_rate FLOAT, min_year_rate FLOAT, average_rate FLOAT, average_year_rate FLOAT, "
        + "current_value FLOAT)charset utf8 collate utf8_general_ci;";

    connection.query(sqlSentence,function(err){
        if(err) {
            console.log("CREATE ERROR:", err.message);
            console.log(counts + " : "+ index + "code:" + data[0][1]);
        }
    });

    sqlSentence = "INSERT INTO share_close_max_min"
        + "(code , name, max, min, "
        + "max_year , min_year, average, average_year, "
        + "max_rate, min_rate, "
        + "max_year_rate, min_year_rate, average_rate, average_year_rate, "
        + "current_value)"
        + " VALUES ?;";

    //console.log(sqlSentence);
    //console.log(data);
    connection.query(sqlSentence,[data],function(err,  rows, fields){
        if (err){
            console.log("INSERT share_close_max_min ERROR", err.message);
        }else {
            console.log('write mysql share_close_max_min finished');
        }

    });

}




//==================================================================================
function getCloseMax(shareCode, callback){

    sqlSentence = "SELECT MAX(close) FROM _" + shareCode ;

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT MAX ERROR" + shareCode, err.message);
            return 0;
        }

        rowData.max = result[0]['MAX(close)'].toFixed(2);

        //console.log(rowData.max);
        callback(null);
    });

}

//==================================================================================
function getCloseMin(shareCode, callback){

    async.waterfall([
        function (callback){
            sqlSentence = "SELECT MIN(close) FROM _" + shareCode ;

            connection163.query(sqlSentence, function(err, result){
                if(err){
                    console.log("SELECT MIN ERROR" + shareCode, err.message);
                    return false;
                }

                //console.log(result[0]);
                callback(null,result[0]['MIN(close)'].toFixed(2));
            });

        },

        function (min){
            if(min <= 0){
                sqlSentence = "DELETE FROM _" + shareCode  + " WHERE close = 0";
                //console.log(sqlSentence);
                connection163.query(sqlSentence, function(err, result){
                    if(err){
                        console.log("SELECT MIN ERROR" + shareCode, err.message);
                        return false;
                    }


                    sqlSentence = "SELECT MIN(close) FROM _" + shareCode ;

                    connection163.query(sqlSentence, function(err, result){
                        if(err){
                            console.log("SELECT MIN ERROR" + shareCode, err.message);
                            return false;
                        }

                        rowData.min = result[0]['MIN(close)'].toFixed(2);
                        //console.log(rowData.min);
                        callback(null);
                    });

                });
            } else {
                rowData.min = min;
                //console.log(rowData.min);
                callback(null);
            }
        }

    ],function(err, result){

    });
}

function getCloseMaxYear(shareCode, callback){
    sqlSentence = "SELECT MAX(close) FROM _" + shareCode + " WHERE Date(date) BETWEEN " + "'" + yearStartDate + "'" + " AND " + "'" + newestDate + "'" ;

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT MAX  YEAR ERROR" + shareCode, err.message);
            return 0;
        }

        rowData.max_year = result[0]['MAX(close)'].toFixed(2);

        //console.log(rowData.max_year);
        callback(null);
    });

}

function getCloseMinYear(shareCode, callback){
    sqlSentence = "SELECT MIN(close) FROM _" + shareCode + " WHERE Date(date) BETWEEN " + "'" + yearStartDate + "'" + " AND " + "'" + newestDate + "'" ;

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT MIN YEAR ERROR" + shareCode, err.message);
            return 0;
        }

        rowData.min_year = result[0]['MIN(close)'].toFixed(2);

        //console.log(rowData.min_year);
        callback(null);
    });
}

function getCloseAverage(shareCode, callback){
    sqlSentence = "SELECT AVG(close) FROM _" + shareCode;

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT AVG(close) ERROR" + shareCode, err.message);
            return 0;
        }

        rowData.average = result[0]['AVG(close)'].toFixed(2);

        //console.log(rowData.average);
        callback(null);
    });

}

function getCloseAverageYear(shareCode, callback){
    sqlSentence = "SELECT AVG(close) FROM _" + shareCode + " WHERE Date(date) BETWEEN " + "'" + yearStartDate + "'" + " AND " + "'" + newestDate + "'" ;

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT AVG（CLOSE）YEAR ERROR" + shareCode, err.message);
            return 0;
        }

        rowData.average_year = result[0]['AVG(close)'].toFixed(2);

        //console.log(rowData.average_year);
        callback(null);
    });
}

function getCurrentValue(shareCode, callback){
    sqlSentence = "SELECT close FROM _" + shareCode + " WHERE Date(date) = " + "'" + newestDate + "'" ;

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT AVG（CLOSE）YEAR ERROR" + shareCode, err.message);
            return 0;
        }

        if(result.length){
            //console.log(result);
            rowData.current_value = result[0]['close'].toFixed(2);
        }


        //console.log(rowData.current_value);
        callback(null);
    });
}






function getBaseData(){

    getShareLive();

    getNewestDate();

}


function getRowDataArray(date, shares){
    rowDataArray.length = 0;


    var j=-1;
    var length = shares.length;
    async.whilst(
        function(){
            j++;
            return j < length;
        },

        function(callback){
            getRowData(shares[j], callback);
        },

        function(err, result){
            if(err){
                console.log(err.message);
            } else {
                console.log(' get rowDataArray finished');
                writeMySQLData(rowDataArray);

            }

        }
    );
}


function getRowData(share, callback){
    var shareCode = share[1];

    rowData.name = share[0];
    rowData.code = share[1];
    async.parallel([
            function(callback){
                getCloseMax(shareCode, callback);
            },

            function(callback){
                getCloseMin(shareCode, callback);
            },

            function(callback){
                getCloseMaxYear(shareCode, callback);
            },

            function(callback){
                getCloseMinYear(shareCode, callback);
            },

            function(callback) {
                getCloseAverage(shareCode, callback);
            },

            function(callback) {
                getCloseAverageYear(shareCode, callback);
            },

            function(callback) {
                getCurrentValue(shareCode, callback);
            }

        ],
        function(err, result){
            rowData.max_rate = (rowData.current_value / rowData.max).toFixed(4);
            rowData.min_rate = (rowData.current_value / rowData.min).toFixed(4);
            rowData.max_year_rate = (rowData.current_value / rowData.max_year).toFixed(4);
            rowData.min_year_rate = (rowData.current_value / rowData.min_year).toFixed(4);
            rowData.average_rate = (rowData.current_value / rowData.average).toFixed(4);
            rowData.average_year_rate = (rowData.current_value / rowData.average_year).toFixed(4);

            var tempArray = [];
            for(var i in rowData){
                tempArray.push(rowData[i]);
            }

            rowDataArray.push(tempArray);
            console.log("finished data index: " + rowDataArray.length);
            callback(null);
        })
}

//============================================================================================
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
        ep.emit('getShareLive',shareLive);
    });

}


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


function start() {

    //when to be use: after data be refresh
    // ep.after("updateNewestDate",1,refreshShareLive);
    // updateNewestDate();


    ep.all('getNewestDate','getShareLive',function(date,shares){
        getRowDataArray(date, shares);
    });
    getBaseData();

}

exports.start = start;