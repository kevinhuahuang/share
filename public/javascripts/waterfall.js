document.write("<script language=javascript src='./javascripts/jquery-3.3.1.min.js'></script>");
document.write("<script language=javascript src='./javascripts/echarts.min.js'></script>");
document.write("<script language=javascript src='./javascripts/globalData.js'></script>");
document.write("<script language=javascript src='./javascripts/getTableDataLevel.js'></script>");

var isMine = false;
function initMainPage() {


    //initWidget();
    initKLineElement();
    updateDataScreen(8);

    initToolButton();
    initOptionList();
    getAllWaterfallData();
    initOptionItemOnClick();
    addCodeListMouseWheel();
    initMixMark(-1);
    setCodeListButtonListen();

    queryTableData('day2 asc');
    addTableClickListener();

    //initTableLevelValue();
    $('#data_screen_curtain').css('display', 'inline');
    $('#waterfall_table').css('display', 'none');
    $('#cell_level_config_curtain').css('display','none');

    addDataScreenClick();
    initKLineSelector();

    addShareCodeChangeListener();
    addShareNameChangeListener();

    addAddDelButtonListener();

}


var table_kline_toggle = false;
var isConfig = false;
function initToolButton(){

    $('#table_cell_level').click(function(e){
        isConfig = !isConfig;
        if(isConfig){
            $('#data_screen_curtain').css('visibility', 'hidden').css('display', 'none');
            $('#waterfall_table').css('visibility', 'hidden').css('display', 'none');
            $('#cell_level_config_curtain').css('visibility','visible').css('display', 'inline');
            $('#table_cell_level').text('返回图表显示');
        }else{
            $('#data_screen_curtain').css('visibility', 'visible').css('display', 'inline');
            $('#waterfall_table').css('visibility', 'hidden').css('display', 'none');
            $('#cell_level_config_curtain').css('visibility','hidden').css('display', 'none');
            $('#table_cell_level').text('等级显示');
        }
    });

    $('#table_sequence').click(function(){
        dataSequence = !dataSequence;
        if (dataSequence) {
            $('#table_sequence').text('最小值-->').css('color', 'red');
        }else{
            $('#table_sequence').text('最大值-->').css('color', 'blue');
        }
    });

    $('#table_kline_toggle').text('显示表格').click(function(){
        if(table_kline_toggle){
            //console.log('true');
            table_kline_toggle = false;
            $('#cell_level_config_curtain').css('display', 'none').css('visibility','hidden');
            $('#data_screen_curtain').css('display', 'inline').css('visibility', 'visible');
            $('#waterfall_table').css('display', 'none').css('visibility', 'hidden');
            $('#table_kline_toggle').text('显示表格');
        }else{
            //console.log('false');
            table_kline_toggle = true;
            $('#cell_level_config_curtain').css('display', 'none').css('visibility','hidden');
            $('#data_screen_curtain').css('display', 'none').css('visibility', 'hidden');
            $('#waterfall_table').css('display', 'inline').css('visibility', 'visible');
            $('#table_kline_toggle').text('显示K线图');
        }

    });

    $('#two_screen').click(function () {
        //console.log('two_screen');
        updateDataScreen(2);
    });

    $('#three_screen').click(function () {
        //console.log('three_screen');
        updateDataScreen(3);
    });

    $('#four_screen').click(function () {
        //console.log('four_screen');
        updateDataScreen(4);
    });

    $('#eight_screen').click(function () {
        //console.log('eight_screen');
        updateDataScreen(8);
    });

    $('#navigator_option_mine').click(function (){
        var  arrayTemp=[];
        if(isMine){
           isMine =  false;
           arrayTemp.push(optionWaterfall[0]);
           mixCodeListArray(arrayTemp);
            $('#navigator_option_mine').html('Options');
        }else{
           isMine = true;
           arrayTemp.push(mineCodeNameArray);
           mixCodeListArray(arrayTemp);
            $('#navigator_option_mine').html('Mine');
        }

        var idNameString,idCodeString;
        for(var i=0;i<codeListLength;i++){
            idNameString = '#code_list_item_name' + (i+1);
            $(idNameString).text('');
            idCodeString = '#code_list_item_code' + (i+1);
            $(idCodeString).text('');
        }
        updateCodeListDisplay(true,1);
    });


    $('#button_kline_main').click(function () {
        window.location.href='../start_page';
    });

    $('#button_kline_scatter').click( function () {
        window.location.href = '../gap_min_scatter';
    });

    $('#button_kline_table').click( function () {
        window.location.href = '../gap_min_table';
    });

    $('#button_kline_declare').click( function () {
        window.location.href = '../instruction';
    });
}

