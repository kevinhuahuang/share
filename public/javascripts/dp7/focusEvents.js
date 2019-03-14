
function addFocusEventsListener(){
    var editControlID = ['text_gate', 'text_delay_millisecond', 'text_delay_meter', 'text_delay_inch'];

    var eqEditControlID = ['text_eq1_frequency', 'text_eq1_bandwidth', 'text_eq1_slope', 'text_eq1_gain',
        'text_eq2_frequency', 'text_eq2_bandwidth', 'text_eq2_slope', 'text_eq2_gain',
        'text_eq3_frequency', 'text_eq3_bandwidth', 'text_eq3_slope', 'text_eq3_gain',
        'text_eq4_frequency', 'text_eq4_bandwidth', 'text_eq4_slope', 'text_eq4_gain',
        'text_eq5_frequency', 'text_eq5_bandwidth', 'text_eq5_slope', 'text_eq5_gain',
        'text_eq6_frequency', 'text_eq6_bandwidth', 'text_eq6_slope', 'text_eq6_gain'];

    var deqEditControlID = ['text_deq1_frequency', 'text_deq1_bandwidth', 'text_deq1_level',
        'text_deq2_frequency', 'text_deq2_bandwidth', 'text_deq2_level',
        'deq1_threshold', 'deq1_ratio', 'deq1_attack_time', 'deq1_release_time',
        'deq2_threshold', 'deq2_ratio', 'deq2_attack_time', 'deq2_release_time'];

    var agcEditControlID = ['text_threshold', 'text_target_level', 'text_extension_ratio', 'text_extension_attack',
        'text_extension_release', 'text_compressor', 'text_comp_ratio', 'text_comp_attack', 'text_comp_release'];

    var gainEditControlID =  ['text_volume_a', 'text_volume_b', 'text_volume_c', 'text_volume_d',
        'text_volume_out1', 'text_volume_out2', 'text_volume_out3', 'text_volume_out4',
        'text_volume_out5', 'text_volume_out6', 'text_volume_out7', 'text_volume_out8',
        'text_gain'];

    var outputEditControlID = ['text_delay_millisecond_out', 'text_delay_meter_out', 'text_delay_inch_out',
        'text_hpf_frequency', 'text_lpf_frequency', 'text_threshold_compress_out', 'text_ratio_compress_out', 
        'text_attack_compress_out', 'text_release_compress_out', 'text_threshold_limit_out', 
        'text_attack_limit_out', 'text_release_limit_out']
    
    var otherEditControlID = ['gain_setting', 'input_gain_setting']

    var spinnerControlID = ['select_link_a', 'select_link_b', 'select_link_c', 'select_link_d',
        'select_link_out1', 'select_link_out2', 'select_link_out3', 'select_link_out4',
        'select_link_out5', 'select_link_out6', 'select_link_out7', 'select_link_out8',
        'select_mode1', 'select_mode2', 'select_mode3', 'select_mode4', 'select_mode5', 'select_mode6',
        'select_slope1', 'select_slope2', 'select_slope3', 'select_slope4', 'select_slope5', 'select_slope6',
        'text_hpf_mode', 'text_lpf_mode', 'text_hpf_slope', 'text_lpf_slope'];

    var i;
    for(i in editControlID){
        addTextFocusEvent(editControlID[i]);
    }

    for(i in eqEditControlID){
        addTextFocusEvent(eqEditControlID[i]);
    }

    for(i in deqEditControlID){
        addTextFocusEvent(deqEditControlID[i]);
    }

    for(i in agcEditControlID){
        addTextFocusEvent(agcEditControlID[i]);
    }

    for(i in gainEditControlID){
        addTextFocusEvent(gainEditControlID[i]);
    }

    for(i in outputEditControlID){
        addTextFocusEvent(outputEditControlID[i]);
    }

    for(i in otherEditControlID){
        addTextFocusEvent(otherEditControlID[i]);
    }

    for(i in spinnerControlID){
        addTextFocusEvent(spinnerControlID[i]);
    }

}

