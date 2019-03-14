document.write("<script language=javascript src='./javascripts/jquery-3.3.1.min.js'></script>");
document.write("<script language=javascript src='./javascripts/echarts.min.js'></script>");
document.write("<script language=javascript src='./javascripts/globalData.js'></script>");

var mixArray = [];

var kLineGraphic,kLineGraphicLong;

function initMainPage() {

    var main = document.getElementById("main_curtain");

    var optionId,optionName;
    for(var i=1; i<=102; i++){
        optionId = 'option_item_name' + i;
        optionName = document.getElementById(optionId);
        optionName.innerText = optionNameShort[i-1];
        optionName.setAttribute('value', optionNameShort[i-1]);
        optionName.setAttribute('name', optionNameShort[i-1]);
        if(i > optionNameShort.length-1){
            optionName.innerText = "";
            optionName.setAttribute('value', "");
            optionName.setAttribute('name', "");
        }
    }
    getAllShareData();

    setOptionButtonListen();
    setMixButtonListen();
    setListButtionListen();
    setMixButtonDownUp();
    addCodeListMouseWheel();
    addKLineGraphicWheelListener();
    setKLineGraphicUpDown();
    //alert("test");
    //$("#content").hide(5000);

    // // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(document.getElementById('main'));
    //
    // // 指定图表的配置项和数据
    // var option = {
    //     title: {
    //         text: 'ECharts 入门示例'
    //     },
    //     tooltip: {},
    //     legend: {
    //         data:['销量']
    //     },
    //     xAxis: {
    //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子","外套","毛衣","羊毛衫","雪纺衫","裤子","高跟鞋","袜子","外套","毛衣"]
    //     },
    //     yAxis: {},
    //     series: [{
    //         name: '销量',
    //         type: 'bar',
    //         data: [5, 20, 36, 10, 10, 20, 10, 150, 20, 36, 10, 10, 20, 10, 150]
    //     }]
    // };
    //
    // // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(option);

    kLineGraphic = echarts.init(document.getElementById('k_line_graphic'));
    kLineGraphicLong = echarts.init(document.getElementById('k_line_graphic_long'));
    $('#k_line_graphic').show();
    $('#k_line_graphic_long').hide();

    document.getElementById('test_button1').onclick = function(ev){
        optionSlideToggle();
    };


    document.getElementById('test_button2').onclick = function(ev){
        console.log('test2');

        // $('#data_condition_curtain').animate({left:'300',opacity:100},1000,function(){
        //     $('#data_condition_curtain').css({display:'visible'})
        // })
    };



    $('#button_waterfall_scatter').click(function(){
        // $.get('users',function(err){
        //
        // })
        $(location).attr('href', './gap_min_table');
    });


    $('#button_waterfall_table_newest').click(function(){
        // $.get('users',function(err){
        //
        // })
        $(location).attr('href', './gap_min_scatter');
    });



    $('#button_waterfall_kline_newest').click(function(){
        // $.get('users',function(err){
        //
        // })
        $(location).attr('href', './waterfall_kline');
    });
}


var optionToggle = true;
function optionSlideToggle(){
    if(optionToggle){
        $('#data_condition_curtain').slideUp('fast');
        $('#option_mix_list').slideUp('fast');
        $('#data_display_curtain').width($('#data_display_curtain').width() + 565);
        $('#k_line_graphic').width($('#k_line_graphic').width() + 565);
        //kLineGraphic.length = 0;
        //kLineGraphic = echarts.init(document.getElementById('k_line_graphic'));
        kLineGraphicLong.setOption(option);
        $('#k_line_graphic').hide();
        $('#k_line_graphic_long').show();
        optionToggle = false;
    }else{
        $('#data_condition_curtain').slideDown('fast');
        $('#option_mix_list').slideDown('fast');
        $('#data_display_curtain').width($('#data_display_curtain').width() - 565);
        $('#k_line_graphic').width($('#k_line_graphic').width() - 565);
        //kLineGraphic.setOption(option);
        $('#k_line_graphic').show();
        $('#k_line_graphic_long').hide();
        optionToggle = true;
    }
}


