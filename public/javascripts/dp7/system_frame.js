//==============================================================================
// system_curtain
//==============================================================================
function initSystemCurtain(){

    //===========================================================
    var selectElement = document.getElementById('system_back_selector');
    var newOption = new Option('常亮', '0');
    selectElement.options.add(newOption);

    newOption = new Option('10s', '1');
    selectElement.options.add(newOption);

    //===========================================================
    selectElement = document.getElementById('startup_selector');
    newOption = new Option('当前程序', '0');
    selectElement.options.add(newOption);

    newOption = new Option('全静音', '1');
    selectElement.options.add(newOption);

    for(var i=1; i<31; i++){
        newOption = new Option('设备程序' + i, (i+1) +'');
        selectElement.options.add(newOption);
    }

    //============================================================
    //select_change
    document.getElementById('system_back_selector').onchange = backSelectorChange;
    document.getElementById('startup_selector').onchange =  startUpSelectorChange;

    document.getElementById('text_first_line').onchange = firstLineChange;
    document.getElementById('text_second_line').onchange = secondLineChange;

    document.getElementById('button_central_control').onclick = centralClickResponse;
    document.getElementById('interface_confirm').onclick = interfaceConfirmClickResponse;
    document.getElementById('interface_cancel').onclick = interfaceCancelClickResponse;
    document.getElementById('system_quit').onclick = systemQuitClickResponse;
}

function refreshSystemCurtain() {
    // setSelectElementLanguageValue('system_back_selector', '常亮', 'Keep On', 0);
    // setSelectElementLanguageValue('system_back_selector', '10秒', '10s', 1);
    //
    // setSelectElementLanguageValue('startup_selector', '当前程序', 'Current Program', 0);
    // setSelectElementLanguageValue('startup_selector', '全静音', 'All Mute', 1);
    //
    // for(var i=1; i<31; i++) {
    //     setSelectElementLanguageValue('startup_selector', '设备程序' + i, 'Device Program' + i, (i+1) +'');
    // }
}



function renewSystemCurtain() {
    // dataBuff.push(currentSystemData.m_nModify_Flag);   //  修改 标记 0:未      修改  1:已修改
    // dataBuff.push(currentSystemData.m_nMCU_PG_Type);    //  修改 程序 类型:     0:MCU程序  1:PC 程序
    // dataBuff.push(currentSystemData.m_nSave_Cur_PG_ID);  //  保持 当前 程序 编号
    // dataBuff.push(currentSystemData.m_nDevSSet);   //  1:保持    状态   启动 2:静音启动   3:程序组
    // dataBuff.push(currentSystemData.m_nSetPG_ID); //程序组编号  ID
    // dataBuff.push(currentSystemData.Empty); //工厂数据长度

    document.getElementById('system_back_selector').options[currentSystemData.m_nBack_Light].selected = true;
    if (Number(currentSystemData.m_nDevSSet) === 1){ //保持当前程序
        document.getElementById('startup_selector').options[0].selected = true;
        // console.log('保持当前程序');
    } else if(Number(currentSystemData.m_nDevSSet) === 2) { //静音启动
        document.getElementById('startup_selector').options[1].selected = true;
        // console.log('静音启动');
    } else {
        document.getElementById('startup_selector').options[currentSystemData.m_nSetPG_ID + 1].selected = true;
        // console.log('启用设备程序组：' + (currentSystemData.m_nSetPG_ID + 1));
    }

}



function backSelectorChange(){
    var value = document.getElementById('system_back_selector').value;
    console.log(value);

    currentSystemData.m_nBack_Light = value;

    readWriteSystemData(messageType.PC_Write_Data,messageType.PC_Back_Light_ID,0); //写启动设置
    dataForSendArray.push(formulateDataForSend(dataForSend));
}


