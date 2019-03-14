//==============================================================================
// up_down_click
//==============================================================================
var isUpAndDownStop = false;
var upDownInterval;
var upDownPressTime = 0;
var upDownPressTimeConst = 7;
var upDownSpeed= 60; // millisecond


function initUpAndDownButton() {
    var i;
    var delayLeftIdFn = [['millisecond_left_up_adjust',millisecondLeftUpAdjust],
        ['millisecond_left_down_adjust', millisecondLeftDownAdjust ],
        ['meter_left_up_adjust',millisecondLeftUpAdjust],
        ['meter_left_down_adjust', millisecondLeftDownAdjust ],
        ['inch_left_up_adjust',millisecondLeftUpAdjust],
        ['inch_left_down_adjust', millisecondLeftDownAdjust ],
        ];

    var delayRightIdFn = [['millisecond_right_up_adjust',millisecondRightUpAdjust],
        ['millisecond_right_down_adjust', millisecondRightDownAdjust ],
        ['meter_right_up_adjust',millisecondRightUpAdjust],
        ['meter_right_down_adjust', millisecondRightDownAdjust ],
        ['inch_right_up_adjust',millisecondRightUpAdjust],
        ['inch_right_down_adjust', millisecondRightDownAdjust ],
    ];


    var outDelayLeftIdFn = [['millisecond_out_left_up_adjust',millisecondOutLeftUpAdjust],
        ['millisecond_out_left_down_adjust', millisecondOutLeftDownAdjust ],
        ['meter_out_left_up_adjust',millisecondOutLeftUpAdjust],
        ['meter_out_left_down_adjust', millisecondOutLeftDownAdjust ],
        ['inch_out_left_up_adjust',millisecondOutLeftUpAdjust],
        ['inch_out_left_down_adjust', millisecondOutLeftDownAdjust ],
    ];

    var outDelayRightIdFn = [['millisecond_out_right_up_adjust',millisecondOutRightUpAdjust],
        ['millisecond_out_right_down_adjust', millisecondOutRightDownAdjust ],
        ['meter_out_right_up_adjust',millisecondOutRightUpAdjust],
        ['meter_out_right_down_adjust', millisecondOutRightDownAdjust ],
        ['inch_out_right_up_adjust',millisecondOutRightUpAdjust],
        ['inch_out_right_down_adjust', millisecondOutRightDownAdjust ],
    ];

    function initUpAndDownEvent(id, fn) {
        document.getElementById(id).onclick = fn;
        document.getElementById(id).onclick = fn;
        initUpAndDownMouseDown(id, fn);
        initUpAndDownMouseUp(id);
        initUpAndDownMouseLeave(id);
    }


    for( i = 0; i < delayLeftIdFn.length; i++) {
        initUpAndDownEvent(delayLeftIdFn[i][0], delayLeftIdFn[i][1]);
        initUpAndDownEvent(delayRightIdFn[i][0], delayRightIdFn[i][1]);
        initUpAndDownEvent(outDelayLeftIdFn[i][0], outDelayLeftIdFn[i][1]);
        initUpAndDownEvent(outDelayRightIdFn[i][0], outDelayRightIdFn[i][1]);
    }

    //====================================================================
    var rightUpIdFn = [['noise_right_up_adjust',gateKeyRightAdjust],
        ['text_eq1_frequency_right_up_adjust', eq1FrequencyRightAdjust],
        ['text_eq1_bandwidth_right_up_adjust', eq1BandwidthRightAdjust],
        ['text_eq1_slope_right_up_adjust', eq1SlopeRightAdjust],
        ['text_eq1_gain_right_up_adjust', eq1GainRightAdjust],
        ['text_eq2_frequency_right_up_adjust', eq2FrequencyRightAdjust],
        ['text_eq2_bandwidth_right_up_adjust', eq2BandwidthRightAdjust],
        ['text_eq2_slope_right_up_adjust', eq2SlopeRightAdjust],
        ['text_eq2_gain_right_up_adjust', eq2GainRightAdjust],
        ['text_eq3_frequency_right_up_adjust', eq3FrequencyRightAdjust],
        ['text_eq3_bandwidth_right_up_adjust', eq3BandwidthRightAdjust],
        ['text_eq3_slope_right_up_adjust', eq3SlopeRightAdjust],
        ['text_eq3_gain_right_up_adjust',eq3GainRightAdjust],
        ['text_eq4_frequency_right_up_adjust', eq4FrequencyRightAdjust],
        ['text_eq4_bandwidth_right_up_adjust', eq4BandwidthRightAdjust],
        ['text_eq4_slope_right_up_adjust', eq4SlopeRightAdjust],
        ['text_eq4_gain_right_up_adjust', eq4GainRightAdjust],
        ['text_eq5_frequency_right_up_adjust', eq5FrequencyRightAdjust],
        ['text_eq5_bandwidth_right_up_adjust', eq5BandwidthRightAdjust],
        ['text_eq5_slope_right_up_adjust', eq5SlopeRightAdjust],
        ['text_eq5_gain_right_up_adjust', eq5GainRightAdjust],
        ['text_eq6_frequency_right_up_adjust', eq6FrequencyRightAdjust],
        ['text_eq6_bandwidth_right_up_adjust', eq6BandwidthRightAdjust],
        ['text_eq6_slope_right_up_adjust', eq6SlopeRightAdjust],
        ['text_eq6_gain_right_up_adjust', eq6GainRightAdjust],
        ['text_deq1_frequency_right_up_adjust', deq1FrequencyRightAdjust],
        ['text_deq1_bandwidth_right_up_adjust', deq1BandwidthRightAdjust],
        ['text_deq1_level_right_up_adjust', deq1LevelRightAdjust],
        ['text_deq2_frequency_right_up_adjust', deq2FrequencyRightAdjust],
        ['text_deq2_bandwidth_right_up_adjust', deq2BandwidthRightAdjust],
        ['text_deq2_level_right_up_adjust', deq2LevelRightAdjust],
        ['deq1_threshold_right_up_adjust', deq1ThresholdRightAdjust],
        ['deq1_ratio_right_up_adjust', deq1RatioRightAdjust],
        ['deq1_attack_time_right_up_adjust', deq1AttackRightAdjust],
        ['deq1_release_time_right_up_adjust', deq1ReleaseRightAdjust],
        ['deq2_threshold_right_up_adjust', deq2ThresholdRightAdjust],
        ['deq2_ratio_right_up_adjust', deq2RatioRightAdjust],
        ['deq2_attack_time_right_up_adjust', deq2AttackRightAdjust],
        ['deq2_release_time_right_up_adjust', deq2ReleaseRightAdjust],
        ['text_threshold_right_up_adjust', thresholdRightAdjust],
        ['text_target_level_right_up_adjust', targetLevelRightAdjust],
        ['text_extension_ratio_right_up_adjust', extensionRatioRightAdjust],
        ['text_extension_attack_right_up_adjust', extensionAttackRightAdjust],
        ['text_extension_release_right_up_adjust', extensionReleaseRightAdjust],
        ['text_compressor_right_up_adjust', compressorRightAdjust],
        ['text_comp_ratio_right_up_adjust', compRatioRightAdjust],
        ['text_comp_attack_right_up_adjust', compAttackRightAdjust],
        ['text_comp_release_right_up_adjust', compReleaseRightAdjust],
        ['text_volume_a_right_up_adjust', volumeARightAdjust],
        ['text_volume_b_right_up_adjust', volumeBRightAdjust],
        ['text_volume_c_right_up_adjust', volumeCRightAdjust],
        ['text_volume_d_right_up_adjust', volumeDRightAdjust],
        ['text_volume_out1_right_up_adjust', volumeOut1RightAdjust],
        ['text_volume_out2_right_up_adjust', volumeOut2RightAdjust],
        ['text_volume_out3_right_up_adjust', volumeOut3RightAdjust],
        ['text_volume_out4_right_up_adjust', volumeOut4RightAdjust],
        ['text_volume_out5_right_up_adjust', volumeOut5RightAdjust],
        ['text_volume_out6_right_up_adjust', volumeOut6RightAdjust],
        ['text_volume_out7_right_up_adjust', volumeOut7RightAdjust],
        ['text_volume_out8_right_up_adjust', volumeOut8RightAdjust],
        ['text_gain_right_up_adjust', gainRightAdjust],
        ['text_threshold_compress_out_right_up_adjust',outThresholdCompressRightAdjust],
        ['text_ratio_compress_out_right_up_adjust',outRatioCompressRightAdjust],
        ['text_attack_compress_out_right_up_adjust',outAttackCompressRightAdjust],
        ['text_release_compress_out_right_up_adjust',outReleaseCompressRightAdjust],
        ['text_threshold_limit_out_right_up_adjust',outThresholdLimitRightAdjust],
        ['text_attack_limit_out_right_up_adjust',outAttackLimitRightAdjust],
        ['text_release_limit_out_right_up_adjust',outReleaseLimitRightAdjust],
        ['text_hpf_frequency_right_up_adjust',hpfFrequencyRightAdjust],
        ['text_lpf_frequency_right_up_adjust',lpfFrequencyRightAdjust]];

    for (i=0; i < rightUpIdFn.length; i++) {
        initUpAndDownButtonClick(rightUpIdFn[i][0],rightUpIdFn[i][1], 1);
        initUpAndDownButtonClick(rightUpIdFn[i][0].replace('_up_', '_down_'),rightUpIdFn[i][1], 0);
        upAndDownMouseDownResponse(rightUpIdFn[i][0],rightUpIdFn[i][1], 1);
        upAndDownMouseDownResponse(rightUpIdFn[i][0].replace('_up_', '_down_'),rightUpIdFn[i][1], 0);
    }
}

