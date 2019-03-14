



function addInputTextKeyUpListener(){
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
        addTextKeyUpEvent(editControlID[i]);
    }

    for(var t in eqEditControlID){
        addTextKeyUpEvent(eqEditControlID[t]);
    }

    for(var n in deqEditControlID){
        addTextKeyUpEvent(deqEditControlID[n]);
    }

    for(var c in agcEditControlID){
        addTextKeyUpEvent(agcEditControlID[c]);
    }

    for(var b in gainEditControlID){
        addTextKeyUpEvent(gainEditControlID[b]);
    }

    // addOutTextKeyUpEvent();
    var editControl = document.getElementById("text_delay_millisecond_out");
    editControl.addEventListener('keyup', fireOnChange);

    editControl = document.getElementById("text_delay_meter_out");
    editControl.addEventListener('keyup', fireOnChange);

    editControl = document.getElementById("text_delay_inch_out");
    editControl.addEventListener('keyup', fireOnChange);

    editControl = document.getElementById("text_hpf_frequency");
    editControl.addEventListener('keyup', fireOnChange);

    editControl = document.getElementById("text_lpf_frequency");
    editControl.addEventListener('keyup', fireOnChange);

    editControl = document.getElementById("text_threshold_compress_out");
    editControl.addEventListener('keyup', fireOnChange);

    editControl = document.getElementById("text_ratio_compress_out");
    editControl.addEventListener('keyup', fireOnChange);

    editControl = document.getElementById("text_attack_compress_out");
    editControl.addEventListener('keyup', fireOnChange);

    editControl = document.getElementById("text_release_compress_out");
    editControl.addEventListener('keyup', fireOnChange);

    editControl = document.getElementById("text_threshold_limit_out");
    editControl.addEventListener('keyup', fireOnChange);

    editControl = document.getElementById("text_attack_limit_out");
    editControl.addEventListener('keyup', fireOnChange);

    editControl = document.getElementById("text_release_limit_out");
    editControl.addEventListener('keyup', fireOnChange);
}

