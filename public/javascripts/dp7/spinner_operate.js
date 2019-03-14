


function initInputSelectControl(which){
    var selectElement = document.getElementById(which);
    var newOption = new Option('联调A', '0');
    selectElement.options.add(newOption);
    newOption = new Option('联调B', '1');
    selectElement.options.add(newOption);
    newOption = new Option('联调C', '2');
    selectElement.options.add(newOption);
    newOption = new Option('联调D', '3');
    selectElement.options.add(newOption);
}

function initOutSelectControl(which){
    var selectElement = document.getElementById(which);
    var newOption;
    for (var i=1; i<9; i++){
        newOption = new Option('联调'+i, (i-1) + '');
        selectElement.options.add(newOption);
    }
}

function initModeSelectControl(which){
    var selectElement = document.getElementById(which);
    var newOption = new Option('参量','0');
    selectElement.options.add(newOption);
    newOption = new Option('低调', '1');
    selectElement.options.add(newOption);
    newOption = new Option('高调', '2');
    selectElement.options.add(newOption);
    newOption = new Option('1阶全通', '3');
    selectElement.options.add(newOption);
    newOption = new Option('2阶全通', '4');
    selectElement.options.add(newOption);
}

function initXoverControl(which) {
    var selectElement = document.getElementById(which);
    var newOption = new Option("宁克",'0');
    selectElement.options.add(newOption);
    newOption = new Option("贝塞尔",'1');
    selectElement.options.add(newOption);
    newOption = new Option("巴特沃斯",'2');
    selectElement.options.add(newOption);
}

function initXoverMany(which) {
    var selectElement = document.getElementById(which);
    var newOption = new Option("12",'0');
    selectElement.options.add(newOption);
    newOption = new Option("18",'1');
    selectElement.options.add(newOption);
    newOption = new Option("24",'2');
    selectElement.options.add(newOption);
    newOption = new Option("30",'3');
    selectElement.options.add(newOption);
    newOption = new Option("36",'4');
    selectElement.options.add(newOption);
    newOption = new Option("42",'5');
    selectElement.options.add(newOption);
    newOption = new Option("48",'6');
    selectElement.options.add(newOption);
}

function initXoverFew(which) {
    var selectElement = document.getElementById(which);
    var newOption = new Option("12",'0');
    selectElement.options.add(newOption);
    newOption = new Option("24",'1');
    selectElement.options.add(newOption);
    newOption = new Option("36",'2');
    selectElement.options.add(newOption);
    newOption = new Option("48",'3');
    selectElement.options.add(newOption);
}


function initSlopeSelectControl(which){
    var selectElement = document.getElementById(which);
    var newOption = new Option('6dB','0');
    selectElement.options.add(newOption);
    newOption = new Option('12dB', '1');
    selectElement.options.add(newOption);
}

function setOptionControlText(id, text){
    var optionElement = document.getElementById(id);
    for (var i=0; i<text.length; i++){
        optionElement.options[i].text = text[i];
    }
}


function setLinkInputSelectControlText(){
    var text;
    if (isChinese){
         text = CHINESE_LINK_IN;
    }else{
        text = ENGLISH_LINK_IN;
    }
    setOptionControlText('select_link_a', text);
    setOptionControlText('select_link_b', text);
    setOptionControlText('select_link_c', text);
    setOptionControlText('select_link_d', text);
}

function setLinkOutSelectControlText() {
    var text;
    if (isChinese){
        text = CHINESE_LINK_OUT;
    }else{
        text = ENGLISH_LINK_OUT;
    }
    setOptionControlText('select_link_out1', text);
    setOptionControlText('select_link_out2', text);
    setOptionControlText('select_link_out3', text);
    setOptionControlText('select_link_out4', text);
    setOptionControlText('select_link_out5', text);
    setOptionControlText('select_link_out6', text);
    setOptionControlText('select_link_out7', text);
    setOptionControlText('select_link_out8', text);

}

