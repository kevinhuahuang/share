


function addInputTextKeyDownListener(){
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
        addTextKeyDownEvent(editControlID[i]);
    }

    for(var t in eqEditControlID){
        addTextKeyDownEvent(eqEditControlID[t]);
    }

    for(var n in deqEditControlID){
        addTextKeyDownEvent(deqEditControlID[n]);
    }

    for(var c in agcEditControlID){
        addTextKeyDownEvent(agcEditControlID[c]);
    }

    for(var b in gainEditControlID){
        addTextKeyDownEvent(gainEditControlID[b]);
    }

    addOutTextKeyDownEvent();

    document.getElementById('gain_setting').addEventListener('keydown', gainSettingKeyDownRespond);
    document.getElementById('input_gain_setting').addEventListener('keydown', inputGainSettingKeyDownRespond);
}



function gainSettingKeyDownRespond(ev){ // 中控 输出增益
    currentStep = parseInt(document.getElementById('gain_setting').value);
    if(!keyDownRespond(ev))
    {
        return false;
    }
    if(currentStep < -80){
        currentStep = -80;
    }else if(currentStep > 12){
        currentStep = 12;
    }
    document.getElementById('gain_setting').value = currentStep + 'dB';

    getOutputWriteCode();
}

function inputGainSettingKeyDownRespond(ev){ //中控 输入增益
    currentStep = parseInt(document.getElementById('input_gain_setting').value);
    if(!keyDownRespond(ev))
    {
        return false;
    }
    if(currentStep < -80){
        currentStep = -80;
    }else if(currentStep > 12){
        currentStep = 12;
    }
    document.getElementById('input_gain_setting').value = currentStep + 'dB';

    getInputWriteCode();
}



