
// window.LeftGap = 35;
// window.TopGap = 10;

window.LeftGap = 0;
window.TopGap = 0;

window.m_nShadowPoint = new Array(frequency.length);
window.m_nPointF = new Array(frequency.length);
window.EQPoint = frequency.length;
window.m_nPol_Point = new Array(frequency.length);
window.pi = 3.1415926;
window.FS = 96000;
//window.m_nPoint = new Array(422);

// window.TopGap = 10;    //Top距离静态类的距离
// window.BottomGap = 20; //BotttomGap距离静态类的距离
window.TopGap = 0;    //Top距离静态类的距离
window.BottomGap = 0; //BotttomGap距离静态类的距离
//window.LeftGap = 35;   //LeftGap距离静态类的距离
window.AddBW = 10;     //两个小矩形的距离
window.RightGap = 50;  //RightGap距离静态类的距离
window.RectSize = 20;  //Filter类的m_nRect 的大小
window.BWRectSize = 8; //Filter类的m_nLRect,m_RRect的大

window.FS =  96000;
window.pi =  3.1415926;

window.EQPoint = frequency.length;

function FilterClass() {
    this.m_nHigh = curveHeight;
    this.m_nWidth = curveWidth;
    this.m_pEQ = new PublicEQ(0,0,0,0,0);
    this.m_pXOver = new PublicXover();

    this.m_nShowRect = new RectClass(0, 0, 0, 0);   //显示filter 的数据方框
    this.m_nPoint = new Array(frequency.length);    //  保存滤波器图形每点所对应的dB值
	this.m_nPol_Point = new Array(frequency.length);//  相位  曲线     坐标点
	this.m_nFirstFreq = 0;	                        //  保存前一个FREQ得值
	this.m_nFDSpace = new PointClass(0, 0);         //  坐标点距离Freq和db的距离
	this.m_nLSpace  = 0;                            //  坐标点距离m_nLRect的Right的距离
	this.m_nRSpace  = 0;                            //  坐标点距离m_nRRect的Left的距离
	this.m_nRect = new RectClass(0, 0, 0, 0);       //  Freq和db点的矩形
	this.m_nLRect= new RectClass(0, 0, 0, 0);
	this.m_nRRect= new RectClass(0, 0, 0, 0);      //  BW点的左右矩形
	this.m_bRectOver = false;                       //  鼠标在m_nRect上边
	this.m_bLRectOver = false;                      //  鼠标在m_nLRect上边
	this.m_bRRectOver = false;                      //  鼠标在m_nRRect上边
	this.m_bMouseDown = false;                      //  TRUE = 鼠标在m_nRect上边，并且左键也按下
	this.m_bLMouseDown = false;                     //  TRUE = 鼠标在m_nLRect上边，并且左键也按下
	this.m_bRMouseDown = false;                     //  TRUE = 鼠标在m_nRRect上边，并且右键也被按下

	this.m_nFilterType  = 0;                        //滤波器类型有PEQ,Hi_Shelf,L0_Shelf,Lo_EQ,Hi_EQ五种类型
	this.m_nFreq  = 0;                              //频率
	this.m_nHLFreq  = 0;
	this.m_nHLShowType  = 0;                        //高低通类型:有的时候显示不同的高低通
	this.m_ndB  = 0;                                //增益

    this.m_nBW = 0;                // Q 值
	this.m_nType  = 0;             //Lo_EQ 和 Hi_EQ 的类型: LR,Bessel,BTWorth
	this.m_nOct  = 0;              //OCT的类型
	this.m_nid  = 0;               //滤波器的id
    this.m_nWidth  = curveWidth;            //滤波器图形显示的宽度
	this.m_nHigh  = curveHeight;             //滤波器图形显示的高度
    this.m_bFType  = 0;            //用于判断是PEQ滤波器还是Lo 和 Hi 滤波器，滤波器类型判断

	this.m_bByPass = false;                         //ByPass标志
	this.m_bAllByPass = false;  		            //all byPass
	this.m_bAllEQByPass = false;                    //ALLEQByPass  保存ALL的状态.

	this.m_bAPF_Pass_Flag = false;                  //APF     标记
	this.m_bAPF_AllByPass = false;                  //总PASS  APF 标记
	this.m_bAPF_ByPass = false;                     //APF     标记
	this.m_bAPF_Save_AllByPass = false;             //保存    APF    总标记

	this.m_nLimit_HPFFreq  = 0;
	this.m_nLimit_LPFFreq  = 0;             //高低通
    
	//新协议
	this.m_nShadowPoint = new Array(423);  //划阴影面积的坐标点
	this.m_nShowData = ['', ''];                  //显示Filter的数据



    FilterClass.prototype.init = function () {

        for(var i=0; i<frequency.length; i++) {
            this.m_nPoint[i] = 0;
            this.m_nPol_Point[i] = 0;
        }

        for(i=0; i<423; i++) {
            this.m_nShadowPoint[i] = new PointClass(0,0);
        }


        this.m_nShadowPoint[0].x = LeftGap;
        this.m_nShadowPoint[0].y = parseInt(docToHighF(0.0, this.m_nHigh)) + TopGap;
        this.m_nShadowPoint[frequency.length-1].x = this.m_nWidth + LeftGap;
        this.m_nShadowPoint[frequency.length-1].y = parseInt(docToHighF(0.0, this.m_nHigh)) + TopGap;
        for (i = 0; i < frequency.length; i++) {
            this.m_nShadowPoint[i + 1].x = parseInt(docToWidthF(frequency[i], this.m_nWidth)) + LeftGap;
            if (this.m_nShadowPoint[i + 1].x > this.m_nShadowPoint[EQPoint + 1].x) {
                this.m_nShadowPoint[i + 1].x = this.m_nShadowPoint[EQPoint + 1].x;
            }
        }
        //this.UpDataPoint(false);
    };




    /////////////////////////////////////////////////////////////////////////////////
    //                       得到用于设置对话框的滤波器的值                                //
    /////////////////////////////////////////////////////////////////////////////////

    FilterClass.prototype.GetBW = function () //由保存的带宽步数 获得带宽的显示值
    {
        this.m_nBW = (this.m_pEQ.bw) * 0.01+0.05;
        return this.m_nBW;
    };

    FilterClass.prototype.GetdB = function () //获得 显示的增益值
    {
        var ndB = 0.0;
        if(this.m_bAllByPass)
        {
            return ndB;
        }
        else
        {
            if(this.m_bByPass)
            {
                return ndB;
            }
            else
            {
                ndB = this.m_pEQ.level*eqType.StepEQdB - eqType.MiddleEQdB;
                // console.log('levelStep: ' + this.m_pEQ.level + '  增益：' + ndB);
                return ndB;
            }
        }
        return this.m_ndB;
    };


    // FilterClass.prototype.GetLoHiType = function ()	//获取滤波器类型
    // {
    //     var nType;
    //     switch(this.m_nFilterType)
    //     {
    //         case eqType.Param:
    //             nType = eqType.Param;
    //             break;
    //         case eqType.Lo_Shelf:
    //             this.m_nOct = GET_4H_BYTE(this.m_pEQ.HL_db_AP_Flag);
    //             nType = this.m_nFilterType + this.m_nOct;
    //             break;
    //         case eqType.Hi_Shelf:
    //             this.m_nOct = GET_4H_BYTE(this.m_pEQ.HL_db_AP_Flag);
    //             nType = this.m_nFilterType + eqType.Lo_Shelf+this.m_nOct;
    //             break;
    //         case eqType.ALLPass_SEQ1:
    //
    //             break;
    //         case eqType.ALLPass_SEQ2:
    //
    //             break;
    //         default:
    //
    //             break;
    //
    //     }
    //     return nType;
    // };

    FilterClass.prototype.GetLoType = function ()          //得到低通类型
    {
        return GET_4H_BYTE(this.m_pEQ.HL_db_AP_Flag);
    };

    FilterClass.prototype.GetHiType = function ()          //得到高通类型
    {
        return GET_4H_BYTE(this.m_pEQ.HL_db_AP_Flag);
    };

    FilterClass.prototype.GetByPass = function ()	//获取模式类型
    {
        if((this.m_pEQ.type === eqType.AllPass_Shelf1) || (this.m_pEQ.type === eqType.AllPass_Shelf2))
        {
            if(this.m_bAPF_AllByPass)
            {
                 return this.m_bAPF_AllByPass;
            }
            else
            {
                 if(this.m_bAPF_ByPass)
                 {
                     return this.m_bAPF_Pass_Flag;
                 }
                 else
                 {
                     return GET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag);
                 }
            }
        }
        else
        {
            if(this.m_bAllByPass)
            {
                return this.m_bAllByPass;
            }
            else
            {
                return this.m_bByPass;
            }
        }
    };

     FilterClass.prototype.GetShowData = function ()      //   显示   的数据
    {
        var str;
        switch(this.m_nFilterType)
        {
        case eqType.Pi_SEQ: //参量模式
            str = this.m_nid.toString(10);
            str = "EQ" + str + "";
            this.m_nShowData[0] = str;
            if(this.m_pEQ.freq <= eqType.End_Double_Freq)
            {
                this.m_nShowData[1] = 'PEQ ' + getFrequencyDisplay(this.m_pEQ.freq);
            }
            else
            {
                this.m_nShowData[1] = 'PEQ ' + getFrequencyDisplay(this.m_pEQ.freq);
            }
            this.m_nShowData[1] = this.m_nShowData[1]+"Hz ";
            this.GetBW(); //获得显示的增益值
            str = toStringFloat(this.m_nBW, 2);
            str = str + "Oct ";
            this.m_nShowData[1] = this.m_nShowData[1] + str;
            if(this.m_bAllByPass)
            {
                str = "0.0";
            }
            else
            {
                if(this.m_bByPass)
                {
                    str = "0.0";
                }
                else
                {
                    str = toStringFloat(this.GetdB(), 1);
                }
            }
            str = str + "dB";
            this.m_nShowData[1] = this.m_nShowData[1] + str;
            break;
        case eqType.Li_SEQ:	//低调模式
            str = this.m_nid.toString(10);
            str = "EQ" + str;
            this.m_nShowData[0] = str;
            if(this.m_pEQ.freq <= eqType.End_Double_Freq)
            {
                this.m_nShowData[1] ='Lo  ' + getFrequencyDisplay(this.m_pEQ.freq);
            }
            else
            {
                this.m_nShowData[1] ='Lo  ' + getFrequencyDisplay(this.m_pEQ.freq);
            }
            // this.m_nShowData[1] = str+this.m_nShowData[1];
            this.m_nShowData[1] = this.m_nShowData[1] + "Hz ";
            this.m_nShowData[1] = this.m_nShowData[1] + this.GetPlayEQOct()+" ";
            if(this.m_bAllByPass)
            {
                str = "0.0";
            }
            else
            {
                if(this.m_bByPass)
                {
                    str = "0.0";
                }
                else
                {
                    str = toStringFloat(this.GetdB(), 1);
                }
            }
            str = str + "dB";
            this.m_nShowData[1] = this.m_nShowData[1] + str;
            break;
        case eqType.Hi_Shelf:	//高调模式
            str = this.m_nid.toString(10);
            str = "EQ" + str;
            this.m_nShowData[0] = str;
            if(this.m_pEQ.freq <= eqType.End_Double_Freq)
            {
                this.m_nShowData[1] = 'Hi  ' + getFrequencyDisplay(this.m_pEQ.freq);
            }
            else
            {
                this.m_nShowData[1] = 'Hi  ' + getFrequencyDisplay(this.m_pEQ.freq);
            }
            // this.m_nShowData[1] = str+this.m_nShowData[1];
            this.m_nShowData[1] = this.m_nShowData[1] + "Hz ";
            this.m_nShowData[1] = this.m_nShowData[1] + this.GetPlayEQOct() + " ";
            if(this.m_bAllByPass)
            {
                str = "0.0";
            }
            else
            {
                if(this.m_bByPass)
                {
                    str = "0.0";
                }
                else
                {
                    str = toStringFloat(this.GetdB(), 1);
                }
            }
            str = str + "dB";
            this.m_nShowData[1] = this.m_nShowData[1] + str;
            break;
        case eqType.AllPass_Shelf1:	//1阶全通
            str = this.m_nid.toString(10);
            str = "EQ" + str;
            this.m_nShowData[0] = str;
            if(this.m_pEQ.freq <= eqType.End_Double_Freq)
            {
                this.m_nShowData[1] = 'APF 1st  ' + getFrequencyDisplay(this.m_pEQ.freq);
            }
            else
            {
                this.m_nShowData[1] = 'APF 1st  ' + getFrequencyDisplay(this.m_pEQ.freq);
            }
            // this.m_nShowData[1] = str + this.m_nShowData[1];
            this.m_nShowData[1] = this.m_nShowData[1] + "Hz ";
            this.GetBW();
            str = toStringFloat(this.m_nBW, 2);
            str = str + "Oct ";
            this.m_nShowData[1] = this.m_nShowData[1] + this.m_nShowData[0];
            break;
        case eqType.AllPass_Shelf2:	//2阶全通
            str = this.m_nid.toString(10);
            str = "EQ" + str;
            this.m_nShowData[0] = str;
            if(this.m_pEQ.freq <= eqType.End_Double_Freq)
            {
                this.m_nShowData[1] = 'APF 2nd  ' + getFrequencyDisplay(this.m_pEQ.freq);
            }
            else
            {
                this.m_nShowData[1] = 'APF 2nd   ' + getFrequencyDisplay(this.m_pEQ.freq);
            }
            // this.m_nShowData[1] = str + this.m_nShowData[1];
            this.m_nShowData[1] = this.m_nShowData[1] + "Hz ";
            this.GetBW();
            str = toStringFloat(this.m_nBW, 2);
            str = str + "Oct ";
            this.m_nShowData[1] = this.m_nShowData[1] + str;
            break;
        case eqType.HPF_SEQ: //高通模式
            if(this.m_pXOver.HL_freq <= eqType.End_Double_Freq)
            {
                this.m_nShowData[0] = getFrequencyDisplay(this.m_pXOver.HL_freq);
            }
            else
            {
                this.m_nShowData [0]= getFrequencyDisplay(this.m_pXOver.HL_freq);
            }
            this.m_nShowData[0] = this.m_nShowData[0] + "Hz ";
            this.m_nShowData[1] = '';
            break;
        case eqType.LPF_SEQ:	//低通模式
            if(this.m_pXOver.HL_freq <= eqType.End_Double_Freq)
            {
                this.m_nShowData[0] = getFrequencyDisplay(this.m_pXOver.HL_freq);
            }
            else
            {
                this.m_nShowData[0] = getFrequencyDisplay(this.m_pXOver.HL_freq);
            }
            this.m_nShowData[0] = this.m_nShowData[0] + "Hz ";
            this.m_nShowData[1] = '';
            break;
        default:
            break;
        }

        return this.m_nShowData;
    };

    ///////////////////////////////////////////////////////////////////////////////////
    //                       得到用于发送的滤波器的值
    ////////////////////////////////////////////////////////////////////////////////////
    FilterClass.prototype.GetSendFreq = function () //获取用于发送的频率值
    {
        // if(this.m_pEQ)
        // {//当前选择的EQ
        //     this.m_nFreq = getFrequencyDisplay(this.m_pEQ.freq);
        // }
        //
        // if(this.m_pXOver)
        // {//当前选择的分频器
        //     switch(this.m_nFilterType)
        //     {
        //     case eqType.HPF_SEQ:	//高通
        //         this.m_nFreq = getFrequencyDisplay(this.m_pXOver.HL_freq);
        //         break;
        //     case eqType.LPF_SEQ:	//低通
        //         this.m_nFreq = getFrequencyDisplay(this.m_pXOver.HL_freq);
        //         break;
        //     }
        // }
        // return this.m_nFreq;
        if(this.m_nFilterType === eqType.HPF_SEQ || this.m_nFilterType === eqType.LPF_SEQ)
        {//当前选择的分频器
            switch(this.m_nFilterType)
            {
            case eqType.HPF_SEQ:	//高通
                this.m_nFreq = getFrequencyDisplay(this.m_pXOver.HL_freq);
                break;
            case eqType.LPF_SEQ:	//低通
                this.m_nFreq = getFrequencyDisplay(this.m_pXOver.HL_freq);
                break;
            }
        } else {
            this.m_nFreq = getFrequencyDisplay(this.m_pEQ.freq);
        }
        //console.log("this.m_nFreq:" + this.m_nFreq);
        return this.m_nFreq;
    };

    FilterClass.prototype.GetSenddB = function () //获取用于发送的增益值
    {
        var dB;
        var ndB;
        // if(this.m_bAllByPass)
        // {
        //     dB = eqType.ZEROEQdB;
        // }
        // else
        // {
        //     if(this.m_bByPass)
        //     {
        //         dB = eqType.ZEROEQdB;
        //     }
        //     else
        //     {
        //         ndB = ((this.m_ndB+eqType.MiddleEQdB)*100)/(eqType.StepEQdB*100);
        //         dB = parseInt(ndB+0.5);
        //     }
        // }
        //ndB = ((this.m_ndB + eqType.MiddleEQdB )*100)/(eqType.StepEQdB*100);
        ndB = ((parseFloat(this.m_ndB) + 20 )*100)/10;
        dB =  ndB.toFixed(0);
        // dB = (ndB+0.5).toFixed(0);
        //alert('增益：' + this.m_ndB + ' 步数: ' + dB);
        return dB;
    };

    FilterClass.prototype.GetSendBW = function ()	//获取用于发送的带宽值
    {
        var BW;
        BW = parseInt(((this.m_nBW-0.05)/0.01)+0.05);
        return  BW;
    };

    FilterClass.prototype.GetSendFilterType = function ()	//获取用于发送的模式值
    {
        return this.m_nFilterType;
    };


    FilterClass.prototype.GetFilterType = function ()	//获取模式类型
    {
        return this.m_nFilterType;
    };

    //////////////////////////////////////////////////////////////////////////////////
    //                    设定滤波器的参数值                                         //
    ///////////////////////////////////////////////////////////////////////////////////

    FilterClass.prototype.SetEQID = function (nID)
    {
        this.m_nid = nID;
    };

    FilterClass.prototype.SetBW = function (BW)
    {
        this.m_nBW = BW;
        this.GetSendBW();
    };

    FilterClass.prototype.SetdB = function (dB)
    {
        this.m_ndB = dB;
       this.GetSenddB();
    };

    // FilterClass.prototype.SetOct = function ( Oct) //PEQ 的Oct的值为：6dB,12dB;HL的Oct的值为6dB,12dB,24dB,48dB,
    // {
    //     this.m_nOct = Oct;
    //     if(this.m_pEQ)
    //     {
    //         SET_4H_BYTE(this.m_pEQ.HL_db_AP_Flag,Oct);
    //     }
    //     if(this.m_pXOver)
    //     {
    //         switch(this.m_nFilterType)
    //         {
    //         case eqType.HPF_SEQ:	//高通
    //             this.m_pXOver.HL_Oct = Oct;
    //             break;
    //         case eqType.LPF_SEQ: 	//低通
    //             this.m_pXOver.HL_Oct = Oct;
    //             break;
    //         }
    //     }
    // };



    FilterClass.prototype.SetFilterType = function (FType) //设置滤波器类型：PEQ，Lo,Hi,HPF,LPF
    {
        this.m_nFilterType = FType;
        if(this.m_pEQ)
        {
            switch(this.m_nFilterType)
            {
                case eqType.Param: //参量
                    break;
                case eqType.Lo_Shelf:	//低调
                    if(this.m_nFreq > eqType.MaxLoFreq)
                    {
                        this.m_nFreq = eqType.MaxLoFreq;
                        this.m_pEQ.freq = eqType.MaxFreq_Index;
                    }
                    break;
                case eqType.Hi_Shelf: //高调
                    if(this.m_nFreq < eqType.MinHiFreq)
                     {
                        this.m_nFreq = eqType.MinHiFreq;
                        this.m_pEQ.freq = eqType.MinFreq_Index;
                    }
                    break;
                case eqType.ALLPass_SEQ1: //1阶全通
                    break;

                case eqType.ALLPass_SEQ2: //2阶全通
                    break;
                default:
                    break;

            }
            this.m_pEQ.type = FType;
        }
        if(FType === eqType.LPF_SEQ)
        {//高低通
           this.m_nHLFreq = 20000;
        }
    };



    FilterClass.prototype.UpData_APF_1ST = function ()                      //  1阶全通   坐标点
    {
        // console.log('更改一阶全通坐标点..........');
        var f,i;
        var PEQ_FsPi,PEQ_Fc,PEQ_dB,PEQ_bw;
        var w0,temp, temp_A,temp1,temp2;
        var a1,a2,b1,b2,b3;
        var A,B,C,D,tmp;
        var PEQ_Wf;
        var PI;
        var nFreq;
        nFreq = getFrequencyStep(this.m_nFreq);
        PEQ_Fc = frequency[nFreq];
        PEQ_dB = this.m_ndB; //与增益无关
        PEQ_bw = this.m_nBW; //与带宽有关
        PI = 3.141592654;
        for( i=0;i<EQPoint;i++)
        {
            f = frequency[i];
            PEQ_Wf = 2*PI*f/FS;
            PEQ_FsPi = 3.27249234792e-5;
            w0 = PEQ_Fc*PEQ_FsPi;
            temp = Math.tan(w0);  //  K

            temp_A = Math.sqrt(Math.pow(2,PEQ_bw))/(Math.pow(2,PEQ_bw)-1.0);//Q

            /*		a1 = (2.0*temp_A*(temp*temp-1.0))/(temp*temp*temp_A + temp + temp_A);//a1
                    a2 = (temp*temp*temp_A - temp + temp_A)/(temp*temp*temp_A + temp + temp_A);//a2
                    b1 =  a2;        //  b0
                    b2 =  a1;        //  b1
                    b3 = 1.0;        //  b2*/

            a1 = (temp-1.0)/(temp+1.0);//a1
            a2 = 0.0;//a2
            b1 =  a1;//b0
            b2 =  1.0;//b1
            b3 = 0.0; //b2


            A = Math.cos(PEQ_Wf) +a1 +a2*Math.cos(PEQ_Wf);
            B = Math.sin(PEQ_Wf)-a2*Math.sin(PEQ_Wf);
            C = b1 *Math.cos(PEQ_Wf)+b2 +b3*Math.cos(PEQ_Wf);
            D = b1*Math.sin(PEQ_Wf)-b3*Math.sin(PEQ_Wf);

            temp1 = (A*C+B*D)/(A*A+B*B);
            temp2 = (A*D-B*C)/(A*A+B*B);
            tmp = Math.atan2(temp2,temp1);
            this.m_nPol_Point[i] = tmp;  //相位曲线
            this.m_nPoint[i] = 0;  //曲线
        }
    };





    FilterClass.prototype.SetSendBW = function (BW)   //设置带宽（步数）
    {
        this.m_nBW = (BW) * 0.01+0.05;
        if(this.m_pEQ)
        {
            this.m_pEQ.bw = BW;
        }
    };

    FilterClass.prototype.SetSenddB = function (dB)  //设置增益（步数）
    {
        if(dB === eqType.ZEROEQdB)
        {
             this.m_bByPass = true;
             this.m_ndB = 0;
        }
        else
        {
            this.m_bByPass = false;
            this.m_bAllByPass = false;
            this.m_ndB = (dB*eqType.StepEQdB - eqType.MiddleEQdB);
        }
        if(this.m_pEQ)
        {
            this.m_pEQ.level = dB; //增益值
        }
    };

    FilterClass.prototype.SetAPF_ByPass = function ()                          // 设定 APF ByPass
    {
        this.m_bAPF_Pass_Flag = GET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag);
        this.m_bAPF_ByPass = false;
        this.m_bAPF_AllByPass = false;
    };

    FilterClass.prototype.SetByPass = function (ByPass)  //设定 全通
    {
        if(this.m_pEQ.type === eqType.ALLPass_SEQ)
        {//全通模式
             SET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag,ByPass);
             this.m_bAPF_Pass_Flag = ByPass;
             if(this.m_bAPF_AllByPass)
             {
                  this.m_bAPF_AllByPass = false;
             }
             this.m_bAPF_ByPass = true;
        }
        else
        {
            if(this.m_bAllByPass)
            {
                this.m_bAllByPass = false;
                if(this.m_ndB === 0)
                {
                    return;
                }
            }
            else
            {
                if(this.m_bByPass === ByPass)
                {
                    return;
                }
                if(this.m_ndB === 0)
                {
                    return;
                }
            }

            this.m_bByPass = ByPass;
            if(ByPass)
            {
                if(this.m_pEQ)
                {
                    this.m_pEQ.level = eqType.ZEROEQdB; //增益值
                }
            }
            else
            {
                this.m_bAllByPass = false;
                if(this.m_pEQ)
                {
                    this.m_pEQ.level =this.GetSenddB();
                }
            }
        }
       this.UpDataPoint(false); //更新滤波器坐标点
    };

    FilterClass.prototype.SetALLByPass1 = function (ballByPass)	//设置为全通模式
    {
        if(this.m_pEQ.type === eqType.ALLPass_SEQ1)
        {
                SET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag,ballByPass);
                if(ballByPass)
                {
                    this.m_bAPF_Save_AllByPass = this.m_bAPF_AllByPass;
                    this.m_bAPF_AllByPass = ballByPass;
                    SET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag,ballByPass);
                }
                else
                {
                    this.m_bAPF_AllByPass = this.m_bAPF_Save_AllByPass;
                    if(this.m_bAPF_AllByPass)
                    {
                        SET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag,this.m_bAPF_AllByPass);
                    }
                    else
                    {
                        if(this.m_bAPF_ByPass)
                        {
                            SET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag,this.m_bAPF_AllByPass);
                        }
                        else
                        {
                            SET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag,ballByPass);
                        }
                    }
                }
        }
        else
        {
            if(ballByPass)
            {
                this.m_bAllEQByPass = this.m_bAllByPass;
                this.m_bAllByPass = ballByPass;
                if(this.m_pEQ)
                {
                    this.m_pEQ.level = eqType.ZEROEQdB;
                }
            }
            else
            {
                this.m_bAllByPass = this.m_bAllEQByPass;
                if(this.m_pEQ)
                {
                    this.m_pEQ.level =this.GetSenddB();
                }
            }
        }
       this.UpDataPoint(false);
    };


    FilterClass.prototype.SetALLByPass2 = function (ballByPass)	//设置为全通模式
    {
        if(this.m_pEQ.type === eqType.ALLPass_SEQ2)
        {
            SET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag,ballByPass);
            if(ballByPass)
            {
                this.m_bAPF_Save_AllByPass = this.m_bAPF_AllByPass;
                this.m_bAPF_AllByPass = ballByPass;
                SET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag,ballByPass);
            }
            else
            {
                this.m_bAPF_AllByPass = this.m_bAPF_Save_AllByPass;
                if(this.m_bAPF_AllByPass)
                {
                    SET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag,this.m_bAPF_AllByPass);
                }
                else
                {
                    if(this.m_bAPF_ByPass)
                    {
                        SET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag,this.m_bAPF_AllByPass);
                    }
                    else
                    {
                        SET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag,ballByPass);
                    }
                }
            }
        }
        else
        {
            if(ballByPass)
            {
                this.m_bAllEQByPass = this.m_bAllByPass;
                this.m_bAllByPass = ballByPass;
                if(this.m_pEQ)
                {
                    this.m_pEQ.level = eqType.ZEROEQdB;
                }
            }
            else
            {
                this.m_bAllByPass = this.m_bAllEQByPass;
                if(this.m_pEQ)
                {
                    this.m_pEQ.level =this.GetSenddB();
                }
            }
        }
        this.UpDataPoint(false);
    };

    FilterClass.prototype.SetSendEQFlag = function (SendEQFlag)
    {


    };



    FilterClass.prototype.SetHLShowType = function (nType)                //用于标注不同的高低通的显示:如:低频时:低通频率要受限制,
    {
        this.m_nHLShowType = nType;
    };


    ////////////////////////////////////////////////////////////////////////////////
    //   初始化滤波器图形坐标点 和 初始化 FD和DB的Rect的坐标
    //   初始化滤波器图形的BW图形的宽度LRect,RRect
    ////////////////////////////////////////////////////////////////////////////////

    FilterClass.prototype.HLToRect = function () //初始高低通图形this.m_nRect的坐标
    {
        var Point,Point1;
        //console.log("HLToRect");
        Point = new PointClass(0,0);
        Point1 = new PointClass(0,0);
        var nFreq = getFrequencyDisplay(this.m_pXOver.HL_freq);
        switch(this.m_nFilterType)
        {
            case eqType.HPF_SEQ:
                Point.x = parseInt((docToWidthF(nFreq,this.m_nWidth)) - RectSize/2) + 8;
                Point.y = parseInt(docToHighF(-20,this.m_nHigh)+14);
                break;
            case eqType.LPF_SEQ:
                Point.x = parseInt((docToWidthF(nFreq,this.m_nWidth)) - RectSize/2) + 8;
                Point.y = parseInt(docToHighF(-25,this.m_nHigh)+14);
                break;
            default:
                break;

        }
        // console.log(': ' + '   :' + )
        // if(Point.x <= (-(RectSize/2)))
        // {
        //   Point.x = (-(RectSize/2) + 15);
        // }
        if(Point.x <= (RectSize/2))
        {
            Point.x = -(RectSize/2) + 10;
        }

        Point1.x = Point.x + 26;
        Point1.y = Point.y + 16;
        if(Point1.x >(this.m_nWidth))
        {
            Point1.x = this.m_nWidth;
            Point.x = Point1.x - 20;
        }

        this.m_nRect.CRect(Point,Point1);
        var t = this.m_nRect.top;
        this.m_nRect.top = this.m_nRect.top + TopGap;
        t = this.m_nRect.top;
        this.m_nRect.bottom = this.m_nRect.bottom + TopGap;
        this.m_nRect.left = this.m_nRect.left + LeftGap;
        this.m_nRect.right = this.m_nRect.right + LeftGap;
        switch(this.m_nFilterType)
        {
        case eqType.HPF_SEQ:
            this.m_nShowRect.top = this.m_nRect.top + 25;
            if((this.m_nRect.right + 50)>(this.m_nWidth + LeftGap))
            {
                this.m_nShowRect.right = this.m_nWidth + LeftGap;
                this.m_nShowRect.left = this.m_nShowRect.right - 66;
            }
            else
            {
                this.m_nShowRect.left = this.m_nRect.left;
                this.m_nShowRect.right = this.m_nRect.right + 50;
            }
            this.m_nShowRect.bottom = this.m_nRect.bottom + 25;
            break;
        case eqType.LPF_SEQ:
            this.m_nShowRect.top = this.m_nRect.top + 20;
            if((this.m_nRect.right+50)>(this.m_nWidth+LeftGap))
            {
                this.m_nShowRect.right = this.m_nWidth+LeftGap;
                this.m_nShowRect.left = this.m_nShowRect.right - 66;
            }
            else
            {
                this.m_nShowRect.left = this.m_nRect.left;
                this.m_nShowRect.right = this.m_nRect.right + 50;
            }
            this.m_nShowRect.bottom = this.m_nRect.bottom + 20;
            break;
        default:
            break;
        }
        //console.log("  FilterType: " + this.m_nFilterType + "  HL_Freq: " + this.m_pXOver.HL_freq + "    m_nShowRect:" + this.m_nShowRect.left + ',' + this.m_nShowRect.top);
        //console.log("HL_Freq: " + this.m_pXOver.HL_freq + " Point.x: " + Point.x +" Point.y: " + Point.y);
        return Point;
    };

    FilterClass.prototype.FDToRect = function () //初始化滤波器图形this.m_nRect的图形  返回通道名点坐标
    {
        var Point = new PointClass(0,0);
        var Point1 = new PointClass(0,0);
        Point.x = parseInt(docToWidthF(getFrequencyDisplay(this.m_pEQ.freq),this.m_nWidth)) - RectSize/2;
        if(this.m_bAllByPass)
        {
            Point.y = parseInt(docToHighF(0,this.m_nHigh)) -(RectSize/2);
        }
        else
        {
            if(this.m_bByPass || this.m_pEQ.type === eqType.ALLPass_SEQ1 || this.m_pEQ.type === eqType.ALLPass_SEQ2)
            {
                Point.y = parseInt(docToHighF(0,this.m_nHigh)) -(RectSize/2);
            }
            else
            {
                Point.y = parseInt(docToHighF(this.GetdB(),this.m_nHigh)) -(RectSize/2);
            }
        }
        if(Point.x < (-(RectSize/2)))
        {
          Point.x = (-(RectSize/2) + 2);
        }
        if(Point.y < (-(RectSize/2)))
        {
          Point.y = (-(RectSize/2) + 2);
        }
        if(Point.y <= 0)
        {
          Point.y  = 0;
        }
        Point1.x = Point.x + 20;
        Point1.y = Point.y + 20;
        // console.log(' Point1.x:' + Point1.x + '  this.m_nWidth:' + this.m_nWidth);
        if(Point1.x > this.m_nWidth+3)
        {
          Point1.x = this.m_nWidth+8;
          Point.x = Point1.x -30;
        }
        if(Point1.y > this.m_nHigh+8)
        {
          Point1.y = this.m_nHigh+8;
          Point.y = Point1.y  - 16;
        }

        var Size = new SizeClass(16,16);
        this.m_nRect.CRect(Point,Point1);

        Point = this.m_nRect.CenterPoint();
        Point.x = Point.x - 2;
        Point.y = Point.y + 0;
        this.m_nRect.top = this.m_nRect.top + TopGap;
        this.m_nRect.bottom = this.m_nRect.bottom + TopGap;
        this.m_nRect.left = this.m_nRect.left + LeftGap;
        this.m_nRect.right = this.m_nRect.right + LeftGap;

        switch(this.m_nFilterType)
        {
        case eqType.Pi_SEQ:	//参量
            this.m_nShowRect.left = this.m_nRect.left - 100;
            this.m_nShowRect.right = this.m_nRect.right + 100;
            if(this.m_nShowRect.right >(this.m_nWidth+LeftGap))
            {
                this.m_nShowRect.right = this.m_nWidth+LeftGap;
                this.m_nShowRect.left = this.m_nShowRect.right-240;
            }
            else
            {
                if(this.m_nShowRect.left < LeftGap)
                {
                    this.m_nShowRect.left = LeftGap - 20;
                    this.m_nShowRect.right = this.m_nShowRect.left + 200;
                }
            }
            if(this.m_pEQ.level >= eqType.ZEROEQdB)
            {
                this.m_nShowRect.top = this.m_nRect.top + 35;  // 35
                this.m_nShowRect.bottom = this.m_nRect.bottom + 85;  // 85
            }
            else
            {
                this.m_nShowRect.top = this.m_nRect.top - 40;
                this.m_nShowRect.bottom = this.m_nRect.top + 50;
            }
            break;
        case eqType.Li_SEQ:
        case eqType.Hi_SEQ: //高通调
            this.m_nShowRect.left = this.m_nRect.left-100;
            this.m_nShowRect.right = this.m_nRect.right+100;
            if(this.m_nShowRect.right >(this.m_nWidth+LeftGap))
            {
                this.m_nShowRect.right = this.m_nWidth+LeftGap;
                this.m_nShowRect.left = this.m_nShowRect.right-225;
            }
            else
            {
                if(this.m_nShowRect.left < LeftGap)
                {
                    this.m_nShowRect.left = LeftGap - 20;
                    this.m_nShowRect.right = this.m_nShowRect.left+200;
                }
            }
            if(this.m_pEQ.level >=eqType.ZEROEQdB)
            {
                this.m_nShowRect.top = this.m_nRect.top+35;
                this.m_nShowRect.bottom = this.m_nRect.bottom+85;
            }
            else
            {
                this.m_nShowRect.top = this.m_nRect.top-40;
                this.m_nShowRect.bottom = this.m_nRect.top+50;
            }
            break;
        case eqType.AllPass_Shelf1: //1阶全通
            this.m_nShowRect.left = this.m_nRect.left-100;
            this.m_nShowRect.right = this.m_nRect.right+100;
            if(this.m_nShowRect.right >(this.m_nWidth+LeftGap))
            {
                this.m_nShowRect.right = this.m_nWidth+LeftGap;
                this.m_nShowRect.left = this.m_nShowRect.right-190;
            }
            else
            {
                if(this.m_nShowRect.left < LeftGap)
                {
                    this.m_nShowRect.left = LeftGap - 20;
                    this.m_nShowRect.right = this.m_nShowRect.left+200;
                }
            }
            if(this.m_pEQ.level >=eqType.ZEROEQdB)
            {
                this.m_nShowRect.top = this.m_nRect.top+35;
                this.m_nShowRect.bottom = this.m_nRect.bottom+85;
            }
            else
            {
                this.m_nShowRect.top = this.m_nRect.top-40;
                this.m_nShowRect.bottom = this.m_nRect.top+50;
            }
            break;
        case eqType.AllPass_Shelf2: //2阶全通
                this.m_nShowRect.left = this.m_nRect.left-100;
                this.m_nShowRect.right = this.m_nRect.right+100;
                if(this.m_nShowRect.right >(this.m_nWidth+LeftGap))
                {
                    this.m_nShowRect.right = this.m_nWidth+LeftGap;
                    this.m_nShowRect.left = this.m_nShowRect.right-190;
                }
                else
                {
                    if(this.m_nShowRect.left < LeftGap)
                    {
                        this.m_nShowRect.left = LeftGap - 20;
                        this.m_nShowRect.right = this.m_nShowRect.left+200;
                    }
                }
                if(this.m_pEQ.level >=eqType.ZEROEQdB)
                {
                    this.m_nShowRect.top = this.m_nRect.top+35;
                    this.m_nShowRect.bottom = this.m_nRect.bottom+85;
                }
                else
                {
                    this.m_nShowRect.top = this.m_nRect.top-40;
                    this.m_nShowRect.bottom = this.m_nRect.top+50;
                }
                break;
        default:
            break;
        }
        this.BWToRect();
        return Point;
    };

    FilterClass.prototype.BWToRect = function () //更新滤波器图形的this.m_nLRect,this.m_nRRect的坐标点
    {
        var Center,Point;
        Point = new PointClass(0,0);
        Center = deepCopy(this.m_nRect.CenterPoint());
        if(this.GetdB() >=0)
        {
           Center.y = Center.y + 10;
        }
        else
        {
            if(this.GetdB() <0)
            {
                Center.y = Center.y - 10;
            }
        }

        var nFreq = getFrequencyDisplay(this.m_pEQ.freq); //获得频率
        var nWidth =  parseInt(docToWidthF(nFreq*Math.pow(2,this.GetBW()),this.m_nWidth))+LeftGap+AddBW; //由带宽 计算出宽度值
        Point.x  = nWidth-BWRectSize/2;
        this.m_nRRect.left = Point.x;
        this.m_nRRect.top = Center.y - BWRectSize/2;
        this.m_nRRect.right = Point.x + BWRectSize;
        this.m_nRRect.bottom = Center.y + BWRectSize/2;

        nWidth = parseInt(docToWidthF(nFreq/Math.pow(2,this.GetBW()),this.m_nWidth))+LeftGap-AddBW;
        Point.x  = nWidth+BWRectSize/2;
        this.m_nLRect.right = Point.x ;
        this.m_nLRect.left = Point.x -BWRectSize;
        this.m_nLRect.top = Center.y - BWRectSize/2;
        this.m_nLRect.bottom = Center.y + BWRectSize/2;
    };

    /////////////////////////////////////////////////////////////////////////////////////
    //                     更新滤波器图形坐标点
    /////////////////////////////////////////////////////////////////////////////////////

    FilterClass.prototype.UpDataPoint = function (nFlag) {
        var i;
        switch(this.m_nFilterType)
        {
            case eqType.Pi_SEQ:	//参量
            //console.log("滤波器类型：参量");
            if(nFlag)
            {
                this.SetSenddB(this.m_pEQ.level);
             }
            if(this.m_bAllByPass)
            {
                for(i=0;i<EQPoint;i++)
                {
                    this.m_nPoint[i] = 0;
                    this.m_nPol_Point[i] = 0;
                }
            }
            else
            {
                if(this.m_bByPass)
                {
                    for(i=0;i<EQPoint;i++)
                    {
                        this.m_nPoint[i] = 0;
                        this.m_nPol_Point[i] = 0;
                    }
                }
                else
                {
                    this.UpDataPEQ();
                }
            }
            this.FDToRect();
            this.BWToRect();
            break;
        case eqType.Li_SEQ:
        case eqType.Hi_SEQ: //高低调
            // console.log("滤波器类型：高低调");
            if(nFlag)
            {
                this.SetSenddB(this.m_pEQ.level);
            }
            if(this.m_bAllByPass)
            {
                for(i=0;i<EQPoint;i++)
                {
                    this.m_nPoint[i] = 0;
                    this.m_nPol_Point[i] = 0;
                }
            }
            else
            {
                if(this.m_bByPass)
                {
                    for(i=0;i<EQPoint;i++)
                    {
                        this.m_nPoint[i] = 0;
                        this.m_nPol_Point[i] = 0;
                    }
                }
                else
                {
                     this.UpDataHLEQ();
                }
            }
            this.FDToRect();
            break;
        case eqType.ALLPass_SEQ1: //1阶全通
            // console.log("滤波器类型：1阶全通");
            if(GET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag))
            {//旁通
                // console.log('1阶全通------------------------旁通');
                for(i=0;i<EQPoint;i++)
                {
                    this.m_nPoint[i] = 0;
                    this.m_nPol_Point[i] = 0;
                }
            }
            else
            {//非旁通
                // console.log('1阶全通——————————————————————非旁通');
                this.UpData_APF_1ST();
            }/**/
            this.FDToRect();
            this.BWToRect();
            break;
        case eqType.ALLPass_SEQ2: //2阶全通
            // console.log("滤波器类型：2阶全通");
            if(GET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag))
            {// 旁通
                // console.log('2阶全通------------------------旁通');
                for(i=0;i<EQPoint;i++)
                {
                    this.m_nPoint[i] = 0;
                    this.m_nPol_Point[i] = 0;
                }
            } else { //非旁通
                // console.log('2阶全通------------------------非旁通');
                this.UpDataAllPassPoint();
            }/**/
            this.FDToRect();
            this.BWToRect();
            break;
        case eqType.HPF_SEQ: //高通
            // console.log('滤波器类型：高通: ' + this.m_pXOver.HL_freq);
            //console.log("滤波器类型：高通___m_pXOver.HL_freq:" + this.m_pXOver.HL_freq + '   eqType.MinFreq_Index:' + eqType.MinFreq_Index);
            if((this.m_pXOver.HL_freq)=== eqType.MinFreq_Index)
            {
                for(i=0;i<EQPoint;i++)
                {
                    this.m_nPoint[i] = 0;
                    this.m_nPol_Point[i] = 0;
                }
            }
            else
            {
                // console.log('高通曲线绘制中...............................');
                this.UpDataHPF();
            }/**/
            this.HLToRect();

            break;
        case eqType.LPF_SEQ: //低通
            // console.log("滤波器类型：低通: " + this.m_pXOver.HL_freq );
            if(this.m_pXOver.HL_freq === eqType.MaxFreq_Index)
            {
                for(i=0;i<EQPoint;i++)
                {
                    this.m_nPoint[i] = 0;
                    this.m_nPol_Point[i] = 0;
                }
            }
            else
            {
                // console.log('低通曲线绘制中.................................');
                this.UpDataLPF();
            }/**/
            this.HLToRect();

            break;
        default :
            //console.log("滤波器类型不能确定");
            break;

        }
        for(i=0;i<EQPoint;i++)
        {
            this.m_nShadowPoint[i+1].y = parseInt(docToHighF(this.m_nPoint[i],this.m_nHigh))+TopGap;
        }
    };


    FilterClass.prototype.UpDataHLEQ = function () //更新高低通滤波器图形的坐标点
    {
        var i,f;
        var SEQ_FsPi;
        var SEQ_Fc,SEQ_type,SEQ_oct,SEQ_dB;
        var w0,temp,temp_A,temp_cos,alpha,temp_pp,tempa,temp_oct,temp_S,temp1,temp2;
        var a1,a2,b1,b2,b3;
        var A,B,C,D,EE,tmp;
        for(i=0;i<EQPoint;i++)
        {
            f = frequency[i];
            SEQ_Fc = getFrequencyDisplay(this.m_pEQ.freq);
            SEQ_type = this.m_pEQ.type;
            SEQ_oct = GET_4H_BYTE(this.m_pEQ.HL_db_AP_Flag);
            // console.log('高低通模式下，斜率的值：' + this.m_pEQ.HL_db_AP_Flag);
            SEQ_dB = this.GetdB();
            SEQ_FsPi = 0.00006544985;
            w0 = SEQ_FsPi * SEQ_Fc;
            //............................................Hi_filter
            if(SEQ_type === eqType.Hi_SEQ && SEQ_oct === eqType.SEQ_6oct)
            {
                temp_oct = 0.4545454546;
                temp_S = 0.5;
                w0 = temp_oct * w0;
            }
            else if(SEQ_type === eqType.Hi_SEQ && SEQ_oct === eqType.SEQ_12oct)
            {
                temp_oct = 0.76923076923;
                temp_S = 1.05;
                w0 = temp_oct * w0;
            }
            //............................................Lo_filter
            else if(SEQ_type === eqType.Li_SEQ && SEQ_oct === eqType.SEQ_6oct)
            {
                temp_oct = 2.0;
                temp_S = 0.5;
                w0 = temp_oct * w0;
            }
            else if(SEQ_type === eqType.Li_SEQ && SEQ_oct === eqType.SEQ_12oct)
            {
                temp_oct = 1.2727272727;
                temp_S = 1.05;
                w0 = temp_oct * w0;
            }
            temp = SEQ_dB/40.0;
            temp_A = Math.pow(10.0,temp);
            temp_cos = Math.cos(w0);
            alpha = Math.sin(w0)/2 * Math.sqrt((temp_A + 1/temp_A)*(1/temp_S-1)+2);
            temp_pp = 2*Math.sqrt(temp_A)*alpha;
            if(SEQ_type === eqType.Li_SEQ)
            {
                if(SEQ_dB === 0)
                {
                    a1 =a2 =b2 =b3 = 0;
                    b1 = 1;
                }
                else
                {
                    tempa = (temp_A+1)+(temp_A-1)*temp_cos +temp_pp;
                    a1 = ((-2)*((temp_A-1)+(temp_A+1)*temp_cos))/tempa;
                    a2 = ((temp_A+1)+(temp_A-1)*temp_cos-temp_pp)/tempa;
                    b1 = (temp_A*((temp_A+1)-(temp_A-1)*temp_cos +temp_pp))/tempa;
                    b2 = (2*temp_A*((temp_A-1)-(temp_A+1)*temp_cos))/tempa;
                    b3 = (temp_A*((temp_A+1)-(temp_A-1)*temp_cos-temp_pp))/tempa;
                }
            }
            else if(SEQ_type === eqType.Hi_SEQ)
            {
                if(SEQ_dB === 0)
                {
                    a1 =a2 =b2 =b3 = 0;
                    b1 =1;
                }
                else
                {
                    tempa =(temp_A+1)-(temp_A-1)*temp_cos +temp_pp;
                    a1 = (2*((temp_A-1)-(temp_A+1)*temp_cos))/tempa;
                    a2 = ((temp_A+1)-(temp_A-1)*temp_cos -temp_pp)/tempa;
                    b1 = (temp_A*((temp_A+1)+(temp_A-1)*temp_cos +temp_pp))/tempa;
                    b2 = ((-2)*temp_A*((temp_A-1)+(temp_A+1)*temp_cos))/tempa;
                    b3 = (temp_A*((temp_A+1)+(temp_A-1)*temp_cos-temp_pp))/tempa;
                }
            }
            A = Math.cos(2*pi*f/FS)+a1+a2*Math.cos(2*pi*f/FS);
            B = Math.sin(2*pi*f/FS)-a2*Math.sin(2*pi*f/FS);
            C = b1*Math.cos(2*pi*f/FS)+b2+b3*Math.cos(2*pi*f/FS);
            D = b1*Math.sin(2*pi*f/FS)-b3*Math.sin(2*pi*f/FS);
            EE = Math.sqrt((C*C+D*D)/(A*A+B*B));
            tmp = 20*(Math.log(EE) / Math.LN10);
            this.m_nPoint[i] = tmp;//把文档之值转换为坐标值

            temp1 = (A*C+B*D)/(A*A+B*B);
            temp2 = (A*D-B*C)/(A*A+B*B);
            tmp = Math.atan2(temp2,temp1);
            this.m_nPol_Point[i] = tmp;                     //    把文档之值     转换     为坐标值
        }
    };

    FilterClass.prototype.UpDataHPF = function () //更新高通滤波器图形坐标点
    {
        var i;
        var HPF_FsPi,f,HPF_Wf;
        var w0;
        var HPF_fre,temp_Pol;
        var HPF_type,HPF_oct;
        var HPF_Q = new Array(4);
        var temp1,temp2;
        var temp_a0= new Array(4);
        var temp_a1 = new Array(4);
        var temp_a2 = new Array(4);
        var temp_b0 = new Array(4);
        var temp_b1 = new Array(4);
        var temp_b2 = new Array(4);
        var w0_cValue,w0_sValue,w_h,alph_h,alphah;
        var a1,a2,b1,b2,b3,A,B,C,D,EE;
        var tmp = 0.0;
        HPF_fre = getFrequencyDisplay(this.m_pXOver.HL_freq);
        HPF_type =this.m_pXOver.HL_Type;
        console.log('高通斜率: ' + Get_LR_Oct(this.m_pXOver.LR_Level));
        if(HPF_type === eqType.L_R)
        {
            HPF_oct = Get_LR_Oct(this.m_pXOver.LR_Level);
            console.log('高通类型 宁克');
        }
        else
        {
            HPF_oct = this.m_pXOver.HL_Oct;
            console.log('高通类型 非宁克');
        }
        HPF_FsPi = 0.00006544985;
        // console.log('高通斜率：' + HPF_oct);
        switch(HPF_oct)
        {
        case eqType.Oct_12dB:
            if(HPF_type === eqType.L_R)
            {//模式： 宁克
                HPF_Q[0] = 1.0;
                HPF_Q[1] = 0.0;
                HPF_Q[2] = 0.0;
                HPF_Q[3] = 0.0;
            }
            if(HPF_type === eqType.ButtWorth)
            {//模式： 巴特沃斯
                HPF_Q[0] = 0.70422535;
                HPF_Q[1] = 0.0;
                HPF_Q[2] = 0.0;
                HPF_Q[3] = 0.0;
            }
            if(HPF_type === eqType.Bessel)
            {//模式： 贝塞尔
                HPF_Q[0] = 0.70422535;
                HPF_Q[1] = 0.0;
                HPF_Q[2] = 0.0;
                HPF_Q[3] = 0.0;
                HPF_fre = HPF_fre/1.2683112435;
            }
            break;
        case eqType.Oct_18dB:
            if(HPF_type === eqType.L_R)
            {
                HPF_Q[0] = 1.0;
                HPF_Q[1] = 0.70422535211;
                HPF_Q[2] = 0.0;
                HPF_Q[3] = 0.0;
            }
            if(HPF_type === eqType.ButtWorth)
            {
                HPF_Q[0] = 1.0;
                HPF_Q[1] = 0.5;
                HPF_Q[2] = 0.0;
                HPF_Q[3] = 0.0;
            }
            if(HPF_type === eqType.Bessel)
            {
                HPF_Q[0] = 0.7560;
                HPF_Q[1] = 0.72463768;
                HPF_Q[2] = 0.0;
                HPF_Q[3] = 0.0;
                HPF_fre = HPF_fre/1.2854981442;
            }
            break;
        case eqType.Oct_24dB:
            if(HPF_type === eqType.L_R)
            {
                HPF_Q[0] = 0.70422535211;
                HPF_Q[1] = 0.70422535211;
                HPF_Q[2] = 0.0;
                HPF_Q[3] = 0.0;
            }
            if(HPF_type === eqType.ButtWorth)
            {
                HPF_Q[0] = 0.92592593;
                HPF_Q[1] = 0.38167939;
                HPF_Q[2] = 0.0;
                HPF_Q[3] = 0.0;
            }
            if(HPF_type === eqType.Bessel)
            {
                HPF_Q[0] = 0.96153846;
                HPF_Q[1] = 0.61728395;
                HPF_Q[2] = 0.0;
                HPF_Q[3] = 0.0;
                HPF_fre = HPF_fre/1.5006420029;
            }
            break;
        case eqType.Oct_30dB:
            if( HPF_type===eqType.L_R)
            {
                HPF_Q[0]=1.0;
                HPF_Q[1]=0.62;
                HPF_Q[2]=0.62;
                HPF_Q[3]=0.0;
            }
            if( HPF_type===eqType.ButtWorth)
            {
                HPF_Q[0]=1.0;
                HPF_Q[1]=0.8064616129;
                HPF_Q[2]=0.3086417953;
                HPF_Q[3]=0.0;
            }
            if( HPF_type===eqType.Bessel)
            {
                HPF_Q[0]=0.6656;
                HPF_Q[1]=0.8928571428;
                HPF_Q[2]=0.54347826;
                HPF_Q[3]=0.0;
                HPF_fre = HPF_fre / 1.3854981442;
            }
            break;
        case eqType.Oct_36dB:
            if( HPF_type===eqType.L_R)
            {
                HPF_Q[0]=1.0;
                HPF_Q[1]=0.5;
                HPF_Q[2]=0.5;
                HPF_Q[3]=0.0;
            }
            if( HPF_type===eqType.ButtWorth)
            {
                HPF_Q[0]=0.96153846;
                HPF_Q[1]=0.70422535211;
                HPF_Q[2]=0.2590673575;
                HPF_Q[3]=0.0;
            }
            if( HPF_type===eqType.Bessel)
            {
                HPF_Q[0]=0.980392156;
                HPF_Q[1]=0.819672131;
                HPF_Q[2]=0.490196;
                HPF_Q[3]=0.0;
                HPF_fre = HPF_fre / 1.5554981442;
            }
            break;
        case eqType.Oct_42dB:
            if( HPF_type===eqType.L_R)
            {
                HPF_Q[0]=1.0;
                HPF_Q[1]=0.4531343150;
                HPF_Q[2]=0.92592592593;
                HPF_Q[3]=0.4531343150;
            }
            if( HPF_type===eqType.ButtWorth)
            {
                HPF_Q[0]=1.0;
                HPF_Q[1]=0.90909090909;
                HPF_Q[2]=0.625;
                HPF_Q[3]=0.2222222222;
            }
            if( HPF_type===eqType.Bessel)
            {
                HPF_Q[0]=0.5937;
                HPF_Q[1]=0.943396226415;
                HPF_Q[2]=0.757575757576;
                HPF_Q[3]=0.4424778761;
                HPF_fre = HPF_fre / 1.5554981442;
            }
            break;
        case eqType.Oct_48dB:
            if(HPF_type === eqType.L_R)
            {
                HPF_Q[0] = 0.92592592593;
                HPF_Q[1] = 0.3731343150;
                HPF_Q[2] = 0.92592592593;
                HPF_Q[3] = 0.3731343150;
            }
            if(HPF_type === eqType.ButtWorth)
            {
                HPF_Q[0] = 0.98039126;
                HPF_Q[1] = 0.83333333;
                HPF_Q[2] = 0.55555556;
                HPF_Q[3] = 0.1953125;
            }
            if(HPF_type === eqType.Bessel)
            {
                HPF_Q[0] = 0.98039216;
                HPF_Q[1] = 0.89285714;
                HPF_Q[2] = 0.70422535;
                HPF_Q[3] = 0.40650406;
                HPF_fre = HPF_fre/1.6791201410;

            }
            break;
          }
          w0 = HPF_FsPi * HPF_fre;
          w0_cValue = Math.cos(w0);
          w0_sValue = Math.sin(w0);
          w_h = w0*0.5;
          alph_h = Math.tan(w_h);
          for(i=0;i<4;i++)
          {
              alphah = w0_sValue * HPF_Q[i];
              if(HPF_Q[i] === 0)
              {
                  temp_a0[i] = 1;
                  temp_a1[i] = 0;
                  temp_a2[i] = 0;
                  temp_b0[i] = 1;
                  temp_b1[i] = 0;
                  temp_b2[i] = 0;
              }
              else
              {
                  temp_a0[i] = 1+alphah;
                  if(temp_a0[i] === 0)
                  {
                      temp_a0[i] = 0.0000000001;
                  }
                  temp_a1[i] = -2.0*w0_cValue;
                  temp_a2[i] = 1-alphah;
                  temp_b0[i] = (1+w0_cValue)*0.5;
                  temp_b1[i] = -2.0*temp_b0[i];
                  temp_b2[i] = temp_b0[i];
              }
          }
          if(HPF_oct === eqType.Oct_18dB|| HPF_oct === eqType.Oct_30dB || HPF_oct === eqType.Oct_42dB)
          {
              temp_a0[0] = HPF_Q[0]*alph_h+1;
              if(temp_a0[0] === 0) temp_a0[0] =0.0000000001;
              temp_a1[0] = HPF_Q[0]*alph_h-1;
              temp_a2[0] = 0.0;
              temp_b0[0] = 1.0;
              temp_b1[0] = -1.0;
              temp_b2[0] = 0.0;
          }

          temp_Pol = 0;

          for(var j=0;j< EQPoint;j++)
          {
              f = frequency[j];
              HPF_Wf = 2*pi*f/FS;
              for(i=0;i<4;i++)
              {
                  a1 = temp_a1[i]/temp_a0[i];
                  a2 = temp_a2[i]/temp_a0[i];

                  b1 = temp_b0[i]/temp_a0[i];
                  b2 = temp_b1[i]/temp_a0[i];
                  b3 = temp_b2[i]/temp_a0[i];
                  A = Math.cos(HPF_Wf)+a1+a2*Math.cos(HPF_Wf);
                  B = Math.sin(HPF_Wf)-a2*Math.sin(HPF_Wf);
                  C = b1*Math.cos(HPF_Wf)+b2+b3*Math.cos(HPF_Wf);
                  D = b1*Math.sin(HPF_Wf)-b3*Math.sin(HPF_Wf);


                  EE = Math.sqrt((C*C+D*D)/(A*A+B*B));
                  tmp = tmp +20*(Math.log(EE) / Math.LN10);

                  temp1 = (A*C+B*D)/(A*A+B*B);
                  temp2 = (A*D-B*C)/(A*A+B*B);

                  temp_Pol = temp_Pol + Math.atan2(temp2,temp1);

                  if(temp_Pol>=pi)
                  {
                      temp_Pol = temp_Pol-2*pi;
                  }

                  if(temp_Pol<=-pi)
                  {
                      temp_Pol = temp_Pol+2*pi;
                  }
              }
              this.m_nPoint[j] = tmp;
              tmp = 0;

              this.m_nPol_Point[j] = temp_Pol;
              temp_Pol = 0;
          }
    };

    FilterClass.prototype.UpDataLPF = function ()	//更新低通滤波器图形坐标点
    {
        var i;
        var LPF_FsPi,f;
        var w0;
        var LPF_fre,temp_Pol,temp1,temp2;
        var LPF_type,LPF_oct;
        var alphal1,alphal2;
        var Bessel_LPF_Qa = new Array(4);
        var temp_ai;
        var Bessel_LPF_Qb = new Array(4);
        var temp_bi;
        var temp_a0 = new Array(4);
        var temp_a1 = new Array(4);
        var temp_a2 = new Array(4);
        var temp_b0 = new Array(4);
        var temp_b1 = new Array(4);
        var temp_b2 = new Array(4);
        var LPF_Q = new Array(4);
        var a1,a2,b1,b2,b3;
        var A,B,C,D,EE;
        var w0_cValue,w0_sValue,w_l,alph_l,alphal;
        var LPF_Wf;
        var tmp = 0;
        LPF_fre = getFrequencyDisplay(this.m_pXOver.HL_freq);
        LPF_type =this.m_pXOver.HL_Type;
        console.log('低通类型: ' + LPF_type);
        if(LPF_type === eqType.L_R)
        {
            // LPF_oct = Get_LR_Oct(this.m_pXOver.LR_Level);   // L-R 斜率 转换(高通用，低通不一样)
            LPF_oct = this.m_pXOver.LR_Level;
            console.log('低通类型： 宁克');
        }
        else
        {
            LPF_oct  = this.m_pXOver.HL_Oct;
            console.log('低通类型：非宁克');
        }

        LPF_FsPi = 0.00006544985;
        if( LPF_type === eqType.Bessel )
        {
            switch(LPF_oct)
            {
            case eqType.Oct_12dB:
                LPF_fre = LPF_fre/1.3616541287;
                Bessel_LPF_Qa[0] = 1.0;
                Bessel_LPF_Qb[0] = 0.3333333333;

                Bessel_LPF_Qa[1] = 0.0;
                Bessel_LPF_Qb[1] = 0.0;

                Bessel_LPF_Qa[2] = 0.0;
                Bessel_LPF_Qb[2] = 0.0;

                Bessel_LPF_Qa[3] = 0.0;
                Bessel_LPF_Qb[3] = 0.0;
                break;
            case eqType.Oct_18dB:
                LPF_fre = LPF_fre/1.75567236868;
                Bessel_LPF_Qa[0] = 0.5693712514;
                Bessel_LPF_Qb[0] = 0.154812441;

                Bessel_LPF_Qa[1] = 0.430628846;
                Bessel_LPF_Qb[1] = 0.0;

                Bessel_LPF_Qa[2] = 0.0;
                Bessel_LPF_Qb[2] = 0.0;

                Bessel_LPF_Qa[3] = 0.0;
                Bessel_LPF_Qb[3] = 0.0;
                break;
            case eqType.Oct_24dB:
                LPF_fre = LPF_fre/2.1139176749;
                Bessel_LPF_Qa[0] = 0.369;
                Bessel_LPF_Qb[0] = 0.087858766;

                Bessel_LPF_Qa[1] = 0.6278294896;
                Bessel_LPF_Qb[1] = 0.109408;

                Bessel_LPF_Qa[2] = 0.0;
                Bessel_LPF_Qb[2] = 0.0;

                Bessel_LPF_Qa[3] = 0.0;
                Bessel_LPF_Qb[3] = 0.0;
                break;
            case eqType.Oct_30dB:
                LPF_fre=LPF_fre / 1.0;//2.1139176749;
                Bessel_LPF_Qa[0] = 0.6656;//0.369;
                Bessel_LPF_Qb[0] = 0.0;//0.087858766;

                Bessel_LPF_Qa[1] = 1.1402;//0.6278294896;
                Bessel_LPF_Qb[1] = 0.4128;//0.109408;

                Bessel_LPF_Qa[2] = 0.6216;
                Bessel_LPF_Qb[2] = 0.3245;

                Bessel_LPF_Qa[3] = 0.0;
                Bessel_LPF_Qb[3] = 0.0;
                break;
            case eqType.Oct_36dB:
                LPF_fre=LPF_fre / 1.0;
                Bessel_LPF_Qa[0] = 1.2217;//0.369;
                Bessel_LPF_Qb[0] = 0.3887;//0.087858766;

                Bessel_LPF_Qa[1] = 0.9686;//0.6278294896;
                Bessel_LPF_Qb[1] = 0.3505;//0.109408;

                Bessel_LPF_Qa[2] = 0.5131;
                Bessel_LPF_Qb[2] = 0.2756;

                Bessel_LPF_Qa[3] = 0.0;
                Bessel_LPF_Qb[3] = 0.0;
                break;
            case eqType.Oct_42dB:
                LPF_fre=LPF_fre / 1.0;//3.17961723751;
                Bessel_LPF_Qa[0] = 0.5937;//0.117235677;
                Bessel_LPF_Qb[0] = 0.0;//0.02064747;

                Bessel_LPF_Qa[1] = 1.0944;//0.226516664;
                Bessel_LPF_Qb[1] = 0.3395;//0.0259273886;

                Bessel_LPF_Qa[2] = 0.8304;//0.3067559;
                Bessel_LPF_Qb[2] = 0.3011;//0.0294683265;

                Bessel_LPF_Qa[3] = 0.4332;//0.3494916166;
                Bessel_LPF_Qb[3] = 0.2381;//0.031272257;
                break;
            case eqType.Oct_48dB:
                LPF_fre = LPF_fre/3.17961723751;
                Bessel_LPF_Qa[0] = 0.117235677;
                Bessel_LPF_Qb[0] = 0.02064747;

                Bessel_LPF_Qa[1] = 0.226516664;
                Bessel_LPF_Qb[1] = 0.0259273886;

                Bessel_LPF_Qa[2] = 0.3067559;
                Bessel_LPF_Qb[2] = 0.0294683265;

                Bessel_LPF_Qa[3] = 0.3494916166;
                Bessel_LPF_Qb[3] = 0.031272257;
                break;
            }
            w0 = LPF_fre * LPF_FsPi;
            alphal1 = Math.tan(w0*0.5);
            alphal2 = alphal1 *alphal1;
            for( i = 0;i<4;i++)
            {
                temp_ai = Bessel_LPF_Qa[i];
                temp_bi = Bessel_LPF_Qb[i];
                if(temp_ai === 0)
                {
                    temp_a0[i] = 1;
                    temp_a1[i] = 0;
                    temp_a2[i] = 0;
                    temp_b0[i] = 1;
                    temp_b1[i] = 0;
                    temp_b2[i] = 0;
                }
                else
                {
                    temp_a0[i] = alphal2+temp_ai*alphal1+temp_bi;
                    temp_a1[i] = 2*alphal2 - 2*temp_bi;
                    temp_a2[i] = alphal2-temp_ai*alphal1+temp_bi;
                    temp_b0[i] = alphal2;
                    temp_b1[i] = 2*alphal2;
                    temp_b2[i] = alphal2;
                }

            }
        }
        else
        {
            switch(LPF_oct)
            {
            case eqType.Oct_12dB:
                if(LPF_type === eqType.L_R)
                {
                    LPF_Q[0] = 1.0;
                    LPF_Q[1] = 0.0;
                    LPF_Q[2] = 0.0;
                    LPF_Q[3] = 0.0;
                }
                if(LPF_type === eqType.ButtWorth)
                {
                    LPF_Q[0] = 0.70422535;
                    LPF_Q[1] = 0.0;
                    LPF_Q[2] = 0.0;
                    LPF_Q[3] = 0.0;
                }
                break;
            case eqType.Oct_18dB:
                if(LPF_type === eqType.L_R)
                {
                    LPF_Q[0] = 1.0;
                    LPF_Q[1] = 0.70422535211;
                    LPF_Q[2] = 0.0;
                    LPF_Q[3] = 0.0;
                }
                if(LPF_type === eqType.ButtWorth)
                {
                    LPF_Q[0] = 1.0;
                    LPF_Q[1] = 0.5;
                    LPF_Q[2] = 0.0;
                    LPF_Q[3] = 0.0;
                }
                break;

            case eqType.Oct_24dB:
                if(LPF_type === eqType.L_R)
                {
                    LPF_Q[0] = 0.70422535211;
                    LPF_Q[1] = 0.70422535211;
                    LPF_Q[2] = 0.0;
                    LPF_Q[3] = 0.0;
                }
                if(LPF_type === eqType.ButtWorth)
                {
                    LPF_Q[0] = 0.92592593;
                    LPF_Q[1] = 0.38167939;
                    LPF_Q[2] = 0.0;
                    LPF_Q[3] = 0.0;
                }
                break;
            case eqType.Oct_30dB:
                if( LPF_type===eqType.L_R)
                {
                    LPF_Q[0]=1.0;
                    LPF_Q[1]=0.62;
                    LPF_Q[2]=0.62;
                    LPF_Q[3]=0.0;
                }
                if( LPF_type===eqType.ButtWorth)
                {
                    LPF_Q[0]=1.0;
                    LPF_Q[1]=0.8064616129;
                    LPF_Q[2]=0.3086417953;
                    LPF_Q[3]=0.0;
                }
                break;
            case eqType.Oct_36dB:
                if( LPF_type===eqType.L_R)
                {
                    LPF_Q[0]=1.0;
                    LPF_Q[1]=0.5;
                    LPF_Q[2]=0.5;
                    LPF_Q[3]=0.0;
                }
                if( LPF_type===eqType.ButtWorth)
                {
                    LPF_Q[0]=0.96153846;
                    LPF_Q[1]=0.70422535211;
                    LPF_Q[2]=0.2590673575;
                    LPF_Q[3]=0.0;
                }
                break;
            case eqType.Oct_42dB:
                if( LPF_type===eqType.L_R)
                {
                    LPF_Q[0]=1.0;
                    LPF_Q[1]=0.4531343150;
                    LPF_Q[2]=0.92592592593;
                    LPF_Q[3]=0.4531343150;
                }
                if( LPF_type===eqType.ButtWorth)
                {
                    LPF_Q[0]=1.0;
                    LPF_Q[1]=0.90909090909;
                    LPF_Q[2]=0.625;
                    LPF_Q[3]=0.2222222222;
                }
                break;
            case eqType.Oct_48dB:
                if(LPF_type ===  eqType.L_R)
                {
                    LPF_Q[0] = 0.92592592593;
                    LPF_Q[1] = 0.3731343150;
                    LPF_Q[2] = 0.92592592593;
                    LPF_Q[3] = 0.3731343150;
                }
                if(LPF_type === eqType.ButtWorth)
                {
                    LPF_Q[0] = 0.98039216;
                    LPF_Q[1] = 0.83333333;
                    LPF_Q[2] = 0.55555556;
                    LPF_Q[3] = 0.1953125;
                }
                break;
            }
            w0  = LPF_fre *LPF_FsPi;
            w0_cValue = Math.cos(w0);
            w0_sValue = Math.sin(w0);
            w_l = w0*0.5;
            alph_l = Math.tan(w_l);
            for(i=0;i<4;i++)
            {
                alphal = w0_sValue * LPF_Q[i];
                if(LPF_Q[i] === 0)
                {
                    temp_a0[i] = 1;
                    temp_a1[i] = 0;
                    temp_a2[i] = 0;
                    temp_b0[i] = 1;
                    temp_b1[i] = 0;
                    temp_b2[i] = 0;
                }
                else
                {
                    temp_a0[i] = 1+alphal;
                    if(temp_a0[i] === 0)
                    {
                        temp_a0[i] = 0.0000000001;
                    }

                    temp_a1[i] =-2.0*w0_cValue;
                    temp_a2[i] = 1-alphal;
                    temp_b0[i] = (1-w0_cValue)*0.5;
                    temp_b1[i] = 2.0*temp_b0[i];
                    temp_b2[i] = temp_b0[i];

                }
            }
            if(LPF_oct === eqType.Oct_18dB|| LPF_oct === eqType.Oct_30dB || LPF_oct === eqType.Oct_42dB)
            {
                temp_a0[0] = alph_l+LPF_Q[0];
                if(temp_a0[0] === 0)
                {
                    temp_a0[0] = 0.0000000001;
                }
                temp_a1[0] = alph_l-LPF_Q[0];
                temp_a2[0] = 0.0;
                temp_b0[0] = alph_l;
                temp_b1[0] = alph_l;
                temp_b2[0] = 0.0;
            }
          }

          tmp = 0;
          temp_Pol = 0;
          for(j=0;j<EQPoint;j++)
          {
              f = frequency[j];
              LPF_Wf = 2*pi*f/FS;
              for(i=0;i<4;i++)
              {
                  a1 = temp_a1[i] / temp_a0[i];
                  a2 = temp_a2[i] / temp_a0[i];

                  b1 = temp_b0[i] / temp_a0[i];
                  b2 = temp_b1[i] / temp_a0[i];
                  b3 = temp_b2[i] / temp_a0[i];
                  A =  Math.cos(LPF_Wf) +a1+a2*Math.cos(LPF_Wf);
                  B =  Math.sin(LPF_Wf) -a2*Math.sin(LPF_Wf);
                  C =  b1*Math.cos(LPF_Wf)+b2+b3*Math.cos(LPF_Wf);
                  D =  b1*Math.sin(LPF_Wf)-b3*Math.sin(LPF_Wf);
                  EE = Math.sqrt((C*C+D*D)/(A*A+B*B));
                  tmp = tmp+20*(Math.log(EE) / Math.LN10);

                  temp1 = (A*C+B*D)/(A*A+B*B);
                  temp2 = (A*D-B*C)/(A*A+B*B);

                  temp_Pol = temp_Pol + Math.atan2(temp2,temp1);

                  if(temp_Pol>=pi)
                  {
                      temp_Pol = temp_Pol-2*pi;
                  }

                  if(temp_Pol<=-pi)
                  {
                      temp_Pol = temp_Pol+2*pi;
                  }
              }
              this.m_nPoint[j] = tmp;
              tmp = 0;

              this.m_nPol_Point[j] = temp_Pol;
              temp_Pol = 0;
          }
    };

    FilterClass.prototype.UpDataPEQ = function () //更新参量滤波器图形坐标点
    {
        var i,f;
        var PEQ_FsPi,PEQ_Fc,PEQ_dB,PEQ_bw;
        var temp_a0,temp1,temp2,Q1,K,V;
        var a1,a2,b1,b2,b3;
        var A,B,C,D,EE,tmp;
        var PEQ_Wf;

        PEQ_Fc = getFrequencyDisplay(this.m_pEQ.freq);   //   Frequency[nFreq];
        PEQ_dB = this.GetdB();
        PEQ_bw = this.GetBW();

        PEQ_FsPi = 3.2724923474e-5;
        //
        K = Math.tan(PEQ_FsPi*PEQ_Fc);
        Q1 = Math.sqrt(Math.pow(2,PEQ_bw))/(Math.pow(2,PEQ_bw)-1);
        V = Math.pow(10,(Math.abs(PEQ_dB)/20));

         if( PEQ_dB>=0)
         {
           temp_a0 = 1/(1+K/Q1+K*K);
           a1 = 2*(K*K-1)*temp_a0;
           a2 = (1-K/Q1+K*K)*temp_a0;
           b1 = (1+(K*V)/Q1+K*K)*temp_a0;
           b2 = 2*(K*K-1)*temp_a0;
           b3 = (1-(K*V)/Q1+K*K)*temp_a0;
         }
        else
        {
           temp_a0 = 1/(1+(V*K)/Q1+K*K);
           a1 = 2*(K*K-1)*temp_a0;
           a2 = (1-(V*K)/Q1+K*K)*temp_a0;
           b1 = (1+(K)/Q1+K*K)*temp_a0;
           b2 = 2*(K*K-1)*temp_a0;
           b3 = (1-(K)/Q1+K*K)*temp_a0;
         }

        for(i=0;i<EQPoint;i++)
        {
            f = frequency[i];
            PEQ_Wf = 2*pi*f/FS;

            A = Math.cos(PEQ_Wf) +a1 +a2*Math.cos(PEQ_Wf);
            B = Math.sin(PEQ_Wf)-a2*Math.sin(PEQ_Wf);
            C = b1 *Math.cos(PEQ_Wf)+b2 +b3*Math.cos(PEQ_Wf);
            D = b1*Math.sin(PEQ_Wf)-b3*Math.sin(PEQ_Wf);
            EE = Math.sqrt((C*C+D*D)/(A*A+B*B));
            tmp = 20*(Math.log(EE) / Math.LN10);

            this.m_nPoint[i] = tmp;//把文档之值转换为坐标值

            temp1 = (A*C+B*D)/(A*A+B*B);
            temp2 = (A*D-B*C)/(A*A+B*B);
            tmp = Math.atan2(temp2,temp1);
    /*      if(i=== this.m_pEQ.freq)
            {
                tmp = 0;
            }
             */
            this.m_nPol_Point[i] = tmp;                        //    把文档之值     转换     为坐标值
        }
        if(this.m_nFilterType === eqType.AllPass_Shelf1)
        {
            this.UpDataAllPassPoint();
        } else if(this.m_nFilterType === eqType.AllPass_Shelf2){
            this.UpData_APF_1ST();
        }
    };

    FilterClass.prototype.UpDataAllPassPoint = function ()                //  更新全通模式下的 坐标点
    {
        var i,f;
        var PEQ_FsPi,PEQ_Fc,PEQ_dB,PEQ_bw;
        var w0,temp, temp_A,temp1,temp2;
        var a1,a2,b1,b2,b3;
        var A,B,C,D,tmp;
        var PEQ_Wf;
        var PI = 3.141592654;
        var nFreq;
        nFreq = getFrequencyStep(this.m_nFreq);
        PEQ_Fc = frequency[nFreq];
        PEQ_dB = this.m_ndB;
        PEQ_bw = this.m_nBW;
        for(i=0;i<EQPoint;i++)
        {
            f = frequency[i];
            PEQ_Wf = 2*PI*f/FS;
            PEQ_FsPi = 3.27249234792e-5;
            w0 = PEQ_Fc*PEQ_FsPi;
            temp = Math.tan(w0);//K

            temp_A = Math.sqrt(Math.pow(2,PEQ_bw))/(Math.pow(2,PEQ_bw)-1.0);//Q

            a1 = (2.0*temp_A*(temp*temp-1.0))/(temp*temp*temp_A + temp + temp_A);//a1
            a2 = (temp*temp*temp_A - temp + temp_A)/(temp*temp*temp_A + temp + temp_A);//a2
            b1 =  a2;//b0
            b2 =  a1;//b1
            b3 = 1.0; //b2
            A = Math.cos(PEQ_Wf) +a1 +a2*Math.cos(PEQ_Wf);
            B = Math.sin(PEQ_Wf)-a2*Math.sin(PEQ_Wf);
            C = b1 *Math.cos(PEQ_Wf)+b2 +b3*Math.cos(PEQ_Wf);
            D = b1*Math.sin(PEQ_Wf)-b3*Math.sin(PEQ_Wf);
    /*		EE = Math.sqrt((C*C+D*D)/(A*A+B*B));
            tmp = 20*(Math.log(EE) / Math.LN10);
            tmp = (atan2(D,C) - Math.atan2(B,A));
            if(tmp > PI || tmp < -PI)
            {
                tmp = -(tmp-PI);
            } */

            temp1 = (A*C+B*D)/(A*A+B*B);
            temp2 = (A*D-B*C)/(A*A+B*B);
            tmp = Math.atan2(temp2,temp1);
            this.m_nPol_Point[i] = tmp;
            this.m_nPoint[i] = 0;
        }
    };
    ////////////////////////////////////////////////////////////////////////////////////
    //                       已知滤波器图形坐标点更新滤波器的数据
    ////////////////////////////////////////////////////////////////////////////////////
    FilterClass.prototype.PointToBW = function (point, isLeft) //由坐标点获得带宽值
    {
        var Width;
        var Tmp;
        var nFreq;
        var offsetL = 175;
        var offsetR = 195;
        nFreq = getFrequencyDisplay(this.m_pEQ.freq);

        if(isLeft)
        {
            Width = point.x - offsetL;
            //this.m_nBW = ((Math.log((1.0*nFreq)/widthToDoc(Width,this.m_nWidth)))/Math.LN10)/(Math.log(2.0)/Math.LN10);
            this.m_nBW = ((Math.log(nFreq/widthToDoc(Width,this.m_nWidth)) / Math.LN10))/(Math.log(2) / Math.LN10);
            if(this.m_nBW >3)
            {
               this.m_nBW = 3.0;
            }
            if(this.m_nBW <0.05)
            {
               this.m_nBW = 0.05;
            }
            this.m_pEQ.bw = this.GetSendBW();
            this.UpDataPoint(false);
        }
        else
        {
            //Width = point.x - LeftGap;
            Width = point.x - offsetR;
            Tmp = widthToDoc(Width,this.m_nWidth)/(nFreq);
            this.m_nBW = (Math.log(Tmp) / Math.LN10)/(Math.log(2) / Math.LN10); //带宽值
            if(this.m_nBW >3)
            {
                this.m_nBW = 3.0;
            }
            if(this.m_nBW <0.05)
            {
                this.m_nBW = 0.05;
            }
            this.m_pEQ.bw = this.GetSendBW();
            this.UpDataPoint(false);

        }
        //console.log("Width: " + Width + "  isLeft: " + isLeft + "  frequency: " + nFreq + "  bandwidth: " + this.m_nBW + "  m_nWidth: " +this.m_nWidth);
       return true;
    };

    FilterClass.prototype.PointToFD = function (point) //由坐标点获得频率值
    {
        if(this.m_nFilterType === eqType.HPF_SEQ || this.m_nFilterType === eqType.LPF_SEQ)
        {
            return false;
        }
       var Flag = true;
       var Center = new PointClass(0,0);
       Center.x = point.x -　190;
       Center.y = point.y - 70;
       // Center.x = point.x - this.m_nFDSpace.x;
       // Center.y = point.y - this.m_nFDSpace.y;
       //Center.x = Center.x - LeftGap;
       //Center.y = Center.y - TopGap;
       //alert('m_nFDSpace.x : ' + this.m_nFDSpace.x + '  m_nFDSPace.y:' + this.m_nFDSpace.y);
       if(Center.x <=0)
       {
         Center.x = 0;
       }
       if(Center.x >=this.m_nWidth)
       {
         Center.x = this.m_nWidth;
       }
       if(Center.y <=(0))
       {
         Center.y = 0;
       }
       if(Center.y >=(this.m_nHigh))
       {
         Center.y = (this.m_nHigh);
       }
       if(Center.y <=0)
       {
           Center.y = 8;
       }
       this.m_nFreq = widthToDoc(Center.x, this.m_nWidth);
       this.m_pEQ.freq = binarySearch(frequency, this.m_nFreq);
       if((this.m_nFilterType !== eqType.AllPass_Shelf1) && (this.m_nFilterType !== eqType.AllPass_Shelf2))
       {
           this.m_ndB = highToDoc(Center.y, this.m_nHigh); //有坐标Y值，获取得增益值
           // console.log('增益值： ' + this.m_ndB);
           if(this.m_ndB > 20)
           {
               this.m_ndB = 20;
               // console.log('>20');
           }
           else
           {
               if(this.m_ndB < -20)
               {
                   this.m_ndB = -20;
                   // console.log('<20');
               }
           }
           if(this.m_ndB === 0.0)
           {
               this.m_bByPass = true;
           }
           else
           {
               this.m_bByPass = false;
               this.m_bAllByPass = false;
           }

          //  if(this.m_pEQ)
          //  {
               this.m_pEQ.level =this.GetSenddB(); //增益值
          //  }

       }
        this.UpDataPoint(false);
        //alert('频率:' + this.m_nFreq + ' 增益：' + this.m_ndB);
        //alert('增益：' + this.m_ndB + '  增益steps: ' + this.m_pEQ.level);
       return Flag;
    };

    FilterClass.prototype.PointToFDSpace = function (point) //求鼠标点到this.m_nRect中心点的距离
    {
        var Center;
        Center = deepCopy(this.m_nRect.CenterPoint());
        this.m_nFDSpace.x = point.x- Center.x;
        this.m_nFDSpace.y = point.y - Center.y;
        //alert('Center.x:' + Center.x + '  Center.y:' + Center.y);
        //alert('point.x:' + point.x + '  point.y:' + point.y);

    };

    FilterClass.prototype.PointToLRRectSpace = function (point) //求鼠标点到this.m_nLRect 或 this.m_nRRect中心点的距离
    {
        if(this.m_bLMouseDown)
        {
            this.m_nLSpace = point.x  - this.m_nLRect.right;
        }
        else
        {
            if(this.m_bRMouseDown)
            {
                this.m_nRSpace = point.x - this.m_nRRect.left;
            }
        }
    };

    FilterClass.prototype.PointToHLFreq = function (point,HLFreq) //已知坐标点求高低通的FREQ的值
    {
        this.m_nLimit_LPFFreq = eqType.MinFreq_Index;
        this.m_nLimit_HPFFreq = eqType.MaxFreq_Index;
        var Flag = false;
        var nFreq1,LimHLFreq;
        var Center;
        Center = new PointClass(0,0);
        // Center.x = point.x - this.m_nFDSpace.x;
        // Center.y = point.y - this.m_nFDSpace.y;
        // Center.x = Center.x - LeftGap;
        // Center.x = point.x - 180;
        // Center.y = point.y - 75;
        Center.x = point.x - 195;
        Center.y = point.y - 75;
        if(Center.x <=0)
        {
            Center.x = 0;
            if(this.m_nFilterType === eqType.HPF_SEQ)
            {
                //console.log('this.m_pXOver.HL_freq ============== eqType.MinFreq_Index;');
                this.m_pXOver.HL_freq = eqType.MinFreq_Index;
                for(var i=0;i<241;i++)
                {
                    this.m_nPoint[i] = 0;
                }
                this.UpDataPoint(false);
                this.HLToRect();
                Flag =true;
                return Flag;
            }
        }
        if(Center.x>=this.m_nWidth)
        {
            Center.x = this.m_nWidth;
        }
        LimHLFreq = getFrequencyStep(HLFreq);

        nFreq1 = widthToDoc(Center.x,this.m_nWidth);
        nFreq1 = getFrequencyStep(nFreq1);
        //console.log("HLFreq:" + HLFreq + "  nFreq1:" + nFreq1 + "  LimHLFreq:" + LimHLFreq);
        if(this.m_nFilterType === eqType.HPF_SEQ)
        {
            if(nFreq1 > LimHLFreq) //高低通相交后，不能相互越过
            {
                if(nFreq1 > this.m_nLimit_HPFFreq)
                {
                    nFreq1 = this.m_nLimit_HPFFreq;
                }
                //console.log('this.m_pXOver.HL_freq =================== LimHLFreq');
                this.m_pXOver.HL_freq = LimHLFreq;
                this.HLToRect();
                this.UpDataPoint(false);
                Flag =true;
                //console.log("HPF_LimHLFreq: " + LimHLFreq);
                return Flag;
            }
            else
            {
                if(nFreq1 > this.m_nLimit_HPFFreq)
                {
                    nFreq1 = this.m_nLimit_HPFFreq;
                }
                //console.log('this.m_pXOver.HL_freq = nFreq1:' + nFreq1);
                this.m_pXOver.HL_freq = nFreq1;
                this.UpDataPoint(false);
                Flag =true;
                //console.log("HPF_nFreq1 " + nFreq1);
                return Flag;
            }
        }
        if(this.GetFilterType() === eqType.LPF_SEQ)
        {
            if(nFreq1 < LimHLFreq) //高低通相交后，不能相互越过
            {
                if(nFreq1 < this.m_nLimit_LPFFreq)
                {
                    nFreq1 = this.m_nLimit_LPFFreq;
                }
                //console.log('this.m_pXOver.HL_freq = LimHLFreq:' + LimHLFreq);
                this.m_pXOver.HL_freq = LimHLFreq;
                this.HLToRect();
                this.UpDataPoint(false);
                Flag =true;
                //console.log("LPF_LimHLFreq: " + LimHLFreq);
                return Flag;
            }
            else
            {
                if(nFreq1 < this.m_nLimit_LPFFreq)
                {
                    nFreq1 = this.m_nLimit_LPFFreq;
                }
                //console.log('this.m_pXOver.HL_freq = nFreq1:' + nFreq1);
                this.m_pXOver.HL_freq = nFreq1;
                this.UpDataPoint(false);
                Flag =true;
                //console.log("LPF_nFreq1 " + nFreq1);
                return Flag;
            }
        }
        return Flag;
    };

     FilterClass.prototype.PointToULFHLFreq = function (point,HLFreq)      //已知坐标点求高低通的FREQ的值
    {
        var Flag = true;

        return Flag;
    };
    FilterClass.prototype.PointToEFFHLFreq = function (point,HLFreq)
    {
        Flag = true;

        return Flag;
    };




    //////////////////////////////////////////////////////////////////////////////////////
    //                              显示得到的滤波器的值
    /////////////////////////////////////////////////////////////////////////////////////
    FilterClass.prototype.GetPlayFreq = function ()            //得到Freq的显示值
    {
      var str;
      var nFreq_Pos;
      if(this.m_nFilterType === eqType.LPF_SEQ  || (this.m_nFilterType === eqType.HPF_SEQ))
      {//高低通
           nFreq_Pos = this.m_pXOver.HL_freq;
      }
      else
      {
          nFreq_Pos = this.m_pEQ.freq;
      }

      if(nFreq_Pos <= 56)
      {
          //str.Format("%0.1f",GetIndexToFreq(nFreq_Pos));
          str = toStringFloat(getFrequencyDisplay(nFreq_Pos), 1);
      }
      else
      {
          //str.Format("%0.0f",GetIndexToFreq(nFreq_Pos));
          str = toStringFloat(getFrequencyDisplay(nFreq_Pos), 1);
      }
      return str;
    };

    FilterClass.prototype.GetPlaydB = function ()           //得到dB的显示值
    {
      var str;
      if(this.m_bAllByPass || this.m_bByPass)
      {
          str = "0.0dB";
      }
      else
      {
          //str.Format("%0.1fdB",this.m_ndB);
          str = toStringFloat(this.m_ndB, 1) + 'fdB';
      }

      return str;
    };

    FilterClass.prototype.GetPlayBW = function ()           //得到BW的显示值
    {
       var str;
       //str.Format("%0.2foct",this.m_nBW);
        str = toStringFloat(this.m_nBW, 2) + 'foct';
       return str;
    };

    FilterClass.prototype.GetPlayType = function ()            //得到高低通模式显示值 :L_R,Bessel,BTWorth
    {
        var str;

        if(this.m_nFilterType === eqType.LPF_SEQ)
        {
           this.m_nType = this.m_pXOver.HL_Type;
        }
        else
        {
           if(this.m_nFilterType === eqType.HPF_SEQ)
           {
               this.m_nType = this.m_pXOver.HL_Type;
           }
        }

        if(isChinese)
        {
            switch(this.m_nType)
            {
            case eqType.L_R:
                str = "L_R";
                break;
            case eqType.Bessel:
                str = "Bessel";
                break;
            case eqType.ButtWorth:
                str = "BTWorth";
                break;
            default:
                str = "";
                break;
            }
        }
        else
        {
            switch(this.m_nType)
            {
            case eqType.L_R:
                str = "宁克";
                break;
            case eqType.Bessel:
                str = "贝塞尔";
                break;
            case eqType.ButtWorth:
                str = "巴特沃斯";
                break;
            default:
                str = "";
                break;
            }
        }
        return str;
    };

    FilterClass.prototype.GetPlayEQOct = function ()             //得到EQ的Oct的显示值
    {
       var str;
       this.m_nOct = GET_4H_BYTE(this.m_pEQ.HL_db_AP_Flag);
       switch(this.m_nOct)
       {
       case eqType.SEQ_6oct:
           str = "6dB/oct";
           break;
       case eqType.SEQ_12oct:
           str = "12dB/oct";
           break;
       default:
           str = "";
           break;
       }
       return str;
    };

    // FilterClass.prototype.GetPlayHLOct = function ()             //得到HL的Oct的显示值
    // {
    //    var str;
    //    if(this.m_nFilterType === eqType.LPF_SEQ)
    //    {
    //        if(this.m_nType === eqType.L_R)
    //        {
    //            this.m_nOct = this.m_pXOver.LR_Level;
    //        }
    //        else
    //        {
    //            this.m_nOct = this.m_pXOver.HL_Oct;
    //        }
    //    }
    //    else
    //    {
    //        if(this.m_nFilterType === eqType.HPF_SEQ)
    //        {
    //            if(this.m_nType === eqType.L_R)
    //            {
    //                this.m_nOct = this.m_pXOver.LR_Level;
    //            }
    //            else
    //            {
    //                this.m_nOct = this.m_pXOver.HL_Oct;
    //            }
    //        }
    //    }
    //    if(this.m_nType === eqType.L_R)
    //    {
    //        switch(this.m_nOct)
    //        {
    //        case eqType.Oct_12dB:
    //            str = "12dB/oct";
    //            break;
    //        case eqType.Oct_18dB:
    //            str = "24dB/oct";
    //            break;
    //        case eqType.Oct_24dB:
    //            str = "36dB/oct";
    //            break;
    //        case eqType.Oct_30dB:
    //            str = "48dB/oct";
    //            break;
    //        default:
    //            str = "";
    //            break;
    //        }
    //    }
    //    else
    //    {
    //        switch(this.m_nOct)
    //        {
    //        case eqType.Oct_12dB:
    //            str = "12dB/oct";
    //            break;
    //        case eqType.Oct_18dB:
    //            str = "18dB/oct";
    //            break;
    //        case eqType.Oct_24dB:
    //            str = "24dB/oct";
    //            break;
    //        case eqType.Oct_30dB:
    //            str = "30dB/oct";
    //            break;
    //        case eqType.Oct_36dB:
    //            str = "36dB/oct";
    //            break;
    //        case eqType.Oct_42dB:
    //            str = "42dB/oct";
    //            break;
    //        case eqType.Oct_48dB:
    //            str = "48dB/oct";
    //            break;
    //        default:
    //            str = "";
    //            break;
    //        }
    //    }
    //
    //    return str;
    // };

    FilterClass.prototype.GetPlayFilterType = function ()      //获得EQ模式显示值:PEQ,Lo_Shf,Hi_Shf
    {
      var str;
      if(isChinese)
      {
          switch(this.m_nFilterType)
          {
              case eqType.Param:
                  str = "PEQ";
                  break;
              case eqType.Lo_Shelf:
                  str = "Lo_Shf";
                  break;
              case eqType.Hi_Shelf:
                  str = "Hi_Shf";
                  break;
              case eqType.AllPass_Shelf1:
                  str = 'APF 1st';
                  break;
              case eqType.AllPass_Shelf2:
                  str = 'APF 2st';
                  break;
              default:
                  str = "PEQ";
                  break;
          }
      }
      else
      {
          switch(this.m_nFilterType)
          {
              case eqType.Param:
                  str = "参量均衡";
                  break;
              case eqType.Lo_Shelf:
                  str = "低调";
                  break;
              case eqType.Hi_Shelf:
                  str = "高调";
                  break;
              case eqType.AllPass_Shelf1:
                  str = '1阶全通';
                  break;
              case eqType.AllPass_Shelf2:
                  str = '2阶全通';
                  break;
              default:
                  str = "全通";
                  break;
          }
      }
      return str;
    };

    FilterClass.prototype.SetPublicEQ = function ( nEQ)    //重载等于(=)运算符
    {
        this.m_pEQ = deepCopy(nEQ);
        this.m_nFreq = getFrequencyDisplay(nEQ.freq);
        this.SetSendBW(nEQ.bw);
        this.SetSenddB(nEQ.level);
        this.SetAPF_ByPass(GET_4L_BYTE(nEQ.HL_db_AP_Flag));
        this.m_nOct = GET_4H_BYTE(nEQ.HL_db_AP_Flag);
        this.m_nFilterType = nEQ.type;
        this.UpDataPoint(false);
    };


    FilterClass.prototype.returnPublicEQ = function(  nEQ){
        nEQ.freq = getFrequencyStep(this.m_nFreq);
        nEQ.bw = getBandwidthStep(this.m_nBW);
        nEQ.level = getEqGainStep(this.m_ndB);
    };

    FilterClass.prototype.SetPublicXOver = function( nXOver) //重载等于(=)运算符
    {
         switch(this.m_nFilterType)
         {
         case eqType.HPF_SEQ: //高通
             //console.log("HPF");
             //this.m_pXOver = deepCopy(nXOver);
             this.m_pXOver = nXOver;
             //console.log('HPF_SEQ:' + nXOver.HL_freq);
             this.m_nFreq = getFrequencyDisplay(nXOver.HL_freq);
             this.m_nOct = nXOver.HL_Oct;
             this.m_nType = nXOver.HL_Type;
             this.UpDataPoint(false);
             // console.log('更新高通的坐标点');
             break;
         case eqType.LPF_SEQ:	//低通
             //console.log("LPF");
             //this.m_pXOver = deepCopy(nXOver);
             this.m_pXOver = nXOver;
//             console.log('LPF_SEQ:' + nXOver.HL_freq);
             this.m_nFreq = getFrequencyDisplay(nXOver.HL_freq);
             this.m_nOct = nXOver.HL_Oct;
             this.m_nType = nXOver.HL_Type;
             this.UpDataPoint(false);
             // console.log('更新低通的坐标点');
             break;
         }
    };


    FilterClass.prototype.returnPublicXOver = function(nXover) {
        switch(this.m_nFilterType){
            case eqType.HPF_SEQ:
                nXover.freq = this.m_pXOver.HL_freq;

                break;
            case eqType.LPF_SEQ:
                nXover.freq = this.m_pXOver.HL_freq;
                //console.log("LPF_SEQ:" + this.m_pXOver.HL_freq);
                break;
            default:
                break;
        }
    };
    
    // FilterClass.prototype.SetLinkFilter = function(Filter)
    // {
    //     this.m_nFilterType = Filter.m_nFilterType;  //滤波器类型有PEQ,Hi_Shelf,L0_Shelf,Lo_EQ,Hi_EQ五种类型
    //     this.m_ndB = Filter.m_ndB;                  //增益
    //
    //     this.m_bByPass = Filter.m_bByPass;          //ByPass
    //     this.m_bAllByPass = Filter.m_bAllByPass;    //更新m_bByPass;
    //     this.m_bAllEQByPass = Filter.m_bAllEQByPass;
    //
    //     this.m_bAPF_Pass_Flag = Filter.m_bAPF_Pass_Flag;
    //     this.m_bAPF_Save_AllByPass = Filter.m_bAPF_Save_AllByPass;
    //     this.m_bAPF_ByPass = Filter.m_bAPF_ByPass;
    //     this.m_bAPF_AllByPass = Filter.m_bAPF_AllByPass;
    //
    //     this.m_nBW = Filter.m_nBW;                  // Q 值
    //     this.m_nType = Filter.m_nType;              //Lo_EQ 和 Hi_EQ 的类型
    //     this.m_nOct = Filter.m_nOct;
    //     switch(this.m_nFilterType)
    //     {
    //     case eqType.Pi_SEQ:
    //     case eqType.Li_SEQ:
    //     case eqType.Hi_SEQ:
    //         this.m_pEQ.bw = Filter.m_pEQ.bw;
    //         this.m_pEQ.freq = Filter.m_pEQ.freq;
    //         this.m_pEQ.level = Filter.m_pEQ.level;
    //         SET_4H_BYTE(this.m_pEQ.HL_db_AP_Flag,Filter.m_pEQ.HL_db_AP_Flag>>4);
    //         this.m_pEQ.type = Filter.m_pEQ.type;
    //         SET_4L_BYTE(this.m_pEQ.HL_db_AP_Flag,Filter.m_pEQ.HL_db_AP_Flag);
    //         break;
    //     case eqType.HPF_SEQ:
    //         this.m_pXOver.HL_freq = Filter.m_pXOver.HL_freq;
    //         this.m_pXOver.HL_Oct = Filter.m_pXOver.HL_Oct;
    //         this.m_pXOver.HL_Type = Filter.m_pXOver.HL_Type;
    //         break;
    //     case eqType.LPF_SEQ:
    //         this.m_pXOver.HL_freq = Filter.m_pXOver.HL_freq;
    //         this.m_pXOver.HL_Oct = Filter.m_pXOver.HL_Oct;
    //         this.m_pXOver.HL_Type = Filter.m_pXOver.HL_Type;
    //         break;
    //     }
    //     this.UpDataPoint(false);
    // };


    FilterClass.prototype.Get_LR_Oct = function( nOct)             // L-R  斜率
    {
        var nLR_Oct = 0;
        switch(nOct)
        {
        case eqType.Oct_12dB:
            nLR_Oct = nOct;
            break;
        case eqType.Oct_18dB:
            nLR_Oct = eqType.Oct_24dB;
            break;
        case eqType.Oct_24dB:
            nLR_Oct = eqType.Oct_36dB;
            break;
        case eqType.Oct_30dB:
            nLR_Oct = eqType.Oct_48dB;
            break;
        }
        return nLR_Oct;
    }
}