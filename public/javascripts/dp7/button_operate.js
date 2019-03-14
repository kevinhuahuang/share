
var  oldButtonNo=0,curButtonNo=0;

function addButtonClickListener(){

    setButtonValue();
    var buttonElement;
//==================================================================
//connect_button
    buttonElement = document.getElementById('button_connect');
    buttonElement.addEventListener('click', buttonConnectOnClick);

//select_button
    buttonElement = document.getElementById('button_input_a');
    buttonElement.addEventListener('click',buttonInputAOnclick);
    buttonElement = document.getElementById('button_input_b');
    buttonElement.addEventListener('click',buttonInputBOnclick);
    buttonElement = document.getElementById('button_input_c');
    buttonElement.addEventListener('click',buttonInputCOnclick);
    buttonElement = document.getElementById('button_input_d');
    buttonElement.addEventListener('click',buttonInputDOnclick);

    buttonElement = document.getElementById('button_out1');
    buttonElement.addEventListener('click', buttonOut1Onclick);
    buttonElement = document.getElementById('button_out2');
    buttonElement.addEventListener('click', buttonOut2Onclick);
    buttonElement = document.getElementById('button_out3');
    buttonElement.addEventListener('click', buttonOut3Onclick);
    buttonElement = document.getElementById('button_out4');
    buttonElement.addEventListener('click', buttonOut4Onclick);
    buttonElement = document.getElementById('button_out5');
    buttonElement.addEventListener('click', buttonOut5Onclick);
    buttonElement = document.getElementById('button_out6');
    buttonElement.addEventListener('click', buttonOut6Onclick);
    buttonElement = document.getElementById('button_out7');
    buttonElement.addEventListener('click', buttonOut7Onclick);
    buttonElement = document.getElementById('button_out8');
    buttonElement.addEventListener('click', buttonOut8Onclick);
//==================================================================
//source_button: A,B,C,D
    buttonElement = document.getElementById('button_out1_a');
    buttonElement.addEventListener('click', buttonSourceOut1AOnclick);
    buttonElement = document.getElementById('button_out1_b');
    buttonElement.addEventListener('click', buttonSourceOut1BOnclick);
    buttonElement = document.getElementById('button_out1_c');
    buttonElement.addEventListener('click', buttonSourceOut1COnclick);
    buttonElement = document.getElementById('button_out1_d');
    buttonElement.addEventListener('click', buttonSourceOut1DOnclick);
    buttonElement = document.getElementById('button_out2_a');
    buttonElement.addEventListener('click', buttonSourceOut2AOnclick);
    buttonElement = document.getElementById('button_out2_b');
    buttonElement.addEventListener('click', buttonSourceOut2BOnclick);
    buttonElement = document.getElementById('button_out2_c');
    buttonElement.addEventListener('click', buttonSourceOut2COnclick);
    buttonElement = document.getElementById('button_out2_d');
    buttonElement.addEventListener('click', buttonSourceOut2DOnclick);
    buttonElement = document.getElementById('button_out3_a');
    buttonElement.addEventListener('click', buttonSourceOut3AOnclick);
    buttonElement = document.getElementById('button_out3_b');
    buttonElement.addEventListener('click', buttonSourceOut3BOnclick);
    buttonElement = document.getElementById('button_out3_c');
    buttonElement.addEventListener('click', buttonSourceOut3COnclick);
    buttonElement = document.getElementById('button_out3_d');
    buttonElement.addEventListener('click', buttonSourceOut3DOnclick);
    buttonElement = document.getElementById('button_out4_a');
    buttonElement.addEventListener('click', buttonSourceOut4AOnclick);
    buttonElement = document.getElementById('button_out4_b');
    buttonElement.addEventListener('click', buttonSourceOut4BOnclick);
    buttonElement = document.getElementById('button_out4_c');
    buttonElement.addEventListener('click', buttonSourceOut4COnclick);
    buttonElement = document.getElementById('button_out4_d');
    buttonElement.addEventListener('click', buttonSourceOut4DOnclick);
    buttonElement = document.getElementById('button_out5_a');
    buttonElement.addEventListener('click', buttonSourceOut5AOnclick);
    buttonElement = document.getElementById('button_out5_b');
    buttonElement.addEventListener('click', buttonSourceOut5BOnclick);
    buttonElement = document.getElementById('button_out5_c');
    buttonElement.addEventListener('click', buttonSourceOut5COnclick);
    buttonElement = document.getElementById('button_out5_d');
    buttonElement.addEventListener('click', buttonSourceOut5DOnclick);
    buttonElement = document.getElementById('button_out6_a');
    buttonElement.addEventListener('click', buttonSourceOut6AOnclick);
    buttonElement = document.getElementById('button_out6_b');
    buttonElement.addEventListener('click', buttonSourceOut6BOnclick);
    buttonElement = document.getElementById('button_out6_c');
    buttonElement.addEventListener('click', buttonSourceOut6COnclick);
    buttonElement = document.getElementById('button_out6_d');
    buttonElement.addEventListener('click', buttonSourceOut6DOnclick);
    buttonElement = document.getElementById('button_out7_a');
    buttonElement.addEventListener('click', buttonSourceOut7AOnclick);
    buttonElement = document.getElementById('button_out7_b');
    buttonElement.addEventListener('click', buttonSourceOut7BOnclick);
    buttonElement = document.getElementById('button_out7_c');
    buttonElement.addEventListener('click', buttonSourceOut7COnclick);
    buttonElement = document.getElementById('button_out7_d');
    buttonElement.addEventListener('click', buttonSourceOut7DOnclick);
    buttonElement = document.getElementById('button_out8_a');
    buttonElement.addEventListener('click', buttonSourceOut8AOnclick);
    buttonElement = document.getElementById('button_out8_b');
    buttonElement.addEventListener('click', buttonSourceOut8BOnclick);
    buttonElement = document.getElementById('button_out8_c');
    buttonElement.addEventListener('click', buttonSourceOut8COnclick);
    buttonElement = document.getElementById('button_out8_d');
    buttonElement.addEventListener('click', buttonSourceOut8DOnclick);
//=======================================================================
//speaker_button
    buttonElement = document.getElementById('button_speaker_a');
    buttonElement.addEventListener('click', buttonSpeakerAOnclick);
    buttonElement = document.getElementById('button_speaker_b');
    buttonElement.addEventListener('click', buttonSpeakerBOnclick);
    buttonElement = document.getElementById('button_speaker_c');
    buttonElement.addEventListener('click', buttonSpeakerCOnclick);
    buttonElement = document.getElementById('button_speaker_d');
    buttonElement.addEventListener('click', buttonSpeakerDOnclick);

    buttonElement = document.getElementById('button_speaker_out1');
    buttonElement.addEventListener('click', buttonSpeakerOut1Onclick);
    buttonElement = document.getElementById('button_speaker_out2');
    buttonElement.addEventListener('click', buttonSpeakerOut2Onclick);
    buttonElement = document.getElementById('button_speaker_out3');
    buttonElement.addEventListener('click', buttonSpeakerOut3Onclick);
    buttonElement = document.getElementById('button_speaker_out4');
    buttonElement.addEventListener('click', buttonSpeakerOut4Onclick);
    buttonElement = document.getElementById('button_speaker_out5');
    buttonElement.addEventListener('click', buttonSpeakerOut5Onclick);
    buttonElement = document.getElementById('button_speaker_out6');
    buttonElement.addEventListener('click', buttonSpeakerOut6Onclick);
    buttonElement = document.getElementById('button_speaker_out7');
    buttonElement.addEventListener('click', buttonSpeakerOut7Onclick);
    buttonElement = document.getElementById('button_speaker_out8');
    buttonElement.addEventListener('click', buttonSpeakerOut8Onclick);
    //=======================================================================
//curve_button
    buttonElement = document.getElementById('button_curve_a');
    buttonElement.addEventListener('click', buttonCurveAOnclick);
    buttonElement = document.getElementById('button_curve_b');
    buttonElement.addEventListener('click', buttonCurveBOnclick);
    buttonElement = document.getElementById('button_curve_c');
    buttonElement.addEventListener('click', buttonCurveCOnclick);
    buttonElement = document.getElementById('button_curve_d');
    buttonElement.addEventListener('click', buttonCurveDOnclick);

    buttonElement = document.getElementById('button_curve_out1');
    buttonElement.addEventListener('click', buttonCurveOut1Onclick);
    buttonElement = document.getElementById('button_curve_out2');
    buttonElement.addEventListener('click', buttonCurveOut2Onclick);
    buttonElement = document.getElementById('button_curve_out3');
    buttonElement.addEventListener('click', buttonCurveOut3Onclick);
    buttonElement = document.getElementById('button_curve_out4');
    buttonElement.addEventListener('click', buttonCurveOut4Onclick);
    buttonElement = document.getElementById('button_curve_out5');
    buttonElement.addEventListener('click', buttonCurveOut5Onclick);
    buttonElement = document.getElementById('button_curve_out6');
    buttonElement.addEventListener('click', buttonCurveOut6Onclick);
    buttonElement = document.getElementById('button_curve_out7');
    buttonElement.addEventListener('click', buttonCurveOut7Onclick);
    buttonElement = document.getElementById('button_curve_out8');
    buttonElement.addEventListener('click', buttonCurveOut8Onclick);
    //=======================================================================
//button_eq
    buttonElement = document.getElementById('button_eq1');
    buttonElement.addEventListener('click', buttonEq1Onclick);
    buttonElement = document.getElementById('button_eq2');
    buttonElement.addEventListener('click', buttonEq2Onclick);
    buttonElement = document.getElementById('button_eq3');
    buttonElement.addEventListener('click', buttonEq3Onclick);
    buttonElement = document.getElementById('button_eq4');
    buttonElement.addEventListener('click', buttonEq4Onclick);
    buttonElement = document.getElementById('button_eq5');
    buttonElement.addEventListener('click', buttonEq5Onclick);
    buttonElement = document.getElementById('button_eq6');
    buttonElement.addEventListener('click', buttonEq6Onclick);
    buttonElement = document.getElementById('button_eq');
    buttonElement.addEventListener('click', buttonEqTotalOnclick);
    //=======================================================================
//button_phase
    buttonElement = document.getElementById('button_phase');
    buttonElement.addEventListener('click', buttonPhaseOnclick);

    buttonElement = document.getElementById('button_phase_out');
    buttonElement.addEventListener('click', buttonPhaseOutOnclick);
    //button_phase_curve
    buttonElement = document.getElementById('button_phase_curve');
    buttonElement.addEventListener('click', buttonPhaseCurveOnclick);

    buttonElement = document.getElementById("button_connect");
    buttonElement.addEventListener('mouseover',buttonConnectOnHover);
    buttonElement.addEventListener('mouseout',buttonConnectOnMouseOut);

    //===============================================================
    buttonElement = document.getElementById('button_help');
    buttonElement.addEventListener('click', buttonHelpOnclick);

    buttonElement = document.getElementById('button_program');
    buttonElement.addEventListener('click', buttonProgramOnclick);

    // buttonElement = document.getElementById('button_set');
    // buttonElement.addEventListener('click',buttonSetOnclick);

    buttonElement = document.getElementById('button_display');
    buttonElement.addEventListener('click', buttonDisplayOnclick);

    buttonElement = document.getElementById('button_lock');
    buttonElement.addEventListener('click', buttonLockOnclick);

    buttonElement = document.getElementById('button_report');
    buttonElement.addEventListener('click', buttonReportOnclick);

    buttonElement = document.getElementById('button_language');
    buttonElement.addEventListener('click', buttonLanguageOnclick);
}


function setButtonValue() {
    setElementLanguageValue('button_connect', '未连接', 'NOT CONNECTED','21','12');
}


function buttonConnectOnClick(){
    var buttonElement = document.getElementById("button_connect");
    if(isConnect) {
        buttonElement.setAttribute('class', 'button_connect_true');
        setElementLanguageValue('button_connect', '未连接', 'NOT CONNECTED','21','12');
        isConnect = false;
        stopAjaxTimer();
        var connectContent = document.getElementById("connect_progress_content");
        connectContent.setAttribute("width",'0');
        connectContent.style.width = '0';
    } else {
        // if(!getDeviceIp()) {
        //     alert(isChinese ? 'ip地址不正确' : 'wrong ip address');
        //     return;
        // }
        buttonElement.setAttribute('class', 'button_connect_false');
        setElementLanguageValue('button_connect', '连接中', 'CONNECTING','21','16');
        isConnect = true;
        connectDevice();
    }
}

function disconnectCommunicate() {
    stopAjaxTimer();
    var buttonElement = document.getElementById("button_connect");
    buttonElement.setAttribute('class', 'button_connect_true');
    setElementLanguageValue('button_connect', '未连接', 'NOT CONNECTED','21','12');
    isConnect = false;
    dataForSendArray.length = 0;
    var connectContent = document.getElementById("connect_progress_content");
    connectContent.setAttribute("width",'0');
    connectContent.style.width = '0';
    alert(isChinese ? '连接设备失败' : 'fail to connect device');
    enableMainCurtain()
}


function buttonConnectOnHover(){
    if(isConnect) {
        setElementLanguageValue('button_connect', '断开', 'DISCONNECT', '21', '16');
   } else {
        setElementLanguageValue('button_connect', '连接', 'CONNECT', '21', '16');
    }
}


function buttonConnectOnMouseOut(){
    if(isConnect) {
        setElementLanguageValue('button_connect', '连接中', 'CONNECTING', '21', '16');
    } else {
        setElementLanguageValue('button_connect', '未连接', 'NOT CONNECTED', '21', '12');
    }
}

function inputEqBeLocked(){
    var i;
    for(i=0; i<8; i++){
        svgDrawCurve.eqChannelTextElement[i].setAttribute('visibility','hidden');
        svgDrawCurve.eqLRectElement[i].setAttribute('visibility','hidden');
        svgDrawCurve.eqRRectElement[i].setAttribute('visibility','hidden');
        svgDrawCurve.eqDataTextElement[i].setAttribute('visibility', 'hidden');
        svgDrawCurve.eqDataTextElement1[i].setAttribute('visibility', 'hidden');
    }

    for (i = 0; i < 4; i++) {
        if (document.getElementById(svgDrawCurve.inputCurveLineID[i])) {
            // console.log("old:" + i + "  Instance: " + document.getElementById(this.inputCurveLineID[i]));
            // curve_svg.removeChild(svgDrawCurve.lineInputElement[i]);
            svgDrawCurve.lineInputElement[i].setAttribute('visibility', 'hidden');
        }
    }

    //console.log(m_nCurOut_EQLine);
    for (i = 0; i < 8; i++) {
        if (m_nLinkOut_EQLine[i] || m_nCurOut_EQLine[i]) {
            if (document.getElementById(svgDrawCurve.outCurveLineID[i])) {
                //this.drawCurveLine(i+5, m_nCurOut_EQLine[i].m_nPointF);
                // console.log('not remove out_line: ' + i);
            }
        } else {
            if (document.getElementById(svgDrawCurve.outCurveLineID[i])) {
                // curve_svg.removeChild(svgDrawCurve.lineOutElement[i]);
                svgDrawCurve.lineOutElement[i].setAttribute('visibility', 'hidden');
                console.log('remove out_line: ' + i);
            } else {
                // console.log('out_line is not exit: ' + i);
            }
        }
    }
    document.getElementById('slider_eq1_thump').style.display = 'none';
    document.getElementById('slider_eq2_thump').style.display = 'none';
    document.getElementById('slider_eq3_thump').style.display = 'none';
    document.getElementById('slider_eq4_thump').style.display = 'none';
    document.getElementById('slider_eq5_thump').style.display = 'none';
    document.getElementById('slider_eq6_thump').style.display = 'none';
    document.getElementById('slider_eq1_thump_lock').style.display = 'inline';
    document.getElementById('slider_eq2_thump_lock').style.display = 'inline';
    document.getElementById('slider_eq3_thump_lock').style.display = 'inline';
    document.getElementById('slider_eq4_thump_lock').style.display = 'inline';
    document.getElementById('slider_eq5_thump_lock').style.display = 'inline';
    document.getElementById('slider_eq6_thump_lock').style.display = 'inline';

    svgDrawCurve.linePhaseElement.setAttribute('visibility','hidden');
}