function addTextKeyDownEvent(id) {
    var fn;
    var inputTextId;
    switch (id){
        case controlsId.TEXT_GATE:
            fn = gateKeyDownRespond;
            inputTextId = 'text_gate';
            break;
        case controlsId.TEXT_DELAY_MILLISECOND:
            fn = delayTimeKeyDownRespond;
            inputTextId = 'text_delay_millisecond';
            break;
        case controlsId.TEXT_DELAY_METER:
            fn = delayMeterKeyDownRespond;
            inputTextId = 'text_delay_meter';
            break;
        case controlsId.TEXT_DELAY_INCH:
            fn = delayInchKeyDownRespond;
            inputTextId = 'text_delay_inch';
            break;
        //===================================================
        case controlsId.TEXT_EQ1_FREQUENCY:
            fn = eq1FrequencyKeyDownRespond;
            inputTextId = 'text_eq1_frequency';
            break;
        case controlsId.TEXT_EQ1_BANDWIDTH:
            fn = eq1BandwidthKeyDownRespond;
            inputTextId = 'text_eq1_bandwidth';
            break;
        case controlsId.TEXT_EQ1_SLOPE:
            fn = eq1SlopeKeyDownRespond;
            inputTextId = 'text_eq1_slope';
            break;
        case controlsId.TEXT_EQ1_GAIN:
            fn = eq1GainKeyDownRespond;
            inputTextId = 'text_eq1_gain';
            break;
        //==================
        case controlsId.TEXT_EQ2_FREQUENCY:
            fn = eq2FrequencyKeyDownRespond;
            inputTextId = 'text_eq2_frequency';
            break;
        case controlsId.TEXT_EQ2_BANDWIDTH:
            fn = eq2BandwidthKeyDownRespond;
            inputTextId = 'text_eq2_bandwidth';
            break;
        case controlsId.TEXT_EQ2_SLOPE:
            fn = eq2SlopeKeyDownRespond;
            inputTextId = 'text_eq2_slope';
            break;
        case controlsId.TEXT_EQ2_GAIN:
            fn = eq2GainKeyDownRespond;
            inputTextId = 'text_eq2_gain';
            break;
        //==================
        case controlsId.TEXT_EQ3_FREQUENCY:
            fn = eq3FrequencyKeyDownRespond;
            inputTextId = 'text_eq3_frequency';
            break;
        case controlsId.TEXT_EQ3_BANDWIDTH:
            fn = eq3BandwidthKeyDownRespond;
            inputTextId = 'text_eq3_bandwidth';
            break;
        case controlsId.TEXT_EQ3_SLOPE:
            fn = eq3SlopeKeyDownRespond;
            inputTextId = 'text_eq3_slope';
            break;
        case controlsId.TEXT_EQ3_GAIN:
            fn = eq3GainKeyDownRespond;
            inputTextId = 'text_eq3_gain';
            break;
        //==================
        case controlsId.TEXT_EQ4_FREQUENCY:
            fn = eq4FrequencyKeyDownRespond;
            inputTextId = 'text_eq4_frequency';
            break;
        case controlsId.TEXT_EQ4_BANDWIDTH:
            fn = eq4BandwidthKeyDownRespond;
            inputTextId = 'text_eq4_bandwidth';
            break;
        case controlsId.TEXT_EQ4_SLOPE:
            fn = eq4SlopeKeyDownRespond;
            inputTextId = 'text_eq4_slope';
            break;
        case controlsId.TEXT_EQ4_GAIN:
            fn = eq4GainKeyDownRespond;
            inputTextId = 'text_eq4_gain';
            break;
        //==================
        case controlsId.TEXT_EQ5_FREQUENCY:
            fn = eq5FrequencyKeyDownRespond;
            inputTextId = 'text_eq5_frequency';
            break;
        case controlsId.TEXT_EQ5_BANDWIDTH:
            fn = eq5BandwidthKeyDownRespond;
            inputTextId = 'text_eq5_bandwidth';
            break;
        case controlsId.TEXT_EQ5_SLOPE:
            fn = eq5SlopeKeyDownRespond;
            inputTextId = 'text_eq5_slope';
            break;
        case controlsId.TEXT_EQ5_GAIN:
            fn = eq5GainKeyDownRespond;
            inputTextId = 'text_eq5_gain';
            break;
        //==================
        case controlsId.TEXT_EQ6_FREQUENCY:
            fn = eq6FrequencyKeyDownRespond;
            inputTextId = 'text_eq6_frequency';
            break;
        case controlsId.TEXT_EQ6_BANDWIDTH:
            fn = eq6BandwidthKeyDownRespond;
            inputTextId = 'text_eq6_bandwidth';
            break;
        case controlsId.TEXT_EQ6_SLOPE:
            fn = eq6SlopeKeyDownRespond;
            inputTextId = 'text_eq6_slope';
            break;
        case controlsId.TEXT_EQ6_GAIN:
            fn = eq6GainKeyDownRespond;
            inputTextId = 'text_eq6_gain';
            break;
        //===================================================
        case controlsId.TEXT_DEQ1_FREQUENCY:
            fn = deq1FrequencyKeyDownRespond;
            inputTextId = 'text_deq1_frequency';
            break;
        case controlsId.TEXT_DEQ1_BANDWIDTH:
            fn = deq1BandwidthKeyDownRespond;
            inputTextId = 'text_deq1_bandwidth';
            break;
        case controlsId.TEXT_DEQ1_LEVEL:
            fn = deq1LevelKeyDownRespond;
            inputTextId = 'text_deq1_level';
            break;
        case controlsId.TEXT_DEQ2_FREQUENCY:
            fn = deq2FrequencyKeyDownRespond;
            inputTextId = 'text_deq2_frequency';
            break;
        case controlsId.TEXT_DEQ2_BANDWIDTH:
            fn = deq2BandwidthKeyDownRespond;
            inputTextId = 'text_deq2_bandwidth';
            break;
        case controlsId.TEXT_DEQ2_LEVEL:
            fn = deq2LevelKeyDownRespond;
            inputTextId = 'text_deq2_level';
            break;

        case controlsId.TEXT_DEQ1_THRESHOLD:
            fn = deq1ThresholdKeyDownRespond;
            inputTextId = 'deq1_threshold';
            break;
        case controlsId.TEXT_DEQ1_RATIO:
            fn = deq1RatioKeyDownRespond;
            inputTextId = 'deq1_ratio';
            break;
        case controlsId.TEXT_DEQ1_ATTACK_TIME:
            fn = deq1AttackKeyDownRespond;
            inputTextId = 'deq1_attack_time';
            break;
        case controlsId.TEXT_DEQ1_RELEASE_TIME:
            fn = deq1ReleaseKeyDownRespond;
            inputTextId = 'deq1_release_time';
            break;

        case controlsId.TEXT_DEQ2_THRESHOLD:
            fn = deq2ThresholdKeyDownRespond;
            inputTextId = 'deq2_threshold';
            break;
        case controlsId.TEXT_DEQ2_RATIO:
            fn = deq2RatioKeyDownRespond;
            inputTextId = 'deq2_ratio';
            break;
        case controlsId.TEXT_DEQ2_ATTACK_TIME:
            fn = deq2AttackKeyDownRespond;
            inputTextId = 'deq2_attack_time';
            break;
        case controlsId.TEXT_DEQ2_RELEASE_TIME:
            fn = deq2ReleaseKeyDownRespond;
            inputTextId = 'deq2_release_time';
            break;





        //===================================================
        case controlsId.TEXT_THRESHOLD:
            fn = thresholdKeyDownRespond;
            inputTextId = 'text_threshold';
            break;
        case controlsId.TEXT_TARGET_LEVEL:
            fn = targetLevelKeyDownRespond;
            inputTextId = 'text_target_level';
            break;
        case controlsId.TEXT_EXTENSION_RATIO:
            fn = extensionRatioKeyDownRespond;
            inputTextId = 'text_extension_ratio';
            break;
        case controlsId.TEXT_EXTENSION_ATTACK:
            fn = extensionAttackKeyDownRespond;
            inputTextId = 'text_extension_attack';
            break;
        case controlsId.TEXT_EXTENSION_RELEASE:
            fn = extensionReleaseKeyDownRespond;
            inputTextId = 'text_extension_release';
            break;
        case controlsId.TEXT_COMPRESSOR:
            fn = compressorKeyDownRespond;
            inputTextId = 'text_compressor';
            break;
        case controlsId.TEXT_COMP_RATIO:
            fn = compRatioKeyDownRespond;
            inputTextId = 'text_comp_ratio';
            break;
        case controlsId.TEXT_COMP_ATTACK:
            fn = compAttackKeyDownRespond;
            inputTextId = 'text_comp_attack';
            break;
        case controlsId.TEXT_COMP_RELEASE:
            fn = compReleaseKeyDownRespond;
            inputTextId = 'text_comp_release';
            break;
        //===================================================
        case controlsId.TEXT_VOLUME_A:
            fn = volumeAKeyDownRespond;
            inputTextId = 'text_volume_a';
            break;
        case controlsId.TEXT_VOLUME_B:
            fn = volumeBKeyDownRespond;
            inputTextId = 'text_volume_b';
            break;
        case controlsId.TEXT_VOLUME_C:
            fn = volumeCKeyDownRespond;
            inputTextId = 'text_volume_c';
            break;
        case controlsId.TEXT_VOLUME_D:
            fn = volumeDKeyDownRespond;
            inputTextId = 'text_volume_d';
            break;
        case controlsId.TEXT_VOLUME_OUT1:
            fn = volumeOut1KeyDownRespond;
            inputTextId = 'text_volume_out1';
            break;
        case controlsId.TEXT_VOLUME_OUT2:
            fn = volumeOut2KeyDownRespond;
            inputTextId = 'text_volume_out2';
            break;
        case controlsId.TEXT_VOLUME_OUT3:
            fn = volumeOut3KeyDownRespond;
            inputTextId = 'text_volume_out3';
            break;
        case controlsId.TEXT_VOLUME_OUT4:
            fn = volumeOut4KeyDownRespond;
            inputTextId = 'text_volume_out4';
            break;
        case controlsId.TEXT_VOLUME_OUT5:
            fn = volumeOut5KeyDownRespond;
            inputTextId = 'text_volume_out5';
            break;
        case controlsId.TEXT_VOLUME_OUT6:
            fn = volumeOut6KeyDownRespond;
            inputTextId = 'text_volume_out6';
            break;
        case controlsId.TEXT_VOLUME_OUT7:
            fn = volumeOut7KeyDownRespond;
            inputTextId = 'text_volume_out7';
            break;
        case controlsId.TEXT_VOLUME_OUT8:
            fn = volumeOut8KeyDownRespond;
            inputTextId = 'text_volume_out8';
            break;
        case controlsId.TEXT_GAIN:
            fn = gainKeyDownRespond;
            inputTextId = 'text_gain';
            break;
        default:
            break;

    }
    currentEditControl = document.getElementById(inputTextId);
    currentEditControl.addEventListener('keydown', fn);
}


