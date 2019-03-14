function refreshMainDisplay() {
    oldGroupData = deepCopy(currentGroupData);
    oldButtonNo = curButtonNo;
    curButtonNo = 1;
    //相位曲线按钮 状态复位
    controlsData.buttonStates.buttonPhaseCurveStatus = [true, true, true, true, true, true, true, true, true, true, true, true];

    upDateButtonStatus();
    selectButtonOnclick(controlsId.BUTTON_INPUT_A);
    resetButtonCurveStatus();
    controlsData.buttonStates.buttonCurveStatus[0] = true;
    assignButtonCurveStatus();
    svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
    hideHLPFChannelName();

    assignAllInputTextData();
    assignSliderPosition();
    assignAllButtonStatus();
    inputOrOutputModule(true);
    // curveDataKeepStep(1,1); 将曲线图的数据更新到eq结构体
    refreshKeepStep();
    initPolar();
    setPhaseDirectionStatus();

    updateDeqButton();
    if(currentLockData.nIn_LockData.nIn_EQ){
        svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        inputEqBeLocked();
        renewAllLinePoints();
        DrawLine();
    }else {
        if(curEqChannel > 6) {
            curEqChannel = 1;
        }
        showOrHideEqData();
        //curEqChannel = 1;
        inputEqUnlock();
        renewAllLinePoints();
        DrawLine();
    }
    agcExtMap.Draw_AGC_Comp();
    setCurPhaseCurveStatus();//设置相位曲线按钮状态
    clearLedDisplay();
    clearOldEQ();
}

function assignAllButtonStatus() {
    assignButtonSelectStatus();
    assignButtonSourceStatus();
    assignButtonSpeakerStatus();
    assignButtonEqStatus();
    assignButtonCurveStatus();
    assignPhaseCurveStatus();
    //assignPhaseDirectionStatus();
}

function assignButtonSelectStatus() {
    controlsData.buttonStates.buttonSelectStatus[0] = false;
    oldButtonNo = curButtonNo = 1;
    var buttonElement = document.getElementById('button_input_a');
    buttonElement.setAttribute('class', 'button_four_states_false');
}

function setButtonSourceStatus(id,status) {
    var buttonElement = document.getElementById(id);
    if (status){
        buttonElement.setAttribute('class', 'button_six_states_true');
    }else{
        buttonElement.setAttribute('class', 'button_six_states_false');
    }
}

function assignButtonSourceStatus() {

    controlsData.buttonStates.buttonSourceStatus[0][0] = currentGroupData.dataOut1.sourceA;
    controlsData.buttonStates.buttonSourceStatus[0][1] = currentGroupData.dataOut1.sourceB;
    controlsData.buttonStates.buttonSourceStatus[0][2] = currentGroupData.dataOut1.sourceC;
    controlsData.buttonStates.buttonSourceStatus[0][3] = currentGroupData.dataOut1.sourceD;

    controlsData.buttonStates.buttonSourceStatus[1][0] = currentGroupData.dataOut2.sourceA;
    controlsData.buttonStates.buttonSourceStatus[1][1] = currentGroupData.dataOut2.sourceB;
    controlsData.buttonStates.buttonSourceStatus[1][2] = currentGroupData.dataOut2.sourceC;
    controlsData.buttonStates.buttonSourceStatus[1][3] = currentGroupData.dataOut2.sourceD;

    controlsData.buttonStates.buttonSourceStatus[2][0] = currentGroupData.dataOut3.sourceA;
    controlsData.buttonStates.buttonSourceStatus[2][1] = currentGroupData.dataOut3.sourceB;
    controlsData.buttonStates.buttonSourceStatus[2][2] = currentGroupData.dataOut3.sourceC;
    controlsData.buttonStates.buttonSourceStatus[2][3] = currentGroupData.dataOut3.sourceD;

    controlsData.buttonStates.buttonSourceStatus[3][0] = currentGroupData.dataOut4.sourceA;
    controlsData.buttonStates.buttonSourceStatus[3][1] = currentGroupData.dataOut4.sourceB;
    controlsData.buttonStates.buttonSourceStatus[3][2] = currentGroupData.dataOut4.sourceC;
    controlsData.buttonStates.buttonSourceStatus[3][3] = currentGroupData.dataOut4.sourceD;

    controlsData.buttonStates.buttonSourceStatus[4][0] = currentGroupData.dataOut5.sourceA;
    controlsData.buttonStates.buttonSourceStatus[4][1] = currentGroupData.dataOut5.sourceB;
    controlsData.buttonStates.buttonSourceStatus[4][2] = currentGroupData.dataOut5.sourceC;
    controlsData.buttonStates.buttonSourceStatus[4][3] = currentGroupData.dataOut5.sourceD;

    controlsData.buttonStates.buttonSourceStatus[5][0] = currentGroupData.dataOut6.sourceA;
    controlsData.buttonStates.buttonSourceStatus[5][1] = currentGroupData.dataOut6.sourceB;
    controlsData.buttonStates.buttonSourceStatus[5][2] = currentGroupData.dataOut6.sourceC;
    controlsData.buttonStates.buttonSourceStatus[5][3] = currentGroupData.dataOut6.sourceD;

    controlsData.buttonStates.buttonSourceStatus[6][0] = currentGroupData.dataOut7.sourceA;
    controlsData.buttonStates.buttonSourceStatus[6][1] = currentGroupData.dataOut7.sourceB;
    controlsData.buttonStates.buttonSourceStatus[6][2] = currentGroupData.dataOut7.sourceC;
    controlsData.buttonStates.buttonSourceStatus[6][3] = currentGroupData.dataOut7.sourceD;

    controlsData.buttonStates.buttonSourceStatus[7][0] = currentGroupData.dataOut8.sourceA;
    controlsData.buttonStates.buttonSourceStatus[7][1] = currentGroupData.dataOut8.sourceB;
    controlsData.buttonStates.buttonSourceStatus[7][2] = currentGroupData.dataOut8.sourceC;
    controlsData.buttonStates.buttonSourceStatus[7][3] = currentGroupData.dataOut8.sourceD;



    setButtonSourceStatus('button_out1_a',controlsData.buttonStates.buttonSourceStatus[0][0]);
    setButtonSourceStatus('button_out1_b',controlsData.buttonStates.buttonSourceStatus[0][1]);
    setButtonSourceStatus('button_out1_c',controlsData.buttonStates.buttonSourceStatus[0][2]);
    setButtonSourceStatus('button_out1_d',controlsData.buttonStates.buttonSourceStatus[0][3]);

    setButtonSourceStatus('button_out2_a',controlsData.buttonStates.buttonSourceStatus[1][0]);
    setButtonSourceStatus('button_out2_b',controlsData.buttonStates.buttonSourceStatus[1][1]);
    setButtonSourceStatus('button_out2_c',controlsData.buttonStates.buttonSourceStatus[1][2]);
    setButtonSourceStatus('button_out2_d',controlsData.buttonStates.buttonSourceStatus[1][3]);

    setButtonSourceStatus('button_out3_a',controlsData.buttonStates.buttonSourceStatus[2][0]);
    setButtonSourceStatus('button_out3_b',controlsData.buttonStates.buttonSourceStatus[2][1]);
    setButtonSourceStatus('button_out3_c',controlsData.buttonStates.buttonSourceStatus[2][2]);
    setButtonSourceStatus('button_out3_d',controlsData.buttonStates.buttonSourceStatus[2][3]);

    setButtonSourceStatus('button_out4_a',controlsData.buttonStates.buttonSourceStatus[3][0]);
    setButtonSourceStatus('button_out4_b',controlsData.buttonStates.buttonSourceStatus[3][1]);
    setButtonSourceStatus('button_out4_c',controlsData.buttonStates.buttonSourceStatus[3][2]);
    setButtonSourceStatus('button_out4_d',controlsData.buttonStates.buttonSourceStatus[3][3]);

    setButtonSourceStatus('button_out5_a',controlsData.buttonStates.buttonSourceStatus[4][0]);
    setButtonSourceStatus('button_out5_b',controlsData.buttonStates.buttonSourceStatus[4][1]);
    setButtonSourceStatus('button_out5_c',controlsData.buttonStates.buttonSourceStatus[4][2]);
    setButtonSourceStatus('button_out5_d',controlsData.buttonStates.buttonSourceStatus[4][3]);

    setButtonSourceStatus('button_out6_a',controlsData.buttonStates.buttonSourceStatus[5][0]);
    setButtonSourceStatus('button_out6_b',controlsData.buttonStates.buttonSourceStatus[5][1]);
    setButtonSourceStatus('button_out6_c',controlsData.buttonStates.buttonSourceStatus[5][2]);
    setButtonSourceStatus('button_out6_d',controlsData.buttonStates.buttonSourceStatus[5][3]);

    setButtonSourceStatus('button_out7_a',controlsData.buttonStates.buttonSourceStatus[6][0]);
    setButtonSourceStatus('button_out7_b',controlsData.buttonStates.buttonSourceStatus[6][1]);
    setButtonSourceStatus('button_out7_c',controlsData.buttonStates.buttonSourceStatus[6][2]);
    setButtonSourceStatus('button_out7_d',controlsData.buttonStates.buttonSourceStatus[6][3]);

    setButtonSourceStatus('button_out8_a',controlsData.buttonStates.buttonSourceStatus[7][0]);
    setButtonSourceStatus('button_out8_b',controlsData.buttonStates.buttonSourceStatus[7][1]);
    setButtonSourceStatus('button_out8_c',controlsData.buttonStates.buttonSourceStatus[7][2]);
    setButtonSourceStatus('button_out8_d',controlsData.buttonStates.buttonSourceStatus[7][3]);
}



