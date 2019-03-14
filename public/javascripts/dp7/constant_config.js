function EQType() {
    EQType.prototype.MaxTemp = 200;
    EQType.prototype.MinTemp = 0;

    EQType.prototype.MaxMS   = 1000.0;
    EQType.prototype.Max_LM  = 340;
    EQType.prototype.Max_LF  = 1117;
    EQType.prototype.MaxDelay  = 1470;         //发送MCU的Delay最大值
    EQType.prototype.Max_LinkDelay = 480;       //
    EQType.prototype.Delay_10Unit  = 480;      //10毫秒的单位值
    EQType.prototype.MinDelay  = 0;            //发送MCU的Delay最小值

//用于保存EQ显示类型的按钮状态
    EQType.prototype.EQRECT     =  0;
    EQType.prototype.EFFEQLINE   = 1;
    EQType.prototype.MICEQLINE   = 2;
    EQType.prototype.INEQLINE =    3;
    EQType.prototype.OUTEQLINE =   4;

//EQ的线的点数
    EQType.prototype.Param   =  0;         //    参量     均衡
    EQType.prototype.Lo_Shelf = 1;         //    低切
    EQType.prototype.Hi_Shelf = 2;         //    高切
    EQType.prototype.AllPass_Shelf1= 3;     //    1阶全通
    EQType.prototype.AllPass_Shelf2= 4;     //    2阶全通
//////////////////////////////////////////////////////////////////
//          滤波器的类型，共有五种，对应变量：m_nFilterType
//////////////////////////////////////////////////////////////////

    EQType.prototype.Pi_SEQ = 0;          //PEQ
    EQType.prototype.Li_SEQ = 1;          //Li_SEQ
    EQType.prototype.Hi_SEQ = 2;          //Hi_SEQ
    EQType.prototype.ALLPass_SEQ1 = 3;     //1阶 全通
    EQType.prototype.ALLPass_SEQ2 = 4;    //2阶全通



    EQType.prototype.HPF_SEQ = 6; //HPF
    EQType.prototype.LPF_SEQ = 5; //LPF
/////////////////////////////////////////////////////////////////
//                   Hi_EQ 和Lo_EQ 的类型对应变量：m_nType
////////////////////////////////////////////////////////////////

    EQType.prototype.L_R      =  0;
    EQType.prototype.Bessel   =  1;
    EQType.prototype.ButtWorth = 2;

///////////////////////////////////////////////////////////////
//               各个滤波器的dB转换High所用到的参数
///////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////
//                Hi和Li所用到的Oct,对应变量：m_nOct
///////////////////////////////////////////////////////////////

    EQType.prototype.Oct_12dB =  0;
    EQType.prototype.Oct_18dB =  1;
    EQType.prototype.Oct_24dB =  2;
    EQType.prototype.Oct_30dB =  3;
    EQType.prototype.Oct_36dB =  4;
    EQType.prototype.Oct_42dB =  5;
    EQType.prototype.Oct_48dB =  6;
///////////////////////////////////////////////////////////////
//   PEQ ,Hi_Shilf 和 Li_Shilf所用到的Oct,对应变量：m_nOct
///////////////////////////////////////////////////////////////

    EQType.prototype.SEQ_6oct  = 0;
    EQType.prototype.SEQ_12oct = 1;


    EQType.prototype.Max_PLevel_dB = 80;
    EQType.prototype.Min_PLevel_dB = 0;
    EQType.prototype.StepPLevel_dB = 1.0;
    EQType.prototype.Middle_PLevel_dB =80;

    EQType.prototype.MinInGain = 0;            //   最小   Gain
    EQType.prototype.MaxInGain = 240;          //   最大   Gain
    EQType.prototype.MiddleInGain = 30;        //   差值
    EQType.prototype. StepInGain = 0.1;           //   步进

    EQType.prototype.MinOutGain = 0;            //   最小   Gain
    EQType.prototype.MaxOutGain = 920;          //   最大   Gain
    EQType.prototype.MiddleOutGain = 80;        //   差值
    EQType.prototype.StepOutGain = 0.1;                    //   步进

    EQType.prototype.Min_All_InVol = 0;         //   最小输入总音量
    EQType.prototype.Max_All_InVol = 720;       //   最大输入总音量

    EQType.prototype.Min_All_OutVol = 0;         //   最小输出总音量
    EQType.prototype.Max_All_OutVol = 100;       //   最大输出总音量

    EQType.prototype.StepAllVol = 0.1;                       //   总音量 的步进 为：1.0
    EQType.prototype.Middle_AllVol  = 60.0;                   //   总音量差值

    EQType.prototype.Min_InOutVol = 0;           //  最小 输入 音源音量为 0
    EQType.prototype.Max_InOutVol = 120;         //  最大 输入 音源音量为 100
    EQType.prototype.StepInOutVol = 0.5;                     //  音源 音量的步进为：1.0
    EQType.prototype.Middle_FdB_OFF = 60.0;                  //  FdB的差值

    EQType.prototype.Min_NoiseGate = 0;          //  最小   NoiseGate
    EQType.prototype.Max_NoiseGate = 120;        //  最大   NoiseGate
    EQType.prototype.Middle_NoiseGate = 120;     //  差值
    EQType.prototype.Step_NoiseGate = 1.0;

    EQType.prototype.Min_AUTOMATICALLY  = 200;    //  最小 自动 衰减度
    EQType.prototype.Max_AUTOMATICALLY  = 800;  //  最大 自动 衰减度
    EQType.prototype.Step_Automatically = 0.1;              //  自动 衰减度 的步进
    EQType.prototype. Middle_Automatically = 80.0;		    //  自动 衰减度 的差值

    EQType.prototype.Min_0dB_Level  = 860;        //  最小 0dB 电平
    EQType.prototype.Max_0dB_Level  = 1040;      //  最大 0dB 电平
    EQType.prototype.Step_0dB_Level = 0.1;                 //  0dB 电平 的步进
    EQType.prototype. Middle_0dB_Level = 80.0;		        //  0dB 电平 的差值

    EQType.prototype.Min_0dB_Num  = 6;        //  最小 0dB 电平
    EQType.prototype.Max_0dB_Num  = 24;       //  最大 0dB 电平

    EQType.prototype.Min_Preset = 1;            //  最小 预置位
    EQType.prototype.Max_Preset = 128;          //  最大 预置位
    EQType.prototype. Step_Preset = 1.0;

    EQType.prototype.Min_Address = 1;           //  最小 地址位
    EQType.prototype.Max_Address = 255;         //  最大地址位
    EQType.prototype. Step_Address = 1.0;

    EQType.prototype.Min_SONY_Address = 1;           //  最小 地址位
    EQType.prototype.Max_SONY_Address = 7;         //  最大地址位
    EQType.prototype. Step_SONY_Address = 1.0;

    EQType.prototype.Min_Threshold = 500;        // 最小阀值
    EQType.prototype.Max_Threshold = 1300;      // 最大阀值
    EQType.prototype.Middle_Threshold = 120;   // 差值
    EQType.prototype.Step_Threshold  = 0.1;

    EQType.prototype.Min_Response_Time = 0;        // 最小  启动时间
    EQType.prototype.Max_Response_Time = 30;      // 最大  启动时间
    EQType.prototype.Middle_Response_Time = 0;   // 差值
    EQType.prototype.Step_Response_Time = 0.1;

    EQType.prototype.Min_Release_Time = 0;        // 最小  启动时间
    EQType.prototype.Max_Release_Time = 100;      // 最大  启动时间
    EQType.prototype.Middle_Release_Time = -1;   // 差值
    EQType.prototype.Step_Release_Time  = 0.1;
    

//输出Limit 参数
    EQType.prototype.MinLimT = 0;           // 最小压线
    EQType.prototype.MaxLimT = 600;         // 最大压线
    EQType.prototype.MiddleLimT = 30;       // 差值
    EQType.prototype.LimTStep = 0.1;                 //  压线步进

    EQType.prototype.MinLimA = 0;           // 最小启动时间
    EQType.prototype.MaxLimA = 206;         // 最大启动时间

    EQType.prototype.MinLimR = 50;           // 最小释放时间
    EQType.prototype.MaxLimR = 5000;         // 最大释放时间
    EQType.prototype.LimRStep = 1.0;


    // EQType.prototype.Min_Out_CP_LEVER = 600;       // 最小输出压缩电平
    // EQType.prototype.Max_Out_CP_Level = 1200;      // 最大输出压缩电平
    EQType.prototype.Min_Out_CP_LEVER = 600;       // 最小输出压缩电平
    EQType.prototype.Max_Out_CP_Level = 1000;      // 最大输出压缩电平
    EQType.prototype.Middle_OutCP_Level = 80;      // 差值
    EQType.prototype.Step_OutCP_Level = 0.1;


    EQType.prototype.Min_Out_CP_A  = 0;
    EQType.prototype.Max_Out_CP_A  = 206;
    EQType.prototype.Step_OutCP_A = 1.0;

    EQType.prototype.Min_Out_CP_R  = 50;
    EQType.prototype.Max_Out_CP_R  = 5000;
    EQType.prototype.Step_OutCP_A = 1.0;

    EQType.prototype.Min_DEQ_LEVER = 0;      // 最小输入 电平
    EQType.prototype.Max_DEQ_Level = 600;    // 最大输入 电平
    EQType.prototype.Middle_DEQ_Level = 60;   // 差值
    EQType.prototype.Step_DEQ_Level = 0.1;

    EQType.prototype.Min_In_EXT_LEVER = 0;      // 最小输入 电平
    EQType.prototype.Max_In_EXT_Level = 1000;    // 最大输入 电平
    EQType.prototype.Middle_InEXT_Level = 80;   // 差值
    EQType.prototype.Step_InEXT_Level = 0.1;

    EQType.prototype.Min_In_EXT_Threshold = 0;      // 最小输入阀值
    EQType.prototype.Max_In_EXT_Threshold = 1000;   // 最大输入阀值
    EQType.prototype.Middle_InEXT_Threshold = 80;   // 差值
    EQType.prototype.Step_InEXT_Threshold = 0.1;

    EQType.prototype.Min_In_CP_Level = 500;          // 最小输出压缩电平
    EQType.prototype.Max_In_CP_Level = 1000;         // 最大输出压缩电平
    EQType.prototype.Middle_InCP_Level = 80;         // 差值
    EQType.prototype.Step_InCP_Level  = 0.1;

    EQType.prototype.LimT_2  = 0;               // 压限器 2  倍
    EQType.prototype.LimT_4  = 1;               // 压限器 4  倍
    EQType.prototype.LimT_6  = 2;               // 压限器 6  倍
    EQType.prototype.LimT_8  = 3;               // 压限器 8  倍
    EQType.prototype.LimT_16  = 4;              // 压限器 16 倍
    EQType.prototype.LimT_32  = 5;              // 压限器 32 倍

//dB定义
    EQType.prototype.ZEROEQdB = 200;      //ByPassEQ时 EQ的dB值为300
    EQType.prototype.MinEQdB = 0;         //EQdB 最小值
    EQType.prototype.MAXEQdB = 400;       //EQdB 最大值
    EQType.prototype.MiddleEQdB = 20;     //Edit 显示的差值
    EQType.prototype.StepEQdB = 0.1;          //定义EQdB的步进

    EQType.prototype.MaxFreq  =  20000.0;        //   最大频率
    EQType.prototype.MinFreq  =  19.7;           //   最小频率
    EQType.prototype.MinHiFreq = 19.7;         //最小Hi_Shift的频率值
    EQType.prototype.MaxLoFreq = 20000.0;         //最大Lo_Shift的频率值
    EQType.prototype.MaxHL_Freq  =  20000.0;        //   最大频率
    EQType.prototype.MinHL_Freq  =  19.7;            //   最小频率

    EQType.prototype.MaxFreq_Index = 240;           //   最大频率 索引
    EQType.prototype.MinFreq_Index = 0;             //   最小频率 索引
    EQType.prototype.MaxHL_Freq_Index = 240;           //   最大频率 索引
    EQType.prototype.MinHL_Freq_Index = 0;             //   最小频率 索引
    EQType.prototype.End_Double_Freq = 56;   //  频率 浮点结束 位置

    EQType.prototype.MaxBW = 295;              //  最大宽度
    EQType.prototype.MinBW = 0;                //  最小宽度    
    EQType.prototype.StepBW = 0.01;

    EQType.prototype.Max_CP_Ratio = 191;       //  最大压缩比例
    EQType.prototype.Min_CP_Ratio = 1;         //  最小压缩比例

    EQType.prototype.Max_EXT_Ratio = 191;      //  最大扩展比例
    EQType.prototype.Min_EXT_Ratio = 1;        //  最小扩展比例

    EQType.prototype.InA_QUEUE = 0;           //     输入A   队列位置
    EQType.prototype.InB_QUEUE = 1;           //     输入B   队列位置
    EQType.prototype.InC_QUEUE = 2;           //     输入C   队列位置
    EQType.prototype.InD_QUEUE = 3;           //     输入D   队列位置

    EQType.prototype.In_EQNum = 9;            //     输出EQ  的总数目为:9个
    EQType.prototype.Cur_In_EQNum = 6;        //     输出EQ  的总数目为:5个

    EQType.prototype.InRoute_Num = 4;         //     现在    确定为4个输入通道


    EQType.prototype.Out1_QUEUE = 0;           //     输出1   队列位置
    EQType.prototype.Out2_QUEUE = 1;           //     输出2   队列位置
    EQType.prototype.Out3_QUEUE = 2;           //     输出3   队列位置
    EQType.prototype.Out4_QUEUE = 3;           //     输出4   队列位置
    EQType.prototype.Out5_QUEUE = 4;           //     输出5   队列位置
    EQType.prototype.Out6_QUEUE = 5;           //     输出6   队列位置
    EQType.prototype.Out7_QUEUE = 6;           //     输出7   队列位置
    EQType.prototype.Out8_QUEUE = 7;           //     输出8   队列位置

    EQType.prototype.Out_EQNum = 9;            //     输出EQ  的总数目为:9个
    EQType.prototype.Cur_Out_EQNum = 6;        //     输出EQ  的总数目为:5个
    EQType.prototype.In_Type = 1;                               // 输入   类型
    EQType.prototype.Out_Type = 2;                              // 输出   类型
}



