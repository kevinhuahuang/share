document.write("<script language=javascript src='./javascripts/jquery-3.3.1.min.js'></script>");
document.write("<script language=javascript src='./javascripts/echarts.min.js'></script>");
document.write("<script language=javascript src='./javascripts/globalData.js'></script>");
document.write("<script language=javascript src='./javascripts/getTableDataLevel.js'></script>");



function initMainPage() {

    initScreenDisplay();

    initToolButton();

    initSelector();

    initAllScatterOption();

    //getTableName();
    //queryTableData('SELECT * FROM gap1_min1 ORDER BY rate_sum3 DESC LIMIT 100')

    //queryScatterData();





    //myScatter.setOption(scatterOption);
}


function pieChart(){
    var  option = {
        title : {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ]
            }
        ]
    };

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

    $('#button_scatter_main').click(function () {
        window.location.href='../start_page';
    });

    $('#button_scatter_table').click( function () {
        window.location.href = '../gap_min_table';
    });

    $('#button_scatter_kline').click( function () {
        window.location.href = '../waterfall_kline';
    });

    $('#button_scatter_declare').click( function () {
        window.location.href = '../instruction';
    });



    $('#query_scatter_data1').click(function(){scatterButtonRespond(1);});
    $('#query_scatter_data2').click(function(){scatterButtonRespond(2);});
    $('#query_scatter_data3').click(function(){scatterButtonRespond(3);});
    $('#query_scatter_data4').click(function(){scatterButtonRespond(4);});
    $('#query_scatter_data5').click(function(){scatterButtonRespond(5);});
    $('#query_scatter_data6').click(function(){scatterButtonRespond(6);});
    $('#query_scatter_data7').click(function(){scatterButtonRespond(7);});
    $('#query_scatter_data8').click(function(){scatterButtonRespond(8);});

}

function scatterButtonRespond(index){
    getScatterCondition(index);
}


function initSelector(){
    var indexString,i,t;



    for(i=1;i<9;i++){
        for(t=1;t<11;t++){
            indexString = t.toString();
            document.getElementById('gap_select'+i).add(new Option(indexString,indexString));
            document.getElementById('min_select'+i).add(new Option(indexString,indexString));
        }

        document.getElementById('x_selector'+i).add(new Option('sumRate','-1'));
        document.getElementById('x_selector'+i).add(new Option('counts','15'));
        document.getElementById('x_selector'+i).add(new Option('pre30','-30'));
        document.getElementById('x_selector'+i).add(new Option('pre90','-90'));
        document.getElementById('x_selector'+i).add(new Option('pre180','-180'));
        document.getElementById('x_selector'+i).add(new Option('pre360','-360'));
        document.getElementById('x_selector'+i).add(new Option('pre500','-500'));
        document.getElementById('x_selector'+i).add(new Option('minRate','0'));
        document.getElementById('x_selector'+i).add(new Option('avgRate','1'));
        document.getElementById('x_selector'+i).add(new Option('maxRate','2'));

        document.getElementById('y_selector'+i).add(new Option('rateSum3','3'));
        document.getElementById('y_selector'+i).add(new Option('rateSum5','5'));
        document.getElementById('y_selector'+i).add(new Option('rateSum10','10'));
        document.getElementById('y_selector'+i).add(new Option('rateSum20','20'));
        document.getElementById('y_selector'+i).add(new Option('rateSum30','30'));
        document.getElementById('y_selector'+i).add(new Option('rateSum60','60'));
        document.getElementById('y_selector'+i).add(new Option('rateSum90','90'));

        document.getElementById('condition_select'+i).add(new Option('sumRate','-1'));
        document.getElementById('condition_select'+i).add(new Option('counts','15'));
        document.getElementById('condition_select'+i).add(new Option('pre30','-30'));
        document.getElementById('condition_select'+i).add(new Option('pre90','-90'));
        document.getElementById('condition_select'+i).add(new Option('pre180','-180'));
        document.getElementById('condition_select'+i).add(new Option('pre360','-360'));
        document.getElementById('condition_select'+i).add(new Option('pre500','-500'));
        document.getElementById('condition_select'+i).add(new Option('minRate','0'));
        document.getElementById('condition_select'+i).add(new Option('avgRate','1'));
        document.getElementById('condition_select'+i).add(new Option('maxRate','2'));
        document.getElementById('condition_select'+i).add(new Option('rateSum3','3'));
        document.getElementById('condition_select'+i).add(new Option('rateSum5','5'));
        document.getElementById('condition_select'+i).add(new Option('rateSum10','10'));
        document.getElementById('condition_select'+i).add(new Option('rateSum20','20'));
        document.getElementById('condition_select'+i).add(new Option('rateSum30','30'));
        document.getElementById('condition_select'+i).add(new Option('rateSum60','60'));
        document.getElementById('condition_select'+i).add(new Option('rateSum90','90'));

    }



    $('#x_selector1').change(function(){scatterSelectorRespond(1);});
    $('#x_selector2').change(function(){scatterSelectorRespond(2);});
    $('#x_selector3').change(function(){scatterSelectorRespond(3);});
    $('#x_selector4').change(function(){scatterSelectorRespond(4);});
    $('#x_selector5').change(function(){scatterSelectorRespond(5);});
    $('#x_selector6').change(function(){scatterSelectorRespond(6);});
    $('#x_selector7').change(function(){scatterSelectorRespond(7);});
    $('#x_selector8').change(function(){scatterSelectorRespond(8);});

    $('#y_selector1').change(function(){scatterSelectorRespond(1);});
    $('#y_selector2').change(function(){scatterSelectorRespond(2);});
    $('#y_selector3').change(function(){scatterSelectorRespond(3);});
    $('#y_selector4').change(function(){scatterSelectorRespond(4);});
    $('#y_selector5').change(function(){scatterSelectorRespond(5);});
    $('#y_selector6').change(function(){scatterSelectorRespond(6);});
    $('#y_selector7').change(function(){scatterSelectorRespond(7);});
    $('#y_selector8').change(function(){scatterSelectorRespond(8);});


    $('#condition_select1').change(function(){conditionSelectorRespond(1)});
    $('#condition_select2').change(function(){conditionSelectorRespond(2)});
    $('#condition_select3').change(function(){conditionSelectorRespond(3)});
    $('#condition_select4').change(function(){conditionSelectorRespond(4)});
    $('#condition_select5').change(function(){conditionSelectorRespond(5)});
    $('#condition_select6').change(function(){conditionSelectorRespond(6)});
    $('#condition_select7').change(function(){conditionSelectorRespond(7)});
    $('#condition_select8').change(function(){conditionSelectorRespond(8)});

}