function setButtonSpeakerStatus(id, spanId1, spanId2, status) {
    var buttonElement = document.getElementById(id);
    var speakerSpan1 = document.getElementById(spanId1);
    var speakerSpan2 = document.getElementById(spanId2);
    if (status){
        buttonElement.setAttribute('class', 'button_speaker_true');
        speakerSpan1.setAttribute('class', 'speakingSpan1');
        speakerSpan2.setAttribute('class', 'speakingSpan2');
    }else{
        buttonElement.setAttribute('class', 'button_speaker_false');
        speakerSpan1.setAttribute('class', 'muteSpan1');
        speakerSpan2.setAttribute('class', 'muteSpan2');
    }
}

function assignButtonSpeakerStatus() {
    setButtonSpeakerStatus('button_speaker_a', 'speakerIn1Span1', 'speakerIn1Span2', controlsData.buttonStates.buttonSpeakerStatus[0]);
    setButtonSpeakerStatus('button_speaker_b', 'speakerIn2Span1', 'speakerIn2Span2', controlsData.buttonStates.buttonSpeakerStatus[1]);
    setButtonSpeakerStatus('button_speaker_c', 'speakerIn3Span1', 'speakerIn3Span2', controlsData.buttonStates.buttonSpeakerStatus[2]);
    setButtonSpeakerStatus('button_speaker_d', 'speakerIn4Span1', 'speakerIn4Span2', controlsData.buttonStates.buttonSpeakerStatus[3]);

    setButtonSpeakerStatus('button_speaker_out1', 'speakerOut1Span1', 'speakerOut1Span2', controlsData.buttonStates.buttonSpeakerStatus[4]);
    setButtonSpeakerStatus('button_speaker_out2', 'speakerOut2Span1', 'speakerOut2Span2', controlsData.buttonStates.buttonSpeakerStatus[5]);
    setButtonSpeakerStatus('button_speaker_out3', 'speakerOut3Span1', 'speakerOut3Span2', controlsData.buttonStates.buttonSpeakerStatus[6]);
    setButtonSpeakerStatus('button_speaker_out4', 'speakerOut4Span1', 'speakerOut4Span2', controlsData.buttonStates.buttonSpeakerStatus[7]);
    setButtonSpeakerStatus('button_speaker_out5', 'speakerOut5Span1', 'speakerOut5Span2', controlsData.buttonStates.buttonSpeakerStatus[8]);
    setButtonSpeakerStatus('button_speaker_out6', 'speakerOut6Span1', 'speakerOut6Span2', controlsData.buttonStates.buttonSpeakerStatus[9]);
    setButtonSpeakerStatus('button_speaker_out7', 'speakerOut7Span1', 'speakerOut7Span2', controlsData.buttonStates.buttonSpeakerStatus[10]);
    setButtonSpeakerStatus('button_speaker_out8', 'speakerOut8Span1', 'speakerOut8Span2', controlsData.buttonStates.buttonSpeakerStatus[11]);
}





function setButtonEqStatus(id,status) {
    var buttonElement = document.getElementById(id);
    if (status){
        buttonElement.setAttribute('class', 'button_eq_true');
    }else{
        buttonElement.setAttribute('class', 'button_eq_false');
    }
}

function setButtonDeqStatus(id, status) {
    var buttonElement = document.getElementById(id);
    if (status) {
        buttonElement.setAttribute('class', 'button_deq_true');
    } else {
        buttonElement.setAttribute('class', 'button_deq_false');
    }
}

function assignButtonEqStatus() {
    setButtonEqStatus('button_eq', controlsData.buttonStates.buttonEqStatus[0]);
    setButtonEqStatus('button_eq1', controlsData.buttonStates.buttonEqStatus[1]);
    setButtonEqStatus('button_eq2', controlsData.buttonStates.buttonEqStatus[2]);
    setButtonEqStatus('button_eq3', controlsData.buttonStates.buttonEqStatus[3]);
    setButtonEqStatus('button_eq4', controlsData.buttonStates.buttonEqStatus[4]);
    setButtonEqStatus('button_eq5', controlsData.buttonStates.buttonEqStatus[5]);
    setButtonEqStatus('button_eq6', controlsData.buttonStates.buttonEqStatus[6]);

    setButtonDeqStatus('button_deq1', controlsData.buttonStates.buttonDeqStatus[0]);
    setButtonDeqStatus('button_deq2', controlsData.buttonStates.buttonDeqStatus[1]);
}


function setButtonCurveStatus(id,status) {
    var buttonElement = document.getElementById(id);
    if (status){
        buttonElement.setAttribute('class', 'button_curve_true');
    }else{
        buttonElement.setAttribute('class', 'button_curve_false');
    }

    var buttonElement, trueString,falseString;
    switch (id){
        case 'button_curve_a':
            buttonElement = document.getElementById('button_curve_a');
            trueString = 'button_curve_a_true';
            falseString = 'button_curve_a_false';
            break;
        case 'button_curve_b':
            buttonElement = document.getElementById('button_curve_b');
            trueString = 'button_curve_b_true';
            falseString = 'button_curve_b_false';
            break;
        case 'button_curve_c':
            buttonElement = document.getElementById('button_curve_c');
            trueString = 'button_curve_c_true';
            falseString = 'button_curve_c_false';
            break;
        case 'button_curve_d':
            buttonElement = document.getElementById('button_curve_d');
            trueString = 'button_curve_d_true';
            falseString = 'button_curve_d_false';
            break;
        case 'button_curve_out1':
            buttonElement = document.getElementById('button_curve_out1');
            trueString = 'button_curve_out1_true';
            falseString = 'button_curve_out1_false';
            break;
        case 'button_curve_out2':
            buttonElement = document.getElementById('button_curve_out2');
            trueString = 'button_curve_out2_true';
            falseString = 'button_curve_out2_false';
            break;
        case 'button_curve_out3':
            buttonElement = document.getElementById('button_curve_out3');
            trueString = 'button_curve_out3_true';
            falseString = 'button_curve_out3_false';
            break;
        case 'button_curve_out4':
            buttonElement = document.getElementById('button_curve_out4');
            trueString = 'button_curve_out4_true';
            falseString = 'button_curve_out4_false';
            break;
        case 'button_curve_out5':
            buttonElement = document.getElementById('button_curve_out5');
            trueString = 'button_curve_out5_true';
            falseString = 'button_curve_out5_false';
            break;
        case 'button_curve_out6':
            buttonElement = document.getElementById('button_curve_out6');
            trueString = 'button_curve_out6_true';
            falseString = 'button_curve_out6_false';
            break;
        case 'button_curve_out7':
            buttonElement = document.getElementById('button_curve_out7');
            trueString = 'button_curve_out7_true';
            falseString = 'button_curve_out7_false';
            break;
        case 'button_curve_out8':
            buttonElement = document.getElementById('button_curve_out8');
            trueString = 'button_curve_out8_true';
            falseString = 'button_curve_out8_false';
            break;
    }

    if (status){
        buttonElement.setAttribute('class', trueString);
    }else{
        buttonElement.setAttribute('class', falseString);
    }
}