function inputEqUnlock(){
    for(var i=0; i<6; i++){
        svgDrawCurve.eqChannelTextElement[i].setAttribute('visibility','visible');
    }
    svgDrawCurve.eqChannelTextElement[6].setAttribute('visibility','hidden');
    svgDrawCurve.eqChannelTextElement[7].setAttribute('visibility','hidden');

    document.getElementById('slider_eq1_thump').style.display = 'inline';
    document.getElementById('slider_eq2_thump').style.display = 'inline';
    document.getElementById('slider_eq3_thump').style.display = 'inline';
    document.getElementById('slider_eq4_thump').style.display = 'inline';
    document.getElementById('slider_eq5_thump').style.display = 'inline';
    document.getElementById('slider_eq6_thump').style.display = 'inline';
    document.getElementById('slider_eq1_thump_lock').style.display = 'none';
    document.getElementById('slider_eq2_thump_lock').style.display = 'none';
    document.getElementById('slider_eq3_thump_lock').style.display = 'none';
    document.getElementById('slider_eq4_thump_lock').style.display = 'none';
    document.getElementById('slider_eq5_thump_lock').style.display = 'none';
    document.getElementById('slider_eq6_thump_lock').style.display = 'none';

    // svgDrawCurve.linePhaseElement.setAttribute('visibility','hidden');
}

function inputCompAgBeLocked() {
    svgDrawInput.circle_agc.setAttribute('visibility','hidden');
    svgDrawInput.circle_target.setAttribute('visibility','hidden');
    svgDrawInput.circle_comp.setAttribute('visibility','hidden');
    svgDrawInput.circle_agc_ratio.setAttribute('visibility','hidden');
    svgDrawInput.circle_comp_ratio.setAttribute('visibility','hidden');
    svgDrawInput.line_agc_origin.setAttribute('visibility','hidden');
    svgDrawInput.line_agc_ratio.setAttribute('visibility','hidden');
    svgDrawInput.line_target_ratio.setAttribute('visibility','hidden');
    svgDrawInput.line_target_comp.setAttribute('visibility','hidden');
    // svgDrawInput.line_comp_ratio.setAttribute('visibility','hidden');
}


function inputCompAgUnlock() {
    svgDrawInput.circle_agc.setAttribute('visibility','visible');
    svgDrawInput.circle_target.setAttribute('visibility','visible');
    svgDrawInput.circle_comp.setAttribute('visibility','visible');
    svgDrawInput.circle_agc_ratio.setAttribute('visibility','visible');
    svgDrawInput.circle_comp_ratio.setAttribute('visibility','visible');
    svgDrawInput.line_agc_origin.setAttribute('visibility','visible');
    svgDrawInput.line_agc_ratio.setAttribute('visibility','visible');
    svgDrawInput.line_target_ratio.setAttribute('visibility','visible');
    svgDrawInput.line_target_comp.setAttribute('visibility','visible');
    svgDrawInput.line_comp_ratio.setAttribute('visibility','visible');
}


function outputEqBeLock(){
    var i;
    for(i=0; i<6; i++) {
        svgDrawCurve.eqChannelTextElement[i].setAttribute('visibility', 'hidden');
        svgDrawCurve.eqLRectElement[i].setAttribute('visibility', 'hidden');
        svgDrawCurve.eqRRectElement[i].setAttribute('visibility', 'hidden');
        svgDrawCurve.eqDataTextElement[i].setAttribute('visibility', 'hidden');
        svgDrawCurve.eqDataTextElement1[i].setAttribute('visibility', 'hidden');
    }

    document.getElementById('slider_eq1_thump').style.display = 'none';
    document.getElementById('slider_eq2_thump').style.display = 'none';
    document.getElementById('slider_eq3_thump').style.display = 'none';
    document.getElementById('slider_eq4_thump').style.display = 'none';
    document.getElementById('slider_eq5_thump').style.display = 'none';
    document.getElementById('slider_eq6_thump').style.display = 'none';
    document.getElementById('slider_eq1_thump_lock').style.display = 'inline';
    document.getElementById('slider_eq2_thump_lock').style.display = 'inline';
    document.getElementById('slider_eq3_thump_lock').style.display = 'inline';
    document.getElementById('slider_eq4_thump_lock').style.display = 'inline';
    document.getElementById('slider_eq5_thump_lock').style.display = 'inline';
    document.getElementById('slider_eq6_thump_lock').style.display = 'inline';
}


function outPutEqUnlock(){
    for(var i=0; i<6;i++){
        svgDrawCurve.eqChannelTextElement[i].setAttribute('visibility','visible');
    }

    document.getElementById('slider_eq1_thump').style.display = 'inline';
    document.getElementById('slider_eq2_thump').style.display = 'inline';
    document.getElementById('slider_eq3_thump').style.display = 'inline';
    document.getElementById('slider_eq4_thump').style.display = 'inline';
    document.getElementById('slider_eq5_thump').style.display = 'inline';
    document.getElementById('slider_eq6_thump').style.display = 'inline';
    document.getElementById('slider_eq1_thump_lock').style.display = 'none';
    document.getElementById('slider_eq2_thump_lock').style.display = 'none';
    document.getElementById('slider_eq3_thump_lock').style.display = 'none';
    document.getElementById('slider_eq4_thump_lock').style.display = 'none';
    document.getElementById('slider_eq5_thump_lock').style.display = 'none';
    document.getElementById('slider_eq6_thump_lock').style.display = 'none';

}


function outputCurveLineBelock() {
    var i;
    for (i = 0; i < 4; i++) {
        if (m_nLinkIn_EQLine[i] || m_nCurIn_EQLine[i]) {
            if (document.getElementById(svgDrawCurve.inputCurveLineID[i])) {
                //this.drawCurveLine(i+5, m_nCurOut_EQLine[i].m_nPointF);
                // console.log('not remove in_line: ' + i);
            }
        } else {
            if (document.getElementById(svgDrawCurve.inputCurveLineID[i])) {
                // curve_svg.removeChild(svgDrawCurve.lineInputElement[i]);
                // console.log('remove in_line: ' + i);
                svgDrawCurve.lineInputElement[i].setAttribute('visibility', 'hidden'); //not work, draw line will let them display again
            } else {
                // console.log('in_line is not exit: ' + i);
            }
        }
    }

    for (i = 0; i < 8; i++) {
        if (document.getElementById(svgDrawCurve.outCurveLineID[i])) {
            // console.log("old:" + i + "  Instance: " + document.getElementById(this.inputCurveLineID[i]));
            // curve_svg.removeChild(svgDrawCurve.lineOutElement[i]);
            // console.log('hidden out line : ' + i);
            svgDrawCurve.lineOutElement[i].setAttribute('visibility', 'hidden');  //not work, draw line will let them display again
        }
    }

    svgDrawCurve.linePhaseElement.setAttribute('visibility','hidden');
}


function outputCurveLineUnlock() {

}




function outputCompLimtLocked() {
    svgDrawOut.circle_level.setAttribute('visibility','hidden');
    svgDrawOut.circle_limit.setAttribute('visibility','hidden');
    svgDrawOut.circle_ratio.setAttribute('visibility','hidden');
    svgDrawOut.line_level_start.setAttribute('visibility','visible');
    svgDrawOut.line_level_end.setAttribute('visibility','hidden');
    svgDrawOut.line_ratio.setAttribute('visibility','hidden');
    svgDrawOut.line_limit.setAttribute('visibility','hidden');
    svgDrawOut.polyline_ratio.setAttribute('visibility','hidden');

}

function outputCompLimtUnlock() {
    svgDrawOut.circle_level.setAttribute('visibility','visible');
    svgDrawOut.circle_limit.setAttribute('visibility','visible');
    svgDrawOut.circle_ratio.setAttribute('visibility','visible');
    svgDrawOut.line_level_start.setAttribute('visibility','visible');
    svgDrawOut.line_level_end.setAttribute('visibility','visible');
    svgDrawOut.line_ratio.setAttribute('visibility','visible');
    svgDrawOut.line_limit.setAttribute('visibility','visible');
    svgDrawOut.polyline_ratio.setAttribute('visibility','visible');
}

function outputXoverLocked() {
    svgDrawCurve.eqChannelTextElement[6].setAttribute('visibility','hidden');
    svgDrawCurve.eqChannelTextElement[7].setAttribute('visibility','hidden');
}

function outputXoverUnlock() {
    svgDrawCurve.eqChannelTextElement[6].setAttribute('visibility','visible');
    svgDrawCurve.eqChannelTextElement[7].setAttribute('visibility','visible');
}



function resetButtonCurveStatus(){ //所有曲线按钮复位为false
    for(var i=0; i<controlsData.buttonStates.buttonCurveStatus.length;i++){
        controlsData.buttonStates.buttonCurveStatus[i] = false;
    }

}


function buttonInputAOnclick(){ //输入A
    oldButtonNo = curButtonNo;
    curButtonNo = 1;
    upDateButtonStatus();
    assignChannelData(constConfig.CURRENT_CHANNGEL_INPUT_A);
    selectButtonOnclick(controlsId.BUTTON_INPUT_A);
    inputOrOutputModule(true);
    hideHLPFChannelName();
    agcExtMap.SetInData(0);
    lockDisplay.refreshInputLockDisplay();
    if(currentLockData.nIn_LockData.nIn_EQ){
        svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        inputEqBeLocked();
        DrawLine();
        // console.log('输入均衡锁定');
    }else {
        if(curEqChannel > 6) {
            curEqChannel = 1;
        }
        showOrHideEqData();
        inputEqUnlock();
        DrawLine();
    }

    resetButtonCurveStatus();
    controlsData.buttonStates.buttonCurveStatus[0] = true;
    assignButtonCurveStatus();

    setCurPhaseCurveStatus();
    setPhaseDirectionStatus();
    updateDeqButton();

}


function buttonInputBOnclick(){ //输入B
    oldButtonNo = curButtonNo;
    curButtonNo = 2;
    upDateButtonStatus();
    selectButtonOnclick(controlsId.BUTTON_INPUT_B);
    assignChannelData(constConfig.CURRENT_CHANNGEL_INPUT_B);
    inputOrOutputModule(true);
    hideHLPFChannelName();
    agcExtMap.SetInData(1);
    lockDisplay.refreshInputLockDisplay();
    if(currentLockData.nIn_LockData.nIn_EQ){
        svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        inputEqBeLocked();
        DrawLine();
    }else {
        showOrHideEqData();
        //curEqChannel = 1;
        inputEqUnlock();
        DrawLine();
    }

    resetButtonCurveStatus();
    controlsData.buttonStates.buttonCurveStatus[1] = true;
    assignButtonCurveStatus();

    setCurPhaseCurveStatus();
    setPhaseDirectionStatus();
    updateDeqButton();

}


function buttonInputCOnclick(){ //输入C
    oldButtonNo = curButtonNo;
    curButtonNo = 3;
    upDateButtonStatus();
    selectButtonOnclick(controlsId.BUTTON_INPUT_C);
    assignChannelData(constConfig.CURRENT_CHANNGEL_INPUT_C);
    inputOrOutputModule(true);
    hideHLPFChannelName();
    agcExtMap.SetInData(2);
    lockDisplay.refreshInputLockDisplay();
    if(currentLockData.nIn_LockData.nIn_EQ){
        svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        inputEqBeLocked();
        DrawLine();
    }else {
        showOrHideEqData();
        //curEqChannel = 1;
        inputEqUnlock();
        DrawLine();
    }

    resetButtonCurveStatus();
    controlsData.buttonStates.buttonCurveStatus[2] = true;
    assignButtonCurveStatus();

    setCurPhaseCurveStatus();
    setPhaseDirectionStatus();
    updateDeqButton();
}

function buttonInputDOnclick(){ //输入D
    oldButtonNo = curButtonNo;
    curButtonNo = 4;
    upDateButtonStatus();
    selectButtonOnclick(controlsId.BUTTON_INPUT_D);
    assignChannelData(constConfig.CURRENT_CHANNGEL_INPUT_D);
    inputOrOutputModule(true);
    hideHLPFChannelName();
    agcExtMap.SetInData(3);
    lockDisplay.refreshInputLockDisplay();
    if(currentLockData.nIn_LockData.nIn_EQ){
        svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        inputEqBeLocked();
        DrawLine();
    }else {
        showOrHideEqData();
        //curEqChannel = 1;
        inputEqUnlock();
        DrawLine();
    }

    resetButtonCurveStatus();
    controlsData.buttonStates.buttonCurveStatus[3] = true;
    assignButtonCurveStatus();

    setCurPhaseCurveStatus();
    setPhaseDirectionStatus();
    updateDeqButton();
}

//=============================================================================
function buttonOut1Onclick(){ //输出1
    oldButtonNo = curButtonNo;
    curButtonNo = 5;
    upDateButtonStatus();
    selectButtonOnclick(controlsId.BUTTON_OUT1);
    assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_1);
    inputOrOutputModule(false);

    showHLPFChannelName();
    comExtMap.SetOutComp_LimT(0);
    lockDisplay.refreshOutLockDisplay();
    if(currentLockData.nOut_LockData.nOut_EQ){
        svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        outputEqBeLock();
        DrawLine();
    }else {
        showOrHideEqData();
        //curEqChannel = 1;
        outPutEqUnlock();
        DrawLine();
    }


    resetButtonCurveStatus();
    controlsData.buttonStates.buttonCurveStatus[4] = true;
    assignButtonCurveStatus();

    setCurPhaseCurveStatus();
    setPhaseOutDirectionStatus();
}

function buttonOut2Onclick(){ //输出2
    oldButtonNo = curButtonNo;
    curButtonNo = 6;
    upDateButtonStatus();
    selectButtonOnclick(controlsId.BUTTON_OUT2);
    assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_2);
    inputOrOutputModule(false);

    showHLPFChannelName();
    comExtMap.SetOutComp_LimT(1);
    lockDisplay.refreshOutLockDisplay();
    if(currentLockData.nOut_LockData.nOut_EQ){
        svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        outputEqBeLock();
        DrawLine();
    }else {
        showOrHideEqData();
        //curEqChannel = 1;
        outPutEqUnlock();
        DrawLine();
    }
    resetButtonCurveStatus();
    controlsData.buttonStates.buttonCurveStatus[5] = true;
    assignButtonCurveStatus();

    setCurPhaseCurveStatus();
    setPhaseOutDirectionStatus();

}

function buttonOut3Onclick(){ //输出3
    oldButtonNo = curButtonNo;
    curButtonNo = 7;
    upDateButtonStatus();
    selectButtonOnclick(controlsId.BUTTON_OUT3);
    assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_3);
    inputOrOutputModule(false);

    showHLPFChannelName();
    comExtMap.SetOutComp_LimT(2);
    lockDisplay.refreshOutLockDisplay();
    if(currentLockData.nOut_LockData.nOut_EQ){
        svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        outputEqBeLock();
        DrawLine();
    }else {
        showOrHideEqData();
        //curEqChannel = 1;
        outPutEqUnlock();
        DrawLine();
    }

    resetButtonCurveStatus();
    controlsData.buttonStates.buttonCurveStatus[6] = true;
    assignButtonCurveStatus();

    setCurPhaseCurveStatus();
    setPhaseOutDirectionStatus();


}

