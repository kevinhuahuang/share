

window.RECTCOL = '#000000';     //RGB(0,0,0)
window.FONTCOL = '#646464';     //    RGB(100,100,100)  //dB Freq 的字体颜色
window.LINECOL = '#646464';     //    RGB(100,100,100)  //外框的边线颜色


window.RowNum   =   8;
window.D_RowNum =   8.0;
window.PenColor1  = '#156415';     // RGB(21,100,21)
window.PenColor2  = '#156415';     // RGB(21,100,21)

window.PENWIDTH  =  2;
window.PENCURWHIDTH = 4;
window.CURVE_LINE_WIDTH = '2';

var svgDrawCurve;

var m_nInMapEQ = [];
var m_nOutMapEQ = [];
var m_nCurIn_EQLine = [0,0,0,0];     //当前选择的输入通道，0：末选中  1：选中  用于判断是否绘制此曲线
var m_nLinkIn_EQLine  = [0,0,0,0];   //输入通道曲线按钮状态，0：末选中  1：选中  保持曲线状态并用于判断是否绘制此曲线
m_nCurIn_APFLine = [0,0,0,0];
var m_nCurOut_EQLine = [0,0,0,0,0,0,0,0];
var m_nLinkOut_EQLine = [0,0,0,0,0,0,0,0];
m_nCurOut_APFLine = [0,0,0,0,0,0,0,0];

var m_pEQ;                   //当前选择的EQ
var m_pFilter;

var m_nRect = new RectClass(0,0,0,0);            //静态控件的RECT
var m_nMapRect = new RectClass(0,0,0,0);         //图形RECT
var m_bFreqOver = false;      //判断光标
var m_bBW_Over = false;       //宽度光标
var m_bDataMod = false;       //数据修改标志
var m_bSendFlag = false;      //数据发送标志
var m_nSelF  = 0;              //选择的滤波器号
var m_nSelConF = 0;           //控件选择的滤波器号
var m_nMapType = 0;           //用于判断是:InEQ,OutEQ,HL,PHL图
var m_bInOut;             //用于判断是效果,麦克风,音乐,输出数据
var m_nWPen;              //画笔的宽度
var m_nCurWPen;           //当前画笔的宽度
var m_nTypeRoute;         //EQ 发送消息时 第二个参数代表:类型 通道  高8个字节代表类型 低八个字节代表通道
var m_nOutRouteID;        //输出端口
var m_nInRouteID;         //输入端口ID

var m_Str_Temp;
var m_Str_Text;


var verLinePoint = new Array(29);



function initializeCurve() {
    var i;

	svgDrawCurve = new DrawWithSVG();
	svgDrawCurve.initCurveSvg();

    for(i=0; i<4; i++) {
    	m_nInMapEQ[i] = new CurveEQ();
    	m_nInMapEQ[i].Init();
    }
    m_nInMapEQ[0].InitInEQ(0, currentGroupData.dataInputA);
    m_nInMapEQ[1].InitInEQ(1, currentGroupData.dataInputB);
    m_nInMapEQ[2].InitInEQ(2, currentGroupData.dataInputC);
    m_nInMapEQ[3].InitInEQ(3, currentGroupData.dataInputD);



    for(i=0; i<8; i++) {
		m_nOutMapEQ[i] = new CurveEQ();
		m_nOutMapEQ[i].Init();
    }
	m_nOutMapEQ[0].InitOutEQ(0,currentGroupData.dataOut1);
    m_nOutMapEQ[1].InitOutEQ(1,currentGroupData.dataOut2);
    m_nOutMapEQ[2].InitOutEQ(2,currentGroupData.dataOut3);
    m_nOutMapEQ[3].InitOutEQ(3,currentGroupData.dataOut4);
    m_nOutMapEQ[4].InitOutEQ(4,currentGroupData.dataOut5);
    m_nOutMapEQ[5].InitOutEQ(5,currentGroupData.dataOut6);
    m_nOutMapEQ[6].InitOutEQ(6,currentGroupData.dataOut7);
    m_nOutMapEQ[7].InitOutEQ(7,currentGroupData.dataOut8);

    initPolar();
}

