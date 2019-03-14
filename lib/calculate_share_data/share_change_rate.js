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
    code        : '',
    name        : '',
    weekRate    : 0,
    monthRate   : 0,
    seasonRate  : 0,
    halfYearRate: 0,
    oneYearRate : 0,
    twoYearRate : 0,
    threeYearRate:      0,
    fourYearRate :      0,
    continueDownTime:   0,
    continueDownValue:  0,
    continueUpTime:     0,
    continueUpValue:    0,
    segmentDownRate:    0,
    segmentDownGoal:    0,
    segmentDownDays:    0,
    segmentUpRate :     0,
    segmentUpGoal :     0,
    segmentUpDays :     0,
    stableMonthGoal:    0,
    stableSeasonGoal:   0,
    stableHalfYearGoal: 0,
    stableYearGoal:     0,
    stableTwoYearGoal:  0,
    stableThreeYearGoal:0,
    stableFourYearGoal :0,
    activityMonthGoal:   0,
    activitySeasonGoal:  0,
    activityHalfYearGoal:0,
    activityYearGoal:    0,
    activityTwoYearGoal: 0,
    activityThreeYearGoal:0,
    activityFourYearGoal :0
};


function writeMySQLData(data) {

    sqlSentence = "DROP TABLE IF EXISTS share_change_rate_list";

    connection.query(sqlSentence,function(err){
        if(err){
            console.log("DROP TABLE FAIL", err.message);
        }

    });


    sqlSentence = "CREATE TABLE IF NOT EXISTS share_change_rate_list"
        + " (code VARCHAR(10) PRIMARY KEY, name VARCHAR(20),"
        +   "weekRate FLOAT, monthRate FLOAT, seasonRate FLOAT, halfYearRate FLOAT,"
        +    "oneYearRate FLOAT, twoYearRate FLOAT, threeYearRate FLOAT, fourYearRate FLOAT,"
        +    "continueDownTime FLOAT, continueDownValue FLOAT, "
        +    "continueUpTime FLOAT, continueUpValue FLOAT,"
        +    "segmentDownRate FLOAT, segmentDownGoal FLOAT, segmentDownDays FLOAT, "
        +    "segmentUpRate FLOAT, segmentUpGoal FLOAT, segmentUpDays FLOAT, "
        +    "stableMonthGoal FLOAT, stableSeasonGoal FLOAT, stableHalfYearGoal FLOAT, "
        +    "stableYearGoal FLOAT, stableTwoYearGoal FLOAT, stableThreeYearGoal FLOAT, stableFourYearGoal FLOAT, "
        +    "activityMonthGoal FLOAT, activitySeasonGoal FLOAT, activityHalfYearGoal FLOAT, "
        +    "activityYearGoal FLOAT, activityTwoYearGoal FLOAT, activityThreeYearGoal FLOAT, activityFourYearGoal FLOAT"
        +     ")charset utf8 collate utf8_general_ci";

    //console.log(sqlSentence);
    connection.query(sqlSentence,function(err){
        if(err) {
            console.log("CREATE ERROR:", err.message);
        }
    });

    sqlSentence = "INSERT INTO share_change_rate_list"
        + " (code, name,"
        +   "weekRate, monthRate, seasonRate, halfYearRate,"
        +    "oneYearRate, twoYearRate, threeYearRate, fourYearRate,"
        +    "continueDownTime, continueDownValue, "
        +    "continueUpTime, continueUpValue,"
        +    "segmentDownRate, segmentDownGoal, segmentDownDays,"
        +    "segmentUpRate, segmentUpGoal, segmentUpDays,"
        +    "stableMonthGoal, stableSeasonGoal, stableHalfYearGoal,"
        +    "stableYearGoal, stableTwoYearGoal, stableThreeYearGoal, stableFourYearGoal,"
        +    "activityMonthGoal, activitySeasonGoal, activityHalfYearGoal, "
        +    "activityYearGoal, activityTwoYearGoal, activityThreeYearGoal, activityFourYearGoal)"
        +   " VALUES ?;";

    //console.log(sqlSentence);
    connection.query(sqlSentence,[data],function(err,  rows, fields){
        if (err){
            console.log("INSERT share_change_rate_list Error", err.message);
        }else {
            console.log('write mysql share_change_rate_list finished');
        }

    });

}