function buttonOut4Onclick(){ //输出4
    oldButtonNo = curButtonNo;
    curButtonNo = 8;
    upDateButtonStatus();
    selectButtonOnclick(controlsId.BUTTON_OUT4);
    assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_4);
    inputOrOutputModule(false);

    showHLPFChannelName();
    comExtMap.SetOutComp_LimT(3);
    lockDisplay.refreshOutLockDisplay();
    if(currentLockData.nOut_LockData.nOut_EQ){
        svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        outputEqBeLock();
        DrawLine();
    }else {
        showOrHideEqData();
        //curEqChannel = 1;
        outPutEqUnlock();
        DrawLine();
    }

    resetButtonCurveStatus();
    controlsData.buttonStates.buttonCurveStatus[7] = true;
    assignButtonCurveStatus();

    setCurPhaseCurveStatus();
    setPhaseOutDirectionStatus();


}

function buttonOut5Onclick(){ //输出5
    oldButtonNo = curButtonNo;
    curButtonNo = 9;
    upDateButtonStatus();
    selectButtonOnclick(controlsId.BUTTON_OUT5);
    assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_5);
    inputOrOutputModule(false);

    showHLPFChannelName();
    comExtMap.SetOutComp_LimT(4);
    lockDisplay.refreshOutLockDisplay();
    if(currentLockData.nOut_LockData.nOut_EQ){
        svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        outputEqBeLock();
        DrawLine();
    }else {
        showOrHideEqData();
        //curEqChannel = 1;
        outPutEqUnlock();
        DrawLine();
    }

    resetButtonCurveStatus();
    controlsData.buttonStates.buttonCurveStatus[8] = true;
    assignButtonCurveStatus();

    setCurPhaseCurveStatus();
    setPhaseOutDirectionStatus();


}

function buttonOut6Onclick(){ //输出6
    oldButtonNo = curButtonNo;
    curButtonNo = 10;
    upDateButtonStatus();
    selectButtonOnclick(controlsId.BUTTON_OUT6);
    assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_6);
    inputOrOutputModule(false);

    showHLPFChannelName();
    comExtMap.SetOutComp_LimT(5);
    lockDisplay.refreshOutLockDisplay();
    if(currentLockData.nOut_LockData.nOut_EQ){
        svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        outputEqBeLock();
        DrawLine();
    }else {
        showOrHideEqData();
        //curEqChannel = 1;
        outPutEqUnlock();
        DrawLine();
    }

    resetButtonCurveStatus();
    controlsData.buttonStates.buttonCurveStatus[9] = true;
    assignButtonCurveStatus();

    setCurPhaseCurveStatus();
    setPhaseOutDirectionStatus();


}

function buttonOut7Onclick(){ //输出7
    oldButtonNo = curButtonNo;
    curButtonNo = 11;
    upDateButtonStatus();
    selectButtonOnclick(controlsId.BUTTON_OUT7);
    assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_7);
    inputOrOutputModule(false);

    showHLPFChannelName();
    comExtMap.SetOutComp_LimT(6);
    lockDisplay.refreshOutLockDisplay();
    if(currentLockData.nOut_LockData.nOut_EQ){
        svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        outputEqBeLock();
        DrawLine();
    }else {
        showOrHideEqData();
        //curEqChannel = 1;
        outPutEqUnlock();
        DrawLine();
    }

    resetButtonCurveStatus();
    controlsData.buttonStates.buttonCurveStatus[10] = true;
    assignButtonCurveStatus();


    setCurPhaseCurveStatus();
    setPhaseOutDirectionStatus();

}

function buttonOut8Onclick(){ //输出8
    oldButtonNo = curButtonNo;
    curButtonNo = 12;
    upDateButtonStatus();
    selectButtonOnclick(controlsId.BUTTON_OUT8);
    assignChannelData(constConfig.CURRENT_CHANNGEL_OUT_8);
    inputOrOutputModule(false);

    showHLPFChannelName();
    comExtMap.SetOutComp_LimT(7);
    lockDisplay.refreshOutLockDisplay();
    if(currentLockData.nOut_LockData.nOut_EQ){
        svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        outputEqBeLock();
        DrawLine();
    }else {
        showOrHideEqData();
        // curEqChannel = 1;
        outPutEqUnlock();
        DrawLine();
    }


    resetButtonCurveStatus();
    controlsData.buttonStates.buttonCurveStatus[11] = true;
    assignButtonCurveStatus();

    setCurPhaseCurveStatus();
    setPhaseOutDirectionStatus();
}


//=============================================================================
function upDateButtonStatus(){ //关闭旧的通道灯（白色）
    var buttonId;

    if(oldButtonNo===1){//do not use switch, it will cause other sentence does not work
        controlsData.buttonStates.buttonSelectStatus[0] = true;
        buttonId = document.getElementById('button_input_a');
        buttonId.setAttribute('class', 'button_four_states_true');

        document.getElementById('input_a').style.background = '#B2B2B2';
    }else if(oldButtonNo===2){
        controlsData.buttonStates.buttonSelectStatus[1] = true;
        buttonId = document.getElementById('button_input_b');
        buttonId.setAttribute('class', 'button_four_states_true');

        document.getElementById('input_b').style.background = '#B2B2B2';
    }else if(oldButtonNo===3){
        controlsData.buttonStates.buttonSelectStatus[2] = true;
        buttonId = document.getElementById('button_input_c');
        buttonId.setAttribute('class', 'button_four_states_true');

        document.getElementById('input_c').style.background = '#B2B2B2';
    }else if(oldButtonNo===4){
        controlsData.buttonStates.buttonSelectStatus[3] = true;
        buttonId = document.getElementById('button_input_d');
        buttonId.setAttribute('class', 'button_four_states_true');

        document.getElementById('input_d').style.background = '#B2B2B2';
    }else if(oldButtonNo===5){
        controlsData.buttonStates.buttonSelectStatus[4] = true;
        buttonId = document.getElementById('button_out1');
        buttonId.setAttribute('class', 'button_four_states_true');

        document.getElementById('out_1').style.background = '#B2B2B2';
    }else if(oldButtonNo===6){
        controlsData.buttonStates.buttonSelectStatus[5] = true;
        buttonId = document.getElementById('button_out2');
        buttonId.setAttribute('class', 'button_four_states_true');

        document.getElementById('out_2').style.background = '#B2B2B2';
    }else if(oldButtonNo===7){
        controlsData.buttonStates.buttonSelectStatus[6] = true;
        buttonId = document.getElementById('button_out3');
        buttonId.setAttribute('class', 'button_four_states_true');


        document.getElementById('out_3').style.background = '#B2B2B2';
    }else if(oldButtonNo===8){
        controlsData.buttonStates.buttonSelectStatus[7] = true;
        buttonId = document.getElementById('button_out4');
        buttonId.setAttribute('class', 'button_four_states_true');

        document.getElementById('out_4').style.background = '#B2B2B2';
    }else if(oldButtonNo===9){
        controlsData.buttonStates.buttonSelectStatus[8] = true;
        buttonId = document.getElementById('button_out5');
        buttonId.setAttribute('class', 'button_four_states_true');

        document.getElementById('out_5').style.background = '#B2B2B2';
    }else if(oldButtonNo===10){
        controlsData.buttonStates.buttonSelectStatus[9] = true;
        buttonId = document.getElementById('button_out6');
        buttonId.setAttribute('class', 'button_four_states_true');

        document.getElementById('out_6').style.background = '#B2B2B2';
    }else if(oldButtonNo===11){
        controlsData.buttonStates.buttonSelectStatus[10] = true;
        buttonId = document.getElementById('button_out7');
        buttonId.setAttribute('class', 'button_four_states_true');

        document.getElementById('out_7').style.background = '#B2B2B2';
    }else if(oldButtonNo===12){
        controlsData.buttonStates.buttonSelectStatus[11] = true;
        buttonId = document.getElementById('button_out8');
        buttonId.setAttribute('class', 'button_four_states_true');

        document.getElementById('out_8').style.background = '#B2B2B2';
    }
}



//========================================================================================
function selectButtonOnclick (id){ //点亮当前通道灯（红色）
    var buttonElement;
    switch (id){
        case controlsId.BUTTON_INPUT_A:
            buttonElement = document.getElementById('button_input_a');
            if (controlsData.buttonStates.buttonSelectStatus[0]){
                controlsData.buttonStates.buttonSelectStatus[0] = false;
                buttonElement.setAttribute('class', 'button_four_states_false');

                document.getElementById('input_a').style.background= '#ffffff';
            }else {
                controlsData.buttonStates.buttonSelectStatus[0] = true;
                buttonElement.setAttribute('class', 'button_four_states_true');
            }
            break;
        case controlsId.BUTTON_INPUT_B:
            buttonElement = document.getElementById('button_input_b');
            if (controlsData.buttonStates.buttonSelectStatus[1]){
                controlsData.buttonStates.buttonSelectStatus[1] = false;
                buttonElement.setAttribute('class', 'button_four_states_false');

                document.getElementById('input_b').style.background= '#ffffff';
            }else {
                controlsData.buttonStates.buttonSelectStatus[1] = true;
                buttonElement.setAttribute('class', 'button_four_states_true');
            }
            break;
        case controlsId.BUTTON_INPUT_C:
            buttonElement = document.getElementById('button_input_c');
            if (controlsData.buttonStates.buttonSelectStatus[2]){
                controlsData.buttonStates.buttonSelectStatus[2] = false;
                buttonElement.setAttribute('class', 'button_four_states_false');

                document.getElementById('input_c').style.background= '#ffffff';
            }else {
                controlsData.buttonStates.buttonSelectStatus[2] = true;
                buttonElement.setAttribute('class', 'button_four_states_true');
            }
            break;
        case controlsId.BUTTON_INPUT_D:
            buttonElement = document.getElementById('button_input_d');
            if (controlsData.buttonStates.buttonSelectStatus[3]){
                controlsData.buttonStates.buttonSelectStatus[3] = false;
                buttonElement.setAttribute('class', 'button_four_states_false');

                document.getElementById('input_d').style.background= '#ffffff';
            }else {
                controlsData.buttonStates.buttonSelectStatus[3] = true;
                buttonElement.setAttribute('class', 'button_four_states_true');
            }
            break;
        case controlsId.BUTTON_OUT1:
            buttonElement = document.getElementById('button_out1');
            if (controlsData.buttonStates.buttonSelectStatus[4]){
                controlsData.buttonStates.buttonSelectStatus[4] = false;
                buttonElement.setAttribute('class', 'button_four_states_false');

                document.getElementById('out_1').style.background= '#ffffff';
            }else {
                controlsData.buttonStates.buttonSelectStatus[4] = true;
                buttonElement.setAttribute('class', 'button_four_states_true');
            }
            break;
        case controlsId.BUTTON_OUT2:
            buttonElement = document.getElementById('button_out2');
            if (controlsData.buttonStates.buttonSelectStatus[5]){
                controlsData.buttonStates.buttonSelectStatus[5] = false;
                buttonElement.setAttribute('class', 'button_four_states_false');

                document.getElementById('out_2').style.background= '#ffffff';
            }else {
                controlsData.buttonStates.buttonSelectStatus[5] = true;
                buttonElement.setAttribute('class', 'button_four_states_true');
            }
            break;
        case controlsId.BUTTON_OUT3:
            buttonElement = document.getElementById('button_out3');
            if (controlsData.buttonStates.buttonSelectStatus[6]){
                controlsData.buttonStates.buttonSelectStatus[6] = false;
                buttonElement.setAttribute('class', 'button_four_states_false');

                document.getElementById('out_3').style.background= '#ffffff';
            }else {
                controlsData.buttonStates.buttonSelectStatus[6] = true;
                buttonElement.setAttribute('class', 'button_four_states_true');
            }
            break;
        case controlsId.BUTTON_OUT4:
            buttonElement = document.getElementById('button_out4');
            if (controlsData.buttonStates.buttonSelectStatus[7]){
                controlsData.buttonStates.buttonSelectStatus[7] = false;
                buttonElement.setAttribute('class', 'button_four_states_false');

                document.getElementById('out_4').style.background= '#ffffff';
            }else {
                controlsData.buttonStates.buttonSelectStatus[7] = true;
                buttonElement.setAttribute('class', 'button_four_states_true');
            }
            break;
        case controlsId.BUTTON_OUT5:
            buttonElement = document.getElementById('button_out5');
            if (controlsData.buttonStates.buttonSelectStatus[8]){
                controlsData.buttonStates.buttonSelectStatus[8] = false;
                buttonElement.setAttribute('class', 'button_four_states_false');

                document.getElementById('out_5').style.background= '#ffffff';
            }else {
                controlsData.buttonStates.buttonSelectStatus[8] = true;
                buttonElement.setAttribute('class', 'button_four_states_true');
            }
            break;
        case controlsId.BUTTON_OUT6:
            buttonElement = document.getElementById('button_out6');
            if (controlsData.buttonStates.buttonSelectStatus[9]){
                controlsData.buttonStates.buttonSelectStatus[9] = false;
                buttonElement.setAttribute('class', 'button_four_states_false');

                document.getElementById('out_6').style.background= '#ffffff';
            }else {
                controlsData.buttonStates.buttonSelectStatus[9] = true;
                buttonElement.setAttribute('class', 'button_four_states_true');
            }
            break;
        case controlsId.BUTTON_OUT7:
            buttonElement = document.getElementById('button_out7');
            if (controlsData.buttonStates.buttonSelectStatus[10]){
                controlsData.buttonStates.buttonSelectStatus[10] = false;
                buttonElement.setAttribute('class', 'button_four_states_false');

                document.getElementById('out_7').style.background= '#ffffff';
            }else {
                controlsData.buttonStates.buttonSelectStatus[10] = true;
                buttonElement.setAttribute('class', 'button_four_states_true');
            }
            break;
        case controlsId.BUTTON_OUT8:
            buttonElement = document.getElementById('button_out8');
            if (controlsData.buttonStates.buttonSelectStatus[11]){
                controlsData.buttonStates.buttonSelectStatus[11] = false;
                buttonElement.setAttribute('class', 'button_four_states_false');

                document.getElementById('out_8').style.background= '#ffffff';
            }else {
                controlsData.buttonStates.buttonSelectStatus[11] = true;
                buttonElement.setAttribute('class', 'button_four_states_true');
            }
            break;
    }
}

//======================================================================================================
function buttonSourceOut1AOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT1_A);
}

function buttonSourceOut1BOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT1_B);
}

function buttonSourceOut1COnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT1_C);
}

function buttonSourceOut1DOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT1_D);
}

function buttonSourceOut2AOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT2_A);
}

function buttonSourceOut2BOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT2_B);
}

function buttonSourceOut2COnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT2_C);
}

function buttonSourceOut2DOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT2_D);
}

function buttonSourceOut3AOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT3_A);
}

function buttonSourceOut3BOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT3_B);
}

function buttonSourceOut3COnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT3_C);
}

function buttonSourceOut3DOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT3_D);
}

function buttonSourceOut4AOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT4_A);
}

function buttonSourceOut4BOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT4_B);
}

function buttonSourceOut4COnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT4_C);
}

function buttonSourceOut4DOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT4_D);
}

function buttonSourceOut5AOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT5_A);
}

function buttonSourceOut5BOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT5_B);
}

function buttonSourceOut5COnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT5_C);
}

