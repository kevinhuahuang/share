/**
 *
 *
 **/



function LanguageOperate() {
    //按钮

    //下拉列表

    //指示文本

    //程序对话框

    //系统对话框

    //锁定对话框

    //报告对话框

    //提示框

    if(isChinese){

    } else {

    }

    LanguageOperate.prototype.languageOperate = function() {
        this.mainCurtainLanguageOperate();
        this.lockCurtainLanguangeOperate();
        this.programCurtainLanguageOperate();
        this.systemCurtainLanguageOperate();
        this.centralCurtainLanguageOperate();
        // console.log('language is change');
        lockDisplay.initLockElement();
    };

    //主对话框
    LanguageOperate.prototype.mainCurtainLanguageOperate = function() {
        //parameter : id, chinese, english, ch-font-size, en-font-size, ch-left, en-left, ch-top, en-top
        var chHeiti = 'Arial'; //黑体SimHei
        var chYahei = 'Microsoft YaHei' //雅黑
        var enArial = 'Arial';
        var enArialBlack = 'Arial Black';
        var bold = 'bold';
        var bolder = 'bolder';
        var normal = 'normal';
        this.setElementLanguageValue('exit_dialog_program_notice', '退出', 'Exit');
        this.setElementLanguageValue('exit_dialog_lock_notice', '退出', 'Exit');
        this.setElementLanguageValue('exit_dialog_system_notice', '退出', 'Exit');
        this.setElementLanguageValue('exit_dialog_central_notice', '退出', 'Exit');
        this.setElementLanguageValue('exit_dialog_report_notice', '退出', 'Exit');

        this.setElementLanguageValue('cover', '数据正在传输中', 'Data Transmission', '3em', '3em');

        this.setElementLanguageValue('button_curve_a', '曲线', 'CURVE', '15', '12', '', '', '', '', chHeiti, enArial);
        this.setElementLanguageValue('button_curve_b', '曲线', 'CURVE', '15', '12', '', '', '', '', chHeiti, enArial);
        this.setElementLanguageValue('button_curve_c', '曲线', 'CURVE', '15', '12', '', '', '', '', chHeiti, enArial);
        this.setElementLanguageValue('button_curve_d', '曲线', 'CURVE', '15', '12', '', '', '', '', chHeiti, enArial);
        this.setElementLanguageValue('button_curve_out1', '曲线', 'CURVE', '15', '12', '', '', '', '', chHeiti, enArial);
        this.setElementLanguageValue('button_curve_out2', '曲线', 'CURVE', '15', '12', '', '', '', '', chHeiti, enArial);
        this.setElementLanguageValue('button_curve_out3', '曲线', 'CURVE', '15', '12', '', '', '', '', chHeiti, enArial);
        this.setElementLanguageValue('button_curve_out4', '曲线', 'CURVE', '15', '12', '', '', '', '', chHeiti, enArial);
        this.setElementLanguageValue('button_curve_out5', '曲线', 'CURVE', '15', '12', '', '', '', '', chHeiti, enArial);
        this.setElementLanguageValue('button_curve_out6', '曲线', 'CURVE', '15', '12', '', '', '', '', chHeiti, enArial);
        this.setElementLanguageValue('button_curve_out7', '曲线', 'CURVE', '15', '12', '', '', '', '', chHeiti, enArial);
        this.setElementLanguageValue('button_curve_out8', '曲线', 'CURVE', '15', '12', '', '', '', '', chHeiti, enArial);
        this.setElementLanguageValue('indicate_text_noise_gate', '噪声门', 'NOISE GATE', '16', '13', '22', '5', '', '', chHeiti, enArialBlack, bold, normal);
        this.setElementLanguageValue('indicate_text_noise_gate_value', '门限dBu', 'dBu', '13', '13', '', '', chHeiti, enArial);
        this.setElementLanguageValue('indicate_text_delay', '延时', 'DELAY', '16', '13', '32', '28', '', '', chHeiti, enArialBlack, bold, normal);
        this.setElementLanguageValue('indicate_text_millisecond', 'ms', 'ms', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_meter', 'm', 'm', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_inch', 'ft', 'ft', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_phase', '相位', 'POLARITY', '16', '13', '32', '14', '', '', chHeiti, enArialBlack, bold, normal);
        this.setElementLanguageValue('indicate_text_mode', '模式', 'MODE', '14', '12', '9', '5', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_frequency', '频率Hz', 'FQCY Hz', '13', '12', '9', '5', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_bandwidth', '带宽oct', 'BW oct', '13', '12', '9', '5', '', '', chHeiti, enArial, normal, normal);

        this.setElementLanguageValue('indicate_text_slope', 'Q/斜率', 'Q/SLOPE', '13', '12', '9', '5', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_gain', '增益dB', 'GAIN dB',  '13', '12', '9', '5', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('button_phase_Curve_label', '相位 曲线', 'PHASE CURVE', '15', '12', '0', '0', '', '', chHeiti, enArial);
        //this.setElementLanguageValue('indicate_text_dynamic', value[14]);

        this.setElementLanguageValue('indicate_text_long_gain', '增益', 'GAIN', '18', '15', '18', '15', '', '', chHeiti, enArialBlack, bold, normal);
        this.setElementLanguageValue('indicate_text_program_name', '程序名称:', 'PROG NAME:', '14', '12', '5', '5', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_program_no', '程序编号:', 'PROG NO:', '14', '12', '5', '5', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_device_id_ip', '设备IP:', 'DEVICE IP:', '14', '12', '5', '5', '', '', chHeiti, enArial, normal, normal);

        // this.setElementLanguageValue('button_list', value[21]);
        this.setElementLanguageValue('indicate_text_auto_gain', '自动增益', 'AGC', '16', '12', '8', '8', '', '', chHeiti, enArialBlack, bold, normal);
        this.setElementLanguageValue('indicate_text_threshold', '阈值', 'THRESHOLD', '12', '12', '', '', '25', '25', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_level', '目标电平', 'TARGET LEVEL', '12', '12','', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ratio', '比率', 'RATIO', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_attack', '响应时间', 'ATTACK TIME', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_release', '释放时间', 'RELEASE TIME', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_compress', '压缩', 'COMPRESSOR', '16', '12', '137', '100', '', '', chHeiti, enArialBlack, bold, bold);
        this.setElementLanguageValue('indicate_text_compress_ratio', '压缩比', 'COMP RATIO', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        //this.setElementLanguageValue('indicate_text_dBu_compress', value[]);
        this.setElementLanguageValue('indicate_text_attack_compress', '响应时间', 'ATTACK TIME', '12', '12','', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_release_compress', '释放时间', 'RELEASE TIME', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ms1', 'ms', 'ms', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ms2', 'ms', 'ms', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ms3', 'ms', 'ms', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ms4', 'ms', 'ms', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_bu1', 'dBu', 'dBu', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_bu2', 'dBu', 'dBu', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_bu3', 'dBu', 'dBu', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_compress_level', '压缩电平', 'COMP LEVEL', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ms1_out', 'ms', 'ms', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ms2_out', 'ms', 'ms', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ms3_out', 'ms', 'ms', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ms4_out', 'ms', 'ms', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_bu1_out', 'dBu', 'dBu', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_bu2_out', 'dBu', 'dBu', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);

        this.setElementLanguageValue('button_help', '帮助', 'Help', '15', '15', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('button_program', '程序', 'Program', '15', '15', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('button_display', '系统', 'System', '15', '15', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('button_lock', '锁定', 'Lock', '15', '15', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('button_report', '报告', 'Report', '15', '15', '', '', '', '', chHeiti, enArial, normal, normal);
        if(isConnect){
            this.setElementLanguageValue('button_connect', '连接中', 'CONNECTING','21','16');
        } else {
            this.setElementLanguageValue('button_connect', '未连接', 'NOT CONNECTED','21','12');
        }

        if(isChinese) {
            document.getElementById('ch_img_logo').style.display = "inline"; //inline
            document.getElementById('en_img_logo').style.display = "none";
        } else {
            document.getElementById('ch_img_logo').style.display = "none";
            document.getElementById('en_img_logo').style.display = "inline"; //inline
        }

        this.setElementLanguageValue('indicate_text_deq1', '动态均衡', 'DEQ', '16', '14', '35', '50', '', '', chHeiti, enArialBlack, bold, normal);
        this.setElementLanguageValue('indicate_text_deq1_frequency', '频率 Hz', 'FQCY Hz', '12', '10', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_deq1_bandwidth', '带宽 oct', 'BW oct', '12', '10', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_deq1_threshold', '阈值 dBu', 'THRESHOLD dBu', '12', '10', '48', '20', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_deq1_level', '目标电平 dBu', 'TARGET LEVEL dBu', '12', '10', '32', '12', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_deq1_ratio', '比率', 'RATIO', '12', '10', '58', '50', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_deq1_attack', '响应时间 ms', 'ATTACK TIME ms', '12', '10', '35', '20', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_deq1_release', '释放时间 ms', 'RELEASE TIME ms', '12', '10', '35', '15', '', '', chHeiti, enArial, normal, normal);

        //输出分频
        this.setElementLanguageValue('indicate_text_xover', '分频', 'X-OVER', '16', '14', '48', '35', '', '', chHeiti, enArialBlack, bold, normal);
        this.setElementLanguageValue('indicate_text_hpf', '高通', 'HPF', '13', '10', '', '', '', '', chHeiti, enArialBlack, normal, normal);
        this.setElementLanguageValue('indicate_text_lpf', '低通', 'LPF', '13', '10', '', '', '', '', chHeiti, enArialBlack, normal, normal);
        this.setElementLanguageValue('indicate_text_hpf_mode', '模式', 'MODE', '13', '10', '', '', '', '', chHeiti, enArialBlack, normal, normal);
        this.setElementLanguageValue('indicate_text_hpf_frequency', '频率Hz', 'FQCY    Hz', '13', '10', '', '', '', '', chHeiti, enArialBlack, normal, normal);
        this.setElementLanguageValue('indicate_text_hpf_slope', '斜率\ndB/oct', 'SLOPE\ndB/oct','13','10','','','250','250', chHeiti, enArialBlack, normal, normal);
        this.setElementLanguageValue('indicate_text_lpf_mode', '模式', 'MODE','13','10','110','100', '', '', chHeiti, enArialBlack, normal, normal);
        this.setElementLanguageValue('indicate_text_lpf_frequency', '频率Hz', 'FQCY     Hz','13','10','94','74', '', '', chHeiti, enArialBlack, normal, normal);
        this.setElementLanguageValue('indicate_text_lpf_slope', '    斜率\ndB/oct', 'SLOPE\r\ndB/oct','13','10','','','250','250', chHeiti, enArialBlack, normal, normal);


        //输出压缩，限幅
        this.setElementLanguageValue('indicate_text_compress_out', '压缩', 'COMPRESSOR','16','12','','','','', chHeiti, enArialBlack, bold, normal);
        this.setElementLanguageValue('indicate_text_limit_out', '限幅', 'LIMITER','16','13','135','135','', '', chHeiti, enArialBlack, bold, normal);
        this.setElementLanguageValue('indicate_text_threshold_out', '压缩电平', 'COMPRESSOR\nLEVEL','12','12','','','38','25', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_threshold_limit_out', '限幅电平', 'LIMITER\nLEVEL','12','12','135','135','38','25', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ratio_out', '压缩比', 'COMP RATIO','12','12','','','84','84', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_attack_out', '响应时间', 'ATTACK TIME','12','12','','','129','129', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_release_out', '释放时间', 'RELEASE TIME','12','12','','','174','174', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_attack_limit_out', '响应时间', 'ATTACK TIME','12','12','147','121','129','129', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_release_limit_out', '释放时间', 'RELEASE TIME','12','12','147','110','174','174', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ms1_out', 'ms', 'ms', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ms2_out', 'ms', 'ms', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ms3_out', 'ms', 'ms', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_ms4_out', 'ms', 'ms', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_bu1_out', 'dBu', 'dBu', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);
        this.setElementLanguageValue('indicate_text_bu2_out', 'dBu', 'dBu', '12', '12', '', '', '', '', chHeiti, enArial, normal, normal);

        this.setElementLanguageValue('indicate_text_delay_out', '延时', 'DELAY', '18', '15', '35', '28');

        this.setElementLanguageValue('indicate_text_phase_out', '相位', 'POLARITY', '18', '15', '30', '15');

        //输入联调 下拉列表
        this.setSelectElementLanguageValue('select_link_a', '联调A', 'LinkA', 0, 12, 12);
        this.setSelectElementLanguageValue('select_link_a', '联调B', 'LinkB', 1);
        this.setSelectElementLanguageValue('select_link_a', '联调C', 'LinkC', 2);
        this.setSelectElementLanguageValue('select_link_a', '联调D', 'LinkD', 3);

        this.setSelectElementLanguageValue('select_link_b', '联调A', 'LinkA', 0, 12, 12);
        this.setSelectElementLanguageValue('select_link_b', '联调B', 'LinkB', 1);
        this.setSelectElementLanguageValue('select_link_b', '联调C', 'LinkC', 2);
        this.setSelectElementLanguageValue('select_link_b', '联调D', 'LinkD', 3);

        this.setSelectElementLanguageValue('select_link_c', '联调A', 'LinkA', 0, 12, 12);
        this.setSelectElementLanguageValue('select_link_c', '联调B', 'LinkB', 1);
        this.setSelectElementLanguageValue('select_link_c', '联调C', 'LinkC', 2);
        this.setSelectElementLanguageValue('select_link_c', '联调D', 'LinkD', 3);

        this.setSelectElementLanguageValue('select_link_d', '联调A', 'LinkA', 0, 12, 12);
        this.setSelectElementLanguageValue('select_link_d', '联调B', 'LinkB', 1);
        this.setSelectElementLanguageValue('select_link_d', '联调C', 'LinkC', 2);
        this.setSelectElementLanguageValue('select_link_d', '联调D', 'LinkD', 3);

        //输出联调 下拉列表
        for(var i=1; i<=8; i++){
            for(var t=1; t<=8; t++){
                this.setSelectElementLanguageValue('select_link_out' + i, '联调' + t, 'Link' + t, (t-1) + '', 12, 12);
            }
        }

        //模式 下拉列表
        for(i=1; i<7; i++){
            this.setSelectElementLanguageValue('select_mode' + i, '参量', 'Parameter', 0, 14, 12);
            this.setSelectElementLanguageValue('select_mode' + i, '低调', 'Lo-Shelf', 1);
            this.setSelectElementLanguageValue('select_mode' + i, '高调', 'Hi-Shelf', 2);
            this.setSelectElementLanguageValue('select_mode' + i, '1阶全通', 'APF 1st', 3);
            this.setSelectElementLanguageValue('select_mode' + i, '2阶全通', 'APF 2nd', 4);
        }

        //分频模式 下拉列表
        this.setSelectElementLanguageValue('text_hpf_mode', '宁克', 'Link_Ril', 0,  14, 12);
        this.setSelectElementLanguageValue('text_hpf_mode', '贝塞尔', 'Bessel',  1);
        this.setSelectElementLanguageValue('text_hpf_mode', '巴特沃斯', 'ButterW', 2);

        this.setSelectElementLanguageValue('text_lpf_mode', '宁克', 'Link_Ril', 0, 14, 12);
        this.setSelectElementLanguageValue('text_lpf_mode', '贝塞尔', 'Bessel', 1);
        this.setSelectElementLanguageValue('text_lpf_mode', '巴特沃斯', 'ButterW', 2);

    };

    //锁定对话框
    LanguageOperate.prototype.lockCurtainLanguangeOperate = function() {
        //按钮
        this.setElementLanguageValue('button_lock_input', '输入锁定', 'Input Lock');
        this.setElementLanguageValue('button_lock_out', '输出锁定', 'Output Lock');
        this.setElementLanguageValue('button_lock_system', '系统锁定', 'System Lock');
        this.setElementLanguageValue('button_lock_exit', '退出', 'Exit');

        this.setElementLanguageValue('button_set_or_not_set', '设置密码', 'Password Setup');
        this.setElementLanguageValue('button_set_or_not_no', '无密码', 'No Password');

        // this.setElementLanguageValue('button_set_or_not_set', '退出', 'Exit');
        // this.setElementLanguageValue('button_set_or_not_set', '退出', 'Exit');

        var lockChSize = '15';
        var lockEnSize = '14';
        //输入锁定项
        this.setLabelElementLanguageValue('label_lock_input_header', '输入锁定', 'Input Lock', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_input_label', '标签', 'Label', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_input_mute', '静音', 'Mute', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_input_delay', '延时', 'Delay', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_input_phase', '相位', 'Polarity', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_input_gain', '增益', 'Gain', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_input_gate', '噪声门', 'NoiseGate', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_input_agc', '自动增益_压缩', 'AGC_Comp', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_input_deq', '动态均衡', 'DEQ', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_input_eq', '均衡', 'EQ', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_input_link', '联调', 'Link', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_input_select_all', '全选', 'All Lock', lockChSize, lockEnSize);
        this.setElementLanguageValue('button_input_confirm_code', '确定', 'OK', lockChSize, lockEnSize);
        this.setElementLanguageValue('button_input_exit_code', '取消', 'Cancel', lockChSize, lockEnSize);
        this.setElementLanguageValue('label_lock_input_notice1', '输入锁定提示:', 'Input Lock Info:', lockChSize, lockEnSize);
        this.setElementLanguageValue('label_lock_input_notice2', '1.“输入锁定”的参数设置及密码信息保存在“当前程序组”,没有保存在设备系统数据和本软件！',
            '1. The parameters and password info for "Input Lock" are stored in the "current program group", not saved in the device system data or web software!', lockChSize, lockEnSize);
        this.setElementLanguageValue('label_lock_input_notice3', '2.标记“√”的参数被锁定，不允许编辑，不显示，“报告”中也不可查看。',
            '2. The parameters item be selected, cannot be edited or displayed. The report cannot be viewed either.', lockChSize, lockEnSize);
        this.setElementLanguageValue('label_lock_input_notice4', '3.解除锁定：将“√”取消。',
            '3. Un select to unlock any parameters', lockChSize, lockEnSize);
        this.setElementLanguageValue('label_lock_input_notice5', '4.设备“程序”中没有“程序名称”的程序组为默认工厂程序，没有锁定。',
            '4. If the device program has no program name in the program group and then it will be the default factory program, no lock.', lockChSize, lockEnSize);

        //输出锁定项
        this.setLabelElementLanguageValue('label_lock_output_header', '输出锁定', 'Output Lock', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_out_label', '标签', 'Label', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_out_mute', '静音', 'Mute', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_out_delay', '延时', 'Delay', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_out_phase', '相位', 'Polarity', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_out_gain', '增益', 'Gain');
        this.setLabelElementLanguageValue('label_lock_out_kmg', '矩阵', 'Matrix', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_out_agc', '压缩_限幅', 'Comp_Lim', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_out_eq', '均衡', 'EQ', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_out_xover', '分频', 'X-over', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_out_link', '联调', 'Link', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_out_select_all', '全选', 'All Lock', lockChSize, lockEnSize);
        this.setElementLanguageValue('button_out_confirm_code', '确定', 'OK', lockChSize, lockEnSize);
        this.setElementLanguageValue('button_out_exit_code', '取消', 'Cancel', lockChSize, lockEnSize);
        this.setElementLanguageValue('label_lock_out_notice1', '输出锁定提示: ', 'Output Lock info:', lockChSize, lockEnSize);
        this.setElementLanguageValue('label_lock_out_notice2', '1.“输出锁定”的参数设置及密码信息保存在“当前程序组”,没有保存在设备系统数据和本软件！',
            '1. The parameters and password info for "Output Lock" are stored in the "current program group", not saved in the device system data or web software!', lockChSize, lockEnSize);
        this.setElementLanguageValue('label_lock_out_notice3', '2.标记“√”的参数被锁定，不允许编辑，不显示，“报告”中也不可查看。',
            '2. The parameters item be selected, cannot be edited or displayed. The report cannot be viewed either.', lockChSize, lockEnSize);
        this.setElementLanguageValue('label_lock_out_notice4', '3.解除锁定：将“√”取消。 ',
            '3. Un select to unlock any parameters');
        this.setElementLanguageValue('label_lock_out_notice5', '4.设备“程序”中没有“程序名称”的程序组为默认工厂程序，没有锁定。',
            '4. If the device program has no program name in the program group and then it will be the default factory program, no lock.', lockChSize, lockEnSize);

        //系统锁定项
        this.setLabelElementLanguageValue('label_lock_system_header', '系统锁定', 'System Lock', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_system_load', '调用程序', 'Load Program', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_system_save', '保存程序', 'Save Program', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_system_delete', '删除程序', 'Delete Program', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_system_copy', '复制程序', 'Copy Program', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_system_id', '设备ID', 'Device ID', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_system_interface', '界面编辑', 'Interface', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_system_led', '背景灯', 'Back Light', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_system_pannel', '面板编辑', 'Key Edit', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_system_power', 'Power On', 'Power On', lockChSize, lockEnSize);
        this.setLabelElementLanguageValue('label_lock_system_select_all', '全选', 'All Lock', lockChSize, lockEnSize);
        this.setElementLanguageValue('button_system_confirm_code', '确定', 'OK', lockChSize, lockEnSize);
        this.setElementLanguageValue('button_system_exit_code', '取消', 'Cancel', lockChSize, lockEnSize);
        this.setElementLanguageValue('label_lock_system_notice1', '系统锁定提示: ', 'System Lock Info:', lockChSize, lockEnSize);
        this.setElementLanguageValue('label_lock_system_notice2', '1.“系统锁定”的参数设置及密码信息自动保存在“设备系统数据”，没有保存在“当前程序组”和本软件！不会因为数据的调用、保存、删除而改变。',
            '1. The parameters and password info for "System Lock" are stored in the "current program group", not saved in the device system data or web software!', lockChSize, lockEnSize);
        this.setElementLanguageValue('label_lock_system_notice3', '2.标记“√”的参数被锁定，不允许编辑。 ',
            '2. The parameters item be selected, cannot be edited or displayed. The report cannot be viewed either.', lockChSize, lockEnSize);
        this.setElementLanguageValue('label_lock_system_notice4', '3.解除锁定：将“√”取消。 ',
            '3. Un select to unlock any parameters');
        this.setElementLanguageValue('label_lock_system_notice5', '4.默认“设备系统数据”，没有锁定。 ',
            '4. If the device program has no program name in the program group and then it will be the default factory program, no lock.', lockChSize, lockEnSize);

        lockFrame.elementTextChange();
    };

    //程序对话框
    LanguageOperate.prototype.programCurtainLanguageOperate = function() {
        this.setElementLanguageValue('device_program_label', '设备程序', 'Device Program');
        this.setElementLanguageValue('save_to_device_label', '保存一个程序到设备', 'Save program to device','', '','','', '2','7');
        this.setElementLanguageValue('load_from_device_label', '从设备调用一个程序', 'Load program from device','', '','','', '32','37');
        this.setElementLanguageValue('program_name_label', '程序名称：', 'Program name');

        this.setElementLanguageValue('program_no_th', '编号', 'No');
        this.setElementLanguageValue('program_type_th', '类型', 'Type');
        this.setElementLanguageValue('program_name_th', '名称', 'Name');
        for(var i=1; i<31; i++) {
            this.setElementLanguageValue('program_td_' + i, '程序' + i, 'Program' + i);
            this.setElementLanguageValue('program_type' + i, '用户程序', 'User');
        }

        this.setElementLanguageValue('save_device', '保存', 'Save');
        this.setElementLanguageValue('delete_device', '删除', 'Delete');
        this.setElementLanguageValue('computer_program_label', '电脑程序', 'PC Program');
        this.setLabelElementLanguageValue('button_load_one_from_pc', '从电脑调用一个程序', 'Load 1 program from PC');
        this.setLabelElementLanguageValue('button_load_all_from_pc', '从电脑调用所有程序', 'Load all program from PC');
        this.setElementLanguageValue('button_save_one_to_pc', '保存一个程序到电脑', 'Save 1 program to PC');
        this.setElementLanguageValue('button_save_all_to_pc', '保存所有程序到电脑', 'Save all program to PC');

        this.setElementLanguageValue('save_one_to_pc', '点我下载，或右键右存为', 'Click to download,right-click to save as');
        this.setElementLanguageValue('save_all_to_pc', '点我下载，或右键右存为', 'Click to download,right-click to save as');
        this.setElementLanguageValue('program_exit', '退出', 'Exit');
    };

    //系统对话框
    LanguageOperate.prototype.systemCurtainLanguageOperate = function() {
        this.setElementLanguageValue('system_back', '背景', 'Back');
        this.setElementLanguageValue('button_central_control', '中控码', 'Central control code');
        this.setElementLanguageValue('startup_header', '设备启动设置', 'Device startup setting');
        this.setElementLanguageValue('label_startup', '设置', 'Setting');
        this.setElementLanguageValue('label_first_line', '第一行', 'First Line');
        this.setElementLanguageValue('label_second_line', '第二行', 'Second Line');
        this.setElementLanguageValue('interface_confirm', '确定', 'OK');
        this.setElementLanguageValue('interface_cancel', '取消', 'Cancel');
        this.setElementLanguageValue('interface_header', '设备界面', 'Device Interface');

        this.setElementLanguageValue('system_quit', '退出', 'Exit');

        this.setSelectElementLanguageValue('system_back_selector', '常亮', 'Keep On', 0);
        this.setSelectElementLanguageValue('system_back_selector', '10秒', '10s', 1);

        this.setSelectElementLanguageValue('startup_selector', '当前程序', 'Current Program', 0);
        this.setSelectElementLanguageValue('startup_selector', '全静音', 'All Mute', 1);

        for(var i=1; i<31; i++) {
            this.setSelectElementLanguageValue('startup_selector', '设备程序' + i, 'Device Program' + i, (i+1) +'');
        }
    };

    //中控对话框
    LanguageOperate.prototype.centralCurtainLanguageOperate = function() {
        this.setElementLanguageValue('label_device_id', '设备ID:', 'Device ID:','','','','','0','4');
        this.setElementLanguageValue('baud_rate', '波特率: 9600', 'Baud rate: 9600','','','','','0','4');
        this.setElementLanguageValue('central_output', '输出', 'Output');
        this.setElementLanguageValue('central_output_write', '写数据', 'Write');
        this.setElementLanguageValue('central_output_mute', '静音', 'Mute','','','','','7','11');
        this.setElementLanguageValue('central_output_no_mute', '非静音', 'No Mute','','','','','37','41');
        this.setElementLanguageValue('central_output_increase', '增加', 'Gain+','','','','','7','11');
        this.setElementLanguageValue('central_output_decrease', '减少', 'Gain-','','','','','37','41');
        this.setElementLanguageValue('central_output_step', '步进', 'Step');
        this.setElementLanguageValue('central_output_gain_set', '增益设置', 'Gain Setting','','','','','7','11');
        this.setElementLanguageValue('central_output_matrix', '矩阵', 'Matrix','','','','','7','11');
        this.setElementLanguageValue('output_write_copy', '复制', 'Copy');
        this.setElementLanguageValue('central_output_read', '读数据', 'Read');
        this.setElementLanguageValue('central_output_mute_status', '静音状态', 'Mute State','','','','','277','281');
        this.setElementLanguageValue('central_output_matrix_value', '矩阵', 'Matrix','','','','','277','281');
        this.setElementLanguageValue('central_output_gain_status', '增益状态', 'Gain Value','','','','','277','281');
        this.setElementLanguageValue('output_read_copy', '复制', 'Copy');

        this.setElementLanguageValue('central_input', '输入', 'Input');
        this.setElementLanguageValue('central_input_write', '写数据', 'Write');
        this.setElementLanguageValue('central_input_mute', '静音', 'Mute','','','','','7','11');
        this.setElementLanguageValue('central_input_no_mute', '非静音', 'No Mute','','','','','37','41');
        this.setElementLanguageValue('central_input_increase', '增加', 'Gain+','','','','','7','11');
        this.setElementLanguageValue('central_input_decrease', '减少', 'Gain-','','','','','37','41');
        this.setElementLanguageValue('central_input_step', '步进', 'Step');
        this.setElementLanguageValue('central_input_gain_set', '增益设置', 'Gain Setting','','','','','7','11');
        this.setElementLanguageValue('input_write_copy', '复制', 'Copy');
        this.setElementLanguageValue('central_input_read', '读数据', 'Read');
        this.setElementLanguageValue('central_input_mute_status', '静音状态', 'Mute State','','','','','197','201');
        this.setElementLanguageValue('central_input_gain', '增益状态', 'Gain Value','','','','','197','201');
        this.setElementLanguageValue('input_read_copy', '复制', 'Copy');

        this.setElementLanguageValue('central_system', '设备程序', 'Device Program');
        this.setElementLanguageValue('central_system_load', '调用', 'Load','','','','','12','16');
        this.setElementLanguageValue('central_system_save', '保存', 'Save','','','','','12','16');
        this.setElementLanguageValue('system_copy', '复制', 'Copy');
        this.setElementLanguageValue('central_exit', '退出', 'Exit');

        for(var i=1; i<31; i++){
            this.setSelectElementLanguageValue('device_program_selector', '设备程序' + i, 'Device Program' + i, (i-1) + '');
        }

        var NOTICE_CHINESE = "注意事项：\r\n1.选择输入或输出多个通道，“静音，非静音，增益+，增益-，增益设置，矩阵”将对选择的通道同时起作用。" +
        "比如：选择“OUT1,OUT2”两个通道，选择“静音”，那么“OUT1 和 OUT2”将同时静音。\r\n" +
        "2.设备设置了联调，“增益+，增益-，增益设置”的中控代码也将有联调功能。比如：设备的“CHA,CHB”设置了联调，" +
        "发送“CHA”的增益+（1dB）中控代码，“CHA”的增益将加“1dB”,“CHB”也将加“1dB”。设备的“CHA、CHC”联调，发送“CHA,CHB”的" +
        "增益+（1dB）中控代码，那么“CHA, CHB, CHC”的增益将同时增加“1dB”。";

        var NOTICE_ENGLISH = "Attention: \r\n1.Enable to choose 'Mute/No Mute/ Gain+/Gain-/Gain Setting/Matrix' for multiple input or output channels." +
            "For OUT1 OUT2 and both OUT1, OUT2 channels will be muted.\r\n" +
            "2. If the device has been set to link multiple channels together, then center control code for 'Gain+/Gain-/Gain Setting'" +
            "will also have the linking function. For example, link CHA and CHB first, and then send code 'GAIN+(1dB)' for CHA and CHB" +
            "will be increased by 1dB. Another example, link CHA and CHC, and then send center control code 'GAIN+(1dB)'. for both CHA and CHB, " +
            "and the outcome will be Gain of CHA, CHB and CHC will be increased by 1dB";

        this.setElementLanguageValue('central_notice', NOTICE_CHINESE, NOTICE_ENGLISH);
    };

    LanguageOperate.prototype.setElementLanguageValue = function(id, chV, enV, chS, enS, chL, enL, chT, enT, chF, enF, chW, enW) {
        var element = document.getElementById(id);
        element.innerText = isChinese ? chV : enV;
        if(chS && enS){
            element.style.fontSize = (isChinese ? chS : enS) + 'px';
        }
        if(chL && enL){
            element.style.left = (isChinese ? chL : enL) + 'px';
        }
        if(chT && enT){
            element.style.top = (isChinese ? chT : enT) + 'px';
        }
        if(chF && enF) {
            element.style.fontFamily = (isChinese ? chF : enF);
        }
        if(chW && enW) {
            element.style.fontWeight = (isChinese ? chW : enW);
        }
    };


    LanguageOperate.prototype.setLabelElementLanguageValue = function(id, chV, enV, chS, enS, chL, enL, chT, enT) {
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
    };

    LanguageOperate.prototype.setSelectElementLanguageValue = function(id, chV, enV, index, chS, enS) {
        var selectElement = document.getElementById(id);
        selectElement.options[index].innerText = isChinese ? chV : enV;
        if(chS && enS){
            selectElement.style.fontSize = (isChinese ? chS : enS) + 'px';
        }
    }

}


