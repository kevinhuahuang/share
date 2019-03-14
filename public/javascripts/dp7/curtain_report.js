

function initReport() {
    initReportEvent();
    initReportDisplay();
}


function initReportEvent() {
    document.getElementById('report_print').onclick = reportPrintOnClick;
    document.getElementById('report_close').onclick = reportCloseOnClick;
    document.getElementById('report_excel').onclick = reportExcelOnClick;
}


function reportPrintOnClick() {
    preview(10);
}

function reportCloseOnClick() {
    console.log('close report');
    curtainOption(0);
}

function reportExcelOnClick() {
    console.log('export excel');
    exportExcell('report_table');
}
//======================================================================================================================
function preview(oper)
{
    if (oper < 10)
    {//局部打印 会让网页JS代码失效 所以不采用
        bdhtml=window.document.body.innerHTML;//获取当前页的html代码
        sprnstr="<!--startprint"+oper+"-->";//设置打印开始区域
        eprnstr="<!--endprint"+oper+"-->";//设置打印结束区域
        prnhtml=bdhtml.substring(bdhtml.indexOf(sprnstr)+18); //从开始代码向后取html

        prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));//从结束代码向前取html
        window.document.body.innerHTML=prnhtml;
        window.print();
        window.document.body.innerHTML=bdhtml;
    } else {//全部打印
        window.print();
    }
}
//======================================================================================================================
//导出为excell
var idTmr;
function  getExplorer() {
    var explorer = window.navigator.userAgent ;
    //ie
    if (explorer.indexOf("MSIE") >= 0) {
        return 'ie';
    }
    //firefox
    else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox';
    }
    //Chrome
    else if(explorer.indexOf("Chrome") >= 0){
        return 'Chrome';
    }
    //Opera
    else if(explorer.indexOf("Opera") >= 0){
        return 'Opera';
    }
    //Safari
    else if(explorer.indexOf("Safari") >= 0){
        return 'Safari';
    }
}

function exportExcell(tableid) {
    if(getExplorer()=='ie')
    {
        // console.log('ie');
        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select();
        sel.execCommand("Copy");
        xlsheet.Paste();
        oXL.Visible = true;

        try {
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
            print("Nested catch caught " + e);
        } finally {
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
            idTmr = window.setInterval("Cleanup();", 1);
        }

    }
    else
    {
        // console.log('not ie');
        tableToExcel(tableid,'name','dp7_data.xls');
    }
}

function Cleanup() {
    window.clearInterval(idTmr);
    CollectGarbage();
}

var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html><head><meta charset="UTF-8"></head><body><table border="1">{table}</table></body></html>',
        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
        format = function(s, c) {
            return s.replace(/{(\w+)}/g,
                function(m, p) { return c[p]; }) };
    return function(table, name,filename) {
        if (!table.nodeType) table = document.getElementById(table);
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
        document.getElementById("dlink").href = uri + base64(format(template, ctx));
        document.getElementById("dlink").download = filename;
        document.getElementById("dlink").click();
    }
})();
//======================================================================================================================

var first_column_element_name =  ['channel_name_type','mute_type','gain_type','phase_type','delay_type',
    'eq1_type_type','eq1_gain_type','eq1_freq_type','eq1_bandwidth_type',
    'eq2_type_type','eq2_gain_type','eq2_freq_type','eq2_bandwidth_type',
    'eq3_type_type','eq3_gain_type','eq3_freq_type','eq3_bandwidth_type',
    'eq4_type_type','eq4_gain_type','eq4_freq_type','eq4_bandwidth_type',
    'eq5_type_type','eq5_gain_type','eq5_freq_type','eq5_bandwidth_type',
    'eq6_type_type','eq6_gain_type','eq6_freq_type','eq6_bandwidth_type',
    'deq1_freq_type','deq1_bandwidth_type','deq1_level_type','deq1_threshold_type','deq1_ratio_type','deq1_attack_type','deq1_release_type',
    'deq2_freq_type','deq2_bandwidth_type','deq2_level_type','deq2_threshold_type','deq2_ratio_type','deq2_attack_type','deq2_release_type',
    'matrix_a_type','matrix_b_type','matrix_c_type','matrix_d_type',
    'lpf_type_type','lpf_freq_type','lpf_slope_type',
    'hpf_type_type','hpf_freq_type','hpf_slope_type',
    'noise_gate_type',
    'limit_threshold_type','limit_attack_type','limit_release_type',
    'compress_threshold_type','compress_ratio_type','compress_attack_type','compress_release_type',
    'agc_threshold_type','agc_level_type','agc_attack_type','agc_release_type','agc_ratio_type',
    'link_type'];

var FIRST_COLUMN_CHINESE = ['通道名称','静音','增益','相位','延时',
    '均衡1类型','均衡1增益','均衡1频率','均衡1带宽',
    '均衡2类型','均衡2增益','均衡2频率','均衡2带宽',
    '均衡3类型','均衡3增益','均衡3频率','均衡3带宽',
    '均衡4类型','均衡4增益','均衡4频率','均衡4带宽',
    '均衡5类型','均衡5增益','均衡5频率','均衡5带宽',
    '均衡6类型','均衡6增益','均衡6频率','均衡6带宽',
    'DEQ_1频率','DEQ_1带宽','DEQ_1电平','DEQ_1阈值','DEQ_1比率','DEQ_1响应时间','DEQ_1释放时间',
    'DEQ_2频率','DEQ_2带宽','DEQ_2电平','DEQ_2阈值','DEQ_2比率','DEQ_2响应时间','DEQ_2释放时间',
    '矩阵输入A','矩阵输入B','矩阵输入C','矩阵输入D',
    '低通类型','低通频率','低通斜率',
    '高通类型','高通频率','高通斜率',
    '噪声门',
    '限幅_阈值','限幅_响应时间','限幅_释放时间',
    '压缩_阈值','压缩比','压缩_响应时间','压缩_释放时间',
    '自动增益_阈值','自动增益_目标电平','自动增益_启动时间','自动增益_释放时间','自动增益_比率',
    '联调'];

var FIRST_COLUMN_ENGLISH = ['Name','Mute','Gain','Polarity','Delay',
    'EQ1 Type','EQ1 Gain','EQ1 FQCY','EQ1 BW',
    'EQ2 Type','EQ2 Gain','EQ2 FQCY','EQ2 BW',
    'EQ3 Type','EQ3 Gain','EQ3 FQCY','EQ3 BW',
    'EQ4 Type','EQ4 Gain','EQ4 FQCY','EQ4 BW',
    'EQ5 Type','EQ5 Gain','EQ5 FQCY','EQ5 BW',
    'EQ6 Type','EQ6 Gain','EQ6 FQCY','EQ6 BW',
    'DEQ1_Freq','DEQ1_BW','DEQ1_Level','DEQ1_Threshold','DEQ1_Ratio','DEQ1_Attack Time','DEQ1_Release Time',
    'DEQ2_Freq','DEQ2_BW','DEQ2_Level','DEQ2_Threshold','DEQ2_Ratio','DEQ2_Attack Time','DEQ2_Release Time',
    'Src CHA','Src CHB','Src CHC','Src CHD',
    'XMode_Lo','XFQCY_Lo','XSLope_Lo',
    'XMode_Hi','XFQCY_Hi','XSLope_Hi',
    'NoiseGate',
    'Limiter_Threshold','Limiter_Attack Time', 'Limiter_Release Time',
    'Comp_Threshold', 'Comp_Ratio','Comp_Attack Time','Comp_Release Time',
    'AGC_Threshold','AGC_Target Level','AGC_Attack time','AGC_Release time','AGC_Ratio',
    'Link'];


function getReportEqType(type) {
    var typeStringChinese = ['参量均衡','低调','高调','1阶全通','2阶全通'];
    var typeStringEnglish = ['PEQ','Lo_Shelf','Hi_Shelf','APF 1st','APF 2nd'];
    if(isChinese) {
        return typeStringChinese[type];
    } else {
        return typeStringEnglish[type];
    }
}


function getReportLink(type) {
    var typeString = ['CHA', 'CHB', 'CHC', 'CHD', 'CH1', 'CH2', 'CH3', 'CH4', 'CH5', 'CH6', 'CH7', 'CH8'];
    return typeString[type];
}

function getXoverType(type) {
    var typeStringChinese = ['宁克','贝赛尔','巴特沃斯'];
    var typeStringEnglish = ['Link_Ril','Bessel','ButterW'];
    if(isChinese) {
        return typeStringChinese[type];
    } else {
        return typeStringEnglish[type];
    }
}

function getXoverSlope(oct, octL, mode) {
    var typeString;
    // console.log('type:' + type + '  mode:' + mode);
    var index;
    if(mode === 0) {
        typeString = ['12dB/oct','24dB/oct','36dB/oct','48dB/oct'];
        index = octL;
    }else {
        typeString = ['12dB/oct','18dB/oct','24dB/oct','30dB/oct','36dB/oct','42dB/oct','48dB/oct'];
        index = oct;
    }
    return typeString[index];
}



