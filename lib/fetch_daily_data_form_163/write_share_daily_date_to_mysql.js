const async = require("async"),
    fs = require("fs"),
    mysql = require("mysql"),
    path = require("path"),
    csv = require("fast-csv"),
    iconv = require('iconv-lite'),
    eventproxy = require("eventproxy");

var ep = new eventproxy();

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'AGR670A4',
    port: '3306',
    database : 'share_daily_163'
});

var index = 0;
var counts = 0;


function writeMysqlData(data){
    var sqlSentence;
    var isEnd = false;

    data.shift(); //the first line is not data
    sqlSentence = "CREATE TABLE IF NOT EXISTS _" +  data[0][1]
        + " (date Date primary key, code VARCHAR(10), name VARCHAR(20), close FLOAT, high FLOAT, low FLOAT, open FLOAT,"
        + "pre_close FLOAT, change_amount FLOAT, change_rate FLOAT, exchange_rate FLOAT, "
        + "volume FLOAT, turnover FLOAT, total_value FLOAT, circulation_value FLOAT)charset utf8 collate utf8_general_ci;";

    connection.query(sqlSentence,function(err){
        if(err) {
            console.log("CREATE ERROR:", err.message);
            console.log(counts + " : "+ index + "name:" + data[0][1]);
        }
    });

    sqlSentence = "INSERT INTO _" +  data[0][1]
        + "  (date, code, name, close, high, low, open, pre_close, change_amount, change_rate,"
        + " exchange_rate, volume, turnover, total_value, circulation_value)"
        + " VALUES ?;";


    connection.query(sqlSentence,[data],function(err,  rows, fields){
        if (err){
            console.log("INSERT ERROR", err.message);
            //console.log(data);
            console.log(counts + " : "+ index + "  name:" + data[0][1]);
        }

        index++;
        console.log('counts:' + counts + ' index:' + index);
        if(index === counts) isEnd =true;

    });

    if(isEnd === true) {
        console.log(counts + " : "+ index);
        connection.end();
    }

}


function readCsvFiles(){

    counts = csvFileNames.length;

    var writeFiles = [];

    for(var i=0; i<counts; i++){
        writeFiles.push(csvFileNames[i]);
    }

    async.mapLimit(writeFiles,1,function(fileName, callback){
        readCsvFile(fileName, callback);

    },function(err, result){

    });
}



function readCsvFile(fileName, callback){

    var stream = fs.createReadStream("./daily_data/" + fileName , {encoding: 'binary'});
    var dataResult = [];

    csv
        .fromStream(stream)
        .on("data", function(data){
            dataResult.push(data);
        })
        .on("end", function(counts){
            //console.log(iconv.decode(dataResult[1][2], 'GBK'));
            getOneRowData(dataResult);
        });

    setTimeout(function() {
        callback();
    }, 1500); //足够的时间保证每次操作能完成，如何时间不够，没完成的操作将累积，最后报 javaScript heap out of memory
}


function getOneRowData(dataResult) {
    var wrongRow = [];

    for(var i=1; i<dataResult.length; i++) {
        if(dataResult[i][0].length<8){ //data type date
            //console.log(dataResult[i][0] + "index:" + i + "is not a date");
            wrongRow.push(i);
            continue;
        }

        dataResult[i][1] = dataResult[i][1].slice(1); //share code
        dataResult[i][2] = iconv.decode(dataResult[i][2], 'GBK'); //share name


        for(var t=3; t < dataResult[i].length; t++){ //share data
            if(isNaN(dataResult[i][t])) { //not a number
                //console.log(dataResult[i][t]  + " is not a number"  + " index: " + i + " , "+t);
                wrongRow.push(i);
                //console.log(wrongRow.length);
                break;
            }
        }
    }

    var length = wrongRow.length;  // operate pop will change Array length, so do not use Array length in the for clause
    for(i=0; i<length; i++){
        dataResult.splice(wrongRow.pop(),1); //此行数据有误，忽略该数据行
        //console.log(wrongRow.pop());
    }
    //console.log(wrongRow.length);

    if(dataResult.length > 1){//如果该文件没有一行正确的数据，将不写入数据库
        writeMysqlData(dataResult);
    } else {
        index++;
    }
}

var csvFileNames = [];

function getCsvFileNames() {
    var csvPath = path.resolve("./daily_data");

    fs.readdir(csvPath, function(err, files){
        if(err) {
            console.log(err);
            return;
        }

        var counts = files.length;
        var fileIndex = 1;

        files.forEach(function(fileName) {
            fs.stat(path.join(csvPath,fileName), function(err, stats){
                if (err) {
                    console.log(err);
                }

                if(stats.isFile()){
                    csvFileNames.push(fileName);
                    //console.log(fileIndex + " : " + fileName);
                } else if(stats.isDirectory()){

                }

                fileIndex++;
                if (fileIndex > counts){
                    ep.emit("getCsvFileNames");
                    //console.log(csvFileNames.length);
                }
            });
        });

    });
}


function start() {
    ep.after("getCsvFileNames",1, readCsvFiles);
    getCsvFileNames();

}

exports.start = start;