function keyDownRespond(ev){
    var e = window.event || ev;
    var code =  e.keyCode;
    if(code === 38){        //key: up
        currentStep++;
        return true;
    }else if(code === 40){  //key: down
        currentStep--;
        return true;
    }
    return false;
}


//====================================================================================================================
//noise_gate  &&  delay 输入延时
function gateKeyDownRespond(ev){
    currentStep = controlsData.inputData.noisegate;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    var editControl = document.getElementById('text_gate');  //门限
    checkCurrentStep(inputTextValueType.NOISE_GATE);
    controlsData.inputData.noisegate = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.NOISE_GATE);
    keepLinkInputGate(curButtonNo,currentStep);
}

function delayTimeKeyDownRespond(ev){
    currentStep = controlsData.inputData.delay;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    var editControl = document.getElementById('text_delay_millisecond');//输入延时 毫秒
    checkCurrentStep(inputTextValueType.DELAY_TIME);
    controlsData.inputData.delay = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_inch');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkInputTime(curButtonNo, currentStep);
}

function delayMeterKeyDownRespond(ev){
    currentStep = controlsData.inputData.delay;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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

function delayInchKeyDownRespond(ev){
    currentStep = controlsData.inputData.delay;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    var editControl = document.getElementById('text_delay_inch');// 输入延时 英寸
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
function eq1FrequencyKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq1_frequency');
    currentStep = eqData.EQ1.freq;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ1.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq1Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,1);
    DrawLine();
    curEqChannel = 1;
    showOrHideEqData();
}

