
var wrongDataLength = false;
var wrongHeader = false;
var wrongTail = false;
var wrongVerification = false;
var wrongRespond = false;

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
        console.log('数据长度: ' + length + '  正确长度： ' + (dataLen + messageType.Frame_LEN));
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
        console.log('信息头有误');
        wrongHeader = true;
        return false;
    }

    if(dataBeReceive.FrameEnd === 0xaa) {

    } else {
        //alert('信息结尾错误');
        console.log("信息结尾错误");
        wrongTail = true;
        return false;
    }

    var check = checkReceiveSendData();
    if(dataBeReceive.CheckSum === check) {
        // console.log("dataBeReceive:" + toHexDisplay(dataBeReceive.DataBuff));
    } else {
        //alert('接收到的检验码：' + dataBeReceive.CheckSum + ' 计算出的检验码： ' + check);
        console.log('接收到的检验码：' + dataBeReceive.CheckSum + ' 计算出的检验码： ' + check);
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

var wrongDataTimes = 0;
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
                    console.log("read device data is finished.............................................................");
                    agcExtMap.SetInData(0);

                    initProgramDisplay(); //更新程序界面的 组名
                    if(currentSystemData.m_nMCU_PG_Type === 1){ //从电脑调用一个程序后, m_nMCU_PG_Type 被设为1
                        renewProgramNoAndName('PC', 'PC PRO');
                    } else {
                        renewProgramNoAndName(currentSystemData.m_nSave_Cur_PG_ID,document.getElementById('program_name' + currentSystemData.m_nSave_Cur_PG_ID).innerText);
                    }

                    lockDisplay.refreshOutLockDisplay();
                    lockDisplay.refreshSystemLockDisplay();
                    lockDisplay.refreshInputLockDisplay(); //be last, avoid HP LP be show
                    firstRequest = false;
                    refreshMainDisplay(); //从设备完读取完数据，更新数据
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
                console.log('maxTime = 2500');
            } else {
                maxTime = 250;
                dspMark = false;
                console.log('maxTime = 250');
            }
        }
        console.log("正确回应帧");
		return true;
		break;
	case messageType.MCU_Error_Frame: //MCU 错误回应帧 0x52
        wrongRespond = true;
        disconnectCommunicate();
        console.log("错误回应帧");
		return false;
		break;
	default:
		return false;
		break;
	}
	return true;
}


function disposeInRouteData(userID, channelID) {
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
            break;
        case 1:
            dataInput = dataGroup.dataInputB;
            break;
        case 2:
            dataInput = dataGroup.dataInputC;
            break;
        case 3:
            dataInput = dataGroup.dataInputD;
            break;
        default:
            return;
            break;
    }

    var tempName =[];
    var nameShow = [];
    for(i=0; i<8; i++){
       tempName.push(dataBeReceive.DataBuff[i]);
       nameShow.push(dataBeReceive.DataBuff[i].toString(16));
        //console.log(dataBeReceive.DataBuff[i]);

    }
    // console.log('dataInput__name:' + nameShow);
    dataInput.name = bytesToStringNot32(tempName);
    console.log("channelID.name:"+ channelID + " : " + tempName);

    dataInput.mute = dataBeReceive.DataBuff[8];
    dataInput.polar = dataBeReceive.DataBuff[9];
    dataInput.delay = dataBeReceive.DataBuff[10]+ dataBeReceive.DataBuff[11]*256;
    dataInput.gain = dataBeReceive.DataBuff[12] + dataBeReceive.DataBuff[13]*256;
    dataInput.inLinkSel = dataBeReceive.DataBuff[14];
    linkInputSelect[channelID] = dataInput.inLinkSel;
    dataInput.secondDelay = dataBeReceive.DataBuff[15];
    // console.log('输入细调延时:' + dataInput.secondDelay);

    dataInput.noisegate = dataBeReceive.DataBuff[16];

    dataInput.InDeq1.req = dataBeReceive.DataBuff[24] + dataBeReceive.DataBuff[25]*256 ;
    dataInput.InDeq1.level = dataBeReceive.DataBuff[26] + dataBeReceive.DataBuff[27]*256 ;
    dataInput.InDeq1.bw = dataBeReceive.DataBuff[28] + dataBeReceive.DataBuff[29]*256 ;
    dataInput.InDeq1.type = dataBeReceive.DataBuff[30];
    dataInput.InDeq1.shf_db = dataBeReceive.DataBuff[31];

    dataInput.InDeq2.req = dataBeReceive.DataBuff[32] + dataBeReceive.DataBuff[33]*256 ;
    dataInput.InDeq2.level = dataBeReceive.DataBuff[34] + dataBeReceive.DataBuff[35]*256 ;
    dataInput.InDeq2.bw = dataBeReceive.DataBuff[36] + dataBeReceive.DataBuff[37]*256 ;
    dataInput.InDeq2.type = dataBeReceive.DataBuff[38];
    dataInput.InDeq2.shf_db = dataBeReceive.DataBuff[39];

    dataInput.DeqParam1.DEQ_level = dataBeReceive.DataBuff[40] + dataBeReceive.DataBuff[41]*256 ;
    dataInput.DeqParam1.DEQ_Threshold = dataBeReceive.DataBuff[42] + dataBeReceive.DataBuff[43]*256 ;
    dataInput.DeqParam1.DEQ_r = dataBeReceive.DataBuff[44] + dataBeReceive.DataBuff[45]*256 ;
    dataInput.DeqParam1.DEQ_a = dataBeReceive.DataBuff[46];
    dataInput.DeqParam1.DEQ_ratio = dataBeReceive.DataBuff[47];
    //console.log('look at me_______________deq1_ratio:' + dataInput.DeqParam1.DEQ_ratio);

    dataInput.DeqParam2.DEQ_level = dataBeReceive.DataBuff[48] + dataBeReceive.DataBuff[49]*256 ;
    dataInput.DeqParam2.DEQ_Threshold = dataBeReceive.DataBuff[50] + dataBeReceive.DataBuff[51]*256 ;
    dataInput.DeqParam2.DEQ_r = dataBeReceive.DataBuff[52] + dataBeReceive.DataBuff[53]*256 ;
    dataInput.DeqParam2.DEQ_a = dataBeReceive.DataBuff[54];
    dataInput.DeqParam2.DEQ_ratio = dataBeReceive.DataBuff[55];
    //console.log('look at me_______________deq2_ratio:' + dataInput.DeqParam2.DEQ_ratio);

    //publicEQ
    dataInput.InEQ.EQ1.freq = dataBeReceive.DataBuff[56]+ dataBeReceive.DataBuff[57]*256 ;
    dataInput.InEQ.EQ1.level = dataBeReceive.DataBuff[58] + dataBeReceive.DataBuff[59]*256 ;
    dataInput.InEQ.EQ1.bw = dataBeReceive.DataBuff[60] + dataBeReceive.DataBuff[61]*256 ;
    dataInput.InEQ.EQ1.HL_db_AP_Flag = dataBeReceive.DataBuff[62];
    dataInput.InEQ.EQ1.type = dataBeReceive.DataBuff[63];

    dataInput.InEQ.EQ2.freq = dataBeReceive.DataBuff[64] + dataBeReceive.DataBuff[65]*256 ;
    dataInput.InEQ.EQ2.level = dataBeReceive.DataBuff[66] + dataBeReceive.DataBuff[67]*256 ;
    dataInput.InEQ.EQ2.bw = dataBeReceive.DataBuff[68] + dataBeReceive.DataBuff[69]*256 ;
    dataInput.InEQ.EQ2.HL_db_AP_Flag = dataBeReceive.DataBuff[70];
    dataInput.InEQ.EQ2.type = dataBeReceive.DataBuff[71];

    dataInput.InEQ.EQ3.freq = dataBeReceive.DataBuff[72] + dataBeReceive.DataBuff[73]*256 ;
    dataInput.InEQ.EQ3.level = dataBeReceive.DataBuff[74] + dataBeReceive.DataBuff[75]*256 ;
    dataInput.InEQ.EQ3.bw = dataBeReceive.DataBuff[76] + dataBeReceive.DataBuff[77]*256 ;
    dataInput.InEQ.EQ3.HL_db_AP_Flag = dataBeReceive.DataBuff[78];
    dataInput.InEQ.EQ3.type = dataBeReceive.DataBuff[79];

    dataInput.InEQ.EQ4.freq = dataBeReceive.DataBuff[80] + dataBeReceive.DataBuff[81]*256 ;
    dataInput.InEQ.EQ4.level = dataBeReceive.DataBuff[82] + dataBeReceive.DataBuff[83]*256 ;
    dataInput.InEQ.EQ4.bw = dataBeReceive.DataBuff[84] + dataBeReceive.DataBuff[85]*256 ;
    dataInput.InEQ.EQ4.HL_db_AP_Flag = dataBeReceive.DataBuff[86];
    dataInput.InEQ.EQ4.type = dataBeReceive.DataBuff[87];

    dataInput.InEQ.EQ5.freq = dataBeReceive.DataBuff[88] + dataBeReceive.DataBuff[89]*256 ;
    dataInput.InEQ.EQ5.level = dataBeReceive.DataBuff[90] + dataBeReceive.DataBuff[91]*256 ;
    dataInput.InEQ.EQ5.bw = dataBeReceive.DataBuff[92] + dataBeReceive.DataBuff[93]*256 ;
    dataInput.InEQ.EQ5.HL_db_AP_Flag = dataBeReceive.DataBuff[94];
    dataInput.InEQ.EQ5.type = dataBeReceive.DataBuff[95];

    dataInput.InEQ.EQ6.freq = dataBeReceive.DataBuff[96] + dataBeReceive.DataBuff[97]*256 ;
    dataInput.InEQ.EQ6.level = dataBeReceive.DataBuff[98] + dataBeReceive.DataBuff[99]*256 ;
    dataInput.InEQ.EQ6.bw = dataBeReceive.DataBuff[100] + dataBeReceive.DataBuff[101]*256 ;
    dataInput.InEQ.EQ6.HL_db_AP_Flag = dataBeReceive.DataBuff[102];
    dataInput.InEQ.EQ6.type = dataBeReceive.DataBuff[103];

    dataInput.InEQ.EQ7.freq = dataBeReceive.DataBuff[104] + dataBeReceive.DataBuff[105]*256 ;
    dataInput.InEQ.EQ7.level = dataBeReceive.DataBuff[106] + dataBeReceive.DataBuff[107]*256 ;
    dataInput.InEQ.EQ7.bw = dataBeReceive.DataBuff[108] + dataBeReceive.DataBuff[109]*256 ;
    dataInput.InEQ.EQ7.HL_db_AP_Flag = dataBeReceive.DataBuff[110];
    dataInput.InEQ.EQ7.type = dataBeReceive.DataBuff[111];

    dataInput.InEQ.EQ8.freq = dataBeReceive.DataBuff[112] + dataBeReceive.DataBuff[113]*256 ;
    dataInput.InEQ.EQ8.level = dataBeReceive.DataBuff[114] + dataBeReceive.DataBuff[115]*256 ;
    dataInput.InEQ.EQ8.bw = dataBeReceive.DataBuff[116] + dataBeReceive.DataBuff[117]*256 ;
    dataInput.InEQ.EQ8.HL_db_AP_Flag = dataBeReceive.DataBuff[118];
    dataInput.InEQ.EQ8.type = dataBeReceive.DataBuff[119];

    dataInput.InEQ.EQ9.freq = dataBeReceive.DataBuff[120] + dataBeReceive.DataBuff[121]*256 ;
    dataInput.InEQ.EQ9.level = dataBeReceive.DataBuff[122] + dataBeReceive.DataBuff[123]*256 ;
    dataInput.InEQ.EQ9.bw = dataBeReceive.DataBuff[124] + dataBeReceive.DataBuff[125]*256 ;
    dataInput.InEQ.EQ9.HL_db_AP_Flag = dataBeReceive.DataBuff[126];
    dataInput.InEQ.EQ9.type = dataBeReceive.DataBuff[127];

    //HPF
    dataInput.HPFData.HL_freq = dataBeReceive.DataBuff[128] + dataBeReceive.DataBuff[129]*256 ;
    // console.log('dataInput.HPFData.HL_freq = dataBeReceive.DataBuff[128] + dataBeReceive.DataBuff[129]*256 :' + dataBeReceive.DataBuff[128] + dataBeReceive.DataBuff[129]*256);
    dataInput.HPFData.HL_Type = dataBeReceive.DataBuff[130];
    dataInput.HPFData.HL_Oct  = dataBeReceive.DataBuff[131];
    dataInput.HPFData.LR_Level = dataBeReceive.DataBuff[132];

    //LPF
    dataInput.LPFData.HL_freq = dataBeReceive.DataBuff[136] + dataBeReceive.DataBuff[137]*256 ;
    dataInput.LPFData.HL_Type = dataBeReceive.DataBuff[138];
    dataInput.LPFData.HL_Oct  = dataBeReceive.DataBuff[139];
    dataInput.LPFData.LR_Level = dataBeReceive.DataBuff[140];

    //AGC
    dataInput.agLevel = dataBeReceive.DataBuff[144] + dataBeReceive.DataBuff[145]*256 ;
    dataInput.agThreshold = dataBeReceive.DataBuff[146] + dataBeReceive.DataBuff[147]*256 ;
    //console.log('look at me____________________ agThreshold__H:' + dataBeReceive.DataBuff[146] + '    L:' + dataBeReceive.DataBuff[147]);
    dataInput.agRelease = dataBeReceive.DataBuff[148] + dataBeReceive.DataBuff[149]*256  ;
    dataInput.agAttack = dataBeReceive.DataBuff[150];
    dataInput.agRatio = dataBeReceive.DataBuff[151];
    // console.log('look at me________agLevel____________H:' + dataBeReceive.DataBuff[145]  + '     L:' + dataBeReceive.DataBuff[144]);
    // console.log('look at me________agThreshold____________H:' + dataBeReceive.DataBuff[147]  + '     L:' + dataBeReceive.DataBuff[146]);
    // console.log('look at me________agRelease____________H:' + dataBeReceive.DataBuff[149]  + '     L:' + dataBeReceive.DataBuff[148]);
    // console.log('look at me________agAttack____________:' + dataBeReceive.DataBuff[150]);
    // console.log('look at me________agRatio___________:' + dataBeReceive.DataBuff[151]);


    //COM
    dataInput.compLevel = dataBeReceive.DataBuff[152] + dataBeReceive.DataBuff[153]*256;
    dataInput.compRelease = dataBeReceive.DataBuff[154] + dataBeReceive.DataBuff[155]*256;
    dataInput.compAttack = dataBeReceive.DataBuff[156];
    dataInput.compRatio = dataBeReceive.DataBuff[157];
    // console.log('look at me_______compLevel_____________H:' + dataBeReceive.DataBuff[151]  + '     L:' + dataBeReceive.DataBuff[150]);
    // console.log('look at me_______compRelease_____________H:' + dataBeReceive.DataBuff[153]  + '     L:' + dataBeReceive.DataBuff[152]);
    // console.log('look at me_______compAttack_____________H:' + dataBeReceive.DataBuff[155]  + '     L:' + dataBeReceive.DataBuff[154]);
    // console.log('look at me_______compRatio_____________:' + dataBeReceive.DataBuff[156]);


    return true;

}

function disposeOutRouteData(userID, channelID) {
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
            break;
        case 1:
            dataOut = dataGroup.dataOut2;
            break;
        case 2:
            dataOut = dataGroup.dataOut3;
            break;
        case 3:
            dataOut = dataGroup.dataOut4;
            break;
        case 4:
            dataOut = dataGroup.dataOut5;
            break;
        case 5:
            dataOut = dataGroup.dataOut6;
            break;
        case 6:
            dataOut = dataGroup.dataOut7;
            break;
        case 7:
            dataOut = dataGroup.dataOut8;
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
        //dataOut.name[i] = dataBeReceive.DataBuff[i];
        nameTemp.push(dataBeReceive.DataBuff[i]);
        nameShow.push(dataBeReceive.DataBuff[i].toString(16))
    }

    // console.log('dataOut_name:' + nameShow);
    dataOut.name = bytesToStringNot32(nameTemp);
    // console.log("channelID.name:"+ channelID + " : " + dataOut.name);
    //ID = 1
    index = indexStart[1];
    dataOut.mute = dataBeReceive.DataBuff[index++];
    dataOut.polar = dataBeReceive.DataBuff[index++];
    dataOut.delay = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.gain = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.outLinkSel = dataBeReceive.DataBuff[index++];
    linkOutSelect[channelID] = dataOut.outLinkSel;
    dataOut.secondDelay = dataBeReceive.DataBuff[index];

    //ID = 2
    index = indexStart[2];
    dataOut.allvolume = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index]*256;

    //ID = 3
    index = indexStart[3];
    dataOut.sourceA = dataBeReceive.DataBuff[index++];
    dataOut.sourceB = dataBeReceive.DataBuff[index++];
    dataOut.sourceC = dataBeReceive.DataBuff[index++];
    dataOut.sourceD = dataBeReceive.DataBuff[index++];
    dataOut.sourceE = dataBeReceive.DataBuff[index++];
    dataOut.sourceF = dataBeReceive.DataBuff[index++];
    dataOut.sourceG = dataBeReceive.DataBuff[index++];
    dataOut.sourceH = dataBeReceive.DataBuff[index];

    //ID = 4
    index = indexStart[4];
    dataOut.OutEQ.EQ1.freq = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ1.level = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ1.bw = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ1.HL_db_AP_Flag = dataBeReceive.DataBuff[index++];
    dataOut.OutEQ.EQ1.type = dataBeReceive.DataBuff[index];

    //ID = 5
    index = indexStart[5];
    dataOut.OutEQ.EQ2.freq = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ2.level = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ2.bw = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ2.HL_db_AP_Flag = dataBeReceive.DataBuff[index++];
    dataOut.OutEQ.EQ2.type = dataBeReceive.DataBuff[index];

    //ID = 6
    index = indexStart[6];
    dataOut.OutEQ.EQ3.freq = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ3.level = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ3.bw = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ3.HL_db_AP_Flag = dataBeReceive.DataBuff[index++];
    dataOut.OutEQ.EQ3.type = dataBeReceive.DataBuff[index];

    //ID = 7
    index = indexStart[7];
    dataOut.OutEQ.EQ4.freq = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ4.level = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ4.bw = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ4.HL_db_AP_Flag = dataBeReceive.DataBuff[index++];
    dataOut.OutEQ.EQ4.type = dataBeReceive.DataBuff[index];

    //ID = 8
    index = indexStart[8];
    dataOut.OutEQ.EQ5.freq = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ5.level = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ5.bw = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ5.HL_db_AP_Flag = dataBeReceive.DataBuff[index++];
    dataOut.OutEQ.EQ5.type = dataBeReceive.DataBuff[index];

    //ID = 9
    index = indexStart[9];
    dataOut.OutEQ.EQ6.freq = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ6.level = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ6.bw = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ6.HL_db_AP_Flag = dataBeReceive.DataBuff[index++];
    dataOut.OutEQ.EQ6.type = dataBeReceive.DataBuff[index];

    //ID = 10
    index = indexStart[10];
    dataOut.OutEQ.EQ7.freq = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ7.level = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ7.bw = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ7.HL_db_AP_Flag = dataBeReceive.DataBuff[index++];
    dataOut.OutEQ.EQ7.type = dataBeReceive.DataBuff[index];

    //ID = 11
    index = indexStart[11];
    dataOut.OutEQ.EQ8.freq = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ8.level = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ8.bw = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ8.HL_db_AP_Flag = dataBeReceive.DataBuff[index++];
    dataOut.OutEQ.EQ8.type = dataBeReceive.DataBuff[index];

    //ID = 12
    index = indexStart[12];
    dataOut.OutEQ.EQ9.freq = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ9.level = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ9.bw = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.OutEQ.EQ9.HL_db_AP_Flag = dataBeReceive.DataBuff[index++];
    dataOut.OutEQ.EQ9.type = dataBeReceive.DataBuff[index];

    //ID = 13
    index = indexStart[13];
    dataOut.HPFData.HL_freq = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    // console.log('dataOut.HPFData.HL_freq' + dataOut.HPFData.HL_freq);
    dataOut.HPFData.HL_Type = dataBeReceive.DataBuff[index++];
    dataOut.HPFData.HL_Oct = dataBeReceive.DataBuff[index++];
    dataOut.HPFData.LR_Level = dataBeReceive.DataBuff[index];

    //ID = 14
    index = indexStart[14];
    dataOut.LPFData.HL_freq = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.LPFData.HL_Type = dataBeReceive.DataBuff[index++];
    dataOut.LPFData.HL_Oct = dataBeReceive.DataBuff[index++];
    dataOut.LPFData.LR_Level = dataBeReceive.DataBuff[index];

    //ID = 15
    index = indexStart[15];
    dataOut.compLevel = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.compR = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.compAttack = dataBeReceive.DataBuff[index++];
    dataOut.compRatio = dataBeReceive.DataBuff[index++];

    //ID = 16
    index = indexStart[16];
    dataOut.limT = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.limRelease = dataBeReceive.DataBuff[index++] + dataBeReceive.DataBuff[index++]*256 ;
    dataOut.limAttack = dataBeReceive.DataBuff[index++];

    if((userID === 30) && (channelID === 7)) { //读完所有30组数据
        console.log('读完所有30组数据');
        curtainOption(1);
        dealwithAllProgramString();
    }

    return true;
}

