

function addInputTextChangeListener(){
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

    // var nameEditControlID = [controlsId.TEXT_INPUT_A, controlsId.TEXT_INPUT_B, controlsId.TEXT_INPUT_C, controlsId.TEXT_INPUT_D,
    //     controlsId.TEXT_OUT_1, controlsId.TEXT_OUT_2, controlsId.TEXT_OUT_3, controlsId.TEXT_OUT_4,
    //     controlsId.TEXT_OUT_5, controlsId.TEXT_OUT_6, controlsId.TEXT_OUT_7, controlsId.TEXT_OUT_1];

    //var limitEditControlID = [controlsId.]

    //addTextChangeEvent(editControlID[0]);
    //addTextChangeEvent(editControlID[1]);
    for(var i in editControlID){
         addTextChangeEvent(editControlID[i]);
    }

    for(var t in eqEditControlID){
         addTextChangeEvent(eqEditControlID[t]);
    }


    for(var n in deqEditControlID){
        addTextChangeEvent(deqEditControlID[n]);
    }

    for(var c in agcEditControlID){
        addTextChangeEvent(agcEditControlID[c]);
    }

     for(var b in gainEditControlID){
         addTextChangeEvent(gainEditControlID[b]);
     }

     addOutTextChangeEvent();



    document.getElementById('gain_setting').addEventListener('change',gainSettingChangeRespond);
    document.getElementById('input_gain_setting').addEventListener('change',inputGainSettingChangeRespond);
}






//====================================================================================================================

function gainSettingChangeRespond(ev){  // 中控 输出增益
    currentStep = parseInt(document.getElementById('gain_setting').value);
    if(currentStep < -80){
        currentStep = -80;
    }else if(currentStep > 12){
        currentStep = 12;
    }
    document.getElementById('gain_setting').value = currentStep + 'dB';

    getOutputWriteCode();
}

function inputGainSettingChangeRespond(ev){ //中控 输入增益
    currentStep = parseInt(document.getElementById('input_gain_setting').value);
    if(currentStep < -80){
        currentStep = -80;
    }else if(currentStep > 12){
        currentStep = 12;
    }
    document.getElementById('input_gain_setting').value = currentStep + 'dB';

    getInputWriteCode();
}



function addTextChangeEvent(id) {
    var fn;
    var inputTextId;
    switch (id){
        case controlsId.TEXT_GATE:
            fn = gateChangeRespond;
            inputTextId = 'text_gate';
            break;
        case controlsId.TEXT_DELAY_MILLISECOND:
            fn = delayTimeChangeRespond;
            inputTextId = 'text_delay_millisecond';
            break;
        case controlsId.TEXT_DELAY_METER:
            fn = delayMeterChangeRespond;
            inputTextId = 'text_delay_meter';
            break;
        case controlsId.TEXT_DELAY_INCH:
            fn = delayInchChangeRespond;
            inputTextId = 'text_delay_inch';
            break;
        //===================================================
        case controlsId.TEXT_EQ1_FREQUENCY:
            fn = eq1FrequencyChangeRespond;
            inputTextId = 'text_eq1_frequency';
            break;
        case controlsId.TEXT_EQ1_BANDWIDTH:
            fn = eq1BandwidthChangeRespond;
            inputTextId = 'text_eq1_bandwidth';
            break;
        case controlsId.TEXT_EQ1_SLOPE:
            fn = eq1SlopeChangeRespond;
            inputTextId = 'text_eq1_slope';
            break;
        case controlsId.TEXT_EQ1_GAIN:
            fn = eq1GainChangeRespond;
            inputTextId = 'text_eq1_gain';
            break;
        //==================
        case controlsId.TEXT_EQ2_FREQUENCY:
            fn = eq2FrequencyChangeRespond;
            inputTextId = 'text_eq2_frequency';
            break;
        case controlsId.TEXT_EQ2_BANDWIDTH:
            fn = eq2BandwidthChangeRespond;
            inputTextId = 'text_eq2_bandwidth';
            break;
        case controlsId.TEXT_EQ2_SLOPE:
            fn = eq2SlopeChangeRespond;
            inputTextId = 'text_eq2_slope';
            break;
        case controlsId.TEXT_EQ2_GAIN:
            fn = eq2GainChangeRespond;
            inputTextId = 'text_eq2_gain';
            break;
        //==================
        case controlsId.TEXT_EQ3_FREQUENCY:
            fn = eq3FrequencyChangeRespond;
            inputTextId = 'text_eq3_frequency';
            break;
        case controlsId.TEXT_EQ3_BANDWIDTH:
            fn = eq3BandwidthChangeRespond;
            inputTextId = 'text_eq3_bandwidth';
            break;
        case controlsId.TEXT_EQ3_SLOPE:
            fn = eq3SlopeChangeRespond;
            inputTextId = 'text_eq3_slope';
            break;
        case controlsId.TEXT_EQ3_GAIN:
            fn = eq3GainChangeRespond;
            inputTextId = 'text_eq3_gain';
            break;
        //==================
        case controlsId.TEXT_EQ4_FREQUENCY:
            fn = eq4FrequencyChangeRespond;
            inputTextId = 'text_eq4_frequency';
            break;
        case controlsId.TEXT_EQ4_BANDWIDTH:
            fn = eq4BandwidthChangeRespond;
            inputTextId = 'text_eq4_bandwidth';
            break;
        case controlsId.TEXT_EQ4_SLOPE:
            fn = eq4SlopeChangeRespond;
            inputTextId = 'text_eq4_slope';
            break;
        case controlsId.TEXT_EQ4_GAIN:
            fn = eq4GainChangeRespond;
            inputTextId = 'text_eq4_gain';
            break;
        //==================
        case controlsId.TEXT_EQ5_FREQUENCY:
            fn = eq5FrequencyChangeRespond;
            inputTextId = 'text_eq5_frequency';
            break;
        case controlsId.TEXT_EQ5_BANDWIDTH:
            fn = eq5BandwidthChangeRespond;
            inputTextId = 'text_eq5_bandwidth';
            break;
        case controlsId.TEXT_EQ5_SLOPE:
            fn = eq5SlopeChangeRespond;
            inputTextId = 'text_eq5_slope';
            break;
        case controlsId.TEXT_EQ5_GAIN:
            fn = eq5GainChangeRespond;
            inputTextId = 'text_eq5_gain';
            break;
        //==================
        case controlsId.TEXT_EQ6_FREQUENCY:
            fn = eq6FrequencyChangeRespond;
            inputTextId = 'text_eq6_frequency';
            break;
        case controlsId.TEXT_EQ6_BANDWIDTH:
            fn = eq6BandwidthChangeRespond;
            inputTextId = 'text_eq6_bandwidth';
            break;
        case controlsId.TEXT_EQ6_SLOPE:
            fn = eq6SlopeChangeRespond;
            inputTextId = 'text_eq6_slope';
            break;
        case controlsId.TEXT_EQ6_GAIN:
            fn = eq6GainChangeRespond;
            inputTextId = 'text_eq6_gain';
            break;
        //===================================================
        case controlsId.TEXT_DEQ1_FREQUENCY:
            fn = deq1FrequencyChangeRespond;
            inputTextId = 'text_deq1_frequency';
            break;
        case controlsId.TEXT_DEQ1_BANDWIDTH:
            fn = deq1BandwidthChangeRespond;
            inputTextId = 'text_deq1_bandwidth';
            break;
        case controlsId.TEXT_DEQ1_LEVEL:
            fn = deq1LelChangeRespond;
            inputTextId = 'text_deq1_level';
            break;
        case controlsId.TEXT_DEQ2_FREQUENCY:
            fn = deq2FrequencyChangeRespond;
            inputTextId = 'text_deq2_frequency';
            break;
        case controlsId.TEXT_DEQ2_BANDWIDTH:
            fn = deq2BandwidthChangeRespond;
            inputTextId = 'text_deq2_bandwidth';
            break;
        case controlsId.TEXT_DEQ2_LEVEL:
            fn = deq2LelChangeRespond;
            inputTextId = 'text_deq2_level';
            break;
        case controlsId.TEXT_DEQ1_THRESHOLD:
            fn = deq1ThresholdChangeRespond;
            inputTextId = 'deq1_threshold';
            break;
        case controlsId.TEXT_DEQ1_RATIO:
            fn = deq1RatioChangeRespond;
            inputTextId = 'deq1_ratio';
            break;
        case controlsId.TEXT_DEQ1_ATTACK_TIME:
            fn = deq1AttackChangeRespond;
            inputTextId = 'deq1_attack_time';
            break;
        case controlsId.TEXT_DEQ1_RELEASE_TIME:
            fn = deq1ReleaseChangeRespond;
            inputTextId = 'deq1_release_time';
            break;

        case controlsId.TEXT_DEQ2_THRESHOLD:
            fn = deq2ThresholdChangeRespond;
            inputTextId = 'deq2_threshold';
            break;
        case controlsId.TEXT_DEQ2_RATIO:
            fn = deq2RatioChangeRespond;
            inputTextId = 'deq2_ratio';
            break;
        case controlsId.TEXT_DEQ2_ATTACK_TIME:
            fn = deq2AttackChangeRespond;
            inputTextId = 'deq2_attack_time';
            break;
        case controlsId.TEXT_DEQ2_RELEASE_TIME:
            fn = deq2ReleaseChangeRespond;
            inputTextId = 'deq2_release_time';
            break;





        //===================================================
        case controlsId.TEXT_THRESHOLD:
            fn = thresholdChangeRespond;
            inputTextId = 'text_threshold';
            break;
        case controlsId.TEXT_TARGET_LEVEL:
            fn = targetLelChangeRespond;
            inputTextId = 'text_target_level';
            break;
        case controlsId.TEXT_EXTENSION_RATIO:
            fn = extensionRatioChangeRespond;
            inputTextId = 'text_extension_ratio';
            break;
        case controlsId.TEXT_EXTENSION_ATTACK:
            fn = extensionAttackChangeRespond;
            inputTextId = 'text_extension_attack';
            break;
        case controlsId.TEXT_EXTENSION_RELEASE:
            fn = extensionReleaseChangeRespond;
            inputTextId = 'text_extension_release';
            break;
        case controlsId.TEXT_COMPRESSOR:
            fn = compressorChangeRespond;
            inputTextId = 'text_compressor';
            break;
        case controlsId.TEXT_COMP_RATIO:
            fn = compRatioChangeRespond;
            inputTextId = 'text_comp_ratio';
            break;
        case controlsId.TEXT_COMP_ATTACK:
            fn = compAttackChangeRespond;
            inputTextId = 'text_comp_attack';
            break;
        case controlsId.TEXT_COMP_RELEASE:
            fn = compReleaseChangeRespond;
            inputTextId = 'text_comp_release';
            break;
        //===================================================
        case controlsId.TEXT_VOLUME_A:
            fn = volumeAChangeRespond;
            inputTextId = 'text_volume_a';
            break;
        case controlsId.TEXT_VOLUME_B:
            fn = volumeBChangeRespond;
            inputTextId = 'text_volume_b';
            break;
        case controlsId.TEXT_VOLUME_C:
            fn = volumeCChangeRespond;
            inputTextId = 'text_volume_c';
            break;
        case controlsId.TEXT_VOLUME_D:
            fn = volumeDChangeRespond;
            inputTextId = 'text_volume_d';
            break;
        case controlsId.TEXT_VOLUME_OUT1:
            fn = volumeOut1ChangeRespond;
            inputTextId = 'text_volume_out1';
            break;
        case controlsId.TEXT_VOLUME_OUT2:
            fn = volumeOut2ChangeRespond;
            inputTextId = 'text_volume_out2';
            break;
        case controlsId.TEXT_VOLUME_OUT3:
            fn = volumeOut3ChangeRespond;
            inputTextId = 'text_volume_out3';
            break;
        case controlsId.TEXT_VOLUME_OUT4:
            fn = volumeOut4ChangeRespond;
            inputTextId = 'text_volume_out4';
            break;
        case controlsId.TEXT_VOLUME_OUT5:
            fn = volumeOut5ChangeRespond;
            inputTextId = 'text_volume_out5';
            break;
        case controlsId.TEXT_VOLUME_OUT6:
            fn = volumeOut6ChangeRespond;
            inputTextId = 'text_volume_out6';
            break;
        case controlsId.TEXT_VOLUME_OUT7:
            fn = volumeOut7ChangeRespond;
            inputTextId = 'text_volume_out7';
            break;
        case controlsId.TEXT_VOLUME_OUT8:
            fn = volumeOut8ChangeRespond;
            inputTextId = 'text_volume_out8';
            break;
        case controlsId.TEXT_GAIN:
            fn = gainChangeRespond;
            inputTextId = 'text_gain';
            break;
        default:
            break;

    }
    currentEditControl = document.getElementById(inputTextId);
    currentEditControl.addEventListener('change',fn);
}