function eq1BandwidthKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq1_bandwidth');
    currentStep = eqData.EQ1.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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

function eq1SlopeKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq1_slope');
    currentStep = eqData.EQ1.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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

function eq1GainKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq1_gain');
    currentStep = eqData.EQ1.level;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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
function eq2FrequencyKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq2_frequency');
    currentStep = eqData.EQ2.freq;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ2.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq2Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,2);
    DrawLine();
    curEqChannel = 2;
    showOrHideEqData();
}

function eq2BandwidthKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq2_bandwidth');
    currentStep = eqData.EQ2.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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

function eq2SlopeKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq2_slope');
    currentStep = eqData.EQ2.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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


function eq2GainKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq2_gain');
    currentStep = eqData.EQ2.level;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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
function eq3FrequencyKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq3_frequency');
    currentStep = eqData.EQ3.freq;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ3.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq3Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,3);
    DrawLine();
    curEqChannel = 3;
    showOrHideEqData();
}

function eq3BandwidthKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq3_bandwidth');
    currentStep = eqData.EQ3.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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

function eq3SlopeKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq3_slope');
    currentStep = eqData.EQ3.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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


function eq3GainKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq3_gain');
    currentStep = eqData.EQ3.level;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.EQ_GAIN);
    eqData.EQ3.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EQ_GAIN);
    keepLinkEq3Gain(curButtonNo, currentStep);
    //console.log(getDisplayValue(inputTextValueType.EQ_GAIN));
    setSliderPosition(controlsId.SLIDER_EQ3_THUMP, currentStep);
    eqDataKeepStep(curButtonNo,3);
    DrawLine();
    updateAllEqGainButton();
    curEqChannel = 3;
    showOrHideEqData();

}
//=====================================================================
//eq4
function eq4FrequencyKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq4_frequency');
    currentStep = eqData.EQ4.freq;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ4.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq4Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,4);
    DrawLine();
    curEqChannel = 4;
    showOrHideEqData();
}

function eq4BandwidthKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq4_bandwidth');
    currentStep = eqData.EQ4.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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

function eq4SlopeKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq4_slope');
    currentStep = eqData.EQ4.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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


function eq4GainKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq4_gain');
    currentStep = eqData.EQ4.level;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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
function eq5FrequencyKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq5_frequency');
    currentStep = eqData.EQ5.freq;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ5.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq5Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,5);
    DrawLine();
    curEqChannel = 5;
    showOrHideEqData();
}

function eq5BandwidthKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq5_bandwidth');
    currentStep = eqData.EQ5.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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

function eq5SlopeKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq5_slope');
    currentStep = eqData.EQ5.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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


function eq5GainKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq5_gain');
    currentStep = eqData.EQ5.level;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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
function eq6FrequencyKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq6_frequency');
    currentStep = eqData.EQ6.freq;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ6.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq6Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,6);
    DrawLine();
    curEqChannel = 6;
    showOrHideEqData();
}

