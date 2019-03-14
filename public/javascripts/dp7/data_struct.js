var inputLedData = {
    negative24dB :  false,
    negative12dB :  false,
    zeroDB:         false,
    comp:           false,
    agc:            false,
    clip :          false
};


var outLedData = {
    negative24dB :  false,
    negative12dB :  false,
    zeroDB:         false,
    comp:           false,
    limt:           false,
    clip :          false
};


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

function PublicEQ (freq, level, bw, hlDbApFlag, type){
    this.freq = freq;       //16 frequency   471
    this.level = level;     //16 gain 1-601
    this.bw = bw;           //16 bandwidth  1-300
    this.HL_db_AP_Flag = hlDbApFlag;  //   高四位是：6dB,12dB(0:6dB; 1:12dB  低四位：AllPass_Flag
    this.type = type; //   类型(0:PEQ; 1:Lo-Shf; 2:Hi-Shf,3:AllPass_SEQ)
}

function copyPublicEQ(target, original){
    target.freq = original.freq;
    target.level = original.level;
    target.bw = original.bw;
    target.HL_db_AP_Flag = original.HL_db_AP_Flag;
    target.type = original.type;
}


function PublicDEQ(req, level, bw, type,shf_db){           //  动态EQ
    this.req = req;		    //16  频率值，范围为20~20k,发送实际频率值
    this.level = level;	        //16  增益值，-40~+20db,stp:0.1,实际发送值为0~600;表示-40.0~+20.0
    this.bw = bw;	    	    //16  宽度，0.05~3.00，stp:0.01,实际发送值为0~295
    this.type = type;           //  类型:0--PEQ 1--Lo_Shelf  2--hi_Shelf
    this.shf_db = shf_db;	    //  空字节
}


function copyPublicDEQ(target, original){
    target.req = original.req;
    target.level = original.level;
    target.bw = original.bw;
    target.type = original.type;
    target.shf_db = original.shf_db;
}


function PointClass(x,y){
    this.x = x;
    this.y = y;
}

function SizeClass(x, y){ //rect.width rect.height
    this.cx = x;
    this.cy = y;
}

function RectClass(left, top, right, bottom){
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;

    RectClass.prototype.CRect = function(leftPoint, rightPoint) {
        this.left = leftPoint.x;
        this.top  = leftPoint.y;
        this.right = rightPoint.x;
        this.bottom= rightPoint.y;
    };

    RectClass.prototype.CenterPoint = function() {
        var centerPoint = new PointClass(0,0);
        centerPoint.x = (this.left + this.right)/2;
        centerPoint.y=  (this.top + this.bottom)/2;
        return centerPoint;

    };

    RectClass.prototype.Contains = function(x,y) {
        return ((this.left < this.right) && (this.top < this.bottom) && (x >= this.left) && (x < this.right) && (y >= this.top) && (y < this.bottom));
    };

    RectClass.prototype.Height = function() {

        return Math.abs(this.bottom - this.top);
    };

    RectClass.prototype.Width = function() {
        return Math.abs(this.right - this.left);
    };
}

function PublicDeqParam(level, threshold, r, a, ratio){
    this.DEQ_level = level;                     //16  目标电平  OFF --  -79.9dbu~+12dbu，stp:0.1,实际发送值0~920
    this.DEQ_Threshold = threshold;             //16 阀值  OFF --  -79.9dbu~+12dbu，stp:0.1,实际发送值0~920限幅值不能于压缩值  阀值不能大于目标电平
    this.DEQ_r = r;                             //16 释放时间50~5000ms,stp:1,实际发送值为0~4950
    this.DEQ_a = a;                             // 响应时间 0.3ms~200ms，0.3~1ms,stp:0.1;1~100ms,stp:1,实际发送值为0~206
    this.DEQ_ratio = ratio;                     //扩展比例   1-191    1-10  stp:0.1  2-20  stp:0.5
}