function initUpAndDownButtonClick(id, fn, isUp) {
    document.getElementById(id).onclick = function () {
        fn(isUp);
    }
}





//==============================================================================
// up_down_press
//==============================================================================
function initUpAndDownMouseDown(id, fn, isUp) {
    upAndDownMouseDownResponse(id, fn, isUp);
}

function initUpAndDownMouseUp(id) {
    upDownPressTime = 0;
    document.getElementById(id).onmouseup = upAndDownMouseUpResponse;
}

function initUpAndDownMouseLeave(id) {
    upDownPressTime = 0;
    document.getElementById(id).onmouseleave = upAndDownMouseLeaveResponse;
}

function upAndDownMouseDownResponse(id, fn, isUp) {
    document.getElementById(id).onmousedown = function () {
        upDownInterval = setInterval(function (){
            upDownPressTime++;
            if(upDownPressTime > upDownPressTimeConst){
                fn(isUp);
            }
        }, upDownSpeed);
    }
}

function upAndDownMouseUpResponse() {
    isUpAndDownStop = false;
    clearInterval(upDownInterval)
}

function upAndDownMouseLeaveResponse() {
    isUpAndDownStop = false;
    clearInterval(upDownInterval)
}

function setElementFocus(id){
    document.getElementById(id).focus();
    focusElementId = id;
}
//====================================================================================
//输入延时
//====================================================================================
function gateKeyRightAdjust(isUp){
    currentStep = controlsData.inputData.noisegate;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }
    var editControl = document.getElementById('text_gate'); //门限
    checkCurrentStep(inputTextValueType.NOISE_GATE);
    controlsData.inputData.noisegate = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.NOISE_GATE);
    keepLinkInputGate(curButtonNo, currentStep);
    setElementFocus('text_gate');
}