function initCodeListDisplay() {
    var  arrayTemp=[];
    isMine = true;
    if(isMine){
        isMine =  false;
        arrayTemp.push(optionWaterfall[0]);
        mixCodeListArray(arrayTemp);
    }else{
        isMine = true;
        arrayTemp.push(mineCodeNameArray);
        mixCodeListArray(arrayTemp);
    }

    var idNameString,idCodeString;
    for(var i=0;i<codeListLength;i++){
        idNameString = '#code_list_item_name' + (i+1);
        $(idNameString).text('');
        idCodeString = '#code_list_item_code' + (i+1);
        $(idCodeString).text('');
    }
    updateCodeListDisplay(true,1);
}

function updateDataScreen(screens){
    var dataCurtain = $('#data_curtain');
    var dataCurtainHeight = dataCurtain.innerHeight();
    var dataCurtainWidth = dataCurtain.innerWidth();

    var i,screenElement;

    if(screens < 8){
        dataCurtainWidth = dataCurtainWidth-200;
        for(i=1; i<=screens; i++){
            $('#data_screen' + i).css({display:"inline",top:(dataCurtainHeight/screens)*(i-1)+5, left:10})
                .innerHeight(dataCurtainHeight/screens - 10)
                .innerWidth(dataCurtainWidth);
            $('#k_line_graphic_' + i).css({top:30, left:5})
                .innerHeight(dataCurtainHeight/screens - 45)
                .innerWidth(dataCurtainWidth-15);
        }

        for(i=screens+1; i<9; i++){
            $('#data_screen' + i).css({display:"none"});
        }
    }else{
        dataCurtainWidth = (dataCurtainWidth -200)/2;
        for(i=1; i<=4; i++){
            $('#data_screen' + i).css({display:"inline",top:(dataCurtainHeight/4)*(i-1)+5, left:10})
            .innerHeight(dataCurtainHeight/4 - 10)
            .innerWidth(dataCurtainWidth);
            $('#k_line_graphic_' + i).css({top:30, left:5})
                .innerHeight(dataCurtainHeight/4 - 45)
                .innerWidth(dataCurtainWidth-15);
        }

        for(i=5; i<=8; i++){
            screenElement = '#data_screen' + i;
            $('#data_screen' + i).css({display:"inline",top:(dataCurtainHeight/4)*(i-5)+5, left:dataCurtainWidth+20})
            .innerHeight(dataCurtainHeight/4 - 10)
            .innerWidth(dataCurtainWidth);
            $('#k_line_graphic_' + i).css({top:30, left:5})
                .innerHeight(dataCurtainHeight/4 - 45)
                .innerWidth(dataCurtainWidth-15);
        }

    }
    //initKLineElement();
    for(i=0;i<8;i++){
        kLineGraphic[i].resize();
    }

}


function initOptionList(){
    var i,id;
    for(i=0; i<optionWaterfallName.length; i++){
        id = '#option_item_name' + (i+1);
        $(id).text(optionWaterfallName[i]);
    }
}

var waterfallDay2 = [];
var waterfallDay3 = [];
var waterfallDay4 = [];
var waterfallDay5 = [];
var waterfallDay6 = [];
var waterfallDay7 = [];
var waterfallDay8 = [];
var waterfallDay9 = [];
var waterfallDay10 = [];
var waterfallDay30 = [];
var waterfallDay90 = [];
var waterfallDay180 = [];
var waterfallDay360 = [];


var optionWaterfallName = ['day2','day3','day4','day5','day6','day7','day8','day9','day10','day30','day90','day180','day360'];

var optionWaterfall = [
    waterfallDay2,
    waterfallDay3,
    waterfallDay4,
    waterfallDay5,
    waterfallDay6,
    waterfallDay7,
    waterfallDay8,
    waterfallDay9,
    waterfallDay10,
    waterfallDay30,
    waterfallDay90,
    waterfallDay180,
    waterfallDay360
];