function getYearChangeRate(shareCode, startDate, endDate, callback){
    sqlSentence = "SELECT SUM(change_rate) FROM _" + shareCode + " WHERE Date(date) BETWEEN " + "'" + startDate + "'" + " AND " + "'" + endDate + "'" ;

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT SUM(change_rate) YEAR ERROR" + shareCode, err.message);
            return 0;
        }


        //console.log(result);
        callback(null,result[0]['SUM(change_rate)']);
    });
}


function getDaysChangeRate(shareCode,days,callback){
    sqlSentence = "SELECT change_rate FROM _" + shareCode +  " ORDER BY Date(date) DESC " + " LIMIT " + days;

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT SUM(change_rate) YEAR ERROR" + shareCode, err.message);
            return 0;
        }

        var totalRate=0;
        for(var i=0; i<result.length; i++){
            totalRate = totalRate + result[i]['change_rate'];
        }



        //console.log(totalRate);
        if(callback){
            callback(null,result[0]['SUM(change_rate)']);
        }
    });
}


function getChangeRate(shareCode, callback){
    async.parallel([
        function(callback){
            getYearChangeRate(shareCode, weekStartDate, newestDate, callback);
        },

        function(callback){
            getYearChangeRate(shareCode, monthStartDate, newestDate, callback);
        },

        function(callback){
            getYearChangeRate(shareCode, seasonStartDate, newestDate, callback);
        },

        function(callback){
            getYearChangeRate(shareCode, halfYearStartDate, newestDate, callback);
        },

        function(callback){
            getYearChangeRate(shareCode, yearStartDate, newestDate, callback);
        },

        function(callback){
            getYearChangeRate(shareCode, twoYearStartDate, newestDate, callback);
        },

        function(callback){
            getYearChangeRate(shareCode, threeYearStartDate, newestDate, callback);
        },

        function(callback){
            getYearChangeRate(shareCode, fourYearStartDate, newestDate, callback);
        }
    ], function(err, result){
        if(err){

        }else{
            callback(null,result);
        }
    })
}

function getContinuedUp(shareCode, baseDownValue,baseUpValue, rangeDays, isFromNow, isOrder, callback){
    sqlSentence = "SELECT change_rate FROM _" + shareCode + " ORDER BY Date(date) DESC " + " LIMIT " + rangeDays;

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_rate up ERROR" + shareCode, err.message);
            return 0;
        }

        //console.log(result);
        var tempArray = [];
        var downArray = [];
        var upArray = [];
        var down=0, up=0,  totalValue=0;
        for(var i=0; i<result.length; i++){
            if(isOrder){
                tempArray.unshift(result[i]['change_rate']);
            } else {
                tempArray.push(result[i]['change_rate']);
            }
        }

        for(i=0; i<tempArray.length; i++){
            totalValue = totalValue + tempArray[i];
            if(tempArray[i] > 0){
                if(tempArray[i] > baseUpValue){
                    up++;
                    upArray.push(tempArray[i]);
                }
            }else{
                if(Math.abs(tempArray[i]) < baseDownValue){
                    down++;
                    downArray.push(tempArray[i]);
                    if(isFromNow){
                        break;
                    }

                    if(up>0){
                        break;
                    }
                }

                if(totalValue < -10){
                    break;
                }

            }
        }


        // console.log(totalValue);
        // console.log(downArray + " days: " + down);
        // console.log(upArray + " days: " + up);
        //console.log(tempArray);
        callback(null, up, totalValue);
    });
}


