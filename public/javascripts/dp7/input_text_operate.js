

//======================================================================================================
function fixRatioCurrentStep(curValue){
    if(currentStep>11){
        if(currentStep > curValue){
            currentStep = currentStep + 4;
        }else{
            currentStep = currentStep - 4;
        }

        if((currentStep-11)%5){
            // console.log('ratio wrong ratio_currentStep: ' + currentStep );
            currentStep = 11 + Math.round((currentStep - 11)/5)*5;
        }
    }


}


function checkCurrentStep(type){
    var stepsMax, stepsMin = 0;
    switch (type){
        case inputTextValueType.NOISE_GATE:
            stepsMax = constConfig.NOISE_GATE_STEPS_MAX;
            break;
        case inputTextValueType.DELAY_TIME:
            stepsMax = constConfig.DELAY_TIME_STEPS_MAX;
            if(currentStep >= constConfig.DELAY_TIME_STEPS_MAX) {
                secondStep = 0;
            }
            break;
        case inputTextValueType.DELAY_SECOND_TIME:
            stepsMax = constConfig.DELAY_SECOND_TIME_STEPS_MAX;
            if(currentStep >= constConfig.DELAY_TIME_STEPS_MAX) {
                currentStep = constConfig.DELAY_TIME_STEPS_MAX;
                secondStep = 0;
            } else if( (stepsMin <= secondStep) && (secondStep <= stepsMax)){
                return 0;
            }else if(secondStep < stepsMin){
                secondStep = stepsMin;
            } else if(secondStep > stepsMax){
                secondStep = stepsMax;
            }
            return;
        case inputTextValueType.COMPRESS_RATION:
            stepsMax = constConfig.EXTENSION_RATIO_STEPS_MAX;
            stepsMin = 1;
            break;
        case inputTextValueType.EXTENSION_RATION:
            stepsMax = constConfig.EXTENSION_RATIO_STEPS_MAX;
            stepsMin = 1;
            break;
        case inputTextValueType.FREQUENCY:
            stepsMax = constConfig.FREQUENCY_STEPS_MAX;
            break;
        case inputTextValueType.BANDWIDTH:
            stepsMax = constConfig.BANDWIDTH_STEPS_MAX;
            break;
        case inputTextValueType.SLOPE:
            stepsMax = constConfig.SLOPE_STEPS_MAX;
            break;
        case inputTextValueType.EQ_GAIN:
            stepsMax = constConfig.EQ_GAIN_STEPS_MAX;
            break;
        case inputTextValueType.CHANNEL_GAIN:
            stepsMax = constConfig.CHANNEL_GAIN_STEPS_MAX;
            break;
        case inputTextValueType.ATTACK_TIME:
            stepsMax = constConfig.ATTACK_TIME_STEPS_MAX;
            break;
        case inputTextValueType.RELEASE_TIME:
            stepsMax = constConfig.RELEASE_TIME_STEPS_MAX;
            break;
        case inputTextValueType.INPUT_EXTEND_THRESHOLD: // 自动增益 阈值
            stepsMax = controlsData.inputData.agLevel;
            break;
        case inputTextValueType.TARGET_LEVEL: // 自动增益  目标电平
            stepsMin = controlsData.inputData.agThreshold;
            stepsMax = controlsData.inputData.compLevel +Middle_Comp_Level;
            break;
        case inputTextValueType.INPUT_COMPRESS_THRESHOLD: // 输入 压缩电平
            stepsMin = controlsData.inputData.agLevel - Middle_Comp_Level;
            console.log('stepMin: ' + stepsMin);
            if (stepsMin <= 0) {
                stepsMin = 0;
            }
            stepsMax = constConfig.INPUT_COMPRESS_THRESHOLD_STEPS_MAX;
            break;
        case inputTextValueType.OUTPUT_COMPRESS_THRESHOLD: // 输出 压缩电平
            stepsMax = controlsData.outputData.limT;
            break;
        case inputTextValueType.OUTPUT_LIMITER_THRESHOLD:  // 输出 限幅电平
            stepsMin = controlsData.outputData.compLevel;
            stepsMax = constConfig.OUTPUT_COMPRESS_THRESHOLD_STEPS_MAX;
            console.log('stepMax: ' + stepsMax);
            break;
        case inputTextValueType.DEQ_LEVEL:
            stepsMax = constConfig.DEQ_LEVEL_STEPS_MAX;
            break;
        case inputTextValueType.DEQ_THRESHOLD:
            stepsMax = constConfig.DEQ_LEVEL_STEPS_MAX;
        default:
            break;
    }

    // stepsMin = 0    so the real value numbers = stepsMax + 1;
    if( (stepsMin <= currentStep) && (currentStep <= stepsMax)){
        return 0;
    }else if(currentStep < stepsMin){
        currentStep = stepsMin;
    } else if(currentStep > stepsMax){
        currentStep = stepsMax;
    }
}


