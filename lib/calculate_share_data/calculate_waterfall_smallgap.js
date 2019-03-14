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

var waterfallDay2 = [];
var waterfallDay3 = [];
var waterfallDay4 = [];
var waterfallDay5 = [];
var waterfallDay6 = [];
var waterfallDay7 = [];
var waterfallDay8 = [];
var waterfallDay9 = [];
var waterfallDay10 = [];
var waterfallDay30 = [];
var waterfallDay90 = [];
var waterfallDay180 = [];
var waterfallDay360 = [];
var shareNameCode = [];

function readWaterfallSmallGapArray(option, dataArray, callback){
    sqlSentence = "SELECT name,code," + option + " FROM small_gap ORDER BY "+ option +" ASC LIMIT 800";

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("ERROR:" + option , err.message);
            return 0;
        }

        //console.log(result);
        var i;
        dataArray.length = 0;
        var name, code, rate;
        for(i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i][option];
            dataArray.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

function readShareNameCode(callback){
    sqlSentence = "SELECT name,code FROM small_gap";

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("ERROR: ", err.message);
            return 0;
        }

        //console.log(result);
        var i;
        shareNameCode.length = 0;
        var name, code, rate;
        for(i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            shareNameCode.push([code,name]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

function readAllWaterfallSmallGapArray(){
    async.parallel([
        function(callback){
            readWaterfallSmallGapArray('day2',waterfallDay2,callback);
        },

        function(callback){
            readWaterfallSmallGapArray('day3',waterfallDay3,callback);
        },

        function(callback){
            readWaterfallSmallGapArray('day4',waterfallDay4,callback);
        },

        function(callback){
            readWaterfallSmallGapArray('day5',waterfallDay5,callback);
        },

        function(callback){
            readWaterfallSmallGapArray('day6',waterfallDay6,callback);
        },

        function(callback){
            readWaterfallSmallGapArray('day7',waterfallDay7,callback);
        },

        function(callback){
            readWaterfallSmallGapArray('day8',waterfallDay8,callback);
        },

        function(callback){
            readWaterfallSmallGapArray('day9',waterfallDay9,callback);
        },

        function(callback){
            readWaterfallSmallGapArray('day10',waterfallDay10,callback);
        },

        function(callback){
            readWaterfallSmallGapArray('day30',waterfallDay30,callback);
        },

        function(callback){
            readWaterfallSmallGapArray('day90',waterfallDay90,callback);
        },

        function(callback){
            readWaterfallSmallGapArray('day180',waterfallDay180,callback);
        },

        function(callback){
            readWaterfallSmallGapArray('day360',waterfallDay360,callback);
        },

        function(callback){
            readShareNameCode(callback);
        }


    ],function(err){
       // console.log(waterfallDay30);
    })
}

function start(){
    readAllWaterfallSmallGapArray();
}

exports.start = start;


exports.waterfallDay2 = waterfallDay2;
exports.waterfallDay3 = waterfallDay3;
exports.waterfallDay4 = waterfallDay4;
exports.waterfallDay5 = waterfallDay5;
exports.waterfallDay6 = waterfallDay6;
exports.waterfallDay7 = waterfallDay7;
exports.waterfallDay8 = waterfallDay8;
exports.waterfallDay9 = waterfallDay9;
exports.waterfallDay10 = waterfallDay10;
exports.waterfallDay30 = waterfallDay30;
exports.waterfallDay90 = waterfallDay90;
exports.waterfallDay180 = waterfallDay180;
exports.waterfallDay360 = waterfallDay360;
exports.shareNameCode = shareNameCode;