function getContinuedDown(shareCode, baseDownValue,baseUpValue, rangeDays, isFromNow, isOrder,callback){
    sqlSentence = "SELECT change_rate FROM _" + shareCode + " ORDER BY Date(date) DESC " + " LIMIT " + rangeDays;

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_rate up ERROR" + shareCode, err.message);
            return 0;
        }

        var tempArray = [];
        var downArray = [];
        var upArray = [];
        var down=0,up=0;
        for(var i=0; i<result.length; i++){
            if(isOrder){
                tempArray.unshift(result[i]['change_rate']);
            } else {
                tempArray.push(result[i]['change_rate']);
            }
        }

        var totalValue = 0;
        for(i=0; i<tempArray.length; i++){
            totalValue = totalValue + tempArray[i];
            if(tempArray[i] < 0){
                if(tempArray[i] < baseDownValue){
                    down++;
                    downArray.push(tempArray[i]);
                }
            }else{
                if(tempArray[i] > baseUpValue){
                    up++;
                    upArray.push(tempArray[i]);
                    if(isFromNow){
                        break;
                    }

                    if(down>0){
                        break;
                    }
                }

                if(totalValue > 10){
                    break;
                }
            }
        }

        //console.log(totalValue);
        //console.log('down: ' + downArray + " days: " + down);
        //console.log('up: ' + upArray + " days: " + up);
        //console.log(tempArray);
        callback(null, down, totalValue);
    });
}


function judgeShareDownStatus(shareCode, baseDownValue, baseUpValue, rangeDays, isOrder, callback) {


    sqlSentence = "SELECT change_rate FROM _" + shareCode + " ORDER BY Date(date) DESC " + " LIMIT " + rangeDays;

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function (err, result) {
        if (err) {
            console.log("SELECT change_rate up ERROR" + shareCode, err.message);
            return 0;
        }

        var rateTemp = 0, totalRate=0;
        var rateArray = [];
        var segmentRate = [];
        var segmentRates = [];
        var segmentRateArray = [];
        for(var i=0; i<result.length; i++){
            if(isOrder){
                rateArray.unshift(result[i]['change_rate']);
            } else {
                rateArray.push(result[i]['change_rate']);
            }
        }

        for(i=0; i<rateArray.length; i++){
            rateTemp = rateTemp + rateArray[i];
            totalRate = totalRate + rateArray[i];
            segmentRate.push(rateArray[i]);
            if(rateTemp > baseUpValue){
                segmentRateArray.push(segmentRate);
                segmentRates.push([rateTemp,  segmentRate.length]);
                rateTemp = 0;
                segmentRate = []; /* don't code it like this : segmentRate.length = 0;
                                   * we need the new Array to transfer into segmentRateArray*/
            }else if(rateTemp < baseDownValue){
                segmentRateArray.push(segmentRate);
                segmentRates.push([rateTemp,  segmentRate.length]);
                rateTemp = 0;
                segmentRate = []; /* don't code it like this : segmentRate.length = 0;
                                   * we need the new Array to transfer into segmentRateArray*/
            }
            if(i===rateArray.length-1){
                segmentRates.push([rateTemp,  segmentRate.length]);
                segmentRateArray.push(segmentRate);
            }
        }
        //console.log(totalRate);

        var downTimes = 0, days=0;
        var segmentTotalRate = 0;
        for(i=segmentRates.length-1; i>=0; i--){
            if(segmentRates[i][0] > 0){
                if(segmentRates[i][0] > 20){
                    break;
                } else {
                    downTimes = downTimes - segmentRates[i][0]*0.05;
                }
            } else {
                downTimes = downTimes -  segmentRates[i][0]*0.05;
            }

            segmentTotalRate = segmentTotalRate + segmentRates[i][0];
            days = days + segmentRates[i][1];
        }
        //console.log("down total rate:" + segmentTotalRate + "   down time:" + downTimes + "   days:" + days);
        //console.log(segmentRates);
        callback(null, segmentTotalRate, downTimes, days);

    });
}


