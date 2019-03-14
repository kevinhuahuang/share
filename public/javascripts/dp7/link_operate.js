function getLinkInputArray (curChannel) {
    var linkArray = [],i;
    curChannel = curChannel - 1;
    for(i=0; i<4; i++){
        if(i !== curChannel){
            if(linkInputSelect[i] === linkInputSelect[curChannel]){
                linkArray.push(i);
            }
        }
    }
    // console.log('输入联调数组：' + linkArray);
    return linkArray;
}


function getLinkOutArray (curChannel) {
    var linkArray = [],i;
    curChannel = curChannel - 5;
    for(i=0; i<8; i++){
        if(i !== curChannel){
            if(linkOutSelect[i] === linkOutSelect[curChannel]){
                linkArray.push(i);
            }
        }
    }
    // console.log("输出联调数组:" + linkArray);
    return linkArray;
}

//=============================================================================
function getInputChannelData (curChannel) {
    var channelData;
    switch (curChannel) {
        case 0:
            channelData = currentGroupData.dataInputA;
            break;
        case 1:
            channelData = currentGroupData.dataInputB;
            break;
        case 2:
            channelData = currentGroupData.dataInputC;
            break;
        case 3:
            channelData = currentGroupData.dataInputD;
            break;
        default:
            break;
    }
    return channelData;
}

function getOutChannelData(curChannel) {
    var channelData;
    switch (curChannel) {
        case 0:
            channelData = currentGroupData.dataOut1;
            break;
        case 1:
            channelData = currentGroupData.dataOut2;
            break;
        case 2:
            channelData = currentGroupData.dataOut3;
            break;
        case 3:
            channelData = currentGroupData.dataOut4;
            break;
        case 4:
            channelData = currentGroupData.dataOut5;
            break;
        case 5:
            channelData = currentGroupData.dataOut6;
            break;
        case 6:
            channelData = currentGroupData.dataOut7;
            break;
        case 7:
            channelData = currentGroupData.dataOut8;
            break;
        default:
            break;
    }
    return channelData;
}
//========================================================================
function keepLinkInputGate(curChannel, value) { //输入门限联调
    var i;
    var linkArray = getLinkInputArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getInputChannelData(linkArray[i]).noisegate = value;
        }
    }
}


function keepLinkInputTime(curChannel, value1, value2) { //输入延时
    var i;
    var linkArray = getLinkInputArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
           getInputChannelData(linkArray[i]).delay = value1;
           if( value2 !== undefined){
               getInputChannelData(linkArray[i]).secondDelay = value2
           }
        }
    }
}
//==================================================================================================
//==================================================================================================
//EQ1
function keepLinkEq1Frequency(curChannel, value) { //EQ1频率
    if(curChannel > 4) {
        keepLinkOutEq1Frequency(curChannel, value);
    } else {
        keepLinkInputEq1Frequency(curChannel, value);
    }
}

function keepLinkInputEq1Frequency(curChannel, value) { //输入EQ1频率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ1.freq = value;
            eqDataKeepStep(linkArray[i]+1, 1);
        }
    }

}

function keepLinkOutEq1Frequency(curChannel, value) { //输出EQ1频率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ1.freq = value;
            eqDataKeepStep(linkArray[i]+5, 1);
        }
    }
}
//==================================================================================
function keepLinkEq1Bandwidth(curChannel, value) { //EQ1带宽
    if(curChannel > 4) {
        keepLinkOutEq1Bandwidth(curChannel, value);
    } else {
        keepLinkInputEq1Bandwidth(curChannel, value);
    }
}

function keepLinkInputEq1Bandwidth(curChannel, value) { //输入EQ1带宽
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ1.bw = value;
            eqDataKeepStep(linkArray[i]+1, 1);
        }
    }

}

function keepLinkOutEq1Bandwidth(curChannel, value) { //输出EQ1带宽
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ1.bw = value;
            eqDataKeepStep(linkArray[i]+5, 1);
        }
    }
}
//================================================================
function keepLinkEq1Slope(curChannel, value) { //EQ1斜率
    if(curChannel > 4) {
        keepLinkOutEq1Slope(curChannel, value);
    } else {
        keepLinkInputEq1Slope(curChannel, value);
    }
}

function keepLinkInputEq1Slope(curChannel, value) { //输入EQ1斜率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ1.bw = value;
            eqDataKeepStep(linkArray[i]+1, 1);
        }
    }

}

function keepLinkOutEq1Slope(curChannel, value) { //输出EQ1斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ1.bw = value;
            eqDataKeepStep(linkArray[i]+5, 1);
        }
    }
}

//================================================================
function keepLinkEq1Gain(curChannel, value) { //EQ增益
    if(curChannel > 4) {
        keepLinkOutEq1Gain(curChannel, value);
    } else {
        keepLinkInputEq1Gain(curChannel, value);
    }
}

function keepLinkInputEq1Gain(curChannel, value) { //输入EQ1增益
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ1.level = value;
            eqDataKeepStep(linkArray[i]+1, 1);
        }
    }
}

function keepLinkOutEq1Gain(curChannel, value) { //输出EQ1增益
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ1.level = value;
            eqDataKeepStep(linkArray[i]+5, 1);
        }
    }
}

//==================================================================================================
//==================================================================================================
//EQ2
function keepLinkEq2Frequency(curChannel, value) { //EQ2频率
    if(curChannel > 4) {
        keepLinkOutEq2Frequency(curChannel, value);
    } else {
        keepLinkInputEq2Frequency(curChannel, value);
    }
}

function keepLinkInputEq2Frequency(curChannel, value) { //输入EQ2频率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ2.freq = value;
            eqDataKeepStep(linkArray[i]+1, 2);
        }
    }

}

function keepLinkOutEq2Frequency(curChannel, value) { //输出EQ2频率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ2.freq = value;
            eqDataKeepStep(linkArray[i]+5, 2);
        }
    }
}
//==================================================================================
function keepLinkEq2Bandwidth(curChannel, value) { //EQ2带宽
    if(curChannel > 4) {
        keepLinkOutEq2Bandwidth(curChannel, value);
    } else {
        keepLinkInputEq2Bandwidth(curChannel, value);
    }
}

function keepLinkInputEq2Bandwidth(curChannel, value) { //输入EQ2带宽
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ2.bw = value;
            eqDataKeepStep(linkArray[i]+1, 2);
        }
    }

}