function setOptionButtonListen(){
    var optionId,optionName;
    for(var i=1; i<=102; i++){
        optionId = 'option_item' + i;
        optionName = document.getElementById(optionId);
        optionName.addEventListener('click',optionButtonListener );
    }
}



function setMixButtonListen(){
    var optionId,optionName;
    for(var i=1; i<=34; i++){
        optionId = "option_mix_item" + i;
        optionName = document.getElementById(optionId);
        optionName.innerText = '';
        optionName.setAttribute('value', '');
        optionName.setAttribute('name', '');
       // optionName.addEventListener('click', mixButtonListener);
    }
}


function setMixButtonDownUp(){
    var elementId,element;
    for(var i=1; i<=34; i++){
        elementId = "option_mix_item" + i;
        element = document.getElementById(elementId);
        addMixButtonDownEvent(element, i);
        addMixButtonUpEvent(element, i);
    }
}


var paramsOfMixButton = {
    index: 1,
    isDown: false,
    isUp: false,
    downTimes: 0
};

var mixButtonInterval;

function addMixButtonDownEvent(element, index){

    element.onmousedown = function(event){
        paramsOfMixButton.index = index;
        paramsOfMixButton.isDown = true;
        paramsOfMixButton.isUp = false;
        mixButtonInterval = setInterval(function(){paramsOfMixButton.downTimes++;}, 200);
    }

}


function addMixButtonUpEvent(element, index){

    element.onmouseup = function(event){
        //console.log('up:' + index);
        paramsOfMixButton.isUp = true;
        paramsOfMixButton.index = index;
        if(paramsOfMixButton.isDown){
            paramsOfMixButton.isDown = false;
            if(paramsOfMixButton.downTimes>1){
                moveMixButton();
            }else{
                setMixButtonClick(index-1);
            }
            clearInterval(mixButtonInterval);
        }
    }
}


function moveMixButton(){
    var elementId,temp,upMovements,i;

    //console.log('move:' + "  paramsOfMixButton.index:" + paramsOfMixButton.index + "  mixArray.length:" + mixArray.length);

    if(paramsOfMixButton.index > mixArray.length){
        return;
    }


    upMovements = mixArray.length - paramsOfMixButton.downTimes;
    upMovements = upMovements<0?0:upMovements;

    //console.log(mixArray);
    //console.log(paramsOfMixButton.index-1);
    temp = mixArray[paramsOfMixButton.index-1];
    mixArray.splice(paramsOfMixButton.index-1,1);
    mixArray.splice(upMovements,0,temp);
    //console.log(mixArray);

    for(i=0; i<mixArray.length; i++){
        elementId = 'option_mix_item' + (i+1);
        setElementText(elementId, mixArray[i]);
    }
    paramsOfMixButton.downTimes = 0;
}

function setListButtionListen(){
    var optionId,optionName;
    for(var i=1; i<=20; i++){
        optionId = "navigator_item" + i;
        optionName = document.getElementById(optionId);
        optionName.addEventListener('click', listButtonListener);
    }
}

function listButtonListener(e){
    var elementId,element,index,code,name;
    elementId = e.target.id;
    index = elementId.match(/\d+/g);
    elementId = 'navigator_item_code' + index;
    element = document.getElementById(elementId);
    code = element.innerText;
    elementId = 'navigator_item_name' + index;
    element = document.getElementById(elementId);
    name = element.innerText;
    getKLineData(code, name);
    updateOptionSequence(code);
    updateCodeListColor(index);
    //console.log(code);
}