//====================================================================================================================
function gateChangeRespond(){
    var editControl = document.getElementById('text_gate');  //门限
    var str = editControl.value;
    var num = parseInt(str);
    getRightInputTextChange(num, inputTextValueType.NOISE_GATE);
    controlsData.inputData.noisegate = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.NOISE_GATE);
    keepLinkInputGate(curButtonNo,currentStep);
    // alert('change');
}

//noise_gate  &&  delay 输入延时
function delayTimeChangeRespond(){
    var editControl = document.getElementById('text_delay_millisecond');//输入延时 毫秒
    var str = editControl.value;
    // var num = parseFloat(str);
    // getRightInputTextChange(num, inputTextValueType.DELAY_TIME);
    getRightDelayMillisecond(str);
    controlsData.inputData.delay = currentStep;
    controlsData.inputData.secondDelay = secondStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_inch');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkInputTime(curButtonNo, currentStep, secondStep);
}

function isRealNaN(val) {
    if(val === "" || val ==null){
        return false;
    }
    if(!isNaN(val)){
        return true;
    }else{
        return false;
    }
}

function getRightDelayMillisecond(strValue) {
    var arrayTemp =  strValue.split('.');
    var num;

   if(isRealNaN(arrayTemp[0])) {
       num = parseInt(arrayTemp[0]);
       if (num > constConfig.DELAY_TIME_STEPS_MAX) {
           num = constConfig.DELAY_TIME_STEPS_MAX;
       } else if (num < constConfig.DELAY_TIME_VALUE_MIN) {
           num = constConfig.DELAY_TIME_VALUE_MIN
       }
       currentStep = num;
       if(currentStep >= 1000)  {
           secondStep = 0;
           return;
       }
   }

   if(isRealNaN(arrayTemp[1])) {
       arrayTemp[1] = arrayTemp[1].replace(/\s+/g,'');
       num = binarySearch(fine_delay, parseInt(arrayTemp[1])/Math.pow(10,arrayTemp[1].length));
       secondStep = num;
   }
   // else {
   //     secondStep = 0;
   // }

}

