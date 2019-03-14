document.write("<script language=javascript src='./javascripts/dp7/assign_data.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/constant_config.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/constant_language.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/data_struct.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/button_operate.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/input_text_operate.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/input_text_change.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/input_text_mouse_wheel.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/input_text_key_up_down.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/input_text_key_up.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/spinner_operate.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/slider_operate.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/indicate_text_operate.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/input_text_channel_name.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/curve_eq.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/filter.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/curve_draw.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/agc_ext_map.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/agc_ext_draw.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/com_ext_map.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/com_ext_draw.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/ajax_communicate.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/draw_with_svg.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/lock_operate.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/lock_diplay.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/up_and_down_button.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/central_control_code.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/system_frame.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/program_frame.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/button_deq.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/link_operate.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/curtain_report.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/language_operate.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/focusEvents.js'></script>");
document.write("<script language=javascript src='./javascripts/dp7/slider_onclick.js'></script>");

var controlsData;

var currentGroupData;
var oldGroupData;
var currentAllGroupData;
var currentSystemData;
var currentLockData;
var currentLedData;
var oldLedData;

var controlsId;
var operateTypes;
var isChinese;
var eqData;
var isReadBigData;


var currentEditControlID;
var currentEditControl;
var currentStep = 0;
var secondStep = 0;
var requestLedCount;

var inputData;
var constConfig;
var messageType;
var eqType;

var dataForSend;
var dataBeReceive;
var dataForSendArray = [];

var inputTextValueType;

var isMouseDown;
var isMouseUp;
var isMouseMove;
var isMouseHover;

var targetId;
var thumpTextId;

var oneGroupData;
var isShortToLong;
var curveHeight, curveWidth;
var curve_svg,input_svg,out_svg;

var currentPGName;
var currentSoftVersion;
var currentSoftVersionArray = new Array();
var currentWebSoftVersion = 'Z-SV1.00T';
var programNameArray = new Array(30);

var focusElementId;
var connectSteps;
var connectCurStep;

var deviceType = 48;

var browerType;
// 参数列表
var params = {
    left: 0,
    top: 0,
    top_max: 0,
    top_min: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};

var paramsOfEQ = {
    isHover: false,
    isDown: false,
    isMove: false,
    isUp: true,
    index: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};

var paramsOfLRect = {
    isHover: false,
    isDown: false,
    isMove: false,
    isUp: true,
    index: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};

var paramsOfRRect = {
    isHover: false,
    isDown: false,
    isMove: false,
    isUp: true,
    index: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};

var paramsOfInputPoint = {
    isHover: false,
    isDown: false,
    isMove: false,
    isUp: true,
    index: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};

var paramsOfOutPoint = {
    isHover: false,
    isDown: false,
    isMove: false,
    isUp: true,
    index: 0,
    currentX: 0,
    currentY: 0,
    flag: false
};


var pointOfLeft,pointOfRight;

var svgDrawInput, svgDrawOut,agcExtMap,comExtMap;

var lockFrame, languageFrame;

var curEqChannel;

var mainElement;
function disableMainCurtain() {
    document.getElementById('cover').style.display = 'inline';
}

function enableMainCurtain() {
    document.getElementById('cover').style.display = 'none';
}

function curtainOption(option){
    document.getElementById('curtain').style.display = 'none';
    document.getElementById('program_curtain').style.display = 'none';
    document.getElementById('lock_curtain').style.display = 'none';
    document.getElementById('system_curtain').style.display = 'none';
    document.getElementById('central_curtain').style.display = 'none';
    document.getElementById('report_curtain').style.display = 'none';

    //console.log(option);
    switch(option){
        case 0://主页面
            document.getElementById('curtain').style.display = 'inline';
            setCurtainPosition();
            break;
        case 1://程序
            initProgramDisplay();
            document.getElementById('save_one_to_pc').style.display = 'none';
            document.getElementById('save_all_to_pc').style.display = 'none';
            document.getElementById('program_curtain').style.top = '0';
            document.getElementById('program_curtain').style.display = 'inline';
            break;
        case 2://锁定
            document.getElementById('lock_curtain').style.top = '15px';
            document.getElementById('lock_curtain').style.display = 'inline';
            break;
        case 3://系统
            document.getElementById('system_curtain').style.top = '150px';
            document.getElementById('system_curtain').style.display = 'inline';
            refreshSystemCurtain();
            break;
        case 4://中控
            document.getElementById('central_curtain').style.top = '30px';
            document.getElementById('central_curtain').style.display = 'inline';
            break;
        case 5://报告
            document.getElementById('report_curtain').style.top = '5px';
            document.getElementById('report_curtain').style.display = 'inline';
            break;
        default://主页面
            document.getElementById('curtain').style.display = 'inline';
            break;
    }
}

