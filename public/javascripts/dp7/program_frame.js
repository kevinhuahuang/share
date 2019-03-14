var programIndex = 0;
var programName = '';
function initProgramTrClick(){
    for(var i=1; i<31; i++){
        setProgramTrClick(i);
    }

    document.getElementById('program_name').onchange = deviceSelectResponse;

    document.getElementById('save_to_device').onclick = deviceSelectResponse;
    document.getElementById('load_from_device').onclick = deviceSelectResponse;

    document.getElementById('save_device').onclick = saveDeviceResponse;
    document.getElementById('delete_device').onclick = deleteDeviceResponse;

    document.getElementById('button_load_one_from_pc').onclick = buttonLoadOneFromPcResponse;
    document.getElementById('button_load_all_from_pc').onclick = buttonLoadAllFromPcResponse;
    document.getElementById('button_save_one_to_pc').onclick = buttonSaveOneToPcResponse;
    document.getElementById('button_save_all_to_pc').onclick = buttonSaveAllToPcResponse;

    document.getElementById('save_one_to_pc').onclick = saveOneToPcResponse;
    document.getElementById('save_all_to_pc').onclick = saveAllToPcResponse;

    document.getElementById('save_one_to_pc').oncontextmenu = saveOneToPcMenuResponse;
    document.getElementById('save_all_to_pc').oncontextmenu = saveAllToPcMenuResponse;

    document.getElementById('program_exit').onclick = programExitClickResponse;
}

var factoryProgramText;
var userProgramText;
var saveText;
var loadText;

function initProgramDisplay () {
    var i;

    if(isChinese) {
        factoryProgramText = '工厂程序';
        userProgramText = '用户程序';
        saveText = '保存';
        loadText = '调用';
    } else {
        factoryProgramText = 'Factory';
        userProgramText = 'User';
        saveText = 'Save';
        loadText = 'Load';
    }

    for(i=0; i< 30; i++){
        if(i < currentSystemData.Empty){
            document.getElementById('program_type' + ( i + 1 )).innerText = factoryProgramText;
        } else {
            document.getElementById('program_type' + ( i + 1 )).innerText = userProgramText;
        }
    }

    for (i = 0; i < 30; i++) {
        document.getElementById('program_name' + ( i + 1 )).innerText = programNameArray[i];
    }

    document.getElementById('save_all_to_pc').style.display = 'none';
    document.getElementById('save_all_to_pc').style.display = 'none';


    renewProgramTrClick();
    document.getElementById('table_row' + 1).setAttribute('style','background-color:white;');
    programIndex = 1;
    programName = document.getElementById('program_name' + 1).innerText;
    renewProgramName(programIndex, programName);
    updateSaveOrLoadStatus();
}


function setProgramTrClick(index){
    document.getElementById('table_row' + index).onclick = function(e){
        renewProgramTrClick();
        document.getElementById('table_row' + index).setAttribute('style','background-color:white;');
        programIndex = index;
        programName = document.getElementById('program_name' + index).innerText;
        renewProgramName(programIndex, programName);
        updateSaveOrLoadStatus();
    }
}


function renewProgramTrClick(){
    for(var i=1; i<31; i++){
        document.getElementById('table_row' + i).setAttribute('style', 'background-color: #B2B2B2');
    }
}

function renewProgramName(index , name) {
    var elementName = document.getElementById('program_name');
    var elementSave = document.getElementById('save_to_device');
    var elementLoad = document.getElementById('load_from_device');
    elementName.value = name;
    if(index <= currentSystemData.Empty){
        elementName.readonly = true;
        elementName.disabled = true;
        elementSave.readonly = true;
        elementSave.disabled = true;
        elementLoad.checked = true;
        document.getElementById('save_device').innerText = loadText;
        elementName.disabled = true;
    } else {
        elementName.readonly = false;
        elementName.disabled = false;
        elementName.disabled = false;
        if(currentLockData.nSys_LockData.nSYS_Save_Data) {
            elementSave.readonly = true;
            elementSave.disabled = true;
            document.getElementById('save_device').innerText = loadText;
            elementName.disabled = true;
        } else {
            elementSave.readonly = false;
            elementSave.disabled = false;
        }
    }

    if(elementSave.checked && (!currentLockData.nSys_LockData.nSYS_Save_Data)){
        elementName.disabled = false;
    } else {
        elementName.disabled = true;
    }
}


function deviceSelectResponse() {
    var radios,option=-1,i;
    var elementProgramName = document.getElementById('program_name');
    radios = document.getElementsByName('device_program');
    // console.log(radios);
    for(i=0; i<radios.length; i++){
        if(radios[i].checked){
            option = i;
        }
    }

    if(option === 0){
        document.getElementById('save_device').innerText = saveText;
        elementProgramName.disabled = false;
        // console.log('保存');
    }else if(option===1){
        document.getElementById('save_device').innerText = loadText;
        elementProgramName.disabled = true;
        // console.log('调用');
    }
    updateSaveOrLoadStatus();
}