function buttonSourceOut5DOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT5_D);
}

function buttonSourceOut6AOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT6_A);
}

function buttonSourceOut6BOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT6_B);
}

function buttonSourceOut6COnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT6_C);
}

function buttonSourceOut6DOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT6_D);
}

function buttonSourceOut7AOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT7_A);
}

function buttonSourceOut7BOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT7_B);
}

function buttonSourceOut7COnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT7_C);
}

function buttonSourceOut7DOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT7_D);
}

function buttonSourceOut8AOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT8_A);
}

function buttonSourceOut8BOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT8_B);
}

function buttonSourceOut8COnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT8_C);
}

function buttonSourceOut8DOnclick(){
    buttonSourceOnclick(controlsId.BUTTON_OUT8_D);
}
//============================================================
function buttonSourceOnclick(id) {
    var buttonElement;
    switch (id){
        //out1
        case controlsId.BUTTON_OUT1_A:
            buttonElement = document.getElementById('button_out1_a');
            if (controlsData.buttonStates.buttonSourceStatus[0][0]){
                controlsData.buttonStates.buttonSourceStatus[0][0] = false;
                currentGroupData.dataOut1.sourceA = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[0][0] = true;
                currentGroupData.dataOut1.sourceA = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT1_B:
            buttonElement = document.getElementById('button_out1_b');
            if (controlsData.buttonStates.buttonSourceStatus[0][1]){
                controlsData.buttonStates.buttonSourceStatus[0][1] = false;
                currentGroupData.dataOut1.sourceB = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[0][1] = true;
                currentGroupData.dataOut1.sourceB = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT1_C:
            buttonElement = document.getElementById('button_out1_c');
            if (controlsData.buttonStates.buttonSourceStatus[0][2]){
                controlsData.buttonStates.buttonSourceStatus[0][2] = false;
                currentGroupData.dataOut1.sourceC = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[0][2] = true;
                currentGroupData.dataOut1.sourceC = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT1_D:
            buttonElement = document.getElementById('button_out1_d');
            if (controlsData.buttonStates.buttonSourceStatus[0][3]){
                controlsData.buttonStates.buttonSourceStatus[0][3] = false;
                currentGroupData.dataOut1.sourceD = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[0][3] = true;
                currentGroupData.dataOut1.sourceD = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        //out2
        case controlsId.BUTTON_OUT2_A:
            buttonElement = document.getElementById('button_out2_a');
            if (controlsData.buttonStates.buttonSourceStatus[1][0]){
                controlsData.buttonStates.buttonSourceStatus[1][0] = false;
                currentGroupData.dataOut2.sourceA = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[1][0] = true;
                currentGroupData.dataOut2.sourceA = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT2_B:
            buttonElement = document.getElementById('button_out2_b');
            if (controlsData.buttonStates.buttonSourceStatus[1][1]){
                controlsData.buttonStates.buttonSourceStatus[1][1] = false;
                currentGroupData.dataOut2.sourceB = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[1][1] = true;
                currentGroupData.dataOut2.sourceB = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT2_C:
            buttonElement = document.getElementById('button_out2_c');
            if (controlsData.buttonStates.buttonSourceStatus[1][2]){
                controlsData.buttonStates.buttonSourceStatus[1][2] = false;
                currentGroupData.dataOut2.sourceC = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[1][2] = true;
                currentGroupData.dataOut2.sourceC = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT2_D:
            buttonElement = document.getElementById('button_out2_d');
            if (controlsData.buttonStates.buttonSourceStatus[1][3]){
                controlsData.buttonStates.buttonSourceStatus[1][3] = false;
                currentGroupData.dataOut2.sourceD = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[1][3] = true;
                currentGroupData.dataOut2.sourceD = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        //out3
        case controlsId.BUTTON_OUT3_A:
            buttonElement = document.getElementById('button_out3_a');
            if (controlsData.buttonStates.buttonSourceStatus[2][0]){
                controlsData.buttonStates.buttonSourceStatus[2][0] = false;
                currentGroupData.dataOut3.sourceA = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[2][0] = true;
                currentGroupData.dataOut3.sourceA = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT3_B:
            buttonElement = document.getElementById('button_out3_b');
            if (controlsData.buttonStates.buttonSourceStatus[2][1]){
                controlsData.buttonStates.buttonSourceStatus[2][1] = false;
                currentGroupData.dataOut3.sourceB = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[2][1] = true;
                currentGroupData.dataOut3.sourceB = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT3_C:
            buttonElement = document.getElementById('button_out3_c');
            if (controlsData.buttonStates.buttonSourceStatus[2][2]){
                controlsData.buttonStates.buttonSourceStatus[2][2] = false;
                currentGroupData.dataOut3.sourceC = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[2][2] = true;
                currentGroupData.dataOut3.sourceC = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT3_D:
            buttonElement = document.getElementById('button_out3_d');
            if (controlsData.buttonStates.buttonSourceStatus[2][3]){
                controlsData.buttonStates.buttonSourceStatus[2][3] = false;
                currentGroupData.dataOut3.sourceD = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[2][3] = true;
                currentGroupData.dataOut3.sourceD = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        //out4
        case controlsId.BUTTON_OUT4_A:
            buttonElement = document.getElementById('button_out4_a');
            if (controlsData.buttonStates.buttonSourceStatus[3][0]){
                controlsData.buttonStates.buttonSourceStatus[3][0] = false;
                currentGroupData.dataOut4.sourceA = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[3][0] = true;
                currentGroupData.dataOut4.sourceA = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT4_B:
            buttonElement = document.getElementById('button_out4_b');
            if (controlsData.buttonStates.buttonSourceStatus[3][1]){
                controlsData.buttonStates.buttonSourceStatus[3][1] = false;
                currentGroupData.dataOut4.sourceB = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[3][1] = true;
                currentGroupData.dataOut4.sourceB = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT4_C:
            buttonElement = document.getElementById('button_out4_c');
            if (controlsData.buttonStates.buttonSourceStatus[3][2]){
                controlsData.buttonStates.buttonSourceStatus[3][2] = false;
                currentGroupData.dataOut4.sourceC = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[3][2] = true;
                currentGroupData.dataOut4.sourceC = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT4_D:
            buttonElement = document.getElementById('button_out4_d');
            if (controlsData.buttonStates.buttonSourceStatus[3][3]){
                controlsData.buttonStates.buttonSourceStatus[3][3] = false;
                currentGroupData.dataOut4.sourceD = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[3][3] = true;
                currentGroupData.dataOut4.sourceD = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        //out5
        case controlsId.BUTTON_OUT5_A:
            buttonElement = document.getElementById('button_out5_a');
            if (controlsData.buttonStates.buttonSourceStatus[4][0]){
                controlsData.buttonStates.buttonSourceStatus[4][0] = false;
                currentGroupData.dataOut5.sourceA = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[4][0] = true;
                currentGroupData.dataOut5.sourceA = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT5_B:
            buttonElement = document.getElementById('button_out5_b');
            if (controlsData.buttonStates.buttonSourceStatus[4][1]){
                controlsData.buttonStates.buttonSourceStatus[4][1] = false;
                currentGroupData.dataOut5.sourceB = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[4][1] = true;
                currentGroupData.dataOut5.sourceB = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT5_C:
            buttonElement = document.getElementById('button_out5_c');
            if (controlsData.buttonStates.buttonSourceStatus[4][2]){
                controlsData.buttonStates.buttonSourceStatus[4][2] = false;
                currentGroupData.dataOut5.sourceC = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[4][2] = true;
                currentGroupData.dataOut5.sourceC = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT5_D:
            buttonElement = document.getElementById('button_out5_d');
            if (controlsData.buttonStates.buttonSourceStatus[4][3]){
                controlsData.buttonStates.buttonSourceStatus[4][3] = false;
                currentGroupData.dataOut5.sourceD = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[4][3] = true;
                currentGroupData.dataOut5.sourceD = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        //out6
        case controlsId.BUTTON_OUT6_A:
            buttonElement = document.getElementById('button_out6_a');
            if (controlsData.buttonStates.buttonSourceStatus[5][0]){
                controlsData.buttonStates.buttonSourceStatus[5][0] = false;
                currentGroupData.dataOut6.sourceA = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[5][0] = true;
                currentGroupData.dataOut6.sourceA = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT6_B:
            buttonElement = document.getElementById('button_out6_b');
            if (controlsData.buttonStates.buttonSourceStatus[5][1]){
                controlsData.buttonStates.buttonSourceStatus[5][1] = false;
                currentGroupData.dataOut6.sourceB = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[5][1] = true;
                currentGroupData.dataOut6.sourceB = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT6_C:
            buttonElement = document.getElementById('button_out6_c');
            if (controlsData.buttonStates.buttonSourceStatus[5][2]){
                controlsData.buttonStates.buttonSourceStatus[5][2] = false;
                currentGroupData.dataOut6.sourceC = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[5][2] = true;
                currentGroupData.dataOut6.sourceC = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT6_D:
            buttonElement = document.getElementById('button_out6_d');
            if (controlsData.buttonStates.buttonSourceStatus[5][3]){
                controlsData.buttonStates.buttonSourceStatus[5][3] = false;
                currentGroupData.dataOut6.sourceD = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[5][3] = true;
                currentGroupData.dataOut6.sourceD = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        //out7
        case controlsId.BUTTON_OUT7_A:
            buttonElement = document.getElementById('button_out7_a');
            if (controlsData.buttonStates.buttonSourceStatus[6][0]){
                controlsData.buttonStates.buttonSourceStatus[6][0] = false;
                currentGroupData.dataOut7.sourceA = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[6][0] = true;
                currentGroupData.dataOut7.sourceA = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT7_B:
            buttonElement = document.getElementById('button_out7_b');
            if (controlsData.buttonStates.buttonSourceStatus[6][1]){
                controlsData.buttonStates.buttonSourceStatus[6][1] = false;
                currentGroupData.dataOut7.sourceB = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[6][1] = true;
                currentGroupData.dataOut7.sourceB = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT7_C:
            buttonElement = document.getElementById('button_out7_c');
            if (controlsData.buttonStates.buttonSourceStatus[6][2]){
                controlsData.buttonStates.buttonSourceStatus[6][2] = false;
                currentGroupData.dataOut7.sourceC = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[6][2] = true;
                currentGroupData.dataOut7.sourceC = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT7_D:
            buttonElement = document.getElementById('button_out7_d');
            if (controlsData.buttonStates.buttonSourceStatus[6][3]){
                controlsData.buttonStates.buttonSourceStatus[6][3] = false;
                currentGroupData.dataOut7.sourceD = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[6][3] = true;
                currentGroupData.dataOut7.sourceD = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        //out8
        case controlsId.BUTTON_OUT8_A:
            buttonElement = document.getElementById('button_out8_a');
            if (controlsData.buttonStates.buttonSourceStatus[7][0]){
                controlsData.buttonStates.buttonSourceStatus[7][0] = false;
                currentGroupData.dataOut8.sourceA = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[7][0] = true;
                currentGroupData.dataOut8.sourceA = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT8_B:
            buttonElement = document.getElementById('button_out8_b');
            if (controlsData.buttonStates.buttonSourceStatus[7][1]){
                controlsData.buttonStates.buttonSourceStatus[7][1] = false;
                currentGroupData.dataOut8.sourceB = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[7][1] = true;
                currentGroupData.dataOut8.sourceB = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT8_C:
            buttonElement = document.getElementById('button_out8_c');
            if (controlsData.buttonStates.buttonSourceStatus[7][2]){
                controlsData.buttonStates.buttonSourceStatus[7][2] = false;
                currentGroupData.dataOut8.sourceC = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[7][2] = true;
                currentGroupData.dataOut8.sourceC = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        case controlsId.BUTTON_OUT8_D:
            buttonElement = document.getElementById('button_out8_d');
            if (controlsData.buttonStates.buttonSourceStatus[7][3]){
                controlsData.buttonStates.buttonSourceStatus[7][3] = false;
                currentGroupData.dataOut8.sourceD = false;
                buttonElement.setAttribute('class', 'button_six_states_false');
            }else {
                controlsData.buttonStates.buttonSourceStatus[7][3] = true;
                currentGroupData.dataOut8.sourceD = true;
                buttonElement.setAttribute('class', 'button_six_states_true');
            }
            break;
        default:
            break;
    }
}

//=====================================================================================
function buttonSpeakerAOnclick(){
    buttonSpeakerOnclick(controlsId.BUTTON_SPEAKER_A);
}

function buttonSpeakerBOnclick(){
    buttonSpeakerOnclick(controlsId.BUTTON_SPEAKER_B);
}

function buttonSpeakerCOnclick(){
    buttonSpeakerOnclick(controlsId.BUTTON_SPEAKER_C);
}

function buttonSpeakerDOnclick(){
    buttonSpeakerOnclick(controlsId.BUTTON_SPEAKER_D);
}

function buttonSpeakerOut1Onclick(){
    buttonSpeakerOnclick(controlsId.BUTTON_SPEAKER_OUT1);
}

function buttonSpeakerOut2Onclick(){
    buttonSpeakerOnclick(controlsId.BUTTON_SPEAKER_OUT2);
}

function buttonSpeakerOut3Onclick(){
    buttonSpeakerOnclick(controlsId.BUTTON_SPEAKER_OUT3);
}

function buttonSpeakerOut4Onclick(){
    buttonSpeakerOnclick(controlsId.BUTTON_SPEAKER_OUT4);
}

function buttonSpeakerOut5Onclick(){
    buttonSpeakerOnclick(controlsId.BUTTON_SPEAKER_OUT5);
}

function buttonSpeakerOut6Onclick(){
    buttonSpeakerOnclick(controlsId.BUTTON_SPEAKER_OUT6);
}

function buttonSpeakerOut7Onclick(){
    buttonSpeakerOnclick(controlsId.BUTTON_SPEAKER_OUT7);
}

function buttonSpeakerOut8Onclick(){
    buttonSpeakerOnclick(controlsId.BUTTON_SPEAKER_OUT8);
}
//=========================================================
function buttonSpeakerOnclick(id){
    var buttonElement, speakerSpan1, speakerSpan2;
    var isTrue = false;
    switch (id){
        case controlsId.BUTTON_SPEAKER_A:
            buttonElement = document.getElementById('button_speaker_a');
            speakerSpan1 = document.getElementById('speakerIn1Span1');
            speakerSpan2 = document.getElementById('speakerIn1Span2');
            if (controlsData.buttonStates.buttonSpeakerStatus[0]){
                controlsData.buttonStates.buttonSpeakerStatus[0] = false;
                isTrue = false;
            }else {
                controlsData.buttonStates.buttonSpeakerStatus[0] = true;
                isTrue = true;
            }
            currentGroupData.dataInputA.mute = isTrue ? 1 : 0;
            break;
        case controlsId.BUTTON_SPEAKER_B:
            buttonElement = document.getElementById('button_speaker_b');
            speakerSpan1 = document.getElementById('speakerIn2Span1');
            speakerSpan2 = document.getElementById('speakerIn2Span2');
            if (controlsData.buttonStates.buttonSpeakerStatus[1]){
                controlsData.buttonStates.buttonSpeakerStatus[1] = false;
                isTrue = false;
            }else {
                controlsData.buttonStates.buttonSpeakerStatus[1] = true;
                isTrue = true;
            }
            currentGroupData.dataInputB.mute = isTrue ? 1 : 0;
            break;
        case controlsId.BUTTON_SPEAKER_C:
            buttonElement = document.getElementById('button_speaker_c');
            speakerSpan1 = document.getElementById('speakerIn3Span1');
            speakerSpan2 = document.getElementById('speakerIn3Span2');
            if (controlsData.buttonStates.buttonSpeakerStatus[2]){
                controlsData.buttonStates.buttonSpeakerStatus[2] = false;
                isTrue = false;
            }else {
                controlsData.buttonStates.buttonSpeakerStatus[2] = true;
                isTrue = true;
            }
            currentGroupData.dataInputC.mute = isTrue ? 1 : 0;
            break;
        case controlsId.BUTTON_SPEAKER_D:
            buttonElement = document.getElementById('button_speaker_d');
            speakerSpan1 = document.getElementById('speakerIn4Span1');
            speakerSpan2 = document.getElementById('speakerIn4Span2');
            if (controlsData.buttonStates.buttonSpeakerStatus[3]){
                controlsData.buttonStates.buttonSpeakerStatus[3] = false;
                isTrue = false;
            }else {
                controlsData.buttonStates.buttonSpeakerStatus[3] = true;
                isTrue = true;
            }
            currentGroupData.dataInputD.mute = isTrue ? 1 : 0;
            break;
        //--------------------------------------------------------------------
        case controlsId.BUTTON_SPEAKER_OUT1:
            buttonElement = document.getElementById('button_speaker_out1');
            speakerSpan1 = document.getElementById('speakerOut1Span1');
            speakerSpan2 = document.getElementById('speakerOut1Span2');
            if (controlsData.buttonStates.buttonSpeakerStatus[4]){
                controlsData.buttonStates.buttonSpeakerStatus[4] = false;
                isTrue = false;
            }else {
                controlsData.buttonStates.buttonSpeakerStatus[4] = true;
                isTrue = true;
            }
            currentGroupData.dataOut1.mute = isTrue ? 1 : 0;
            break;
        case controlsId.BUTTON_SPEAKER_OUT2:
            buttonElement = document.getElementById('button_speaker_out2');
            speakerSpan1 = document.getElementById('speakerOut2Span1');
            speakerSpan2 = document.getElementById('speakerOut2Span2');
            if (controlsData.buttonStates.buttonSpeakerStatus[5]){
                controlsData.buttonStates.buttonSpeakerStatus[5] = false;
                isTrue = false;
            }else {
                controlsData.buttonStates.buttonSpeakerStatus[5] = true;
                isTrue = true;
            }
            currentGroupData.dataOut2.mute = isTrue ? 1 : 0;
            break;
        case controlsId.BUTTON_SPEAKER_OUT3:
            buttonElement = document.getElementById('button_speaker_out3');
            speakerSpan1 = document.getElementById('speakerOut3Span1');
            speakerSpan2 = document.getElementById('speakerOut3Span2');
            if (controlsData.buttonStates.buttonSpeakerStatus[6]){
                controlsData.buttonStates.buttonSpeakerStatus[6] = false;
                isTrue = false;
            }else {
                controlsData.buttonStates.buttonSpeakerStatus[6] = true;
                isTrue = true;
            }
            currentGroupData.dataOut3.mute = isTrue ? 1 : 0;
            break;
        case controlsId.BUTTON_SPEAKER_OUT4:
            buttonElement = document.getElementById('button_speaker_out4');
            speakerSpan1 = document.getElementById('speakerOut4Span1');
            speakerSpan2 = document.getElementById('speakerOut4Span2');
            if (controlsData.buttonStates.buttonSpeakerStatus[7]){
                controlsData.buttonStates.buttonSpeakerStatus[7] = false;
                isTrue = false;
            }else {
                controlsData.buttonStates.buttonSpeakerStatus[7] = true;
                isTrue = true;
            }
            currentGroupData.dataOut4.mute = isTrue ? 1 : 0;
            break;
        case controlsId.BUTTON_SPEAKER_OUT5:
            buttonElement = document.getElementById('button_speaker_out5');
            speakerSpan1 = document.getElementById('speakerOut5Span1');
            speakerSpan2 = document.getElementById('speakerOut5Span2');
            if (controlsData.buttonStates.buttonSpeakerStatus[8]){
                controlsData.buttonStates.buttonSpeakerStatus[8] = false;
                isTrue = false;
            }else {
                controlsData.buttonStates.buttonSpeakerStatus[8] = true;
                isTrue = true;
            }
            currentGroupData.dataOut5.mute = isTrue ? 1 : 0;
            break;
        case controlsId.BUTTON_SPEAKER_OUT6:
            buttonElement = document.getElementById('button_speaker_out6');
            speakerSpan1 = document.getElementById('speakerOut6Span1');
            speakerSpan2 = document.getElementById('speakerOut6Span2');
            if (controlsData.buttonStates.buttonSpeakerStatus[9]){
                controlsData.buttonStates.buttonSpeakerStatus[9] = false;
                isTrue = false;
            }else {
                controlsData.buttonStates.buttonSpeakerStatus[9] = true;
                isTrue = true;
            }
            currentGroupData.dataOut6.mute = isTrue ? 1 : 0;
            break;
        case controlsId.BUTTON_SPEAKER_OUT7:
            buttonElement = document.getElementById('button_speaker_out7');
            speakerSpan1 = document.getElementById('speakerOut7Span1');
            speakerSpan2 = document.getElementById('speakerOut7Span2');
            if (controlsData.buttonStates.buttonSpeakerStatus[10]){
                controlsData.buttonStates.buttonSpeakerStatus[10] = false;
                isTrue = false;
            }else {
                controlsData.buttonStates.buttonSpeakerStatus[10] = true;
                isTrue = true;
            }
            currentGroupData.dataOut7.mute = isTrue ? 1 : 0;
            break;
        case controlsId.BUTTON_SPEAKER_OUT8:
            buttonElement = document.getElementById('button_speaker_out8');
            speakerSpan1 = document.getElementById('speakerOut8Span1');
            speakerSpan2 = document.getElementById('speakerOut8Span2');
            if (controlsData.buttonStates.buttonSpeakerStatus[11]){
                controlsData.buttonStates.buttonSpeakerStatus[11] = false;
                isTrue = false;
            }else {
                controlsData.buttonStates.buttonSpeakerStatus[11] = true;
                isTrue = true;
            }
            currentGroupData.dataOut8.mute = isTrue ? 1 : 0;
            break;
        default:
            break;
    }

    if (isTrue){
        buttonElement.setAttribute('class', 'button_speaker_true');
        speakerSpan1.setAttribute('class', 'speakingSpan1');
        speakerSpan2.setAttribute('class', 'speakingSpan2');
    }else{
        buttonElement.setAttribute('class', 'button_speaker_false');
        speakerSpan1.setAttribute('class', 'muteSpan1');
        speakerSpan2.setAttribute('class', 'muteSpan2');
    }
}
//==============================================================================
function buttonCurveAOnclick(){
    buttonCurveOnclick(controlsId.BUTTON_CURVE_A);
}

function buttonCurveBOnclick(){
    buttonCurveOnclick(controlsId.BUTTON_CURVE_B);
}

function buttonCurveCOnclick(){
    buttonCurveOnclick(controlsId.BUTTON_CURVE_C);
}

function buttonCurveDOnclick(){
    buttonCurveOnclick(controlsId.BUTTON_CURVE_D);
}

function buttonCurveOut1Onclick(){
    buttonCurveOnclick(controlsId.BUTTON_CURVE_OUT1);
}

function buttonCurveOut2Onclick(){
    buttonCurveOnclick(controlsId.BUTTON_CURVE_OUT2);
}

function buttonCurveOut3Onclick(){
    buttonCurveOnclick(controlsId.BUTTON_CURVE_OUT3);
}

function buttonCurveOut4Onclick(){
    buttonCurveOnclick(controlsId.BUTTON_CURVE_OUT4);
}

function buttonCurveOut5Onclick(){
    buttonCurveOnclick(controlsId.BUTTON_CURVE_OUT5);
}

function buttonCurveOut6Onclick(){
    buttonCurveOnclick(controlsId.BUTTON_CURVE_OUT6);
}

function buttonCurveOut7Onclick(){
    buttonCurveOnclick(controlsId.BUTTON_CURVE_OUT7);
}

function buttonCurveOut8Onclick(){
    buttonCurveOnclick(controlsId.BUTTON_CURVE_OUT8);
}



function buttonCurveOnclick(id) {
    var buttonElement;
    switch (id){
        case controlsId.BUTTON_CURVE_A:
            if(curButtonNo === 1){
                return;
            }
            buttonElement = document.getElementById('button_curve_a');
            if ( m_nLinkIn_EQLine[0]? m_nLinkIn_EQLine[0]:controlsData.buttonStates.buttonCurveStatus[0]){
                controlsData.buttonStates.buttonCurveStatus[0] = false;
                m_nLinkIn_EQLine[0] = false;
                buttonElement.setAttribute('class', 'button_curve_a_false');
            }else {
                controlsData.buttonStates.buttonCurveStatus[0] = true;
                m_nLinkIn_EQLine[0] = true;
                buttonElement.setAttribute('class', 'button_curve_a_true');
                //drawLinkLine(1);
            }
            svgDrawCurve.drawOtherCurveLine();
            break;
        case controlsId.BUTTON_CURVE_B:
            if(curButtonNo === 2){
                return;
            }
            buttonElement = document.getElementById('button_curve_b');
            if (m_nLinkIn_EQLine[1]? m_nLinkIn_EQLine[1]:controlsData.buttonStates.buttonCurveStatus[1]){
                controlsData.buttonStates.buttonCurveStatus[1] = false;
                m_nLinkIn_EQLine[1] = false;
                buttonElement.setAttribute('class', 'button_curve_b_false');
            }else {
                controlsData.buttonStates.buttonCurveStatus[1] = true;
                m_nLinkIn_EQLine[1] = true;
                buttonElement.setAttribute('class', 'button_curve_b_true');
                //drawLinkLine(2);
            }
            svgDrawCurve.drawOtherCurveLine();
            break;
        case controlsId.BUTTON_CURVE_C:
            if(curButtonNo === 3){
                return;
            }
            buttonElement = document.getElementById('button_curve_c');
            if (m_nLinkIn_EQLine[2]? m_nLinkIn_EQLine[2]:controlsData.buttonStates.buttonCurveStatus[2]){
                controlsData.buttonStates.buttonCurveStatus[2] = false;
                m_nLinkIn_EQLine[2] = false;
                buttonElement.setAttribute('class', 'button_curve_c_false');
            }else {
                controlsData.buttonStates.buttonCurveStatus[2] = true;
                m_nLinkIn_EQLine[2] = true;
                buttonElement.setAttribute('class', 'button_curve_c_true');
                //drawLinkLine(3);
            }
            svgDrawCurve.drawOtherCurveLine();
            break;
        case controlsId.BUTTON_CURVE_D:
            if(curButtonNo === 4){
                return;
            }
            buttonElement = document.getElementById('button_curve_d');
            if (m_nLinkIn_EQLine[3]? m_nLinkIn_EQLine[3]:controlsData.buttonStates.buttonCurveStatus[3]){
                controlsData.buttonStates.buttonCurveStatus[3] = false;
                m_nLinkIn_EQLine[3] = false;
                buttonElement.setAttribute('class', 'button_curve_d_false');
            }else {
                controlsData.buttonStates.buttonCurveStatus[3] = true;
                m_nLinkIn_EQLine[3] = true;
                buttonElement.setAttribute('class', 'button_curve_d_true');
                //drawLinkLine(4);
            }
            svgDrawCurve.drawOtherCurveLine();
            break;
        case controlsId.BUTTON_CURVE_OUT1:
            if(curButtonNo === 5){
                return;
            }
            buttonElement = document.getElementById('button_curve_out1');
            if (m_nLinkOut_EQLine[0]?m_nLinkOut_EQLine[0]:controlsData.buttonStates.buttonCurveStatus[4]){
                controlsData.buttonStates.buttonCurveStatus[4] = false;
                m_nLinkOut_EQLine[0] = false;
                buttonElement.setAttribute('class', 'button_curve_out1_false');
            }else {
                controlsData.buttonStates.buttonCurveStatus[4] = true;
                m_nLinkOut_EQLine[0] = true;
                buttonElement.setAttribute('class', 'button_curve_out1_true');
                //drawLinkLine(5);
            }
            svgDrawCurve.drawOtherCurveLine();
            break;
        case controlsId.BUTTON_CURVE_OUT2:
            if(curButtonNo === 6){
                return;
            }
            buttonElement = document.getElementById('button_curve_out2');
            if (m_nLinkOut_EQLine[1]?m_nLinkOut_EQLine[1]:controlsData.buttonStates.buttonCurveStatus[5]){
                controlsData.buttonStates.buttonCurveStatus[5] = false;
                m_nLinkOut_EQLine[1] = false;
                buttonElement.setAttribute('class', 'button_curve_out2_false');
            }else {
                controlsData.buttonStates.buttonCurveStatus[5] = true;
                m_nLinkOut_EQLine[1] = true;
                buttonElement.setAttribute('class', 'button_curve_out2_true');
                //drawLinkLine(6);
            }
            svgDrawCurve.drawOtherCurveLine();
            break;
        case controlsId.BUTTON_CURVE_OUT3:
            if(curButtonNo === 7){
                return;
            }
            buttonElement = document.getElementById('button_curve_out3');
            if (m_nLinkOut_EQLine[2]?m_nLinkOut_EQLine[2]:controlsData.buttonStates.buttonCurveStatus[6]){
                controlsData.buttonStates.buttonCurveStatus[6] = false;
                m_nLinkOut_EQLine[2] = false;
                buttonElement.setAttribute('class', 'button_curve_out3_false');
            }else {
                controlsData.buttonStates.buttonCurveStatus[6] = true;
                m_nLinkOut_EQLine[2] = true;
                buttonElement.setAttribute('class', 'button_curve_out3_true');
                //drawLinkLine(7);
            }
            svgDrawCurve.drawOtherCurveLine();
            break;
        case controlsId.BUTTON_CURVE_OUT4:
            if(curButtonNo === 8){
                return;
            }
            buttonElement = document.getElementById('button_curve_out4');
            if (m_nLinkOut_EQLine[3]?m_nLinkOut_EQLine[3]:controlsData.buttonStates.buttonCurveStatus[7]){
                controlsData.buttonStates.buttonCurveStatus[7] = false;
                m_nLinkOut_EQLine[3] = false;
                buttonElement.setAttribute('class', 'button_curve_out4_false');
            }else {
                controlsData.buttonStates.buttonCurveStatus[7] = true;
                m_nLinkOut_EQLine[3] = true;
                buttonElement.setAttribute('class', 'button_curve_out4_true');
                //drawLinkLine(8);
            }
            svgDrawCurve.drawOtherCurveLine();
            break;
        case controlsId.BUTTON_CURVE_OUT5:
            if(curButtonNo === 9){
                return;
            }
            buttonElement = document.getElementById('button_curve_out5');
            if (m_nLinkOut_EQLine[4]?m_nLinkOut_EQLine[4]:controlsData.buttonStates.buttonCurveStatus[8]){
                controlsData.buttonStates.buttonCurveStatus[8] = false;
                m_nLinkOut_EQLine[4] = false;
                buttonElement.setAttribute('class', 'button_curve_out5_false');
            }else {
                controlsData.buttonStates.buttonCurveStatus[8] = true;
                m_nLinkOut_EQLine[4] = true;
                buttonElement.setAttribute('class', 'button_curve_out5_true');
                //drawLinkLine(9);
            }
            svgDrawCurve.drawOtherCurveLine();
            break;
        case controlsId.BUTTON_CURVE_OUT6:
            if(curButtonNo === 10){
                return;
            }
            buttonElement = document.getElementById('button_curve_out6');
            if (m_nLinkOut_EQLine[5]?m_nLinkOut_EQLine[5]:controlsData.buttonStates.buttonCurveStatus[9]){
                controlsData.buttonStates.buttonCurveStatus[9] = false;
                m_nLinkOut_EQLine[5] = false;
                buttonElement.setAttribute('class', 'button_curve_out6_false');
            }else {
                controlsData.buttonStates.buttonCurveStatus[9] = true;
                m_nLinkOut_EQLine[5] = true;
                buttonElement.setAttribute('class', 'button_curve_out6_true');
                //drawLinkLine(10);
            }
            svgDrawCurve.drawOtherCurveLine();
            break;
        case controlsId.BUTTON_CURVE_OUT7:
            if(curButtonNo === 11){
                return;
            }
            buttonElement = document.getElementById('button_curve_out7');
            if (m_nLinkOut_EQLine[6]?m_nLinkOut_EQLine[6]:controlsData.buttonStates.buttonCurveStatus[10]){
                controlsData.buttonStates.buttonCurveStatus[10] = false;
                m_nLinkOut_EQLine[6] = false;
                buttonElement.setAttribute('class', 'button_curve_out7_false');
            }else {
                controlsData.buttonStates.buttonCurveStatus[10] = true;
                m_nLinkOut_EQLine[6] = true;
                buttonElement.setAttribute('class', 'button_curve_out7_true');
                //drawLinkLine(11);
            }
            svgDrawCurve.drawOtherCurveLine();
            break;
        case controlsId.BUTTON_CURVE_OUT8:
            if(curButtonNo === 12){
                return;
            }
            buttonElement = document.getElementById('button_curve_out8');
            if (m_nLinkOut_EQLine[7]?m_nLinkOut_EQLine[7]:controlsData.buttonStates.buttonCurveStatus[11]){
                controlsData.buttonStates.buttonCurveStatus[11] = false;
                m_nLinkOut_EQLine[7] = false;
                buttonElement.setAttribute('class', 'button_curve_out8_false');
            }else {
                controlsData.buttonStates.buttonCurveStatus[11] = true;
                m_nLinkOut_EQLine[7] = true;
                buttonElement.setAttribute('class', 'button_curve_out8_true');
                //drawLinkLine(12);
            }
            svgDrawCurve.drawOtherCurveLine();
            break;
    }
}


//==============================================================================
function buttonEqTotalOnclick(){ //EQ按钮响应
    buttonEqOnclick(controlsId.BUTTON_EQ);
}

function buttonEq1Onclick(){ //EQ1按钮响应
    if(eqData.EQ1.type > 2){
        buttonEqOnclickAllPass(controlsId.BUTTON_EQ1)
    }else{
        buttonEqOnclick(controlsId.BUTTON_EQ1);
    }
    curEqChannel = 1;
    showOrHideEqData();
}

function buttonEq2Onclick(){//EQ2按钮响应
    if(eqData.EQ2.type > 2){
        buttonEqOnclickAllPass(controlsId.BUTTON_EQ2)
    }else{
        buttonEqOnclick(controlsId.BUTTON_EQ2);
    }
    curEqChannel = 2;
    showOrHideEqData();
}

function buttonEq3Onclick(){//EQ3按钮响应
    if(eqData.EQ3.type > 2){
        buttonEqOnclickAllPass(controlsId.BUTTON_EQ3)
    }else{
        buttonEqOnclick(controlsId.BUTTON_EQ3);
    }
    curEqChannel = 3;
    showOrHideEqData();
}

function buttonEq4Onclick(){//EQ4按钮响应
    if(eqData.EQ4.type > 2){
        buttonEqOnclickAllPass(controlsId.BUTTON_EQ4)
    }else{
        buttonEqOnclick(controlsId.BUTTON_EQ4);
    }
    curEqChannel = 4;
    showOrHideEqData();
}

function buttonEq5Onclick(){//EQ5按钮响应
    if(eqData.EQ5.type > 2){
        buttonEqOnclickAllPass(controlsId.BUTTON_EQ5)
    }else{
        buttonEqOnclick(controlsId.BUTTON_EQ5);
    }
    curEqChannel = 5;
    showOrHideEqData();
}

function buttonEq6Onclick(){//EQ6按钮响应
    if(eqData.EQ6.type > 2){
        buttonEqOnclickAllPass(controlsId.BUTTON_EQ6)
    }else{
        buttonEqOnclick(controlsId.BUTTON_EQ6);
    }
    curEqChannel = 6;
    showOrHideEqData();
}

function updateAllEqGainButton(){ //更新所有EQ按钮状态
    var counts=0,buttonElement;
    buttonElement = document.getElementById('button_eq');
    for(var i=1; i<7; i++){
        if(!updateEqGainButton(i)){
            counts++;
        }
        eqDataKeepStep(curButtonNo,i);
    }

    if(counts === 6){
        controlsData.buttonStates.buttonEqStatus[0] = false;
        buttonElement.setAttribute('class', 'button_eq_false');
        //console.log('all silent');
    }else{
        controlsData.buttonStates.buttonEqStatus[0] = true;
        buttonElement.setAttribute('class', 'button_eq_true');
        //console.log('not silent');
    }

}

function updateEqGainButton(channel){
    var buttonElement,textElement,eq;

    switch (channel){
        case 1:
            buttonElement = document.getElementById('button_eq1');
            textElement = document.getElementById('text_eq1_gain');
            eq = eqData.EQ1;
            break;
        case 2:
            buttonElement = document.getElementById('button_eq2');
            textElement = document.getElementById('text_eq2_gain');
            eq = eqData.EQ2;
            break;
        case 3:
            buttonElement = document.getElementById('button_eq3');
            textElement = document.getElementById('text_eq3_gain');
            eq = eqData.EQ3;
            break;
        case 4:
            buttonElement = document.getElementById('button_eq4');
            textElement = document.getElementById('text_eq4_gain');
            eq = eqData.EQ4;
            break;
        case 5:
            buttonElement = document.getElementById('button_eq5');
            textElement = document.getElementById('text_eq5_gain');
            eq = eqData.EQ5;
            break;
        case 6:
            buttonElement = document.getElementById('button_eq6');
            textElement = document.getElementById('text_eq6_gain');
            eq = eqData.EQ6;
            break;
        default:
            break;
    }

    if(eq.type > 2){//AllPass_SEQ1 ALLPss_SEQ2
        if(GET_4L_BYTE(eq.HL_db_AP_Flag)){
            controlsData.buttonStates.buttonEqStatus[channel] = false;
            buttonElement.setAttribute('class', 'button_eq_false');
            return false;
        }else{
            controlsData.buttonStates.buttonEqStatus[channel] = true;
            buttonElement.setAttribute('class', 'button_eq_true');
            return true;
        }

    }else{
        if(textElement.value === '0.0'){
            controlsData.buttonStates.buttonEqStatus[channel] = false;
            buttonElement.setAttribute('class', 'button_eq_false');
            return false;
        }else{
            controlsData.buttonStates.buttonEqStatus[channel] = true;
            buttonElement.setAttribute('class', 'button_eq_true');
            return true;
        }
    }
}

var allOldEQ = [[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],
    [200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200]];

var oldEQ = [[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],
    [200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200]];

function clearOldEQ() {
    allOldEQ = [[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],
        [200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200]];

    oldEQ = [[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],
        [200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200],[200,200,200,200,200,200]];
}
function buttonEqOnclick(id){
    var buttonElement;
    switch (id){
        case controlsId.BUTTON_EQ:
            buttonElement = document.getElementById('button_eq');
            if (controlsData.buttonStates.buttonEqStatus[0]){
                controlsData.buttonStates.buttonEqStatus[0] = false;
                buttonElement.setAttribute('class', 'button_eq_false');

                if(eqData.EQ1.type > 2){
                    //console.log('EQ1设置为————————旁通');
                    eqData.EQ1.HL_db_AP_Flag = SET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag, 1);
                    keepLinkEq1Button(curButtonNo, 1);
                }else{
                    //console.log('EQ1 非全通类型');
                    allOldEQ[curButtonNo-1][0] = eqData.EQ1.level;
                    eqData.EQ1.level = 200;
                    document.getElementById('text_eq1_gain').value=getEqGainDisplay(200);
                    setSliderPosition(controlsId.SLIDER_EQ1_THUMP,200);
                    keepLinkEq1Button(curButtonNo, 200);
                }

                if(eqData.EQ2.type > 2){
                    eqData.EQ2.HL_db_AP_Flag = SET_4L_BYTE(eqData.EQ2.HL_db_AP_Flag, 1);
                    keepLinkEq2Button(curButtonNo, 1);
                }else{
                    allOldEQ[curButtonNo-1][1] = eqData.EQ2.level;
                    eqData.EQ2.level = 200;
                    document.getElementById('text_eq2_gain').value=getEqGainDisplay(200);
                    setSliderPosition(controlsId.SLIDER_EQ2_THUMP,200);
                    keepLinkEq2Button(curButtonNo, 200);
                }

                if(eqData.EQ3.type > 2){
                    eqData.EQ3.HL_db_AP_Flag = SET_4L_BYTE(eqData.EQ3.HL_db_AP_Flag, 1);
                    keepLinkEq3Button(curButtonNo, 1);
                }else{
                    allOldEQ[curButtonNo-1][2] = eqData.EQ3.level;
                    eqData.EQ3.level = 200;
                    document.getElementById('text_eq3_gain').value=getEqGainDisplay(200);
                    setSliderPosition(controlsId.SLIDER_EQ3_THUMP,200);
                    keepLinkEq3Button(curButtonNo, 200);
                }

                if(eqData.EQ4.type > 2){
                    eqData.EQ4.HL_db_AP_Flag = SET_4L_BYTE(eqData.EQ4.HL_db_AP_Flag, 1);
                    keepLinkEq4Button(curButtonNo, 1);
                }else{
                    allOldEQ[curButtonNo-1][3] = eqData.EQ4.level;
                    eqData.EQ4.level = 200;
                    document.getElementById('text_eq4_gain').value=getEqGainDisplay(200);
                    setSliderPosition(controlsId.SLIDER_EQ4_THUMP,200);
                    keepLinkEq4Button(curButtonNo, 200);
                }

                if(eqData.EQ5.type > 2){
                    eqData.EQ5.HL_db_AP_Flag = SET_4L_BYTE(eqData.EQ5.HL_db_AP_Flag, 1);
                    keepLinkEq5Button(curButtonNo, 1);
                }else{
                    allOldEQ[curButtonNo-1][4] = eqData.EQ5.level;
                    eqData.EQ5.level = 200;
                    document.getElementById('text_eq5_gain').value=getEqGainDisplay(200);
                    setSliderPosition(controlsId.SLIDER_EQ5_THUMP,200);
                    keepLinkEq5Button(curButtonNo, 200);
                }

                if(eqData.EQ6.type > 2){
                    eqData.EQ6.HL_db_AP_Flag = SET_4L_BYTE(eqData.EQ6.HL_db_AP_Flag, 1);
                    keepLinkEq6Button(curButtonNo, 1);
                }else{
                    allOldEQ[curButtonNo-1][5] = eqData.EQ6.level;
                    eqData.EQ6.level = 200;
                    document.getElementById('text_eq6_gain').value=getEqGainDisplay(200);
                    setSliderPosition(controlsId.SLIDER_EQ6_THUMP,200);
                    keepLinkEq6Button(curButtonNo, 200);
                }


            }else{
                controlsData.buttonStates.buttonEqStatus[0] = true;
                buttonElement.setAttribute('class', 'button_eq_true');

                if(eqData.EQ1.type > 2){
                    eqData.EQ1.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ1.HL_db_AP_Flag), 0);
                    keepLinkEq1Button(curButtonNo, 0);
                    //console.log('EQ1设置为————————非旁通');
                }else{
                    //console.log('EQ1 非全通类型');
                    eqData.EQ1.level = allOldEQ[curButtonNo-1][0];
                    document.getElementById('text_eq1_gain').value=getEqGainDisplay(allOldEQ[curButtonNo-1][0]);
                    setSliderPosition(controlsId.SLIDER_EQ1_THUMP,allOldEQ[curButtonNo-1][0]);
                    keepLinkEq1Button(curButtonNo, allOldEQ[curButtonNo-1][0]);
                    allOldEQ[curButtonNo-1][0] = 200;
                }

                if(eqData.EQ2.type > 2){
                    eqData.EQ2.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ2.HL_db_AP_Flag), 0);
                    keepLinkEq2Button(curButtonNo, 0);
                }else{
                    eqData.EQ2.level = allOldEQ[curButtonNo-1][1];
                    document.getElementById('text_eq2_gain').value=getEqGainDisplay(allOldEQ[curButtonNo-1][1]);
                    setSliderPosition(controlsId.SLIDER_EQ2_THUMP,allOldEQ[curButtonNo-1][1]);
                    keepLinkEq2Button(curButtonNo, allOldEQ[curButtonNo-1][1]);
                    allOldEQ[curButtonNo-1][1] = 200;
                }

                if(eqData.EQ3.type > 2){
                    eqData.EQ3.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ3.HL_db_AP_Flag), 0);
                    keepLinkEq3Button(curButtonNo, 0);
                }else{
                    eqData.EQ3.level = allOldEQ[curButtonNo-1][2];
                    document.getElementById('text_eq3_gain').value=getEqGainDisplay(allOldEQ[curButtonNo-1][2]);
                    setSliderPosition(controlsId.SLIDER_EQ3_THUMP,allOldEQ[curButtonNo-1][2]);
                    keepLinkEq3Button(curButtonNo, allOldEQ[curButtonNo-1][2]);
                    allOldEQ[curButtonNo-1][2] = 200;
                }

                if(eqData.EQ4.type > 2){
                    eqData.EQ4.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ4.HL_db_AP_Flag), 0);
                    keepLinkEq4Button(curButtonNo, 0);
                }else{
                    eqData.EQ4.level = allOldEQ[curButtonNo-1][3];
                    document.getElementById('text_eq4_gain').value=getEqGainDisplay(allOldEQ[curButtonNo-1][3]);
                    setSliderPosition(controlsId.SLIDER_EQ4_THUMP,allOldEQ[curButtonNo-1][3]);
                    keepLinkEq4Button(curButtonNo, allOldEQ[curButtonNo-1][3]);
                    allOldEQ[curButtonNo-1][3] = 200;
                }

                if(eqData.EQ5.type > 2){
                    eqData.EQ5.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ5.HL_db_AP_Flag), 0);
                    keepLinkEq5Button(curButtonNo, 0);
                }else{
                    eqData.EQ5.level = allOldEQ[curButtonNo-1][4];
                    document.getElementById('text_eq5_gain').value=getEqGainDisplay(allOldEQ[curButtonNo-1][4]);
                    setSliderPosition(controlsId.SLIDER_EQ5_THUMP,allOldEQ[curButtonNo-1][4]);
                    keepLinkEq5Button(curButtonNo, allOldEQ[curButtonNo-1][4]);
                    allOldEQ[curButtonNo-1][4] = 200;
                }


                if(eqData.EQ6.type > 2){
                    eqData.EQ6.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ6.HL_db_AP_Flag), 0);
                    keepLinkEq6Button(curButtonNo, 0);
                }else{
                    eqData.EQ6.level = allOldEQ[curButtonNo-1][5];
                    document.getElementById('text_eq6_gain').value=getEqGainDisplay(allOldEQ[curButtonNo-1][5]);
                    setSliderPosition(controlsId.SLIDER_EQ6_THUMP,allOldEQ[curButtonNo-1][5]);
                    keepLinkEq6Button(curButtonNo, allOldEQ[curButtonNo-1][5]);
                    allOldEQ[curButtonNo-1][5] = 200;
                }
            }

            break;
        case controlsId.BUTTON_EQ1:
            //console.log(curButtonNo);
            buttonElement = document.getElementById('button_eq1');
            if (controlsData.buttonStates.buttonEqStatus[1]){
                controlsData.buttonStates.buttonEqStatus[1] = false;
                buttonElement.setAttribute('class', 'button_eq_false');
                if(curButtonNo<5){
                    oldEQ[curButtonNo-1][0] = controlsData.inputData.InEQ.EQ1.level;
                    // console.log(controlsData.inputData.InEQ.EQ1.level );
                    // console.log(currentGroupData.dataInputA.InEQ.EQ1.level);
                    controlsData.inputData.InEQ.EQ1.level = 200;
                    // console.log(controlsData.inputData.InEQ.EQ1.level );
                    // console.log(currentGroupData.dataInputA.InEQ.EQ1.level);
                }else{
                    oldEQ[curButtonNo-1][0] = controlsData.outputData.OutEQ.EQ1.level;
                    controlsData.outputData.OutEQ.EQ1.level = 200;
                }
                // console.log(controlsData.inputData.InEQ.EQ1.level);
                // console.log(oldEQ[curButtonNo-1][0]);
                document.getElementById('text_eq1_gain').value=getEqGainDisplay(200);
                setSliderPosition(controlsId.SLIDER_EQ1_THUMP,200);
                keepLinkEq1Button(curButtonNo, 200);
            }else{
                controlsData.buttonStates.buttonEqStatus[1] = true;
                buttonElement.setAttribute('class', 'button_eq_true');
                if(curButtonNo<5){
                    controlsData.inputData.InEQ.EQ1.level = oldEQ[curButtonNo-1][0];
                }else{
                    controlsData.outputData.OutEQ.EQ1.level = oldEQ[curButtonNo-1][0];
                }
                //console.log(oldEQ[curButtonNo-1][0]);
                document.getElementById('text_eq1_gain').value=getEqGainDisplay(oldEQ[curButtonNo-1][0]);
                setSliderPosition(controlsId.SLIDER_EQ1_THUMP,oldEQ[curButtonNo-1][0]);
                keepLinkEq1Button(curButtonNo, oldEQ[curButtonNo-1][0]);
                oldEQ[curButtonNo-1][0] = 200;
            }

            break;
        case controlsId.BUTTON_EQ2:
            buttonElement = document.getElementById('button_eq2');
            if (controlsData.buttonStates.buttonEqStatus[2]){
                controlsData.buttonStates.buttonEqStatus[2] = false;
                buttonElement.setAttribute('class', 'button_eq_false');
                if(curButtonNo<5){
                    oldEQ[curButtonNo-1][1] = controlsData.inputData.InEQ.EQ2.level;
                    controlsData.inputData.InEQ.EQ2.level = 200;

                }else{
                    oldEQ[curButtonNo-1][1] = controlsData.outputData.OutEQ.EQ2.level;
                    controlsData.outputData.OutEQ.EQ2.level = 200;
                }
                document.getElementById('text_eq2_gain').value=getEqGainDisplay(200);
                setSliderPosition(controlsId.SLIDER_EQ2_THUMP,200);
                keepLinkEq2Button(curButtonNo, 200);
            }else{
                controlsData.buttonStates.buttonEqStatus[2] = true;
                buttonElement.setAttribute('class', 'button_eq_true');
                if(curButtonNo<5){
                    controlsData.inputData.InEQ.EQ2.level = oldEQ[curButtonNo-1][1];
                }else{
                    controlsData.outputData.OutEQ.EQ2.level = oldEQ[curButtonNo-1][1];
                }
                document.getElementById('text_eq2_gain').value=getEqGainDisplay(oldEQ[curButtonNo-1][1]);
                setSliderPosition(controlsId.SLIDER_EQ2_THUMP,oldEQ[curButtonNo-1][1]);
                keepLinkEq2Button(curButtonNo, oldEQ[curButtonNo-1][1]);
                oldEQ[curButtonNo-1][1] = 200;
            }

            break;
        case controlsId.BUTTON_EQ3:
            buttonElement = document.getElementById('button_eq3');
            if (controlsData.buttonStates.buttonEqStatus[3]){
                controlsData.buttonStates.buttonEqStatus[3] = false;
                buttonElement.setAttribute('class', 'button_eq_false');
                if(curButtonNo<5){
                    oldEQ[curButtonNo-1][2] = controlsData.inputData.InEQ.EQ3.level;
                    controlsData.inputData.InEQ.EQ3.level = 200;

                }else{
                    oldEQ[curButtonNo-1][2] = controlsData.outputData.OutEQ.EQ3.level;
                    controlsData.outputData.OutEQ.EQ3.level = 200;
                }
                document.getElementById('text_eq3_gain').value=getEqGainDisplay(200);
                setSliderPosition(controlsId.SLIDER_EQ3_THUMP,200);
                keepLinkEq3Button(curButtonNo, 200);
            }else{
                controlsData.buttonStates.buttonEqStatus[3] = true;
                buttonElement.setAttribute('class', 'button_eq_true');
                if(curButtonNo<5){
                    controlsData.inputData.InEQ.EQ3.level = oldEQ[curButtonNo-1][2];
                }else{
                    controlsData.outputData.OutEQ.EQ3.level = oldEQ[curButtonNo-1][2];
                }
                document.getElementById('text_eq3_gain').value=getEqGainDisplay(oldEQ[curButtonNo-1][2]);
                setSliderPosition(controlsId.SLIDER_EQ3_THUMP,oldEQ[curButtonNo-1][2]);
                keepLinkEq3Button(curButtonNo, oldEQ[curButtonNo-1][2]);
                oldEQ[curButtonNo-1][2] = 200;
            }
            break;

        case controlsId.BUTTON_EQ4:
            buttonElement = document.getElementById('button_eq4');
            if (controlsData.buttonStates.buttonEqStatus[4]){
                controlsData.buttonStates.buttonEqStatus[4] = false;
                buttonElement.setAttribute('class', 'button_eq_false');
                if(curButtonNo<5){
                    oldEQ[curButtonNo-1][3] = controlsData.inputData.InEQ.EQ4.level;
                    controlsData.inputData.InEQ.EQ4.level = 200;

                }else{
                    oldEQ[curButtonNo-1][3] = controlsData.outputData.OutEQ.EQ4.level;
                    controlsData.outputData.OutEQ.EQ4.level = 200;
                }
                document.getElementById('text_eq4_gain').value=getEqGainDisplay(200);
                setSliderPosition(controlsId.SLIDER_EQ4_THUMP,200);
                keepLinkEq4Button(curButtonNo, 200);
            }else{
                controlsData.buttonStates.buttonEqStatus[4] = true;
                buttonElement.setAttribute('class', 'button_eq_true');
                if(curButtonNo<5){
                    controlsData.inputData.InEQ.EQ4.level = oldEQ[curButtonNo-1][3];
                }else{
                    controlsData.outputData.OutEQ.EQ4.level = oldEQ[curButtonNo-1][3];
                }
                document.getElementById('text_eq4_gain').value=getEqGainDisplay(oldEQ[curButtonNo-1][3]);
                setSliderPosition(controlsId.SLIDER_EQ4_THUMP,oldEQ[curButtonNo-1][3]);
                keepLinkEq4Button(curButtonNo, oldEQ[curButtonNo-1][3]);
                oldEQ[curButtonNo-1][3] = 200;
            }
            break;

        case controlsId.BUTTON_EQ5:
            buttonElement = document.getElementById('button_eq5');
            if (controlsData.buttonStates.buttonEqStatus[5]){
                controlsData.buttonStates.buttonEqStatus[5] = false;
                buttonElement.setAttribute('class', 'button_eq_false');
                if(curButtonNo<5){
                    oldEQ[curButtonNo-1][4] = controlsData.inputData.InEQ.EQ5.level;
                    controlsData.inputData.InEQ.EQ5.level = 200;

                }else{
                    oldEQ[curButtonNo-1][4] = controlsData.outputData.OutEQ.EQ5.level;
                    controlsData.outputData.OutEQ.EQ5.level = 200;
                }
                document.getElementById('text_eq5_gain').value=getEqGainDisplay(200);
                setSliderPosition(controlsId.SLIDER_EQ5_THUMP,200);
                keepLinkEq5Button(curButtonNo, 200);
            }else{
                controlsData.buttonStates.buttonEqStatus[5] = true;
                buttonElement.setAttribute('class', 'button_eq_true');
                if(curButtonNo<5){
                    controlsData.inputData.InEQ.EQ5.level = oldEQ[curButtonNo-1][4];
                }else{
                    controlsData.outputData.OutEQ.EQ5.level = oldEQ[curButtonNo-1][4];
                }
                document.getElementById('text_eq5_gain').value=getEqGainDisplay(oldEQ[curButtonNo-1][4]);
                setSliderPosition(controlsId.SLIDER_EQ5_THUMP,oldEQ[curButtonNo-1][4]);
                keepLinkEq5Button(curButtonNo, oldEQ[curButtonNo-1][4]);
                oldEQ[curButtonNo-1][4] = 200;
            }
            break;

        case controlsId.BUTTON_EQ6:
            buttonElement = document.getElementById('button_eq6');
            if (controlsData.buttonStates.buttonEqStatus[6]){
                controlsData.buttonStates.buttonEqStatus[6] = false;
                buttonElement.setAttribute('class', 'button_eq_false');
                if(curButtonNo<5){
                    oldEQ[curButtonNo-1][5] = controlsData.inputData.InEQ.EQ6.level;
                    controlsData.inputData.InEQ.EQ6.level = 200;

                }else{
                    oldEQ[curButtonNo-1][5] = controlsData.outputData.OutEQ.EQ6.level;
                    controlsData.outputData.OutEQ.EQ6.level = 200;
                }
                document.getElementById('text_eq6_gain').value=getEqGainDisplay(200);
                setSliderPosition(controlsId.SLIDER_EQ6_THUMP,200);
                keepLinkEq6Button(curButtonNo, 200);
            }else{
                controlsData.buttonStates.buttonEqStatus[6] = true;
                buttonElement.setAttribute('class', 'button_eq_true');
                if(curButtonNo<5){
                    controlsData.inputData.InEQ.EQ6.level = oldEQ[curButtonNo-1][5];
                }else{
                    controlsData.outputData.OutEQ.EQ6.level = oldEQ[curButtonNo-1][5];
                }
                document.getElementById('text_eq6_gain').value=getEqGainDisplay(oldEQ[curButtonNo-1][5]);
                setSliderPosition(controlsId.SLIDER_EQ6_THUMP,oldEQ[curButtonNo-1][5]);
                keepLinkEq6Button(curButtonNo, oldEQ[curButtonNo-1][5]);
                oldEQ[curButtonNo-1][5] = 200;
            }
            break;

        default:
            break;
    }
    updateAllEqGainButton();
    DrawLine();
}


function buttonEqOnclickAllPass(id){
    var buttonElement;
    switch (id){
        case controlsId.BUTTON_EQ:
            buttonElement = document.getElementById('button_eq');
            if (controlsData.buttonStates.buttonEqStatus[0]){
                controlsData.buttonStates.buttonEqStatus[0] = false;
                eqData.EQ1.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ1.HL_db_AP_Flag),1);
                eqData.EQ2.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ2.HL_db_AP_Flag),1);
                eqData.EQ3.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ3.HL_db_AP_Flag),1);
                eqData.EQ4.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ4.HL_db_AP_Flag),1);
                eqData.EQ5.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ5.HL_db_AP_Flag),1);
                eqData.EQ6.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ6.HL_db_AP_Flag),1);
                buttonElement.setAttribute('class', 'button_eq_false');
                keepLinkEq1Button(curButtonNo, 1);
                keepLinkEq2Button(curButtonNo, 1);
                keepLinkEq3Button(curButtonNo, 1);
                keepLinkEq4Button(curButtonNo, 1);
                keepLinkEq5Button(curButtonNo, 1);
                keepLinkEq6Button(curButtonNo, 1);

            }else{
                controlsData.buttonStates.buttonEqStatus[0] = true;
                eqData.EQ1.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ1.HL_db_AP_Flag),0);
                eqData.EQ2.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ2.HL_db_AP_Flag),0);
                eqData.EQ3.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ3.HL_db_AP_Flag),0);
                eqData.EQ4.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ4.HL_db_AP_Flag),0);
                eqData.EQ5.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ5.HL_db_AP_Flag),0);
                eqData.EQ6.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ6.HL_db_AP_Flag),0);
                buttonElement.setAttribute('class', 'button_eq_true');
                keepLinkEq1Button(curButtonNo, 0);
                keepLinkEq2Button(curButtonNo, 0);
                keepLinkEq3Button(curButtonNo, 0);
                keepLinkEq4Button(curButtonNo, 0);
                keepLinkEq5Button(curButtonNo, 0);
                keepLinkEq6Button(curButtonNo, 0);
            }

            break;
        case controlsId.BUTTON_EQ1:
            //console.log(curButtonNo);
            buttonElement = document.getElementById('button_eq1');
            if (controlsData.buttonStates.buttonEqStatus[1]){
                controlsData.buttonStates.buttonEqStatus[1] = false;
                buttonElement.setAttribute('class', 'button_eq_false');
                eqData.EQ1.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ1.HL_db_AP_Flag),1);
                keepLinkEq1Button(curButtonNo, 1);
            }else{
                controlsData.buttonStates.buttonEqStatus[1] = true;
                buttonElement.setAttribute('class', 'button_eq_true');
                eqData.EQ1.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ1.HL_db_AP_Flag),0);
                keepLinkEq1Button(curButtonNo, 0);
            }
            break;
        case controlsId.BUTTON_EQ2:
            buttonElement = document.getElementById('button_eq2');
            if (controlsData.buttonStates.buttonEqStatus[2]){
                controlsData.buttonStates.buttonEqStatus[2] = false;
                buttonElement.setAttribute('class', 'button_eq_false');
                eqData.EQ2.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ2.HL_db_AP_Flag),1);
                keepLinkEq2Button(curButtonNo, 1);
            }else{
                controlsData.buttonStates.buttonEqStatus[2] = true;
                buttonElement.setAttribute('class', 'button_eq_true');
                eqData.EQ2.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ2.HL_db_AP_Flag),0);
                keepLinkEq2Button(curButtonNo, 0);
            }
            break;
        case controlsId.BUTTON_EQ3:
            buttonElement = document.getElementById('button_eq3');
            if (controlsData.buttonStates.buttonEqStatus[3]){
                controlsData.buttonStates.buttonEqStatus[3] = false;
                buttonElement.setAttribute('class', 'button_eq_false');
                eqData.EQ3.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ3.HL_db_AP_Flag),1);
                keepLinkEq3Button(curButtonNo, 1);
            }else{
                controlsData.buttonStates.buttonEqStatus[3] = true;
                buttonElement.setAttribute('class', 'button_eq_true');
                eqData.EQ3.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ3.HL_db_AP_Flag),0);
                keepLinkEq3Button(curButtonNo, 0);
            }
            break;

        case controlsId.BUTTON_EQ4:
            buttonElement = document.getElementById('button_eq4');
            if (controlsData.buttonStates.buttonEqStatus[4]){
                controlsData.buttonStates.buttonEqStatus[4] = false;
                buttonElement.setAttribute('class', 'button_eq_false');
                eqData.EQ4.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ4.HL_db_AP_Flag),1);
                keepLinkEq4Button(curButtonNo, 1);
            }else{
                controlsData.buttonStates.buttonEqStatus[4] = true;
                buttonElement.setAttribute('class', 'button_eq_true');
                eqData.EQ4.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ4.HL_db_AP_Flag),0);
                keepLinkEq4Button(curButtonNo, 0);
            }
            break;

        case controlsId.BUTTON_EQ5:
            buttonElement = document.getElementById('button_eq5');
            if (controlsData.buttonStates.buttonEqStatus[5]){
                controlsData.buttonStates.buttonEqStatus[5] = false;
                buttonElement.setAttribute('class', 'button_eq_false');
                eqData.EQ5.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ5.HL_db_AP_Flag),1);
                keepLinkEq5Button(curButtonNo, 1);
            }else{
                controlsData.buttonStates.buttonEqStatus[5] = true;
                buttonElement.setAttribute('class', 'button_eq_true');
                eqData.EQ5.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ5.HL_db_AP_Flag),0);
                keepLinkEq5Button(curButtonNo, 0);
            }
            break;

        case controlsId.BUTTON_EQ6:
            buttonElement = document.getElementById('button_eq6');
            if (controlsData.buttonStates.buttonEqStatus[6]){
                controlsData.buttonStates.buttonEqStatus[6] = false;
                buttonElement.setAttribute('class', 'button_eq_false');
                eqData.EQ6.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ6.HL_db_AP_Flag),1);
                keepLinkEq6Button(curButtonNo, 1);
            }else{
                controlsData.buttonStates.buttonEqStatus[6] = true;
                buttonElement.setAttribute('class', 'button_eq_true');
                eqData.EQ6.HL_db_AP_Flag = SET_4L_BYTE(GET_4H_BYTE(eqData.EQ6.HL_db_AP_Flag),0);
                keepLinkEq6Button(curButtonNo, 0);
            }
            break;

        default:
            break;
    }
    updateAllEqGainButton();
    DrawLine();

}