function init(){
    focusElementId = null;
    mainElement = document.getElementById('curtain');
    browerType = BrowserType();
    if(browerType === 'IE' || browerType === 'safari') {
        communicateSpeed = 200;
        communicateSpeedServer = 200;
    } else {
        communicateSpeed = 200;
        communicateSpeedServer = 200;
    }
    // alert(browerType);
    requestLedCount = 0;
    isReadBigData = false;
    isConnect = false;
    curEqChannel = -1
    pointOfLeft = new PointClass(0,0);
    pointOfRight = new PointClass(0,0);

    var i;
    currentLedData = [0,0,0,0,0,0,0,0,0,0,0,0];
    oldLedData = [20,20,20,20,20,20,20,20,20,20,20,20];
    currentSoftVersion = '';

    currentPGName = [' ',' ',' ',' ',' ',' ',' ',' ',' ', ' ',' ',' '];

    isMouseDown = false;
    isMouseUp = true;
    isMouseMove = false;
    isMouseHover = false;

    currentStep = 0;
    secondStep = 0;

    isShortToLong = false;
    isChinese = true;

    if (isChinese) {
        document.getElementById('button_language').innerText = 'English';
    } else {
        document.getElementById('button_language').innerText = '中文';
    }

     //const
    constConfig = new ConstConfigClass();
    messageType = new MessageType();
    eqType = new EQType();
    dataForSend = new DataStruct();
    dataBeReceive = new DataStruct();
    inputTextValueType = new InputTextValueType();
    controlsId = new ControlsId();
    operateTypes = new OperateTypes();

    //data
    eqData = new PublicEqData();
    currentGroupData = new PublicOneGroup();
    currentGroupData.dataInputA.inLinkSel = 0;
    currentGroupData.dataInputB.inLinkSel = 1;
    currentGroupData.dataInputC.inLinkSel = 2;
    currentGroupData.dataInputD.inLinkSel = 3;
    currentGroupData.dataOut1.outLinkSel = 0;
    currentGroupData.dataOut2.outLinkSel = 1;
    currentGroupData.dataOut3.outLinkSel = 2;
    currentGroupData.dataOut4.outLinkSel = 3;
    currentGroupData.dataOut5.outLinkSel = 4;
    currentGroupData.dataOut6.outLinkSel = 5;
    currentGroupData.dataOut7.outLinkSel = 6;
    currentGroupData.dataOut8.outLinkSel = 7;

    oldGroupData = new PublicOneGroup();
    currentAllGroupData = new Array(messageType.Max_FGroup);
    for( i=0; i<messageType.Max_FGroup; i++){
        currentAllGroupData[i] = new PublicOneGroup();
    }
    currentSystemData = new PublicSYS();
    initPublicSYS(currentSystemData);
    currentLockData = new AllLockData();

    controlsData = new PublicControlsData();

    initInputSelectControl('select_link_a');
    initInputSelectControl('select_link_b');
    initInputSelectControl('select_link_c');
    initInputSelectControl('select_link_d');
    document.getElementById('select_link_a').value = currentGroupData.dataInputA.inLinkSel;
    document.getElementById('select_link_b').value = currentGroupData.dataInputB.inLinkSel;
    document.getElementById('select_link_c').value = currentGroupData.dataInputC.inLinkSel;
    document.getElementById('select_link_d').value = currentGroupData.dataInputD.inLinkSel;
    initXoverControl("text_hpf_mode");
    initXoverControl("text_lpf_mode");
    initXoverMany("text_hpf_slope");
    initXoverMany("text_lpf_slope");

    for ( i=1; i<9; i++){
        initOutSelectControl('select_link_out'+i);
    }
    document.getElementById('select_link_out1').value = currentGroupData.dataOut1.outLinkSel;
    document.getElementById('select_link_out2').value = currentGroupData.dataOut2.outLinkSel;
    document.getElementById('select_link_out3').value = currentGroupData.dataOut3.outLinkSel;
    document.getElementById('select_link_out4').value = currentGroupData.dataOut4.outLinkSel;
    document.getElementById('select_link_out5').value = currentGroupData.dataOut5.outLinkSel;
    document.getElementById('select_link_out6').value = currentGroupData.dataOut6.outLinkSel;
    document.getElementById('select_link_out7').value = currentGroupData.dataOut7.outLinkSel;
    document.getElementById('select_link_out8').value = currentGroupData.dataOut8.outLinkSel;

    for ( i=1; i<7; i++){
        initModeSelectControl('select_mode' + i);
        initSlopeSelectControl('select_slope' + i);
    }

    //curve height width
    var curveElement = document.getElementById('curve_grid');
    if (getCss(curveElement, 'height') !== 'auto') {
        curveHeight = parseInt(getCss(curveElement, 'height')); //getCSS return value: 276px  the value is string
    }
    if (getCss(curveElement, 'width') !==  'auto') {
        curveWidth = parseInt(getCss(curveElement, 'width'));
    }
    svgDrawCurve = new DrawWithSVG();
    svgDrawInput = new AgcExtDraw();
    svgDrawInput.initPointAndLine();
    svgDrawOut = new ComExtDraw();
    svgDrawOut.initPointAndLine();

    curve_svg = document.getElementById('curve_svg');
    curve_svg.setAttribute('height', "276");
    curve_svg.setAttribute('width', "628");

    input_svg = document.getElementById('point_svg_input');
    input_svg.setAttribute('height', "190");
    input_svg.setAttribute('width', "190");

    out_svg = document.getElementById('point_svg_out');
    out_svg.setAttribute('height', "190");
    out_svg.setAttribute('width', "190");


    agcExtMap = new AgcExtMap();
    agcExtMap.Init();
    agcExtMap.SetInData(0);


    comExtMap = new ComExtMap();
    comExtMap.Init();
    comExtMap.SetOutComp_LimT(0);

    initializeCurve();

    initializeChannelName();
    refreshMainDisplay(); //程序打开初始化
    addChannelNameChangeListener();
    addChannelNameKepUpListener();
    addFocusEventsListener()

    // setIndicateText(CHINESE_INDICATE_TEXT);
    // setDeqIndicateText(CHINESE_DEQ_INDICATE_TEXT);

    window.moveTo(0, 0);//移动窗口
    window.resizeTo(1280, 710);//改变大小

    targetId = 'none';
    parentId = 'none';

    addSliderListener();
    addInputTextChangeListener();
    //addInputTextMouseWheelListener();
    addFocusEventsListener();
    addSliderClickEventsListener();
    addInputTextKeyDownListener();
    addButtonClickListener();
    addInputTextKeyUpListener();
    addSelectControlListener();
    assignSelectData();
    //assignFilterData();

    refreshKeepStep();
    drawGrid();
    DrawInLine(0);
    showOrHideEqData(0);
    showOrHideLittleRect(0);



    //lock_frame
    //========================================
    lockFrame = new LockFrame();
    lockFrame.lockFrameWelcome();

    lockDisplay = new LockDisplay();
    lockDisplay.initLockElements();
    lockDisplay.refreshLockDisplay(); //更新锁定数据


    for(i=12; i>0; i--){
        curButtonNo = i;
        DrawLine();
    }
    m_nCurIn_EQLine = [1, 0, 0, 0];
    m_nCurOut_EQLine = [0, 0, 0 ,0, 0, 0, 0, 0];
    svgDrawCurve.drawOtherCurveLine();
    hideHLPFChannelName();

    initDeq();
    initCentralControl();

    for(i=0; i<programNameArray.length; i++) {
        programNameArray[i] = '';
    }
    initProgramDisplay();
    initProgramTrClick();
    initSystemCurtain();


    upDownPressTime=0;
    initUpAndDownButton();
    initReport();
    languageFrame = new LanguageOperate();
    languageFrame.languageOperate();

    // var address = window.location.href;
    // // console.log('ip地址:' + address.replace('http://',''));
    // address = address.replace('http://','');
    // address = address.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/);
    // // console.log('address:' + address);
    // if(address){
    //     document.getElementById('text_device_ip').value = address;
    // } else {
    //     document.getElementById('text_device_ip').value = '192.168.1.10';
    // }

    curtainOption(0);
    clearLedDisplay();
    setCurtainPosition();
}

