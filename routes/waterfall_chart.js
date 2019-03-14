var express = require('express');
var async = require("async");
var router = express.Router();
var waterfallData = require('../lib/waterfall_table_mysql');
//var waterfallTablePage = require('./routes/waterfall_table');
var app = require('../app');

const eventproxy = require("eventproxy");
var ep = new eventproxy();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('waterfall_chart',{title:'ShareList'});
    //next();
});

router.get('/gap_min_table', function(req, res, next) {
    next();
});


router.post('/scatterData', function(req, res, next){
    var dataArray,sentence;
    dataArray=req.body.data.split(',');
    var gap = dataArray[0];
    var min = dataArray[1];
    var xValue = dataArray[2];
    var yValue = dataArray[3];
    var condition = dataArray[4];
    var content1 = dataArray[5];
    var content2 = dataArray[6];
    var conditionSentence = getScatterSentenceCondition(condition,content1,content2);
    sentence = 'SELECT ' + getSentenceString(xValue) + ',' + getSentenceString(yValue)
        +' FROM ' + 'gap' + gap + '_min' + min + ' WHERE ' + conditionSentence;
    //console.log(sentence);
    async.waterfall([
        function(callback){
            waterfallData.queryScatterData(sentence,callback);
        }
    ], function(err,result){
        if(err){
            console.log('query tableData fail');
        }else{
            res.send(waterfallData.scatterData);
        }
    })

});

function getScatterSentenceCondition(condition,value1,value2){
    if(value2 === 'left'){
        return getSentenceString(condition) + ' < ' + value1;
    }else if(value2 === 'right'){
        return getSentenceString(condition) + ' > ' + value1;
    }else{

        return value1 + ' >= ' + getSentenceString(condition) + ' AND '  + getSentenceString(condition) + ' > ' + value2;
    }
}

function getSentenceString(index){
    var sentence;
    switch (parseInt(index)){
        case -1:
            sentence = 'sum_rate';
            break;
        case 0:
            sentence = 'min_rate';
            break;
        case 1:
            sentence = 'avg_rate';
            break;
        case 2:
            sentence = 'max_rate';
            break;
        case 3:
            sentence = 'rate_sum3';
            break;
        case 5:
            sentence = 'rate_sum5';
            break;
        case 10:
            sentence = 'rate_sum10';
            break;
        case 20:
            sentence = 'rate_sum20';
            break;
        case 30:
            sentence = 'rate_sum30';
            break;
        case 60:
            sentence = 'rate_sum60';
            break;
        case 90:
            sentence = 'rate_sum90';
            break;
        case -30:
            sentence = 'pre_rate30';
            break;
        case -90:
            sentence = 'pre_rate90';
            break;
        case -180:
            sentence = 'pre_rate180';
            break;
        case -360:
            sentence = 'pre_rate360';
            break;
        case -500:
            sentence = 'pre_rate500';
            break;
        case 11:
            sentence = 'min';
            break;
        case 12:
            sentence = 'max';
            break;
        case 13:
            sentence = 'avg';
            break;
        case 14:
            sentence = 'current';
            break;
        case 15:
            sentence = 'continuous';
            break;
        case 16:
            sentence = 'start_date';
            break;
        case 17:
            sentence = 'end_date';
            break;
        case 18:
            sentence = 'code';
            break;
        case 19:
            sentence = 'name';
            break;
        default:
            sentence = 'current';
            break;
    }
    return sentence;
}






module.exports = router;