function updateSaveOrLoadStatus() {
    var radios,option=-1,i;
    var elementProgramName = document.getElementById('program_name');
    var saveOrLoadElement = document.getElementById('save_device');
    var deleteElement = document.getElementById('delete_device');
    var saveCheck = document.getElementById('save_to_device');
    var loadCheck = document.getElementById('load_from_device');
    radios = document.getElementsByName('device_program');
    // console.log(radios);
    for(i=0; i<radios.length; i++){
        if(radios[i].checked){
            option = i;
        }
    }

    if(option === 0){ //保存
        saveOrLoadElement.innerText = saveText;
        if(programIndex <= currentSystemData.Empty) { //工厂程序
            if(currentLockData.nSys_LockData.nSYS_Load_Data){ //调用锁定
                saveOrLoadElement.disabled = true;
                elementProgramName.disabled = true;
                saveCheck.disabled = true;
                loadCheck.disabled = true;
                saveCheck.checked = true;
                loadCheck.checked = false;
                console.log('工厂程序 调用锁定');
            } else { //调用未锁定
                saveOrLoadElement.innerText = loadText;
                elementProgramName.disabled = true;
                saveOrLoadElement.disabled = false;
                saveCheck.disabled = true;
                loadCheck.disabled = false;
                saveCheck.checked = false;
                loadCheck.checked = true;
                console.log('工厂程序 调用未锁定');
            }
        } else { //用户程序
            if(currentLockData.nSys_LockData.nSYS_Save_Data) { //保存被锁定
                if(currentLockData.nSys_LockData.nSYS_Load_Data){ //调用锁定
                    saveOrLoadElement.disabled = true;
                    elementProgramName.disabled = true;
                    saveCheck.disabled = true;
                    loadCheck.disabled = true;
                    saveCheck.checked = true;
                    loadCheck.checked = false;
                    console.log('用户程序 保存被锁定  调用锁定');
                } else { //调用未锁定
                    saveOrLoadElement.innerText = loadText;
                    elementProgramName.disabled = true;
                    saveOrLoadElement.disabled = false;
                    saveCheck.disabled = true;
                    loadCheck.disabled = false;
                    saveCheck.checked = false;
                    loadCheck.checked = true;
                    console.log('用户程序 保存被锁定 调用未锁定');
                }
            } else { //保存未锁定
                if(currentLockData.nSys_LockData.nSYS_Load_Data) { //调用被锁定
                    saveOrLoadElement.disabled = false;
                    elementProgramName.disabled = false;
                    saveCheck.disabled = false;
                    loadCheck.disabled = true;
                    saveCheck.checked = true;
                    loadCheck.checked = false;
                    // console.log('用户程序 保存未锁定 调用被锁定');
                } else { //调用未锁定
                    saveOrLoadElement.disabled= false;
                    elementProgramName.disabled = false;
                    saveCheck.disabled = false;
                    loadCheck.disabled = false;
                    saveCheck.checked = true;
                    loadCheck.checked = false;
                    // console.log('用户程序 保存未锁定 调用被锁定');
                }
            }
        }
    }else if(option===1){ //调用
        saveOrLoadElement.innerText = loadText;
        if (currentLockData.nSys_LockData.nSYS_Load_Data) { //调用被锁定
            if(currentLockData.nSys_LockData.nSYS_Save_Data) { //保存被锁定
                saveOrLoadElement.disabled = true;
                elementProgramName.disabled = true;
                saveCheck.disabled = true;
                loadCheck.disabled = true;
                saveCheck.checked = false;
                loadCheck.checked = true;
                // console.log('调用被锁定 保存被锁定');
            } else { //保存未被锁定
                if(programIndex <= currentSystemData.Empty) { //工厂程序
                    saveOrLoadElement.disabled = true;
                    elementProgramName.disabled = true;
                    saveCheck.disabled = true;
                    loadCheck.disabled = true;
                    saveCheck.checked = false;
                    loadCheck.checked = true;
                    // console.log('调用被锁定 保存未被锁定 工厂程序');
                }  else { //用户程序
                    saveOrLoadElement.innerText = saveText;
                    saveOrLoadElement.disabled = false;
                    elementProgramName.disabled = false;
                    saveCheck.disabled = false;
                    loadCheck.disabled = true;
                    saveCheck.checked = true;
                    loadCheck.checked = false;
                    // console.log('调用被锁定 保存未被锁定 用户程序');
                }
            }
        } else { //调用未锁定
            if (currentLockData.nSys_LockData.nSYS_Save_Data) { //保存被锁定
                saveOrLoadElement.disabled = false;
                elementProgramName.disabled = true;
                saveCheck.disabled = true;
                loadCheck.disabled = false;
                saveCheck.checked = false;
                loadCheck.checked = true;
                // console.log('调用未锁定 保存被锁定');
            } else { //保存未锁定
                saveOrLoadElement.disabled = false;
                elementProgramName.disabled = true;
                saveCheck.disabled = false;
                loadCheck.disabled = false;
                saveCheck.checked = false;
                loadCheck.checked = true;
                // console.log('调用未锁定  保存未锁定');
            }
        }
    }

    if(currentLockData.nSys_LockData.nSYS_PC_Del) { //删除锁定
        deleteElement.disabled = true;
        // console.log('删除锁定');
    } else {
        if (programIndex <= currentSystemData.Empty) { //工厂程序
            deleteElement.disabled = true;
            // console.log('删除未锁定  工厂程序');
        } else { //用户程序
            deleteElement.disabled = false;
            // console.log('删除未锁定  用户程序');
        }
    }

    var saveCheckLabel = document.getElementById('save_to_device_label');

    if (programIndex <= currentSystemData.Empty || currentLockData.nSys_LockData.nSYS_Save_Data) {
        saveCheckLabel.style.color = 'grey';
    } else {
        saveCheckLabel.style.color = 'black';
    }
}


function saveDeviceResponse(){
    if(!isConnect){
        alert(isChinese ? "设备未连接" : 'Device is off connection');
        return;
    }

    var radios,option=-1,i;
    radios = document.getElementsByName('device_program');
    console.log(radios);
    for(i=0; i<radios.length; i++){
        if(radios[i].checked){
            option = i;
        }
    }

    if(option===0){
        saveProgramToDevice();   //保存一个程序到设备
    }else if(option===1){
        loadProgramFromDevice(); //从设备调用一个程序
    }
}


function deleteDeviceResponse(){ //删除一组程序
    if(programIndex > currentSystemData.Empty){
        readWriteSystemData(messageType.PC_Write_Data,messageType.Del_PG_ID,programIndex); //删除
        dataForSendArray.push(formulateDataForSend(dataForSend));
        document.getElementById('program_name').value = '';
        programNameArray[programIndex-1] =  '';
        currentAllGroupData[programIndex-1].name = stringToBytesNot32('', 12);
        document.getElementById('program_name' + programIndex).innerText = '';
        initProgramDisplay();
    }

}


function saveProgramToDevice(){ //保存一个程序到设备
    var elementProgramName = document.getElementById('program_name');
    if(currentLockData.nSys_LockData.nSYS_Save_Data) {
        elementProgramName.disabled = true;
        return;
    }
    elementProgramName.disabled = false;
    if(programIndex > 0 && programIndex <=30){
        // console.log('保存第' + programIndex + '组数据');
        var programName = document.getElementById('program_name').value;
        // console.log('program name:' + programName);
        if (programName) {
            programNameArray[programIndex-1] = programName;
            // document.getElementById('program_name' + programIndex).innerText = programName;
            // currentAllGroupData[programIndex-1] = deepCopy(currentGroupData);
            deepCopyValue(currentGroupData.m_nLockData.nIn_LockData, currentLockData.nIn_LockData);
            deepCopyValue(currentGroupData.m_nLockData.nOut_LockData, currentLockData.nOut_LockData);
            deepCopyValue(currentAllGroupData[programIndex-1], currentGroupData);
            currentAllGroupData[programIndex-1].name = stringToBytesNot32(programName, 12);
            // console.log('currentAllGroupData[programIndex-1].name:' + currentAllGroupData[programIndex-1].name);
            readWriteSystemData(messageType.PC_Write_Data,messageType.PC_RW_PGNAME,programIndex); //更改组名
            dataForSendArray.push(formulateDataForSend(dataForSend));
            deliverOneGroupData(programIndex);
            initProgramDisplay();
            // renewProgramNoAndName(programIndex,programName);
            // renewProgramNoAndName(programIndex,programName);
        }

    }
}