function FocusRespond(ev){
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


function addTextFocusEvent(id) {
    // switch (id){
    //     case 'TEXT_GATE':
    //         inputTextId = 'text_gate';
    //         break;
    //     case 'TEXT_DELAY_MILLISECOND':
    //         inputTextId = 'text_delay_millisecond';
    //         break;
    //     case 'TEXT_DELAY_METER':
    //         inputTextId = 'text_delay_meter';
    //         break;
    //     case 'TEXT_DELAY_INCH':
    //         inputTextId = 'text_delay_inch';
    //         break;
    //     //===================================================
    //     case 'TEXT_EQ1_FREQUENCY':
    //         inputTextId = 'text_eq1_frequency';
    //         break;
    //     case 'TEXT_EQ1_BANDWIDTH':
    //         inputTextId = 'text_eq1_bandwidth';
    //         break;
    //     case 'TEXT_EQ1_SLOPE':
    //         inputTextId = 'text_eq1_slope';
    //         break;
    //     case 'TEXT_EQ1_GAIN':
    //         inputTextId = 'text_eq1_gain';
    //         break;
    //     //==================
    //     case 'TEXT_EQ2_FREQUENCY':
    //         inputTextId = 'text_eq2_frequency';
    //         break;
    //     case 'TEXT_EQ2_BANDWIDTH':
    //         inputTextId = 'text_eq2_bandwidth';
    //         break;
    //     case 'TEXT_EQ2_SLOPE':
    //         inputTextId = 'text_eq2_slope';
    //         break;
    //     case 'TEXT_EQ2_GAIN':
    //         inputTextId = 'text_eq2_gain';
    //         break;
    //     //==================
    //     case 'TEXT_EQ3_FREQUENCY':
    //         inputTextId = 'text_eq3_frequency';
    //         break;
    //     case 'TEXT_EQ3_BANDWIDTH':
    //         inputTextId = 'text_eq3_bandwidth';
    //         break;
    //     case 'TEXT_EQ3_SLOPE':
    //         inputTextId = 'text_eq3_slope';
    //         break;
    //     case 'TEXT_EQ3_GAIN':
    //         inputTextId = 'text_eq3_gain';
    //         break;
    //     //==================
    //     case 'TEXT_EQ4_FREQUENCY':
    //         inputTextId = 'text_eq4_frequency';
    //         break;
    //     case 'TEXT_EQ4_BANDWIDTH':
    //         inputTextId = 'text_eq4_bandwidth';
    //         break;
    //     case 'TEXT_EQ4_SLOPE':
    //         inputTextId = 'text_eq4_slope';
    //         break;
    //     case 'TEXT_EQ4_GAIN':
    //         inputTextId = 'text_eq4_gain';
    //         break;
    //     //==================
    //     case 'TEXT_EQ5_FREQUENCY':
    //         inputTextId = 'text_eq5_frequency';
    //         break;
    //     case 'TEXT_EQ5_BANDWIDTH':
    //         inputTextId = 'text_eq5_bandwidth';
    //         break;
    //     case 'TEXT_EQ5_SLOPE':
    //         inputTextId = 'text_eq5_slope';
    //         break;
    //     case 'TEXT_EQ5_GAIN':
    //         inputTextId = 'text_eq5_gain';
    //         break;
    //     //==================
    //     case 'TEXT_EQ6_FREQUENCY':
    //         inputTextId = 'text_eq6_frequency';
    //         break;
    //     case 'TEXT_EQ6_BANDWIDTH':
    //         inputTextId = 'text_eq6_bandwidth';
    //         break;
    //     case 'TEXT_EQ6_SLOPE':
    //         inputTextId = 'text_eq6_slope';
    //         break;
    //     case 'TEXT_EQ6_GAIN':
    //         inputTextId = 'text_eq6_gain';
    //         break;
    //     //===================================================
    //     case 'TEXT_DEQ1_FREQUENCY':
    //         inputTextId = 'text_deq1_frequency';
    //         break;
    //     case 'TEXT_DEQ1_BANDWIDTH':
    //         inputTextId = 'text_deq1_bandwidth';
    //         break;
    //     case 'TEXT_DEQ1_LEVEL':
    //         inputTextId = 'text_deq1_level';
    //         break;
    //     case 'TEXT_DEQ2_FREQUENCY':
    //         inputTextId = 'text_deq2_frequency';
    //         break;
    //     case 'TEXT_DEQ2_BANDWIDTH':
    //         inputTextId = 'text_deq2_bandwidth';
    //         break;
    //     case 'TEXT_DEQ2_LEVEL':
    //         inputTextId = 'text_deq2_level';
    //         break;
    //     case 'TEXT_DEQ1_THRESHOLD':
    //         inputTextId = 'deq1_threshold';
    //         break;
    //     case 'TEXT_DEQ1_RATIO':
    //         inputTextId = 'deq1_ratio';
    //         break;
    //     case 'TEXT_DEQ1_ATTACK_TIME':
    //         inputTextId = 'deq1_attack_time';
    //         break;
    //     case 'deq1_release_time':
    //         inputTextId = 'deq1_release_time';
    //         break;
    //     case 'deq2_threshold':
    //         inputTextId = 'deq2_threshold';
    //         break;
    //     case 'deq2_ratio':
    //         inputTextId = 'deq2_ratio';
    //         break;
    //     case 'deq2_attack_time':
    //         inputTextId = 'deq2_attack_time';
    //         break;
    //     case 'deq2_release_time':
    //         inputTextId = 'deq2_release_time';
    //         break;
    //
    //     //===================================================
    //     case 'text_threshold':
    //         inputTextId = 'text_threshold';
    //         break;
    //     case 'text_target_level':
    //         inputTextId = 'text_target_level';
    //         break;
    //     case 'text_extension_ratio':
    //         inputTextId = 'text_extension_ratio';
    //         break;
    //     case 'text_extension_attack':
    //         inputTextId = 'text_extension_attack';
    //         break;
    //     case 'text_extension_release':
    //         inputTextId = 'text_extension_release';
    //         break;
    //     case 'text_compressor':
    //         inputTextId = 'text_compressor';
    //         break;
    //     case 'text_comp_ratio':
    //         inputTextId = 'text_comp_ratio';
    //         break;
    //     case 'text_comp_attack':
    //         inputTextId = 'text_comp_attack';
    //         break;
    //     case 'text_comp_release':
    //         inputTextId = 'text_comp_release';
    //         break;
    //     //===================================================
    //     case 'text_volume_a':
    //         inputTextId = 'text_volume_a';
    //         break;
    //     case 'text_volume_b':
    //         inputTextId = 'text_volume_b';
    //         break;
    //     case 'text_volume_c':
    //         inputTextId = 'text_volume_c';
    //         break;
    //     case 'text_volume_d':
    //         inputTextId = 'text_volume_d';
    //         break;
    //     case 'text_volume_out1':
    //         inputTextId = 'text_volume_out1';
    //         break;
    //     case 'text_volume_out2':
    //         inputTextId = 'text_volume_out2';
    //         break;
    //     case 'text_volume_out3':
    //         inputTextId = 'text_volume_out3';
    //         break;
    //     case 'text_volume_out4':
    //         inputTextId = 'text_volume_out4';
    //         break;
    //     case 'text_volume_out5':
    //         inputTextId = 'text_volume_out5';
    //         break;
    //     case 'text_volume_out6':
    //         inputTextId = 'text_volume_out6';
    //         break;
    //     case 'text_volume_out7':
    //         inputTextId = 'text_volume_out7';
    //         break;
    //     case 'text_volume_out8':
    //         inputTextId = 'text_volume_out8';
    //         break;
    //     case 'text_gain':
    //         inputTextId = 'text_gain';
    //         break;
    //     //===================================================
    //     case 'text_delay_millisecond_out':
    //         inputTextId = 'text_volume_a';
    //         break;
    //     case 'text_delay_meter_out':
    //         inputTextId = 'text_volume_b';
    //         break;
    //     case 'text_delay_inch_out':
    //         inputTextId = 'text_volume_c';
    //         break;
    //     case 'text_hpf_frequency':
    //         inputTextId = 'text_volume_d';
    //         break;
    //     case 'text_lpf_frequency':
    //         inputTextId = 'text_volume_out1';
    //         break;
    //     case 'text_threshold_compress_out':
    //         inputTextId = 'text_volume_out2';
    //         break;
    //     case 'text_ratio_compress_out':
    //         inputTextId = 'text_volume_out3';
    //         break;
    //     case 'text_attack_compress_out':
    //         inputTextId = 'text_volume_out4';
    //         break;
    //     case 'text_release_compress_out':
    //         inputTextId = 'text_volume_out5';
    //         break;
    //     case 'text_threshold_limit_out':
    //         inputTextId = 'text_volume_out6';
    //         break;
    //     case 'text_attack_limit_out':
    //         inputTextId = 'text_volume_out7';
    //         break;
    //     case 'text_release_limit_out':
    //         inputTextId = 'text_volume_out8';
    //         break;
    //     default:
    //         break;
    //
    // }
    currentEditControl = document.getElementById(id);
    currentEditControl.onfocus = function () {
        focusElementId = id;
    }
    currentEditControl.onblur = function () {
        focusElementId = 'null';
    }
}

function clearTextFocusEvent() {
    if(focusElementId)  {
        document.getElementById(focusElementId).blur();
    }
    focusElementId = null;
}

window.DOMMouseScroll = windowMouseWheelResponse;
window.onmousewheel = windowMouseWheelResponse;

function windowMouseWheelResponse (event) {
    var ev = event ? event : window.event;
    console.log('curFocusElementID: ' + focusElementId);
    dispatchMouseWheelEvent(ev)
}

function dispatchMouseWheelEvent(event) {
    // var inputTextId;
    switch (focusElementId){
        case 'text_gate':
            gateFocusMouseWheelRespond(event);
            // inputTextId ='text_gate';
            break;
        case 'text_delay_millisecond':
            delayTimeFocusMouseWheelRespond(event);
            // inputTextId ='text_delay_millisecond';
            break;
        case 'text_delay_meter':
            delayMeterFocusMouseWheelRespond(event);
            // inputTextId ='text_delay_meter';
            break;
        case 'text_delay_inch':
            delayInchFocusMouseWheelRespond(event);
            // inputTextId ='text_delay_inch';
            break;
        //===================================================
        case 'text_eq1_frequency':
            eq1FrequencyFocusMouseWheelRespond(event);
            // inputTextId ='text_eq1_frequency';
            break;
        case 'text_eq1_bandwidth':
            eq1BandwidthFocusMouseWheelRespond(event);
            // inputTextId ='text_eq1_bandwidth';
            break;
        case 'text_eq1_slope':
            eq1SlopeFocusMouseWheelRespond(event);
            // inputTextId ='text_eq1_slope';
            break;
        case 'text_eq1_gain':
            eq1GainFocusMouseWheelRespond(event);
            // inputTextId ='text_eq1_gain';
            break;
        //==================
        case 'text_eq2_frequency':
            eq2FrequencyFocusMouseWheelRespond(event);
            // inputTextId ='text_eq2_frequency';
            break;
        case 'text_eq2_bandwidth':
            eq2BandwidthFocusMouseWheelRespond(event);
            // inputTextId ='text_eq2_bandwidth';
            break;
        case 'text_eq2_slope':
            eq2SlopeFocusMouseWheelRespond(event);
            // inputTextId ='text_eq2_slope';
            break;
        case 'text_eq2_gain':
            eq2GainFocusMouseWheelRespond(event);
            // inputTextId ='text_eq2_gain';
            break;
        //==================
        case 'text_eq3_frequency':
            eq3FrequencyFocusMouseWheelRespond(event);
            // inputTextId ='text_eq3_frequency';
            break;
        case 'text_eq3_bandwidth':
            eq3BandwidthFocusMouseWheelRespond(event);
            // inputTextId ='text_eq3_bandwidth';
            break;
        case 'text_eq3_slope':
            eq3SlopeFocusMouseWheelRespond(event);
            // inputTextId ='text_eq3_slope';
            break;
        case 'text_eq3_gain':
            eq3GainFocusMouseWheelRespond(event);
            // inputTextId ='text_eq3_gain';
            break;
        //==================
        case 'text_eq4_frequency':
            eq4FrequencyFocusMouseWheelRespond(event);
            // inputTextId ='text_eq4_frequency';
            break;
        case 'text_eq4_bandwidth':
            eq4BandwidthFocusMouseWheelRespond(event);
            // inputTextId ='text_eq4_bandwidth';
            break;
        case 'text_eq4_slope':
            eq4SlopeFocusMouseWheelRespond(event);
            // inputTextId ='text_eq4_slope';
            break;
        case 'text_eq4_gain':
            eq4GainFocusMouseWheelRespond(event);
            // inputTextId ='text_eq4_gain';
            break;
        //==================
        case 'text_eq5_frequency':
            eq5FrequencyFocusMouseWheelRespond(event);
            // inputTextId ='text_eq5_frequency';
            break;
        case 'text_eq5_bandwidth':
            eq5BandwidthFocusMouseWheelRespond(event);
            // inputTextId ='text_eq5_bandwidth';
            break;
        case 'text_eq5_slope':
            eq5SlopeFocusMouseWheelRespond(event);
            // inputTextId ='text_eq5_slope';
            break;
        case 'text_eq5_gain':
            eq5GainFocusMouseWheelRespond(event);
            // inputTextId ='text_eq5_gain';
            break;
        //==================
        case 'text_eq6_frequency':
            eq6FrequencyFocusMouseWheelRespond(event);
            // inputTextId ='text_eq6_frequency';
            break;
        case 'text_eq6_bandwidth':
            eq6BandwidthFocusMouseWheelRespond(event);
            // inputTextId ='text_eq6_bandwidth';
            break;
        case 'text_eq6_slope':
            eq6SlopeFocusMouseWheelRespond(event);
            // inputTextId ='text_eq6_slope';
            break;
        case 'text_eq6_gain':
            eq6GainFocusMouseWheelRespond(event);
            // inputTextId ='text_eq6_gain';
            break;
        //===================================================
        case 'text_deq1_frequency':
            deq1FrequencyFocusMouseWheelRespond(event);
            // inputTextId ='text_deq1_frequency';
            break;
        case 'text_deq1_bandwidth':
            deq1BandwidthFocusMouseWheelRespond(event);
            // inputTextId ='text_deq1_bandwidth';
            break;
        case 'text_deq1_level':
            deq1LevelFocusMouseWheelRespond(event);
            // inputTextId ='text_deq1_level';
            break;
        case 'text_deq2_frequency':
            deq2FrequencyFocusMouseWheelRespond(event);
            // inputTextId ='text_deq2_frequency';
            break;
        case 'text_deq2_bandwidth':
            deq2BandwidthFocusMouseWheelRespond(event);
            // inputTextId ='text_deq2_bandwidth';
            break;
        case 'text_deq2_level':
            deq2LevelFocusMouseWheelRespond(event);
            // inputTextId ='text_deq2_level';
            break;
        case 'deq1_threshold':
            deq1ThresholdFocusMouseWheelRespond(event);
            // inputTextId ='deq1_threshold';
            break;
        case 'deq1_ratio':
            deq1RatioFocusMouseWheelRespond(event);
            // inputTextId ='deq1_ratio';
            break;
        case 'deq1_attack_time':
            deq1AttackFocusMouseWheelRespond(event);
            // inputTextId ='deq1_attack_time';
            break;
        case 'deq1_release_time':
            deq1ReleaseFocusMouseWheelRespond(event);
            // inputTextId ='deq1_release_time';
            break;

        case 'deq2_threshold':
            deq2ThresholdFocusMouseWheelRespond(event);
            // inputTextId ='deq2_threshold';
            break;
        case 'deq2_ratio':
            deq2RatioFocusMouseWheelRespond(event);
            // inputTextId ='deq2_ratio';
            break;
        case 'deq2_attack_time':
            deq2AttackFocusMouseWheelRespond(event);
            // inputTextId ='deq2_attack_time';
            break;
        case 'deq2_release_time':
            deq2ReleaseFocusMouseWheelRespond(event);
            // inputTextId ='deq2_release_time';
            break;

        //===================================================
        case 'text_threshold':
            thresholdFocusMouseWheelRespond(event);
            // inputTextId ='text_threshold';
            break;
        case 'text_target_level':
            targetLevelFocusMouseWheelRespond(event);
            // inputTextId ='text_target_level';
            break;
        case 'text_extension_ratio':
            extensionRatioFocusMouseWheelRespond(event);
            // inputTextId ='text_extension_ratio';
            break;
        case 'text_extension_attack':
            extensionAttackFocusMouseWheelRespond(event);
            // inputTextId ='text_extension_attack';
            break;
        case 'text_extension_release':
            extensionReleaseFocusMouseWheelRespond(event);
            // inputTextId ='text_extension_release';
            break;
        case 'text_compressor':
            compressorFocusMouseWheelRespond(event);
            // inputTextId ='text_compressor';
            break;
        case 'text_comp_ratio':
            compRatioFocusMouseWheelRespond(event);
            // inputTextId ='text_comp_ratio';
            break;
        case 'text_comp_attack':
            compAttackFocusMouseWheelRespond(event);
            // inputTextId ='text_comp_attack';
            break;
        case 'text_comp_release':
            compReleaseFocusMouseWheelRespond(event);
            // inputTextId ='text_comp_release';
            break;
        //===================================================
        case 'text_volume_a':
            volumeAFocusMouseWheelRespond(event);
            // inputTextId ='text_volume_a';
            break;
        case 'text_volume_b':
            volumeBFocusMouseWheelRespond(event);
            // inputTextId ='text_volume_b';
            break;
        case 'text_volume_c':
            volumeCFocusMouseWheelRespond(event);
            // inputTextId ='text_volume_c';
            break;
        case 'text_volume_d':
            volumeDFocusMouseWheelRespond(event);
            // inputTextId ='text_volume_d';
            break;
        case 'text_volume_out1':
            volumeOut1FocusMouseWheelRespond(event);
            // inputTextId ='text_volume_out1';
            break;
        case 'text_volume_out2':
            volumeOut2FocusMouseWheelRespond(event);
            // inputTextId ='text_volume_out2';
            break;
        case 'text_volume_out3':
            volumeOut3FocusMouseWheelRespond(event);
            // inputTextId ='text_volume_out3';
            break;
        case 'text_volume_out4':
            volumeOut4FocusMouseWheelRespond(event);
            // inputTextId ='text_volume_out4';
            break;
        case 'text_volume_out5':
            volumeOut5FocusMouseWheelRespond(event);
            // inputTextId ='text_volume_out5';
            break;
        case 'text_volume_out6':
            volumeOut6FocusMouseWheelRespond(event);
            // inputTextId ='text_volume_out6';
            break;
        case 'text_volume_out7':
            volumeOut7FocusMouseWheelRespond(event);
            // inputTextId ='text_volume_out7';
            break;
        case 'text_volume_out8':
            volumeOut8FocusMouseWheelRespond(event);
            // inputTextId ='text_volume_out8';
            break;
        case 'text_gain':
            gainFocusMouseWheelRespond(event);
            // inputTextId ='text_gain';
            break;
        //===================================================
        case 'text_delay_millisecond_out':
            outDelayTimeFocusMouseWheelRespond(event);
            // inputTextId ='text_delay_millisecond_out';
            break;
        case 'text_delay_meter_out':
            outDelayMeterFocusMouseWheelRespond(event);
            // inputTextId ='text_delay_meter_out';
            break;
        case 'text_delay_inch_out':
            outDelayInchFocusMouseWheelRespond(event);
            // inputTextId ='text_delay_inch_out';
            break;
        case 'text_hpf_frequency':
            hpfFrequencyFocusMouseWheelRespond(event);
            // inputTextId ='text_hpf_frequency';
            break;
        case 'text_lpf_frequency':
            lpfFrequencyFocusMouseWheelRespond(event);
            // inputTextId ='text_lpf_frequency';
            break;
        case 'text_threshold_compress_out':
            outThresholdCompressFocusMouseWheelRespond(event);
            // inputTextId ='text_threshold_compress_out';
            break;
        case 'text_ratio_compress_out':
            outRatioCompressFocusMouseWheelRespond(event);
            // inputTextId ='text_ratio_compress_out';
            break;
        case 'text_attack_compress_out':
            outAttackCompressFocusMouseWheelRespond(event);
            // inputTextId ='text_attack_compress_out';
            break;
        case 'text_release_compress_out':
            outReleaseCompressFocusMouseWheelRespond(event);
            // inputTextId ='text_release_compress_out';
            break;
        case 'text_threshold_limit_out':
            outThresholdLimitFocusMouseWheelRespond(event);
            // inputTextId ='text_threshold_limit_out';
            break;
        case 'text_attack_limit_out':
            outAttackLimitFocusMouseWheelRespond(event);
            // inputTextId ='text_attack_limit_out';
            break;
        case 'text_release_limit_out':
            outReleaseLimitFocusMouseWheelRespond(event);
            // inputTextId ='text_release_limit_out';
            break;
            //===================================
        case 'gain_setting':
            gainSettingFocusMouseWheelRespond(event);
            // inputTextId ='gain_setting';
            break;
        case 'input_gain_setting':
            inputGainSettingFocusMouseWheelRespond(event);
            // inputTextId ='input_gain_setting';
            break;
        //==============================================================================
            //下拉列表 响应 鼠标滚动
        case 'select_link_a': // 输入联调
            selectInputAMouseWheelRespond(event);
            break;
        case 'select_link_b':
            selectInputBMouseWheelRespond(event);
            break;
        case 'select_link_c':
            selectInputCMouseWheelRespond(event);
            break;
        case 'select_link_d':
            selectInputDMouseWheelRespond(event);
            break;
            //=======================================
        case 'select_link_out1': //输出联调
            selectOut1MouseWheelRespond(event);
            break;
        case 'select_link_out2':
            selectOut2MouseWheelRespond(event);
            break;
        case 'select_link_out3':
            selectOut3MouseWheelRespond(event);
            break;
        case 'select_link_out4':
            selectOut4MouseWheelRespond(event);
            break;
        case 'select_link_out5':
            selectOut5MouseWheelRespond(event);
            break;
        case 'select_link_out6':
            selectOut6MouseWheelRespond(event);
            break;
        case 'select_link_out7':
            selectOut7MouseWheelRespond(event);
            break;
        case 'select_link_out8':
            selectOut8MouseWheelRespond(event);
            break;
            //======================================
        case 'select_mode1': //eq模式
            selectEqType1MouseWheelRespond(event);
            break;
        case 'select_mode2':
            selectEqType2MouseWheelRespond(event);
            break;
        case 'select_mode3':
            selectEqType3MouseWheelRespond(event);
            break;
        case 'select_mode4':
            selectEqType4MouseWheelRespond(event);
            break;
        case 'select_mode5':
            selectEqType5MouseWheelRespond(event);
            break;
        case 'select_mode6':
            selectEqType6MouseWheelRespond(event);
            break;
            //======================================
        case 'select_slope1': // 斜率 下拉列表
            selectEqSlope1MouseWheelRespond(event);
            break;
        case 'select_slope2':
            selectEqSlope2MouseWheelRespond(event);
            break;
        case 'select_slope3':
            selectEqSlope3MouseWheelRespond(event);
            break;
        case 'select_slope4':
            selectEqSlope4MouseWheelRespond(event);
            break;
        case 'select_slope5':
            selectEqSlope5MouseWheelRespond(event);
            break;
        case 'select_slope6':
            selectEqSlope6MouseWheelRespond(event);
            break;
        //======================================
        case 'text_hpf_mode':
            selectHpfMouseWheelModeRespond(event);
            break;
        case 'text_lpf_mode':
            selectLpfMouseWheelModeRespond(event);
            break;
        case 'text_hpf_slope':
            selectHpfMouseWheelSlopeRespond(event);
            break;
        case 'text_lpf_slope':
            selectLpfMouseWheelSlopeRespond(event);
            break;
        default:
            break;
    }
}


function mouseWheelCurStepRespond(ev){
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
//====================================================================================================================
//noise_gate  &&  delay 输入延时


function gateFocusMouseWheelRespond(ev){
    currentStep = controlsData.inputData.noisegate;
    mouseWheelCurStepRespond(ev);
    var editControl = document.getElementById('text_gate'); //门限
    checkCurrentStep(inputTextValueType.NOISE_GATE);
    controlsData.inputData.noisegate = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.NOISE_GATE);
    keepLinkInputGate(curButtonNo,currentStep);
}

function delayTimeFocusMouseWheelRespond(ev){
    currentStep = controlsData.inputData.delay;
    mouseWheelCurStepRespond(ev);
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

function delayMeterFocusMouseWheelRespond(ev){
    currentStep = controlsData.inputData.delay;
    mouseWheelCurStepRespond(ev);
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

function delayInchFocusMouseWheelRespond(ev){
    currentStep = controlsData.inputData.delay;
    mouseWheelCurStepRespond(ev);
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
function eq1FrequencyFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq1_frequency');
    currentStep = eqData.EQ1.freq;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ1.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq1Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,1);
    DrawLine();
    curEqChannel = 1;
    showOrHideEqData();
}

function eq1BandwidthFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq1_bandwidth');
    currentStep = eqData.EQ1.bw;
    mouseWheelCurStepRespond(ev);
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

function eq1SlopeFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq1_slope');
    currentStep = eqData.EQ1.bw;
    mouseWheelCurStepRespond(ev);
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

function eq1GainFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq1_gain');
    currentStep = eqData.EQ1.level;
    mouseWheelCurStepRespond(ev);
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
function eq2FrequencyFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq2_frequency');
    currentStep = eqData.EQ2.freq;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ2.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq2Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,2);
    DrawLine();
    curEqChannel = 2;
    showOrHideEqData();

}

