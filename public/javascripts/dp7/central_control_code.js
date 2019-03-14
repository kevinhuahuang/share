//==============================================================================
// central control code
//==============================================================================
function initCentralControl(){
    var selector,i,option;

    selector=document.getElementById('select_device_id');
    for(i=1;i<251; i++){
        option = new Option(i+'', (i-1)+'');
        selector.options.add(option);
    }

    selector=document.getElementById('gain_step');
    for(i=1;i<6; i++){
        option = new Option(i+'dB', i+'');
        selector.options.add(option);
    }

    selector=document.getElementById('read_output_channel');
    for(i=1;i<9; i++){
        option = new Option('OUT'+i, (i-1)+'');
        selector.options.add(option);
    }


    selector=document.getElementById('input_gain_step');
    for(i=1;i<6; i++){
        option = new Option(i+'dB', i+'');
        selector.options.add(option);
    }


    selector=document.getElementById('read_input_channel');
    option = new Option('IN A', '0');
    selector.options.add(option);
    option = new Option('IN B', '1');
    selector.options.add(option);
    option = new Option('IN C', '2');
    selector.options.add(option);
    option = new Option('IN D', '3');
    selector.options.add(option);



    selector=document.getElementById('device_program_selector');
    for(i=1;i<31; i++){
        option = new Option(isChinese ? '设备程序' + i : 'Device Program ' + i, i + '');
        selector.options.add(option);
    }

    document.getElementById('output_write_copy').onclick = outputWriteCopyResponse;
    document.getElementById('output_read_copy').onclick = outputReadCopyResponse;
    document.getElementById('input_write_copy').onclick = inputWriteCopyResponse;
    document.getElementById('input_read_copy').onclick = inputReadCopyResponse;
    document.getElementById('system_copy').onclick = systemCopyResponse;
    document.getElementById('central_exit').onclick = centralExitClickResponse;

    setCentralElementEvent();

    initCentralDisplay();
}

function initCentralDisplay() {

}



function setCentralElementEvent(){
    //checkbox
    document.getElementById('check_out1').onclick = getOutputWriteCode;
    document.getElementById('check_out2').onclick = getOutputWriteCode;
    document.getElementById('check_out3').onclick = getOutputWriteCode;
    document.getElementById('check_out4').onclick = getOutputWriteCode;
    document.getElementById('check_out5').onclick = getOutputWriteCode;
    document.getElementById('check_out6').onclick = getOutputWriteCode;
    document.getElementById('check_out7').onclick = getOutputWriteCode;
    document.getElementById('check_out8').onclick = getOutputWriteCode;


    document.getElementById('matrix_cha').onclick = getOutputWriteCode;
    document.getElementById('matrix_chb').onclick = getOutputWriteCode;
    document.getElementById('matrix_chc').onclick = getOutputWriteCode;
    document.getElementById('matrix_chd').onclick = getOutputWriteCode;

    document.getElementById('check_input_a').onclick = getInputWriteCode;
    document.getElementById('check_input_b').onclick = getInputWriteCode;
    document.getElementById('check_input_c').onclick = getInputWriteCode;
    document.getElementById('check_input_d').onclick = getInputWriteCode;

    //Selector
    document.getElementById('select_device_id').onchange = idSelectorChangeResponse;
    document.getElementById('gain_step').onchange = getOutputWriteCode;
    document.getElementById('input_gain_step').onchange = getInputWriteCode;
    document.getElementById('read_output_channel').onchange = getOutputReadCode;
    document.getElementById('read_input_channel').onchange = getInputReadCode;
    document.getElementById('device_program_selector').onchange = getProgramCode;

    //Radio
    document.getElementById('output_mute_radio').onclick = function(){centralOutputRadioChangeResponse(1)};
    document.getElementById('output_no_mute_radio').onclick = function(){centralOutputRadioChangeResponse(2)};
    document.getElementById('output_gain_up_radio').onclick = function(){centralOutputRadioChangeResponse(3)};
    document.getElementById('output_gain_down_radio').onclick = function(){centralOutputRadioChangeResponse(4)};
    document.getElementById('output_gain_set_radio').onclick = function(){centralOutputRadioChangeResponse(5)};
    document.getElementById('output_matrix').onclick = function(){centralOutputRadioChangeResponse(6)};
    document.getElementById('read_output_mute_state').onclick = function(){centralOutputRadioChangeResponse(7)};
    document.getElementById('read_output_matrix').onclick = function(){centralOutputRadioChangeResponse(8)};
    document.getElementById('read_output_gain_value').onclick = function(){centralOutputRadioChangeResponse(9)};


    document.getElementById('input_mute_radio').onclick = function(){centralInputRadioChangeResponse(1)};
    document.getElementById('input_no_mute_radio').onclick = function(){centralInputRadioChangeResponse(2)};
    document.getElementById('input_gain_up_radio').onclick = function(){centralInputRadioChangeResponse(3)};
    document.getElementById('input_gain_down_radio').onclick = function(){centralInputRadioChangeResponse(4)};
    document.getElementById('input_gain_set_radio').onclick = function(){centralInputRadioChangeResponse(5)};
    document.getElementById('read_input_mute_state').onclick = function(){centralInputRadioChangeResponse(6)};
    document.getElementById('read_input_gain_value').onclick = function(){centralInputRadioChangeResponse(7)};

    document.getElementById('option_load').onclick = getProgramCode;
    document.getElementById('option_save').onclick = getProgramCode;


    //input_text

    setInputTypeOption(1);
    setOutputTypeOption(1);

    idSelectorChangeResponse();
}


