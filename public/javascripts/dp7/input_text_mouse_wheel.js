
function addInputTextMouseWheelListener(){
    var editControlID = [controlsId.TEXT_GATE, controlsId.TEXT_DELAY_MILLISECOND, controlsId.TEXT_DELAY_METER, controlsId.TEXT_DELAY_INCH];

    var eqEditControlID = [controlsId.TEXT_EQ1_FREQUENCY, controlsId.TEXT_EQ1_BANDWIDTH, controlsId.TEXT_EQ1_SLOPE, controlsId.TEXT_EQ1_GAIN,
        controlsId.TEXT_EQ2_FREQUENCY, controlsId.TEXT_EQ2_BANDWIDTH, controlsId.TEXT_EQ2_SLOPE, controlsId.TEXT_EQ2_GAIN,
        controlsId.TEXT_EQ3_FREQUENCY, controlsId.TEXT_EQ3_BANDWIDTH, controlsId.TEXT_EQ3_SLOPE, controlsId.TEXT_EQ3_GAIN,
        controlsId.TEXT_EQ4_FREQUENCY, controlsId.TEXT_EQ4_BANDWIDTH, controlsId.TEXT_EQ4_SLOPE, controlsId.TEXT_EQ4_GAIN,
        controlsId.TEXT_EQ5_FREQUENCY, controlsId.TEXT_EQ5_BANDWIDTH, controlsId.TEXT_EQ5_SLOPE, controlsId.TEXT_EQ5_GAIN,
        controlsId.TEXT_EQ6_FREQUENCY, controlsId.TEXT_EQ6_BANDWIDTH, controlsId.TEXT_EQ6_SLOPE, controlsId.TEXT_EQ6_GAIN];

    var deqEditControlID = [controlsId.TEXT_DEQ1_FREQUENCY, controlsId.TEXT_DEQ1_BANDWIDTH, controlsId.TEXT_DEQ1_LEVEL,
        controlsId.TEXT_DEQ2_FREQUENCY, controlsId.TEXT_DEQ2_BANDWIDTH, controlsId.TEXT_DEQ2_LEVEL,
        controlsId.TEXT_DEQ1_THRESHOLD, controlsId.TEXT_DEQ1_RATIO, controlsId.TEXT_DEQ1_ATTACK_TIME, controlsId.TEXT_DEQ1_RELEASE_TIME,
        controlsId.TEXT_DEQ2_THRESHOLD, controlsId.TEXT_DEQ2_RATIO, controlsId.TEXT_DEQ2_ATTACK_TIME, controlsId.TEXT_DEQ2_RELEASE_TIME,];

    var agcEditControlID = [controlsId.TEXT_THRESHOLD, controlsId.TEXT_TARGET_LEVEL, controlsId.TEXT_EXTENSION_RATIO, controlsId.TEXT_EXTENSION_ATTACK,
        controlsId.TEXT_EXTENSION_RELEASE, controlsId.TEXT_COMPRESSOR, controlsId.TEXT_COMP_RATIO, controlsId.TEXT_COMP_ATTACK, controlsId.TEXT_COMP_RELEASE];

    var gainEditControlID =  [controlsId.TEXT_VOLUME_A, controlsId.TEXT_VOLUME_B, controlsId.TEXT_VOLUME_C, controlsId.TEXT_VOLUME_D,
        controlsId.TEXT_VOLUME_OUT1, controlsId.TEXT_VOLUME_OUT2, controlsId.TEXT_VOLUME_OUT3, controlsId.TEXT_VOLUME_OUT4,
        controlsId.TEXT_VOLUME_OUT5, controlsId.TEXT_VOLUME_OUT6, controlsId.TEXT_VOLUME_OUT7, controlsId.TEXT_VOLUME_OUT8,
        controlsId.TEXT_GAIN];



    for(var i in editControlID){
        addTextMouseWheelEvent(editControlID[i]);
    }

    for(var t in eqEditControlID){
        addTextMouseWheelEvent(eqEditControlID[t]);
    }

    for(var n in deqEditControlID){
        addTextMouseWheelEvent(deqEditControlID[n]);
    }

    for(var c in agcEditControlID){
        addTextMouseWheelEvent(agcEditControlID[c]);
    }

    for(var b in gainEditControlID){
        addTextMouseWheelEvent(gainEditControlID[b]);
    }

    addOutTextMouseWheelEvent();

   var  editControl = document.getElementById("gain_setting");
    addMouseWheelEvent(editControl,'mousewheel',gainSettingMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',gainSettingMouseWheelRespond);

    editControl = document.getElementById("input_gain_setting");
    addMouseWheelEvent(editControl,'mousewheel',inputGainSettingMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',inputGainSettingMouseWheelRespond);
    //========================================================================================================
    //addEditOnchangeEvent();
}


function gainSettingMouseWheelRespond(ev){ // 中控 输出增益
    currentStep = parseInt(document.getElementById('gain_setting').value);
    mouseWheelRespond(ev);
    if(currentStep < -80){
        currentStep = -80;
    }else if(currentStep > 12){
        currentStep = 12;
    }
    document.getElementById('gain_setting').value = currentStep + 'dB';

    getOutputWriteCode();
}

function inputGainSettingMouseWheelRespond(ev){ //中控 输入增益
    currentStep = parseInt(document.getElementById('input_gain_setting').value);
    mouseWheelRespond(ev);
    if(currentStep < -80){
        currentStep = -80;
    }else if(currentStep > 12){
        currentStep = 12;
    }
    document.getElementById('input_gain_setting').value = currentStep + 'dB';

    getInputWriteCode();

}


function addMouseWheelEvent(obj, xEvent, fn) {
    if(obj.attachEvent){
        obj.attachEvent('on'+xEvent,fn);    //IE7 IE8 browser
    }else{
        obj.addEventListener(xEvent,fn,false);//mainstream browser
    }
}

function mouseWheelRespond(ev){
    var event = ev || window.event;
    var down; // 定义一个标志，当滚轮向下滚时，执行一些操作
    down = event.wheelDelta?event.wheelDelta<0:event.detail>0;
    if(down){
        currentStep--;
    }else {
        currentStep++;
    }
    if(event.preventDefault){/*FF 和 Chrome*/
        event.preventDefault();// 阻止默认事件
    }

    return false;
}


function addTextMouseWheelEvent(id) {
    var fn;
    var inputTextId;
    switch (id){
        case controlsId.TEXT_GATE:
            fn = gateMouseWheelRespond;
            inputTextId = 'text_gate';
            break;
        case controlsId.TEXT_DELAY_MILLISECOND:
            fn = delayTimeMouseWheelRespond;
            inputTextId = 'text_delay_millisecond';
            break;
        case controlsId.TEXT_DELAY_METER:
            fn = delayMeterMouseWheelRespond;
            inputTextId = 'text_delay_meter';
            break;
        case controlsId.TEXT_DELAY_INCH:
            fn = delayInchMouseWheelRespond;
            inputTextId = 'text_delay_inch';
            break;
        //===================================================
        case controlsId.TEXT_EQ1_FREQUENCY:
            fn = eq1FrequencyMouseWheelRespond;
            inputTextId = 'text_eq1_frequency';
            break;
        case controlsId.TEXT_EQ1_BANDWIDTH:
            fn = eq1BandwidthMouseWheelRespond;
            inputTextId = 'text_eq1_bandwidth';
            break;
        case controlsId.TEXT_EQ1_SLOPE:
            fn = eq1SlopeMouseWheelRespond;
            inputTextId = 'text_eq1_slope';
            break;
        case controlsId.TEXT_EQ1_GAIN:
            fn = eq1GainMouseWheelRespond;
            inputTextId = 'text_eq1_gain';
            break;
        //==================
        case controlsId.TEXT_EQ2_FREQUENCY:
            fn = eq2FrequencyMouseWheelRespond;
            inputTextId = 'text_eq2_frequency';
            break;
        case controlsId.TEXT_EQ2_BANDWIDTH:
            fn = eq2BandwidthMouseWheelRespond;
            inputTextId = 'text_eq2_bandwidth';
            break;
        case controlsId.TEXT_EQ2_SLOPE:
            fn = eq2SlopeMouseWheelRespond;
            inputTextId = 'text_eq2_slope';
            break;
        case controlsId.TEXT_EQ2_GAIN:
            fn = eq2GainMouseWheelRespond;
            inputTextId = 'text_eq2_gain';
            break;
        //==================
        case controlsId.TEXT_EQ3_FREQUENCY:
            fn = eq3FrequencyMouseWheelRespond;
            inputTextId = 'text_eq3_frequency';
            break;
        case controlsId.TEXT_EQ3_BANDWIDTH:
            fn = eq3BandwidthMouseWheelRespond;
            inputTextId = 'text_eq3_bandwidth';
            break;
        case controlsId.TEXT_EQ3_SLOPE:
            fn = eq3SlopeMouseWheelRespond;
            inputTextId = 'text_eq3_slope';
            break;
        case controlsId.TEXT_EQ3_GAIN:
            fn = eq3GainMouseWheelRespond;
            inputTextId = 'text_eq3_gain';
            break;
        //==================
        case controlsId.TEXT_EQ4_FREQUENCY:
            fn = eq4FrequencyMouseWheelRespond;
            inputTextId = 'text_eq4_frequency';
            break;
        case controlsId.TEXT_EQ4_BANDWIDTH:
            fn = eq4BandwidthMouseWheelRespond;
            inputTextId = 'text_eq4_bandwidth';
            break;
        case controlsId.TEXT_EQ4_SLOPE:
            fn = eq4SlopeMouseWheelRespond;
            inputTextId = 'text_eq4_slope';
            break;
        case controlsId.TEXT_EQ4_GAIN:
            fn = eq4GainMouseWheelRespond;
            inputTextId = 'text_eq4_gain';
            break;
        //==================
        case controlsId.TEXT_EQ5_FREQUENCY:
            fn = eq5FrequencyMouseWheelRespond;
            inputTextId = 'text_eq5_frequency';
            break;
        case controlsId.TEXT_EQ5_BANDWIDTH:
            fn = eq5BandwidthMouseWheelRespond;
            inputTextId = 'text_eq5_bandwidth';
            break;
        case controlsId.TEXT_EQ5_SLOPE:
            fn = eq5SlopeMouseWheelRespond;
            inputTextId = 'text_eq5_slope';
            break;
        case controlsId.TEXT_EQ5_GAIN:
            fn = eq5GainMouseWheelRespond;
            inputTextId = 'text_eq5_gain';
            break;
        //==================
        case controlsId.TEXT_EQ6_FREQUENCY:
            fn = eq6FrequencyMouseWheelRespond;
            inputTextId = 'text_eq6_frequency';
            break;
        case controlsId.TEXT_EQ6_BANDWIDTH:
            fn = eq6BandwidthMouseWheelRespond;
            inputTextId = 'text_eq6_bandwidth';
            break;
        case controlsId.TEXT_EQ6_SLOPE:
            fn = eq6SlopeMouseWheelRespond;
            inputTextId = 'text_eq6_slope';
            break;
        case controlsId.TEXT_EQ6_GAIN:
            fn = eq6GainMouseWheelRespond;
            inputTextId = 'text_eq6_gain';
            break;
        //===================================================
        case controlsId.TEXT_DEQ1_FREQUENCY:
            fn = deq1FrequencyMouseWheelRespond;
            inputTextId = 'text_deq1_frequency';
            break;
        case controlsId.TEXT_DEQ1_BANDWIDTH:
            fn = deq1BandwidthMouseWheelRespond;
            inputTextId = 'text_deq1_bandwidth';
            break;
        case controlsId.TEXT_DEQ1_LEVEL:
            fn = deq1LevelMouseWheelRespond;
            inputTextId = 'text_deq1_level';
            break;
        case controlsId.TEXT_DEQ2_FREQUENCY:
            fn = deq2FrequencyMouseWheelRespond;
            inputTextId = 'text_deq2_frequency';
            break;
        case controlsId.TEXT_DEQ2_BANDWIDTH:
            fn = deq2BandwidthMouseWheelRespond;
            inputTextId = 'text_deq2_bandwidth';
            break;
        case controlsId.TEXT_DEQ2_LEVEL:
            fn = deq2LevelMouseWheelRespond;
            inputTextId = 'text_deq2_level';
            break;
        case controlsId.TEXT_DEQ1_THRESHOLD:
            fn = deq1ThresholdMouseWheelRespond;
            inputTextId = 'deq1_threshold';
            break;
        case controlsId.TEXT_DEQ1_RATIO:
            fn = deq1RatioMouseWheelRespond;
            inputTextId = 'deq1_ratio';
            break;
        case controlsId.TEXT_DEQ1_ATTACK_TIME:
            fn = deq1AttackMouseWheelRespond;
            inputTextId = 'deq1_attack_time';
            break;
        case controlsId.TEXT_DEQ1_RELEASE_TIME:
            fn = deq1ReleaseMouseWheelRespond;
            inputTextId = 'deq1_release_time';
            break;

        case controlsId.TEXT_DEQ2_THRESHOLD:
            fn = deq2ThresholdMouseWheelRespond;
            inputTextId = 'deq2_threshold';
            break;
        case controlsId.TEXT_DEQ2_RATIO:
            fn = deq2RatioMouseWheelRespond;
            inputTextId = 'deq2_ratio';
            break;
        case controlsId.TEXT_DEQ2_ATTACK_TIME:
            fn = deq2AttackMouseWheelRespond;
            inputTextId = 'deq2_attack_time';
            break;
        case controlsId.TEXT_DEQ2_RELEASE_TIME:
            fn = deq2ReleaseMouseWheelRespond;
            inputTextId = 'deq2_release_time';
            break;

        //===================================================
        case controlsId.TEXT_THRESHOLD:
            fn = thresholdMouseWheelRespond;
            inputTextId = 'text_threshold';
            break;
        case controlsId.TEXT_TARGET_LEVEL:
            fn = targetLevelMouseWheelRespond;
            inputTextId = 'text_target_level';
            break;
        case controlsId.TEXT_EXTENSION_RATIO:
            fn = extensionRatioMouseWheelRespond;
            inputTextId = 'text_extension_ratio';
            break;
        case controlsId.TEXT_EXTENSION_ATTACK:
            fn = extensionAttackMouseWheelRespond;
            inputTextId = 'text_extension_attack';
            break;
        case controlsId.TEXT_EXTENSION_RELEASE:
            fn = extensionReleaseMouseWheelRespond;
            inputTextId = 'text_extension_release';
            break;
        case controlsId.TEXT_COMPRESSOR:
            fn = compressorMouseWheelRespond;
            inputTextId = 'text_compressor';
            break;
        case controlsId.TEXT_COMP_RATIO:
            fn = compRatioMouseWheelRespond;
            inputTextId = 'text_comp_ratio';
            break;
        case controlsId.TEXT_COMP_ATTACK:
            fn = compAttackMouseWheelRespond;
            inputTextId = 'text_comp_attack';
            break;
        case controlsId.TEXT_COMP_RELEASE:
            fn = compReleaseMouseWheelRespond;
            inputTextId = 'text_comp_release';
            break;
        //===================================================
        case controlsId.TEXT_VOLUME_A:
            fn = volumeAMouseWheelRespond;
            inputTextId = 'text_volume_a';
            break;
        case controlsId.TEXT_VOLUME_B:
            fn = volumeBMouseWheelRespond;
            inputTextId = 'text_volume_b';
            break;
        case controlsId.TEXT_VOLUME_C:
            fn = volumeCMouseWheelRespond;
            inputTextId = 'text_volume_c';
            break;
        case controlsId.TEXT_VOLUME_D:
            fn = volumeDMouseWheelRespond;
            inputTextId = 'text_volume_d';
            break;
        case controlsId.TEXT_VOLUME_OUT1:
            fn = volumeOut1MouseWheelRespond;
            inputTextId = 'text_volume_out1';
            break;
        case controlsId.TEXT_VOLUME_OUT2:
            fn = volumeOut2MouseWheelRespond;
            inputTextId = 'text_volume_out2';
            break;
        case controlsId.TEXT_VOLUME_OUT3:
            fn = volumeOut3MouseWheelRespond;
            inputTextId = 'text_volume_out3';
            break;
        case controlsId.TEXT_VOLUME_OUT4:
            fn = volumeOut4MouseWheelRespond;
            inputTextId = 'text_volume_out4';
            break;
        case controlsId.TEXT_VOLUME_OUT5:
            fn = volumeOut5MouseWheelRespond;
            inputTextId = 'text_volume_out5';
            break;
        case controlsId.TEXT_VOLUME_OUT6:
            fn = volumeOut6MouseWheelRespond;
            inputTextId = 'text_volume_out6';
            break;
        case controlsId.TEXT_VOLUME_OUT7:
            fn = volumeOut7MouseWheelRespond;
            inputTextId = 'text_volume_out7';
            break;
        case controlsId.TEXT_VOLUME_OUT8:
            fn = volumeOut8MouseWheelRespond;
            inputTextId = 'text_volume_out8';
            break;
        case controlsId.TEXT_GAIN:
            fn = gainMouseWheelRespond;
            inputTextId = 'text_gain';
            break;
        default:
            break;

    }
    currentEditControl = document.getElementById(inputTextId);
    addMouseWheelEvent(currentEditControl,'mousewheel',fn);
    addMouseWheelEvent(currentEditControl,'DOMMouseScroll',fn);
}



//====================================================================================================================
//noise_gate  &&  delay 输入延时
function gateMouseWheelRespond(ev){
    currentStep = controlsData.inputData.noisegate;
    mouseWheelRespond(ev);
    var editControl = document.getElementById('text_gate'); //门限
    checkCurrentStep(inputTextValueType.NOISE_GATE);
    controlsData.inputData.noisegate = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.NOISE_GATE);
    keepLinkInputGate(curButtonNo,currentStep);
}

function delayTimeMouseWheelRespond(ev){
    currentStep = controlsData.inputData.delay;
    mouseWheelRespond(ev);
    var editControl = document.getElementById('text_delay_millisecond'); //输入延时 毫秒
    checkCurrentStep(inputTextValueType.DELAY_TIME);
    controlsData.inputData.delay = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_inch');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkInputTime(curButtonNo, currentStep);
}

function delayMeterMouseWheelRespond(ev){
    currentStep = controlsData.inputData.delay;
    mouseWheelRespond(ev);
    var editControl = document.getElementById('text_delay_meter'); //输入延时 米
    checkCurrentStep(inputTextValueType.DELAY_TIME);
    controlsData.inputData.delay = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_millisecond');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_inch');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkInputTime(curButtonNo, currentStep);
}