function addTextKeyUpEvent(id) {
    var fn;
    var inputTextId;
    switch (id){
        case controlsId.TEXT_GATE:
            fn = gateKeyUpRespond;
            inputTextId = 'text_gate';
            break;
        case controlsId.TEXT_DELAY_MILLISECOND:
            fn = delayTimeKeyUpRespond;
            inputTextId = 'text_delay_millisecond';
            break;
        case controlsId.TEXT_DELAY_METER:
            fn = delayMeterKeyUpRespond;
            inputTextId = 'text_delay_meter';
            break;
        case controlsId.TEXT_DELAY_INCH:
            fn = delayInchKeyUpRespond;
            inputTextId = 'text_delay_inch';
            break;
        //===================================================
        case controlsId.TEXT_EQ1_FREQUENCY:
            fn = eq1FrequencyKeyUpRespond;
            inputTextId = 'text_eq1_frequency';
            break;
        case controlsId.TEXT_EQ1_BANDWIDTH:
            fn = eq1BandwidthKeyUpRespond;
            inputTextId = 'text_eq1_bandwidth';
            break;
        case controlsId.TEXT_EQ1_SLOPE:
            fn = eq1SlopeKeyUpRespond;
            inputTextId = 'text_eq1_slope';
            break;
        case controlsId.TEXT_EQ1_GAIN:
            fn = eq1GainKeyUpRespond;
            inputTextId = 'text_eq1_gain';
            break;
        //==================
        case controlsId.TEXT_EQ2_FREQUENCY:
            fn = eq2FrequencyKeyUpRespond;
            inputTextId = 'text_eq2_frequency';
            break;
        case controlsId.TEXT_EQ2_BANDWIDTH:
            fn = eq2BandwidthKeyUpRespond;
            inputTextId = 'text_eq2_bandwidth';
            break;
        case controlsId.TEXT_EQ2_SLOPE:
            fn = eq2SlopeKeyUpRespond;
            inputTextId = 'text_eq2_slope';
            break;
        case controlsId.TEXT_EQ2_GAIN:
            fn = eq2GainKeyUpRespond;
            inputTextId = 'text_eq2_gain';
            break;
        //==================
        case controlsId.TEXT_EQ3_FREQUENCY:
            fn = eq3FrequencyKeyUpRespond;
            inputTextId = 'text_eq3_frequency';
            break;
        case controlsId.TEXT_EQ3_BANDWIDTH:
            fn = eq3BandwidthKeyUpRespond;
            inputTextId = 'text_eq3_bandwidth';
            break;
        case controlsId.TEXT_EQ3_SLOPE:
            fn = eq3SlopeKeyUpRespond;
            inputTextId = 'text_eq3_slope';
            break;
        case controlsId.TEXT_EQ3_GAIN:
            fn = eq3GainKeyUpRespond;
            inputTextId = 'text_eq3_gain';
            break;
        //==================
        case controlsId.TEXT_EQ4_FREQUENCY:
            fn = eq4FrequencyKeyUpRespond;
            inputTextId = 'text_eq4_frequency';
            break;
        case controlsId.TEXT_EQ4_BANDWIDTH:
            fn = eq4BandwidthKeyUpRespond;
            inputTextId = 'text_eq4_bandwidth';
            break;
        case controlsId.TEXT_EQ4_SLOPE:
            fn = eq4SlopeKeyUpRespond;
            inputTextId = 'text_eq4_slope';
            break;
        case controlsId.TEXT_EQ4_GAIN:
            fn = eq4GainKeyUpRespond;
            inputTextId = 'text_eq4_gain';
            break;
        //==================
        case controlsId.TEXT_EQ5_FREQUENCY:
            fn = eq5FrequencyKeyUpRespond;
            inputTextId = 'text_eq5_frequency';
            break;
        case controlsId.TEXT_EQ5_BANDWIDTH:
            fn = eq5BandwidthKeyUpRespond;
            inputTextId = 'text_eq5_bandwidth';
            break;
        case controlsId.TEXT_EQ5_SLOPE:
            fn = eq5SlopeKeyUpRespond;
            inputTextId = 'text_eq5_slope';
            break;
        case controlsId.TEXT_EQ5_GAIN:
            fn = eq5GainKeyUpRespond;
            inputTextId = 'text_eq5_gain';
            break;
        //==================
        case controlsId.TEXT_EQ6_FREQUENCY:
            fn = eq6FrequencyKeyUpRespond;
            inputTextId = 'text_eq6_frequency';
            break;
        case controlsId.TEXT_EQ6_BANDWIDTH:
            fn = eq6BandwidthKeyUpRespond;
            inputTextId = 'text_eq6_bandwidth';
            break;
        case controlsId.TEXT_EQ6_SLOPE:
            fn = eq6SlopeKeyUpRespond;
            inputTextId = 'text_eq6_slope';
            break;
        case controlsId.TEXT_EQ6_GAIN:
            fn = eq6GainKeyUpRespond;
            inputTextId = 'text_eq6_gain';
            break;
        //===================================================
        case controlsId.TEXT_DEQ1_FREQUENCY:
            fn = deq1FrequencyKeyUpRespond;
            inputTextId = 'text_deq1_frequency';
            break;
        case controlsId.TEXT_DEQ1_BANDWIDTH:
            fn = deq1BandwidthKeyUpRespond;
            inputTextId = 'text_deq1_bandwidth';
            break;
        case controlsId.TEXT_DEQ1_LEVEL:
            fn = deq1LelKeyUpRespond;
            inputTextId = 'text_deq1_level';
            break;
        case controlsId.TEXT_DEQ2_FREQUENCY:
            fn = deq2FrequencyKeyUpRespond;
            inputTextId = 'text_deq2_frequency';
            break;
        case controlsId.TEXT_DEQ2_BANDWIDTH:
            fn = deq2BandwidthKeyUpRespond;
            inputTextId = 'text_deq2_bandwidth';
            break;
        case controlsId.TEXT_DEQ2_LEVEL:
            fn = deq2LelKeyUpRespond;
            inputTextId = 'text_deq2_level';
            break;






        case controlsId.TEXT_DEQ1_THRESHOLD:
            fn = deq1ThresholdKeyUpRespond;
            inputTextId = 'deq1_threshold';
            break;
        case controlsId.TEXT_DEQ1_RATIO:
            fn = deq1RatioKeyUpRespond;
            inputTextId = 'deq1_ratio';
            break;
        case controlsId.TEXT_DEQ1_ATTACK_TIME:
            fn = deq1AttackKeyUpRespond;
            inputTextId = 'deq1_attack_time';
            break;
        case controlsId.TEXT_DEQ1_RELEASE_TIME:
            fn = deq1ReleaseKeyUpRespond;
            inputTextId = 'deq1_release_time';
            break;

        case controlsId.TEXT_DEQ2_THRESHOLD:
            fn = deq2ThresholdKeyUpRespond;
            inputTextId = 'deq2_threshold';
            break;
        case controlsId.TEXT_DEQ2_RATIO:
            fn = deq2RatioKeyUpRespond;
            inputTextId = 'deq2_ratio';
            break;
        case controlsId.TEXT_DEQ2_ATTACK_TIME:
            fn = deq2AttackKeyUpRespond;
            inputTextId = 'deq2_attack_time';
            break;
        case controlsId.TEXT_DEQ2_RELEASE_TIME:
            fn = deq2ReleaseKeyUpRespond;
            inputTextId = 'deq2_release_time';
            break;





        //===================================================
        case controlsId.TEXT_THRESHOLD:
            fn = thresholdKeyUpRespond;
            inputTextId = 'text_threshold';
            break;
        case controlsId.TEXT_TARGET_LEVEL:
            fn = targetLelKeyUpRespond;
            inputTextId = 'text_target_level';
            break;
        case controlsId.TEXT_EXTENSION_RATIO:
            fn = extensionRatioKeyUpRespond;
            inputTextId = 'text_extension_ratio';
            break;
        case controlsId.TEXT_EXTENSION_ATTACK:
            fn = extensionAttackKeyUpRespond;
            inputTextId = 'text_extension_attack';
            break;
        case controlsId.TEXT_EXTENSION_RELEASE:
            fn = extensionReleaseKeyUpRespond;
            inputTextId = 'text_extension_release';
            break;
        case controlsId.TEXT_COMPRESSOR:
            fn = compressorKeyUpRespond;
            inputTextId = 'text_compressor';
            break;
        case controlsId.TEXT_COMP_RATIO:
            fn = compRatioKeyUpRespond;
            inputTextId = 'text_comp_ratio';
            break;
        case controlsId.TEXT_COMP_ATTACK:
            fn = compAttackKeyUpRespond;
            inputTextId = 'text_comp_attack';
            break;
        case controlsId.TEXT_COMP_RELEASE:
            fn = compReleaseKeyUpRespond;
            inputTextId = 'text_comp_release';
            break;
        //===================================================
        case controlsId.TEXT_VOLUME_A:
            fn = volumeAKeyUpRespond;
            inputTextId = 'text_volume_a';
            break;
        case controlsId.TEXT_VOLUME_B:
            fn = volumeBKeyUpRespond;
            inputTextId = 'text_volume_b';
            break;
        case controlsId.TEXT_VOLUME_C:
            fn = volumeCKeyUpRespond;
            inputTextId = 'text_volume_c';
            break;
        case controlsId.TEXT_VOLUME_D:
            fn = volumeDKeyUpRespond;
            inputTextId = 'text_volume_d';
            break;
        case controlsId.TEXT_VOLUME_OUT1:
            fn = volumeOut1KeyUpRespond;
            inputTextId = 'text_volume_out1';
            break;
        case controlsId.TEXT_VOLUME_OUT2:
            fn = volumeOut2KeyUpRespond;
            inputTextId = 'text_volume_out2';
            break;
        case controlsId.TEXT_VOLUME_OUT3:
            fn = volumeOut3KeyUpRespond;
            inputTextId = 'text_volume_out3';
            break;
        case controlsId.TEXT_VOLUME_OUT4:
            fn = volumeOut4KeyUpRespond;
            inputTextId = 'text_volume_out4';
            break;
        case controlsId.TEXT_VOLUME_OUT5:
            fn = volumeOut5KeyUpRespond;
            inputTextId = 'text_volume_out5';
            break;
        case controlsId.TEXT_VOLUME_OUT6:
            fn = volumeOut6KeyUpRespond;
            inputTextId = 'text_volume_out6';
            break;
        case controlsId.TEXT_VOLUME_OUT7:
            fn = volumeOut7KeyUpRespond;
            inputTextId = 'text_volume_out7';
            break;
        case controlsId.TEXT_VOLUME_OUT8:
            fn = volumeOut8KeyUpRespond;
            inputTextId = 'text_volume_out8';
            break;
        case controlsId.TEXT_GAIN:
            fn = gainKeyUpRespond;
            inputTextId = 'text_gain';
            break;
        default:
            break;

    }
    currentEditControl = document.getElementById(inputTextId);
    // currentEditControl.addEventListener('keyup', fn);
    currentEditControl.addEventListener('keyup', fireOnChange); //
}

