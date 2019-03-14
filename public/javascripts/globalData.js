
// //NO_1: minRate
// var minRateBottom800 = [['000001','参考手册',1],['000005','开发大全',1],['000006','标准规范',1]];
// var minYearRateBottom800 = [['000001','参考手册',2],['000005','开发大全',2],[7,9,10]];
// var minRateTop800 = [['000001','参考手册',3],['000065','标准规范',1]];
// var minYearRateTop800 = [['000001','参考手册',4],[10,11,12]];
//
// //NO_2: maxRate
// var maxRateBottom800 = [[1,2,3],[4,5,6],[7,8,9]];
// var maxYearRateBottom800 = [[2,3,4],[5,6,7],[8,9,10]];
// var maxRateTop800 = [[3,4,5],[6,7,8],[9,10,11]];
// var maxYearRateTop800 = [[4,5,6],[7,8,9],[10,11,12]];

//NO_1: minRate
var minRateBottom800 = [];
var minYearRateBottom800 = [];
var minRateTop800 = [];
var minYearRateTop800 = [];

//NO_2: maxRate
var maxRateBottom800 = [];
var maxYearRateBottom800 = [];
var maxRateTop800 = [];
var maxYearRateTop800 = [];

    //NO_3: averageRate
var averageRateBottom800 = [];
var averageYearRateBottom800 = [];
var averageRateTop800 = [];
var averageYearRateTop800 = [];

    //NO_4: changeRateBottom
var changeWeekRateBottom800 = [];
var changeMonthRateBottom800 = [];
var changeSeasonRateBottom800 = [];
var changeYearRateBottom800 = [];
var changeTwoYearRateBottom800 = [];
var changeThreeYearRateBottom800 = [];
var changeFourYearRateBottom800 = [];
var changeHalfYearRateBottom800 = [];

    //NO_5: changeRateTop
var changeWeekRateTop800 = [];
var changeMonthRateTop800 = [];
var changeSeasonRateTop800 = [];
var changeYearRateTop800 = [];
var changeTwoYearRateTop800 = [];
var changeThreeYearRateTop800 = [];
var changeFourYearRateTop800 = [];
var changeHalfYearRateTop800 = [];

    //NO_6: continueDown
var continueDownTimeBottom800 = [];
var continueDownValueBottom800 = [];
var continueDownTimeTop800 = [];
var continueDownValueTop800 = [];

    //NO_7: continueUp
var continueUpTimeBottom800 = [];
var continueUpValueBottom800 = [];
var continueUpTimeTop800 = [];
var continueUpValueTop800 = [];

    //NO_8: segmentRateBottom
var segmentDownRateBottom800 = [];
var segmentDownGoalBottom800 = [];
var segmentDownDaysBottom800 = [];
var segmentUpRateBottom800 = [];
var segmentUpGoalBottom800 = [];
var segmentUpDaysBottom800 = [];

    //NO_9: segmentRateTop
var segmentDownRateTop800 = [];
var segmentDownGoalTop800 = [];
var segmentDownDaysTop800 = [];
var segmentUpRateTop800 = [];
var segmentUpGoalTop800 = [];
var segmentUpDaysTop800 = [];

    //NO_10: stableBottom
var stableMonthGaolBottom800 = [];
var stableSeasonGaolBottom800 = [];
var stableHalfYearGaolBottom800 = [];
var stableTwoYearGaolBottom800 = [];
var stableThreeYearGaolBottom800 = [];
var stableFourYearGaolBottom800 = [];

    //NO_11: stableTop
var stableMonthGaolTop800 = [];
var stableSeasonGaolTop800 = [];
var stableHalfYearGaolTop800 = [];
var stableTwoYearGaolTop800 = [];
var stableThreeYearGaolTop800 = [];
var stableFourYearGaolTop800 = [];

    //NO_12: activityBottom
var activityMonthGaolBottom800 = [];
var activitySeasonGaolBottom800 = [];
var activityHalfYearGaolBottom800 = [];
var activityTwoYearGaolBottom800 = [];
var activityThreeYearGaolBottom800 = [];
var activityFourYearGaolBottom800 = [];

    //NO_13: activityTop
var activityMonthGaolTop800 = [];
var activitySeasonGaolTop800 = [];
var activityHalfYearGaolTop800 = [];
var activityTwoYearGaolTop800 = [];
var activityThreeYearGaolTop800 = [];
var activityFourYearGaolTop800 = [];

    //NO_14: exchangeBottom