function PublicXover(freq, type, oct, level){ //高低通数据
    this.HL_freq = freq;        //16  高低通 频率  20--20K
    this.HL_Type = type;        //  类型  0：LR  1:Bessel 2:ButttwrWorth
    this.HL_Oct = oct;          //  高低通  斜率 12dB(0),18dB(1),24dB(2),30dB(3),36dB(4),42dB(5),48dB(6)
    this.LR_Level = level;      //  高通 低通 LR 模式下斜率，。12db（0），24dB（1）， 36dB（2）， 48dB(3)
}

function PublicInPut(){
    //   CH_NAME, ID = 0
    this.name = '';	            //   通道名 8个字节，没有结束符
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    //  杂项 ID = 1       
    this.mute = 0;	            //   静音，0－－静音，1－－非静音
    this.polar = 0;	            //   极极，0－－同相，1－－反相
    this.delay = 0;	            //16   输入延时,0~1000ms,分两级，0ms~10ms,stp:0.0208 实际值*(1/48K采样率)ms，实际发送值0~480；10ms~1000ms,stp:1ms+(实际值-480), 实际发送值481~1470
    this.gain = 800;           //16   增益植，-80~+12db,stp:0.1,实际发送值：0~920
    this.inLinkSel = 0;       //   输入联调 选择 0：通道1 1：0: 通道1  1：通道2  2：通道3
    this.secondDelay = 0;     //延时时间微调
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    // 噪声门  数据 ID =2
    this.noisegate = 0;          //     噪声门，OFF,-119dbu~+0dbu,stp:1dbu,实际发送0~130
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    //   DEQ ID=3~6
    this.InDeq1 = new PublicDEQ(0,0,25,0,0);                 // 动态EQ 参数 this.Public_DEQ
    this.InDeq2 = new PublicDEQ(0,0,25,0,0);
    this.DeqParam1 = new PublicDeqParam(0,0,450,56,1);      // 动态均衡 参数 设置 this.Public_DEQ_Param
    this.DeqParam2 = new PublicDeqParam(0,0,450,56,1);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    //  EQ ID=7~15
    this.InEQ = new PublicEqData();	   // 入EQ   暂时只用5个EQ  struct	PublicEQ
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//   高通, ID=16
	this.HPFData = new PublicXover(0,0,0,0);               //  高通数据
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//   低通ID = 17
	this.LPFData = new PublicXover(0,0,0,0);               //  低通数据

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    //自动增益,   ID = 18
    this.agLevel = 100;	       //16  目标电平  OFF --  -79.9dbu~+20dbu，stp:0.1,实际发送值0~1000
    this.agThreshold = 100;	   //16  阀值  OFF --  -79.9dbu~+20dbu，stp:0.1,实际发送值0~1000限幅值不能于压缩值  阀值不能大于目标电平
    this.agRelease = 450;	        //16  释放时间50~5000ms,stp:1,实际发送值为0~4950
    this.agAttack = 56;		   //  响应时间 0.3ms~200ms，0.3~1ms,stp:0.1 = ;1~100ms,stp:1,实际发送值为0~206
    this.agRatio = 1;	       //  扩展比例   1-191    (1—10 step 1)   stp:0.1  (11—191 step 5)  stp:0.5
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
    //压缩   ID = 19							
    this.compLevel = 600;	    //16  压缩电平  OFF --  -40dbu~+20dbu，stp:0.1,实际发送值0~600
    this.compRelease = 450;       //16  释放时间  释放时间50~5000ms,stp:1,实际发送值为0~4950
    this.compAttack = 56;        //  响应时间  响应时间 0.3ms~200ms，0.3~1ms,stp:0.1 = ;1~100ms,stp:1,实际发送值为0~206
    this.compRatio = 1     //  1-191    (1—10 step 1)   stp:0.1  (11—191 step 5)  stp:0.5手动压缩比
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

function PublicOutPut(){
    //  CH_NAME, ID = 0
    this.name =  '';	        //通道名 8个字节，没有结束符
    //  杂项 ID = 1
    this.mute =  0;	            //静音，0－－静音，1－－非静音
    this.polar =  0;	        //极极，0－－同相，1－－反相
    this.delay =  0;            //16
    this.gain =  800;		    //16 增益植，-80~+12db,stp:0.1,实际发送值：0~920
    this.outLinkSel =  0;       //输出 联调 选择       0: 通道1  1：通道2  2：通道3 -----7：通道8
    this.secondDelay = 0;     //延时时间微调
    //  ID = 2
    this.allvolume =  0;	   //16 输出总音量          OFF -- -59.9db-12db  0~720   stp:0.1

    //  音源ID = 3
    this.sourceA = 1;          //输入 A   0 －－ 未选择  1 －－ 选择
    this.sourceB = 0;          //输入 B   0－－ 未选择   1 －－ 选择
    this.sourceC = 0;          //输入 C   0 －－ 未选择  1 －－ 选择
    this.sourceD = 0;          //输入 D   0 －－ 未选择  1 －－ 选择
    this.sourceE = 0;
    this.sourceF = 0;
    this.sourceG = 0;
    this.sourceH = 0;

    //  EQ1~EQ9, ID(6) 4~12
    this.OutEQ =  new PublicEqData();	  //  输出EQ  struct	PublicEQ

    //  X_OVER, ID=13
    this.HPFData = new PublicXover(0,2,0,0);           //  音乐高通数据 this.PublicXover
    //  X_OVER  ID = 14
    this.LPFData = new PublicXover(240,2,0,0);        //  音乐低通数据	this.PublicXover

    // 压缩   ID = 15
    this.compLevel =  400;	      //16  压缩电平
    this.compR =  450;		      //16  释放时间  释放时间50~5000ms,stp:1,实际发送值为0~4950
    this.compAttack =  56;		  //  响应时间  响应时间 0.3ms~200ms，0.3~1ms,stp:0.1 =  ;1~100ms,stp:1,实际发送值为0~206
    this.compRatio  =  1;	      //  压缩比例  1-46    1-10  stp:0.1  2-20  stp:0.5

    //压缩   ID = 16
    this.limT =  600;		       //16   压限器阀值， -30dbu~+20dbu，stp:0.1,实际发送值0~500
    this.limRelease =  450;		   //16   释放时间     释放时间50~5000ms,stp:1,实际发送值为0~4950
    this.limAttack =  56;		   //   起动时间     0.3ms~100ms，0.3~1ms,stp:0.1 =  ;1~100ms,stp:1,实际发送值为0~106
}

function PublicControlsData(){
    this.inputData = new PublicInPut();
    this.outputData = new PublicOutPut();
    this.buttonStates = new PublicButtonStates();
}

function PublicButtonStates(){
    this.buttonSelectStatus = [true, true, true, true, true, true, true, true, true, true, true, true];
    this.buttonSourceStatus = [[true, true, true, true], [true, true, true, true],[true, true, true, true],[true, true, true, true],
        [true, true, true, true],[true, true, true, true],[true, true, true, true],[true, true, true, true]];

    this.buttonSpeakerStatus = [true, true, true, true, true, true, true, true, true, true, true, true];

    this.buttonEqStatus = [true, true, true, true, true, true, true];

    this.buttonCurveStatus = [true, false, false, false, false, false, false, false, false, false, false, false];

    this.buttonPhaseCurveStatus = [true, true, true, true, true, true, true, true, true, true, true, true];

    this.buttonPhaseDirectionStatus = [false, false, false, false, false, false, false, false, false, false, false, false];

    this.buttonDeqStatus = [false, false];
}


function copyPublicButtonStates(target, original){
    var i,t;

    for(i=0; i<original.buttonSelectStatus.length; i++){
        target.buttonCurveStatus[i] = original.buttonSelectStatus[i];
    }

    for(i=0; i<original.buttonSpeakerStatus.length; i++){
        target.buttonSpeakerStatus[i] = original.buttonSpeakerStatus[i];
    }

    for(i=0; i<original.buttonEqStatus.length; i++){
        target.buttonEqStatus[i] = original.buttonEqStatus[i];
    }

    for(i=0; i<original.buttonCurveStatus.length; i++){
        target.buttonCurveStatus[i] = original.buttonCurveStatus[i];
    }

    for(i=0; i<original.buttonPhaseCurveStatus.length; i++){
        target.buttonPhaseCurveStatus[i] = original.buttonPhaseCurveStatus[i];
    }

    for(i=0; i<original.buttonSourceStatus.length; i++){
        for(t=0; t<original.buttonSourceStatus[i].length; t++){
            target.buttonSourceStatus[i][t] = original.buttonSourceStatus[i][t];
        }
    }

}

function PublicEqData(){
    this.EQ1 = new PublicEQ(0,200,25,1,0);
    this.EQ2 = new PublicEQ(49,200,25,1,0);
    this.EQ3 = new PublicEQ(96,200,25,1,0);
    this.EQ4 = new PublicEQ(139,200,25,1,0);
    this.EQ5 = new PublicEQ(192,200,25,1,0);
    this.EQ6 = new PublicEQ(239,200,25,1,0);
    this.EQ7 = new PublicEQ(240,200,25,1,0);
    this.EQ8 = new PublicEQ(0,200,25,0,1);
    this.EQ9 = new PublicEQ(240,200,25,1,0);
}


function copyPublicEqData(target, original){
    copyPublicEQ(target.EQ1, original.EQ1);
    copyPublicEQ(target.EQ2, original.EQ2);
    copyPublicEQ(target.EQ3, original.EQ3);
    copyPublicEQ(target.EQ4, original.EQ4);
    copyPublicEQ(target.EQ5, original.EQ5);
    copyPublicEQ(target.EQ6, original.EQ6);
    copyPublicEQ(target.EQ7, original.EQ7);
    copyPublicEQ(target.EQ8, original.EQ8);
    copyPublicEQ(target.EQ9, original.EQ9);
}



function PublicOneGroup() {
    this.dataInputA = new PublicInPut();
    this.dataInputB = new PublicInPut();
    this.dataInputC = new PublicInPut();
    this.dataInputD = new PublicInPut();
    this.dataOut1 = new PublicOutPut();
    this.dataOut2 = new PublicOutPut();
    this.dataOut3 = new PublicOutPut();
    this.dataOut4 = new PublicOutPut();
    this.dataOut5 = new PublicOutPut();
    this.dataOut6 = new PublicOutPut();
    this.dataOut7 = new PublicOutPut();
    this.dataOut8 = new PublicOutPut();
    this.name = [1,2,3,4,5,6,7,8,9,10,11,12];	     //   用户  名称
    this.m_nLockData = new LockData();              //   锁定  数据
}


function PublicLamp(single, ratio, temp, power) {
    this.singleLamp = single;   //  信号灯
    this.ratio = ratio;         //   比例
    this.temp = temp;           //16   温度
    this.power = power;         //16   功率
}

function PublicSYS() {
	this.m_nOutLamp = new Array(messageType.OutRoute_Num);             //  8路输出信号灯 输入了？
    this.m_bUpLampFlag = 0;                                           //  信号灯更新标记
	this.m_nWifi_Name_Lenght= 0;                                      //  读取Wifi名称
	this.m_nWriteWifi_Name = new Array(messageType.Wifi_Name_Lenght);         //  写Wifi名称长度
	this.m_nConnect_Test= 0;                                          //  设备 启动 设置
	this.m_nInformation = new Array(messageType.Soft_Information_Lenght);     //  软件      版本
	this.m_nBack_Light= 0;                                            //  背景灯   0:常亮   1：10s
	this.m_S_Software_Version = new Array(messageType.Soft_Version_Lenght);   //  软件 版本 长度

	this.m_nModify_Flag= 0;                                           //  修改 标记 0:未      修改  1:已修改
	this.m_nMCU_PG_Type= 0;                                           //  修改 程序 类型:     0:MCU程序  1:PC 程序
    this.m_nSave_Cur_PG_ID= 1;                                        //  保持 当前 程序 ID

	this.m_nDevSSet= 1;                                               //  1:保持    状态   启动 2:静音启动   3:程序组
	this.m_nSetPG_ID= 1;                                             //  程序组    编号      ID

	this.Empty= 0;                                                //  空字节
    this.firstRow = '';
    this.secondRow = '';
}

function initPublicSYS(pSys) {
    var i;
    for(i=0; i<messageType.OutRoute_Num; i++){
        pSys.m_nOutLamp[i] = new PublicLamp(0,0,0,0);
    }

    for(i=0; i<messageType.Wifi_Name_Lenght; i++){
        pSys.m_nWriteWifi_Name  = '0';
    }

    for(i=0; i<messageType.Soft_Information_Lenght; i++){
        pSys.m_nInformation[i]  = '0';
    }

    for(i=0; i<messageType.Soft_Version_Lenght; i++){
        pSys.m_S_Software_Version = '0';
    }

}

function Marker(type, selIn, selOut, id, linkType, outLinkSel, inLinkSel){
    this.type = type;                                                     //  输入 输出 类型
    this.selIn = selIn;                                                    //  选择 的输入数
    this.selOut = selOut;                                                   //  选择的输出数
    this.selPgId = id;                                                 //  当前选择的组ID
    this.linkType = linkType;                                                //  当前通讯的连接类型
    this.outLinkSel = outLinkSel;                                 //  输出联调选择
    this.inLinkSel = inLinkSel;                                   //  输入  联调   选择
}

/***************************************************************************************************************
 * **************************************************lOCK***********************************************************/
var temp=0;
function InLockData() { //总长度为 32
	this.nIn_Name = temp;                             //  输入  通道  名称
	this.nIn_Mute = temp;                             //  输入  静音
	this.nIn_Delay = temp;                            //  输入  延时
	this.nIn_Pol = temp;                              //  输入  极性
	this.nIn_Gain = temp;                             //  输入  增益
	this.nIn_NoiseGate = temp;                        //  输入  矩阵
	this.nIn_Comp_AG = temp;                          //  输入  压线
	this.nIn_DEQ = temp;                              //  输入  动态均衡

	this.nIn_EQ = temp;                               //  输入  EQ
	this.nIn_Link = temp;                             //  输入  联调
	this.In_Empty = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];  //16  输入  空字节
	//this.In_Lock_PW = ['1','2','3','4','5','6'];       //6  输入  锁定   密码
    this.In_Lock_PW = [32,32,32,32,32,32];  //32对应的是空格

    this.getInLockData = function(data){
        data.push(this.nIn_Name);
        data.push(this.nIn_Mute);
        data.push(this.nIn_Delay);
        data.push(this.nIn_Pol);
        data.push(this.nIn_Gain);
        data.push(this.nIn_NoiseGate);
        data.push(this.nIn_Comp_AG);
        data.push(this.nIn_DEQ);
        data.push(this.nIn_EQ);
        data.push(this.nIn_Link);
    };

    this.setInLockData = function(index,data){
        switch (index){
            case 1:
                this.nIn_Name = data;
                break;
            case 2:
                this.nIn_Mute = data;
                break;
            case 3:
                this.nIn_Delay = data;
                break;
            case 4:
                this.nIn_Pol = data;
                break;
            case 5:
                this.nIn_Gain = data;
                break;
            case 6:
                this.nIn_NoiseGate = data;
                break;
            case 7:
                this.nIn_Comp_AG = data;
                break;
            case 8:
                this.nIn_DEQ = data;
                break;
            case 9:
                this.nIn_EQ = data;
                break;
            case 10:
                this.nIn_Link = data;
                break;
            default:

                break;
        }
    }
}