function loadProgramFromDevice(){ //从设备调用一个程序
    var elementProgramName = document.getElementById('program_name');
    if(currentLockData.nSys_LockData.nSYS_Load_Data) {
        return;
    }
    elementProgramName.disabled = true;
    if(programIndex > 0 && programIndex <= 30){
        console.log('调用第' + programIndex + '组数据');

        currentSystemData.m_nSave_Cur_PG_ID = programIndex;   //  保持 当前 程序 ID
        readWriteSystemData(messageType.PC_Write_Data,messageType.Device_StartUp_Set,0); //写启动设置
        dataForSendArray.push(formulateDataForSend(dataForSend));

        requestOneGroupData(programIndex);

        renewProgramNoAndName(programIndex,document.getElementById('program_name'+programIndex).innerText);
    }
}

//===================================================
function buttonLoadOneFromPcResponse(){
    if(currentLockData.nSys_LockData.nSYS_Load_Data) {
        return;
    }
}

function buttonLoadAllFromPcResponse(){
    if(currentLockData.nSys_LockData.nSYS_Load_Data) {
        return;
    }
}

function loadOneFromPcFile(obj){  //从电脑调用一组数据
    console.log('选择了调用的文件');
    //判断浏览器是否支持FileReader接口
    if (typeof FileReader == 'undefined') {
        //当前浏览器不支持FileReader接口
        alert(isChinese ? '当前浏览器不支持FileReader接口' : 'brower not support FileReader' );
        return;
    }

    var file = obj.files[0];
    var fileName = file.name;
    // console.log(fileName);
    if(!fileName.match(/.dia7y$/)){
        alert(isChinese ? '文件类型不正确' : 'wrong file type' );
        return;
    }
    fileName = fileName.replace('.dia7y', '');
    var reader = new FileReader();
    reader.onload = function (e) {
        var strData = e.target.result;
        //或者 value = this.result;  //e.target == this
        if(!disposeOneProgramString(strData,0)) { //解码读到的当前组文件
            return;
        }

        if(isConnect){
            currentSystemData.m_nMCU_PG_Type = 1; //程序类型 0:MCU  1:PC程序
            readWriteSystemData(messageType.PC_Write_Data,messageType.Device_StartUp_Set,0); //写启动设置
            dataForSendArray.push(formulateDataForSend(dataForSend));
            deliverOneGroupData(0);   //将数据发送到设备的当前组
            console.log('将数据发送到当前组')
        } else {
            curtainOption(0);
            console.log('返回主界面')
        }
        renewProgramNoAndName('PC',fileName.slice(0,12));
    };


    reader.readAsBinaryString(file);
    document.getElementById('load_one_from_pc').value = '';
}

function loadAllFromPcFile(obj){ //从电脑调用所有组数据

    //判断浏览器是否支持FileReader接口
    if (typeof FileReader == 'undefined') {
        //
        console.log('当前浏览器不支持FileReader接口');
        return;
    }

    var file = obj.files[0];
    var reader = new FileReader();
    var fileName = file.name;
    // console.log(fileName);
    if(!fileName.match(/.dat7y/)){
        alert(isChinese ? '文件类型不正确' : 'wrong file type' );
        return;
    }
    reader.onload = function (e) {
        var strData = e.target.result;
        if(!disposeAllProgramString(strData)) {
            return false;
        }
        if(isConnect){
            deliverAllGroupData();
        }else {
            curtainOption(0);
        }
        renewAllProgramName();
    };


    reader.readAsBinaryString(file);
    document.getElementById('load_all_from_pc').value = '';
    return true;
}


function renewAllProgramName() {
    for(var i=1; i<=30; i++){
        programNameArray[i-1] = bytesToStringNot32(currentAllGroupData[i-1].name);
        console.log(programNameArray[i-1]);
        document.getElementById('program_name' + i).innerText = programNameArray[i-1]
    }
}


function buttonSaveOneToPcResponse(){ //保存一组数据到电脑
    // if(!isConnect){
    //     alert(isChinese ? "设备未连接" : 'Device is off connection');
    //     return;
    // }
    if(currentLockData.nSys_LockData.nSYS_Save_Data) {
        return;
    }
    var aLink = document.getElementById("save_one_to_pc");
    var programString='';
    aLink.style.display = 'inline';
    // getOneProgramString(programString);
    // console.log('programString:' + programString);
    var blob = new Blob(getOneProgramString(0));
    // var objFile=new File(["First Line Text","Second Line Text"],"12312.txt");
    // var evt = document.createEvent("MouseEvents");
    // evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
    // evt.initMouseEvent(
    //     "click", true, false, window, 0, 0, 0, 0, 0
    //     , false, false, false, false, 0, null
    // );
    aLink.download = "dp7_one_program.dia7y";
    aLink.href = URL.createObjectURL(blob);
    //console.log(aLink.href);
    //aLink.dispatchEvent(evt);
    // if (navigator.userAgent.indexOf('Firefox') >= 0){
    //     aLink.click();//FF的支持,可能不需要
    // }
}


function buttonSaveAllToPcResponse(){  //保存所有组数据到电脑
    // if(!isConnect){
    //     alert(isChinese ? "设备未连接" : 'Device is off connection');
    //     return;
    // }
    requestAllGroupData();
}

function dealwithAllProgramString() {
    var aLink = document.getElementById("save_all_to_pc");
    aLink.style.display = 'inline';
    var blob = new Blob(getAllProgramString());
    //var objFile=new File(["First Line Text","Second Line Text"],"12312.txt");
    // var evt = document.createEvent("MouseEvents");
    // evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
    // evt.initMouseEvent(
    //     "click", true, false, window, 0, 0, 0, 0, 0
    //     , false, false, false, false, 0, null
    // );
    aLink.download = "dp7_all_program.dat7y";
    aLink.href = URL.createObjectURL(blob);
    //console.log(aLink.href);
    //aLink.dispatchEvent(evt);
    // if (navigator.userAgent.indexOf('Firefox') >= 0){
    //     aLink.click();//FF的支持,可能不需要
    // }
}


function saveOneToPcResponse(){
    // document.getElementById('save_one_to_pc').style.display = 'none';
}