function eq2BandwidthFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq2_bandwidth');
    currentStep = eqData.EQ2.bw;
    mouseWheelCurStepRespond(ev);
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

function eq2SlopeFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq2_slope');
    currentStep = eqData.EQ2.bw;
    mouseWheelCurStepRespond(ev);
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


function eq2GainFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq2_gain');
    currentStep = eqData.EQ2.level;
    mouseWheelCurStepRespond(ev);
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
function eq3FrequencyFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq3_frequency');
    currentStep = eqData.EQ3.freq;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ3.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq3Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,3);
    DrawLine();
    curEqChannel = 3;
    showOrHideEqData();

}

function eq3BandwidthFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq3_bandwidth');
    currentStep = eqData.EQ3.bw;
    mouseWheelCurStepRespond(ev);
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

function eq3SlopeFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq3_slope');
    currentStep = eqData.EQ3.bw;
    mouseWheelCurStepRespond(ev);
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

function eq3GainFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq3_gain');
    currentStep = eqData.EQ3.level;
    mouseWheelCurStepRespond(ev);
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
function eq4FrequencyFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq4_frequency');
    currentStep = eqData.EQ4.freq;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ4.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq4Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,4);
    DrawLine();
    curEqChannel = 4;
    showOrHideEqData();

}

function eq4BandwidthFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq4_bandwidth');
    currentStep = eqData.EQ4.bw;
    mouseWheelCurStepRespond(ev);
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