function keepLinkOutEq2Bandwidth(curChannel, value) { //输出EQ2带宽
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ2.bw = value;
            eqDataKeepStep(linkArray[i]+5, 2);
        }
    }
}
//================================================================
function keepLinkEq2Slope(curChannel, value) { //EQ斜率
    if(curChannel > 4) {
        keepLinkOutEq2Slope(curChannel, value);
    } else {
        keepLinkInputEq2Slope(curChannel, value);
    }
}

function keepLinkInputEq2Slope(curChannel, value) { //输入EQ2斜率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ2.bw = value;
            eqDataKeepStep(linkArray[i]+1, 2);
        }
    }

}

function keepLinkOutEq2Slope(curChannel, value) { //输出EQ2斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ2.bw = value;
            eqDataKeepStep(linkArray[i]+5, 2);
        }
    }
}

//================================================================
function keepLinkEq2Gain(curChannel, value) { //EQ2增益
    if(curChannel > 4) {
        keepLinkOutEq2Gain(curChannel, value);
    } else {
        keepLinkInputEq2Gain(curChannel, value);
    }
}

function keepLinkInputEq2Gain(curChannel, value) { //输入EQ2增益
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ2.level = value;
            eqDataKeepStep(linkArray[i]+1, 2);
        }
    }
}

function keepLinkOutEq2Gain(curChannel, value) { //输出EQ2增益
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ2.level = value;
            eqDataKeepStep(linkArray[i]+5, 2);
        }
    }
}

//==================================================================================================
//==================================================================================================
//EQ3
function keepLinkEq3Frequency(curChannel, value) { //EQ3频率
    if(curChannel > 4) {
        keepLinkOutEq3Frequency(curChannel, value);
    } else {
        keepLinkInputEq3Frequency(curChannel, value);
    }
}

function keepLinkInputEq3Frequency(curChannel, value) { //输入EQ3频率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ3.freq = value;
            eqDataKeepStep(linkArray[i]+1, 3);
        }
    }

}

function keepLinkOutEq3Frequency(curChannel, value) { //输出EQ3频率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ3.freq = value;
            eqDataKeepStep(linkArray[i]+5, 3);
        }
    }
}
//==================================================================================
function keepLinkEq3Bandwidth(curChannel, value) { //EQ2带宽
    if(curChannel > 4) {
        keepLinkOutEq3Bandwidth(curChannel, value);
    } else {
        keepLinkInputEq3Bandwidth(curChannel, value);
    }
}

function keepLinkInputEq3Bandwidth(curChannel, value) { //输入EQ3带宽
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ3.bw = value;
            eqDataKeepStep(linkArray[i]+1, 3);
        }
    }

}

function keepLinkOutEq3Bandwidth(curChannel, value) { //输出EQ3带宽
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ3.bw = value;
            eqDataKeepStep(linkArray[i]+5, 3);
        }
    }
}
//================================================================
function keepLinkEq3Slope(curChannel, value) { //EQ3斜率
    if(curChannel > 4) {
        keepLinkOutEq3Slope(curChannel, value);
    } else {
        keepLinkInputEq3Slope(curChannel, value);
    }
}

function keepLinkInputEq3Slope(curChannel, value) { //输入EQ3斜率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ3.bw = value;
            eqDataKeepStep(linkArray[i]+1, 3);
        }
    }

}

function keepLinkOutEq3Slope(curChannel, value) { //输出EQ3斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ3.bw = value;
            eqDataKeepStep(linkArray[i]+5, 3);
        }
    }
}

//================================================================
function keepLinkEq3Gain(curChannel, value) { //EQ3增益
    if(curChannel > 4) {
        keepLinkOutEq3Gain(curChannel, value);
    } else {
        keepLinkInputEq3Gain(curChannel, value);
    }
}

function keepLinkInputEq3Gain(curChannel, value) { //输入EQ3增益
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ3.level = value;
            eqDataKeepStep(linkArray[i]+1, 3);
        }
    }
}

function keepLinkOutEq3Gain(curChannel, value) { //输出EQ3增益
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ3.level = value;
            eqDataKeepStep(linkArray[i]+5, 3);
        }
    }
}

//==================================================================================================
//==================================================================================================
//EQ4
function keepLinkEq4Frequency(curChannel, value) { //EQ4频率
    if(curChannel > 4) {
        keepLinkOutEq4Frequency(curChannel, value);
    } else {
        keepLinkInputEq4Frequency(curChannel, value);
    }
}

function keepLinkInputEq4Frequency(curChannel, value) { //输入EQ4频率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ4.freq = value;
            eqDataKeepStep(linkArray[i]+1, 4);
        }
    }

}

function keepLinkOutEq4Frequency(curChannel, value) { //输出EQ4频率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ4.freq = value;
            eqDataKeepStep(linkArray[i]+5, 4);
        }
    }
}
//==================================================================================
function keepLinkEq4Bandwidth(curChannel, value) { //EQ4带宽
    if(curChannel > 4) {
        keepLinkOutEq4Bandwidth(curChannel, value);
    } else {
        keepLinkInputEq4Bandwidth(curChannel, value);
    }
}

function keepLinkInputEq4Bandwidth(curChannel, value) { //输入EQ4带宽
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ4.bw = value;
            eqDataKeepStep(linkArray[i]+1, 4);
        }
    }

}

function keepLinkOutEq4Bandwidth(curChannel, value) { //输出EQ4带宽
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ4.bw = value;
            eqDataKeepStep(linkArray[i]+5, 4);
        }
    }
}
//================================================================
function keepLinkEq4Slope(curChannel, value) { //EQ斜率
    if(curChannel > 4) {
        keepLinkOutEq4Slope(curChannel, value);
    } else {
        keepLinkInputEq4Slope(curChannel, value);
    }
}

function keepLinkInputEq4Slope(curChannel, value) { //输入EQ4斜率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ4.bw = value;
            eqDataKeepStep(linkArray[i]+1, 4);
        }
    }

}

function keepLinkOutEq4Slope(curChannel, value) { //输出EQ4斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ4.bw = value;
            eqDataKeepStep(linkArray[i]+5, 4);
        }
    }
}

//================================================================
function keepLinkEq4Gain(curChannel, value) { //EQ4增益
    if(curChannel > 4) {
        keepLinkOutEq4Gain(curChannel, value);
    } else {
        keepLinkInputEq4Gain(curChannel, value);
    }
}

function keepLinkInputEq4Gain(curChannel, value) { //输入EQ4增益
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ4.level = value;
            eqDataKeepStep(linkArray[i]+1, 4);
        }
    }
}