//==============================================================================================================
function getDisplayValue(type){
    var value;
    switch (type){
        case inputTextValueType.NOISE_GATE:
            value = getNoiseGate();
            break;
        case inputTextValueType.DELAY_TIME:
            value = getDelayTime();
            break;
        case inputTextValueType.DELAY_METER:
            value = getDelayMeter();
            break;
        case inputTextValueType.DELAY_INCH:
            value = getDelayInch();
            break;
        case inputTextValueType.EXTENSION_RATION:
            value = getExtensionRation();
            break;
        case inputTextValueType.COMPRESS_RATION:
            value = getCompressRation();
            break;
        case inputTextValueType.FREQUENCY:
            value = getFrequency();
            break;
        case inputTextValueType.BANDWIDTH:
            value = getBandwidth();
            break;
        case inputTextValueType.SLOPE:
            value = getSlope();
            break;
        case inputTextValueType.EQ_GAIN:
            value = getEqGain();
            break;
        case inputTextValueType.CHANNEL_GAIN:
            value = getChanelGain();
            break;
        case inputTextValueType.ATTACK_TIME:
            value = getAttackTime();
            break;
        case inputTextValueType.RELEASE_TIME:
            value = getReleaseTime();
            break;
        case inputTextValueType.INPUT_EXTEND_THRESHOLD:
            value = getInputThreshold();
            break;
        case inputTextValueType.TARGET_LEVEL:
            value = getInputTargetLevel();
            break;
        case inputTextValueType.INPUT_COMPRESS_THRESHOLD:
            value = getInputCompressThreshold();
            break;
        case inputTextValueType.OUTPUT_COMPRESS_THRESHOLD: //输出压缩电平
            value = getOutputThreshold();
            break;
        case inputTextValueType.OUTPUT_LIMITER_THRESHOLD: //输出限幅电平
            value = getOutputLimiterThreshold();
            break;
        case inputTextValueType.DEQ_LEVEL:  //DEQ 目标电平
            value = getDeqLevel();
            break;
        case inputTextValueType.DEQ_THRESHOLD:
            value = getDeqThreshold();
            break;
        default:
            value  = 0;
            break;
    }
    return value;
}

/*
* noiseGate
* range: [-120, 0]  step_value: 1    value for send: 0-120;
* */
function getNoiseGate(){
    var value;
    value = currentStep*constConfig.NOISE_GATE_STEP_VALUE + constConfig.NOISE_GATE_VALUE_MIN;
    if (value === -120){
        value = 'OFF';
    }
    return value;
}

function getNoiseGateDisplay(step){
    var value;
    value = step*constConfig.NOISE_GATE_STEP_VALUE + constConfig.NOISE_GATE_VALUE_MIN;
    if (value === -120){
        value = 'OFF';
    }
    return value;
}
/*
* delay time display
* have two ranges
*range 1：0~10.000ms  stepValue: 0.0208  value for send: 0~480
*range 2：10~1000     stepValue: 1       value for send: 481~1470
* */
function getDelayTime(){
    var time;
    time = Number(currentStep + fine_delay[secondStep]).toFixed(3);
    // console.log('secondStep' + secondStep );
    return time;
}

function getDelayTimeDisplay(step,second_step){
    var time;
    time = Number(step + fine_delay[second_step]).toFixed(3);
    return time;
}
/*
* delay meter
* */
function getDelayMeter()
{
    var value;
    value = Number((331.0 / 1000.0) * (currentStep + fine_delay[secondStep])).toFixed(4);
    return value;
}