function optionButtonListener(e){

    //alert(e.target.textContent);
    var elementId,index,i,optionId,elementText,optionName;
    elementId = e.target.id;
    elementText = e.target.textContent.trim();
    index = elementId.match(/\d+/g) - 1;
    //alert(index);

    for(i=0; i<mixArray.length; i++){
       if( elementText === mixArray[i]){
           return;
       }
    }
    mixArray.push(optionNameShort[index]);

    optionId = 'option_mix_item' + mixArray.length;
    optionName = document.getElementById(optionId);
    optionName.innerText = mixArray[mixArray.length-1];
    optionName.setAttribute('value', mixArray[mixArray.length-1]);
    optionName.setAttribute('name', mixArray[mixArray.length-1]);


    var codeArray = [], tempArray=[];
    //console.log(optionA[getOptionArrayIndex(mixArray[mixArray.length-1])].length);
    if(optionA[getOptionArrayIndex(mixArray[mixArray.length-1])].length===0) {
        $.post('shareList',{'data':elementText },function(data,status){
            optionA[getOptionArrayIndex(mixArray[mixArray.length-1])] = deepCopy(data);
            for(i=0; i<mixArray.length; i++) {
                codeArray.push(optionA[getOptionArrayIndex(mixArray[i])]);
            }
            mixDataArray(codeArray);
            if(arrayMix){
                updateCodeList(0);
            }
        });
    }else{
        //console.log('data is exit');
        for(i=0; i<mixArray.length; i++) {
            codeArray.push(optionA[getOptionArrayIndex(mixArray[i])]);
        }
        mixDataArray(codeArray);
        if(arrayMix){
            updateCodeList(0);
        }
    }

}



function setMixButtonClick(index){

    var optionId,optionName,i;

    mixArray.splice(index, 1);
    //console.log('mixLength:' + mixArray.length);

    if(mixArray.length <= 0){
        optionName = document.getElementById('option_mix_item1');
        optionName.innerText = '';
        optionName.setAttribute('value', '');
        optionName.setAttribute('name', '');
        arrayMix = [];
        updateCodeList(0);
        return;
    }

    for(i=0; i < mixArray.length; i++){
        optionId = "option_mix_item" + (i + 1);
        optionName = document.getElementById(optionId);
        optionName.innerText = mixArray[i];
        optionName.setAttribute('value', mixArray[i]);
        optionName.setAttribute('name', mixArray[i]);
    }

    optionId = "option_mix_item" + (mixArray.length + 1);
    optionName = document.getElementById(optionId);
    optionName.innerText = '';
    optionName.setAttribute('value', '');
    optionName.setAttribute('name', '');
    //console.log(mixArray);

    var codeArray = [], tempArray=[];
    for(i=0; i<mixArray.length; i++) {
        tempArray = deepCopy(optionA[getOptionArrayIndex(mixArray[i])]); //create the new array
        codeArray.push(tempArray);
    }
    mixDataArray(codeArray);
    //console.log(arrayMix);

    if(arrayMix){
        updateCodeList(0);
    }
}


function updateCodeList(startIndex){
    var i, itemNameId,itemCodeId;

    for(i=0;i<20;i++){
        itemNameId = 'navigator_item_name' + (i + 1);
        itemCodeId = 'navigator_item_code' + (i + 1);
        setElementText(itemNameId, '');
        setElementText(itemCodeId, '');
    }

    for(i=startIndex; i<arrayMix.length;i++){
        itemNameId = 'navigator_item_name' + (i + 1);
        itemCodeId = 'navigator_item_code' + (i + 1);
        setElementText(itemNameId, arrayMix[i][1]);
        setElementText(itemCodeId, arrayMix[i][0]);
        if(i>18){
            break;
        }
    }

    setElementText("list_item_counts", arrayMix.length);
   // $("#list_item_counts").innerText = arrayMix.length;

    updateOptionItemColor();
    updateMixItemColor();
}

function setElementText(elementId,text){
    var element = document.getElementById(elementId);
    element.innerText = text;
    element.setAttribute('value', text);
    element.setAttribute('name', text);
}


function getOptionArrayIndex(textContent){
    var i;

    for(i=0; i<optionNameShort.length; i++){
        if(textContent === optionNameShort[i]){
            return i;
        }
    }
}