function keepLinkOutEq4Gain(curChannel, value) { //输出EQ4增益
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ4.level = value;
            eqDataKeepStep(linkArray[i]+5, 4);
        }
    }
}

//==================================================================================================
//==================================================================================================
//EQ5
function keepLinkEq5Frequency(curChannel, value) { //EQ5频率
    if(curChannel > 4) {
        keepLinkOutEq5Frequency(curChannel, value);
    } else {
        keepLinkInputEq5Frequency(curChannel, value);
    }
}

function keepLinkInputEq5Frequency(curChannel, value) { //输入EQ5频率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ5.freq = value;
            eqDataKeepStep(linkArray[i]+1, 5);
        }
    }

}

function keepLinkOutEq5Frequency(curChannel, value) { //输出EQ5频率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ5.freq = value;
            eqDataKeepStep(linkArray[i]+5, 5);
        }
    }
}
//==================================================================================
function keepLinkEq5Bandwidth(curChannel, value) { //EQ2带宽
    if(curChannel > 4) {
        keepLinkOutEq5Bandwidth(curChannel, value);
    } else {
        keepLinkInputEq5Bandwidth(curChannel, value);
    }
}

function keepLinkInputEq5Bandwidth(curChannel, value) { //输入EQ5带宽
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ5.bw = value;
            eqDataKeepStep(linkArray[i]+1, 5);
        }
    }

}

function keepLinkOutEq5Bandwidth(curChannel, value) { //输出EQ5带宽
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ5.bw = value;
            eqDataKeepStep(linkArray[i]+5, 5);
        }
    }
}
//================================================================
function keepLinkEq5Slope(curChannel, value) { //EQ5斜率
    if(curChannel > 4) {
        keepLinkOutEq5Slope(curChannel, value);
    } else {
        keepLinkInputEq5Slope(curChannel, value);
    }
}

function keepLinkInputEq5Slope(curChannel, value) { //输入EQ5斜率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ5.bw = value;
            eqDataKeepStep(linkArray[i]+1, 5);
        }
    }

}

function keepLinkOutEq5Slope(curChannel, value) { //输出EQ5斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ5.bw = value;
            eqDataKeepStep(linkArray[i]+5, 5);
        }
    }
}

//================================================================
function keepLinkEq5Gain(curChannel, value) { //EQ5增益
    if(curChannel > 4) {
        keepLinkOutEq5Gain(curChannel, value);
    } else {
        keepLinkInputEq5Gain(curChannel, value);
    }
}

function keepLinkInputEq5Gain(curChannel, value) { //输入EQ5增益
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ5.level = value;
            eqDataKeepStep(linkArray[i]+1, 5);
        }
    }
}

function keepLinkOutEq5Gain(curChannel, value) { //输出EQ5增益
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ5.level = value;
            eqDataKeepStep(linkArray[i]+5, 5);
        }
    }
}

//==================================================================================================
//==================================================================================================
//EQ6
function keepLinkEq6Frequency(curChannel, value) { //EQ6频率
    if(curChannel > 4) {
        keepLinkOutEq6Frequency(curChannel, value);
    } else {
        keepLinkInputEq6Frequency(curChannel, value);
    }
}

function keepLinkInputEq6Frequency(curChannel, value) { //输入EQ6频率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ6.freq = value;
            eqDataKeepStep(linkArray[i]+1, 6);
        }
    }

}

function keepLinkOutEq6Frequency(curChannel, value) { //输出EQ6频率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ6.freq = value;
            eqDataKeepStep(linkArray[i]+5, 6);
        }
    }
}
//==================================================================================
function keepLinkEq6Bandwidth(curChannel, value) { //EQ2带宽
    if(curChannel > 4) {
        keepLinkOutEq6Bandwidth(curChannel, value);
    } else {
        keepLinkInputEq6Bandwidth(curChannel, value);
    }
}

function keepLinkInputEq6Bandwidth(curChannel, value) { //输入EQ6带宽
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ6.bw = value;
            eqDataKeepStep(linkArray[i]+1, 6);
        }
    }

}

function keepLinkOutEq6Bandwidth(curChannel, value) { //输出EQ6带宽
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ6.bw = value;
            eqDataKeepStep(linkArray[i]+5, 6);
        }
    }
}
//================================================================
function keepLinkEq6Slope(curChannel, value) { //EQ6斜率
    if(curChannel > 4) {
        keepLinkOutEq6Slope(curChannel, value);
    } else {
        keepLinkInputEq6Slope(curChannel, value);
    }
}

function keepLinkInputEq6Slope(curChannel, value) { //输入EQ6斜率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ6.bw = value;
            eqDataKeepStep(linkArray[i]+1, 6);
        }
    }

}

function keepLinkOutEq6Slope(curChannel, value) { //输出EQ6斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ6.bw = value;
            eqDataKeepStep(linkArray[i]+5, 6);
        }
    }
}

//================================================================
function keepLinkEq6Gain(curChannel, value) { //EQ6增益
    if(curChannel > 4) {
        keepLinkOutEq6Gain(curChannel, value);
    } else {
        keepLinkInputEq6Gain(curChannel, value);
    }
}

function keepLinkInputEq6Gain(curChannel, value) { //输入EQ6增益
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ6.level = value;
            eqDataKeepStep(linkArray[i]+1, 6);
        }
    }
}

function keepLinkOutEq6Gain(curChannel, value) { //输出EQ6增益
    var i;
    var linkArray = getLinkOutArray(curChannel);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            getOutChannelData(linkArray[i]).OutEQ.EQ6.level = value;
            eqDataKeepStep(linkArray[i]+5, 6);
        }
    }
}

//==================================================================================================
//==================================================================================================
//DEQ
//==================================================================================================
//DEQ1
function keepLinkInputDeq1Frequency(curChannel, value) { //输入DEQ1频率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InDeq1.req = value;
        }
    }

}

function keepLinkInputDeq1Bandwidth(curChannel, value) { //输入DEQ1带宽
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InDeq1.bw = value;
        }
    }

}

function keepLinkInputDeq1Level(curChannel, value) { //输入DEQ1目标电平
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InDeq1.level = value;
        }
    }
}

function keepLinkInputDeq1Threshold(curChannel, value) { //输入DEQ1阈值
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).DeqParam1.DEQ_Threshold = value;
        }
    }
}

function keepLinkInputDeq1Ratio(curChannel, value) { //输入EQ1比率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).DeqParam1.DEQ_ratio = value;
        }
    }
}