function getDelayMeterDisplay(step, second_step)
{
    var value;
    value = Number((331.0 / 1000.0) * (step + fine_delay[second_step])).toFixed(4);
    return value;
}
/*
* delay inch
* LF
* */
function getDelayInch() {
    var value;
    value = Number(((331.0 / 1000.0) * (currentStep + fine_delay[secondStep])*3.281)).toFixed(4);
    return value;
}

function getDelayInchDisplay(step, second_step) {
    var value;
    value = Number(((331.0 / 1000.0) * (step + fine_delay[second_step])*3.281)).toFixed(4);
    return value;
}
/*
*input AGC extension ratio 1:1.0 -- 1:20.0(close)
* tow ranges
* first range: [1.0, 2.0]      step_value = 0.1    value for send: 0-10
* second range: [2.0, 20.0]    step_value = 1      value for send: 11-46
* */
function getExtensionRation(){
    if(currentStep > constConfig.EXTENSION_RATIO_STEPS_MAX){
        currentStep = constConfig.EXTENSION_RATIO_STEPS_MAX;
    }
    var value,i,j;
    if(currentStep === 1) {
        value = "1:1.0";
    }
    else if(currentStep <= 10){
        j = 1.0 + (currentStep-1)*0.1;
        j = j.toFixed(1);
        value = '1:' + j;
    }else{
        i = 2 + (currentStep-11)*0.1;
        i = i.toFixed(1);
        value = '1:' + i;
    }
    return value;
}


function getExtensionRationDisplay(step){
    if(step > constConfig.EXTENSION_RATIO_STEPS_MAX){
        step = constConfig.EXTENSION_RATIO_STEPS_MAX;
    }
    var value,i,j;
    if(step <= 1) {
        value = "1:1.0";
    } else if(step <= 10){
        j = 1.0 + (step-1)*0.1;
        j = j.toFixed(1);
        value = '1:' + j;
    } else {
        i = 2 + (step-11)*0.1;
        i = i.toFixed(1);
        value = '1:' + i;
    }
    return value;
}

function getExtensionRationDisplayForReport(step){
    if(step > constConfig.EXTENSION_RATIO_STEPS_MAX){
        step = constConfig.EXTENSION_RATIO_STEPS_MAX;
    }
    var value,i,j;
    if(step <= 1) {
        value = "1.0:1.0";
    } else if(step <= 10){
        j = 1.0 + (step-1)*0.1;
        j = j.toFixed(1);
        value = '1.0:' + j;
    } else {
        i = 2 + (step-11)*0.1;
        i = i.toFixed(1);
        value = '1.0:' + i;
    }
    return value;
}


function getExtensionRatioStep(num) {
    if(isNaN(num)){
        return;
    }
    var step;
    /* 这个值很特殊，区域是[1,191] 但 [11,191]间只取部分值，如下解释
     区域[1,10]
     value: 1.0  1.1  1.2  1.3  1.4  1.5  1.6  1.7  1.8  1.9
     step :  1    2    3    4    5    6    7    8    9    10

     区域[11,191]
     value: 2.0  2.1  2.2  2.3  2.4  2.5  2.6  2.7  2.8  2.9      只取 2.0   2.5
     step:   11   12   13   14   15   16   17   18   19   20   对应只取  11   16
     value: 3.0  3.1  3.2  3.3  3.4  3.5  3.6  3.7  3.8  3.9      只取 3.0   3.5
     step:   21   22   23  24    25   26   27   28   29   30   对应只取 21    26
     取的值都是减去11后5的倍数，包括0和1
    */
    if( num > constConfig.EXTENSION_RATIO_VALUE_MAX) {
        step = constConfig.EXTENSION_RATIO_STEPS_MAX;
    } else if( num < constConfig.EXTENSION_RATIO_VALUE_MIN) {
        step = 1; // start from 1 not 0
    } else if (num < constConfig.EXTENSION_RATIO_RANGE_FIRST_MAX) {
        step = num * 10 - 9;
    } else {
        step = num * 10 - 9;
    }
    if(step > 11) {
        step = 11 + Math.round((step - 11)/5)*5
    }
    Math.round(step);
    // console.log('step: ' + step);
    return step;
}
/*
*input AGC extension ratio 1:1.0 -- 1:20.0(close)
* tow ranges
* first range: [1.0, 2.0]      step_value = 0.1    value for send: 0-10
* second range: [2.0, 20.0]    step_value = 1      value for send: 11-46
* */
function getCompressRation(){
    var value,i,j;
    if(currentStep > constConfig.EXTENSION_RATIO_STEPS_MAX){
        currentStep = constConfig.EXTENSION_RATIO_STEPS_MAX;
    }
    if(currentStep <= 1) {
        value = "1.0:1";
    }
    else if(currentStep <= 10){
        j = 1.0 + (currentStep-1)*0.1;
        j = j.toFixed(1);
        value = j + ':1';
    }else{
        i = 2 + (currentStep-11)*0.1;
        i = i.toFixed(1);
        value = i + ':1';
    }
    return value;
}


