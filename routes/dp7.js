var express = require('express');
var router = express.Router();

var app = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('dp7',{title:'数字音频处理器'});
    //next();
});

var aData = '';
var bData = '';
var isAData = false;
var isBData = false;
var isMark = true;
router.post('*', function(req, res, next) {
    req.on('data',function(data){
        var messageStr = String(data);
            messageStr = messageStr.replace(/(\s*$)/g, ""); //remove the empty space at the last
        //console.log("arrangeReceiveData:" + messageStr);
        var messageStrArray = messageStr.split(' ');
        console.log(messageStrArray);
        // arrangeReceiveData(messageStr)
        //res.send('5a 5a 5a ad 53 05 ec 01 00 14 01 00 00 00 0c 00 00 00 00 00 00 00 00 00 00 00 00 00 a2 aa'); // 回复信号灯
        // res.send('51 5a 5a ad a2 05 52 00 00 14 01 00 00 00 08 00 00 00 00 00 00 00 00 00 ba aa'); // 请求信号灯
        // res.send('5a 5a 5a ad a2 05 73 00 00 14 05 00 00 00 08 00 00 00 00 00 00 00 00 00 be aa'); // 联机指令

        if(isMark){
            res.send('5a 5a 5a ad a2 05 73 00 00 14 05 00 00 00 08 00 00 00 00 00 00 00 00 00 be aa'); // 联机指令
            isMark = false;
        } else {
            res.send('5a 5a 5a ad a2 05 52 00 00 14 01 00 00 00 08 00 00 00 00 00 00 00 00 00 ba aa');
        }
    })
});

router.post('/A', function(req, res, next) {
    req.on('data',function(data){
        var messageStr = String(data);
        aData = messageStr;
        isAData = true;
        messageStr = messageStr.replace(/(\s*$)/g, ""); //remove the empty space at the last
        //console.log("arrangeReceiveData:" + messageStr);
        var messageStrArray = messageStr.split(' ');
        console.log(messageStrArray);
        // arrangeReceiveData(messageStr)
        if(isBData){
            res.send(bData);
        }
        res.send('5a 5a 5a ad 53 05 ec 01 00 14 01 00 00 00 0c 00 00 00 00 00 00 00 00 00 00 00 00 00 a2 aa');
    })
});

router.post('/B', function(req, res, next) {
    req.on('data',function(data){
        var messageStr = String(data);
        bData = messageStr;
        isBData = true;
        messageStr = messageStr.replace(/(\s*$)/g, ""); //remove the empty space at the last
        //console.log("arrangeReceiveData:" + messageStr);
        var messageStrArray = messageStr.split(' ');
        console.log(messageStrArray);
        // arrangeReceiveData(messageStr)
        res.send('5a 5a 5a ad 53 05 ec 01 00 14 01 00 00 00 0c 00 00 00 00 00 00 00 00 00 00 00 00 00 a2 aa');
    })
});

function DataStruct() {
    this.FrameHead = [0x5a, 0x5a, 0x5a];     //   帧头
    this.FrameTrait =  0xad;       //   帧特征

    this.FrameType =  0;       //   帧类型
    this.Link_Type =  5;       //   连接类型

    this.Frame_Num =  0;       //   帧编号
    this.DeviceAddr =  0;      //   设备ID

    this.Userid =  0;          //   用户  ID
    this.DataType =  0;        //   数据  类型

    this.ChannelID =  0;       //   通道ID
    this.Dataid =  0;          //   数据ID

    this.Keep =  0;            //16   功能序号
    this.DataLen =  0;         //16   发送  数据  长度

    this.DataBuff =  [];   //   数据  Buff
    this.CheckSum =  0;        //   校验  和
    this.FrameEnd =  0xaa;        //   帧尾
    //数据包的判断定义
    this.Read_Data_Lenght =  0;//读取的数据长度
    this.Read_Head_Flag =  0;  //判断头标志
    this.Read_Error =  0;      //数据数据错误标记
    this.Reading_Flag =  0;    //读取标记
    this.Writeing_Flag =  0;   //标记
    this.Over_Flag =  0;       //接受完成，将接收 发送 Buff 清空
    this.nFile_Pos =  0;       //16   文件进度条标记
    this.ReadFile_Flag =  0;   //   读文件标记
    this.FileOver_Flag =  0;   //   读取文件结束标记;
    this.Re_SendFlag =  0;     //   如果  读数据   错误，重新   发送数据
    this.ReSend_Num =  0;      //   重发次数
    this.Read_DeviceID =  0;   //   读取设备ID标记
    this.Write_DeviceID =  0;  //   写设备ID
    this.Com_Read_Empty =  0;  //16   COM 读取空字符标记
    this.Usb_WriteLenght =  0; //   USB 写长度
    this.Usb_WriteOver =  0;   //   USB 写结束
    this.Usb_ReadLenght =  0;  //   USB 读数据长度
    this.Usb_Connect_Flag =  0;//   USB 联机 指令
    this.Read_Error_Record =  0;  //   USB 读长度
    this.Cur_Read_Write_Flag =  0;//   USB 读结束
    this.nWifi_Flag = 0;		     //   wifi 标记： 1：Read Wifi, 2:Write Wifi, 3:重设Wifi
}