function keepLinkInputDeq1AttackTime(curChannel, value) { //输入DEQ1响应时间
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).DeqParam1.DEQ_a = value;
        }
    }
}

function keepLinkInputDeq1ReleaseTime(curChannel, value) { //输入DEQ1释放时间
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).DeqParam1.DEQ_r = value;
        }
    }
}

//==================================================================================================
//DEQ2
function keepLinkInputDeq2Frequency(curChannel, value) { //输入DEQ2频率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InDeq2.req = value;
        }
    }
}

function keepLinkInputDeq2Bandwidth(curChannel, value) { //输入DEQ2带宽
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InDeq2.bw = value;
        }
    }

}

function keepLinkInputDeq2Level(curChannel, value) { //输入DEQ2目标电平
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InDeq2.level = value;
        }
    }
}

function keepLinkInputDeq2Threshold(curChannel, value) { //输入DEQ2阈值
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).DeqParam2.DEQ_Threshold = value;
        }
    }
}

function keepLinkInputDeq2Ratio(curChannel, value) { //输入EQ2比率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).DeqParam2.DEQ_ratio = value;
        }
    }
}

function keepLinkInputDeq2AttackTime(curChannel, value) { //输入DEQ2响应时间
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).DeqParam2.DEQ_a = value;
        }
    }
}

function keepLinkInputDeq2ReleaseTime(curChannel, value) { //输入DEQ2释放时间
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).DeqParam2.DEQ_r = value;
        }
    }
}


//=================================================================================
//输入 自动增益 限幅
function keepLinkInputThreshold(curChannel, value) { // 自动增益阈值
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).agThreshold = value;
        }
    }
}

function keepLinkInputLevel(curChannel, value) { // 自动增益目标电平
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).agLevel = value;
        }
    }
}

function keepLinkInputExtendRatio(curChannel, value) { // 自动增益比率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).agRatio = value;
        }
    }
}


function keepLinkInputExtendAttackTime(curChannel, value) { // 自动增益响应时间
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).agAttack = value;
        }
    }
}


function keepLinkInputExtendReleaseTime(curChannel, value) { // 自动增益释放时间
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).agRelease = value;
        }
    }
}

function keepLinkInputCompressLevel(curChannel, value) { //输入压缩电平
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).compLevel = value;
        }
    }
}

function keepLinkInputCompressRatio(curChannel, value) { //输入压缩比率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).compRatio = value;
        }
    }
}


function keepLinkInputCompressAttackTime(curChannel, value) { // 输入压缩响应时间
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).compAttack = value;
        }
    }
}

function keepLinkInputCompressReleaseTime(curChannel, value) { // 输入压缩释放时间
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).compRelease = value;
        }
    }
}

//======================================================================================================================
// =====================================================================================================================
// //输出压缩限幅
function keepLinkOutThresholdCompress(curChannel, value) {  //输出压缩电平
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).compLevel = value;
        }
    }
}

function keepLinkOutRatioCompress(curChannel, value) { //输出压缩比
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).compRatio = value;
        }
    }
}

function keepLinkOutAttackCompress(curChannel, value) { //输出压缩响应时间
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).compAttack = value;
        }
    }
}

function keepLinkOutReleaseCompress(curChannel, value) { //输出压缩释放时间
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).compR = value;
        }
    }
}

function keepLinkOutThresholdLimit(curChannel, value) {//输出限幅电平
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).limT = value;
        }
    }
}

function keepLinkOutAttackLimit(curChannel, value) {//输出限幅响应时间
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).limAttack = value;
        }
    }
}

function keepLinkOutReleaseLimit(curChannel, value) {//输出限幅释放时间
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).limRelease = value;
        }
    }
}

//======================================================================================================================
//输出延时
function keepLinkOutDelayTime(curChannel, value1, value2) {
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).delay = value1;
            if (value2 !== undefined) {
                getOutChannelData(linkArray[i]).secondDelay = value2;
            }
        }
    }
}

//======================================================================================================================
//分频
function keepLinkOutHpfFrequency(curChannel, value) { //分频 高通
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).HPFData.HL_freq = value;
        }
    }
}

function keepLinkOutLpfFrequency(curChannel, value) {//分频 低通
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).LPFData.HL_freq = value;
        }
    }
}

//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//下拉列表 SELECT
//EQ模式
function keepLinkEq1Mode(curChannel, value){  //EQ1模式
    if(curChannel < 5) {
        keepLinkInputEq1Mode(curChannel, value);
    } else {
        keepLinkOutEq1Mode(curChannel, value);
    }
}

function keepLinkInputEq1Mode(curChannel, value) { //输入EQ1模式
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ1.type = value;
            eqDataKeepStep(linkArray[i]+1, 1);
        }
    }
}

function keepLinkOutEq1Mode(curChannel, value) { //输出EQ1模式
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).OutEQ.EQ1.type = value;
            eqDataKeepStep(linkArray[i]+5, 1);
        }
    }
}

//============================================================
function keepLinkEq2Mode(curChannel, value){  //EQ2模式
    if(curChannel < 5) {
        keepLinkInputEq2Mode(curChannel, value);
    } else {
        keepLinkOutEq2Mode(curChannel, value);
    }
}

function keepLinkInputEq2Mode(curChannel, value) { //输入EQ2模式
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ2.type = value;
            eqDataKeepStep(linkArray[i]+1, 2);
        }
    }
}

function keepLinkOutEq2Mode(curChannel, value) { //输出EQ2模式
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).OutEQ.EQ2.type = value;
            eqDataKeepStep(linkArray[i]+5, 2);
        }
    }
}
//============================================================
function keepLinkEq3Mode(curChannel, value){  //EQ3模式
    if(curChannel < 5) {
        keepLinkInputEq3Mode(curChannel, value);
    } else {
        keepLinkOutEq3Mode(curChannel, value);
    }
}

function keepLinkInputEq3Mode(curChannel, value) { //输入EQ3模式
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ3.type = value;
            eqDataKeepStep(linkArray[i]+1, 3);
        }
    }
}

function keepLinkOutEq3Mode(curChannel, value) { //输出EQ3模式
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).OutEQ.EQ3.type = value;
            eqDataKeepStep(linkArray[i]+5, 3);
        }
    }
}
//============================================================
function keepLinkEq4Mode(curChannel, value){  //EQ4模式
    if(curChannel < 5) {
        keepLinkInputEq4Mode(curChannel, value);
    } else {
        keepLinkOutEq4Mode(curChannel, value);
    }
}