function disposeAllInRouteData() {

    disposeInRouteData(dataBeReceive.Userid,dataBeReceive.ChannelID);
}

function disposeAllOutRouteData() {
    disposeOutRouteData(dataBeReceive.Userid,dataBeReceive.ChannelID);
}

function disposeSystemData() {
    var i;

    switch(dataBeReceive.ChannelID)
	{
	case messageType.PC_RW_PGNAME:	//用户名称
		// if(currentSystemData.m_nDevSSet === 0)
		// {
		// 	alert("33");
		// }
        if(dataBeReceive.Userid > 0)
		{
			 for(i=0;i<messageType.PG_Name_LEN;i++)
			 {
			 	currentAllGroupData[dataBeReceive.Userid-1].name[i] = dataBeReceive.DataBuff[i];
			 }
             programNameArray[dataBeReceive.Userid-1] = bytesToStringNot32(currentAllGroupData[dataBeReceive.Userid-1].name);
			 console.log('第' + dataBeReceive.Userid + '的组名: ' + bytesToStringNot32(currentAllGroupData[dataBeReceive.Userid-1].name));
		}
		else
		{
			for(i=0;i<messageType.PG_Name_LEN;i++)
			{
				currentPGName[i] = dataBeReceive.DataBuff[i];
				currentGroupData.name[i] = dataBeReceive.DataBuff[i];
			}
			console.log('读取到的组名: ' + bytesToStringNot32(currentPGName));

		}
		break;
	case messageType.Device_Type: //设备类型24 26 28 36 46 48
        deviceType = parseInt(dataBeReceive.DataBuff[0]);
        console.log('设备类型： ' + deviceType);
        setDeviceTypeDisplay(deviceType);
		break;
	case messageType.PC_Information_ID: //界面信息
		var length = dataBeReceive.DataLen;
		if(dataBeReceive.DataLen > messageType.Soft_Information_Lenght)
		{
			length = messageType.Soft_Information_Lenght;
		}
		for(i=0;i<length;i++) //Soft_Information_Lenght = 48 每行24个
		{
			currentSystemData.m_nInformation[i] = dataBeReceive.DataBuff[i];
		}
		//alert('读取到界面信息:' + bytesToString(currentSystemData.m_nInformation) );
        currentSystemData.firstRow = bytesToString(currentSystemData.m_nInformation.slice(0,23));
		currentSystemData.secondRow = bytesToString(currentSystemData.m_nInformation.slice(24));

		document.getElementById('text_first_line').value = currentSystemData.firstRow;
		document.getElementById('text_second_line').value = currentSystemData.secondRow;
        console.log('读取到界面信息:' + bytesToString(currentSystemData.m_nInformation) );
		break;
	case messageType.PC_Back_Light_ID: //背景灯
		currentSystemData.m_nBack_Light = dataBeReceive.DataBuff[0];
		//alert('读取到背景灯');
        renewSystemCurtain();
		console.log("读取到背景灯");
		break;
	case messageType.PC_Device_ID: //设备ID
        //alert('读取到设备ID信息');
        console.log("读取到设备ID信息");
		break;
	case messageType.PC_Led_ID: //请求LED灯
        disposeLedData();
        //alert('读取到LED灯信息');
        //console.log("读取到LED灯信息");
		break;
	case messageType.Software_Version: //软件版本信息
        deepCopyValue(currentSoftVersionArray,dataBeReceive.DataBuff);
        currentSoftVersion = bytesToStringNot32(dataBeReceive.DataBuff);
        //alert('读取到软件版本信息' +　currentSoftVersion);
        console.log('读取到软件版本信息' +　currentSoftVersion);
		break;
        case messageType.Device_StartUp_Set: //软件启动设置
        //alert('软件启动设置');
        console.log("软件启动设置： " + dataBeReceive.DataBuff);
        currentSystemData.m_nModify_Flag = dataBeReceive.DataBuff[0];    //  修改 标记 0:未      修改  1:已修改
        currentSystemData.m_nMCU_PG_Type = dataBeReceive.DataBuff[1];    //  修改 程序 类型:     0:MCU程序  1:PC 程序
        currentSystemData.m_nSave_Cur_PG_ID = dataBeReceive.DataBuff[2];   //  保持 当前 程序 ID
        currentSystemData.m_nDevSSet = dataBeReceive.DataBuff[3];   //  1:保持当前程序   启动 2:静音启动   3:程序组
        currentSystemData.m_nSetPG_ID = dataBeReceive.DataBuff[4]; //程序组编号  ID
        currentSystemData.Empty = dataBeReceive.DataBuff[5];       //工厂程序数量
        //当以程序组启动时: m_nSave_Cur_PG_ID  与  m_nSetPG_ID  一致  启动的当前程序ID 与程序组编号ID 一致

        renewSystemCurtain();
		break;
	case messageType.Connect_Test_ID:  //联机
        if(dataBeReceive.FrameType = messageType.MCU_Right_Frame){ //正确回应该帧
            console.log('联机测试成功: ' + dataBeReceive.FrameType);
            // disconnectCommunicate();
        } else {
            console.log('联机测试失败: ' + dataBeReceive.FrameType);
        }

	    break;
	}
	return true;

}

function disposeLedData() {
    //console.log("disposeLedData");
    for(var i=0; i<12; i++) {
        currentLedData[i] = dataBeReceive.DataBuff[i];
    }
    //console.log("currentLedData:" + currentLedData);

    for(i=0; i<8; i++) {
        if(currentLedData[i] !== oldLedData[i]){
            //console.log("currentLedData:" + i + ":" + currentLedData[i]);
            oldLedData[i] =  currentLedData[i];
            refreshOutLedData(currentLedData[i], i);
        }
    }

    for(i=8; i<12; i++) {
        if(currentLedData[i] !== oldLedData[i]){
            oldLedData[i] =  currentLedData[i];
            refreshInputLedData(currentLedData[i], i-8);
        }
    }
}

function clearLedDisplay() {
    //输入信号灯
    document.getElementById('lamp_inputA_negative_24dB').style.visibility = "hidden";
    document.getElementById('lamp_inputA_negative_12dB').style.visibility = "hidden";
    document.getElementById('lamp_inputA_0dB').style.visibility = "hidden";
    document.getElementById('lamp_inputA_comp').style.visibility = "hidden";
    document.getElementById('lamp_inputA_agc').style.visibility = "hidden";
    document.getElementById('lamp_inputA_clip').style.visibility = "hidden";

    document.getElementById('lamp_inputB_negative_24dB').style.visibility = "hidden";
    document.getElementById('lamp_inputB_negative_12dB').style.visibility = "hidden";
    document.getElementById('lamp_inputB_0dB').style.visibility = "hidden";
    document.getElementById('lamp_inputB_comp').style.visibility = "hidden";
    document.getElementById('lamp_inputB_agc').style.visibility = "hidden";
    document.getElementById('lamp_inputB_clip').style.visibility = "hidden";

    document.getElementById('lamp_inputC_negative_24dB').style.visibility = "hidden";
    document.getElementById('lamp_inputC_negative_12dB').style.visibility = "hidden";
    document.getElementById('lamp_inputC_0dB').style.visibility = "hidden";
    document.getElementById('lamp_inputC_comp').style.visibility = "hidden";
    document.getElementById('lamp_inputC_agc').style.visibility = "hidden";
    document.getElementById('lamp_inputC_clip').style.visibility = "hidden";

    document.getElementById('lamp_inputD_negative_24dB').style.visibility = "hidden";
    document.getElementById('lamp_inputD_negative_12dB').style.visibility = "hidden";
    document.getElementById('lamp_inputD_0dB').style.visibility = "hidden";
    document.getElementById('lamp_inputD_comp').style.visibility = "hidden";
    document.getElementById('lamp_inputD_agc').style.visibility = "hidden";
    document.getElementById('lamp_inputD_clip').style.visibility = "hidden";

    //输出信号灯
    document.getElementById('lamp_out1_negative_24dB').style.visibility = "hidden";
    document.getElementById('lamp_out1_negative_12dB').style.visibility = "hidden";
    document.getElementById('lamp_out1_0dB').style.visibility = "hidden";
    document.getElementById('lamp_out1_comp').style.visibility = "hidden";
    document.getElementById('lamp_out1_agc').style.visibility = "hidden";
    document.getElementById('lamp_out1_clip').style.visibility = "hidden";

    document.getElementById('lamp_out2_negative_24dB').style.visibility = "hidden";
    document.getElementById('lamp_out2_negative_12dB').style.visibility = "hidden";
    document.getElementById('lamp_out2_0dB').style.visibility = "hidden";
    document.getElementById('lamp_out2_comp').style.visibility = "hidden";
    document.getElementById('lamp_out2_agc').style.visibility = "hidden";
    document.getElementById('lamp_out2_clip').style.visibility = "hidden";

    document.getElementById('lamp_out3_negative_24dB').style.visibility = "hidden";
    document.getElementById('lamp_out3_negative_12dB').style.visibility = "hidden";
    document.getElementById('lamp_out3_0dB').style.visibility = "hidden";
    document.getElementById('lamp_out3_comp').style.visibility = "hidden";
    document.getElementById('lamp_out3_agc').style.visibility = "hidden";
    document.getElementById('lamp_out3_clip').style.visibility = "hidden";

    document.getElementById('lamp_out4_negative_24dB').style.visibility = "hidden";
    document.getElementById('lamp_out4_negative_12dB').style.visibility = "hidden";
    document.getElementById('lamp_out4_0dB').style.visibility = "hidden";
    document.getElementById('lamp_out4_comp').style.visibility = "hidden";
    document.getElementById('lamp_out4_agc').style.visibility = "hidden";
    document.getElementById('lamp_out4_clip').style.visibility = "hidden";

    document.getElementById('lamp_out5_negative_24dB').style.visibility = "hidden";
    document.getElementById('lamp_out5_negative_12dB').style.visibility = "hidden";
    document.getElementById('lamp_out5_0dB').style.visibility = "hidden";
    document.getElementById('lamp_out5_comp').style.visibility = "hidden";
    document.getElementById('lamp_out5_agc').style.visibility = "hidden";
    document.getElementById('lamp_out5_clip').style.visibility = "hidden";

    document.getElementById('lamp_out6_negative_24dB').style.visibility = "hidden";
    document.getElementById('lamp_out6_negative_12dB').style.visibility = "hidden";
    document.getElementById('lamp_out6_0dB').style.visibility = "hidden";
    document.getElementById('lamp_out6_comp').style.visibility = "hidden";
    document.getElementById('lamp_out6_agc').style.visibility = "hidden";
    document.getElementById('lamp_out6_clip').style.visibility = "hidden";

    document.getElementById('lamp_out7_negative_24dB').style.visibility = "hidden";
    document.getElementById('lamp_out7_negative_12dB').style.visibility = "hidden";
    document.getElementById('lamp_out7_0dB').style.visibility = "hidden";
    document.getElementById('lamp_out7_comp').style.visibility = "hidden";
    document.getElementById('lamp_out7_agc').style.visibility = "hidden";
    document.getElementById('lamp_out7_clip').style.visibility = "hidden";

    document.getElementById('lamp_out8_negative_24dB').style.visibility = "hidden";
    document.getElementById('lamp_out8_negative_12dB').style.visibility = "hidden";
    document.getElementById('lamp_out8_0dB').style.visibility = "hidden";
    document.getElementById('lamp_out8_comp').style.visibility = "hidden";
    document.getElementById('lamp_out8_agc').style.visibility = "hidden";
    document.getElementById('lamp_out8_clip').style.visibility = "hidden";
}


function refreshInputLedData(data,index) {

    // console.log("data:" + data + "  data_l:" + (data & 0x0f));
    //console.log("refreshInputLedData");
    switch(data & 0x0f){
        case 0:
            inputLedData.negative24dB = false;
            inputLedData.negative12dB = false;
            inputLedData.zeroDB = false;
            inputLedData.clip = false;
            break;
        case 1:
            inputLedData.negative24dB = false;
            inputLedData.negative12dB = false;
            inputLedData.zeroDB = false;
            inputLedData.clip = false;
            break;
        case 2:
            inputLedData.negative24dB = true;
            inputLedData.negative12dB = false;
            inputLedData.zeroDB = false;
            inputLedData.clip = false;
            break;
        case 3:
            inputLedData.negative24dB = true;
            inputLedData.negative12dB = true;
            inputLedData.zeroDB = false;
            inputLedData.clip = false;
            break;
        case 4:
            inputLedData.negative24dB = true;
            inputLedData.negative12dB = true;
            inputLedData.zeroDB = true;
            inputLedData.clip = false;
            break;
        case 5:
            inputLedData.negative24dB = true;
            inputLedData.negative12dB = true;
            inputLedData.zeroDB = true;
            inputLedData.clip = true;
            break;
        default:
            inputLedData.negative24dB = false;
            inputLedData.negative12dB = false;
            inputLedData.zeroDB = false;
            inputLedData.clip = false;
            break;
    }

    inputLedData.comp = ((data & 0x40) === 0x40);
    inputLedData.agc = ((data & 0x20) === 0x20);

    // console.log("inputLedData.comp :" + inputLedData.comp + "  inputLedData.agc:" + inputLedData.agc);
    refreshInputLedDisplay(index);
}


function refreshInputLedDisplay(index) {
    //console.log("refreshInputLedDisplay");
    var element24,element12,element0,elementComp,elementAgc,elementClip;
    switch (index) {
        case 0:
            element24 = document.getElementById('lamp_inputA_negative_24dB');
            element12 = document.getElementById('lamp_inputA_negative_12dB');
            element0 = document.getElementById('lamp_inputA_0dB');
            elementComp = document.getElementById('lamp_inputA_comp');
            elementAgc = document.getElementById('lamp_inputA_agc');
            elementClip = document.getElementById('lamp_inputA_clip');
            break;
        case 1:
            element24 = document.getElementById('lamp_inputB_negative_24dB');
            element12 = document.getElementById('lamp_inputB_negative_12dB');
            element0 = document.getElementById('lamp_inputB_0dB');
            elementComp = document.getElementById('lamp_inputB_comp');
            elementAgc = document.getElementById('lamp_inputB_agc');
            elementClip = document.getElementById('lamp_inputB_clip');
            break;
        case 2:
            element24 = document.getElementById('lamp_inputC_negative_24dB');
            element12 = document.getElementById('lamp_inputC_negative_12dB');
            element0 = document.getElementById('lamp_inputC_0dB');
            elementComp = document.getElementById('lamp_inputC_comp');
            elementAgc = document.getElementById('lamp_inputC_agc');
            elementClip = document.getElementById('lamp_inputC_clip');
            break;
        case 3:
            element24 = document.getElementById('lamp_inputD_negative_24dB');
            element12 = document.getElementById('lamp_inputD_negative_12dB');
            element0 = document.getElementById('lamp_inputD_0dB');
            elementComp = document.getElementById('lamp_inputD_comp');
            elementAgc = document.getElementById('lamp_inputD_agc');
            elementClip = document.getElementById('lamp_inputD_clip');
            break;
        default:

            break;
    }

    // console.log("index:" + index + " inputLedData" + inputLedData.negative24dB+ "," +
    //           inputLedData.negative12dB + ","  +  inputLedData.zeroDB +   ","  +
    //           inputLedData.comp + ","  +  inputLedData.agc + "," +inputLedData.clip);
    if(inputLedData.negative24dB){
        element24.style.visibility = "visible";
    } else {
        element24.style.visibility = "hidden";
    }

    if(inputLedData.negative12dB) {
        element12.style.visibility = "visible";
    } else {
        element12.style.visibility = "hidden";
    }

    if(inputLedData.zeroDB){
        element0.style.visibility = "visible";
    } else {
        element0.style.visibility = "hidden";
    }

    if(inputLedData.comp){
        elementComp.style.visibility = "visible";
    } else {
        elementComp.style.visibility = "hidden";
    }

    if(inputLedData.agc){
        elementAgc.style.visibility = "visible";
    } else {
        elementAgc.style.visibility = "hidden";
    }

    if(inputLedData.clip){
        elementClip.style.visibility = "visible";
    } else {
        elementClip.style.visibility = "hidden";
    }

}