function eq4SlopeFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq4_slope');
    currentStep = eqData.EQ4.bw;
    mouseWheelCurStepRespond(ev);
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


function eq4GainFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq4_gain');
    currentStep = eqData.EQ4.level;
    mouseWheelCurStepRespond(ev);
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
function eq5FrequencyFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq5_frequency');
    currentStep = eqData.EQ5.freq;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ5.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq5Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,5);
    DrawLine();
    curEqChannel = 5;
    showOrHideEqData();

}

function eq5BandwidthFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq5_bandwidth');
    currentStep = eqData.EQ5.bw;
    mouseWheelCurStepRespond(ev);
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

function eq5SlopeFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq5_slope');
    currentStep = eqData.EQ5.bw;
    mouseWheelCurStepRespond(ev);
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


function eq5GainFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq5_gain');
    currentStep = eqData.EQ5.level;
    mouseWheelCurStepRespond(ev);
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
function eq6FrequencyFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq6_frequency');
    currentStep = eqData.EQ6.freq;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    eqData.EQ6.freq = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkEq6Frequency(curButtonNo, currentStep);
    eqDataKeepStep(curButtonNo,6);
    DrawLine();
    curEqChannel = 6;
    showOrHideEqData();

}

function eq6BandwidthFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq6_bandwidth');
    currentStep = eqData.EQ6.bw;
    mouseWheelCurStepRespond(ev);
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

function eq6SlopeFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq6_slope');
    currentStep = eqData.EQ6.bw;
    mouseWheelCurStepRespond(ev);
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


function eq6GainFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_eq6_gain');
    currentStep = eqData.EQ6.level;
    mouseWheelCurStepRespond(ev);
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
function deq1FrequencyFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_deq1_frequency');　// DEQ1频率
    currentStep = controlsData.inputData.InDeq1.req;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    controlsData.inputData.InDeq1.req = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkInputDeq1Frequency(curButtonNo, currentStep);
}

function deq1BandwidthFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_deq1_bandwidth'); // DEQ1带宽
    currentStep = controlsData.inputData.InDeq1.bw;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    controlsData.inputData.InDeq1.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkInputDeq1Bandwidth(curButtonNo, currentStep);
}

function deq1LevelFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_deq1_level'); // DEQ1目标电平
    currentStep = controlsData.inputData.InDeq1.level;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.DEQ_LEVEL);
    controlsData.inputData.InDeq1.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_LEVEL);
    keepLinkInputDeq1Level(curButtonNo, currentStep);
    updateDeqButton();
}

function deq1ThresholdFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('deq1_threshold'); // DEQ1阈值
    currentStep = controlsData.inputData.DeqParam1.DEQ_Threshold;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.DEQ_THRESHOLD);
    controlsData.inputData.DeqParam1.DEQ_Threshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_THRESHOLD);
    keepLinkInputDeq1Threshold(curButtonNo, currentStep);
}

function deq1RatioFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('deq1_ratio'); // DEQ1比率
    currentStep = controlsData.inputData.DeqParam1.DEQ_ratio;
    mouseWheelCurStepRespond(ev);
    fixRatioCurrentStep(controlsData.inputData.DeqParam1.DEQ_ratio);
    checkCurrentStep(inputTextValueType.EXTENSION_RATION);
    controlsData.inputData.DeqParam1.DEQ_ratio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputDeq1Ratio(curButtonNo, currentStep);
}

function deq1AttackFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('deq1_attack_time');  // DEQ1响应时间
    currentStep = controlsData.inputData.DeqParam1.DEQ_a;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.DeqParam1.DEQ_a = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputDeq1AttackTime(curButtonNo, currentStep);
}

function deq1ReleaseFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('deq1_release_time');  // DEQ1释放时间
    currentStep = controlsData.inputData.DeqParam1.DEQ_r;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.DeqParam1.DEQ_r = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputDeq1ReleaseTime(curButtonNo, currentStep);
}

function deq2FrequencyFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_deq2_frequency');  // DEQ2频率
    currentStep = controlsData.inputData.InDeq2.req;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.FREQUENCY);
    controlsData.inputData.InDeq2.req = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.FREQUENCY);
    keepLinkInputDeq2Frequency(curButtonNo, currentStep);
}

function deq2BandwidthFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_deq2_bandwidth');  // DEQ2带宽
    currentStep = controlsData.inputData.InDeq2.bw;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.BANDWIDTH);
    controlsData.inputData.InDeq2.bw = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.BANDWIDTH);
    keepLinkInputDeq2Bandwidth(curButtonNo, currentStep);
}

function deq2LevelFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_deq2_level');  // DEQ2目标电平
    currentStep = controlsData.inputData.InDeq2.level;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.DEQ_LEVEL);
    controlsData.inputData.InDeq2.level = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_LEVEL);
    keepLinkInputDeq2Level(curButtonNo, currentStep);
    updateDeqButton();
}

function deq2ThresholdFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('deq2_threshold');  // DEQ2阈值
    currentStep = controlsData.inputData.DeqParam2.DEQ_Threshold;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.DEQ_LEVEL);
    controlsData.inputData.DeqParam2.DEQ_Threshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.DEQ_THRESHOLD);
    keepLinkInputDeq2Threshold(curButtonNo, currentStep);
}

function deq2RatioFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('deq2_ratio');  // DEQ2比率
    currentStep = controlsData.inputData.DeqParam2.DEQ_ratio;
    mouseWheelCurStepRespond(ev);
    fixRatioCurrentStep(controlsData.inputData.DeqParam2.DEQ_ratio);
    checkCurrentStep(inputTextValueType.EXTENSION_RATION);
    controlsData.inputData.DeqParam2.DEQ_ratio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputDeq2Ratio(curButtonNo, currentStep);
}

function deq2AttackFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('deq2_attack_time');  // DEQ2响应时间
    currentStep = controlsData.inputData.DeqParam2.DEQ_a;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.DeqParam2.DEQ_a = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputDeq2AttackTime(curButtonNo, currentStep);
}

function deq2ReleaseFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('deq2_release_time');  // DEQ2释放时间
    currentStep = controlsData.inputData.DeqParam2.DEQ_r;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.DeqParam2.DEQ_r = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputDeq2ReleaseTime(curButtonNo, currentStep);
}
//======================================================================================================================
//输入自动增益
function thresholdFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_threshold'); // 输入自动增益阈值
    currentStep = controlsData.inputData.agThreshold;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    controlsData.inputData.agThreshold = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    keepLinkInputThreshold(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}

function targetLevelFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_target_level'); // 输入自动增益目标电平
    currentStep = controlsData.inputData.agLevel;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.TARGET_LEVEL);
    controlsData.inputData.agLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_EXTEND_THRESHOLD);
    keepLinkInputLevel(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}


function extensionRatioFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_extension_ratio'); // 输入自动增益比率
    currentStep = controlsData.inputData.agRatio;
    mouseWheelCurStepRespond(ev);
    fixRatioCurrentStep(controlsData.inputData.agRatio);
    checkCurrentStep(inputTextValueType.EXTENSION_RATION);
    controlsData.inputData.agRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.EXTENSION_RATION);
    keepLinkInputExtendRatio(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}


function extensionAttackFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_extension_attack'); // 输入自动增益响应时间
    currentStep = controlsData.inputData.agAttack;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.agAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputExtendAttackTime(curButtonNo, currentStep);
}


function extensionReleaseFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_extension_release'); // 输入自动增益释放时间
    currentStep = controlsData.inputData.agRelease;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.agRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputExtendReleaseTime(curButtonNo, currentStep);
}


function compressorFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_compressor'); // 输入压缩电平
    currentStep = controlsData.inputData.compLevel;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.INPUT_COMPRESS_THRESHOLD);
    controlsData.inputData.compLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.INPUT_COMPRESS_THRESHOLD);
    keepLinkInputCompressLevel(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}


function compRatioFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_comp_ratio'); // 输入压缩比
    currentStep = controlsData.inputData.compRatio;
    mouseWheelCurStepRespond(ev);
    fixRatioCurrentStep(controlsData.inputData.compRatio);
    checkCurrentStep(inputTextValueType.COMPRESS_RATION);
    controlsData.inputData.compRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.COMPRESS_RATION);
    keepLinkInputCompressRatio(curButtonNo, currentStep);
    agcExtMap.Draw_AGC_Comp();
}


function compAttackFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_comp_attack'); // 输入响应时间
    currentStep = controlsData.inputData.compAttack;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.inputData.compAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkInputCompressAttackTime(curButtonNo, currentStep);
}


function compReleaseFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_comp_release'); // 输入 释放时间
    currentStep = controlsData.inputData.compRelease;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.inputData.compRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkInputCompressReleaseTime(curButtonNo, currentStep);
}

//====================================================================================================================
// 4 input_channel_gain + 8 out_channel_gain 输入增益  输出增益
function volumeAFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_a'); // 输入A 增益
    currentStep = currentGroupData.dataInputA.gain;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputA.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_A, currentStep);
    //console.log(currentGroupData.dataInputA.gain);

    keepLinkInputVolume(0,currentStep);
}


function volumeBFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_b'); // 输入B 增益
    currentStep = currentGroupData.dataInputB.gain;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputB.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_B, currentStep);
    keepLinkInputVolume(1,currentStep);
}


function volumeCFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_c'); // 输入C 增益
    currentStep = currentGroupData.dataInputC.gain;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputC.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_C, currentStep);
    keepLinkInputVolume(2,currentStep);
}


function volumeDFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_d'); // 输入D 增益
    currentStep = currentGroupData.dataInputD.gain;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataInputD.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_D, currentStep);
    keepLinkInputVolume(3,currentStep);
}

function volumeOut1FocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out1'); // 输出 1 增益
    currentStep = currentGroupData.dataOut1.gain;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut1.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT1, currentStep);
    keepLinkOutVolume(0,currentStep);
}