function initPolar(){
    m_nInMapEQ[0].polar = currentGroupData.dataInputA.polar;
    m_nInMapEQ[1].polar = currentGroupData.dataInputB.polar;
    m_nInMapEQ[2].polar = currentGroupData.dataInputC.polar;
    m_nInMapEQ[3].polar = currentGroupData.dataInputD.polar;

    m_nOutMapEQ[0].polar = currentGroupData.dataOut1.polar;
    m_nOutMapEQ[1].polar = currentGroupData.dataOut2.polar;
    m_nOutMapEQ[2].polar = currentGroupData.dataOut3.polar;
    m_nOutMapEQ[3].polar = currentGroupData.dataOut4.polar;
    m_nOutMapEQ[4].polar = currentGroupData.dataOut5.polar;
    m_nOutMapEQ[5].polar = currentGroupData.dataOut6.polar;
    m_nOutMapEQ[6].polar = currentGroupData.dataOut7.polar;
    m_nOutMapEQ[7].polar = currentGroupData.dataOut8.polar;


    controlsData.buttonStates.buttonPhaseDirectionStatus[0] = m_nInMapEQ[0].polar;
    controlsData.buttonStates.buttonPhaseDirectionStatus[1] = m_nInMapEQ[1].polar;
    controlsData.buttonStates.buttonPhaseDirectionStatus[2] = m_nInMapEQ[2].polar;
    controlsData.buttonStates.buttonPhaseDirectionStatus[3] = m_nInMapEQ[3].polar;

    controlsData.buttonStates.buttonPhaseDirectionStatus[4] = m_nOutMapEQ[0].polar;
    controlsData.buttonStates.buttonPhaseDirectionStatus[5] = m_nOutMapEQ[1].polar;
    controlsData.buttonStates.buttonPhaseDirectionStatus[6] = m_nOutMapEQ[2].polar;
    controlsData.buttonStates.buttonPhaseDirectionStatus[7] = m_nOutMapEQ[3].polar;
    controlsData.buttonStates.buttonPhaseDirectionStatus[8] = m_nOutMapEQ[4].polar;
    controlsData.buttonStates.buttonPhaseDirectionStatus[9] = m_nOutMapEQ[5].polar;
    controlsData.buttonStates.buttonPhaseDirectionStatus[10] = m_nOutMapEQ[6].polar;
    controlsData.buttonStates.buttonPhaseDirectionStatus[11] = m_nOutMapEQ[7].polar;

    // console.log(m_nInMapEQ[0].polar);
}

function DrawLine()
{
	var index;
	if(curButtonNo>4){
		index = curButtonNo - 5;
		DrawOutLine(index);
	} else {
		index = curButtonNo - 1;
		DrawInLine(index);
	}
}


function drawLinkLine(no){
    var index;
    if(no>4){
        index = no - 5;
        DrawOutLineF(index);
    } else {
        index = no - 1;
        DrawInLineF(index);
    }
}

function DrawDefaultLine()
{
	var i;
	for(i=0;i<4;i++)
	{// 输入曲线
		if(m_nCurIn_EQLine[i]) //是否绘制此输入曲线
		{
			m_nInMapEQ[i].Conver_In_EQPoint(); 
			DrawInLineF(i); //绘制输入曲线
		}
	}

	for( i=0;i<8;i++)
	{//输出曲线
		if(m_nCurOut_EQLine[i])//是否绘制此输出曲线
		{
			m_nOutMapEQ[i].Conver_Out_PHLPoint();
			DrawOutLineF(i);//绘制输出曲线
		}
	}
}


function renewAllLinePoints() {
	//输入曲线
	var nSel,i;
	for(nSel=0; nSel < 4; nSel++){
        for( i=0; i<6;i++){
            m_nInMapEQ[nSel].filterArray[i].UpDataPoint(false);
        }
        m_nInMapEQ[nSel].Conver_In_EQPoint(); //6个Filter的240个point 组合成为一条曲线
        svgDrawCurve.drawCurveLine(nSel+1, m_nInMapEQ[nSel].m_nPointF); //绘制曲线
	}

	for(nSel=0; nSel<8; nSel++){
        for(i=0; i<11;i++){
            if(i===6 || i===7 || i===8){
                continue;
            }
            // console.log('main_filter_i:' + i + '    type:' + m_nOutMapEQ[nSel].filterArray[i].m_nFilterType);
            // console.log('main_filter_i:' + i + '    freq:' + m_nOutMapEQ[nSel].filterArray[i].m_pEQ.freq);
            m_nOutMapEQ[nSel].filterArray[i].UpDataPoint(false);
        }
        m_nOutMapEQ[nSel].Conver_Out_PHLPoint(); //6个Filter　＋　高调　＋　低调　的240个point 组合成为一条曲线
        svgDrawCurve.drawCurveLine(nSel+5,m_nOutMapEQ[nSel].m_nPointF); //绘制曲线
	}

	//输出曲线
}

function DrawInLine(nSel) //绘制输入曲线
{
    DrawInLineF(nSel); //绘制当前曲线
    DrawInLineText();
}


function DrawInLineText() {
    var InSize = 6;
    var str;

    for(var i=(InSize-1);i>=0;i--)
    {
        var Filter =  m_nInMapEQ[curButtonNo-1].filterArray[i];
        var nFilterType = Filter.GetFilterType();

        var pointDataText = new PointClass(m_nInMapEQ[curButtonNo-1].filterArray[i].m_nShowRect.left + 28,m_nInMapEQ[curButtonNo-1].filterArray[i].m_nShowRect.top);
        str = m_nInMapEQ[curButtonNo-1].filterArray[i].GetShowData();
        var point = m_nInMapEQ[curButtonNo-1].filterArray[i].FDToRect(); //通道名坐标
        if(nFilterType === eqType.AllPass_Shelf1) { //1阶全通 字体为红色
            svgDrawCurve.drawDataText(pointDataText,i+1,str,"#ff0000",true);
            svgDrawCurve.drawChannelText(point, i+1,"#ff0000");
        } else if (nFilterType === eqType.AllPass_Shelf2) {//二阶全通 字体为红色
            svgDrawCurve.drawDataText(pointDataText,i+1,str,"#ff0000",false);
            svgDrawCurve.drawChannelText(point, i+1,"#ff0000");
        } else {//非全通 字体为白色
            svgDrawCurve.drawDataText(pointDataText,i+1,str,"#ffffff",false);
            svgDrawCurve.drawChannelText(point, i+1,'#ffffff');
        }

        pointOfLeft = new PointClass(m_nInMapEQ[curButtonNo-1].filterArray[i].m_nLRect.left,m_nInMapEQ[curButtonNo-1].filterArray[i].m_nLRect.top);
        svgDrawCurve.drawLeftRect(pointOfLeft,i+1);

        var pointOfRight =  new PointClass(m_nInMapEQ[curButtonNo-1].filterArray[i].m_nRRect.left,m_nInMapEQ[curButtonNo-1].filterArray[i].m_nRRect.top);
        svgDrawCurve.drawRightRect(pointOfRight,i+1);
    }
}


