document.write("<script language=javascript src='./javascripts/jquery-3.3.1.min.js'></script>");
document.write("<script language=javascript src='./javascripts/globalData.js'></script>");
document.write("<script language=javascript src='./javascripts/getTableDataLevel.js'></script>");

var isMine = false;
function initMainPage() {
    initButton();
}


function initButton(){
    $('#img_waterfall').click(function(){
        window.location.href='../gap_min_table';
    });

    $('#img_table').click(function(){
        window.location.href='../gap_min_scatter';
    });

    $('#img_kline').click(function(){
        window.location.href='../waterfall_kline';
    });
}