var wrongDataLength = false;
var wrongHeader = false;
var wrongTail = false;
var wrongVerification = false;
var wrongRespond = false;
dataForSend = new DataStruct();
dataBeReceive = new DataStruct();
function arrangeReceiveData( messageStr ) {
    var i;
    var messageArray = [];
    var messageStrArray;

    wrongDataLength = false;
    wrongHeader = false;
    wrongTail = false;
    wrongVerification = false;
    wrongRespond = false;

    messageStr = messageStr.replace(/(\s*$)/g, ""); //remove the empty space at the last
    //console.log("arrangeReceiveData:" + messageStr);
    messageStrArray = messageStr.split(' ');
    //console.log("messageStrArray:" + messageStrArray);
    //alert(messageStrArray);

    var length = messageStrArray.length;
    for(i=0; i<length; i++) {
        messageArray.push(parseInt(messageStrArray[i],16)); //处理为16进制数字
    }

    var dataLen = messageArray[14] + messageArray[15]*256;
    if(length !== (dataLen + messageType.Frame_LEN))
    {
        //alert('数据长度: ' + length + '  正确长度： ' + (dataLen + messageType.Frame_LEN) );
        //console.log('数据长度: ' + length + '  正确长度： ' + (dataLen + messageType.Frame_LEN));
        wrongDataLength = true;
        return false;
    }

    dataBeReceive.FrameHead[0] = messageArray[0];
    dataBeReceive.FrameHead[1] = messageArray[1];
    dataBeReceive.FrameHead[2] = messageArray[2];
    dataBeReceive.FrameTrait = messageArray[3];
    dataBeReceive.FrameType = messageArray[4];
    dataBeReceive.Link_Type = messageArray[5];
    dataBeReceive.Frame_Num = messageArray[6];
    dataBeReceive.DeviceAddr = messageArray[7];
    dataBeReceive.Userid = messageArray[8];
    dataBeReceive.DataType = messageArray[9];
    dataBeReceive.ChannelID = messageArray[10];
    dataBeReceive.Dataid = messageArray[11];
    dataBeReceive.Keep = messageArray[12] + messageArray[13]*256;
    dataBeReceive.DataLen = dataLen;
    dataBeReceive.DataBuff.length = 0;
    for(i=16; i<(dataLen+16); i++){
        dataBeReceive.DataBuff.push(messageArray[i]);
    }
    dataBeReceive.CheckSum = messageArray[length-2];
    dataBeReceive.FrameEnd = messageArray[length-1];

    if(dataBeReceive.FrameHead[0] === 0x5a
        && dataBeReceive.FrameHead[1] === 0x5a
        && dataBeReceive.FrameHead[2] === 0x5a
        && dataBeReceive.FrameTrait === 0xad) {

    } else {
        //alert('信息头有误');
        //console.log('信息头有误');
        wrongHeader = true;
        return false;
    }

    if(dataBeReceive.FrameEnd === 0xaa) {

    } else {
        //alert('信息结尾错误');
        //console.log("信息结尾错误");
        wrongTail = true;
        return false;
    }

    var check = checkReceiveSendData();
    if(dataBeReceive.CheckSum === check) {
        // console.log("dataBeReceive:" + toHexDisplay(dataBeReceive.DataBuff));
    } else {
        //alert('接收到的检验码：' + dataBeReceive.CheckSum + ' 计算出的检验码： ' + check);
        //console.log('接收到的检验码：' + dataBeReceive.CheckSum + ' 计算出的检验码： ' + check);
        wrongVerification = true;
        return false;
    }

    return true;
}