function refreshOutLedData(data, index) {
    switch(data & 0x0f){
        case 0:
            outLedData.negative24dB = false;
            outLedData.negative12dB = false;
            outLedData.zeroDB = false;
            outLedData.clip = false;
            break;
        case 1:
            outLedData.negative24dB = false;
            outLedData.negative12dB = false;
            outLedData.zeroDB = false;
            outLedData.clip = false;
            break;
        case 2:
            outLedData.negative24dB = true;
            outLedData.negative12dB = false;
            outLedData.zeroDB = false;
            outLedData.clip = false;
            break;
        case 3:
            outLedData.negative24dB = true;
            outLedData.negative12dB = true;
            outLedData.zeroDB = false;
            outLedData.clip = false;
            break;
        case 4:
            outLedData.negative24dB = true;
            outLedData.negative12dB = true;
            outLedData.zeroDB = true;
            outLedData.clip = false;
            break;
        case 5:
            outLedData.negative24dB = true;
            outLedData.negative12dB = true;
            outLedData.zeroDB = true;
            outLedData.clip = true;
            break;
    }

    outLedData.comp = ((data & 0x40) === 0x40);
    outLedData.limt = ((data & 0x80) === 0x80);

    refreshOutLedDisplay(index);
}

function refreshOutLedDisplay(index) {
    var element24,element12,element0,elementComp,elementAgc,elementClip;
    switch (index) {
        case 0:
            element24 = document.getElementById('lamp_out1_negative_24dB');
            element12 = document.getElementById('lamp_out1_negative_12dB');
            element0 = document.getElementById('lamp_out1_0dB');
            elementComp = document.getElementById('lamp_out1_comp');
            elementAgc = document.getElementById('lamp_out1_agc');
            elementClip = document.getElementById('lamp_out1_clip');
            break;
        case 1:
            element24 = document.getElementById('lamp_out2_negative_24dB');
            element12 = document.getElementById('lamp_out2_negative_12dB');
            element0 = document.getElementById('lamp_out2_0dB');
            elementComp = document.getElementById('lamp_out2_comp');
            elementAgc = document.getElementById('lamp_out2_agc');
            elementClip = document.getElementById('lamp_out2_clip');
            break;
        case 2:
            element24 = document.getElementById('lamp_out3_negative_24dB');
            element12 = document.getElementById('lamp_out3_negative_12dB');
            element0 = document.getElementById('lamp_out3_0dB');
            elementComp = document.getElementById('lamp_out3_comp');
            elementAgc = document.getElementById('lamp_out3_agc');
            elementClip = document.getElementById('lamp_out3_clip');
            break;
        case 3:
            element24 = document.getElementById('lamp_out4_negative_24dB');
            element12 = document.getElementById('lamp_out4_negative_12dB');
            element0 = document.getElementById('lamp_out4_0dB');
            elementComp = document.getElementById('lamp_out4_comp');
            elementAgc = document.getElementById('lamp_out4_agc');
            elementClip = document.getElementById('lamp_out4_clip');
            break;
        case 4:
            element24 = document.getElementById('lamp_out5_negative_24dB');
            element12 = document.getElementById('lamp_out5_negative_12dB');
            element0 = document.getElementById('lamp_out5_0dB');
            elementComp = document.getElementById('lamp_out5_comp');
            elementAgc = document.getElementById('lamp_out5_agc');
            elementClip = document.getElementById('lamp_out5_clip');
            break;
        case 5:
            element24 = document.getElementById('lamp_out6_negative_24dB');
            element12 = document.getElementById('lamp_out6_negative_12dB');
            element0 = document.getElementById('lamp_out6_0dB');
            elementComp = document.getElementById('lamp_out6_comp');
            elementAgc = document.getElementById('lamp_out6_agc');
            elementClip = document.getElementById('lamp_out6_clip');
            break;
        case 6:
            element24 = document.getElementById('lamp_out7_negative_24dB');
            element12 = document.getElementById('lamp_out7_negative_12dB');
            element0 = document.getElementById('lamp_out7_0dB');
            elementComp = document.getElementById('lamp_out7_comp');
            elementAgc = document.getElementById('lamp_out7_agc');
            elementClip = document.getElementById('lamp_out7_clip');
            break;
        case 7:
            element24 = document.getElementById('lamp_out8_negative_24dB');
            element12 = document.getElementById('lamp_out8_negative_12dB');
            element0 = document.getElementById('lamp_out8_0dB');
            elementComp = document.getElementById('lamp_out8_comp');
            elementAgc = document.getElementById('lamp_out8_agc');
            elementClip = document.getElementById('lamp_out8_clip');
            break;
    }

    if(outLedData.negative24dB){
        element24.style.visibility = "visible";
    } else {
        element24.style.visibility = "hidden";
    }

    if(outLedData.negative12dB) {
        element12.style.visibility = "visible";
    } else {
        element12.style.visibility = "hidden";
    }

    if(outLedData.zeroDB){
        element0.style.visibility = "visible";
    } else {
        element0.style.visibility = "hidden";
    }

    if(outLedData.comp){
        elementComp.style.visibility = "visible";
    } else {
        elementComp.style.visibility = "hidden";
    }

    if(outLedData.limt){
        elementAgc.style.visibility = "visible";
    } else {
        elementAgc.style.visibility = "hidden";
    }

    if(outLedData.clip){
        elementClip.style.visibility = "visible";
    } else {
        elementClip.style.visibility = "hidden";
    }
}

function disposeProgramLockData(useId) {
    var i;
    var index;
    var lockData;
    if(useId > 0) {
        lockData = currentAllGroupData[useId - 1].m_nLockData;
    } else {
        lockData = currentLockData;
    }

    index = 0;
    //alert('读取到锁定数据');
    console.log("读取到锁定数据");
    //input lock data
    lockData.nIn_LockData.nIn_Name = dataBeReceive.DataBuff[index++];                             //  输入  通道  名称
    lockData.nIn_LockData.nIn_Mute = dataBeReceive.DataBuff[index++];                             //  输入  静音
    lockData.nIn_LockData.nIn_Delay = dataBeReceive.DataBuff[index++];                            //  输入  延时
    lockData.nIn_LockData.nIn_Pol = dataBeReceive.DataBuff[index++];                              //  输入  极性
    lockData.nIn_LockData.nIn_Gain = dataBeReceive.DataBuff[index++];                             //  输入  增益
    lockData.nIn_LockData.nIn_NoiseGate = dataBeReceive.DataBuff[index++];                        //  输入  矩阵
    lockData.nIn_LockData.nIn_Comp_AG = dataBeReceive.DataBuff[index++];                          //  输入  压线
    lockData.nIn_LockData.nIn_DEQ = dataBeReceive.DataBuff[index++];                              //  输入  动态均衡

    lockData.nIn_LockData.nIn_EQ = dataBeReceive.DataBuff[index++];                               //  输入  EQ
    lockData.nIn_LockData.nIn_Link = dataBeReceive.DataBuff[index++];                             //  输入  联调
    for(i=0; i<16; i++){
        lockData.nIn_LockData.In_Empty[i] = dataBeReceive.DataBuff[i+index];
    }
    index = 26;
    for(i=0; i<6; i++) {
        lockData.nIn_LockData.In_Lock_PW[i] = dataBeReceive.DataBuff[index+i];
    }
    // console.log('dataBeReceive[26]:' + dataBeReceive.DataBuff[26]);
    // console.log('dataBeReceive[27]:' + dataBeReceive.DataBuff[27]);
    // console.log('dataBeReceive[28]:' + dataBeReceive.DataBuff[28]);
    // console.log('dataBeReceive[29]:' + dataBeReceive.DataBuff[29]);
    // console.log('dataBeReceive[30]:' + dataBeReceive.DataBuff[30]);
    // console.log('dataBeReceive[31]:' + dataBeReceive.DataBuff[31]);
    console.log('输入锁定密码：' +　lockData.nIn_LockData.In_Lock_PW);


    //out lock data
    index = 32;
    lockData.nOut_LockData.nOut_Name = dataBeReceive.DataBuff[index++];                             //  输出  通道  名称
    lockData.nOut_LockData.nOut_Mute = dataBeReceive.DataBuff[index++];                             //  输出  静音
    lockData.nOut_LockData.nOut_Delay = dataBeReceive.DataBuff[index++];                            //  输出  延时
    lockData.nOut_LockData.nOut_Pol = dataBeReceive.DataBuff[index++];                              //  输出  极性
    lockData.nOut_LockData.nOut_Gain = dataBeReceive.DataBuff[index++];                             //  输出  增益
    lockData.nOut_LockData.nIn_Matrix = dataBeReceive.DataBuff[index++];                            //  输出  矩阵
    lockData.nOut_LockData.nOut_Comp_LimT = dataBeReceive.DataBuff[index++];                        //  输出  压线
    lockData.nOut_LockData.nOut_EQ = dataBeReceive.DataBuff[index++];                               //  输出  动态均衡

    lockData.nOut_LockData.nOut_Xover = dataBeReceive.DataBuff[index++];                            //  输出  EQ
    lockData.nOut_LockData.nOut_Link = dataBeReceive.DataBuff[index++];                             //  输出  联调
    for(i=0; i<16; i++){
        lockData.nOut_LockData.Out_Empty[i] = dataBeReceive.DataBuff[i+index];
    }
    index = 58;
    for(i=0; i<6; i++) {
        lockData.nOut_LockData.Out_Lock_PW[i] = dataBeReceive.DataBuff[index+i];
    }
    console.log('输出锁定密码：' + lockData.nOut_LockData.Out_Lock_PW);


    //system lock data 无系统锁定数据
    // index = 64;
    // currentLockData.nSys_LockData.nSYS_Load_Data = dataBeReceive.DataBuff[index++];
    // currentLockData.nSys_LockData.nSYS_Save_Data = dataBeReceive.DataBuff[index++];
    // currentLockData.nSys_LockData.nSYS_PC_Del = dataBeReceive.DataBuff[index++];
    // currentLockData.nSys_LockData.nSYS_Copy_Data = dataBeReceive.DataBuff[index++];
    // currentLockData.nSys_LockData.nSYS_Device_ID = dataBeReceive.DataBuff[index++];
    // currentLockData.nSys_LockData.nSYS_Logo = dataBeReceive.DataBuff[index++];
    // currentLockData.nSys_LockData.nSYS_Back_Linght = dataBeReceive.DataBuff[index++];
    // currentLockData.nSys_LockData.nSYS_nPanel = dataBeReceive.DataBuff[index++];
    //
    // currentLockData.nSys_LockData.nSYS_PowerOn = dataBeReceive.DataBuff[index++];
    // for(i=0; i<17; i++){
    //     currentLockData.nSys_LockData.Sys_Empty[i] = dataBeReceive.DataBuff[i+index];
    // }
    // index = 90;
    // for(i=0; i<6; i++) {
    //     currentLockData.nSys_LockData.System_Lock_PW[i] = dataBeReceive.DataBuff[index+i];
    // }
    //
    // console.log('系统密码：' + currentLockData.nSys_LockData.System_Lock_PW);
}


function disposeLockData() {
    var i;
    var index;


    index = 0;
    //alert('读取到锁定数据');
    console.log("读取到锁定数据");
    //input lock data
    currentLockData.nIn_LockData.nIn_Name = dataBeReceive.DataBuff[index++];                             //  输入  通道  名称
	currentLockData.nIn_LockData.nIn_Mute = dataBeReceive.DataBuff[index++];                             //  输入  静音
	currentLockData.nIn_LockData.nIn_Delay = dataBeReceive.DataBuff[index++];                            //  输入  延时
	currentLockData.nIn_LockData.nIn_Pol = dataBeReceive.DataBuff[index++];                              //  输入  极性
	currentLockData.nIn_LockData.nIn_Gain = dataBeReceive.DataBuff[index++];                             //  输入  增益
	currentLockData.nIn_LockData.nIn_NoiseGate = dataBeReceive.DataBuff[index++];                        //  输入  矩阵
	currentLockData.nIn_LockData.nIn_Comp_AG = dataBeReceive.DataBuff[index++];                          //  输入  压线
	currentLockData.nIn_LockData.nIn_DEQ = dataBeReceive.DataBuff[index++];                              //  输入  动态均衡

	currentLockData.nIn_LockData.nIn_EQ = dataBeReceive.DataBuff[index++];                               //  输入  EQ
	currentLockData.nIn_LockData.nIn_Link = dataBeReceive.DataBuff[index++];                             //  输入  联调
    for(i=0; i<16; i++){
        currentLockData.nIn_LockData.In_Empty[i] = dataBeReceive.DataBuff[i+index];
    }
    index = 26;
    for(i=0; i<6; i++) {
        currentLockData.nIn_LockData.In_Lock_PW[i] = dataBeReceive.DataBuff[index+i];
    }
    // console.log('dataBeReceive[26]:' + dataBeReceive.DataBuff[26]);
    // console.log('dataBeReceive[27]:' + dataBeReceive.DataBuff[27]);
    // console.log('dataBeReceive[28]:' + dataBeReceive.DataBuff[28]);
    // console.log('dataBeReceive[29]:' + dataBeReceive.DataBuff[29]);
    // console.log('dataBeReceive[30]:' + dataBeReceive.DataBuff[30]);
    // console.log('dataBeReceive[31]:' + dataBeReceive.DataBuff[31]);
    console.log('输入锁定密码：' +　currentLockData.nIn_LockData.In_Lock_PW);


    //out lock data
    index = 32;
    currentLockData.nOut_LockData.nOut_Name = dataBeReceive.DataBuff[index++];                             //  输出  通道  名称
	currentLockData.nOut_LockData.nOut_Mute = dataBeReceive.DataBuff[index++];                             //  输出  静音
	currentLockData.nOut_LockData.nOut_Delay = dataBeReceive.DataBuff[index++];                            //  输出  延时
	currentLockData.nOut_LockData.nOut_Pol = dataBeReceive.DataBuff[index++];                              //  输出  极性
	currentLockData.nOut_LockData.nOut_Gain = dataBeReceive.DataBuff[index++];                             //  输出  增益
	currentLockData.nOut_LockData.nIn_Matrix = dataBeReceive.DataBuff[index++];                            //  输出  矩阵
	currentLockData.nOut_LockData.nOut_Comp_LimT = dataBeReceive.DataBuff[index++];                        //  输出  压线
	currentLockData.nOut_LockData.nOut_EQ = dataBeReceive.DataBuff[index++];                               //  输出  动态均衡

	currentLockData.nOut_LockData.nOut_Xover = dataBeReceive.DataBuff[index++];                            //  输出  EQ
	currentLockData.nOut_LockData.nOut_Link = dataBeReceive.DataBuff[index++];                             //  输出  联调
    for(i=0; i<16; i++){
        currentLockData.nOut_LockData.Out_Empty[i] = dataBeReceive.DataBuff[i+index];
    }
    index = 58;
    for(i=0; i<6; i++) {
        currentLockData.nOut_LockData.Out_Lock_PW[i] = dataBeReceive.DataBuff[index+i];
    }
    console.log('输出锁定密码：' + currentLockData.nOut_LockData.Out_Lock_PW);


    if(dataBeReceive.DataBuff.length < 64 ){ //无系统锁定数据 退出  从设备或电脑调用一个程序时无系统锁定数据
        return;
    }


    if(firstRequest){
        //system lock data
        index = 64;
        currentLockData.nSys_LockData.nSYS_Load_Data = dataBeReceive.DataBuff[index++];
        currentLockData.nSys_LockData.nSYS_Save_Data = dataBeReceive.DataBuff[index++];
        currentLockData.nSys_LockData.nSYS_PC_Del = dataBeReceive.DataBuff[index++];
        currentLockData.nSys_LockData.nSYS_Copy_Data = dataBeReceive.DataBuff[index++];
        currentLockData.nSys_LockData.nSYS_Device_ID = dataBeReceive.DataBuff[index++];
        currentLockData.nSys_LockData.nSYS_Logo = dataBeReceive.DataBuff[index++];
        currentLockData.nSys_LockData.nSYS_Back_Linght = dataBeReceive.DataBuff[index++];
        currentLockData.nSys_LockData.nSYS_nPanel = dataBeReceive.DataBuff[index++];

        currentLockData.nSys_LockData.nSYS_PowerOn = dataBeReceive.DataBuff[index++];
        for(i=0; i<17; i++){
            currentLockData.nSys_LockData.Sys_Empty[i] = dataBeReceive.DataBuff[i+index];
        }
        index = 90;

        for(i=0; i<6; i++) {
            currentLockData.nSys_LockData.System_Lock_PW[i] = dataBeReceive.DataBuff[index+i];
        }
    }

    console.log('系统密码：' + currentLockData.nSys_LockData.System_Lock_PW);

}

function disposeAllLockData() {
    disposeProgramLockData(dataBeReceive.Userid);
}

var firstRequest = false;
function connectDevice() {
    firstRequest = true;
    dataForSendArray.length = 0;
    connectSteps =0;
    connectCurStep=0;
    requestSystemData();  //请求系统数据
    requestCurrentGroupData(0); //请求当前组数据
    initAjax();
}

//send
//============================================================================================
function requestSystemData() {
    var i;

    readWriteSystemData(messageType.PC_Read_Data,messageType.Connect_Test_ID,0); //联机测试命令
    //alert(formulateDataForSend(dataForSend));
    dataForSendArray.push(formulateDataForSend(dataForSend));
    readWriteSystemData(messageType.PC_Read_Data,messageType.Software_Version,0); //请求版本信息
    //alert(formulateDataForSend(dataForSend));
    dataForSendArray.push(formulateDataForSend(dataForSend));
    readWriteSystemData(messageType.PC_Read_Data,messageType.Device_Type,0); //请求设备类型 24 26 28 36 46 48
    //alert(formulateDataForSend(dataForSend));
    dataForSendArray.push(formulateDataForSend(dataForSend));
    readWriteSystemData(messageType.PC_Read_Data,messageType.Device_StartUp_Set,0);//请求启动设置
    //alert(formulateDataForSend(dataForSend));
    dataForSendArray.push(formulateDataForSend(dataForSend));
    connectSteps++;
    for(i=0; i<=messageType.Max_FGroup; i++) {
        readWriteSystemData(messageType.PC_Read_Data,messageType.PC_RW_PGNAME,i);//请求31组组名
        //alert(formulateDataForSend(dataForSend));
        dataForSendArray.push(formulateDataForSend(dataForSend));
    }

    readWriteSystemData(messageType.PC_Read_Data,messageType.PC_Information_ID,0);//请求界面信息
    //alert(formulateDataForSend(dataForSend));
    dataForSendArray.push(formulateDataForSend(dataForSend));
    readWriteSystemData(messageType.PC_Read_Data,messageType.PC_Back_Light_ID,0);//请求背景灯
    //alert(formulateDataForSend(dataForSend));
    dataForSendArray.push(formulateDataForSend(dataForSend));
}


