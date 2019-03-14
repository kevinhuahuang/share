
var setSliderListener = function(parentElement, targetElement, textId, thumpId){
    targetElement.onmouseover = function(event) {
        document.documentElement.style.cursor = "pointer";
    };

    targetElement.onmouseout = function(event) {
        document.documentElement.style.cursor = "default";
    };


    targetElement.onmousedown = function(event) {
        isMouseDown = true;
        isMouseUp = false;
        params.flag = true;
        targetId = thumpId;
        thumpTextId = textId;
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if (getCss(targetElement, 'left') !== 'auto') {
            params.left = getCss(targetElement, 'left');
        }
        if (getCss(targetElement, 'top') !== 'auto') {
            params.top = getCss(targetElement, 'top');
        }

        /*为了阻止拖动浏览器中元素时发生默认事件，
        例如拖动图片时会出现一个新窗口显示该图片，下面代码可以阻止这种事件发生
        */
        if (event.preventDefault) {
            event.preventDefault();
        }else {
            event.returnValue = false;
        }

        var e = event;
        params.currentX = e.pageX - curtainLeft;
        params.currentY = e.pageY - curtainTop;
    };
};

//拖拽的实现
var addSliderListener = function() {
    var parentElement = document.getElementById('slider_track_gain');
    var targetElement = document.getElementById('slider_gain_thump');
    var gainSliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_GAIN_THUMP, 'slider_gain_thump');

    parentElement = document.getElementById('slider_track_eq1');
    targetElement = document.getElementById('slider_eq1_thump');
    var eq1SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_EQ1_THUMP, 'slider_eq1_thump');
    targetElement = document.getElementById('slider_eq2_thump');
    var eq2SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_EQ2_THUMP, 'slider_eq2_thump');
    targetElement = document.getElementById('slider_eq3_thump');
    var eq3SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_EQ3_THUMP, 'slider_eq3_thump');
    targetElement = document.getElementById('slider_eq4_thump');
    var eq4SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_EQ4_THUMP, 'slider_eq4_thump');
    targetElement = document.getElementById('slider_eq5_thump');
    var eq5SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_EQ5_THUMP, 'slider_eq5_thump');
    targetElement = document.getElementById('slider_eq6_thump');
    var eq6SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_EQ6_THUMP, 'slider_eq6_thump');

    parentElement = document.getElementById('slider_track_input_a');
    targetElement = document.getElementById('slider_input_a_thump');
    var inputASliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_GAIN_INPUT_A, 'slider_input_a_thump');
    targetElement = document.getElementById('slider_input_b_thump');
    var inputBSliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_GAIN_INPUT_B, 'slider_input_b_thump');
    targetElement = document.getElementById('slider_input_c_thump');
    var inputCSliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_GAIN_INPUT_C, 'slider_input_c_thump');
    targetElement = document.getElementById('slider_input_d_thump');
    var inputDSliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_GAIN_INPUT_D, 'slider_input_d_thump');

    parentElement = document.getElementById('slider_track_out1');
    targetElement = document.getElementById('slider_out1_thump');
    var out1SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_GAIN_OUT1, 'slider_out1_thump');
    targetElement = document.getElementById('slider_out2_thump');
    var out2SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_GAIN_OUT2, 'slider_out2_thump');
    targetElement = document.getElementById('slider_out3_thump');
    var out3SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_GAIN_OUT3, 'slider_out3_thump');
    targetElement = document.getElementById('slider_out4_thump');
    var out4SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_GAIN_OUT4, 'slider_out4_thump');
    targetElement = document.getElementById('slider_out5_thump');
    var out5SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_GAIN_OUT5, 'slider_out5_thump');
    targetElement = document.getElementById('slider_out6_thump');
    var out6SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_GAIN_OUT6, 'slider_out6_thump');
    targetElement = document.getElementById('slider_out7_thump');
    var out7SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_GAIN_OUT7, 'slider_out7_thump');
    targetElement = document.getElementById('slider_out8_thump');
    var out8SliderListener = setSliderListener(parentElement, targetElement, controlsId.SLIDER_GAIN_OUT8, 'slider_out8_thump');
};

var getCss = function(o, key) {
    // return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
    return document.defaultView.getComputedStyle(o, false)[key];
};