function eq6BandwidthKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq6_bandwidth');
    currentStep = eqData.EQ6.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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

function eq6SlopeKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq6_slope');
    currentStep = eqData.EQ6.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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


function eq6GainKeyDownRespond(ev){
    var editControl = document.getElementById('text_eq6_gain');
    currentStep = eqData.EQ6.level;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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
//====================================================================================================================
function deq1FrequencyKeyDownRespond(ev){
    var editControl = document.getElementById('text_deq1_frequency');　// DEQ1频率
    currentStep = controlsData.inputData.InDeq1.req;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.FREQUENCY);
    controlsData.inputData.InDeq1.req = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkInputDeq1Frequency(curButtonNo, currentStep);
}

function deq1BandwidthKeyDownRespond(ev){
    var editControl = document.getElementById('text_deq1_bandwidth'); // DEQ1带宽
    currentStep = controlsData.inputData.InDeq1.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    controlsData.inputData.InDeq1.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkInputDeq1Bandwidth(curButtonNo, currentStep);
}

function deq1LevelKeyDownRespond(ev){
    var editControl = document.getElementById('text_deq1_level'); // DEQ1目标电平
    currentStep = controlsData.inputData.InDeq1.level;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.DEQ_LEVEL);
    controlsData.inputData.InDeq1.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_LEVEL);
    keepLinkInputDeq1Level(curButtonNo, currentStep);
    updateDeqButton();
}

function deq1ThresholdKeyDownRespond(ev){
    var editControl = document.getElementById('deq1_threshold'); // DEQ1阈值
    currentStep =  controlsData.inputData.DeqParam1.DEQ_Threshold;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.DEQ_THRESHOLD);
    controlsData.inputData.DeqParam1.DEQ_Threshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_THRESHOLD);
    keepLinkInputDeq1Threshold(curButtonNo, currentStep);
}

function deq1RatioKeyDownRespond(ev){
    var editControl = document.getElementById('deq1_ratio');// DEQ1比率
    currentStep =  controlsData.inputData.DeqParam1.DEQ_ratio;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    fixRatioCurrentStep(controlsData.inputData.DeqParam1.DEQ_ratio);
    checkCurrentStep(inputTextValueType.EXTENSION_RATION);
    controlsData.inputData.DeqParam1.DEQ_ratio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputDeq1Ratio(curButtonNo, currentStep);
}

function deq1AttackKeyDownRespond(ev){
    var editControl = document.getElementById('deq1_attack_time');  // DEQ1 响应时间
    currentStep =  controlsData.inputData.DeqParam1.DEQ_a;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.DeqParam1.DEQ_a = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputDeq1AttackTime(curButtonNo, currentStep);
}

function deq1ReleaseKeyDownRespond(ev){
    var editControl = document.getElementById('deq1_release_time');  // DEQ1释放时间
    currentStep =  controlsData.inputData.DeqParam1.DEQ_r;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.DeqParam1.DEQ_r = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputDeq1ReleaseTime(curButtonNo, currentStep);
}

//====================================================================================================================
function deq2FrequencyKeyDownRespond(ev){
    var editControl = document.getElementById('text_deq2_frequency');  // DEQ2频率
    currentStep = controlsData.inputData.InDeq2.req;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.FREQUENCY);
    controlsData.inputData.InDeq2.req = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkInputDeq2Frequency(curButtonNo, currentStep);
}

function deq2BandwidthKeyDownRespond(ev){
    var editControl = document.getElementById('text_deq2_bandwidth'); // DEQ2带宽
    currentStep = controlsData.inputData.InDeq2.bw;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    controlsData.inputData.InDeq2.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkInputDeq2Bandwidth(curButtonNo, currentStep);
}

function deq2LevelKeyDownRespond(ev){
    var editControl = document.getElementById('text_deq2_level'); // DEQ2电平
    currentStep = controlsData.inputData.InDeq2.level;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.DEQ_LEVEL);
    controlsData.inputData.InDeq2.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_LEVEL);
    keepLinkInputDeq2Level(curButtonNo, currentStep);
    updateDeqButton();
}