function delayInchMouseWheelRespond(ev){
    currentStep = controlsData.inputData.delay;
    mouseWheelRespond(ev);
    var editControl = document.getElementById('text_delay_inch'); // 输入延时 英寸
    checkCurrentStep(inputTextValueType.DELAY_TIME);
    controlsData.inputData.delay = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    editControl = document.getElementById('text_delay_meter');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_millisecond');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    keepLinkInputTime(curButtonNo, currentStep);
}

//====================================================================================================================
//eq1
function eq1FrequencyMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq1_frequency');
    currentStep = eqData.EQ1.freq;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ1.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq1Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,1);
    DrawLine();
    curEqChannel = 1;
    showOrHideEqData();
}

function eq1BandwidthMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq1_bandwidth');
    currentStep = eqData.EQ1.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    eqData.EQ1.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    editControl = document.getElementById('text_eq1_slope');
    editControl.value = getDisplayValue(inputTextValueType.SLOPE);
    keepLinkEq1Bandwidth(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,1);
    DrawLine();
    curEqChannel = 1;
    showOrHideEqData();
}

function eq1SlopeMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq1_slope');
    currentStep = eqData.EQ1.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    eqData.EQ1.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.SLOPE);
    editControl = document.getElementById('text_eq1_bandwidth');
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkEq1Slope(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,1);
    DrawLine();
    curEqChannel = 1;
    showOrHideEqData();
}