function startUpSelectorChange(){
    //m_nSave_Cur_PG_ID    m_nDevSSet      m_nSetPG_ID
    //当m_nDevSSet为1：保持当前程序    为2：[全静音]    为3：设备程序[1,30]
    var value = document.getElementById('startup_selector').value;
    console.log(value);

    if(Number(value) === 0 ){  //当前程序
        currentSystemData.m_nDevSSet = 1;
        // console.log('____________________改为当前程序');
    } else if (Number(value) === 1) { //全静音
        currentSystemData.m_nDevSSet = 2;
        // console.log('____________________改为全静音');
    } else {
        currentSystemData.m_nDevSSet = 3;
        currentSystemData.m_nSetPG_ID = value - 1;
        // console.log('____________________改为程序组:' + currentSystemData.m_nSetPG_ID);
    }

    // currentSystemData.m_nModify_Flag = dataBeReceive.DataBuff[0];    //  修改 标记 0:未      修改  1:已修改
    // currentSystemData.m_nMCU_PG_Type = dataBeReceive.DataBuff[1];    //  修改 程序 类型:     0:MCU程序  1:PC 程序
    // currentSystemData.m_nSave_Cur_PG_ID = dataBeReceive.DataBuff[2];   //  保持 当前 程序 ID
    // currentSystemData.m_nDevSSet = dataBeReceive.DataBuff[3];   //  1:保持    状态   启动 2:静音启动   3:程序组
    // currentSystemData.m_nSetPG_ID = dataBeReceive.DataBuff[4]; //程序组编号  ID
    // currentSystemData.Empty = dataBeReceive.DataBuff[5];       //工厂程序数量

    readWriteSystemData(messageType.PC_Write_Data,messageType.Device_StartUp_Set,0); //写启动设置
    dataForSendArray.push(formulateDataForSend(dataForSend));
}

function centralClickResponse(){
    curtainOption(4);
}

function interfaceConfirmClickResponse(){
    var fistLine = document.getElementById('text_first_line').value;
    var secondLine = document.getElementById('text_second_line').value;
    var firstArray = stringToBytesOfInterface(fistLine,24);
    var secondArray =stringToBytesOfInterface(secondLine,24);
    var newArray = [];

    newArray = firstArray.concat(secondArray);  //第一行与第二行连接
    currentSystemData.firstRow = fistLine;
    currentSystemData.secondRow = secondLine;


    deepCopyValue(currentSystemData.m_nInformation,newArray);//更新界面信息
    console.log('新界面信息:' + currentSystemData.m_nInformation);
    readWriteSystemData(messageType.PC_Write_Data,messageType.PC_Information_ID,0); //写界面信息
    dataForSendArray.push(formulateDataForSend(dataForSend));

}

function interfaceCancelClickResponse(){
    document.getElementById('text_first_line').value = currentSystemData.firstRow;
    document.getElementById('text_second_line').value = currentSystemData.secondRow;
    curtainOption(0);
}

function systemQuitClickResponse(){
    document.getElementById('text_first_line').value = currentSystemData.firstRow;
    document.getElementById('text_second_line').value = currentSystemData.secondRow;
    curtainOption(0);
}

function firstLineChange() {
}

function secondLineChange() {
}

function stringToBytesOfInterface ( str, length ) { //not for chinese
    var ch, st, re = [], strHex = [];
    for (var i = 0; i < str.length; i++ ) {
        ch = str.charCodeAt(i);  // get char
        st = [];                 // set up "stack"
        do {
            st.push( ch & 0xFF );  // push byte to stack
            ch = ch >> 8;          // shift value down by 1 byte
        }
        while ( ch );
        // add stack contents to result
        // done because chars have "wrong" endianness
        re = re.concat( st.reverse() );
    }
    // return an array of bytes
    for ( i=0; i<re.length; i++){
        strHex[i] = re[i].toString(16);
    }

    var startArray=[], endArray =[];
    var emptyLength = length - re.length;
    if(emptyLength === 0){
        return re;
    } else if(emptyLength === 1) {
        return re.concat(32);
    } else if(emptyLength === 2) {
        return [32].concat(re,32);
    }

    if(emptyLength%2){//单数
        for (i=0; i<Math.floor(emptyLength/2); i++){
            startArray[i] = 32;
            endArray[i] = 32;
        }
        endArray.push(32);
    } else {//双数
        for (i=0; i<Math.floor(emptyLength/2); i++){
            startArray[i] = 32;
            endArray[i] = 32;
        }
    }

    return startArray.concat(re,endArray);

}