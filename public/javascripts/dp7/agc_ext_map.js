window.AGC_TopGap = 13;                //  Top           距离静态类的距离
window.AGC_BottomGap = 16;             //  BotttomGap    距离静态类的距离
window.AGC_LeftGap = 20;               //  LeftGap       距离静态类的距离
window.AGC_RightGap = 10;              //  RightGap      距离静态类的距离

window.Height_Range = 1000;             //  高度 范围 -80-- +20  步进为0.1 共 1000
window.Width_Range = 1000;              //  宽度 范围 -80-- +20  步进为0.1 共 1000

window.Middle_Comp_Level = 400;         //  压缩 差值

window.RectPen_Col = '#959595';           //RGB(149,149,149);         //  正方形颜色
window.RectMap_Pen_Col = '#FFFFFF';       //RGB(255,255,255);    //  图形正方形的颜色
window.RectMap_Pen_Width =  1;                //  画图形边线的宽度
window.RectMap_Line1  = '#00B400';        //RGB(0,180,0);
window.RectMap_Line2   = '#156415';       //RGB(21,100,21);

window.AGC_Line_Col_F   =  '#FF0000';      //Color(255,255,0,0);   // 自动增益线的颜色 红色
window.AGC_Comp_Line_Col_F =  '#0000FF';   //Color(255,0,0,255);   // 自动压缩线的颜色 蓝色

window.AGC_Threshold_Rect_Col = '#00FF00'; //Color(255,0,255,0); //  阀值 Rect 绿
window.AGC_Level_Rect_Col  = '#0000FF';    //Color(255,0,0,255);    //  电平 Rect 红
window.AGC_Ratio_Rect_Col  = '#FFFF00';    //Color(255,255,255,0);  //  比例 Rect 黄

window.Comp_Level_Rect_Col = '#00FFFF';    //Color(255,0,255,255);  //  压缩 电平
window.Comp_Ratio_Rect_Col = '#FF00FF';    //Color(255,255,0,255);  //  压缩 比例

window.Rect_Back_Col    = '#000000';       //RGB(0,0,0);              //  Rect 背景颜色
window.Font_Col         = '#969696';       //RGB(150,150,150);     //  字体颜色
window.Line_Width       = 2;                    //线的宽度

window.Line_Dash        = '#c3c3c3';       //Color(255,195,195,195);   //  灰色  点划线

window.CHAEQLineCol= '#00FFFF';       //(255,0,255,255);          //   输入A颜色
window.CHBEQLineCol= '#DF127B';       //(255,223,18,123);         //   输入B颜色
window.CHCEQLineCol= '#027BC0';       //(255,2,123,192);          //   输入C颜色
window.CHDEQLineCol= '#FFFF00';       //(255,255,255,0);          //   输入D颜色

window.InEQLineCol = [CHAEQLineCol,CHBEQLineCol,CHCEQLineCol,CHDEQLineCol];
window.CHAEQ1Col = '#00FFFF';       //=  RGB(0,255,255);
window.CHBEQ2Col = '#DF127B';       //=  RGB(223,18,123);
window.CHCEQ3Col = '#027BC0';       //=	RGB(2,123,192);
window.CHDEQ4Col = '#FFFF00';       //=  RGB(255,255,0);

window.InEQCol = [CHAEQ1Col,CHBEQ2Col,CHCEQ3Col,CHDEQ4Col];