function  fireOnChange(e) {
    var ev = document.createEvent("HTMLEvents");
    ev.initEvent("change", false, true);
    if(e.keyCode === 13) { //enter
        e.target.dispatchEvent(ev);
    }
}

//====================================================================================================================
//noise_gate  &&  delay
function gateKeyUpRespond() {
    // var editControl = document.getElementById('text_gate');
    // var str = editControl.value;
    // editControl.value = keepInputCharRight(str,inputTextValueType.NOISE_GATE);
}

function delayTimeKeyUpRespond() {
    var editControl = document.getElementById('text_delay_millisecond');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.DELAY_TIME);
}

function delayMeterKeyUpRespond() {
    var editControl = document.getElementById('text_delay_meter');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.DELAY_METER);
}

function delayInchKeyUpRespond() {
    var editControl = document.getElementById('text_delay_inch');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.DELAY_INCH);
}
//====================================================================================================================
//eq1
function eq1FrequencyKeyUpRespond(){
    var editControl = document.getElementById('text_eq1_frequency');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.FREQUENCY);
}

function eq1BandwidthKeyUpRespond(){
    var editControl = document.getElementById('text_eq1_bandwidth');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.BANDWIDTH);
}

function eq1SlopeKeyUpRespond(){
    var editControl = document.getElementById('text_eq1_slope');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.SLOPE);
}

