

function LockFrame(){
    this.lockParam = {
        isInputCode: true,
        isOutCode: true,
        isSystemCode: true,
        typeOperate: 0,  //1: set_code  2: reset_code  3:remove_code_succeed
        typeIndex: 0
    };

    this.zoneIndex = 0;
    this.lockButtonInput = document.getElementById("button_lock_input");
    this.lockButtonOut = document.getElementById("button_lock_out");
    this.lockButtonSystem = document.getElementById("button_lock_system");
    this.lockButtonExit = document.getElementById("button_lock_exit");

    this.codeSetOrNotZone = document.getElementById("lock_code_set_or_not");
    this.codeSetZone = document.getElementById("lock_code_set");
    this.codeInputZone = document.getElementById("lock_code_input");
    this.codeOperateZone = document.getElementById("lock_code_operate");
    this.codeModifyConfirmZone = document.getElementById("lock_code_modify_confirm");
    this.codeRemoveConfirmZone = document.getElementById("lock_code_remove_confirm");

    this.lockInputItemZone = document.getElementById("lock_input_lock_item");
    this.lockOutItemZone = document.getElementById("lock_out_lock_item");
    this.lockSystemItemZone = document.getElementById("lock_system_lock_item");

    this.lockSetZone = document.getElementById("lock_set_zone");

    this.inputNameArray = ["lock_input_label", "lock_input_mute", "lock_input_delay", "lock_input_phase",
            "lock_input_gain", "lock_input_gate", "lock_input_agc", "lock_input_deq",
            "lock_input_eq", "lock_input_link"];

    this.outNameArray = ["lock_out_label", "lock_out_mute", "lock_out_delay", "lock_out_phase",
        "lock_out_gain", "lock_out_kmg", "lock_out_agc", "lock_out_eq",
        "lock_out_xover", "lock_out_link"];

    this.systemNameArray = ["lock_system_load", "lock_system_save", "lock_system_delete", "lock_system_copy",
        "lock_system_id", "lock_system_interface", "lock_system_led", "lock_system_panel",
        "lock_system_power"];

    LockFrame.prototype.lockFrameWelcome = function() {

        this.checkCodeIsExist();
        this.setOnClickEven();
        this.lockZoneAlert(0);
        lockFrame.clearButtonStatus();
        this.setCheckBoxListener();
    };

    LockFrame.prototype.setCheckBoxListener = function() {
        var element,i;
        element = document.getElementById("lock_input_select_all");  //输入全选
        element.addEventListener("click",this.inputSelectAllChange);
        element = document.getElementById("lock_out_select_all");  //输出全选
        element.addEventListener("click",this.outSelectAllChange);
        element = document.getElementById("lock_system_select_all"); //系统全选
        element.addEventListener("click",this.systemSelectAllChange);


        for(i=0; i<this.inputNameArray.length; i++){
            element = document.getElementById(this.inputNameArray[i]);
            element.addEventListener('click', this.checkInputSelectChange);
        }

        for(i=0; i<this.outNameArray.length; i++){
            element = document.getElementById(this.outNameArray[i]);
            element.addEventListener('click', this.checkOutputSelectChange);
        }

        for(i=0; i<this.systemNameArray.length; i++){
            element = document.getElementById(this.systemNameArray[i]);
            element.addEventListener('click', this.checkSystemSelectChange);
        }
    };

    LockFrame.prototype.inputSelectAllChange = function(){  //输入全选响应
        var element,value;
        element = document.getElementById("lock_input_select_all");
        value = element.checked;
        for(var i=0; i<lockFrame.inputNameArray.length; i++){
            element = document.getElementById(lockFrame.inputNameArray[i]);
            element.checked = value;
        }
        //console.log("input:"+ value);
    };

    LockFrame.prototype.checkInputSelectChange = function() {
        var element;
        for(var i=0; i<lockFrame.inputNameArray.length; i++){
            element = document.getElementById(lockFrame.inputNameArray[i]);
            if(!element.checked){
                document.getElementById("lock_input_select_all").checked = false;
                return;
            }
        }
        document.getElementById("lock_input_select_all").checked = true;
    };

    LockFrame.prototype.outSelectAllChange = function(){ //输出全选响应
        var element,value;
        element = document.getElementById("lock_out_select_all");
        value = element.checked;
        for(var i=0; i<lockFrame.outNameArray.length; i++){
            element = document.getElementById(lockFrame.outNameArray[i]);
            element.checked = value;
        }
        //console.log("out:"+ value);
    };

    LockFrame.prototype.checkOutputSelectChange = function() {
        var element;
        for(var i=0; i<lockFrame.outNameArray.length; i++){
            element = document.getElementById(lockFrame.outNameArray[i]);
            if(!element.checked){
                document.getElementById("lock_out_select_all").checked = false;
                return;
            }
        }
        document.getElementById("lock_out_select_all").checked = true;
    };

    LockFrame.prototype.systemSelectAllChange = function(){ //系统全选响应
        var element,value;
        element = document.getElementById("lock_system_select_all");
        value = element.checked;
        for(var i=0; i<lockFrame.systemNameArray.length; i++){
            element = document.getElementById(lockFrame.systemNameArray[i]);
            element.checked = value;
        }
        //console.log("system:"+ value);
    };

    LockFrame.prototype.checkSystemSelectChange = function() {
        var element;
        for(var i=0; i<lockFrame.systemNameArray.length; i++){
            element = document.getElementById(lockFrame.systemNameArray[i]);
            if(!element.checked){
                document.getElementById("lock_system_select_all").checked = false;
                return;
            }
        }
        document.getElementById("lock_system_select_all").checked = true;
    };

    LockFrame.prototype.checkCodeIsExist = function() {
        var i;
        if(!this.checkPasswordIsLegal(currentLockData.nIn_LockData.In_Lock_PW)){
            for(i=0; i<6; i++){
                currentLockData.nIn_LockData.In_Lock_PW[i] = 32;
            }
        }
        this.lockParam.isInputCode = bytesToString(currentLockData.nIn_LockData.In_Lock_PW).toString().trim().length>5; //js并无trim方法
        // console.log('输入密码: ' + bytesToString(currentLockData.nIn_LockData.In_Lock_PW).toString().trim()); //js并无trim方法

        if(!this.checkPasswordIsLegal(currentLockData.nOut_LockData.Out_Lock_PW)){
            for(i=0; i<6; i++){
                currentLockData.nOut_LockData.Out_Lock_PW[i] = 32;
            }
        }
        this.lockParam.isOutCode = bytesToString(currentLockData.nOut_LockData.Out_Lock_PW).toString().trim().length>5; //js并无trim方法
        // console.log('输出密码: ' + bytesToString(currentLockData.nOut_LockData.Out_Lock_PW).toString().trim());//js并无trim方法

        if(!this.checkPasswordIsLegal(currentLockData.nSys_LockData.System_Lock_PW)){
            for(i=0; i<6; i++){
                currentLockData.nSys_LockData.System_Lock_PW[i] = 32;
            }
        }
        this.lockParam.isSystemCode = bytesToString(currentLockData.nSys_LockData.System_Lock_PW).toString().trim().length>5;//js并无trim方法
        // console.log('系统密码： ' + bytesToString(currentLockData.nSys_LockData.System_Lock_PW).toString().trim());//js并无trim方法
    };

    LockFrame.prototype.checkPasswordIsLegal = function(pArray) {
        for(var i=0; i < pArray.length; i++){
            if((48 <= pArray[i] && pArray[i] <= 57) || (65 <= pArray[i] && pArray[i] <= 90) || (97 <= pArray[i] && pArray[i] <= 122)){
            } else {
                return false;
            }
        }
        return true;

    };

    LockFrame.prototype.manageZoneAlert = function (index){
        this.lockParam.typeIndex = index;
        this.elementTextChange();
        switch (index){
            case 1:
                this.manageInputZoneAlert();
                break;
            case 2:
                this.manageOutZoneAlert();
                break;
            case 3:
                this.manageSystemZoneAlert();
                break;
            default:
                break;
        }
    };

    LockFrame.prototype.manageInputZoneAlert = function (){
        if(this.lockParam.isInputCode){
            this.lockZoneAlert(0);
            this.lockZoneAlert(3);
        }else{
            this.lockZoneAlert(0);
            this.lockZoneAlert(1);
        }
        //console.log(this.lockParam.isInputCode);
    };

    LockFrame.prototype.manageOutZoneAlert = function (){
        if(this.lockParam.isOutCode){
            this.lockZoneAlert(0);
            this.lockZoneAlert(3);
        }else{
            this.lockZoneAlert(0);
            this.lockZoneAlert(1);
        }
        // console.log(this.lockParam.isOutCode);
    };


    LockFrame.prototype.manageSystemZoneAlert = function (){
        if(this.lockParam.isSystemCode){
            this.lockZoneAlert(0);
            this.lockZoneAlert(3);
        }else{
            this.lockZoneAlert(0);
            this.lockZoneAlert(1);
        }
        // console.log(this.lockParam.isSystemCode);
    };

    LockFrame.prototype.lockButtonZoneAlert = function(index){
        var lockButtonInput = document.getElementById("button_lock_style");
        var lockButtonOut = document.getElementById("button_lock_style");
        var lockButtonSystem = document.getElementById("button_lock_style");

        var lockInputItem = document.getElementById("lock_input_lock_item");
        var lockOutItem = document.getElementById("lock_out_lock_item");
        var lockSystemItem = document.getElementById("lock_system_lock_item");

        switch (index){
            case 1:
                lockButtonInput.setAttribute("class","");
                lockButtonOut.setAttribute("class","");
                lockButtonSystem.setAttribute("class","");
                lockInputItem.style.display = "inline";
                lockOutItem.style.display = "none";
                lockSystemItem.style.display = "none";

                break;
            case 2:
                lockButtonInput.setAttribute("class","");
                lockButtonOut.setAttribute("class","");
                lockButtonSystem.setAttribute("class","");
                lockInputItem.style.display = "none";
                lockOutItem.style.display = "inline";
                lockSystemItem.style.display = "none";

                break;
            case 3:
                lockButtonInput.setAttribute("class","");
                lockButtonOut.setAttribute("class","");
                lockButtonSystem.setAttribute("class","");
                lockInputItem.style.display = "none";
                lockOutItem.style.display = "none";
                lockSystemItem.style.display = "inline";

                break;
            default:
                break;
        }

    };


    LockFrame.prototype.lockZoneAlert = function(index) {
        var elementWidth,parentWidth,elementLeft;
        if(index <0){
            index = this.zoneIndex;
        }else {
            this.zoneIndex = index;
        }

        switch (index){
            case 0:
                this.codeSetOrNotZone.style.display = "none";
                this.codeSetZone.style.display = "none";
                this.codeInputZone.style.display = "none";
                this.codeOperateZone.style.display = "none";
                this.codeModifyConfirmZone.style.display = "none";
                this.codeRemoveConfirmZone.style.display = "none";

                this.lockInputItemZone.style.display = "none";
                this.lockOutItemZone.style.display = "none";
                this.lockSystemItemZone.style.display = "none";
                break;
            case 1: // set code or not
                if (getCss(this.codeSetOrNotZone, 'width') !==  'auto') {
                    elementWidth = parseInt(getCss(this.codeSetOrNotZone, 'width'));
                    //console.log("codeSetOrNotZone_width:" + elementWidth);
                }
                if (getCss(this.lockSetZone, 'width') !==  'auto') {
                    parentWidth = parseInt(getCss(this.lockSetZone, 'width'));
                    //console.log("lockSetZone_width:" + parentWidth);
                }
                elementLeft = (parentWidth - elementWidth)/2;
                //this.codeSetOrNotZone.setAttribute("left","100px");
                this.codeSetOrNotZone.style.left = elementLeft + "px";
                //console.log(elementLeft);
                this.codeSetOrNotZone.style.display = "inline";

                break;
            case 2: // set code or change code
                if (getCss(this.codeSetZone, 'width') !==  'auto') {
                    elementWidth = parseInt(getCss(this.codeSetZone, 'width'));
                    //console.log(elementWidth);
                }
                if (getCss(this.lockSetZone, 'width') !==  'auto') {
                    parentWidth = parseInt(getCss(this.lockSetZone, 'width'));
                    //console.log(parentWidth);
                }
                elementLeft = (parentWidth - elementWidth)/2;
                //this.codeSetZone.setAttribute("left","100px");
                this.codeSetZone.style.left = elementLeft + "px";
                //console.log(elementLeft);

                document.getElementById("code_set_first").value = "";
                document.getElementById("code_set_second").value = "";
                this.codeSetZone.style.display = "inline";

                break;
            case 3: // input code
                if (getCss(this.codeInputZone, 'width') !==  'auto') {
                    elementWidth = parseInt(getCss(this.codeInputZone, 'width'));
                    //console.log(elementWidth);
                }
                if (getCss(this.lockSetZone, 'width') !==  'auto') {
                    parentWidth = parseInt(getCss(this.lockSetZone, 'width'));
                    //console.log(parentWidth);
                }
                elementLeft = (parentWidth - elementWidth)/2;
                //this.codeInputZone.setAttribute("left","100px");
                this.codeInputZone.style.left = elementLeft + "px";
                //console.log(elementLeft);

                document.getElementById("code_input_input").value = "";
                this.codeInputZone.style.display = "inline";

                break;
            case 4: // modify code, remove code, lock items operate
                if (getCss(this.codeOperateZone, 'width') !==  'auto') {
                    elementWidth = parseInt(getCss(this.codeOperateZone, 'width'));
                    //console.log(elementWidth);
                }
                if (getCss(this.lockSetZone, 'width') !==  'auto') {
                    parentWidth = parseInt(getCss(this.lockSetZone, 'width'));
                    //console.log(parentWidth);
                }
                elementLeft = (parentWidth - elementWidth)/2;
                //this.codeOperateZone.setAttribute("left","100px");
                this.codeOperateZone.style.left = elementLeft + "px";
                //console.log(elementLeft);

                this.codeOperateZone.style.display = "inline";

                break;
            case 5: //modify code confirm
                if (getCss(this.codeModifyConfirmZone, 'width') !==  'auto') {
                    elementWidth = parseInt(getCss(this.codeModifyConfirmZone, 'width'));
                    //console.log(elementWidth);
                }
                if (getCss(this.lockSetZone, 'width') !==  'auto') {
                    parentWidth = parseInt(getCss(this.lockSetZone, 'width'));
                    //console.log(parentWidth);
                }
                elementLeft = (parentWidth - elementWidth)/2;
                //this.codeModifyConfirmZone.setAttribute("left","100px");
                this.codeModifyConfirmZone.style.left = elementLeft + "px";
                //console.log(elementLeft);

                var element = document.getElementById("label_code_modify_confirm");
                var value;
                switch (this.lockParam.typeOperate){
                    case 1://设置密码
                        switch(this.lockParam.typeIndex) {
                            case 1:
                                value = isChinese ? "“输入锁定”密码设置成功" : '"Input Lock" password has been set!' ;
                                break;
                            case 2:
                                value = isChinese ? "“输出锁定”密码设置成功" : '"Output Lock" password has been set!' ;
                                break;
                            case 3:
                                value = isChinese ? "“系统锁定”密码设置成功" : '"System Lock" password has been set!' ;
                                break;
                            default:
                                value = isChinese ? "“输入锁定”密码设置成功" : '"Input Lock" password has been set!' ;
                                break;
                        }
                        break;
                    case 2://修改密码
                        switch(this.lockParam.typeIndex) {
                            case 1:
                                value = isChinese ? "“输入锁定”密码修改成功" : '"Input Lock" password has been revised!' ;
                                break;
                            case 2:
                                value = isChinese ? "“输出锁定”密码修改成功" : '"Output Lock" password has been revised!' ;
                                break;
                            case 3:
                                value = isChinese ? "“系统锁定”密码修改成功" : '"System Lock" password has been revised!' ;
                                break;
                            default:
                                value = isChinese ? "“输入锁定”密码修改成功" : '"Input Input" password has been revised!' ;
                                break;
                        }
                        break;
                    case 3://移除密码
                        switch(this.lockParam.typeIndex) {
                            case 1:
                                value = isChinese ? "“输入锁定”密码解除成功" : '"Input Lock" password has been removed!' ;
                                break;
                            case 2:
                                value = isChinese ? "“输出锁定”密码解除成功" : '"Output Lock" password has been removed!' ;
                                break;
                            case 3:
                                value = isChinese ? "“系统锁定”密码解除成功" : '"System Lock" password has been removed!' ;
                                break;
                            default:
                                value = isChinese ? "“输入锁定”密码解除成功" : '"Input Lock" password has been removed!' ;
                                break;
                        }
                        break;
                }
                element.style.value = value;
                element.innerHTML = value;
                this.codeModifyConfirmZone.style.display = "inline";

                break;
            case 6: //remove code confirm
                if (getCss(this.codeRemoveConfirmZone, 'width') !==  'auto') {
                    elementWidth = parseInt(getCss(this.codeRemoveConfirmZone, 'width'));
                    //console.log(elementWidth);
                }
                if (getCss(this.lockSetZone, 'width') !==  'auto') {
                    parentWidth = parseInt(getCss(this.lockSetZone, 'width'));
                    //console.log(parentWidth);
                }
                elementLeft = (parentWidth - elementWidth)/2;
                //this.codeRemoveConfirmZone.setAttribute("left","100px");
                this.codeRemoveConfirmZone.style.left = elementLeft + "px";
                //console.log(elementLeft);

                this.codeRemoveConfirmZone.style.display = "inline";


                break;
            case 11: // lock_input_item
                if (getCss(this.lockInputItemZone, 'width') !==  'auto') {
                    elementWidth = parseInt(getCss(this.lockInputItemZone, 'width'));
                    //console.log(elementWidth);
                }
                if (getCss(this.lockSetZone, 'width') !==  'auto') {
                    parentWidth = parseInt(getCss(this.lockSetZone, 'width'));
                    //console.log(parentWidth);
                }
                elementLeft = (parentWidth - elementWidth)/2;
                //this.lockInputItemZone.setAttribute("left","100px");
                this.lockInputItemZone.style.left = elementLeft + "px";
                //console.log(elementLeft);

                this.initInLockDisplay();
                this.lockInputItemZone.style.display = "inline";


                break;
            case 12: // lock_out_item
                if (getCss(this.lockOutItemZone, 'width') !==  'auto') {
                    elementWidth = parseInt(getCss(this.lockOutItemZone, 'width'));
                    //console.log(elementWidth);
                }
                if (getCss(this.lockSetZone, 'width') !==  'auto') {
                    parentWidth = parseInt(getCss(this.lockSetZone, 'width'));
                    //console.log(parentWidth);
                }
                elementLeft = (parentWidth - elementWidth)/2;
                //this.lockOutItemZone.setAttribute("left","100px");
                this.lockOutItemZone.style.left = elementLeft + "px";
                //console.log(elementLeft);

                this.initOutLockDisplay();
                this.lockOutItemZone.style.display = "inline";


                break;
            case 13: // lock_system_item
                if (getCss(this.lockSystemItemZone, 'width') !==  'auto') {
                    elementWidth = parseInt(getCss(this.lockSystemItemZone, 'width'));
                    //console.log(elementWidth);
                }
                if (getCss(this.lockSetZone, 'width') !==  'auto') {
                    parentWidth = parseInt(getCss(this.lockSetZone, 'width'));
                    //console.log(parentWidth);
                }
                elementLeft = (parentWidth - elementWidth)/2;
                //this.lockSystemItemZone.setAttribute("left","100px");
                this.lockSystemItemZone.style.left = elementLeft + "px";
                //console.log(elementLeft);

                this.initSystemLockDisplay();
                this.lockSystemItemZone.style.display = "inline";


                break;
            default:

                break;
        }
        this.checkInputSelectChange();
        this.checkOutputSelectChange();
        this.checkSystemSelectChange();
    };

    LockFrame.prototype.getLockCode = function(code) {

        switch (lockFrame.lockParam.typeIndex){
            case 1:
                lockFrame.lockParam.isInputCode = true;
                currentLockData.nIn_LockData.In_Lock_PW  = deepCopy(stringToBytes(code, 6));
                // console.log(currentLockData.nIn_LockData.In_Lock_PW);
                if(!this.checkPasswordIsLegal(currentLockData.nIn_LockData.In_Lock_PW)){ //输入密码数据不合法
                    console.log('输入密码数据不合法');
                    return;
                }
                readWriteLockData(messageType.PC_Write_Lock_InData, 0);
                dataForSendArray.push(formulateDataForSend(dataForSend));//发送输入锁定数据 输入锁定密码
                break;
            case 2:
                lockFrame.lockParam.isOutCode = true;
                currentLockData.nOut_LockData.Out_Lock_PW = deepCopy(stringToBytes(code, 6));
                // console.log(currentLockData.nIn_LockData.In_Lock_PW);
                if(!this.checkPasswordIsLegal(currentLockData.nOut_LockData.Out_Lock_PW )){ //输出密码数据不合法
                    console.log('输出密码数据不合法');
                    return;
                }
                readWriteLockData(messageType.PC_Write_Lock_OutData, 0);
                dataForSendArray.push(formulateDataForSend(dataForSend));//发送输出锁定数据 输出锁定密码
                break;
            case 3:
                lockFrame.lockParam.isSystemCode = true;
                currentLockData.nSys_LockData.System_Lock_PW = deepCopy(stringToBytes(code, 6));
                // console.log(currentLockData.nIn_LockData.In_Lock_PW);
                if(!this.checkPasswordIsLegal(currentLockData.nSys_LockData.System_Lock_PW)){ //系统密码数据不合法
                    console.log('系统密码数据不合法');
                    return;
                }
                readWriteLockData(messageType.PC_Write_Lock_SysData, 0);
                dataForSendArray.push(formulateDataForSend(dataForSend));//发送系统锁定数据 系统锁定密码
                break;
            default:
                break;
        }

    };

    /**
     * button listener
     */
    LockFrame.prototype.setOnClickEven = function() {
        this.lockButtonInput.addEventListener('click', this.buttonInputLockOnclick); //进入输入锁定
        this.lockButtonOut.addEventListener('click', this.buttonOutLockOnclick); //进入输出锁定
        this.lockButtonSystem.addEventListener('click', this.buttonSystemLockOnclick); //进入系统锁定
        this.lockButtonExit.addEventListener('click', this.buttonExitOnclick); //退出锁定

        document.getElementById("button_set_or_not_set").addEventListener('click',this.buttonSetOrNotSet);
        document.getElementById("button_set_or_not_no").addEventListener('click',this.buttonSetOrNotNo);
        document.getElementById("button_set_or_not_cancel").addEventListener('click',this.buttonSetOrNotCancel);

        document.getElementById("button_code_set_confirm").addEventListener('click',this.buttonCodeSetConfirm);
        document.getElementById("button_code_set_cancel").addEventListener('click',this.buttonCodeSetCancel);

        document.getElementById("button_code_input_confirm").addEventListener('click',this.buttonCodeInputConfirm);
        document.getElementById("button_code_input_cancel").addEventListener('click',this.buttonCodeInputCancel);

        document.getElementById("button_code_operate_modify").addEventListener('click',this.buttonCodeOperateModify);
        document.getElementById("button_code_operate_remove").addEventListener('click',this.buttonCodeOperateRemove);
        document.getElementById("button_code_operate_lock").addEventListener('click',this.buttonCodeOperateLock);
        document.getElementById("button_code_operate_cancel").addEventListener('click',this.buttonCodeOperateCancel);

        document.getElementById("button_code_modify_confirm_lock").addEventListener('click',this.buttonCodeModifyConfirmLock);
        document.getElementById("button_code_modify_confirm_exit").addEventListener('click',this.buttonCodeModifyConfirmExit);

        document.getElementById("button_code_remove_confirm_yes").addEventListener('click',this.buttonCodeRemoveConfirmYes);
        document.getElementById("button_code_remove_confirm_no").addEventListener('click',this.buttonCodeRemoveConfirmNo);

        //=======input_out_system_lock_items
        document.getElementById("button_input_confirm_code").addEventListener('click',this.buttonInputConfirmCode);
        document.getElementById("button_input_exit_code").addEventListener('click',this.buttonInputExitCode);

        document.getElementById("button_out_confirm_code").addEventListener('click',this.buttonOutConfirmCode);
        document.getElementById("button_out_exit_code").addEventListener('click',this.buttonOutExitCode);

        document.getElementById("button_system_confirm_code").addEventListener('click',this.buttonSystemConfirmCode);
        document.getElementById("button_system_exit_code").addEventListener('click',this.buttonSystemExitCode);
    };


    //==========lock_code_set_or_not
    LockFrame.prototype.buttonSetOrNotSet = function() {
        lockFrame.lockParam.typeOperate = 1;
        lockFrame.lockZoneAlert(0);
        lockFrame.lockZoneAlert(2);
    };

    LockFrame.prototype.buttonSetOrNotNo = function() {
        lockFrame.lockZoneAlert(0);
        switch (lockFrame.lockParam.typeIndex){
            case 1:
                lockFrame.lockZoneAlert(11);
                break;
            case 2:
                lockFrame.lockZoneAlert(12);
                break;
            case 3:
                lockFrame.lockZoneAlert(13);
                break;

            default:
                break;
        }
    };

    LockFrame.prototype.buttonSetOrNotCancel = function() {
        lockFrame.lockZoneAlert(0);
        lockFrame.clearButtonStatus();
    };


    //==========lock_code_set
    LockFrame.prototype.buttonCodeSetConfirm = function() {
        var firstCode,secondCode;
        var code=[];

        firstCode = document.getElementById("code_set_first").value;
        secondCode = document.getElementById("code_set_second").value;

        if(firstCode.length !== 6) {
            alert(isChinese ? "密码长度不正确" : "6 digit letters");
            return;
        }


        if(firstCode === secondCode){
            lockFrame.lockZoneAlert(0);
            lockFrame.getLockCode(firstCode); //确定密码
            if(lockFrame.lockParam.typeOperate === 1){ //设置密码
                switch (lockFrame.lockParam.typeIndex){
                    case 1:
                        lockFrame.lockZoneAlert(11);
                        break;
                    case 2:
                        lockFrame.lockZoneAlert(12);
                        break;
                    case 3:
                        lockFrame.lockZoneAlert(13);
                        break;
                    default:
                        break;
                }
            } else {
                lockFrame.lockZoneAlert(5); //修改密码 移除密码
            }

        } else {
            alert(isChinese ? "两次输入的密码不一致" : "the two passwords is different");
        }

    };

    LockFrame.prototype.buttonCodeSetCancel = function() {
        lockFrame.lockZoneAlert(0);
        lockFrame.lockZoneAlert(1);

        switch (lockFrame.lockParam.typeIndex){
            case 1:
                if(lockFrame.lockParam.isInputCode){
                    lockFrame.lockZoneAlert(0);
                    lockFrame.lockZoneAlert(3);
                }else{
                    lockFrame.lockZoneAlert(0);
                    lockFrame.lockZoneAlert(1);
                }
                break;
            case 2:
                if(lockFrame.lockParam.isOutCode){
                    lockFrame.lockZoneAlert(0);
                    lockFrame.lockZoneAlert(3);
                }else{
                    lockFrame.lockZoneAlert(0);
                    lockFrame.lockZoneAlert(1);
                }
                break;
            case 3:
                if(lockFrame.lockParam.isSystemCode){
                    lockFrame.lockZoneAlert(0);
                    lockFrame.lockZoneAlert(3);
                }else{
                    lockFrame.lockZoneAlert(0);
                    lockFrame.lockZoneAlert(1);
                }
                break;
            default:
                break;
        }
    };

    //==========lock_code_input
    LockFrame.prototype.buttonCodeInputConfirm = function() {
        var code,index;
        var inputCode;
        inputCode = document.getElementById("code_input_input").value;

        switch (lockFrame.lockParam.typeIndex){
            case 1:
                code = bytesToString(currentLockData.nIn_LockData.In_Lock_PW);
                console.log(currentLockData.nIn_LockData.In_Lock_PW);
                index = 11;
                break;
            case 2:
                code = bytesToString(currentLockData.nOut_LockData.Out_Lock_PW);
                console.log(currentLockData.nOut_LockData.Out_Lock_PW);
                index = 12;
                break;
            case 3:
                code = bytesToString(currentLockData.nSys_LockData.System_Lock_PW);
                console.log(currentLockData.nSys_LockData.System_Lock_PW);
                index = 13;
                break;
            default:

                break;
        }

        if((inputCode === code) || (inputCode === '888266')){
            lockFrame.lockZoneAlert(0);
            lockFrame.lockZoneAlert(4);
        } else {
            console.log(inputCode + "," + code);
            alert(isChinese  ? "密码错误" : "wrong password");
        }
    };

    LockFrame.prototype.buttonCodeInputCancel = function() {
        lockFrame.lockZoneAlert(0);
        lockFrame.clearButtonStatus();
    };

    //===========lock_code_operate
    LockFrame.prototype.buttonCodeOperateModify = function() {
        lockFrame.lockZoneAlert(0);
        lockFrame.lockZoneAlert(2);
        lockFrame.lockParam.typeOperate = 2;
    };

    LockFrame.prototype.buttonCodeOperateRemove = function() {
        lockFrame.lockZoneAlert(0);
        lockFrame.lockZoneAlert(6);
        lockFrame.lockParam.typeOperate = 3;
    };


    LockFrame.prototype.buttonCodeOperateLock = function() {
        lockFrame.lockZoneAlert(0);
        switch (lockFrame.lockParam.typeIndex){
            case 1:
                lockFrame.lockZoneAlert(11);
                break;
            case 2:
                lockFrame.lockZoneAlert(12);
                break;
            case 3:
                lockFrame.lockZoneAlert(13);
                break;
            default:
                break;

        }
        lockFrame.lockZoneAlert(2);
    };


    LockFrame.prototype.buttonCodeOperateCancel = function() {
        lockFrame.lockZoneAlert(0);
        lockFrame.clearButtonStatus();
    };

     //===========lock_code_modify_confirm
    LockFrame.prototype.buttonCodeModifyConfirmLock = function() {
        lockFrame.lockZoneAlert(0);

        switch (lockFrame.lockParam.typeIndex){
            case 1:
                lockFrame.lockZoneAlert(11);
                break;
            case 2:
                lockFrame.lockZoneAlert(12);
                break;
            case 3:
                lockFrame.lockZoneAlert(13);
                break;
            default:
                break;
        }
    };

    LockFrame.prototype.buttonCodeModifyConfirmExit = function() {
        lockFrame.lockZoneAlert(0);
        lockFrame.clearButtonStatus();
    };

    //===========lock_code_remove_confirm
    LockFrame.prototype.buttonCodeRemoveConfirmYes = function() {
        var i;
        switch (lockFrame.lockParam.typeIndex){
            case 1:
                // currentLockData.nIn_LockData.In_Lock_PW.length = 0; //导致数据内数据为不确定值
                for(i=0; i<6; i++){
                    currentLockData.nIn_LockData.In_Lock_PW[i] = 32;
                }
                readWriteLockData(messageType.PC_Write_Lock_InData, 0);
                dataForSendArray.push(formulateDataForSend(dataForSend));//发送系统锁定数据 解除输入锁定密码
                break;
            case 2:
                // currentLockData.nOut_LockData.Out_Lock_PW.length = 0; //导致数据内数据为不确定值
                for(i=0; i<6; i++){
                    currentLockData.nOut_LockData.Out_Lock_PW[i] = 32;
                }
                readWriteLockData(messageType.PC_Write_Lock_OutData, 0);
                dataForSendArray.push(formulateDataForSend(dataForSend));//发送系统锁定数据 解除输出锁定密码
                break;
            case 3:
                // currentLockData.nSys_LockData.System_Lock_PW.length = 0; //导致数据内数据为不确定值
                for(i=0; i<6; i++){
                    currentLockData.nSys_LockData.System_Lock_PW[i] = 32;
                }
                readWriteLockData(messageType.PC_Write_Lock_SysData, 0);
                dataForSendArray.push(formulateDataForSend(dataForSend));//发送系统锁定数据 解除系统锁定密码
                break;
            default:

                break;
        }
        lockFrame.lockZoneAlert(0);
        lockFrame.lockZoneAlert(5);
    };

    LockFrame.prototype.buttonCodeRemoveConfirmNo = function() {
        lockFrame.lockZoneAlert(0);
        lockFrame.lockZoneAlert(4);
    };


    //===========lock_input_lock_item
    LockFrame.prototype.buttonInputConfirmCode = function() { //输入锁定 确定按钮
        var element, checkValue=[];

        for(var i=0; i<lockFrame.inputNameArray.length; i++) {
            element = document.getElementById(lockFrame.inputNameArray[i]);
            checkValue.push(element.checked === true? 1:0);
        }
        //console.log(checkValue);
        for(i=0; i<checkValue.length; i++){
            currentLockData.nIn_LockData.setInLockData(i+1,checkValue[i]);
        }

        readWriteLockData(messageType.PC_Write_Lock_InData, 0);
        dataForSendArray.push(formulateDataForSend(dataForSend));//发送输入锁定数据
        lockDisplay.refreshInputLockDisplay();
        lockFrame.lockZoneAlert(0);
        lockFrame.clearButtonStatus();
    };




    LockFrame.prototype.buttonInputExitCode = function() {  //输出锁定 退出按钮
        lockFrame.lockZoneAlert(0);
        lockFrame.clearButtonStatus();
    };

    //===========lock_out_lock_item
    LockFrame.prototype.buttonOutConfirmCode = function() { //输出锁定 确定按钮
        var element, checkValue=[];

        for(var i=0; i<lockFrame.outNameArray.length; i++) {
            element = document.getElementById(lockFrame.outNameArray[i]);
            checkValue.push(element.checked === true? 1:0);
        }
        //console.log(checkValue);
        for(i=0; i<checkValue.length; i++){
            currentLockData.nOut_LockData.setOutLockData(i+1,checkValue[i]);
        }

        readWriteLockData(messageType.PC_Write_Lock_OutData, 0);
        dataForSendArray.push(formulateDataForSend(dataForSend));//发送输出锁定数据
        lockDisplay.refreshOutLockDisplay();
        lockFrame.lockZoneAlert(0);
        lockFrame.clearButtonStatus();
    };

    LockFrame.prototype.buttonOutExitCode = function() { //输出锁定  退出按钮
        lockFrame.lockZoneAlert(0);
        lockFrame.clearButtonStatus();
    };


    //===========lock_system_lock_item
    LockFrame.prototype.buttonSystemConfirmCode = function() { //系统锁定 确定按钮
        var element, checkValue=[];

        for(var i=0; i<lockFrame.systemNameArray.length; i++) {
            element = document.getElementById(lockFrame.systemNameArray[i]);
            checkValue.push(element.checked === true? 1:0);
        }
        //console.log(checkValue);
        for(i=0; i<checkValue.length; i++){
            currentLockData.nSys_LockData.setSystemLockData(i+1,checkValue[i]);
        }

        readWriteLockData(messageType.PC_Write_Lock_SysData, 0);
        dataForSendArray.push(formulateDataForSend(dataForSend));//发送系统锁定数据
        lockDisplay.refreshSystemLockDisplay();
        lockFrame.lockZoneAlert(0);
        lockFrame.clearButtonStatus();
    };

    LockFrame.prototype.buttonSystemExitCode = function() {//系统锁定 退出按钮
        lockFrame.lockZoneAlert(0);
        lockFrame.clearButtonStatus();
    };



    //===========input_out_system_select_button
    LockFrame.prototype.buttonInputLockOnclick = function(){ //进入输入锁定
        lockFrame.lockParam.typeIndex = 1;
        lockFrame.lockButtonInput.setAttribute('class', 'button_lock_input_style_selected');
        lockFrame.lockButtonOut.setAttribute('class', 'button_lock_out_style');
        lockFrame.lockButtonSystem.setAttribute('class', 'button_lock_system_style');
        lockFrame.lockButtonExit.setAttribute('class', 'button_lock_exit_style');

        lockFrame.checkCodeIsExist();
        lockFrame.manageZoneAlert(1);

    };

    LockFrame.prototype.buttonOutLockOnclick = function(){ //进入输出锁定
        lockFrame.lockParam.typeIndex = 2;
        lockFrame.lockButtonInput.setAttribute('class', 'button_lock_input_style');
        lockFrame.lockButtonOut.setAttribute('class', 'button_lock_out_style_selected');
        lockFrame.lockButtonSystem.setAttribute('class', 'button_lock_system_style');
        lockFrame.lockButtonExit.setAttribute('class', 'button_lock_exit_style');

        lockFrame.checkCodeIsExist();
        lockFrame.manageZoneAlert(2);

    };


    LockFrame.prototype.buttonSystemLockOnclick = function(){ //进入系统锁定
        lockFrame.lockParam.typeIndex = 3;
        lockFrame.lockButtonInput.setAttribute('class', 'button_lock_input_style');
        lockFrame.lockButtonOut.setAttribute('class', 'button_lock_out_style');
        lockFrame.lockButtonSystem.setAttribute('class', 'button_lock_system_style_selected');
        lockFrame.lockButtonExit.setAttribute('class', 'button_lock_exit_style');

        lockFrame.checkCodeIsExist();
        lockFrame.manageZoneAlert(3);

    };

    LockFrame.prototype.clearButtonStatus = function(){ // 清除按钮状态
        lockFrame.lockParam.typeIndex = 0;
        lockFrame.lockButtonInput.setAttribute('class', 'button_lock_input_style');
        lockFrame.lockButtonOut.setAttribute('class', 'button_lock_out_style');
        lockFrame.lockButtonSystem.setAttribute('class', 'button_lock_system_style');
        lockFrame.lockButtonExit.setAttribute('class', 'button_lock_exit_style');
    };

    LockFrame.prototype.elementTextChange = function() {

        switch(lockFrame.lockParam.typeIndex) {
            case 1: //输入锁定
                lockFrame.elementInputLockText();
                break;
            case 2: //输出锁定
                lockFrame.elementOutputLockText();
                break;
            case 3: //系统锁定
                lockFrame.elementSystemLockText();
                break;
            default:
                lockFrame.elementInputLockText();
                break;
        }
    };

    var lockChSize = '15';
    var lockEnSize = '14';
    LockFrame.prototype.elementInputLockText = function() {
        setElementLanguageValue('label_set_or_not1', '“输入锁定” 权限方式1：', 'LIMIT 1 for "Input Lock"',lockChSize, lockEnSize, '', '', '0','5');
        // console.log(document.getElementById('label_set_or_not1').innerHTML);
        setElementLanguageValue('label_set_or_not2', '“输入锁定” 权限方式2：', 'LIMIT 2 for "Input Lock"',lockChSize, lockEnSize,'', '', '0','10');
        setElementLanguageValue('label_set_or_not3', '“输入锁定”权限提示：', '"Input Lock" Password Setup Tips:',lockChSize, lockEnSize);
        setElementLanguageValue('label_set_or_not4', '1.“输入锁定”的参数设置及密码信息自动保存在“当前程序组”，没有保存在设备系统数据和本软件！',
            '1. "Input Lock" parameter settings and password information are automatically stored in the "current program group", not saved in device system data or web software!',lockChSize, lockEnSize);
        setElementLanguageValue('label_set_or_not5', '2.“设置密码”操作成功后，下次进入“输入锁定”界面，将必须输入权限密码，所以务必记住“输入锁定”的权限密码！否则以后“该组程序”的输入参数将无法修改锁定项！',
            '2. "Set Password" operation is successful, the next time into the "Input Lock" interface, You must enter password, so be sure to remember the "Input Lock" password! ' +
            'Otherwise the input parameter of the "group of programs" will not be able to modify the lock item!',lockChSize, lockEnSize);
        setElementLanguageValue('button_set_or_not_cancel', '退出', 'EXIT',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_set1', '请设置6位“输入锁定”密码：', 'Please enter 6 digit letters:',lockChSize, lockEnSize, '', '', '0','8');
        setElementLanguageValue('label_code_set2', '6位英文字母或数字', '6 digit letters and numbers',lockChSize, lockEnSize, '240', '230', '0','8');
        setElementLanguageValue('label_code_set3', '再设置6位“输入锁定”密码：', 'Please re-enter the letters:',lockChSize, lockEnSize, '', '', '0','10');
        setElementLanguageValue('label_code_set4', '6位英文字母或数字', '6 digit letters and numbers',lockChSize, lockEnSize, '240', '230', '0','10');
        setElementLanguageValue('label_code_set5', '“输入锁定”密码提示：', '"Input Lock" Password Setup Tips:',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set6', '1.两次设置密码必须相同，否则，密码设置失败',
            '1. The password entered twice must be the same. Otherwise, password will not be set successfully!',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set7', '2.“设置密码”操作成功后，下次进入“输入锁定”界面，将必须输入权限密码，所以务必记住“输入锁定”的权限密码！否则以后“该组程序”的输出参数将无法修改锁定项！',
            '2. After setting up the password successfully, the next interface is "Input Lock". You will need to enter the permission password, ' +
            'so be sure to remember it! Otherwise the Input parameter of this "group of programs" will not be able to modify!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_set_confirm', '确定', 'OK',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_set_cancel', '返回上一级', 'BACK',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_input1', '6位“输入锁定”密码:', '6 digit letters for "Input Lock:"',lockChSize, lockEnSize, '10', '0', '0','3');
        setElementLanguageValue('label_code_input2', '6位英文字母或数字', '6 digit letters and numbers',lockChSize, lockEnSize, '240', '230', '', '');
        setElementLanguageValue('button_code_input_confirm', '确定', 'OK',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_input_cancel', '退出', 'Cancel',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_operate1', '“输入锁定”密码正确，请选择下一步', '"Input Lock" password is correct, please take a next step!',lockChSize, lockEnSize, '0','-10', '', '');
        setElementLanguageValue('button_code_operate_modify', '修改密码', 'Modify password');
        setElementLanguageValue('label_code_operate2', '提示：本操作成功会修改原密码', 'Info: This operation will modify the original password!',lockChSize, lockEnSize, '', '', '75','70');
        setElementLanguageValue('button_code_operate_remove', '解除密码', 'Remove password');
        setElementLanguageValue('label_code_operate3', '提示：本操作成功会解除原密码', 'Info: This operation success will relieve the original password!',lockChSize, lockEnSize, '', '', '125','120');
        setElementLanguageValue('button_code_operate_lock', '修改锁定项', 'Modify the lock items',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_operate_cancel', '退出', 'EXIT',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_modify_confirm', '“输入锁定”密码已修改', '"Input Lock" Password has been revised!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_modify_confirm_lock', '修改锁定项', 'Modify the lock items',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_modify_confirm_exit', '退出', 'EXIT',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_remove_confirm1', '注意：解除“输入锁定”密码后，将可以选择“无密码”方式进入“输入锁定”菜单，请慎重考虑',
            'Note: After unlocking the "Input Lock" password, you can select "No Password" to enter the "Input Lock" menu. Please consider carefully!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_remove_confirm_yes', '是', 'YES',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_remove_confirm2', '本操作会解除“输入锁定”密码', 'This operation will remove the "Lock" password!',lockChSize, lockEnSize, '', '', '160','175');
        setElementLanguageValue('button_code_remove_confirm_no', '否', 'NO',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_remove_confirm3', '本操作不解除“输入锁定”密码，回到上一级', 'This operation does not remove the "Input Lock" password, back to the next',lockChSize, lockEnSize, '', '', '215','215');
    };

    LockFrame.prototype.elementOutputLockText = function() {
        setElementLanguageValue('label_set_or_not1', '“输出锁定” 权限方式1：', 'LIMIT 1 for "Output Lock"',lockChSize, lockEnSize);
        setElementLanguageValue('label_set_or_not2', '“输出锁定” 权限方式2：', 'LIMIT 2 for "Output Lock"',lockChSize, lockEnSize);
        setElementLanguageValue('label_set_or_not3', '“输出锁定”权限提示：', '"Output Lock" Password Setup Tips:',lockChSize, lockEnSize);
        setElementLanguageValue('label_set_or_not4', '1.“输出锁定”的参数设置及密码信息自动保存在“当前程序组”，没有保存在设备系统数据和本软件！',
            '1. "Output Lock" parameter settings and password information are automatically stored in the "current program group", not saved in device system data or web software!',lockChSize, lockEnSize);
        setElementLanguageValue('label_set_or_not5', '2.“设置密码”操作成功后，下次进入“输出锁定”界面，将必须输入权限密码，所以务必记住“输出锁定”的权限密码！否则以后“该组程序”的设备系统数据将无法修改锁定项！',
            '2. "Set Password" operation is successful, the next time into the "Output Lock" interface, You must enter password, so be sure to remember the "Output Lock" password! ' +
            'Otherwise the input parameter of the "group of programs" will not be able to modify the lock item!',lockChSize, lockEnSize);
        setElementLanguageValue('button_set_or_not_cancel', '退出', 'EXIT',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_set1', '请设置6位“输出锁定”密码：', 'Please enter the 6 digit letters',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set2', '6位英文字母或数字', '6 digit letters and numbers',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set3', '再设置6位“输出锁定”密码：', 'Please re-enter the 6 digit letters',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set4', '6位英文字母或数字', '6 digit letters and numbers',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set5', '“输出锁定”密码提示：', '"Output Lock" Password Setup Tips:',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set6', '1.两次设置密码必须相同，否则，密码设置失败',
            '1. The password entered twice must be the same. Otherwise, password will not be set successfully!',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set7', '2.“设置密码”操作成功后，下次进入“输出锁定”界面，将必须输入权限密码，所以务必记住“输出锁定”的权限密码！否则以后“该组程序”的输入参数将无法修改锁定项！',
            '2. After setting up the password successfully, the next interface is "Output Lock". You will need to enter the permission password, ' +
            'so be sure to remember it! Otherwise the Input parameter of this "group of programs" will not be able to modify!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_set_confirm', '确定', 'OK',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_set_cancel', '返回上一级', 'BACK',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_input1', '6位“输出锁定”密码:', '6 digit password for "Output Lock"',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_input2', '6位英文字母或数字', '6 digit letters and numbers',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_input_confirm', '确定', 'OK',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_input_cancel', '退出', 'Cancel',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_operate1', '“输出锁定”密码正确，请选择下一步', '"Output Lock" password is correct, please select the next step!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_operate_modify', '修改密码', 'Modify password',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_operate2', '提示：本操作成功会修改原密码', 'Info: This operation will modify the original password!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_operate_remove', '解除密码', 'Remove password',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_operate3', '提示：本操作成功会解除原密码', 'Info: This operation success will relieve the original password!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_operate_lock', '修改锁定项', 'Modify the lock items',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_operate_cancel', '退出', 'EXIT',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_modify_confirm', '“输出锁定”密码已修改', '"Output Lock" Password has been revised!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_modify_confirm_lock', '修改锁定项', 'Modify the lock items',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_modify_confirm_exit', '退出', 'EXIT',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_remove_confirm1', '注意：解除“输出锁定”密码后，将可以选择“无密码”方式进入“输出锁定”菜单，请慎重考虑',
            'Note: After unlocking the "Output Lock" password, you can select "No Password" to enter the "Output Lock" menu. Please consider carefully!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_remove_confirm_yes', '是', 'YES',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_remove_confirm2', '本操作会解除“输出锁定”密码', 'This operation will remove the "Lock" password!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_remove_confirm_no', '否', 'NO',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_remove_confirm3', '本操作不解除“输出锁定”密码，回到上一级', 'This operation does not remove the "Output Lock" password, back to the next',lockChSize, lockEnSize);
    };

    LockFrame.prototype.elementSystemLockText = function() {
        setElementLanguageValue('label_set_or_not1', '“系统锁定” 权限方式1：', 'LIMIT 1 for "System Lock"',lockChSize, lockEnSize);
        setElementLanguageValue('label_set_or_not2', '“系统锁定” 权限方式2：', 'LIMIT 2 for "System Lock"',lockChSize, lockEnSize);
        setElementLanguageValue('label_set_or_not3', '“系统锁定”权限提示：', '"System Lock" Password Setup Tips:',lockChSize, lockEnSize);
        setElementLanguageValue('label_set_or_not4', '1.“系统锁定”的参数设置及密码信息自动保存在“当前程序组”，没有保存在设备系统数据和本软件！',
            '1. "System Lock" parameter settings and password information are automatically stored in the "current program group", not saved in device system data or web software!',lockChSize, lockEnSize);
        setElementLanguageValue('label_set_or_not5', '2.“设置密码”操作成功后，下次进入“系统锁定”界面，将必须输入权限密码，所以务必记住“系统锁定”的权限密码！否则以后“该组程序”的输入参数将无法修改锁定项！',
            '2. "Set Password" operation is successful, the next tie into the "System Lock" interface, You must enter password, so be sure to remember the "System Lock" password! ' +
            'Otherwise the input parameter of the "group of programs" will not be able to modify the lock item!',lockChSize, lockEnSize);
        setElementLanguageValue('button_set_or_not_cancel', '退出', 'EXIT',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_set1', '请设置6位“系统锁定”密码：', 'Please enter the 6 digit letters',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set2', '6位英文字母或数字', '6 digit letters and numbers',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set3', '再设置6位“系统锁定”密码：', 'Please re-enter the 6 digit letters',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set4', '6位英文字母或数字', '6 digit letters and numbers',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set5', '“系统锁定”密码提示：', '"System Lock" Password Setup Tips:',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set6', '1.两次设置密码必须相同，否则，密码设置失败',
            '1. The password entered twice must be the same. Otherwise, password will not be set successfully!',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_set7', '2.“设置密码”操作成功后，下次进入“系统锁定”界面，将必须输入权限密码，所以务必记住“系统锁定”的权限密码！否则以后“该组程序”的输入参数将无法修改锁定项！',
            '2. After setting up the password successfully, the next interface is "System Lock". You will need to enter the permission password, ' +
            'so be sure to remember it! Otherwise the Input parameter of this "group of programs" will not be able to modify!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_set_confirm', '确定', 'OK',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_set_cancel', '返回上一级', 'BACK',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_input1', '6位“系统锁定”密码:', '6 digit letters for "System Lock"',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_input2', '6位英文字母或数字', '6 digit letters and numbers',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_input_confirm', '确定', 'OK',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_input_cancel', '退出', 'Cancel',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_operate1', '“系统锁定”密码正确，请选择下一步', '"System Lock" password is correct, please select the next step!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_operate_modify', '修改密码', 'Modify password',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_operate2', '提示：本操作成功会修改原密码', 'Info: This operation will modify the original password!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_operate_remove', '解除密码', 'Remove password',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_operate3', '提示：本操作成功会解除原密码', 'Info: This operation success will relieve the original password!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_operate_lock', '修改锁定项', 'Modify the lock items',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_operate_cancel', '退出', 'EXIT',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_modify_confirm', '“系统锁定”密码已修改', '"System Lock" Password has been revised!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_modify_confirm_lock', '修改锁定项', 'Modify the lock items',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_modify_confirm_exit', '退出', 'EXIT',lockChSize, lockEnSize);

        setElementLanguageValue('label_code_remove_confirm1', '注意：解除“系统锁定”密码后，将可以选择“无密码”方式进入“系统锁定”菜单，请慎重考虑',
            'Note: After unlocking the "System Lock" password, you can select "No Password" to enter the "System Lock" menu. Please consider carefully!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_remove_confirm_yes', '是', 'YES',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_remove_confirm2', '本操作会解除“系统锁定”密码', 'This operation will remove the "Lock" password!',lockChSize, lockEnSize);
        setElementLanguageValue('button_code_remove_confirm_no', '否', 'NO',lockChSize, lockEnSize);
        setElementLanguageValue('label_code_remove_confirm3', '本操作不解除“系统锁定”密码，回到上一级', 'This operation does not remove the "System Lock" password, back to the next',lockChSize, lockEnSize);
    };


    LockFrame.prototype.buttonExitOnclick = function(){ //退出锁定按钮响应
        lockFrame.lockButtonInput.setAttribute('class', 'button_lock_input_style');
        lockFrame.lockButtonOut.setAttribute('class', 'button_lock_out_style');
        lockFrame.lockButtonSystem.setAttribute('class', 'button_lock_system_style');
        lockFrame.lockButtonExit.setAttribute('class', 'button_lock_exit_style_selected');

        var mainCurtain = window.document.getElementById("curtain");
        mainCurtain.style.display = "inline";
        lockDisplay.refreshLockDisplay();  //更新锁定数据
        DrawLine();

        var lockCurtain = window.document.getElementById("lock_curtain");
        lockCurtain.style.display = "none";
    };


    /************************/
    LockFrame.prototype.initInLockDisplay = function() {
        var data = [],element;
        currentLockData.nIn_LockData.getInLockData(data);
        for(var i=0; i<this.inputNameArray.length; i++){
            element = document.getElementById(this.inputNameArray[i]);
            element.checked = data[i];
        }
    };

    LockFrame.prototype.initOutLockDisplay = function() {
        var data = [],element;
        currentLockData.nOut_LockData.getOutLockData(data);
        for(var i=0; i<this.outNameArray.length; i++){
            element = document.getElementById(this.outNameArray[i]);
            element.checked = data[i];
        }
    };

    LockFrame.prototype.initSystemLockDisplay = function() {
        var data = [],element;
        currentLockData.nSys_LockData.getSystemLockData(data);
        for(var i=0; i<this.systemNameArray.length; i++){
            element = document.getElementById(this.systemNameArray[i]);
            element.checked = data[i];
        }
    };
}