function DrawOtherInLockLine() {
	for(var i=0; i<4 ;i++){
		if(m_nLinkIn_EQLine[i] || m_nCurIn_EQLine[i]){
            m_nInMapEQ[i].Conver_In_EQPoint();
            svgDrawCurve.drawCurveLine(i + 1,m_nInMapEQ[i].m_nPointF); //绘制曲线
		}
    }
}


var pointsInArray = [];
function DrawFollowInLine() {
    svgDrawCurve.drawCurveLine(linkIndex+1, pointsInArray.shift());
    svgDrawCurve.drawCurveLine(curButtonNo,m_nInMapEQ[curButtonNo-1].m_nPointF);
    DrawInLineText();
}

function DrawInLineF(nSel)    //画输入浮点曲线
{
	if(nSel >= 0)
	{//绘制其它需要显示的曲线
        //绘制联调的其它输出曲线
        var linkArray = getLinkInputArray(nSel+1);
        var followLineMark = false;
        if(linkArray.length > 0){
            for(var t=linkArray.length-1;t>=0;t--){
                for( i=0; i<6;i++){
                    // console.log('link_out: ' + linkArray[t]);
                    // console.log('link_filter_i:' + i + '    type:' + m_nInMapEQ[linkArray[t]].filterArray[i].m_nFilterType);
                    // console.log('link_filter_i:' + i + '    freq:' + m_nInMapEQ[linkArray[t]].filterArray[i].m_pEQ.freq);
                    m_nInMapEQ[linkArray[t]].filterArray[i].UpDataPoint(false);
                }

                if((!followLineMark) && (m_nLinkIn_EQLine[linkArray[t]]) && (!ignoreFollowLine)){
                    followLineMark = true;
                    ignoreFollowLine = false;
                    linkIndex = linkArray[t];
                    m_nInMapEQ[linkIndex].Conver_In_EQPoint(); //6个Filter　＋　高调　＋　低调　的240个point 组合成为一条曲线
                    pointsInArray.push(m_nInMapEQ[linkIndex].m_nPointF.slice(0));
                    setTimeout("DrawFollowInLine()", 700);
                    console.log('输入联调的跟随曲线：' + linkArray[t]);
                } else {
                    ignoreFollowLine = false;
                    m_nInMapEQ[linkArray[t]].Conver_In_EQPoint(); //6个Filter　＋　高调　＋　低调　的240个point 组合成为一条曲线
                    svgDrawCurve.drawCurveLine(linkArray[t] + 1,m_nInMapEQ[linkArray[t]].m_nPointF); //绘制曲线
                    console.log('输入联调的非跟随曲线：' + linkArray[t]);
                }

                //setTimeout("svgDrawCurve.drawCurveLine(linkArray[t] + 5,m_nInMapEQ[linkArray[t]].m_nPointF)", 1000);
                //svgDrawCurve.drawCurveLine(linkArray[t] + 5,m_nInMapEQ[linkArray[t]].m_nPointF); //绘制曲线
                // console.log('绘制输出联调的曲线：' + linkArray[t]);
            }
        }


		for(var i=0; i<6;i++){
			m_nInMapEQ[nSel].filterArray[i].UpDataPoint(false);
		}
		m_nInMapEQ[nSel].Conver_In_EQPoint(); //6个Filter的240个point 组合成为一条曲线

		svgDrawCurve.drawCurveLine(curButtonNo, m_nInMapEQ[nSel].m_nPointF); //绘制曲线
		// console.log('绘制曲线');
		if(controlsData.buttonStates.buttonPhaseCurveStatus[curButtonNo-1]){
            svgDrawCurve.linePhaseElement.setAttribute('visibility','visible');
            svgDrawCurve.drawCurveLine(curButtonNo+20, m_nInMapEQ[nSel].m_nPol_Point); //绘制相位曲线
			// console.log('绘制相位曲线');
		}else{
            svgDrawCurve.linePhaseElement.setAttribute('visibility','hidden');
		}


		svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);

		//svgDrawCurve.drawOtherCurveLine();
	}

    svgDrawCurve.drawOtherCurveLine(); //显示其它曲线，非绘制，其曲线已经绘制好，并不需要更新改动，只需显示

}


function DrawOutLine(nSel)
{
    DrawOutLineF(nSel); //绘制输出曲线
    DrawOutLineText();
}