function volumeOut2FocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out2'); // 输出 2 增益
    currentStep = currentGroupData.dataOut2.gain;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut2.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT2, currentStep);
    keepLinkOutVolume(1,currentStep);
}


function volumeOut3FocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out3'); // 输出 3 增益
    currentStep = currentGroupData.dataOut3.gain;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut3.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT3, currentStep);
    keepLinkOutVolume(2,currentStep);
}


function volumeOut4FocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out4');  // 输出 4 增益
    currentStep = currentGroupData.dataOut4.gain;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut4.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT4, currentStep);
    keepLinkOutVolume(3,currentStep);
}


function volumeOut5FocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out5');  // 输出 5 增益
    currentStep = currentGroupData.dataOut5.gain;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut5.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT5, currentStep);
    keepLinkOutVolume(4,currentStep);
}


function volumeOut6FocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out6');  // 输出 6 增益
    currentStep = currentGroupData.dataOut6.gain;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut6.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT6, currentStep);
    keepLinkOutVolume(5,currentStep);
}


function volumeOut7FocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out7');  // 输出 7 增益
    currentStep = currentGroupData.dataOut7.gain;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut7.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT7, currentStep);
    keepLinkOutVolume(6,currentStep);
}

function volumeOut8FocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_volume_out8');  // 输出 8 增益
    currentStep = currentGroupData.dataOut8.gain;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    currentGroupData.dataOut8.gain = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT8, currentStep);
    keepLinkOutVolume(7,currentStep);
}

function gainFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_gain'); //总 增益
    currentStep = getChannelGain(curButtonNo);
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.CHANNEL_GAIN);
    setChannelGain(curButtonNo, currentStep);
    editControl.value = getDisplayValue(inputTextValueType.CHANNEL_GAIN);
    setGainSliderPosition(currentStep);
    keepShortGainInStep(currentStep);
}


//输出通道
//===========================================================================================
//======================================================================================================================
//输出压缩限幅
function outThresholdCompressFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_threshold_compress_out'); //输出压缩电平
    currentStep = controlsData.outputData.compLevel;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
    controlsData.outputData.compLevel = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
    keepLinkOutThresholdCompress(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
}

function outRatioCompressFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_ratio_compress_out'); //输出压缩比
    currentStep = controlsData.outputData.compRatio;
    mouseWheelCurStepRespond(ev);
    fixRatioCurrentStep(controlsData.outputData.compRatio);
    checkCurrentStep(inputTextValueType.COMPRESS_RATION);
    // checkCurrentStep(inputTextValueType.COMPRESS_RATION);
    controlsData.outputData.compRatio = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.COMPRESS_RATION);
    keepLinkOutRatioCompress(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
}

function outAttackCompressFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_attack_compress_out'); //输出压缩响应时间
    currentStep = controlsData.outputData.compAttack;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.outputData.compAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkOutAttackCompress(curButtonNo, currentStep);
}

function outReleaseCompressFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_release_compress_out'); //输出压缩释放时间
    currentStep = controlsData.outputData.compR;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.outputData.compR = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkOutReleaseCompress(curButtonNo, currentStep);
}

function outThresholdLimitFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_threshold_limit_out'); //输出限幅电平
    currentStep = controlsData.outputData.limT;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.OUTPUT_LIMITER_THRESHOLD);
    controlsData.outputData.limT = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.OUTPUT_LIMITER_THRESHOLD);
    keepLinkOutThresholdLimit(curButtonNo, currentStep);
    comExtMap.DrawOutComp_LimT();
}

function outAttackLimitFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_attack_limit_out'); //输出限幅响应时间
    currentStep = controlsData.outputData.limAttack;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.ATTACK_TIME);
    controlsData.outputData.limAttack = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.ATTACK_TIME);
    keepLinkOutAttackLimit(curButtonNo, currentStep);
}

function outReleaseLimitFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_release_limit_out'); //输出限幅释放时间
    currentStep = controlsData.outputData.limRelease;
    mouseWheelCurStepRespond(ev);
    checkCurrentStep(inputTextValueType.RELEASE_TIME);
    controlsData.outputData.limRelease = currentStep;
    editControl.value = getDisplayValue(inputTextValueType.RELEASE_TIME);
    keepLinkOutReleaseLimit(curButtonNo, currentStep);
}