function updateOptionSequence(code){
    var i,j,value;
    var sequenceId,sequence;

    //console.log(code);
    //console.log(optionA[0][0][0]);
    for(i=0; i<optionA.length; i++){
        value = 0;
        for(j=0; j<optionA[i].length; j++){
            if(code === optionA[i][j][0]){
                value = j+1;
                //console.log(j);
                break;
            }
        }
        sequenceId = "option_item_sequence" + (i+1);
        sequence = document.getElementById(sequenceId);
        //console.log("code:" + code + "  value:" + value);
        sequence.innerText = value.toString();
    }

}

function getAllShareData(){
    var elementText;
    for(var i=0 ;i<optionNameShort.length; i++){
        elementText = optionNameShort[i];
        getShareData(elementText); //function getShareData will create elementText for every call;
    }
}

//var getDataIndex = 0;
function getShareData(elementText){
    if(optionA[getOptionArrayIndex(elementText)].length === 0){
        $.post('shareList',{'data':elementText },function(data,status){
            optionA[getOptionArrayIndex(elementText)] = deepCopy(data);
            //getDataIndex++;
            //console.log(getDataIndex);
        });
    }
}


var mixItemColorArray =
        ['red','CornflowerBlue','DarkRed','LightSkyBlue','LightSeaGreen','LightSalmon',
        'LightPink','Blue','Black','BurlyWood','Crimson','DarkSlateGray',
        'HotPink','Indigo','GoldenRod','Gold','GhostWhite','LightSlateGray',
        'DodgerBlue','DarkTurquoise','DarkSeaGreen','DarkSalmon','Darkorange','DarkMagenta',
        'DarkKhaki','DarkCyan','Cyan','Cornsilk','Coral','Chartreuse',
        'BlanchedAlmond','Beige','Aquamarine','Aqua','AntiqueWhite','AliceBlue'];

function updateOptionItemColor(){
    var i;
    var elementId, element,index;
    for(i=1; i<=102; i++){
        elementId = 'option_item_name' + i;
        element = document.getElementById(elementId);
        element.style.color = 'grey'
    }

    for(i=0; i<mixArray.length; i++){
        index = getOptionArrayIndex(mixArray[i]);
        elementId = 'option_item_name' + (index + 1);
        element = document.getElementById(elementId);
        element.style.color = mixItemColorArray[i];
    }
}

function updateMixItemColor(){
    var elementId, element;
    var i;

    for(i=1; i<=34; i++){
        elementId = 'option_mix_item' + i;
        element = document.getElementById(elementId);
        element.style.color = 'grey';
    }

    for(i=0; i< mixArray.length; i++){
        elementId = 'option_mix_item' + (i+1);
        element = document.getElementById(elementId);
        element.style.color = mixItemColorArray[i];

    }
}


function updateCodeListColor(index){
    var elementId, element;

    for(var i=1; i<=20; i++){
        elementId = 'navigator_item_name' + i;
        element = document.getElementById(elementId);
        element.style.color = '#00b7ff';
    }

    if(index === 0){
        return;
    }

    elementId = 'navigator_item_name' + index;
    element = document.getElementById(elementId);
    element.style.color = 'red';
}

var codeStartIndex = 0;
function addCodeListMouseWheel(){
    var element,event,down;


    element = document.getElementById('navigator_content');
    element.onmousewheel = function(e){
        event = e || window.event;

        if (event.preventDefault) {
            event.preventDefault();
        }else {
            event.returnValue = false;
        }


        down = event.wheelDelta?event.wheelDelta<0:event.detail>0;
        if(down){
            codeListMove(false);
        }else {
            codeListMove(true);
        }
    }
}