function judgeShareUpStatus(shareCode, baseDownValue, baseUpValue, rangeDays, isOrder, callback) {

    sqlSentence = "SELECT change_rate FROM _" + shareCode + " ORDER BY Date(date) DESC " + " LIMIT " + rangeDays;

    //console.log(sqlSentence);

    connection163.query(sqlSentence, function (err, result) {
        if (err) {
            console.log("SELECT change_rate up ERROR" + shareCode, err.message);
            return 0;
        }

        var rateTemp = 0, totalRate=0;
        var rateArray = [];
        var segmentRate = [];
        var segmentRates = [];
        var segmentRateArray = [];
        for(var i=0; i<result.length; i++){
            if(isOrder){
                rateArray.unshift(result[i]['change_rate']);
            } else {
                rateArray.push(result[i]['change_rate']);
            }
        }

        for(i=0; i<rateArray.length; i++){
            rateTemp = rateTemp + rateArray[i];
            totalRate = totalRate + rateArray[i];
            segmentRate.push(rateArray[i]);
            if(rateTemp > baseUpValue){
                segmentRateArray.push(segmentRate);
                segmentRates.push([rateTemp,  segmentRate.length]);
                rateTemp = 0;
                segmentRate = []; /* don't code it like this : segmentRate.length = 0;
                                   * we need the new Array to transfer into segmentRateArray*/
            }else if(rateTemp < baseDownValue){
                segmentRateArray.push(segmentRate);
                segmentRates.push([rateTemp,  segmentRate.length]);
                rateTemp = 0;
                segmentRate = []; /* don't code it like this : segmentRate.length = 0;
                                   * we need the new Array to transfer into segmentRateArray*/
            }
            if(i===rateArray.length-1){
                segmentRates.push([rateTemp,  segmentRate.length]);
                segmentRateArray.push(segmentRate);
            }
        }
        //console.log(totalRate);

        var days=0, upTimes=0;
        var segmentTotalRate = 0;

        for(i=segmentRates.length-1; i>=0; i--){
            if(segmentRates[i][0] < 0){
                if(segmentRates[i][0] < -20){
                    break;
                } else {
                    upTimes = upTimes + segmentRates[i][0]*0.05;
                }
            } else {
                upTimes = upTimes + segmentRates[i][0]*0.05;
            }

            segmentTotalRate = segmentTotalRate + segmentRates[i][0];
            days = days + segmentRates[i][1];
        }

        //console.log("up total rate:" + segmentTotalRate + "   up time:" + downTimes + "   days:" + days);
        //console.log(segmentRates);
        callback(null, segmentTotalRate, upTimes, days);
    });
}


function getStableAndActivityGoal(shareCode,callback){
    //month = 20 days; season = 60 days; half_year = 120 days; year = 240 days; four_years =  960 days;
    var monthDays = 20,
        seasonDays = 60,
        halfYearDays = 120,
        yearDays = 240,
        twoYearDays = 480,
        threeYearDays = 720,
        fourYearDays = 960;

    sqlSentence = "SELECT change_rate FROM _" + shareCode + " ORDER BY Date(date) DESC " + " LIMIT 960";

    //console.log(sqlSentence);

    var i,
        rateArray = [],
        rateIntArray = [];


    connection163.query(sqlSentence, function (err, result) {
        if (err) {
            console.log("SELECT change_rate up ERROR" + shareCode, err.message);
            return 0;
        }

        for(i=0; i< result.length; i++){
            rateArray.push(result[i]['change_rate']);
        }

        for(i=0; i< rateArray.length; i++){
            rateIntArray.push(Math.ceil(rateArray[i]));
        }

        async.parallel([
            function(callback){
                getStableGoal(rateArray, monthDays, callback);
            },

            function(callback){
                getStableGoal(rateArray, seasonDays, callback);
            },

            function(callback){
                getStableGoal(rateArray, halfYearDays, callback);
            },

            function(callback){
                getStableGoal(rateArray, yearDays, callback);
            },

            function(callback){
                getStableGoal(rateArray, twoYearDays, callback);
            },

            function(callback){
                getStableGoal(rateArray, threeYearDays, callback);
            },

            function(callback){
                getStableGoal(rateArray, fourYearDays, callback);
            },

            function(callback){
                getActivityGoal(rateIntArray, monthDays, callback);
            },

            function(callback){
                getActivityGoal(rateIntArray, seasonDays, callback);
            },

            function(callback){
                getActivityGoal(rateIntArray, halfYearDays, callback);
            },

            function(callback){
                getActivityGoal(rateIntArray, yearDays, callback);
            },
            function(callback){
                getActivityGoal(rateIntArray, twoYearDays, callback);
            },

            function(callback){
                getActivityGoal(rateIntArray, threeYearDays, callback);
            },

            function(callback){
                getActivityGoal(rateIntArray, fourYearDays, callback);
            }

        ], function(err, result){
            if(err){

            }else{
                //console.log(result);
                callback(null,result);
            }
        });

    });

}