function delayMeterChangeRespond(){
    var editControl = document.getElementById('text_delay_meter'); //输入延时 米
    var str = editControl.value;
    // var num = parseFloat(str);
    // getRightInputTextChange(num, inputTextValueType.DELAY_METER);
    getRightDelayMeter(str);
    controlsData.inputData.delay = currentStep;
    controlsData.inputData.secondDelay = secondStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_millisecond');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_inch');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkInputTime(curButtonNo, currentStep, secondStep);
}


function getRightDelayMeter(strValue) {
    var str = (Number(strValue) * 1000 / 331).toString();
    var arrayTemp =  str.split('.');
    var num;
    if(isRealNaN(arrayTemp[0])) {
        num = parseInt(arrayTemp[0]);
        if (num > constConfig.DELAY_TIME_STEPS_MAX) {
            num = constConfig.DELAY_TIME_STEPS_MAX;
        } else if (num < constConfig.DELAY_TIME_VALUE_MIN) {
            num = constConfig.DELAY_TIME_VALUE_MIN
        }
        currentStep = num;
        if(currentStep >= 1000)  {
            secondStep = 0;
            return;
        }
    }

    if(isRealNaN(arrayTemp[1])) {
        arrayTemp[1] = arrayTemp[1].replace(/\s+/g,'');
        num = binarySearch(fine_delay, parseInt(arrayTemp[1])/Math.pow(10,arrayTemp[1].length));
        secondStep = num;
    }
    // else {
    //     secondStep = 0;
    // }
}

function delayInchChangeRespond(){
    var editControl = document.getElementById('text_delay_inch');// 输入延时 英寸
    var str = editControl.value;
    // var num = parseFloat(str);
    // getRightInputTextChange(num, inputTextValueType.DELAY_METER);
    getRightDelayInch(str);
    controlsData.inputData.delay = currentStep;
    controlsData.inputData.secondDelay = secondStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    editControl = document.getElementById('text_delay_meter');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_millisecond');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    keepLinkInputTime(curButtonNo, currentStep, secondStep);
}

function getRightDelayInch(strValue) {
    var str = (Number(strValue) * 1000 / (331 * 3.281)).toString();
    var arrayTemp =  str.split('.');
    var num;
    if(isRealNaN(arrayTemp[0])) {
        num = parseInt(arrayTemp[0]);
        if (num > constConfig.DELAY_TIME_STEPS_MAX) {
            num = constConfig.DELAY_TIME_STEPS_MAX;
        } else if (num < constConfig.DELAY_TIME_VALUE_MIN) {
            num = constConfig.DELAY_TIME_VALUE_MIN
        }
        currentStep = num;

        if(currentStep >= 1000)  {
            secondStep = 0;
            return;
        }
    }

    if(isRealNaN(arrayTemp[1])) {
        arrayTemp[1] = arrayTemp[1].replace(/\s+/g,'');
        num = binarySearch(fine_delay, parseInt(arrayTemp[1])/Math.pow(10,arrayTemp[1].length));
        secondStep = num;
    }
    // else {
    //     secondStep = 0;
    // }

}

//====================================================================================================================
//eq1
function eq1FrequencyChangeRespond(){
    var editControl = document.getElementById('text_eq1_frequency');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.FREQUENCY);
    eqData.EQ1.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq1Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,1);
    DrawLine();
    curEqChannel = 1;
    showOrHideEqData();
}

function eq1BandwidthChangeRespond(){
    var editControl = document.getElementById('text_eq1_bandwidth');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.BANDWIDTH);
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

function eq1SlopeChangeRespond(){
    var editControl = document.getElementById('text_eq1_slope');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.SLOPE);
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

function eq1GainChangeRespond(){
    var editControl = document.getElementById('text_eq1_gain');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.EQ_GAIN);
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
function eq2FrequencyChangeRespond(){
    var editControl = document.getElementById('text_eq2_frequency');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.FREQUENCY);
    eqData.EQ2.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq2Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,2);
    DrawLine();
    curEqChannel = 2;
    showOrHideEqData();

}

function eq2BandwidthChangeRespond(){
    var editControl = document.getElementById('text_eq2_bandwidth');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.BANDWIDTH);
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

function eq2SlopeChangeRespond(){
    var editControl = document.getElementById('text_eq2_slope');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.SLOPE);
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

function eq2GainChangeRespond(){
    var editControl = document.getElementById('text_eq2_gain');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.EQ_GAIN);
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
function eq3FrequencyChangeRespond(){
    var editControl = document.getElementById('text_eq3_frequency');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.FREQUENCY);
    eqData.EQ3.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq3Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,3);
    DrawLine();
    curEqChannel = 3;
    showOrHideEqData();

}

function eq3BandwidthChangeRespond(){
    var editControl = document.getElementById('text_eq3_bandwidth');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.BANDWIDTH);
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

function eq3SlopeChangeRespond(){
    var editControl = document.getElementById('text_eq3_slope');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.SLOPE);
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

function eq3GainChangeRespond(){
    var editControl = document.getElementById('text_eq3_gain');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.EQ_GAIN);
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
function eq4FrequencyChangeRespond(){
    var editControl = document.getElementById('text_eq4_frequency');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.FREQUENCY);
    eqData.EQ4.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq4Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,4);
    DrawLine();
    curEqChannel = 4;
    showOrHideEqData();

}

function eq4BandwidthChangeRespond(){
    var editControl = document.getElementById('text_eq4_bandwidth');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.BANDWIDTH);
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

function eq4SlopeChangeRespond(){
    var editControl = document.getElementById('text_eq4_slope');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.SLOPE);
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

function eq4GainChangeRespond(){
    var editControl = document.getElementById('text_eq4_gain');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.EQ_GAIN);
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
function eq5FrequencyChangeRespond(){
    var editControl = document.getElementById('text_eq5_frequency');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.FREQUENCY);
    eqData.EQ5.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    editControl = document.getElementById('text_eq1_slope');
    editControl.value = getDisplayValue(inputTextValueType.SLOPE);
    keepLinkEq5Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,5);
    DrawLine();
    curEqChannel = 5;
    showOrHideEqData();

}

function eq5BandwidthChangeRespond(){
    var editControl = document.getElementById('text_eq5_bandwidth');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.BANDWIDTH);
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

function eq5SlopeChangeRespond(){
    var editControl = document.getElementById('text_eq5_slope');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.SLOPE);
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

function eq5GainChangeRespond(){
    var editControl = document.getElementById('text_eq5_gain');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.EQ_GAIN);
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
function eq6FrequencyChangeRespond(){
    var editControl = document.getElementById('text_eq6_frequency');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.FREQUENCY);
    eqData.EQ6.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq6Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,6);
    DrawLine();
    curEqChannel = 6;
    showOrHideEqData();

}

function eq6BandwidthChangeRespond(){
    var editControl = document.getElementById('text_eq6_bandwidth');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.BANDWIDTH);
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

function eq6SlopeChangeRespond(){
    var editControl = document.getElementById('text_eq6_slope');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.SLOPE);
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

function eq6GainChangeRespond(){
    var editControl = document.getElementById('text_eq6_gain');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.EQ_GAIN);
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
//====================================================================================================================
function deq1FrequencyChangeRespond(){
    var editControl = document.getElementById('text_deq1_frequency');　// DEQ1 频率
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.FREQUENCY);
    controlsData.inputData.InDeq1.req  = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkInputDeq1Frequency(curButtonNo, currentStep);
}


function deq1BandwidthChangeRespond() {
    var editControl = document.getElementById('text_deq1_bandwidth'); // DEQ1 带宽
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.BANDWIDTH);
    controlsData.inputData.InDeq1.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkInputDeq1Bandwidth(curButtonNo, currentStep);
}