//======================================================================================================================
//输出延时
function outDelayTimeFocusMouseWheelRespond(ev){
    currentStep = controlsData.outputData.delay;
    mouseWheelCurStepRespond(ev);
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

function outDelayMeterFocusMouseWheelRespond(ev){
    currentStep = controlsData.outputData.delay;
    mouseWheelCurStepRespond(ev);
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

function outDelayInchFocusMouseWheelRespond(ev){
    currentStep = controlsData.outputData.delay;
    mouseWheelCurStepRespond(ev);
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
function hpfFrequencyFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_hpf_frequency'); //分频 高通
    currentStep = controlsData.outputData.HPFData.HL_freq;
    mouseWheelCurStepRespond(ev);
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

function lpfFrequencyFocusMouseWheelRespond(ev){
    var editControl = document.getElementById('text_lpf_frequency'); //分频 低通
    currentStep = controlsData.outputData.LPFData.HL_freq;
    mouseWheelCurStepRespond(ev);
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

//=============================================================================
function gainSettingFocusMouseWheelRespond(ev){ // 中控 输出增益
    currentStep = parseInt(document.getElementById('gain_setting').value);
    FocusRespond(ev);
    if(currentStep < -80){
        currentStep = -80;
    }else if(currentStep > 12){
        currentStep = 12;
    }
    document.getElementById('gain_setting').value = currentStep + 'dB';

    getOutputWriteCode();
}

function inputGainSettingFocusMouseWheelRespond(ev){ //中控 输入增益
    currentStep = parseInt(document.getElementById('input_gain_setting').value);
    FocusRespond(ev);
    if(currentStep < -80){
        currentStep = -80;
    }else if(currentStep > 12){
        currentStep = 12;
    }
    document.getElementById('input_gain_setting').value = currentStep + 'dB';

    getInputWriteCode();

}

//========================================================================================================
//========================================================================================================
//========================================================================================================
//========================================================================================================
//========================================================================================================
//========================================================================================================
// 下拉列表   鼠标滚动
function getSpinerMaxStep(id){
    var maxStep;
    switch(id){
        case 'select_link_a': // 输入联调
        case 'select_link_b':
        case 'select_link_c':
        case 'select_link_d':
            maxStep = 3;
            break;
        //=======================================
        case 'select_link_out1': //输出联调
        case 'select_link_out2':
        case 'select_link_out3':
        case 'select_link_out4':
        case 'select_link_out5':
        case 'select_link_out6':
        case 'select_link_out7':
        case 'select_link_out8':
            maxStep = 7;
            break;
        //======================================
        case 'select_mode1': //eq模式
        case 'select_mode2':
        case 'select_mode3':
        case 'select_mode4':
        case 'select_mode5':
        case 'select_mode6':
            maxStep = 4;
            break;
        //======================================
        case 'select_slope1': // 斜率 下拉列表
        case 'select_slope2':
        case 'select_slope3':
        case 'select_slope4':
        case 'select_slope5':
        case 'select_slope6':
            maxStep = 1;
            break;
        //======================================
        case 'text_hpf_mode':
        case 'text_lpf_mode':
            maxStep = 2;
            break;
        //======================================
        case 'text_hpf_slope':
            if(controlsData.outputData.HPFData.HL_Type === 0){
                maxStep = 3;
            } else {
                maxStep = 6;
            }
            break;
        case 'text_lpf_slope':
            if(controlsData.outputData.LPFData.HL_Type === 0){
                maxStep = 3;
            } else {
                maxStep = 6;
            }
    }
    return maxStep;
}

function mouseWheelSpinnerRespond(ev, step, id){
    var event = ev || window.event;
    var minStep = 0;
    var down, maxStep; // 定义一个标志，当滚轮向下滚时，执行一些操作
    down = event.wheelDelta?event.wheelDelta<0:event.detail>0;
    if(down){
        step++;
    }else {
        step--;
    }
    maxStep = getSpinerMaxStep(id)

    if (step < minStep) {
        step = minStep;
    } else if (step > maxStep) {
        step = maxStep
    }

    if(event.preventDefault){/*FF 和 Chrome*/
        event.preventDefault();// 阻止默认事件
    }

    setModeSelect(id, step);
    console.log(id + ' step: ' + step);
    return step;
}



function selectInputAMouseWheelRespond(ev) { //输入A联调响应
    var selectElement = document.getElementById('select_link_a');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_link_a');
    // alert('inputA_'+ index);
    currentGroupData.dataInputA.inLinkSel = index;
    linkInputSelect[0] = index;
    keepLinkChannelData(constConfig.CURRENT_CHANNGEL_INPUT_A);
    updateLinkInputDisplay(constConfig.CURRENT_CHANNGEL_INPUT_A);
    keepLinkPhaseLineStatus(index+1, controlsData.buttonStates.buttonPhaseCurveStatus[index]);
    if (curButtonNo === 1) {
        assignChannelData(constConfig.CURRENT_CHANNGEL_INPUT_A);
        inputOrOutputModule(true);
        hideHLPFChannelName();
        agcExtMap.SetInData(0);
        lockDisplay.refreshInputLockDisplay();
        initPolar(); //更新相位按钮在曲线的值, 相位按钮状态发生变化都需要更新曲线对应的值, 且放在曲线绘制之前
        setPhaseDirectionStatus(); //设置输入相位按钮正反状态
        if(currentLockData.nIn_LockData.nIn_EQ){
            svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
            curEqChannel = -1;
            showOrHideEqData();
            inputEqBeLocked();
        }else {
            if(curEqChannel > 6) {
                curEqChannel = 1;
            }
            showOrHideEqData();
            //curEqChannel = 1;
            inputEqUnlock();
            DrawLine();
        }

        setCurPhaseCurveStatus();  //相位曲线按钮状态
    }
}

function selectInputBMouseWheelRespond(ev) { //输入B联调响应
    var selectElement = document.getElementById('select_link_b');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_link_b');
    currentGroupData.dataInputB.inLinkSel = index;
    //alert('inputB_'+ index);
    linkInputSelect[1] = index;
    keepLinkChannelData(constConfig.CURRENT_CHANNGEL_INPUT_B);
    updateLinkInputDisplay(constConfig.CURRENT_CHANNGEL_INPUT_B);
    keepLinkPhaseLineStatus(index+1, controlsData.buttonStates.buttonPhaseCurveStatus[index]);
    if (curButtonNo  === 2) {
        assignChannelData(constConfig.CURRENT_CHANNGEL_INPUT_B);
        inputOrOutputModule(true);
        hideHLPFChannelName();
        agcExtMap.SetInData(1);
        lockDisplay.refreshInputLockDisplay();
        initPolar(); //更新相位按钮在曲线的值, 相位按钮状态发生变化都需要更新曲线对应的值, 且放在曲线绘制之前
        setPhaseDirectionStatus(); //设置输入相位按钮正反状态
        if(currentLockData.nIn_LockData.nIn_EQ){
            svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
            curEqChannel = -1;
            showOrHideEqData();
            inputEqBeLocked();
        }else {
            if(curEqChannel > 6) {
                curEqChannel = 1;
            }
            showOrHideEqData();
            //curEqChannel = 1;
            inputEqUnlock();
            DrawLine();
        }

        setCurPhaseCurveStatus();  //相位曲线按钮状态
    }
}

function selectInputCMouseWheelRespond(ev) { //输入C联调响应
    var selectElement = document.getElementById('select_link_c');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_link_c');
    currentGroupData.dataInputC.inLinkSel = index;
    //alert('inputC_'+ index);
    linkInputSelect[2] = index;
    keepLinkChannelData(constConfig.CURRENT_CHANNGEL_INPUT_C);
    updateLinkInputDisplay(constConfig.CURRENT_CHANNGEL_INPUT_C);
    keepLinkPhaseLineStatus(index+1, controlsData.buttonStates.buttonPhaseCurveStatus[index]);
    if (curButtonNo  === 3) {
        assignChannelData(constConfig.CURRENT_CHANNGEL_INPUT_C);
        inputOrOutputModule(true);
        hideHLPFChannelName();
        agcExtMap.SetInData(2);
        lockDisplay.refreshInputLockDisplay();
        initPolar(); //更新相位按钮在曲线的值, 相位按钮状态发生变化都需要更新曲线对应的值, 且放在曲线绘制之前
        setPhaseDirectionStatus(); //设置输入相位按钮正反状态
        if(currentLockData.nIn_LockData.nIn_EQ){
            svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
            curEqChannel = -1;
            showOrHideEqData();
            inputEqBeLocked();
        }else {
            if(curEqChannel > 6) {
                curEqChannel = 1;
            }
            showOrHideEqData();
            //curEqChannel = 1;
            inputEqUnlock();
            DrawLine();
        }

        setCurPhaseCurveStatus();  //相位曲线按钮状态
    }

}

function selectInputDMouseWheelRespond(ev) { //输入D联调响应
    var selectElement = document.getElementById('select_link_d');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_link_d');
    currentGroupData.dataInputD.inLinkSel = index;
    //alert('inputD_'+ index);
    linkInputSelect[3] = index;
    keepLinkChannelData(constConfig.CURRENT_CHANNGEL_INPUT_D);
    updateLinkInputDisplay(constConfig.CURRENT_CHANNGEL_INPUT_D);
    keepLinkPhaseLineStatus(index+1, controlsData.buttonStates.buttonPhaseCurveStatus[index]);
    if (curButtonNo  === 4) {
        assignChannelData(constConfig.CURRENT_CHANNGEL_INPUT_D);
        inputOrOutputModule(true);
        hideHLPFChannelName();
        agcExtMap.SetInData(3);
        lockDisplay.refreshInputLockDisplay();
        initPolar(); //更新相位按钮在曲线的值, 相位按钮状态发生变化都需要更新曲线对应的值, 且放在曲线绘制之前
        setPhaseDirectionStatus(); //设置输入相位按钮正反状态
        if(currentLockData.nIn_LockData.nIn_EQ){
            svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
            curEqChannel = -1;
            showOrHideEqData();
            inputEqBeLocked();
        }else {
            if(curEqChannel > 6) {
                curEqChannel = 1;
            }
            showOrHideEqData();
            //curEqChannel = 1;
            inputEqUnlock();
            DrawLine();
        }

        setCurPhaseCurveStatus();  //相位曲线按钮状态
    }
}

//==================================================================
function selectOut1MouseWheelRespond(ev) { //输出1联调响应
    var selectElement = document.getElementById('select_link_out1');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_link_out1');
    currentGroupData.dataOut1.outLinkSel = index;
    //alert('out1_'+ index);
    linkOutSelect[0] = index;
    keepLinkChannelData(constConfig.CURRENT_CHANNGEL_OUT_1); //联调通道保持数据相同
    updateLinkOutDisplay(constConfig.CURRENT_CHANNGEL_OUT_1); //更新输出通道数据
    keepLinkPhaseLineStatus(index+5, controlsData.buttonStates.buttonPhaseCurveStatus[index+4]); //相位曲线按钮状态保持一致
    if (curButtonNo === 5) {
        assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_1);
        inputOrOutputModule(false);
        showHLPFChannelName();
        comExtMap.SetOutComp_LimT(0);
        lockDisplay.refreshOutLockDisplay();
        initPolar(); //更新相位按钮在曲线的值, 相位按钮状态发生变化都需要更新曲线对应的值, 且放在曲线绘制之前
        setPhaseOutDirectionStatus(); //设置输出相位按钮正反状态
        if(currentLockData.nOut_LockData.nOut_EQ){
            svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
            curEqChannel = -1;
            showOrHideEqData();
            outputEqBeLock();
        }else {
            showOrHideEqData();
            //curEqChannel = 1;
            outPutEqUnlock();
            DrawLine();
        }
        setCurPhaseCurveStatus();  //相位曲线按钮状态
    }
}

function selectOut2MouseWheelRespond(ev) { //输出2联调响应
    var selectElement = document.getElementById('select_link_out2');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_link_out2');
    currentGroupData.dataOut2.outLinkSel = index;
    //alert('out2_'+ index);
    linkOutSelect[1] = index;
    keepLinkChannelData(constConfig.CURRENT_CHANNGEL_OUT_2);
    updateLinkOutDisplay(constConfig.CURRENT_CHANNGEL_OUT_2);
    keepLinkPhaseLineStatus(index+5, controlsData.buttonStates.buttonPhaseCurveStatus[index+4]);
    if (curButtonNo === 6) {
        assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_2);
        inputOrOutputModule(false);
        showHLPFChannelName();
        comExtMap.SetOutComp_LimT(1);
        lockDisplay.refreshOutLockDisplay();
        initPolar(); //更新相位按钮在曲线的值, 相位按钮状态发生变化都需要更新曲线对应的值, 且放在曲线绘制之前
        setPhaseOutDirectionStatus(); //设置输出相位按钮正反状态
        if(currentLockData.nOut_LockData.nOut_EQ){
            svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
            curEqChannel = -1;
            showOrHideEqData();
            outputEqBeLock();
        }else {
            showOrHideEqData();
            //curEqChannel = 1;
            outPutEqUnlock();
            DrawLine();
        }
        setCurPhaseCurveStatus();  //相位曲线按钮状态
    }

}

function selectOut3MouseWheelRespond(ev) { //输出3联调响应
    var selectElement = document.getElementById('select_link_out3');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_link_out3');
    currentGroupData.dataOut3.outLinkSel = index;
    //alert('out3_'+ index);
    linkOutSelect[2] = index;
    keepLinkChannelData(constConfig.CURRENT_CHANNGEL_OUT_3);
    updateLinkOutDisplay(constConfig.CURRENT_CHANNGEL_OUT_3);
    keepLinkPhaseLineStatus(index+5, controlsData.buttonStates.buttonPhaseCurveStatus[index+4]);
    if (curButtonNo === 7) {
        assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_3);
        inputOrOutputModule(false);
        showHLPFChannelName();
        comExtMap.SetOutComp_LimT(2);
        lockDisplay.refreshOutLockDisplay();
        initPolar(); //更新相位按钮在曲线的值, 相位按钮状态发生变化都需要更新曲线对应的值, 且放在曲线绘制之前
        setPhaseOutDirectionStatus(); //设置输出相位按钮正反状态
        if(currentLockData.nOut_LockData.nOut_EQ){
            svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
            curEqChannel = -1;
            showOrHideEqData();
            outputEqBeLock();

        }else {
            showOrHideEqData();
            //curEqChannel = 1;
            outPutEqUnlock();
            DrawLine();
        }
        setCurPhaseCurveStatus();  //相位曲线按钮状态
    }

}

function selectOut4MouseWheelRespond(ev) { //输出4联调响应
    var selectElement = document.getElementById('select_link_out4');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_link_out4');
    currentGroupData.dataOut4.outLinkSel = index;
    //alert('out4_'+ index);
    linkOutSelect[3] = index;
    keepLinkChannelData(constConfig.CURRENT_CHANNGEL_OUT_4);
    updateLinkOutDisplay(constConfig.CURRENT_CHANNGEL_OUT_4);
    keepLinkPhaseLineStatus(index+5, controlsData.buttonStates.buttonPhaseCurveStatus[index+4]);
    if (curButtonNo === 8) {
        assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_4);
        inputOrOutputModule(false);
        showHLPFChannelName();
        comExtMap.SetOutComp_LimT(3);
        lockDisplay.refreshOutLockDisplay();
        initPolar(); //更新相位按钮在曲线的值, 相位按钮状态发生变化都需要更新曲线对应的值, 且放在曲线绘制之前
        setPhaseOutDirectionStatus(); //设置输出相位按钮正反状态
        if(currentLockData.nOut_LockData.nOut_EQ){
            svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
            curEqChannel = -1;
            showOrHideEqData();
            outputEqBeLock();

        }else {
            showOrHideEqData();
            //curEqChannel = 1;
            outPutEqUnlock();
            DrawLine();
        }
        setCurPhaseCurveStatus();  //相位曲线按钮状态
    }

}