var exchangeWeekRateBottom800 = [];
var exchangeMonthRateBottom800 = [];
var exchangeSeasonRateBottom800 = [];
var exchangeYearRateBottom800 = [];
var exchangeTwoYearRateBottom800 = [];
var exchangeThreeYearRateBottom800 = [];
var exchangeFourYearRateBottom800 = [];

    //NO_15: exchangeTop
var exchangeWeekRateTop800 = [];
var exchangeMonthRateTop800 = [];
var exchangeSeasonRateTop800 = [];
var exchangeYearRateTop800 = [];
var exchangeTwoYearRateTop800 = [];
var exchangeThreeYearRateTop800 = [];
var exchangeFourYearRateTop800 = [];



var optionA = [
    //NO_1: minRate
    minRateBottom800,
    minYearRateBottom800,
    minRateTop800,
    minYearRateTop800,

    //NO_2: maxRate
    maxRateBottom800,
    maxYearRateBottom800,
    maxRateTop800,
    maxYearRateTop800,

    //NO_3: averageRate
    averageRateBottom800,
    averageYearRateBottom800,
    averageRateTop800,
    averageYearRateTop800,

    //NO_4: changeRateBottom
    changeWeekRateBottom800,
    changeMonthRateBottom800,
    changeSeasonRateBottom800,
    changeYearRateBottom800,
    changeTwoYearRateBottom800,
    changeThreeYearRateBottom800,
    changeFourYearRateBottom800,
    changeHalfYearRateBottom800,

    //NO_5: changeRateTop
    changeWeekRateTop800,
    changeMonthRateTop800,
    changeSeasonRateTop800,
    changeYearRateTop800,
    changeTwoYearRateTop800,
    changeThreeYearRateTop800,
    changeFourYearRateTop800,
    changeHalfYearRateTop800,

    //NO_6: continueDown
    continueDownTimeBottom800,
    continueDownValueBottom800,
    continueDownTimeTop800,
    continueDownValueTop800,

    //NO_7: continueUp
    continueUpTimeBottom800,
    continueUpValueBottom800,
    continueUpTimeTop800,
    continueUpValueTop800,

    //NO_8: segmentRateBottom
    segmentDownRateBottom800,
    segmentDownGoalBottom800,
    segmentDownDaysBottom800,
    segmentUpRateBottom800,
    segmentUpGoalBottom800,
    segmentUpDaysBottom800,

    //NO_9: segmentRateTop
    segmentDownRateTop800,
    segmentDownGoalTop800,
    segmentDownDaysTop800,
    segmentUpRateTop800,
    segmentUpGoalTop800,
    segmentUpDaysTop800,

    //NO_10: stableBottom
    stableMonthGaolBottom800,
    stableSeasonGaolBottom800,
    stableHalfYearGaolBottom800,
    stableTwoYearGaolBottom800,
    stableThreeYearGaolBottom800,
    stableFourYearGaolBottom800,

    //NO_11: stableTop
    stableMonthGaolTop800,
    stableSeasonGaolTop800,
    stableHalfYearGaolTop800,
    stableTwoYearGaolTop800,
    stableThreeYearGaolTop800,
    stableFourYearGaolTop800,

    //NO_12: activityBottom
    activityMonthGaolBottom800,
    activitySeasonGaolBottom800,
    activityHalfYearGaolBottom800,
    activityTwoYearGaolBottom800,
    activityThreeYearGaolBottom800,
    activityFourYearGaolBottom800,

    //NO_13: activityTop
    activityMonthGaolTop800,
    activitySeasonGaolTop800,
    activityHalfYearGaolTop800,
    activityTwoYearGaolTop800,
    activityThreeYearGaolTop800,
    activityFourYearGaolTop800,

    //NO_14: exchangeBottom
    exchangeWeekRateBottom800,
    exchangeMonthRateBottom800,
    exchangeSeasonRateBottom800,
    exchangeYearRateBottom800,
    exchangeTwoYearRateBottom800,
    exchangeThreeYearRateBottom800,
    exchangeFourYearRateBottom800,

    //NO_15: exchangeTop
    exchangeWeekRateTop800,
    exchangeMonthRateTop800,
    exchangeSeasonRateTop800,
    exchangeYearRateTop800,
    exchangeTwoYearRateTop800,
    exchangeThreeYearRateTop800,
    exchangeFourYearRateTop800
    ];