var shareNameCode = [];
var userName = 'kevin';
function getAllWaterfallData(){
    $.post('/waterfall_kline/shareNameCode',function(data,status){
        if(status === 'success'){
            shareNameCode = deepCopy(data);
            //console.log('read shareNameCode success');
            console.log('shareNameCode.length:'+ shareNameCode.length);
            $('#option_item0').trigger('click');
        }else{
            console.log('read shareNameCode fail');
        }
    });

    $.post('/waterfall_kline/optionalCodeRead',{'data':userName},function(data,status){
        if(status === 'success'){
            optionalCodeArray = deepCopy(data);
            //console.log('read shareNameCode success');
            //console.log('optionalCodeArray:' + optionalCodeArray);
            for(var t=0; t<optionalCodeArray.length; t++){
                mineCodeNameArray.push([optionalCodeArray[t],getShareName(optionalCodeArray[t])]);
            }
            initCodeListDisplay();
        }else{
            console.log('read optional code fail');
        }
    });


    for(var i=0; i<optionWaterfallName.length;i++){
        getWaterfallData(optionWaterfallName[i]);
    }
}

var mineCodeNameArray = [];


function getShareName(code){
    console.log(code);
    for(var i=0; i<shareNameCode.length; i++){
        if(code === shareNameCode[i][0]){
            return shareNameCode[i][1];
        }
    }
    return 'unknow';

}

function getShareCode(name){
    for(var i=0; i<shareNameCode.length; i++){
        if(name === shareNameCode[i][1]){
            return shareNameCode[i][0];
        }

    }
    return 'unknow';

}


function getWaterfallData(optionName){
    $.post('/waterfall_kline/shareList',{'data':optionName },function(data,status){
        if(status === 'success'){
            optionWaterfall[getOptionArrayIndex(optionName)] = deepCopy(data);
        }
    });
}


//========================================================================
//optionItem
function getOptionArrayIndex(optionName){
    for(var i=0; i<optionWaterfallName.length;i++){
        if(optionName === optionWaterfallName[i]){
            return i;
        }
    }
}

function initOptionItemOnClick(){
    var optionId;
    for(var i=1; i<=optionWaterfallName.length; i++){
        optionId = '#option_item' + i;
        $(optionId).click(function(e){optionButtonListener(e)});
    }
}


var isMixMark = [];
function initMixMark(index) { //index start form zero
    if(index < 0){
        for(var i=0; i<optionWaterfallName.length;i++){
            isMixMark[i] = false;
        }
    }else if(index < optionWaterfallName.length){
        isMixMark[index] = !isMixMark[index];
    }
}


function updateCodeListArray(){
    var arrayTemp = [];

    // console.log(optionWaterfall[0]);
    for(var i=0; i<optionWaterfallName.length;i++){
        if(isMixMark[i] === true){
            arrayTemp.push(optionWaterfall[i]);
        }
    }

    //console.log(arrayTemp.length);
    if(arrayTemp.length > 0){
        //codeListArray = deepCopy(mixCodeListArray(arrayTemp));
        //console.log('codeListArray:');
        //console.log(mixCodeListArray(arrayTemp));
        mixCodeListArray(arrayTemp);
        $('#code_list_number').text(codeListArray.length);
    }
}

function optionButtonListener(e){
    if(isMine){
        return;
    }

    var elementId,index,i,optionId,elementText,optionName;
    elementId = e.target.id;
    //elementText = e.target.textContent.trim();
    index = elementId.match(/\d+/g) - 1;
    //console.log(optionWaterfall[0]);
    initMixMark(index);
    //console.log(isMixMark);
    updateCodeListArray();
    //console.log('codeListArray.length:' + codeListArray.length);
    updateCodeListDisplay(true,1);
    updateOptionItemColor();
    console.log('triggle_________' + index);
}


var isAsc = true;
var codeListLength = 20;
function updateCodeListDisplay(isAsc,startIndex){
    var i,idNameString,idCodeString,length;

    startIndex = startIndex -1;
    var dataLength = codeListArray.length;
    length = ((dataLength - startIndex) > codeListLength)? codeListLength : (dataLength - startIndex);
    if(isAsc){
        for(i=0;i<length;i++){
            idNameString = '#code_list_item_name' + (i+1);
            $(idNameString).text(codeListArray[startIndex+i][1]);
            idCodeString = '#code_list_item_code' + (i+1);
            $(idCodeString).text(codeListArray[startIndex+i][0]);
        }
    }else{
        for(i=length-1;i>0;i--){
            idNameString = '#code_list_item_name' + (i+1);
            $(idNameString).text(codeListArray[dataLength-startIndex][1]);
            idCodeString = '#code_list_item_code' + (i+1);
            $(idCodeString).text(codeListArray[dataLength-startIndex][0]);
        }
    }

}

//==================================
//code_list