function eq1GainKeyUpRespond(){
    var editControl = document.getElementById('text_eq1_gain');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.EQ_GAIN);
}
//=====================================================================
//eq2
function eq2FrequencyKeyUpRespond(){
    var editControl = document.getElementById('text_eq2_frequency');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.FREQUENCY);
}

function eq2BandwidthKeyUpRespond(){
    var editControl = document.getElementById('text_eq2_bandwidth');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.BANDWIDTH);
}

function eq2SlopeKeyUpRespond(){
    var editControl = document.getElementById('text_eq2_slope');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.SLOPE);
}


function eq2GainKeyUpRespond(){
    var editControl = document.getElementById('text_eq2_gain');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.EQ_GAIN);
}

//=====================================================================
//eq3
function eq3FrequencyKeyUpRespond(){
    var editControl = document.getElementById('text_eq3_frequency');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.FREQUENCY);
}

function eq3BandwidthKeyUpRespond(){
    var editControl = document.getElementById('text_eq3_bandwidth');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.BANDWIDTH);
}

function eq3SlopeKeyUpRespond(){
    var editControl = document.getElementById('text_eq3_slope');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.SLOPE);
}


function eq3GainKeyUpRespond(){
    var editControl = document.getElementById('text_eq3_gain');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.EQ_GAIN);
}
//=====================================================================
//eq4
function eq4FrequencyKeyUpRespond(){
    var editControl = document.getElementById('text_eq4_frequency');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.FREQUENCY);
}

function eq4BandwidthKeyUpRespond(){
    var editControl = document.getElementById('text_eq4_bandwidth');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.BANDWIDTH);
}

function eq4SlopeKeyUpRespond(){
    var editControl = document.getElementById('text_eq4_slope');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.SLOPE);
}


function eq4GainKeyUpRespond(){
    var editControl = document.getElementById('text_eq4_gain');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.EQ_GAIN);
}
//=====================================================================
//eq5
function eq5FrequencyKeyUpRespond(){
    var editControl = document.getElementById('text_eq5_frequency');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.FREQUENCY);
}

function eq5BandwidthKeyUpRespond(){
    var editControl = document.getElementById('text_eq5_bandwidth');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.BANDWIDTH);
}

function eq5SlopeKeyUpRespond(){
    var editControl = document.getElementById('text_eq5_slope');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.SLOPE);
}


function eq5GainKeyUpRespond(){
    var editControl = document.getElementById('text_eq5_gain');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.EQ_GAIN);
}
//=====================================================================
//eq6
function eq6FrequencyKeyUpRespond(){
    var editControl = document.getElementById('text_eq6_frequency');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.FREQUENCY);
}