function DrawOutLineText() {
    var InSize = 11;

    for(var i=(InSize-1);i>=0;i--)
    {
        if(i===6 || i===7 || i===8 ){
            continue;
        }
        //console.log(m_nOutMapEQ[curButtonNo-5] + "   index: " + (curButtonNo - 5));
        var Filter =  m_nOutMapEQ[curButtonNo-5].filterArray[i];
        var nFilterType = Filter.GetFilterType();

        m_nOutMapEQ[curButtonNo-5].filterArray[i].HLToRect();
        var pointDataText = new PointClass(m_nOutMapEQ[curButtonNo-5].filterArray[i].m_nShowRect.left + 28,m_nOutMapEQ[curButtonNo-5].filterArray[i].m_nShowRect.top);
        var str = m_nOutMapEQ[curButtonNo-5].filterArray[i].GetShowData();
        if(nFilterType === eqType.AllPass_Shelf1) {// 1阶全通
            svgDrawCurve.drawDataText(pointDataText,i+1,str,"#ff0000", true);
        } else if(nFilterType === eqType.AllPass_Shelf2) //2阶全通
        {//全通 字体为红色
            svgDrawCurve.drawDataText(pointDataText,i+1,str,"#ff0000", false);
        }
        else
        {//非全通 字体为白色
            svgDrawCurve.drawDataText(pointDataText,i+1,str,"#ffffff", false);
        }

        if(i<6){
            var point = m_nOutMapEQ[curButtonNo-5].filterArray[i].FDToRect(); //通道名数据坐标  6路均衡
            if(nFilterType === eqType.AllPass_Shelf1 || nFilterType === eqType.AllPass_Shelf2)
            {//全通 字体为红色
                svgDrawCurve.drawChannelText(point,i+1,"#ff0000");
            }
            else
            {//非全通 字体为白色
                svgDrawCurve.drawChannelText(point,i+1,"#ffffff");
            }

            pointOfLeft = new PointClass(m_nOutMapEQ[curButtonNo-5].filterArray[i].m_nLRect.left,m_nOutMapEQ[curButtonNo-5].filterArray[i].m_nLRect.top);
            svgDrawCurve.drawLeftRect(pointOfLeft,i+1);

            pointOfRight =  new PointClass(m_nOutMapEQ[curButtonNo-5].filterArray[i].m_nRRect.left,m_nOutMapEQ[curButtonNo-5].filterArray[i].m_nRRect.top);
            svgDrawCurve.drawRightRect(pointOfRight,i+1);

        }else{
            var point = m_nOutMapEQ[curButtonNo-5].filterArray[i].HLToRect(); //通道名坐标 高通低通
            if(nFilterType === eqType.AllPass_Shelf1 || nFilterType === eqType.AllPass_Shelf2)
            {//全通 字体为红色
                svgDrawCurve.drawChannelText(point,i+1,"#ff0000");
            }
            else
            {//非全通 字体为白色
                svgDrawCurve.drawChannelText(point,i+1,"#ffffff");
            }
        }
    }
}

function DrawOtherLockOutLine() {
	for(var i=0; i<8; i++) {
		if(m_nLinkOut_EQLine[i] || m_nCurOut_EQLine[i]) {
			m_nOutMapEQ[i].Conver_Out_PHLPoint(); //6个Filter　＋　高调　＋　低调　的240个point 组合成为一条曲线
            svgDrawCurve.drawCurveLine(i + 5,m_nOutMapEQ[i].m_nPointF); //绘制曲线
			console.log('绘制其它曲线： ' + i);
		}
	}
}

var linkIndex;
var pointsOutArray = [];
var ignoreFollowLine = false;
function DrawFollowOutLine() {
    // m_nOutMapEQ[linkIndex].Conver_Out_PHLPoint(); //6个Filter　＋　高调　＋　低调　的240个point 组合成为一条曲线
    svgDrawCurve.drawCurveLine(linkIndex+5, pointsOutArray.shift());
    svgDrawCurve.drawCurveLine(curButtonNo,m_nOutMapEQ[curButtonNo-5].m_nPointF);
    DrawOutLineText();
}