function selectOut5MouseWheelRespond(ev) { //输出5联调响应
    var selectElement = document.getElementById('select_link_out5');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_link_out5');
    currentGroupData.dataOut5.outLinkSel = index;
    //alert('out5_'+ index);
    linkOutSelect[4] = index;
    keepLinkChannelData(constConfig.CURRENT_CHANNGEL_OUT_5);
    updateLinkOutDisplay(constConfig.CURRENT_CHANNGEL_OUT_5);
    keepLinkPhaseLineStatus(index+5, controlsData.buttonStates.buttonPhaseCurveStatus[index+4]);
    if (curButtonNo === 9) {
        assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_5);
        inputOrOutputModule(false);
        showHLPFChannelName();
        comExtMap.SetOutComp_LimT(4);
        lockDisplay.refreshOutLockDisplay();
        initPolar(); //更新相位按钮在曲线的值, 相位按钮状态发生变化都需要更新曲线对应的值, 且放在曲线绘制之前
        setPhaseOutDirectionStatus(); //设置输出相位按钮正反状态
        if(currentLockData.nOut_LockData.nOut_EQ){
            svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
            curEqChannel = -1;
            showOrHideEqData();
            outputEqBeLock();

        }else {
            showOrHideEqData();
            //curEqChannel = 1;
            outPutEqUnlock();
            DrawLine();
        }
        setCurPhaseCurveStatus();  //相位曲线按钮状态
    }

}

function selectOut6MouseWheelRespond(ev) { //输出6联调响应
    var selectElement = document.getElementById('select_link_out6');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_link_out6');
    currentGroupData.dataOut6.outLinkSel = index;
    //alert('out6_'+ index);
    linkOutSelect[5] = index;
    keepLinkChannelData(constConfig.CURRENT_CHANNGEL_OUT_6);
    updateLinkOutDisplay(constConfig.CURRENT_CHANNGEL_OUT_6);
    keepLinkPhaseLineStatus(index+5, controlsData.buttonStates.buttonPhaseCurveStatus[index+4]);
    if (curButtonNo === 10) {
        assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_6);
        inputOrOutputModule(false);
        showHLPFChannelName();
        comExtMap.SetOutComp_LimT(5);
        lockDisplay.refreshOutLockDisplay();
        initPolar(); //更新相位按钮在曲线的值, 相位按钮状态发生变化都需要更新曲线对应的值, 且放在曲线绘制之前
        setPhaseOutDirectionStatus(); //设置输出相位按钮正反状态
        if(currentLockData.nOut_LockData.nOut_EQ){
            svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
            curEqChannel = -1;
            showOrHideEqData();
            outputEqBeLock();

        }else {
            showOrHideEqData();
            //curEqChannel = 1;
            outPutEqUnlock();
            DrawLine();
        }
        setCurPhaseCurveStatus();  //相位曲线按钮状态
    }

}

function selectOut7MouseWheelRespond(ev) { //输出7联调响应
    var selectElement = document.getElementById('select_link_out7');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_link_out7');
    currentGroupData.dataOut7.outLinkSel = index;
    //alert('out7_'+ index);
    linkOutSelect[6] = index;
    keepLinkChannelData(constConfig.CURRENT_CHANNGEL_OUT_7);
    updateLinkOutDisplay(constConfig.CURRENT_CHANNGEL_OUT_7);
    keepLinkPhaseLineStatus(index+5, controlsData.buttonStates.buttonPhaseCurveStatus[index+4]);
    if (curButtonNo === 11) {
        assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_7);
        inputOrOutputModule(false);
        showHLPFChannelName();
        comExtMap.SetOutComp_LimT(6);
        lockDisplay.refreshOutLockDisplay();
        initPolar(); //更新相位按钮在曲线的值, 相位按钮状态发生变化都需要更新曲线对应的值, 且放在曲线绘制之前
        setPhaseOutDirectionStatus(); //设置输出相位按钮正反状态
        if(currentLockData.nOut_LockData.nOut_EQ){
            svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
            curEqChannel = -1;
            showOrHideEqData();
            outputEqBeLock();

        }else {
            showOrHideEqData();
            //curEqChannel = 1;
            outPutEqUnlock();
            DrawLine();
        }
        setCurPhaseCurveStatus();  //相位曲线按钮状态
    }

}

function selectOut8MouseWheelRespond(ev) { //输出8联调响应
    var selectElement = document.getElementById('select_link_out8');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_link_out8');
    currentGroupData.dataOut8.outLinkSel = index;
    //alert('out8_'+ index);
    linkOutSelect[7] = index;
    keepLinkChannelData(constConfig.CURRENT_CHANNGEL_OUT_8);
    updateLinkOutDisplay(constConfig.CURRENT_CHANNGEL_OUT_8);
    keepLinkPhaseLineStatus(index+5, controlsData.buttonStates.buttonPhaseCurveStatus[index+4]);
    if (curButtonNo === 12) {
        assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_8);
        inputOrOutputModule(false);
        showHLPFChannelName();
        comExtMap.SetOutComp_LimT(7);
        lockDisplay.refreshOutLockDisplay();
        initPolar(); //更新相位按钮在曲线的值, 相位按钮状态发生变化都需要更新曲线对应的值, 且放在曲线绘制之前
        setPhaseOutDirectionStatus(); //设置输出相位按钮正反状态
        if(currentLockData.nOut_LockData.nOut_EQ){
            svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
            curEqChannel = -1;
            showOrHideEqData();
            outputEqBeLock();

        }else {
            showOrHideEqData();
            //curEqChannel = 1;
            outPutEqUnlock();
            DrawLine();
        }
        setCurPhaseCurveStatus();  //相位曲线按钮状态
    }

}


//================================================================================================
//EQ 模式下拉列表框
function selectEqType1MouseWheelRespond(ev) {
    var selectElement = document.getElementById('select_mode1');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_mode1');
    eqData.EQ1.type = index;
    keepLinkEq1Mode(curButtonNo, index);
    if (index > 2) { //1阶或2阶全通
        if(GET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag)) { // 旁通 置0
            console.log('EQ1旁通状态：旁通' + GET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag));
            controlsData.buttonStates.buttonEqStatus[1] = false;
            document.getElementById('button_eq1').setAttribute('class', 'button_eq_false');
        } else {
            console.log('EQ1旁通状态：不旁通' + GET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag));
            controlsData.buttonStates.buttonEqStatus[1] = true;
            document.getElementById('button_eq1').setAttribute('class', 'button_eq_true');
        }
    } else { //参量 低调 高调
        if(eqData.EQ1.level !== 200) {
            controlsData.buttonStates.buttonEqStatus[1] = true;
            document.getElementById('button_eq1').setAttribute('class', 'button_eq_true');
        } else {
            controlsData.buttonStates.buttonEqStatus[1] = false;
            document.getElementById('button_eq1').setAttribute('class', 'button_eq_false');
        }
    }

    eqDataKeepStep(curButtonNo,1);
    DrawLine();
    updateAllEqGainButton();
    updateEqModeDisplay(index, 1);
    curEqChannel = 1;
    showOrHideEqData();
    showOrHideLittleRect();
}

function selectEqType2MouseWheelRespond(ev) {
    var selectElement = document.getElementById('select_mode2');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_mode2');
    eqData.EQ2.type = index;
    keepLinkEq2Mode(curButtonNo, index);
    if (index > 2) {//1阶或2阶全通
        if(GET_4L_BYTE(eqData.EQ2.HL_db_AP_Flag)) { // 旁通 置0
            controlsData.buttonStates.buttonEqStatus[2] = false;
            document.getElementById('button_eq2').setAttribute('class', 'button_eq_false');
        } else {
            controlsData.buttonStates.buttonEqStatus[2] = true;
            document.getElementById('button_eq2').setAttribute('class', 'button_eq_true');
        }
    } else { //参量 低调 高调
        if(eqData.EQ2.level !== 200) {
            controlsData.buttonStates.buttonEqStatus[2] = true;
            document.getElementById('button_eq2').setAttribute('class', 'button_eq_true');
        } else {
            controlsData.buttonStates.buttonEqStatus[2] = false;
            document.getElementById('button_eq2').setAttribute('class', 'button_eq_false');
        }
    }

    eqDataKeepStep(curButtonNo,2);
    DrawLine();

    updateEqModeDisplay(index, 2);
    curEqChannel = 2;
    showOrHideEqData();
    showOrHideLittleRect();
}

function selectEqType3MouseWheelRespond(ev) {
    var selectElement = document.getElementById('select_mode3');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_mode3');
    eqData.EQ3.type = index;
    keepLinkEq3Mode(curButtonNo, index);
    if (index > 2) {//1阶或2阶全通
        if(GET_4L_BYTE(eqData.EQ3.HL_db_AP_Flag)) { // 旁通 置0
            controlsData.buttonStates.buttonEqStatus[3] = false;
            document.getElementById('button_eq3').setAttribute('class', 'button_eq_false');
        } else {
            controlsData.buttonStates.buttonEqStatus[3] = true;
            document.getElementById('button_eq3').setAttribute('class', 'button_eq_true');
        }
    } else { //参量 低调 高调
        if(eqData.EQ3.level !== 200) {
            controlsData.buttonStates.buttonEqStatus[3] = true;
            document.getElementById('button_eq3').setAttribute('class', 'button_eq_true');
        } else {
            controlsData.buttonStates.buttonEqStatus[3] = false;
            document.getElementById('button_eq3').setAttribute('class', 'button_eq_false');
        }
    }

    eqDataKeepStep(curButtonNo,3);
    DrawLine();

    updateEqModeDisplay(index, 3);
    curEqChannel = 3;
    showOrHideEqData();
    showOrHideLittleRect();
}

function selectEqType4MouseWheelRespond(ev) {
    var selectElement = document.getElementById('select_mode4');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_mode4');
    eqData.EQ4.type = index;
    keepLinkEq4Mode(curButtonNo, index);
    if (index > 2) {//1阶或2阶全通
        if(GET_4L_BYTE(eqData.EQ4.HL_db_AP_Flag)) { // 旁通 置0
            controlsData.buttonStates.buttonEqStatus[4] = false;
            document.getElementById('button_eq4').setAttribute('class', 'button_eq_false');
        } else {
            controlsData.buttonStates.buttonEqStatus[4] = true;
            document.getElementById('button_eq4').setAttribute('class', 'button_eq_true');
        }
    } else { //参量 低调 高调
        if(eqData.EQ4.level !== 200) {
            controlsData.buttonStates.buttonEqStatus[4] = true;
            document.getElementById('button_eq4').setAttribute('class', 'button_eq_true');
        } else {
            controlsData.buttonStates.buttonEqStatus[4] = false;
            document.getElementById('button_eq4').setAttribute('class', 'button_eq_false');
        }
    }


    eqDataKeepStep(curButtonNo,4);
    DrawLine();

    updateEqModeDisplay(index, 4);
    curEqChannel = 4;
    showOrHideEqData();

    showOrHideLittleRect();
}