function millisecondLeftDownAdjust() {
    currentStep = controlsData.inputData.delay;
    secondStep = controlsData.inputData.secondDelay;
    currentStep = currentStep - 1;
    var editControl = document.getElementById('text_delay_millisecond'); //输入延时 毫秒
    checkCurrentStep(inputTextValueType.DELAY_TIME);
    controlsData.inputData.delay = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_inch');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkInputTime(curButtonNo, currentStep, secondStep);
    setElementFocus('text_delay_millisecond');
}

function millisecondLeftUpAdjust() {
    currentStep = controlsData.inputData.delay;
    secondStep = controlsData.inputData.secondDelay;
    currentStep = currentStep + 1;
    var editControl = document.getElementById('text_delay_millisecond');
    checkCurrentStep(inputTextValueType.DELAY_TIME);
    controlsData.inputData.delay = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_inch');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkInputTime(curButtonNo, currentStep, secondStep);
    setElementFocus('text_delay_millisecond');
}

function millisecondRightDownAdjust() {
    currentStep = controlsData.inputData.delay;
    secondStep = controlsData.inputData.secondDelay;
    secondStep = secondStep - 1;
    var editControl = document.getElementById('text_delay_millisecond');
    checkCurrentStep(inputTextValueType.DELAY_SECOND_TIME);
    controlsData.inputData.secondDelay = secondStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_inch');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkInputTime(curButtonNo, currentStep, secondStep);
    setElementFocus('text_delay_millisecond');
}


function millisecondRightUpAdjust() {
    currentStep = controlsData.inputData.delay;
    secondStep = controlsData.inputData.secondDelay;
    secondStep = secondStep + 1;
    var editControl = document.getElementById('text_delay_millisecond');
    checkCurrentStep(inputTextValueType.DELAY_SECOND_TIME);
    controlsData.inputData.secondDelay = secondStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_inch');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkInputTime(curButtonNo, currentStep, secondStep);
    setElementFocus('text_delay_millisecond');
}
//====================================================================================
//输出延时
//====================================================================================
function millisecondOutLeftDownAdjust() {
    currentStep = controlsData.outputData.delay;
    secondStep = controlsData.outputData.secondDelay;
    currentStep = currentStep - 1;
    var editControl = document.getElementById('text_delay_millisecond_out'); //输出延时毫秒
    checkCurrentStep(inputTextValueType.DELAY_TIME);
    controlsData.outputData.delay = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_inch_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkOutDelayTime(curButtonNo, currentStep, secondStep);
    setElementFocus('text_delay_millisecond_out');
}