function deq1LelChangeRespond(){
    var editControl = document.getElementById('text_deq1_level'); // DEQ1 目标电平
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.DEQ_LEVEL);
    controlsData.inputData.InDeq1.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_LEVEL);
    keepLinkInputDeq1Level(curButtonNo, currentStep);
    updateDeqButton();
}


function deq1ThresholdChangeRespond(){
    var editControl = document.getElementById('deq1_threshold');// DEQ1 阈值
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.DEQ_THRESHOLD);
    controlsData.inputData.DeqParam1.DEQ_Threshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_THRESHOLD);
    keepLinkInputDeq1Threshold(curButtonNo, currentStep);

}


function deq1RatioChangeRespond(){
    var editControl = document.getElementById('deq1_ratio');// DEQ1 比率
    var str = editControl.value;
    // var num = parseFloat(str);
    // getRightInputTextChange(num, inputTextValueType.EXTENSION_RATION);
    currentStep = getRightExtensionRatio(str);
    controlsData.inputData.DeqParam1.DEQ_ratio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputDeq1Ratio(curButtonNo, currentStep);

}

function deq1AttackChangeRespond(){
    var editControl = document.getElementById('deq1_attack_time');  // DEQ1 响应时间
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.ATTACK_TIME);
    controlsData.inputData.DeqParam1.DEQ_a = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputDeq1AttackTime(curButtonNo, currentStep);

}

function deq1ReleaseChangeRespond(){
    var editControl = document.getElementById('deq1_release_time');  // DEQ1 释放时间
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.RELEASE_TIME);
    controlsData.inputData.DeqParam1.DEQ_r = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputDeq1ReleaseTime(curButtonNo, currentStep);

}


//====================================================================
function deq2FrequencyChangeRespond(){
    var editControl = document.getElementById('text_deq2_frequency');  // DEQ2 频率
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.FREQUENCY);
    controlsData.inputData.InDeq2.req  = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkInputDeq2Frequency(curButtonNo, currentStep);
}


function deq2BandwidthChangeRespond(){
    var editControl = document.getElementById('text_deq2_bandwidth'); // DEQ2 带宽
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.BANDWIDTH);
    controlsData.inputData.InDeq2.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkInputDeq2Bandwidth(curButtonNo, currentStep);
}


function deq2LelChangeRespond(){
    var editControl = document.getElementById('text_deq2_level'); // DEQ2 电平
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.DEQ_LEVEL);
    controlsData.inputData.InDeq2.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_LEVEL);
    keepLinkInputDeq2Level(curButtonNo, currentStep);
    updateDeqButton();
}


function deq2ThresholdChangeRespond(){
    var editControl = document.getElementById('deq2_threshold'); // DEQ2 阈值
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.DEQ_THRESHOLD);
    controlsData.inputData.DeqParam2.DEQ_Threshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_THRESHOLD);
    keepLinkInputDeq2Threshold(curButtonNo, currentStep);

}


function deq2RatioChangeRespond(){
    var editControl = document.getElementById('deq2_ratio'); // DEQ2 比率
    var str = editControl.value;
    // var num = parseFloat(str);
    // getRightInputTextChange(num, inputTextValueType.EXTENSION_RATION);
    currentStep = getRightExtensionRatio(str);
    controlsData.inputData.DeqParam2.DEQ_ratio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputDeq2Ratio(curButtonNo, currentStep);

}

function deq2AttackChangeRespond(){
    var editControl = document.getElementById('deq2_attack_time'); // DEQ2 响应时间
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.ATTACK_TIME);
    controlsData.inputData.DeqParam2.DEQ_a = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputDeq2AttackTime(curButtonNo, currentStep);

}

function deq2ReleaseChangeRespond(){
    var editControl = document.getElementById('deq2_release_time'); // DEQ2 释放时间
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.RELEASE_TIME);
    controlsData.inputData.DeqParam2.DEQ_r = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputDeq2ReleaseTime(curButtonNo, currentStep);

}
//====================================================================================================================
function thresholdChangeRespond(){ // 自动增益阈值
    var editControl = document.getElementById('text_threshold');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.INPUT_EXTEND_THRESHOLD);
    controlsData.inputData.agThreshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    keepLinkInputThreshold(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}

function targetLelChangeRespond(){ // 自动增益目标电平
    var editControl = document.getElementById('text_target_level');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.TARGET_LEVEL);
    controlsData.inputData.agLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    keepLinkInputLevel(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}


function extensionRatioChangeRespond(){ // 自动增益比率
    var editControl = document.getElementById('text_extension_ratio');
    var str = editControl.value;
    currentStep = getRightExtensionRatio(str);
    // console.log('currentStep:  ' + currentStep);
    controlsData.inputData.agRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputExtendRatio(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}

function getRightExtensionRatio(str) {
    var strArray = str.split(':');
    // console.log('lenght: ' + strArray.length);
    if(strArray.length === 0 || strArray.length > 2) {
        return currentStep;
    } else if(strArray.length === 2) {
        if(!isNaN(strArray[1])){
            // console.log('strArray[1]: ' + strArray[1]);
            return getExtensionRatioStep(strArray[1]);
        }
    } else if(strArray.length === 1) {
        if(strArray[0]){
            if(!isNaN(strArray[0])){
                // console.log('strArray[0]: ' + strArray[0]);
                return  getExtensionRatioStep(strArray[0]);
            }
        }
    }
    return currentStep;
}

function extensionAttackChangeRespond(){ // 自动增益响应时间
    var editControl = document.getElementById('text_extension_attack');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.ATTACK_TIME);
    controlsData.inputData.agAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputExtendAttackTime(curButtonNo, currentStep);
}

function extensionReleaseChangeRespond(){ // 自动增益释放时间
    var editControl = document.getElementById('text_extension_release');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.RELEASE_TIME);
    controlsData.inputData.agRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputExtendReleaseTime(curButtonNo, currentStep);
}

function compressorChangeRespond(){ // 输入压缩电平
    var editControl = document.getElementById('text_compressor');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.INPUT_COMPRESS_THRESHOLD);
    controlsData.inputData.compLevel = currentStep;
    // console.log(currentStep);
    editControl.value = getDisplayValue(inputTextValueType.INPUT_COMPRESS_THRESHOLD);
    keepLinkInputCompressLevel(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}

function compRatioChangeRespond(){ // 输入压缩比率
    var editControl = document.getElementById('text_comp_ratio');
    var str = editControl.value;
    // var num = parseFloat(str);
    // getRightInputTextChange(num, inputTextValueType.COMPRESS_RATION);
    currentStep = getRightCompressorRatio(str);
    controlsData.inputData.compRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.COMPRESS_RATION);
    keepLinkInputCompressRatio(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}

function getRightCompressorRatio(str) {
    var strArray = str.split(':');
    // console.log('lenght: ' + strArray.length);
    if(strArray.length === 0 || strArray.length > 2) {
        return currentStep;
    } else if(strArray.length === 2) {
        if(!isNaN(strArray[0])){
            // console.log('strArray[1]: ' + strArray[1]);
            return getExtensionRatioStep(strArray[1]);
        }
    } else if(strArray.length === 1) {
        if(!isNaN(strArray[0])){
            // console.log('strArray[0]: ' + strArray[0]);
            return  getExtensionRatioStep(strArray[0]);
        }
    }
    return currentStep;
}


function compAttackChangeRespond(){ // 输入压缩响应时间
    var editControl = document.getElementById('text_comp_attack');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.ATTACK_TIME);
    controlsData.inputData.compAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputCompressAttackTime(curButtonNo, currentStep);
}