function selectEqType5MouseWheelRespond(ev) {
    var selectElement = document.getElementById('select_mode5');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_mode5');
    eqData.EQ5.type = index;
    keepLinkEq5Mode(curButtonNo, index);
    if (index > 2) {//1阶或2阶全通
        if(GET_4L_BYTE(eqData.EQ5.HL_db_AP_Flag)) { // 旁通 置0
            controlsData.buttonStates.buttonEqStatus[5] = false;
            document.getElementById('button_eq5').setAttribute('class', 'button_eq_false');
        } else {
            controlsData.buttonStates.buttonEqStatus[5] = true;
            document.getElementById('button_eq5').setAttribute('class', 'button_eq_true');
        }
    } else { //参量 低调 高调
        if(eqData.EQ5.level !== 200) {
            controlsData.buttonStates.buttonEqStatus[5] = true;
            document.getElementById('button_eq5').setAttribute('class', 'button_eq_true');
        } else {
            controlsData.buttonStates.buttonEqStatus[5] = false;
            document.getElementById('button_eq5').setAttribute('class', 'button_eq_false');
        }
    }

    eqDataKeepStep(curButtonNo,5);
    DrawLine();

    updateEqModeDisplay(index, 5);

    curEqChannel = 5;
    showOrHideEqData();
    showOrHideLittleRect();
}

function selectEqType6MouseWheelRespond(ev) {
    var selectElement = document.getElementById('select_mode6');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_mode6');
    eqData.EQ6.type = index;
    keepLinkEq6Mode(curButtonNo, index);
    if (index > 2) {//1阶或2阶全通
        if(GET_4L_BYTE(eqData.EQ6.HL_db_AP_Flag)) { // 旁通 置0
            controlsData.buttonStates.buttonEqStatus[6] = false;
            document.getElementById('button_eq6').setAttribute('class', 'button_eq_false');
        } else {
            controlsData.buttonStates.buttonEqStatus[6] = true;
            document.getElementById('button_eq6').setAttribute('class', 'button_eq_true');
        }
    } else { //参量 低调 高调
        if(eqData.EQ6.level !== 200) {
            controlsData.buttonStates.buttonEqStatus[6] = true;
            document.getElementById('button_eq6').setAttribute('class', 'button_eq_true');
        } else {
            controlsData.buttonStates.buttonEqStatus[6] = false;
            document.getElementById('button_eq6').setAttribute('class', 'button_eq_false');
        }
    }

    eqDataKeepStep(curButtonNo,6);
    DrawLine();

    updateEqModeDisplay(index, 6);

    curEqChannel = 6;
    showOrHideEqData();
    showOrHideLittleRect();
}

//================================================================================
function selectEqSlope1MouseWheelRespond(ev) {   //斜率1 响应
    var selectElement = document.getElementById('select_slope1');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_slope1');
    eqData.EQ1.HL_db_AP_Flag = SET_4H_BYTE(index,GET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag));
    // setEqPassButtonStatus(controlsId.BUTTON_EQ1, false);
    keepLinkEq1SlopeSelect(curButtonNo, index);
    eqDataKeepStep(curButtonNo,1);
    DrawLine();
    updateEqModeDisplay(eqData.EQ1.type, 1);
    curEqChannel = 1;
    showOrHideEqData();
}

function selectEqSlope2MouseWheelRespond(ev) {   //斜率2 响应
    var selectElement = document.getElementById('select_slope2');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_slope2');
    eqData.EQ2.HL_db_AP_Flag = SET_4H_BYTE(index,GET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag));
    // console.log('index: ' + index);
    // console.log('eqData.EQ2.HL_db_AP_Flag: ' + eqData.EQ2.HL_db_AP_Flag );
    // setEqPassButtonStatus(controlsId.BUTTON_EQ2, false);

    keepLinkEq2SlopeSelect(curButtonNo, index);
    eqDataKeepStep(curButtonNo,2);
    DrawLine();

    updateEqModeDisplay(eqData.EQ2.type, 2);
    curEqChannel = 2;
    showOrHideEqData();


}

function selectEqSlope3MouseWheelRespond(ev) {   //斜率3 响应
    var selectElement = document.getElementById('select_slope3');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_slope3');
    eqData.EQ3.HL_db_AP_Flag = SET_4H_BYTE(index,GET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag));
    // setEqPassButtonStatus(controlsId.BUTTON_EQ3, false);

    keepLinkEq3SlopeSelect(curButtonNo, index);
    eqDataKeepStep(curButtonNo,3);
    DrawLine();

    updateEqModeDisplay(eqData.EQ3.type, 3);
    curEqChannel = 3;
    showOrHideEqData();

}

function selectEqSlope4MouseWheelRespond(ev) {   //斜率4 响应
    var selectElement = document.getElementById('select_slope4');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_slope4');
    eqData.EQ4.HL_db_AP_Flag = SET_4H_BYTE(index,GET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag));
    // setEqPassButtonStatus(controlsId.BUTTON_EQ4, false);

    keepLinkEq4SlopeSelect(curButtonNo, index);

    eqDataKeepStep(curButtonNo,4);
    DrawLine();

    updateEqModeDisplay(eqData.EQ4.type, 4);
    curEqChannel = 4;
    showOrHideEqData();

}

function selectEqSlope5MouseWheelRespond(ev) {   //斜率5 响应
    var selectElement = document.getElementById('select_slope5');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_slope5');
    eqData.EQ5.HL_db_AP_Flag = SET_4H_BYTE(index,GET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag));
    // setEqPassButtonStatus(controlsId.BUTTON_EQ5, false);

    keepLinkEq5SlopeSelect(curButtonNo, index);
    eqDataKeepStep(curButtonNo,5);
    DrawLine();

    updateEqModeDisplay(eqData.EQ5.type, 5);
    curEqChannel = 5;
    showOrHideEqData();

}

function selectEqSlope6MouseWheelRespond(ev) {   //斜率6 响应
    var selectElement = document.getElementById('select_slope6');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'select_slope6');
    eqData.EQ6.HL_db_AP_Flag = SET_4H_BYTE(index,GET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag));
    // setEqPassButtonStatus(controlsId.BUTTON_EQ6, false);

    keepLinkEq6SlopeSelect(curButtonNo, index);
    eqDataKeepStep(curButtonNo,6);
    DrawLine();

    updateEqModeDisplay(eqData.EQ6.type, 6);
    curEqChannel = 6;
    showOrHideEqData();
}

//================================================================================
//分频模式下拉列表框
function selectHpfMouseWheelModeRespond(ev){ //分频高通模式
    var selectElement = document.getElementById('text_hpf_mode');
    var slopeElement = document.getElementById("text_hpf_slope");
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'text_hpf_mode');
    controlsData.outputData.HPFData.HL_Type = index;
    keepLinkOutHpfMode(curButtonNo, index);
    eqDataKeepStep(curButtonNo,7);
    DrawLine();
    //console.log('高通类型改变 更新曲线');
    switch(index){
        case 0:
            slopeElement.innerHTML = '';
            initXoverFew("text_hpf_slope");
            setModeSelect('text_hpf_slope',controlsData.outputData.HPFData.LR_Level);
            break;
        case 1:
        case 2:
            slopeElement.innerHTML = '';
            initXoverMany("text_hpf_slope");
            setModeSelect('text_hpf_slope',controlsData.outputData.HPFData.HL_Oct);
            break;
        default:
            break;
    }
    curEqChannel = 7;
    showOrHideEqData();

}

function selectLpfMouseWheelModeRespond(ev){ //分频低通模式
    var selectElement = document.getElementById('text_lpf_mode');
    var slopeElement = document.getElementById("text_lpf_slope");
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'text_lpf_mode');
    controlsData.outputData.LPFData.HL_Type = index;
    keepLinkOutLpfMode(curButtonNo, index);
    eqDataKeepStep(curButtonNo,8);
    DrawLine();
    //console.log('低通类型改变 更新曲线');
    switch(index){
        case 0:
            slopeElement.innerHTML = '';
            initXoverFew("text_lpf_slope");
            setModeSelect('text_lpf_slope',controlsData.outputData.LPFData.LR_Level);
            break;
        case 1:
        case 2:
            slopeElement.innerHTML = '';
            initXoverMany("text_lpf_slope");
            setModeSelect('text_lpf_slope',controlsData.outputData.LPFData.HL_Oct);
            break;
        default:
            break;
    }
    curEqChannel = 8;
    showOrHideEqData();
}

function selectHpfMouseWheelSlopeRespond(ev){  //分频高通 斜率
    var selectElement = document.getElementById('text_hpf_slope');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'text_hpf_slope');

    keepLinkOutHpfSlope(curButtonNo, index);
    if(controlsData.outputData.HPFData.HL_Type === 0){
        controlsData.outputData.HPFData.LR_Level = index;
    } else {
        controlsData.outputData.HPFData.HL_Oct = index;
    }
    //console.log('高通斜率改变 更新曲线');
    eqDataKeepStep(curButtonNo,7);
    DrawLine();
    curEqChannel = 7;
    showOrHideEqData();
}

function selectLpfMouseWheelSlopeRespond(ev){ //分频低通 斜率
    var selectElement = document.getElementById('text_lpf_slope');
    var index = selectElement.selectedIndex;
    index = mouseWheelSpinnerRespond(ev, index, 'text_lpf_slope');

    keepLinkOutLpfSlope(curButtonNo, index);
    if(controlsData.outputData.LPFData.HL_Type === 0){
        controlsData.outputData.LPFData.LR_Level = index;
    } else {
        controlsData.outputData.LPFData.HL_Oct = index;
    }
    //console.log('低通斜率改变 更新曲线');
    eqDataKeepStep(curButtonNo,8);
    DrawLine();
    curEqChannel = 8;
    showOrHideEqData();
}