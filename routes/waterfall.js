var express = require('express');
var async = require("async");
var router = express.Router();
var shareData = require('../lib/calculate_share_data/index');
var kLineData = require('../lib/query_k_line_data');
var tableData = require('../lib/query_table_data');
var userOperate = require('../lib/share_user_operate');

const eventproxy = require("eventproxy");
var ep = new eventproxy();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('waterfall',{title:'ShareList'});
    //next();
});

router.post('/shareList',function(req, res, next){
    distriWaterfallSmallGap(req.body.data, res);
});

router.post('/shareNameCode',function(req, res, next){
    res.send(shareData.shareNameCode);
});

router.post('/optionalCodeRead', function(req,res,next){
    async.parallel([
        function(callback){
            userOperate.readUserOptionalCode(req.body.data,callback);
        }

    ],function(err,result){
        if(err){
            console.log('ERROR:' + 'readUserOptionalCode');
        }else{
            res.send(result[0]);
            //res.send(userOperate.optionalCodeArray); // not work, optionalCodeArray is empty

        }
    });

});

router.post('/optionalCodeWrite', function(req, res, next){
    //console.log(req.body.data);
     var data = req.body.data;
     // data = data.split(',');
     // console.log(data);
     var userName = data.split(',')[0];
     var codeArray = data.slice(userName.length+1);
     // console.log('userName:' + userName + " codeArray:" + codeArray);
     function callback(){}
     userOperate.writeUserOptionalCode(userName,codeArray,callback);
     res.send('success');
});


router.post('/tableData', function(req, res, next){
   async.waterfall([
       function(callback){
            tableData.queryData(req.body.data,callback);
       }
   ], function(err,result){
       if(err){
           console.log('query tableData fail');
       }else{
           res.send(tableData.tableData);
       }
   })

});

router.post('/kLineData', function(req, res, next){
    // console.log(req.body.data);
    // kLineData.queryData(req.body.data);
    // res.send('11');
    async.waterfall([
        function(callback){
            kLineData.queryData(req.body.data, callback);
        }

    ],function(err, result){
        if(err){
            console.log('query KLineData fail');
        }else{
            res.send(kLineData.kLineData);
        }

    })

});


function distriWaterfallSmallGap(type, res){
    switch(type){
        case "day2":
            res.send(shareData.waterfallDay2);
            break;
        case "day3":
            res.send(shareData.waterfallDay3);
            break;
        case "day4":
            res.send(shareData.waterfallDay4);
            break;
        case "day5":
            res.send(shareData.waterfallDay5);
            break;
        case "day6":
            res.send(shareData.waterfallDay6);
            break;
        case "day7":
            res.send(shareData.waterfallDay7);
            break;
        case "day8":
            res.send(shareData.waterfallDay8);
            break;
        case "day9":
            res.send(shareData.waterfallDay9);
            break;
        case "day10":
            res.send(shareData.waterfallDay10);
            break;
        case "day30":
            res.send(shareData.waterfallDay30);
            break;
        case "day90":
            res.send(shareData.waterfallDay90);
            break;
        case "day180":
            res.send(shareData.waterfallDay180);
            break;
        case "day360":
            res.send(shareData.waterfallDay360);
            break;
        default:
            res.send('share list not found');
            break;
    }
}




















module.exports = router;
