//==============================================================================================
function frameButtonManager(id, type){
    var buttonElement;
    var buttonId;
    switch(id){
        case controlsId.BUTTON_HELP:
            buttonId = 'button_help';
            break;
        case controlsId.BUTTON_PROGRAM:
            buttonId = 'button_program';
            break;
        // case controlsId.BUTTON_SET:
        //     buttonId = 'button_set';
        //     break;
        case controlsId.BUTTON_DISPLAY:
            buttonId = 'button_display';
            break;
        case controlsId.BUTTON_LOCK:
            buttonId = 'button_lock';
            break;
        case controlsId.BUTTON_REPORT:
            buttonId = 'button_report';
            break;
        default:
            break;
    }
}





//===================================================================================================
function buttonPhaseCurveOnclick(){ //相位曲线按钮
    var buttonControl = document.getElementById('button_phase_curve');
    var phaseStrip = document.getElementById('phase_curve_progress');
    var status = false;
    if (controlsData.buttonStates.buttonPhaseCurveStatus[curButtonNo-1]){
        controlsData.buttonStates.buttonPhaseCurveStatus[curButtonNo-1] = false;
        status = false;
        buttonControl.setAttribute('class', 'button_phase_curve_true');
        phaseStrip.style.background = 'white';
    }else{
        controlsData.buttonStates.buttonPhaseCurveStatus[curButtonNo-1] = true;
        status = true;
        buttonControl.setAttribute('class', 'button_phase_curve_false');
        if(curButtonNo >=5){
            phaseStrip.style.background = COLOR_OUT[curButtonNo - 5];
        }else{
            phaseStrip.style.background = COLOR_INPUT[curButtonNo - 1];
        }
    }

    keepLinkPhaseLineStatus(curButtonNo, status);
    DrawLine();
}