function MessageType() {
    MessageType.prototype.Frame_Head_TAG    =   0x5a;    //  帧头标记
    MessageType.prototype.Frame_Trait_TAG   =   0xad;    //  帧特征标记
    MessageType.prototype.Frame_END_TAG     =   0xAA;    //  KTV:数据帧结束标记
    MessageType.prototype.Frame_RD_DEFDATA  =   0x00;    //  默认值

    //  帧类型
    //MCU回应帧
    MessageType.prototype.MCU_Right_Frame =   0x51;      //  MCU   正确回应帧
    MessageType.prototype.MCU_Error_Frame =   0x52;      //  MCU   错误回应帧
    MessageType.prototype.MCU_Data_Frame  =   0x53;      //  MCU   数据回应帧

    MessageType.prototype.PC_Write_Data  =    0xa1;      //  PC    写数据
    MessageType.prototype.PC_Read_Data   =    0xa2;      //  PC    读数据
    MessageType.prototype.PC_Lock_Data   =    0xa9;      //  PC    锁定数据

    //  MCU 数据类型
    MessageType.prototype.  InType_Frame         = 0x01;       //    输入  数据类型  暂时没有用
    MessageType.prototype.  OutType_Frame        = 0x02;       //    输出  数据类型  用于发送小数据包
    MessageType.prototype.  RW_InRoute_Frame     = 0x03;       //    输入  通道 数据
    MessageType.prototype.  RW_OutRoute_Frame    = 0x04;       //    输出  通道 数据
    MessageType.prototype.  RW_AllInRoute_Frame  = 0x05;       //    所有  输入  通道 数据
    MessageType.prototype.  RW_AllOutRoute_Frame = 0x06;       //    所有  输出  通道 数据
    MessageType.prototype.  SysType_Frame        = 0x14;       //    系统  数据类型

    MessageType.prototype.  PC_Read_Lock_Data    = 0xa1;       //    PC读取一组锁定数据
    MessageType.prototype.  PC_Write_Lock_Data   = 0xa2;       //    PC写一组锁定数据

    MessageType.prototype.  PC_Read_Lock_SysData   = 0xa3;     //    PC读 系统 锁定 数据
    MessageType.prototype.  PC_Write_Lock_SysData  = 0xa4;     //    PC写 系统 锁定 数据

    MessageType.prototype.  PC_Read_Lock_InData    = 0xab;      //    PC读 输入 锁定 数据
    MessageType.prototype.  PC_Write_Lock_InData   = 0xac;      //    PC写 输入 锁定 数据

    MessageType.prototype.  PC_Read_Lock_OutData   = 0xad;     //    PC读 输出 锁定 数据
    MessageType.prototype.  PC_Write_Lock_OutData  = 0xae;     //    PC写 输出 锁定 数据

    MessageType.prototype.  PC_Read_Lock_ALL_Data  = 0xb1;     //    PC读取所有组锁定数据
    MessageType.prototype.  PC_Write_Lock_ALL_Data = 0xb2;     //    PC写所有组锁定数据

    //通道ID
    MessageType.prototype.PC_RW_PGNAME       = 0x00;         //  PC     读取 写入 用户名称
    MessageType.prototype.PC_Led_ID          = 0x01;         //  PC     请求Led灯
    MessageType.prototype.PC_Information_ID  = 0x02;         //  PC     界面信息
    MessageType.prototype.PC_Back_Light_ID   = 0x03;         //  PC     背景灯    0：keep on  1:10s
    MessageType.prototype.PC_Device_ID       = 0x04;         //  PC     PC读写    设备   ID
    MessageType.prototype.Connect_Test_ID    = 0x05;         //  联机   测试      命令
    MessageType.prototype.Software_Version   = 0x06;         //  软件   版本      信息
    MessageType.prototype.Del_PG_ID          = 0x07;         //  删除   程序      ID
    MessageType.prototype.Device_StartUp_Set = 0x08;         //  设备   启动      设置
    MessageType.prototype.Device_Type        = 0x09;         //  设备类型 24 26 28 36 46 48
    MessageType.prototype.Volume_Control     = 0x0A;         //  总音量控制 0：不动作 1：Mcu把总音量清零   1：MCU通过总音量实现音量渐增 数据长度为1
                                                            //从设备调用一个程序   从电脑调用一个程序  时用到
    //  数据  长度
    MessageType.prototype.Max_FGroup              = 30;
    MessageType.prototype.Wifi_Name_Lenght        = 255;
    MessageType.prototype.OutRoute_Num            = 8;
    MessageType.prototype.Frame_LEN               = 18;           // 除数据外帧的长度
    MessageType.prototype.In_Data_Lenght          = 120;          // 输入数据长度为120个
    MessageType.prototype.Out_Data_Lenght         = 152;          // 输入数据长度为120个
    MessageType.prototype.RouteName_LEN           = 8;            // 通道名的长度
    MessageType.prototype.PG_Name_LEN             = 12;           // 程序名称的长度
    MessageType.prototype.Mode_Sel_Len            = 1;            //
    MessageType.prototype.Data_Lenght             = 8;            // 数据帧的长度为8
    MessageType.prototype.Soft_Information_Lenght = 48;           // 界面信息长度
    MessageType.prototype.Soft_Version_Lenght     = 8;            // 界面 版本 长度
    MessageType.prototype.Back_Light_Lenght       = 1;            // 背景灯 数据 长度
    MessageType.prototype.Del_PG_Lenght           = 1;            // 删除 程序 数据 长度
    MessageType.prototype.Device_StartUp_Set_Lenght = 6;          // 设备 启动  设置
    MessageType.prototype.Net_Note_Lenght         = 12;           // 网络  备注  长度

    MessageType.prototype.Read_Wifi_Flag         = 1;
    MessageType.prototype.Write_Wifi_Flag        = 2;
    MessageType.prototype.ReSet_Wifi_Flag        = 3;

    MessageType.prototype.LinkType_NULL     = 0;    //  未连接
    MessageType.prototype.LinkType_Com      = 5;    //  USB485连接
    MessageType.prototype.LinkType_RS485    = 2;    //  USB连接
    MessageType.prototype.LinkType_WifiWork = 3;    //  Wifi 连接
    MessageType.prototype.LinkType_NetWork  = 4;    //  NetWork 连接

    MessageType.prototype.LinkType_Usb      = 1;    //  USB连接类型
    MessageType.prototype.LinkType_Web      =5;

    
}