window.onmouseup = function(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
    document.documentElement.style.cursor = 'default';
    clearInterval(upDownInterval);
    upDownPressTime = 0;
    isMouseDown = false;
    isMouseUp  = true;
    isMouseMove = false;
    params.flag = false;
    paramsOfEQ.flag = false;
    paramsOfEQ.isDown = false;
    paramsOfEQ.isUp = true;
    paramsOfEQ.isMove = false;
    paramsOfLRect.isHover = false;
    paramsOfLRect.isDown = false;
    paramsOfLRect.flag = false;
    paramsOfRRect.isHover = false;
    paramsOfRRect.isDown = false;
    paramsOfRRect.flag = false;
    paramsOfInputPoint.isHover = false;
    paramsOfInputPoint.isDown = false;
    paramsOfInputPoint.flag = false;
    paramsOfOutPoint.isHover = false;
    paramsOfOutPoint.isDown = false;
    paramsOfOutPoint.flag = false;
    targetId = 'none';
    // var targetElement = document.getElementById(targetId);
    // if (getCss(targetElement, 'left') !== 'auto') {
    //     params.left = getCss(targetElement, 'left');
    // }
    // if (getCss(targetElement, 'top') !== 'auto') {
    //     params.top = getCss(targetElement, 'top');
    // }
};