function initReportDisplay() {
    var i,index;
    var eleArray = [];

    var polar_positive;
    var polar_negative;
    var source_open;
    var source_close;
    var lockText;

    if(isChinese) {
        polar_positive = '正相';
        polar_negative = '反相';
        lockText = CHINESE_LOCK_TEXT;
        source_open = '打开';
        source_close = '关闭';
    } else {
        polar_positive = '+';
        polar_negative = '-';
        lockText = ENGLISH_LOCK_TEXT;
        source_open = 'On';
        source_close = 'Off';
    }

    var iLock = currentLockData.nIn_LockData;
    var oLock = currentLockData.nOut_LockData;

    //按钮
    setElementLanguageValue('report_print', '打印', 'Print');
    setElementLanguageValue('report_close', '关闭', 'Close');
    setLabelElementLanguageValue('report_excel', '导出Excel', 'Export Excel');


    //第一列 列头
    var firstColumnText;
    if(isChinese){
        firstColumnText = FIRST_COLUMN_CHINESE;
    } else {
        firstColumnText = FIRST_COLUMN_ENGLISH;
    }
    for(i = 0; i < FIRST_COLUMN_CHINESE.length; i++) {
        document.getElementById(first_column_element_name[i]).innerText = firstColumnText[i];
    }


    //第二列 CHA
    index=0;
    for(i = 0; i < first_column_element_name.length; i++) {
        eleArray[i] = document.getElementById(first_column_element_name[i].replace(/_type$/,'_cha'));
    }
    eleArray[index++].innerText = iLock.nIn_Name ? lockText : currentGroupData.dataInputA.name;
    eleArray[index++].innerText = iLock.nIn_Mute ? lockText : currentGroupData.dataInputA.mute ? 'OFF' : 'ON';
    eleArray[index++].innerText = iLock.nIn_Gain ? lockText : getChanelGainDisplay(currentGroupData.dataInputA.gain) + 'dB';
    eleArray[index++].innerText = iLock.nIn_Pol ? lockText : !currentGroupData.dataInputA.polar ? polar_positive : polar_negative;
    eleArray[index++].innerText = iLock.nIn_Delay ? lockText : getDelayTimeDisplay(currentGroupData.dataInputA.delay,currentGroupData.dataInputA.secondDelay);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getReportEqType(currentGroupData.dataInputA.InEQ.EQ1.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getEqGainDisplay(currentGroupData.dataInputA.InEQ.EQ1.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputA.InEQ.EQ1.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputA.InEQ.EQ1.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getReportEqType(currentGroupData.dataInputA.InEQ.EQ2.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getEqGainDisplay(currentGroupData.dataInputA.InEQ.EQ2.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputA.InEQ.EQ2.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputA.InEQ.EQ2.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getReportEqType(currentGroupData.dataInputA.InEQ.EQ3.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getEqGainDisplay(currentGroupData.dataInputA.InEQ.EQ3.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputA.InEQ.EQ3.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputA.InEQ.EQ3.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getReportEqType(currentGroupData.dataInputA.InEQ.EQ4.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getEqGainDisplay(currentGroupData.dataInputA.InEQ.EQ4.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputA.InEQ.EQ4.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputA.InEQ.EQ4.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getReportEqType(currentGroupData.dataInputA.InEQ.EQ5.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getEqGainDisplay(currentGroupData.dataInputA.InEQ.EQ5.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputA.InEQ.EQ5.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputA.InEQ.EQ5.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getReportEqType(currentGroupData.dataInputA.InEQ.EQ6.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getEqGainDisplay(currentGroupData.dataInputA.InEQ.EQ6.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputA.InEQ.EQ6.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputA.InEQ.EQ6.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputA.InDeq1.req);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputA.InDeq1.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getDeqLevelDisplay(currentGroupData.dataInputA.DeqParam1.DEQ_level);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getDeqThresholdDisplay(currentGroupData.dataInputA.DeqParam1.DEQ_Threshold);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getExtensionRationDisplayForReport(currentGroupData.dataInputA.DeqParam1.DEQ_ratio);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getAttackTimeDisplay(currentGroupData.dataInputA.DeqParam1.DEQ_a) + 'ms';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getReleaseTimeDisplay(currentGroupData.dataInputA.DeqParam1.DEQ_r) + 'ms';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputA.InDeq2.req);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputA.InDeq2.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getDeqLevelDisplay(currentGroupData.dataInputA.DeqParam2.DEQ_level);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getDeqThresholdDisplay(currentGroupData.dataInputA.DeqParam2.DEQ_Threshold);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getExtensionRationDisplayForReport(currentGroupData.dataInputA.DeqParam2.DEQ_ratio);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getAttackTimeDisplay(currentGroupData.dataInputA.DeqParam2.DEQ_a) + 'ms';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getReleaseTimeDisplay(currentGroupData.dataInputA.DeqParam2.DEQ_r) + 'ms';
    eleArray[index++].innerText = ""; //矩阵输入A
    eleArray[index++].innerText = ""; //矩阵输入B
    eleArray[index++].innerText = ""; //矩阵输入C
    eleArray[index++].innerText = ""; //矩阵输入D
    eleArray[index++].innerText = ""; //低通类型
    eleArray[index++].innerText = ""; //低通频率
    eleArray[index++].innerText = ""; //低通斜率
    eleArray[index++].innerText = ""; //高通类型
    eleArray[index++].innerText = ""; //高通频率
    eleArray[index++].innerText = ""; //高通斜率
    eleArray[index++].innerText = iLock.nIn_NoiseGate ? lockText : getNoiseGateDisplay(currentGroupData.dataInputA.noisegate);
    eleArray[index++].innerText = ""; //限幅_阈值
    eleArray[index++].innerText = ""; //限幅_响应时间
    eleArray[index++].innerText = ""; //限幅_释放时间
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getInputCompressThresholdDisplay(currentGroupData.dataInputA.compLevel);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getCompressRationDisplay(currentGroupData.dataInputA.compRatio);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getAttackTimeDisplay(currentGroupData.dataInputA.compAttack);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getReleaseTimeDisplay(currentGroupData.dataInputA.compRelease);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getInputThresholdDisplay(currentGroupData.dataInputA.agThreshold) + 'dBu';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getInputTargetLevelDisplay(currentGroupData.dataInputA.agLevel) + 'dBu';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getAttackTimeDisplay(currentGroupData.dataInputA.agAttack) + 'ms';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getReleaseTimeDisplay(currentGroupData.dataInputA.agRelease) + 'ms';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getExtensionRationDisplayForReport(currentGroupData.dataInputA.agRatio);
    eleArray[index++].innerText = iLock.nIn_Link ? lockText : getReportLink(currentGroupData.dataInputA.inLinkSel);

    //第三列 CHB
    index=0;
    for(i = 0; i < first_column_element_name.length; i++) {
        eleArray[i] = document.getElementById(first_column_element_name[i].replace(/_type$/,'_chb'));
    }
    eleArray[index++].innerText = iLock.nIn_Name ? lockText : currentGroupData.dataInputB.name;
    eleArray[index++].innerText = iLock.nIn_Mute ? lockText : currentGroupData.dataInputB.mute ? 'OFF' : 'ON';
    eleArray[index++].innerText = iLock.nIn_Gain ? lockText : getChanelGainDisplay(currentGroupData.dataInputB.gain) + 'dB';
    eleArray[index++].innerText = iLock.nIn_Pol ? lockText : !currentGroupData.dataInputB.polar ? polar_positive : polar_negative;
    eleArray[index++].innerText = iLock.nIn_Delay ? lockText : getDelayTimeDisplay(currentGroupData.dataInputB.delay,currentGroupData.dataInputB.secondDelay);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getReportEqType(currentGroupData.dataInputB.InEQ.EQ1.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getEqGainDisplay(currentGroupData.dataInputB.InEQ.EQ1.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputB.InEQ.EQ1.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputB.InEQ.EQ1.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getReportEqType(currentGroupData.dataInputB.InEQ.EQ2.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getEqGainDisplay(currentGroupData.dataInputB.InEQ.EQ2.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputB.InEQ.EQ2.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputB.InEQ.EQ2.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getReportEqType(currentGroupData.dataInputB.InEQ.EQ3.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getEqGainDisplay(currentGroupData.dataInputB.InEQ.EQ3.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputB.InEQ.EQ3.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputB.InEQ.EQ3.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getReportEqType(currentGroupData.dataInputB.InEQ.EQ4.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getEqGainDisplay(currentGroupData.dataInputB.InEQ.EQ4.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputB.InEQ.EQ4.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputB.InEQ.EQ4.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getReportEqType(currentGroupData.dataInputB.InEQ.EQ5.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getEqGainDisplay(currentGroupData.dataInputB.InEQ.EQ5.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputB.InEQ.EQ5.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputB.InEQ.EQ5.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getReportEqType(currentGroupData.dataInputB.InEQ.EQ6.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getEqGainDisplay(currentGroupData.dataInputB.InEQ.EQ6.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputB.InEQ.EQ6.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputB.InEQ.EQ6.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputB.InDeq1.req);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputB.InDeq1.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getDeqLevelDisplay(currentGroupData.dataInputB.DeqParam1.DEQ_level);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getDeqThresholdDisplay(currentGroupData.dataInputB.DeqParam1.DEQ_Threshold);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getExtensionRationDisplayForReport(currentGroupData.dataInputB.DeqParam1.DEQ_ratio);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getAttackTimeDisplay(currentGroupData.dataInputB.DeqParam1.DEQ_a) + 'ms';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getReleaseTimeDisplay(currentGroupData.dataInputB.DeqParam1.DEQ_r) + 'ms';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getFrequencyDisplay(currentGroupData.dataInputB.InDeq2.req);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getBandwidthDisplay(currentGroupData.dataInputB.InDeq2.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getDeqLevelDisplay(currentGroupData.dataInputB.DeqParam2.DEQ_level);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getDeqThresholdDisplay(currentGroupData.dataInputB.DeqParam2.DEQ_Threshold);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getExtensionRationDisplayForReport(currentGroupData.dataInputB.DeqParam2.DEQ_ratio);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getAttackTimeDisplay(currentGroupData.dataInputB.DeqParam2.DEQ_a) + 'ms';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText : getReleaseTimeDisplay(currentGroupData.dataInputB.DeqParam2.DEQ_r) + 'ms';
    eleArray[index++].innerText = ""; //矩阵输入A
    eleArray[index++].innerText = ""; //矩阵输入B
    eleArray[index++].innerText = ""; //矩阵输入C
    eleArray[index++].innerText = ""; //矩阵输入D
    eleArray[index++].innerText = ""; //低通类型
    eleArray[index++].innerText = ""; //低通频率
    eleArray[index++].innerText = ""; //低通斜率
    eleArray[index++].innerText = ""; //高通类型
    eleArray[index++].innerText = ""; //高通频率
    eleArray[index++].innerText = ""; //高通斜率
    eleArray[index++].innerText = iLock.nIn_NoiseGate ? lockText : getNoiseGateDisplay(currentGroupData.dataInputB.noisegate);
    eleArray[index++].innerText = ""; //限幅_阈值
    eleArray[index++].innerText = ""; //限幅_响应时间
    eleArray[index++].innerText = ""; //限幅_释放时间
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getInputCompressThresholdDisplay(currentGroupData.dataInputB.compLevel);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getCompressRationDisplay(currentGroupData.dataInputB.compRatio);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getAttackTimeDisplay(currentGroupData.dataInputB.compAttack);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getReleaseTimeDisplay(currentGroupData.dataInputB.compRelease);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getInputThresholdDisplay(currentGroupData.dataInputB.agThreshold) + 'dBu';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getInputTargetLevelDisplay(currentGroupData.dataInputB.agLevel) + 'dBu';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getAttackTimeDisplay(currentGroupData.dataInputB.agAttack) + 'ms';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getReleaseTimeDisplay(currentGroupData.dataInputB.agRelease) + 'ms';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getExtensionRationDisplayForReport(currentGroupData.dataInputB.agRatio);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText : getReportLink(currentGroupData.dataInputB.inLinkSel);

    //第四列 CHC
    index=0;
    for(i = 0; i < first_column_element_name.length; i++) {
        eleArray[i] = document.getElementById(first_column_element_name[i].replace(/_type$/,'_chc'));
    }
    eleArray[index++].innerText = iLock.nIn_Name ? lockText :currentGroupData.dataInputC.name;
    eleArray[index++].innerText = iLock.nIn_Mute ? lockText :currentGroupData.dataInputC.mute ? 'OFF' : 'ON';
    eleArray[index++].innerText = iLock.nIn_Gain ? lockText :getChanelGainDisplay(currentGroupData.dataInputC.gain) + 'dB';
    eleArray[index++].innerText = iLock.nIn_Pol ? lockText : !currentGroupData.dataInputC.polar ? polar_positive : polar_negative;
    eleArray[index++].innerText = iLock.nIn_Delay ? lockText :getDelayTimeDisplay(currentGroupData.dataInputC.delay,currentGroupData.dataInputC.secondDelay);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getReportEqType(currentGroupData.dataInputC.InEQ.EQ1.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getEqGainDisplay(currentGroupData.dataInputC.InEQ.EQ1.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getFrequencyDisplay(currentGroupData.dataInputC.InEQ.EQ1.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getBandwidthDisplay(currentGroupData.dataInputC.InEQ.EQ1.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getReportEqType(currentGroupData.dataInputC.InEQ.EQ2.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getEqGainDisplay(currentGroupData.dataInputC.InEQ.EQ2.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getFrequencyDisplay(currentGroupData.dataInputC.InEQ.EQ2.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getBandwidthDisplay(currentGroupData.dataInputC.InEQ.EQ2.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getReportEqType(currentGroupData.dataInputC.InEQ.EQ3.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getEqGainDisplay(currentGroupData.dataInputC.InEQ.EQ3.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getFrequencyDisplay(currentGroupData.dataInputC.InEQ.EQ3.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getBandwidthDisplay(currentGroupData.dataInputC.InEQ.EQ3.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getReportEqType(currentGroupData.dataInputC.InEQ.EQ4.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getEqGainDisplay(currentGroupData.dataInputC.InEQ.EQ4.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getFrequencyDisplay(currentGroupData.dataInputC.InEQ.EQ4.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getBandwidthDisplay(currentGroupData.dataInputC.InEQ.EQ4.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getReportEqType(currentGroupData.dataInputC.InEQ.EQ5.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getEqGainDisplay(currentGroupData.dataInputC.InEQ.EQ5.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getFrequencyDisplay(currentGroupData.dataInputC.InEQ.EQ5.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getBandwidthDisplay(currentGroupData.dataInputC.InEQ.EQ5.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getReportEqType(currentGroupData.dataInputC.InEQ.EQ6.type);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getEqGainDisplay(currentGroupData.dataInputC.InEQ.EQ6.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getFrequencyDisplay(currentGroupData.dataInputC.InEQ.EQ6.freq);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getBandwidthDisplay(currentGroupData.dataInputC.InEQ.EQ6.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getFrequencyDisplay(currentGroupData.dataInputC.InDeq1.req);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getBandwidthDisplay(currentGroupData.dataInputC.InDeq1.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getDeqLevelDisplay(currentGroupData.dataInputC.DeqParam1.DEQ_level);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getDeqThresholdDisplay(currentGroupData.dataInputC.DeqParam1.DEQ_Threshold);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getExtensionRationDisplayForReport(currentGroupData.dataInputC.DeqParam1.DEQ_ratio);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getAttackTimeDisplay(currentGroupData.dataInputC.DeqParam1.DEQ_a) + 'ms';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getReleaseTimeDisplay(currentGroupData.dataInputC.DeqParam1.DEQ_r) + 'ms';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getFrequencyDisplay(currentGroupData.dataInputC.InDeq2.req);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getBandwidthDisplay(currentGroupData.dataInputC.InDeq2.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getDeqLevelDisplay(currentGroupData.dataInputC.DeqParam2.DEQ_level);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getDeqThresholdDisplay(currentGroupData.dataInputC.DeqParam2.DEQ_Threshold);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getExtensionRationDisplayForReport(currentGroupData.dataInputC.DeqParam2.DEQ_ratio);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getAttackTimeDisplay(currentGroupData.dataInputC.DeqParam2.DEQ_a) + 'ms';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getReleaseTimeDisplay(currentGroupData.dataInputC.DeqParam2.DEQ_r) + 'ms';
    eleArray[index++].innerText = ""; //矩阵输入A
    eleArray[index++].innerText = ""; //矩阵输入B
    eleArray[index++].innerText = ""; //矩阵输入C
    eleArray[index++].innerText = ""; //矩阵输入D
    eleArray[index++].innerText = ""; //低通类型
    eleArray[index++].innerText = ""; //低通频率
    eleArray[index++].innerText = ""; //低通斜率
    eleArray[index++].innerText = ""; //高通类型
    eleArray[index++].innerText = ""; //高通频率
    eleArray[index++].innerText = ""; //高通斜率
    eleArray[index++].innerText = iLock.nIn_NoiseGate ? lockText :getNoiseGateDisplay(currentGroupData.dataInputC.noisegate);
    eleArray[index++].innerText = ""; //限幅_阈值
    eleArray[index++].innerText = ""; //限幅_响应时间
    eleArray[index++].innerText = ""; //限幅_释放时间
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getInputCompressThresholdDisplay(currentGroupData.dataInputC.compLevel);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getCompressRationDisplay(currentGroupData.dataInputC.compRatio);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getAttackTimeDisplay(currentGroupData.dataInputC.compAttack);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getReleaseTimeDisplay(currentGroupData.dataInputC.compRelease);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getInputThresholdDisplay(currentGroupData.dataInputC.agThreshold) + 'dBu';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getInputTargetLevelDisplay(currentGroupData.dataInputC.agLevel) + 'dBu';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getAttackTimeDisplay(currentGroupData.dataInputC.agAttack) + 'ms';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getReleaseTimeDisplay(currentGroupData.dataInputC.agRelease) + 'ms';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getExtensionRationDisplayForReport(currentGroupData.dataInputC.agRatio);
    eleArray[index++].innerText = iLock.nIn_Link ? lockText :getReportLink(currentGroupData.dataInputC.inLinkSel);

    //第五列 CHD
    index=0;
    for(i = 0; i < first_column_element_name.length; i++) {
        eleArray[i] = document.getElementById(first_column_element_name[i].replace(/_type$/,'_chd'));
    }
    eleArray[index++].innerText = iLock.nIn_Name ? lockText :currentGroupData.dataInputD.name;
    eleArray[index++].innerText = iLock.nIn_Mute ? lockText :currentGroupData.dataInputD.mute ? 'OFF' : 'ON';
    eleArray[index++].innerText = iLock.nIn_Gain ? lockText :getChanelGainDisplay(currentGroupData.dataInputD.gain) + 'dB';
    eleArray[index++].innerText = iLock.nIn_Pol ? lockText : !currentGroupData.dataInputD.polar ? polar_positive : polar_negative;
    eleArray[index++].innerText = iLock.nIn_Delay ? lockText :getDelayTimeDisplay(currentGroupData.dataInputD.delay,currentGroupData.dataInputD.secondDelay);
    eleArray[index++].innerText = iLock.nIn_EQ ? lockText :getReportEqType(currentGroupData.dataInputD.InEQ.EQ1.type);
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getEqGainDisplay(currentGroupData.dataInputD.InEQ.EQ1.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getFrequencyDisplay(currentGroupData.dataInputD.InEQ.EQ1.freq);
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getBandwidthDisplay(currentGroupData.dataInputD.InEQ.EQ1.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getReportEqType(currentGroupData.dataInputD.InEQ.EQ2.type);
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getEqGainDisplay(currentGroupData.dataInputD.InEQ.EQ2.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getFrequencyDisplay(currentGroupData.dataInputD.InEQ.EQ2.freq);
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getBandwidthDisplay(currentGroupData.dataInputD.InEQ.EQ2.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getReportEqType(currentGroupData.dataInputD.InEQ.EQ3.type);
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getEqGainDisplay(currentGroupData.dataInputD.InEQ.EQ3.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getFrequencyDisplay(currentGroupData.dataInputD.InEQ.EQ3.freq);
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getBandwidthDisplay(currentGroupData.dataInputD.InEQ.EQ3.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getReportEqType(currentGroupData.dataInputD.InEQ.EQ4.type);
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getEqGainDisplay(currentGroupData.dataInputD.InEQ.EQ4.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getFrequencyDisplay(currentGroupData.dataInputD.InEQ.EQ4.freq);
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getBandwidthDisplay(currentGroupData.dataInputD.InEQ.EQ4.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getReportEqType(currentGroupData.dataInputD.InEQ.EQ5.type);
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getEqGainDisplay(currentGroupData.dataInputD.InEQ.EQ5.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getFrequencyDisplay(currentGroupData.dataInputD.InEQ.EQ5.freq);
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getBandwidthDisplay(currentGroupData.dataInputD.InEQ.EQ5.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getReportEqType(currentGroupData.dataInputD.InEQ.EQ6.type);
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getEqGainDisplay(currentGroupData.dataInputD.InEQ.EQ6.level) + 'dB';
    eleArray[index++].innerText = iLock.nIn_EQ? lockText :getFrequencyDisplay(currentGroupData.dataInputD.InEQ.EQ6.freq);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getBandwidthDisplay(currentGroupData.dataInputD.InEQ.EQ6.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getFrequencyDisplay(currentGroupData.dataInputD.InDeq1.req);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getBandwidthDisplay(currentGroupData.dataInputD.InDeq1.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getDeqLevelDisplay(currentGroupData.dataInputD.DeqParam1.DEQ_level);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getDeqThresholdDisplay(currentGroupData.dataInputD.DeqParam1.DEQ_Threshold);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getExtensionRationDisplayForReport(currentGroupData.dataInputD.DeqParam1.DEQ_ratio);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getAttackTimeDisplay(currentGroupData.dataInputD.DeqParam1.DEQ_a) + 'ms';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getReleaseTimeDisplay(currentGroupData.dataInputD.DeqParam1.DEQ_r) + 'ms';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getFrequencyDisplay(currentGroupData.dataInputD.InDeq2.req);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getBandwidthDisplay(currentGroupData.dataInputD.InDeq2.bw) + 'oct';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getDeqLevelDisplay(currentGroupData.dataInputD.DeqParam2.DEQ_level);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getDeqThresholdDisplay(currentGroupData.dataInputD.DeqParam2.DEQ_Threshold);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getExtensionRationDisplayForReport(currentGroupData.dataInputD.DeqParam2.DEQ_ratio);
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getAttackTimeDisplay(currentGroupData.dataInputD.DeqParam2.DEQ_a) + 'ms';
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getReleaseTimeDisplay(currentGroupData.dataInputD.DeqParam2.DEQ_r) + 'ms';
    eleArray[index++].innerText = ""; //矩阵输入A
    eleArray[index++].innerText = ""; //矩阵输入B
    eleArray[index++].innerText = ""; //矩阵输入C
    eleArray[index++].innerText = ""; //矩阵输入D
    eleArray[index++].innerText = ""; //低通类型
    eleArray[index++].innerText = ""; //低通频率
    eleArray[index++].innerText = ""; //低通斜率
    eleArray[index++].innerText = ""; //高通类型
    eleArray[index++].innerText = ""; //高通频率
    eleArray[index++].innerText = ""; //高通斜率
    eleArray[index++].innerText = iLock.nIn_DEQ ? lockText :getNoiseGateDisplay(currentGroupData.dataInputD.noisegate);
    eleArray[index++].innerText = ""; //限幅_阈值
    eleArray[index++].innerText = ""; //限幅_响应时间
    eleArray[index++].innerText = ""; //限幅_释放时间
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getInputCompressThresholdDisplay(currentGroupData.dataInputD.compLevel);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getCompressRationDisplay(currentGroupData.dataInputD.compRatio);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getAttackTimeDisplay(currentGroupData.dataInputD.compAttack);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getReleaseTimeDisplay(currentGroupData.dataInputD.compRelease);
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getInputThresholdDisplay(currentGroupData.dataInputD.agThreshold) + 'dBu';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getInputTargetLevelDisplay(currentGroupData.dataInputD.agLevel) + 'dBu';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getAttackTimeDisplay(currentGroupData.dataInputD.agAttack) + 'ms';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getReleaseTimeDisplay(currentGroupData.dataInputD.agRelease) + 'ms';
    eleArray[index++].innerText = iLock.nIn_Comp_AG ? lockText :getExtensionRationDisplayForReport(currentGroupData.dataInputD.agRatio);
    eleArray[index++].innerText = iLock.nIn_Link ? lockText :getReportLink(currentGroupData.dataInputD.inLinkSel);

    //第六列 CH1
    index=0;
    for(i = 0; i < first_column_element_name.length; i++) {
        eleArray[i] = document.getElementById(first_column_element_name[i].replace(/_type$/,'_ch1'));
    }
    eleArray[index++].innerText = oLock.nOut_Name ? lockText : currentGroupData.dataOut1.name;
    eleArray[index++].innerText = oLock.nOut_Mute ? lockText : currentGroupData.dataOut1.mute ? 'OFF' : 'ON';
    eleArray[index++].innerText = oLock.nOut_Gain ? lockText : getChanelGainDisplay(currentGroupData.dataOut1.gain) + 'dB';
    eleArray[index++].innerText = oLock.nOut_Pol ? lockText : !currentGroupData.dataOut1.polar ? polar_positive : polar_negative;
    eleArray[index++].innerText = oLock.nOut_Delay ? lockText : getDelayTimeDisplay(currentGroupData.dataOut1.delay,currentGroupData.dataOut1.secondDelay);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut1.OutEQ.EQ1.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut1.OutEQ.EQ1.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut1.OutEQ.EQ1.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut1.OutEQ.EQ1.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut1.OutEQ.EQ2.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut1.OutEQ.EQ2.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut1.OutEQ.EQ2.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut1.OutEQ.EQ2.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut1.OutEQ.EQ3.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut1.OutEQ.EQ3.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut1.OutEQ.EQ3.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut1.OutEQ.EQ3.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut1.OutEQ.EQ4.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut1.OutEQ.EQ4.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut1.OutEQ.EQ4.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut1.OutEQ.EQ4.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut1.OutEQ.EQ5.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut1.OutEQ.EQ5.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut1.OutEQ.EQ5.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut1.OutEQ.EQ5.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut1.OutEQ.EQ6.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut1.OutEQ.EQ6.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut1.OutEQ.EQ6.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut1.OutEQ.EQ6.bw) + 'oct';
    eleArray[index++].innerText = ""; //DEQ1频率
    eleArray[index++].innerText = ""; //DEQ1带宽
    eleArray[index++].innerText = ""; //DEQ1电平
    eleArray[index++].innerText = ""; //DEQ1阈值
    eleArray[index++].innerText = ""; //DEQ1比率
    eleArray[index++].innerText = ""; //DEQ1响应时间
    eleArray[index++].innerText = ""; //DEQ1释放时间
    eleArray[index++].innerText = ""; //DEQ2频率
    eleArray[index++].innerText = ""; //DEQ2带宽
    eleArray[index++].innerText = ""; //DEQ2电平
    eleArray[index++].innerText = ""; //DEQ2阈值
    eleArray[index++].innerText = ""; //DEQ2比率
    eleArray[index++].innerText = ""; //DEQ2响应时间
    eleArray[index++].innerText = ""; //DEQ2释放时间
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut1.sourceA?source_open:source_close; //矩阵输入A
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut1.sourceB?source_open:source_close; //矩阵输入B
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut1.sourceC?source_open:source_close; //矩阵输入C
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut1.sourceD?source_open:source_close; //矩阵输入D
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut1.LPFData.HL_Type); //低通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut1.LPFData.HL_freq);//低通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut1.LPFData.HL_Oct, currentGroupData.dataOut1.LPFData.LR_Level, currentGroupData.dataOut1.LPFData.HL_Type);//低通斜率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut1.HPFData.HL_Type);//高通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut1.HPFData.HL_freq);//高通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut1.HPFData.HL_Oct, currentGroupData.dataOut1.HPFData.LR_Level, currentGroupData.dataOut1.HPFData.HL_Type); //高通斜率
    eleArray[index++].innerText = "";
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getOutputLimiterThresholdDisplay(currentGroupData.dataOut1.limT); //限幅_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut1.limAttack) + 'ms'; //限幅_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut1.limRelease) + 'ms'; //限幅_释放时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getInputCompressThresholdDisplay(currentGroupData.dataOut1.compLevel);  //压缩_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getCompressRationDisplay(currentGroupData.dataOut1.compRatio);  //压缩比
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut1.compAttack) + 'ms'; //压缩_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut1.compR) + 'ms';  //压缩_释放时间
    eleArray[index++].innerText = "";  //自动增益_阈值
    eleArray[index++].innerText = "";  //自动增益_目标电平
    eleArray[index++].innerText = "";  //自动增益_启动时间
    eleArray[index++].innerText = "";  //自动增益_释放时间
    eleArray[index++].innerText = "";  //自动增益_比率
    eleArray[index++].innerText = oLock.nOut_Link ? lockText : getReportLink(currentGroupData.dataOut1.outLinkSel + 4);  //联调

    //第七列 CH2
    index=0;
    for(i = 0; i < first_column_element_name.length; i++) {
        eleArray[i] = document.getElementById(first_column_element_name[i].replace(/_type$/,'_ch2'));
    }
    eleArray[index++].innerText = oLock.nOut_Name ? lockText : currentGroupData.dataOut2.name;
    eleArray[index++].innerText = oLock.nOut_Mute ? lockText : currentGroupData.dataOut2.mute ? 'OFF' : 'ON';
    eleArray[index++].innerText = oLock.nOut_Gain ? lockText : getChanelGainDisplay(currentGroupData.dataOut2.gain) + 'dB';
    eleArray[index++].innerText = oLock.nOut_Pol ? lockText : !currentGroupData.dataOut2.polar ? polar_positive : polar_negative;
    eleArray[index++].innerText = oLock.nOut_Delay ? lockText : getDelayTimeDisplay(currentGroupData.dataOut2.delay,currentGroupData.dataOut2.secondDelay);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut2.OutEQ.EQ1.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut2.OutEQ.EQ1.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut2.OutEQ.EQ1.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut2.OutEQ.EQ1.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut2.OutEQ.EQ2.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut2.OutEQ.EQ2.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut2.OutEQ.EQ2.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut2.OutEQ.EQ2.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut2.OutEQ.EQ3.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut2.OutEQ.EQ3.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut2.OutEQ.EQ3.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut2.OutEQ.EQ3.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut2.OutEQ.EQ4.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut2.OutEQ.EQ4.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut2.OutEQ.EQ4.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut2.OutEQ.EQ4.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut2.OutEQ.EQ5.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut2.OutEQ.EQ5.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut2.OutEQ.EQ5.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut2.OutEQ.EQ5.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut2.OutEQ.EQ6.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut2.OutEQ.EQ6.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut2.OutEQ.EQ6.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut2.OutEQ.EQ6.bw) + 'oct';
    eleArray[index++].innerText = ""; //DEQ1频率
    eleArray[index++].innerText = ""; //DEQ1带宽
    eleArray[index++].innerText = ""; //DEQ1电平
    eleArray[index++].innerText = ""; //DEQ1阈值
    eleArray[index++].innerText = ""; //DEQ1比率
    eleArray[index++].innerText = ""; //DEQ1响应时间
    eleArray[index++].innerText = ""; //DEQ1释放时间
    eleArray[index++].innerText = ""; //DEQ2频率
    eleArray[index++].innerText = ""; //DEQ2带宽
    eleArray[index++].innerText = ""; //DEQ2电平
    eleArray[index++].innerText = ""; //DEQ2阈值
    eleArray[index++].innerText = ""; //DEQ2比率
    eleArray[index++].innerText = ""; //DEQ2响应时间
    eleArray[index++].innerText = ""; //DEQ2释放时间
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut2.sourceA?source_open:source_close; //矩阵输入A
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut2.sourceB?source_open:source_close; //矩阵输入B
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut2.sourceC?source_open:source_close; //矩阵输入C
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut2.sourceD?source_open:source_close; //矩阵输入D
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut2.LPFData.HL_Type); //低通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut2.LPFData.HL_freq);//低通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut2.LPFData.HL_Oct, currentGroupData.dataOut2.LPFData.LR_Level, currentGroupData.dataOut2.LPFData.HL_Type);//低通斜率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut2.HPFData.HL_Type);//高通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut2.HPFData.HL_freq);//高通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut2.HPFData.HL_Oct, currentGroupData.dataOut2.HPFData.LR_Level, currentGroupData.dataOut2.HPFData.HL_Type); //高通斜率
    eleArray[index++].innerText = "";
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getOutputLimiterThresholdDisplay(currentGroupData.dataOut2.limT); //限幅_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut2.limAttack) + 'ms'; //限幅_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut2.limRelease) + 'ms'; //限幅_释放时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getInputCompressThresholdDisplay(currentGroupData.dataOut2.compLevel);  //压缩_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getCompressRationDisplay(currentGroupData.dataOut2.compRatio);  //压缩比
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut2.compAttack) + 'ms'; //压缩_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut2.compR) + 'ms';  //压缩_释放时间
    eleArray[index++].innerText = "";  //自动增益_阈值
    eleArray[index++].innerText = "";  //自动增益_目标电平
    eleArray[index++].innerText = "";  //自动增益_启动时间
    eleArray[index++].innerText = "";  //自动增益_释放时间
    eleArray[index++].innerText = "";  //自动增益_比率
    eleArray[index++].innerText = oLock.nOut_Link ? lockText : getReportLink(currentGroupData.dataOut2.outLinkSel + 4);  //联调

    //第八列 CH3
    index=0;
    for(i = 0; i < first_column_element_name.length; i++) {
        eleArray[i] = document.getElementById(first_column_element_name[i].replace(/_type$/,'_ch3'));
    }
    eleArray[index++].innerText = oLock.nOut_Name ? lockText : currentGroupData.dataOut3.name;
    eleArray[index++].innerText = oLock.nOut_Mute ? lockText : currentGroupData.dataOut3.mute ? 'OFF' : 'ON';
    eleArray[index++].innerText = oLock.nOut_Gain ? lockText : getChanelGainDisplay(currentGroupData.dataOut3.gain) + 'dB';
    eleArray[index++].innerText = oLock.nOut_Pol ? lockText : !currentGroupData.dataOut3.polar ? polar_positive : polar_negative;
    eleArray[index++].innerText = oLock.nOut_Delay ? lockText : getDelayTimeDisplay(currentGroupData.dataOut3.delay,currentGroupData.dataOut3.secondDelay);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut3.OutEQ.EQ1.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut3.OutEQ.EQ1.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut3.OutEQ.EQ1.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut3.OutEQ.EQ1.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut3.OutEQ.EQ2.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut3.OutEQ.EQ2.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut3.OutEQ.EQ2.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut3.OutEQ.EQ2.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut3.OutEQ.EQ3.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut3.OutEQ.EQ3.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut3.OutEQ.EQ3.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut3.OutEQ.EQ3.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut3.OutEQ.EQ4.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut3.OutEQ.EQ4.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut3.OutEQ.EQ4.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut3.OutEQ.EQ4.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut3.OutEQ.EQ5.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut3.OutEQ.EQ5.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut3.OutEQ.EQ5.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut3.OutEQ.EQ5.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut3.OutEQ.EQ6.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut3.OutEQ.EQ6.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut3.OutEQ.EQ6.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut3.OutEQ.EQ6.bw) + 'oct';
    eleArray[index++].innerText = ""; //DEQ1频率
    eleArray[index++].innerText = ""; //DEQ1带宽
    eleArray[index++].innerText = ""; //DEQ1电平
    eleArray[index++].innerText = ""; //DEQ1阈值
    eleArray[index++].innerText = ""; //DEQ1比率
    eleArray[index++].innerText = ""; //DEQ1响应时间
    eleArray[index++].innerText = ""; //DEQ1释放时间
    eleArray[index++].innerText = ""; //DEQ2频率
    eleArray[index++].innerText = ""; //DEQ2带宽
    eleArray[index++].innerText = ""; //DEQ2电平
    eleArray[index++].innerText = ""; //DEQ2阈值
    eleArray[index++].innerText = ""; //DEQ2比率
    eleArray[index++].innerText = ""; //DEQ2响应时间
    eleArray[index++].innerText = ""; //DEQ2释放时间
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut3.sourceA?source_open:source_close; //矩阵输入A
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut3.sourceB?source_open:source_close; //矩阵输入B
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut3.sourceC?source_open:source_close; //矩阵输入C
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut3.sourceD?source_open:source_close; //矩阵输入D
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut3.LPFData.HL_Type); //低通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut3.LPFData.HL_freq);//低通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut3.LPFData.HL_Oct, currentGroupData.dataOut3.LPFData.LR_Level, currentGroupData.dataOut3.LPFData.HL_Type);//低通斜率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut3.HPFData.HL_Type);//高通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut3.HPFData.HL_freq);//高通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut3.HPFData.HL_Oct, currentGroupData.dataOut3.HPFData.LR_Level, currentGroupData.dataOut3.HPFData.HL_Type); //高通斜率
    eleArray[index++].innerText = "";
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getOutputLimiterThresholdDisplay(currentGroupData.dataOut3.limT); //限幅_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut3.limAttack) + 'ms'; //限幅_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut3.limRelease) + 'ms'; //限幅_释放时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getInputCompressThresholdDisplay(currentGroupData.dataOut3.compLevel);  //压缩_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getCompressRationDisplay(currentGroupData.dataOut3.compRatio);  //压缩比
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut3.compAttack) + 'ms'; //压缩_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut3.compR) + 'ms';  //压缩_释放时间
    eleArray[index++].innerText = "";  //自动增益_阈值
    eleArray[index++].innerText = "";  //自动增益_目标电平
    eleArray[index++].innerText = "";  //自动增益_启动时间
    eleArray[index++].innerText = "";  //自动增益_释放时间
    eleArray[index++].innerText = "";  //自动增益_比率
    eleArray[index++].innerText = oLock.nOut_Link ? lockText : getReportLink(currentGroupData.dataOut3.outLinkSel + 4);  //联调


    //第九列 CH4
    index=0;
    for(i = 0; i < first_column_element_name.length; i++) {
        eleArray[i] = document.getElementById(first_column_element_name[i].replace(/_type$/,'_ch4'));
    }
    eleArray[index++].innerText = oLock.nOut_Name ? lockText : currentGroupData.dataOut4.name;
    eleArray[index++].innerText = oLock.nOut_Mute ? lockText : currentGroupData.dataOut4.mute ? 'OFF' : 'ON';
    eleArray[index++].innerText = oLock.nOut_Gain ? lockText : getChanelGainDisplay(currentGroupData.dataOut4.gain) + 'dB';
    eleArray[index++].innerText = oLock.nOut_Pol ? lockText : !currentGroupData.dataOut4.polar ? polar_positive : polar_negative;
    eleArray[index++].innerText = oLock.nOut_Delay ? lockText : getDelayTimeDisplay(currentGroupData.dataOut4.delay,currentGroupData.dataOut4.secondDelay);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut4.OutEQ.EQ1.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut4.OutEQ.EQ1.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut4.OutEQ.EQ1.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut4.OutEQ.EQ1.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut4.OutEQ.EQ2.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut4.OutEQ.EQ2.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut4.OutEQ.EQ2.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut4.OutEQ.EQ2.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut4.OutEQ.EQ3.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut4.OutEQ.EQ3.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut4.OutEQ.EQ3.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut4.OutEQ.EQ3.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut4.OutEQ.EQ4.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut4.OutEQ.EQ4.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut4.OutEQ.EQ4.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut4.OutEQ.EQ4.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut4.OutEQ.EQ5.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut4.OutEQ.EQ5.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut4.OutEQ.EQ5.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut4.OutEQ.EQ5.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut4.OutEQ.EQ6.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut4.OutEQ.EQ6.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut4.OutEQ.EQ6.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut4.OutEQ.EQ6.bw) + 'oct';
    eleArray[index++].innerText = ""; //DEQ1频率
    eleArray[index++].innerText = ""; //DEQ1带宽
    eleArray[index++].innerText = ""; //DEQ1电平
    eleArray[index++].innerText = ""; //DEQ1阈值
    eleArray[index++].innerText = ""; //DEQ1比率
    eleArray[index++].innerText = ""; //DEQ1响应时间
    eleArray[index++].innerText = ""; //DEQ1释放时间
    eleArray[index++].innerText = ""; //DEQ2频率
    eleArray[index++].innerText = ""; //DEQ2带宽
    eleArray[index++].innerText = ""; //DEQ2电平
    eleArray[index++].innerText = ""; //DEQ2阈值
    eleArray[index++].innerText = ""; //DEQ2比率
    eleArray[index++].innerText = ""; //DEQ2响应时间
    eleArray[index++].innerText = ""; //DEQ2释放时间
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut4.sourceA?source_open:source_close; //矩阵输入A
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut4.sourceB?source_open:source_close; //矩阵输入B
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut4.sourceC?source_open:source_close; //矩阵输入C
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut4.sourceD?source_open:source_close; //矩阵输入D
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut4.LPFData.HL_Type); //低通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut4.LPFData.HL_freq);//低通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut4.LPFData.HL_Oct, currentGroupData.dataOut4.LPFData.LR_Level, currentGroupData.dataOut4.LPFData.HL_Type);//低通斜率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut4.HPFData.HL_Type);//高通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut4.HPFData.HL_freq);//高通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut4.HPFData.HL_Oct, currentGroupData.dataOut4.HPFData.LR_Level, currentGroupData.dataOut4.HPFData.HL_Type); //高通斜率
    eleArray[index++].innerText = "";
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getOutputLimiterThresholdDisplay(currentGroupData.dataOut4.limT); //限幅_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut4.limAttack) + 'ms'; //限幅_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut4.limRelease) + 'ms'; //限幅_释放时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getInputCompressThresholdDisplay(currentGroupData.dataOut4.compLevel);  //压缩_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getCompressRationDisplay(currentGroupData.dataOut4.compRatio);  //压缩比
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut4.compAttack) + 'ms'; //压缩_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut4.compR) + 'ms';  //压缩_释放时间
    eleArray[index++].innerText = "";  //自动增益_阈值
    eleArray[index++].innerText = "";  //自动增益_目标电平
    eleArray[index++].innerText = "";  //自动增益_启动时间
    eleArray[index++].innerText = "";  //自动增益_释放时间
    eleArray[index++].innerText = "";  //自动增益_比率
    eleArray[index++].innerText = oLock.nOut_Link ? lockText : getReportLink(currentGroupData.dataOut4.outLinkSel + 4);  //联调

    //第十列 CH5
    index=0;
    for(i = 0; i < first_column_element_name.length; i++) {
        eleArray[i] = document.getElementById(first_column_element_name[i].replace(/_type$/,'_ch5'));
    }
    eleArray[index++].innerText = oLock.nOut_Name ? lockText : currentGroupData.dataOut5.name;
    eleArray[index++].innerText = oLock.nOut_Mute ? lockText : currentGroupData.dataOut5.mute ? 'OFF' : 'ON';
    eleArray[index++].innerText = oLock.nOut_Gain ? lockText : getChanelGainDisplay(currentGroupData.dataOut5.gain) + 'dB';
    eleArray[index++].innerText = oLock.nOut_Pol ? lockText : !currentGroupData.dataOut5.polar ? polar_positive : polar_negative;
    eleArray[index++].innerText = oLock.nOut_Delay ? lockText : getDelayTimeDisplay(currentGroupData.dataOut5.delay,currentGroupData.dataOut5.secondDelay);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut5.OutEQ.EQ1.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut5.OutEQ.EQ1.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut5.OutEQ.EQ1.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut5.OutEQ.EQ1.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut5.OutEQ.EQ2.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut5.OutEQ.EQ2.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut5.OutEQ.EQ2.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut5.OutEQ.EQ2.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut5.OutEQ.EQ3.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut5.OutEQ.EQ3.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut5.OutEQ.EQ3.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut5.OutEQ.EQ3.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut5.OutEQ.EQ4.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut5.OutEQ.EQ4.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut5.OutEQ.EQ4.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut5.OutEQ.EQ4.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut5.OutEQ.EQ5.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut5.OutEQ.EQ5.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut5.OutEQ.EQ5.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut5.OutEQ.EQ5.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut5.OutEQ.EQ6.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut5.OutEQ.EQ6.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut5.OutEQ.EQ6.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut5.OutEQ.EQ6.bw) + 'oct';
    eleArray[index++].innerText = ""; //DEQ1频率
    eleArray[index++].innerText = ""; //DEQ1带宽
    eleArray[index++].innerText = ""; //DEQ1电平
    eleArray[index++].innerText = ""; //DEQ1阈值
    eleArray[index++].innerText = ""; //DEQ1比率
    eleArray[index++].innerText = ""; //DEQ1响应时间
    eleArray[index++].innerText = ""; //DEQ1释放时间
    eleArray[index++].innerText = ""; //DEQ2频率
    eleArray[index++].innerText = ""; //DEQ2带宽
    eleArray[index++].innerText = ""; //DEQ2电平
    eleArray[index++].innerText = ""; //DEQ2阈值
    eleArray[index++].innerText = ""; //DEQ2比率
    eleArray[index++].innerText = ""; //DEQ2响应时间
    eleArray[index++].innerText = ""; //DEQ2释放时间
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut5.sourceA?source_open:source_close; //矩阵输入A
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut5.sourceB?source_open:source_close; //矩阵输入B
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut5.sourceC?source_open:source_close; //矩阵输入C
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut5.sourceD?source_open:source_close; //矩阵输入D
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut5.LPFData.HL_Type); //低通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut5.LPFData.HL_freq);//低通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut5.LPFData.HL_Oct, currentGroupData.dataOut5.LPFData.LR_Level, currentGroupData.dataOut5.LPFData.HL_Type);//低通斜率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut5.HPFData.HL_Type);//高通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut5.HPFData.HL_freq);//高通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut5.HPFData.HL_Oct, currentGroupData.dataOut5.HPFData.LR_Level, currentGroupData.dataOut5.HPFData.HL_Type); //高通斜率
    eleArray[index++].innerText = "";
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getOutputLimiterThresholdDisplay(currentGroupData.dataOut5.limT); //限幅_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut5.limAttack) + 'ms'; //限幅_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut5.limRelease) + 'ms'; //限幅_释放时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getInputCompressThresholdDisplay(currentGroupData.dataOut5.compLevel);  //压缩_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getCompressRationDisplay(currentGroupData.dataOut5.compRatio);  //压缩比
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut5.compAttack) + 'ms'; //压缩_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut5.compR) + 'ms';  //压缩_释放时间
    eleArray[index++].innerText = "";  //自动增益_阈值
    eleArray[index++].innerText = "";  //自动增益_目标电平
    eleArray[index++].innerText = "";  //自动增益_启动时间
    eleArray[index++].innerText = "";  //自动增益_释放时间
    eleArray[index++].innerText = "";  //自动增益_比率
    eleArray[index++].innerText = oLock.nOut_Link ? lockText : getReportLink(currentGroupData.dataOut5.outLinkSel + 4);  //联调

    //第十一列 CH6
    index=0;
    for(i = 0; i < first_column_element_name.length; i++) {
        eleArray[i] = document.getElementById(first_column_element_name[i].replace(/_type$/,'_ch6'));
    }
    eleArray[index++].innerText = oLock.nOut_Name ? lockText : currentGroupData.dataOut6.name;
    eleArray[index++].innerText = oLock.nOut_Mute ? lockText : currentGroupData.dataOut6.mute ? 'OFF' : 'ON';
    eleArray[index++].innerText = oLock.nOut_Gain ? lockText : getChanelGainDisplay(currentGroupData.dataOut6.gain) + 'dB';
    eleArray[index++].innerText = oLock.nOut_Pol ? lockText : !currentGroupData.dataOut6.polar ? polar_positive : polar_negative;
    eleArray[index++].innerText = oLock.nOut_Delay ? lockText : getDelayTimeDisplay(currentGroupData.dataOut6.delay,currentGroupData.dataOut6.secondDelay);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut6.OutEQ.EQ1.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut6.OutEQ.EQ1.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut6.OutEQ.EQ1.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut6.OutEQ.EQ1.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut6.OutEQ.EQ2.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut6.OutEQ.EQ2.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut6.OutEQ.EQ2.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut6.OutEQ.EQ2.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut6.OutEQ.EQ3.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut6.OutEQ.EQ3.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut6.OutEQ.EQ3.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut6.OutEQ.EQ3.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut6.OutEQ.EQ4.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut6.OutEQ.EQ4.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut6.OutEQ.EQ4.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut6.OutEQ.EQ4.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut6.OutEQ.EQ5.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut6.OutEQ.EQ5.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut6.OutEQ.EQ5.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut6.OutEQ.EQ5.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut6.OutEQ.EQ6.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut6.OutEQ.EQ6.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut6.OutEQ.EQ6.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut6.OutEQ.EQ6.bw) + 'oct';
    eleArray[index++].innerText = ""; //DEQ1频率
    eleArray[index++].innerText = ""; //DEQ1带宽
    eleArray[index++].innerText = ""; //DEQ1电平
    eleArray[index++].innerText = ""; //DEQ1阈值
    eleArray[index++].innerText = ""; //DEQ1比率
    eleArray[index++].innerText = ""; //DEQ1响应时间
    eleArray[index++].innerText = ""; //DEQ1释放时间
    eleArray[index++].innerText = ""; //DEQ2频率
    eleArray[index++].innerText = ""; //DEQ2带宽
    eleArray[index++].innerText = ""; //DEQ2电平
    eleArray[index++].innerText = ""; //DEQ2阈值
    eleArray[index++].innerText = ""; //DEQ2比率
    eleArray[index++].innerText = ""; //DEQ2响应时间
    eleArray[index++].innerText = ""; //DEQ2释放时间
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut6.sourceA?source_open:source_close; //矩阵输入A
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut6.sourceB?source_open:source_close; //矩阵输入B
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut6.sourceC?source_open:source_close; //矩阵输入C
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut6.sourceD?source_open:source_close; //矩阵输入D
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut6.LPFData.HL_Type); //低通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut6.LPFData.HL_freq);//低通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut6.LPFData.HL_Oct, currentGroupData.dataOut6.LPFData.LR_Level, currentGroupData.dataOut6.LPFData.HL_Type);//低通斜率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut6.HPFData.HL_Type);//高通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut6.HPFData.HL_freq);//高通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut6.HPFData.HL_Oct, currentGroupData.dataOut6.HPFData.LR_Level, currentGroupData.dataOut6.HPFData.HL_Type); //高通斜率
    eleArray[index++].innerText = "";
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getOutputLimiterThresholdDisplay(currentGroupData.dataOut6.limT); //限幅_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut6.limAttack) + 'ms'; //限幅_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut6.limRelease) + 'ms'; //限幅_释放时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getInputCompressThresholdDisplay(currentGroupData.dataOut6.compLevel);  //压缩_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getCompressRationDisplay(currentGroupData.dataOut6.compRatio);  //压缩比
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut6.compAttack) + 'ms'; //压缩_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut6.compR) + 'ms';  //压缩_释放时间
    eleArray[index++].innerText = "";  //自动增益_阈值
    eleArray[index++].innerText = "";  //自动增益_目标电平
    eleArray[index++].innerText = "";  //自动增益_启动时间
    eleArray[index++].innerText = "";  //自动增益_释放时间
    eleArray[index++].innerText = "";  //自动增益_比率
    eleArray[index++].innerText = oLock.nOut_Link ? lockText : getReportLink(currentGroupData.dataOut6.outLinkSel + 4);  //联调

    //第十二列 CH7
    index=0;
    for(i = 0; i < first_column_element_name.length; i++) {
        eleArray[i] = document.getElementById(first_column_element_name[i].replace(/_type$/,'_ch7'));
    }
    eleArray[index++].innerText = oLock.nOut_Name ? lockText : currentGroupData.dataOut7.name;
    eleArray[index++].innerText = oLock.nOut_Mute ? lockText : currentGroupData.dataOut7.mute ? 'OFF' : 'ON';
    eleArray[index++].innerText = oLock.nOut_Gain ? lockText : getChanelGainDisplay(currentGroupData.dataOut7.gain) + 'dB';
    eleArray[index++].innerText = oLock.nOut_Pol ? lockText : !currentGroupData.dataOut7.polar ? polar_positive : polar_negative;
    eleArray[index++].innerText = oLock.nOut_Delay ? lockText : getDelayTimeDisplay(currentGroupData.dataOut7.delay,currentGroupData.dataOut7.secondDelay);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut7.OutEQ.EQ1.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut7.OutEQ.EQ1.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut7.OutEQ.EQ1.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut7.OutEQ.EQ1.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut7.OutEQ.EQ2.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut7.OutEQ.EQ2.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut7.OutEQ.EQ2.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut7.OutEQ.EQ2.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut7.OutEQ.EQ3.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut7.OutEQ.EQ3.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut7.OutEQ.EQ3.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut7.OutEQ.EQ3.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut7.OutEQ.EQ4.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut7.OutEQ.EQ4.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut7.OutEQ.EQ4.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut7.OutEQ.EQ4.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut7.OutEQ.EQ5.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut7.OutEQ.EQ5.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut7.OutEQ.EQ5.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut7.OutEQ.EQ5.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut7.OutEQ.EQ6.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut7.OutEQ.EQ6.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut7.OutEQ.EQ6.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut7.OutEQ.EQ6.bw) + 'oct';
    eleArray[index++].innerText = ""; //DEQ1频率
    eleArray[index++].innerText = ""; //DEQ1带宽
    eleArray[index++].innerText = ""; //DEQ1电平
    eleArray[index++].innerText = ""; //DEQ1阈值
    eleArray[index++].innerText = ""; //DEQ1比率
    eleArray[index++].innerText = ""; //DEQ1响应时间
    eleArray[index++].innerText = ""; //DEQ1释放时间
    eleArray[index++].innerText = ""; //DEQ2频率
    eleArray[index++].innerText = ""; //DEQ2带宽
    eleArray[index++].innerText = ""; //DEQ2电平
    eleArray[index++].innerText = ""; //DEQ2阈值
    eleArray[index++].innerText = ""; //DEQ2比率
    eleArray[index++].innerText = ""; //DEQ2响应时间
    eleArray[index++].innerText = ""; //DEQ2释放时间
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut7.sourceA?source_open:source_close; //矩阵输入A
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut7.sourceB?source_open:source_close; //矩阵输入B
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut7.sourceC?source_open:source_close; //矩阵输入C
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut7.sourceD?source_open:source_close; //矩阵输入D
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut7.LPFData.HL_Type); //低通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut7.LPFData.HL_freq);//低通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut7.LPFData.HL_Oct, currentGroupData.dataOut7.LPFData.LR_Level, currentGroupData.dataOut7.LPFData.HL_Type);//低通斜率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut7.HPFData.HL_Type);//高通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut7.HPFData.HL_freq);//高通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut7.HPFData.HL_Oct, currentGroupData.dataOut7.HPFData.LR_Level, currentGroupData.dataOut7.HPFData.HL_Type); //高通斜率
    eleArray[index++].innerText = "";
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getOutputLimiterThresholdDisplay(currentGroupData.dataOut7.limT); //限幅_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut7.limAttack) + 'ms'; //限幅_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut7.limRelease) + 'ms'; //限幅_释放时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getInputCompressThresholdDisplay(currentGroupData.dataOut7.compLevel);  //压缩_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getCompressRationDisplay(currentGroupData.dataOut7.compRatio);  //压缩比
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut7.compAttack) + 'ms'; //压缩_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut7.compR) + 'ms';  //压缩_释放时间
    eleArray[index++].innerText = "";  //自动增益_阈值
    eleArray[index++].innerText = "";  //自动增益_目标电平
    eleArray[index++].innerText = "";  //自动增益_启动时间
    eleArray[index++].innerText = "";  //自动增益_释放时间
    eleArray[index++].innerText = "";  //自动增益_比率
    eleArray[index++].innerText = oLock.nOut_Link ? lockText : getReportLink(currentGroupData.dataOut7.outLinkSel + 4);  //联调

    //第十三列 CH8
    index=0;
    for(i = 0; i < first_column_element_name.length; i++) {
        eleArray[i] = document.getElementById(first_column_element_name[i].replace(/_type$/,'_ch8'));
    }
    eleArray[index++].innerText = oLock.nOut_Name ? lockText : currentGroupData.dataOut8.name;
    eleArray[index++].innerText = oLock.nOut_Mute ? lockText : currentGroupData.dataOut8.mute ? 'OFF' : 'ON';
    eleArray[index++].innerText = oLock.nOut_Gain ? lockText : getChanelGainDisplay(currentGroupData.dataOut8.gain) + 'dB';
    eleArray[index++].innerText = oLock.nOut_Pol ? lockText : !currentGroupData.dataOut8.polar ? polar_positive : polar_negative;
    eleArray[index++].innerText = oLock.nOut_Delay ? lockText : getDelayTimeDisplay(currentGroupData.dataOut8.delay,currentGroupData.dataOut8.secondDelay);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut8.OutEQ.EQ1.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut8.OutEQ.EQ1.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut8.OutEQ.EQ1.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut8.OutEQ.EQ1.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut8.OutEQ.EQ2.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut8.OutEQ.EQ2.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut8.OutEQ.EQ2.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut8.OutEQ.EQ2.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut8.OutEQ.EQ3.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut8.OutEQ.EQ3.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut8.OutEQ.EQ3.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut8.OutEQ.EQ3.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut8.OutEQ.EQ4.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut8.OutEQ.EQ4.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut8.OutEQ.EQ4.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut8.OutEQ.EQ4.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut8.OutEQ.EQ5.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut8.OutEQ.EQ5.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut8.OutEQ.EQ5.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut8.OutEQ.EQ5.bw) + 'oct';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getReportEqType(currentGroupData.dataOut8.OutEQ.EQ6.type);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getEqGainDisplay(currentGroupData.dataOut8.OutEQ.EQ6.level) + 'dB';
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getFrequencyDisplay(currentGroupData.dataOut8.OutEQ.EQ6.freq);
    eleArray[index++].innerText = oLock.nOut_EQ ? lockText : getBandwidthDisplay(currentGroupData.dataOut8.OutEQ.EQ6.bw) + 'oct';
    eleArray[index++].innerText = ""; //DEQ1频率
    eleArray[index++].innerText = ""; //DEQ1带宽
    eleArray[index++].innerText = ""; //DEQ1电平
    eleArray[index++].innerText = ""; //DEQ1阈值
    eleArray[index++].innerText = ""; //DEQ1比率
    eleArray[index++].innerText = ""; //DEQ1响应时间
    eleArray[index++].innerText = ""; //DEQ1释放时间
    eleArray[index++].innerText = ""; //DEQ2频率
    eleArray[index++].innerText = ""; //DEQ2带宽
    eleArray[index++].innerText = ""; //DEQ2电平
    eleArray[index++].innerText = ""; //DEQ2阈值
    eleArray[index++].innerText = ""; //DEQ2比率
    eleArray[index++].innerText = ""; //DEQ2响应时间
    eleArray[index++].innerText = ""; //DEQ2释放时间
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut8.sourceA?source_open:source_close; //矩阵输入A
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut8.sourceB?source_open:source_close; //矩阵输入B
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut8.sourceC?source_open:source_close; //矩阵输入C
    eleArray[index++].innerText = oLock.nIn_Matrix ? lockText : currentGroupData.dataOut8.sourceD?source_open:source_close; //矩阵输入D
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut8.LPFData.HL_Type); //低通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut8.LPFData.HL_freq);//低通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut8.LPFData.HL_Oct, currentGroupData.dataOut8.LPFData.LR_Level, currentGroupData.dataOut8.LPFData.HL_Type);//低通斜率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverType(currentGroupData.dataOut8.HPFData.HL_Type);//高通类型
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getFrequencyDisplay(currentGroupData.dataOut8.HPFData.HL_freq);//高通频率
    eleArray[index++].innerText = oLock.nOut_Xover ? lockText : getXoverSlope(currentGroupData.dataOut8.HPFData.HL_Oct, currentGroupData.dataOut8.HPFData.LR_Level, currentGroupData.dataOut8.HPFData.HL_Type); //高通斜率
    eleArray[index++].innerText = "";
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getOutputLimiterThresholdDisplay(currentGroupData.dataOut8.limT); //限幅_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut8.limAttack) + 'ms'; //限幅_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut8.limRelease) + 'ms'; //限幅_释放时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getInputCompressThresholdDisplay(currentGroupData.dataOut8.compLevel);  //压缩_阈值
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getCompressRationDisplay(currentGroupData.dataOut8.compRatio);  //压缩比
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getAttackTimeDisplay(currentGroupData.dataOut8.compAttack) + 'ms'; //压缩_响应时间
    eleArray[index++].innerText = oLock.nOut_Comp_LimT ? lockText : getReleaseTimeDisplay(currentGroupData.dataOut8.compR) + 'ms';  //压缩_释放时间
    eleArray[index++].innerText = "";  //自动增益_阈值
    eleArray[index++].innerText = "";  //自动增益_目标电平
    eleArray[index++].innerText = "";  //自动增益_启动时间
    eleArray[index++].innerText = "";  //自动增益_释放时间
    eleArray[index++].innerText = "";  //自动增益_比率
    eleArray[index++].innerText = oLock.nOut_Link ? lockText : getReportLink(currentGroupData.dataOut8.outLinkSel + 4);  //联调
}