

window.CEL_TopGap = 8;                //Top           距离静态类的距离
window.CEL_BottomGap = 18;             //BotttomGap    距离静态类的距离
window.CEL_LeftGap  = 20;              //LeftGap     距离静态类的距离
window.CEL_RightGap = 8;              //RightGap    距离静态类的距离

window.IN_COMP   = 1;                  // 输入  压缩类型
window.IN_EXT    = 2;                  // 输入  扩展类型
window.OUT_COMP_LIMT  = 3;             // 输出  压缩类型
window.IN_COMP_EXT  = 4;               // 输入  压缩 扩展 类型

window.RectPen_Col = '#959595';              //RGB(149,149,149)        //  正方形颜色
window.RectMapPen_Col  = '#FFFFFF';          //RGB(255,255,255)    //  图形正方形的颜色
window.RectPen_Width =  1;                   //  画图形边线的宽度
window.Rect_Line1      = '#00B400';          //RGB(0,180,0)
window.Rect_Line2      = '#152415';          //RGB(21,100,21)

window.RectBK_Col  = '#000000';                  //RGB(0,0,0)              //  Rect 背景颜色
window.Line_Col       = '#FF0000';               //RGB(255,0,0)			//  要画的线的颜色
window.Comp_Line_Col_F = '#FF0000';              //Color(255,255,0,0)
window.Comp_Level_Rect_Col_F  = '#00FF00';       //Color(255,0,255,0)
window.Comp_Ratio_Rect_Col_F  = '#0000FF';       //Color(255,0,0,255)
window.Lim_Line_Col_F  = '#0000FF';              //Color(255,0,0,255)
window.Lim_Level_Rect_Col_F   = '#FFFFFF';       //Color(255,255,255,0)
window.Font_Col       = '#969696';              //RGB(150,150,150)     //  字体颜色
window.Line_Width  =   2;                       //线的宽度

window.Line_Dash      = '#C3C3C3';      //Color(255,195,195,195)   //  灰色  点划线

window.Out1EQLineCol= '#FF0000';       //(255,255,0,0);
window.Out2EQLineCol= '#00C000';       //(255,0,192,0);
window.Out3EQLineCol= '#8080C0';       //(255,128,128,192);
window.Out4EQLineCol= '#FF40FF';       //(255,255,64,255);
window.Out5EQLineCol= '#00C0C0';       //(255,0,192,192);
window.Out6EQLineCol= '#C0A800';       //(255,192,168,0);
window.Out7EQLineCol= '#FF8000';       //(255,255,128,0);
window.Out8EQLineCol= '#0000FF';       //(255,0,0,255);

window.Pol_LineCol= '#FFFFFF';       //(255,255,255,255);         //  相位 曲线

window.OutEQLineCol = [Out1EQLineCol,Out2EQLineCol,Out3EQLineCol,Out4EQLineCol,Out5EQLineCol,Out6EQLineCol,Out7EQLineCol,Out8EQLineCol];

window.OutEQ1Col = '#FF0000';       //=  RGB(255,0,0);
window.OutEQ2Col = '#00C000';       //=  RGB(0,192,0);
window.OutEQ3Col = '#8080C0';       //=	RGB(128,128,192);
window.OutEQ4Col = '#FF40FF';       //=  RGB(255,64,255);
window.OutEQ5Col = '#00C0C0';       //=  RGB(0,192,192);
window.OutEQ6Col = '#C0A800';       //=  RGB(192,168,0);
window.OutEQ7Col = '#FF8000';       //=  RGB(255,128,0);
window.OutEQ8Col = '#0000FF';       //=  RGB(0,0,255);

window.OutEQCol = [OutEQ1Col,OutEQ2Col,OutEQ3Col,OutEQ4Col,OutEQ5Col,OutEQ6Col,OutEQ7Col,OutEQ8Col];

window.Lim_Ext_Rect  =  10;