function getCompressRationDisplay(step){
    if(step > constConfig.EXTENSION_RATIO_STEPS_MAX){
        currentStep = constConfig.EXTENSION_RATIO_STEPS_MAX;
    }
    var value,i,j;
    if(step < 1) {
        value = "1.0:1";
    }
    else if(step <= 10){
        j = 1.0 + (step-1)*0.1;
        j = j.toFixed(1);
        value = j + ':1';
    }else{
        i = 2 + (step-11)*0.1;
        i = i.toFixed(1);
        value = i + ':1';
    }
    return value;
}
/*
*frequency
* Frequency[417]
* */
function getFrequency()
{
    var value = frequency[currentStep];
    if(currentStep <= 56) {
        value = value.toFixed(1);
    }else {
        value = parseInt(value); //remove non digits
    }
    return value;
}


function getFrequencyDisplay(step)
{
    var value = frequency[step];
//    console.log('value:' + value);
    if(step <= 56) {
        value = value.toFixed(1);
    }else {
        value = parseInt(value); //remove non digits
    }
    return value;
}


function getFrequencyStep(num) {
    var step = 0;
    if(num > constConfig.FREQUENCY_VALUE_MAX){
        step = constConfig.FREQUENCY_STEPS_MAX;
    } else if(num < constConfig.FREQUENCY_VALUE_MIN){
        step = 0;
    }else{
        step = binarySearch(frequency, num);
    }
    return step;
}
/*
* bandwidth
* range [0.05, 3.00]  value for send: 0-295
* step_value 0.1
* */
function getBandwidth()
{
    var value;
    value = (currentStep)*constConfig.BANDWIDTH_STEP_VALUE+0.05;
    value = value.toFixed(2);
    return value;
}

function getBandwidthDisplay(step)
{
    var value;
    value = (step)*constConfig.BANDWIDTH_STEP_VALUE+0.05;
    value = value.toFixed(2);
    return value;
}

function getBandwidthStep(num) {
    var step =0;
    if(num > constConfig.BANDWIDTH_VALUE_MAX){
        step = constConfig.BANDWIDTH_STEPS_MAX;
    } else if(num < constConfig.BANDWIDTH_VALUE_MIN){
        step = 0;
    } else{
        step = parseInt((num - constConfig.BANDWIDTH_VALUE_MIN) / constConfig.BANDWIDTH_STEP_VALUE);
    }
    return step;
}
/*
* slope
* range SLOPE_ARRAY[296]
* */
function getSlope()
{
    var value;
    value = SLOPE_ARRAY[currentStep];
    value = value.toFixed(3);
    return value;
}

function getSlopeDisplay(step)
{
    var value;
    value = SLOPE_ARRAY[step];
    value = value.toFixed(3);
    return value;
}

function getSlopeStep(num) {
    var step;
    if(num > constConfig.SLOPE_VALUE_MAX){
        step = constConfig.SLOPE_STEPS_MAX;
    } else if(num < constConfig.SLOPE_VALUE_MIN){
        step = 0;
    }else{
        step = binarySearchReverse(SLOPE_ARRAY, num);
    }
    return step;
}
/*
*eq_gain
* range [-20, 20]  value for send: 0-400
* step_value: 0.1
* */
function getEqGain(){
    var value;
    value = currentStep*constConfig.EQ_GAIN_STEP_VALUE - 20;
    value = value.toFixed(1);
    return value;
}