function saveAllToPcResponse(){
    // document.getElementById('save_all_to_pc').style.display = 'none';
}


function saveOneToPcMenuResponse(){
    // document.getElementById('save_one_to_pc').style.display = 'none';
}


function saveAllToPcMenuResponse(){
    // document.getElementById('save_all_to_pc').style.display = 'none';
}
//======================================================================================================================

function programExitClickResponse(){
    curtainOption(0);
}

//======================================================================================================================

function getWebSoftVersionForWrite() {
    var byteArray;
    byteArray = currentWebSoftVersion.replace(/[SV\-T]/g,'').split('');
    var strArray = byteArray[0];
    console.log('byteArray: ' + byteArray);
    for(var i=1; i<byteArray.length; i++){
        strArray += ' ' + byteArray[i];
    }
    return strArray;
}

function arrayToStringWithSpace(array) {
    var arrayString = array[0];
    for(var i=1; i < array.length; i++){
        arrayString += ' ' + array[i];
    }
    return arrayString;
}

function getCurrentPGNameForWrite() {
    var str;
    if(currentPGName[0].length > 0){
        str = parseInt(currentPGName[0], 10) ;
    } else {
        str = '0'
    }
    for(var i=1; i<currentPGName.length; i++) {
        if(currentPGName[i].length > 0){
            str  += ' ' + parseInt(currentPGName[i], 10);
        } else {
            str  += ' ' + '0' ;
        }
    }
    return str;
}

function get30PGNameForWrite(index) {
    var nameArray;
    var str='';
    if((index > 0) && ( index < 31)){
        nameArray = stringToBytesNot32(programNameArray[index-1], 12);
        console.log('要写的程序名称为：' + nameArray);
        str = nameArray[0].toString(10);
        for(var i=1; i<nameArray.length; i++) {
            str  += ' ' + nameArray[i].toString(10);
        }
    }
    return str;
}

function getOneProgramString(groupId) {
    //版本号: "Z1.00"  字符串类型
    //设备类型： 24 26 28 36 46 48  1个字节
    //程序名称 12个字节  例如：空字节时名字为NULL，所有实际数据写作：78 85 76 76 0 0 0 0 0 0 0 0
    //工厂数据长度： 1个字节  取值[0,30];
    //4路输入  index = 4,5,6,7
    //锁定     index = 8
    //8路输出  index = 9,10,11,12,  13,14,15,16
    var groupData;
    var str='', str1=[];
    var lockData;

    if(groupId > 0) { //30组数据
        if(groupId === 1){ //30组数据的第一组
            str = str + getWebSoftVersionForWrite() + ' , '; //软件版本号
            str = str + deviceType + ' , ';//设备类型
            str = str + currentSystemData.Empty + ' , ';  //工厂数据长度
            str = str + get30PGNameForWrite(groupId) + ' , '; //第一组程序名称
        } else {
            str = str + get30PGNameForWrite(groupId) + ' , '; //当前组程序名称
        }
        groupData = currentAllGroupData[groupId-1];
        lockData = groupData.m_nLockData;
    } else {//当前组数据
        groupData = currentGroupData;
        lockData = currentLockData;
        str = getWebSoftVersionForWrite() + ' , '; //软件版本号
        str = str + deviceType + ' , ';//设备类型
        str = str + getCurrentPGNameForWrite() + ' , '; //当前组程序名称
        // str = str + currentSystemData.Empty + ' , ';  //工厂数据长度
        console.log('获取当前组数据');
    }

    str = str + arrayToStringWithSpace(getInputRouteSendData(groupData.dataInputA)) + ' , ';
    str = str + arrayToStringWithSpace(getInputRouteSendData(groupData.dataInputB)) + ' , ';
    str = str + arrayToStringWithSpace(getInputRouteSendData(groupData.dataInputC)) + ' , ';
    str = str + arrayToStringWithSpace(getInputRouteSendData(groupData.dataInputD)) +  ' , ';
    str = str + arrayToStringWithSpace(getLockDataArray(lockData)) + ' , ';
    str = str + arrayToStringWithSpace(getOutRouteSendData(groupData.dataOut1)) + ' , ';
    str = str + arrayToStringWithSpace(getOutRouteSendData(groupData.dataOut2)) + ' , ';
    str = str + arrayToStringWithSpace(getOutRouteSendData(groupData.dataOut3)) + ' , ';
    str = str + arrayToStringWithSpace(getOutRouteSendData(groupData.dataOut4)) + ' , ';
    str = str + arrayToStringWithSpace(getOutRouteSendData(groupData.dataOut5)) + ' , ';
    str = str + arrayToStringWithSpace(getOutRouteSendData(groupData.dataOut6)) + ' , ';
    str = str + arrayToStringWithSpace(getOutRouteSendData(groupData.dataOut7)) + ' , ';
    str = str + arrayToStringWithSpace(getOutRouteSendData(groupData.dataOut8)) + ' - ';
    // str = str + getGroupNameString(groupData.name) + ' - '; //是否需要当前组组名
    //str = str + groupData.name + '-'; //请更新为当前组组名
    console.log(str);
    str1.push(str);
    return str1;
}