function setEqTypeSelectControlText() {
    var text;
    if (isChinese){
        text = CHINESE_EQ_TYPE;

    }else{
        text = ENGLISH_EQ_TYPE;
    }
    setOptionControlText('select_mode1', text);
    setOptionControlText('select_mode2', text);
    setOptionControlText('select_mode3', text);
    setOptionControlText('select_mode4', text);
    setOptionControlText('select_mode5', text);
    setOptionControlText('select_mode6', text);
}

function setXOverTypeSelectControlText() {
    var text;
    if (isChinese){
        text = CHINESE_X_OVER_TYPE;
    }else{
        text = ENGLISH_X_OVER_TYPE;
    }
}

function setFeedBackSelectControlText() {
    var text;
    if (isChinese){
        text = CHINESE_FEEDBACK;
    }else{
        text = ENGLISH_FEEDBACK;
    }
}

function setPrioritySelectControlText() {
    var text;
    if (isChinese){
        text = CHINESE_PRIORITY;
    }else{
        text = ENGLISH_PRIORITY;
    }
}



function addSelectControlListener(){
    var selectElement;
    selectElement = document.getElementById('select_link_a');
    selectElement.addEventListener('change', selectElementLinkInputARespond); //输入A联调响应
    selectElement = document.getElementById('select_link_b');
    selectElement.addEventListener('change', selectElementLinkInputBRespond); //输入联调响应
    selectElement = document.getElementById('select_link_c');
    selectElement.addEventListener('change', selectElementLinkInputCRespond);
    selectElement = document.getElementById('select_link_d');
    selectElement.addEventListener('change', selectElementLinkInputDRespond);

    selectElement = document.getElementById('select_link_out1');
    selectElement.addEventListener('change', selectElementLinkOut1Respond); //输出1联调响应
    selectElement = document.getElementById('select_link_out2');
    selectElement.addEventListener('change', selectElementLinkOut2Respond);
    selectElement = document.getElementById('select_link_out3');
    selectElement.addEventListener('change', selectElementLinkOut3Respond);
    selectElement = document.getElementById('select_link_out4');
    selectElement.addEventListener('change', selectElementLinkOut4Respond);
    selectElement = document.getElementById('select_link_out5');
    selectElement.addEventListener('change', selectElementLinkOut5Respond);
    selectElement = document.getElementById('select_link_out6');
    selectElement.addEventListener('change', selectElementLinkOut6Respond);
    selectElement = document.getElementById('select_link_out7');
    selectElement.addEventListener('change', selectElementLinkOut7Respond);
    selectElement = document.getElementById('select_link_out8');
    selectElement.addEventListener('change', selectElementLinkOut8Respond);

    selectElement = document.getElementById('select_mode1');
    selectElement.addEventListener('change', selectElementEqType1Respond);
    selectElement = document.getElementById('select_mode2');
    selectElement.addEventListener('change', selectElementEqType2Respond);
    selectElement = document.getElementById('select_mode3');
    selectElement.addEventListener('change', selectElementEqType3Respond);
    selectElement = document.getElementById('select_mode4');
    selectElement.addEventListener('change', selectElementEqType4Respond);
    selectElement = document.getElementById('select_mode5');
    selectElement.addEventListener('change', selectElementEqType5Respond);
    selectElement = document.getElementById('select_mode6');
    selectElement.addEventListener('change', selectElementEqType6Respond);

    selectElement = document.getElementById('select_slope1');
    selectElement.addEventListener('change', selectElementEqSlope1Respond);
    selectElement = document.getElementById('select_slope2');
    selectElement.addEventListener('change', selectElementEqSlope2Respond);
    selectElement = document.getElementById('select_slope3');
    selectElement.addEventListener('change', selectElementEqSlope3Respond);
    selectElement = document.getElementById('select_slope4');
    selectElement.addEventListener('change', selectElementEqSlope4Respond);
    selectElement = document.getElementById('select_slope5');
    selectElement.addEventListener('change', selectElementEqSlope5Respond);
    selectElement = document.getElementById('select_slope6');
    selectElement.addEventListener('change', selectElementEqSlope6Respond);

    selectElement = document.getElementById('text_hpf_mode');
    selectElement.addEventListener('change', selectElementHpfModeRespond);
    selectElement = document.getElementById('text_lpf_mode');
    selectElement.addEventListener('change', selectElementLpfModeRespond);
    selectElement = document.getElementById('text_hpf_slope');
    selectElement.addEventListener('change', selectElementHpfSlopeRespond);
    selectElement = document.getElementById('text_lpf_slope');
    selectElement.addEventListener('change', selectElementLpfSlopeRespond);
}