function setCurPhaseCurveStatus(){ //设置相位曲线按钮状态
    var buttonControl = document.getElementById('button_phase_curve');
    var phaseStrip = document.getElementById('phase_curve_progress');
    if (controlsData.buttonStates.buttonPhaseCurveStatus[curButtonNo-1]){
        buttonControl.setAttribute('class', 'button_phase_curve_true');
        if(curButtonNo >= 5){
            phaseStrip.style.background = COLOR_OUT[curButtonNo - 5];
        }else{
            phaseStrip.style.background = COLOR_INPUT[curButtonNo - 1];
        }
    }else{
        buttonControl.setAttribute('class', 'button_phase_curve_false');

        phaseStrip.style.background = 'white';
    }
}
//===================================================================================================
function buttonPhaseOnclick(){ //输入相位按钮
    if(curButtonNo > 4){
        return;
    }
    var buttonControl = document.getElementById('button_phase');
    var status;
    if (controlsData.buttonStates.buttonPhaseDirectionStatus[curButtonNo-1]){
        controlsData.buttonStates.buttonPhaseDirectionStatus[curButtonNo-1] = false;
        buttonControl.setAttribute('class', 'button_phase_false');
        document.getElementById('black_one').style.display = 'inline';
        document.getElementById('black_two').style.display = 'inline';
        document.getElementById('red_one').style.display = 'none';
        document.getElementById('red_two').style.display = 'none';
        status = 0;
    }else{
        controlsData.buttonStates.buttonPhaseDirectionStatus[curButtonNo-1] = true;
        buttonControl.setAttribute('class', 'button_phase_true');
        document.getElementById('black_one').style.display = 'none';
        document.getElementById('black_two').style.display = 'none';
        document.getElementById('red_one').style.display = 'inline';
        document.getElementById('red_two').style.display = 'inline';
        status = 1;
    }

    switch (curButtonNo) {
        case 1:
            currentGroupData.dataInputA.polar = status;
            m_nInMapEQ[0].polar = status;
            break;
        case 2:
            currentGroupData.dataInputB.polar = status;
            m_nInMapEQ[1].polar = status;
            break;
        case 3:
            currentGroupData.dataInputC.polar = status;
            m_nInMapEQ[2].polar = status;
            break;
        case 4:
            currentGroupData.dataInputD.polar  = status;
            m_nInMapEQ[3].polar = status;
            break;
        default:
            break;
    }
    keepLinkInputPhase(curButtonNo, status);
    DrawLine();
}