function DrawOutLineF(nSel)   //画输出浮点曲线
{
	var i;
    // console.log('绘制输出曲线:' + nSel);
	if(nSel >= 0) // nSel = [0,7]
	{
        //绘制联调的其它输出曲线
        var linkArray = getLinkOutArray(nSel+5);
        var followLineMark = false;
        if(linkArray.length > 0){
            for(var t=linkArray.length-1;t>=0;t--){
                for( i=0; i<11;i++){
                    if(i===6 || i===7 || i===8){
                        continue;
                    }
                    // console.log('link_out: ' + linkArray[t]);
                    // console.log('link_filter_i:' + i + '    type:' + m_nOutMapEQ[linkArray[t]].filterArray[i].m_nFilterType);
                    // console.log('link_filter_i:' + i + '    freq:' + m_nOutMapEQ[linkArray[t]].filterArray[i].m_pEQ.freq);
                    m_nOutMapEQ[linkArray[t]].filterArray[i].UpDataPoint(false);
                }

                if((!followLineMark) && (m_nLinkOut_EQLine[linkArray[t]]) && (!ignoreFollowLine)){
                    followLineMark = true;
                    ignoreFollowLine = false;
                    linkIndex = linkArray[t];
                    m_nOutMapEQ[linkIndex].Conver_Out_PHLPoint(); //6个Filter　＋　高调　＋　低调　的240个point 组合成为一条曲线
					pointsOutArray.push(m_nOutMapEQ[linkIndex].m_nPointF.slice(0));
                    setTimeout("DrawFollowOutLine()", 700);
                    // m_nOutMapEQ[linkArray[t]].Conver_Out_PHLPoint(); //6个Filter　＋　高调　＋　低调　的240个point 组合成为一条曲线
                    // setTimeout("svgDrawCurve.drawCurveLine(linkIndex+5,m_nOutMapEQ[linkIndex].m_nPointF);svgDrawCurve.drawCurveLine(curButtonNo,m_nOutMapEQ[curButtonNo-5].m_nPointF); ",
						// 1000);
                    console.log('输出联调的跟随曲线：' + linkArray[t]);
				} else {
                    ignoreFollowLine = false;
                    m_nOutMapEQ[linkArray[t]].Conver_Out_PHLPoint(); //6个Filter　＋　高调　＋　低调　的240个point 组合成为一条曲线
                    svgDrawCurve.drawCurveLine(linkArray[t] + 5,m_nOutMapEQ[linkArray[t]].m_nPointF); //绘制曲线
                    console.log('输出联调的非跟随曲线：' + linkArray[t]);
				}

                //setTimeout("svgDrawCurve.drawCurveLine(linkArray[t] + 5,m_nOutMapEQ[linkArray[t]].m_nPointF)", 1000);
                //svgDrawCurve.drawCurveLine(linkArray[t] + 5,m_nOutMapEQ[linkArray[t]].m_nPointF); //绘制曲线
                // console.log('绘制输出联调的曲线：' + linkArray[t]);
            }
        }


		for(i=0; i<11;i++){
            if(i===6 || i===7 || i===8){
	            continue;
            }
            // console.log('main_filter_i:' + i + '    type:' + m_nOutMapEQ[nSel].filterArray[i].m_nFilterType);
            // console.log('main_filter_i:' + i + '    freq:' + m_nOutMapEQ[nSel].filterArray[i].m_pEQ.freq);
            m_nOutMapEQ[nSel].filterArray[i].UpDataPoint(false);
		}
		m_nOutMapEQ[nSel].Conver_Out_PHLPoint(); //6个Filter　＋　高调　＋　低调　的240个point 组合成为一条曲线

		svgDrawCurve.drawCurveLine(curButtonNo,m_nOutMapEQ[nSel].m_nPointF); //绘制曲线
        if(controlsData.buttonStates.buttonPhaseCurveStatus[curButtonNo-1]) {
            svgDrawCurve.linePhaseElement.setAttribute('visibility','visible');
            svgDrawCurve.drawCurveLine(curButtonNo + 20, m_nOutMapEQ[nSel].m_nPol_Point); //绘制相位曲线
        }else{
            svgDrawCurve.linePhaseElement.setAttribute('visibility','hidden');
		}

		svgDrawCurve.setCurrentEqLine(oldButtonNo, curButtonNo);

	}

    svgDrawCurve.drawOtherCurveLine(); //显示其它曲线
}



function refreshKeepStep() {
	for(var i=1; i<5; i++) {
		for(var j=1; j<7; j++) {
			eqDataKeepStep(i,j);
		}
	}

	for(i=5; i<13; i++) {
		for(j=1; j<9; j++) {
			eqDataKeepStep(i,j);
		}
	}
}


function eqDataKeepStep(routeID , channelID) {
	switch (routeID) {
		case 1:
			inputDataKeepStep(currentGroupData.dataInputA, m_nInMapEQ[0], channelID);
			break;
		case 2:
			inputDataKeepStep(currentGroupData.dataInputB, m_nInMapEQ[1], channelID);
			break;
		case 3:
			inputDataKeepStep(currentGroupData.dataInputC, m_nInMapEQ[2], channelID);
			break;
		case 4:
			inputDataKeepStep(currentGroupData.dataInputD, m_nInMapEQ[3], channelID);
			break;
		case 5:
			outDataKeepStep(currentGroupData.dataOut1, m_nOutMapEQ[0], channelID);
			break;
		case 6:
			outDataKeepStep(currentGroupData.dataOut2, m_nOutMapEQ[1], channelID);
			break;
		case 7:
			outDataKeepStep(currentGroupData.dataOut3, m_nOutMapEQ[2], channelID);
			break;
		case 8:
			outDataKeepStep(currentGroupData.dataOut4, m_nOutMapEQ[3], channelID);
			break;
		case 9:
			outDataKeepStep(currentGroupData.dataOut5, m_nOutMapEQ[4], channelID);
			break;
		case 10:
			outDataKeepStep(currentGroupData.dataOut6, m_nOutMapEQ[5], channelID);
			break;
		case 11:
			outDataKeepStep(currentGroupData.dataOut7, m_nOutMapEQ[6], channelID);
			break;
		case 12:
			outDataKeepStep(currentGroupData.dataOut8, m_nOutMapEQ[7], channelID);
			break;
		default:
			break;

	}

}