function scatterSelectorRespond(index){



}


function conditionSelectorRespond(index){
    var content;
    var value = $('#condition_select'+index).val();
    switch (parseInt(value)){
        case -1:
            content = '-80,-70,-60,-40';
            break;
        case 15:
            content = '8,12,16,20';
            break;
        case -30:
            content = '-20,0,20,40';
            break;
        case -90:
            content = '-50,-10,50,100';
            break;
        case -180:
            content = '-50,-10,50,100';
            break;
        case -360:
            content = '-50,-10,50,100';
            break;
        case -500:
            content = '-50,-10,50,100';
            break;
        case 0:
            content = '2,5,10,20';
            break;
        case 1:
            content = '1,2,3,4';
            break;
        case 2:
            content = '0.1,0.2,0.5,0.8';
            break;
        case 3:
            content = '0,5,10,15';
            break;
        case 5:
            content = '0,7,15,20';
            break;
        case 10:
            content = '0,10,20,30';
            break;
        case 20:
            content = '0,15,25,40';
            break;
        case 30:
            content = '0,20,40,50';
            break;
        case 60:
            content = '0,20,40,60';
            break;
        case 90:
            content = '0,25,50,70';
            break;
        default:
            content = '-80,-70,-60,-40';
            break;
    }


    $('#content_input'+index).val(content);
}




var scatterChart = [];
var scatterOption = [];
function initScreenDisplay() {
    var dataCurtain = $('#data_curtain');
    var dataCurtainHeight = dataCurtain.innerHeight();
    var dataCurtainWidth = dataCurtain.innerWidth();

    var i, t, topValue;

    dataCurtainHeight = dataCurtainHeight - 10;
    dataCurtainWidth = dataCurtainWidth-10;

    for (i=1; i<=8; i++) {
        if(i<5){ topValue = 10; t=i-1;}else{ topValue = 10 + dataCurtainHeight / 2; t=i-5;}
        $('#scatter_curtain' + i).css({top: topValue, left: 10 + (dataCurtainWidth/4)*t})
            .innerHeight(dataCurtainHeight / 2 -10)
            .innerWidth(dataCurtainWidth/4 -10);

        $('#scatter_chart' + i).innerHeight(dataCurtainHeight / 2 - 60 ).innerWidth(dataCurtainWidth/4-10);
        scatterChart[i-1] = echarts.init(document.getElementById('scatter_chart' + i));
    }


}