function requestCurrentGroupData(useId) { //LoadUpFile 从设备调用当前组数据
    var i;

    readWriteLockData(messageType.PC_Read_Lock_Data, useId); //请求锁定数据 0xa1
    dataForSendArray.push(formulateDataForSend(dataForSend));
    for(i=0; i<4; i++) {
        readWriteData(messageType.PC_Read_Data,messageType.RW_InRoute_Frame,useId,i,messageType.Frame_RD_DEFDATA); //输入数据 0x03
        //alert(formulateDataForSend(dataForSend));
        dataForSendArray.push(formulateDataForSend(dataForSend));
    }

    for(i=0; i<8; i++) {
        readWriteData(messageType.PC_Read_Data,messageType.RW_OutRoute_Frame,useId,i,messageType.Frame_RD_DEFDATA); //输出数据 0x04
        //alert(formulateDataForSend(dataForSend));
        dataForSendArray.push(formulateDataForSend(dataForSend));
    }
    connectSteps = dataForSendArray.length;
    isReadBigData = true;
    curtainOption(0);
    disableMainCurtain();
}

function requestOneGroupData(useId) { //LoadUpFile 从设备调用一组数据
    var i;
    //pc在写完启动设置 和 读锁定数据后才 发DSP总音量清零指令
    currentSystemData.m_nSave_Cur_PG_ID = useId;   //  保持 当前 程序 ID
    currentSystemData.m_nMCU_PG_Type = 0;
    renewSystemCurtain(); //更新系统对话框中的值
    readWriteSystemData(messageType.PC_Write_Data,messageType.Device_StartUp_Set,0); //写启动设置
    dataForSendArray.push(formulateDataForSend(dataForSend));
    readWriteLockData(messageType.PC_Read_Lock_Data, useId); //请求锁定数据 a1
    dataForSendArray.push(formulateDataForSend(dataForSend));
    writeVolumeControl(1); //MCU 把DSP总音量清零
    dataForSendArray.push(formulateDataForSend(dataForSend));
    for(i=0; i<4; i++) {
        readWriteData(messageType.PC_Read_Data,messageType.RW_InRoute_Frame,useId,i,messageType.Frame_RD_DEFDATA); //输入数据 0x03
        //alert(formulateDataForSend(dataForSend));
        dataForSendArray.push(formulateDataForSend(dataForSend));
    }

    for(i=0; i<8; i++) {
        readWriteData(messageType.PC_Read_Data,messageType.RW_OutRoute_Frame,useId,i,messageType.Frame_RD_DEFDATA);//输出数据 0x04
        //alert(formulateDataForSend(dataForSend));
        dataForSendArray.push(formulateDataForSend(dataForSend));
    }
    writeVolumeControl(2); //MCU通过总音量实现音量渐增  此时PC需要注意断线时间
    dataForSendArray.push(formulateDataForSend(dataForSend));
    connectSteps = dataForSendArray.length;
    isReadBigData = true;
    curtainOption(0);
    disableMainCurtain();
}


function deliverOneGroupData(useId) {  //DownFile 保存一组数据到设备
    //PC 写通道名称
    var i;
    readWriteLockData(messageType.PC_Write_Lock_Data, useId); //锁定数据 useID>0 输入与输出锁定 长度64 -- useID=0 输入与输出与空的系统锁定 长度 96
    dataForSendArray.push(formulateDataForSend(dataForSend));

    if(useId === 0){
        writeVolumeControl(1); //MCU 把DSP总音量清零
        dataForSendArray.push(formulateDataForSend(dataForSend));
    }

    for(i=1; i<5; i++) { //输入通道数据
        readWriteData(messageType.PC_Write_Data,messageType.RW_InRoute_Frame,useId,i,messageType.Frame_RD_DEFDATA);
        dataForSendArray.push(formulateDataForSend(dataForSend));
    }

    for(i=5; i<13; i++) { //输出通道数据
        readWriteData(messageType.PC_Write_Data,messageType.RW_OutRoute_Frame,useId,i,messageType.Frame_RD_DEFDATA);
        dataForSendArray.push(formulateDataForSend(dataForSend));
    }

    if(useId === 0) {
        writeVolumeControl(2); //MCU通过总音量实现音量渐增  此时PC需要注意断线时间
        dataForSendArray.push(formulateDataForSend(dataForSend));
    }
    connectSteps = dataForSendArray.length;
    isReadBigData = true;
    curtainOption(0);
    disableMainCurtain();
}



function requestAllGroupData() { //从设备读取30组数据
    var i,j;

    console.log('保存所有程序到电脑');
    for(i=1; i<=messageType.Max_FGroup; i++) { //通道名开机已读，不用再读通道名
        readWriteLockData(messageType.PC_Read_Lock_ALL_Data,i); //读锁定数据
        dataForSendArray.push(formulateDataForSend(dataForSend));

        for(j=0; j<4; j++){
            readWriteData(messageType.PC_Read_Data,messageType.RW_AllInRoute_Frame,i,j,messageType.Frame_RD_DEFDATA,0); //读输入通道均衡数据
            dataForSendArray.push(formulateDataForSend(dataForSend));
        }

        for(j=0; j<8; j++) {
            readWriteData(messageType.PC_Read_Data,messageType.RW_AllOutRoute_Frame,i,j,messageType.Frame_RD_DEFDATA,0); //读输出通道均衡数据
            dataForSendArray.push(formulateDataForSend(dataForSend));
        }
    }
    connectSteps = dataForSendArray.length;
    isReadBigData = true;
    curtainOption(0);
    disableMainCurtain();
}

function deliverAllGroupData() { //发送30组数据到设备
    var i,j;

    console.log('发送30组数据到设备');
    //设置工厂程序数量：
    readWriteSystemData(messageType.PC_Write_Data,messageType.Device_StartUp_Set,0); //写启动设置
    dataForSendArray.push(formulateDataForSend(dataForSend));

    for(i=1; i<=messageType.Max_FGroup; i++) { //用户名[0,30]
        readWriteSystemData(messageType.PC_Write_Data,messageType.PC_RW_PGNAME,i); //写通道名
        dataForSendArray.push(formulateDataForSend(dataForSend));

        readWriteLockData(messageType.PC_Write_Lock_ALL_Data, i); //保存锁定数据（输入 输出 无系统）
        dataForSendArray.push(formulateDataForSend(dataForSend));

        for(j=1; j<5; j++) { //输入通道数据
            readWriteData(messageType.PC_Write_Data,messageType.RW_AllInRoute_Frame,i,j,messageType.Frame_RD_DEFDATA); //写输入通道数据
            dataForSendArray.push(formulateDataForSend(dataForSend));
        }

        for(j=5; j<13; j++) { //输出通道数据
            readWriteData(messageType.PC_Write_Data,messageType.RW_AllOutRoute_Frame,i,j,messageType.Frame_RD_DEFDATA); //写输出通道数据
            dataForSendArray.push(formulateDataForSend(dataForSend));
        }
    }
    connectSteps = dataForSendArray.length;
    isReadBigData = true;
    curtainOption(0);
    refreshMainDisplay();
    disableMainCurtain();
}

function writeVolumeControl(data){
    resetDataForSend();

    dataForSend.FrameHead = [0x5a, 0x5a, 0x5a];
    dataForSend.FrameTrait = 0xad;
    dataForSend.FrameEnd = 0xaa;
    dataForSend.FrameType = messageType.PC_Write_Data;
    dataForSend.Userid = 0;
    dataForSend.DataType = messageType.SysType_Frame;
    dataForSend.ChannelID = messageType.Volume_Control;
    dataForSend.Dataid = messageType.Frame_RD_DEFDATA;
    dataForSend.DataLen = 1;
    dataForSend.DataBuff.length = 0;
    dataForSend.DataBuff.push(data);

    checkSendData();
}


function readWriteSystemData(FrameType, channelId, useId) {
    var i;
    var dataBuff = [];
    resetDataForSend();
    dataForSend.FrameHead = [0x5a, 0x5a, 0x5a];
    dataForSend.FrameTrait = 0xad;
    dataForSend.FrameEnd = 0xaa;
    dataForSend.FrameType = FrameType;
    dataForSend.Userid = useId;
    dataForSend.DataType = messageType.SysType_Frame;
    dataForSend.ChannelID = channelId;
    dataForSend.Dataid = messageType.Frame_RD_DEFDATA;

    switch (FrameType) {
        case messageType.PC_Write_Data:
            switch (channelId){
                case messageType.PC_RW_PGNAME: //0x00
                    dataForSend.DataLen = messageType.PG_Name_LEN;
                    if(useId>0){
                        for( i=0; i<messageType.PG_Name_LEN; i++) {
                            dataBuff.push(currentAllGroupData[useId-1].name[i]);
                        }
                        console.log('程序' + useId + '  名称：' + currentAllGroupData[useId-1].name);
                    } else {
                        for( i=0; i<messageType.PG_Name_LEN; i++) {
                            dataBuff.push(currentAllGroupData[useId-1].name[i]);
                        }
                    }
                    break;
                case messageType.PC_Led_ID:
                    // dataForSend.DataLen = messageType.Back_Light_Lenght;
                    // for(i=0; i<messageType.Back_Light_Lenght; i++){
                    //     dataBuff.push(currentSystemData.m_nBack_Light);
                    // }
                    break;
                case messageType.PC_Information_ID: //写界面信息
                    dataForSend.DataLen = messageType.Soft_Information_Lenght;
                    for(i=0; i<messageType.Soft_Information_Lenght; i++){
                        dataBuff.push(currentSystemData.m_nInformation[i]);
                    }
                    break;
                case messageType.PC_Back_Light_ID:
                    dataForSend.DataLen = messageType.Back_Light_Lenght;
                    for(i=0; i<messageType.Back_Light_Lenght; i++){
                        dataBuff.push(currentSystemData.m_nBack_Light);
                    }
                    break;
                case messageType.Connect_Test_ID:
                    dataForSend.DataLen = messageType.Data_Lenght;
                    for(i=0; i<messageType.Data_Lenght; i++){
                        dataBuff.push(messageType.Frame_RD_DEFDATA);
                    }
                    break;
                case messageType.Software_Version:
                    dataForSend.DataLen = messageType.Soft_Version_Lenght;
                    for(i=0; i<messageType.Soft_Version_Lenght; i++){
                        dataBuff.push(currentSystemData.m_S_Software_Version[i]);
                    }
                    break;
                case messageType.Device_StartUp_Set:
                    dataForSend.DataLen = messageType.Device_StartUp_Set_Lenght;

                    dataBuff.push(currentSystemData.m_nModify_Flag);   //  修改 标记 0:未      修改  1:已修改
                    dataBuff.push(currentSystemData.m_nMCU_PG_Type);    //  修改 程序 类型:     0:MCU程序  1:PC 程序
                    dataBuff.push(currentSystemData.m_nSave_Cur_PG_ID);  //  保持 当前 程序 编号
                    dataBuff.push(currentSystemData.m_nDevSSet);   //  1:保持    状态   启动 2:静音启动   3:程序组
                    dataBuff.push(currentSystemData.m_nSetPG_ID); //程序组编号  ID
                    dataBuff.push(currentSystemData.Empty); //工厂数据长度

                    break;
                default:

                    break;
            }

         break;
        case messageType.PC_Read_Data:
            dataForSend.DataLen = messageType.Data_Lenght;
            for(i=0; i<messageType.Data_Lenght; i++){
                dataBuff.push(messageType.Frame_RD_DEFDATA);
            }
            break;
        default:

            break;
    }

    dataForSend.DataBuff.length = 0;
    for(i=0; i<dataBuff.length;i++){
        dataForSend.DataBuff.push(dataBuff[i]);
    }
    checkSendData();
}


function readWriteData(FrameType, dataType, useId, channelId, dataId) {
    var i;
    var dataBuff = [];
    var groupData;
    resetDataForSend();
    dataForSend.FrameHead = [0x5a, 0x5a, 0x5a];
    dataForSend.FrameTrait = 0xad;
    dataForSend.FrameEnd = 0xaa;
    dataForSend.FrameType = FrameType;
    dataForSend.Userid = useId;
    dataForSend.DataType = dataType;
    dataForSend.ChannelID = channelId;
    dataForSend.Dataid = dataId;

    var channelData;
    if(useId>0){
        groupData = currentAllGroupData[useId-1];
        // console.log('groupData.dataInputA.name:' + groupData.dataInputA.name);
    } else {
        groupData = currentGroupData;
    }

    switch (channelId){
        case 1:
            channelData = groupData.dataInputA;
            break;
        case 2:
            channelData = groupData.dataInputB;
            break;
        case 3:
            channelData = groupData.dataInputC;
            break;
        case 4:
            channelData = groupData.dataInputD;
            break;
        case 5:
            channelData = groupData.dataOut1;
            break;
        case 6:
            channelData = groupData.dataOut2;
            break;
        case 7:
            channelData = groupData.dataOut3;
            break;
        case 8:
            channelData = groupData.dataOut4;
            break;
        case 9:
            channelData = groupData.dataOut5;
            break;
        case 10:
            channelData = groupData.dataOut6;
            break;
        case 11:
            channelData = groupData.dataOut7;
            break;
        case 12:
            channelData = groupData.dataOut8;
            break;
        default:
            break;
    }

    // console.log('channelData.name:' + channelData.name);
    switch (FrameType) {
        case messageType.PC_Write_Data:
            switch (dataType){
                case messageType.InType_Frame:
                    dataBuff = getInputSendData(channelData,dataId);
                    dataForSend.DataLen = messageType.Data_Lenght;
                    break;
                case messageType.OutType_Frame:
                    dataBuff = getOutSendData(channelData,dataId);
                    dataForSend.DataLen = messageType.Data_Lenght;
                    break;
                case messageType.RW_InRoute_Frame:
                    dataBuff = getInputRouteSendData(channelData);
                    dataForSend.DataLen = dataBuff.length;
                    dataForSend.ChannelID = channelId-1;
                    console.log('for send data length: ' + dataBuff.length);
                    console.log(dataBuff);
                    break;
                case messageType.RW_OutRoute_Frame:
                    dataBuff = getOutRouteSendData(channelData);
                    dataForSend.DataLen = dataBuff.length;
                    dataForSend.ChannelID = channelId-5;
                    console.log('for send data length: ' + dataBuff.length);
                    console.log(dataBuff);
                    break;
                case messageType.RW_AllInRoute_Frame:
                    dataBuff = getInputRouteSendData(channelData);
                    dataForSend.DataLen = dataBuff.length;
                    dataForSend.ChannelID = channelId-1;
                    console.log('for send data length: ' + dataBuff.length);
                    console.log(dataBuff);
                    break;
                case messageType.RW_AllOutRoute_Frame:
                    dataBuff = getOutRouteSendData(channelData);
                    dataForSend.DataLen = dataBuff.length;
                    dataForSend.ChannelID = channelId-5;
                    console.log('for send data length: ' + dataBuff.length);
                    console.log(dataBuff);
                    break;
            }
            break;
        case messageType.PC_Read_Data:
            dataForSend.DataLen = messageType.Data_Lenght;
            dataBuff = [0,0,0,0,0,0,0,0];
            break;
    }

    dataForSend.DataBuff.length = 0;
    for(i=0; i<dataBuff.length; i++) {
        dataForSend.DataBuff.push(dataBuff[i]);
    }

    checkSendData();
}


function readWriteDeviceId(FrameType, deviceId) {
    resetDataForSend();
    dataForSend.FrameHead = [0x5a, 0x5a, 0x5a];
    dataForSend.FrameTrait = 0xad;
    dataForSend.FrameEnd = 0xaa;
    dataForSend.FrameType = FrameType;
    dataForSend.Userid = messageType.Frame_RD_DEFDATA;
    dataForSend.DataType = messageType.SysType_Frame;
    dataForSend.ChannelID = messageType.PC_Device_ID;
    dataForSend.Dataid = messageType.Frame_RD_DEFDATA;
    dataForSend.DataLen = messageType.Data_Lenght;

    dataForSend.DataBuff.length = 0;
    if( FrameType === messageType.PC_Write_Data){
        dataForSend.DataBuff.push(deviceId);
    } else {
        dataForSend.DataBuff.push(deviceId);
    }

    checkSendData();

}


function readWriteLockData(dataType, userId){
    var dataBuff = [];
    var i;
    var lockData;
    resetDataForSend();
    if(userId>0){
        lockData = currentAllGroupData[userId-1].m_nLockData;
    } else {
        lockData = currentLockData
    }
    dataForSend.FrameHead = [0x5a, 0x5a, 0x5a];
    dataForSend.FrameTrait = 0xad;
    dataForSend.FrameEnd = 0xaa;
    dataForSend.ChannelID = 0;
    dataForSend.Userid = userId;
    dataForSend.DataType = dataType;
    dataForSend.Dataid = messageType.Frame_RD_DEFDATA;

    switch( dataType) {
        case messageType.PC_Read_Lock_Data:    //  读取  锁定  数据
            dataForSend.DataLen = messageType.Data_Lenght;
            dataForSend.FrameType = messageType.PC_Read_Data;
            for( i=0; i<messageType.Data_Lenght; i++){
                dataBuff.push(messageType.Frame_RD_DEFDATA);
            }
            break;
        case messageType.PC_Write_Lock_Data:     //写 锁定 数据
            dataForSend.FrameType = messageType.PC_Write_Data;
            if(userId > 0){
                dataBuff = getLockDataArray( lockData );
            } else {
                dataBuff = getAllLockData( lockData );
            }
            // console.log('写锁定数据：' + dataBuff);
            dataForSend.DataLen = dataBuff.length;
            break;
        case messageType.PC_Write_Lock_SysData:   //写系统锁定数据
            dataForSend.FrameType = messageType.PC_Write_Data;
            dataBuff = getSystemLockDataArray(lockData.nSys_LockData);
            dataForSend.DataLen = dataBuff.length;
            break;
        case messageType.PC_Write_Lock_InData:    //写输入锁定数据
            dataForSend.FrameType = messageType.PC_Write_Data;
            dataBuff = getInLockDataArray(lockData.nIn_LockData);
            dataForSend.DataLen = dataBuff.length;
            break;
        case messageType.PC_Write_Lock_OutData:  //写输出锁定数据
            dataForSend.FrameType = messageType.PC_Write_Data;
            dataBuff = getOutLockDataArray(lockData.nOut_LockData);
            dataForSend.DataLen = dataBuff.length;
            break;
        case messageType.PC_Read_Lock_ALL_Data: //读所有锁定数据
            dataForSend.FrameType = messageType.PC_Read_Data;
            dataBuff.push(0,0,0,0,0,0,0,0);
            dataForSend.DataLen = dataBuff.length;
            break;
        case messageType.PC_Write_Lock_ALL_Data: //写所有的锁定数据
            dataForSend.FrameType = messageType.PC_Write_Data;
            dataBuff = getLockDataArray(lockData);
            dataForSend.DataLen = dataBuff.length;

            break;
        default:

            break;
    }

    dataForSend.DataBuff.length = 0;
    for(i=0; i<dataBuff.length; i++) {
        dataForSend.DataBuff.push(dataBuff[i]);
    }
    checkSendData();

}