function compReleaseChangeRespond(){ // 输入压缩释放时间
    var editControl = document.getElementById('text_comp_release');
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.RELEASE_TIME);
    controlsData.inputData.compRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputCompressReleaseTime(curButtonNo, currentStep);
}
//====================================================================================================================
// 4 input_channel_gain + 8 out_channel_gain
function keepLinkInputVolume(curChannel,value){
    var linkArray = [],i;
    for(i=0; i<4; i++){
        if(i !== curChannel){
            if(linkInputSelect[i] === linkInputSelect[curChannel]){
                linkArray.push(i);
            }
        }
    }

    if(linkArray.length>0){
        for(i=0;i<linkArray.length;i++){
            setLinkInputVolume(linkArray[i],value);
        }
    }
}


function keepLinkOutVolume(curChannel, value){
    var linkArray = [],i;
    for(i=0; i<8; i++){
        if( i !== curChannel){
            if(linkOutSelect[i] === linkOutSelect[curChannel]){
                linkArray.push(i);
            }
        }
    }

//    console.log('linkArray:' + linkArray);
    if(linkArray.length>0){
        for(i=0; i<linkArray.length; i++){
            setLinkOutVolume(linkArray[i],value);
        }
    }
}


function setLinkInputVolume(channel,step){
    var element,value,id;
    value = getChanelGainDisplay(step);
    switch (channel){
        case 0:
            element = document.getElementById('text_volume_a');
            id = controlsId.SLIDER_GAIN_INPUT_A;
            currentGroupData.dataInputA.gain = step;
            break;
        case 1:
            element = document.getElementById('text_volume_b');
            id = controlsId.SLIDER_GAIN_INPUT_B;
            currentGroupData.dataInputB.gain = step;
            break;
        case 2:
            element = document.getElementById('text_volume_c');
            id = controlsId.SLIDER_GAIN_INPUT_C;
            currentGroupData.dataInputC.gain = step;
            break;
        case 3:
            element = document.getElementById('text_volume_d');
            id = controlsId.SLIDER_GAIN_INPUT_D;
            currentGroupData.dataInputD.gain = step;
            break;
        default:
            break;
    }
    element.value = value;
    setSliderPosition(id, step);
}


function setLinkOutVolume(channel, step){
    var element,value,id;
    value = getChanelGainDisplay(step);
    switch(channel){
        case 0:
            element = document.getElementById('text_volume_out1');
            id = controlsId.SLIDER_GAIN_OUT1;
            currentGroupData.dataOut1.gain = step;
            break;
        case 1:
            element = document.getElementById('text_volume_out2');
            id = controlsId.SLIDER_GAIN_OUT2;
            currentGroupData.dataOut2.gain = step;
            break;
        case 2:
            element = document.getElementById('text_volume_out3');
            id = controlsId.SLIDER_GAIN_OUT3;
            currentGroupData.dataOut3.gain = step;
            break;
        case 3:
            element = document.getElementById('text_volume_out4');
            id = controlsId.SLIDER_GAIN_OUT4;
            currentGroupData.dataOut4.gain = step;
            break;
        case 4:
            element = document.getElementById('text_volume_out5');
            id = controlsId.SLIDER_GAIN_OUT5;
            currentGroupData.dataOut5.gain = step;
            break;
        case 5:
            element = document.getElementById('text_volume_out6');
            id = controlsId.SLIDER_GAIN_OUT6;
            currentGroupData.dataOut6.gain = step;
            break;
        case 6:
            element = document.getElementById('text_volume_out7');
            id = controlsId.SLIDER_GAIN_OUT7;
            currentGroupData.dataOut7.gain = step;
            break;
        case 7:
            element = document.getElementById('text_volume_out8');
            id = controlsId.SLIDER_GAIN_OUT8;
            currentGroupData.dataOut8.gain = step;
            break;
        default:
            break;
    }
    element.value = value;
    setSliderPosition(id, step);
}


function volumeAChangeRespond(){
    var editControl = document.getElementById('text_volume_a'); // 输入A 增益
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputA.gain = currentStep;
    //var value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_A, currentStep);
    keepLinkInputVolume(0, currentStep);
}


function volumeBChangeRespond(){
    var editControl = document.getElementById('text_volume_b'); // 输入 增益
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputB.gain = currentStep;
    //var value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_B, currentStep);
    keepLinkInputVolume(1,currentStep);
}


function volumeCChangeRespond(){
    var editControl = document.getElementById('text_volume_c'); // 输入C 增益
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputC.gain = currentStep;
    //var value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_C, currentStep);
    keepLinkInputVolume(2,currentStep);
}


function volumeDChangeRespond(){
    var editControl = document.getElementById('text_volume_d'); // 输入D 增益
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputD.gain = currentStep;
    //var value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_D, currentStep);
    keepLinkInputVolume(3,currentStep);
}

function volumeOut1ChangeRespond(){
    var editControl = document.getElementById('text_volume_out1'); // 输出 1 增益
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut1.gain= currentStep;
    //var value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT1, currentStep);
    keepLinkOutVolume(0,currentStep);
}


function volumeOut2ChangeRespond(){
    var editControl = document.getElementById('text_volume_out2'); // 输出 2 增益
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut2.gain= currentStep;
    //var value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT2, currentStep);
    keepLinkOutVolume(1,currentStep);
}


function volumeOut3ChangeRespond(){
    var editControl = document.getElementById('text_volume_out3'); // 输出 3 增益
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut3.gain= currentStep;
    //var value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT3, currentStep);
    keepLinkOutVolume(2,currentStep);
}


function volumeOut4ChangeRespond(){
    var editControl = document.getElementById('text_volume_out4'); // 输出 4 增益
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut4.gain = currentStep;
   // var value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT4, currentStep);
    keepLinkOutVolume(3,currentStep);
}


function volumeOut5ChangeRespond(){
    var editControl = document.getElementById('text_volume_out5'); // 输出 5 增益
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut5.gain = currentStep;
    //var value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT5, currentStep);
    keepLinkOutVolume(4,currentStep);
}


function volumeOut6ChangeRespond(){
    var editControl = document.getElementById('text_volume_out6'); // 输出 6 增益
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut6.gain = currentStep;
    //var value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT6, currentStep);
    keepLinkOutVolume(5,currentStep);
}


function volumeOut7ChangeRespond(){
    var editControl = document.getElementById('text_volume_out7'); // 输出 7 增益
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut7.gain = currentStep;
    //var value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT7, currentStep);
    keepLinkOutVolume(6,currentStep);
}

function volumeOut8ChangeRespond(){

    var editControl = document.getElementById('text_volume_out8'); // 输出 8 增益
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut8.gain = currentStep;
    //var value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT8, currentStep);
    keepLinkOutVolume(7,currentStep);
    console.log('out8');
}

function gainChangeRespond(){
    var editControl = document.getElementById('text_gain');//总 增益
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.CHANNEL_GAIN);
    setChannelGain(curButtonNo, currentStep);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setGainSliderPosition(currentStep);
    keepShortGainInStep(currentStep);
}