function OperateTypes(){
    OperateTypes.prototype.BUTTON_CLICK = 0;
    OperateTypes.prototype.BUTTON_ADD_LISTENER = 1;
}


function InputTextValueType(){
    InputTextValueType.prototype.NOISE_GATE = 0;
    InputTextValueType.prototype.DELAY_TIME = 1;
    InputTextValueType.prototype.DELAY_METER = 2;
    InputTextValueType.prototype.DELAY_INCH = 3;
    InputTextValueType.prototype.EXTENSION_RATION = 4;
    InputTextValueType.prototype.COMPRESS_RATION = 5;
    InputTextValueType.prototype.FREQUENCY = 6;
    InputTextValueType.prototype.BANDWIDTH = 7;
    InputTextValueType.prototype.SLOPE = 8;
    InputTextValueType.prototype.EQ_GAIN = 9;
    InputTextValueType.prototype.CHANNEL_GAIN = 10;
    InputTextValueType.prototype.ATTACK_TIME = 11;
    InputTextValueType.prototype.RELEASE_TIME = 12;
    InputTextValueType.prototype.INPUT_EXTEND_THRESHOLD = 13;
    InputTextValueType.prototype.OUTPUT_COMPRESS_THRESHOLD = 14;
    InputTextValueType.prototype.TARGET_LEVEL = 15;
    InputTextValueType.prototype.INPUT_COMPRESS_THRESHOLD = 16;
    InputTextValueType.prototype.OUTPUT_LIMITER_THRESHOLD = 17;
    InputTextValueType.prototype.DEQ_FREQUENCY = 18;
    InputTextValueType.prototype.DEQ_BANDWIDTH = 19;
    InputTextValueType.prototype.DEQ_LEVEL = 20;
    InputTextValueType.prototype.DEQ_THRESHOLD = 21;
    InputTextValueType.prototype.DEQ_RATIO = 22;
    InputTextValueType.prototype.DEQ_ATTACK_TIME = 23;
    InputTextValueType.prototype.DEQ_RELEASE_TIME = 24;
    InputTextValueType.prototype.DELAY_SECOND_TIME = 25;
}