function keepLinkInputEq4Mode(curChannel, value) { //输入EQ4模式
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ4.type = value;
            eqDataKeepStep(linkArray[i]+1, 4);
        }
    }
}

function keepLinkOutEq4Mode(curChannel, value) { //输出EQ4模式
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).OutEQ.EQ4.type = value;
            eqDataKeepStep(linkArray[i]+5, 4);
        }
    }
}

//============================================================
function keepLinkEq5Mode(curChannel, value){  //EQ5模式
    if(curChannel < 5) {
        keepLinkInputEq5Mode(curChannel, value);
    } else {
        keepLinkOutEq5Mode(curChannel, value);
    }
}

function keepLinkInputEq5Mode(curChannel, value) { //输入EQ5模式
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ5.type = value;
            eqDataKeepStep(linkArray[i]+1, 5);
        }
    }
}

function keepLinkOutEq5Mode(curChannel, value) { //输出EQ5模式
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).OutEQ.EQ5.type = value;
            eqDataKeepStep(linkArray[i]+5, 5);
        }
    }
}

//============================================================
function keepLinkEq6Mode(curChannel, value){  //EQ6模式
    if(curChannel < 5) {
        keepLinkInputEq6Mode(curChannel, value);
    } else {
        keepLinkOutEq6Mode(curChannel, value);
    }
}

function keepLinkInputEq6Mode(curChannel, value) { //输入EQ6模式
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ6.type = value;
            eqDataKeepStep(linkArray[i]+1, 6);
        }
    }
}

function keepLinkOutEq6Mode(curChannel, value) { //输出EQ6模式
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).OutEQ.EQ6.type = value;
            eqDataKeepStep(linkArray[i]+5, 1);
        }
    }
}

//======================================================================================================================
//EQ斜率
function keepLinkEq1SlopeSelect(curChannel, value) {
    if( curChannel < 5 ) {
        keepLinkInputEq1SlopeSelect(curChannel, value);
    } else {
        keepLinkOutEq1SlopeSelect(curChannel, value);
    }
}

function keepLinkInputEq1SlopeSelect(curChannel, value) { //EQ1下拉列表斜率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ1.HL_db_AP_Flag =
                SET_4H_BYTE(value,GET_4L_BYTE(getInputChannelData(linkArray[i]).InEQ.EQ1.HL_db_AP_Flag));
            // console.log('斜率联调：' + curChannel + ' : ' + value);
            eqDataKeepStep(linkArray[i]+1, 1);
        }
    }
}

function keepLinkOutEq1SlopeSelect(curChannel, value) { //EQ1下拉列表斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).OutEQ.EQ1.HL_db_AP_Flag =
                SET_4H_BYTE(value,GET_4L_BYTE(getOutChannelData(linkArray[i]).OutEQ.EQ1.HL_db_AP_Flag));
            eqDataKeepStep(linkArray[i]+5, 1);
        }
    }
}

//==========================================================================================
function keepLinkEq2SlopeSelect(curChannel, value) {
    if( curChannel < 5 ) {
        keepLinkInputEq2SlopeSelect(curChannel, value);
    } else {
        keepLinkOutEq2SlopeSelect(curChannel, value);
    }
}

function keepLinkInputEq2SlopeSelect(curChannel, value) { //EQ2下拉列表斜率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ2.HL_db_AP_Flag =
                SET_4H_BYTE(value,GET_4L_BYTE(getInputChannelData(linkArray[i]).InEQ.EQ2.HL_db_AP_Flag));
            eqDataKeepStep(linkArray[i]+1, 2);
        }
    }
}

function keepLinkOutEq2SlopeSelect(curChannel, value) { //EQ2下拉列表斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).OutEQ.EQ2.HL_db_AP_Flag =
                SET_4H_BYTE(value,GET_4L_BYTE(getOutChannelData(linkArray[i]).OutEQ.EQ2.HL_db_AP_Flag));
            eqDataKeepStep(linkArray[i]+5, 2);
        }
    }
}

//==========================================================================================
function keepLinkEq3SlopeSelect(curChannel, value) {
    if( curChannel < 5 ) {
        keepLinkInputEq3SlopeSelect(curChannel, value);
    } else {
        keepLinkOutEq3SlopeSelect(curChannel, value);
    }
}

function keepLinkInputEq3SlopeSelect(curChannel, value) { //EQ3下拉列表斜率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ3.HL_db_AP_Flag =
                SET_4H_BYTE(value,GET_4L_BYTE(getInputChannelData(linkArray[i]).InEQ.EQ3.HL_db_AP_Flag));
            eqDataKeepStep(linkArray[i]+1, 3);
        }
    }
}

function keepLinkOutEq3SlopeSelect(curChannel, value) { //EQ3下拉列表斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).OutEQ.EQ3.HL_db_AP_Flag =
                SET_4H_BYTE(value,GET_4L_BYTE(getOutChannelData(linkArray[i]).OutEQ.EQ3.HL_db_AP_Flag));
            eqDataKeepStep(linkArray[i]+5, 3);
        }
    }
}
//==========================================================================================
function keepLinkEq4SlopeSelect(curChannel, value) {
    if( curChannel < 5 ) {
        keepLinkInputEq4SlopeSelect(curChannel, value);
    } else {
        keepLinkOutEq4SlopeSelect(curChannel, value);
    }
}

function keepLinkInputEq4SlopeSelect(curChannel, value) { //EQ4下拉列表斜率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ4.HL_db_AP_Flag =
                SET_4H_BYTE(value,GET_4L_BYTE(getInputChannelData(linkArray[i]).InEQ.EQ4.HL_db_AP_Flag));
            eqDataKeepStep(linkArray[i]+1, 4);
        }
    }
}

function keepLinkOutEq4SlopeSelect(curChannel, value) { //EQ4下拉列表斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).OutEQ.EQ4.HL_db_AP_Flag =
                SET_4H_BYTE(value,GET_4L_BYTE(getOutChannelData(linkArray[i]).OutEQ.EQ5.HL_db_AP_Flag));
            eqDataKeepStep(linkArray[i]+5, 4);
        }
    }
}
//==========================================================================================
function keepLinkEq5SlopeSelect(curChannel, value) {
    if( curChannel < 5 ) {
        keepLinkInputEq5SlopeSelect(curChannel, value);
    } else {
        keepLinkOutEq5SlopeSelect(curChannel, value);
    }
}