function getActivityGoal(rateArray, days, callback){
    var activityGoal = 0;
    //console.log(rateArray);
    for(var i=0; i<days; i++){
        switch(Math.abs(rateArray[i])){
            case 11:
                activityGoal = activityGoal + 15;
                break;
            case 10:
                activityGoal = activityGoal + 12;
                break;
            case 9:
                activityGoal = activityGoal + 9;
                break;
            case 8:
                activityGoal = activityGoal + 7;
                break;
            case 7:
                activityGoal = activityGoal + 5;
                break;
            case 6:
                activityGoal = activityGoal + 3;
                break;
            case 5:
                activityGoal = activityGoal + 2;
                break;
            case 4:
                activityGoal = activityGoal + 1;
                break;
            case 3:
                activityGoal = activityGoal - 1;
                break;
            case 2:
                activityGoal = activityGoal - 2;
                break;
            case 1:
                activityGoal = activityGoal - 3;
                break;
            default:
                break;
        }
        //console.log(rateArray[i] + " : " + activityGoal)
    }

    callback(null, activityGoal);
}


function getStableGoal(rateArray, days, callback){
    var totalRateValue = 0,
    stableGoal = 0,
    normalCounts = 0,
    unusualCounts = 0;
    for(var i=0; i<days; i++){
        totalRateValue = totalRateValue + rateArray[i];
        if(Math.abs(totalRateValue) > 25){
            unusualCounts++;
            stableGoal = stableGoal - 5*unusualCounts;
            if(totalRateValue > 0){
                totalRateValue = totalRateValue - 5*unusualCounts;
            }else{
                totalRateValue = totalRateValue + 5*unusualCounts;
            }
            normalCounts = 0;
        }

        normalCounts = normalCounts + 5;
        if(normalCounts > 100){
            stableGoal = stableGoal + 10;
            normalCounts = normalCounts - 40;
            unusualCounts = 0;
        }
    }

    callback(null, stableGoal);
}



var rowDataArray = [];
function getChangeDataArray(date, shares){

    var j=-1;
    var length = shares.length;

    rowDataArray.length = 0;
    async.whilst(
        function(){
            j++;
            return j < length;
        },

        function(callback){
            getChangeRateData(shares[j], callback);
        },

        function(err, result){
            if(err){
                console.log(err.message);
            } else {
                //console.log(result[0]);
                writeMySQLData(rowDataArray);
                console.log(' get rowDataArray finished');
            }

        }
    );
}