function assignButtonCurveStatus() { //设置所有曲线按钮的状态
    setButtonCurveStatus('button_curve_a', m_nLinkIn_EQLine[0]?m_nLinkIn_EQLine[0]:controlsData.buttonStates.buttonCurveStatus[0]);
    setButtonCurveStatus('button_curve_b', m_nLinkIn_EQLine[1]?m_nLinkIn_EQLine[1]:controlsData.buttonStates.buttonCurveStatus[1]);
    setButtonCurveStatus('button_curve_c', m_nLinkIn_EQLine[2]?m_nLinkIn_EQLine[2]:controlsData.buttonStates.buttonCurveStatus[2]);
    setButtonCurveStatus('button_curve_d', m_nLinkIn_EQLine[3]?m_nLinkIn_EQLine[3]:controlsData.buttonStates.buttonCurveStatus[3]);
    setButtonCurveStatus('button_curve_out1', m_nLinkOut_EQLine[0]?m_nLinkOut_EQLine[0]:controlsData.buttonStates.buttonCurveStatus[4]);
    setButtonCurveStatus('button_curve_out2', m_nLinkOut_EQLine[1]?m_nLinkOut_EQLine[1]:controlsData.buttonStates.buttonCurveStatus[5]);
    setButtonCurveStatus('button_curve_out3', m_nLinkOut_EQLine[2]?m_nLinkOut_EQLine[2]:controlsData.buttonStates.buttonCurveStatus[6]);
    setButtonCurveStatus('button_curve_out4', m_nLinkOut_EQLine[3]?m_nLinkOut_EQLine[3]:controlsData.buttonStates.buttonCurveStatus[7]);
    setButtonCurveStatus('button_curve_out5', m_nLinkOut_EQLine[4]?m_nLinkOut_EQLine[4]:controlsData.buttonStates.buttonCurveStatus[8]);
    setButtonCurveStatus('button_curve_out6', m_nLinkOut_EQLine[5]?m_nLinkOut_EQLine[5]:controlsData.buttonStates.buttonCurveStatus[9]);
    setButtonCurveStatus('button_curve_out7', m_nLinkOut_EQLine[6]?m_nLinkOut_EQLine[6]:controlsData.buttonStates.buttonCurveStatus[10]);
    setButtonCurveStatus('button_curve_out8', m_nLinkOut_EQLine[7]?m_nLinkOut_EQLine[7]:controlsData.buttonStates.buttonCurveStatus[11]);
}


function assignPhaseCurveStatus() {
    var buttonControl = document.getElementById('button_phase_curve');


    if (controlsData.buttonStates.buttonPhaseCurveStatus[curButtonNo-1]){
        buttonControl.setAttribute('class', 'button_phase_curve_true');
    }else{
        buttonControl.setAttribute('class', 'button_phase_curve_false');
    }
}


//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
function initializeChannelName() {
    //channel name
    currentGroupData.dataInputA.name = 'A';
    currentGroupData.dataInputB.name = 'B';
    currentGroupData.dataInputC.name = 'C';
    currentGroupData.dataInputD.name = 'D';

    currentGroupData.dataOut1.name = 'OUT1';
    currentGroupData.dataOut2.name = 'OUT2';
    currentGroupData.dataOut3.name = 'OUT3';
    currentGroupData.dataOut4.name = 'OUT4';
    currentGroupData.dataOut5.name = 'OUT5';
    currentGroupData.dataOut6.name = 'OUT6';
    currentGroupData.dataOut7.name = 'OUT7';
    currentGroupData.dataOut8.name = 'OUT8';

    oldGroupData.dataInputA.name = 'A';
    oldGroupData.dataInputB.name = 'B';
    oldGroupData.dataInputC.name = 'C';
    oldGroupData.dataInputD.name = 'D';

    oldGroupData.dataOut1.name = 'OUT1';
    oldGroupData.dataOut2.name = 'OUT2';
    oldGroupData.dataOut3.name = 'OUT3';
    oldGroupData.dataOut4.name = 'OUT4';
    oldGroupData.dataOut5.name = 'OUT5';
    oldGroupData.dataOut6.name = 'OUT6';
    oldGroupData.dataOut7.name = 'OUT7';
    oldGroupData.dataOut8.name = 'OUT8';

}

function assignAllInputTextData() {
    inputOrOutputModule(true);
    assignShowData();
    assignChannelData(constConfig.CURRENT_CHANNGEL_INPUT_A);
}

function assignShowData() {

    setChannelNameValue('text_input_a', currentGroupData.dataInputA.name);
    setChannelNameValue('text_input_b', currentGroupData.dataInputB.name);
    setChannelNameValue('text_input_c', currentGroupData.dataInputC.name);
    setChannelNameValue('text_input_d', currentGroupData.dataInputD.name);
    //console.log('text_input_d_name:' +  currentGroupData.dataInputD.name);

    setChannelNameValue('text_out_1', currentGroupData.dataOut1.name);
    setChannelNameValue('text_out_2', currentGroupData.dataOut2.name);
    setChannelNameValue('text_out_3', currentGroupData.dataOut3.name);
    setChannelNameValue('text_out_4', currentGroupData.dataOut4.name);
    setChannelNameValue('text_out_5', currentGroupData.dataOut5.name);
    setChannelNameValue('text_out_6', currentGroupData.dataOut6.name);
    setChannelNameValue('text_out_7', currentGroupData.dataOut7.name);
    setChannelNameValue('text_out_8', currentGroupData.dataOut8.name);
}

function setChannelNameValue(id, value){
    var textElement = document.getElementById(id);
    //textElement.setAttribute('value', value);
    textElement.value = value;
}


//======================================================================================================================
//联调
function inEqDataKeepStep(id) {
    var chanelId = id + 1;
    var temp;
    for(var t=1; t<7; t++){
        ignoreFollowLine = true;
        eqDataKeepStep(chanelId, t);
    }
    temp = curButtonNo;
    curButtonNo = chanelId;
    DrawLine();
    curButtonNo = temp;
    svgDrawCurve.setCurrentEqLine(chanelId, curButtonNo);
}

function outEqDataKeepStep( id ) {
    var chanelId = id + 5;
    var temp;
    for(var t=1; t<9; t++){
        eqDataKeepStep(chanelId, t);
        ignoreFollowLine = true;
        console.log('chaneId:' + chanelId);
    }
    temp = curButtonNo;
    curButtonNo = chanelId;
    DrawLine();
    curButtonNo = temp;
    svgDrawCurve.setCurrentEqLine(chanelId, curButtonNo);
}