function inputDataKeepStep(inputData, inMapEq, channelID) {

	switch(channelID) {
		case 1:
			inMapEq.filterArray[0].SetPublicEQ(inputData.InEQ.EQ1);
			inMapEq.filterArray[0].UpDataPoint(false);
			break;
		case 2:
			inMapEq.filterArray[1].SetPublicEQ(inputData.InEQ.EQ2);
			inMapEq.filterArray[1].UpDataPoint(false);
			break;
		case 3:
			inMapEq.filterArray[2].SetPublicEQ(inputData.InEQ.EQ3);
			inMapEq.filterArray[2].UpDataPoint(false);
			break;
		case 4:
			inMapEq.filterArray[3].SetPublicEQ(inputData.InEQ.EQ4);
			inMapEq.filterArray[3].UpDataPoint(false);
			break;
		case 5:
			inMapEq.filterArray[4].SetPublicEQ(inputData.InEQ.EQ5);
			inMapEq.filterArray[4].UpDataPoint(false);
			break;
		case 6:
			inMapEq.filterArray[5].SetPublicEQ(inputData.InEQ.EQ6);
			inMapEq.filterArray[5].UpDataPoint(false);
			break;
		default:

			break;
	}
}



function outDataKeepStep(outData, outMapEq, channelID) {

	switch(channelID) {
		case 1:
			outMapEq.filterArray[0].SetPublicEQ(outData.OutEQ.EQ1);
			outMapEq.filterArray[0].UpDataPoint(false);
			break;
		case 2:
			outMapEq.filterArray[1].SetPublicEQ(outData.OutEQ.EQ2);
			outMapEq.filterArray[1].UpDataPoint(false);
			break;
		case 3:
			outMapEq.filterArray[2].SetPublicEQ(outData.OutEQ.EQ3);
			outMapEq.filterArray[2].UpDataPoint(false);
			break;
		case 4:
			outMapEq.filterArray[3].SetPublicEQ(outData.OutEQ.EQ4);
			outMapEq.filterArray[3].UpDataPoint(false);
			break;
		case 5:
			outMapEq.filterArray[4].SetPublicEQ(outData.OutEQ.EQ5);
			outMapEq.filterArray[4].UpDataPoint(false);
			break;
		case 6:
			outMapEq.filterArray[5].SetPublicEQ(outData.OutEQ.EQ6);
			outMapEq.filterArray[5].UpDataPoint(false);
			break;
		case 7:
			outMapEq.filterArray[9].SetFilterType(eqType.HPF_SEQ);
			outMapEq.filterArray[9].SetPublicXOver(outData.HPFData);
			outMapEq.filterArray[9].UpDataPoint(false);
			break;
		case 8:
			outMapEq.filterArray[10].SetFilterType(eqType.LPF_SEQ);
			outMapEq.filterArray[10].SetPublicXOver(outData.LPFData);
			outMapEq.filterArray[10].UpDataPoint(false);
			break;
		default:

			break;
	}

}





function curveDataKeepStep(routeID , channelID) {

	switch (routeID) {
		case 1:
			curveInputDataKeepStep(currentGroupData.dataInputA, m_nInMapEQ[0], channelID);
			break;
		case 2:
			curveInputDataKeepStep(currentGroupData.dataInputB, m_nInMapEQ[1], channelID);
			break;
		case 3:
			curveInputDataKeepStep(currentGroupData.dataInputC, m_nInMapEQ[2], channelID);
			break;
		case 4:
			curveInputDataKeepStep(currentGroupData.dataInputD, m_nInMapEQ[3], channelID);
			break;
		case 5:
			curveOutDataKeepStep(currentGroupData.dataOut1, m_nOutMapEQ[0], channelID);
			break;
		case 6:
			curveOutDataKeepStep(currentGroupData.dataOut2, m_nOutMapEQ[1], channelID);
			break;
		case 7:
			curveOutDataKeepStep(currentGroupData.dataOut3, m_nOutMapEQ[2], channelID);
			break;
		case 8:
			curveOutDataKeepStep(currentGroupData.dataOut4, m_nOutMapEQ[3], channelID);
			break;
		case 9:
			curveOutDataKeepStep(currentGroupData.dataOut5, m_nOutMapEQ[4], channelID);
			break;
		case 10:
			curveOutDataKeepStep(currentGroupData.dataOut6, m_nOutMapEQ[5], channelID);
			break;
		case 11:
			curveOutDataKeepStep(currentGroupData.dataOut7, m_nOutMapEQ[6], channelID);
			break;
		case 12:
			curveOutDataKeepStep(currentGroupData.dataOut8, m_nOutMapEQ[7], channelID);
			break;
		default:
			break;

	}
}


function curveInputDataKeepStep(inputData, inMapEq, channelID) {

	switch(channelID) {
		case 1:
			inMapEq.filterArray[0].returnPublicEQ(inputData.InEQ.EQ1);
			updateEqDataDisplay(inputData.InEQ.EQ1, channelID);
			break;
		case 2:
			inMapEq.filterArray[1].returnPublicEQ(inputData.InEQ.EQ2);
			updateEqDataDisplay(inputData.InEQ.EQ2, channelID);
			break;
		case 3:
			inMapEq.filterArray[2].returnPublicEQ(inputData.InEQ.EQ3);
			updateEqDataDisplay(inputData.InEQ.EQ3, channelID);
			break;
		case 4:
			inMapEq.filterArray[3].returnPublicEQ(inputData.InEQ.EQ4);
			updateEqDataDisplay(inputData.InEQ.EQ4, channelID);
			break;
		case 5:
			inMapEq.filterArray[4].returnPublicEQ(inputData.InEQ.EQ5);
			updateEqDataDisplay(inputData.InEQ.EQ5, channelID);
			break;
		case 6:
			inMapEq.filterArray[5].returnPublicEQ(inputData.InEQ.EQ6);
			updateEqDataDisplay(inputData.InEQ.EQ6, channelID);
			break;
		default:

			break;
	}

}