function keepLinkInputEq5SlopeSelect(curChannel, value) { //EQ5下拉列表斜率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ5.HL_db_AP_Flag =
                SET_4H_BYTE(value,GET_4L_BYTE(getInputChannelData(linkArray[i]).InEQ.EQ5.HL_db_AP_Flag));
            eqDataKeepStep(linkArray[i]+1, 5);
        }
    }
}

function keepLinkOutEq5SlopeSelect(curChannel, value) { //EQ5下拉列表斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).OutEQ.EQ5.HL_db_AP_Flag =
                SET_4H_BYTE(value,GET_4L_BYTE(getOutChannelData(linkArray[i]).OutEQ.EQ5.HL_db_AP_Flag));
            eqDataKeepStep(linkArray[i]+5, 5);
        }
    }
}
//==========================================================================================
function keepLinkEq6SlopeSelect(curChannel, value) {
    if( curChannel < 5 ) {
        keepLinkInputEq6SlopeSelect(curChannel, value);
    } else {
        keepLinkOutEq6SlopeSelect(curChannel, value);
    }
}

function keepLinkInputEq6SlopeSelect(curChannel, value) { //EQ6下拉列表斜率
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InEQ.EQ6.HL_db_AP_Flag =
                SET_4H_BYTE(value,GET_4L_BYTE(getInputChannelData(linkArray[i]).InEQ.EQ6.HL_db_AP_Flag));
            eqDataKeepStep(linkArray[i]+1, 6);
        }
    }
}

function keepLinkOutEq6SlopeSelect(curChannel, value) { //EQ6下拉列表斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).OutEQ.EQ6.HL_db_AP_Flag =
                SET_4H_BYTE(value,GET_4L_BYTE(getOutChannelData(linkArray[i]).OutEQ.EQ6.HL_db_AP_Flag));
            eqDataKeepStep(linkArray[i]+5, 6);
        }
    }
}

//================================================================================
//分频模式下拉列表框
function keepLinkOutHpfMode(curChannel, value) { //分频高通模式
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).HPFData.HL_Type = value;

        }
    }
}

function keepLinkOutLpfMode(curChannel, value) { //分频低通模式
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).LPFData.HL_Type = value;
        }
    }
}

function keepLinkOutHpfSlope(curChannel, value) { //分频高通斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if(getOutChannelData(linkArray[i]).HPFData.HL_Type === 0){
                getOutChannelData(linkArray[i]).HPFData.LR_Level = value;
            } else {
                getOutChannelData(linkArray[i]).HPFData.HL_Oct = value;
            }
        }
    }
}

function keepLinkOutLpfSlope(curChannel, value) { //分频低通斜率
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if(getOutChannelData(linkArray[i]).LPFData.HL_Type === 0){
                getOutChannelData(linkArray[i]).LPFData.LR_Level = value;
            } else {
                getOutChannelData(linkArray[i]).LPFData.HL_Oct = value;
            }
        }
    }
}

//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//按钮  BUTTON
//相位按钮
function keepLinkInputPhase(curChannel, value) { //输入相位
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).polar = value;
        }
    }
    initPolar();
}


function keepLinkOutPhase(curChannel, value) { //输出相位
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getOutChannelData(linkArray[i]).polar = value;
        }
    }
    initPolar();
}


//==========================================================================================
//EQ旁通按钮
function keepLinkEq1Button(curChannel, value){  //EQ1按钮
    if (curChannel < 5) {
        keepLinkInputEq1Button(curChannel, value);
    } else {
        keepLinkOutEq1Button(curChannel, value);
    }
}

function keepLinkInputEq1Button(curChannel, value) { //输入EQ1按钮
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if (getInputChannelData(linkArray[i]).InEQ.EQ1.type > 2) {
                getInputChannelData(linkArray[i]).InEQ.EQ1.HL_db_AP_Flag = SET_4L_BYTE(getInputChannelData(linkArray[i]).InEQ.EQ1.HL_db_AP_Flag, value);
            } else {
                getInputChannelData(linkArray[i]).InEQ.EQ1.level = value;
            }
            eqDataKeepStep(linkArray[i]+1, 1);
        }
    }
}


function keepLinkOutEq1Button(curChannel, value) {   //输出EQ1按钮
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if (getOutChannelData(linkArray[i]).OutEQ.EQ1.type > 2) {
                getOutChannelData(linkArray[i]).OutEQ.EQ1.HL_db_AP_Flag = SET_4L_BYTE(getOutChannelData(linkArray[i]).OutEQ.EQ1.HL_db_AP_Flag, value);
            } else {
                getOutChannelData(linkArray[i]).OutEQ.EQ1.level = value;
            }
            eqDataKeepStep(linkArray[i]+5, 1);
        }
    }
}

//==========================================================================================
function keepLinkEq2Button(curChannel, value){  //EQ2按钮
    if (curChannel < 5) {
        keepLinkInputEq2Button(curChannel, value);
    } else {
        keepLinkOutEq2Button(curChannel, value);
    }
}

function keepLinkInputEq2Button(curChannel, value) { //输入EQ2按钮
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if (getInputChannelData(linkArray[i]).InEQ.EQ2.type > 2) {
                getInputChannelData(linkArray[i]).InEQ.EQ2.HL_db_AP_Flag = SET_4L_BYTE(getInputChannelData(linkArray[i]).InEQ.EQ2.HL_db_AP_Flag, value);
            } else {
                getInputChannelData(linkArray[i]).InEQ.EQ2.level = value;
            }
            eqDataKeepStep(linkArray[i]+1, 2);
        }
    }
}


function keepLinkOutEq2Button(curChannel, value) {   //输出EQ2按钮
    var i;
    var linkArray = getLinkOutArray(curChannel);
    console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if (getOutChannelData(linkArray[i]).OutEQ.EQ2.type > 2) {
                getOutChannelData(linkArray[i]).OutEQ.EQ2.HL_db_AP_Flag = SET_4L_BYTE(getOutChannelData(linkArray[i]).OutEQ.EQ2.HL_db_AP_Flag, value);
            } else {
                getOutChannelData(linkArray[i]).OutEQ.EQ2.level = value;

            }
            eqDataKeepStep(linkArray[i]+5, 2);
        }
    }
}
//==========================================================================================
function keepLinkEq3Button(curChannel, value){  //EQ3按钮
    if (curChannel < 5) {
        keepLinkInputEq3Button(curChannel, value);
    } else {
        keepLinkOutEq3Button(curChannel, value);
    }
}