function copyInputLinkData(targetIndex, originalIndex){//输入联调数据复制
    var i,name,mute;
    var inputLinkData=[];

    inputLinkData[0] = currentGroupData.dataInputA;
    inputLinkData[1] = currentGroupData.dataInputB;
    inputLinkData[2] = currentGroupData.dataInputC;
    inputLinkData[3] = currentGroupData.dataInputD;

    name = inputLinkData[targetIndex].name;
    mute = inputLinkData[targetIndex].mute;
    deepCopyValue(inputLinkData[targetIndex],inputLinkData[originalIndex]);
    inputLinkData[targetIndex].name = name;
    inputLinkData[targetIndex].mute = mute;

    if((targetIndex + 1) ===  curButtonNo){
        for(i=1; i<7;i++){
            eqDataKeepStep(curButtonNo,i);
        }
        DrawLine();
    }
}


function copyOutLinkData(targetIndex, originalIndex){
    var i,name,mute;
    var source = new Array(8);
    var outLinkData = [];

    outLinkData[0] = currentGroupData.dataOut1;
    outLinkData[1] = currentGroupData.dataOut2;
    outLinkData[2] = currentGroupData.dataOut3;
    outLinkData[3] = currentGroupData.dataOut4;
    outLinkData[4] = currentGroupData.dataOut5;
    outLinkData[5] = currentGroupData.dataOut6;
    outLinkData[6] = currentGroupData.dataOut7;
    outLinkData[7] = currentGroupData.dataOut8;

    name = outLinkData[targetIndex].name;
    mute = outLinkData[targetIndex].mute;
    source[0] = outLinkData[targetIndex].sourceA;
    source[1] = outLinkData[targetIndex].sourceB;
    source[2] = outLinkData[targetIndex].sourceC;
    source[3] = outLinkData[targetIndex].sourceD;
    source[4] = outLinkData[targetIndex].sourceE;
    source[5] = outLinkData[targetIndex].sourceF;
    source[6] = outLinkData[targetIndex].sourceG;
    source[7] = outLinkData[targetIndex].sourceH;
    deepCopyValue(outLinkData[targetIndex], outLinkData[originalIndex]);
    outLinkData[targetIndex].name = name;   // 通道名不联调
    outLinkData[targetIndex].mute = mute;   // 静音状态不联调
    outLinkData[targetIndex].sourceA = source[0];
    outLinkData[targetIndex].sourceB = source[1];
    outLinkData[targetIndex].sourceC = source[2];
    outLinkData[targetIndex].sourceD = source[3];
    outLinkData[targetIndex].sourceE = source[4];
    outLinkData[targetIndex].sourceF = source[5];
    outLinkData[targetIndex].sourceG = source[6];
    outLinkData[targetIndex].sourceH = source[7];

    if((targetIndex + 5) === curButtonNo){
        for(i=1; i<9;i++){
            eqDataKeepStep(curButtonNo,i); //eq数据同步到曲线上
        }
    }
}


var linkInputSelect = [0,1,2,3];        //输入联调
var linkOutSelect = [0,1,2,3,4,5,6,7];  //输出联调
function keepLinkChannelData(no){  //联调通道保持数据相同
    var i,channel;

    if(no < 9){ //输出通道
        channel = no - 1;
        for(i=0; i<8;i++){
            if(i !== channel){
                if(linkOutSelect[i] === linkOutSelect[channel]){
                    copyOutLinkData(channel, i);
                    outEqDataKeepStep(channel);
                    console.log('复制输出联调数据原：' + i + '  目标: ' + channel);
                    return;
                }
            }
        }
    } else { //输入通道
        channel = no - 9;
        for(i=0; i<4; i++){
            if(i !== channel){
                if(linkInputSelect[i] === linkInputSelect[channel]){
                    copyInputLinkData(channel, i);
                    inEqDataKeepStep(channel);
                    console.log('复制输入联调数据原：' + i + '  目标: ' + channel);
                    return;
                }
            }
        }
    }
}

function keepLinkChannelDataOld(no){  //联调通道保持数据相同
    var i,linkSame=[],channel,oldNo;

    //console.log('oldButtonNo:' + oldButtonNo);
    if(oldButtonNo < 5){
        oldNo = oldButtonNo - 1;
    }else{
        oldNo = oldButtonNo - 5;
    }

    if(curButtonNo === oldButtonNo){
        oldNo = 100;
    }

    //console.log(no);
    if(no<9){ //输出通道
        channel = no - 1;
        linkOutSelect[0] = currentGroupData.dataOut1.outLinkSel;
        linkOutSelect[1] = currentGroupData.dataOut2.outLinkSel;
        linkOutSelect[2] = currentGroupData.dataOut3.outLinkSel;
        linkOutSelect[3] = currentGroupData.dataOut4.outLinkSel;
        linkOutSelect[4] = currentGroupData.dataOut5.outLinkSel;
        linkOutSelect[5] = currentGroupData.dataOut6.outLinkSel;
        linkOutSelect[6] = currentGroupData.dataOut7.outLinkSel;
        linkOutSelect[7] = currentGroupData.dataOut8.outLinkSel;

        for(i=0; i<8;i++){
            if(i !== channel){
                if(linkOutSelect[i] === linkOutSelect[channel]){
                    linkSame.push(i);
                }
            }
        }
        linkSame.push(channel);

        for(i=0; i<linkSame.length;i++){
            if(linkSame[i] === oldNo){
                linkSame.splice(i,1);
                linkSame.unshift(oldNo);
                //console.log('move');
                break;
            }
        }

        //console.log('out_link:' + linkSame);
        if(linkSame.length>1){
            //console.log('out_link:' + linkSame);
            copyOutLinkData(linkSame);
        }
    } else { //输入通道
        channel = no - 9;
        linkInputSelect[0] = currentGroupData.dataInputA.inLinkSel;
        linkInputSelect[1] = currentGroupData.dataInputB.inLinkSel;
        linkInputSelect[2] = currentGroupData.dataInputC.inLinkSel;
        linkInputSelect[3] = currentGroupData.dataInputD.inLinkSel;

        for(i=0; i<4; i++){
            if(i !== channel){
                if(linkInputSelect[i] === linkInputSelect[channel]){
                    linkSame.push(i);
                }
            }
        }
        linkSame.push(channel);

        if(linkSame.length>1){
            //console.log('input_link:' + linkSame);
            copyInputLinkData(linkSame);
        }
    }
}



function updateLinkInputDisplay(channel){
    //inputOrOutputModule(true);
    //hideHLPFChannelName();
    //agcExtMap.SetInData(0);
    //lockDisplay.refreshInputLockDisplay();
    if(currentLockData.nIn_LockData.nIn_EQ){
        //svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        //inputEqBeLocked();
    }else {
        if (curEqChannel > 6) {
            curEqChannel = 1;
        }
        showOrHideEqData();
        //curEqChannel = 1;
        //inputEqUnlock();
        DrawLine();
        updateVolumeDisplay(channel);
    }


}


function updateLinkOutDisplay(channel){
    //showHLPFChannelName();
    //comExtMap.SetOutComp_LimT(1);
    //lockDisplay.refreshOutLockDisplay();

    if(currentLockData.nOut_LockData.nOut_EQ){
        //svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);
        curEqChannel = -1;
        showOrHideEqData();
        //outputEqBeLock();

    }else {
        showOrHideEqData();
        //curEqChannel = 1;
        //outPutEqUnlock();
        DrawLine();
        updateVolumeDisplay(channel);
    }
}