function selectElementLinkInputARespond() { //输入A联调响应
    var selectElement = document.getElementById('select_link_a');
    var index = selectElement.selectedIndex;
    //alert('inputA_'+ index);
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

function selectElementLinkInputBRespond() { //输入B联调响应
    var selectElement = document.getElementById('select_link_b');
    var index = selectElement.selectedIndex;
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

function selectElementLinkInputCRespond() { //输入C联调响应
    var selectElement = document.getElementById('select_link_c');
    var index = selectElement.selectedIndex;
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

function selectElementLinkInputDRespond() { //输入D联调响应
    var selectElement = document.getElementById('select_link_d');
    var index = selectElement.selectedIndex;
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
function selectElementLinkOut1Respond() { //输出1联调响应
    var selectElement = document.getElementById('select_link_out1');
    var index = selectElement.selectedIndex;
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

function selectElementLinkOut2Respond() { //输出2联调响应
    var selectElement = document.getElementById('select_link_out2');
    var index = selectElement.selectedIndex;
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

function selectElementLinkOut3Respond() { //输出3联调响应
    var selectElement = document.getElementById('select_link_out3');
    var index = selectElement.selectedIndex;
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

function selectElementLinkOut4Respond() { //输出4联调响应
    var selectElement = document.getElementById('select_link_out4');
    var index = selectElement.selectedIndex;
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

function selectElementLinkOut5Respond() { //输出5联调响应
    var selectElement = document.getElementById('select_link_out5');
    var index = selectElement.selectedIndex;
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

function selectElementLinkOut6Respond() { //输出6联调响应
    var selectElement = document.getElementById('select_link_out6');
    var index = selectElement.selectedIndex;
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

function selectElementLinkOut7Respond() { //输出7联调响应
    var selectElement = document.getElementById('select_link_out7');
    var index = selectElement.selectedIndex;
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

function selectElementLinkOut8Respond() { //输出8联调响应
    var selectElement = document.getElementById('select_link_out8');
    var index = selectElement.selectedIndex;
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

//==================================================================
function updateEqModeDisplay(type, index){
    var editBandwidth, editSlope, selectSlope, editGain, editGainPass, sliderEq;
    editBandwidth = document.getElementById('text_eq' + index + '_bandwidth_div');
    editSlope = document.getElementById('text_eq' + index + '_slope_div');
    selectSlope = document.getElementById('select_slope' + index);
    editGain = document.getElementById('text_eq' + index + '_gain_div');
    editGainPass = document.getElementById('text_eq' + index + '_gain_pass');
    sliderEq = document.getElementById('slider_ruler_eq' + index);


    // editBandwidth.style.display = 'none';
    // editSlope.style.display = 'none';
    // selectSlope.style.display = 'none';
    // editGain.style.display = 'none';
    // editGainPass.style.display = 'none';
    // sliderEq.style.display = 'none';

    //console.log('updateEqModeDisplay___type:' + type + '   index:' + index);

    switch(type){
        case 0: // 参量
            editBandwidth.style.display = 'inline';
            editSlope.style.display = 'inline';
            editGain.style.display = 'inline';
            sliderEq.style.display = 'inline';
            selectSlope.style.display = 'none';
            break;
        case 1: // 低调
            editBandwidth.style.display = 'none';
            editSlope.style.display = 'none';
            editGain.style.display = 'inline';
            sliderEq.style.display = 'inline';
            selectSlope.style.display = 'inline';
            break;
        case 2: // 高调
            editBandwidth.style.display = 'none';
            editSlope.style.display = 'none';
            editGain.style.display = 'inline';
            sliderEq.style.display = 'inline';
            selectSlope.style.display = 'inline';
            break;
        case 3: // 1阶全通
            editBandwidth.style.display = 'none';
            editSlope.style.display = 'none';
            editGain.style.display = 'none';
            sliderEq.style.display = 'none';
            selectSlope.style.display = 'none';
            editGainPass.style.display = 'inline';
            break;
        case 4: // 2阶全通
            editBandwidth.style.display = 'inline';
            editSlope.style.display = 'inline';
            editGain.style.display = 'none';
            sliderEq.style.display = 'none';
            selectSlope.style.display = 'none';
            editGainPass.style.display = 'inline';
            break;
        default:

            break;

    }

}

function setEqPassButtonStatus(id,status){
    var buttonElement;
    switch (id){
        case controlsId.BUTTON_EQ:
            controlsData.buttonStates.buttonEqStatus[0] = status;
            buttonElement = document.getElementById('button_eq');
            if (!controlsData.buttonStates.buttonEqStatus[0]){
                buttonElement.setAttribute('class', 'button_eq_false');
            }else{
                buttonElement.setAttribute('class', 'button_eq_true');
            }
            break;
        case controlsId.BUTTON_EQ1:
            controlsData.buttonStates.buttonEqStatus[1] = status;
            buttonElement = document.getElementById('button_eq1');
            if (!controlsData.buttonStates.buttonEqStatus[1]){
                buttonElement.setAttribute('class', 'button_eq_false');
            }else{
                buttonElement.setAttribute('class', 'button_eq_true');
            }
            break;
        case controlsId.BUTTON_EQ2:
            controlsData.buttonStates.buttonEqStatus[2] = status;
            buttonElement = document.getElementById('button_eq2');
            if (!controlsData.buttonStates.buttonEqStatus[2]){
                buttonElement.setAttribute('class', 'button_eq_false');

            }else{
                buttonElement.setAttribute('class', 'button_eq_true');
            }
            break;
        case controlsId.BUTTON_EQ3:
            controlsData.buttonStates.buttonEqStatus[3] = status;
            buttonElement = document.getElementById('button_eq3');
            if (!controlsData.buttonStates.buttonEqStatus[3]){
                buttonElement.setAttribute('class', 'button_eq_false');
            }else{
                buttonElement.setAttribute('class', 'button_eq_true');
            }
            break;
        case controlsId.BUTTON_EQ4:
            controlsData.buttonStates.buttonEqStatus[4] = status;
            buttonElement = document.getElementById('button_eq4');
            if (!controlsData.buttonStates.buttonEqStatus[4]){
                buttonElement.setAttribute('class', 'button_eq_false');
            }else{
                buttonElement.setAttribute('class', 'button_eq_true');
            }
            break;
        case controlsId.BUTTON_EQ5:
            controlsData.buttonStates.buttonEqStatus[5] = status;
            buttonElement = document.getElementById('button_eq5');
            if (!controlsData.buttonStates.buttonEqStatus[5]){
                buttonElement.setAttribute('class', 'button_eq_false');
            }else{
                buttonElement.setAttribute('class', 'button_eq_true');
            }
            break;
        case controlsId.BUTTON_EQ6:
            controlsData.buttonStates.buttonEqStatus[6] = status;
            buttonElement = document.getElementById('button_eq6');
            if (!controlsData.buttonStates.buttonEqStatus[6]){
                buttonElement.setAttribute('class', 'button_eq_false');
            }else{
                buttonElement.setAttribute('class', 'button_eq_true');
            }
            break;

        default:
            break;
    }
   updateAllEqGainButton();
}

//================================================================================================
//EQ 模式下拉列表框
function selectElementEqType1Respond() {
    var selectElement = document.getElementById('select_mode1');
    var index = selectElement.selectedIndex;
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

function selectElementEqType2Respond() {
    var selectElement = document.getElementById('select_mode2');
    var index = selectElement.selectedIndex;
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

function selectElementEqType3Respond() {
    var selectElement = document.getElementById('select_mode3');
    var index = selectElement.selectedIndex;
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

function selectElementEqType4Respond() {
    var selectElement = document.getElementById('select_mode4');
    var index = selectElement.selectedIndex;
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

function selectElementEqType5Respond() {
    var selectElement = document.getElementById('select_mode5');
    var index = selectElement.selectedIndex;
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

function selectElementEqType6Respond() {
    var selectElement = document.getElementById('select_mode6');
    var index = selectElement.selectedIndex;
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
function selectElementEqSlope1Respond() {   //斜率1 响应
    var selectElement = document.getElementById('select_slope1');
    var index = selectElement.selectedIndex;
    eqData.EQ1.HL_db_AP_Flag = SET_4H_BYTE(index,GET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag));
    // setEqPassButtonStatus(controlsId.BUTTON_EQ1, false);
    keepLinkEq1SlopeSelect(curButtonNo, index);
    eqDataKeepStep(curButtonNo,1);
    DrawLine();
    updateEqModeDisplay(eqData.EQ1.type, 1);
    curEqChannel = 1;
    showOrHideEqData();
}

function selectElementEqSlope2Respond() {   //斜率2 响应
    var selectElement = document.getElementById('select_slope2');
    var index = selectElement.selectedIndex;
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

function selectElementEqSlope3Respond() {   //斜率3 响应
    var selectElement = document.getElementById('select_slope3');
    var index = selectElement.selectedIndex;
    eqData.EQ3.HL_db_AP_Flag = SET_4H_BYTE(index,GET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag));
    // setEqPassButtonStatus(controlsId.BUTTON_EQ3, false);

    keepLinkEq3SlopeSelect(curButtonNo, index);
    eqDataKeepStep(curButtonNo,3);
    DrawLine();

    updateEqModeDisplay(eqData.EQ3.type, 3);
    curEqChannel = 3;
    showOrHideEqData();

}

function selectElementEqSlope4Respond() {   //斜率4 响应
    var selectElement = document.getElementById('select_slope4');
    var index = selectElement.selectedIndex;
    eqData.EQ4.HL_db_AP_Flag = SET_4H_BYTE(index,GET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag));
    // setEqPassButtonStatus(controlsId.BUTTON_EQ4, false);

    keepLinkEq4SlopeSelect(curButtonNo, index);

    eqDataKeepStep(curButtonNo,4);
    DrawLine();

    updateEqModeDisplay(eqData.EQ4.type, 4);
    curEqChannel = 4;
    showOrHideEqData();

}

function selectElementEqSlope5Respond() {   //斜率5 响应
    var selectElement = document.getElementById('select_slope5');
    var index = selectElement.selectedIndex;
    eqData.EQ5.HL_db_AP_Flag = SET_4H_BYTE(index,GET_4L_BYTE(eqData.EQ1.HL_db_AP_Flag));
    // setEqPassButtonStatus(controlsId.BUTTON_EQ5, false);

    keepLinkEq5SlopeSelect(curButtonNo, index);
    eqDataKeepStep(curButtonNo,5);
    DrawLine();

    updateEqModeDisplay(eqData.EQ5.type, 5);
    curEqChannel = 5;
    showOrHideEqData();

}

function selectElementEqSlope6Respond() {   //斜率6 响应
    var selectElement = document.getElementById('select_slope6');
    var index = selectElement.selectedIndex;
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
function selectElementHpfModeRespond(){ //分频高通模式
    var selectElement = document.getElementById('text_hpf_mode');
    var slopeElement = document.getElementById("text_hpf_slope");
    var index = selectElement.selectedIndex;
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

function selectElementLpfModeRespond(){ //分频低通模式
    var selectElement = document.getElementById('text_lpf_mode');
    var slopeElement = document.getElementById("text_lpf_slope");
    var index = selectElement.selectedIndex;
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

function selectElementHpfSlopeRespond(){  //分频高通 斜率
    var selectElement = document.getElementById('text_hpf_slope');
    var index = selectElement.selectedIndex;

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

function selectElementLpfSlopeRespond(){ //分频低通 斜率
    var selectElement = document.getElementById('text_lpf_slope');
    var index = selectElement.selectedIndex;

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