function eq6BandwidthKeyUpRespond(){
    var editControl = document.getElementById('text_eq6_bandwidth');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.BANDWIDTH);
}

function eq6SlopeKeyUpRespond(){
    var editControl = document.getElementById('text_eq6_slope');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.SLOPE);
}


function eq6GainKeyUpRespond(){
    var editControl = document.getElementById('text_eq6_gain');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.EQ_GAIN);
}
//====================================================================================================================
function deq1FrequencyKeyUpRespond(){
    var editControl = document.getElementById('text_deq1_frequency');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.FREQUENCY);
}


function deq1BandwidthKeyUpRespond(){
    var editControl = document.getElementById('text_deq1_bandwidth');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.BANDWIDTH);
}


function deq1LelKeyUpRespond(){
    var editControl = document.getElementById('text_deq1_level');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.DEQ_LEVEL);
    // updateDeqButton();
}


function deq2FrequencyKeyUpRespond(){
    var editControl = document.getElementById('text_deq2_frequency');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.FREQUENCY);
}


function deq2BandwidthKeyUpRespond(){
    var editControl = document.getElementById('text_deq2_bandwidth');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.BANDWIDTH);
}


function deq2LelKeyUpRespond(){
    var editControl = document.getElementById('text_deq2_level');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.DEQ_LEVEL);
    // updateDeqButton();
}



function deq1ThresholdKeyUpRespond(ev){
    var editControl = document.getElementById('deq1_threshold');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.DEQ_LEVEL);
    updateDeqButton();

}


function deq1RatioKeyUpRespond(ev){
    var editControl = document.getElementById('deq1_ratio');
    var str = editControl.value;
    //editControl.value = keepInputCharRight(str,inputTextValueType.EXTENSION_RATION);
    updateDeqButton();
}

function deq1AttackKeyUpRespond(ev){
    var editControl = document.getElementById('deq1_attack_time');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.ATTACK_TIME);
    updateDeqButton();
}

function deq1ReleaseKeyUpRespond(ev){
    var editControl = document.getElementById('deq1_release_time');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.RELEASE_TIME);
    updateDeqButton();
}

function deq2ThresholdKeyUpRespond(ev){
    var editControl = document.getElementById('deq2_threshold');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.DEQ_LEVEL);
    updateDeqButton();
}


function deq2RatioKeyUpRespond(ev){
    var editControl = document.getElementById('deq2_ratio');
    var str = editControl.value;
    //editControl.value = keepInputCharRight(str,inputTextValueType.EXTENSION_RATION);
    updateDeqButton();
}

function deq2AttackKeyUpRespond(ev){
    var editControl = document.getElementById('deq2_attack_time');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.ATTACK_TIME);
    updateDeqButton();
}

function deq2ReleaseKeyUpRespond(ev){
    var editControl = document.getElementById('deq2_release_time');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.RELEASE_TIME);
    updateDeqButton();
}
//====================================================================================================================
function thresholdKeyUpRespond(){
    var editControl = document.getElementById('text_threshold');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.INPUT_EXTEND_THRESHOLD);
}

function targetLelKeyUpRespond(){
    var editControl = document.getElementById('text_target_level');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.INPUT_EXTEND_THRESHOLD);
}


function extensionRatioKeyUpRespond(){
    var editControl = document.getElementById('text_extension_ratio');
    var str = editControl.value;
    //editControl.value = keepInputCharRight(str,inputTextValueType.EXTENSION_RATION);
}


function extensionAttackKeyUpRespond(){
    var editControl = document.getElementById('text_extension_attack');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.ATTACK_TIME);
}


function extensionReleaseKeyUpRespond(){
    var editControl = document.getElementById('text_extension_release');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.RELEASE_TIME);
}


function compressorKeyUpRespond(){
    var editControl = document.getElementById('text_compressor');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
}


function compRatioKeyUpRespond(){
    var editControl = document.getElementById('text_comp_ratio');
    var str = editControl.value;
    //editControl.value = keepInputCharRight(str,inputTextValueType.COMPRESS_RATION);
}


function compAttackKeyUpRespond(){
    var editControl = document.getElementById('text_comp_attack');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.ATTACK_TIME);
}


function compReleaseKeyUpRespond(){
    var editControl = document.getElementById('text_comp_release');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.RELEASE_TIME);
}

