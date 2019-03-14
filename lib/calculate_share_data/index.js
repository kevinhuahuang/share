var closeMaxMin  =  require('./share_close_max_min');
var changeMaxMin = require('./share_change_rate');
var exchangeMaxMin = require('./share_exchange_rate');
var shareWaterfall = require('./share_waterfall');
var shareWaterfallNewest = require('./share_waterfall_newest');
var calculateMaxMin = require('./calculate_share_max_min');
var calculateWaterfallSmallGap = require('./calculate_waterfall_smallgap');





function start(){
    //first_step: update database: share_max_min
    //  closeMaxMin.start();
    //  changeMaxMin.start();
    //  exchangeMaxMin.start();
    //  shareWaterfall.start();
    //  shareWaterfallNewest.start();
    //
    // //second_step: get data form database: share_max_min
    // calculateMaxMin.start();
    calculateWaterfallSmallGap.start();
}

start();

// exports.closeMaxMin = closeMaxMin.start();
// exports.changeMaxMin = changeMaxMin.start();
// exports.exchangeMaxMin = exchangeMaxMin.start();
 exports.calculateMaxMin = calculateMaxMin.start;
 exports.calculateWaterfallSmallGap = calculateWaterfallSmallGap.start;

//NO_1: minRate
exports.minRateBottom800 = calculateMaxMin.minRateBottom800;
exports.minYearRateBottom800 = calculateMaxMin.minYearRateBottom800;
exports.minRateTop800 = calculateMaxMin.minRateTop800;
exports.minYearRateTop800 = calculateMaxMin.minYearRateTop800;

//NO_2: maxRate
exports.maxRateBottom800 = calculateMaxMin.maxRateBottom800;
exports.maxYearRateBottom800 = calculateMaxMin.maxYearRateBottom800;
exports.maxRateTop800 = calculateMaxMin.maxRateTop800;
exports.maxYearRateTop800 = calculateMaxMin.maxYearRateTop800;

//NO_3: averageRate
exports.averageRateBottom800 = calculateMaxMin.averageRateBottom800;
exports.averageYearRateBottom800 = calculateMaxMin.averageYearRateBottom800;
exports.averageRateTop800 = calculateMaxMin.averageRateTop800;
exports.averageYearRateTop800 = calculateMaxMin.averageYearRateTop800;

//NO_4: changeRateBottom
exports.changeWeekRateBottom800 = calculateMaxMin.changeWeekRateBottom800;
exports.changeMonthRateBottom800 = calculateMaxMin.changeMonthRateBottom800;
exports.changeSeasonRateBottom800 = calculateMaxMin.changeSeasonRateBottom800;
exports.changeYearRateBottom800 = calculateMaxMin.changeYearRateBottom800;
exports.changeTwoYearRateBottom800 = calculateMaxMin.changeTwoYearRateBottom800;
exports.changeThreeYearRateBottom800 = calculateMaxMin.changeThreeYearRateBottom800;
exports.changeFourYearRateBottom800 = calculateMaxMin.changeFourYearRateBottom800;
exports.changeHalfYearRateBottom800 = calculateMaxMin.changeHalfYearRateBottom800;

//NO_5: changeRateTop
exports.changeWeekRateTop800 = calculateMaxMin.changeWeekRateTop800;
exports.changeMonthRateTop800 = calculateMaxMin.changeMonthRateTop800;
exports.changeSeasonRateTop800 = calculateMaxMin.changeSeasonRateTop800;
exports.changeYearRateTop800 = calculateMaxMin.changeYearRateTop800;
exports.changeTwoYearRateTop800 = calculateMaxMin.changeTwoYearRateTop800;
exports.changeThreeYearRateTop800 = calculateMaxMin.changeThreeYearRateTop800;
exports.changeFourYearRateTop800 = calculateMaxMin.changeFourYearRateTop800;
exports.changeHalfYearRateTop800 = calculateMaxMin.changeHalfYearRateTop800;

//NO_6: continueDown
exports.continueDownTimeBottom800 = calculateMaxMin.continueDownTimeBottom800;
exports.continueDownValueBottom800 = calculateMaxMin.continueDownValueBottom800;
exports.continueDownTimeTop800 = calculateMaxMin.continueDownTimeTop800;
exports.continueDownValueTop800 = calculateMaxMin.continueDownValueTop800;

//NO_7: continueUp
exports.continueUpTimeBottom800 = calculateMaxMin.continueUpTimeBottom800;
exports.continueUpValueBottom800 = calculateMaxMin.continueUpValueBottom800;
exports.continueUpTimeTop800 = calculateMaxMin.continueUpTimeTop800;
exports.continueUpValueTop800 = calculateMaxMin.continueUpValueTop800;

//NO_8: segmentRateBottom
exports.segmentDownRateBottom800 = calculateMaxMin.segmentDownRateBottom800;
exports.segmentDownGoalBottom800 = calculateMaxMin.segmentDownGoalBottom800;
exports.segmentDownDaysBottom800 = calculateMaxMin.segmentDownDaysBottom800;
exports.segmentUpRateBottom800 = calculateMaxMin.segmentUpRateBottom800;
exports.segmentUpGoalBottom800 = calculateMaxMin.segmentUpGoalBottom800;
exports.segmentUpDaysBottom800 = calculateMaxMin.segmentUpDaysBottom800;

//NO_9: segmentRateTop
exports.segmentDownRateTop800 = calculateMaxMin.segmentDownRateTop800;
exports.segmentDownGoalTop800 = calculateMaxMin.segmentDownGoalTop800;
exports.segmentDownDaysTop800 = calculateMaxMin.segmentDownDaysTop800;
exports.segmentUpRateTop800 = calculateMaxMin.segmentUpRateTop800;
exports.segmentUpGoalTop800 = calculateMaxMin.segmentUpGoalTop800;
exports.segmentUpDaysTop800 = calculateMaxMin.segmentUpDaysTop800;