function deq2ThresholdKeyDownRespond(ev){
    var editControl = document.getElementById('deq2_threshold');   // DEQ2阈值
    currentStep =  controlsData.inputData.DeqParam2.DEQ_Threshold;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.DEQ_THRESHOLD);
    controlsData.inputData.DeqParam2.DEQ_Threshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_THRESHOLD);
    keepLinkInputDeq2Threshold(curButtonNo, currentStep);
}


function deq2RatioKeyDownRespond(ev){
    var editControl = document.getElementById('deq2_ratio'); // DEQ2比率
    currentStep =  controlsData.inputData.DeqParam2.DEQ_ratio;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    fixRatioCurrentStep(controlsData.inputData.DeqParam2.DEQ_ratio);
    checkCurrentStep(inputTextValueType.EXTENSION_RATION);
    controlsData.inputData.DeqParam2.DEQ_ratio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputDeq2Ratio(curButtonNo, currentStep);
}

function deq2AttackKeyDownRespond(ev){
    var editControl = document.getElementById('deq2_attack_time'); // DEQ2响应时间
    currentStep =  controlsData.inputData.DeqParam2.DEQ_a;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.DeqParam2.DEQ_a = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputDeq2AttackTime(curButtonNo, currentStep);
}

function deq2ReleaseKeyDownRespond(ev){
    var editControl = document.getElementById('deq2_release_time'); // DEQ2释放时间
    currentStep =  controlsData.inputData.DeqParam2.DEQ_r;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.DeqParam2.DEQ_r = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputDeq2ReleaseTime(curButtonNo, currentStep);
}


//====================================================================================================================
function thresholdKeyDownRespond(ev){ // 输入自动增益 阈值
    var editControl = document.getElementById('text_threshold');
    currentStep = controlsData.inputData.agThreshold;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    controlsData.inputData.agThreshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    keepLinkInputThreshold(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}

function targetLevelKeyDownRespond(ev){
    var editControl = document.getElementById('text_target_level');// 输入自动增益目标电平
    currentStep = controlsData.inputData.agLevel;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.TARGET_LEVEL);
    controlsData.inputData.agLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    keepLinkInputLevel(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}


function extensionRatioKeyDownRespond(ev){
    var editControl = document.getElementById('text_extension_ratio');// 输入自动增益比率
    currentStep = controlsData.inputData.agRatio;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    fixRatioCurrentStep(controlsData.inputData.agRatio);
    checkCurrentStep(inputTextValueType.EXTENSION_RATION);
    controlsData.inputData.agRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputExtendRatio(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}


function extensionAttackKeyDownRespond(ev){
    var editControl = document.getElementById('text_extension_attack');// 输入自动增益 响应时间
    currentStep = controlsData.inputData.agAttack;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.agAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputExtendAttackTime(curButtonNo, currentStep);
}


function extensionReleaseKeyDownRespond(ev){
    var editControl = document.getElementById('text_extension_release');// 输入自动增益 释放时间
    currentStep = controlsData.inputData.agRelease;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.agRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputExtendReleaseTime(curButtonNo, currentStep);
}


function compressorKeyDownRespond(ev){
    var editControl = document.getElementById('text_compressor');// 输入压缩电平
    currentStep = controlsData.inputData.compLevel;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.INPUT_COMPRESS_THRESHOLD);
    controlsData.inputData.compLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_COMPRESS_THRESHOLD);
    keepLinkInputCompressLevel(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}


function compRatioKeyDownRespond(ev){
    var editControl = document.getElementById('text_comp_ratio');// 输入压缩比
    currentStep = controlsData.inputData.compRatio;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    fixRatioCurrentStep(controlsData.inputData.compRatio);
    checkCurrentStep(inputTextValueType.COMPRESS_RATION);
    controlsData.inputData.compRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.COMPRESS_RATION);
    keepLinkInputCompressRatio(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}


function compAttackKeyDownRespond(ev){
    var editControl = document.getElementById('text_comp_attack');// 输入响应时间
    currentStep = controlsData.inputData.compAttack;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.compAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputCompressAttackTime(curButtonNo, currentStep);
}


function compReleaseKeyDownRespond(ev){
    var editControl = document.getElementById('text_comp_release'); // 输入释放时间
    currentStep = controlsData.inputData.compRelease;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.compRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputCompressReleaseTime(curButtonNo, currentStep);
}

//====================================================================================================================
// 4 input_channel_gain + 8 out_channel_gain
function volumeAKeyDownRespond(ev){
    var editControl = document.getElementById('text_volume_a'); // 输入A 增益
    currentStep = currentGroupData.dataInputA.gain;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputA.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_A, currentStep);
    //console.log(currentGroupData.dataInputA.gain);
    keepLinkInputVolume(0,currentStep);
}