function setPhaseDirectionStatus(){ //设置输入相位按钮正反状态
    if(curButtonNo>4){
        return;
    }
    var buttonControl = document.getElementById('button_phase');
    if (controlsData.buttonStates.buttonPhaseDirectionStatus[curButtonNo-1]){
        buttonControl.setAttribute('class', 'button_phase_true');
        if(currentLockData.nIn_LockData.nIn_Pol) {
            document.getElementById('black_one').style.display = 'none';
            document.getElementById('black_two').style.display = 'none';
            document.getElementById('red_one').style.display = 'none';
            document.getElementById('red_two').style.display = 'none';
        } else {
            document.getElementById('black_one').style.display = 'none';
            document.getElementById('black_two').style.display = 'none';
            document.getElementById('red_one').style.display = 'inline';
            document.getElementById('red_two').style.display = 'inline';
        }
    }else{
        buttonControl.setAttribute('class', 'button_phase_false');
        if(currentLockData.nIn_LockData.nIn_Pol) {
            document.getElementById('black_one').style.display = 'none';
            document.getElementById('black_two').style.display = 'none';
            document.getElementById('red_one').style.display = 'none';
            document.getElementById('red_two').style.display = 'none';
        } else {
            document.getElementById('black_one').style.display = 'inline';
            document.getElementById('black_two').style.display = 'inline';
            document.getElementById('red_one').style.display = 'none';
            document.getElementById('red_two').style.display = 'none';
        }
    }
    //console.log(controlsData.buttonStates.buttonPhaseDirectionStatus[curButtonNo-1]);
}