function ConstConfigClass() {

    ConstConfigClass.prototype.EQ_FREQUENCY_POINTS = 420;
    /*
    *operateType
    * */
    ConstConfigClass.prototype.OPERATE_ADD_MOUSH_WHEEL_EVENT = 0;
    ConstConfigClass.prototype.OPERATE_MOUSH_WHEEL_RESPOND = 1;

    /*
    * input or output
    * */
    ConstConfigClass.prototype.INPUT_CHANNEL = 0;
    ConstConfigClass.prototype.OUTPUT_CHANNEL = 1;



    ConstConfigClass.prototype.CURRENT_CHANNGEL_OUT_1 = 1;
    ConstConfigClass.prototype.CURRENT_CHANNGEL_OUT_2 = 2;
    ConstConfigClass.prototype.CURRENT_CHANNGEL_OUT_3 = 3;
    ConstConfigClass.prototype.CURRENT_CHANNGEL_OUT_4 = 4;
    ConstConfigClass.prototype.CURRENT_CHANNGEL_OUT_5 = 5;
    ConstConfigClass.prototype.CURRENT_CHANNGEL_OUT_6 = 6;
    ConstConfigClass.prototype.CURRENT_CHANNGEL_OUT_7 = 7;
    ConstConfigClass.prototype.CURRENT_CHANNGEL_OUT_8 = 8;
    ConstConfigClass.prototype.CURRENT_CHANNGEL_INPUT_A = 9;
    ConstConfigClass.prototype.CURRENT_CHANNGEL_INPUT_B = 10;
    ConstConfigClass.prototype.CURRENT_CHANNGEL_INPUT_C = 11;
    ConstConfigClass.prototype.CURRENT_CHANNGEL_INPUT_D = 12;


    /*
    * noiseGate
    * range: [-120, 0]  step_value: 1    value for send: 0-120;
    * */
    ConstConfigClass.prototype.NOISE_GATE_VALUE_MIN = -120;
    ConstConfigClass.prototype.NOISE_GATE_VALUE_MAX = 0;
    ConstConfigClass.prototype.NOISE_GATE_STEPS_MAX = 120;
    ConstConfigClass.prototype.NOISE_GATE_STEP_VALUE = 1;


    /* delay time display
    * have two range
    *range 1：0~10.000ms  stepValue: 0.0208  value for send: 0~480
    *range 2：10~1000     stepValue: 1       value for send: 481~1470
    * */
    ConstConfigClass.prototype.DELAY_TIME_VALUE_MIN = 0;
    ConstConfigClass.prototype.DELAY_TIME_VALUE_MAX = 1000;
    ConstConfigClass.prototype.DELAY_TIME_STEPS_MAX = 1000;
    ConstConfigClass.prototype.DELAY_SECOND_TIME_STEPS_MAX = 95;
    ConstConfigClass.prototype.DELAY_TIME_RANGE_FIRST_STEPS = 1000;
    ConstConfigClass.prototype.DELAY_TIME_RANGE_FIRST_MAX = 1000;
    ConstConfigClass.prototype.DELAY_TIME_STEP_VALUE1 = 1;
    ConstConfigClass.prototype.DELAY_TIME_STEP_VALUE2 = 1;

    /* delay meter display
    * have two range
    *range 1：0~10.000ms  stepValue: 0.0208  value for send: 0~480
    *range 2：10~1000     stepValue: 1       value for send: 481~1470
    * */
    ConstConfigClass.prototype.DELAY_METER_VALUE_MIN = 0.000;
    ConstConfigClass.prototype.DELAY_METER_VALUE_MAX = 340;
    ConstConfigClass.prototype.DELAY_METER_RANGE_FIRST_MAX = 3.4;
    ConstConfigClass.prototype.DELAY_METER_STEP_VALUE1 = 0.007;
    ConstConfigClass.prototype.DELAY_METER_STEP_VALUE2 = 0.34;


    /* delay inch display
    * have two range
    *range 1：0~10.000ms  stepValue: 0.0208  value for send: 0~480
    *range 2：10~1000     stepValue: 1       value for send: 481~1470
    * */
    ConstConfigClass.prototype.DELAY_INCH_VALUE_MIN = 0.000;
    ConstConfigClass.prototype.DELAY_INCH_VALUE_MAX = 1117;
    ConstConfigClass.prototype.DELAY_INCH_RANGE_FIRST_MAX = 11.16;
    ConstConfigClass.prototype.DELAY_INCH_STEP_VALUE1 = 0.023;
    ConstConfigClass.prototype.DELAY_INCH_STEP_VALUE2 = 1.116;

    /* input AGC extension ratio 1:1.0 -- 1:20.0(close)
    * tow ranges
    * first range: [1.0, 2.0]      step_value = 0.1    value for send: 1-10
    * second range: (2.0, 20.0]    step_value = 1      value for send: 11-46
    * */
    ConstConfigClass.prototype.EXTENSION_RATIO_VALUE_MIN = 1.0;
    ConstConfigClass.prototype.EXTENSION_RATIO_VALUE_MAX = 20;
    ConstConfigClass.prototype.EXTENSION_RATIO_STEPS_MAX = 191;
    ConstConfigClass.prototype.EXTENSION_RATIO_RANGE_FIRST_MAX = 2.0;
    ConstConfigClass.prototype.EXTENSION_RATIO_RANGE_FIRST_STEPS = 10;
    ConstConfigClass.prototype.EXTENSION_RATIO_STEP_VALUE1 = 0.1;
    ConstConfigClass.prototype.EXTENSION_RATIO_STEP_VALUE2 = 0.5;

    /*
    *frequency
    * Frequency[417]
    * first range:  [10,29.5]   show one decimal digit
    * second range: [30,30200]   no decimal digit
    * */
    ConstConfigClass.prototype.FREQUENCY_VALUE_MIN = 19.7;
    ConstConfigClass.prototype.FREQUENCY_VALUE_MAX = 20000;
    ConstConfigClass.prototype.FREQUENCY_STEPS_MAX = 240;
    ConstConfigClass.prototype.FREQUENCY_RANGE_FIRST_MAX = 10;
    ConstConfigClass.prototype.FREQUENCY_RANGE_FIRST_STEPS = 54;
    /*
    * slope
    * range SLOPE_ARRAY[296]
    * */
    ConstConfigClass.prototype.SLOPE_VALUE_MIN = 0.404;
    ConstConfigClass.prototype.SLOPE_VALUE_MAX = 28.852;
    ConstConfigClass.prototype.SLOPE_STEPS_MAX = 295;


    /*
    * bandwidth
    * range [0.05, 3.00]  value for send: 0-295
    * step_value 0.1
    * */
    ConstConfigClass.prototype.BANDWIDTH_VALUE_MIN = 0.05;
    ConstConfigClass.prototype.BANDWIDTH_VALUE_MAX = 3.0;
    ConstConfigClass.prototype.BANDWIDTH_STEPS_MAX = 295;
    ConstConfigClass.prototype.BANDWIDTH_STEP_VALUE = 0.01;


    /*
    *eq_gain
    * range [-20, 20]  value for send: 0-400
    * step_value: 0.1
    * */
    ConstConfigClass.prototype.EQ_GAIN_VALUE_MIN = -20;
    ConstConfigClass.prototype.EQ_GAIN_VALUE_MAX = 20;
    ConstConfigClass.prototype.EQ_GAIN_STEPS_MAX = 400;
    ConstConfigClass.prototype.EQ_GAIN_STEP_VALUE = 0.1;

    /*
    *eq_channel_gain
    * range [-80, 12]  value for send: 0-400
    * step_value: 0.1
    * */
    ConstConfigClass.prototype.CHANNEL_GAIN_STEPS_MAX = 920;
    ConstConfigClass.prototype.CHANNEL_GAIN_STEP_VALUE = 0.1;
    ConstConfigClass.prototype.CHANNEL_GAIN_VALUE_MIN = -80;
    ConstConfigClass.prototype.CHANNEL_GAIN_VALUE_MAX = 12;


    /*
    * attack time
    * range [0.3, 200]   two ranges
    * first range:  [0.3, 1]  0.1      7 steps
    * second range: [2, 200]  1         199 steps   sum: 206 steps
    * */
    ConstConfigClass.prototype.ATTACK_TIME_VALUE_MIN = 0.3;
    ConstConfigClass.prototype.ATTACK_TIME_VALUE_MAX = 200;
    ConstConfigClass.prototype.ATTACK_TIME_START_VALUE = 0.3;
    ConstConfigClass.prototype.ATTACK_TIME_STEPS_MAX = 206;
    ConstConfigClass.prototype.ATTACK_TIME_RANGE_FIRST_MAX = 1;
    ConstConfigClass.prototype.ATTACK_TIME_RANGE_FIRST_STEPS = 7;
    ConstConfigClass.prototype.ATTACK_TIME_STEP_VALUE1 = 0.1;
    ConstConfigClass.prototype.ATTACK_TIME_STEP_VALUE2 = 1;

    /*
    * release time
    * range [50, 5000]   value for send  0-4950
    * */
    ConstConfigClass.prototype.RELEASE_TIME_VALUE_MIN = 50;
    ConstConfigClass.prototype.RELEASE_TIME_VALUE_MAX = 5000;
    ConstConfigClass.prototype.RELEASE_TIME_STEPS_MAX = 4950;
    ConstConfigClass.prototype.RELEASE_TIME_STEP_VALUE = 1;


    /*
    * input threshold(extend_threshold same to input target_level compress_threshold)
    *  extend_threshold <= target level <=  compress_threshold
    *  range [-80.0, 20.0]  step_value:0.1  value for send: 0-1000
    * */
    ConstConfigClass.prototype.INPUT_EXTEND_THRESHOLD_VALUE_MIN = -80;
    ConstConfigClass.prototype.INPUT_EXTEND_THRESHOLD_VALUE_MAX = 20;
    ConstConfigClass.prototype.INPUT_EXTEND_THRESHOLD_STEPS_MAX = 1000;
    ConstConfigClass.prototype.INPUT_EXTEND_THRESHOLD_STEP_VALUE = 0.1;


    /*
    * input threshold(extend_threshold same to input target_level compress_threshold)
    *  extend_threshold <= target level <=  compress_threshold
    *  range [-80.0, 20.0]  step_value:0.1  value for send: 0-1000
    * */
    ConstConfigClass.prototype.INPUT_EXTEND_TARGET_LEVEL_VALUE_MIN = -80;
    ConstConfigClass.prototype.INPUT_EXTEND__TARGET_LEVEL_VALUE_MAX = 20;
    ConstConfigClass.prototype.INPUT_EXTEND_TARGET_LEVEL_STEPS_MAX = 1000;
    ConstConfigClass.prototype.INPUT_EXTEND_TARGET_LEVEL_STEP_VALUE = 0.1;

    /*
    * output threshold(compress_threshold same to output_limiter)
    *  compress_threshold <= output_limiter
    *  range [-40.0, 20.0]  step_value:0.1  value for send: 0-600
    * */
    ConstConfigClass.prototype.INPUT_COMPRESS_THRESHOLD_VALUE_MIN = -40;
    ConstConfigClass.prototype.INPUT_COMPRESS_THRESHOLD_VALUE_MAX = 20;
    ConstConfigClass.prototype.INPUT_COMPRESS_THRESHOLD_STEPS_MAX = 600;
    ConstConfigClass.prototype.INPUT_COMPRESS_THRESHOLD_STEP_VALUE = 0.1;

    /*
    * output threshold(compress_threshold same to output_limiter)
    *  compress_threshold <= output_limiter
    *  range [-40.0, 20.0]  step_value:0.1  value for send: 0-600
    * */
    ConstConfigClass.prototype.OUTPUT_COMPRESS_THRESHOLD_VALUE_MIN = -40;
    ConstConfigClass.prototype.OUTPUT_COMPRESS_THRESHOLD_VALUE_MAX = 20;
    ConstConfigClass.prototype.OUTPUT_COMPRESS_THRESHOLD_STEPS_MAX = 600;
    ConstConfigClass.prototype.OUTPUT_COMPRESS_THRESHOLD_STEP_VALUE = 0.1;

    /*
* output threshold(compress_threshold same to output_limiter)
*  compress_threshold <= output_limiter
*  range [-40.0, 20.0]  step_value:0.1  value for send: 0-600
* */
    ConstConfigClass.prototype.OUTPUT_LIMITER_THRESHOLD_VALUE_MIN = -40;
    ConstConfigClass.prototype.OUTPUT_LIMITER_THRESHOLD_VALUE_MAX = 20;
    ConstConfigClass.prototype.OUTPUT_LIMITER_THRESHOLD_STEPS_MAX = 600;
    ConstConfigClass.prototype.OUTPUT_LIMITER_THRESHOLD_STEP_VALUE = 0.1;
    /*
* output threshold(compress_threshold same to output_limiter)
*  compress_threshold <= output_limiter
*  range [-40.0, 20.0]  step_value:0.1  value for send: 0-600
* */
    ConstConfigClass.prototype.DEQ_LEVEL_MIN = -45;
    ConstConfigClass.prototype.DEQ_LEVEL_MAX = 15;
    ConstConfigClass.prototype.DEQ_LEVEL_STEPS_MAX = 600;
    ConstConfigClass.prototype.DEQ_LEVEL_STEP_VALUE = 0.1;
    /*
* output threshold(compress_threshold same to output_limiter)
*  compress_threshold <= output_limiter
*  range [-40.0, 20.0]  step_value:0.1  value for send: 0-600
* */
    ConstConfigClass.prototype.DEQ_THRESHOLD_MIN = -45;
    ConstConfigClass.prototype.DEQ_THRESHOLD_MAX = 15;
    ConstConfigClass.prototype.DEQ_THRESHOLD_STEPS_MAX = 600;
    ConstConfigClass.prototype.DEQ_THRESHOLD_STEP_VALUE = 0.1;
    /* input AGC extension ratio 1:1.0 -- 1:20.0(close)
    * tow ranges
    * first range: [1.0, 2.0]      step_value = 0.1    value for send: 0-10
    * second range: (2.0, 20.0]    step_value = 1      value for send: 11-46
    * */
    ConstConfigClass.prototype.DEQ_RATIO_VALUE_MIN = 1.0;
    ConstConfigClass.prototype.DEQ_RATIO_VALUE_MAX = 20;
    ConstConfigClass.prototype.DEQ_RATIO_STEPS_MAX = 191;
    ConstConfigClass.prototype.DEQ_RATIO_RANGE_FIRST_MAX = 2.0;
    ConstConfigClass.prototype.DEQ_RATIO_RANGE_FIRST_STEPS = 10;
    ConstConfigClass.prototype.DEQ_RATIO_STEP_VALUE1 = 0.1;
    ConstConfigClass.prototype.DEQ_RATIO_STEP_VALUE2 = 0.5;
    /*
/*
* attack time
* range [0.3, 200]   two ranges
* first range:  [0.3, 1]  0.1      7 steps
* second range: [2, 200]  1         199 steps   sum: 206 steps
* */
    ConstConfigClass.prototype.DEQ_ATTACK_TIME_VALUE_MIN = 0.3;
    ConstConfigClass.prototype.DEQ_ATTACK_TIME_VALUE_MAX = 200;
    ConstConfigClass.prototype.DEQ_ATTACK_TIME_START_VALUE = 0.3;
    ConstConfigClass.prototype.DEQ_ATTACK_TIME_STEPS_MAX = 206;
    ConstConfigClass.prototype.DEQ_ATTACK_TIME_RANGE_FIRST_MAX = 1;
    ConstConfigClass.prototype.DEQ_ATTACK_TIME_RANGE_FIRST_STEPS = 7;
    ConstConfigClass.prototype.DEQ_ATTACK_TIME_STEP_VALUE1 = 0.1;
    ConstConfigClass.prototype.DEQ_ATTACK_TIME_STEP_VALUE2 = 1;

    /*
    * release time
    * range [50, 5000]   value for send  0-4950
    * */
    ConstConfigClass.prototype.DEQ_RELEASE_TIME_VALUE_MIN = 50;
    ConstConfigClass.prototype.DEQ_RELEASE_TIME_VALUE_MAX = 5000;
    ConstConfigClass.prototype.DEQ_RELEASE_TIME_STEPS_MAX = 4950;
    ConstConfigClass.prototype.DEQ_RELEASE_TIME_STEP_VALUE = 1;
}