window.onmousemove = function(event) {
    var pointRect = new PointClass(0,0);
    var e = event ? event : window.event;
    if(isMouseDown && params.flag){
        if (targetId === 'none'){
            return;
        }
        var nowX = e.pageX - curtainLeft,
            nowY = e.pageY - curtainTop;
        var disX = nowX - params.currentX,
            disY = nowY - params.currentY;
        var topT = parseFloat(params.top) + disY + 'px';
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById(targetId);
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);
    }

    paramsOfEQ.isMove = true;
    if(paramsOfEQ.isDown && paramsOfEQ.isMove && paramsOfEQ.flag) {
        var downPoint = new PointClass(paramsOfEQ.currentX, paramsOfEQ.currentY);
        var point = new PointClass(e.pageX - curtainLeft, e.pageY - curtainTop);
        if(curButtonNo < 5) {
            m_nInMapEQ[curButtonNo-1].filterArray[paramsOfEQ.index-1].PointToFD(point); //求得频率值与增益值
        } else {
            if(paramsOfEQ.index > 9 ){
                var freq;
                if(paramsOfEQ.index===10) {
                    // console.log("HPF");
                    freq = m_nOutMapEQ[curButtonNo-5].filterArray[10].GetSendFreq();
                    m_nOutMapEQ[curButtonNo-5].filterArray[paramsOfEQ.index-1].PointToHLFreq(point,freq); //求得频率值与增益值
                } else {
                    // console.log("LPF");
                    freq = m_nOutMapEQ[curButtonNo-5].filterArray[9].GetSendFreq();
                    m_nOutMapEQ[curButtonNo-5].filterArray[paramsOfEQ.index-1].PointToHLFreq(point,freq); //求得频率值与增益值
                }
            } else{

                m_nOutMapEQ[curButtonNo-5].filterArray[paramsOfEQ.index-1].PointToFD(point); //求得频率值与增益值
            }

        }
        curveDataKeepStep(curButtonNo, paramsOfEQ.index);
        keepLinkCurveEqData(curButtonNo, paramsOfEQ.index);
        DrawLine(); //绘制当前曲线
    }

    paramsOfLRect.isMove = true;
    if(paramsOfLRect.isDown && paramsOfLRect.isMove && paramsOfLRect.flag) {
        //pointRect = new PointClass(e.pageX - curtainLeft, e.pageY - curtainTop);
        pointRect.x = e.pageX - curtainLeft;
        pointRect.y = e.pageY - curtainTop;
        if(curButtonNo < 5){
            m_nInMapEQ[curButtonNo-1].filterArray[paramsOfLRect.index-1].PointToBW(pointRect, true);
        } else {
            m_nOutMapEQ[curButtonNo-5].filterArray[paramsOfLRect.index-1].PointToBW(pointRect, true); //求得频率值与增益值
        }


        curveDataKeepStep(curButtonNo, paramsOfLRect.index);
        keepLinkCurveEqData(curButtonNo, paramsOfLRect.index);
        DrawLine(); //绘制当前曲线
    }

    paramsOfRRect.isMove = true;
    if(paramsOfRRect.isDown && paramsOfRRect.isMove && paramsOfRRect.flag) {
        //pointRect = new PointClass(e.pageX + curtainLeft, e.pageY - curtainTop);
        pointRect.x = e.pageX - curtainLeft;
        pointRect.y = e.pageY - curtainTop;
        if(curButtonNo < 5){
            m_nInMapEQ[curButtonNo-1].filterArray[paramsOfRRect.index-1].PointToBW(pointRect, false);
        } else {
            m_nOutMapEQ[curButtonNo-5].filterArray[paramsOfRRect.index-1].PointToBW(pointRect, false); //求得频率值与增益值
        }

        curveDataKeepStep(curButtonNo, paramsOfRRect.index);
        keepLinkCurveEqData(curButtonNo, paramsOfRRect.index);
        DrawLine(); //绘制当前曲线
    }

    paramsOfInputPoint.isMove = true;
    if(paramsOfInputPoint.isDown && paramsOfInputPoint.isMove && paramsOfInputPoint.flag) {
        //pointRect = new PointClass(e.pageX - curtainLeft, e.pageY - curtainTop - curtainTop);
        pointRect.x = e.pageX - curtainLeft;
        pointRect.y = e.pageY - curtainTop;

        switch(paramsOfInputPoint.index){
            case 1:
                agcExtMap.Conver_AGC_Threshold(pointRect);
                //console.log("AGC_Threshold: " + pointRect.x + "," + pointRect.y);
                break;
            case 2:
                agcExtMap.Conver_AGC_Level(pointRect);
                //console.log("AGC_Level:" + pointRect.x + "," + pointRect.y);
                break;
            case 3:
                agcExtMap.Conver_Comp_Level(pointRect);
                //console.log("Comp_Level:" + pointRect.x + "," + pointRect.y);
                break;
            case 4:
                agcExtMap.Conver_AGC_Ratio(pointRect);
                //console.log("AGC_Ratio:" + pointRect.x + "," + pointRect.y);
                break;
            case 5:
                agcExtMap.Conver_Comp_Ratio(pointRect);
                //console.log("Comp_Ratio:" + pointRect.x + "," + pointRect.y);
                break;
            default:

                break;
        }

        agcExtMap.Draw_AGC_Comp();
    }


    paramsOfOutPoint.isMove = true;
    if(paramsOfOutPoint.isDown && paramsOfOutPoint.isMove && paramsOfOutPoint.flag) {
        //pointRect = new PointClass(e.pageX - curtainLeft, e.pageY - curtainTop);
        pointRect.x = e.pageX - curtainLeft;
        pointRect.y = e.pageY - curtainTop;

        switch(paramsOfOutPoint.index){
            case 1:
                comExtMap.Conver_OutComp_Level(pointRect);
                //console.log("Comp_Level: " + pointRect.x + "," + pointRect.y);
                break;
            case 2:
                comExtMap.Conver_OutLimT(pointRect);
                //console.log("Comp_Ratio:" + pointRect.x + "," + pointRect.y);
                break;
            case 3:
                comExtMap.Conver_OutComp_Ratio(pointRect);
                //console.log("LimT:" + pointRect.x + "," + pointRect.y);
                break;
            default:

                break;
        }

        comExtMap.DrawOutComp_LimT();
    }
};