var lockDisplay;
var curtainLeft;
var curtainTop;
window.onresize = function(){
    setCurtainPosition();
};

function setCurtainPosition() {
    var h = document.documentElement.clientHeight;//获取页面可见高度
    var w = document.documentElement.clientWidth;
    var main = document.getElementById('curtain');
    var left = (w - main.offsetWidth - 15) / 2;
    var top = (h - main.offsetHeight - 15) / 2;
    curtainLeft = left > 0 ? left : 0;
    curtainTop = top > 0 ? top : 0;
    left = (curtainLeft + 2) ? curtainLeft + 2 : 0;
    top = (curtainTop - 6)  ? curtainTop - 6 : 0;
    main.style.left = left + 'px';
    main.style.top = top + 'px';
    document.getElementById('cover').style.left = left + 'px';
    document.getElementById('cover').style.top = top + 'px';
}


//=================================================================================================
function docToHigh(doc, high) //滤波器的dB值转换为纵坐标y值
{
    var tmp;
    var tmp1,tmp2;
    tmp1 = doc;
    tmp2 = (high/80.0) * (40.0-tmp1);    //400 ---- 0, 65----185 纵坐标范围换成:-40dB~~+40dB
    tmp = parseInt(tmp2+0.5);	//加0.5是确保值的变小
    return tmp;
}