var optionNameShort = [
    //NO_1 minRate
    "minRateB",
    "minYearRateB",
    "minRateT",
    "minYearRateT",

    //NO_2: maxRate
    "maxRateB",
    "maxYearRateB",
    "maxRateT",
    "maxYearRateT",

    //NO_3: averageRate
    "aveRateB",
    "aveYearRateB",
    "aveRateT",
    "aveYearRateT",

    //NO_4: changeRateBottom
    "chaWRateB",
    "chaMRateB",
    "chaSRateB",
    "chaYearRateB",
    "chaTwoYearRateB",
    "chaTYearRateB",
    "chaFYearRateB",
    "chaHYearRateB",

    //NO_5: changeRateTop
    "chaWRateT",
    "chaMRateT",
    "chaSRateT",
    "chaYearRateT",
    "chaTwoYearRateT",
    "chaTYearRateT",
    "chaFYearRateT",
    "chaHYearRateT",

    //NO_6: continueDown
    "conDownTimeB",
    "conDownValueB",
    "conDownTimeT",
    "conDownValueT",

    //NO_7: continueUp
    "conUpTimeB",
    "conUpValueB",
    "conUpTimeT",
    "conUpValueT",

    //NO_8: segmentRateBottom
    "segDownRateB",
    "segDownGoalB",
    "segDownDaysB",
    "segUpRateB",
    "segUpGoalB",
    "segUpDaysB",

    //NO_9: segmentRateTop
    "segDownRateT",
    "segDownGoalT",
    "segDownDaysT",
    "segUpRateT",
    "segUpGoalT",
    "segUpDaysT",

    //NO_10: stableBottom
    "staMGB",
    "staSGB",
    "staHYearGB",
    "staTwoYearGB",
    "staTYearGB",
    "staFYearGB",

    //NO_11: stableTop
    "staMGT",
    "staSGT",
    "staHYearGT",
    "staTwoYearGT",
    "staTYearGT",
    "staFYearGT",

    //NO_12: activityBottom
    "actMGB",
    "actSGB",
    "actHYearGB",
    "actTwoYearGB",
    "actTYearGB",
    "actFYearGB",

    //NO_13: activityTop
    "actMGT",
    "actSGT",
    "actHYearGT",
    "actTwoYearGT",
    "actTYearGT",
    "actFYearGT",

    //NO_14: exchangeBottom
    "exWRB",
    "exMRB",
    "exSRB",
    "exYearRB",
    "exTwoYearRB",
    "exTYearRB",
    "exFYearRB",

    //NO_15: exchangeTop
    "exWRT",
    "exMRT",
    "exSRT",
    "exYearRT",
    "exTwoYearRT",
    "exTYearRT",
    "exFYearRT"
];