function ControlsId(){
//====================================================================
//Button
    ControlsId.prototype.BUTTON_HELP = 0;
    ControlsId.prototype.BUTTON_PROGRAM = 1;
    ControlsId.prototype.BUTTON_SET = 2;
    ControlsId.prototype.BUTTON_DISPLAY = 3;
    ControlsId.prototype.BUTTON_LOCK = 4;
    ControlsId.prototype.BUTTON_REPORT = 5;

    ControlsId.prototype.BUTTON_SPEAKER_A = 6;
    ControlsId.prototype.BUTTON_CURVE_A = 7;
    ControlsId.prototype.BUTTON_INPUT_A = 8;
    ControlsId.prototype.BUTTON_SPEAKER_B = 9;
    ControlsId.prototype.BUTTON_CURVE_B = 10;
    ControlsId.prototype.BUTTON_INPUT_B = 11;
    ControlsId.prototype.BUTTON_SPEAKER_C = 12;
    ControlsId.prototype.BUTTON_CURVE_C = 13;
    ControlsId.prototype.BUTTON_INPUT_C = 14;
    ControlsId.prototype.BUTTON_SPEAKER_D = 15;
    ControlsId.prototype.BUTTON_CURVE_D = 16;
    ControlsId.prototype.BUTTON_INPUT_D = 17;
    ControlsId.prototype.BUTTON_PHASE = 18;
    ControlsId.prototype.BUTTON_PHASE_CURVE = 19;

    ControlsId.prototype.BUTTON_EQ = 20;
    ControlsId.prototype.BUTTON_EQ1 = 21;
    ControlsId.prototype.BUTTON_EQ2 = 22;
    ControlsId.prototype.BUTTON_EQ3 = 23;
    ControlsId.prototype.BUTTON_EQ4 = 24;
    ControlsId.prototype.BUTTON_EQ5 = 25;
    ControlsId.prototype.BUTTON_EQ6 = 26;
    ControlsId.prototype.BUTTON_DEQ1 = 27;
    ControlsId.prototype.BUTTON_DEQ2 = 28;
    ControlsId.prototype.BUTTON_DEQ = 29;

    ControlsId.prototype.BUTTON_CONNECT = 30;
    ControlsId.prototype.BUTTON_LIST = 31;

    ControlsId.prototype.BUTTON_OUT1_A = 32;
    ControlsId.prototype.BUTTON_OUT1_B = 33;
    ControlsId.prototype.BUTTON_OUT1_C = 34;
    ControlsId.prototype.BUTTON_OUT1_D = 35;
    ControlsId.prototype.BUTTON_OUT1 = 36;
    ControlsId.prototype.BUTTON_SPEAKER_OUT1 = 37;
    ControlsId.prototype.BUTTON_CURVE_OUT1 = 38;

    ControlsId.prototype.BUTTON_OUT2_A = 39;
    ControlsId.prototype.BUTTON_OUT2_B = 40;
    ControlsId.prototype.BUTTON_OUT2_C = 41;
    ControlsId.prototype.BUTTON_OUT2_D = 42;
    ControlsId.prototype.BUTTON_OUT2 = 43;
    ControlsId.prototype.BUTTON_SPEAKER_OUT2 = 44;
    ControlsId.prototype.BUTTON_CURVE_OUT2 = 45;

    ControlsId.prototype.BUTTON_OUT3_A = 46;
    ControlsId.prototype.BUTTON_OUT3_B = 47;
    ControlsId.prototype.BUTTON_OUT3_C = 48;
    ControlsId.prototype.BUTTON_OUT3_D = 49;
    ControlsId.prototype.BUTTON_OUT3 = 50;
    ControlsId.prototype.BUTTON_SPEAKER_OUT3 = 51;
    ControlsId.prototype.BUTTON_CURVE_OUT3 = 52;

    ControlsId.prototype.BUTTON_OUT4_A = 53;
    ControlsId.prototype.BUTTON_OUT4_B = 54;
    ControlsId.prototype.BUTTON_OUT4_C = 55;
    ControlsId.prototype.BUTTON_OUT4_D = 56;
    ControlsId.prototype.BUTTON_OUT4 = 57;
    ControlsId.prototype.BUTTON_SPEAKER_OUT4 = 58;
    ControlsId.prototype.BUTTON_CURVE_OUT4 = 59;

    ControlsId.prototype.BUTTON_OUT5_A = 60;
    ControlsId.prototype.BUTTON_OUT5_B = 61;
    ControlsId.prototype.BUTTON_OUT5_C = 62;
    ControlsId.prototype.BUTTON_OUT5_D = 63;
    ControlsId.prototype.BUTTON_OUT5 = 64;
    ControlsId.prototype.BUTTON_SPEAKER_OUT5 = 65;
    ControlsId.prototype.BUTTON_CURVE_OUT5 = 66;

    ControlsId.prototype.BUTTON_OUT6_A = 67;
    ControlsId.prototype.BUTTON_OUT6_B = 68;
    ControlsId.prototype.BUTTON_OUT6_C = 69;
    ControlsId.prototype.BUTTON_OUT6_D = 70;
    ControlsId.prototype.BUTTON_OUT6 = 71;
    ControlsId.prototype.BUTTON_SPEAKER_OUT6 = 72;
    ControlsId.prototype.BUTTON_CURVE_OUT6 = 73;

    ControlsId.prototype.BUTTON_OUT7_A = 74;
    ControlsId.prototype.BUTTON_OUT7_B = 75;
    ControlsId.prototype.BUTTON_OUT7_C = 76;
    ControlsId.prototype.BUTTON_OUT7_D = 77;
    ControlsId.prototype.BUTTON_OUT7 = 78;
    ControlsId.prototype.BUTTON_SPEAKER_OUT7 = 79;
    ControlsId.prototype.BUTTON_CURVE_OUT7 = 80;

    ControlsId.prototype.BUTTON_OUT8_A = 81;
    ControlsId.prototype.BUTTON_OUT8_B = 82;
    ControlsId.prototype.BUTTON_OUT8_C = 83;
    ControlsId.prototype.BUTTON_OUT8_D = 84;
    ControlsId.prototype.BUTTON_OUT8 = 85;
    ControlsId.prototype.BUTTON_SPEAKER_OUT8 = 86;
    ControlsId.prototype.BUTTON_CURVE_OUT8 = 87;


//====================================================================
//input_text
    ControlsId.prototype.TEXT_INPUT_A = 200;
    ControlsId.prototype.TEXT_VOLUME_A = 201;
    ControlsId.prototype.TEXT_INPUT_B = 202;
    ControlsId.prototype.TEXT_VOLUME_B = 203;
    ControlsId.prototype.TEXT_INPUT_C = 204;
    ControlsId.prototype.TEXT_VOLUME_C = 205;
    ControlsId.prototype.TEXT_INPUT_D = 206;
    ControlsId.prototype.TEXT_VOLUME_D = 207;

    ControlsId.prototype.TEXT_GATE = 208;
    ControlsId.prototype.TEXT_DELAY_MILLISECOND = 209;
    ControlsId.prototype.TEXT_DELAY_METER = 210;
    ControlsId.prototype.TEXT_DELAY_INCH = 211;

    ControlsId.prototype.TEXT_EQ1_FREQUENCY = 212;
    ControlsId.prototype.TEXT_EQ1_BANDWIDTH = 213;
    ControlsId.prototype.TEXT_EQ1_SLOPE = 214;
    ControlsId.prototype.TEXT_EQ1_GAIN = 215;

    ControlsId.prototype.TEXT_EQ2_FREQUENCY = 216;
    ControlsId.prototype.TEXT_EQ2_BANDWIDTH = 217;
    ControlsId.prototype.TEXT_EQ2_SLOPE = 218;
    ControlsId.prototype.TEXT_EQ2_GAIN = 219;

    ControlsId.prototype.TEXT_EQ3_FREQUENCY = 220;
    ControlsId.prototype.TEXT_EQ3_BANDWIDTH = 221;
    ControlsId.prototype.TEXT_EQ3_SLOPE = 222;
    ControlsId.prototype.TEXT_EQ3_GAIN = 223;

    ControlsId.prototype.TEXT_EQ4_FREQUENCY = 224;
    ControlsId.prototype.TEXT_EQ4_BANDWIDTH = 225;
    ControlsId.prototype.TEXT_EQ4_SLOPE = 226;
    ControlsId.prototype.TEXT_EQ4_GAIN = 227;


    ControlsId.prototype.TEXT_EQ5_FREQUENCY = 228;
    ControlsId.prototype.TEXT_EQ5_BANDWIDTH = 229;
    ControlsId.prototype.TEXT_EQ5_SLOPE = 230;
    ControlsId.prototype.TEXT_EQ5_GAIN = 231;

    ControlsId.prototype.TEXT_EQ6_FREQUENCY = 268;
    ControlsId.prototype.TEXT_EQ6_BANDWIDTH = 269;
    ControlsId.prototype.TEXT_EQ6_SLOPE = 270;
    ControlsId.prototype.TEXT_EQ6_GAIN = 271;

    ControlsId.prototype.TEXT_DEQ1_FREQUENCY = 232;
    ControlsId.prototype.TEXT_DEQ1_BANDWIDTH = 233;
    ControlsId.prototype.TEXT_DEQ1_LEVEL = 234;
    ControlsId.prototype.TEXT_DEQ2_FREQUENCY = 235;
    ControlsId.prototype.TEXT_DEQ2_BANDWIDTH = 236;
    ControlsId.prototype.TEXT_DEQ2_LEVEL = 237;

    ControlsId.prototype.TEXT_GAIN = 238;
    ControlsId.prototype.TEXT_PROGRAM_NAME = 239;
    ControlsId.prototype.TEXT_PROGRAM_NO = 240;
    ControlsId.prototype.TEXT_DEVICE_ID = 241;
    ControlsId.prototype.TEXT_DEVICE_IP = 242;

    ControlsId.prototype.TEXT_THRESHOLD = 243;
    ControlsId.prototype.TEXT_TARGET_LEVEL = 244;
    ControlsId.prototype.TEXT_EXTENSION_RATIO = 245;
    ControlsId.prototype.TEXT_EXTENSION_ATTACK = 246;
    ControlsId.prototype.TEXT_EXTENSION_RELEASE = 247;
    ControlsId.prototype.TEXT_COMPRESSOR = 248;
    ControlsId.prototype.TEXT_COMP_RATIO = 249;
    ControlsId.prototype.TEXT_COMP_ATTACK = 250;
    ControlsId.prototype.TEXT_COMP_RELEASE = 251;

    ControlsId.prototype.TEXT_OUT_1 = 252;
    ControlsId.prototype.TEXT_VOLUME_OUT1 = 253;
    ControlsId.prototype.TEXT_OUT_2 = 254;
    ControlsId.prototype.TEXT_VOLUME_OUT2 = 255;
    ControlsId.prototype.TEXT_OUT_3 = 256;
    ControlsId.prototype.TEXT_VOLUME_OUT3 = 257;
    ControlsId.prototype.TEXT_OUT_4 = 258;
    ControlsId.prototype.TEXT_VOLUME_OUT4 = 259;
    ControlsId.prototype.TEXT_OUT_5 = 260;
    ControlsId.prototype.TEXT_VOLUME_OUT5 = 261;
    ControlsId.prototype.TEXT_OUT_6 = 262;
    ControlsId.prototype.TEXT_VOLUME_OUT6 = 263;
    ControlsId.prototype.TEXT_OUT_7 = 264;
    ControlsId.prototype.TEXT_VOLUME_OUT7 = 265;
    ControlsId.prototype.TEXT_OUT_8 = 266;
    ControlsId.prototype.TEXT_VOLUME_OUT8 = 267;

    // up to 271 next should be 272
    ControlsId.prototype.TEXT_INPUT_A = 272;
    ControlsId.prototype.TEXT_INPUT_B = 273;
    ControlsId.prototype.TEXT_INPUT_C = 274;
    ControlsId.prototype.TEXT_INPUT_D = 275;
    ControlsId.prototype.TEXT_OUT_1 = 276;
    ControlsId.prototype.TEXT_OUT_2 = 277;
    ControlsId.prototype.TEXT_OUT_3 = 278;
    ControlsId.prototype.TEXT_OUT_4 = 279;
    ControlsId.prototype.TEXT_OUT_5 = 280;
    ControlsId.prototype.TEXT_OUT_6 = 281;
    ControlsId.prototype.TEXT_OUT_7 = 282;
    ControlsId.prototype.TEXT_OUT_8 = 283;


//========================================================================
//indicate_text
    ControlsId.prototype.INDICATE_TEXT_NOISE_GATE = 300;
    ControlsId.prototype.INDICATE_TEXT_NOISE_GATE_VALUE = 301;
    ControlsId.prototype.INDICATE_TEXT_DELAY = 302;

    ControlsId.prototype.INDICATE_TEXT_MILLISECOND = 303;
    ControlsId.prototype.INDICATE_TEXT_METER = 304;
    ControlsId.prototype.INDICATE_TEXT_INCH = 305;
    ControlsId.prototype.INDICATE_TEXT_PHASE = 306;
    ControlsId.prototype.INDICATE_TEXT_MODE = 307;
    ControlsId.prototype.INDICATE_TEXT_FREQUENCY = 308;
    ControlsId.prototype.INDICATE_TEXT_BANDWIDTH = 309;
    ControlsId.prototype.INDICATE_TEXT_SLOPE = 310;
    ControlsId.prototype.INDICATE_TEXT_GAIN = 311;
    ControlsId.prototype.INDICATE_TEXT_DYNAMIC = 312;
    ControlsId.prototype.INDICATE_TEXT_DEQ1_FREQUENCY = 313;
    ControlsId.prototype.INDICATE_TEXT_DEQ1_BANDWIDTH = 314;
    ControlsId.prototype.INDICATE_TEXT_DEQ1_LEVEL = 315;
    ControlsId.prototype.INDICATE_TEXT_DEQ2_FREQUENCY = 316;
    ControlsId.prototype.INDICATE_TEXT_DEQ2_BANDWIDTH = 317;
    ControlsId.prototype.INDICATE_TEXT_DEQ2_LEVEL = 318;
    ControlsId.prototype.INDICATE_TEXT_PROGRAM_NAME = 319;
    ControlsId.prototype.INDICATE_TEXT_PROGRAM_NO = 320;
    ControlsId.prototype.INDICATE_TEXT_DEVICE_ID_IP = 321;

    ControlsId.prototype.INDICATE_TEXT_AUTO_GAIN = 322;
    ControlsId.prototype.INDICATE_TEXT_THRESHOLD = 323;
    ControlsId.prototype.INDICATE_TEXT_LEVEL = 324;
    ControlsId.prototype.INDICATE_TEXT_DBU = 325;
    ControlsId.prototype.INDICATE_TEXT_RATIO = 326;
    ControlsId.prototype.INDICATE_TEXT_ATTACK = 327;
    ControlsId.prototype.INDICATE_TEXT_RELEASE = 328;
    ControlsId.prototype.INDICATE_TEXT_COMPRESS = 329;
    ControlsId.prototype.INDICATE_TEXT_COMPRESS_RATIO = 330;
//=========================================================================
//===Spinner (select)
    ControlsId.prototype.SELECT_LINK_A = 400;
    ControlsId.prototype.SELECT_LINK_B = 401;
    ControlsId.prototype.SELECT_LINK_C = 402;
    ControlsId.prototype.SELECT_LINK_D = 403;
    ControlsId.prototype.SELECT_MODE1 = 404;
    ControlsId.prototype.SELECT_MODE2 = 405;
    ControlsId.prototype.SELECT_MODE3 = 406;
    ControlsId.prototype.SELECT_MODE4 = 407;
    ControlsId.prototype.SELECT_MODE5 = 408;
    ControlsId.prototype.SELECT_MODE6 = 409;
    ControlsId.prototype.SELECT_LINK_OUT1 = 410;
    ControlsId.prototype.SELECT_LINK_OUT2 = 411;
    ControlsId.prototype.SELECT_LINK_OUT3 = 412;
    ControlsId.prototype.SELECT_LINK_OUT4 = 413;
    ControlsId.prototype.SELECT_LINK_OUT5 = 414;
    ControlsId.prototype.SELECT_LINK_OUT6 = 415;
    ControlsId.prototype.SELECT_LINK_OUT7 = 416;
    ControlsId.prototype.SELECT_LINK_OUT8 = 417;
//=========================================================================
//===slider_thump
    ControlsId.prototype.SLIDER_EQ1_THUMP = 450;
    ControlsId.prototype.SLIDER_EQ2_THUMP = 451;
    ControlsId.prototype.SLIDER_EQ3_THUMP = 452;
    ControlsId.prototype.SLIDER_EQ4_THUMP = 453;
    ControlsId.prototype.SLIDER_EQ5_THUMP = 454;
    ControlsId.prototype.SLIDER_EQ6_THUMP = 455;

    ControlsId.prototype.SLIDER_GAIN_THUMP = 456;

    ControlsId.prototype.SLIDER_GAIN_INPUT_A = 457;
    ControlsId.prototype.SLIDER_GAIN_INPUT_B = 458;
    ControlsId.prototype.SLIDER_GAIN_INPUT_C = 459;
    ControlsId.prototype.SLIDER_GAIN_INPUT_D = 460;

    ControlsId.prototype.SLIDER_GAIN_OUT1 = 461;
    ControlsId.prototype.SLIDER_GAIN_OUT2 = 462;
    ControlsId.prototype.SLIDER_GAIN_OUT3 = 463;
    ControlsId.prototype.SLIDER_GAIN_OUT4 = 464;
    ControlsId.prototype.SLIDER_GAIN_OUT5 = 465;
    ControlsId.prototype.SLIDER_GAIN_OUT6 = 466;
    ControlsId.prototype.SLIDER_GAIN_OUT7 = 467;
    ControlsId.prototype.SLIDER_GAIN_OUT8 = 468;


    ControlsId.prototype.TEXT_DEQ1_THRESHOLD = 469;
    ControlsId.prototype.TEXT_DEQ1_RATIO = 470;
    ControlsId.prototype.TEXT_DEQ1_ATTACK_TIME = 471;
    ControlsId.prototype.TEXT_DEQ1_RELEASE_TIME = 472;

    ControlsId.prototype.TEXT_DEQ2_THRESHOLD =  473;
    ControlsId.prototype.TEXT_DEQ2_RATIO = 474;
    ControlsId.prototype.TEXT_DEQ2_ATTACK_TIME= 475;
    ControlsId.prototype.TEXT_DEQ2_RELEASE_TIME = 476;
}