//====================================================================================================================
// 4 input_channel_gain + 8 out_channel_gain
function volumeAKeyUpRespond(){
    var editControl = document.getElementById('text_volume_a');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.CHANNEL_GAIN);
}


function volumeBKeyUpRespond(){
    var editControl = document.getElementById('text_volume_b');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.CHANNEL_GAIN);


}


function volumeCKeyUpRespond(){
    var editControl = document.getElementById('text_volume_c');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.CHANNEL_GAIN);


}


function volumeDKeyUpRespond(){
    var editControl = document.getElementById('text_volume_d');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.CHANNEL_GAIN);


}

function volumeOut1KeyUpRespond(){
    var editControl = document.getElementById('text_volume_out1');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.CHANNEL_GAIN);


}


function volumeOut2KeyUpRespond(){
    var editControl = document.getElementById('text_volume_out2');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.CHANNEL_GAIN);


}


function volumeOut3KeyUpRespond(){
    var editControl = document.getElementById('text_volume_out3');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.CHANNEL_GAIN);


}


function volumeOut4KeyUpRespond(){
    var editControl = document.getElementById('text_volume_out4');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.CHANNEL_GAIN);


}


function volumeOut5KeyUpRespond(){
    var editControl = document.getElementById('text_volume_out5');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.CHANNEL_GAIN);


}


function volumeOut6KeyUpRespond(){
    var editControl = document.getElementById('text_volume_out6');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.CHANNEL_GAIN);


}


function volumeOut7KeyUpRespond(){
    var editControl = document.getElementById('text_volume_out7');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.CHANNEL_GAIN);

}

function volumeOut8KeyUpRespond(){
    var editControl = document.getElementById('text_volume_out8');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.CHANNEL_GAIN);

}

function gainKeyUpRespond(){
    var editControl = document.getElementById('text_gain');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.CHANNEL_GAIN);

}



function keepInputCharRight(str, type){
    var param;
    switch (type){
        case inputTextValueType.NOISE_GATE: //[-120, 0];
            if(str===('OFF')){
                return 'OFF';
            }
            param = /-?[0-9]{0,3}/;
            break;
        case inputTextValueType.DELAY_TIME: //[0,9.963][10,1000]
            if(str.indexOf('.')!==-1){
                param = /[0-9]{1,4}\.?[0-9]{0,4}/;
            }else{
                param = /[0-9]{1,4}/;
            }
            break;
        case inputTextValueType.DELAY_METER: //[0,3.400]  [4,340]
            param = /[0-9]{1,3}\.?[0-9]{0,4}/;
            break;
        case inputTextValueType.DELAY_INCH: //[0,11.160] [13,1117]
            param = /[0-9]{1,4}\.?[0-9]{0,4}/;
            break;
        case inputTextValueType.EXTENSION_RATION: //[1.0:1, 20.0:1]
            param = /[0-9]:[0-9]{1,2}\.?[0-9]?/;
            break;
        case inputTextValueType.COMPRESS_RATION:
            param = /[0-9]{1,2}\.?[0-9]?\:[0-9]/;
            break;
        case inputTextValueType.FREQUENCY: //[10.0,29.5][30,30200]
            param = /[0-9]{1,5}\.?[0-9]{0,1}/;
            break;
        case inputTextValueType.BANDWIDTH: //[0.05,3.00]
            param = /[0-9]\.?[0-9]{0,2}/;
            break;
        case inputTextValueType.SLOPE: //[0.404,28.852]
            param = /[0-9]{1,2}\.?[0-9]{0,3}/;
            break;
        case inputTextValueType.EQ_GAIN: //[-20,20]
            param = /-?[0-9]{0,2}\.?[0-9]?/;
            break;
        case inputTextValueType.CHANNEL_GAIN: //[-80.0,12.0]
            param = /-?[0-9]{0,2}\.?[0-9]?/;
            break;
        case inputTextValueType.ATTACK_TIME: //[0.3,200]
            param = /[0-9]{1,3}\.?[0-9]{0,1}/;
            break;
        case inputTextValueType.RELEASE_TIME: //[50,5000]
            param = /[0-9]{0,4}/;
            break;
        case inputTextValueType.INPUT_COMPRESS_THRESHOLD: //[-80.0,20.0]
        case inputTextValueType.INPUT_EXTEND_THRESHOLD:
            if (str === 'OFF'){
                return 'OFF';
            }
            param = /-?[0-9]{0,2}\.?[0-9]?/;
            break;
        case inputTextValueType.OUTPUT_COMPRESS_THRESHOLD: //[-40.0,20.0]
            if(str === ('OFF')){
                return 'OFF';
            }
            param = /-?[0-9]{0,2}\.?[0-9]?/;
            break;
        case inputTextValueType.DEQ_LEVEL:
            if(str === ('OFF')){
                return 'OFF';
            }
            param = /-?[0-9]{0,2}\.?[0-9]?/;
            break;
        default:
            break;
    }
    str = str.match(param);
    return str;
}