function eq1GainMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq1_gain');
    currentStep = eqData.EQ1.level;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.EQ_GAIN);
    eqData.EQ1.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EQ_GAIN);
    keepLinkEq1Gain(curButtonNo, currentStep);
    setSliderPosition(controlsId.SLIDER_EQ1_THUMP, currentStep);
    eqDataKeepStep(curButtonNo,1);
    DrawLine();
    updateAllEqGainButton();

    curEqChannel = 1;
    showOrHideEqData();
}
//=====================================================================
//eq2
function eq2FrequencyMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq2_frequency');
    currentStep = eqData.EQ2.freq;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ2.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq2Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,2);
    DrawLine();
    curEqChannel = 2;
    showOrHideEqData();

}

function eq2BandwidthMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq2_bandwidth');
    currentStep = eqData.EQ2.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    eqData.EQ2.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    editControl = document.getElementById('text_eq2_slope');
    editControl.value = getDisplayValue(inputTextValueType.SLOPE);
    keepLinkEq2Bandwidth(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,2);
    DrawLine();
    curEqChannel = 2;
    showOrHideEqData();

}

function eq2SlopeMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq2_slope');
    currentStep = eqData.EQ2.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    eqData.EQ2.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.SLOPE);
    editControl = document.getElementById('text_eq2_bandwidth');
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkEq2Slope(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,2);
    DrawLine();
    curEqChannel = 2;
    showOrHideEqData();

}