//定义常量
var SLOPE_ARRAY = [
    28.852,24.043,20.608,18.031,16.027,14.424,
    13.112,12.019,11.094,10.301,9.614,9.012,8.482,8.010,7.588,7.208,6.864,6.551,
    6.266,6.004,5.764,5.541,5.336,5.144,4.966,4.800,4.645,4.499,4.362,4.233,4.112,
    3.997,3.889,3.786,3.688,3.595,3.507,3.423,3.343,3.266,3.193,3.123,3.056,2.992,
    2.930,2.871,2.814,2.759,2.707,2.656,2.607,2.560,2.515,2.471,2.428,2.387,2.348,
    2.309,2.272,2.236,2.201,2.167,2.134,2.102,2.071,2.041,2.012,1.983,1.955,1.928,
    1.902,1.877,1.852,1.827,1.804,1.780,1.758,1.736,1.714,1.693,1.673,1.653,1.633,
    1.614,1.596,1.577,1.559,1.542,1.525,1.508,1.492,1.475,1.460,1.444,1.429,1.414,
    1.400,1.385,1.371,1.358,1.344,1.331,1.318,1.305,1.293,1.280,1.268,1.256,1.245,
    1.233,1.222,1.211,1.200,1.189,1.179,1.168,1.158,1.148,1.138,1.128,1.119,1.109,
    1.100,1.091,1.082,1.073,1.064,1.056,1.047,1.039,1.031,1.023,1.015,1.007,0.999,
    0.991,0.984,0.976,0.969,0.961,0.954,0.947,0.940,0.933,0.927,0.920,0.913,0.907,
    0.900,0.894,0.887,0.881,0.875,0.869,0.863,0.857,0.851,0.845,0.840,0.834,0.828,
    0.823,0.817,0.812,0.807,0.801,0.796,0.791,0.786,0.781,0.776,0.771,0.766,0.761,
    0.757,0.752,0.747,0.742,0.738,0.733,0.729,0.724,0.720,0.716,0.711,0.707,0.703,
    0.699,0.695,0.690,0.686,0.682,0.678,0.674,0.671,0.667,0.663,0.659,0.655,0.652,
    0.648,0.644,0.641,0.637,0.633,0.630,0.626,0.623,0.620,0.616,0.613,0.609,0.606,
    0.603,0.600,0.596,0.593,0.590,0.587,0.584,0.581,0.577,0.574,0.571,0.568,0.565,
    0.563,0.560,0.557,0.554,0.551,0.548,0.545,0.543,0.540,0.537,0.534,0.532,0.529,
    0.526,0.524,0.521,0.518,0.516,0.513,0.511,0.508,0.506,0.503,0.501,0.498,0.496,
    0.493,0.491,0.489,0.486,0.484,0.482,0.479,0.477,0.475,0.473,0.470,0.468,0.466,
    0.464,0.461,0.459,0.457,0.455,0.453,0.451,0.449,0.447,0.445,0.442,0.440,0.438,
    0.436,0.434,0.432,0.430,0.428,0.427,0.425,0.423,0.421,0.419,0.417,0.415,0.413,
    0.411,0.410,0.408,0.406,0.404
];