function getRightInputTextChange(num, type){
    if (isNaN(num)) {
        return;
    }
    switch (type){
        case inputTextValueType.NOISE_GATE: //输入门限
            if ((constConfig.NOISE_GATE_VALUE_MIN < num)&&(num < constConfig.NOISE_GATE_VALUE_MAX)) { // num<-120
                currentStep = (num - constConfig.NOISE_GATE_VALUE_MIN) / constConfig.NOISE_GATE_STEP_VALUE;
            }else if(num >= constConfig.NOISE_GATE_VALUE_MAX){
                currentStep = constConfig.NOISE_GATE_STEPS_MAX;
            } else if(num < constConfig.NOISE_GATE_VALUE_MIN){
                currentStep = 0;
            }
            console.log('num: ' + num + '  currentStep: ' + currentStep);
            break;
        case inputTextValueType.DELAY_TIME: //延时毫秒 已作废
            if(num > constConfig.DELAY_TIME_VALUE_MAX){
                currentStep = constConfig.DELAY_TIME_STEPS_MAX;
            } else if(num < constConfig.DELAY_TIME_VALUE_MIN){
                currentStep = 0;
            } else if(num < constConfig.DELAY_TIME_RANGE_FIRST_MAX){ //num < 10
                currentStep = (num - constConfig.DELAY_TIME_VALUE_MIN) / constConfig.DELAY_TIME_STEP_VALUE1;
                currentStep = Math.round(currentStep);
            } else{ //num >= 10
                num = Math.round(num);
                currentStep = (num - constConfig.DELAY_TIME_RANGE_FIRST_MAX) / constConfig.DELAY_TIME_STEP_VALUE2 + constConfig.DELAY_TIME_RANGE_FIRST_STEPS;
            }
            break;
        case inputTextValueType.DELAY_METER: //延时米 已作废
            if(num > constConfig.DELAY_METER_VALUE_MAX){
                currentStep = constConfig.DELAY_TIME_STEPS_MAX;
            } else if(num < constConfig.DELAY_METER_VALUE_MIN){
                currentStep = 0;
            } else if(num < constConfig.DELAY_METER_RANGE_FIRST_MAX){ //num < 3.4
                currentStep = (num - constConfig.DELAY_METER_VALUE_MIN) / constConfig.DELAY_METER_STEP_VALUE1;
                currentStep = Math.round(currentStep);
            } else if(num === constConfig.DELAY_METER_RANGE_FIRST_MAX){ //num == 3.4
                currentStep = constConfig.DELAY_TIME_RANGE_FIRST_STEPS;
            }else { //num > 3.4
                currentStep = (num - (constConfig.DELAY_TIME_RANGE_FIRST_STEPS-1)*0.007) / constConfig.DELAY_METER_STEP_VALUE2 + constConfig.DELAY_TIME_RANGE_FIRST_STEPS-1;
                currentStep = Math.round(currentStep);
            }
            break;
        case inputTextValueType.DELAY_INCH: //延时英寸  已作废
            if(num > constConfig.DELAY_INCH_VALUE_MAX){
                currentStep = constConfig.DELAY_TIME_STEPS_MAX;
            } else if(num < constConfig.DELAY_INCH_VALUE_MIN){
                currentStep = 0;
            } else if(num < constConfig.DELAY_INCH_RANGE_FIRST_MAX){ //num < 11.16
                currentStep = (num - constConfig.DELAY_INCH_VALUE_MIN) / constConfig.DELAY_INCH_STEP_VALUE1;
                currentStep = Math.round(currentStep);
            } else if(num === constConfig.DELAY_INCH_RANGE_FIRST_MAX){ //num == 11.16
                currentStep = constConfig.DELAY_TIME_RANGE_FIRST_STEPS;
            }
            else{ //num > 11.16
                currentStep = (num - constConfig.DELAY_INCH_RANGE_FIRST_MAX) / constConfig.DELAY_INCH_STEP_VALUE2 + constConfig.DELAY_TIME_RANGE_FIRST_STEPS-1;
                currentStep = Math.round(currentStep);
            }
            break;
        case inputTextValueType.FREQUENCY: //频率
            if(num > constConfig.FREQUENCY_VALUE_MAX){
                currentStep = constConfig.FREQUENCY_STEPS_MAX;
            } else if(num < constConfig.FREQUENCY_VALUE_MIN){
                currentStep = 0;
            }else{
                currentStep = binarySearch(frequency, num);
            }
            break;
        case inputTextValueType.BANDWIDTH: //带宽
            if(num > constConfig.BANDWIDTH_VALUE_MAX){
                currentStep = constConfig.BANDWIDTH_STEPS_MAX;
            } else if(num < constConfig.BANDWIDTH_VALUE_MIN){
                currentStep = 0;
            } else{
                currentStep = (num - constConfig.BANDWIDTH_VALUE_MIN) / constConfig.BANDWIDTH_STEP_VALUE;
                currentStep = Math.round(currentStep);
            }
            break;
        case inputTextValueType.SLOPE: // 斜率
            if(num > constConfig.SLOPE_VALUE_MAX){
                currentStep = 0;
            } else if(num < constConfig.SLOPE_VALUE_MIN){
                currentStep = constConfig.SLOPE_STEPS_MAX;
            }else{
                currentStep = binarySearchReverse(SLOPE_ARRAY, num);
            }
            break;
        case inputTextValueType.EQ_GAIN:   // 增益
            if(num > constConfig.EQ_GAIN_VALUE_MAX){
                currentStep = constConfig.EQ_GAIN_STEPS_MAX;
            } else if(num < constConfig.EQ_GAIN_VALUE_MIN){
                currentStep = 0;
            } else{
                currentStep = (num - constConfig.EQ_GAIN_VALUE_MIN) / constConfig.EQ_GAIN_STEP_VALUE;
                currentStep = Math.round(currentStep);
            }
            break;
        case inputTextValueType.CHANNEL_GAIN:  // 通道增益
            if(num > constConfig.CHANNEL_GAIN_VALUE_MAX){
                currentStep = constConfig.CHANNEL_GAIN_STEPS_MAX;
            } else if(num < constConfig.CHANNEL_GAIN_VALUE_MIN){
                currentStep = 0;
            } else{
                currentStep = (num - constConfig.CHANNEL_GAIN_VALUE_MIN) / constConfig.CHANNEL_GAIN_STEP_VALUE;
                currentStep = Math.round(currentStep);
            }
            break;
        case inputTextValueType.EXTENSION_RATION:  // 输入自动增益比率
            if(num > constConfig.EXTENSION_RATIO_VALUE_MAX){
                currentStep = constConfig.EXTENSION_RATIO_STEPS_MAX;
            } else if(num < constConfig.EXTENSION_RATIO_VALUE_MIN){
                currentStep = 0;
            } else if(num < constConfig.EXTENSION_RATIO_RANGE_FIRST_MAX){ //num < 2.0
                currentStep = (num - constConfig.DELAY_TIME_VALUE_MIN) / constConfig.DELAY_TIME_STEP_VALUE1;
                currentStep = Math.round(currentStep);
            } else{ //num >= 2.0
                currentStep = (num - constConfig.EXTENSION_RATIO_RANGE_FIRST_MAX) / constConfig.EXTENSION_RATIO_STEP_VALUE2 + constConfig.EXTENSION_RATIO_RANGE_FIRST_STEPS;
            }
            break;
        case inputTextValueType.ATTACK_TIME: // 响应时间
            if(num > constConfig.ATTACK_TIME_VALUE_MAX){
                currentStep = constConfig.ATTACK_TIME_STEPS_MAX;
            } else if(num < constConfig.ATTACK_TIME_VALUE_MIN){
                currentStep = 0;
            } else if(num <= constConfig.ATTACK_TIME_RANGE_FIRST_MAX){ //num < 1
                currentStep = (num - constConfig.ATTACK_TIME_VALUE_MIN) / constConfig.ATTACK_TIME_STEP_VALUE1;
                currentStep = Math.round(currentStep);

            } else { //num >1
                num = Math.round(num);
                currentStep = num / constConfig.ATTACK_TIME_STEP_VALUE2 + constConfig.ATTACK_TIME_RANGE_FIRST_STEPS - 1;
            }
            break;
        case inputTextValueType.RELEASE_TIME: //释放 时间
            if(num > constConfig.RELEASE_TIME_VALUE_MAX){
                currentStep = constConfig.RELEASE_TIME_STEPS_MAX;
            } else if(num < constConfig.RELEASE_TIME_VALUE_MIN){
                currentStep = 0;
            } else{
                currentStep = Math.round((num - constConfig.RELEASE_TIME_VALUE_MIN) / constConfig.RELEASE_TIME_STEP_VALUE);

            }
            break;
        case inputTextValueType.INPUT_EXTEND_THRESHOLD:  // 输入 阈值
            if(num > constConfig.INPUT_EXTEND_THRESHOLD_VALUE_MAX){
                currentStep = constConfig.INPUT_EXTEND_THRESHOLD_STEPS_MAX;
            } else if(num < constConfig.INPUT_EXTEND_THRESHOLD_VALUE_MIN){
                currentStep = 0;
            } else {
                currentStep = (num - constConfig.INPUT_EXTEND_THRESHOLD_VALUE_MIN) / constConfig.INPUT_EXTEND_THRESHOLD_STEP_VALUE;
            }
            if ( currentStep >=  controlsData.inputData.agLevel) {
                currentStep =  controlsData.inputData.agLevel;
            }
            currentStep = Math.round(currentStep);
            break;
        case inputTextValueType.TARGET_LEVEL: // 输入 目标电平
            if(num > constConfig.INPUT_EXTEND__TARGET_LEVEL_VALUE_MAX){
                currentStep = constConfig.INPUT_EXTEND_TARGET_LEVEL_STEPS_MAX;
            } else if(num < constConfig.INPUT_EXTEND_TARGET_LEVEL_VALUE_MIN){
                currentStep = 0;
            } else{
                currentStep = (num - constConfig.INPUT_EXTEND_TARGET_LEVEL_VALUE_MIN) / constConfig.INPUT_EXTEND_TARGET_LEVEL_STEP_VALUE;
            }
            if (currentStep >= controlsData.inputData.compLevel + Middle_Comp_Level) {
                currentStep = controlsData.inputData.compLevel + Middle_Comp_Level;
            } else if (currentStep <= controlsData.inputData.agThreshold) {
                currentStep = controlsData.inputData.agThreshold;
            }
            currentStep = Math.round(currentStep);
            break;
        case inputTextValueType.INPUT_COMPRESS_THRESHOLD: //输入 压缩电平
            if(num > constConfig.INPUT_COMPRESS_THRESHOLD_VALUE_MAX){
                currentStep = constConfig.INPUT_COMPRESS_THRESHOLD_STEPS_MAX;
            } else if(num < constConfig.INPUT_COMPRESS_THRESHOLD_VALUE_MIN){
                currentStep = 0;
            } else{
                currentStep = (num - constConfig.INPUT_COMPRESS_THRESHOLD_VALUE_MIN) / constConfig.INPUT_COMPRESS_THRESHOLD_STEP_VALUE;
            }
            if( currentStep <= controlsData.inputData.agLevel - Middle_Comp_Level) {
                currentStep = controlsData.inputData.agLevel - Middle_Comp_Level;
            }
            currentStep = Math.round(currentStep);
            break;
        case inputTextValueType.OUTPUT_COMPRESS_THRESHOLD: //输出压缩电平
            if(num > constConfig.OUTPUT_COMPRESS_THRESHOLD_VALUE_MAX){
                currentStep = constConfig.OUTPUT_COMPRESS_THRESHOLD_STEPS_MAX;
            } else if(num < constConfig.OUTPUT_COMPRESS_THRESHOLD_VALUE_MIN){
                currentStep = 0;
            } else{
                currentStep = (num - constConfig.OUTPUT_COMPRESS_THRESHOLD_VALUE_MIN) / constConfig.OUTPUT_COMPRESS_THRESHOLD_STEP_VALUE;
            }
            if ( currentStep >= controlsData.outputData.limT) {
                currentStep = controlsData.outputData.limT
            }
            currentStep = Math.round(currentStep);
            break;
        case inputTextValueType.OUTPUT_LIMITER_THRESHOLD: //输出限幅电平
            if(num > constConfig.OUTPUT_LIMITER_THRESHOLD_VALUE_MAX){
                currentStep = constConfig.OUTPUT_LIMITER_THRESHOLD_STEPS_MAX;
            } else if(num < constConfig.OUTPUT_LIMITER_THRESHOLD_VALUE_MIN){
                currentStep = 0;
            } else{
                currentStep = (num - constConfig.OUTPUT_LIMITER_THRESHOLD_VALUE_MIN) / constConfig.OUTPUT_LIMITER_THRESHOLD_STEP_VALUE;
            }
            if ( currentStep <= controlsData.outputData.compLevel){
                currentStep = controlsData.outputData.compLevel;
            }
            currentStep = Math.round(currentStep);
            break;
        case inputTextValueType.DEQ_LEVEL:  // DEQ电平
            if(num > constConfig.DEQ_LEVEL_MAX){
                currentStep = constConfig.DEQ_LEVEL_STEPS_MAX;
            } else if(num < constConfig.DEQ_LEVEL_MIN){
                currentStep = 0;
            } else{
                currentStep = (num - constConfig.DEQ_LEVEL_MIN) / constConfig.DEQ_LEVEL_STEP_VALUE;
                currentStep = Math.round(currentStep);
            }
            break;
        case inputTextValueType.DEQ_THRESHOLD:  // DEQ阈值
            if(num > constConfig.DEQ_LEVEL_MAX){
                currentStep = constConfig.DEQ_LEVEL_STEPS_MAX;
            } else if(num < constConfig.DEQ_LEVEL_MIN){
                currentStep = 0;
            } else{
                currentStep = (num - constConfig.DEQ_LEVEL_MIN) / constConfig.DEQ_LEVEL_STEP_VALUE;
                currentStep = Math.round(currentStep);
            }
            console.log('currentStep: ' + currentStep);
            break;
        case inputTextValueType.DEQ_ATTACK_TIME:  // DEQ响应时间
            if(num > constConfig.ATTACK_TIME_VALUE_MAX){
                currentStep = constConfig.ATTACK_TIME_STEPS_MAX;
            } else if(num < constConfig.ATTACK_TIME_VALUE_MIN){
                currentStep = 0;
            } else if(num <= constConfig.ATTACK_TIME_RANGE_FIRST_MAX){ //num < 1
                currentStep = (num - constConfig.ATTACK_TIME_VALUE_MIN) / constConfig.ATTACK_TIME_STEP_VALUE1;
                currentStep = Math.round(currentStep);

            } else { //num >1
                num = Math.round(num);
                currentStep = num / constConfig.ATTACK_TIME_STEP_VALUE2 + constConfig.ATTACK_TIME_RANGE_FIRST_STEPS - 1;
            }
            break;
        case inputTextValueType.DEQ_RELEASE_TIME:  // DEQ释放时间
            if(num > constConfig.RELEASE_TIME_VALUE_MAX){
                currentStep = constConfig.RELEASE_TIME_STEPS_MAX;
            } else if(num < constConfig.RELEASE_TIME_VALUE_MIN){
                currentStep = 0;
            } else{
                currentStep = Math.round((num - constConfig.RELEASE_TIME_VALUE_MIN) / constConfig.RELEASE_TIME_STEP_VALUE);

            }
            break;
        default:
            break;
    }
}