function refreshSliderData(range){
    var editControl;
    if(thumpTextId > controlsId.SLIDER_EQ6_THUMP){
        currentStep =  constConfig.CHANNEL_GAIN_STEPS_MAX - parseInt(range*constConfig.CHANNEL_GAIN_STEPS_MAX);
        checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    }else{
        currentStep = constConfig.EQ_GAIN_STEPS_MAX - parseInt(range*constConfig.EQ_GAIN_STEPS_MAX);
        checkCurrentStep(inputTextValueType.EQ_GAIN);
    }

    switch (thumpTextId){
        case controlsId.SLIDER_EQ1_THUMP:
            editControl = document.getElementById('text_eq1_gain');
            eqData.EQ1.level = currentStep;
            keepLinkEq1Gain(curButtonNo, currentStep);
            eqDataKeepStep(curButtonNo,1);
            curEqChannel = 1;
            showOrHideEqData();
            break;
        case controlsId.SLIDER_EQ2_THUMP:
            editControl = document.getElementById('text_eq2_gain');
            eqData.EQ2.level = currentStep;
            keepLinkEq2Gain(curButtonNo, currentStep);
            eqDataKeepStep(curButtonNo,2);
            curEqChannel = 2;
            showOrHideEqData();
            break;
        case controlsId.SLIDER_EQ3_THUMP:
            editControl = document.getElementById('text_eq3_gain');
            eqData.EQ3.level = currentStep;
            keepLinkEq3Gain(curButtonNo, currentStep);
            eqDataKeepStep(curButtonNo,3);
            curEqChannel = 3;
            showOrHideEqData();
            break;
        case controlsId.SLIDER_EQ4_THUMP:
            editControl = document.getElementById('text_eq4_gain');
            eqData.EQ4.level = currentStep;
            keepLinkEq4Gain(curButtonNo, currentStep);
            eqDataKeepStep(curButtonNo,4);
            curEqChannel = 4;
            showOrHideEqData();
            break;
        case controlsId.SLIDER_EQ5_THUMP:
            editControl = document.getElementById('text_eq5_gain');
            eqData.EQ5.level = currentStep;
            keepLinkEq5Gain(curButtonNo, currentStep);
            eqDataKeepStep(curButtonNo,5);
            curEqChannel = 5;
            showOrHideEqData();
            break;
        case controlsId.SLIDER_EQ6_THUMP:
            editControl = document.getElementById('text_eq6_gain');
            eqData.EQ6.level = currentStep;
            keepLinkEq6Gain(curButtonNo, currentStep);
            eqDataKeepStep(curButtonNo,6);
            curEqChannel = 6;
            showOrHideEqData();
            break;
        case controlsId.SLIDER_GAIN_INPUT_A:
            editControl = document.getElementById('text_volume_a');
            currentGroupData.dataInputA.gain = currentStep;
            keepLongGainInStep(1, currentStep);
            keepLinkInputVolume(0, currentStep);
            break;
        case controlsId.SLIDER_GAIN_INPUT_B:
            editControl = document.getElementById('text_volume_b');
            currentGroupData.dataInputB.gain = currentStep;
            keepLongGainInStep(2, currentStep);
            keepLinkInputVolume(1, currentStep);
            break;
        case controlsId.SLIDER_GAIN_INPUT_C:
            editControl = document.getElementById('text_volume_c');
            currentGroupData.dataInputC.gain = currentStep;
            keepLongGainInStep(3, currentStep);
            keepLinkInputVolume(2, currentStep);
            break;
        case controlsId.SLIDER_GAIN_INPUT_D:
            editControl = document.getElementById('text_volume_d');
            currentGroupData.dataInputD.gain = currentStep;
            keepLongGainInStep(4, currentStep);
            keepLinkInputVolume(3, currentStep);
            break;
        case controlsId.SLIDER_GAIN_OUT1:
            editControl = document.getElementById('text_volume_out1');
            currentGroupData.dataOut1.gain = currentStep;
            keepLongGainInStep(5, currentStep);
            keepLinkOutVolume(0,currentStep);
            break;
        case controlsId.SLIDER_GAIN_OUT2:
            editControl = document.getElementById('text_volume_out2');
            currentGroupData.dataOut2.gain = currentStep;
            keepLongGainInStep(6, currentStep);
            keepLinkOutVolume(1,currentStep);
            break;
        case controlsId.SLIDER_GAIN_OUT3:
            editControl = document.getElementById('text_volume_out3');
            currentGroupData.dataOut3.gain = currentStep;
            keepLongGainInStep(7, currentStep);
            keepLinkOutVolume(2,currentStep);
            break;
        case controlsId.SLIDER_GAIN_OUT4:
            editControl = document.getElementById('text_volume_out4');
            currentGroupData.dataOut4.gain = currentStep;
            keepLongGainInStep(8, currentStep);
            keepLinkOutVolume(3,currentStep);
            break;
        case controlsId.SLIDER_GAIN_OUT5:
            editControl = document.getElementById('text_volume_out5');
            currentGroupData.dataOut5.gain = currentStep;
            keepLongGainInStep(9, currentStep);
            keepLinkOutVolume(4,currentStep);
            break;
        case controlsId.SLIDER_GAIN_OUT6:
            editControl = document.getElementById('text_volume_out6');
            currentGroupData.dataOut6.gain = currentStep;
            keepLongGainInStep(10, currentStep);
            keepLinkOutVolume(5,currentStep);
            break;
        case controlsId.SLIDER_GAIN_OUT7:
            editControl = document.getElementById('text_volume_out7');
            currentGroupData.dataOut7.gain = currentStep;
            keepLongGainInStep(11, currentStep);
            keepLinkOutVolume(6,currentStep);
            break;
        case controlsId.SLIDER_GAIN_OUT8:
            editControl = document.getElementById('text_volume_out8');
            currentGroupData.dataOut8.gain = currentStep;
            keepLongGainInStep(12, currentStep);
            keepLinkOutVolume(7,currentStep);
            break;
        case controlsId.SLIDER_GAIN_THUMP:
            editControl = document.getElementById('text_gain');
            setChannelGain(curButtonNo, currentStep);
            keepShortGainInStep(currentStep);
            break;
        default:
            break;

    }
    if(thumpTextId > controlsId.SLIDER_EQ6_THUMP){
        editControl.value = getChanelGain();
    }else{
        editControl.value = getEqGain();
        updateAllEqGainButton();
    }
    DrawLine();
}