var  frequency = [
    19.71,  20.31,  20.91,  21.51,  22.11,  22.71,  23.41,  24.11,
    24.81,  25.5,   26.3,   27.0,   27.8,   28.7,   29.5,   30.4,
    31.3,   32.2,   33.1,   34.1,   35.1,   36.1,   37.2,   38.3,
    39.4,   40.5,   41.7,   42.9,   44.2,   45.5,   46.8,   48.2,
    49.6,   51.1,   52.6,   54.1,   55.7,   57.3,   59.0,   60.7,
    62.5,   64.3,   66.2,   68.2,   70.2,   72.2,   74.3,   76.5,
    78.7,   81.1,   83.4,   85.9,   88.4,   91.0,   93.6,   96.4,
    99.2,   102,    105,    108,    111,    115,    118,    121,
    125,    129,    132,    136,    140,    144,    149,    153,
    158,    162,    167,    172,    179,    182,    187,    193,
    198,    204,    210,    216,    223,    229,    236,    243,
    250,    257,    265,    273,    281,    289,    297,    306,
    315,    324,    334,    344,    354,    364,    375,    386,
    397,    409,    420,    433,    445,    459,    472,    486,
    500,    515,    530,    545,    561,    578,    595,    612,
    630,    648,    667,    687,    707,    728,    749,    771,
    794,    817,    841,    866,    891,    917,    944,    972,
    1000,   1030,   1060,   1090,   1123,   1155,   1190,   1224,
    1260,   1297,   1335,   1374,   1414,   1456,   1498,   1542,
    1587,   1634,   1682,   1731,   1782,   1834,   1888,   1943,
    2000,   2059,   2119,   2181,   2245,   2311,   2378,   2448,
    2520,   2594,   2670,   2748,   2828,   2911,   2997,   3084,
    3175,   3268,   3364,   3462,   3564,   3668,   3776,   3886,
    4000,   4117,   4238,   4362,   4490,   4621,   4757,   4896,
    5000,   5187,   5339,   5496,   5657,   5823,   5993,   6169,
    6350,   6536,   6727,   6924,   7127,   7336,   7551,   7772,
    8000,   8234,   8476,   8724,   8980,   9243,   9514,   9792,
    10079,  10374,  10679,  10992,  11314,  11645,  11987,  12338,
    12699,  13071,  13454,  13849,  14254,  14672,  15102,  15545,
    16000,  16469,  16951,  17448,  17959,  18486,  19027,  19585,
    20000.0
];