function getChangeRateData(share, callback){ // shareCode is string

    var i,
        isFromNowOfDown = true,
        isFromNowOfUp = true,
        downBaseValueOfDown = -5,
        downBaseValueOfUp = -5,
        downBaseValueOfSegmentDown = -20,
        downBaseValueOfSegmentUp = -20,
        upBaseValueOfUp = 5,
        upBaseValueOfDown = 5,
        upBaseValueOfSegmentDown = 20,
        upBaseValueOfSegmentUp = 20,
        isOrderOfDown = false,
        isOrderOfUp = false,
        isOrderOfSegment = true,
        daysOfUp = 60,
        daysOfDown = 60,
        daysOfSegment = 300,
        shareCode;

        shareCode = share[1].toString();
    async.parallel([
            function(callback){
                getChangeRate(shareCode, callback);
            },

            function(callback){
                getContinuedDown(shareCode, downBaseValueOfDown, upBaseValueOfDown,daysOfDown, isOrderOfDown, isFromNowOfDown, callback);
            },

            function(callback){
                getContinuedUp(shareCode, downBaseValueOfUp, upBaseValueOfUp, daysOfUp, isOrderOfUp, isFromNowOfUp, callback);
            },

            function(callback){
                judgeShareDownStatus(shareCode, downBaseValueOfSegmentDown, upBaseValueOfSegmentDown, daysOfSegment, isOrderOfSegment, callback);
            },

            function(callback){
                judgeShareUpStatus(shareCode, downBaseValueOfSegmentUp, upBaseValueOfSegmentUp, daysOfSegment, isOrderOfSegment, callback);
            },

            function(callback){
                getStableAndActivityGoal(shareCode, callback);
            }

        ], function(err, results){
            if(err){

            }else{
                var oneRow = [];
                oneRow.push(share[1]);
                oneRow.push(share[0]);

                for(i=0; i<results[0].length; i++){
                    oneRow.push(results[0][i]);
                }

                for( i=0; i<results[1].length; i++){
                    oneRow.push(results[1][i]);
                }

                for(i=0; i<results[2].length; i++){
                    oneRow.push(results[2][i]);
                }

                for(i=0; i<results[3].length; i++){
                    oneRow.push(results[3][i]);
                }

                for( i=0; i<results[4].length; i++){
                    oneRow.push(results[4][i]);
                }

                for(i=0; i<results[5].length; i++){
                    oneRow.push(results[5][i]);
                }

                rowDataArray.push(oneRow);
                //console.log("finished data index: " + rowDataArray.length);
                callback(null);
            }
        }
    );
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
        //console.log(shareLive);
        ep.emit('getShareLive',shareLive);
    });

}

var newestDate,halfYearStartDate, yearStartDate,twoYearStartDate,threeYearStartDate,fourYearStartDate;
var seasonStartDate, monthStartDate,weekStartDate;
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
        var halfMonth,seasonMonth,oneMonth,weekDate,weekYear;

        weekYear = year;
        if(date > 7){
            weekDate = date - 7;
            weekStartDate = month;
        } else {//every month have 30 days except 2(28days) and 12
            if(month===1){
                weekStartDate = 12;
                weekDate = 24 + date;
                weekYear = year - 1;
            }else{
                weekStartDate = month - 1;
                if(weekStartDate===2){
                    weekDate = 21 + date;
                }else{
                    weekDate = 23 + date;
                }
            }
        }

        if(month > 6){
            halfMonth = month - 6;
            halfYearStartDate = year;
        }else{
            halfMonth = month + 6;
            halfYearStartDate = year-1;
        }

        if(month > 3){
            seasonMonth = month - 3;
            seasonStartDate = year;
        }else{
            seasonMonth = month + 10;
            seasonStartDate = year-1;
        }


        if(month===1){
            oneMonth = 12;
            monthStartDate = year - 1;
        }else {
            oneMonth = month - 1;
            monthStartDate = year;
        }

        if(oneMonth < 10){
            oneMonth = '0' + oneMonth;
        }

        if(seasonMonth < 10){
            seasonMonth = '0' + seasonMonth;
        }

        if(halfMonth < 10){
            halfMonth = '0' + halfMonth;
        }

        if(month < 10){
            month = '0' + month;
        }

        if(date < 10){
            date = '0' + date;
        }

        if(weekDate < 10){
            weekDate = '0' + weekDate;
        }

        weekStartDate = weekYear + '-' + weekStartDate + '-' + weekDate;
        monthStartDate = monthStartDate + '-' + oneMonth + '-' + date;
        seasonStartDate = seasonStartDate + '-' + seasonMonth + '-' + date;
        halfYearStartDate = halfYearStartDate + '-' + halfMonth + '-' + date;
        newestDate = year + '-' + month + '-' + date;
        yearStartDate = year-1 + '-' + month + '-' + date;
        twoYearStartDate = year-2 + '-' + month + '-' + date;
        threeYearStartDate = year-3 + '-' + month + '-' + date;
        fourYearStartDate = year-4 + '-' + month + '-' + date;
        console.log("newestDate: " + newestDate);
        ep.emit('getNewestDate', newestDate);
    });
}


//========================================================================================

function start() {
    //when to be use: after data be refresh
    //refreshShareLive();

    ep.all('getNewestDate','getShareLive',function(date,shares){
        getChangeDataArray(date,shares);
    });
    getBaseData();


}


exports.start = start;