var deviceType = 48;
function disposeOneProgramString(strData,useId) {
    //版本号: "Z1.00"  字符串类型
    //设备类型： 24 26 28 36 46 48  1个字节
    //程序名称 12个字节  例如：空字节时名字为NULL，所有实际数据写作：78 85 76 76 0 0 0 0 0 0 0 0
    //工厂数据长度： 1个字节  取值[0,30];
    //4路输入  index = 4,5,6,7
    //锁定     index = 8
    //8路输出  index = 9,10,11,12,  13,14,15,16
    var index;
    var i,t;
    var dataArray,tempArray = new Array(), intArray = new Array();

    if( useId>0){
        strData = strData.replace(/ - /,'');
    } else {
        strData = strData.replace(/ -/,'');
    }
    // strData = strData.replace(/ -/,'');
    // console.log('读到的所有数据:' + strData);
    dataArray = strData.split(' , ' );

    var version;
    var programName;
    var type;
    // console.log('总共块数据数量:' + dataArray.length);
    console.log('读到的程序组ID:' + useId);
    if(useId > 0){ //30组数据
        if(useId === 1){ //30组数据的第一组
            //版本号
            version = dataArray[0].replace(/\s/g, '');
            if(version !== 'Z1.00'){
                alert(isChinese ? '版本不匹配' : 'wrong version');
                return false;
            }
            console.log('软件版本号： ' + dataArray[0]);

            //设备类型
            type = dataArray[1];
            if(Number(type) !== deviceType){ //设备类型: 24 26 28 36 46 48
                //设备类型不匹配 例如：如果是48的数据读到非48的设备上，联调数据就需更改
            }
            console.log('程序数据的设备类型' + type);

            //程序名称
            programName = dataArray[3].split(' ');
            disposeProgramName(programName,useId);

            currentSystemData.Empty = parseInt(dataArray[2]);
            console.log('工厂数据长度：' + dataArray[2]);
            index = 4;
        } else  { //30组非第一组数据
            //程序名称
            programName = dataArray[0].split(' ');
            disposeProgramName(programName,useId);
            index = 1;
        }

    } else { // 1组数据
        //版本号
        version = dataArray[0].replace(/\s/g, '');
        if(version !== 'Z1.00'){
            alert(isChinese ? '版本不匹配' : 'wrong version');
            return;
        }
        console.log('软件版本号： ' + dataArray[0].replace(/\s/g, ''));

        //设备类型
        type = dataArray[1];
        if(Number(type) !== deviceType){ //设备类型: 24 26 28 36 46 48
            //设备类型不匹配 例如：如果是48的数据读到非48的设备上，联调数据就需更改
        }
        console.log('程序数据的设备类型' + type);

        //程序名称
        programName = dataArray[2].split(' ');
        disposeProgramName(programName,useId);
        console.log('程序名称：' + programName);

        index = 3;
    }

    tempArray.length = 0;
    for(i=index; i<dataArray.length; i++){
        tempArray.push(dataArray[i].split(' '));
    }

    var length = 0;
    for(i=0; i<tempArray.length; i++){
        intArray[i] = [];
    }
    // console.log('均衡块数据数量: ' + tempArray.length);
    for(i=0; i<tempArray.length; i++){
        if(tempArray[i].length < 5){ //10 cant be any number bigger than zero
            break;
        }
        for(t=0; t<tempArray[i].length; t++){
            intArray[i][t] = parseInt(tempArray[i][t]);
            length++;
        }
    }

    // for(i=0; i<intArray.length; i++){
    //     console.log('index:' + i + '读到的数据: '  + intArray[i]);
    // }
    // console.log('useID_' + useId + ' program length: ' + length);
    // console.log('读到的数据：' + intArray);

    disposeInputData(intArray[0],useId,0);
    disposeInputData(intArray[1],useId,1);
    disposeInputData(intArray[2],useId,2);
    disposeInputData(intArray[3],useId,3);
    disposePcLockData(intArray[4],useId);
    disposeOutData(intArray[5],useId,0);
    disposeOutData(intArray[6],useId,1);
    disposeOutData(intArray[7],useId,2);
    disposeOutData(intArray[8],useId,3);
    disposeOutData(intArray[9],useId,4);
    disposeOutData(intArray[10],useId,5);
    disposeOutData(intArray[11],useId,6);
    disposeOutData(intArray[12],useId,7);

    if(useId === 0) {
        refreshMainDisplay();  //解析一组从电脑读到的程序
        if(curButtonNo > 4) {
            lockDisplay.refreshInputLockDisplay();
            lockDisplay.refreshOutLockDisplay();
        } else {
            lockDisplay.refreshOutLockDisplay();
            lockDisplay.refreshInputLockDisplay();
        }
    }
    return true;
}

function getAllProgramString() {
    var strData=[];
    for(var i=1; i<31; i++){
        strData.push(getOneProgramString(i));
    }

    return strData;
}


function disposeAllProgramString(strData) {
    var i;
    var dataArray;
    var length;
    dataArray = strData.split(' - ');

    console.log(dataArray.length);
    if (dataArray.length > 30) {
        length = 30;
    } else {
        length = dataArray.length;
    }
    for(i=0; i<length; i++){ //
        // console.log(dataArray[i]);
        // console.log(dataArray[i].length);

        if(!disposeOneProgramString(dataArray[i],i+1)){
            return false;
        }
    }
    return true;
}