function millisecondOutLeftUpAdjust() {
    currentStep = controlsData.outputData.delay;
    secondStep = controlsData.outputData.secondDelay;
    currentStep = currentStep + 1;
    var editControl = document.getElementById('text_delay_millisecond_out');
    checkCurrentStep(inputTextValueType.DELAY_TIME);
    controlsData.outputData.delay = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_inch_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkOutDelayTime(curButtonNo, currentStep, secondStep);
    setElementFocus('text_delay_millisecond_out');
}

function millisecondOutRightDownAdjust(ev) {
    currentStep = controlsData.outputData.delay;
    secondStep = controlsData.outputData.secondDelay;
    secondStep = secondStep - 1;
    var editControl = document.getElementById('text_delay_millisecond_out');
    checkCurrentStep(inputTextValueType.DELAY_SECOND_TIME);
    controlsData.outputData.secondDelay = secondStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_inch_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkOutDelayTime(curButtonNo, currentStep, secondStep);
    setElementFocus('text_delay_millisecond_out');
}


function millisecondOutRightUpAdjust() {
    currentStep = controlsData.outputData.delay;
    secondStep = controlsData.outputData.secondDelay;
    secondStep = secondStep + 1;
    var editControl = document.getElementById('text_delay_millisecond_out');
    checkCurrentStep(inputTextValueType.DELAY_SECOND_TIME);
    controlsData.outputData.secondDelay = secondStep;
    editControl.value = getDisplayValue(inputTextValueType.DELAY_TIME);
    editControl = document.getElementById('text_delay_meter_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_METER);
    editControl = document.getElementById('text_delay_inch_out');
    editControl.value = getDisplayValue(inputTextValueType.DELAY_INCH);
    keepLinkOutDelayTime(curButtonNo, currentStep, secondStep);
    setElementFocus('text_delay_millisecond_out');
}


//====================================================================================================================
//eq1
function eq1FrequencyRightAdjust(isUp){
    var editControl = document.getElementById('text_eq1_frequency');
    currentStep = eqData.EQ1.freq;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ1.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq1Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,1);
    DrawLine();
    curEqChannel = 1;
    showOrHideEqData();
    setElementFocus('text_eq1_frequency');
}

function eq1BandwidthRightAdjust(isUp){
    var editControl = document.getElementById('text_eq1_bandwidth');
    currentStep = eqData.EQ1.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq1_bandwidth');
}

function eq1SlopeRightAdjust(isUp){
    var editControl = document.getElementById('text_eq1_slope');
    currentStep = eqData.EQ1.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq1_slope');
}

function eq1GainRightAdjust(isUp){
    var editControl = document.getElementById('text_eq1_gain');
    currentStep = eqData.EQ1.level;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq1_gain');
}
//=====================================================================
//eq2
function eq2FrequencyRightAdjust(isUp){
    var editControl = document.getElementById('text_eq2_frequency');
    currentStep = eqData.EQ2.freq;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ2.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq2Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,2);
    DrawLine();
    curEqChannel = 2;
    showOrHideEqData();
    setElementFocus('text_eq2_frequency');
}

function eq2BandwidthRightAdjust(isUp){
    var editControl = document.getElementById('text_eq2_bandwidth');
    currentStep = eqData.EQ2.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq2_bandwidth');
}

function eq2SlopeRightAdjust(isUp){
    var editControl = document.getElementById('text_eq2_slope');
    currentStep = eqData.EQ2.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq2_slope');
}


function eq2GainRightAdjust(isUp){
    var editControl = document.getElementById('text_eq2_gain');
    currentStep = eqData.EQ2.level;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq2_gain');
}

//=====================================================================
//eq3
function eq3FrequencyRightAdjust(isUp){
    var editControl = document.getElementById('text_eq3_frequency');
    currentStep = eqData.EQ3.freq;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ3.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq3Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,3);
    DrawLine();
    curEqChannel = 3;
    showOrHideEqData();
    setElementFocus('text_eq3_frequency');
}

function eq3BandwidthRightAdjust(isUp){
    var editControl = document.getElementById('text_eq3_bandwidth');
    currentStep = eqData.EQ3.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq3_bandwidth');
}

function eq3SlopeRightAdjust(isUp){
    var editControl = document.getElementById('text_eq3_slope');
    currentStep = eqData.EQ3.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq3_slope');
}


function eq3GainRightAdjust(isUp){
    var editControl = document.getElementById('text_eq3_gain');
    currentStep = eqData.EQ3.level;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq3_gain');
}
//=====================================================================
//eq4
function eq4FrequencyRightAdjust(isUp){
    var editControl = document.getElementById('text_eq4_frequency');
    currentStep = eqData.EQ4.freq;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ4.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq4Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,4);
    DrawLine();
    curEqChannel = 4;
    showOrHideEqData();
    setElementFocus('text_eq4_frequency');
}

function eq4BandwidthRightAdjust(isUp){
    var editControl = document.getElementById('text_eq4_bandwidth');
    currentStep = eqData.EQ4.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq4_bandwidth');
}