function codeListMove(isUp){

    if(isUp){
        codeStartIndex--;
        if(codeStartIndex < 1){
            codeStartIndex = 1;
        }
    } else {
        codeStartIndex++;
        if(arrayMix.length-codeStartIndex<=20){
            codeStartIndex = (arrayMix.length - 20) +1;
        }
    }

    //console.log(codeStartIndex);
    setElementText("start_index_number", codeStartIndex);
    updateCodeListOfWheel(codeStartIndex-1);

}


function updateCodeListOfWheel(startIndex){
    var i, itemNameId,itemCodeId;

    if(arrayMix.length<1){
        return;
    }

    for(i=0;i<20;i++){
        itemNameId = 'navigator_item_name' + (i + 1);
        itemCodeId = 'navigator_item_code' + (i + 1);
        setElementText(itemNameId, '');
        setElementText(itemCodeId, '');

    }

    var j=startIndex;
    for(i=0; i<20;i++){
        itemNameId = 'navigator_item_name' + (i + 1);
        itemCodeId = 'navigator_item_code' + (i + 1);
        setElementText(itemNameId, arrayMix[j][1]);
        setElementText(itemCodeId, arrayMix[j][0]);
        j++;
        if(j >= arrayMix.length){
            break;
        }
    }


    // $("#list_item_counts").innerText = arrayMix.length;

    updateCodeListColor(0);
    updateOptionItemColor();
    updateMixItemColor();
}


var kLineDate = [];
var kLineData = [];
function getKLineData(code, name){
    kLineDate.length = 0;
    kLineData.length = 0;
    $.post('kLineData',{'data':code },function(data,status){
        //console.log(data.length);
        // for(var i=0; i<data.length; i++){
        //     kLineDate.push(data[i][0]);
        //     kLineData.push([data[i][1], data[i][2], data[i][3], data[i][4]]);
        // }
        fullDataOfK = deepCopy(data);
        var length = 200;
        length = length < data.length ? length : data.length;
        translationSteps = data.length - length;
        for(var i=data.length - length; i<data.length; i++){
            kLineDate.push(data[i][0]);
            kLineData.push([data[i][1], data[i][2], data[i][3], data[i][4]]);
        }
        //console.log(kLineDate);
        //console.log(kLineData);
        updateKlineData(code, name);
    });
}