function updateVolumeDisplay(channel){
    var element, id, value, step;

    switch (channel){
        case constConfig.CURRENT_CHANNGEL_OUT_1:
            element = document.getElementById('text_volume_out1');
            id = controlsId.SLIDER_GAIN_OUT1;
            step = currentGroupData.dataOut1.gain;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_2:
            element = document.getElementById('text_volume_out2');
            id = controlsId.SLIDER_GAIN_OUT2;
            step = currentGroupData.dataOut2.gain;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_3:
            element = document.getElementById('text_volume_out3');
            id = controlsId.SLIDER_GAIN_OUT3;
            step = currentGroupData.dataOut3.gain;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_4:
            element = document.getElementById('text_volume_out4');
            id = controlsId.SLIDER_GAIN_OUT4;
            step = currentGroupData.dataOut4.gain;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_5:
            element = document.getElementById('text_volume_out5');
            id = controlsId.SLIDER_GAIN_OUT5;
            step = currentGroupData.dataOut5.gain;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_6:
            element = document.getElementById('text_volume_out6');
            id = controlsId.SLIDER_GAIN_OUT6;
            step = currentGroupData.dataOut6.gain;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_7:
            element = document.getElementById('text_volume_out7');
            id = controlsId.SLIDER_GAIN_OUT7;
            step = currentGroupData.dataOut7.gain;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_8:
            element = document.getElementById('text_volume_out8');
            id = controlsId.SLIDER_GAIN_OUT8;
            step = currentGroupData.dataOut8.gain;
            break;
        case constConfig.CURRENT_CHANNGEL_INPUT_A:
            element = document.getElementById('text_volume_a');
            id = controlsId.SLIDER_GAIN_INPUT_A;
            step = currentGroupData.dataInputA.gain;
            break;
        case constConfig.CURRENT_CHANNGEL_INPUT_B:
            element = document.getElementById('text_volume_b');
            id = controlsId.SLIDER_GAIN_INPUT_B;
            step = currentGroupData.dataInputB.gain;
            break;
        case constConfig.CURRENT_CHANNGEL_INPUT_C:
            element = document.getElementById('text_volume_c');
            id = controlsId.SLIDER_GAIN_INPUT_C;
            step = currentGroupData.dataInputC.gain;
            break;
        case constConfig.CURRENT_CHANNGEL_INPUT_D:
            element = document.getElementById('text_volume_d');
            id = controlsId.SLIDER_GAIN_INPUT_D;
            step = currentGroupData.dataInputD.gain;
            break;
        default:
            break;
    }

    // console.log('update volume:' + id);
    value = getChanelGainDisplay(step);
    // console.log('value:' + value);
    element.value = value;
    setSliderPosition(id, step);
}

function assignChannelData(channel){
    var inputData = new PublicInPut();
    var outputData = new PublicOutPut();
    var isInput;
    // keepLinkChannelData(channel);
    switch (channel){
        case constConfig.CURRENT_CHANNGEL_INPUT_A:
            inputData = currentGroupData.dataInputA;
            isInput = true;
            break;
        case constConfig.CURRENT_CHANNGEL_INPUT_B:
            inputData = currentGroupData.dataInputB;
            isInput = true;
            break;
        case constConfig.CURRENT_CHANNGEL_INPUT_C:
            inputData = currentGroupData.dataInputC;
            isInput = true;
            break;
        case constConfig.CURRENT_CHANNGEL_INPUT_D:
            inputData = currentGroupData.dataInputD;
            isInput = true;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_1:
            outputData = currentGroupData.dataOut1;
            isInput = false;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_2:
            outputData = currentGroupData.dataOut2;
            isInput = false;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_3:
            outputData = currentGroupData.dataOut3;
            isInput = false;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_4:
            outputData = currentGroupData.dataOut4;
            isInput = false;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_5:
            outputData = currentGroupData.dataOut5;
            isInput = false;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_6:
            outputData = currentGroupData.dataOut6;
            isInput = false;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_7:
            outputData = currentGroupData.dataOut7;
            isInput = false;
            break;
        case constConfig.CURRENT_CHANNGEL_OUT_8:
            outputData = currentGroupData.dataOut8;
            isInput = false;
            break;
        default:
            isInput = true;
    }

    //4input_gain 8output_gain       input_text
    setInputTextControlValue('text_volume_a', currentGroupData.dataInputA.gain, inputTextValueType.CHANNEL_GAIN);
    setInputTextControlValue('text_volume_b', currentGroupData.dataInputB.gain, inputTextValueType.CHANNEL_GAIN);
    setInputTextControlValue('text_volume_c', currentGroupData.dataInputC.gain, inputTextValueType.CHANNEL_GAIN);
    setInputTextControlValue('text_volume_d', currentGroupData.dataInputD.gain, inputTextValueType.CHANNEL_GAIN);

    setInputTextControlValue('text_volume_out1', currentGroupData.dataOut1.gain, inputTextValueType.CHANNEL_GAIN);
    setInputTextControlValue('text_volume_out2', currentGroupData.dataOut2.gain, inputTextValueType.CHANNEL_GAIN);
    setInputTextControlValue('text_volume_out3', currentGroupData.dataOut3.gain, inputTextValueType.CHANNEL_GAIN);
    setInputTextControlValue('text_volume_out4', currentGroupData.dataOut4.gain, inputTextValueType.CHANNEL_GAIN);
    setInputTextControlValue('text_volume_out5', currentGroupData.dataOut5.gain, inputTextValueType.CHANNEL_GAIN);
    setInputTextControlValue('text_volume_out6', currentGroupData.dataOut6.gain, inputTextValueType.CHANNEL_GAIN);
    setInputTextControlValue('text_volume_out7', currentGroupData.dataOut7.gain, inputTextValueType.CHANNEL_GAIN);
    setInputTextControlValue('text_volume_out8', currentGroupData.dataOut8.gain, inputTextValueType.CHANNEL_GAIN);

    //4input_gain 8output_gain  1gain     slider
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_A, currentGroupData.dataInputA.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_B, currentGroupData.dataInputB.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_C, currentGroupData.dataInputC.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_D, currentGroupData.dataInputD.gain);

    setSliderPosition(controlsId.SLIDER_GAIN_OUT1, currentGroupData.dataOut1.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT2, currentGroupData.dataOut2.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT3, currentGroupData.dataOut3.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT4, currentGroupData.dataOut4.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT5, currentGroupData.dataOut5.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT6, currentGroupData.dataOut6.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT7, currentGroupData.dataOut7.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT8, currentGroupData.dataOut8.gain);

    //mute
    controlsData.buttonStates.buttonSpeakerStatus[0] = (currentGroupData.dataInputA.mute === 1) ;
    controlsData.buttonStates.buttonSpeakerStatus[1] = (currentGroupData.dataInputB.mute === 1) ;
    controlsData.buttonStates.buttonSpeakerStatus[2] = (currentGroupData.dataInputC.mute === 1) ;
    controlsData.buttonStates.buttonSpeakerStatus[3] = (currentGroupData.dataInputD.mute === 1) ;
    controlsData.buttonStates.buttonSpeakerStatus[4] = (currentGroupData.dataOut1.mute === 1) ;
    controlsData.buttonStates.buttonSpeakerStatus[5] = (currentGroupData.dataOut2.mute === 1) ;
    controlsData.buttonStates.buttonSpeakerStatus[6] = (currentGroupData.dataOut3.mute === 1) ;
    controlsData.buttonStates.buttonSpeakerStatus[7] = (currentGroupData.dataOut4.mute === 1) ;
    controlsData.buttonStates.buttonSpeakerStatus[8] = (currentGroupData.dataOut5.mute === 1) ;
    controlsData.buttonStates.buttonSpeakerStatus[9] = (currentGroupData.dataOut6.mute === 1) ;
    controlsData.buttonStates.buttonSpeakerStatus[10] = (currentGroupData.dataOut7.mute === 1) ;
    controlsData.buttonStates.buttonSpeakerStatus[11] = (currentGroupData.dataOut8.mute === 1) ;


    if(isInput){
        controlsData.inputData = inputData;
        eqData = inputData.InEQ;
        refreshChannelData(constConfig.INPUT_CHANNEL);
        assignSelectData();
    }else {
        controlsData.outputData = outputData;
        eqData = outputData.OutEQ;
        refreshChannelData(constConfig.OUTPUT_CHANNEL);
        assignSelectData();
    }


}