var arrayMix = [];
function mixDataArray1(dataArray){ //parameter <=6
    //console.log(dataArray[0]);
    //console.log(dataArray.length);
    arrayMix.length = 0;
    if(dataArray.length <= 1){
        arrayMix = deepCopy(dataArray[0]);
        //console.log("onlyOne:" + arrayMix);
        //console.log("onlyOne:" + arrayMix.length);
        return;
    }

    var index = [];
    var isExits = [];
    for(var i=0; i<dataArray.length; i++){
        index.push(1);
        isExits.push(true);
    }


    for(index[0]=0; index[0]<dataArray[0].length; index[0]++){
        for(index[1]=0; index[1]<dataArray[1].length; index[1]++){
            if(dataArray[0][index[0]][0] === dataArray[1][index[1]][0]){
                if(isExits[2]){
                    for(index[2]=0; index[2]<dataArray[2].length; index[2]++){
                        if(dataArray[0][index[0]][0] === dataArray[2][index[2]][0]){
                            if(isExits[3]){
                                for(index[3]=0; index[3]<dataArray[3].length; index[3]++){
                                    if(dataArray[0][index[0]][0] === dataArray[3][index[3]][0]){
                                        if(isExits[4]){
                                            for(index[4]=0; index[4]<dataArray[4].length; index[4]++){
                                                if(dataArray[0][index[0]][0] === dataArray[4][index[4]][0]){
                                                    if(isExits[5]){
                                                        for(index[5]=0; index[5]<dataArray[5].length; index[5]++){
                                                            if(dataArray[0][index[0]][0] === dataArray[5][index[5]][0]){
                                                                arrayMix.push([
                                                                    dataArray[0][index[0]][0],
                                                                    dataArray[0][index[0]][1],
                                                                    dataArray[0][index[0]][2],
                                                                    dataArray[1][index[1]][2],
                                                                    dataArray[2][index[2]][2],
                                                                    dataArray[3][index[3]][2],
                                                                    dataArray[4][index[4]][2],
                                                                    dataArray[5][index[5]][2]
                                                                ]);
                                                                break;
                                                            }
                                                        }
                                                    }else{
                                                        arrayMix.push([
                                                            dataArray[0][index[0]][0],
                                                            dataArray[0][index[0]][1],
                                                            dataArray[0][index[0]][2],
                                                            dataArray[1][index[1]][2],
                                                            dataArray[2][index[2]][2],
                                                            dataArray[3][index[3]][2],
                                                            dataArray[4][index[4]][2]
                                                        ]);
                                                        break;
                                                    }
                                                    break;
                                                }else{

                                                }
                                            }
                                        }else{
                                            arrayMix.push([
                                                dataArray[0][index[0]][0],
                                                dataArray[0][index[0]][1],
                                                dataArray[0][index[0]][2],
                                                dataArray[1][index[1]][2],
                                                dataArray[2][index[2]][2],
                                                dataArray[3][index[3]][2]
                                            ]);
                                        }
                                        break;
                                    }else{

                                    }
                                }
                            }else{
                                arrayMix.push([
                                    dataArray[0][index[0]][0],
                                    dataArray[0][index[0]][1],
                                    dataArray[0][index[0]][2],
                                    dataArray[1][index[1]][2],
                                    dataArray[2][index[2]][2]
                                ]);
                            }
                            break;
                        }else{

                        }
                    }
                }else{
                    arrayMix.push([
                        dataArray[0][index[0]][0],
                        dataArray[0][index[0]][1],
                        dataArray[0][index[0]][2],
                        dataArray[1][index[1]][2]
                    ]);
                }
                break;
            }
        }
    }
    //console.log(arrayMix);
    //console.log("more than one:" + arrayMix.length);
}


function mixDataArray(dataArray) { //parameter
    var i,j,t;
    arrayMix.length = 0;
    if (dataArray.length <= 1) {
        arrayMix = deepCopy(dataArray[0]);
        //console.log("only one length:" + arrayMix);
        return;
    }


    var firstArray = dataArray[0];
    var secondArray = dataArray[1];
    var tempMix = [];

    for(i=0; i<firstArray.length; i++){
        for(j=0; j<secondArray.length; j++){
            if(firstArray[i][0]===secondArray[j][0]){
                var tempArray = [];
                for(t=0; t<firstArray[i].length; t++){
                    tempArray.push(firstArray[i][t]);
                }
                tempArray.push(secondArray[j][2]);
                tempMix.push(tempArray);
                //console.log('same');
            }
        }
    }

    dataArray.shift();
    dataArray.shift();
    dataArray.unshift(tempMix);
    //console.log("more than one"  + arrayMix.length);
    mixDataArray(dataArray);

}