var inputWriteCode, inputReadCode, outputWriteCode, outputReadCode, deviceProgramCode;
var header = 'B6 B6 ',tail = 'A9';
var outputWriteCodeType = 1, inputWriteCodeType = 1;
function centralInputRadioChangeResponse(index){
    switch(index){
        case 1://静音
            //frameType = '01 ';
            //functionType = '01 ';
            //param = '00 ';
            setInputTypeOption(1);
            getInputWriteCode();
            break;
        case 2://非静音
            //frameType = '01 ';
            //functionType = '01 ';
            //param = '01 ';
            setInputTypeOption(1);
            getInputWriteCode();
            break;
        case 3://音量加
            //frameType = '01 ';
            //functionType = '05 ';
            //param = '01';
            setInputTypeOption(2);
            getInputWriteCode();
            break;
        case 4://音量减
            //frameType = '01 ';
            //functionType = '06 ';
            //param = '01';
            setInputTypeOption(2);
            getInputWriteCode();
            break;
        case 5://音量设置
            //frameType = '01 ';
            //functionType = '04 ';
            //param = '01';
            setInputTypeOption(3);
            getInputWriteCode();
            break;
        case 6://读静音状态
            //frameType = '02 ';
            //functionType = '01 ';
            //param = '00 ';
            getInputReadCode();
            break;
        case 7://读音量
            //frameType = '02 ';
            //functionType = '04 ';
            //param = '00 ';
            getInputReadCode();
            break;
        default:
            break;
    }

}



function centralOutputRadioChangeResponse(index){
    switch(index){
        case 1: //静音
            //frameType = '01 ';
            //functionType = '01 ';
            //param = '00 ';
            setOutputTypeOption(1);
            getOutputWriteCode();
            break;
        case 2: //非静音
            //frameType = '01 ';
            //functionType = '01 ';
            //param = '01 ';
            setOutputTypeOption(1);
            getOutputWriteCode();
            break;
        case 3: //音量增加
            //frameType = '01 ';
            //functionType = '05 ';
            //param = '00';
            setOutputTypeOption(2);
            getOutputWriteCode();
            break;
        case 4: //音量减少
            //frameType = '01 ';
            //functionType = '06 ';
            //param = '00';
            setOutputTypeOption(2);
            getOutputWriteCode();
            break;
        case 5: //音量设置
            //frameType = '01 ';
            //functionType = '04 ';
            //param = '00';
            setOutputTypeOption(3);
            getOutputWriteCode();
            break;
        case 6: //输入源
            //frameType = '01 ';
            //functionType = '02 ';
            //param = '00';
            setOutputTypeOption(4);
            getOutputWriteCode();
            break;
        case 7: //读静音状态
            //frameType = '02 ';
            //functionType = '01 ';
            //param = '00 ';
            getOutputReadCode();
            break;
        case 8: //读输入源
            //frameType = '02 ';
            //functionType = '02 ';
            //param = '00 ';
            getOutputReadCode();
            break;
        case 9: //读音量
            //frameType = '02 ';
            //functionType = '04 ';
            //param = '00 ';
            getOutputReadCode();
            break;
        default:
            break;
    }

}