function disposeInputData(dataArray,userID,channelID) {
    var i;
    var dataGroup;
    var dataInput;
    //alert('读取到输入数据');
    if (userID > 0) {
        dataGroup = currentAllGroupData[userID - 1];
    } else {
        dataGroup = currentGroupData;
    }
    switch (channelID){
        case 0:
            dataInput = dataGroup.dataInputA;
            console.log('程序' + userID + ':  输入A的数据：' + dataArray);
            break;
        case 1:
            dataInput = dataGroup.dataInputB;
            console.log('程序' + userID + ':  输入B的数据：' + dataArray);
            break;
        case 2:
            dataInput = dataGroup.dataInputC;
            console.log('程序' + userID + ':  输入C的数据：' + dataArray);
            break;
        case 3:
            dataInput = dataGroup.dataInputD;
            console.log('程序' + userID + ':  输入D的数据：' + dataArray);
            break;
        default:
            return;
            break;
    }

    var tempName =[];
    var nameShow = [];
    for(i=0; i<8; i++){
        tempName.push(dataArray[i]);
        nameShow.push(dataArray[i].toString(16));
        //console.log(dataArray[i]);
    }
    // console.log('dataInput__name:' + nameShow);
    dataInput.name = bytesToStringNot32(tempName);
    // console.log("channelID.name:"+ channelID + " : " + dataInput.name);

    dataInput.mute = dataArray[8];
    dataInput.polar = dataArray[9];
    dataInput.delay = dataArray[10]+ dataArray[11]*256;
    dataInput.gain = dataArray[12] + dataArray[13]*256;
    dataInput.inLinkSel = dataArray[14];
    linkInputSelect[channelID] = dataInput.inLinkSel;
    dataInput.secondDelay = dataArray[15];
    dataInput.noisegate = dataArray[16];

    dataInput.InDeq1.req = dataArray[24] + dataArray[25]*256 ;
    dataInput.InDeq1.level = dataArray[26] + dataArray[27]*256 ;
    dataInput.InDeq1.bw = dataArray[28] + dataArray[29]*256 ;
    dataInput.InDeq1.type = dataArray[30];
    dataInput.InDeq1.shf_db = dataArray[31];

    dataInput.InDeq2.req = dataArray[32] + dataArray[33]*256 ;
    dataInput.InDeq2.level = dataArray[34] + dataArray[35]*256 ;
    dataInput.InDeq2.bw = dataArray[36] + dataArray[37]*256 ;
    dataInput.InDeq2.type = dataArray[38];
    dataInput.InDeq2.shf_db = dataArray[39];

    dataInput.DeqParam1.DEQ_level = dataArray[40] + dataArray[41]*256 ;
    dataInput.DeqParam1.DEQ_Threshold = dataArray[42] + dataArray[43]*256 ;
    dataInput.DeqParam1.DEQ_r = dataArray[44] + dataArray[45]*256 ;
    dataInput.DeqParam1.DEQ_a = dataArray[46];
    dataInput.DeqParam1.DEQ_ratio = dataArray[47];
    //console.log('look at me_______________deq1_ratio:' + dataInput.DeqParam1.DEQ_ratio);

    dataInput.DeqParam2.DEQ_level = dataArray[48] + dataArray[49]*256 ;
    dataInput.DeqParam2.DEQ_Threshold = dataArray[50] + dataArray[51]*256 ;
    dataInput.DeqParam2.DEQ_r = dataArray[52] + dataArray[53]*256 ;
    dataInput.DeqParam2.DEQ_a = dataArray[54];
    dataInput.DeqParam2.DEQ_ratio = dataArray[55];
    //console.log('look at me_______________deq2_ratio:' + dataInput.DeqParam2.DEQ_ratio);

    //publicEQ
    dataInput.InEQ.EQ1.freq = dataArray[56]+ dataArray[57]*256 ;
    dataInput.InEQ.EQ1.level = dataArray[58] + dataArray[59]*256 ;
    dataInput.InEQ.EQ1.bw = dataArray[60] + dataArray[61]*256 ;
    // console.log('带宽：' + dataInput.InEQ.EQ1.bw);
    dataInput.InEQ.EQ1.HL_db_AP_Flag = dataArray[62];
    dataInput.InEQ.EQ1.type = dataArray[63];

    dataInput.InEQ.EQ2.freq = dataArray[64] + dataArray[65]*256 ;
    dataInput.InEQ.EQ2.level = dataArray[66] + dataArray[67]*256 ;
    dataInput.InEQ.EQ2.bw = dataArray[68] + dataArray[69]*256 ;
    dataInput.InEQ.EQ2.HL_db_AP_Flag = dataArray[70];
    dataInput.InEQ.EQ2.type = dataArray[71];

    dataInput.InEQ.EQ3.freq = dataArray[72] + dataArray[73]*256 ;
    dataInput.InEQ.EQ3.level = dataArray[74] + dataArray[75]*256 ;
    dataInput.InEQ.EQ3.bw = dataArray[76] + dataArray[77]*256 ;
    dataInput.InEQ.EQ3.HL_db_AP_Flag = dataArray[78];
    dataInput.InEQ.EQ3.type = dataArray[79];

    dataInput.InEQ.EQ4.freq = dataArray[80] + dataArray[81]*256 ;
    dataInput.InEQ.EQ4.level = dataArray[82] + dataArray[83]*256 ;
    dataInput.InEQ.EQ4.bw = dataArray[84] + dataArray[85]*256 ;
    dataInput.InEQ.EQ4.HL_db_AP_Flag = dataArray[86];
    dataInput.InEQ.EQ4.type = dataArray[87];

    dataInput.InEQ.EQ5.freq = dataArray[88] + dataArray[89]*256 ;
    dataInput.InEQ.EQ5.level = dataArray[90] + dataArray[91]*256 ;
    dataInput.InEQ.EQ5.bw = dataArray[92] + dataArray[93]*256 ;
    dataInput.InEQ.EQ5.HL_db_AP_Flag = dataArray[94];
    dataInput.InEQ.EQ5.type = dataArray[95];

    dataInput.InEQ.EQ6.freq = dataArray[96] + dataArray[97]*256 ;
    dataInput.InEQ.EQ6.level = dataArray[98] + dataArray[99]*256 ;
    dataInput.InEQ.EQ6.bw = dataArray[100] + dataArray[101]*256 ;
    dataInput.InEQ.EQ6.HL_db_AP_Flag = dataArray[102];
    dataInput.InEQ.EQ6.type = dataArray[103];

    dataInput.InEQ.EQ7.freq = dataArray[104] + dataArray[105]*256 ;
    dataInput.InEQ.EQ7.level = dataArray[106] + dataArray[107]*256 ;
    dataInput.InEQ.EQ7.bw = dataArray[108] + dataArray[109]*256 ;
    dataInput.InEQ.EQ7.HL_db_AP_Flag = dataArray[110];
    dataInput.InEQ.EQ7.type = dataArray[111];

    dataInput.InEQ.EQ8.freq = dataArray[112] + dataArray[113]*256 ;
    dataInput.InEQ.EQ8.level = dataArray[114] + dataArray[115]*256 ;
    dataInput.InEQ.EQ8.bw = dataArray[116] + dataArray[117]*256 ;
    dataInput.InEQ.EQ8.HL_db_AP_Flag = dataArray[118];
    dataInput.InEQ.EQ8.type = dataArray[119];

    dataInput.InEQ.EQ9.freq = dataArray[120] + dataArray[121]*256 ;
    dataInput.InEQ.EQ9.level = dataArray[122] + dataArray[123]*256 ;
    dataInput.InEQ.EQ9.bw = dataArray[124] + dataArray[125]*256 ;
    dataInput.InEQ.EQ9.HL_db_AP_Flag = dataArray[126];
    dataInput.InEQ.EQ9.type = dataArray[127];

    //HPF
    dataInput.HPFData.HL_freq = dataArray[128] + dataArray[129]*256 ;
    // console.log('dataInput.HPFData.HL_freq = dataArray[128] + dataArray[129]*256 :' + dataArray[128] + dataArray[129]*256);
    dataInput.HPFData.HL_Type = dataArray[130];
    dataInput.HPFData.HL_Oct  = dataArray[131];
    dataInput.HPFData.LR_Level = dataArray[132];

    //LPF
    dataInput.LPFData.HL_freq = dataArray[136] + dataArray[137]*256 ;
    dataInput.LPFData.HL_Type = dataArray[138];
    dataInput.LPFData.HL_Oct  = dataArray[139];
    dataInput.LPFData.LR_Level = dataArray[140];

    //AGC
    dataInput.agLevel = dataArray[144] + dataArray[145]*256 ;
    dataInput.agThreshold = dataArray[146] + dataArray[147]*256 ;
    //console.log('look at me____________________ agThreshold__H:' + dataArray[146] + '    L:' + dataArray[147]);
    dataInput.agRelease = dataArray[148] + dataArray[149]*256  ;
    dataInput.agAttack = dataArray[150];
    dataInput.agRatio = dataArray[151];
    // console.log('look at me________agLevel____________H:' + dataArray[145]  + '     L:' + dataArray[144]);
    // console.log('look at me________agThreshold____________H:' + dataArray[147]  + '     L:' + dataArray[146]);
    // console.log('look at me________agRelease____________H:' + dataArray[149]  + '     L:' + dataArray[148]);
    // console.log('look at me________agAttack____________:' + dataArray[150]);
    // console.log('look at me________agRatio___________:' + dataArray[151]);


    //COM
    dataInput.compLevel = dataArray[152] + dataArray[153]*256;
    dataInput.compRelease = dataArray[154] + dataArray[155]*256;
    dataInput.compAttack = dataArray[156];
    dataInput.compRatio = dataArray[157];
    // console.log('look at me_______compLevel_____________H:' + dataArray[151]  + '     L:' + dataArray[150]);
    // console.log('look at me_______compRelease_____________H:' + dataArray[153]  + '     L:' + dataArray[152]);
    // console.log('look at me_______compAttack_____________H:' + dataArray[155]  + '     L:' + dataArray[154]);
    // console.log('look at me_______compRatio_____________:' + dataArray[156]);

    //empty
}