function docToWidth_start10(doc, width) //把频率值转换成相对应的坐标x值
{
    var tmp;
    var tmp1,tmp2;
    tmp1 = (Math.log(doc)/Math.LN10)-1;
    tmp2 = width/((Math.log(20000)/Math.LN10)-1);
    tmp = parseInt(tmp1*tmp2);
    return tmp;
}

function docToHighF(doc,high)//滤波器的dB值转换为纵坐标y值 返回浮点值
{
    var tmp1,tmp2;
    tmp1 = doc;
    tmp2 = (high/80.0) * (40.0-tmp1);    //400 ---- 0, 65----185 纵坐标范围换成:-40dB~~+40dB
    return tmp2;
}

function docToWidthF_start10(doc,width)//把频率值转换成相对应的坐标x值 返回浮点值
{
    var tmp;
    var tmp1,tmp2;
    tmp1 = (Math.log(doc)/Math.LN10)-1;
    tmp2 = width/((Math.log(20000)/Math.LN10)-1);
    tmp = tmp1*tmp2;
    return tmp;
}


function docToWidth(doc,width) //把频率值转换成相对应的坐标x值
{
    var tmp;
    var  tmp1,tmp2;
    tmp1 = doc;
    //tmp2 = ((width/3)*log10(tmp1/20));
    tmp2 = ((width/3)*(Math.log(tmp1/20)/Math.LN10));
    tmp = parseInt(tmp2);
    return tmp;
}


function docToWidthF(doc,width) //把频率值转换成相对应的坐标x值
{
    var tmp;
    var  tmp1,tmp2;
    tmp1 = doc;
    //tmp2 = ((width/3)*log10(tmp1/20));
    tmp2 = ((width/3)*(Math.log(tmp1/20)/Math.LN10));
    //tmp = parseInt(tmp2);
    return tmp2;
}

function highToDoc(num, high)//纵坐标Y值转换为滤波器db
{
    var tmp1;
    var  tmp,tmp2;
    tmp1 = num;
    tmp2 = 40.0-tmp1*80.0/high;    //400 ---- 0, 65----185 纵坐标范围换成:-30dB~~+15dB
    if(tmp2>0)
    {
        tmp2 = tmp2+0.5;
    }
    else
    {
        tmp2 = tmp2-0.5;
    }
    tmp = tmp2.toFixed(1);
    return tmp;
}



function widthToDoc_start10(num, width)	//横坐标X转换为滤波器斜率值
{
    var tmp;
    var tmp1,tmp2;
    tmp1 = num*((Math.log(20000)/Math.LN10)-1);
    tmp2 = tmp1/width+1;
    tmp = Math.pow(10,tmp2);
    return parseInt(tmp);
}

function widthToDoc(num,width)
{
    var  tmp;
    var  tmp1,tmp2;
    tmp1 = num;
    tmp2 = 20*Math.pow(10,(tmp1)/(width/3));
    tmp = tmp2;
    if(tmp > 20000)
    {
        tmp = 20000.0;
    }
    if(tmp < 20)
    {
        tmp = 20;
    }
    return parseInt(tmp);
}