function setOutputTypeOption(index) {
    outputWriteCodeType = index;
    document.getElementById('mute_case').style.border = '1px solid black';
    document.getElementById('gain_case').style.border = '1px solid black';
    document.getElementById('gain_set_case').style.border = '1px solid black';
    document.getElementById('matrix_case').style.border = '1px solid black';

    document.getElementById('gain_step').disabled = 'true';
    document.getElementById('gain_setting').disabled = 'true';

    document.getElementById('matrix_cha').disabled = 'true';
    document.getElementById('matrix_chb').disabled = 'true';
    document.getElementById('matrix_chc').disabled = 'true';
    document.getElementById('matrix_chd').disabled = 'true';
    switch(index){
        case 1:
            document.getElementById('output_gain_up_radio').checked = '';
            document.getElementById('output_gain_down_radio').checked = '';
            document.getElementById('output_gain_set_radio').checked = '';
            document.getElementById('output_matrix').checked = '';
            document.getElementById('matrix_cha').checked = '';
            document.getElementById('matrix_chb').checked = '';
            document.getElementById('matrix_chc').checked = '';
            document.getElementById('matrix_chd').checked = '';
            document.getElementById('mute_case').style.border = '1px solid red';
            break;
        case 2:
            document.getElementById('output_mute_radio').checked = '';
            document.getElementById('output_no_mute_radio').checked = '';
            document.getElementById('output_gain_set_radio').checked = '';
            document.getElementById('output_matrix').checked = '';
            document.getElementById('matrix_cha').checked = '';
            document.getElementById('matrix_chb').checked = '';
            document.getElementById('matrix_chc').checked = '';
            document.getElementById('matrix_chd').checked = '';
            document.getElementById('gain_step').disabled = ''; //do not set = 'false', it not work
            document.getElementById('gain_case').style.border = '1px solid red';
            break;
        case 3:
            document.getElementById('output_mute_radio').checked = '';
            document.getElementById('output_no_mute_radio').checked = '';
            document.getElementById('output_gain_up_radio').checked = '';
            document.getElementById('output_gain_down_radio').checked = '';
            document.getElementById('output_matrix').checked = '';
            document.getElementById('gain_setting').disabled = '';
            document.getElementById('matrix_cha').checked = '';
            document.getElementById('matrix_chb').checked = '';
            document.getElementById('matrix_chc').checked = '';
            document.getElementById('matrix_chd').checked = '';
            document.getElementById('gain_set_case').style.border = '1px solid red';
            break;
        case 4:
            document.getElementById('output_mute_radio').checked = '';
            document.getElementById('output_no_mute_radio').checked = '';
            document.getElementById('output_gain_up_radio').checked = '';
            document.getElementById('output_gain_down_radio').checked = '';
            document.getElementById('output_gain_set_radio').checked = '';
            document.getElementById('matrix_cha').disabled = '';
            document.getElementById('matrix_chb').disabled = '';
            document.getElementById('matrix_chc').disabled = '';
            document.getElementById('matrix_chd').disabled = '';
            document.getElementById('matrix_case').style.border = '1px solid red';
            break;
        default:
            document.getElementById('output_gain_up_radio').checked = '';
            document.getElementById('output_gain_down_radio').checked = '';
            document.getElementById('output_gain_set_radio').checked = '';
            document.getElementById('output_matrix').checked = '';
            document.getElementById('matrix_cha').checked = '';
            document.getElementById('matrix_chb').checked = '';
            document.getElementById('matrix_chc').checked = '';
            document.getElementById('matrix_chd').checked = '';
            document.getElementById('mute_case').style.border = '1px solid red';
            break;
    }
}


