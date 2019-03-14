var express = require('express');
var async = require("async");
var router = express.Router();
var shareData = require('../lib/calculate_share_data/index');
var kLineData = require('../lib/query_k_line_data');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('main_display',{title:'ShareList'});
    //next();
});



router.post('/shareList',function(req, res, next){
    console.log("index:" + req.body.data);
    //res.send(req.body.data);
    distributeShareList(req.body.data, res);
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



function distributeShareList(type, res){
    switch(type){
        case "minRateB":
            res.send(shareData.minRateBottom800);
            break;
        case "minYearRateB":
            res.send(shareData.minYearRateBottom800);
            break;
        case "minRateT":
            res.send(shareData.minRateTop800);
            break;
        case "minYearRateT":
            res.send(shareData.minYearRateTop800);
            break;

        //NO_2: maxRate
        case "maxRateB":
            res.send(shareData.maxRateBottom800);
            break;
        case "maxYearRateB":
            res.send(shareData.maxYearRateBottom800);
            break;
        case "maxRateT":
            res.send(shareData.maxRateTop800);
            break;
        case "maxYearRateT":
            res.send(shareData.maxYearRateTop800);
            break;

        //NO_3: averageRate
        case "aveRateB":
            res.send(shareData.averageRateBottom800);
            break;
        case "aveYearRateB":
            res.send(shareData.averageYearRateBottom800);
            break;
        case "aveRateT":
            res.send(shareData.averageRateTop800);
            break;
        case "aveYearRateT":
            res.send(shareData.averageYearRateTop800);
            break;

        //NO_4: changeRateBottom
        case "chaWRateB":
            res.send(shareData.changeWeekRateBottom800);
            break;
        case "chaMRateB":
            res.send(shareData.changeMonthRateBottom800);
            break;
        case "chaSRateB":
            res.send(shareData.changeSeasonRateBottom800);
            break;
        case "chaYearRateB":
            res.send(shareData.changeYearRateBottom800);
            break;
        case "chaTwoYearRateB":
            res.send(shareData.changeTwoYearRateBottom800);
            break;
        case "chaTYearRateB":
            res.send(shareData.changeThreeYearRateBottom800);
            break;
        case "chaFYearRateB":
            res.send(shareData.changeFourYearRateBottom800);
            break;
        case "chaHYearRateB":
            res.send(shareData.changeHalfYearRateBottom800);
            break;

        //NO_5: changeRateTop
        case "chaWRateT":
            res.send(shareData.changeWeekRateTop800);
            break;
        case "chaMRateT":
            res.send(shareData.changeMonthRateTop800);
            break;
        case "chaSRateT":
            res.send(shareData.changeSeasonRateTop800);
            break;
        case "chaYearRateT":
            res.send(shareData.changeYearRateTop800);
            break;
        case "chaTwoYearRateT":
            res.send(shareData.changeTwoYearRateTop800);
            break;
        case "chaTYearRateT":
            res.send(shareData.changeThreeYearRateTop800);
            break;
        case "chaFYearRateT":
            res.send(shareData.changeFourYearRateTop800);
            break;
        case "chaHYearRateT":
            res.send(shareData.changeHalfYearRateTop800);
            break;

        //NO_6: continueDown
        case "conDownTimeB":
            res.send(shareData.continueDownTimeBottom800);
            break;
        case "conDownValueB":
            res.send(shareData.continueDownValueBottom800);
            break;
        case "conDownTimeT":
            res.send(shareData.continueDownTimeTop800);
            break;
        case "conDownValueT":
            res.send(shareData.continueDownValueTop800);
            break;

        //NO_7: continueUp
        case "conUpTimeB":
            res.send(shareData.continueUpTimeBottom800);
            break;
        case "conUpValueB":
            res.send(shareData.continueUpValueBottom800);
            break;
        case "conUpTimeT":
            res.send(shareData.continueUpTimeTop800);
            break;
        case "conUpValueT":
            res.send(shareData.continueUpValueTop800);
            break;

        //NO_8: segmentRateBottom
        case "segDownRateB":
            res.send(shareData.segmentDownRateBottom800);
            break;
        case "segDownGoalB":
            res.send(shareData.segmentDownGoalBottom800);
            break;
        case "segDownDaysB":
            res.send(shareData.segmentDownDaysBottom800);
            break;
        case "segUpRateB":
            res.send(shareData.segmentUpRateBottom800);
            break;
        case "segUpGoalB":
            res.send(shareData.segmentUpGoalBottom800);
            break;
        case "segUpDaysB":
            res.send(shareData.segmentUpDaysBottom800);
            break;

        //NO_9: segmentRateTop
        case "segDownRateT":
            res.send(shareData.segmentDownRateTop800);
            break;
        case "segDownGoalT":
            res.send(shareData.segmentDownGoalTop800);
            break;
        case "segDownDaysT":
            res.send(shareData.segmentDownDaysTop800);
            break;
        case "segUpRateT":
            res.send(shareData.segmentUpRateTop800);
            break;
        case "segUpGoalT":
            res.send(shareData.segmentUpGoalTop800);
            break;
        case "segUpDaysT":
            res.send(shareData.segmentUpDaysTop800);
            break;

        //NO_10: stableBottom
        case "staMGB":
            res.send(shareData.stableMonthGaolBottom800);
            break;
        case "staSGB":
            res.send(shareData.stableSeasonGaolBottom800);
            break;
        case "staHYearGB":
            res.send(shareData.stableHalfYearGaolBottom800);
            break;
        case "staTwoYearGB":
            res.send(shareData.stableTwoYearGaolBottom800);
            break;
        case "staTYearGB":
            res.send(shareData.stableThreeYearGaolBottom800);
            break;
        case "staFYearGB":
            res.send(shareData.stableFourYearGaolBottom800);
            break;

        //NO_11: stableTop
        case "staMGT":
            res.send(shareData.stableMonthGaolTop800);
            break;
        case "staSGT":
            res.send(shareData.stableSeasonGaolTop800);
            break;
        case "staHYearGT":
            res.send(shareData.stableHalfYearGaolTop800);
            break;
        case "staTwoYearGT":
            res.send(shareData.stableTwoYearGaolTop800);
            break;
        case "staTYearGT":
            res.send(shareData.stableThreeYearGaolTop800);
            break;
        case "staFYearGT":
            res.send(shareData.stableFourYearGaolTop800);
            break;

        //NO_12: activityBottom
        case "actMGB":
            res.send(shareData.activityMonthGaolBottom800);
            break;
        case "actSGB":
            res.send(shareData.activitySeasonGaolBottom800);
            break;
        case "actHYearGB":
            res.send(shareData.activityHalfYearGaolBottom800);
            break;
        case "actTwoYearGB":
            res.send(shareData.activityTwoYearGaolBottom800);
            break;
        case "actTYearGB":
            res.send(shareData.activityThreeYearGaolBottom800);
            break;
        case "actFYearGB":
            res.send(shareData.activityFourYearGaolBottom800);
            break;

        //NO_13: activityTop
        case "actMGT":
            res.send(shareData.activityMonthGaolTop800);
            break;
        case "actSGT":
            res.send(shareData.activitySeasonGaolTop800);
            break;
        case "actHYearGT":
            res.send(shareData.activityHalfYearGaolTop800);
            break;
        case "actTwoYearGT":
            res.send(shareData.activityTwoYearGaolTop800);
            break;
        case "actTYearGT":
            res.send(shareData.activityThreeYearGaolTop800);
            break;
        case "actFYearGT":
            res.send(shareData.activityFourYearGaolTop800);
            break;

        //NO_14: exchangeBottom
        case "exWRB":
            res.send(shareData.exchangeWeekRateBottom800);
            break;
        case "exMRB":
            res.send(shareData.exchangeMonthRateBottom800);
            break;
        case "exSRB":
            res.send(shareData.exchangeSeasonRateBottom800);
            break;
        case "exYearRB":
            res.send(shareData.exchangeYearRateBottom800);
            break;
        case "exTwoYearRB":
            res.send(shareData.exchangeTwoYearRateBottom800);
            break;
        case "exTYearRB":
            res.send(shareData.exchangeThreeYearRateBottom800);
            break;
        case "exFYearRB":
            res.send(shareData.exchangeFourYearRateBottom800);
            break;

        //NO_15: exchangeTop
        case "exWRT":
            res.send(shareData.exchangeWeekRateTop800);
            break;
        case "exMRT":
            res.send(shareData.exchangeMonthRateTop800);
            break;
        case "exSRT":
            res.send(shareData.exchangeSeasonRateTop800);
            break;
        case "exYearRT":
            res.send(shareData.exchangeYearRateTop800);
            break;
        case "exTwoYearRT":
            res.send(shareData.exchangeTwoYearRateTop800);
            break;
        case "exTYearRT":
            res.send(shareData.exchangeThreeYearRateTop800);
            break;
        case "exFYearRT":
            res.send(shareData.exchangeFourYearRateTop800);
            break;
        default:
            res.send('share list not found');
            break;
    }
}




















module.exports = router;
