//NO_10: stableBottom
exports.stableMonthGaolBottom800 = calculateMaxMin.stableMonthGaolBottom800;
exports.stableSeasonGaolBottom800 = calculateMaxMin.stableSeasonGaolBottom800;
exports.stableHalfYearGaolBottom800 = calculateMaxMin.stableHalfYearGaolBottom800;
exports.stableTwoYearGaolBottom800 = calculateMaxMin.stableTwoYearGaolBottom800;
exports.stableThreeYearGaolBottom800 = calculateMaxMin.stableThreeYearGaolBottom800;
exports.stableFourYearGaolBottom800 = calculateMaxMin.stableFourYearGaolBottom800;

//NO_11: stableTop
exports.stableMonthGaolTop800 = calculateMaxMin.stableMonthGaolTop800;
exports.stableSeasonGaolTop800 = calculateMaxMin.stableSeasonGaolTop800;
exports.stableHalfYearGaolTop800 = calculateMaxMin.stableHalfYearGaolTop800;
exports.stableTwoYearGaolTop800 = calculateMaxMin.stableTwoYearGaolTop800;
exports.stableThreeYearGaolTop800 = calculateMaxMin.stableThreeYearGaolTop800;
exports.stableFourYearGaolTop800 = calculateMaxMin.stableFourYearGaolTop800;

//NO_12: activityBottom
exports.activityMonthGaolBottom800 = calculateMaxMin.activityMonthGaolBottom800;
exports.activitySeasonGaolBottom800 = calculateMaxMin.activitySeasonGaolBottom800;
exports.activityHalfYearGaolBottom800 = calculateMaxMin.activityHalfYearGaolBottom800;
exports.activityTwoYearGaolBottom800 = calculateMaxMin.activityTwoYearGaolBottom800;
exports.activityThreeYearGaolBottom800 = calculateMaxMin.activityThreeYearGaolBottom800;
exports.activityFourYearGaolBottom800 = calculateMaxMin.activityFourYearGaolBottom800;

//NO_13: activityTop
exports.activityMonthGaolTop800 = calculateMaxMin.activityMonthGaolTop800;
exports.activitySeasonGaolTop800 = calculateMaxMin.activitySeasonGaolTop800;
exports.activityHalfYearGaolTop800 = calculateMaxMin.activityHalfYearGaolTop800;
exports.activityTwoYearGaolTop800 = calculateMaxMin.activityTwoYearGaolTop800;
exports.activityThreeYearGaolTop800 = calculateMaxMin.activityThreeYearGaolTop800;
exports.activityFourYearGaolTop800 = calculateMaxMin.activityFourYearGaolTop800;

//NO_14: exchangeBottom
exports.exchangeWeekRateBottom800 = calculateMaxMin.exchangeWeekRateBottom800;
exports.exchangeMonthRateBottom800 = calculateMaxMin.exchangeMonthRateBottom800;
exports.exchangeSeasonRateBottom800 = calculateMaxMin.exchangeSeasonRateBottom800;
exports.exchangeYearRateBottom800 = calculateMaxMin.exchangeYearRateBottom800;
exports.exchangeTwoYearRateBottom800 = calculateMaxMin.exchangeTwoYearRateBottom800;
exports.exchangeThreeYearRateBottom800 = calculateMaxMin.exchangeThreeYearRateBottom800;
exports.exchangeFourYearRateBottom800 = calculateMaxMin.exchangeFourYearRateBottom800;

//NO_15: exchangeTop
exports.exchangeWeekRateTop800 = calculateMaxMin.exchangeWeekRateTop800;
exports.exchangeMonthRateTop800 = calculateMaxMin.exchangeMonthRateTop800;
exports.exchangeSeasonRateTop800 = calculateMaxMin.exchangeSeasonRateTop800;
exports.exchangeYearRateTop800 = calculateMaxMin.exchangeYearRateTop800;
exports.exchangeTwoYearRateTop800 = calculateMaxMin.exchangeTwoYearRateTop800;
exports.exchangeThreeYearRateTop800 = calculateMaxMin.exchangeThreeYearRateTop800;
exports.exchangeFourYearRateTop800 = calculateMaxMin.exchangeFourYearRateTop800;




//==================================================
//share_waterfall_small_gap
exports.waterfallDay2 = calculateWaterfallSmallGap.waterfallDay2;
exports.waterfallDay3 = calculateWaterfallSmallGap.waterfallDay3;
exports.waterfallDay4 = calculateWaterfallSmallGap.waterfallDay4;
exports.waterfallDay5 = calculateWaterfallSmallGap.waterfallDay5;
exports.waterfallDay6 = calculateWaterfallSmallGap.waterfallDay6;
exports.waterfallDay7 = calculateWaterfallSmallGap.waterfallDay7;
exports.waterfallDay8 = calculateWaterfallSmallGap.waterfallDay8;
exports.waterfallDay9 = calculateWaterfallSmallGap.waterfallDay9;
exports.waterfallDay10 = calculateWaterfallSmallGap.waterfallDay10;
exports.waterfallDay30 = calculateWaterfallSmallGap.waterfallDay30;
exports.waterfallDay90 = calculateWaterfallSmallGap.waterfallDay90;
exports.waterfallDay180 = calculateWaterfallSmallGap.waterfallDay180;
exports.waterfallDay360 = calculateWaterfallSmallGap.waterfallDay360;


exports.shareNameCode = calculateWaterfallSmallGap.shareNameCode;
