function getLockDataArray( lockData ) { //注意 不需要系统锁定数据
    var inLock, outLock,i;
    var data = [];
    inLock = getInLockDataArray(lockData.nIn_LockData);
    for(i=0; i<inLock.length; i++) {
        data.push(inLock[i]);
    }

    outLock = getOutLockDataArray(lockData.nOut_LockData);
    for(i=0; i< outLock.length; i++) {
        data.push(outLock[i]);
    }


    return data;
}

function getAllLockData( allLockData) {
    var inLock, outLock,sysLock,i;
    var data = [];
    inLock = getInLockDataArray(allLockData.nIn_LockData);
    for(i=0; i<inLock.length; i++) {
        data.push(inLock[i]);
    }

    outLock = getOutLockDataArray(allLockData.nOut_LockData);
    for(i=0; i< outLock.length; i++) {
        data.push(outLock[i]);
    }

    sysLock = getEmptySystemLockDataArray();
    for(i=0; i< sysLock.length; i++) {
        data.push(sysLock[i]);
    }

    return data;
}


function getInLockDataArray(inLockData) {
    var i;
    var data = [];
    data.push(inLockData.nIn_Name);  //0 输入名称
    data.push(inLockData.nIn_Mute);  //1 静音
    data.push(inLockData.nIn_Delay);  //2 延时
    data.push(inLockData.nIn_Pol);  //3 相位
    data.push(inLockData.nIn_Gain);  //4 增益
    data.push(inLockData.nIn_NoiseGate);  //5 噪声门
    data.push(inLockData.nIn_Comp_AG);  //6 自动增益压缩
    data.push(inLockData.nIn_DEQ);  //7 动态均衡
    data.push(inLockData.nIn_EQ);  //8 均衡
    data.push(inLockData.nIn_Link);  //9 联调
    // data.push(inLockData.In_Empty);
    for(i=0; i<inLockData.In_Empty.length; i++) {//10-25 16个空字符
        data.push(inLockData.In_Empty[i])
    }

    // data.push(inLockData.In_Lock_PW);  //26-31 6位密码
    for(i=0; i<inLockData.In_Lock_PW.length; i++) {//26-316个空字符
        data.push(inLockData.In_Lock_PW[i])
    }

    // var strArray = data[0];
    // for(i=1; i<data.length; i++){
    //     strArray = ' ' + data[i];
    // }
    // return strArray;
    return data;
}

function getOutLockDataArray( outLockData ) {
    var i;
    var data = [];
    data.push(outLockData.nOut_Name);   //0 输入名称
    data.push(outLockData.nOut_Mute);  //1 静音
    data.push(outLockData.nOut_Delay);  //2 延时
    data.push(outLockData.nOut_Pol); //3 相位
    data.push(outLockData.nOut_Gain); //4 增益
    data.push(outLockData.nIn_Matrix);  //5  输出  矩阵
    data.push(outLockData.nOut_Comp_LimT);//6  输出  压线
    data.push(outLockData.nOut_EQ);// 7 输出  EQ
    data.push(outLockData.nOut_Xover); //8  输出  高低通
    data.push(outLockData.nOut_Link);//  9输出  联调

    for(i=0; i<outLockData.Out_Empty.length; i++) {//10-25 16个空字符
        data.push(outLockData.Out_Empty[i])
    }

    for(i=0; i<outLockData.Out_Lock_PW.length; i++) {//26-31 6个空字符
        data.push(outLockData.Out_Lock_PW[i])
    }

    // var strArray = data[0];
    // for(i=1; i<data.length; i++){
    //     strArray = ' ' + data[i];
    // }
    // return strArray;
    return data;
}

function getSystemLockDataArray ( sysLockData ) {
    var i;
    var data = [];
    data.push(sysLockData.nSYS_Load_Data);  //0  PC 读取     数据
    data.push(sysLockData.nSYS_Save_Data);  //1  PC 保存     数据
    data.push(sysLockData.nSYS_PC_Del);     //2  PC 删除     数据
    data.push(sysLockData.nSYS_Copy_Data);  //3  PC 拷贝     数据
    data.push(sysLockData.nSYS_Device_ID);  //4  PC 设备     ID
    data.push(sysLockData.nSYS_Logo);       //5  MCU   界面  显示
    data.push(sysLockData.nSYS_Back_Linght);//6  背景灯
    data.push(sysLockData.nSYS_nPanel);     //7  面板  锁定
    data.push(sysLockData.nSYS_PowerOn);    //8  面板  密码  锁定
    for(i=0; i<sysLockData.Sys_Empty.length; i++) {//9-24 17个空字符
        data.push(sysLockData.Sys_Empty[i])
    }

    for(i=0; i<sysLockData.System_Lock_PW.length; i++) {//25-30 6个空字符
        data.push(sysLockData.System_Lock_PW[i])
    }
    return data;
}

function getEmptySystemLockDataArray (  ) {
    var i;
    var data = [];
    data.push(0);  //0  PC 读取     数据
    data.push(0);  //1  PC 保存     数据
    data.push(0);     //2  PC 删除     数据
    data.push(0);  //3  PC 拷贝     数据
    data.push(0);  //4  PC 设备     ID
    data.push(0);       //5  MCU   界面  显示
    data.push(0);//6  背景灯
    data.push(0);     //7  面板  锁定
    data.push(0);    //8  面板  密码  锁定
    for(i=0; i<17; i++) {//9-25 17个空字符
        data.push(0)
    }

    for(i=0; i<6; i++) {//26-31 6个空字符
        data.push(0)
    }
    return data;
}

function readLedData() {
    dataForSend.FrameHead = [0x5a, 0x5a, 0x5a];
    dataForSend.FrameTrait = 0xad;
    dataForSend.FrameEnd = 0xaa;
    dataForSend.FrameType = messageType.PC_Read_Data;
    dataForSend.DataType = messageType.SysType_Frame;
    dataForSend.ChannelID = messageType.PC_Led_ID;
    dataForSend.Dataid = messageType.Frame_RD_DEFDATA;
    dataForSend.DataLen = messageType.Data_Lenght;
    dataForSend.DataBuff.length = 0;
    dataForSend.DataBuff.push(0,0,0,0,0,0,0,0);
    dataForSend.FrameEnd = messageType.Frame_END_TAG;

    checkSendData();
}

function getDataForSend() {
    var i;
    for (i=0 ; i<20; i++){
        if(compareInputData(currentGroupData.dataInputA, oldGroupData.dataInputA, 0, i)) return true;
        if(compareInputData(currentGroupData.dataInputB, oldGroupData.dataInputB, 1, i)) return true;
        if(compareInputData(currentGroupData.dataInputC, oldGroupData.dataInputC, 2, i)) return true;
        if(compareInputData(currentGroupData.dataInputD, oldGroupData.dataInputD, 3, i)) return true;
    }

    for (i=0; i<17; i++) {
        if(compareOutData(currentGroupData.dataOut1, oldGroupData.dataOut1, 0, i)) return true;
        if(compareOutData(currentGroupData.dataOut2, oldGroupData.dataOut2, 1, i)) return true;
        if(compareOutData(currentGroupData.dataOut3, oldGroupData.dataOut3, 2, i)) return true;
        if(compareOutData(currentGroupData.dataOut4, oldGroupData.dataOut4, 3, i)) return true;
        if(compareOutData(currentGroupData.dataOut5, oldGroupData.dataOut5, 4, i)) return true;
        if(compareOutData(currentGroupData.dataOut6, oldGroupData.dataOut6, 5, i)) return true;
        if(compareOutData(currentGroupData.dataOut7, oldGroupData.dataOut7, 6, i)) return true;
        if(compareOutData(currentGroupData.dataOut8, oldGroupData.dataOut8, 7, i)) return true;
    }

    requestLedCount++;
    // console.log(requestLedCount); // 闲时 信号灯请求
    if(requestLedCount === 2){
        requestLedCount = 0;
        return requestLedSignal();
    }


    return false;
}

function requestLedSignal() {
    resetDataForSend();
    dataForSend.FrameType = messageType.PC_Read_Data;
    dataForSend.DataType = messageType.SysType_Frame;
    dataForSend.ChannelID = messageType.PC_Led_ID;
    dataForSend.Dataid = messageType.Frame_RD_DEFDATA;
    dataForSend.DataLen = messageType.Data_Lenght;
    if(dataForSend.DataBuff.length > 8){
        dataForSend.DataBuff.length = 8;
    }
    for (var i=0; i<messageType.Data_Lenght; i++) {
        dataForSend.DataBuff[i] = messageType.Frame_RD_DEFDATA;
        // console.log('led data:' + dataForSend.DataBuff);
    }
    checkSendData();
    return true;
}


function checkSendData() {
    var check=0x0;
    var hexKeep = intToHexWith2Digits(dataForSend.Keep);
    var hexDataLen = intToHexWith2Digits(dataForSend.DataLen);

    check = check ^ dataForSend.FrameType
                ^ dataForSend.Link_Type
                ^ dataForSend.Frame_Num
                ^ dataForSend.DeviceAddr
                ^ dataForSend.Userid
                ^ dataForSend.DataType
                ^ dataForSend.ChannelID
                ^ dataForSend.Dataid
                ^ hexKeep[0]
                ^ hexKeep[1]
                ^ hexDataLen[0]
                ^ hexDataLen[1];

    for (var i=0; i<dataForSend.DataBuff.length; i++){
        check = check ^ dataForSend.DataBuff[i];
    }

    dataForSend.CheckSum = check;
    dataForSend.FrameEnd = messageType.Frame_END_TAG;

    return check;
}

function resetDataForSend(){
    dataForSend.FrameHead = [0x51, 0x5a, 0x5a]; //帧头     固定
    dataForSend.dataFrameTrait = 0xad;    //帧特征   固定
    dataForSend.FrameType = 0;      //帧类型
    dataForSend.Link_Type = 0x05;   //连接类型  网络：5
    dataForSend.Frame_Num = 0;  //帧编号
    dataForSend.DeviceAddr = 0; //设备ID
    dataForSend.Userid = 0;     //用户ID
    dataForSend.DataType = 0;   //数据类型
    dataForSend.ChannelID = 0;  //通道ID
    dataForSend.Dataid = 0;     //数据ID
    dataForSend.Keep = 0;       //16位 功能序号 DEQ:0-1  EQ:0-8
    dataForSend.DataLen = 0;    //16位 数据长度
    dataForSend.DataBuff.length = 0;
    dataForSend.CheckSum = 0xad; //校验码
    dataForSend.FrameEnd = 0xaa; //帧尾 固定
}

function formulateDataForSend( data ) {
    var dataSend;
    var i;
    var dataArray = [];
    var hexKeep = intToHexWith2Digits(data.Keep);
    var hexDataLen = intToHexWith2Digits(data.DataLen);
    data.Frame_Num = Math.floor(Math.random()*1234%256);

    dataArray.push(data.FrameHead[0]);
    dataArray.push(data.FrameHead[1]);
    dataArray.push(data.FrameHead[2]);
    dataArray.push(data.FrameTrait);
    dataArray.push(data.FrameType);
    dataArray.push(data.Link_Type);
    dataArray.push(data.Frame_Num);
    dataArray.push(data.DeviceAddr);
    dataArray.push(data.Userid);
    dataArray.push(data.DataType);
    dataArray.push(data.ChannelID);
    dataArray.push(data.Dataid);
    dataArray.push(hexKeep[0]);  //功能序号 低位
    dataArray.push(hexKeep[1]);  //功能序号 高位
    dataArray.push(hexDataLen[0]); //数据长度 低位
    dataArray.push(hexDataLen[1]); //数据长度 高低
    for (i=0; i<data.DataBuff.length; i++){
        dataArray.push(data.DataBuff[i]);
    }

    var dataBuffShow = [];
    for( i=0; i<data.DataBuff.length; i++){
        dataBuffShow[i] = data.DataBuff[i].toString(16);
    }
    // console.log('发送的数据内容：' + dataBuffShow);
    dataArray.push(data.CheckSum);
    dataArray.push(data.FrameEnd);

    dataSend = fixHexWithZero(dataArray[0]);
    for (i=1; i<dataArray.length; i++) {
        dataSend = dataSend + ' ' + fixHexWithZero(dataArray[i]);
    }
    // console.log('发送的完整数据：' + dataSend);
    return dataSend;
}