function volumeBKeyDownRespond(ev){
    var editControl = document.getElementById('text_volume_b'); // 输入B 增益
    currentStep = currentGroupData.dataInputB.gain;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputB.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_B, currentStep);
    keepLinkInputVolume(1,currentStep);
}


function volumeCKeyDownRespond(ev){
    var editControl = document.getElementById('text_volume_c'); // 输入C 增益
    currentStep = currentGroupData.dataInputC.gain;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputC.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_C, currentStep);
    keepLinkInputVolume(2,currentStep);
}


function volumeDKeyDownRespond(ev){
    var editControl = document.getElementById('text_volume_d'); // 输入D 增益
    currentStep = currentGroupData.dataInputD.gain;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputD.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_D, currentStep);
    keepLinkInputVolume(3,currentStep);
}

function volumeOut1KeyDownRespond(ev){
    var editControl = document.getElementById('text_volume_out1'); // 输出 1 增益
    currentStep = currentGroupData.dataOut1.gain;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut1.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT1, currentStep);
    keepLinkOutVolume(0,currentStep);
}


function volumeOut2KeyDownRespond(ev){
    var editControl = document.getElementById('text_volume_out2'); // 输出 2 增益
    currentStep = currentGroupData.dataOut2.gain;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut2.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT2, currentStep);
    keepLinkOutVolume(1,currentStep);
}


function volumeOut3KeyDownRespond(ev){
    var editControl = document.getElementById('text_volume_out3'); // 输出 3 增益
    currentStep = currentGroupData.dataOut3.gain;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut3.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT3, currentStep);
    keepLinkOutVolume(2,currentStep);
}


function volumeOut4KeyDownRespond(ev){
    var editControl = document.getElementById('text_volume_out4'); // 输出 4 增益
    currentStep = currentGroupData.dataOut4.gain;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut4.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT4, currentStep);
    keepLinkOutVolume(3,currentStep);
}


function volumeOut5KeyDownRespond(ev){
    var editControl = document.getElementById('text_volume_out5'); // 输出 5 增益
    currentStep = currentGroupData.dataOut5.gain;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut5.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT5, currentStep);
    keepLinkOutVolume(4,currentStep);
}


function volumeOut6KeyDownRespond(ev){
    var editControl = document.getElementById('text_volume_out6'); // 输出 6 增益
    currentStep = currentGroupData.dataOut6.gain;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut6.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT6, currentStep);
    keepLinkOutVolume(5,currentStep);
}


function volumeOut7KeyDownRespond(ev){
    var editControl = document.getElementById('text_volume_out7'); // 输出 7 增益
    currentStep = currentGroupData.dataOut7.gain;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut7.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT7, currentStep);
    keepLinkOutVolume(6,currentStep);
}

function volumeOut8KeyDownRespond(ev){
    var editControl = document.getElementById('text_volume_out8'); // 输出 8 增益
    currentStep = currentGroupData.dataOut8.gain;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut8.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT8, currentStep);
    keepLinkOutVolume(7,currentStep);
}

function gainKeyDownRespond(ev){
    var editControl = document.getElementById('text_gain');//总 增益
    currentStep = getChannelGain(curButtonNo);
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    setChannelGain(curButtonNo,currentStep);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setGainSliderPosition(currentStep);
    keepShortGainInStep(currentStep);
}