function setInputTypeOption(index){
    document.getElementById('input_mute_case').style.border = '1px solid black';
    document.getElementById('input_gain_case').style.border = '1px solid black';
    document.getElementById('input_gain_set_case').style.border = '1px solid black';



    document.getElementById('input_gain_step').disabled = 'true';
    document.getElementById('input_gain_setting').disabled = 'true';

    inputWriteCodeType = index;
    switch(index){
        case 1:
            document.getElementById('input_gain_up_radio').checked = '';
            document.getElementById('input_gain_down_radio').checked = '';
            document.getElementById('input_gain_set_radio').checked = '';
            document.getElementById('input_mute_case').style.border = '1px solid red';
            break;
        case 2:
            document.getElementById('input_gain_step').disabled = '';
            document.getElementById('input_mute_radio').checked = '';
            document.getElementById('input_no_mute_radio').checked = '';
            document.getElementById('input_gain_set_radio').checked = '';
            document.getElementById('input_gain_case').style.border = '1px solid red';
            break;
        case 3:
            document.getElementById('input_gain_setting').disabled = '';
            document.getElementById('input_mute_radio').checked = '';
            document.getElementById('input_no_mute_radio').checked = '';
            document.getElementById('input_gain_up_radio').checked = '';
            document.getElementById('input_gain_down_radio').checked = '';
            document.getElementById('input_gain_set_case').style.border = '1px solid red';
            break;
        default:
            document.getElementById('input_gain_up_radio').checked = '';
            document.getElementById('input_gain_down_radio').checked = '';
            document.getElementById('input_gain_set_radio').checked = '';
            document.getElementById('input_mute_case').style.border = '1px solid red';
            break;
    }

}


function idSelectorChangeResponse(){
    getInputWriteCode();
    getInputReadCode();
    getOutputReadCode();
    getOutputWriteCode();
    getProgramCode();
}



function getOutputChannel(){
    var out1,out2,out3,out4,out5,out6,out7,out8,value;

    out1 = document.getElementById('check_out1').checked ? 1 : 0;
    out2 = document.getElementById('check_out2').checked ? 1 : 0;
    out3 = document.getElementById('check_out3').checked ? 1 : 0;
    out4 = document.getElementById('check_out4').checked ? 1 : 0;
    out5 = document.getElementById('check_out5').checked ? 1 : 0;
    out6 = document.getElementById('check_out6').checked ? 1 : 0;
    out7 = document.getElementById('check_out7').checked ? 1 : 0;
    out8 = document.getElementById('check_out8').checked ? 1 : 0;

    value = out1 + out2*2 + out3*4 + out4*8 + out5*16 + out6*32 + out7*64 + out8*128;
    value = parseInt(value).toString(16).toUpperCase() + ' ';
    value = value.length > 2 ? value : '0' + value;
    return value;
}


function getOutputMatrix(){
    var a,b,c,d,value;
    a = document.getElementById('matrix_cha').checked ? 1 : 0;
    b = document.getElementById('matrix_chb').checked ? 1 : 0;
    c = document.getElementById('matrix_chc').checked ? 1 : 0;
    d = document.getElementById('matrix_chd').checked ? 1 : 0;
    value = a + b*2+ c*4 + d*8;
    value = parseInt(value).toString(16).toUpperCase() + ' ';
    value = value.length > 2 ? value : '0'+value;
    //console.log('输入源：' + value);
    return value;


}