function keepLinkInputEq3Button(curChannel, value) { //输入EQ3按钮
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if (getInputChannelData(linkArray[i]).InEQ.EQ3.type > 2) {
                getInputChannelData(linkArray[i]).InEQ.EQ3.HL_db_AP_Flag = SET_4L_BYTE(getInputChannelData(linkArray[i]).InEQ.EQ3.HL_db_AP_Flag, value);
            } else {
                getInputChannelData(linkArray[i]).InEQ.EQ3.level = value;
            }
            eqDataKeepStep(linkArray[i]+1, 3);
        }
    }
}


function keepLinkOutEq3Button(curChannel, value) {   //输出EQ3按钮
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if (getOutChannelData(linkArray[i]).OutEQ.EQ3.type > 2) {
                getOutChannelData(linkArray[i]).OutEQ.EQ3.HL_db_AP_Flag = SET_4L_BYTE(getOutChannelData(linkArray[i]).OutEQ.EQ3.HL_db_AP_Flag, value);
            } else {
                getOutChannelData(linkArray[i]).OutEQ.EQ3.level = value;
            }
            eqDataKeepStep(linkArray[i]+5, 3);

        }
    }
}
//==========================================================================================
function keepLinkEq4Button(curChannel, value){  //EQ4按钮
    if (curChannel < 5) {
        keepLinkInputEq4Button(curChannel, value);
    } else {
        keepLinkOutEq4Button(curChannel, value);
    }
}

function keepLinkInputEq4Button(curChannel, value) { //输入EQ4按钮
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if (getInputChannelData(linkArray[i]).InEQ.EQ4.type > 2) {
                getInputChannelData(linkArray[i]).InEQ.EQ4.HL_db_AP_Flag = SET_4L_BYTE(getInputChannelData(linkArray[i]).InEQ.EQ4.HL_db_AP_Flag, value);
            } else {
                getInputChannelData(linkArray[i]).InEQ.EQ4.level = value;
            }
            eqDataKeepStep(linkArray[i]+1, 4);
        }
    }
}


function keepLinkOutEq4Button(curChannel, value) {   //输出EQ4按钮
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if (getOutChannelData(linkArray[i]).OutEQ.EQ4.type > 2) {
                getOutChannelData(linkArray[i]).OutEQ.EQ4.HL_db_AP_Flag = SET_4L_BYTE(getOutChannelData(linkArray[i]).OutEQ.EQ4.HL_db_AP_Flag, value);
            } else {
                getOutChannelData(linkArray[i]).OutEQ.EQ4.level = value;
            }
            eqDataKeepStep(linkArray[i]+5, 4);

        }
    }
}
//==========================================================================================
function keepLinkEq5Button(curChannel, value){  //EQ5按钮
    if (curChannel < 5) {
        keepLinkInputEq5Button(curChannel, value);
    } else {
        keepLinkOutEq5Button(curChannel, value);
    }
}

function keepLinkInputEq5Button(curChannel, value) { //输入EQ5按钮
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if (getInputChannelData(linkArray[i]).InEQ.EQ5.type > 2) {
                getInputChannelData(linkArray[i]).InEQ.EQ5.HL_db_AP_Flag = SET_4L_BYTE(getInputChannelData(linkArray[i]).InEQ.EQ5.HL_db_AP_Flag, value);
            } else {
                getInputChannelData(linkArray[i]).InEQ.EQ5.level = value;
            }
            eqDataKeepStep(linkArray[i]+1, 5);
        }
    }
}


function keepLinkOutEq5Button(curChannel, value) {   //输出EQ5按钮
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if (getOutChannelData(linkArray[i]).OutEQ.EQ5.type > 2) {
                getOutChannelData(linkArray[i]).OutEQ.EQ5.HL_db_AP_Flag = SET_4L_BYTE(getOutChannelData(linkArray[i]).OutEQ.EQ5.HL_db_AP_Flag, value);
            } else {
                getOutChannelData(linkArray[i]).OutEQ.EQ5.level = value;
            }
            eqDataKeepStep(linkArray[i]+5, 5);
        }
    }
}
//==========================================================================================
function keepLinkEq6Button(curChannel, value){  //EQ6按钮
    if (curChannel < 5) {
        keepLinkInputEq6Button(curChannel, value);
    } else {
        keepLinkOutEq6Button(curChannel, value);
    }
}

function keepLinkInputEq6Button(curChannel, value) { //输入EQ6按钮
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if (getInputChannelData(linkArray[i]).InEQ.EQ6.type > 2) {
                getInputChannelData(linkArray[i]).InEQ.EQ6.HL_db_AP_Flag = SET_4L_BYTE(getInputChannelData(linkArray[i]).InEQ.EQ6.HL_db_AP_Flag, value);
            } else {
                getInputChannelData(linkArray[i]).InEQ.EQ6.level = value;
            }
            eqDataKeepStep(linkArray[i]+1, 6);
        }
    }
}


function keepLinkOutEq6Button(curChannel, value) {   //输出EQ6按钮
    var i;
    var linkArray = getLinkOutArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            if (getOutChannelData(linkArray[i]).OutEQ.EQ6.type > 2) {
                getOutChannelData(linkArray[i]).OutEQ.EQ6.HL_db_AP_Flag = SET_4L_BYTE(getOutChannelData(linkArray[i]).OutEQ.EQ6.HL_db_AP_Flag, value);
            } else {
                getOutChannelData(linkArray[i]).OutEQ.EQ6.level = value;
            }
            eqDataKeepStep(linkArray[i]+5, 6);
        }
    }
}


//==========================================================================================
//DEQ旁通按钮
function keepLinkInputDeq1Button(curChannel, value) {
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InDeq1.level = value;
        }
    }
}


function keepLinkInputDeq2Button(curChannel, value) {
    var i;
    var linkArray = getLinkInputArray(curChannel);
    // console.log(linkArray);
    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++) {
            getInputChannelData(linkArray[i]).InDeq2.level = value;
        }
    }
}

//==================================================================================================
//==================================================================================================
//曲线联调

function keepLinkCurveEqData(curChannel, eqId) { //曲线联调
    if (curChannel < 5) {
        keepLinkCurveInputEqData(curChannel, eqId);
    } else {
        keepLinkCurveOutEqData(curChannel, eqId);
    }
    // console.log('curChannel:  ' + curChannel + '   eqId:' + eqId);
}