function eq4SlopeRightAdjust(isUp){
    var editControl = document.getElementById('text_eq4_slope');
    currentStep = eqData.EQ4.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq4_slope');
}


function eq4GainRightAdjust(isUp){
    var editControl = document.getElementById('text_eq4_gain');
    currentStep = eqData.EQ4.level;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq4_gain');

}
//=====================================================================
//eq5
function eq5FrequencyRightAdjust(isUp){
    var editControl = document.getElementById('text_eq5_frequency');
    currentStep = eqData.EQ5.freq;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ5.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq5Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,5);
    DrawLine();
    curEqChannel = 5;
    showOrHideEqData();
    setElementFocus('text_eq5_frequency');
}

function eq5BandwidthRightAdjust(isUp){
    var editControl = document.getElementById('text_eq5_bandwidth');
    currentStep = eqData.EQ5.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq5_bandwidth');
}

function eq5SlopeRightAdjust(isUp){
    var editControl = document.getElementById('text_eq5_slope');
    currentStep = eqData.EQ5.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq5_slope');
}


function eq5GainRightAdjust(isUp){
    var editControl = document.getElementById('text_eq5_gain');
    currentStep = eqData.EQ5.level;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq5_gain');
}
//=====================================================================
//eq6
function eq6FrequencyRightAdjust(isUp){
    var editControl = document.getElementById('text_eq6_frequency');
    currentStep = eqData.EQ6.freq;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ6.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq6Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,6);
    DrawLine();
    curEqChannel = 6;
    showOrHideEqData();
    setElementFocus('text_eq6_frequency');
}

function eq6BandwidthRightAdjust(isUp){
    var editControl = document.getElementById('text_eq6_bandwidth');
    currentStep = eqData.EQ6.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq6_bandwidth');
}

function eq6SlopeRightAdjust(isUp){
    var editControl = document.getElementById('text_eq6_slope');
    currentStep = eqData.EQ6.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq6_slope');
}


function eq6GainRightAdjust(isUp){
    var editControl = document.getElementById('text_eq6_gain');
    currentStep = eqData.EQ6.level;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_eq6_gain');
}
//====================================================================================================================
function deq1FrequencyRightAdjust(isUp){
    var editControl = document.getElementById('text_deq1_frequency');　// DEQ1频率
    currentStep = controlsData.inputData.InDeq1.req;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.FREQUENCY);
    controlsData.inputData.InDeq1.req = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkInputDeq1Frequency(curButtonNo, currentStep);
    setElementFocus('text_deq1_frequency');
}


function deq1BandwidthRightAdjust(isUp){
    var editControl = document.getElementById('text_deq1_bandwidth'); // DEQ1带宽
    currentStep = controlsData.inputData.InDeq1.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.BANDWIDTH);
    controlsData.inputData.InDeq1.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkInputDeq1Bandwidth(curButtonNo, currentStep);
    setElementFocus('text_deq1_bandwidth');
}


function deq1LevelRightAdjust(isUp){
    var editControl = document.getElementById('text_deq1_level'); // DEQ1目标电平
    currentStep = controlsData.inputData.InDeq1.level;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.DEQ_LEVEL);
    controlsData.inputData.InDeq1.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_LEVEL);
    keepLinkInputDeq1Level(curButtonNo, currentStep);
    updateDeqButton();
    setElementFocus('text_deq1_level');
}


function deq1ThresholdRightAdjust(isUp){
    var editControl = document.getElementById('deq1_threshold'); // DEQ1阈值
    currentStep =  controlsData.inputData.DeqParam1.DEQ_Threshold;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.DEQ_THRESHOLD);
    controlsData.inputData.DeqParam1.DEQ_Threshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_THRESHOLD);
    //console.log(getDisplayValue(inputTextValueType.DEQ_THRESHOLD));
    keepLinkInputDeq1Threshold(curButtonNo, currentStep);
    setElementFocus('deq1_threshold');
}


function deq1RatioRightAdjust(isUp){
    var editControl = document.getElementById('deq1_ratio');// DEQ1比率
    currentStep =  controlsData.inputData.DeqParam1.DEQ_ratio;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    fixRatioCurrentStep(controlsData.inputData.DeqParam1.DEQ_ratio);
    checkCurrentStep(inputTextValueType.EXTENSION_RATION);
    controlsData.inputData.DeqParam1.DEQ_ratio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputDeq1Ratio(curButtonNo, currentStep);
    setElementFocus('deq1_ratio');
}

function deq1AttackRightAdjust(isUp){
    var editControl = document.getElementById('deq1_attack_time');   // DEQ1响应时间
    currentStep =  controlsData.inputData.DeqParam1.DEQ_a;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.DeqParam1.DEQ_a = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputDeq1AttackTime(curButtonNo, currentStep);
    setElementFocus('deq1_attack_time');
}