var legendData;
function getScatterCondition(index){
    var message,contentArray;

    var gap = $('#gap_select' + index).val();
    var min = $('#min_select' + index).val();
    var xValue = $('#x_selector' +index).val();
    var yValue = $('#y_selector' +index).val();
    var condition = $('#condition_select'+index).val();
    var content = $('#content_input'+index).val();
    contentArray = content.split(',');
    legendData = ['left', contentArray[0],contentArray[1],contentArray[2],contentArray[3]];

    message = gap +  ',' + min + ',' + xValue + ',' + yValue + ',' + condition + ',' + contentArray[0] + ',left' ;
    //console.log(message);
    queryScatterData(message,index,1);

    message = gap +  ',' + min + ',' + xValue + ',' + yValue + ',' + condition + ',' + contentArray[1] + ',' + contentArray[0];
    //console.log(message);
    queryScatterData(message,index,2);

    message = gap +  ',' + min + ',' + xValue + ',' + yValue + ',' + condition + ',' + contentArray[2] + ',' + contentArray[1];
    //console.log(message);
    queryScatterData(message,index,3);

    message = gap +  ',' + min + ',' + xValue + ',' + yValue + ',' + condition + ',' + contentArray[3] + ',' + contentArray[2];
    //console.log(message);
    queryScatterData(message,index,4);

    message = gap +  ',' + min + ',' + xValue + ',' + yValue + ',' + condition + ',' + contentArray[3] + ',right';
    //console.log(message);
    queryScatterData(message,index,5);

}

var scatterUpdateMark = [false, false, false, false,false];

var firstScatterData =[];
var secondScatterData = [];
var thirdScatterData = [];
var fourthScatterData = [];
var fifScatterData= [];
var scatterDataArray = [
    firstScatterData,
    secondScatterData,
    thirdScatterData,
    fourthScatterData,
    fifScatterData
];

function queryScatterData(message, index,dataIndex){
    scatterDataArray[dataIndex-1].length = 0;
    scatterUpdateMark[dataIndex-1] = false;
    $.post('/gap_min_scatter/scatterData',{data:message},function(data,status){
        if(status === 'success'){
            //console.log('data receive:' + index);
            scatterDataArray[dataIndex-1] = deepCopy(data);
            scatterUpdateMark[dataIndex-1] = true;
            updateScatterChart(index);
        }
    });
}


function initAllScatterOption(){
    for(var i=1;i<9;i++){
        initScatterOption(i);
    }

}

function initScatterOption(index){
    scatterOption[index-1] = {
        title : {
            text: 'fall_3up',
            subtext: 'waterfall analyze'
        },
        tooltip : {
            trigger: 'axis',
            showDelay : 0,
            formatter : function (params) {
                if (params[0].value.length > 1) {
                    return params[0].seriesName + ' :<br/>'
                        + params[0].value[0] + 'fall '
                        + params[0].value[1] + 'up ';
                }
                else {
                    return params[0].seriesName + ' :<br/>'
                        + params[0].name + ' : '
                        + params[0].value + 'up ';
                }
            },
            axisPointer:{
                show: true,
                type : 'cross',
                lineStyle: {
                    type : 'dashed',
                    width : 1
                }
            }
        },
        legend: {
            data:['80','30']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataZoom : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        xAxis : [
            {
                type : 'value',
                scale:true,
                axisLabel : {
                    formatter: '{value} fall'
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                scale:true,
                axisLabel : {
                    formatter: '{value} up'
                }
            }
        ],
        series : [
            {
                name:'80',
                type:'scatter',
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'80',
                type:'scatter',
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'<-60',
                type:'scatter',
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'<-30',
                type:'scatter',
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'30',
                type:'scatter',
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };
}


function updateScatterChart(index){
    var i;
    for(i=0; i<scatterUpdateMark.length;i++){
        if(!scatterUpdateMark[i]){
            //console.log(scatterUpdateMark);
            return;
        }
    }

    console.log('scatterChart');
    scatterOption[index-1].legend['data'] = legendData;
    for(i=0;i<5;i++){
        scatterOption[index-1].series[i]['data'] = scatterDataArray[i];
        scatterOption[index-1].series[i]['name'] = legendData[i];
    }


    scatterChart[index-1].setOption(scatterOption[index-1]);

}











