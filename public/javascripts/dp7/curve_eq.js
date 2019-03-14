
window.COLOR_INPUT_A = '#00FFFF';
window.COLOR_INPUT_B = '#E9127B';
window.COLOR_INPUT_C = 'ffff00';
window.COLOR_INPUT_D = '#027BC0';
window.COLOR_OUT1 = '#FF0000';
window.COLOR_OUT2 = '#00C000';
window.COLOR_OUT3 = '#8080C0';
window.COLOR_OUT4 = '#FF40FF';
window.COLOR_OUT5 = '#00C0C0';
window.COLOR_OUT6 = '#C0A800';
window.COLOR_OUT7 = '#FF8000';
window.COLOR_OUT8 = '#0000FF';


window.COLOR_INPUT = ['#00FFFF', '#E9127B', '#027BC0','#ffff00'];
window.COLOR_OUT = ['#FF0000', '#00C000', '#8080C0', '#FF40FF', '#00C0C0', '#C0A800', '#FF8000', '#0000FF'];



function CurveEQ() {
    this.m_nPoint = new Array(frequency.length);         //定义241个坐标点
    this.m_nPointF = new Array(frequency.length);        //保存浮点滤波器的坐标点
    this.m_nPol_Point = new Array(frequency.length);    //  相位  滤波器
    this.m_nHight = 0; //高度
    this.m_nWidth = 0; //宽度
    this.m_nRotueType =0;          //用于判定当前是那个端口的EQ
    this.m_nEQCol = 0;         //EQ BW 方块的颜色
    this.m_nEQLineCol = COLOR_INPUT_A;     //EQ的线条颜色
    this.m_bAllByPass = 0;
    this.m_pFilter = new FilterClass();
    this.m_nRouteID = 0;            //  端口ID
    this.filterArray = [];
    this.polar = false;


    CurveEQ.prototype.Init = function ()//初始化坐标
    {
        var size;
        var m,i;
        m = curveHeight;
        this.m_nHight = curveHeight;
        this.m_nWidth = curveWidth;

        for(i=0; i<frequency.length; i++) {
            this.m_nPoint[i] = new PointClass(0, 0);         //定义241个坐标点
            this.m_nPointF[i] = new PointClass(0, 0);        //保存浮点滤波器的坐标点
            this.m_nPol_Point[i] = new PointClass(0, 0);    //  相位  滤波器
        }

        for (i=0 ;i<11; i++) {
           this.filterArray[i] = new FilterClass();
           this.filterArray[i].init();
        }

        size = this.filterArray.length;
        for(i=0;i<EQPoint;i++)			//初始化241个点的坐标
        {
            this.m_nPointF[i].x = docToWidthF(frequency[i],this.m_nWidth);
            this.m_nPol_Point[i].x = docToWidthF(frequency[i],this.m_nWidth);
        }

    };



    CurveEQ.prototype.InitInEQ = function (inRouteId, inputData)            //   初始化    输入    EQ
    {

        this.filterArray[0].SetPublicEQ(inputData.InEQ.EQ1);
        this.filterArray[0].SetEQID(1);

        this.filterArray[1].SetPublicEQ(inputData.InEQ.EQ2);
        this.filterArray[1].SetEQID(2);

        this.filterArray[2].SetPublicEQ(inputData.InEQ.EQ3);
        this.filterArray[2].SetEQID(3);

        this.filterArray[3].SetPublicEQ(inputData.InEQ.EQ4);
        this.filterArray[3].SetEQID(4);

        this.filterArray[4].SetPublicEQ(inputData.InEQ.EQ5);
        this.filterArray[4].SetEQID(5);

        this.filterArray[5].SetPublicEQ(inputData.InEQ.EQ6);
        this.filterArray[5].SetEQID(6);

        this.filterArray[6].SetPublicEQ(inputData.InEQ.EQ7);
        this.filterArray[6].SetEQID(7);

        this.filterArray[7].SetPublicEQ(inputData.InEQ.EQ8);
        this.filterArray[7].SetEQID(8);

        this.filterArray[8].SetPublicEQ(inputData.InEQ.EQ9);
        this.filterArray[8].SetEQID(9);

        this.SetRouteID(inRouteId);
        switch(inRouteId)
        {
        case eqType.InA_QUEUE: //输入A
            this.m_nEQCol = COLOR_INPUT_A;
            this.m_nEQLineCol = COLOR_INPUT_A;
            this.m_nRotueType = eqType.InA_QUEUE;
            break;
        case eqType.InB_QUEUE:	//输入B
            this.m_nEQCol = COLOR_INPUT_B;
            this.m_nEQLineCol = COLOR_INPUT_B;
            this.m_nRotueType = eqType.InB_QUEUE;
            break;
        case eqType.InC_QUEUE:	//输入C
            this.m_nEQCol = COLOR_INPUT_C;
            this.m_nEQLineCol = COLOR_INPUT_C;
            this.m_nRotueType = eqType.InC_QUEUE;
            break;
        case eqType.InD_QUEUE:	//输入D
            this.m_nEQCol = COLOR_INPUT_D;
            this.m_nEQLineCol = COLOR_INPUT_D;
            this.m_nRotueType = eqType.InD_QUEUE;
            break;
        }
    };
    
    CurveEQ.prototype.InitOutEQ = function (outRouteType, outData) //初始化输出EQ
    {

        this.SetRouteID(outRouteType);

        this.filterArray[0].SetPublicEQ(outData.OutEQ.EQ1);
        this.filterArray[0].SetEQID(1);

        this.filterArray[1].SetPublicEQ(outData.OutEQ.EQ2);
        this.filterArray[1].SetEQID(2);

        this.filterArray[2].SetPublicEQ(outData.OutEQ.EQ3);
        this.filterArray[2].SetEQID(3);

        this.filterArray[3].SetPublicEQ(outData.OutEQ.EQ4);
        this.filterArray[3].SetEQID(4);

        this.filterArray[4].SetPublicEQ(outData.OutEQ.EQ5);
        this.filterArray[4].SetEQID(5);

        this.filterArray[5].SetPublicEQ(outData.OutEQ.EQ6);
        this.filterArray[5].SetEQID(6);

        this.filterArray[6].SetPublicEQ(outData.OutEQ.EQ7);
        this.filterArray[6].SetEQID(7);

        this.filterArray[7].SetPublicEQ(outData.OutEQ.EQ8);
        this.filterArray[7].SetEQID(8);

        this.filterArray[8].SetPublicEQ(outData.OutEQ.EQ9);
        this.filterArray[8].SetEQID(9);

        this.filterArray[9].SetFilterType(eqType.HPF_SEQ);  //高通
        this.filterArray[9].SetPublicXOver(outData.HPFData);
        //this.SetHLShowType(outRouteType);  //cancel

        this.filterArray[10].SetFilterType(eqType.LPF_SEQ); //低通
        this.filterArray[10].SetPublicXOver(outData.LPFData);
        //this.SetHLShowType(outRouteType); //cancel


        switch(outRouteType)
        {
        case eqType.Out1_QUEUE://输出1
            this.m_nEQCol = COLOR_OUT1;
            this.m_nEQLineCol = COLOR_OUT1;
            this.m_nRotueType = eqType.Out1_QUEUE;
            break;
        case eqType.Out2_QUEUE://输出2
            this.m_nEQCol = COLOR_OUT2;
            this.m_nEQLineCol = COLOR_OUT2;
            this.m_nRotueType = eqType.Out2_QUEUE;
            break;
        case eqType.Out3_QUEUE://输出3
            this.m_nEQCol = COLOR_OUT3;
            this.m_nEQLineCol = COLOR_OUT3;
            this.m_nRotueType = eqType.Out3_QUEUE;
            break;
        case eqType.Out4_QUEUE://输出4
            this.m_nEQCol = COLOR_OUT4;
            this.m_nEQLineCol = COLOR_OUT4;
            this.m_nRotueType = eqType.Out4_QUEUE;
            break;
        case eqType.Out5_QUEUE://输出5
            this.m_nEQCol = COLOR_OUT5;
            this.m_nEQLineCol = COLOR_OUT5;
            this.m_nRotueType = eqType.Out5_QUEUE;
            break;
        case eqType.Out6_QUEUE://输出6
            this.m_nEQCol = COLOR_OUT6;
            this.m_nEQLineCol = COLOR_OUT6;
            this.m_nRotueType = eqType.Out6_QUEUE;
            break;
        case eqType.Out7_QUEUE://输出7
            this.m_nEQCol = COLOR_OUT7;
            this.m_nEQLineCol = COLOR_OUT7;
            this.m_nRotueType = eqType.Out7_QUEUE;
            break;
        case eqType.Out8_QUEUE://输出8
            this.m_nEQCol = COLOR_OUT8;
            this.m_nEQLineCol = COLOR_OUT8;
            this.m_nRotueType = eqType.Out8_QUEUE;
            break;
        }
    };
    

    CurveEQ.prototype.Conver_In_EQPoint = function()  //   InEQ坐标转换
    {
        //Filter = new FilterClass();
        var  nType,i;
        var size;
        var Mod = 0.0;
        var pMod = 0.0;
        //size = this.filterArray.length;
        size = 6;
        for(i=0;i<EQPoint;i++)
        {
            for(var j=0;j<size;j++)
            {
                //Filter = (CFilter *)GetAt(j);
                nType = this.filterArray[j].GetFilterType();
                if(currentLockData.nIn_LockData.nIn_EQ)
                {//输入均衡锁定  显示一条直线
                    continue;
                }
                Mod = Mod + this.filterArray[j].m_nPoint[i];
                
                pMod = pMod + this.filterArray[j].m_nPol_Point[i];
                
                if(j>0)
                {
                    if(pMod >=pi)
                    {
                        pMod = pMod-2*pi;
                    }
                    else
                    {
                        if(pMod <= -pi)
                        {
                            pMod = pMod + 2*pi;
                        }   
                    }
                }
            }


            this.m_nPointF[i].x = docToWidthF(frequency[i],this.m_nWidth);
            this.m_nPointF[i].y = docToHighF(Mod,this.m_nHight)+TopGap;
            Mod =0;
            
            // if(this.m_nRouteID === currentLockData.selIn && currentLockData.type === eqType.In_Type)
            // {
                if(this.polar)
                {
                    pMod = pMod - pi;
                    if(pMod >=pi)
                    {
                        pMod = pMod-2*pi;
                    }
                    else
                    {
                        if(pMod < -pi)
                        {
                            pMod = pMod + 2*pi;
                        }
                    }
                }
            // }
            
            pMod = pMod*12.73239566454288;
            this.m_nPol_Point[i].y = docToHighF(pMod,this.m_nHight) + TopGap;
            if(this.m_nPol_Point[i].y >= this.m_nHight)
            {
                //this.m_nPol_Point[i].y = this.m_nPol_Point[i].y-1;
                this.m_nPol_Point[i].y = this.m_nPol_Point[i].y + 2;
            }
            pMod = 0;
        }
    };
    
    CurveEQ.prototype.Conver_Out_PHLPoint = function()   //   转换PHL坐标
    {
        var nType,i;
        var size;
        var Mod = 0.0;
        var pMod = 0.0;
        size = this.filterArray.length;
        // console.log('filter size:' + size);
        for(i=0;i<EQPoint;i++)
        {//EQPoint = 241
            for(var j=0;j<size;j++)
            {
                nType = this.filterArray[j].GetFilterType();
                if(nType === eqType.HPF_SEQ || nType === eqType.LPF_SEQ)
                {
                    if(currentLockData.nOut_LockData.nOut_Xover)
                    {//输出分频锁定
                        continue;
                    }
                }
                else
                {		
                    if(currentLockData.nOut_LockData.nOut_EQ)
                    {//输出均衡锁定
                        continue;
                    }
                }
                Mod = Mod + this.filterArray[j].m_nPoint[i];
    
                pMod = pMod + this.filterArray[j].m_nPol_Point[i];
    
                if(j>0)
                {
                    if(pMod >=pi)
                    {
                        pMod = pMod-2*pi;
                    }
                    else
                    {
                        if(pMod <= -pi)
                        {
                            pMod = pMod + 2*pi;
                        }   
                    }
                }
            }
    
            this.m_nPointF[i].y = docToHighF(Mod,this.m_nHight) + TopGap; //曲线点坐标
            Mod =0;
          
            // if(this.m_nRouteID === m_nCurMarker.nSelOut && m_nCurMarker.nType === Out_Type)
            // {
                //console.log('输出相位：' + this.polar);
            if(this.polar)
            {
                pMod = pMod - pi;
                if(pMod >=pi)
                {
                    pMod = pMod-2*pi;
                }
                else
                {
                    if(pMod < -pi)
                    {
                        pMod = pMod + 2*pi;
                    }
                }
            }
            //}
    
            pMod = pMod*12.73239566454288;
            this.m_nPol_Point[i].y = docToHighF(pMod,this.m_nHight)+TopGap; //相位曲线点坐标
            if(this.m_nPol_Point[i].y >= this.m_nHight)
            {//相位曲线点坐标
                //this.m_nPol_Point[i].y = this.m_nPol_Point[i].y-1;
                this.m_nPol_Point[i].y = this.m_nPol_Point[i].y+2;
            }
            pMod = 0;
        }
    };
    
    CurveEQ.prototype.UpDataOutPoint = function ( )                                   //   更新   输出    坐标点
    {
        for(var i=0;i<eqType.Cur_Out_EQNum;i++)
        {
            this.filterArray[j].UpDataPoint();
        }
    };
    
    CurveEQ.prototype.UpDataInPoint = function ( nSel)                                   //     更新  输入    坐标点
    {
    
    };
    
    CurveEQ.prototype.GetHPFFilter = function () //得到高通滤波器
    {
        var Size;
        Size = this.filterArray.length;
        // ASSERT(((CFilter *)GetAt(Size-2)).GetFilterType() == HPF_SEQ);
        // return (CFilter *)GetAt(Size-2);
        if(this.filterArray[Size-2].GetFilterType() === eqType.HPF_SEQ){
            return this.filterArray[Size-2];
        }
    };
    
    
    CurveEQ.prototype.GetLPFFilter = function () //得到低通滤波器
    {
        var Size;
        Size = this.filterArray.length;
        // ASSERT(((CFilter *)GetAt(Size-1)).GetFilterType() == LPF_SEQ);
        // return (CFilter *)GetAt(Size-1);
        if(this.filterArray[Size-1].GetFilterType() === eqType.LPF_SEQ){
            return this.filterArray[Size-1];
        }
    };
    

    CurveEQ.prototype.SetEQCol = function ( nCol)	//设置EQ线条 颜色线
    {
       this.m_nEQCol = nCol;
    };
    
    CurveEQ.prototype.SetEQLineCol = function( nCol)
    {
       this.m_nEQLineCol = nCol;
    };
    
    CurveEQ.prototype.GetEQCol = function ()
    {
       return this.m_nEQCol;
    };
    
    CurveEQ.prototype.GetEQLineCol = function()
    {
      return this.m_nEQLineCol;
    };
    
    CurveEQ.prototype.SetInAllByPass = function ( nBYPass)           //   设定输入ALLByPass
    {
        for(var i=0;i<eqType.Cur_In_EQNum;i++)
        {
            this.filterArray[j].SetALLByPass(nBYPass);
        }  
    };
    
    CurveEQ.prototype.SetOutAllByPass = function( nBYPass)          //   设定输出AllByPass
    {
        for(var i=0;i<eqType.Cur_Out_EQNum;i++)
        {
            this.filterArray[j].SetALLByPass(nBYPass);
        }   
    };
    
    
    CurveEQ.prototype.SetRouteID = function ( nID)                    //   设定输出通道端口ID
    {
        this.m_nRouteID = nID;
    };
    
    
    CurveEQ.prototype.GetInAllByPass = function ()                       //   得到输入 AllByPass
    {
        var nFlag;
        this.m_bAllByPass = this.filterArray[0].GetByPass();
        for(var i=1;i<eqType.Cur_In_EQNum;i++)
        {

            nFlag = this.filterArray[i].GetByPass();
            this.m_bAllByPass = this.m_bAllByPass && nFlag;
        }
        return this.m_bAllByPass;
    };
    
    CurveEQ.prototype.GetOutAllByPass = function ()                      //   得到输出 AllByPass
    {
        var nFlag;
        this.m_bAllByPass = this.filterArray[0].GetByPass();
        for(var i=1;i<eqType.Cur_Out_EQNum;i++)
        {
            nFlag = this.filterArray[i].GetByPass();
            this.m_bAllByPass = this.m_bAllByPass && nFlag;
        }
        return this.m_bAllByPass;
    };
    
    // CurveEQ.prototype.SetInLinkEQ = function(  EQ)    //设定输入联调EQ
    // {
    //     CFilter *pFilterT,*pFilterS;
    //     for(var i=0;i<eqType.Cur_Out_EQNum;i++)
    //     {
    //         pFilterT = (CFilter *)GetAt(i);
    //         pFilterS = (CFilter *)EQ.GetAt(i);
    //         pFilterT.SetLinkFilter(pFilterS);
    //     }
    // };
    
    // CurveEQ.prototype.SetOutLinkEQ = function ( EQ)   //设定输出联调EQ
    // {
    //     CFilter *pFilterT,*pFilterS;
    //     for(var i=0;i<eqType.Cur_Out_EQNum;i++)
    //     {
    //         pFilterT = (CFilter *)GetAt(i);
    //         pFilterS = (CFilter *)EQ.GetAt(i);
    //         pFilterT.SetLinkFilter(*pFilterS);
    //     }
    //     pFilterT = GetHPFFilter();
    //     pFilterS = (CFilter *)EQ.GetAt(OutHPF_QUEUE);
    //     pFilterT.SetLinkFilter(*pFilterS);
    //
    //     pFilterT = GetLPFFilter();
    //     pFilterS = (CFilter *)EQ.GetAt(OutLPF_QUEUE);
    //     pFilterT.SetLinkFilter(*pFilterS);
    // };

}