function deq1ReleaseRightAdjust(isUp){
    var editControl = document.getElementById('deq1_release_time');  // DEQ1释放时间
    currentStep =  controlsData.inputData.DeqParam1.DEQ_r;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.DeqParam1.DEQ_r = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputDeq1ReleaseTime(curButtonNo, currentStep);
    setElementFocus('deq1_release_time');
}

//=========================================================================================
function deq2FrequencyRightAdjust(isUp){
    var editControl = document.getElementById('text_deq2_frequency');  // DEQ2频率
    currentStep = controlsData.inputData.InDeq2.req;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.FREQUENCY);
    controlsData.inputData.InDeq2.req = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkInputDeq2Frequency(curButtonNo, currentStep);
    setElementFocus('text_deq2_frequency');
}


function deq2BandwidthRightAdjust(isUp){
    var editControl = document.getElementById('text_deq2_bandwidth'); // DEQ2带宽
    currentStep = controlsData.inputData.InDeq2.bw;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.BANDWIDTH);
    controlsData.inputData.InDeq2.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkInputDeq2Bandwidth(curButtonNo, currentStep);
    setElementFocus('text_deq2_bandwidth');
}


function deq2LevelRightAdjust(isUp){
    var editControl = document.getElementById('text_deq2_level'); // DEQ2目标电平
    currentStep = controlsData.inputData.InDeq2.level;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.DEQ_LEVEL);
    controlsData.inputData.InDeq2.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_LEVEL);
    keepLinkInputDeq2Level(curButtonNo, currentStep);
    updateDeqButton();
    setElementFocus('text_deq2_level');
}

function deq2ThresholdRightAdjust(isUp){
    var editControl = document.getElementById('deq2_threshold'); // DEQ2阈值
    currentStep =  controlsData.inputData.DeqParam2.DEQ_Threshold;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.DEQ_THRESHOLD);
    controlsData.inputData.DeqParam2.DEQ_Threshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_THRESHOLD);
    keepLinkInputDeq2Threshold(curButtonNo, currentStep);
    setElementFocus('deq2_threshold');
}


function deq2RatioRightAdjust(isUp){
    var editControl = document.getElementById('deq2_ratio'); // DEQ2比率
    currentStep =  controlsData.inputData.DeqParam2.DEQ_ratio;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    fixRatioCurrentStep(controlsData.inputData.DeqParam2.DEQ_ratio);
    checkCurrentStep(inputTextValueType.EXTENSION_RATION);
    controlsData.inputData.DeqParam2.DEQ_ratio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputDeq2Ratio(curButtonNo, currentStep);
    setElementFocus('deq2_ratio');
}

function deq2AttackRightAdjust(isUp){
    var editControl = document.getElementById('deq2_attack_time'); // DEQ2响应时间
    currentStep =  controlsData.inputData.DeqParam2.DEQ_a;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.DeqParam2.DEQ_a = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputDeq2AttackTime(curButtonNo, currentStep);
    setElementFocus('deq2_attack_time');
}

function deq2ReleaseRightAdjust(isUp){
    var editControl = document.getElementById('deq2_release_time'); // DEQ2释放时间
    currentStep =  controlsData.inputData.DeqParam2.DEQ_r;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.DeqParam2.DEQ_r = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputDeq2ReleaseTime(curButtonNo, currentStep);
    setElementFocus('deq2_release_time');
}