function setChannelGain(no, gain){
    switch (no) {
        case 1:
            currentGroupData.dataInputA.gain = gain;
            break;
        case 2:
            currentGroupData.dataInputB.gain = gain;
            break;
        case 3:
            currentGroupData.dataInputC.gain = gain;
            break;
        case 4:
            currentGroupData.dataInputD.gain = gain;
            break;
        case 5:
            currentGroupData.dataOut1.gain = gain;
            break;
        case 6:
            currentGroupData.dataOut2.gain = gain;
            break;
        case 7:
            currentGroupData.dataOut3.gain = gain;
            break;
        case 8:
            currentGroupData.dataOut4.gain = gain;
            break;
        case 9:
            currentGroupData.dataOut5.gain = gain;
            break;
        case 10:
            currentGroupData.dataOut6.gain = gain;
            break;
        case 11:
            currentGroupData.dataOut7.gain = gain;
            break;
        case 12:
            currentGroupData.dataOut8.gain = gain;
            break;
        default:
            break;
    }
}

function getChannelGain(no){
    var gain;
    switch (no){
        case 1:
            gain = currentGroupData.dataInputA.gain;
            break;
        case 2:
            gain = currentGroupData.dataInputB.gain;
            break;
        case 3:
            gain = currentGroupData.dataInputC.gain;
            break;
        case 4:
            gain = currentGroupData.dataInputD.gain;
            break;
        case 5:
            gain = currentGroupData.dataOut1.gain;
            break;
        case 6:
            gain = currentGroupData.dataOut2.gain;
            break;
        case 7:
            gain = currentGroupData.dataOut3.gain;
            break;
        case 8:
            gain = currentGroupData.dataOut4.gain;
            break;
        case 9:
            gain = currentGroupData.dataOut5.gain;
            break;
        case 10:
            gain = currentGroupData.dataOut6.gain;
            break;
        case 11:
            gain = currentGroupData.dataOut7.gain;
            break;
        case 12:
            gain = currentGroupData.dataOut8.gain;
            break;
        default:
            gain = 1;
            break;
    }
    return gain;
}