function eq2GainMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq2_gain');
    currentStep = eqData.EQ2.level;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.EQ_GAIN);
    eqData.EQ2.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EQ_GAIN);
    keepLinkEq2Gain(curButtonNo, currentStep);
    setSliderPosition(controlsId.SLIDER_EQ2_THUMP, currentStep);
    eqDataKeepStep(curButtonNo,2);
    DrawLine();
    updateAllEqGainButton();
    curEqChannel = 2;
    showOrHideEqData();

}

//=====================================================================
//eq3
function eq3FrequencyMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq3_frequency');
    currentStep = eqData.EQ3.freq;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ3.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq3Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,3);
    DrawLine();
    curEqChannel = 3;
    showOrHideEqData();

}

function eq3BandwidthMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq3_bandwidth');
    currentStep = eqData.EQ3.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    eqData.EQ3.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    editControl = document.getElementById('text_eq3_slope');
    editControl.value = getDisplayValue(inputTextValueType.SLOPE);
    keepLinkEq3Bandwidth(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,3);
    DrawLine();
    curEqChannel = 3;
    showOrHideEqData();

}

function eq3SlopeMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq3_slope');
    currentStep = eqData.EQ3.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    eqData.EQ3.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.SLOPE);
    editControl = document.getElementById('text_eq3_bandwidth');
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkEq3Slope(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,3);
    DrawLine();
    curEqChannel = 3;
    showOrHideEqData();

}