//===================================================================================================
function buttonPhaseOutOnclick(){
    if(curButtonNo < 5){
        return;
    }

    var buttonControl = document.getElementById('button_phase_out');
    var status;
    if (controlsData.buttonStates.buttonPhaseDirectionStatus[curButtonNo-1]){
        controlsData.buttonStates.buttonPhaseDirectionStatus[curButtonNo-1] = false;
        buttonControl.setAttribute('class', 'button_phase_false_out');
        document.getElementById('black_one_out').style.display = 'inline';
        document.getElementById('black_two_out').style.display = 'inline';
        document.getElementById('red_one_out').style.display = 'none';
        document.getElementById('red_two_out').style.display = 'none';
        status = 0;
    }else{
        controlsData.buttonStates.buttonPhaseDirectionStatus[curButtonNo-1] = true;
        buttonControl.setAttribute('class', 'button_phase_true_out');
        document.getElementById('black_one_out').style.display = 'none';
        document.getElementById('black_two_out').style.display = 'none';
        document.getElementById('red_one_out').style.display = 'inline';
        document.getElementById('red_two_out').style.display = 'inline';
        status = 1;
    }

    switch (curButtonNo) {
        case 5:
            currentGroupData.dataOut1.polar = status;
            m_nOutMapEQ[0].polar = status;
            break;
        case 6:
            currentGroupData.dataOut2.polar = status;
            m_nOutMapEQ[1].polar = status;
            break;
        case 7:
            currentGroupData.dataOut3.polar = status;
            m_nOutMapEQ[2].polar = status;
            break;
        case 8:
            currentGroupData.dataOut4.polar = status;
            m_nOutMapEQ[3].polar = status;
            break;
        case 9:
            currentGroupData.dataOut5.polar = status;
            m_nOutMapEQ[4].polar = status;
            break;
        case 10:
            currentGroupData.dataOut6.polar = status;
            m_nOutMapEQ[5].polar = status;
            break;
        case 11:
            currentGroupData.dataOut7.polar = status;
            m_nOutMapEQ[6].polar = status;
            break;
        case 12:
            currentGroupData.dataOut8.polar = status;
            m_nOutMapEQ[7].polar = status;
            break;
        default:

            break;
    }
    keepLinkOutPhase(curButtonNo, status);
    DrawLine();
}

function setPhaseOutDirectionStatus(){ //设置输出相位按钮正反状态
    if(curButtonNo>4){
        var buttonControl = document.getElementById('button_phase_out');
        if (controlsData.buttonStates.buttonPhaseDirectionStatus[curButtonNo-1]){
            buttonControl.setAttribute('class', 'button_phase_true_out');
            if(currentLockData.nOut_LockData.nOut_Pol) {
                document.getElementById('black_one_out').style.display = 'none';
                document.getElementById('black_two_out').style.display = 'none';
                document.getElementById('red_one_out').style.display = 'none';
                document.getElementById('red_two_out').style.display = 'none';
            } else {
                document.getElementById('black_one_out').style.display = 'none';
                document.getElementById('black_two_out').style.display = 'none';
                document.getElementById('red_one_out').style.display = 'inline';
                document.getElementById('red_two_out').style.display = 'inline';
            }
        }else{
            buttonControl.setAttribute('class', 'button_phase_false_out');
            if(currentLockData.nOut_LockData.nOut_Pol) {
                document.getElementById('black_one_out').style.display = 'none';
                document.getElementById('black_two_out').style.display = 'none';
                document.getElementById('red_one_out').style.display = 'none';
                document.getElementById('red_two_out').style.display = 'none';
            } else {
                document.getElementById('black_one_out').style.display = 'inline';
                document.getElementById('black_two_out').style.display = 'inline';
                document.getElementById('red_one_out').style.display = 'none';
                document.getElementById('red_two_out').style.display = 'none';
            }


        }
    }
}
//input and output display change
//===================================================================================================
function inputOrOutputModule(isInput) {
    var gate = document.getElementById("gate");
    var dynamic = document.getElementById("dynamic");
    var compress = document.getElementById("compress");
    var delay_phase_out = document.getElementById("delay_phase_out");
    var xover = document.getElementById("xover");
    var limit = document.getElementById("limit");

    if(isInput){
        gate.style.display = 'inline';
        dynamic.style.display = 'inline';
        compress.style.display = 'inline';
        delay_phase_out.style.display = 'none';
        xover.style.display = 'none';
        limit.style.display = 'none';
    }else {
        gate.style.display = 'none';
        dynamic.style.display = 'none';
        compress.style.display = 'none';
        delay_phase_out.style.display = 'inline';
        xover.style.display = 'inline';
        limit.style.display = 'inline';
    }
}


//==============================================================================


function buttonHelpOnclick(){
    alert('末找到帮助文件');
}




function getYourIP(){ //获取客户端的IP地址 有多个网卡将有多个地址
    var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    if (RTCPeerConnection) (function () {
        var rtc = new RTCPeerConnection({iceServers:[]});
        if (1 || window.mozRTCPeerConnection) {
            rtc.createDataChannel('', {reliable:false});
        };

        rtc.onicecandidate = function (evt) {
            if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
        };

        rtc.createOffer(function (offerDesc) {
            grepSDP(offerDesc.sdp);
            rtc.setLocalDescription(offerDesc);
        }, function (e) { console.warn("offer failed", e); });


        var addrs = Object.create(null);
        addrs["0.0.0.0"] = false;

        function updateDisplay(newAddr) {
            if (newAddr in addrs) return;
            else addrs[newAddr] = true;
            var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
            for(var i = 0; i < displayAddrs.length; i++){
                if(displayAddrs[i].length > 16){
                    displayAddrs.splice(i, 1);
                    i--;
                }
            }
            console.log(displayAddrs[0]);
        }

        function grepSDP(sdp) {
            var hosts = [];
            sdp.split('\r\n').forEach(function (line, index, arr) {
                if (~line.indexOf("a=candidate")) {
                    var parts = line.split(' '),
                        addr = parts[4],
                        type = parts[7];
                    if (type === 'host') updateDisplay(addr);
                } else if (~line.indexOf("c=")) {
                    var parts = line.split(' '),
                        addr = parts[2];
                    updateDisplay(addr);
                }
            });
        }
    })();
    else{
        console.log('only for: chrome,firefox,opera,safari');
    }
}


var buttonTest=0;
function buttonProgramOnclick(){
    curtainOption(1);

    // getYourIP();  //获取客户端IP地址
    // buttonTest++; //用于测试不同设备类型 24 26 28 36 46 48对应该的不同显示
    // var buttonElement = document.getElementById('button_program');
    // buttonTest = buttonTest > 6 ? 1 : buttonTest;
    // switch (buttonTest ){
    //     case 1:
    //         setDeviceTypeDisplay(24);
    //         buttonElement.innerText = '24';
    //         break;
    //     case 2:
    //         setDeviceTypeDisplay(26);
    //         buttonElement.innerText = '26';
    //         break;
    //     case 3:
    //         setDeviceTypeDisplay(28);
    //         buttonElement.innerText = '28';
    //         break;
    //     case 4:
    //         setDeviceTypeDisplay(36);
    //         buttonElement.innerText = '36';
    //         break;
    //     case 5:
    //         setDeviceTypeDisplay(46);
    //         buttonElement.innerText = '46';
    //         break;
    //     case 6:
    //         setDeviceTypeDisplay(48);
    //         buttonElement.innerText = '48';
    //         break;
    // }
}

function buttonSetOnclick(){

}

function buttonDisplayOnclick(){
    curtainOption(3);
}



function buttonLockOnclick(){
    var mainCurtain = document.getElementById("curtain");
    mainCurtain.style.display = "none";

    var lockCurtain = document.getElementById("lock_curtain");
    lockCurtain.style.display = "inline";
    lockCurtain.style.top = '15px';

    lockFrame.lockFrameWelcome();
}

function buttonReportOnclick(){
    initReportDisplay();
    curtainOption(5);

}

function buttonLanguageOnclick () {
    isChinese = !isChinese;
    if (isChinese) {
        document.getElementById('button_language').innerText = 'English';
    } else {
        document.getElementById('button_language').innerText = '中文';
    }

    languageFrame.languageOperate();
}