function addOutTextKeyUpEvent() {
    var editControl = document.getElementById("text_delay_millisecond_out");
    editControl.addEventListener('keyup', outDelayTimeKeyUpRespond);

    editControl = document.getElementById("text_delay_meter_out");
    editControl.addEventListener('keyup', outDelayMeterKeyUpRespond);

    editControl = document.getElementById("text_delay_inch_out");
    editControl.addEventListener('keyup', outDelayInchKeyUpRespond);

    editControl = document.getElementById("text_hpf_frequency");
    editControl.addEventListener('keyup', hpfFrequencyKeyUpRespond);

    editControl = document.getElementById("text_lpf_frequency");
    editControl.addEventListener('keyup', lpfFrequencyKeyUpRespond);

    editControl = document.getElementById("text_threshold_compress_out");
    editControl.addEventListener('keyup', outThresholdCompressKeyUpRespond);

    editControl = document.getElementById("text_ratio_compress_out");
    editControl.addEventListener('keyup', outRatioCompressKeyUpRespond);

    editControl = document.getElementById("text_attack_compress_out");
    editControl.addEventListener('keyup', outAttackCompressKeyUpRespond);

    editControl = document.getElementById("text_release_compress_out");
    editControl.addEventListener('keyup', outReleaseCompressKeyUpRespond);

    editControl = document.getElementById("text_threshold_limit_out");
    editControl.addEventListener('keyup', outThresholdLimitKeyUpRespond);

    editControl = document.getElementById("text_attack_limit_out");
    editControl.addEventListener('keyup', outAttackLimitKeyUpRespond);

    editControl = document.getElementById("text_release_limit_out");
    editControl.addEventListener('keyup', outReleaseLimitKeyUpRespond);

}

function outThresholdCompressKeyUpRespond(){
    var editControl = document.getElementById('text_threshold_compress_out');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
}

function outRatioCompressKeyUpRespond(){
    var editControl = document.getElementById('text_ratio_compress_out');
    var str = editControl.value;
    //editControl.value = keepInputCharRight(str,inputTextValueType.EXTENSION_RATION);
}

function outAttackCompressKeyUpRespond(){
    var editControl = document.getElementById('text_attack_compress_out');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.ATTACK_TIME);
}

function outReleaseCompressKeyUpRespond(){
    var editControl = document.getElementById('text_release_compress_out');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.RELEASE_TIME);
}

function outThresholdLimitKeyUpRespond(){
    var editControl = document.getElementById('text_threshold_limit_out');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
}

function outAttackLimitKeyUpRespond(){
    var editControl = document.getElementById('text_attack_limit_out');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.ATTACK_TIME);
}

function outReleaseLimitKeyUpRespond(){
    var editControl = document.getElementById('text_release_limit_out');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.RELEASE_TIME);
}

function outDelayTimeKeyUpRespond(){
    var editControl = document.getElementById('text_delay_millisecond_out');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.DELAY_TIME);
}

function outDelayMeterKeyUpRespond(){
    var editControl = document.getElementById('text_delay_meter_out');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.DELAY_METER);
}

function outDelayInchKeyUpRespond(){
    var editControl = document.getElementById('text_delay_inch_out');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.DELAY_INCH);
}

function hpfFrequencyKeyUpRespond(){
    var editControl = document.getElementById('text_hpf_frequency');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.FREQUENCY);
}

function lpfFrequencyKeyUpRespond(){
    var editControl = document.getElementById('text_lpf_frequency');
    var str = editControl.value;
    editControl.value = keepInputCharRight(str,inputTextValueType.FREQUENCY);
}


//======================================================================================================================
function codeInputKeyUpRespond(element) {
    var str = element
}