function curveOutDataKeepStep(outData, outMapEq, channelID) {

	switch(channelID) {
		case 1:
			outMapEq.filterArray[0].returnPublicEQ(outData.OutEQ.EQ1);
		    updateEqDataDisplay(outData.OutEQ.EQ1, channelID);
			break;
		case 2:
			outMapEq.filterArray[1].returnPublicEQ(outData.OutEQ.EQ2);
            updateEqDataDisplay(outData.OutEQ.EQ2, channelID);
			break;
		case 3:
			outMapEq.filterArray[2].returnPublicEQ(outData.OutEQ.EQ3);
			updateEqDataDisplay(outData.OutEQ.EQ3, channelID);
			break;
		case 4:
			outMapEq.filterArray[3].returnPublicEQ(outData.OutEQ.EQ4);
			updateEqDataDisplay(outData.OutEQ.EQ4, channelID);
			break;
		case 5:
			outMapEq.filterArray[4].returnPublicEQ(outData.OutEQ.EQ5);
			updateEqDataDisplay(outData.OutEQ.EQ5, channelID);
			break;
		case 6:
			outMapEq.filterArray[5].returnPublicEQ(outData.OutEQ.EQ6);
			updateEqDataDisplay(outData.OutEQ.EQ6, channelID);
			break;
		case 10:
			outMapEq.filterArray[9].returnPublicXOver(outData.HPFData);
			updateXoverDataDisplay(outData.HPFData,eqType.HPF_SEQ);
			break;
		case 11:
			outMapEq.filterArray[10].returnPublicXOver(outData.LPFData);
			updateXoverDataDisplay(outData.LPFData,eqType.LPF_SEQ);
			break;
		default:

			break;
	}
}


function updateXoverDataDisplay(xover, type){
	var freqElement;
	switch(type){
		case eqType.HPF_SEQ:
			freqElement = document.getElementById("text_hpf_frequency");
			//freqElement.setAttribute("value", getFrequencyDisplay(xover.HL_freq));
			//console.log('高通频率_索引：' + xover.HL_freq);
			freqElement.value = getFrequencyDisplay(xover.HL_freq);
			break;
		case eqType.LPF_SEQ:
			freqElement = document.getElementById("text_lpf_frequency");
			//freqElement.setAttribute("value", getFrequencyDisplay(xover.HL_freq));
			freqElement.value = getFrequencyDisplay(xover.HL_freq);
			break;
		default:
			break;
	}
}