function checkReceiveSendData() {
    var check=0x0;
    var hexKeep = intToHexWith2Digits(dataBeReceive.Keep);
    var hexDataLen = intToHexWith2Digits(dataBeReceive.DataLen);

    check = check ^ dataBeReceive.FrameType
        ^ dataBeReceive.Link_Type
        ^ dataBeReceive.Frame_Num
        ^ dataBeReceive.DeviceAddr
        ^ dataBeReceive.Userid
        ^ dataBeReceive.DataType
        ^ dataBeReceive.ChannelID
        ^ dataBeReceive.Dataid
        ^ hexKeep[0]
        ^ hexKeep[1]
        ^ hexDataLen[0]
        ^ hexDataLen[1];

    for (var i=0; i<dataBeReceive.DataBuff.length; i++){
        check = check ^ dataBeReceive.DataBuff[i];
    }

    dataBeReceive.CheckSum = check;
    dataBeReceive.FrameEnd = messageType.Frame_END_TAG;

    return check;
}





function disposeReceiveData( ) {

    switch(dataBeReceive.FrameType)
    {
        case messageType.MCU_Data_Frame: //MCU 数据回应帧 0x53
            switch(dataBeReceive.DataType)
            {
                case messageType.InType_Frame:
                case messageType.OutType_Frame:
                    break;
                case messageType.RW_InRoute_Frame:	//输入通道数据
                    if(disposeInRouteData(0,dataBeReceive.ChannelID) === false)
                    {
                        return false;
                    } else {
                        //refreshMainDisplay();
                    }
                    break;
                case messageType.RW_OutRoute_Frame:	//输出通道数据
                    if(disposeOutRouteData(0,dataBeReceive.ChannelID) === false)
                    {
                        return false;
                    } else {
                        //refreshMainDisplay();
                    }

                    if (dataBeReceive.ChannelID === 7){
                        //alert('读取数据完成，更新显示');
                        //console.log("read device data is finished.............................................................");
                        agcExtMap.SetInData(0);

                        initProgramDisplay(); //更新程序界面的 组名
                        if(currentSystemData.m_nMCU_PG_Type === 1){ //从电脑调用一个程序后, m_nMCU_PG_Type 被设为1
                            renewProgramNoAndName('PC', 'PC PRO');
                        } else {
                            renewProgramNoAndName(currentSystemData.m_nSave_Cur_PG_ID,document.getElementById('program_name' + currentSystemData.m_nSave_Cur_PG_ID).innerText);
                        }
                        firstRequest = false;
                        refreshMainDisplay(); //从设备完读取完数据，更新数据
                        lockDisplay.refreshOutLockDisplay();
                        lockDisplay.refreshSystemLockDisplay();
                        lockDisplay.refreshInputLockDisplay(); //be last, avoid HP LP be show
                    }

                    break;
                case messageType.RW_AllInRoute_Frame: //所有输入通道数据
                    disposeAllInRouteData();
                    break;
                case messageType.RW_AllOutRoute_Frame:	//所有输出通道数据
                    disposeAllOutRouteData();
                    break;
                case messageType.SysType_Frame:	//系统数据
                    disposeSystemData();
                    break;
                case messageType.PC_Read_Lock_Data:	//一组锁定数据
                    disposeLockData();
                    break;
                case messageType.PC_Read_Lock_ALL_Data:	//所有组锁定数据
                    disposeAllLockData();
                    break;
                default:
                    return false;
                    break;
            }
            break;
        case messageType.MCU_Right_Frame:	//MCU正确回应该帧 0x51
            wrongRespond = false;
            if(dataBeReceive.DataType === messageType.SysType_Frame && dataBeReceive.ChannelID === messageType.Volume_Control) {
                //DSP音量控制指令发送后收到正确回应帧
                if(maxTime === 250){
                    maxTime = 2500;
                    dspMark = true;
                    //console.log('maxTime = 2500');
                } else {
                    maxTime = 250;
                    dspMark = false;
                    //console.log('maxTime = 250');
                }
            }
            //console.log("正确回应帧");
            return true;
            break;
        case messageType.MCU_Error_Frame: //MCU 错误回应帧 0x52
            wrongRespond = true;
            disconnectCommunicate();
            //console.log("错误回应帧");
            return false;
            break;
        default:
            return false;
            break;
    }
    return true;
}





























module.exports = router;