function compareInputData( inputDataCur, inputDataOld,channelId, index ) {
    var isChange;
    isChange = false;

    switch (index){
        case 0:
            if (inputDataCur.name !== inputDataOld.name) {
                inputDataOld.name = inputDataCur.name;
                isChange = true;
                console.log('input_name:' + inputDataCur.name);
                console.log('name was change from input');
            }
            break;
        case 1:
            if ( inputDataCur.mute !== inputDataOld.mute
                 || inputDataCur.polar !== inputDataOld.polar
                 || inputDataCur.delay !== inputDataOld.delay
                 || inputDataCur.gain  !== inputDataOld.gain
                 || inputDataCur.inLinkSel !== inputDataOld.inLinkSel
                 || inputDataCur.secondDelay !== inputDataOld.secondDelay
                ) {
                inputDataOld.mute = inputDataCur.mute;
                inputDataOld.polar = inputDataCur.polar;
                inputDataOld.delay = inputDataCur.delay;
                inputDataOld.gain  = inputDataCur.gain;
                inputDataOld.inLinkSel = inputDataCur.inLinkSel;
                inputDataOld.secondDelay = inputDataCur.secondDelay;
                isChange = true;
                //console.log('mute polar delay gain inLinkSel was change from input');
            }
            break;
        case 2:
            if(inputDataOld.noisegate !== inputDataCur.noisegate) {
                inputDataOld.noisegate = inputDataCur.noisegate;
                isChange = true;
                //console.log('noisegate was change from input');
            }
            break;
        case 3:
            if(inputDataOld.InDeq1.req !== inputDataCur.InDeq1.req
               || inputDataOld.InDeq1.level !== inputDataCur.InDeq1.level
               || inputDataOld.InDeq1.bw !== inputDataCur.InDeq1.bw
               || inputDataOld.InDeq1.type !== inputDataCur.InDeq1.type
               || inputDataOld.InDeq1.shf_db !== inputDataCur.InDeq1.shf_db
            ) {
                inputDataOld.InDeq1.req = inputDataCur.InDeq1.req;
                inputDataOld.InDeq1.level = inputDataCur.InDeq1.level;
                inputDataOld.InDeq1.bw = inputDataCur.InDeq1.bw;
                inputDataOld.InDeq1.type = inputDataCur.InDeq1.type;
                inputDataOld.InDeq1.shf_db = inputDataCur.InDeq1.shf_db;
                isChange = true;
                //console.log('InDeq1 was change from input');
            }
            break;
        case 4:
            if(inputDataOld.InDeq2.req !== inputDataCur.InDeq2.req
               || inputDataOld.InDeq2.level !== inputDataCur.InDeq2.level
               || inputDataOld.InDeq2.bw !== inputDataCur.InDeq2.bw
               || inputDataOld.InDeq2.type !== inputDataCur.InDeq2.type
               || inputDataOld.InDeq2.shf_db !== inputDataCur.InDeq2.shf_db
            ) {
                inputDataOld.InDeq2.req = inputDataCur.InDeq2.req;
                inputDataOld.InDeq2.level = inputDataCur.InDeq2.level;
                inputDataOld.InDeq2.bw = inputDataCur.InDeq2.bw;
                inputDataOld.InDeq2.type = inputDataCur.InDeq2.type;
                inputDataOld.InDeq2.shf_db = inputDataCur.InDeq2.shf_db;
                isChange = true;
                //console.log('InDeq2 was change from input');
            }
            break;
        case 5:
            if( inputDataOld.DeqParam1.DEQ_level !== inputDataCur.DeqParam1.DEQ_level
                || inputDataOld.DeqParam1.DEQ_Threshold !== inputDataCur.DeqParam1.DEQ_Threshold
                || inputDataOld.DeqParam1.DEQ_r !== inputDataCur.DeqParam1.DEQ_r
                || inputDataOld.DeqParam1.DEQ_a !== inputDataCur.DeqParam1.DEQ_a
                || inputDataOld.DeqParam1.DEQ_ratio !== inputDataCur.DeqParam1.DEQ_ratio
                ) {
                inputDataOld.DeqParam1.DEQ_level = inputDataCur.DeqParam1.DEQ_level;
                inputDataOld.DeqParam1.DEQ_Threshold = inputDataCur.DeqParam1.DEQ_Threshold;
                inputDataOld.DeqParam1.DEQ_r = inputDataCur.DeqParam1.DEQ_r;
                inputDataOld.DeqParam1.DEQ_a = inputDataCur.DeqParam1.DEQ_a;
                inputDataOld.DeqParam1.DEQ_ratio = inputDataCur.DeqParam1.DEQ_ratio;
                isChange = true;
                //console.log('DeqParam1 was change from input');
            }
            break;
        case 6:
            if( inputDataOld.DeqParam2.DEQ_level !== inputDataCur.DeqParam2.DEQ_level
                || inputDataOld.DeqParam2.DEQ_Threshold !== inputDataCur.DeqParam2.DEQ_Threshold
                || inputDataOld.DeqParam2.DEQ_r !== inputDataCur.DeqParam2.DEQ_r
                || inputDataOld.DeqParam2.DEQ_a !== inputDataCur.DeqParam2.DEQ_a
                || inputDataOld.DeqParam2.DEQ_ratio !== inputDataCur.DeqParam2.DEQ_ratio
                ) {
                inputDataOld.DeqParam2.DEQ_level = inputDataCur.DeqParam2.DEQ_level;
                inputDataOld.DeqParam2.DEQ_Threshold = inputDataCur.DeqParam2.DEQ_Threshold;
                inputDataOld.DeqParam2.DEQ_r = inputDataCur.DeqParam2.DEQ_r;
                inputDataOld.DeqParam2.DEQ_a = inputDataCur.DeqParam2.DEQ_a;
                inputDataOld.DeqParam2.DEQ_ratio = inputDataCur.DeqParam2.DEQ_ratio;
                isChange = true;
                //console.log('DeqParam2 was change from input');
            }
            break;
        case 7:
            if(inputDataOld.InEQ.EQ1.freq !== inputDataCur.InEQ.EQ1.freq
                || inputDataOld.InEQ.EQ1.level !== inputDataCur.InEQ.EQ1.level
                || inputDataOld.InEQ.EQ1.bw !== inputDataCur.InEQ.EQ1.bw
                || inputDataOld.InEQ.EQ1.type !== inputDataCur.InEQ.EQ1.type
                || inputDataOld.InEQ.EQ1.HL_db_AP_Flag !== inputDataCur.InEQ.EQ1.HL_db_AP_Flag
                ) {
                inputDataOld.InEQ.EQ1.freq = inputDataCur.InEQ.EQ1.freq;
                inputDataOld.InEQ.EQ1.level = inputDataCur.InEQ.EQ1.level;
                inputDataOld.InEQ.EQ1.bw = inputDataCur.InEQ.EQ1.bw;
                inputDataOld.InEQ.EQ1.type = inputDataCur.InEQ.EQ1.type;
                inputDataOld.InEQ.EQ1.HL_db_AP_Flag = inputDataCur.InEQ.EQ1.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ1 was change from input');
            }
            break;
        case 8:
            if(inputDataOld.InEQ.EQ2.freq !== inputDataCur.InEQ.EQ2.freq
                || inputDataOld.InEQ.EQ2.level !== inputDataCur.InEQ.EQ2.level
                || inputDataOld.InEQ.EQ2.bw !== inputDataCur.InEQ.EQ2.bw
                || inputDataOld.InEQ.EQ2.type !== inputDataCur.InEQ.EQ2.type
                || inputDataOld.InEQ.EQ2.HL_db_AP_Flag !== inputDataCur.InEQ.EQ2.HL_db_AP_Flag
                ) {
                inputDataOld.InEQ.EQ2.freq = inputDataCur.InEQ.EQ2.freq;
                inputDataOld.InEQ.EQ2.level = inputDataCur.InEQ.EQ2.level;
                inputDataOld.InEQ.EQ2.bw = inputDataCur.InEQ.EQ2.bw;
                inputDataOld.InEQ.EQ2.type = inputDataCur.InEQ.EQ2.type;
                inputDataOld.InEQ.EQ2.HL_db_AP_Flag = inputDataCur.InEQ.EQ2.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ2 was change from input');
            }
            break;
        case 9:
            if(inputDataOld.InEQ.EQ3.freq !== inputDataCur.InEQ.EQ3.freq
                || inputDataOld.InEQ.EQ3.level !== inputDataCur.InEQ.EQ3.level
                || inputDataOld.InEQ.EQ3.bw !== inputDataCur.InEQ.EQ3.bw
                || inputDataOld.InEQ.EQ3.type !== inputDataCur.InEQ.EQ3.type
                || inputDataOld.InEQ.EQ3.HL_db_AP_Flag !== inputDataCur.InEQ.EQ3.HL_db_AP_Flag
                ) {
                inputDataOld.InEQ.EQ3.freq = inputDataCur.InEQ.EQ3.freq;
                inputDataOld.InEQ.EQ3.level = inputDataCur.InEQ.EQ3.level;
                inputDataOld.InEQ.EQ3.bw = inputDataCur.InEQ.EQ3.bw;
                inputDataOld.InEQ.EQ3.type = inputDataCur.InEQ.EQ3.type;
                inputDataOld.InEQ.EQ3.HL_db_AP_Flag = inputDataCur.InEQ.EQ3.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ3 was change from input');
            }
            break;
        case 10:
            if(inputDataOld.InEQ.EQ4.freq !== inputDataCur.InEQ.EQ4.freq
                || inputDataOld.InEQ.EQ4.level !== inputDataCur.InEQ.EQ4.level
                || inputDataOld.InEQ.EQ4.bw !== inputDataCur.InEQ.EQ4.bw
                || inputDataOld.InEQ.EQ4.type !== inputDataCur.InEQ.EQ4.type
                || inputDataOld.InEQ.EQ4.HL_db_AP_Flag !== inputDataCur.InEQ.EQ4.HL_db_AP_Flag
                ) {
                inputDataOld.InEQ.EQ4.freq = inputDataCur.InEQ.EQ4.freq;
                inputDataOld.InEQ.EQ4.level = inputDataCur.InEQ.EQ4.level;
                inputDataOld.InEQ.EQ4.bw = inputDataCur.InEQ.EQ4.bw;
                inputDataOld.InEQ.EQ4.type = inputDataCur.InEQ.EQ4.type;
                inputDataOld.InEQ.EQ4.HL_db_AP_Flag = inputDataCur.InEQ.EQ4.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ4 was change from input');
            }
            break;
        case 11:
            if(inputDataOld.InEQ.EQ5.freq !== inputDataCur.InEQ.EQ5.freq
                || inputDataOld.InEQ.EQ5.level !== inputDataCur.InEQ.EQ5.level
                || inputDataOld.InEQ.EQ5.bw !== inputDataCur.InEQ.EQ5.bw
                || inputDataOld.InEQ.EQ5.type !== inputDataCur.InEQ.EQ5.type
                || inputDataOld.InEQ.EQ5.HL_db_AP_Flag !== inputDataCur.InEQ.EQ5.HL_db_AP_Flag
                ) {
                inputDataOld.InEQ.EQ5.freq = inputDataCur.InEQ.EQ5.freq;
                inputDataOld.InEQ.EQ5.level = inputDataCur.InEQ.EQ5.level;
                inputDataOld.InEQ.EQ5.bw = inputDataCur.InEQ.EQ5.bw;
                inputDataOld.InEQ.EQ5.type = inputDataCur.InEQ.EQ5.type;
                inputDataOld.InEQ.EQ5.HL_db_AP_Flag = inputDataCur.InEQ.EQ5.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ5 was change from input');
            }
            break;
        case 12:
            if(inputDataOld.InEQ.EQ6.freq !== inputDataCur.InEQ.EQ6.freq
                || inputDataOld.InEQ.EQ6.level !== inputDataCur.InEQ.EQ6.level
                || inputDataOld.InEQ.EQ6.bw !== inputDataCur.InEQ.EQ6.bw
                || inputDataOld.InEQ.EQ6.type !== inputDataCur.InEQ.EQ6.type
                || inputDataOld.InEQ.EQ6.HL_db_AP_Flag !== inputDataCur.InEQ.EQ6.HL_db_AP_Flag
                ) {
                inputDataOld.InEQ.EQ6.freq = inputDataCur.InEQ.EQ6.freq;
                inputDataOld.InEQ.EQ6.level = inputDataCur.InEQ.EQ6.level;
                inputDataOld.InEQ.EQ6.bw = inputDataCur.InEQ.EQ6.bw;
                inputDataOld.InEQ.EQ6.type = inputDataCur.InEQ.EQ6.type;
                inputDataOld.InEQ.EQ6.HL_db_AP_Flag = inputDataCur.InEQ.EQ6.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ6 was change from input');
            }
            break;
        case 13:
            if(inputDataOld.InEQ.EQ7.freq !== inputDataCur.InEQ.EQ7.freq
                || inputDataOld.InEQ.EQ7.level !== inputDataCur.InEQ.EQ7.level
                || inputDataOld.InEQ.EQ7.bw !== inputDataCur.InEQ.EQ7.bw
                || inputDataOld.InEQ.EQ7.type !== inputDataCur.InEQ.EQ7.type
                || inputDataOld.InEQ.EQ7.HL_db_AP_Flag !== inputDataCur.InEQ.EQ7.HL_db_AP_Flag
                ) {
                inputDataOld.InEQ.EQ7.freq = inputDataCur.InEQ.EQ7.freq;
                inputDataOld.InEQ.EQ7.level = inputDataCur.InEQ.EQ7.level;
                inputDataOld.InEQ.EQ7.bw = inputDataCur.InEQ.EQ7.bw;
                inputDataOld.InEQ.EQ7.type = inputDataCur.InEQ.EQ7.type;
                inputDataOld.InEQ.EQ7.HL_db_AP_Flag = inputDataCur.InEQ.EQ7.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ7 was change from input');
            }
            break;
        case 14:
            if(inputDataOld.InEQ.EQ8.freq !== inputDataCur.InEQ.EQ8.freq
                || inputDataOld.InEQ.EQ8.level !== inputDataCur.InEQ.EQ8.level
                || inputDataOld.InEQ.EQ8.bw !== inputDataCur.InEQ.EQ8.bw
                || inputDataOld.InEQ.EQ8.type !== inputDataCur.InEQ.EQ8.type
                || inputDataOld.InEQ.EQ8.HL_db_AP_Flag !== inputDataCur.InEQ.EQ8.HL_db_AP_Flag
                ) {
                inputDataOld.InEQ.EQ8.freq = inputDataCur.InEQ.EQ8.freq;
                inputDataOld.InEQ.EQ8.level = inputDataCur.InEQ.EQ8.level;
                inputDataOld.InEQ.EQ8.bw = inputDataCur.InEQ.EQ8.bw;
                inputDataOld.InEQ.EQ8.type = inputDataCur.InEQ.EQ8.type;
                inputDataOld.InEQ.EQ8.HL_db_AP_Flag = inputDataCur.InEQ.EQ8.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ8 was change from input');
            }
            break;
        case 15:
            if(inputDataOld.InEQ.EQ9.freq !== inputDataCur.InEQ.EQ9.freq
                || inputDataOld.InEQ.EQ9.level !== inputDataCur.InEQ.EQ9.level
                || inputDataOld.InEQ.EQ9.bw !== inputDataCur.InEQ.EQ9.bw
                || inputDataOld.InEQ.EQ9.type !== inputDataCur.InEQ.EQ9.type
                || inputDataOld.InEQ.EQ9.HL_db_AP_Flag !== inputDataCur.InEQ.EQ9.HL_db_AP_Flag
                ) {
                inputDataOld.InEQ.EQ9.freq = inputDataCur.InEQ.EQ9.freq;
                inputDataOld.InEQ.EQ9.level = inputDataCur.InEQ.EQ9.level;
                inputDataOld.InEQ.EQ9.bw = inputDataCur.InEQ.EQ9.bw;
                inputDataOld.InEQ.EQ9.type = inputDataCur.InEQ.EQ9.type;
                inputDataOld.InEQ.EQ9.HL_db_AP_Flag = inputDataCur.InEQ.EQ9.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ9 was change from input');
            }
            break;
        case 16:
            if( inputDataOld.HPFData.HL_freq !==  inputDataCur.HPFData.HL_freq
                || inputDataOld.HPFData.HL_Type !==  inputDataCur.HPFData.HL_Type
                || inputDataOld.HPFData.HL_Oct !==  inputDataCur.HPFData.HL_Oct
                || inputDataOld.HPFData.LR_Level !==  inputDataCur.HPFData.LR_Level
                ) {
                inputDataOld.HPFData.HL_freq = inputDataCur.HPFData.HL_freq;
                inputDataOld.HPFData.HL_Type = inputDataCur.HPFData.HL_Type;
                inputDataOld.HPFData.HL_Oct = inputDataCur.HPFData.HL_Oct;
                inputDataOld.HPFData.LR_Level = inputDataCur.HPFData.LR_Level;
                isChange = true;
                console.log('HPFData was change from input');
            }
            break;
        case 17:
            if( inputDataOld.LPFData.HL_freq !==  inputDataCur.LPFData.HL_freq
                || inputDataOld.LPFData.HL_Type !==  inputDataCur.LPFData.HL_Type
                || inputDataOld.LPFData.HL_Oct !==  inputDataCur.LPFData.HL_Oct
                || inputDataOld.LPFData.LR_Level !==  inputDataCur.LPFData.LR_Level
                ) {
                inputDataOld.LPFData.HL_freq = inputDataCur.LPFData.HL_freq;
                inputDataOld.LPFData.HL_Type = inputDataCur.LPFData.HL_Type;
                inputDataOld.LPFData.HL_Oct = inputDataCur.LPFData.HL_Oct;
                inputDataOld.LPFData.LR_Level = inputDataCur.LPFData.LR_Level;
                isChange = true;
                //console.log('LPFData was change from input');
            }
            break;
        case 18:
            if ( inputDataCur.agLevel !== inputDataOld.agLevel
                 || inputDataCur.agThreshold !== inputDataOld.agThreshold
                 || inputDataCur.agRelease !== inputDataOld.agRelease
                 || inputDataCur.agAttack  !== inputDataOld.agAttack
                 || inputDataCur.agRatio !== inputDataOld.agRatio
                ) {
                 inputDataOld.agLevel = inputDataCur.agLevel;
                 inputDataOld.agThreshold = inputDataCur.agThreshold;
                 inputDataOld.agRelease = inputDataCur.agRelease;
                 inputDataOld.agAttack = inputDataCur.agAttack;
                 inputDataOld.agRatio = inputDataCur.agRatio;
                 isChange = true;
                //console.log('agLevel was change from input');
            }
            break;
        case 19:
            if ( inputDataCur.compLevel !== inputDataOld.compLevel
                 || inputDataCur.compRelease !== inputDataOld.compRelease
                 || inputDataCur.compAttack !== inputDataOld.compAttack
                 || inputDataCur.compRatio  !== inputDataOld.compRatio
                ) {
                 inputDataOld.compLevel = inputDataCur.compLevel;
                 inputDataOld.compRelease = inputDataCur.compRelease;
                 inputDataOld.compAttack = inputDataCur.compAttack;
                 inputDataOld.compRatio = inputDataCur.compRatio;
                 isChange = true;
                //console.log('compLevel was change from input');
            }
            break;
        case 20:

            break;

        default:

            break;
    }

    if (isChange) {
        setInputSendData(inputDataCur,channelId, index);
        //console.log(formulateDataForSend(dataForSend));
        return true;
    } else {
        return false;
    }
}


