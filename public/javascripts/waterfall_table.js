document.write("<script language=javascript src='./javascripts/jquery-3.3.1.min.js'></script>");
document.write("<script language=javascript src='./javascripts/echarts.min.js'></script>");
document.write("<script language=javascript src='./javascripts/globalData.js'></script>");
document.write("<script language=javascript src='./javascripts/getTableDataLevel.js'></script>");

function initMainPage() {

    initToolButton();

    addTableClickListener();
    initKLineSelector();

    getTableName();
    queryTableData('SELECT * FROM gap1_min1 ORDER BY rate_sum3 DESC LIMIT 100')
}



var dataSequence = false;
function initToolButton(){
    $('#table_sequence').click(function(){
        dataSequence = !dataSequence;
        if (dataSequence) {
            $('#table_sequence').text('最小值-->').css('color', 'red');
        }else{
            $('#table_sequence').text('最大值-->').css('color', 'blue');
        }
    });

    $('#button_table_main').click(function () {
        window.location.href='../start_page';
    });

    $('#button_table_scatter').click( function () {
        window.location.href = '../gap_min_scatter';
    });

    $('#button_table_kline').click( function () {
        window.location.href = '../waterfall_kline';
    });

    $('#button_table_declare').click( function () {
        window.location.href = '../instruction';
    });
}

function initKLineSelector(){
    var indexString;

    for(var i=1;i<11;i++){
        indexString = i.toString();
        document.getElementById('gap_select').add(new Option(indexString,indexString));
        document.getElementById('min_select').add(new Option(indexString,indexString));
    }


    $('#gap_select').change(function(){gapMinSelectorRespond();});
    $('#min_select').change(function(){gapMinSelectorRespond();});

}

var tableName;
function gapMinSelectorRespond(){
    var gap,min,sequence,sqlSentence;

    getTableName();
    sequence = dataSequence? ' ASC' : ' DESC';

    sqlSentence = 'SELECT * FROM ' + tableName + ' ORDER BY rate_sum3 ' + sequence + ' LIMIT 100';

    //console.log(sqlSentence);
    queryTableData(sqlSentence);
}

function getTableName() {
    var gap = $('#gap_select').val();
    var min = $('#min_select').val();
    tableName = 'gap' + gap + '_' + 'min' + min;
}

//==================================================================TABLE==================================================================








//==========================================================================================================================================








//==================================================================TABLE==================================================================
var tableThId = ['th_pre30','th_pre90','th_pre180','th_pre360','th_pre500','th_sum_rate','th_minR','th_avgR','th_maxR',
    'th_sum3','th_sum5','th_sum10','th_sum20','th_sum30','th_sum60','th_sum90'];

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
    var id, sequence,option,sqlSentence;
    var event = e || window.event;
    id = event.target.id;

    sequence = dataSequence? ' ASC' : ' DESC';

    //console.log(id);
    switch(id){
        case 'th_pre30':
            option = ('pre_rate30' + sequence);
            break;
        case 'th_pre90':
            option = ('pre_rate90' + sequence);
            break;
        case 'th_pre180':
            option = ('pre_rate180' + sequence);
            break;
        case 'th_pre360':
            option = ('pre_rate360' + sequence);
            break;
        case 'th_pre500':
            option = ('pre_rate500' + sequence);
            break;
        case 'th_sum_rate':
            option = ('sum_rate' + sequence);
            break;
        case 'th_minR':
            option = ('min_rate' + sequence);
            break;
        case 'th_avgR':
            option = ('avg_rate' + sequence);
            break;
        case 'th_maxR':
            option = ('max_rate' + sequence);
            break;
        case 'th_sum3':
            option = ('rate_sum3' + sequence);
            break;
        case 'th_sum5':
            option = ('rate_sum5' + sequence);
            break;
        case 'th_sum10':
            option = ('rate_sum10' + sequence);
            break;
        case 'th_sum20':
            option = ('rate_sum20' + sequence);
            break;
        case 'th_sum30':
            option = ('rate_sum30' + sequence);
            break;
        case 'th_sum60':
            option = ('rate_sum60' + sequence);
            break;
        case 'th_sum90':
            option = ('rate_sum90' + sequence);
            break;
        default:
            console.log('no match');
            break;

    }
    //console.log(option);

    sqlSentence = 'SELECT * FROM ' + tableName + ' ORDER BY ' + option + ' LIMIT 100';
    //console.log(sqlSentence);
    queryTableData(sqlSentence);
}

var tableDataArray = [];
function queryTableData(sqlSentence){

    $.post('/gap_min_table/tableData',{data:sqlSentence},function(data,status){
        if(status === 'success'){
            //console.log(data);
            tableDataArray = deepCopy(data);
            updateTableDisplay();
            updateTableCellColor();
        }
    });
}


var cellLevelColor = ['#B40404', '#FA5858', '#F5A9BC', '#0080FF', '#819FF7', '#A9D0F5','#FFFFFF'];
function updateTableCellColor(){
    var i,levelData;
    if(dataSequence){
        levelData = gapMinLevelAscConfig;
    }else{
        levelData = gapMinLevelDescConfig;
    }

    for(i=0;i<100;i++){
        $("#waterfall_td_5_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][4],levelData[0],dataSequence)]);
        $("#waterfall_td_6_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][5],levelData[1],dataSequence)]);
        $("#waterfall_td_7_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][6],levelData[2],dataSequence)]);
        $("#waterfall_td_8_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][7],levelData[3],dataSequence)]);
        $("#waterfall_td_9_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][8],levelData[4],dataSequence)]);
        $("#waterfall_td_15_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][14],levelData[5],dataSequence)]);
        $("#waterfall_td_16_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][15],levelData[6],dataSequence)]);
        $("#waterfall_td_17_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][16],levelData[7],dataSequence)]);
        $("#waterfall_td_18_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][17],levelData[8],dataSequence)]);
        $("#waterfall_td_19_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][18],levelData[9],dataSequence)]);
        $("#waterfall_td_20_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][19],levelData[10],dataSequence)]);
        $("#waterfall_td_21_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][20],levelData[11],dataSequence)]);
        $("#waterfall_td_22_" + (i+1)).css('background-color',cellLevelColor[getDayLevel(tableDataArray[i][21],levelData[12],dataSequence)]);
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