function eq3GainMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq3_gain');
    currentStep = eqData.EQ3.level;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.EQ_GAIN);
    eqData.EQ3.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EQ_GAIN);
    keepLinkEq3Gain(curButtonNo, currentStep);
    setSliderPosition(controlsId.SLIDER_EQ3_THUMP, currentStep);
    eqDataKeepStep(curButtonNo,3);
    DrawLine();
    updateAllEqGainButton();
    curEqChannel = 3;
    showOrHideEqData();
}
//=====================================================================
//eq4
function eq4FrequencyMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq4_frequency');
    currentStep = eqData.EQ4.freq;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ4.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq4Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,4);
    DrawLine();
    curEqChannel = 4;
    showOrHideEqData();

}

function eq4BandwidthMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq4_bandwidth');
    currentStep = eqData.EQ4.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    eqData.EQ4.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    editControl = document.getElementById('text_eq4_slope');
    editControl.value = getDisplayValue(inputTextValueType.SLOPE);
    keepLinkEq4Bandwidth(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,4);
    DrawLine();
    curEqChannel = 4;
    showOrHideEqData();

}


function eq4SlopeMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq4_slope');
    currentStep = eqData.EQ4.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    eqData.EQ4.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.SLOPE);
    editControl = document.getElementById('text_eq4_bandwidth');
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkEq4Slope(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,4);
    DrawLine();
    curEqChannel = 4;
    showOrHideEqData();

}


function eq4GainMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq4_gain');
    currentStep = eqData.EQ4.level;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.EQ_GAIN);
    eqData.EQ4.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EQ_GAIN);
    keepLinkEq4Gain(curButtonNo, currentStep);
    setSliderPosition(controlsId.SLIDER_EQ4_THUMP, currentStep);
    eqDataKeepStep(curButtonNo,4);
    DrawLine();
    updateAllEqGainButton();
    curEqChannel = 4;
    showOrHideEqData();

}
//=====================================================================
//eq5
function eq5FrequencyMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq5_frequency');
    currentStep = eqData.EQ5.freq;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ5.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq5Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,5);
    DrawLine();
    curEqChannel = 5;
    showOrHideEqData();

}

function eq5BandwidthMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq5_bandwidth');
    currentStep = eqData.EQ5.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    eqData.EQ5.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    editControl = document.getElementById('text_eq5_slope');
    editControl.value = getDisplayValue(inputTextValueType.SLOPE);
    keepLinkEq5Bandwidth(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,5);
    DrawLine();
    curEqChannel = 5;
    showOrHideEqData();

}

function eq5SlopeMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq5_slope');
    currentStep = eqData.EQ5.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    eqData.EQ5.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.SLOPE);
    editControl = document.getElementById('text_eq5_bandwidth');
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkEq5Slope(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,5);
    DrawLine();
    curEqChannel = 5;
    showOrHideEqData();

}


function eq5GainMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq5_gain');
    currentStep = eqData.EQ5.level;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.EQ_GAIN);
    eqData.EQ5.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EQ_GAIN);
    keepLinkEq5Gain(curButtonNo, currentStep);
    setSliderPosition(controlsId.SLIDER_EQ5_THUMP, currentStep);
    eqDataKeepStep(curButtonNo,5);
    DrawLine();
    updateAllEqGainButton();
    curEqChannel = 5;
    showOrHideEqData();

}
//=====================================================================
//eq6
function eq6FrequencyMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq6_frequency');
    currentStep = eqData.EQ6.freq;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ6.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq6Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,6);
    DrawLine();
    curEqChannel = 6;
    showOrHideEqData();

}

function eq6BandwidthMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq6_bandwidth');
    currentStep = eqData.EQ6.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    eqData.EQ6.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    editControl = document.getElementById('text_eq6_slope');
    editControl.value = getDisplayValue(inputTextValueType.SLOPE);
    keepLinkEq6Bandwidth(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,6);
    DrawLine();
    curEqChannel = 6;
    showOrHideEqData();

}

function eq6SlopeMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq6_slope');
    currentStep = eqData.EQ6.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    eqData.EQ6.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.SLOPE);
    editControl = document.getElementById('text_eq6_bandwidth');
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkEq6Slope(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,6);
    DrawLine();
    curEqChannel = 6;
    showOrHideEqData();

}


function eq6GainMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq6_gain');
    currentStep = eqData.EQ6.level;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.EQ_GAIN);
    eqData.EQ6.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EQ_GAIN);
    keepLinkEq6Gain(curButtonNo, currentStep);
    setSliderPosition(controlsId.SLIDER_EQ6_THUMP, currentStep);
    eqDataKeepStep(curButtonNo,6);
    DrawLine();
    updateAllEqGainButton();
    curEqChannel = 6;
    showOrHideEqData();

}

//======================================================================================================================
//自动均衡DEQ
function deq1FrequencyMouseWheelRespond(ev){
    var editControl = document.getElementById('text_deq1_frequency');　// DEQ1频率
    currentStep = controlsData.inputData.InDeq1.req;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    controlsData.inputData.InDeq1.req = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkInputDeq1Frequency(curButtonNo, currentStep);
}

function deq1BandwidthMouseWheelRespond(ev){
    var editControl = document.getElementById('text_deq1_bandwidth'); // DEQ1带宽
    currentStep = controlsData.inputData.InDeq1.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    controlsData.inputData.InDeq1.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkInputDeq1Bandwidth(curButtonNo, currentStep);
}

function deq1LevelMouseWheelRespond(ev){
    var editControl = document.getElementById('text_deq1_level'); // DEQ1目标电平
    currentStep = controlsData.inputData.InDeq1.level;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.DEQ_LEVEL);
    controlsData.inputData.InDeq1.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_LEVEL);
    keepLinkInputDeq1Level(curButtonNo, currentStep);
    updateDeqButton();
}