function disposeOutData(dataArray,userID,channelID) {
    var i;
    var index;
    var indexStart = [];
    var dataGroup;
    var dataOut;

    //alert('读取到输出数据');
    if (userID > 0) {
        dataGroup = currentAllGroupData[userID - 1];
    } else {
        dataGroup = currentGroupData;
    }
    switch (channelID){
        case 0:
            dataOut = dataGroup.dataOut1;
            console.log('程序' + userID + ':  输出1的数据：' + dataArray);
            break;
        case 1:
            dataOut = dataGroup.dataOut2;
            console.log('程序' + userID + ':  输出2的数据：' + dataArray);
            break;
        case 2:
            dataOut = dataGroup.dataOut3;
            console.log('程序' + userID + ':  输出3的数据：' + dataArray);
            break;
        case 3:
            dataOut = dataGroup.dataOut4;
            console.log('程序' + userID + ':  输出4的数据：' + dataArray);
            break;
        case 4:
            dataOut = dataGroup.dataOut5;
            console.log('程序' + userID + ':  输出5的数据：' + dataArray);
            break;
        case 5:
            dataOut = dataGroup.dataOut6;
            console.log('程序' + userID + ':  输出6的数据：' + dataArray);
            break;
        case 6:
            dataOut = dataGroup.dataOut7;
            console.log('程序' + userID + ':  输出7的数据：' + dataArray);
            break;
        case 7:
            dataOut = dataGroup.dataOut8;
            console.log('程序' + userID + ':  输出8的数据：' + dataArray);
            break;

        default:
            return;
            break;
    }
    for(i=0; i<17; i++) {
        indexStart.push(i*8);
    }

    //ID = 0;
    var nameTemp = [];
    var nameShow = [];
    for(i=0; i<8; i++){
        //dataOut.name[i] = dataArray[i];
        nameTemp.push(dataArray[i]);
        nameShow.push(dataArray[i].toString(16))
    }

    // console.log('dataOut_name:' + nameShow);
    dataOut.name = bytesToStringNot32(nameTemp);
    // console.log("channelID.name:"+ channelID + " : " + dataOut.name);
    //ID = 1
    index = indexStart[1];
    dataOut.mute = dataArray[index++];
    dataOut.polar = dataArray[index++];
    dataOut.delay = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.gain = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.outLinkSel = dataArray[index++];
    linkOutSelect[channelID] = dataOut.outLinkSel;
    dataOut.secondDelay = dataArray[index];

    //ID = 2
    index = indexStart[2];
    dataOut.allvolume = dataArray[index++] + dataArray[index]*256;

    //ID = 3
    index = indexStart[3];
    dataOut.sourceA = dataArray[index++];
    dataOut.sourceB = dataArray[index++];
    dataOut.sourceC = dataArray[index++];
    dataOut.sourceD = dataArray[index++];
    dataOut.sourceE = dataArray[index++];
    dataOut.sourceF = dataArray[index++];
    dataOut.sourceG = dataArray[index++];
    dataOut.sourceH = dataArray[index];

    //ID = 4
    index = indexStart[4];
    dataOut.OutEQ.EQ1.freq = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ1.level = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ1.bw = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ1.HL_db_AP_Flag = dataArray[index++];
    dataOut.OutEQ.EQ1.type = dataArray[index];

    //ID = 5
    index = indexStart[5];
    dataOut.OutEQ.EQ2.freq = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ2.level = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ2.bw = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ2.HL_db_AP_Flag = dataArray[index++];
    dataOut.OutEQ.EQ2.type = dataArray[index];

    //ID = 6
    index = indexStart[6];
    dataOut.OutEQ.EQ3.freq = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ3.level = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ3.bw = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ3.HL_db_AP_Flag = dataArray[index++];
    dataOut.OutEQ.EQ3.type = dataArray[index];

    //ID = 7
    index = indexStart[7];
    dataOut.OutEQ.EQ4.freq = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ4.level = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ4.bw = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ4.HL_db_AP_Flag = dataArray[index++];
    dataOut.OutEQ.EQ4.type = dataArray[index];

    //ID = 8
    index = indexStart[8];
    dataOut.OutEQ.EQ5.freq = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ5.level = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ5.bw = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ5.HL_db_AP_Flag = dataArray[index++];
    dataOut.OutEQ.EQ5.type = dataArray[index];

    //ID = 9
    index = indexStart[9];
    dataOut.OutEQ.EQ6.freq = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ6.level = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ6.bw = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ6.HL_db_AP_Flag = dataArray[index++];
    dataOut.OutEQ.EQ6.type = dataArray[index];

    //ID = 10
    index = indexStart[10];
    dataOut.OutEQ.EQ7.freq = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ7.level = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ7.bw = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ7.HL_db_AP_Flag = dataArray[index++];
    dataOut.OutEQ.EQ7.type = dataArray[index];

    //ID = 11
    index = indexStart[11];
    dataOut.OutEQ.EQ8.freq = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ8.level = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ8.bw = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ8.HL_db_AP_Flag = dataArray[index++];
    dataOut.OutEQ.EQ8.type = dataArray[index];

    //ID = 12 EQ9
    index = indexStart[12];
    dataOut.OutEQ.EQ9.freq = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ9.level = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ9.bw = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.OutEQ.EQ9.HL_db_AP_Flag = dataArray[index++];
    dataOut.OutEQ.EQ9.type = dataArray[index];

    //ID = 13 高通
    index = indexStart[13];
    dataOut.HPFData.HL_freq = dataArray[index++] + dataArray[index++]*256 ;
    // console.log('HPFData.HL_freq' + dataArray[index-1] + dataArray[index]*256); //小心index 数值被改变
    dataOut.HPFData.HL_Type = dataArray[index++];
    dataOut.HPFData.HL_Oct = dataArray[index++];
    dataOut.HPFData.LR_Level = dataArray[index];

    //ID = 14 低通
    index = indexStart[14];
    dataOut.LPFData.HL_freq = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.LPFData.HL_Type = dataArray[index++];
    dataOut.LPFData.HL_Oct = dataArray[index++];
    dataOut.LPFData.LR_Level = dataArray[index];

    //ID = 15 压缩
    index = indexStart[15];
    dataOut.compLevel = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.compR = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.compAttack = dataArray[index++];
    dataOut.compRatio = dataArray[index++];

    //ID = 16 限幅
    index = indexStart[16];
    dataOut.limT = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.limRelease = dataArray[index++] + dataArray[index++]*256 ;
    dataOut.limAttack = dataArray[index++];

    return true;

}