var codeStartIndex = 0;
function addCodeListMouseWheel(){
    var event,down;
    document.getElementById('code_list').onmousewheel = function(e){
        //console.log('mouse move');
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


var codeListArray = [];
function codeListMove(isUp){
    if(isUp){
        codeStartIndex--;
        if(codeStartIndex < 1){
            codeStartIndex = 1;
        }
    } else {
        codeStartIndex++;
        if(codeListArray.length-codeStartIndex<=codeListLength){
            codeStartIndex = (codeListArray.length - codeListLength) +1;
        }
    }
    
    $('#start_index_number').text(codeStartIndex);
    updateCodeListOfWheel(codeStartIndex-1);

}


function updateCodeListOfWheel(startIndex){
    var i, itemNameId,itemCodeId;

    if(codeListArray.length<1){
        return;
    }

    for(i=0;i<optionWaterfallName.length;i++){
        itemNameId = '#code_list_item_name' + (i + 1);
        itemCodeId = '#code_list_item_code' + (i + 1);
        $(itemNameId).text('');
        $(itemCodeId).text('');
    }

    var j=startIndex;
    for(i=0; i<optionWaterfallName.length;i++){
        itemNameId = '#code_list_item_name' + (i + 1);
        itemCodeId = '#code_list_item_code' + (i + 1);

        $(itemNameId).text(codeListArray[j][1]);
        $(itemCodeId).text(codeListArray[j][0]);
        j++;
        if(j >= codeListArray.length){
            break;
        }
    }
    // $("#list_item_counts").innerText = codeListArray.length;
    updateCodeListColor(0);
    updateOptionItemColor();
    //updateMixItemColor();
}


function setCodeListButtonListen(){
    for(var i=1; i<=codeListLength; i++){
        $('#code_list_item' + i).click(function(e){
            codeListButtonListener(e);
        });
    }
}

var kLineLength = 30;
function codeListButtonListener(e){
    var elementId,index,code,name;
    elementId = e.target.id;
    index = elementId.match(/\d+/g)[0];
    code = $('#code_list_item_code' + index).text();
    name = $('#code_list_item_name' + index).text();
    $('#screen_share_name_'+activityScreenIndex).val(name);
    $('#screen_share_code_'+activityScreenIndex).val(code);
    //console.log('#screen_share_code_'+activityScreenIndex);
    getKLineData(activityScreenIndex,code, name,kLineLength);
    updateOptionSequence(code);
    updateCodeListColor(index);
    //console.log(code);
}

function updateCodeListColor(index){
    var elementId;

    //console.log(index);
    for(var i=1; i<=codeListLength; i++){
        elementId = '#code_list_item_name' + i;
        $(elementId).css('color', '#00b7ff');
    }

    if(index === 0){
        return;
    }

    elementId = '#code_list_item_name' + index;
    $(elementId).css('color', 'red');
}


function updateOptionItemColor(){
    var color;

    for(var i=0;i <optionWaterfallName.length;i++){
        if(isMixMark[i]){
           color = 'red';
        }else{
            color = 'grey';
        }
        //d = '#option_item_name'+(i+1);
        //console.log(id);
        $('#option_item_name'+(i+1)).css('color',color);
    }
}

function updateOptionSequence(code){
    var i,j,value;

    for(i=0; i<optionWaterfallName.length; i++){
        value = 0;
        for(j=0; j<optionWaterfall[i].length; j++){
            if(code === optionWaterfall[i][j][0]){
                value = j+1;
                //console.log(j);
                break;
            }
        }
        $('#option_item_sequence' + (i+1)).text(value)
            .css('color',cellLevelColor[getSequenceColor(value)]);
    }
}

function getSequenceColor(value){
    var index;

    switch(true){
        case value <= 10 && value >0:
            index = 0;
            break;
        case value <= 30:
            index = 1;
            break;
        case value <= 50:
            index = 2;
            break;
        case value <= 80:
            index = 3;
            break;
        case value <= 120:
            index = 4;
            break;
        case value <= 160:
            index = 5;
            break;
        case value > 200:
            index = 6;
            break;
        default:
            index = 6;
            break;
    }
    return index;
}

//==================================================================TABLE==================================================================









//==========================================================================================================================================








//==================================================================TABLE==================================================================
var tableThId = ['th_minR','th_avgR','th_maxR','th_day2','th_day3','th_day4','th_day5','th_day6','th_day7','th_day8','th_day9','th_day10',
    'th_day30','th_day90','th_day180','th_day360'];

function addTableClickListener(){
    var i,j;

    for(i=0; i<tableThId.length;i++){
        $('#'+tableThId[i]).click(function(e){
            tableThClickResponse(e);
        });
    }
}

var dataSequence = true;
function tableThClickResponse(e){
    var id, sequence,option;
    var event = e || window.event;
    id = event.target.id;

    sequence = dataSequence? ' ASC' : ' DESC';

    //console.log(id);
    switch(id){
        case 'th_minR':
            option = ('min_rate' + sequence);
            break;
        case 'th_avgR':
            option = ('avg_rate' + sequence);
            break;
        case 'th_maxR':
            option = ('max_rate' + sequence);
            break;
        case 'th_day2':
            option = ('day2' + sequence);
            break;
        case 'th_day3':
            option = ('day3' + sequence);
            break;
        case 'th_day4':
            option = ('day4' + sequence);
            break;
        case 'th_day5':
            option = ('day5' + sequence);
            break;
        case 'th_day6':
            option = ('day6' + sequence);
            break;
        case 'th_day7':
            option = ('day7' + sequence);
            break;
        case 'th_day8':
            option = ('day8' + sequence);
            break;
        case 'th_day9':
            option = ('day9' + sequence);
            break;
        case 'th_day10':
            option = ('day10' + sequence);
            break;
        case 'th_day30':
            option = ('day30' + sequence);
            break;
        case 'th_day90':
            option = ('day90' + sequence);
            break;
        case 'th_day180':
            option = ('day180' + sequence);
            break;
        case 'th_day360':
            option = ('day360' + sequence);
            break;
        default:
            console.log('no match');
            break;

    }
    //console.log(option);
    queryTableData(option);
}

var tableDataArray = [];

function queryTableData(option){
    $.post('/waterfall_kline/tableData',{data:option},function(data,status){
        if(status === 'success'){
            tableDataArray = deepCopy(data);
            updateTableDisplay();
            updateTableCellColor();
        }
    });
}

var cellLevelColor = ['#B40404', '#FA5858', '#F5A9BC', '#0080FF', '#819FF7', '#A9D0F5','#FFFFFF'];
function updateTableCellColor(){
    var i;
    for(i=0;i<100;i++){
        $("#waterfall_td_7_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][6],dayLevelAscConfig[0],dataSequence)]);
        $("#waterfall_td_8_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][7],dayLevelAscConfig[1],dataSequence)]);
        $("#waterfall_td_9_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][8],dayLevelAscConfig[2],dataSequence)]);
        $("#waterfall_td_10_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][9],dayLevelAscConfig[3],dataSequence)]);
        $("#waterfall_td_11_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][10],dayLevelAscConfig[4],dataSequence)]);
        $("#waterfall_td_12_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][11],dayLevelAscConfig[5],dataSequence)]);
        $("#waterfall_td_13_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][12],dayLevelAscConfig[6],dataSequence)]);
        $("#waterfall_td_14_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][13],dayLevelAscConfig[7],dataSequence)]);
        $("#waterfall_td_15_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][14],dayLevelAscConfig[8],dataSequence)]);
        $("#waterfall_td_16_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][15],dayLevelAscConfig[9],dataSequence)]);
        $("#waterfall_td_17_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][16],dayLevelAscConfig[10],dataSequence)]);
        $("#waterfall_td_18_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][17],dayLevelAscConfig[11],dataSequence)]);
        $("#waterfall_td_19_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][18],dayLevelAscConfig[12],dataSequence)]);
        $("#waterfall_td_20_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][19],dayLevelAscConfig[13],dataSequence)]);
        $("#waterfall_td_21_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][20],dayLevelAscConfig[14],dataSequence)]);
        $("#waterfall_td_22_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][21],dayLevelAscConfig[15],dataSequence)]);
        //console.log(tableDataArray[9][i]);
    }
}


function updateTableDisplay(){
    var i,j,length,id;

    length = tableDataArray[0].length;
    for(j=0; j<100; j++){
        for(i=0; i<length; i++){
            id = '#waterfall_td_' + (i+1) + '_' + (j+1);
            $(id).text(tableDataArray[j][i]);
        }
    }
}



function initTableLevelValue(){
    var i,j;

    for(i=0;i<dayLevelAscConfig.length;i++){
        for(j=0;j<6;j++){
            $('#level' + (j+1) + '_'+ (i+1)).attr('value',dayLevelAscConfig[i][j]);
        }
    }
}
//=================================================================KLINE==================================================================



//=================================================================KLINE==================================================================



//=================================================================KLINE==================================================================



//=================================================================KLINE==================================================================
//kLine

//save data
var kLineData1 = [];
var kLineData2 = [];
var kLineData3 = [];
var kLineData4 = [];
var kLineData5 = [];
var kLineData6 = [];
var kLineData7 = [];
var kLineData8 = [];

var kLineDataArray = [
  kLineData1,
  kLineData2,
  kLineData3,
  kLineData4,
  kLineData5,
  kLineData6,
  kLineData7,
  kLineData8
];

//save time
var kLineDate1 = [];
var kLineDate2 = [];
var kLineDate3 = [];
var kLineDate4 = [];
var kLineDate5 = [];
var kLineDate6 = [];
var kLineDate7 = [];
var kLineDate8 = [];

var kLineDateArray = [
    kLineDate1,
    kLineDate2,
    kLineDate3,
    kLineDate4,
    kLineDate5,
    kLineDate6,
    kLineDate7,
    kLineDate8
];

var kLineGraphic = [];

function initKLineElement(){
    var i;

    for(i=1; i<9; i++){
        kLineGraphic[i-1] = echarts.init(document.getElementById('k_line_graphic_' + i));
    }

}

function addDataScreenClick(){

    for(var i=1;i<=8;i++){
        $('#data_screen' + i).click(function(e){
            dataScreenClickRespond(e);
        });
    }
}

var activityScreenIndex = 1;
function dataScreenClickRespond(e){
    var event = e || window.event;
    var id = event.currentTarget.id; //currentTarget
    //console.log(id);
    var index = id.match(/\d+/g)[0];
    if( 0<index && index <9){
        updateScreenNameCodeColor(activityScreenIndex,index);
        activityScreenIndex = index;
    } else {
        console.log('ERROR: wrong screen index:' + index);
    }

}

function updateScreenNameCodeColor(oldIndex,newIndex){
    $('#screen_share_name_'+oldIndex).css('background-color','white');
    $('#screen_share_code_'+oldIndex).css('background-color','white');
    $('#screen_share_name_'+newIndex).css('background-color','#9eabd5');
    $('#screen_share_code_'+newIndex).css('background-color','#9eabd5');
}


function getKLineData(index,code, name,length){
    kLineDateArray[index-1].length = 0;
    kLineDataArray[index-1].length = 0;
    $.post('/waterfall_kline/kLineData',{'data':code },function(data,status){
        if(status === 'success'){
            for(var i=0; i<data.length; i++){
                kLineDateArray[index-1].push(data[i][0]);
                kLineDataArray[index-1].push([data[i][1], data[i][2], data[i][3], data[i][4]]);
            }
        }
        updateKlineData(index,code, name,length);
    });
}

var kLineOption=[{},{},{},{},{},{},{},{}];
function updateKlineData(index,code, name,length){
    var shareName = name;
    var shareCode = code;
    length = length < kLineDataArray[index-1].length ? length : kLineDataArray[index-1].length;
    var tempData = kLineDataArray[index-1].slice(kLineDataArray[index-1].length-length);
    var tempDate = kLineDateArray[index-1].slice(kLineDataArray[index-1].length-length);

    updateAddDelButton(code,index);
    updateCodeGoal(code,index);
    kLineOption[index-1] = {
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
        grid: {
            top: '5%',
            left: '2%',
            right: '2%',
            bottom: '4%',
            containLabel: true
        },
        toolbox: {
            show : true,
            padding: 1,
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
            realTime: true,
            start : 0,
            end : 100
        },
        xAxis : [
            {
                position: 'bottom',
                type : 'category',
                boundaryGap : true,
                axisTick: {onGap:false},
                splitLine: {show:false},
                data : tempDate
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
                data: tempData

            }
        ]
    };

    kLineOption[index-1].dataZoom.start = 1;


    kLineGraphic[index-1].setOption(kLineOption[index-1]);
}



function initKLineSelector(){

    document.getElementById('kline_common_select').add(new Option('30','1'));
    document.getElementById('kline_common_select').add(new Option('100','2'));
    document.getElementById('kline_common_select').add(new Option('200','3'));
    document.getElementById('kline_common_select').add(new Option('300','4'));
    document.getElementById('kline_common_select').add(new Option('400','5'));
    document.getElementById('kline_common_select').add(new Option('500','6'));


    for(var i=1;i<9;i++){
        document.getElementById('kline_select_' + i).add(new Option('30','1'));
        document.getElementById('kline_select_' + i).add(new Option('100','2'));
        document.getElementById('kline_select_' + i).add(new Option('200','3'));
        document.getElementById('kline_select_' + i).add(new Option('300','4'));
        document.getElementById('kline_select_' + i).add(new Option('400','5'));
        document.getElementById('kline_select_' + i).add(new Option('500','6'));
    }


    $('#kline_common_select').change(function(){kLineSelectorRespond(0);});
    $('#kline_select_1').change(function(){kLineSelectorRespond(1);});
    $('#kline_select_2').change(function(){kLineSelectorRespond(2);});
    $('#kline_select_3').change(function(){kLineSelectorRespond(3);});
    $('#kline_select_4').change(function(){kLineSelectorRespond(4);});
    $('#kline_select_5').change(function(){kLineSelectorRespond(5);});
    $('#kline_select_6').change(function(){kLineSelectorRespond(6);});
    $('#kline_select_7').change(function(){kLineSelectorRespond(7);});
    $('#kline_select_8').change(function(){kLineSelectorRespond(8);});
}


function kLineSelectorRespond(index){
    var value,length;
    if(index>0){
        value = $('#kline_select_' + index).val();

    }else{
        value = $('#kline_common_select').val();
    }


    length = getKLineLength(value);

    //console.log('value:' + value + ' length:' + length);
    updateKLineLength(index,length);

}

function getKLineLength(value){
    var length;
    switch(parseInt(value)){
        case 1:
            length = 30;
            break;
        case 2:
            length = 100;
            break;
        case 3:
            length = 200;
            break;
        case 4:
            length = 300;
            break;
        case 5:
            length = 400;
            break;
        case 6:
            length = 400;
            break;
        default:
            length = 200;
            break;
    }

    return length;
}

function updateKLineLength(index,length){

    if(index>0){
        updateOneKLineLength(index,length);
    }else{
        getSyncArray();
        for(var i=0; i<isSyncArray.length; i++){
            if(isSyncArray[i]){
                updateOneKLineLength(i+1,length);
            }
        }
    }


}

function updateOneKLineLength(index,length){

    if(kLineDataArray[index-1].length<1){
        return;
    }

    console.log(kLineDataArray[index-1].length + ':' + length);

    length = length < kLineDataArray[index-1].length ? length : kLineDataArray[index-1].length;
    // var dateTemp = kLineDateArray[index-1].slice(0,length);
    // var dataTemp = kLineDataArray[index-1].slice(0,length);
    var dataTemp = kLineDataArray[index-1].slice(kLineDataArray[index-1].length-length);
    var dateTemp = kLineDateArray[index-1].slice(kLineDataArray[index-1].length-length);

    //console.log('dateTemp.length:' + dateTemp.length);

    kLineOption[index-1].xAxis[0].data = dateTemp;
    kLineOption[index-1].series[0].data = dataTemp;
    kLineGraphic[index-1].setOption(kLineOption[index-1]);

}


var isSyncArray = [];
function getSyncArray(){
    isSyncArray.length = 0;
    for(var i=1; i<9;i++){
        isSyncArray.push(document.getElementById('sync_radio_'+i).checked);
    }
    console.log(isSyncArray);
}



function addShareNameChangeListener(){

    $('#screen_share_name_1').change(function(){shareNameChangeRespond(1);});
    $('#screen_share_name_2').change(function(){shareNameChangeRespond(2);});
    $('#screen_share_name_3').change(function(){shareNameChangeRespond(3);});
    $('#screen_share_name_4').change(function(){shareNameChangeRespond(4);});
    $('#screen_share_name_5').change(function(){shareNameChangeRespond(5);});
    $('#screen_share_name_6').change(function(){shareNameChangeRespond(6);});
    $('#screen_share_name_7').change(function(){shareNameChangeRespond(7);});
    $('#screen_share_name_8').change(function(){shareNameChangeRespond(8);});

}


function addShareCodeChangeListener(){

    $('#screen_share_code_1').change(function(){shareCodeChangeRespond(1);});
    $('#screen_share_code_2').change(function(){shareCodeChangeRespond(2);});
    $('#screen_share_code_3').change(function(){shareCodeChangeRespond(3);});
    $('#screen_share_code_4').change(function(){shareCodeChangeRespond(4);});
    $('#screen_share_code_5').change(function(){shareCodeChangeRespond(5);});
    $('#screen_share_code_6').change(function(){shareCodeChangeRespond(6);});
    $('#screen_share_code_7').change(function(){shareCodeChangeRespond(7);});
    $('#screen_share_code_8').change(function(){shareCodeChangeRespond(8);});

}

function shareNameChangeRespond(index){
    var text = $('#screen_share_name_' + index).val();
    var code;

     //console.log('#screen_share_name:' + text);
    // console.log('shareNameCode.length' + shareNameCode.length);
    for(var i=0;i<shareNameCode.length;i++){
        if(text === shareNameCode[i][1]){
            code = shareNameCode[i][0];
            //console.log('code:' + code);
            getKLineData(index,code,text,getKLineLength($('#kline_select_' + index).val()));
            break;
        }
    }

}

function shareCodeChangeRespond(index){
    var text = $('#screen_share_code_' + index).val();
    var name;

    updateAddDelButton(text,index);
    for(var i=0;i<shareNameCode.length;i++){
        if(text === shareNameCode[i][0]){
            name = shareNameCode[i][1];
            getKLineData(index,text,name,getKLineLength($('#kline_select_' + index).val()));
            break;
        }
    }

}

function test(){
    console.log(shareNameCode.length);
}

//========================================================================================================================================
//user_optional_code

var optionalCodeArray = [];
function addAddDelButtonListener(){

    $('#add_1').click(function(){addDelButtonRespond(true, 1);});
    $('#add_2').click(function(){addDelButtonRespond(true, 2);});
    $('#add_3').click(function(){addDelButtonRespond(true, 3);});
    $('#add_4').click(function(){addDelButtonRespond(true, 4);});
    $('#add_5').click(function(){addDelButtonRespond(true, 5);});
    $('#add_6').click(function(){addDelButtonRespond(true, 6);});
    $('#add_7').click(function(){addDelButtonRespond(true, 7);});
    $('#add_8').click(function(){addDelButtonRespond(true, 8);});

    $('#del_1').click(function(){addDelButtonRespond(false, 1);});
    $('#del_2').click(function(){addDelButtonRespond(false, 2);});
    $('#del_3').click(function(){addDelButtonRespond(false, 3);});
    $('#del_4').click(function(){addDelButtonRespond(false, 4);});
    $('#del_5').click(function(){addDelButtonRespond(false, 5);});
    $('#del_6').click(function(){addDelButtonRespond(false, 6);});
    $('#del_7').click(function(){addDelButtonRespond(false, 7);});
    $('#del_8').click(function(){addDelButtonRespond(false, 8);});


}


function addDelButtonRespond(isAdd, index){
    var code,i;

    code = $('#screen_share_code_' + index).val();


    if(isAdd){
        for(i=0; i<optionalCodeArray.length;i++){
            if(code === optionalCodeArray[i]){
                return;
            }
        }
        optionalCodeArray.push(code);
    }else{
        for(i=0; i<optionalCodeArray.length;i++){
            if(code === optionalCodeArray[i]){
                optionalCodeArray.splice(i,1);
                break;
            }
        }
    }

    writeOptionalCode();
}

function writeOptionalCode(){
    var codeString;

    if(optionalCodeArray.length < 1){
        return;
    }

    codeString = optionalCodeArray[0];
    for(var i=1; i<optionalCodeArray.length; i++){
        codeString = codeString + ',' + optionalCodeArray[i];
    }

    var data = userName + ',' + codeString;

    console.log(data);
    $.post('/waterfall_kline/optionalCodeWrite',{'data':data},function(data,status){
        if(status === 'success'){

        }

    });

}

function updateAddDelButton(code, index){

    for(var i=0; i<optionalCodeArray.length; i++){
        //console.log('code:' + code + ' : ' + optionalCodeArray[i]);
        if(parseInt(code) === parseInt(optionalCodeArray[i])){
            addDelButtonToggle(false, index);
            break;
        }else{
            addDelButtonToggle(true, index);
        }
    }
}

function addDelButtonToggle(isAdd,index){
    if(isAdd){
        $('#add_' + index).css('background-color', 'red');
        $('#del_' + index).css('background-color', 'grey');
    }else{
        $('#add_' + index).css('background-color', 'grey');
        $('#del_' + index).css('background-color', 'red');
    }
}


function updateCodeGoal(code,index){
    var i,goal,goalString;
    goal = getGapGoal(code);
    if(goal.length < 1){
        return;
    }
    goalString = goal[0];
    for(i=1; i<goal.length; i++){
        goalString = goalString + ' ' + goal[i];
    }

    //console.log(goalString);
    //$('#gap_goal_'+index).text(goal);
    $('#gap_goal_'+index).attr('value',goalString);
}


function getGapGoal(code){
    var i,j,value = [];
    for(i=0; i<optionWaterfallName.length; i++){
        for(j=0; j<optionWaterfall[i].length; j++){
            if(code === optionWaterfall[i][j][0]){
                value.push(j+1);
                break;
            }else{

            }
            if(j===optionWaterfall[i].length-1){
                value.push(0);
            }
        }
    }
    return value;
}