var fine_delay =  [  //96
    0.000,0.010,0.021,0.031,0.042,0.052,0.063,0.073,0.083,0.094,0.104,0.115,0.125,0.135,0.146,0.156,0.167,0.177,0.188,0.198,
    0.208,0.219,0.229,0.240,0.250,0.260,0.271,0.281,0.292,0.302,0.313,0.323,0.333,0.344,0.354,0.365,0.375,0.385,0.396,0.406,
    0.417,0.427,0.438,0.448,0.458,0.469,0.479,0.490,0.500,0.510,0.521,0.531,0.542,0.552,0.563,0.573,0.583,0.594,0.604,0.615,
    0.625,0.635,0.646,0.656,0.667,0.677,0.688,0.698,0.708,0.719,0.729,0.740,0.750,0.760,0.771,0.781,0.792,0.802,0.813,0.823,
    0.833,0.844,0.854,0.865,0.875,0.885,0.896,0.906,0.917,0.927,0.938,0.948,0.958,0.969,0.979,0.990
];

/*
Max_PLevel_dB = 80;
Min_PLevel_dB = 0;
StepPLevel_dB = 1.0;
Middle_PLevel_dB = 80;

MinInGain = 0;            //   最小   Gain
MaxInGain = 420;          //   最大   Gain
MiddleInGain = 30;        //   差值 
StepInGain = 0.1;           //   步进

MinOutGain = 0;            //   最小   Gain
MaxOutGain = 920;          //   最大   Gain
MiddleOutGain = 80;        //   差值 
StepOutGain = 0.1;                    //   步进

Min_All_InVol = 0;         //   最小输入总音量
Max_All_InVol = 720;       //   最大输入总音量

Min_All_OutVol = 0;         //   最小输出总音量
Max_All_OutVol = 100;       //   最大输出总音量

StepAllVol = 0.1;                       //   总音量 的步进 为：1.0
Middle_AllVol = 60.0;                   //   总音量差值

Min_InOutVol = 0;           //  最小 输入 音源音量为 0
Max_InOutVol = 120;         //  最大 输入 音源音量为 100
StepInOutVol = 0.5;                     //  音源 音量的步进为：1.0
Middle_FdB_OFF = 60.0;                  //  FdB的差值

Min_NoiseGate = 0;          //  最小   NoiseGate
Max_NoiseGate = 120;        //  最大   NoiseGate
Middle_NoiseGate = 120;     //  差值
Step_NoiseGate = 1.0;

Min_AUTOMATICALLY  = 200;    //  最小 自动 衰减度
Max_AUTOMATICALLY  = 800;  //  最大 自动 衰减度
Step_Automatically = 0.1;              //  自动 衰减度 的步进
Middle_Automatically = 80.0;		    //  自动 衰减度 的差值

Min_0dB_Level  = 860;        //  最小 0dB 电平
Max_0dB_Level  = 1040;      //  最大 0dB 电平
Step_0dB_Level = 0.1;                  //  0dB 电平 的步进
Middle_0dB_Level = 80.0;		        //  0dB 电平 的差值

Min_0dB_Num  = 6;        //  最小 0dB 电平
Max_0dB_Num  = 24;       //  最大 0dB 电平

Min_Preset = 1;            //  最小 预置位
Max_Preset = 128;          //  最大 预置位
Step_Preset = 1.0;

Min_Address = 1;           //  最小 地址位
Max_Address = 255;         //  最大地址位
Step_Address = 1.0;

Min_SONY_Address = 1;           //  最小 地址位
Max_SONY_Address = 7;         //  最大地址位
Step_SONY_Address = 1.0;

Min_Threshold = 500;        // 最小阀值
Max_Threshold = 1300;      // 最大阀值
Middle_Threshold = 120;   // 差值
Step_Threshold  = 0.1;

Min_Response_Time = 0;        // 最小  启动时间
Max_Response_Time = 30;      // 最大  启动时间
Middle_Response_Time = 0;   // 差值
Step_Response_Time  = 0.1;

Min_Release_Time = 0;        // 最小  启动时间
Max_Release_Time = 100;      // 最大  启动时间
Middle_Release_Time = -1;   // 差值
Step_Release_Time  = 0.1;

//  SetUpDlg;

//输出Limit 参数
MinLimT = 0;           // 最小压线
MaxLimT = 500;         // 最大压线
MiddleLimT = 30;       // 差值
LimTStep = 0.1;                  //  压线步进

MinLimA = 0;           // 最小启动时间
MaxLimA = 206;         // 最大启动时间

MinLimR = 50;           // 最小释放时间
MaxLimR = 5000;         // 最大释放时间
LimRStep = 1.0;


Min_Out_CP_LEVER = 500;       // 最小输出压缩电平
Max_Out_CP_Level = 1000;      // 最大输出压缩电平
Middle_OutCP_Level = 80;      // 差值
Step_OutCP_Level  = 0.1;


Min_Out_CP_A  = 0;
Max_Out_CP_A  = 206;
Step_OutCP_A = 1.0;

Min_Out_CP_R  = 50;
Max_Out_CP_R  = 5000;

Min_DEQ_LEVER = 0;      // 最小输入 电平
Max_DEQ_Level = 800;    // 最大输入 电平
Middle_DEQ_Level = 60;   // 差值
Step_DEQ_Level = 0.1;

Min_In_EXT_LEVER = 0;      // 最小输入 电平
Max_In_EXT_Level = 1000;    // 最大输入 电平
Middle_InEXT_Level = 80;   // 差值
Step_InEXT_Level = 0.1;

Min_In_EXT_Threshold = 0;      // 最小输入阀值
Max_In_EXT_Threshold = 1000;   // 最大输入阀值
Middle_InEXT_Threshold = 80;   // 差值
Step_InEXT_Threshold = 0.1;

Min_In_CP_Level = 500;          // 最小输出压缩电平
Max_In_CP_Level = 1000;         // 最大输出压缩电平
Middle_InCP_Level = 80;         // 差值
Step_InCP_Level = 0.1;

LimT_2  = 0;               // 压限器 2  倍
LimT_4  = 1;               // 压限器 4  倍
LimT_6  = 2;               // 压限器 6  倍
LimT_8  = 3;               // 压限器 8  倍
LimT_16  = 4;              // 压限器 16 倍
LimT_32  = 5;              // 压限器 32 倍

//EQ数据定义



//dB定义
ZEROEQdB = 200;      //ByPassEQ时 EQ的dB值为300
MinEQdB = 0;         //EQdB 最小值
MAXEQdB = 400;       //EQdB 最大值
MiddleEQdB = 20;     //Edit 显示的差值
StepEQdB = 0.1;          //定义EQdB的步进
//StepEQdB 0.1


//Freq 

//EQ的线的点数
EQPo= 420;     //  频率 坐标 点数
Freq_Table = 417;     //  EQ 频率 个数
HLFreq_Table = 417;     //  高低通 频率 个数


MaxFreq  =  30200.0;        //   最大频率
MinFreq  =  10.0;           //   最小频率

MinHiFreq = 10.0;         //最小Hi_Shift的频率值
MaxLoFreq = 30200.0;         //最大Lo_Shift的频率值

MaxHL_Freq  =  30200.0;        //   最大频率
MinHL_Freq  =  10.0;            //   最小频率



MaxFreq_Index = 416;           //   最大频率 索引       
MinFreq_Index = 0;             //   最小频率 索引

MaxHL_Freq_Index = 416;           //   最大频率 索引       
MinHL_Freq_Index = 0;             //   最小频率 索引

End_Double_Freq = 56;   //  频率 浮点结束 位置



MaxBW = 295;              //  最大宽度
MinBW = 0;                //  最小宽度    
StepBW = 0.01;

Max_CP_Ratio = 191;       //  最大压缩比例
Min_CP_Ratio = 1;         //  最小压缩比例

Max_EXT_Ratio = 191;      //  最大扩展比例
Min_EXT_Ratio = 1;        //  最小扩展比例
*/