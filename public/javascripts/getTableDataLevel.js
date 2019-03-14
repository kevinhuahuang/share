

var minRAscConfig = [1,1.005,1.01,1.015,1.02,1.025];
var avgRAscConfig = [0.02,0.03,0.04,0.1,0.2,0.3];
var maxRAscConfig = [0.001,0.005,0.01,0.015,0.02,0.025];


var day2AscConfig = [-15,-14,-13,-12,-11,-9];
var day3AscConfig = [-20,-18,-16,-14,-12,-10];
var day4AscConfig = [-25,-22,-19,-16,-13,-10];
var day5AscConfig = [-30,-28,-25,-21,-19,-14];
var day6AscConfig = [-35,-32,-28,-24,-20,-16];
var day7AscConfig = [-40,-37,-33,-29,-25,-20];
var day8AscConfig = [-50,-46,-42,-38,-33,-28];
var day9AscConfig = [-60,-55,-50,-45,-40,-35];
var day10AscConfig = [-70,-65,-60,-55,-50,-45];
var day30AscConfig = [-80,-75,-70,-65,-60,-55];
var day90AscConfig = [-180,-170,-150,-130,-110,-90];
var day180AscConfig = [-190,-180,-160,-140,-120,-100];
var day360AscConfig = [-200,-190,-170,-150,-130,-110];

var pre30AscConfig = [-60,-55,-50,-45,-40,-35];
var pre90AscConfig =  [-100,-95,-90,-85,-80,-75];
var pre180AscConfig = [-130,-120,-110,-100,-90,-80];
var pre360AscConfig = [-150,-140,-130,-120,-110,-100];
var pre500AscConfig = [-170,-160,-150,-140,-130,-120];
var sumRateAscConfig = [-170,-160,-150,-140,-130,-120];
var sum3RateAscConfig = [-15,-14,-13,-12,-11,-9];
var sum5RateAscConfig = [-25,-22,-19,-16,-13,-10];
var sum10RateAscConfig = [-40,-37,-33,-29,-25,-20];
var sum20RateAscConfig = [-50,-46,-42,-38,-33,-28];
var sum30RateAscConfig = [-70,-65,-60,-55,-50,-45];
var sum60RateAscConfig = [-80,-75,-70,-65,-60,-55];
var sum90RateAscConfig = [-90,-85,-80,-75,-70,-65];

var pre30DescConfig = [100,95,90,85,80,75];
var pre90DescConfig =  [200,180,160,130,100,90];
var pre180DescConfig = [300,250,200,150,120,100];
var pre360DescConfig = [350,300,250,200,150,120];
var pre500DescConfig = [350,300,250,200,150,120];
var sumRateDescConfig = [-20,-25,-30,-35,-40,-45];
var sum3RateDescConfig = [20,18,16,14,12,10];
var sum5RateDescConfig = [40,35,30,25,20,15];
var sum10RateDescConfig = [80,70,60,50,40,30];
var sum20RateDescConfig = [90,85,80,70,60,50];
var sum30RateDescConfig = [110,100,90,80,70,60];
var sum60RateDescConfig = [120,110,100,90,80,70];
var sum90RateDescConfig = [130,120,110,100,90,80];



var dayLevelAscConfig = [
    minRAscConfig,
    avgRAscConfig,
    maxRAscConfig,
    day2AscConfig,
    day3AscConfig,
    day4AscConfig,
    day5AscConfig,
    day6AscConfig,
    day7AscConfig,
    day8AscConfig,
    day9AscConfig,
    day10AscConfig,
    day30AscConfig,
    day90AscConfig,
    day180AscConfig,
    day360AscConfig
];


var gapMinLevelAscConfig = [
    pre30AscConfig,
    pre90AscConfig,
    pre180AscConfig,
    pre360AscConfig,
    pre500AscConfig,
    sumRateAscConfig,
    sum3RateAscConfig,
    sum5RateAscConfig,
    sum10RateAscConfig,
    sum20RateAscConfig,
    sum30RateAscConfig,
    sum60RateAscConfig,
    sum90RateAscConfig
];