//====================================================================================================================
function thresholdRightAdjust(isUp){
    var editControl = document.getElementById('text_threshold'); // 输入自动增益 阈值
    currentStep = controlsData.inputData.agThreshold;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    controlsData.inputData.agThreshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    keepLinkInputThreshold(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
    setElementFocus('text_threshold');
}

function targetLevelRightAdjust(isUp){
    var editControl = document.getElementById('text_target_level');// 输入自动增益 目标电平
    currentStep = controlsData.inputData.agLevel;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.TARGET_LEVEL);
    controlsData.inputData.agLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    keepLinkInputLevel(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
    setElementFocus('text_target_level');
}


function extensionRatioRightAdjust(isUp){
    var editControl = document.getElementById('text_extension_ratio');// 输入自动增益 比率
    currentStep = controlsData.inputData.agRatio;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    fixRatioCurrentStep(controlsData.inputData.agRatio);
    checkCurrentStep(inputTextValueType.EXTENSION_RATION);
    controlsData.inputData.agRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputExtendRatio(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
    setElementFocus('text_extension_ratio');
}


function extensionAttackRightAdjust(isUp){
    var editControl = document.getElementById('text_extension_attack');// 输入自动增益 响应时间
    currentStep = controlsData.inputData.agAttack;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.agAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputExtendAttackTime(curButtonNo, currentStep);
    setElementFocus('text_extension_attack');
}


function extensionReleaseRightAdjust(isUp){
    var editControl = document.getElementById('text_extension_release');// 输入自动增益 释放时间
    currentStep = controlsData.inputData.agRelease;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.agRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputExtendReleaseTime(curButtonNo, currentStep);
    setElementFocus('text_extension_release');
}


function compressorRightAdjust(isUp){
    var editControl = document.getElementById('text_compressor');// 输入 压缩电平
    currentStep = controlsData.inputData.compLevel;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.INPUT_COMPRESS_THRESHOLD);
    controlsData.inputData.compLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_COMPRESS_THRESHOLD);
    //editControl.setAttribute('value',getDisplayValue(inputTextValueType.INPUT_EXTEND_THRESHOLD));
    keepLinkInputCompressLevel(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
    setElementFocus('text_compressor');
}


function compRatioRightAdjust(isUp){
    var editControl = document.getElementById('text_comp_ratio');// 输入 压缩比
    currentStep = controlsData.inputData.compRatio;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    fixRatioCurrentStep(controlsData.inputData.compRatio);
    checkCurrentStep(inputTextValueType.COMPRESS_RATION);
    controlsData.inputData.compRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.COMPRESS_RATION);
    //editControl.setAttribute('value',getDisplayValue(inputTextValueType.COMPRESS_RATION));
    keepLinkInputCompressRatio(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
    setElementFocus('text_comp_ratio');
}


function compAttackRightAdjust(isUp){
    var editControl = document.getElementById('text_comp_attack');// 输入 响应时间
    currentStep = controlsData.inputData.compAttack;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.compAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputCompressAttackTime(curButtonNo, currentStep);
    setElementFocus('text_comp_attack');
}


function compReleaseRightAdjust(isUp){
    var editControl = document.getElementById('text_comp_release'); // 输入 释放时间
    currentStep = controlsData.inputData.compRelease;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.compRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputCompressReleaseTime(curButtonNo, currentStep);
    setElementFocus('text_comp_release');
}

//====================================================================================================================
// 4 input_channel_gain + 8 out_channel_gain
function volumeARightAdjust(isUp){
    var editControl = document.getElementById('text_volume_a'); // 输入A 增益
    currentStep = currentGroupData.dataInputA.gain;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputA.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_A, currentStep);
    //console.log(currentGroupData.dataInputA.gain);
    keepLinkInputVolume(0,currentStep);
    setElementFocus('text_volume_a');
}


function volumeBRightAdjust(isUp){
    var editControl = document.getElementById('text_volume_b'); // 输入 增益
    currentStep = currentGroupData.dataInputB.gain;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputB.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_B, currentStep);
    keepLinkInputVolume(1,currentStep);
    setElementFocus('text_volume_b');
}


function volumeCRightAdjust(isUp){
    var editControl = document.getElementById('text_volume_c'); // 输入C 增益
    currentStep = currentGroupData.dataInputC.gain;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputC.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_C, currentStep);
    keepLinkInputVolume(2,currentStep);
    setElementFocus('text_volume_c');
}


function volumeDRightAdjust(isUp){
    var editControl = document.getElementById('text_volume_d'); // 输入D 增益
    currentStep = currentGroupData.dataInputD.gain;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputD.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_D, currentStep);
    keepLinkInputVolume(3,currentStep);
    setElementFocus('text_volume_d');
}

function volumeOut1RightAdjust(isUp){
    var editControl = document.getElementById('text_volume_out1'); // 输出 1 增益
    currentStep = currentGroupData.dataOut1.gain;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut1.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT1, currentStep);
    keepLinkOutVolume(0,currentStep);
    setElementFocus('text_volume_out1');
}


function volumeOut2RightAdjust(isUp){
    var editControl = document.getElementById('text_volume_out2'); // 输出 2 增益
    currentStep = currentGroupData.dataOut2.gain;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut2.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT2, currentStep);
    keepLinkOutVolume(1,currentStep);
    setElementFocus('text_volume_out2');
}


function volumeOut3RightAdjust(isUp){
    var editControl = document.getElementById('text_volume_out3'); // 输出 3 增益
    currentStep = currentGroupData.dataOut3.gain;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut3.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT3, currentStep);
    keepLinkOutVolume(2,currentStep);
    setElementFocus('text_volume_out3');
}


function volumeOut4RightAdjust(isUp){
    var editControl = document.getElementById('text_volume_out4'); // 输出 4 增益
    currentStep = currentGroupData.dataOut4.gain;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut4.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT4, currentStep);
    keepLinkOutVolume(3,currentStep);
    setElementFocus('text_volume_out4');
}