function deq1ThresholdMouseWheelRespond(ev){
    var editControl = document.getElementById('deq1_threshold'); // DEQ1阈值
    currentStep = controlsData.inputData.DeqParam1.DEQ_Threshold;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.DEQ_THRESHOLD);
    controlsData.inputData.DeqParam1.DEQ_Threshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_THRESHOLD);
    keepLinkInputDeq1Threshold(curButtonNo, currentStep);
}

function deq1RatioMouseWheelRespond(ev){
    var editControl = document.getElementById('deq1_ratio'); // DEQ1比率
    currentStep = controlsData.inputData.DeqParam1.DEQ_ratio;
    mouseWheelRespond(ev);
    fixRatioCurrentStep(controlsData.inputData.DeqParam1.DEQ_ratio);
    checkCurrentStep(inputTextValueType.EXTENSION_RATION);
    controlsData.inputData.DeqParam1.DEQ_ratio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputDeq1Ratio(curButtonNo, currentStep);
}

function deq1AttackMouseWheelRespond(ev){
    var editControl = document.getElementById('deq1_attack_time');  // DEQ1响应时间
    currentStep = controlsData.inputData.DeqParam1.DEQ_a;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.DeqParam1.DEQ_a = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputDeq1AttackTime(curButtonNo, currentStep);
}

function deq1ReleaseMouseWheelRespond(ev){
    var editControl = document.getElementById('deq1_release_time');  // DEQ1释放时间
    currentStep = controlsData.inputData.DeqParam1.DEQ_r;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.DeqParam1.DEQ_r = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputDeq1ReleaseTime(curButtonNo, currentStep);
}

function deq2FrequencyMouseWheelRespond(ev){
    var editControl = document.getElementById('text_deq2_frequency');  // DEQ2频率
    currentStep = controlsData.inputData.InDeq2.req;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    controlsData.inputData.InDeq2.req = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkInputDeq2Frequency(curButtonNo, currentStep);
}

function deq2BandwidthMouseWheelRespond(ev){
    var editControl = document.getElementById('text_deq2_bandwidth');  // DEQ2带宽
    currentStep = controlsData.inputData.InDeq2.bw;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    controlsData.inputData.InDeq2.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkInputDeq2Bandwidth(curButtonNo, currentStep);
}

function deq2LevelMouseWheelRespond(ev){
    var editControl = document.getElementById('text_deq2_level');  // DEQ2目标电平
    currentStep = controlsData.inputData.InDeq2.level;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.DEQ_LEVEL);
    controlsData.inputData.InDeq2.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_LEVEL);
    keepLinkInputDeq2Level(curButtonNo, currentStep);
    updateDeqButton();
}

function deq2ThresholdMouseWheelRespond(ev){
    var editControl = document.getElementById('deq2_threshold');  // DEQ2阈值
    currentStep = controlsData.inputData.DeqParam2.DEQ_Threshold;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.DEQ_LEVEL);
    controlsData.inputData.DeqParam2.DEQ_Threshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_THRESHOLD);
    keepLinkInputDeq2Threshold(curButtonNo, currentStep);
}

function deq2RatioMouseWheelRespond(ev){
    var editControl = document.getElementById('deq2_ratio');  // DEQ2比率
    currentStep = controlsData.inputData.DeqParam2.DEQ_ratio;
    mouseWheelRespond(ev);
    fixRatioCurrentStep(controlsData.inputData.DeqParam2.DEQ_ratio);
    checkCurrentStep(inputTextValueType.EXTENSION_RATION);
    controlsData.inputData.DeqParam2.DEQ_ratio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputDeq2Ratio(curButtonNo, currentStep);
}

function deq2AttackMouseWheelRespond(ev){
    var editControl = document.getElementById('deq2_attack_time');  // DEQ2响应时间
    currentStep = controlsData.inputData.DeqParam2.DEQ_a;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.DeqParam2.DEQ_a = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputDeq2AttackTime(curButtonNo, currentStep);
}

function deq2ReleaseMouseWheelRespond(ev){
    var editControl = document.getElementById('deq2_release_time');  // DEQ2释放时间
    currentStep = controlsData.inputData.DeqParam2.DEQ_r;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.DeqParam2.DEQ_r = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputDeq2ReleaseTime(curButtonNo, currentStep);
}
//======================================================================================================================
//输入自动增益
function thresholdMouseWheelRespond(ev){
    var editControl = document.getElementById('text_threshold'); // 输入自动增益阈值
    currentStep = controlsData.inputData.agThreshold;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    controlsData.inputData.agThreshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    keepLinkInputThreshold(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}

function targetLevelMouseWheelRespond(ev){
    var editControl = document.getElementById('text_target_level'); // 输入自动增益目标电平
    currentStep = controlsData.inputData.agLevel;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.TARGET_LEVEL);
    controlsData.inputData.agLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    keepLinkInputLevel(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}


function extensionRatioMouseWheelRespond(ev){
    var editControl = document.getElementById('text_extension_ratio'); // 输入自动增益比率
    currentStep = controlsData.inputData.agRatio;
    mouseWheelRespond(ev);
    fixRatioCurrentStep(controlsData.inputData.agRatio);
    checkCurrentStep(inputTextValueType.EXTENSION_RATION);
    controlsData.inputData.agRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputExtendRatio(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}


function extensionAttackMouseWheelRespond(ev){
    var editControl = document.getElementById('text_extension_attack'); // 输入自动增益响应时间
    currentStep = controlsData.inputData.agAttack;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.agAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputExtendAttackTime(curButtonNo, currentStep);
}


function extensionReleaseMouseWheelRespond(ev){
    var editControl = document.getElementById('text_extension_release'); // 输入自动增益释放时间
    currentStep = controlsData.inputData.agRelease;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.agRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputExtendReleaseTime(curButtonNo, currentStep);
}


function compressorMouseWheelRespond(ev){
    var editControl = document.getElementById('text_compressor'); // 输入压缩电平
    currentStep = controlsData.inputData.compLevel;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.INPUT_COMPRESS_THRESHOLD);
    controlsData.inputData.compLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_COMPRESS_THRESHOLD);
    keepLinkInputCompressLevel(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}


function compRatioMouseWheelRespond(ev){
    var editControl = document.getElementById('text_comp_ratio'); // 输入压缩比
    currentStep = controlsData.inputData.compRatio;
    mouseWheelRespond(ev);
    fixRatioCurrentStep(controlsData.inputData.compRatio);
    checkCurrentStep(inputTextValueType.COMPRESS_RATION);
    controlsData.inputData.compRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.COMPRESS_RATION);
    keepLinkInputCompressRatio(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}


function compAttackMouseWheelRespond(ev){
    var editControl = document.getElementById('text_comp_attack'); // 输入响应时间
    currentStep = controlsData.inputData.compAttack;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.compAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputCompressAttackTime(curButtonNo, currentStep);
}


function compReleaseMouseWheelRespond(ev){
    var editControl = document.getElementById('text_comp_release'); // 输入 释放时间
    currentStep = controlsData.inputData.compRelease;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.compRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputCompressReleaseTime(curButtonNo, currentStep);
}

//====================================================================================================================
// 4 input_channel_gain + 8 out_channel_gain 输入增益  输出增益
function volumeAMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_a'); // 输入A 增益
    currentStep = currentGroupData.dataInputA.gain;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputA.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_A, currentStep);
    //console.log(currentGroupData.dataInputA.gain);

    keepLinkInputVolume(0,currentStep);
}


function volumeBMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_b'); // 输入B 增益
    currentStep = currentGroupData.dataInputB.gain;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputB.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_B, currentStep);
    keepLinkInputVolume(1,currentStep);
}


function volumeCMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_c'); // 输入C 增益
    currentStep = currentGroupData.dataInputC.gain;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputC.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_C, currentStep);
    keepLinkInputVolume(2,currentStep);
}


function volumeDMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_d'); // 输入D 增益
    currentStep = currentGroupData.dataInputD.gain;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputD.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_D, currentStep);
    keepLinkInputVolume(3,currentStep);
}

function volumeOut1MouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out1'); // 输出 1 增益
    currentStep = currentGroupData.dataOut1.gain;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut1.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT1, currentStep);
    keepLinkOutVolume(0,currentStep);
}


function volumeOut2MouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out2'); // 输出 2 增益
    currentStep = currentGroupData.dataOut2.gain;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut2.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT2, currentStep);
    keepLinkOutVolume(1,currentStep);
}


function volumeOut3MouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out3'); // 输出 3 增益
    currentStep = currentGroupData.dataOut3.gain;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut3.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT3, currentStep);
    keepLinkOutVolume(2,currentStep);
}


function volumeOut4MouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out4');  // 输出 4 增益
    currentStep = currentGroupData.dataOut4.gain;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut4.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT4, currentStep);
    keepLinkOutVolume(3,currentStep);
}


function volumeOut5MouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out5');  // 输出 5 增益
    currentStep = currentGroupData.dataOut5.gain;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut5.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT5, currentStep);
    keepLinkOutVolume(4,currentStep);
}


function volumeOut6MouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out6');  // 输出 6 增益
    currentStep = currentGroupData.dataOut6.gain;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut6.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT6, currentStep);
    keepLinkOutVolume(5,currentStep);
}


function volumeOut7MouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out7');  // 输出 7 增益
    currentStep = currentGroupData.dataOut7.gain;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut7.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT7, currentStep);
    keepLinkOutVolume(6,currentStep);
}

function volumeOut8MouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out8');  // 输出 8 增益
    currentStep = currentGroupData.dataOut8.gain;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut8.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT8, currentStep);
    keepLinkOutVolume(7,currentStep);
}

function gainMouseWheelRespond(ev){
    var editControl = document.getElementById('text_gain'); //总 增益
    currentStep = getChannelGain(curButtonNo);
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    setChannelGain(curButtonNo, currentStep);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setGainSliderPosition(currentStep);
    keepShortGainInStep(currentStep);
}