var gapMinLevelDescConfig = [
    pre30DescConfig,
    pre90DescConfig,
    pre180DescConfig,
    pre360DescConfig,
    pre500DescConfig,
    sumRateDescConfig,
    sum3RateDescConfig,
    sum5RateDescConfig,
    sum10RateDescConfig,
    sum20RateDescConfig,
    sum30RateDescConfig,
    sum60RateDescConfig,
    sum90RateDescConfig
];
//



function getDayLevel(value,levelValue,sequence){
    var index;

    if(sequence){//min --- max
        switch (true){
            case value <= levelValue[0]:
                index = 0;
                break;
            case value <= levelValue[1] && value > levelValue[0]:
                index = 1;
                break;
            case value <= levelValue[2] && value > levelValue[1]:
                index = 2;
                break;
            case value <= levelValue[3] && value > levelValue[2]:
                index = 3;
                break;
            case value <= levelValue[4] && value > levelValue[3]:
                index = 4;
                break;
            case value <= levelValue[5] && value > levelValue[4]:
                index = 5;
                break;
            case value > levelValue[5]:
                index = 6;
                break;
            default:
                index = 6;
                break;
        }
        return index;
    }else{//max --- min
        switch (true){
            case value >= levelValue[0]:
                index = 0;
                break;
            case value >= levelValue[1] && value < levelValue[0]:
                index = 1;
                break;
            case value >= levelValue[2] && value < levelValue[1]:
                index = 2;
                break;
            case value >= levelValue[3] && value < levelValue[2]:
                index = 3;
                break;
            case value >= levelValue[4] && value < levelValue[3]:
                index = 4;
                break;
            case value >= levelValue[5] && value < levelValue[4]:
                index = 5;
                break;
            case value < levelValue[5]:
                index = 6;
                break;
            default:
                index = 6;
                break;
        }
        return index;
    }

}




function writeTableDataLevelConfig(){

    $('writeTableLevel',{data:dayLevelConfig},function(data,status){
       if(status === 'success'){

       }

    });


}


function readTableDataLevelConfig(){

    $('readTableLevel',{data:'read'},function(data,status){
       if(status === 'success'){

       }

    });


}






//======================================================================================================================
//table_small_gap




//======================================================================================================================
//function getRateLevel(value, levelValue,sequence){
//     var index;
//     if(sequence){
//         switch (true){
//             case value <= levelValue[0]:
//                 index = 0;
//                 break;
//             case value <= levelValue[1] && value > levelValue[0]:
//                 index = 1;
//                 break;
//             case value <= levelValue[2] && value > levelValue[1]:
//                 index = 2;
//                 break;
//             case value <= levelValue[3] && value > levelValue[2]:
//                 index = 3;
//                 break;
//             case value <= levelValue[4] && value > levelValue[3]:
//                 index = 4;
//                 break;
//             case value <= levelValue[5] && value > levelValue[4]:
//                 index = 5;
//                 break;
//             case value > levelValue[5]:
//                 index = 6;
//                 break;
//             default:
//                 index = 6;
//                 break;
//         }
//         return index;
//     }else{
//         switch (true){
//             case value >= levelValue[0]:
//                 index = 0;
//                 break;
//             case value >= levelValue[1] && value < levelValue[0]:
//                 index = 1;
//                 break;
//             case value >= levelValue[2] && value < levelValue[1]:
//                 index = 2;
//                 break;
//             case value >= levelValue[3] && value < levelValue[2]:
//                 index = 3;
//                 break;
//             case value >= levelValue[4] && value < levelValue[3]:
//                 index = 4;
//                 break;
//             case value >= levelValue[5] && value < levelValue[4]:
//                 index = 5;
//                 break;
//             case value < levelValue[5]:
//                 index = 6;
//                 break;
//             default:
//                 index = 6;
//                 break;
//         }
//         return index;
//     }
//
// }