function volumeOut5RightAdjust(isUp){
    var editControl = document.getElementById('text_volume_out5'); // 输出 5 增益
    currentStep = currentGroupData.dataOut5.gain;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut5.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT5, currentStep);
    keepLinkOutVolume(4,currentStep);
    setElementFocus('text_volume_out5');
}


function volumeOut6RightAdjust(isUp){
    var editControl = document.getElementById('text_volume_out6'); // 输出 6 增益
    currentStep = currentGroupData.dataOut6.gain;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut6.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT6, currentStep);
    keepLinkOutVolume(5,currentStep);
    setElementFocus('text_volume_out6');
}


function volumeOut7RightAdjust(isUp){
    var editControl = document.getElementById('text_volume_out7'); // 输出 7 增益
    currentStep = currentGroupData.dataOut7.gain;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut7.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT7, currentStep);
    keepLinkOutVolume(6,currentStep);
    setElementFocus('text_volume_out7');
}

function volumeOut8RightAdjust(isUp){
    var editControl = document.getElementById('text_volume_out8'); // 输出 8 增益
    currentStep = currentGroupData.dataOut8.gain;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut8.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT8, currentStep);
    keepLinkOutVolume(7,currentStep);
    setElementFocus('text_volume_out8');
}

function gainRightAdjust(isUp){
    var editControl = document.getElementById('text_gain');//总 增益
    currentStep = getChannelGain(curButtonNo);
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    setChannelGain(curButtonNo,currentStep);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setGainSliderPosition(currentStep);
    keepShortGainInStep(currentStep);
    setElementFocus('text_gain');
}
//======================================================================================================================
//输出压缩限幅
function outThresholdCompressRightAdjust(isUp){
    var editControl = document.getElementById('text_threshold_compress_out'); //输出压缩电平
    currentStep = controlsData.outputData.compLevel;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
    controlsData.outputData.compLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
    keepLinkOutThresholdCompress(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
    setElementFocus('text_threshold_compress_out');
}



function outRatioCompressRightAdjust(isUp){
    var editControl = document.getElementById('text_ratio_compress_out'); //输出压缩比
    currentStep = controlsData.outputData.compRatio;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }
    fixRatioCurrentStep(controlsData.outputData.compRatio);
    checkCurrentStep(inputTextValueType.COMPRESS_RATION);
    controlsData.outputData.compRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.COMPRESS_RATION);
    keepLinkOutRatioCompress(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
    setElementFocus('text_ratio_compress_out');
}


function outAttackCompressRightAdjust(isUp){
    var editControl = document.getElementById('text_attack_compress_out'); //输出压缩响应时间
    currentStep = controlsData.outputData.compAttack;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.outputData.compAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkOutAttackCompress(curButtonNo, currentStep);
    setElementFocus('text_attack_compress_out');
}


function outReleaseCompressRightAdjust(isUp){
    var editControl = document.getElementById('text_release_compress_out'); //输出压缩释放时间
    currentStep = controlsData.outputData.compR;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.outputData.compR = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkOutReleaseCompress(curButtonNo, currentStep);
    setElementFocus('text_release_compress_out');
}

function outThresholdLimitRightAdjust(isUp){
    var editControl = document.getElementById('text_threshold_limit_out');  //输出限幅电平
    currentStep = controlsData.outputData.limT;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.OUTPUT_LIMITER_THRESHOLD);
    controlsData.outputData.limT = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.OUTPUT_LIMITER_THRESHOLD);
    keepLinkOutThresholdLimit(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
    setElementFocus('text_threshold_limit_out');
}


function outAttackLimitRightAdjust(isUp){
    var editControl = document.getElementById('text_attack_limit_out');  //输出限幅响应时间
    currentStep = controlsData.outputData.limAttack;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.outputData.limAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkOutAttackLimit(curButtonNo, currentStep);
    setElementFocus('text_attack_limit_out');
}

function outReleaseLimitRightAdjust(isUp){
    var editControl = document.getElementById('text_release_limit_out');  //输出限幅释放时间
    currentStep = controlsData.outputData.limRelease;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
    }

    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.outputData.limRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkOutReleaseLimit(curButtonNo, currentStep);
    setElementFocus('text_release_limit_out');
}




//======================================================================================================================
//分频
function hpfFrequencyRightAdjust(isUp){
    var editControl = document.getElementById('text_hpf_frequency'); //分频 高通
    currentStep = controlsData.outputData.HPFData.HL_freq;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_hpf_frequency');
}

function lpfFrequencyRightAdjust(isUp){
    var editControl = document.getElementById('text_lpf_frequency'); //分频 低通
    currentStep = controlsData.outputData.LPFData.HL_freq;
    if ( isUp ) {
        currentStep = currentStep + 1;
    }
    else {
        currentStep = currentStep - 1;
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
    setElementFocus('text_lpf_frequency');
}