function OutLockData() { //总长度为 32
	this.nOut_Name = temp;                            //  输出  通道  名称
	this.nOut_Mute = temp;                            //  输出  静音
	this.nOut_Delay = temp;                           //  输出  延时
	this.nOut_Pol = temp;                             //  输出  极性
	this.nOut_Gain = temp;                            //  输出  增益
	this.nIn_Matrix = temp;                           //  输出  矩阵
	this.nOut_Comp_LimT = temp;                       //  输出  压线
	this.nOut_EQ = temp;                              //  输出  EQ

	this.nOut_Xover = temp;                           //  输出  高低通
	this.nOut_Link = temp;                            //  输出  联调
	this.Out_Empty = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];  //16  输出  空字节
	//this.Out_Lock_PW = ['1','2','3','4','5','6'];       //   输出   锁定   密码
    this.Out_Lock_PW = [32,32,32,32,32,32]; //32对应的是空格

    this.getOutLockData = function(data){
        data.push(this.nOut_Name);
        data.push(this.nOut_Mute);
        data.push(this.nOut_Delay);
        data.push(this.nOut_Pol);
        data.push(this.nOut_Gain);
        data.push(this.nIn_Matrix);
        data.push(this.nOut_Comp_LimT);
        data.push(this.nOut_EQ);
        data.push(this.nOut_Xover);
        data.push(this.nOut_Link);
    };

    this.setOutLockData = function(index,data){
        switch (index){
            case 1:
                this.nOut_Name = data;
                break;
            case 2:
                this.nOut_Mute = data;
                break;
            case 3:
                this.nOut_Delay = data;
                break;
            case 4:
                this.nOut_Pol = data;
                break;
            case 5:
                this.nOut_Gain = data;
                break;
            case 6:
                this.nIn_Matrix = data;
                break;
            case 7:
                this.nOut_Comp_LimT = data;
                break;
            case 8:
                this.nOut_EQ = data;
                break;
            case 9:
                this.nOut_Xover = data;
                break;
            case 10:
                this.nOut_Link = data;
                break;
            default:

                break;
        }
    }
}