function getEqGainDisplay(step){
    var value;
    value = step*constConfig.EQ_GAIN_STEP_VALUE - 20;
    value = value.toFixed(1);
    return value;
}

function getEqGainStep(num) {
    var step=0;
    if(num > constConfig.EQ_GAIN_VALUE_MAX){
        step = constConfig.EQ_GAIN_STEPS_MAX;
    } else if(num < constConfig.EQ_GAIN_VALUE_MIN){
        step = 0;
    } else{
        step = parseInt((num - constConfig.EQ_GAIN_VALUE_MIN) / constConfig.EQ_GAIN_STEP_VALUE);
    }
    return step;
}
/*
*chanel_gain
* range [-80, 12]  value for send: 0-920
* step_value: 0.1
* */
function getChanelGain(){
    var value;
    value = currentStep*constConfig.CHANNEL_GAIN_STEP_VALUE + constConfig.CHANNEL_GAIN_VALUE_MIN;
    value = value.toFixed(1);
    return value;
}

function getChanelGainDisplay(step){
    var value;
    value = step*constConfig.CHANNEL_GAIN_STEP_VALUE + constConfig.CHANNEL_GAIN_VALUE_MIN;
    value = value.toFixed(1);
    return value;
}
/*
* attack time
* range [0.3, 200]   two ranges
* first range:  [0.3, 1]  0.1      7 steps
* second range: [2, 200]  1         199 steps   sum: 206 steps
* */
function getAttackTime(){
    var value;
    if (currentStep <= constConfig.ATTACK_TIME_RANGE_FIRST_STEPS ) {
        if (currentStep === constConfig.ATTACK_TIME_RANGE_FIRST_STEPS){
            value = 1;
        }else{
            value =  constConfig.ATTACK_TIME_STEP_VALUE1*currentStep +  constConfig.ATTACK_TIME_START_VALUE;
            value = value.toFixed(1);
        }
    }else{
        value = currentStep - 6;
    }

    return value;
}

function getAttackTimeDisplay(step){
    var value;
    if (step <= constConfig.ATTACK_TIME_RANGE_FIRST_STEPS ) {
        if (step === constConfig.ATTACK_TIME_RANGE_FIRST_STEPS){
            value = 1;
        }else{
            value =  constConfig.ATTACK_TIME_STEP_VALUE1 +  constConfig.ATTACK_TIME_START_VALUE;
            value = value.toFixed(1);
        }
    }else{
        value = step - 6;
    }

    return value;
}
/*
* release time
* range [50, 5000]   value for send  0-4950
* */
function getReleaseTime(){
    var value;
    value = currentStep + 50;
    return value;
}

function getReleaseTimeDisplay(step){
    var value;
    value = step + 50;
    return value;
}
/*
* input threshold(extend_threshold same to input target_level compress_threshold)
*  extend_threshold <= target level <=  compress_threshold
*  range [-80.0, 20.0]  step_value:0.1  value for send: 0-1000
* */
function getInputThreshold(){
    var value;
    value = currentStep * constConfig.INPUT_EXTEND_THRESHOLD_STEP_VALUE - 80;
    if(value === -80) {
        value = 'OFF';
    } else {
        value = value.toFixed(1);
    }
    return value;
}

function getInputThresholdDisplay(step){
    var value;
    value = step * constConfig.INPUT_EXTEND_THRESHOLD_STEP_VALUE - 80;
    if(value === -80) {
        value = 'OFF';
    } else {
        value = value.toFixed(1);
    }
    return value;
}

function getInputThresholdStep(num) {
    var step;
    step = (num + 80) / constConfig.INPUT_EXTEND_THRESHOLD_STEP_VALUE;
    return step;
}
/*
* input target level(extend_threshold same to input target_level compress_threshold)
*  extend_threshold <= target level <=  compress_threshold
*  range [-80.0, 20.0]  step_value:0.1  value for send: 0-1000
* */
function getInputTargetLevel(){
    var value;
    value = currentStep*constConfig.INPUT_EXTEND_TARGET_LEVEL_STEP_VALUE - 80;
    value = value.toFixed(1);
    return value;
}