//输出通道
//===========================================================================================
function addOutTextMouseWheelEvent() {
    var editControl = document.getElementById("text_delay_millisecond_out");
    addMouseWheelEvent(editControl,'mousewheel',outDelayTimeMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',outDelayTimeMouseWheelRespond);


    editControl = document.getElementById("text_delay_meter_out");
    addMouseWheelEvent(editControl,'mousewheel',outDelayMeterMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',outDelayMeterMouseWheelRespond);


    editControl = document.getElementById("text_delay_inch_out");
    addMouseWheelEvent(editControl,'mousewheel',outDelayInchMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',outDelayInchMouseWheelRespond);


    editControl = document.getElementById("text_hpf_frequency");
    addMouseWheelEvent(editControl,'mousewheel',hpfFrequencyMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',hpfFrequencyMouseWheelRespond);

    editControl = document.getElementById("text_lpf_frequency");
    addMouseWheelEvent(editControl,'mousewheel',lpfFrequencyMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',lpfFrequencyMouseWheelRespond);

     editControl = document.getElementById("text_threshold_compress_out");
    addMouseWheelEvent(editControl,'mousewheel',outThresholdCompressMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',outThresholdCompressMouseWheelRespond);

    editControl = document.getElementById("text_ratio_compress_out");
    addMouseWheelEvent(editControl,'mousewheel',outRatioCompressMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',outRatioCompressMouseWheelRespond);

    editControl = document.getElementById("text_attack_compress_out");
    addMouseWheelEvent(editControl,'mousewheel',outAttackCompressMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',outAttackCompressMouseWheelRespond);

    editControl = document.getElementById("text_release_compress_out");
    addMouseWheelEvent(editControl,'mousewheel',outReleaseCompressMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',outReleaseCompressMouseWheelRespond);


    editControl = document.getElementById("text_threshold_limit_out");
    addMouseWheelEvent(editControl,'mousewheel',outThresholdLimitMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',outThresholdLimitMouseWheelRespond);

    editControl = document.getElementById("text_attack_limit_out");
    addMouseWheelEvent(editControl,'mousewheel',outAttackLimitMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',outAttackLimitMouseWheelRespond);

    editControl = document.getElementById("text_release_limit_out");
    addMouseWheelEvent(editControl,'mousewheel',outReleaseLimitMouseWheelRespond);
    addMouseWheelEvent(editControl,'DOMMouseScroll',outReleaseLimitMouseWheelRespond);
}


//======================================================================================================================
//输出压缩限幅
function outThresholdCompressMouseWheelRespond(ev){
    var editControl = document.getElementById('text_threshold_compress_out'); //输出压缩电平
    currentStep = controlsData.outputData.compLevel;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
    controlsData.outputData.compLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
    keepLinkOutThresholdCompress(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
}

function outRatioCompressMouseWheelRespond(ev){
    var editControl = document.getElementById('text_ratio_compress_out'); //输出压缩比
    currentStep = controlsData.outputData.compRatio;
    mouseWheelRespond(ev);
    fixRatioCurrentStep(controlsData.outputData.compRatio);
    checkCurrentStep(inputTextValueType.COMPRESS_RATION);
    // checkCurrentStep(inputTextValueType.COMPRESS_RATION);
    controlsData.outputData.compRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.COMPRESS_RATION);
    keepLinkOutRatioCompress(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
}

function outAttackCompressMouseWheelRespond(ev){
    var editControl = document.getElementById('text_attack_compress_out'); //输出压缩响应时间
    currentStep = controlsData.outputData.compAttack;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.outputData.compAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkOutAttackCompress(curButtonNo, currentStep);
}

function outReleaseCompressMouseWheelRespond(ev){
    var editControl = document.getElementById('text_release_compress_out'); //输出压缩释放时间
    currentStep = controlsData.outputData.compR;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.outputData.compR = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkOutReleaseCompress(curButtonNo, currentStep);
}

function outThresholdLimitMouseWheelRespond(ev){
    var editControl = document.getElementById('text_threshold_limit_out'); //输出限幅电平
    currentStep = controlsData.outputData.limT;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.OUTPUT_LIMITER_THRESHOLD);
    controlsData.outputData.limT = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.OUTPUT_LIMITER_THRESHOLD);
    keepLinkOutThresholdLimit(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
}

function outAttackLimitMouseWheelRespond(ev){
    var editControl = document.getElementById('text_attack_limit_out'); //输出限幅响应时间
    currentStep = controlsData.outputData.limAttack;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.outputData.limAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkOutAttackLimit(curButtonNo, currentStep);
}

function outReleaseLimitMouseWheelRespond(ev){
    var editControl = document.getElementById('text_release_limit_out'); //输出限幅释放时间
    currentStep = controlsData.outputData.limRelease;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.outputData.limRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkOutReleaseLimit(curButtonNo, currentStep);
}

//======================================================================================================================
//输出延时
function outDelayTimeMouseWheelRespond(ev){
    currentStep = controlsData.outputData.delay;
    mouseWheelRespond(ev);
    var editControl = document.getElementById('text_delay_millisecond_out'); //输出 延时 毫秒
    checkCurrentStep(inputTextValueType.DELAY_TIME);
    controlsData.outputData.delay = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_inch_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkOutDelayTime(curButtonNo, currentStep);
}

function outDelayMeterMouseWheelRespond(ev){
    currentStep = controlsData.outputData.delay;
    mouseWheelRespond(ev);
    var editControl = document.getElementById('text_delay_meter_out'); //输出 延时 米
    checkCurrentStep(inputTextValueType.DELAY_TIME);
    controlsData.outputData.delay = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_millisecond_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_inch_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkOutDelayTime(curButtonNo, currentStep);
}

function outDelayInchMouseWheelRespond(ev){
    currentStep = controlsData.outputData.delay;
    mouseWheelRespond(ev);
    var editControl = document.getElementById('text_delay_inch_out'); //输出 延时 英尺
    checkCurrentStep(inputTextValueType.DELAY_TIME);
    controlsData.outputData.delay = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    editControl = document.getElementById('text_delay_meter_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_millisecond_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    keepLinkOutDelayTime(curButtonNo, currentStep);
}


//======================================================================================================================
//分频
function hpfFrequencyMouseWheelRespond(ev){
    var editControl = document.getElementById('text_hpf_frequency'); //分频 高通
    currentStep = controlsData.outputData.HPFData.HL_freq;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    if(currentStep > controlsData.outputData.LPFData.HL_freq) {
        currentStep = controlsData.outputData.LPFData.HL_freq;
    }
    controlsData.outputData.HPFData.HL_freq = currentStep;
    //console.log('controlsData.outputData.HPFData.HL_freq = currentStep:' + currentStep);
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkOutHpfFrequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,7);
    DrawLine();
    curEqChannel = 7;
    showOrHideEqData();
}

function lpfFrequencyMouseWheelRespond(ev){
    var editControl = document.getElementById('text_lpf_frequency'); //分频 低通
    currentStep = controlsData.outputData.LPFData.HL_freq;
    mouseWheelRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    if(currentStep < controlsData.outputData.HPFData.HL_freq) {
        currentStep = controlsData.outputData.HPFData.HL_freq;
    }
    controlsData.outputData.LPFData.HL_freq = currentStep;
    //console.log('controlsData.outputData.LPFData.HL_freq = currentStep:' + currentStep);
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkOutLpfFrequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,8);
    DrawLine();
    curEqChannel = 8;
    showOrHideEqData();
}