//output
//=============================================================================
function addOutTextKeyDownEvent() {
    var editControl = document.getElementById("text_delay_millisecond_out");
    editControl.addEventListener('keydown', outDelayTimeKeyDownRespond);

    editControl = document.getElementById("text_delay_meter_out");
    editControl.addEventListener('keydown', outDelayMeterKeyDownRespond);

    editControl = document.getElementById("text_delay_inch_out");
    editControl.addEventListener('keydown', outDelayInchKeyDownRespond);

    editControl = document.getElementById("text_hpf_frequency");
    editControl.addEventListener('keydown', hpfFrequencyKeyDownRespond);

    editControl = document.getElementById("text_lpf_frequency");
    editControl.addEventListener('keydown', lpfFrequencyKeyDownRespond);


    editControl = document.getElementById("text_threshold_compress_out");
    editControl.addEventListener('keydown', outThresholdCompressKeydownRespond);

    editControl = document.getElementById("text_ratio_compress_out");
    editControl.addEventListener('keydown', outRatioCompressKeydownRespond);

    editControl = document.getElementById("text_attack_compress_out");
    editControl.addEventListener('keydown', outAttackCompressKeydownRespond);

    editControl = document.getElementById("text_release_compress_out");
    editControl.addEventListener('keydown', outReleaseCompressKeydownRespond);

    editControl = document.getElementById("text_threshold_limit_out");
    editControl.addEventListener('keydown', outThresholdLimitKeydownRespond);

    editControl = document.getElementById("text_attack_limit_out");
    editControl.addEventListener('keydown', outAttackLimitKeydownRespond);

    editControl = document.getElementById("text_release_limit_out");
    editControl.addEventListener('keydown', outReleaseLimitKeydownRespond);
}

//======================================================================================================================
//输出压缩限幅
function outThresholdCompressKeydownRespond(ev){
    var editControl = document.getElementById('text_threshold_compress_out'); //输出压缩电平
    currentStep = controlsData.outputData.compLevel;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
    controlsData.outputData.compLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
    keepLinkOutThresholdCompress(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
}


function outRatioCompressKeydownRespond(ev){
    var editControl = document.getElementById('text_ratio_compress_out'); //输出压缩比
    currentStep = controlsData.outputData.compRatio;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    fixRatioCurrentStep(controlsData.outputData.compRatio);
    checkCurrentStep(inputTextValueType.COMPRESS_RATION);
    controlsData.outputData.compRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.COMPRESS_RATION);
    keepLinkOutRatioCompress(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
}


function outAttackCompressKeydownRespond(ev){
    var editControl = document.getElementById('text_attack_compress_out'); //输出压缩响应时间
    currentStep = controlsData.outputData.compAttack;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.outputData.compAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkOutAttackCompress(curButtonNo, currentStep);
}


function outReleaseCompressKeydownRespond(ev){
    var editControl = document.getElementById('text_release_compress_out'); //输出压缩释放时间
    currentStep = controlsData.outputData.compR;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.outputData.compR = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkOutReleaseCompress(curButtonNo, currentStep);
}

function outThresholdLimitKeydownRespond(ev){
    var editControl = document.getElementById('text_threshold_limit_out'); //输出限幅电平
    currentStep = controlsData.outputData.limT;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.OUTPUT_LIMITER_THRESHOLD);
    controlsData.outputData.limT = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.OUTPUT_LIMITER_THRESHOLD);
    keepLinkOutThresholdLimit(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
}


function outAttackLimitKeydownRespond(ev){
    var editControl = document.getElementById('text_attack_limit_out'); //输出限幅响应时间
    currentStep = controlsData.outputData.limAttack;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.outputData.limAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkOutAttackLimit(curButtonNo, currentStep);
}

function outReleaseLimitKeydownRespond(ev){
    var editControl = document.getElementById('text_release_limit_out'); //输出限幅释放时间
    currentStep = controlsData.outputData.limRelease;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.outputData.limRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkOutReleaseLimit(curButtonNo, currentStep);
}

//======================================================================================================================
//输出延时
function outDelayTimeKeyDownRespond(ev){
    currentStep = controlsData.outputData.delay;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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

function outDelayMeterKeyDownRespond(ev){
    currentStep = controlsData.outputData.delay;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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

function outDelayInchKeyDownRespond(ev){
    currentStep = controlsData.outputData.delay;
    if(!keyDownRespond(ev))
    {
        return false;
    }
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
function hpfFrequencyKeyDownRespond(ev){
    var editControl = document.getElementById('text_hpf_frequency'); //分频 高通
    currentStep = controlsData.outputData.HPFData.HL_freq;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.FREQUENCY);
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


function lpfFrequencyKeyDownRespond(ev){
    var editControl = document.getElementById('text_lpf_frequency'); //分频 低通
    currentStep = controlsData.outputData.LPFData.HL_freq;
    if(!keyDownRespond(ev))
    {
        return false;
    }
    checkCurrentStep(inputTextValueType.FREQUENCY);
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