function getInputTargetLevelDisplay(step){
    var value;
    value = step*constConfig.INPUT_EXTEND_TARGET_LEVEL_STEP_VALUE - 80;
    value = value.toFixed(1);
    return value;
}

function getInputTargetLevelStep(num) {
    var step;
    step = (num + 80) / constConfig.INPUT_EXTEND_TARGET_LEVEL_STEP_VALUE;
    return step;
}
/*
* input compress threshold(extend_threshold same to input target_level compress_threshold)
*  extend_threshold <= target level <=  compress_threshold
*  range [-80.0, 20.0]  step_value:0.1  value for send: 0-1000
* */
function getInputCompressThreshold(){
    var value;
    value = currentStep*constConfig.INPUT_COMPRESS_THRESHOLD_STEP_VALUE - 40;
    if (value === 20){
        value = 'OFF';
    } else {
        value = value.toFixed(1);
    }
    return value;
}

function getInputCompressThresholdDisplay(step){
    var value;
    value = step*constConfig.INPUT_COMPRESS_THRESHOLD_STEP_VALUE - 40;
    if (value === 20){
        value = 'OFF';
    } else {
        value = value.toFixed(1);
    }
    return value;
}

function getInputCompressThresholdStep(num) {
    var step;
    step = (num - 80) / constConfig.INPUT_COMPRESS_THRESHOLD_STEP_VALUE;
    return step;
}
/*
* output threshold(compress_threshold same to output_limiter)
*  compress_threshold <= output_limiter
*  range [-40.0, 20.0]  step_value:0.1  value for send: 0-500
* */
function getOutputThreshold(){
    var value;
    value = currentStep*constConfig.OUTPUT_COMPRESS_THRESHOLD_STEP_VALUE - 40;
    if (value === 20){
        value = 'OFF';
    } else {
        value = value.toFixed(1);
    }
    return value;
}

function getOutputThresholdDisplay(step){
    var value;
    value = step*constConfig.OUTPUT_COMPRESS_THRESHOLD_STEP_VALUE - 40;
    value = value.toFixed(1);
    return value;
}
/*
* output threshold(compress_threshold same to output_limiter)
*  compress_threshold <= output_limiter
*  range [-40.0, 20.0]  step_value:0.1  value for send: 0-500
* */
function getOutputLimiterThreshold(){
    var value;
    value = currentStep*constConfig.OUTPUT_LIMITER_THRESHOLD_STEP_VALUE - 40;
    if (value === 20){
        value = 'OFF';
    } else {
        value = value.toFixed(1);
    }
    return value;
}

function getOutputLimiterThresholdDisplay(step){
    var value;
    value = step*constConfig.OUTPUT_LIMITER_THRESHOLD_STEP_VALUE - 40;
    if (value === 20){
        value = 'OFF';
    } else {
        value = value.toFixed(1);
    }
    return value;
}
/*
* output threshold(compress_threshold same to output_limiter)
*  compress_threshold <= output_limiter
*  range [-30.0, 20.0]  step_value:0.1  value for send: 0-500
* */
function getDeqLevel(){
    var value;
    value = currentStep*constConfig.DEQ_LEVEL_STEP_VALUE + constConfig.DEQ_LEVEL_MIN;
    if(value === -45){
        value = 'OFF';
    }else{
        value = value.toFixed(1);
    }

    return value;
}

function getDeqLevelDisplay(step){
    var value;
    value = step*constConfig.DEQ_LEVEL_STEP_VALUE + constConfig.DEQ_LEVEL_MIN;
    if(value === -45){
        value = 'OFF';
    }else{
        value = value.toFixed(1);
    }

    return value;
}


function getDeqThreshold(){
    var value;
    value = currentStep*constConfig.DEQ_LEVEL_STEP_VALUE + constConfig.DEQ_LEVEL_MIN;

    value = value.toFixed(1);


    return value;
}

function getDeqThresholdDisplay(step){
    var value;
    value = step*constConfig.DEQ_LEVEL_STEP_VALUE + constConfig.DEQ_LEVEL_MIN;
    value = value.toFixed(1);

    return value;
}
//=======================================================