function SystemLockData () { //总长度为32个字节
	this.nSYS_Load_Data = 0;                        //  PC 读取     数据
	this.nSYS_Save_Data = 0;                        //  PC 保存     数据
	this.nSYS_PC_Del = 0;                           //  PC 删除     数据
	this.nSYS_Copy_Data = 0;                        //  PC 拷贝     数据
	this.nSYS_Device_ID = 0;                        //  PC 设备     ID
	this.nSYS_Logo = 0;                             //  MCU   界面  显示
   	this.nSYS_Back_Linght = 0;                      //  背景灯
	this.nSYS_nPanel = 0;                           //  面板  锁定
	this.nSYS_PowerOn = 0;                          //  面板  密码  锁定
    this.Sys_Empty = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];                    //  17个空字节
	this.System_Lock_PW = [32,32,32,32,32,32];     //  密码  只对  当前组   有用。32对应的是空格

    this.getSystemLockData = function(data){
        data.push(this.nSYS_Load_Data);
        data.push(this.nSYS_Save_Data);
        data.push(this.nSYS_PC_Del);
        data.push(this.nSYS_Copy_Data);
        data.push(this.nSYS_Device_ID);
        data.push(this.nSYS_Logo);
        data.push(this.nSYS_Back_Linght);
        data.push(this.nSYS_nPanel);
        data.push(this.nSYS_PowerOn);
    };

    this.setSystemLockData = function(index,data){
        switch (index){
             case 1:
                this.nSYS_Load_Data = data;
                break;
            case 2:
                this.nSYS_Save_Data = data;
                break;
            case 3:
                this.nSYS_PC_Del = data;
                break;
            case 4:
                this.nSYS_Copy_Data = data;
                break;
            case 5:
                this.nSYS_Device_ID = data;
                break;
            case 6:
                this.nSYS_Logo = data;
                break;
            case 7:
                this.nSYS_Back_Linght = data;
                break;
            case 8:
                this.nSYS_nPanel = data;
                break;
            case 9:
                this.nSYS_PowerOn = data;
                break;
            default:

                break;
        }
    }
}

function LockData() {
	this.nIn_LockData = new InLockData();             //   输入   锁定   数据
    this.nOut_LockData = new OutLockData();           //   输出   锁定   数据
}

function AllLockData() {
	this.nIn_LockData = new InLockData();             //   输入   锁定   数据
    this.nOut_LockData = new OutLockData();           //   输出   锁定   数据
	this.nSys_LockData = new SystemLockData();        //   系统   输定   数据
}

function deliverAllGroupData1() { //发送30组数据到设备
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