function compareOutData( outDataCur, outDataOld, channelId, index ) {
    var isChange;
    isChange = false;

    switch (index){
        case 0:
            if (outDataCur.name !== outDataOld.name) {
                outDataOld.name = outDataCur.name;
                isChange = true;
                //console.log('name was change from out');
            }
            break;
        case 1:
            if ( outDataCur.mute !== outDataOld.mute
                 || outDataCur.polar !== outDataOld.polar
                 || outDataCur.delay !== outDataOld.delay
                 || outDataCur.gain  !== outDataOld.gain
                 || outDataCur.outLinkSel !== outDataOld.outLinkSel
                 || outDataCur.secondDelay !== outDataOld.secondDelay
                ) {
                outDataOld.mute = outDataCur.mute;
                outDataOld.polar = outDataCur.polar;
                outDataOld.delay = outDataCur.delay;
                outDataOld.gain  = outDataCur.gain;
                outDataOld.outLinkSel = outDataCur.outLinkSel;
                outDataOld.secondDelay = outDataCur.secondDelay;
                isChange = true;
                //console.log('mute polar delay gain inLinkSel was change from out');
            }
            break;
        case 2:
            if(outDataOld.allvolume !== outDataCur.allvolume) {
                outDataOld.allvolume = outDataCur.allvolume;
                isChange = true;
                //console.log('allvolume was change from out');
            }
            break;
        case 3:
            if(outDataOld.sourceA !== outDataCur.sourceA
                || outDataOld.sourceB !== outDataCur.sourceB
                || outDataOld.sourceC !== outDataCur.sourceC
                || outDataOld.sourceD !== outDataCur.sourceD
                // || outDataOld.sourceE !== outDataCur.sourceE
                // || outDataOld.sourceF !== outDataCur.sourceF
                // || outDataOld.sourceG !== outDataCur.sourceG
                // || outDataOld.sourceH !== outDataCur.sourceH
            ) {
                outDataOld.sourceA = outDataCur.sourceA;
                outDataOld.sourceB = outDataCur.sourceB;
                outDataOld.sourceC = outDataCur.sourceC;
                outDataOld.sourceD = outDataCur.sourceD;
                // outDataOld.sourceE = outDataCur.sourceE;
                // outDataOld.sourceF = outDataCur.sourceF;
                // outDataOld.sourceG = outDataCur.sourceG;
                // outDataOld.sourceH = outDataCur.sourceH;
                isChange = true;
            }
            break;
        case 4:
            if(outDataOld.OutEQ.EQ1.freq !== outDataCur.OutEQ.EQ1.freq
                || outDataOld.OutEQ.EQ1.level !== outDataCur.OutEQ.EQ1.level
                || outDataOld.OutEQ.EQ1.bw !== outDataCur.OutEQ.EQ1.bw
                || outDataOld.OutEQ.EQ1.type !== outDataCur.OutEQ.EQ1.type
                || outDataOld.OutEQ.EQ1.HL_db_AP_Flag !== outDataCur.OutEQ.EQ1.HL_db_AP_Flag
                ) {
                outDataOld.OutEQ.EQ1.freq = outDataCur.OutEQ.EQ1.freq;
                outDataOld.OutEQ.EQ1.level = outDataCur.OutEQ.EQ1.level;
                outDataOld.OutEQ.EQ1.bw = outDataCur.OutEQ.EQ1.bw;
                outDataOld.OutEQ.EQ1.type = outDataCur.OutEQ.EQ1.type;
                outDataOld.OutEQ.EQ1.HL_db_AP_Flag = outDataCur.OutEQ.EQ1.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ1 was change from out');
            }
            break;
        case 5:
            if(outDataOld.OutEQ.EQ2.freq !== outDataCur.OutEQ.EQ2.freq
                || outDataOld.OutEQ.EQ2.level !== outDataCur.OutEQ.EQ2.level
                || outDataOld.OutEQ.EQ2.bw !== outDataCur.OutEQ.EQ2.bw
                || outDataOld.OutEQ.EQ2.type !== outDataCur.OutEQ.EQ2.type
                || outDataOld.OutEQ.EQ2.HL_db_AP_Flag !== outDataCur.OutEQ.EQ2.HL_db_AP_Flag
                ) {
                outDataOld.OutEQ.EQ2.freq = outDataCur.OutEQ.EQ2.freq;
                outDataOld.OutEQ.EQ2.level = outDataCur.OutEQ.EQ2.level;
                outDataOld.OutEQ.EQ2.bw = outDataCur.OutEQ.EQ2.bw;
                outDataOld.OutEQ.EQ2.type = outDataCur.OutEQ.EQ2.type;
                outDataOld.OutEQ.EQ2.HL_db_AP_Flag = outDataCur.OutEQ.EQ2.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ2 was change from out');
            }
            break;
        case 6:
            if(outDataOld.OutEQ.EQ3.freq !== outDataCur.OutEQ.EQ3.freq
                || outDataOld.OutEQ.EQ3.level !== outDataCur.OutEQ.EQ3.level
                || outDataOld.OutEQ.EQ3.bw !== outDataCur.OutEQ.EQ3.bw
                || outDataOld.OutEQ.EQ3.type !== outDataCur.OutEQ.EQ3.type
                || outDataOld.OutEQ.EQ3.HL_db_AP_Flag !== outDataCur.OutEQ.EQ3.HL_db_AP_Flag
                ) {
                outDataOld.OutEQ.EQ3.freq = outDataCur.OutEQ.EQ3.freq;
                outDataOld.OutEQ.EQ3.level = outDataCur.OutEQ.EQ3.level;
                outDataOld.OutEQ.EQ3.bw = outDataCur.OutEQ.EQ3.bw;
                outDataOld.OutEQ.EQ3.type = outDataCur.OutEQ.EQ3.type;
                outDataOld.OutEQ.EQ3.HL_db_AP_Flag = outDataCur.OutEQ.EQ3.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ3 was change from out');
            }
            break;
        case 7:
            if(outDataOld.OutEQ.EQ4.freq !== outDataCur.OutEQ.EQ4.freq
                || outDataOld.OutEQ.EQ4.level !== outDataCur.OutEQ.EQ4.level
                || outDataOld.OutEQ.EQ4.bw !== outDataCur.OutEQ.EQ4.bw
                || outDataOld.OutEQ.EQ4.type !== outDataCur.OutEQ.EQ4.type
                || outDataOld.OutEQ.EQ4.HL_db_AP_Flag !== outDataCur.OutEQ.EQ4.HL_db_AP_Flag
                ) {
                outDataOld.OutEQ.EQ4.freq = outDataCur.OutEQ.EQ4.freq;
                outDataOld.OutEQ.EQ4.level = outDataCur.OutEQ.EQ4.level;
                outDataOld.OutEQ.EQ4.bw = outDataCur.OutEQ.EQ4.bw;
                outDataOld.OutEQ.EQ4.type = outDataCur.OutEQ.EQ4.type;
                outDataOld.OutEQ.EQ4.HL_db_AP_Flag = outDataCur.OutEQ.EQ4.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ4 was change from out');
            }
            break;
        case 8:
            if(outDataOld.OutEQ.EQ5.freq !== outDataCur.OutEQ.EQ5.freq
                || outDataOld.OutEQ.EQ5.level !== outDataCur.OutEQ.EQ5.level
                || outDataOld.OutEQ.EQ5.bw !== outDataCur.OutEQ.EQ5.bw
                || outDataOld.OutEQ.EQ5.type !== outDataCur.OutEQ.EQ5.type
                || outDataOld.OutEQ.EQ5.HL_db_AP_Flag !== outDataCur.OutEQ.EQ5.HL_db_AP_Flag
                ) {
                outDataOld.OutEQ.EQ5.freq = outDataCur.OutEQ.EQ5.freq;
                outDataOld.OutEQ.EQ5.level = outDataCur.OutEQ.EQ5.level;
                outDataOld.OutEQ.EQ5.bw = outDataCur.OutEQ.EQ5.bw;
                outDataOld.OutEQ.EQ5.type = outDataCur.OutEQ.EQ5.type;
                outDataOld.OutEQ.EQ5.HL_db_AP_Flag = outDataCur.OutEQ.EQ5.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ5 was change from out');
            }
            break;
        case 9:
            if(outDataOld.OutEQ.EQ6.freq !== outDataCur.OutEQ.EQ6.freq
                || outDataOld.OutEQ.EQ6.level !== outDataCur.OutEQ.EQ6.level
                || outDataOld.OutEQ.EQ6.bw !== outDataCur.OutEQ.EQ6.bw
                || outDataOld.OutEQ.EQ6.type !== outDataCur.OutEQ.EQ6.type
                || outDataOld.OutEQ.EQ6.HL_db_AP_Flag !== outDataCur.OutEQ.EQ6.HL_db_AP_Flag
                ) {
                outDataOld.OutEQ.EQ6.freq = outDataCur.OutEQ.EQ6.freq;
                outDataOld.OutEQ.EQ6.level = outDataCur.OutEQ.EQ6.level;
                outDataOld.OutEQ.EQ6.bw = outDataCur.OutEQ.EQ6.bw;
                outDataOld.OutEQ.EQ6.type = outDataCur.OutEQ.EQ6.type;
                outDataOld.OutEQ.EQ6.HL_db_AP_Flag = outDataCur.OutEQ.EQ6.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ6 was change from out');
            }
            break;
        case 10:
            if(outDataOld.OutEQ.EQ7.freq !== outDataCur.OutEQ.EQ7.freq
                || outDataOld.OutEQ.EQ7.level !== outDataCur.OutEQ.EQ7.level
                || outDataOld.OutEQ.EQ7.bw !== outDataCur.OutEQ.EQ7.bw
                || outDataOld.OutEQ.EQ7.type !== outDataCur.OutEQ.EQ7.type
                || outDataOld.OutEQ.EQ7.HL_db_AP_Flag !== outDataCur.OutEQ.EQ7.HL_db_AP_Flag
                ) {
                outDataOld.OutEQ.EQ7.freq = outDataCur.OutEQ.EQ7.freq;
                outDataOld.OutEQ.EQ7.level = outDataCur.OutEQ.EQ7.level;
                outDataOld.OutEQ.EQ7.bw = outDataCur.OutEQ.EQ7.bw;
                outDataOld.OutEQ.EQ7.type = outDataCur.OutEQ.EQ7.type;
                outDataOld.OutEQ.EQ7.HL_db_AP_Flag = outDataCur.OutEQ.EQ7.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ7 was change from out');
            }
            break;
        case 11:
            if(outDataOld.OutEQ.EQ8.freq !== outDataCur.OutEQ.EQ8.freq
                || outDataOld.OutEQ.EQ8.level !== outDataCur.OutEQ.EQ8.level
                || outDataOld.OutEQ.EQ8.bw !== outDataCur.OutEQ.EQ8.bw
                || outDataOld.OutEQ.EQ8.type !== outDataCur.OutEQ.EQ8.type
                || outDataOld.OutEQ.EQ8.HL_db_AP_Flag !== outDataCur.OutEQ.EQ8.HL_db_AP_Flag
                ) {
                outDataOld.OutEQ.EQ8.freq = outDataCur.OutEQ.EQ8.freq;
                outDataOld.OutEQ.EQ8.level = outDataCur.OutEQ.EQ8.level;
                outDataOld.OutEQ.EQ8.bw = outDataCur.OutEQ.EQ8.bw;
                outDataOld.OutEQ.EQ8.type = outDataCur.OutEQ.EQ8.type;
                outDataOld.OutEQ.EQ8.HL_db_AP_Flag = outDataCur.OutEQ.EQ8.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ8 was change from out');
            }
            break;
        case 12:
            if(outDataOld.OutEQ.EQ9.freq !== outDataCur.OutEQ.EQ9.freq
                || outDataOld.OutEQ.EQ9.level !== outDataCur.OutEQ.EQ9.level
                || outDataOld.OutEQ.EQ9.bw !== outDataCur.OutEQ.EQ9.bw
                || outDataOld.OutEQ.EQ9.type !== outDataCur.OutEQ.EQ9.type
                || outDataOld.OutEQ.EQ9.HL_db_AP_Flag !== outDataCur.OutEQ.EQ9.HL_db_AP_Flag
                ) {
                outDataOld.OutEQ.EQ9.freq = outDataCur.OutEQ.EQ9.freq;
                outDataOld.OutEQ.EQ9.level = outDataCur.OutEQ.EQ9.level;
                outDataOld.OutEQ.EQ9.bw = outDataCur.OutEQ.EQ9.bw;
                outDataOld.OutEQ.EQ9.type = outDataCur.OutEQ.EQ9.type;
                outDataOld.OutEQ.EQ9.HL_db_AP_Flag = outDataCur.OutEQ.EQ9.HL_db_AP_Flag;
                isChange = true;
                //console.log('EQ9 was change from out');
            }
            break;
        case 13:
            if( outDataOld.HPFData.HL_freq !==  outDataCur.HPFData.HL_freq
                || outDataOld.HPFData.HL_Type !==  outDataCur.HPFData.HL_Type
                || outDataOld.HPFData.HL_Oct !==  outDataCur.HPFData.HL_Oct
                || outDataOld.HPFData.LR_Level !==  outDataCur.HPFData.LR_Level
                ) {
                outDataOld.HPFData.HL_freq = outDataCur.HPFData.HL_freq;
                outDataOld.HPFData.HL_Type = outDataCur.HPFData.HL_Type;
                outDataOld.HPFData.HL_Oct = outDataCur.HPFData.HL_Oct;
                outDataOld.HPFData.LR_Level = outDataCur.HPFData.LR_Level;
                isChange = true;
                console.log('HPFData was change from out');
            }
            break;
        case 14:
            if( outDataOld.LPFData.HL_freq !==  outDataCur.LPFData.HL_freq
                || outDataOld.LPFData.HL_Type !==  outDataCur.LPFData.HL_Type
                || outDataOld.LPFData.HL_Oct !==  outDataCur.LPFData.HL_Oct
                || outDataOld.LPFData.LR_Level !==  outDataCur.LPFData.LR_Level
                ) {
                outDataOld.LPFData.HL_freq = outDataCur.LPFData.HL_freq;
                outDataOld.LPFData.HL_Type = outDataCur.LPFData.HL_Type;
                outDataOld.LPFData.HL_Oct = outDataCur.LPFData.HL_Oct;
                outDataOld.LPFData.LR_Level = outDataCur.LPFData.LR_Level;
                isChange = true;
                //console.log('LPFData was change from out');
            }
            break;
        case 15:
            if ( outDataCur.compLevel !== outDataOld.compLevel
                 || outDataCur.compR !== outDataOld.compR
                 || outDataCur.compAttack !== outDataOld.compAttack
                 || outDataCur.compRatio  !== outDataOld.compRatio
                ) {
                 outDataOld.compLevel = outDataCur.compLevel;
                 outDataOld.compR = outDataCur.compR;
                 outDataOld.compAttack = outDataCur.compAttack;
                 outDataOld.compRatio = outDataCur.compRatio;
                 isChange = true;
                //console.log('agLevel was change from out');
            }
            break;
        case 16:
            if ( outDataCur.limT !== outDataOld.limT
                 || outDataCur.limRelease !== outDataOld.limRelease
                 || outDataCur.limAttack !== outDataOld.limAttack
                ) {
                 outDataOld.limT = outDataCur.limT;
                 outDataOld.limRelease = outDataCur.limRelease;
                 outDataOld.limAttack = outDataCur.limAttack;
                 isChange = true;
                //console.log('compLevel was change from out');
            }
            break;
        case 20:

            break;

        default:

            break;
    }

    if (isChange) {
        setOutSendData(outDataCur,channelId, index);
       //console.log(formulateDataForSend(dataForSend));
        return true;
    } else {
        return false;
    }
}

function getInputSendDataKeepValue(index){
    var keepValue = 0;
    switch(index){
        case 3: //DEQ1
        case 5:
            keepValue = 0;
            break;
        case 4: //DEQ2
        case 6:
            keepValue = 0;
            break;
        case 7: //EQ1
            keepValue = 0;
            break;
        case 8: //EQ2
            keepValue = 1;
            break;
        case 9: //EQ3
            keepValue = 2;
            break;
        case 10: //EQ4
            keepValue = 3;
            break;
        case 11: //EQ5
            keepValue = 4;
            break;
        case 12: //EQ6
            keepValue = 5;
            break;
        case 13: //EQ7
            keepValue = 6;
            break;
        case 14: //EQ8 not exist
            keepValue = 7;
            break;
        case 15: //EQ9 not exist
            keepValue = 8;
            break;
        default:
            keepValue = 0;
            break;
    }
    return keepValue;
}


function setInputSendData(inputData,channelId, index){ //inputData:4路输入数据   channelId: 0-inputA 1-inputB   index:数据序号0-19
    resetDataForSend();
    dataForSend.FrameHead = [0x5a, 0x5a, 0x5a];
    dataForSend.FrameTrait = 0xad;
    dataForSend.FrameEnd = 0xaa;
    dataForSend.FrameType = messageType.PC_Write_Data;
    dataForSend.Link_Type = messageType.LinkType_Web;
    dataForSend.DeviceAddr = 0;
    dataForSend.Userid = 0;
    dataForSend.DataType = messageType.InType_Frame;
    dataForSend.DataLen = messageType.Data_Lenght;
    dataForSend.Keep  = getInputSendDataKeepValue(index);
    dataForSend.ChannelID = channelId;
    dataForSend.Dataid = index;


    var dataBuff = getInputSendData(inputData, index);
    var dataBuffShow = [];
    for( i=0; i<dataBuff.length; i++){
        dataBuffShow[i] = dataBuff[i].toString(16);
    }
    console.log('发送的输入数据：' + dataBuffShow);
    dataForSend.DataBuff.length = 0;
    for (var i=0; i<dataBuff.length; i++){
        dataForSend.DataBuff.push(dataBuff[i]);
    }
    checkSendData();
}






function concatSendData(sendBuff, tempBuff) {
    for( var i=0; i<tempBuff.length; i++) {
        sendBuff.push(tempBuff[i]);
        tempBuff[i] = 0;
    }

}