function binarySearch(data,item,start,end) {
    end = end || (data.length - 1);
    start = start || 0;
    if(start === end){ // only one left
        if(Math.abs(item - data[start]) < Math.abs(item - data[end])){
            return start-1;
        }else{
            return end;
        }
    }else if(start === (end-1)){// tow left
        if(Math.abs(item - data[start]) < Math.abs(item - data[end])){
            return start;
        }else{
            return end;
        }
    }
    var m = Math.floor((start + end) / 2); //floor get a closest number
    if (item === data[m]) {
        // console.log('equal:' + m);
        return m;
    } else if (item < data[m]) {
        return binarySearch(data, item, start, m) //don't m-1.  m could be the result
    } else {
        return binarySearch(data, item, m, end); //don't m+1.  m could be the result
    }
    return end;
}

function binarySearchReverse(data,item,start,end) {
    end = end || (data.length - 1);
    start = start || 0;
    if(start === end){ // only one left
        if(Math.abs(item - data[start]) < Math.abs(item - data[end])){
            return start-1;
        }else{
            return end;
        }
    }else if(start === (end-1)){// tow left
        if(Math.abs(item - data[start]) < Math.abs(item - data[end])){
            return start;
        }else{
            return end;
        }
    }
    var m = Math.floor((start + end) / 2); //floor get a closest number
    if (item === data[m]) {
        // console.log('equal:' + m);
        return m;
    } else if (item > data[m]) {
        return binarySearchReverse(data, item, start, m) //don't m-1.  m could be the result
    } else {
        return binarySearchReverse(data, item, m, end); //don't m+1.  m could be the result
    }
    return end;
}