function getInputChannel(){
    var a,b,c,d,value;
    a = document.getElementById('check_input_a').checked ? 1 : 0;
    b = document.getElementById('check_input_b').checked ? 1 : 0;
    c = document.getElementById('check_input_c').checked ? 1 : 0;
    d = document.getElementById('check_input_d').checked ? 1 : 0;
    value = a + b*2+ c*4 + d*8;
    value = parseInt(value).toString(16).toUpperCase() + ' ';
    value = value.length > 2 ? value : '0'+ value;
    return value;


}

function outputWriteCopyResponse(){
    document.getElementById('output_write_code').focus();
    document.getElementById('output_write_code').select();
    document.execCommand('copy');
    //console.log(document.execCommand('copy'));
}

function outputReadCopyResponse(){
    document.getElementById('output_read_code').focus();
    document.getElementById('output_read_code').select();
    document.execCommand('copy');
    //console.log(document.execCommand('copy'));
}

function inputWriteCopyResponse(){
    document.getElementById('input_write_code').focus();
    document.getElementById('input_write_code').select();
    document.execCommand('copy');
    //console.log(document.execCommand('copy'));

}

function inputReadCopyResponse(){
    document.getElementById('input_read_code').focus();
    document.getElementById('input_read_code').select();
    document.execCommand('copy');
    //console.log(document.execCommand('copy'));
}

function systemCopyResponse(){
    document.getElementById('system_code').focus();
    document.getElementById('system_code').select();
    document.execCommand('copy');
    //console.log(document.execCommand('copy'));
}


function centralExitClickResponse(){
    curtainOption(0);

}


function getInputParam(functionType){
    var value;
    switch(parseInt(functionType)){
        case 1: //静音
            value =  value =  document.getElementById('input_mute_radio').checked ?  '00 ' : '01 ';
            break;
        case 4: //音量设置
            value =  (parseInt(document.getElementById('input_gain_setting').value) + 80).toString(16).toUpperCase().toUpperCase() + ' ';
            break;
        case 5: //音量增加
        case 6: //音量减
            value = parseInt(document.getElementById('input_gain_step').value).toString(16).toUpperCase() + ' ';
            break;
        default:
            break;
    }

    value = value.length > 2 ? value : '0' + value;
    return value;
}

function getOutputParam(functionType){
    var value;
    //console.log(functionType);
    switch(parseInt(functionType)){
        case 1: //静音
            value =  document.getElementById('output_mute_radio').checked ?  '00 ' : '01 ';
            break;
        case 2:
            value = getOutputMatrix();
            break;
        case 4: //音量设置
            value =  (parseInt(document.getElementById('gain_setting').value) + 80).toString(16).toUpperCase() + ' ';
            break;
        case 5: //音量增加
        case 6: //音量减
            value = parseInt(document.getElementById('gain_step').value).toString(16).toUpperCase() + ' ';
            break;
        default:
            break;
    }

    value = value.length > 2 ? value : '0' + value;
    return value;
}

function getInputWriteCodeFunctionType(){
    var functionType;

    switch (inputWriteCodeType){
        case 1://静音
            functionType = '01 ';
            break;
        case 2://音量增  音量减
            functionType = document.getElementById('input_gain_up_radio').checked ? '05 ' : '06 ';
            break;
        case 3://音量设置
            functionType = '04 ';
            break;
        default:
            functionType = '01 ';
            break;
    }
    return functionType;
}

function getOutputWriteCodeFunctionType(){
    var functionType;

    switch(outputWriteCodeType){
        case 1://静音
            functionType = '01 ';
            break;
        case 2://音量增  音量减
            functionType = document.getElementById('output_gain_up_radio').checked ? '05 ' : '06 ';
            break;
        case 3://音量设置
            functionType = '04 ';
            break;
        case 4://输入源
            functionType = '02 ';
            break;
        default:
            functionType = '01 ';
            break;

    }

    return functionType;
}

function getCentralDeviceId(){
    var value;
    value = parseInt(document.getElementById('select_device_id').value) + 1;
    value = value.toString(16).toUpperCase() + ' ';
    value = value.length > 2 ? value : '0' + value;
    return value;
}