function Get_LR_Oct( nOct)             // L-R  斜率
{
	var nLR_Oct = 0;
	switch(nOct)
	{
        case eqType.Oct_12dB:
            nLR_Oct = nOct;
            break;
        case eqType.Oct_18dB:
            nLR_Oct = eqType.Oct_24dB;
            // nLR_Oct = nOct;
            break;
        case eqType.Oct_24dB:
            nLR_Oct = eqType.Oct_36dB;
            // nLR_Oct = nOct;
            break;
        case eqType.Oct_30dB:
            nLR_Oct = eqType.Oct_48dB;
            // nLR_Oct = nOct;
            break;
		default:
            nLR_Oct = nOct;
            break;

	}
	return nLR_Oct;
}

function GetCPEXT_Index(nCPExtNum)                   //得到压缩 扩展的索引值
{
	var val;
	var i,j;
	val = nCPExtNum;
    if(nCPExtNum >11)
	{
       i = (nCPExtNum-1)%10;
	   if(i!==0)
	   {
		   if(i!==5)
		   {
			   j = nCPExtNum/10;
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
	if(val >eqType.Max_CP_Ratio)
	{
		val = eqType.Max_CP_Ratio;
	}
	return val;
}

function CP_Show(nIndex)                       //  得到压缩的显示值
{
	var str,str1;
	var i,j;

	if(nIndex === 1)
	{
		str = "1:1";
	}
	else
	{
		i= (nIndex+9)/10;
		j =(nIndex+9)%10;
		//str1.Format("%d",i);
        str1 = i.toString(10);
		str1 = str1+".";
		//str.Format("%d",j);
        str = j.toString(10);
		str = str1 + str + ":1";
	}
	return str;
}

function Ext_Show(nIndex)                      //  得到扩展的显示值
{
	var str,str1,str2;
	var i,j;
	if(nIndex === 1)
	{
		str = "1:1";
	}
	else
	{
		i= (nIndex+9)/10;
		j =(nIndex+9)%10;
		str2 = "1:";
		//str1.Format("%d",i);
        str1 = i.toString(10);
		str1 = str1+".";
		//str.Format("%d",j);
        str = j.toString(10);
		str = str2+str1+str;
	}
	return str;
}
//===============================================================
var ajaxTimer;
var xmlHttp;
var currentDataForSend;
var strBeReceive;
var timeBeWait;
var timesBeSend;
var isReceive;
var isConnect;

var ajaxTimerServer;
var xmlHttpServer;
var currentDataForSendServer;
var strBeReceiveServer;
var timeBeWaitServer;
var timesBeSendServer;
var isReceiveServer;
var isConnectServer;

function initAjax(){
    timeBeWait = 0;
    timesBeSend = 0;
    isReceive = false;
    isConnect = true;
    getHttpRequest();
    startAjaxTimer();
    startAjaxTimerServer();
}

function getHttpRequest(){
    if(window.XMLHttpRequest){
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlHttp = new XMLHttpRequest();
        xmlHttpServer = new XMLHttpRequest();
        // xmlHttp.keepalive = false;
    }else{
        // IE6, IE5 浏览器执行代码
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        xmlHttpServer = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // if ("withCredentials" in xmlHttp) {
    //     // 此时即支持CORS的情况
    //     // 检查XMLHttpRequest对象是否有“withCredentials”属性
    //     // “withCredentials”仅存在于XMLHTTPRequest level 2对象里
    //     // console.log('支持CORS');
    // } else {
    //     // 否则检查是否支持XDomainRequest
    //     // XDomainRequest仅存在于IE中，是IE用于支持CORS请求的方式
    //     // console.log('IE11以下');
    //     // xmlHttp = new XDomainRequest();
    //     alert('不支持CORS跨域！')
    // }
}

var deviceIp;
function getDeviceIp() {
    var address = document.getElementById('text_device_ip').value;
    address = address.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/);
    // console.log(address);
    if(address){
        deviceIp = 'http://' + address[0];
        // console.log('deviceIp:  ' + deviceIp);
        return true;
    } else {
        deviceIp = '';
        return false;
    }
}

var communicateSpeed;
function startAjaxTimer(){
    maxTime = 250;
    console.log('communicateSpeed:   ' + communicateSpeed);
    ajaxTimer = setInterval(requestData, communicateSpeed); //
    isConnect = true;
    isReceive = true;
    xmlHttpServer.open('post', abType,true);
    // xmlHttp.setRequestHeader('Connection', 'close');
    xmlHttpServer.send('request');
    isServerRe = true;
}


var communicateSpeedServer;
function startAjaxTimerServer(){
    maxTime = 250;
    console.log('communicateSpeed:   ' + communicateSpeedServer);
    ajaxTimerServer = setInterval(requestDataServer, communicateSpeedServer); //
    isConnectServer = true;
    isReceiveServer = true;
}

var abType = '\A';
function abTypeSet() {
    if(abType === '\A'){
        abType = '\B';
    } else {
        abType = '\A';
    }
}

function stopAjaxTimer(){
    clearInterval(ajaxTimer);
    clearInterval(ajaxTimerServer);
}

 var waitCount=0;
 var maxTime = 250; //用于DSP音量渐增
 var dspMark = false;
 var isRe = false;
function requestData(){
    if(waitCount > 1000) {
        stopAjaxTimer();
    }
    if(xmlHttp.readyState === 4 && xmlHttp.status === 200 && isRe){//xmlHttp.readyState === 4 && xmlHttp.status === 200
        strBeReceive = xmlHttp.responseText;
        console.log('strBeReceive: ' + strBeReceive);
        if(strBeReceive){
            xmlHttpServer.open('post', abType,true);
            xmlHttpServer.send(strBeReceive);
            strBeReceive='';
            isRe = false;
            isServerRe = true;
        } else {

            waitCount++;
            console.log('server服务器发送数量： ' + waitCount);
        }
    }
}


var waitCountServer=0;
var maxTimeServer = 250; //用于DSP音量渐增
var dspMarkServer = false;
var waitCountQ = 0;
var isServerRe = false;
function requestDataServer(){
    if(waitCount > 1000) {
        stopAjaxTimer();
    }
    if(xmlHttpServer.readyState === 4 && xmlHttpServer.status === 200 && isServerRe && isServerRe) {//xmlHttp.readyState === 4 && xmlHttp.status === 200
        strBeReceiveServer = xmlHttpServer.responseText;
        console.log('strBeReceiveServer: ' + strBeReceiveServer)
        if (strBeReceiveServer) {
            xmlHttp.open('post', 'http://192.168.1.10', true);
            xmlHttp.send(strBeReceiveServer);
            strBeReceiveServer = '';
            xmlHttpServer.readyState = 0;
            xmlHttpServer.status = 0;
            isRe = true;
        } else {
            waitCountQ++;
            console.log('not server发送数量： ' + waitCount);
        }
        isServerRe = false;
    } else {

    }
}

//=======================================================================================
function stringToBytes ( str, length ) { //not for chinese
  var ch, st, re = [], strHex = [];
  for (var i = 0; i < str.length; i++ ) {
    ch = str.charCodeAt(i);  // get char
    st = [];                 // set up "stack"
    do {
      st.push( ch & 0xFF );  // push byte to stack
      ch = ch >> 8;          // shift value down by 1 byte
    }
    while ( ch );
    // add stack contents to result
    // done because chars have "wrong" endianness
    re = re.concat( st.reverse() );
  }
  // return an array of bytes
    for ( i=0; i<re.length; i++){
      strHex[i] = re[i].toString(16);
    }

    for (i=re.length; i<length; i++){
      re[re.length] = 32;
    }
  return re;
  //  return strHex;
}

function stringToBytesNot32 ( str, length ) { //not for chinese
    var ch, st, re = [], strHex = [];
    for (var i = 0; i < str.length; i++ ) {
        ch = str.charCodeAt(i);  // get char
        st = [];                 // set up "stack"
        do {
            st.push( ch & 0xFF );  // push byte to stack
            ch = ch >> 8;          // shift value down by 1 byte
        }
        while ( ch );
        // add stack contents to result
        // done because chars have "wrong" endianness
        re = re.concat( st.reverse() );
    }
    // return an array of bytes
    for ( i=0; i<re.length; i++){
        strHex[i] = re[i].toString(16);
    }

    for (i=re.length; i<length; i++){
        re[re.length] = 0;
    }
    return re;
    //  return strHex;
}




function bytesToString( by ){
    var ch, str,iNumber;
    str = '';
    for (var i=0; i < by.length; i++ ) {
        iNumber = parseInt(by[i]);
        if(iNumber === 0) {
            ch = ' ';
        } else {
            ch = String.fromCharCode(iNumber);
        }
        str = str + ch;
    }
    return str;
}

function bytesToStringNot32( by ){
    var ch, str,iNumber;
    str = '';
    for (var i=0; i < by.length; i++ ) {
        iNumber = parseInt(by[i]);
        if(iNumber === 0) {
            ch = '';
        } else {
            ch = String.fromCharCode(iNumber);
        }
        str = str + ch;
    }
    // str.trim(); //并无trim()方法
    str = str.replace(/^(\s*)|(\s*)$/g, ''); //去除两边的空格
    return str;
}

function ArrayToString( array) {
    var str;
    str = '';
    for(var i=0; i<array.length; i++){
        str = str + array[i];
    }
    return str;
}

//十六进制字符串转字节数组
function StrToBytes(str)
{
    var pos = 0;
    var len = str.length;
    if(len %2 !== 0) {
       return null;
    }
    len /= 2;
    var hexA = new Array();
    for(var i=0; i<len; i++) {
       var s = str.substr(pos, 2);
       var v = parseInt(s, 16);
       hexA.push(v);
       pos += 2;
    }
    return hexA;
}



//字节数组转十六进制字符串
function BytesToStr(arr) {
    var str = "";
    for(var i=0; i<arr.length; i++) {
       var tmp = arr[i].toString(16);
       if(tmp.length === 1) {
           tmp = "0" + tmp;
       }
       str += tmp;
    }
    return str;
}

function intToHexWith2Digits( iNumber){
    var hex = new Array(2);
    var hexStr = new Array(2);
    hex[1] = parseInt(iNumber/256);
    //hexStr[0] = hex[0].toString(16);
    hex[0] = iNumber%256;
    //hexStr[1] = hex[1].toString(16);
    return hex;
}

function intToHexStringWith2Digits( iNumber){
    var hex = new Array(2);
    var hexStr = new Array(2);
    hex[0] = parseInt(iNumber/256);
    hexStr[0] = hex[0].toString(16);
    hex[1] = iNumber%256;
    hexStr[1] = hex[1].toString(16);
    return hexStr;
}

function hexWith2DigitsToInt( hexStr ) {
    var iNumber;
    var hex = new Array(2);
    hex[0]  = parseInt(hexStr[0],16);
    hex[1]  = parseInt(hexStr[1],16);
    iNumber = hex[0]*256;
    iNumber = iNumber + hex[1];
    return iNumber;
}

function deepCopy(obj) { //慎用deepCopy 因为它会创建新的对象，返回的新的对象，被赋值的对象指向的是新的对象，不是原对象
    var str, newObj;
    newObj = obj.constructor === Array ? [] : {};

    if(typeof obj !== 'object') {
        return;
    } else if (window.JSON) {
        str = JSON.stringify(obj);  //系列化对象
        newObj = JSON.parse(str);
    } else {
        for (var i in obj){
            newObj[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
        }
    }
    return newObj;
}

function deepCopyValue(target, original){

    //不要用JSON的stringify parse   JSON.parse（str)返回的新的对象, target指向新的对象，非原对象
    if((typeof target !== 'object') || (typeof original !== 'object')){

    }else{
        for(var i in original){
            if(typeof original[i] === 'object'){
                deepCopyValue(target[i], original[i]);
            }else{
                target[i] = original[i];
            }
        }
    }
}



function fixHexWithZero(hex){
    var hexStr;
    if (hex > 15){
        hexStr =  hex.toString(16);
    } else if( hex > 0) {
        hexStr = '0' + hex.toString(16);
    } else {
        hexStr = '00';
    }
    return hexStr;
}


function GET_4L_BYTE(data) {
    var result;
    result = data & 0x0f;
    return result;
}

function SET_4L_BYTE(dataH, dataL) {
    var result;
    result = (dataH & 0xf0) + dataL;
    return result;
}

function GET_4H_BYTE(data) {
    var result;
    result = ((data & 0xf0) >> 4);
    return result;
}

function SET_4H_BYTE(dataH, dataL) {
    var result;
    result = ((dataH & 0x0f) << 4) + (dataL & 0x0f);
    return result;
}

function toStringFloat(data, digits) {
    var result;
    result = Number(data);
    result = result.toFixed(digits);
    result = result.toString();
    return result;
}


function setElementLanguageValue(id, chV, enV, chS, enS, chL, enL, chT, enT) {
    var element = document.getElementById(id);
    // console.log(id);
    if(chV && enV) {
        element.innerText = isChinese ? chV : enV;
    }
    if(chS && enS){
        element.style.fontSize = (isChinese ? chS : enS) + 'px';
    }
    if(chL && enL){
        element.style.left = (isChinese ? chL : enL) + 'px';
    }
    if(chT && enT){
        element.style.top = (isChinese ? chT : enT) + 'px';
    }
}

function setSelectElementLanguageValue(id, chV, enV, index) {
    var selectElement = document.getElementById(id);
    selectElement.options[index].innerText = isChinese ? chV : enV;
}

function setLabelElementLanguageValue(id, chV, enV, chS, enS, chL, enL, chT, enT) {
    var element = document.getElementById(id);
    var eHtml = element.innerHTML;
    if(isChinese) {
        element.innerHTML = eHtml.replace(enV, chV);
    } else {
        element.innerHTML = eHtml.replace(chV, enV);
    }
    if(chS && enS){
        element.style.fontSize = (isChinese ? chS : enS) + 'px';
    }
    if(chL && enL){
        element.style.left = (isChinese ? chL : enL) + 'px';
    }
    if(chT && enT){
        element.style.top = (isChinese ? chT : enT) + 'px';
    }
}


function setDeviceTypeDisplay(type) { //24 26 28 36 46 48

    switch(type) {
        case 24:
            setMainTypeDisplay(2, 4);
            break;
        case 26:
            setMainTypeDisplay(2, 6);
            break;
        case 28:
            setMainTypeDisplay(2, 8);
            break;
        case 36:
            setMainTypeDisplay(3, 6);
            break;
        case 46:
            setMainTypeDisplay(4, 6);
            break;
        case 48:
        default:
            setMainTypeDisplay(4, 8);
            break;
    }
}


function setMainTypeDisplay(inN, outN) {
    var inArray = new Array(4);
    var outArray = new Array(8);
    var i;
    inArray[0] = document.getElementById('input_a');
    inArray[1] = document.getElementById('input_b');
    inArray[2] = document.getElementById('input_c');
    inArray[3] = document.getElementById('input_d');

    outArray[0] = document.getElementById('out_1');
    outArray[1] = document.getElementById('out_2');
    outArray[2] = document.getElementById('out_3');
    outArray[3] = document.getElementById('out_4');
    outArray[4] = document.getElementById('out_5');
    outArray[5] = document.getElementById('out_6');
    outArray[6] = document.getElementById('out_7');
    outArray[7] = document.getElementById('out_8');

    inN = inN > inArray.length ? inArray.length : inN;
    outN = outN > outArray.length ? outArray.length : outN;

    for(i=0; i<inArray.length; i++){
        if(i<inN){
            inArray[i].style.display = 'inline';
        } else {
            console.log('输入通道隐藏: ' + i);
            inArray[i].style.display = 'none';
        }
    }

    for(i=0; i<outArray.length; i++){
        if(i<outN){
            outArray[i].style.display = 'inline';
        } else {
            console.log('输出通道隐藏: ' + i);
            outArray[i].style.display = 'none';
        }
    }
}

//判断当前浏览类型
function BrowserType()
{
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isIE11 = userAgent.indexOf("rv:11.") > -1 && !isOpera;
    var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE)
    {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7)
        { return "IE";}     //IE7
        else if(fIEVersion == 8)
        { return "IE";}     //IE8
        else if(fIEVersion == 9)
        { return "IE";}     //IE9
        else if(fIEVersion == 10)
        { return "IE";}     //IE10
        else if(fIEVersion == 11)
        { return "IE";}     //IE11
        else
        { return "0"}//IE版本过低
    }//isIE end

    if(isIE11){
        return 'IE';
    }

    if (isFF) { return "FF";}
    if (isOpera) { return "Opera";}
    if (isSafari) { return "Safari";}
    if (isChrome) { return "Chrome";}
    if (isEdge) { return "Edge";} //microsfot dege

    return "unknown";
}


//判断是否是IE浏览器
function isIE()
{
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    if(isIE)
    {
        return "1";
    }
    else
    {
        return "-1";
    }
}


//判断是否是IE浏览器，包括Edge浏览器
function IEVersion()
{
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
    if(isIE)
    {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7)
        { return "IE7";}
        else if(fIEVersion == 8)
        { return "IE8";}
        else if(fIEVersion == 9)
        { return "IE9";}
        else if(fIEVersion == 10)
        { return "IE10";}
        else if(fIEVersion == 11)
        { return "IE11";}
        else
        { return "0"}//IE版本过低
    }
    else if(isEdge)
    {
        return "Edge";
    }
    else
    {
        return "-1";//非IE
    }
}


function exitDialogProgram() {
    curtainOption(0);
}