function disposePcLockData(dataArray,userID,channelID) {
    var i;
    var index;
    var lockData;
    index = 0;
    //alert('读取到锁定数据');
    console.log("读取到锁定数据");
    //input lock data
    if(userID > 0 ){
        lockData = currentAllGroupData[userID-1].m_nLockData
    } else {
        lockData = currentLockData;
    }

    lockData.nIn_LockData.nIn_Name = dataArray[index++];                             //  输入  通道  名称
    lockData.nIn_LockData.nIn_Mute = dataArray[index++];                             //  输入  静音
    lockData.nIn_LockData.nIn_Delay = dataArray[index++];                            //  输入  延时
    lockData.nIn_LockData.nIn_Pol = dataArray[index++];                              //  输入  极性
    lockData.nIn_LockData.nIn_Gain = dataArray[index++];                             //  输入  增益
    lockData.nIn_LockData.nIn_NoiseGate = dataArray[index++];                        //  输入  矩阵
    lockData.nIn_LockData.nIn_Comp_AG = dataArray[index++];                          //  输入  压线
    lockData.nIn_LockData.nIn_DEQ = dataArray[index++];                              //  输入  动态均衡

    lockData.nIn_LockData.nIn_EQ = dataArray[index++];                               //  输入  EQ
    lockData.nIn_LockData.nIn_Link = dataArray[index++];                             //  输入  联调
    for(i=0; i<16; i++){
        lockData.nIn_LockData.In_Empty[i] = dataArray[i+index];
    }
    index = 26;
    for(i=0; i<6; i++) {
        lockData.nIn_LockData.In_Lock_PW[i] = dataArray[index+i];
    }
    console.log('程序' + userID + '输入锁定数据： ' + lockData.nIn_LockData );
    // console.log('dataBeReceive[26]:' + dataArray[26]);
    // console.log('dataBeReceive[27]:' + dataArray[27]);
    // console.log('dataBeReceive[28]:' + dataArray[28]);
    // console.log('dataBeReceive[29]:' + dataArray[29]);
    // console.log('dataBeReceive[30]:' + dataArray[30]);
    // console.log('dataBeReceive[31]:' + dataArray[31]);
    // console.log('输入锁定密码：' +　lockData.nIn_LockData.In_Lock_PW);


    //out lock data
    index = 32;
    lockData.nOut_LockData.nOut_Name = dataArray[index++];                             //  输出  通道  名称
    lockData.nOut_LockData.nOut_Mute = dataArray[index++];                             //  输出  静音
    lockData.nOut_LockData.nOut_Delay = dataArray[index++];                            //  输出  延时
    lockData.nOut_LockData.nOut_Pol = dataArray[index++];                              //  输出  极性
    lockData.nOut_LockData.nOut_Gain = dataArray[index++];                             //  输出  增益
    lockData.nOut_LockData.nIn_Matrix = dataArray[index++];                            //  输出  矩阵
    lockData.nOut_LockData.nOut_Comp_LimT = dataArray[index++];                        //  输出  压线
    lockData.nOut_LockData.nOut_EQ = dataArray[index++];                               //  输出  动态均衡

    lockData.nOut_LockData.nOut_Xover = dataArray[index++];                            //  输出  EQ
    lockData.nOut_LockData.nOut_Link = dataArray[index++];                             //  输出  联调
    for(i=0; i<16; i++){
        lockData.nOut_LockData.Out_Empty[i] = dataArray[i+index];
    }
    index = 58;
    for(i=0; i<6; i++) {
        lockData.nOut_LockData.Out_Lock_PW[i] = dataArray[index+i];
    }
    // console.log('输出锁定密码：' + lockData.nOut_LockData.Out_Lock_PW);
    console.log('程序' + userID + '输出锁定数据： ' + lockData.nIn_LockData );

    // //system lock data  无系统锁定数据
    // index = 64;
    // currentLockData.nSys_LockData.nSYS_Load_Data = dataArray[index++];
    // currentLockData.nSys_LockData.nSYS_Save_Data = dataArray[index++];
    // currentLockData.nSys_LockData.nSYS_PC_Del = dataArray[index++];
    // currentLockData.nSys_LockData.nSYS_Copy_Data = dataArray[index++];
    // currentLockData.nSys_LockData.nSYS_Device_ID = dataArray[index++];
    // currentLockData.nSys_LockData.nSYS_Logo = dataArray[index++];
    // currentLockData.nSys_LockData.nSYS_Back_Linght = dataArray[index++];
    // currentLockData.nSys_LockData.nSYS_nPanel = dataArray[index++];
    //
    // currentLockData.nSys_LockData.nSYS_PowerOn = dataArray[index++];
    // for(i=0; i<17; i++){
    //     currentLockData.nSys_LockData.Sys_Empty[i] = dataArray[i+index];
    // }
    // index = 90;
    // for(i=0; i<6; i++) {
    //     currentLockData.nSys_LockData.System_Lock_PW[i] = dataArray[index+i];
    // }
    //
    // console.log('系统密码：' + currentLockData.nSys_LockData.System_Lock_PW);
}


function disposeProgramName(dataArray,userID) {
    var groupData,i;
    if(userID > 0) {
        groupData = currentAllGroupData[userID-1];
        for(i=0; i<dataArray.length; i++) {
            groupData.name[i] = parseInt(parseInt(dataArray[i], 10).toString(16),16);
        }
    } else {
        for(i=0; i<dataArray.length; i++) {
            currentPGName[i] = parseInt(parseInt(dataArray[i], 10).toString(16),16);
        }
    }
}


function renewProgramNoAndName(no, name) {
    document.getElementById('text_program_name').value = no;
    document.getElementById('text_program_no').value = name;
}