function keepLinkCurveInputEqData(curChannel, eqId) { //输入曲线联调
    var i;
    var linkArray = getLinkInputArray(curChannel);
    var curChannelData =  getInputChannelData(curChannel-1);
    var originalEq, targetEq;
    switch (eqId) {
        case 1:
            originalEq = curChannelData.InEQ.EQ1;
            for(i=0;i<linkArray.length;i++) {
                targetEq = getInputChannelData(linkArray[i]).InEQ.EQ1;
                keepLinkEqData(originalEq, targetEq);
                eqDataKeepStep(linkArray[i]+1, 1);

            }
            break;
        case 2:
            originalEq = curChannelData.InEQ.EQ2;
            for(i=0;i<linkArray.length;i++) {
                targetEq = getInputChannelData(linkArray[i]).InEQ.EQ2;
                keepLinkEqData(originalEq, targetEq);
                eqDataKeepStep(linkArray[i]+1, 2);
            }
            break;
        case 3:
            originalEq = curChannelData.InEQ.EQ3;
            for(i=0;i<linkArray.length;i++) {
                targetEq = getInputChannelData(linkArray[i]).InEQ.EQ3;
                keepLinkEqData(originalEq, targetEq);
                eqDataKeepStep(linkArray[i]+1, 3);
            }
            break;
        case 4:
            originalEq = curChannelData.InEQ.EQ4;
            for(i=0;i<linkArray.length;i++) {
                targetEq = getInputChannelData(linkArray[i]).InEQ.EQ4;
                keepLinkEqData(originalEq, targetEq);
                eqDataKeepStep(linkArray[i]+1, 4);
            }
            break;
        case 5:
            originalEq = curChannelData.InEQ.EQ5;
            for(i=0;i<linkArray.length;i++) {
                targetEq = getInputChannelData(linkArray[i]).InEQ.EQ5;
                keepLinkEqData(originalEq, targetEq);
                eqDataKeepStep(linkArray[i]+1, 5);
            }
            break;
        case 6:
            originalEq = curChannelData.InEQ.EQ6;
            for(i=0;i<linkArray.length;i++) {
                targetEq = getInputChannelData(linkArray[i]).InEQ.EQ6;
                keepLinkEqData(originalEq, targetEq);
                eqDataKeepStep(linkArray[i]+1, 6);
            }
            break;
        default:
            break;
    }
}

function keepLinkCurveOutEqData(curChannel, eqId) { //输出曲线联调
    var i;
    var linkArray = getLinkOutArray(curChannel);
    var curChannelData =  getOutChannelData(curChannel-5);
    var originalEq, targetEq;
    switch (eqId) {
        case 1:
            originalEq = curChannelData.OutEQ.EQ1;
            for(i=0;i<linkArray.length;i++) {
                targetEq = getOutChannelData(linkArray[i]).OutEQ.EQ1;
                keepLinkEqData(originalEq, targetEq);
                eqDataKeepStep(linkArray[i]+5, 1);
            }
            break;
        case 2:
            originalEq = curChannelData.OutEQ.EQ2;
            for(i=0;i<linkArray.length;i++) {
                targetEq = getOutChannelData(linkArray[i]).OutEQ.EQ2;
                keepLinkEqData(originalEq, targetEq);
                eqDataKeepStep(linkArray[i]+5, 2);
            }
            break;
        case 3:
            originalEq = curChannelData.OutEQ.EQ3;
            for(i=0;i<linkArray.length;i++) {
                targetEq = getOutChannelData(linkArray[i]).OutEQ.EQ3;
                keepLinkEqData(originalEq, targetEq);
                eqDataKeepStep(linkArray[i]+5, 3);
            }
            break;
        case 4:
            originalEq = curChannelData.OutEQ.EQ4;
            for(i=0;i<linkArray.length;i++) {
                targetEq = getOutChannelData(linkArray[i]).OutEQ.EQ4;
                keepLinkEqData(originalEq, targetEq);
                eqDataKeepStep(linkArray[i]+5, 4);
            }
            break;
        case 5:
            originalEq = curChannelData.OutEQ.EQ5;
            for(i=0;i<linkArray.length;i++) {
                targetEq = getOutChannelData(linkArray[i]).OutEQ.EQ5;
                keepLinkEqData(originalEq, targetEq);
                eqDataKeepStep(linkArray[i]+5, 5);
            }
            break;
        case 6:
            originalEq = curChannelData.OutEQ.EQ6;
            for(i=0;i<linkArray.length;i++) {
                targetEq = getOutChannelData(linkArray[i]).OutEQ.EQ6;
                keepLinkEqData(originalEq, targetEq);
                eqDataKeepStep(linkArray[i]+5, 6);
            }
            break;
        case 10: //高通
            for(i=0;i<linkArray.length;i++) {
                getOutChannelData(linkArray[i]).HPFData.HL_freq = curChannelData.HPFData.HL_freq;
                eqDataKeepStep(linkArray[i]+5, 7);
            }
            // console.log('高通');
            break;
        case 11: //低通
            for(i=0;i<linkArray.length;i++) {
                getOutChannelData(linkArray[i]).LPFData.HL_freq = curChannelData.LPFData.HL_freq;
                eqDataKeepStep(linkArray[i]+5, 8);
            }
            // console.log('低通');
            break;
        default:
            break;
    }
}

function keepLinkEqData(originalEq, targetEq) {
    targetEq.freq  = originalEq.freq;
    targetEq.bw    = originalEq.bw;
    targetEq.level = originalEq.level;
}


function keepLinkPhaseLineStatus(curChannel, value){  //EQ1模式
    if(curChannel < 5) {
        keepLinkInputPhaseLineStatus(curChannel, value);
    } else {
        keepLinkOutPhaseLineStatus(curChannel, value);
    }
}

function keepLinkInputPhaseLineStatus(curChannel, value) {
    var linkArray = getLinkInputArray(curChannel);
    for(var i=0; i<linkArray.length; i++){
        controlsData.buttonStates.buttonPhaseCurveStatus[linkArray[i]] = value;
    }
}


function keepLinkOutPhaseLineStatus(curChannel, value) {
    var linkArray = getLinkOutArray(curChannel);
    for(var i=0; i<linkArray.length; i++){
        controlsData.buttonStates.buttonPhaseCurveStatus[linkArray[i]+4] = value;
    }
}