function getInputWriteCode(){
    var frameType, deviceId, functionType, inputChannel, outputChannel, param;
    frameType = '01 ';
    deviceId = getCentralDeviceId();
    functionType = getInputWriteCodeFunctionType();
    inputChannel = getInputChannel();

    if(inputChannel <= 0){
        inputWriteCode = '请选择写入的输入通道';
        document.getElementById('input_write_code').value = inputWriteCode;
    }else{
        outputChannel = '00 ';
        param = getInputParam(functionType);
        inputWriteCode = header + deviceId +frameType + functionType + outputChannel + inputChannel + param + tail;

        document.getElementById('input_write_code').value = inputWriteCode;
    }
}


function getInputReadCode(){
    var frameType, deviceId, functionType, inputChannel, outputChannel, param;
    frameType = '02 ';
    deviceId = getCentralDeviceId();
    functionType  = document.getElementById('read_input_mute_state').checked ? '01 ' : '04 ';
    inputChannel = getInputReadChannel();
    outputChannel = '00 ';
    param = '00 ';
    inputReadCode = header + deviceId + frameType + functionType + outputChannel + inputChannel + param + tail;

    document.getElementById('input_read_code').value = inputReadCode;
}



function getOutputWriteCode(){
    var frameType, deviceId, functionType, inputChannel, outputChannel, param;
    frameType = '01 ';
    deviceId = getCentralDeviceId();
    functionType = getOutputWriteCodeFunctionType();
    outputChannel = getOutputChannel();
    if(outputChannel <= 0){
        outputWriteCode = '请选择写入数据的输出通道';
        document.getElementById('output_write_code').value = outputWriteCode;
    }else{
        inputChannel = '00 ';
        param = getOutputParam(functionType);
        outputWriteCode = header + deviceId + frameType + functionType + outputChannel + inputChannel + param + tail;

        document.getElementById('output_write_code').value = outputWriteCode;

    }



}


function getOutputReadCode(){
    var frameType, deviceId, functionType, inputChannel, outputChannel, param;
    frameType = '02 ';
    deviceId = getCentralDeviceId();
    functionType = getOutputReadCodeType();
    outputChannel = getOutputReadChannel();
    inputChannel = '00 ';
    param = '00 ';
    outputReadCode = header + deviceId + frameType + functionType + outputChannel + inputChannel + param + tail;

    document.getElementById('output_read_code').value = outputReadCode;

}


function getProgramCode(){
    var frameType, deviceId, functionType, inputChannel, outputChannel, param;
    frameType = '01 ';
    deviceId = getCentralDeviceId();
    inputChannel = '00 ';
    outputChannel = '00 ';
    functionType = document.getElementById('option_load').checked  ?  '03 ': '07 ';
    param = parseInt(document.getElementById('device_program_selector').value).toString(16).toUpperCase() + ' ';
    param = param.length > 2 ? param : '0'+param;
    deviceProgramCode = header + deviceId + frameType + functionType + outputChannel + inputChannel + param + tail;

    document.getElementById('system_code').value = deviceProgramCode;
}

function getOutputReadCodeType(){
    var elements,index,functionType;

    elements = document.getElementsByName('read_output_option');
    for(var i=0; i<elements.length; i++){
        if(elements[i].checked){
            index = i;
            break;
        }
    }

    switch (index){
        case 0:
            functionType = '01 ';
            break;
        case 1:
            functionType = '02 ';
            break;
        case 2:
            functionType = '04 ';
            break;
        default:
            break;
    }
    return functionType;

}


function getInputReadChannel() {
    var value;
    value = document.getElementById('read_input_channel').value;

    value = (Math.pow(2,value)).toString(16) + ' ';
    value = value.length > 2 ?  value : '0' + value;

    return value;
}


function getOutputReadChannel() {
    var value;
    value = document.getElementById('read_output_channel').value;

    //console.log(value);
    value = (Math.pow(2,value)).toString(16) + ' ';
    //console.log(value);
    value = value.length > 2 ?  value : '0' + value;

    return value;
}