var option;
function updateKlineData(code, name){


    var shareName = name;
    var shareCode = code;


    option = {
        title : {
            text: shareName + ' : ' + shareCode
        },
        tooltip : {
            trigger: 'axis',
            formatter: function (params) {
                var res = params[0].seriesName + ' ' + params[0].name;
                res += '<br/>  open : ' + params[0].value[0] + '  top : ' + params[0].value[3];
                res += '<br/>  close : ' + params[0].value[1] + '  bottom : ' + params[0].value[2];
                return res;
            }
        },
        legend: {
            data:[shareCode]
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataZoom : {show: true},
                dataView : {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        dataZoom : {
            show : false,
            realtime: true,
            start : 0,
            end : 100
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : true,
                axisTick: {onGap:false},
                splitLine: {show:false},
                data : kLineDate

            }
        ],
        yAxis : [
            {
                type : 'value',
                scale:true,
                boundaryGap: [0.01, 0.01]
            }
        ],
        series : [
            {
                name: shareCode,
                type:'k',
                data: kLineData

            }
        ]
    };

    option.dataZoom.start = 1;

    if(optionToggle){
        kLineGraphic.setOption(option);
    }else{
        kLineGraphicLong.setOption(option);
    }

}



function addKLineGraphicWheelListener(){
    var element,elementId;

    elementId = 'k_line_graphic';
    element = document.getElementById(elementId);
    element.onmousewheel = function(e){
        event = e || window.event;

        if (event.preventDefault) {
            event.preventDefault();
        }else {
            event.returnValue = false;
        }


        var down = event.wheelDelta?event.wheelDelta<0:event.detail>0;
        if(down){
            option.dataZoom.start++;
            if(option.dataZoom.start > 10000){
                option.dataZoom.start = 100;
            }
            if(optionToggle){
                kLineGraphic.setOption(option);
            }else{
                kLineGraphicLong.setOption(option);
            }
        }else {
            option.dataZoom.start--;
            if(option.dataZoom.start < 10){
                option.dataZoom.start = 10;
            }
            if(optionToggle){
                kLineGraphic.setOption(option);
            }else{
                kLineGraphicLong.setOption(option);
            }
            codeListMove(true);
        }
    }
}

function setKLineGraphicUpDown(){
    //document.getElementById('k_line_graphic').addEventListener('keydown', keyDownRespond )
    window.onkeydown = keyDownRespond;
}


function keyDownRespond(ev){
    var e = window.event || e;
    var code =  e.keyCode;

    // if (event.preventDefault) {
    //     event.preventDefault();
    // }else {
    //     event.returnValue = false;
    // }


    if(code === 38){        //key: up
        if (event.preventDefault) {
            event.preventDefault();
        }else {
            event.returnValue = false;
        }

        option.dataZoom.start++;
        if(option.dataZoom.start>10000){
            option.dataZoom.start = 100;
        }
        if(optionToggle){
            kLineGraphic.setOption(option);
        }else{
            kLineGraphicLong.setOption(option);
        }
        //console.log('key up');
        return true;
    }else if(code === 40){  //key: down
        if (event.preventDefault) {
            event.preventDefault();
        }else {
            event.returnValue = false;
        }

        option.dataZoom.start--;
        if(option.dataZoom.start<10){
            option.dataZoom.start = 10;
        }
        if(optionToggle){
            kLineGraphic.setOption(option);
        }else{
            kLineGraphicLong.setOption(option);
        }
        //console.log('key down');
        return true;
    } else if(code === 37){ //left key
        if (event.preventDefault) {
            event.preventDefault();
        }else {
            event.returnValue = false;
        }


        translationKGraphicLine(true);
    } else if(code === 39){ //right key

        if (event.preventDefault) {
            event.preventDefault();
        }else {
            event.returnValue = false;
        }

        translationKGraphicLine(false);
    }


    return false;
}



var dataStartIndexOfK, dataLengthOfK;
var fullDataOfK = [];
var translationSteps=0;

function translationKGraphicLine(isLeft){
    var i, length,index;
    length = 100;
    length = length < fullDataOfK.length? length:fullDataOfK.length;
    console.log(translationSteps);

    if ((fullDataOfK.length - translationSteps) < 100){
        return;
    }

    if(isLeft){


        if ((fullDataOfK.length - translationSteps) < 99){
            return;
        }
        translationSteps++;
        //length = translationSteps < fullDataOfK.length-100 ? length : fullDataOfK.length-100;

    }else{
        translationSteps--;
        if (translationSteps < 0){
            translationSteps = 0;
            return;
        }
    }
    kLineDate.length = 0;
    kLineData.length = 0;
    for(i=0; i<length; i++){
        index = i+translationSteps;
        console.log('fullDataOfK.length: ' +  fullDataOfK.length + '  index: ' + index);
        kLineDate.push(fullDataOfK[index][0]);
        kLineData.push([fullDataOfK[index][1], fullDataOfK[index][2], fullDataOfK[index][3], fullDataOfK[index][4]]);
    }

    option.xAxis[0].data = kLineDate;
    option.series[0].data  = kLineData;

    if(optionToggle){
        kLineGraphic.setOption(option);
    }else{
        kLineGraphicLong.setOption(option);
    }
}













//========================================================================================================================================






//========================================================================================================================================
//========================================================================================================================================
function deepCopy(obj) {
    var str, newObj;
    newObj = obj.constructor === Array ? [] : {};

    if(typeof obj !== 'object') {
        return;
    } else if (window.JSON) {
        str = JSON.stringify(obj);  //系列化对象
        newObj = JSON.parse(str);
    } else {
        for (var i in obj){
            newObj[i] = typeof obj[i] === 'objcet' ? deepCopy(obj[i]) : obj[i];
        }
    }
    return newObj;
}