

function setIndicateText(value){
    setControlText('button_curve_a', value[0]);
    setControlText('button_curve_b', value[0]);
    setControlText('button_curve_c', value[0]);
    setControlText('button_curve_d', value[0]);
    setControlText('button_curve_out1', value[0]);
    setControlText('button_curve_out2', value[0]);
    setControlText('button_curve_out3', value[0]);
    setControlText('button_curve_out4', value[0]);
    setControlText('button_curve_out5', value[0]);
    setControlText('button_curve_out6', value[0]);
    setControlText('button_curve_out7', value[0]);
    setControlText('button_curve_out8', value[0]);
    setControlText('indicate_text_noise_gate', value[1]);
    setControlText('indicate_text_noise_gate_value', value[2]);
    setControlText('indicate_text_delay', value[3]);
    setControlText('indicate_text_millisecond', value[4]);
    setControlText('indicate_text_meter', value[5]);
    setControlText('indicate_text_inch', value[6]);
    setControlText('indicate_text_phase', value[7]);
    setControlText('indicate_text_mode', value[8]);
    setControlText('indicate_text_frequency', value[9]);
    setControlText('indicate_text_bandwidth', value[10]);

    setControlText('indicate_text_slope', value[11]);
    setControlText('indicate_text_gain', value[12]);
    setControlText('button_phase_Curve_label', value[13]);
    //setControlText('indicate_text_dynamic', value[14]);

    setControlText('indicate_text_long_gain', value[18]);
    setControlText('indicate_text_program_name', value[19]);
    setControlText('indicate_text_program_no', value[20]);
    setControlText('indicate_text_device_id_ip', value[21]);

    // setControlText('button_list', value[21]);
    setControlText('indicate_text_auto_gain', value[22]);
    setControlText('indicate_text_threshold', value[23]);
    setControlText('indicate_text_level', value[24]);
    setControlText('indicate_text_ratio', value[25]);
    setControlText('indicate_text_attack', value[26]);
    setControlText('indicate_text_release', value[27]);
    setControlText('indicate_text_compress', value[28]);
    setControlText('indicate_text_compress_ratio', value[29]);
    //setControlText('indicate_text_dBu_compress', value[]);
    setControlText('indicate_text_attack_compress', value[26]);
    setControlText('indicate_text_release_compress', value[27]);
    setControlText('indicate_text_ms1', value[38]);
    setControlText('indicate_text_ms2', value[38]);
    setControlText('indicate_text_ms3', value[38]);
    setControlText('indicate_text_ms4', value[38]);
    setControlText('indicate_text_bu1', value[37]);
    setControlText('indicate_text_bu2', value[37]);
    setControlText('indicate_text_bu3', value[37]);
    setControlText('indicate_text_compress_level',value[39]);
    setControlText('indicate_text_ms1_out', value[38]);
    setControlText('indicate_text_ms2_out', value[38]);
    setControlText('indicate_text_ms3_out', value[38]);
    setControlText('indicate_text_ms4_out', value[38]);
    setControlText('indicate_text_bu1_out', value[37]);
    setControlText('indicate_text_bu2_out', value[37]);


    setControlText('button_help', value[30]);
    setControlText('button_program', value[31]);
    // setControlText('button_set', value[32]);
    setControlText('button_display', value[33]);
    setControlText('button_lock', value[34]);
    setControlText('button_report', value[35]);
    setControlText('button_language', value[32]);

}


function setDeqIndicateText(value) {
    setControlText('indicate_text_deq1', value[0]);
    setControlText('indicate_text_deq1_frequency', value[1]);
    setControlText('indicate_text_deq1_bandwidth', value[2]);
    setControlText('indicate_text_deq1_threshold', value[3]);
    setControlText('indicate_text_deq1_level', value[4]);
    setControlText('indicate_text_deq1_ratio', value[5]);
    setControlText('indicate_text_deq1_attack', value[6]);
    setControlText('indicate_text_deq1_release', value[7]);
}

function setControlText(id, value){
    var controlElement = document.getElementById(id);
    controlElement.innerText = value;
}
//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//Button



//==========================================================================================
//indicateText