function keepLongGainInStep(no, value) {
    if(curButtonNo === no){
        var gainEdit = document.getElementById('text_gain');
        currentStep = value;
        setGainSliderPosition(value);
        gainEdit.value = getChanelGain();
    }
}

function keepShortGainInStep(value) {
    var gainEdit;
    switch (curButtonNo){
        case 1:
            gainEdit = document.getElementById('text_volume_a');
            setSliderPosition(controlsId.SLIDER_GAIN_INPUT_A, value);
            keepLinkInputVolume(0,value);
            break;
        case 2:
            gainEdit = document.getElementById('text_volume_b');
            setSliderPosition(controlsId.SLIDER_GAIN_INPUT_B, value);
            keepLinkInputVolume(1,value);
            break;
        case 3:
            gainEdit = document.getElementById('text_volume_c');
            setSliderPosition(controlsId.SLIDER_GAIN_INPUT_C, value);
            keepLinkInputVolume(2,value);
            break;
        case 4:
            gainEdit = document.getElementById('text_volume_d');
            setSliderPosition(controlsId.SLIDER_GAIN_INPUT_D, value);
            keepLinkInputVolume(3,value);
            break;
        case 5:
            gainEdit = document.getElementById('text_volume_out1');
            setSliderPosition(controlsId.SLIDER_GAIN_OUT1, value);
            keepLinkOutVolume(0,value);
            break;
        case 6:
            gainEdit = document.getElementById('text_volume_out2');
            setSliderPosition(controlsId.SLIDER_GAIN_OUT2, value);
            keepLinkOutVolume(1,value);
            break;
        case 7:
            gainEdit = document.getElementById('text_volume_out3');
            setSliderPosition(controlsId.SLIDER_GAIN_OUT3, value);
            keepLinkOutVolume(2,value);
            break;
        case 8:
            gainEdit = document.getElementById('text_volume_out4');
            setSliderPosition(controlsId.SLIDER_GAIN_OUT4, value);
            keepLinkOutVolume(3,value);
            break;
        case 9:
            gainEdit = document.getElementById('text_volume_out5');
            setSliderPosition(controlsId.SLIDER_GAIN_OUT5, value);
            keepLinkOutVolume(4,value);
            break;
        case 10:
            gainEdit = document.getElementById('text_volume_out6');
            setSliderPosition(controlsId.SLIDER_GAIN_OUT6, value);
            keepLinkOutVolume(5,value);
            break;
        case 11:
            gainEdit = document.getElementById('text_volume_out7');
            setSliderPosition(controlsId.SLIDER_GAIN_OUT7, value);
            keepLinkOutVolume(6,value);
            break;
        case 12:
            gainEdit = document.getElementById('text_volume_out8');
            setSliderPosition(controlsId.SLIDER_GAIN_OUT8, value);
            keepLinkOutVolume(7,value);
            break;
        default:
            break;

    }
    gainEdit.value = getChanelGain();
}