function AgcExtMap() {

    this.m_nClientRect = new RectClass(0,0,0,0);         //  客户 端Rect
	this.m_nMapRect = new RectClass(0,0,0,0);            //  图形 Rect
	this.m_nHeight = curveHeight;
    this.m_nWidth = curveWidth;
	this.m_pInData = new PublicInPut();

	this.m_nAGC_Level = 0;
	this.m_nAGC_Threshold = 0;
	this.m_nAGC_Ratio = 0;
	this.m_nComp_Level = 0;
	this.m_nComp_Ratio = 0;            //       压缩扩展的比例
	this.m_F_Ratio = 0;                                                                       //       扩展比例
	this.m_nStart_Point = new PointClass(0,0);
    this.m_nAGC_End_Point = new PointClass(0,0);
    this.m_nComp_End_Point = new PointClass(0,0);   //    开始点 结束点
    this.m_nAGC_Level_Point = new PointClass(0,0);
    this.m_nAGC_Threshold_Point = new PointClass(0,0);
    this.m_nAGC_Ratio_Point = new PointClass(0,0);   // 自动增益点
	this.m_nComp_Level_Point = new PointClass(0,0);
	this.m_nComp_Ratio_Point = new PointClass(0,0);                        // 压缩点

	this.m_nLock_Start_Point = new PointClass(0,0);
	this.m_nLock_End_Point = new PointClass(0,0);                    //  锁定 开始 结束点

	this.m_nAGC_Threshold_Rect = new RectClass(0,0,0,0);
	this.m_nAGC_Level_Rect = new RectClass(0,0,0,0);
	this.m_nAGC_Ratio_Rect = new RectClass(0,0,0,0);

	this.m_nComp_Level_Rectnew = new RectClass(0,0,0,0);
	this.m_nComp_Ratio_Rectnew  = new RectClass(0,0,0,0);

	this.m_bRectOver = false;                   //   判断光标  是否在 Rect上面

	this.m_bMouseDown = false;

	this.m_bAGC_Threshold_Rect_Over = false;
	this.m_bAGC_Level_Rect_Over = false;
	this.m_bAGC_Ratio_Rect_Over = false;

	this.m_bComp_Ratio_Rect_Over = false;
	this.m_bComp_Level_Rect_Over = false;

	this.m_nLine_Col = COLOR_INPUT_A;                                                  //   线的颜色


    AgcExtMap.prototype.Init = function()
    {
        var tempValue;
        var curveElement = document.getElementById('curve_input');
        if (getCss(curveElement, 'height') !== 'auto') {
            var high = parseInt(getCss(curveElement, 'height')); //getCSS return value: 276px  the value is string
        }
        if (getCss(curveElement, 'width') !==  'auto') {
            var width = parseInt(getCss(curveElement, 'width'));
        }
        this.m_nClientRect.right = width;
        this.m_nClientRect.bottom = high;

        this.m_nMapRect.right = width;
        this.m_nMapRect.bottom = high;
        this.m_nMapRect.top = this.m_nMapRect.top + AGC_TopGap;
        this.m_nMapRect.bottom  = this.m_nMapRect.bottom - AGC_BottomGap;
        this.m_nMapRect.left = this.m_nMapRect.left + AGC_LeftGap;
        this.m_nMapRect.right = this.m_nMapRect.right -AGC_RightGap;
        tempValue = this.m_nMapRect.Height();
        //console.log(tempValue);
        this.m_nHeight = tempValue/(Height_Range);
        tempValue = this.m_nMapRect.Width();
        this.m_nWidth = tempValue/(Width_Range);
    
        this.m_nAGC_End_Point.x=  (this.m_nMapRect.right*1.0);
        this.m_nComp_End_Point.y =  (this.m_nMapRect.left*1.0);
        this.m_nLock_Start_Point.x =  (this.m_nMapRect.left*1.0);
        this.m_nLock_Start_Point.y =  (this.m_nMapRect.bottom*1.0)-Line_Width;
        this.m_nLock_End_Point.x =  (this.m_nMapRect.right*1.0);
        this.m_nLock_End_Point.y =  (this.m_nMapRect.top*1.0);//-Line_Width;

        svgDrawInput.drawGrid();
    };
    
    AgcExtMap.prototype.SetInData = function (nNum)   //  设定输入数据
    { 
       //this.m_pInData = &m_nCurInData[nNum];

       switch (nNum) {
           case 0:
               this.m_pInData = currentGroupData.dataInputA;
               break;
           case 1:
               this.m_pInData = currentGroupData.dataInputB;
               break;
           case 2:
               this.m_pInData = currentGroupData.dataInputC;
               break;
           case 3:
               this.m_pInData = currentGroupData.dataInputD;
               break;
       }


       this.m_nStart_Point.x =  this.m_nMapRect.left;
       this.m_nStart_Point.y =  this.m_nMapRect.bottom-Line_Width;
    
       this.m_nLine_Col = InEQLineCol[nNum];

       this.Draw_AGC_Comp();
    };
    


    AgcExtMap.prototype.Draw_AGC_Comp = function ()                       //点与点之间的直线
    {
        if(this.m_pInData === null)
        {
            return;
        }
    
        var nNum;
        // 自动  增益 点
    
        if(currentLockData.nIn_LockData.nIn_Comp_AG)              //   currentLockData.nIn_Comp_Extend
        {//输入压缩 锁定
            svgDrawInput.drawLine(5,this.m_nLock_Start_Point,this.m_nLock_End_Point,"red");
        }
        else
        {
            //自动增益 阀值 圆点坐标
            this.m_nAGC_Threshold_Point.x =  (this.m_nMapRect.left+this.m_nWidth*(this.m_pInData.agThreshold));  //增益阀值圆点 X坐标
            this.m_nAGC_Threshold_Point.y =  (this.m_nMapRect.bottom - (this.m_nHeight*(this.m_pInData.agThreshold)))-1; //增益阀值圆点 Y坐标
            
            //自动增益 目标电平 圆点坐标
            this.m_nAGC_Level_Point.x =  (this.m_nMapRect.left+this.m_nWidth*(this.m_pInData.agLevel)); //目标电平圆点 X坐标
            this.m_nAGC_Level_Point.y =  (this.m_nMapRect.bottom - (this.m_nHeight*(this.m_pInData.agLevel)))-1;
            
            //压缩比率 
            this.m_F_Ratio = ((this.m_pInData.agRatio+9)/10.0); //比率
            
            //增益丝率 X坐标（Y坐标与阀值的Y坐标一致）
            this.m_nAGC_Ratio_Point.x =  (this.m_nMapRect.left+this.m_pInData.agThreshold*this.m_nWidth);

            nNum = (((this.m_pInData.agLevel-this.m_pInData.agThreshold)/this.m_F_Ratio));
            nNum = (this.m_nHeight*((this.m_pInData.agLevel-this.m_pInData.agThreshold)-nNum));
            this.m_nAGC_Ratio_Point.y =  (this.m_nMapRect.bottom -this.m_pInData.agThreshold*this.m_nHeight - nNum)-1;
            
            // 压缩  电平 点
            this.m_nComp_Level_Point.x =  (this.m_nMapRect.left+this.m_nWidth*(this.m_pInData.compLevel+Middle_Comp_Level));
            this.m_nComp_Level_Point.y =  Math.floor(this.m_nMapRect.bottom - (this.m_nHeight*(this.m_pInData.compLevel+Middle_Comp_Level))) - 1;
            
            //压缩比率X坐标
            this.m_F_Ratio = ((this.m_pInData.compRatio+9)/10);
            this.m_nComp_Ratio_Point.x =  (this.m_nMapRect.right);

            nNum = this.m_nHeight*(((eqType.Max_Out_CP_Level-this.m_pInData.compLevel-Middle_Comp_Level)-(eqType.Max_Out_CP_Level-this.m_pInData.compLevel-Middle_Comp_Level)/this.m_F_Ratio));
            this.m_nComp_Ratio_Point.y =  (this.m_nMapRect.top + nNum) - 1;
        
            //绘制圆点与圆点间的连线
            svgDrawInput.drawLine(1,this.m_nStart_Point,this.m_nAGC_Threshold_Point,this.m_nLine_Col);
            svgDrawInput.drawLine(2,this.m_nAGC_Threshold_Point,this.m_nAGC_Ratio_Point,this.m_nLine_Col);
            svgDrawInput.drawLine(3,this.m_nAGC_Ratio_Point,this.m_nAGC_Level_Point,this.m_nLine_Col);
            svgDrawInput.drawLine(4,this.m_nAGC_Level_Point,this.m_nComp_Level_Point,this.m_nLine_Col);
            svgDrawInput.drawLine(5,this.m_nComp_Level_Point,this.m_nComp_Ratio_Point,this.m_nLine_Col);


            //压缩 比率 圆点;
            var centerPoint = new PointClass(this.m_nComp_Ratio_Point.x,this.m_nComp_Ratio_Point.y);
            svgDrawInput.drawPoint(5,centerPoint,6);
            //console.log("comp_ratio: " + this.m_nComp_Ratio_Point.x + ","+this.m_nComp_Ratio_Point.x);

            if(this.m_pInData.agLevel > (eqType.Max_In_EXT_Level-200)){

                if(this.m_pInData.agThreshold > (eqType.Max_In_EXT_Threshold - 200)) {
                    //压缩电平 圆点;
                    centerPoint = new PointClass(this.m_nComp_Level_Point.x,this.m_nComp_Level_Point.y);
                    svgDrawInput.drawPoint(3,centerPoint,6);

                    //自动增益 目标电平 圆点
                    centerPoint = new PointClass(this.m_nAGC_Level_Point.x,this.m_nAGC_Level_Point.y);
                    svgDrawInput.drawPoint(2,centerPoint,6);

                    //自动增益 比率 圆点;
                    centerPoint = new PointClass(this.m_nAGC_Ratio_Point.x,this.m_nAGC_Ratio_Point.y);
                    svgDrawInput.drawPoint(4,centerPoint,6);

                    //自动增益 阀值 圆点;
                    centerPoint = new PointClass(this.m_nAGC_Threshold_Point.x,this.m_nAGC_Threshold_Point.y);
                    svgDrawInput.drawPoint(1,centerPoint,6);
                }
                else {
                    //压缩电平 圆点;
                    centerPoint = new PointClass(this.m_nComp_Level_Point.x,this.m_nComp_Level_Point.y);
                    svgDrawInput.drawPoint(3,centerPoint,6);

                    //自动增益 目标电平 圆点
                    centerPoint = new PointClass(this.m_nAGC_Level_Point.x,this.m_nAGC_Level_Point.y);
                    svgDrawInput.drawPoint(2,centerPoint,6);

                    //自动增益 阀值 圆点;
                    centerPoint = new PointClass(this.m_nAGC_Threshold_Point.x,this.m_nAGC_Threshold_Point.y);
                    svgDrawInput.drawPoint(1,centerPoint,6);

                    //自动增益 比率 圆点;
                    centerPoint = new PointClass(this.m_nAGC_Ratio_Point.x,this.m_nAGC_Ratio_Point.y);
                    svgDrawInput.drawPoint(4,centerPoint,6);
                }

            } else {
                //自动增益 阀值 圆点;
                centerPoint = new PointClass(this.m_nAGC_Threshold_Point.x,this.m_nAGC_Threshold_Point.y);
                svgDrawInput.drawPoint(1,centerPoint,6);

                //自动增益 比率 圆点;
                centerPoint = new PointClass(this.m_nAGC_Ratio_Point.x,this.m_nAGC_Ratio_Point.y);
                svgDrawInput.drawPoint(4,centerPoint,6);

                //自动增益 目标电平 圆点
                centerPoint = new PointClass(this.m_nAGC_Level_Point.x,this.m_nAGC_Level_Point.y);
                svgDrawInput.drawPoint(2,centerPoint,6);

                //压缩电平 圆点;
                centerPoint = new PointClass(this.m_nComp_Level_Point.x,this.m_nComp_Level_Point.y);
                svgDrawInput.drawPoint(3,centerPoint,6);
            }

        }
    };
    

    AgcExtMap.prototype.MouseMove_AGC_Comp = function ( nPoint) //鼠标移动响应
    {
        if(this.m_bMouseDown)
        {//鼠标按下并移动
            if(this.m_bComp_Level_Rect_Over)
            {
                this.Conver_Comp_Level(nPoint); //移动 压缩电平圆点
                return;
            }
            if(this.m_bComp_Ratio_Rect_Over)
            {
                this.Conver_Comp_Ratio(nPoint);	//移动 压缩比率圆点
                return;
            }
            if(this.m_bAGC_Threshold_Rect_Over)
            {
                this.Conver_AGC_Threshold(nPoint);	//移动 自动 增益 阀值圆点	
                return;
            }
            if(this.m_bAGC_Ratio_Rect_Over)	
            {
                this.Conver_AGC_Ratio(nPoint); //移动 自动增益 比率 圆点
                return;
            }
            if(this.m_bAGC_Level_Rect_Over)
            {
                this.Conver_AGC_Level(nPoint);	//移动 自动增益 目标电平 圆点
                return;
            }
        }
        else
        {
            if(this.m_pInData.agThreshold === eqType.Max_In_EXT_Threshold)
            {//自动增益 阀值 等于 电大值
                if(this.m_nAGC_Threshold_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = true;
                    this.m_bAGC_Level_Rect_Over = false;
                    this.m_bAGC_Ratio_Rect_Over = false;
                    
                    this.m_bComp_Ratio_Rect_Over = false;
                    this.m_bComp_Level_Rect_Over = false;
                    this.m_bRectOver = true;
                    return;
                }
    
                if(this.m_nAGC_Level_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = false;
                    this.m_bAGC_Level_Rect_Over = true;
                    this.m_bAGC_Ratio_Rect_Over = false;
                    
                    this.m_bComp_Ratio_Rect_Over = false;
                    this.m_bComp_Level_Rect_Over = false;
                    this.m_bRectOver = true;
                    return;
                }
                
                if(this.m_nComp_Level_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = false;
                    this.m_bAGC_Level_Rect_Over = false;
                    this.m_bAGC_Ratio_Rect_Over = false;
                    
                    this.m_bComp_Ratio_Rect_Over = false;
                    this.m_bComp_Level_Rect_Over = true;
                    this.m_bRectOver = true;
                    return;
                }
                if(this.m_nComp_Ratio_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = false;
                    this.m_bAGC_Level_Rect_Over = false;
                    this.m_bAGC_Ratio_Rect_Over = false;
                    
                    this.m_bComp_Ratio_Rect_Over = true;
                    this.m_bComp_Level_Rect_Over = false;
                    this.m_bRectOver = true;
                    return;
                }
                
                if(this.m_nAGC_Ratio_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = false;
                    this.m_bAGC_Level_Rect_Over = false;
                    this.m_bAGC_Ratio_Rect_Over = true;
                    
                    this.m_bComp_Ratio_Rect_Over = false;
                    this.m_bComp_Level_Rect_Over = false;
                    this.m_bRectOver = true;
                    return;
                }
            }
            if(this.m_pInData.agLevel === eqType.Max_In_EXT_Level)
            {//自动增益 目标电平 等于 电大值
                if(this.m_nAGC_Level_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = false;
                    this.m_bAGC_Level_Rect_Over = true;
                    this.m_bAGC_Ratio_Rect_Over = false;
                    
                    this.m_bComp_Ratio_Rect_Over = false;
                    this.m_bComp_Level_Rect_Over = false;
                    this.m_bRectOver = true;
                    return;
                }
    
                if(this.m_nComp_Level_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = false;
                    this.m_bAGC_Level_Rect_Over = false;
                    this.m_bAGC_Ratio_Rect_Over = false;
                    
                    this.m_bComp_Ratio_Rect_Over = false;
                    this.m_bComp_Level_Rect_Over = true;
                    this.m_bRectOver = true;
                    return;
                }
                if(this.m_nComp_Ratio_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = false;
                    this.m_bAGC_Level_Rect_Over = false;
                    this.m_bAGC_Ratio_Rect_Over = false;
                    
                    this.m_bComp_Ratio_Rect_Over = true;
                    this.m_bComp_Level_Rect_Over = false;
                    this.m_bRectOver = true;
                    return;
                }
                
                if(this.m_nAGC_Ratio_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = false;
                    this.m_bAGC_Level_Rect_Over = false;
                    this.m_bAGC_Ratio_Rect_Over = true;
                    
                    this.m_bComp_Ratio_Rect_Over = false;
                    this.m_bComp_Level_Rect_Over = false;
                    this.m_bRectOver = true;
                    return;
                }
                
                if(this.m_nAGC_Threshold_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = true;
                    this.m_bAGC_Level_Rect_Over = false;
                    this.m_bAGC_Ratio_Rect_Over = false;
                    
                    this.m_bComp_Ratio_Rect_Over = false;
                    this.m_bComp_Level_Rect_Over = false;
                    this.m_bRectOver = true;
                    return;
                }
            }
            else
            {
                if(this.m_nComp_Level_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = false;
                    this.m_bAGC_Level_Rect_Over = false;
                    this.m_bAGC_Ratio_Rect_Over = false;
                    
                    this.m_bComp_Ratio_Rect_Over = false;
                    this.m_bComp_Level_Rect_Over = true;
                    this.m_bRectOver = true;
                    return;
                }
                if(this.m_nComp_Ratio_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = false;
                    this.m_bAGC_Level_Rect_Over = false;
                    this.m_bAGC_Ratio_Rect_Over = false;
                    
                    this.m_bComp_Ratio_Rect_Over = true;
                    this.m_bComp_Level_Rect_Over = false;
                    this.m_bRectOver = true;
                    return;
                }
                
                if(this.m_nAGC_Level_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = false;
                    this.m_bAGC_Level_Rect_Over = true;
                    this.m_bAGC_Ratio_Rect_Over = false;
                    
                    this.m_bComp_Ratio_Rect_Over = false;
                    this.m_bComp_Level_Rect_Over = false;
                    this.m_bRectOver = true;
                    return;
                }
                
                if(this.m_nAGC_Ratio_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = false;
                    this.m_bAGC_Level_Rect_Over = false;
                    this.m_bAGC_Ratio_Rect_Over = true;
                    
                    this.m_bComp_Ratio_Rect_Over = false;
                    this.m_bComp_Level_Rect_Over = false;
                    this.m_bRectOver = true;
                    return;
                }
                
                if(this.m_nAGC_Threshold_Rect.Contains(nPoint.x,nPoint.y))
                {
                    this.m_bAGC_Threshold_Rect_Over = true;
                    this.m_bAGC_Level_Rect_Over = false;
                    this.m_bAGC_Ratio_Rect_Over = false;
                    
                    this.m_bComp_Ratio_Rect_Over = false;
                    this.m_bComp_Level_Rect_Over = false;
                    this.m_bRectOver = true;
                    return;
                }
            }		
            this.m_bAGC_Threshold_Rect_Over = false;
            this.m_bAGC_Level_Rect_Over = false;
            this.m_bAGC_Ratio_Rect_Over = false;
            
            this.m_bComp_Ratio_Rect_Over = false;
            this.m_bComp_Level_Rect_Over = false;
            this.m_bRectOver = false;
        }
    };
    
    AgcExtMap.prototype.Conver_AGC_Threshold = function( Point)          //由坐标得到自动增益阀值 并更新显示点的位置
    {
        Point.y = Point.y - 520;
        this.m_nAGC_Threshold = parseInt( (this.m_nMapRect.bottom-Point.y)/this.m_nHeight);
        if(this.m_nAGC_Threshold > eqType.Max_In_EXT_Threshold)
        {//大于 最大值
            this.m_nAGC_Threshold = eqType.Max_In_EXT_Threshold;
        }
        if(this.m_nAGC_Threshold<eqType.Min_In_EXT_Threshold)
        {//小于 最小值
            this.m_nAGC_Threshold = eqType.Min_In_EXT_Threshold;
        }
    
        if(this.m_nAGC_Threshold > this.m_pInData.agLevel)
        {// 阀值 大于 目标电平 
            this.m_nAGC_Threshold = this.m_pInData.agLevel;
        }
    
        if(this.m_nAGC_Threshold !== this.m_pInData.agThreshold)
        {//直线图的 阀值  与输入对象的阀值不一致
            this.m_pInData.agThreshold = this.m_nAGC_Threshold;
            // ((CAGC_Comp_Dlg *)m_pAGC_Comp_Dlg).UpDataLink_InAG_Threshold(); //更新联调值
            // if(m_pAGC_Threshould)
            // {
            //     this.m_pAGC_Threshould.SetPos(m_nAGC_Threshold); //更改编辑框显示的值
            //      //更新直线图的显示
            // }
            keepLinkInputThreshold(curButtonNo, this.m_nAGC_Threshold);
            var element = document.getElementById("text_threshold");
            var value = getInputThresholdDisplay(this.m_nAGC_Threshold);
            element.innerHTML = value;
            element.value = value;
            element.setAttribute("value", value);
        }
    };
    
    AgcExtMap.prototype.Conver_AGC_Level = function ( Point)          //  由坐标点获得扩展的目标电平 并更新显示点的位置
    {
        Point.y = Point.y - 520;
        this.m_nAGC_Level = parseInt( (this.m_nMapRect.bottom-Point.y)/this.m_nHeight);
        //console.log("this.m_nMapRect.bottom:" + this.m_nMapRect.bottom + "  this.m_nHeight:" +this.m_nHeight );
        if(this.m_nAGC_Level > eqType.Max_In_EXT_Level) //Max_In_EXT_Level = 1000
        {
            this.m_nAGC_Level = eqType.Max_In_EXT_Level;
        }
        if(this.m_nAGC_Level<0)
        {
            this.m_nAGC_Level = 0;
        }
    
        if(this.m_nAGC_Level < this.m_pInData.agThreshold)
        {
            this.m_nAGC_Level = this.m_pInData.agThreshold;
        }
        
        if(this.m_nAGC_Level > this.m_pInData.compLevel+Middle_Comp_Level)
        {
            this.m_nAGC_Level = this.m_pInData.compLevel+Middle_Comp_Level;
        }

        //console.log("this.m_nAGC_Level:" + this.m_nAGC_Level + "   this.m_pInData.agLevel:"　+ this.m_pInData.agLevel );
        if(this.m_nAGC_Level !== this.m_pInData.agLevel)
        {
            // this.m_pInData.agLevel = this.m_nAGC_Level;
            // ((CAGC_Comp_Dlg *)m_pAGC_Comp_Dlg).UpDataLink_InAG_Level();//更新联调值
            // if(m_pAGC_Level)
            // {
            //     this.m_pAGC_Level.SetPos(this.m_nAGC_Level); //更改编辑框显示的值
            //     //更新直线图的显示
            // }
            this.m_pInData.agLevel = this.m_nAGC_Level;
            keepLinkInputLevel(curButtonNo, this.m_nAGC_Level);
            var element = document.getElementById("text_target_level");
            var value = getInputThresholdDisplay(this.m_nAGC_Level);
            element.innerHTML = value;
            element.value = value;
            element.setAttribute("value", value);
        }
    };
    
    AgcExtMap.prototype.Conver_AGC_Ratio = function( Point)               // 由坐标得到扩展比率显示值 并更新显示点的位置
    {
        Point.y = Point.y - 520;
        var  nHeight = this.m_nAGC_Threshold_Point.y - this.m_nAGC_Level_Point.y;
        var nCurHeight = Point.y - this.m_nAGC_Level_Point.y;
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
        if(nRatio !== this.m_pInData.agRatio)
        {
            if(nRatio > 11){
                if((nRatio-11)%5){
                    return;
                }
            }

            this.m_pInData.agRatio = nRatio;
            keepLinkInputExtendRatio(curButtonNo, nRatio);
            // ((CAGC_Comp_Dlg *)m_pAGC_Comp_Dlg).UpDataLink_InAG_Ratio();//更新联调值
            // if(m_pAGC_Ratio)
            // {
            //     this.m_pAGC_Ratio.SetPos(GetCPEXT_Index(nRatio)); //更改编辑框显示的值
            //     //更新直线图的显示
            // }
            var element = document.getElementById("text_extension_ratio");
            var ratio = getExtensionRationDisplay(nRatio);
            element.innerHTML = ratio;
            element.value = ratio;
            element.setAttribute("value", ratio);
        }
    };
    
    AgcExtMap.prototype.Conver_Comp_Level = function( Point)    //  由坐标点得到压缩 Level  并更新显示点的位置
    {
        Point.y = Point.y - 520;
        this.m_nComp_Level = parseInt(((this.m_nMapRect.bottom-Point.y-Middle_Comp_Level*this.m_nHeight)/this.m_nHeight));
        //console.log('m_nComp_level:' +　this.m_nComp_Level);
        if(this.m_nComp_Level > 600)
        {
            this.m_nComp_Level = 600;
        }
        if(this.m_nComp_Level< 0)
        {
            this.m_nComp_Level = 0;
        }
        if((this.m_nComp_Level + Middle_Comp_Level) < this.m_pInData.agLevel)
        {
            this.m_nComp_Level = this.m_pInData.agLevel-Middle_Comp_Level;
        }
    
        if(this.m_nComp_Level !== this.m_pInData.compLevel)
        {
            this.m_pInData.compLevel = this.m_nComp_Level;
            keepLinkInputCompressLevel(curButtonNo, this.m_nComp_Level);
            // ((CAGC_Comp_Dlg *)m_pAGC_Comp_Dlg).UpDataLink_InCP_Level();//更新联调值
            // if(m_pComp_Level)
            // {
            //     this.m_pComp_Level.SetPos(this.m_nComp_Level); //更改编辑框显示的值
            //     //更新直线图的显示
            // }
            var element = document.getElementById("text_compressor");
            var value = getInputCompressThresholdDisplay(this.m_nComp_Level);
            //element.innerHTML = value;
            //console.log('m_nComp_Level: ' + this.m_nComp_Level + '      text_compressor_value:' + value);
            element.value = value;
            element.setAttribute("value", value);
        } 
    };
    
    AgcExtMap.prototype.Conver_Comp_Ratio = function( Point)             //由坐标点得到压缩Ratio显示值 并更新显示点的位置
    {
        Point.y = Point.y - 520;
        var  nHeight = this.m_nComp_Level_Point.y-this.m_nMapRect.top;
        var nCurHeight = this.m_nComp_Level_Point.y- Point.y;
        var nRatio;
        if(nCurHeight<=0)
        {
            nCurHeight = 1;
        }
        nRatio = parseInt((nHeight/nCurHeight)*10-9);
        nRatio = GetCPEXT_Ratio(nRatio);
        if(nRatio > eqType.Max_CP_Ratio)
        {
            nRatio = eqType.Max_CP_Ratio;
        }
        if(nRatio<1)
        {
            nRatio = 1;
        }
        if(nRatio !== this.m_pInData.compRatio)
        {

            if(nRatio > 11){
                if((nRatio-11)%5){
                    return;
                }
            }
            this.m_pInData.compRatio = nRatio;
            keepLinkInputCompressRatio(curButtonNo, nRatio);
            // ((CAGC_Comp_Dlg *)m_pAGC_Comp_Dlg).UpDataLink_InCP_Ratio();//更新联调值
            // if(m_pComp_Ratio)
            // {
            //     this.m_pComp_Ratio.SetPos(GetCPEXT_Index(nRatio)); //更改编辑框显示的值
            //     //更新直线图的显示
            // }
            var element = document.getElementById("text_comp_ratio");
            var ratio = getCompressRationDisplay(nRatio);
            element.innerHTML = ratio;
            element.value = ratio;
            element.setAttribute("value", ratio);
        }
    };

}


function GetCPEXT_Ratio(nIndex)                     //  得到压缩 扩展的显示值
{
	var val;
	var i,j;
	val = nIndex;
    if(nIndex >11)
	{
		i = (nIndex-1)%10;
		if(i!==0)
		{
			if(i!==5)
			{
				j = nIndex/10;
				val = j*10+6;
			}
		}

	}
	if(val > eqType.Max_CP_Ratio)
	{
		val = eqType.Max_CP_Ratio;
	}
	return val;
}