function refreshChannelData(type) {
    if(type === constConfig.INPUT_CHANNEL){
        //input gate
        setInputTextControlValue('text_gate', controlsData.inputData.noisegate, inputTextValueType.NOISE_GATE);

        //input delay
        setInputTextDelayControlValue('text_delay_millisecond', controlsData.inputData.delay, controlsData.inputData.secondDelay, inputTextValueType.DELAY_TIME);
        setInputTextDelayControlValue('text_delay_meter', controlsData.inputData.delay, controlsData.inputData.secondDelay, inputTextValueType.DELAY_METER);
        setInputTextDelayControlValue('text_delay_inch', controlsData.inputData.delay, controlsData.inputData.secondDelay, inputTextValueType.DELAY_INCH);

        //input DEQ
        setInputTextControlValue('text_deq1_frequency', controlsData.inputData.InDeq1.req, inputTextValueType.FREQUENCY);
        setInputTextControlValue('text_deq1_bandwidth', controlsData.inputData.InDeq1.bw, inputTextValueType.BANDWIDTH);
        setInputTextControlValue('text_deq1_level', controlsData.inputData.InDeq1.level, inputTextValueType.DEQ_LEVEL);
        setInputTextControlValue('text_deq2_frequency', controlsData.inputData.InDeq2.req, inputTextValueType.FREQUENCY);
        setInputTextControlValue('text_deq2_bandwidth', controlsData.inputData.InDeq2.bw, inputTextValueType.BANDWIDTH);
        setInputTextControlValue('text_deq2_level', controlsData.inputData.InDeq2.level, inputTextValueType.DEQ_LEVEL);

        setInputTextControlValue('deq1_threshold', controlsData.inputData.DeqParam1.DEQ_Threshold, inputTextValueType.DEQ_THRESHOLD);
        setInputTextControlValue('deq1_ratio', controlsData.inputData.DeqParam1.DEQ_ratio, inputTextValueType.EXTENSION_RATION);
        //console.log('set deq1_ratio:' + controlsData.inputData.DeqParam1.DEQ_ratio);
        setInputTextControlValue('deq1_attack_time', controlsData.inputData.DeqParam1.DEQ_a, inputTextValueType.ATTACK_TIME);
        setInputTextControlValue('deq1_release_time', controlsData.inputData.DeqParam1.DEQ_r, inputTextValueType.RELEASE_TIME);
        setInputTextControlValue('deq2_threshold', controlsData.inputData.DeqParam2.DEQ_Threshold, inputTextValueType.DEQ_THRESHOLD);
        setInputTextControlValue('deq2_ratio', controlsData.inputData.DeqParam2.DEQ_ratio, inputTextValueType.EXTENSION_RATION);
        //console.log('set deq2_ratio:' + controlsData.inputData.DeqParam2.DEQ_ratio);
        setInputTextControlValue('deq2_attack_time', controlsData.inputData.DeqParam2.DEQ_a, inputTextValueType.ATTACK_TIME);
        setInputTextControlValue('deq2_release_time', controlsData.inputData.DeqParam2.DEQ_r, inputTextValueType.RELEASE_TIME);

        //input agc
        setInputTextControlValue('text_threshold',  controlsData.inputData.agThreshold, inputTextValueType.INPUT_EXTEND_THRESHOLD);
        setInputTextControlValue('text_target_level', controlsData.inputData.agLevel, inputTextValueType.INPUT_EXTEND_THRESHOLD);
        setInputTextControlValue('text_extension_ratio', controlsData.inputData.agRatio, inputTextValueType.EXTENSION_RATION);
        setInputTextControlValue('text_extension_attack', controlsData.inputData.agAttack, inputTextValueType.ATTACK_TIME);
        setInputTextControlValue('text_extension_release', controlsData.inputData.agRelease, inputTextValueType.RELEASE_TIME);

        setInputTextControlValue('text_compressor', controlsData.inputData.compLevel, inputTextValueType.INPUT_COMPRESS_THRESHOLD);
        setInputTextControlValue('text_comp_ratio', controlsData.inputData.compRatio, inputTextValueType.COMPRESS_RATION);
        setInputTextControlValue('text_comp_attack', controlsData.inputData.compAttack, inputTextValueType.ATTACK_TIME);
        setInputTextControlValue('text_comp_release', controlsData.inputData.compRelease, inputTextValueType.RELEASE_TIME);
    }else{
        //=======================================================================================
        //out delay
        setInputTextDelayControlValue('text_delay_millisecond_out', controlsData.outputData.delay, controlsData.outputData.secondDelay, inputTextValueType.DELAY_TIME);
        setInputTextDelayControlValue('text_delay_meter_out', controlsData.outputData.delay, controlsData.outputData.secondDelay, inputTextValueType.DELAY_METER);
        setInputTextDelayControlValue('text_delay_inch_out', controlsData.outputData.delay, controlsData.outputData.secondDelay, inputTextValueType.DELAY_INCH);

        setInputTextControlValue('text_hpf_frequency', controlsData.outputData.HPFData.HL_freq, inputTextValueType.FREQUENCY);
        setInputTextControlValue('text_lpf_frequency', controlsData.outputData.LPFData.HL_freq, inputTextValueType.FREQUENCY);

        setInputTextControlValue('text_threshold_compress_out', controlsData.outputData.compLevel, inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
        setInputTextControlValue('text_ratio_compress_out', controlsData.outputData.compRatio, inputTextValueType.COMPRESS_RATION);
        setInputTextControlValue('text_attack_compress_out', controlsData.outputData.compAttack, inputTextValueType.ATTACK_TIME);
        setInputTextControlValue('text_release_compress_out', controlsData.outputData.compR, inputTextValueType.RELEASE_TIME);
        setInputTextControlValue('text_threshold_limit_out', controlsData.outputData.limT, inputTextValueType.OUTPUT_COMPRESS_THRESHOLD);
        setInputTextControlValue('text_attack_limit_out', controlsData.outputData.limAttack, inputTextValueType.ATTACK_TIME);
        setInputTextControlValue('text_release_limit_out', controlsData.outputData.limRelease, inputTextValueType.RELEASE_TIME);


        document.getElementById('text_hpf_mode').value = controlsData.outputData.HPFData.HL_Type;
        document.getElementById('text_hpf_slope').innerHTML = '';
        if(controlsData.outputData.HPFData.HL_Type < 1){
            initXoverFew('text_hpf_slope');
            document.getElementById('text_hpf_slope').value = controlsData.outputData.HPFData.LR_Level;
        }else{
            initXoverMany('text_hpf_slope');
            document.getElementById('text_hpf_slope').value = controlsData.outputData.HPFData.HL_Oct;
        }



        document.getElementById('text_lpf_mode').value = controlsData.outputData.LPFData.HL_Type;
        document.getElementById('text_lpf_slope').innerHTML = '';
        if(controlsData.outputData.LPFData.HL_Type < 1){
            initXoverFew('text_lpf_slope');
            document.getElementById('text_lpf_slope').value = controlsData.outputData.LPFData.LR_Level;
        }else{
            initXoverMany('text_lpf_slope');
            document.getElementById('text_lpf_slope').value = controlsData.outputData.LPFData.HL_Oct;
        }

    }

    refreshCommonData();
}

function refreshCommonData() {
    //gain
    setInputTextControlValue('text_gain', getChannelGain(curButtonNo), inputTextValueType.CHANNEL_GAIN);

    //public common
    setInputTextControlValue('text_eq1_frequency', eqData.EQ1.freq, inputTextValueType.FREQUENCY);
    setInputTextControlValue('text_eq1_bandwidth', eqData.EQ1.bw, inputTextValueType.BANDWIDTH);
    // console.log('eq1的带宽: ' + eqData.EQ1.bw);
    setInputTextControlValue('text_eq1_slope', eqData.EQ1.bw, inputTextValueType.SLOPE);
    setInputTextControlValue('text_eq1_gain', eqData.EQ1.level, inputTextValueType.EQ_GAIN);

    setInputTextControlValue('text_eq2_frequency', eqData.EQ2.freq, inputTextValueType.FREQUENCY);
    setInputTextControlValue('text_eq2_bandwidth', eqData.EQ2.bw, inputTextValueType.BANDWIDTH);
    // console.log('eq2的带宽: ' + eqData.EQ2.bw);
    setInputTextControlValue('text_eq2_slope', eqData.EQ2.bw, inputTextValueType.SLOPE);
    setInputTextControlValue('text_eq2_gain', eqData.EQ2.level, inputTextValueType.EQ_GAIN);

    setInputTextControlValue('text_eq3_frequency', eqData.EQ3.freq, inputTextValueType.FREQUENCY);
    setInputTextControlValue('text_eq3_bandwidth', eqData.EQ3.bw, inputTextValueType.BANDWIDTH);
    setInputTextControlValue('text_eq3_slope', eqData.EQ3.bw, inputTextValueType.SLOPE);
    setInputTextControlValue('text_eq3_gain', eqData.EQ3.level, inputTextValueType.EQ_GAIN);

    setInputTextControlValue('text_eq4_frequency', eqData.EQ4.freq, inputTextValueType.FREQUENCY);
    setInputTextControlValue('text_eq4_bandwidth', eqData.EQ4.bw, inputTextValueType.BANDWIDTH);
    setInputTextControlValue('text_eq4_slope', eqData.EQ4.bw, inputTextValueType.SLOPE);
    setInputTextControlValue('text_eq4_gain', eqData.EQ4.level, inputTextValueType.EQ_GAIN);

    setInputTextControlValue('text_eq5_frequency', eqData.EQ5.freq, inputTextValueType.FREQUENCY);
    setInputTextControlValue('text_eq5_bandwidth', eqData.EQ5.bw, inputTextValueType.BANDWIDTH);
    setInputTextControlValue('text_eq5_slope', eqData.EQ5.bw, inputTextValueType.SLOPE);
    setInputTextControlValue('text_eq5_gain', eqData.EQ5.level, inputTextValueType.EQ_GAIN);

    setInputTextControlValue('text_eq6_frequency', eqData.EQ6.freq, inputTextValueType.FREQUENCY);
    setInputTextControlValue('text_eq6_bandwidth', eqData.EQ6.bw, inputTextValueType.BANDWIDTH);
    setInputTextControlValue('text_eq6_slope', eqData.EQ6.bw, inputTextValueType.SLOPE);
    setInputTextControlValue('text_eq6_gain', eqData.EQ6.level, inputTextValueType.EQ_GAIN);

    //===============================================================================================
    setSliderPosition(controlsId.SLIDER_EQ1_THUMP, eqData.EQ1.level);
    setSliderPosition(controlsId.SLIDER_EQ2_THUMP, eqData.EQ2.level);
    setSliderPosition(controlsId.SLIDER_EQ3_THUMP, eqData.EQ3.level);
    setSliderPosition(controlsId.SLIDER_EQ4_THUMP, eqData.EQ4.level);
    setSliderPosition(controlsId.SLIDER_EQ5_THUMP, eqData.EQ5.level);
    setSliderPosition(controlsId.SLIDER_EQ6_THUMP, eqData.EQ6.level);

    //setGainSliderPosition(getChannelGain(curButtonNo));
    updateAllEqGainButton();
}


function setInputTextControlValue(id, value, type) {
    var textElement = document.getElementById(id);
    currentStep = value;
    textElement.value = getDisplayValue(type);
    return textElement.value;
}

function setInputTextDelayControlValue(id, value1, value2, type){
    var textElement = document.getElementById(id);
    currentStep = value1;
    secondStep = value2;
    textElement.value = getDisplayValue(type);
    return textElement.value;
}

//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//======================================================================================================================



function assignSelectData() {
    setModeSelect("select_mode1",eqData.EQ1.type);
    setModeSelect("select_mode2",eqData.EQ2.type);
    setModeSelect("select_mode3",eqData.EQ3.type);
    setModeSelect("select_mode4",eqData.EQ4.type);
    setModeSelect("select_mode5",eqData.EQ5.type);
    setModeSelect("select_mode6",eqData.EQ6.type);

    updateEqModeDisplay(eqData.EQ1.type,1);
    updateEqModeDisplay(eqData.EQ2.type,2);
    updateEqModeDisplay(eqData.EQ3.type,3);
    updateEqModeDisplay(eqData.EQ4.type,4);
    updateEqModeDisplay(eqData.EQ5.type,5);
    updateEqModeDisplay(eqData.EQ6.type,6);

    //console.log('assignSelectorData_____________________eqData.EQ1.type:' +　eqData.EQ1.type);

    document.getElementById('select_slope1').value = GET_4H_BYTE(eqData.EQ1.HL_db_AP_Flag);
    document.getElementById('select_slope2').value = GET_4H_BYTE(eqData.EQ2.HL_db_AP_Flag);
    document.getElementById('select_slope3').value = GET_4H_BYTE(eqData.EQ3.HL_db_AP_Flag);
    document.getElementById('select_slope4').value = GET_4H_BYTE(eqData.EQ4.HL_db_AP_Flag);
    document.getElementById('select_slope5').value = GET_4H_BYTE(eqData.EQ5.HL_db_AP_Flag);
    document.getElementById('select_slope6').value = GET_4H_BYTE(eqData.EQ6.HL_db_AP_Flag);

    document.getElementById('select_link_a').value = currentGroupData.dataInputA.inLinkSel;
    document.getElementById('select_link_b').value = currentGroupData.dataInputB.inLinkSel;
    document.getElementById('select_link_c').value = currentGroupData.dataInputC.inLinkSel;
    document.getElementById('select_link_d').value = currentGroupData.dataInputD.inLinkSel;
    document.getElementById('select_link_out1').value = currentGroupData.dataOut1.outLinkSel;
    document.getElementById('select_link_out2').value = currentGroupData.dataOut2.outLinkSel;
    document.getElementById('select_link_out3').value = currentGroupData.dataOut3.outLinkSel;
    document.getElementById('select_link_out4').value = currentGroupData.dataOut4.outLinkSel;
    document.getElementById('select_link_out5').value = currentGroupData.dataOut5.outLinkSel;
    document.getElementById('select_link_out6').value = currentGroupData.dataOut6.outLinkSel;
    document.getElementById('select_link_out7').value = currentGroupData.dataOut7.outLinkSel;
    document.getElementById('select_link_out8').value = currentGroupData.dataOut8.outLinkSel;

    //console.log('assignData');
}


function setModeSelect(id, value) {
    var selectElement = document.getElementById(id).options;
    selectElement[value].selected = true;
}

function assignSliderPosition() {
    setSliderPosition(controlsId.SLIDER_EQ1_THUMP, eqData.EQ1.level);
    setSliderPosition(controlsId.SLIDER_EQ2_THUMP, eqData.EQ2.level);
    setSliderPosition(controlsId.SLIDER_EQ3_THUMP, eqData.EQ3.level);
    setSliderPosition(controlsId.SLIDER_EQ4_THUMP, eqData.EQ4.level);
    setSliderPosition(controlsId.SLIDER_EQ5_THUMP, eqData.EQ5.level);
    setSliderPosition(controlsId.SLIDER_EQ6_THUMP, eqData.EQ6.level);

    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_A, currentGroupData.dataInputA.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_B, currentGroupData.dataInputB.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_C, currentGroupData.dataInputC.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_INPUT_D, currentGroupData.dataInputD.gain);

    setSliderPosition(controlsId.SLIDER_GAIN_OUT1, currentGroupData.dataOut1.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT2, currentGroupData.dataOut2.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT3, currentGroupData.dataOut3.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT4, currentGroupData.dataOut4.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT5, currentGroupData.dataOut5.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT6, currentGroupData.dataOut6.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT7, currentGroupData.dataOut7.gain);
    setSliderPosition(controlsId.SLIDER_GAIN_OUT8, currentGroupData.dataOut8.gain);
}