function mixCodeListArray(dataArray) { //parameter
    var i,j,t;
    //var arrayMix = [];
    //console.log('dataArray.length:' + dataArray.length);
    if (dataArray.length <= 1) {
        codeListArray = deepCopy(dataArray[0]);
        //console.log(codeListArray.length);
        //console.log("only one length:" + arrayMix);
       // return arrayMix;
        return true;
    }


    var firstArray = dataArray[0];
    var secondArray = dataArray[1];
    var tempMix = [];

    // for(i=0;i<30;i++){
    //     console.log(firstArray[i] + ' : ' + secondArray[i]);
    // }
    for(i=0; i<firstArray.length; i++){
        for(j=0; j<secondArray.length; j++){
            if(firstArray[i][0]===secondArray[j][0]){
                var tempArray = [];
                for(t=0; t<firstArray[i].length; t++){
                    tempArray.push(firstArray[i][t]);
                }
                tempArray.push(secondArray[j][2]);
                tempMix.push(tempArray);
                //console.log(firstArray[i][0] + ' = ' + secondArray[j][0] + ' is  same');
            }
        }
    }

    dataArray.shift();
    dataArray.shift();
    dataArray.unshift(tempMix);
    //console.log("more than one"  + arrayMix.length);
    mixCodeListArray(dataArray);

}
// var optionName =[
//
//     //NO_1: minRate
//     "minRateBottom800",
//     "minYearRateBottom800",
//     "minRateTop800",
//     "minYearRateTop800",
//
//     //NO_2: maxRate
//     "maxRateBottom800",
//     "maxYearRateBottom800",
//     "maxRateTop800",
//     "maxYearRateTop800",
//
//     //NO_3: averageRate
//     "averageRateBottom800",
//     "averageYearRateBottom800",
//     "averageRateTop800",
//     "averageYearRateTop800",
//
//     //NO_4: changeRateBottom
//     "changeWeekRateBottom800",
//     "changeMonthRateBottom800",
//     "changeSeasonRateBottom800",
//     "changeYearRateBottom800",
//     "changeTwoYearRateBottom800",
//     "changeThreeYearRateBottom800",
//     "changeFourYearRateBottom800",
//     "changeHalfYearRateBottom800",
//
//     //NO_5: changeRateTop
//     "changeWeekRateTop800",
//     "changeMonthRateTop800",
//     "changeSeasonRateTop800",
//     "changeYearRateTop800",
//     "changeTwoYearRateTop800",
//     "changeThreeYearRateTop800",
//     "changeFourYearRateTop800",
//     "changeHalfYearRateTop800",
//
//     //NO_6: continueDown
//     "continueDownTimeBottom800",
//     "continueDownValueBottom800",
//     "continueDownTimeTop800",
//     "continueDownValueTop800",
//
//     //NO_7: continueUp
//     "continueUpTimeBottom800",
//     "continueUpValueBottom800",
//     "continueUpTimeTop800",
//     "continueUpValueTop800",
//
//     //NO_8: segmentRateBottom
//     "segmentDownRateBottom800",
//     "segmentDownGoalBottom800",
//     "segmentDownDaysBottom800",
//     "segmentUpRateBottom800",
//     "segmentUpGoalBottom800",
//     "segmentUpDaysBottom800",
//
//     //NO_9: segmentRateTop
//     "segmentDownRateTop800",
//     "segmentDownGoalTop800",
//     "segmentDownDaysTop800",
//     "segmentUpRateTop800",
//     "segmentUpGoalTop800",
//     "segmentUpDaysTop800",
//
//     //NO_10: stableBottom
//     "stableMonthGaolBottom800",
//     "stableSeasonGaolBottom800",
//     "stableHalfYearGaolBottom800",
//     "stableTwoYearGaolBottom800",
//     "stableThreeYearGaolBottom800",
//     "stableFourYearGaolBottom800",
//
//     //NO_11: stableTop
//     "stableMonthGaolTop800",
//     "stableSeasonGaolTop800",
//     "stableHalfYearGaolTop800",
//     "stableTwoYearGaolTop800",
//     "stableThreeYearGaolTop800",
//     "stableFourYearGaolTop800",
//
//     //NO_12: activityBottom
//     "activityMonthGaolBottom800",
//     "activitySeasonGaolBottom800",
//     "activityHalfYearGaolBottom800",
//     "activityTwoYearGaolBottom800",
//     "activityThreeYearGaolBottom800",
//     "activityFourYearGaolBottom800",
//
//     //NO_13: activityTop
//     "activityMonthGaolTop800",
//     "activitySeasonGaolTop800",
//     "activityHalfYearGaolTop800",
//     "activityTwoYearGaolTop800",
//     "activityThreeYearGaolTop800",
//     "activityFourYearGaolTop800",
//
//     //NO_14: exchangeBottom
//     "exchangeWeekRateBottom800",
//     "exchangeMonthRateBottom800",
//     "exchangeSeasonRateBottom800",
//     "exchangeYearRateBottom800",
//     "exchangeTwoYearRateBottom800",
//     "exchangeThreeYearRateBottom800",
//     "exchangeFourYearRateBottom800",
//
//     //NO_15: exchangeTop
//     "exchangeWeekRateTop800",
//     "exchangeMonthRateTop800",
//     "exchangeSeasonRateTop800",
//     "exchangeYearRateTop800",
//     "exchangeTwoYearRateTop800",
//     "exchangeThreeYearRateTop800",
//     "exchangeFourYearRateTop800"
// ];





//===========================================================================================
function deepCopy(obj) {
    var str, newObj;
    newObj = obj.constructor === Array ? [] : {};

    if(typeof obj !== 'object') {
        return;
    } else if (window.JSON) {
        str = JSON.stringify(obj);  //系列化对象
        newObj = JSON.parse(str);
    } else {
        for (var i in obj){
            newObj[i] = typeof obj[i] === 'objcet' ? deepCopy(obj[i]) : obj[i];
        }
    }
    return newObj;
}