function ComExtMap() {
	this.m_pInData = new PublicInPut();
	this.m_pOutData = new PublicOutPut();

	this.m_nLevel = 0;
	this.m_nRatio = 0;            //       压缩扩展的比例
	this.m_nStart_Point = new PointClass(0,0);	
	this.m_nLevel_Point = new PointClass(0,0);	
	this.m_nRatio_Point = new PointClass(0,0);	
	this.m_nEnd_Point = new PointClass(0,0);	
	this.m_nLim_Point = new PointClass(0,0);
	this.m_nStart_Lim_Point = new PointClass(0,0);	
	this.m_nEnd_Lim_Point = new PointClass(0,0);    //     压线起始点 结束点
	this.m_nStart_Dath_Point = new PointClass(0,0);	
	this.m_nEnd_Dath_Point = new PointClass(0,0);    //     压缩 限幅 画点化线
	this.m_nHeight = curveHeight;
	this.m_nWidth = curveWidth;
	this.m_nClientRect = new RectClass(0,0,0,0);
	this.m_nMapRect = new RectClass(0,0,0,0);
	this.m_nExt_Level_Rect = new RectClass(0,0,0,0);
	this.m_nComp_Level_Rect = new RectClass(0,0,0,0);
	this.m_nLim_Level_Rect = new RectClass(0,0,0,0);     //  客户Rect 画图Rect
	this.m_nExt_Ratio_Rect = new RectClass(0,0,0,0);
	this.m_nComp_Ratio_Rect = new RectClass(0,0,0,0);
	this.m_nLim_Ratio_Rect = new RectClass(0,0,0,0);     //  客户Rect 画图Rect

	this.m_nType_Map = 0;                  //       视图类型
    
	this.m_bRectOver = false;                   //判断光标是否在 Rect上面

	this.m_bMouseDown = false; 
	this.m_bExt_Level_Rect_Over = false; 
	this.m_bExt_Ratio_Rect_Over = false; 
	this.m_bComp_Level_Rect_Over = false; 
	this.m_bComp_Ratio_Rect_Over = false; 
	
	this.m_bLimT_Rect_Over = false;


    ComExtMap.prototype.Init = function()                      //  初始化数据
    {
        var curveElement = document.getElementById('curve_out');
        if (getCss(curveElement, 'height') !== 'auto') {
            var high = parseInt(getCss(curveElement, 'height')); //getCSS return value: 276px  the value is string
        }
        if (getCss(curveElement, 'width') !==  'auto') {
            var width = parseInt(getCss(curveElement, 'width'));
        }
        this.m_nClientRect.right = width;
        this.m_nClientRect.bottom = high;
        //console.log("this.m_nClientRect:"+this.m_nClientRect.left+","+this.m_nClientRect.top+","+this.m_nClientRect.right+","+this.m_nClientRect.bottom);
        
        this.m_nMapRect.right = this.m_nClientRect.right;
        this.m_nMapRect.bottom = this.m_nClientRect.bottom;
        //console.log("this.m_nMapRect:"+this.m_nMapRect.left+","+this.m_nMapRect.top+","+this.m_nMapRect.right+","+this.m_nMapRect.bottom);

        this.m_nMapRect.top = this.m_nMapRect.top + CEL_TopGap;
        this.m_nMapRect.bottom  = this.m_nMapRect.bottom - CEL_BottomGap;
        this.m_nMapRect.left = this.m_nMapRect.left + CEL_LeftGap;
        this.m_nMapRect.right = this.m_nMapRect.right -CEL_RightGap;
        //console.log("this.m_nMapRect:"+this.m_nMapRect.left+","+this.m_nMapRect.top+","+this.m_nMapRect.right+","+this.m_nMapRect.bottom);


        this.m_nStart_Dath_Point.x = (this.m_nMapRect.left);
        this.m_nStart_Dath_Point.y = (this.m_nMapRect.bottom)-Line_Width;
        this.m_nEnd_Dath_Point.x = (this.m_nMapRect.right);
        this.m_nEnd_Dath_Point.y = (this.m_nMapRect.top);
    
        this.m_nStart_Lim_Point.x = (this.m_nMapRect.left);
        this.m_nEnd_Lim_Point.x = (this.m_nMapRect.right);

        var tempValue = this.m_nMapRect.Height();
        //console.log(tempValue);
        this.m_nHeight = tempValue/(600*1.0);
        var tempValue = this.m_nMapRect.Width();
        //console.log(tempValue);
        this.m_nWidth = tempValue/(600*1.0);
        svgDrawOut.drawGrid();
    
    };
    


    ComExtMap.prototype.SetOutComp_LimT = function( nNum)   // 设定输出压缩 压线的索引
    {
        switch (nNum) {
            case 0:
                this.m_pOutData = currentGroupData.dataOut1;
                break;
            case 1:
                this.m_pOutData = currentGroupData.dataOut2;
                break;
            case 2:
                this.m_pOutData = currentGroupData.dataOut3;
                break;
            case 3:
                this.m_pOutData = currentGroupData.dataOut4;
                break;
            case 4:
                this.m_pOutData = currentGroupData.dataOut5;
                break;
            case 5:
                this.m_pOutData = currentGroupData.dataOut6;
                break;
            case 6:
                this.m_pOutData = currentGroupData.dataOut7;
                break;
            case 7:
                this.m_pOutData = currentGroupData.dataOut8;
                break;
            default:
                this.m_pOutData = currentGroupData.dataOut1;
                break;
        }
        
        //console.log("m_pOutData:" + this.m_pOutData.compLevel + "," + this.m_pOutData.limT + "," + this.m_pOutData.compRatio);
        this.m_nStart_Point.x = (this.m_nMapRect.left);
        this.m_nStart_Point.y = (this.m_nMapRect.bottom)-Line_Width;
        this.m_nComp_Lim_Line_Col = OutEQLineCol[nNum];
        this.DrawOutComp_LimT();
    };
    

    ComExtMap.prototype.DrawOutComp_LimT = function()  // 画输出 压缩 限幅
    {
        if(this.m_pOutData === null)
        {
            return;
        }

        
        if(currentLockData.nOut_LockData.nOut_Comp_LimT)
        {
            this.m_nLevel_Point.x = (this.m_nMapRect.left+this.m_nWidth*eqType.MaxLimT);
            this.m_nLevel_Point.y = (this.m_nMapRect.bottom - (this.m_nHeight*eqType.MaxLimT));
            
            this.m_nLim_Point.x = (this.m_nMapRect.left+this.m_nWidth*(eqType.MaxLimT));
            this.m_nLim_Point.y = (this.m_nMapRect.bottom - (this.m_nHeight*eqType.MaxLimT));
            
            this.m_nEnd_Point.x = (this.m_nMapRect.right);
            this.m_nEnd_Point.y = (this.m_nMapRect.bottom - (this.m_nHeight*eqType.MaxLimT));

            svgDrawOut.drawLine(1,this.m_nStart_Point,this.m_nEnd_Point, "red");

            console.log("绘制输出的压缩限幅 点线");
        }
        else
        {
            this.m_nLevel_Point.x = (this.m_nMapRect.left + this.m_nWidth*this.m_pOutData.compLevel);
            this.m_nLevel_Point.y = (this.m_nMapRect.bottom - this.m_nHeight*this.m_pOutData.compLevel);

            this.m_nLim_Point.x = (this.m_nMapRect.left+this.m_nWidth*(this.m_pOutData.limT));
            this.m_nLim_Point.y = (this.m_nMapRect.bottom - (this.m_nHeight*this.m_pOutData.limT));
            
            this.m_nEnd_Point.x = (this.m_nMapRect.right);
            this.m_nEnd_Point.y = (this.m_nMapRect.bottom - (this.m_nHeight*this.m_pOutData.limT));
            
            var nRatio;
            nRatio = ((this.m_pOutData.compRatio+9)/10.0);
            
            this.m_nRatio_Point.x = (this.m_nMapRect.right);
            this.m_nRatio_Point.y = (this.m_nMapRect.top + (this.m_nHeight*((eqType.Min_Out_CP_LEVER-this.m_pOutData.compLevel)-(eqType.Min_Out_CP_LEVER-this.m_pOutData.compLevel)/nRatio)));

            svgDrawOut.drawLine(1,this.m_nStart_Dath_Point,this.m_nLevel_Point,this.m_nComp_Lim_Line_Col);
            svgDrawOut.drawLine(4,this.m_nLevel_Point,this.m_nEnd_Dath_Point,this.m_nComp_Lim_Line_Col);


            if(this.m_pOutData.limT < eqType.MaxLimT)
            {
                this.m_nStart_Lim_Point.y = this.m_nLim_Point.y;
                this.m_nEnd_Lim_Point.y = this.m_nLim_Point.y;
                svgDrawOut.drawLine(2,this.m_nStart_Lim_Point,this.m_nEnd_Lim_Point,this.m_nComp_Lim_Line_Col);
            }else{
                svgDrawOut.drawLine(2,new PointClass(0,0),new PointClass(0,0),this.m_nComp_Lim_Line_Col);
            }


            if(this.m_nLim_Point.y<=this.m_nRatio_Point.y)
            {//限幅在压缩比上面   压缩阀值到压缩比由一条直线连接
                svgDrawOut.drawLine(3,this.m_nLevel_Point,this.m_nRatio_Point,this.m_nComp_Lim_Line_Col);
            }
            else
            {//限幅在压缩比下面  压缩阀值到压缩比由一条直线改为一直折线连接
                var  nPoint;
                nPoint = new PointClass(0,0);
                nPoint.y = this.m_nLim_Point.y;
                nPoint.x = (this.m_nMapRect.left+this.m_nWidth*(this.m_pOutData.compLevel+(this.m_pOutData.limT-this.m_pOutData.compLevel)*nRatio));
                svgDrawOut.drawPolyline(this.m_nLevel_Point,nPoint,this.m_nEnd_Point,this.m_nComp_Lim_Line_Col);
            }

            var centerPoint;
            if(this.m_pOutData.compLevel > (eqType.MaxLimT - 100)){
                //限幅电平
                centerPoint = new PointClass(this.m_nLim_Point.x,this.m_nLim_Point.y);
                svgDrawOut.drawPoint(2,centerPoint,6);

                //压缩比
                centerPoint = new PointClass(this.m_nRatio_Point.x,this.m_nRatio_Point.y);
                svgDrawOut.drawPoint(3,centerPoint,6);

                //压缩电平
                centerPoint = new PointClass(this.m_nLevel_Point.x,this.m_nLevel_Point.y);
                svgDrawOut.drawPoint(1,centerPoint,6);
            } else {
                //压缩电平
                centerPoint = new PointClass(this.m_nLevel_Point.x,this.m_nLevel_Point.y);
                svgDrawOut.drawPoint(1,centerPoint,6);

                //限幅电平
                centerPoint = new PointClass(this.m_nLim_Point.x,this.m_nLim_Point.y);
                svgDrawOut.drawPoint(2,centerPoint,6);

                //压缩比
                centerPoint = new PointClass(this.m_nRatio_Point.x,this.m_nRatio_Point.y);
                svgDrawOut.drawPoint(3,centerPoint,6);
            }



        }
    };
    

    
    ComExtMap.prototype.Conver_OutComp_Level = function( Point)             //  转化坐标点  根据坐标点变换值  输出压缩电平
    {
        var nLevel;
        Point.y = Point.y - 520;
        nLevel = Math.floor((this.m_nMapRect.bottom-Point.y)/this.m_nHeight);
        if(nLevel > constConfig.OUTPUT_COMPRESS_THRESHOLD_STEPS_MAX)  //
        {
            nLevel = constConfig.OUTPUT_COMPRESS_THRESHOLD_STEPS_MAX;
        }
        if(nLevel < 0)
        {
            nLevel = 0;
        }
        if(nLevel !== this.m_pOutData.compLevel)
        {
            if(nLevel > this.m_pOutData.limT)
            {
                nLevel = this.m_pOutData.limT;
            }
            //this.m_pOutData.compLevel = nLevel+eqType.Min_Out_CP_LEVER;
            this.m_pOutData.compLevel = nLevel;
            keepLinkOutThresholdCompress(curButtonNo, nLevel);
            var element = document.getElementById("text_threshold_compress_out");
            var value = getOutputThresholdDisplay(nLevel);
            element.innerHTML = value;
            element.value = value;
            element.setAttribute("value", value);
        }
    };
    
    ComExtMap.prototype.Conver_OutComp_Ratio = function( Point)             //  转化坐标点  根据坐标点变换值  输出压缩比率
    {
        Point.y = Point.y - 520;
        var  nHeight = this.m_nLevel_Point.y-this.m_nMapRect.top;
        var nCurHeight = this.m_nLevel_Point.y-Point.y;
        var nRatio;
        if(nCurHeight<=0)
        {
            nCurHeight = 1;
        }
        nRatio = parseInt(nHeight/nCurHeight*10-9);
        nRatio = GetCPEXT_Ratio(nRatio);
        if(nRatio > eqType.Max_CP_Ratio)
        {
            nRatio = eqType.Max_CP_Ratio;
        }
        if(nRatio<1)
        {
            nRatio = 1;
        }
        if(nRatio !== this.m_pOutData.compRatio)
        {
            if(nRatio > 11){
                if((nRatio-11)%5){
                    return;
                }
            }

            this.m_pOutData.compRatio = nRatio;
            keepLinkOutRatioCompress(curButtonNo, nRatio);
            var element = document.getElementById("text_ratio_compress_out");
            var value = getCompressRationDisplay(nRatio);
            element.innerHTML = value;
            element.value = value;
            element.setAttribute("value", value);
        }
    };
    
    ComExtMap.prototype.Conver_OutLimT = function( Point)             //  转化坐标点  根据坐标点变换值  输出限幅电平
    {
        Point.y = Point.y - 520;
        var nLevel;
        nLevel = parseInt((this.m_nMapRect.bottom-Point.y)/this.m_nHeight);
        if(nLevel >eqType.MaxLimT)
        {
            nLevel = eqType.MaxLimT;
        }
        if(nLevel<0)
        {
            nLevel = 0;
        }
        if(nLevel !== this.m_pOutData.limT)
        {
            if(nLevel < this.m_pOutData.compLevel)
            {
                nLevel = this.m_pOutData.compLevel;
            }
            this.m_pOutData.limT = nLevel;
            keepLinkOutThresholdLimit(curButtonNo, nLevel);
            var element = document.getElementById("text_threshold_limit_out");
            var value = getOutputLimiterThresholdDisplay(nLevel);
            element.innerHTML = value;
            element.value = value;
            element.setAttribute("value", value);
        }
    };


}