function getInputRouteSendData(inputData) {
    var sendDataBuff = [];
    var dataBuff = [0,0,0,0,0,0,0,0];
    var hex = [0,0];
    var i,index;

    index = 0;

    //通道名 ID = 0
    var name = stringToBytesNot32(inputData.name, 8);
    var len = name.length;
    if ( len>8 ) len = 8;
    for(i=0; i<len; i++){
        dataBuff[i] = name[i];
    }
    concatSendData(sendDataBuff, dataBuff);

    //杂项 ID = 1
    dataBuff[0] = inputData.mute;
    dataBuff[1] = inputData.polar;
    hex = intToHexWith2Digits(inputData.delay);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex= intToHexWith2Digits(inputData.gain);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.inLinkSel;
    dataBuff[7] = inputData.secondDelay;
    concatSendData(sendDataBuff, dataBuff);

    //噪声门 ID = 2
    dataBuff[0] = inputData.noisegate;
    concatSendData(sendDataBuff, dataBuff);

    //DEQ1 动态EQ ID = 3
    hex = intToHexWith2Digits(inputData.InDeq1.req);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.InDeq1.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.InDeq1.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.InDeq1.type;
    dataBuff[7] = inputData.InDeq1.shf_db;
    concatSendData(sendDataBuff, dataBuff);

    //DEQ2 动态EQ ID = 4
    hex = intToHexWith2Digits(inputData.InDeq2.req);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.InDeq2.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.InDeq2.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.InDeq2.type;
    dataBuff[7] = inputData.InDeq2.shf_db;
    concatSendData(sendDataBuff, dataBuff);

    //DEQ1 动态均衡 ID = 5
    hex = intToHexWith2Digits(inputData.DeqParam1.DEQ_level);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.DeqParam1.DEQ_Threshold);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.DeqParam1.DEQ_r);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.DeqParam1.DEQ_a;
    dataBuff[7] = inputData.DeqParam1.DEQ_ratio;
    concatSendData(sendDataBuff, dataBuff);

    //DEQ2 动态均衡 ID = 6
    hex = intToHexWith2Digits(inputData.DeqParam2.DEQ_level);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.DeqParam2.DEQ_Threshold);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.DeqParam2.DEQ_r);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.DeqParam2.DEQ_a;
    dataBuff[7] = inputData.DeqParam2.DEQ_ratio;
    concatSendData(sendDataBuff, dataBuff);

    //EQ1  均衡 ID = 7
    hex = intToHexWith2Digits(inputData.InEQ.EQ1.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ1.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ1.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.InEQ.EQ1.HL_db_AP_Flag;
    dataBuff[7] = inputData.InEQ.EQ1.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ2  均衡 ID = 8
    hex = intToHexWith2Digits(inputData.InEQ.EQ2.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ2.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ2.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.InEQ.EQ2.HL_db_AP_Flag;
    dataBuff[7] = inputData.InEQ.EQ2.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ3  均衡 ID = 9
    hex = intToHexWith2Digits(inputData.InEQ.EQ3.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ3.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ3.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.InEQ.EQ3.HL_db_AP_Flag;
    dataBuff[7] = inputData.InEQ.EQ3.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ4  均衡 ID = 10
    hex = intToHexWith2Digits(inputData.InEQ.EQ4.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ4.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ4.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.InEQ.EQ4.HL_db_AP_Flag;
    dataBuff[7] = inputData.InEQ.EQ4.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ5  均衡 ID = 11
    hex = intToHexWith2Digits(inputData.InEQ.EQ5.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ5.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ5.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.InEQ.EQ5.HL_db_AP_Flag;
    dataBuff[7] = inputData.InEQ.EQ5.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ6  均衡 ID = 12
    hex = intToHexWith2Digits(inputData.InEQ.EQ6.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ6.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ6.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.InEQ.EQ6.HL_db_AP_Flag;
    dataBuff[7] = inputData.InEQ.EQ6.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ7  均衡 ID = 13
    hex = intToHexWith2Digits(inputData.InEQ.EQ7.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ7.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ7.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.InEQ.EQ7.HL_db_AP_Flag;
    dataBuff[7] = inputData.InEQ.EQ7.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ8  均衡 ID = 14
    hex = intToHexWith2Digits(inputData.InEQ.EQ8.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ8.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ8.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.InEQ.EQ8.HL_db_AP_Flag;
    dataBuff[7] = inputData.InEQ.EQ8.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ9  均衡 ID = 15
    hex = intToHexWith2Digits(inputData.InEQ.EQ9.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ9.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.InEQ.EQ9.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.InEQ.EQ9.HL_db_AP_Flag;
    dataBuff[7] = inputData.InEQ.EQ9.type;
    concatSendData(sendDataBuff, dataBuff);

    //高通 ID = 16
    hex = intToHexWith2Digits(inputData.HPFData.HL_freq);
    dataBuff[0] = hex[0];  //index 128
    dataBuff[1] = hex[1];  //index 129
    dataBuff[2] = inputData.HPFData.HL_Type;
    dataBuff[3] = inputData.HPFData.HL_Oct;
    dataBuff[4] = inputData.HPFData.LR_Level;
    concatSendData(sendDataBuff, dataBuff);

    //低通 ID = 17
    hex = intToHexWith2Digits(inputData.LPFData.HL_freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    dataBuff[2] = inputData.LPFData.HL_Type;
    dataBuff[3] = inputData.LPFData.HL_Oct;
    dataBuff[4] = inputData.LPFData.LR_Level;
    concatSendData(sendDataBuff, dataBuff);

    //自动增益 ID = 18
    hex = intToHexWith2Digits(inputData.agLevel);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.agThreshold);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(inputData.agRelease);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = inputData.agAttack;
    dataBuff[7] = inputData.agRatio;
    concatSendData(sendDataBuff, dataBuff);

    //输入压缩 ID = 19
    hex = intToHexWith2Digits(inputData.compLevel);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(inputData.compRelease);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    dataBuff[4] = inputData.compAttack;
    dataBuff[5] = inputData.compRatio;
    concatSendData(sendDataBuff, dataBuff);

    //ID = 20 空
    concatSendData(sendDataBuff, dataBuff);

    // var strArray = sendDataBuff[0];
    // for(i=1; i<sendDataBuff.length; i++){
    //     strArray += ' ' + sendDataBuff[i];
    // }
    // return strArray;
    return sendDataBuff;
}


function getInputSendData(inputData, index) {
    var dataBuff = [0,0,0,0,0,0,0,0];
    var hex = [0,0];
    var i;

    // consoleInputData(inputData);
    switch (index){
        case 0:
            var name = stringToBytesNot32(inputData.name, 8);
            var len = name.length;
            if ( len>8 ) len = 8;
            for(i=0; i<len; i++){
                dataBuff[i] = name[i];
            }
            break;
        case 1:
            dataBuff[0] = inputData.mute;
            dataBuff[1] = inputData.polar;
            hex = intToHexWith2Digits(inputData.delay);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex= intToHexWith2Digits(inputData.gain);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.inLinkSel;
            dataBuff[7] = inputData.secondDelay;
            break;
        case 2:
            dataBuff[0] = inputData.noisegate;
            break;
        case 3:
            hex = intToHexWith2Digits(inputData.InDeq1.req);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.InDeq1.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.InDeq1.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.InDeq1.type;
            dataBuff[7] = inputData.InDeq1.shf_db;
            break;
        case 4:
            hex = intToHexWith2Digits(inputData.InDeq2.req);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.InDeq2.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.InDeq2.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.InDeq2.type;
            dataBuff[7] = inputData.InDeq2.shf_db;
            break;
        case 5:
            hex = intToHexWith2Digits(inputData.DeqParam1.DEQ_level);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.DeqParam1.DEQ_Threshold);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.DeqParam1.DEQ_r);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.DeqParam1.DEQ_a;
            dataBuff[7] = inputData.DeqParam1.DEQ_ratio;
            break;
        case 6:
            hex = intToHexWith2Digits(inputData.DeqParam2.DEQ_level);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.DeqParam2.DEQ_Threshold);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.DeqParam2.DEQ_r);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.DeqParam2.DEQ_a;
            dataBuff[7] = inputData.DeqParam2.DEQ_ratio;
            break;
        case 7:
            hex = intToHexWith2Digits(inputData.InEQ.EQ1.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ1.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ1.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.InEQ.EQ1.HL_db_AP_Flag;
            dataBuff[7] = inputData.InEQ.EQ1.type;
            break;
        case 8:
            hex = intToHexWith2Digits(inputData.InEQ.EQ2.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ2.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ2.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.InEQ.EQ2.HL_db_AP_Flag;
            dataBuff[7] = inputData.InEQ.EQ2.type;
            break;
        case 9:
            hex = intToHexWith2Digits(inputData.InEQ.EQ3.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ3.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ3.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.InEQ.EQ3.HL_db_AP_Flag;
            dataBuff[7] = inputData.InEQ.EQ3.type;
            break;
        case 10:
            hex = intToHexWith2Digits(inputData.InEQ.EQ4.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ4.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ4.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.InEQ.EQ4.HL_db_AP_Flag;
            dataBuff[7] = inputData.InEQ.EQ4.type;
            break;
        case 11:
            hex = intToHexWith2Digits(inputData.InEQ.EQ5.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ5.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ5.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.InEQ.EQ5.HL_db_AP_Flag;
            dataBuff[7] = inputData.InEQ.EQ5.type;
            break;
        case 12:
            hex = intToHexWith2Digits(inputData.InEQ.EQ6.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ6.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ6.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.InEQ.EQ6.HL_db_AP_Flag;
            dataBuff[7] = inputData.InEQ.EQ6.type;
            break;
        case 13:
            hex = intToHexWith2Digits(inputData.InEQ.EQ7.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ7.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ7.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.InEQ.EQ7.HL_db_AP_Flag;
            dataBuff[7] = inputData.InEQ.EQ7.type;
            break;
        case 14:
            hex = intToHexWith2Digits(inputData.InEQ.EQ8.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ8.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ8.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.InEQ.EQ8.HL_db_AP_Flag;
            dataBuff[7] = inputData.InEQ.EQ8.type;
            break;
        case 15:
            hex = intToHexWith2Digits(inputData.InEQ.EQ9.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ9.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.InEQ.EQ9.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.InEQ.EQ9.HL_db_AP_Flag;
            dataBuff[7] = inputData.InEQ.EQ9.type;
            break;
        case  16:
            hex = intToHexWith2Digits(inputData.HPFData.HL_freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            dataBuff[2] = inputData.HPFData.HL_Type;
            dataBuff[3] = inputData.HPFData.HL_Oct;
            dataBuff[4] = inputData.HPFData.LR_Level;
            break;
        case 17:
            hex = intToHexWith2Digits(inputData.LPFData.HL_freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            dataBuff[2] = inputData.LPFData.HL_Type;
            dataBuff[3] = inputData.LPFData.HL_Oct;
            dataBuff[4] = inputData.LPFData.LR_Level;
            break;
        case 18:
            hex = intToHexWith2Digits(inputData.agLevel);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.agThreshold);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(inputData.agRelease);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = inputData.agAttack;
            dataBuff[7] = inputData.agRatio;
            break;
        case 19:
            hex = intToHexWith2Digits(inputData.compLevel);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(inputData.compRelease);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            dataBuff[4] = inputData.compAttack;
            dataBuff[5] = inputData.compRatio;
            break;
        case 20:
            break;
        default:
            break;
    }


    return dataBuff;
}

function getOutSendDataKeepValue(index) {
    var keepValue = 0;
    switch(index){
        case 4:
            keepValue = 0;
            break;
        case 5:
            keepValue = 1;
            break;
        case 6:
            keepValue = 2;
            break;
        case 7:
            keepValue = 3;
            break;
        case 8:
            keepValue = 4;
            break;
        case 9:
            keepValue = 5;
            break;
        case 10:
            keepValue = 6;
            break;
        case 11:
            keepValue = 7;
            break;
        case 12:
            keepValue = 8;
            break;
        default:
            keepValue = 0;
            break;
    }
    return keepValue;
}

function setOutSendData(outData,channelId, index){
    resetDataForSend();
    dataForSend.FrameHead = [0x5a, 0x5a, 0x5a];
    dataForSend.FrameTrait = 0xad;
    dataForSend.FrameEnd = 0xaa;
    dataForSend.FrameType = messageType.PC_Write_Data;
    dataForSend.Link_Type = messageType.LinkType_Web;
    dataForSend.DeviceAddr = 0;
    dataForSend.Userid = 0;
    dataForSend.DataType = messageType.OutType_Frame;
    dataForSend.Keep = getOutSendDataKeepValue(index);
    dataForSend.DataLen = messageType.Data_Lenght;
    dataForSend.ChannelID = channelId;
    dataForSend.Dataid = index;

    var dataBuff = getOutSendData(outData, index);
    var dataBuffShow = [];
    for( i=0; i<dataBuff.length; i++){
        dataBuffShow[i] = dataBuff[i].toString(16);
    }
    console.log('发送的输出数据：' + dataBuffShow);
    dataForSend.DataBuff.length = 0;
    for(var i=0 ;i<dataBuff.length; i++) {
        dataForSend.DataBuff.push(dataBuff[i]);
    }

    checkSendData();
}

function getOutRouteSendData(outData) {
    var sendDataBuff = [];
    var dataBuff = [0,0,0,0,0,0,0,0];
    var hex = [0,0];
    var i;

    //通道名  ID = 0
    var name = stringToBytesNot32(outData.name, 8);
    var len = name.length;
    if ( len>8 ) len = 8;
    for(i=0; i<len; i++){
        dataBuff[i] = name[i];
    }
    concatSendData(sendDataBuff, dataBuff);

    //杂项  ID = 1
    dataBuff[0] = outData.mute;
    dataBuff[1] = outData.polar;
    hex = intToHexWith2Digits(outData.delay);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex= intToHexWith2Digits(outData.gain);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = outData.outLinkSel;
    dataBuff[7] = outData.secondDelay;
    concatSendData(sendDataBuff, dataBuff);

    //输出总音量  ID = 2
    hex = intToHexWith2Digits(outData.allvolume);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    concatSendData(sendDataBuff, dataBuff);

    //音源  ID = 3
    dataBuff[0] = outData.sourceA ? 1 : 0;
    dataBuff[1] = outData.sourceB ? 1 : 0;
    dataBuff[2] = outData.sourceC ? 1 : 0;
    dataBuff[3] = outData.sourceD ? 1 : 0;
    dataBuff[4] = outData.sourceE ? 1 : 0;
    dataBuff[5] = outData.sourceF ? 1 : 0;
    dataBuff[6] = outData.sourceG ? 1 : 0;
    dataBuff[7] = outData.sourceH ? 1 : 0;
    concatSendData(sendDataBuff, dataBuff);

    //EQ1  ID = 4
    hex = intToHexWith2Digits(outData.OutEQ.EQ1.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ1.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ1.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = outData.OutEQ.EQ1.HL_db_AP_Flag;
    dataBuff[7] = outData.OutEQ.EQ1.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ1  ID = 5
    hex = intToHexWith2Digits(outData.OutEQ.EQ2.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ2.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ2.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = outData.OutEQ.EQ2.HL_db_AP_Flag;
    dataBuff[7] = outData.OutEQ.EQ2.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ1  ID = 6
    hex = intToHexWith2Digits(outData.OutEQ.EQ3.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ3.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ3.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = outData.OutEQ.EQ3.HL_db_AP_Flag;
    dataBuff[7] = outData.OutEQ.EQ3.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ1  ID = 7
    hex = intToHexWith2Digits(outData.OutEQ.EQ4.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ4.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ4.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = outData.OutEQ.EQ4.HL_db_AP_Flag;
    dataBuff[7] = outData.OutEQ.EQ4.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ1  ID = 8
    hex = intToHexWith2Digits(outData.OutEQ.EQ5.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ5.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ5.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = outData.OutEQ.EQ5.HL_db_AP_Flag;
    dataBuff[7] = outData.OutEQ.EQ5.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ1  ID = 9
    hex = intToHexWith2Digits(outData.OutEQ.EQ6.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ6.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ6.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = outData.OutEQ.EQ6.HL_db_AP_Flag;
    dataBuff[7] = outData.OutEQ.EQ6.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ1  ID = 10
    hex = intToHexWith2Digits(outData.OutEQ.EQ7.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ7.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ7.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = outData.OutEQ.EQ7.HL_db_AP_Flag;
    dataBuff[7] = outData.OutEQ.EQ7.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ1  ID = 11
    hex = intToHexWith2Digits(outData.OutEQ.EQ8.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ8.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ8.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = outData.OutEQ.EQ8.HL_db_AP_Flag;
    dataBuff[7] = outData.OutEQ.EQ8.type;
    concatSendData(sendDataBuff, dataBuff);

    //EQ1  ID = 12
    hex = intToHexWith2Digits(outData.OutEQ.EQ9.freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ9.level);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    hex = intToHexWith2Digits(outData.OutEQ.EQ9.bw);
    dataBuff[4] = hex[0];
    dataBuff[5] = hex[1];
    dataBuff[6] = outData.OutEQ.EQ9.HL_db_AP_Flag;
    dataBuff[7] = outData.OutEQ.EQ9.type;
    concatSendData(sendDataBuff, dataBuff);

    //高通  ID = 13
    hex = intToHexWith2Digits(outData.HPFData.HL_freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    dataBuff[2] = outData.HPFData.HL_Type;
    dataBuff[3] = outData.HPFData.HL_Oct;
    dataBuff[4] = outData.HPFData.LR_Level;
    concatSendData(sendDataBuff, dataBuff);

    //低通  ID = 14
    hex = intToHexWith2Digits(outData.LPFData.HL_freq);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    dataBuff[2] = outData.LPFData.HL_Type;
    dataBuff[3] = outData.LPFData.HL_Oct;
    dataBuff[4] = outData.LPFData.LR_Level;
    concatSendData(sendDataBuff, dataBuff);

    //压缩  ID = 15
    hex = intToHexWith2Digits(outData.compLevel);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(outData.compR);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    dataBuff[4] = outData.compAttack;
    dataBuff[5] = outData.compRatio;
    concatSendData(sendDataBuff, dataBuff);

    //限幅  ID = 16
    hex = intToHexWith2Digits(outData.limT);
    dataBuff[0] = hex[0];
    dataBuff[1] = hex[1];
    hex = intToHexWith2Digits(outData.limRelease);
    dataBuff[2] = hex[0];
    dataBuff[3] = hex[1];
    dataBuff[4] = outData.limAttack;
    concatSendData(sendDataBuff, dataBuff);

    // var strArray = sendDataBuff[0];
    // for(i=1; i<sendDataBuff.length; i++){
    //     strArray += ' ' + sendDataBuff[i];
    // }
    // return strArray;
    return sendDataBuff;
}


function getOutSendData(outData, index) {
    var dataBuff = [0,0,0,0,0,0,0,0];
    var hex = [0,0];
    var i;

    switch (index){
        case 0:
            var name = stringToBytesNot32(outData.name, 8);
            var len = name.length;
            if ( len>8 ) len = 8;
            for(i=0; i<len; i++){
                dataBuff[i] = name[i];
            }
            break;
        case 1:
            dataBuff[0] = outData.mute;
            dataBuff[1] = outData.polar;
            hex = intToHexWith2Digits(outData.delay);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex= intToHexWith2Digits(outData.gain);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = outData.outLinkSel;
            dataBuff[7] = outData.secondDelay;
            break;
        case 2:
            hex = intToHexWith2Digits(outData.allvolume);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            break;
        case 3:
            dataBuff[0] = outData.sourceA ? 1 : 0;
            dataBuff[1] = outData.sourceB ? 1 : 0;
            dataBuff[2] = outData.sourceC ? 1 : 0;
            dataBuff[3] = outData.sourceD ? 1 : 0;
            dataBuff[4] = outData.sourceE ? 1 : 0;
            dataBuff[5] = outData.sourceF ? 1 : 0;
            dataBuff[6] = outData.sourceG ? 1 : 0;
            dataBuff[7] = outData.sourceH ? 1 : 0;
            break;
        case 4:
            hex = intToHexWith2Digits(outData.OutEQ.EQ1.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ1.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ1.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = outData.OutEQ.EQ1.HL_db_AP_Flag;
            dataBuff[7] = outData.OutEQ.EQ1.type;
            break;
        case 5:
            hex = intToHexWith2Digits(outData.OutEQ.EQ2.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ2.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ2.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = outData.OutEQ.EQ2.HL_db_AP_Flag;
            dataBuff[7] = outData.OutEQ.EQ2.type;
            break;
        case 6:
            hex = intToHexWith2Digits(outData.OutEQ.EQ3.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ3.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ3.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = outData.OutEQ.EQ3.HL_db_AP_Flag;
            dataBuff[7] = outData.OutEQ.EQ3.type;
            break;
        case 7:
            hex = intToHexWith2Digits(outData.OutEQ.EQ4.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ4.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ4.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = outData.OutEQ.EQ4.HL_db_AP_Flag;
            dataBuff[7] = outData.OutEQ.EQ4.type;
            break;
        case 8:
            hex = intToHexWith2Digits(outData.OutEQ.EQ5.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ5.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ5.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = outData.OutEQ.EQ5.HL_db_AP_Flag;
            dataBuff[7] = outData.OutEQ.EQ5.type;
            break;
        case 9:
            hex = intToHexWith2Digits(outData.OutEQ.EQ6.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ6.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ6.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = outData.OutEQ.EQ6.HL_db_AP_Flag;
            dataBuff[7] = outData.OutEQ.EQ6.type;
            break;
        case 10:
            hex = intToHexWith2Digits(outData.OutEQ.EQ7.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ7.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ7.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = outData.OutEQ.EQ7.HL_db_AP_Flag;
            dataBuff[7] = outData.OutEQ.EQ7.type;
            break;
        case 11:
            hex = intToHexWith2Digits(outData.OutEQ.EQ8.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ8.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ8.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = outData.OutEQ.EQ8.HL_db_AP_Flag;
            dataBuff[7] = outData.OutEQ.EQ8.type;
            break;
        case 12:
            hex = intToHexWith2Digits(outData.OutEQ.EQ9.freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ9.level);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            hex = intToHexWith2Digits(outData.OutEQ.EQ9.bw);
            dataBuff[4] = hex[0];
            dataBuff[5] = hex[1];
            dataBuff[6] = outData.OutEQ.EQ9.HL_db_AP_Flag;
            dataBuff[7] = outData.OutEQ.EQ9.type;
            break;
        case  13:
            hex = intToHexWith2Digits(outData.HPFData.HL_freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            dataBuff[2] = outData.HPFData.HL_Type;
            dataBuff[3] = outData.HPFData.HL_Oct;
            dataBuff[4] = outData.HPFData.LR_Level;
            break;
        case 14:
            hex = intToHexWith2Digits(outData.LPFData.HL_freq);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            dataBuff[2] = outData.LPFData.HL_Type;
            dataBuff[3] = outData.LPFData.HL_Oct;
            dataBuff[4] = outData.LPFData.LR_Level;
            break;
        case 15:
            hex = intToHexWith2Digits(outData.compLevel);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(outData.compR);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            dataBuff[4] = outData.compAttack;
            dataBuff[5] = outData.compRatio;
            break;
        case 16:
            hex = intToHexWith2Digits(outData.limT);
            dataBuff[0] = hex[0];
            dataBuff[1] = hex[1];
            hex = intToHexWith2Digits(outData.limRelease);
            dataBuff[2] = hex[0];
            dataBuff[3] = hex[1];
            dataBuff[4] = outData.limAttack;
            break;
        default:
            break;
    }


    return dataBuff;
}