function setGainSliderPosition(value){
    var topMax,range;
    var thumpElement,thumpHeight,parentElement,parentHeight;
    thumpElement = document.getElementById('slider_gain_thump');
    thumpHeight = parseInt(getCss(thumpElement, 'height'));
    parentElement = document.getElementById('slider_track_gain');
    parentHeight = parseInt(getCss(parentElement, 'height'));
    topMax = parentHeight - thumpHeight;

    range = 1 - value/constConfig.CHANNEL_GAIN_STEPS_MAX;
    thumpElement.style.top = topMax*range + 'px';
}

function setSliderPosition(idType, value) {
    var topMax,range;
    var sliderElement,thumpElement,thumpHeight,parentElement,parentHeight;
    switch (idType){
        case controlsId.SLIDER_EQ1_THUMP:
            sliderElement = document.getElementById('slider_eq1_thump');
            break;
        case controlsId.SLIDER_EQ2_THUMP:
            sliderElement = document.getElementById('slider_eq2_thump');
            break;
        case controlsId.SLIDER_EQ3_THUMP:
            sliderElement = document.getElementById('slider_eq3_thump');
            break;
        case controlsId.SLIDER_EQ4_THUMP:
            sliderElement = document.getElementById('slider_eq4_thump');
            break;
        case controlsId.SLIDER_EQ5_THUMP:
            sliderElement = document.getElementById('slider_eq5_thump');
            break;
        case controlsId.SLIDER_EQ6_THUMP:
            sliderElement = document.getElementById('slider_eq6_thump');
            break;
        //=======================================================================
        case controlsId.SLIDER_GAIN_INPUT_A:
            sliderElement = document.getElementById('slider_input_a_thump');
            keepLongGainInStep(1, value);
            break;
        case controlsId.SLIDER_GAIN_INPUT_B:
            sliderElement = document.getElementById('slider_input_b_thump');
            keepLongGainInStep(2, value);
            break;
        case controlsId.SLIDER_GAIN_INPUT_C:
            sliderElement = document.getElementById('slider_input_c_thump');
            keepLongGainInStep(3, value);
            break;
        case controlsId.SLIDER_GAIN_INPUT_D:
            sliderElement = document.getElementById('slider_input_d_thump');
            keepLongGainInStep(4, value);
            break;
        //=======================================================================
        case controlsId.SLIDER_GAIN_OUT1:
            sliderElement = document.getElementById('slider_out1_thump');
            keepLongGainInStep(5, value);
            break;
        case controlsId.SLIDER_GAIN_OUT2:
            sliderElement = document.getElementById('slider_out2_thump');
            keepLongGainInStep(6, value);
            break;
        case controlsId.SLIDER_GAIN_OUT3:
            sliderElement = document.getElementById('slider_out3_thump');
            keepLongGainInStep(7, value);
            break;
        case controlsId.SLIDER_GAIN_OUT4:
            sliderElement = document.getElementById('slider_out4_thump');
            keepLongGainInStep(8, value);
            break;
        case controlsId.SLIDER_GAIN_OUT5:
            sliderElement = document.getElementById('slider_out5_thump');
            keepLongGainInStep(9, value);
            break;
        case controlsId.SLIDER_GAIN_OUT6:
            sliderElement = document.getElementById('slider_out6_thump');
            keepLongGainInStep(10, value);
            break;
        case controlsId.SLIDER_GAIN_OUT7:
            sliderElement = document.getElementById('slider_out7_thump');
            keepLongGainInStep(11, value);
            break;
        case controlsId.SLIDER_GAIN_OUT8:
            sliderElement = document.getElementById('slider_out8_thump');
            keepLongGainInStep(12, value);
            break;
        //=======================================================================
        default:
            break;

    }
    if(idType < controlsId.SLIDER_GAIN_THUMP){//slider_eq
        thumpElement = document.getElementById('slider_eq1_thump');
        thumpHeight = parseInt(getCss(thumpElement, 'height'));
        parentElement = document.getElementById('slider_track_eq1');
        parentHeight = parseInt(getCss(parentElement, 'height'));
        topMax = parentHeight - thumpHeight;
    }else if(idType < controlsId.SLIDER_GAIN_OUT1){ //slider_input
        thumpElement = document.getElementById('slider_input_a_thump');
        thumpHeight = parseInt(getCss(thumpElement, 'height'));
        parentElement = document.getElementById('slider_track_input_a');
        parentHeight = parseInt(getCss(parentElement, 'height'));
        topMax = parentHeight - thumpHeight;
    }else{//slider_out
        thumpElement = document.getElementById('slider_out1_thump');
        thumpHeight = parseInt(getCss(thumpElement, 'height'));
        parentElement = document.getElementById('slider_track_out1');
        parentHeight = parseInt(getCss(parentElement, 'height'));
        topMax = parentHeight - thumpHeight;
    }


    if(idType < controlsId.SLIDER_GAIN_THUMP){
        range = 1 - value/constConfig.EQ_GAIN_STEPS_MAX;
    }else{
        range = 1 - value/constConfig.CHANNEL_GAIN_STEPS_MAX;
    }

    sliderElement.style.top = topMax*range + 'px';
}