function addOutTextChangeEvent() {
    var editControl = document.getElementById("text_delay_millisecond_out");
    editControl.addEventListener('change', outDelayTimeChangeRespond);

    editControl = document.getElementById("text_delay_meter_out");
    editControl.addEventListener('change', outDelayMeterChangeRespond);

    editControl = document.getElementById("text_delay_inch_out");
    editControl.addEventListener('change', outDelayInchChangeRespond);

    editControl = document.getElementById("text_hpf_frequency");
    editControl.addEventListener('change', hpfFrequencyChangeRespond);

    editControl = document.getElementById("text_lpf_frequency");
    editControl.addEventListener('change', lpfFrequencyChangeRespond);

    editControl = document.getElementById("text_threshold_compress_out");
    editControl.addEventListener('change', outThresholdCompressChangeRespond);

    editControl = document.getElementById("text_ratio_compress_out");
    editControl.addEventListener('change', outRatioCompressChangeRespond);

    editControl = document.getElementById("text_attack_compress_out");
    editControl.addEventListener('change', outAttackCompressChangeRespond);

    editControl = document.getElementById("text_release_compress_out");
    editControl.addEventListener('change', outReleaseCompressChangeRespond);

    editControl = document.getElementById("text_threshold_limit_out");
    editControl.addEventListener('change', outThresholdLimitChangeRespond);

    editControl = document.getElementById("text_attack_limit_out");
    editControl.addEventListener('change', outAttackLimitChangeRespond);

    editControl = document.getElementById("text_release_limit_out");
    editControl.addEventListener('change', outReleaseLimitChangeRespond);
}


//======================================================================================================================
//输出压缩限幅
function outThresholdCompressChangeRespond(){
    var editControl = document.getElementById('text_threshold_compress_out'); //输出压缩电平
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
    controlsData.outputData.compLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
    keepLinkOutThresholdCompress(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
}

function outRatioCompressChangeRespond(){
    var editControl = document.getElementById('text_ratio_compress_out'); //输出压缩比
    var str = editControl.value;
    // var num = parseFloat(str);
    // getRightInputTextChange(num, inputTextValueType.EXTENSION_RATION);
    currentStep = getRightCompressorRatio(str);
    controlsData.outputData.compRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.COMPRESS_RATION);
    keepLinkOutRatioCompress(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
}

function outAttackCompressChangeRespond(){
    var editControl = document.getElementById('text_attack_compress_out'); //输出压缩响应时间
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.ATTACK_TIME);
    controlsData.outputData.compAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkOutAttackCompress(curButtonNo, currentStep);
}

function outReleaseCompressChangeRespond(){
    var editControl = document.getElementById('text_release_compress_out'); //输出压缩释放时间
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.RELEASE_TIME);
    controlsData.outputData.compR = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkOutReleaseCompress(curButtonNo, currentStep);
}

function outThresholdLimitChangeRespond(){
    var editControl = document.getElementById('text_threshold_limit_out'); //输出限幅电平
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.OUTPUT_LIMITER_THRESHOLD);
    controlsData.outputData.limT = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.OUTPUT_LIMITER_THRESHOLD);
    keepLinkOutThresholdLimit(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
}

function outAttackLimitChangeRespond(){
    var editControl = document.getElementById('text_attack_limit_out'); //输出限幅响应时间
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.ATTACK_TIME);
    controlsData.outputData.limAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkOutAttackLimit(curButtonNo, currentStep);
}

function outReleaseLimitChangeRespond(){
    var editControl = document.getElementById('text_release_limit_out'); //输出限幅释放时间
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.RELEASE_TIME);
    controlsData.outputData.limRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkOutReleaseLimit(curButtonNo, currentStep);
}
//======================================================================================================================
//输出延时
function outDelayTimeChangeRespond(){
    var editControl = document.getElementById('text_delay_millisecond_out'); //输出 延时 毫秒
    var str = editControl.value;
    // var num = parseFloat(str);
    // getRightInputTextChange(num, inputTextValueType.DELAY_TIME);
    getRightDelayMillisecond(str);
    controlsData.outputData.delay = currentStep;
    controlsData.outputData.secondDelay = secondStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_inch_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkOutDelayTime(curButtonNo, currentStep, secondStep);
}

function outDelayMeterChangeRespond(){
    var editControl = document.getElementById('text_delay_meter_out'); //输出 延时 米
    var str = editControl.value;
    // var num = parseFloat(str);
    // getRightInputTextChange(num, inputTextValueType.DELAY_METER);
    getRightDelayMeter(str);
    controlsData.outputData.delay = currentStep;
    controlsData.outputData.secondDelay = secondStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_millisecond_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_inch_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkOutDelayTime(curButtonNo, currentStep, secondStep);
}

function outDelayInchChangeRespond(){
    var editControl = document.getElementById('text_delay_inch_out'); //输出 延时 英尺
    var str = editControl.value;
    // var num = parseFloat(str);
    // getRightInputTextChange(num, inputTextValueType.DELAY_METER);
    getRightDelayInch(str);
    controlsData.outputData.delay = currentStep;
    controlsData.outputData.secondDelay = secondStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_millisecond_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    keepLinkOutDelayTime(curButtonNo, currentStep, secondStep);
}
//======================================================================================================================
//分频
function hpfFrequencyChangeRespond(){
    var editControl = document.getElementById('text_hpf_frequency'); //分频 高通
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.FREQUENCY);
    if(currentStep > controlsData.outputData.LPFData.HL_freq) {
        currentStep = controlsData.outputData.LPFData.HL_freq;
    }
    controlsData.outputData.HPFData.HL_freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkOutHpfFrequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,7);
    DrawLine();
    curEqChannel = 7;
    showOrHideEqData();
}

function lpfFrequencyChangeRespond(){
    var editControl = document.getElementById('text_lpf_frequency'); //分频 低通
    var str = editControl.value;
    var num = parseFloat(str);
    getRightInputTextChange(num, inputTextValueType.FREQUENCY);
    if(currentStep < controlsData.outputData.HPFData.HL_freq) {
        currentStep = controlsData.outputData.HPFData.HL_freq;
    }
    controlsData.outputData.LPFData.HL_freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkOutLpfFrequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,8);
    DrawLine();
    curEqChannel = 8;
    showOrHideEqData();
}