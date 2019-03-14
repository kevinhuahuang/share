
function LockDisplay(){
    //input
    this.inNameArray = ["text_input_a", "text_input_b", "text_input_c", "text_input_d"];
    this.inMuteArray = ["button_speaker_a", "button_speaker_b", "button_speaker_c", "button_speaker_d"];
    this.inDelayArray = ["text_delay_millisecond", "text_delay_meter", "text_delay_inch"];
    this.inPolArray = ["button_phase"];
    this.inGainArray = ["slider_track_input_a", "text_volume_a", "slider_track_input_b", "text_volume_b",
        "slider_track_input_c", "text_volume_c","slider_track_input_d", "text_volume_d"];
    this.inNoiseGateArray = ["text_gate"];
    this.inCompAGArray = ["text_threshold", "text_target_level", "text_extension_ratio", "text_extension_attack",
        "text_extension_release", "text_compressor", "text_comp_ratio", "text_comp_attack", "text_comp_release"];
    this.inDeqArray = ["button_deq1", "button_deq2",
        "text_deq1_frequency", "text_deq1_bandwidth", "text_deq1_level", "deq1_threshold", "deq1_ratio", "deq1_attack_time","deq1_release_time",
        "text_deq2_frequency", "text_deq2_bandwidth", "text_deq2_level", "deq2_threshold", "deq2_ratio", "deq2_attack_time","deq2_release_time",];
    this.inEQArray =
        ["text_eq1_frequency", "text_eq1_bandwidth", "text_eq1_slope", "text_eq1_gain_pass", "text_eq1_gain", "button_eq1","slider_ruler_eq1","select_mode1",//"select_slope1",
        "text_eq2_frequency", "text_eq2_bandwidth", "text_eq2_slope", "text_eq2_gain_pass", "text_eq2_gain", "button_eq2","slider_ruler_eq2","select_mode2",//"select_slope2",
        "text_eq3_frequency", "text_eq3_bandwidth", "text_eq3_slope", "text_eq3_gain_pass", "text_eq3_gain", "button_eq3","slider_ruler_eq3","select_mode3",//"select_slope3",
        "text_eq4_frequency", "text_eq4_bandwidth", "text_eq4_slope", "text_eq4_gain_pass", "text_eq4_gain", "button_eq4","slider_ruler_eq4","select_mode4",//"select_slope4",
        "text_eq5_frequency", "text_eq5_bandwidth", "text_eq5_slope", "text_eq5_gain_pass", "text_eq5_gain", "button_eq5","slider_ruler_eq5","select_mode5",//"select_slope5",
        "text_eq6_frequency", "text_eq6_bandwidth", "text_eq6_slope", "text_eq6_gain_pass", "text_eq6_gain", "button_eq6","slider_ruler_eq6","select_mode6",//"select_slope6",
        "button_eq", "button_phase_curve"];
    this.inLinkArray = ["select_link_a", "select_link_b", "select_link_c", "select_link_d"];
    //out
    this.outNameArray = ["text_out_1", "text_out_2", "text_out_3", "text_out_4",
        "text_out_5", "text_out_6", "text_out_7", "text_out_8"];

    this.outMuteArray = ["button_speaker_out1", "button_speaker_out2", "button_speaker_out3", "button_speaker_out4",
        "button_speaker_out5", "button_speaker_out6", "button_speaker_out7", "button_speaker_out8"];

    this.outDelalyArray = ["text_delay_millisecond_out", "text_delay_meter_out", "text_delay_inch_out"];

    this.outPolArray = ["button_phase_out"];

    this.outGainArray = ["text_volume_out1", "slider_track_out1", "text_volume_out2", "slider_track_out2",
        "text_volume_out3", "slider_track_out3", "text_volume_out4", "slider_track_out4",
        "text_volume_out5", "slider_track_out5", "text_volume_out6", "slider_track_out6",
        "text_volume_out7", "slider_track_out7", "text_volume_out8", "slider_track_out8"];

    this.outInMatrixArray = ["button_out1_a", "button_out1_b", "button_out1_c", "button_out1_d",
        "button_out2_a", "button_out2_b", "button_out2_c", "button_out2_d",
        "button_out3_a", "button_out3_b", "button_out3_c", "button_out3_d",
        "button_out4_a", "button_out4_b", "button_out4_c", "button_out4_d",
        "button_out5_a", "button_out5_b", "button_out5_c", "button_out5_d",
        "button_out6_a", "button_out6_b", "button_out6_c", "button_out6_d",
        "button_out7_a", "button_out7_b", "button_out7_c", "button_out7_d",
        "button_out8_a", "button_out8_b", "button_out8_c", "button_out8_d"];

    this.outCompLimtArray = ["text_threshold_compress_out", "text_ratio_compress_out", "text_attack_compress_out", "text_release_compress_out",
        "text_threshold_limit_out", "text_attack_limit_out", "text_release_limit_out"];

    this.outEqArray = ["text_eq1_frequency", "text_eq1_bandwidth", "text_eq1_slope", "text_eq1_gain_pass", "text_eq1_gain", "button_eq1","slider_ruler_eq1","select_mode1",//"select_slope1",
        "text_eq2_frequency", "text_eq2_bandwidth", "text_eq2_slope", "text_eq2_gain_pass", "text_eq2_gain", "button_eq2","slider_ruler_eq2","select_mode2",//"select_slope2",
        "text_eq3_frequency", "text_eq3_bandwidth", "text_eq3_slope", "text_eq3_gain_pass", "text_eq3_gain", "button_eq3","slider_ruler_eq3","select_mode3",//"select_slope3",
        "text_eq4_frequency", "text_eq4_bandwidth", "text_eq4_slope", "text_eq4_gain_pass", "text_eq4_gain", "button_eq4","slider_ruler_eq4","select_mode4",//"select_slope4",
        "text_eq5_frequency", "text_eq5_bandwidth", "text_eq5_slope", "text_eq5_gain_pass", "text_eq5_gain", "button_eq5","slider_ruler_eq5","select_mode5",//"select_slope5",
        "text_eq6_frequency", "text_eq6_bandwidth", "text_eq6_slope", "text_eq6_gain_pass", "text_eq6_gain", "button_eq6","slider_ruler_eq6","select_mode6",//"select_slope6",
        "button_eq","button_phase_curve"];

    this.outXoverArray = ["text_hpf_mode", "text_hpf_frequency", "text_hpf_slope", "text_lpf_mode", "text_lpf_frequency", "text_lpf_slope"];

    this.outLinkArray = ["select_link_out1", "select_link_out2", "select_link_out3", "select_link_out4",
        "select_link_out5", "select_link_out6", "select_link_out7", "select_link_out8"];



    //
    //input and out  : gain_long
    this.gain="text_gain";
    this.gainThump = "slider_gain_thump";

    LockDisplay.prototype.initLockElements = function() {
        this.initLockElement();
    };

    LockDisplay.prototype.refreshLockDisplay = function() {  //更新锁定数据
        if(curButtonNo > 4 ){
            // 输出
            this.refreshSystemLockDisplay();
            this.refreshInputLockDisplay();
            this.refreshOutLockDisplay();
        }else{
            // 输入
            this.refreshOutLockDisplay();
            this.refreshSystemLockDisplay();
            this.refreshInputLockDisplay();
        }
    };

    LockDisplay.prototype.setElementLockAttribute = function (elementName) {
        var element = document.getElementById(elementName);
        element.readonly = true;
        element.disabled = true;
    };


    LockDisplay.prototype.initLockElement = function (){
        var value;

        if(isChinese) {
            value = "锁定";
        } else {
            value = "LOCK";
        }
        //
        setElementValue(this.gain + "_lock", value);
        this.setElementLockAttribute(this.gain + "_lock");
        // setElementValue(this.gainThump + "_lock", value);
        this.setElementLockAttribute(this.gainThump + "_lock");
        // setElementValue(this.polarButton + "_lock", value);
        // this.setElementLockAttribute(this.polarButton + "_lock");



        //input
        for(var i=0; i<this.inNameArray.length; i++){
            setElementValue(this.inNameArray[i] + "_lock", value);
            this.setElementLockAttribute(this.inNameArray[i] + "_lock");
        }

        for(i=0; i<this.inMuteArray.length; i++){
            // setElementValue(this.inMuteArray[i] + "_lock", value);
            this.setElementLockAttribute(this.inMuteArray[i] + "_lock");
        }

        for(i=0; i<this.inDelayArray.length; i++){
            setElementValue(this.inDelayArray[i] + "_lock", value);
            this.setElementLockAttribute(this.inDelayArray[i] + "_lock");
        }

        for(i=0; i<this.inPolArray.length; i++){
            // setElementValue(this.inPolArray[i] + "_lock", value);
            this.setElementLockAttribute(this.inPolArray[i] + "_lock");
        }


        for(i=0; i<this.inGainArray.length; i++){
            if(i%2){
                setElementValue(this.inGainArray[i] + "_lock", value);
                this.setElementLockAttribute(this.inGainArray[i] + "_lock");
            }
        }

        for(i=0; i<this.inNoiseGateArray.length; i++){
            setElementValue(this.inNoiseGateArray[i] + "_lock", value);
            this.setElementLockAttribute(this.inNoiseGateArray[i] + "_lock");
        }

        for(i=0; i<this.inCompAGArray.length; i++){
            setElementValue(this.inCompAGArray[i] + "_lock", value);
            this.setElementLockAttribute(this.inCompAGArray[i] + "_lock");
        }

        for(i=0; i<this.inDeqArray.length; i++){
            if(i>1){
                setElementValue(this.inDeqArray[i] + "_lock", value);
            }
            this.setElementLockAttribute(this.inDeqArray[i] + "_lock");
        }

        for(i=0; i<this.inEQArray.length; i++){
            if(i===6 || i===14 || i===22 || i===30 || i===38 || i===46 ||
                i===5 || i===13 ||  i=== 21 ||  i=== 29 ||  i=== 37 ||  i=== 45 ||
                i===47 || i===48 || i===49 || i===50 || i===51 || i===52  ){

            } else {
                setElementValue(this.inEQArray[i] + "_lock", value);
            }

            this.setElementLockAttribute(this.inEQArray[i] + "_lock");
        }

        updateEqModeDisplay(eqData.EQ1.type,1);
        updateEqModeDisplay(eqData.EQ2.type,2);
        updateEqModeDisplay(eqData.EQ3.type,3);
        updateEqModeDisplay(eqData.EQ4.type,4);
        updateEqModeDisplay(eqData.EQ5.type,5);
        updateEqModeDisplay(eqData.EQ6.type,6);

        for(i=0; i<this.inLinkArray.length; i++){
            setElementValue(this.inLinkArray[i] + "_lock", value);
            this.setElementLockAttribute(this.inLinkArray[i] + "_lock");
        }

        //=============================================================
        //out
        for(i=0; i<this.outNameArray.length; i++){
            setElementValue(this.outNameArray[i] + "_lock", value);
            this.setElementLockAttribute(this.outNameArray[i] + "_lock");
        }

        for(i=0; i<this.outMuteArray.length; i++){
            // setElementValue(this.outMuteArray[i] + "_lock", value);
            this.setElementLockAttribute(this.outMuteArray[i] + "_lock");
        }

        for(i=0; i<this.outDelalyArray.length; i++){
            setElementValue(this.outDelalyArray[i] + "_lock", value);
            this.setElementLockAttribute(this.outDelalyArray[i] + "_lock");
        }

        for(i=0; i<this.outPolArray.length; i++){
            // setElementValue(this.outPolArray[i] + "_lock", value);
            this.setElementLockAttribute(this.outPolArray[i] + "_lock");
        }


        for(i=0; i<this.outGainArray.length; i++){
            if(!(i%2)){
                setElementValue(this.outGainArray[i] + "_lock", value);
                this.setElementLockAttribute(this.outGainArray[i] + "_lock");
            }
        }

        for(i=0; i<this.outInMatrixArray.length; i++){
           // setElementValue(this.outInMatrixArray[i] + "_lock", value);
            this.setElementLockAttribute(this.outInMatrixArray[i] + "_lock");
        }

        for(i=0; i<this.outCompLimtArray.length; i++){
            setElementValue(this.outCompLimtArray[i] + "_lock", value);
            this.setElementLockAttribute(this.outCompLimtArray[i] + "_lock");
        }

        for(i=0; i<this.outXoverArray.length; i++){
            setElementValue(this.outXoverArray[i] + "_lock", value);
            this.setElementLockAttribute(this.outXoverArray[i] + "_lock");
        }

        for(i=0; i<this.outEqArray.length; i++){
            if(i===6 || i===14 || i===22 || i===30 || i===38 || i===46 ||
                i===5 || i===13 || i===21 || i===29 || i===37 || i===45 || i===48 || i===49){

            } else {
                setElementValue(this.outEqArray[i] + "_lock", value);
            }

            this.setElementLockAttribute(this.outEqArray[i] + "_lock");
        }

        for(i=0; i<this.outLinkArray.length; i++){
            setElementValue(this.outLinkArray[i] + "_lock", value);
            this.setElementLockAttribute(this.outLinkArray[i] + "_lock");
        }


        // setElementLanguageValue('button_eq_lock','锁定','Lock','20','17');
        // setElementLanguageValue('button_phase_curve_lock','锁定','Lock','20','15');
    };


    LockDisplay.prototype.refreshInputLockDisplay = function() {
        var i;
        if(currentLockData.nIn_LockData.nIn_Name){
            for(i=0; i<this.inNameArray.length; i++){
                this.lockOrUnlockElement(this.inNameArray[i], true);
            }
        }else {
            for(i=0; i<this.inNameArray.length; i++){
                this.lockOrUnlockElement(this.inNameArray[i], false);
            }
        }

        if(currentLockData.nIn_LockData.nIn_Mute){
            for(i=0; i<this.inMuteArray.length; i++){
                this.lockOrUnlockElement(this.inMuteArray[i], true);
            }
        }else {
            for(i=0; i<this.inMuteArray.length; i++){
                this.lockOrUnlockElement(this.inMuteArray[i], false);
            }
        }

        if(currentLockData.nIn_LockData.nIn_Delay){
            for(i=0; i<this.inDelayArray.length; i++){
                this.lockOrUnlockElement(this.inDelayArray[i], true);
            }
        }else {
            for(i=0; i<this.inDelayArray.length; i++){
                this.lockOrUnlockElement(this.inDelayArray[i], false);
            }
        }

        if(currentLockData.nIn_LockData.nIn_Pol){
            for(i=0; i<this.inPolArray.length; i++){
                this.lockOrUnlockElement(this.inPolArray[i], true);
            }
            document.getElementById('black_one').style.display = 'none';
            document.getElementById('black_two').style.display = 'none';
            document.getElementById('red_one').style.display = 'none';
            document.getElementById('red_two').style.display = 'none';
        }else {
            for(i=0; i<this.inPolArray.length; i++){
                this.lockOrUnlockElement(this.inPolArray[i], false);
            }
            if (controlsData.buttonStates.buttonPhaseDirectionStatus[curButtonNo-1]){
                document.getElementById('black_one').style.display = 'none';
                document.getElementById('black_two').style.display = 'none';
                document.getElementById('red_one').style.display = 'inline';
                document.getElementById('red_two').style.display = 'inline';
            } else {
                document.getElementById('black_one').style.display = 'inline';
                document.getElementById('black_two').style.display = 'inline';
                document.getElementById('red_one').style.display = 'none';
                document.getElementById('red_two').style.display = 'none';
            }
        }

        if(currentLockData.nIn_LockData.nIn_Gain){
            for(i=0; i<this.inGainArray.length; i++){
                this.lockOrUnlockElement(this.inGainArray[i], true);
            }
            this.lockOrUnlockElement(this.gain, true);
            this.lockOrUnlockElement(this.gainThump, true);
        }else {
            for(i=0; i<this.inGainArray.length; i++){
                this.lockOrUnlockElement(this.inGainArray[i], false);
            }
            this.lockOrUnlockElement(this.gain, false);
            this.lockOrUnlockElement(this.gainThump, false);
        }

        if(currentLockData.nIn_LockData.nIn_NoiseGate){
            for(i=0; i<this.inNoiseGateArray.length; i++){
                this.lockOrUnlockElement(this.inNoiseGateArray[i], true);
            }
        }else {
            for(i=0; i<this.inNoiseGateArray.length; i++){
                this.lockOrUnlockElement(this.inNoiseGateArray[i], false);
            }
        }

        if(currentLockData.nIn_LockData.nIn_Comp_AG){
            for(i=0; i<this.inCompAGArray.length; i++){
                this.lockOrUnlockElement(this.inCompAGArray[i], true);
            }
            inputCompAgBeLocked();
        }else {
            for(i=0; i<this.inCompAGArray.length; i++){
                this.lockOrUnlockElement(this.inCompAGArray[i], false);
            }
            inputCompAgUnlock();
        }

        if(currentLockData.nIn_LockData.nIn_DEQ){
            for(i=0; i<this.inDeqArray.length; i++){
                this.lockOrUnlockElement(this.inDeqArray[i], true);
            }
        }else {
            for(i=0; i<this.inDeqArray.length; i++){
                this.lockOrUnlockElement(this.inDeqArray[i], false);
            }
        }

        if(currentLockData.nIn_LockData.nIn_EQ){
            for(i=0; i<this.inEQArray.length; i++){
                this.lockOrUnlockElement(this.inEQArray[i], true);
            }
            DrawOtherInLockLine();
            inputEqBeLocked();
        }else {
            for(i=0; i<this.inEQArray.length; i++){
                this.lockOrUnlockElement(this.inEQArray[i], false);
            }
            DrawOtherInLockLine();
            inputEqUnlock();
            DrawLine();
        }

        updateEqModeDisplay(eqData.EQ1.type,1);
        updateEqModeDisplay(eqData.EQ2.type,2);
        updateEqModeDisplay(eqData.EQ3.type,3);
        updateEqModeDisplay(eqData.EQ4.type,4);
        updateEqModeDisplay(eqData.EQ5.type,5);
        updateEqModeDisplay(eqData.EQ6.type,6);

        if(currentLockData.nIn_LockData.nIn_Link){
            for(i=0; i<this.inLinkArray.length; i++){
                this.lockOrUnlockElement(this.inLinkArray[i], true);
            }
        }else {
            for(i=0; i<this.inLinkArray.length; i++){
                this.lockOrUnlockElement(this.inLinkArray[i], false);
            }
        }

        agcExtMap.Draw_AGC_Comp();
    };

    LockDisplay.prototype.refreshOutLockDisplay = function() {
        var i;
        if (currentLockData.nOut_LockData.nOut_Name) {
            for (i = 0; i < this.outNameArray.length; i++) {
                this.lockOrUnlockElement(this.outNameArray[i], true);
            }
        } else {
            for (i = 0; i < this.outNameArray.length; i++) {
                this.lockOrUnlockElement(this.outNameArray[i], false);
            }
        }

        if (currentLockData.nOut_LockData.nOut_Mute) {
            for (i = 0; i < this.outMuteArray.length; i++) {
                this.lockOrUnlockElement(this.outMuteArray[i], true);
            }
        } else {
            for (i = 0; i < this.outMuteArray.length; i++) {
                this.lockOrUnlockElement(this.outMuteArray[i], false);
            }
        }

        if (currentLockData.nOut_LockData.nOut_Delay) {
            for (i = 0; i < this.outDelalyArray.length; i++) {
                this.lockOrUnlockElement(this.outDelalyArray[i], true);
            }
        } else {
            for (i = 0; i < this.outDelalyArray.length; i++) {
                this.lockOrUnlockElement(this.outDelalyArray[i], false);
            }
        }

        if (currentLockData.nOut_LockData.nOut_Pol) {
            for (i = 0; i < this.outPolArray.length; i++) {
                this.lockOrUnlockElement(this.outPolArray[i], true);
            }
            document.getElementById('black_one_out').style.display = 'none';
            document.getElementById('black_two_out').style.display = 'none';
            document.getElementById('red_one_out').style.display = 'none';
            document.getElementById('red_two_out').style.display = 'none';
        } else {
            for (i = 0; i < this.outPolArray.length; i++) {
                this.lockOrUnlockElement(this.outPolArray[i], false);
            }
            if (controlsData.buttonStates.buttonPhaseDirectionStatus[curButtonNo-1]){
                document.getElementById('black_one_out').style.display = 'none';
                document.getElementById('black_two_out').style.display = 'none';
                document.getElementById('red_one_out').style.display = 'inline';
                document.getElementById('red_two_out').style.display = 'inline';
            } else {
                document.getElementById('black_one_out').style.display = 'inline';
                document.getElementById('black_two_out').style.display = 'inline';
                document.getElementById('red_one_out').style.display = 'none';
                document.getElementById('red_two_out').style.display = 'none';
            }
        }

        if (currentLockData.nOut_LockData.nOut_Gain) {
            for (i = 0; i < this.outGainArray.length; i++) {
                this.lockOrUnlockElement(this.outGainArray[i], true);
            }
            this.lockOrUnlockElement(this.gain, true);
            this.lockOrUnlockElement(this.gainThump, true);
        } else {
            for (i = 0; i < this.outGainArray.length; i++) {
                this.lockOrUnlockElement(this.outGainArray[i], false);
            }
            this.lockOrUnlockElement(this.gain, false);
            this.lockOrUnlockElement(this.gainThump, false);
        }

        if (currentLockData.nOut_LockData.nIn_Matrix) {
            for (i = 0; i < this.outInMatrixArray.length; i++) {
                this.lockOrUnlockElement(this.outInMatrixArray[i], true);
            }
        } else {
            for (i = 0; i < this.outInMatrixArray.length; i++) {
                this.lockOrUnlockElement(this.outInMatrixArray[i], false);
            }
        }


        if (currentLockData.nOut_LockData.nOut_Comp_LimT) {
            for (i = 0; i < this.outCompLimtArray.length; i++) {
                this.lockOrUnlockElement(this.outCompLimtArray[i], true);
            }
            outputCompLimtLocked();
        } else {
            for (i = 0; i < this.outCompLimtArray.length; i++) {
                this.lockOrUnlockElement(this.outCompLimtArray[i], false);
            }
            outputCompLimtUnlock();
        }

        if (currentLockData.nOut_LockData.nOut_EQ) { //输出均衡 锁定
            for (i = 0; i < this.outEqArray.length; i++) {
                this.lockOrUnlockElement(this.outEqArray[i], true);
            }
            if (currentLockData.nOut_LockData.nOut_Xover) { //输出均衡 高低通 锁定
                outputCurveLineBelock();

            }
            DrawOtherLockOutLine();
            outputEqBeLock();
            DrawLine();
        } else { //输出均衡 未锁定
            for (i = 0; i < this.outEqArray.length; i++) {
                this.lockOrUnlockElement(this.outEqArray[i], false);
            }
            outPutEqUnlock();
        }


        updateEqModeDisplay(eqData.EQ1.type,1);
        updateEqModeDisplay(eqData.EQ2.type,2);
        updateEqModeDisplay(eqData.EQ3.type,3);
        updateEqModeDisplay(eqData.EQ4.type,4);
        updateEqModeDisplay(eqData.EQ5.type,5);
        updateEqModeDisplay(eqData.EQ6.type,6);
        if (currentLockData.nOut_LockData.nOut_Xover) {
            for (i = 0; i < this.outXoverArray.length; i++) {
                this.lockOrUnlockElement(this.outXoverArray[i], true);
            }
            if (currentLockData.nOut_LockData.nOut_EQ) {
                outputCurveLineBelock();
            }
            DrawOtherLockOutLine();
            outputXoverLocked();
        } else {
            for (i = 0; i < this.outXoverArray.length; i++) {
                this.lockOrUnlockElement(this.outXoverArray[i], false);
            }
            outputXoverUnlock();
        }

        if (currentLockData.nOut_LockData.nOut_Link) {
            for (i = 0; i < this.outLinkArray.length; i++) {
                this.lockOrUnlockElement(this.outLinkArray[i], true);
            }
        } else {
            for (i = 0; i < this.outLinkArray.length; i++) {
                this.lockOrUnlockElement(this.outLinkArray[i], false);
            }
        }

        if((!currentLockData.nOut_LockData.nOut_Xover) && (!currentLockData.nOut_LockData.nOut_EQ)) {
            //输出 均衡 高低通 都未锁定
            outPutEqUnlock();
            outputXoverUnlock();
            DrawOtherLockOutLine();
        }

        comExtMap.DrawOutComp_LimT();
    };


    LockDisplay.prototype.refreshSystemLockDisplay = function() {
        var saveToDevice = document.getElementById('save_to_device');
        var saveToDeviceLabel = document.getElementById('save_to_device_label');
        var saveOneToPc = document.getElementById('button_save_one_to_pc');
        var saveAllToPc = document.getElementById('button_save_all_to_pc');

        var loadFromDevice = document.getElementById('load_from_device');
        var loadFromDeviceLabel = document.getElementById('load_from_device_label');
        var loadOneFromPc = document.getElementById('button_load_one_from_pc');
        var loadOneFromPcFile = document.getElementById('load_one_from_pc');
        var loadAllFromPc = document.getElementById('button_load_all_from_pc');
        var loadAllFromPcFile = document.getElementById('load_all_from_pc');


        var saveLoadButton = document.getElementById('save_device');
        var deleteButton = document.getElementById('delete_device');
        var elementProgramName = document.getElementById('program_name');

        if (currentLockData.nSys_LockData.nSYS_Save_Data) { //保存锁定 保存到设备或电脑
            saveToDevice.checked = false;
            loadFromDevice.checked = true;

            saveToDevice.disabled = true;
            saveOneToPc.disabled = true;
            saveAllToPc.disabled = true;

            saveToDeviceLabel.style.color = 'grey';
            document.getElementById('save_device').innerText = '调用';
            elementProgramName.disabled = true;
            // console.log('保存被锁定');
        } else {
            saveToDevice.disabled = false;
            saveOneToPc.disabled = false;
            saveAllToPc.disabled = false;

            saveToDevice.checked = true;
            loadFromDevice.checked = false;
            saveLoadButton.disabled = false;

            saveToDeviceLabel.style.color = 'black';
        }


        if (currentLockData.nSys_LockData.nSYS_Load_Data) { //调用锁定  从设备调用程序或从电脑调用程序
            // console.log('调用被锁定');
            loadFromDevice.disabled = true;
            loadOneFromPc.disabled = true;
            loadAllFromPc.disabled = true;
            loadOneFromPcFile.disabled = true;
            loadAllFromPcFile.disabled = true;

            saveToDevice.checked = true;
            loadFromDevice.checked = false;
            document.getElementById('save_device').innerText = '保存';
            elementProgramName.disabled = false;
            if(currentLockData.nSys_LockData.nSYS_Save_Data){
                saveLoadButton.disabled = true;
                // console.log('保存 调用 都被锁定');
                elementProgramName.disabled = true;
            } else {
                saveLoadButton.disabled = false;
            }
            loadFromDeviceLabel.style.color = 'grey';
        } else {
            loadFromDevice.disabled = false;
            loadOneFromPc.disabled = false;
            loadAllFromPc.disabled = false;
            loadOneFromPcFile.disabled = false;
            loadAllFromPcFile.disabled = false;
            saveLoadButton.disabled = false;

            loadFromDeviceLabel.style.color = 'black';
        }


        if (currentLockData.nSys_LockData.nSYS_PC_Del) { //删除锁定
            deleteButton.disabled = true;
            console.log('更新锁定数据：删除锁定');
        } else {
            deleteButton.disabled = false;
            console.log('更新锁定数据：删除未锁定');
        }

        if (currentLockData.nSys_LockData.nSYS_Device_ID) { //设备ID锁定
        } else {}

        if (currentLockData.nSys_LockData.nSYS_Logo) { //MCU界面锁定
        } else {}

        var backLight = document.getElementById('system_back_selector');
        var backLightLock = document.getElementById('system_back_selector_lock');
        if (currentLockData.nSys_LockData.nSYS_Back_Linght) { //背景灯锁定
            backLightLock.style.display = 'inline';
            backLight.style.display = 'none';
            backLight.disabled = true;
            backLightLock.disabled = false;
        } else {
            backLightLock.style.display = 'none';
            backLight.style.display = 'inline';
            backLight.disabled = false;
            backLight.disabled = false;
        }

        document.getElementById('text_first_line').value = currentSystemData.firstRow;
        document.getElementById('text_second_line').value = currentSystemData.secondRow;

        var firstLine = document.getElementById('text_first_line');
        var secondLine = document.getElementById('text_second_line');
        var interfaceConfirm = document.getElementById('interface_confirm');
        if (currentLockData.nSys_LockData.nSYS_nPanel) { //面板锁定
            firstLine.disabled = true;
            secondLine.disabled = true;
            interfaceConfirm.disabled = true;
            firstLine.value = '锁定';
            secondLine.value = '锁定'
        } else {
            firstLine.disabled = false;
            secondLine.disabled = false;
            interfaceConfirm.disabled = false;
            firstLine.value = currentSystemData.firstRow;
            secondLine.value = currentSystemData.secondRow;
        }


        var startUp = document.getElementById('startup_selector');
        var startUpLock = document.getElementById('startup_selector_lock');
        if (currentLockData.nSys_LockData.nSYS_PowerOn) { //启动锁定
            startUpLock.style.display = 'inline';
            startUp.style.display = 'none';
            startUp.disabled = true;
            startUpLock.disabled = false;
        } else {
            startUpLock.style.display = 'none';
            startUp.style.display = 'inline';
            startUp.disabled = false;
            startUpLock.disabled = false;
        }

    };

    LockDisplay.prototype.lockOrUnlockElement = function(elementName, isLock){
        var element = document.getElementById(elementName);
        var elementLock = document.getElementById(elementName + "_lock");
        if(isLock){
            element.style.display = "none";
            elementLock.style.display = "inline";
        }else{
            element.style.display = "inline";
            elementLock.style.display = "none";
        }
    };


    LockDisplay.prototype.showOrHideTriangleButton = function(elementName, isLock) {

    }

}


function setElementValue(elementName, value) {
    var element;
    element = document.getElementById(elementName);
    element.value = value;
    element.innerHTML = value;
    element.setAttribute("value", value);

}