function updateEqDataDisplay(nEQ, channelID) {
    var freqElement,
        bandwidthElement,
        slopeElement,
        levelElement;

    switch(channelID) {
        case 1:
            freqElement = document.getElementById("text_eq1_frequency");
            bandwidthElement = document.getElementById("text_eq1_bandwidth");
            slopeElement = document.getElementById("text_eq1_slope");
            levelElement = document.getElementById("text_eq1_gain");

            //console.log(getFrequencyDisplay(nEQ.freq));
            // freqElement.setAttribute("value", getFrequencyDisplay(nEQ.freq));
            // bandwidthElement.setAttribute("value", getBandwidthDisplay(nEQ.bw));
            // slopeElement.setAttribute("value", getSlopeDisplay(nEQ.bw));
            // levelElement.setAttribute("value",getEqGainDisplay(nEQ.level));

            setSliderPosition(controlsId.SLIDER_EQ1_THUMP, nEQ.level);
            updateEqGainButton(1);
            break;
        case 2:
            freqElement = document.getElementById("text_eq2_frequency");
            bandwidthElement = document.getElementById("text_eq2_bandwidth");
            slopeElement = document.getElementById("text_eq2_slope");
            levelElement = document.getElementById("text_eq2_gain");

            // freqElement.setAttribute("value", getFrequencyDisplay(nEQ.freq));
            // bandwidthElement.setAttribute("value", getBandwidthDisplay(nEQ.bw));
            // slopeElement.setAttribute("value", getSlopeDisplay(nEQ.bw));
            // levelElement.setAttribute("value",getEqGainDisplay(nEQ.level));
            setSliderPosition(controlsId.SLIDER_EQ2_THUMP, nEQ.level);
            updateEqGainButton(2);
            break;
        case 3:
            freqElement = document.getElementById("text_eq3_frequency");
            bandwidthElement = document.getElementById("text_eq3_bandwidth");
            slopeElement = document.getElementById("text_eq3_slope");
            levelElement = document.getElementById("text_eq3_gain");

            // freqElement.setAttribute("value", getFrequencyDisplay(nEQ.freq));
            // bandwidthElement.setAttribute("value", getBandwidthDisplay(nEQ.bw));
            // slopeElement.setAttribute("value", getSlopeDisplay(nEQ.bw));
            // levelElement.setAttribute("value",getEqGainDisplay(nEQ.level));
            setSliderPosition(controlsId.SLIDER_EQ3_THUMP, nEQ.level);
            updateEqGainButton(3);
            break;
        case 4:
            freqElement = document.getElementById("text_eq4_frequency");
            bandwidthElement = document.getElementById("text_eq4_bandwidth");
            slopeElement = document.getElementById("text_eq4_slope");
            levelElement = document.getElementById("text_eq4_gain");

            // freqElement.setAttribute("value", getFrequencyDisplay(nEQ.freq));
            // bandwidthElement.setAttribute("value", getBandwidthDisplay(nEQ.bw));
            // slopeElement.setAttribute("value", getSlopeDisplay(nEQ.bw));
            // levelElement.setAttribute("value",getEqGainDisplay(nEQ.level));
            setSliderPosition(controlsId.SLIDER_EQ4_THUMP, nEQ.level);
            updateEqGainButton(4);
            break;
        case 5:
            freqElement = document.getElementById("text_eq5_frequency");
            bandwidthElement = document.getElementById("text_eq5_bandwidth");
            slopeElement = document.getElementById("text_eq5_slope");
            levelElement = document.getElementById("text_eq5_gain");

            // freqElement.setAttribute("value", getFrequencyDisplay(nEQ.freq));
            // bandwidthElement.setAttribute("value", getBandwidthDisplay(nEQ.bw));
            // slopeElement.setAttribute("value", getSlopeDisplay(nEQ.bw));
            // levelElement.setAttribute("value",getEqGainDisplay(nEQ.level));
            setSliderPosition(controlsId.SLIDER_EQ5_THUMP, nEQ.level);
            updateEqGainButton(5);
            break;
        case 6:
            freqElement = document.getElementById("text_eq6_frequency");
            bandwidthElement = document.getElementById("text_eq6_bandwidth");
            slopeElement = document.getElementById("text_eq6_slope");
            levelElement = document.getElementById("text_eq6_gain");

            // freqElement.setAttribute("value", getFrequencyDisplay(nEQ.freq));
            // bandwidthElement.setAttribute("value", getBandwidthDisplay(nEQ.bw));
            // slopeElement.setAttribute("value", getSlopeDisplay(nEQ.bw));
            // levelElement.setAttribute("value",getEqGainDisplay(nEQ.level));
            setSliderPosition(controlsId.SLIDER_EQ6_THUMP, nEQ.level);
            updateEqGainButton(6);
            break;
        case 7:
            break;
        case 8:
            break;
        default:

            break;
    }


    freqElement.value = getFrequencyDisplay(nEQ.freq);
    bandwidthElement.value = getBandwidthDisplay(nEQ.bw);
    slopeElement.value = getSlopeDisplay(nEQ.bw);
    levelElement.value = getEqGainDisplay(nEQ.level);
    updateAllEqGainButton();
     // console.log(currentGroupData.dataInputA.InEQ.EQ1.level);
     // console.log(controlsData.inputData.InEQ.EQ1.level);
}


function drawGrid(){
    this.drawHorizontalLine();
    this.drawVerticalLine();
}


var lineArrayVertical = new Array(27);

function drawVerticalLine(){
    var i;
    var startPoint = 20;
    startPoint = docToWidth(startPoint,curveWidth);
    for (i = 0; i < 9; i++) {
        verLinePoint[i] = (i + 2) * 10; //index: 0-8: 20 30 40 50 60 70 80 90 100
    }
    for (i = 0; i < 9; i++) {
        verLinePoint[i + 9] = (i + 2) * 100; //index: 9-17: 200 300 400 500 600 700 800 900 1000
    }
    for (i = 0; i < 9; i++) {
        verLinePoint[i + 18] = (i + 2) * 1000; //index: 17-25:2000--10000
    }
    verLinePoint[27] = 20000;
    // verLinePoint[27] = 20000;
    //verLinePoint[29] = 30000;

    for (i = 0; i < 28; i++) {
        verLinePoint[i] = docToWidth(verLinePoint[i], curveWidth+1); //vertical line  Y coordinate
    }


    for( i=1; i<27; i++){
        lineArrayVertical[i] = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineArrayVertical[i].setAttribute('x1', verLinePoint[i] + 0.5);
        lineArrayVertical[i].setAttribute('y1', 0);
        lineArrayVertical[i].setAttribute('x2', verLinePoint[i] + 0.5);
        lineArrayVertical[i].setAttribute('y2', curveHeight+1);
        lineArrayVertical[i].setAttribute('stroke', '#009100');
        lineArrayVertical[i].setAttribute('stroke-width', "1");
        curve_svg.appendChild( lineArrayVertical[i]);
    }
}

var lineArrayHorizontal = new Array(7);

function drawHorizontalLine(){

    var coordinateY = ['12.5%', '25.1%', '37.5%', '50.1%', '62.5%', '75.1%', '87.5%'];
    for(var i=0; i<7; i++){
        lineArrayHorizontal[i] = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineArrayHorizontal[i].setAttribute('x1', 0);
        lineArrayHorizontal[i].setAttribute('y1', coordinateY[i]);
        lineArrayHorizontal[i].setAttribute('x2', curveWidth);
        lineArrayHorizontal[i].setAttribute('y2', coordinateY[i]);
        lineArrayHorizontal[i].setAttribute('stroke', '#009100');
        lineArrayHorizontal[i].setAttribute('stroke-width', 1);
        curve_svg.appendChild( lineArrayHorizontal[i] );
    }
}

