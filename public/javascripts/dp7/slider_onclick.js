function addSliderClickEventsListener(){
    var editControlID = ['slider_gain_thump', 'slider_eq1_thump', 'slider_eq2_thump', 'slider_eq3_thump',
        'slider_eq4_thump', 'slider_eq5_thump', 'slider_eq6_thump', 'slider_input_a_thump',
        'slider_input_b_thump', 'slider_input_c_thump', 'slider_input_d_thump', 'slider_out1_thump',
        'slider_out2_thump', 'slider_out3_thump', 'slider_out4_thump', 'slider_out5_thump',
        'slider_out6_thump', 'slider_out7_thump', 'slider_out8_thump'];

    var sliderControlID = ['slider_ruler_gain', 'slider_ruler_eq1', 'slider_ruler_eq2', 'slider_ruler_eq3',
        'slider_ruler_eq4', 'slider_ruler_eq5', 'slider_ruler_eq6', 'slider_track_input_a',
        'slider_track_input_b', 'slider_track_input_c', 'slider_track_input_d', 'slider_track_out1',
        'slider_track_out2', 'slider_track_out3', 'slider_track_out4', 'slider_track_out5',
        'slider_track_out6', 'slider_track_out7', 'slider_track_out8'];
    for(var f in editControlID){
        addSliderFocusEvent(editControlID[f]);
    }

    addGainSliderClickResponse();
    addEq1SliderClickResponse();
    addEq2SliderClickResponse();
    addEq3SliderClickResponse();
    addEq4SliderClickResponse();
    addEq5SliderClickResponse();
    addEq6SliderClickResponse();
    addInput1SliderClickResponse();
    addInput2SliderClickResponse();
    addInput3SliderClickResponse();
    addInput4SliderClickResponse();
    addOutput1SliderClickResponse();
    addOutput2SliderClickResponse();
    addOutput3SliderClickResponse();
    addOutput4SliderClickResponse();
    addOutput5SliderClickResponse();
    addOutput6SliderClickResponse();
    addOutput7SliderClickResponse();
    addOutput8SliderClickResponse();
}

function thumpRresponse(event, parentId, targetId, textId, thumpId) {
    isMouseDown = true;
    isMouseUp = false;
    params.flag = true;
    targetId = thumpId;
    thumpTextId = textId;
    var parentElement = document.getElementById(parentId);
    var targetElement = document.getElementById(targetId);
    if (getCss(parentElement, 'height') !== 'auto') {
        var parentHeight = getCss(parentElement, 'height');
    }

    if (getCss(targetElement, 'height') !== 'auto') {
        var targetHeight = getCss(targetElement, 'height');
    }
    params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
    params.top_min = 0; // half of mark height
    if (getCss(targetElement, 'left') !== 'auto') {
        params.left = getCss(targetElement, 'left');
    }
    if (getCss(targetElement, 'top') !== 'auto') {
        params.top = getCss(targetElement, 'top');
    }

    /*为了阻止拖动浏览器中元素时发生默认事件，
    例如拖动图片时会出现一个新窗口显示该图片，下面代码可以阻止这种事件发生
    */
    if (event.preventDefault) {
        event.preventDefault();
    }else {
        event.returnValue = false;
    }

    var e = event;
    params.currentX = e.pageX - curtainLeft;
    params.currentY = e.pageY - curtainTop;
}

function addGainSliderClickResponse() {
    document.getElementById('slider_ruler_gain').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_gain_thump';
        thumpTextId = controlsId.SLIDER_GAIN_THUMP;

        var parentElement = document.getElementById('slider_track_gain');
        var targetElement = document.getElementById('slider_gain_thump');
        var nowY = ev.pageY - curtainTop;
        var disY = nowY - 430;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_gain_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_gain_thump').focus();
        focusElementId =  'text_gain';

        thumpRresponse(ev, 'slider_track_gain', 'slider_gain_thump', controlsId.SLIDER_GAIN_THUMP, 'slider_gain_thump');
    }
    document.getElementById('slider_ruler_gain').onmouseup = function () {
        document.getElementById('slider_gain_thump').focus();
        focusElementId =  'text_gain';
    }
}


var eqPageYBase = 528;
function addEq1SliderClickResponse() {
    document.getElementById('slider_ruler_eq1').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_eq1_thump';
        thumpTextId = controlsId.SLIDER_EQ1_THUMP;

        var parentElement = document.getElementById('slider_track_eq1');
        var targetElement = document.getElementById('slider_eq1_thump');
        var nowY = ev.pageY - curtainTop;
        console.log('y: ' + nowY);
        var disY = nowY - eqPageYBase;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_eq1_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_eq1_thump').focus();
        focusElementId =  'text_eq1_gain';

        thumpRresponse(ev, 'slider_track_eq1', 'slider_eq1_thump', controlsId.SLIDER_EQ1_THUMP, 'slider_eq1_thump');
    }
    document.getElementById('slider_ruler_eq1').onmouseup = function () {
        document.getElementById('slider_eq1_thump').focus();
        focusElementId =  'text_eq1_gain';
    }
}

function addEq2SliderClickResponse() {
    document.getElementById('slider_ruler_eq2').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_eq2_thump';
        thumpTextId = controlsId.SLIDER_EQ2_THUMP;

        var parentElement = document.getElementById('slider_track_eq2');
        var targetElement = document.getElementById('slider_eq2_thump');
        var nowY = ev.pageY - curtainTop;
        // console.log('y: ' + nowY);
        var disY = nowY - eqPageYBase;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_eq2_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_eq2_thump').focus();
        focusElementId =  'text_eq2_gain';
        thumpRresponse(ev, 'slider_track_eq2', 'slider_eq2_thump', controlsId.SLIDER_EQ2_THUMP, 'slider_eq2_thump')
    }
    document.getElementById('slider_ruler_eq2').onmouseup = function () {
        document.getElementById('slider_eq2_thump').focus();
        focusElementId =  'text_eq2_gain';
    }
}

function addEq3SliderClickResponse() {
    document.getElementById('slider_ruler_eq3').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_eq3_thump';
        thumpTextId = controlsId.SLIDER_EQ3_THUMP;

        var parentElement = document.getElementById('slider_track_eq3');
        var targetElement = document.getElementById('slider_eq3_thump');
        var nowY = ev.pageY - curtainTop;
        // console.log('y: ' + nowY);
        var disY = nowY - eqPageYBase;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_eq3_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);
        document.getElementById('slider_eq3_thump').focus();
        focusElementId =  'text_eq3_gain';
        thumpRresponse(ev, 'slider_track_eq3', 'slider_eq3_thump', controlsId.SLIDER_EQ3_THUMP, 'slider_eq3_thump')
    }
    document.getElementById('slider_ruler_eq3').onmouseup = function () {
        document.getElementById('slider_eq3_thump').focus();
        focusElementId =  'text_eq3_gain';
    }
}

function addEq4SliderClickResponse() {
    document.getElementById('slider_ruler_eq4').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_eq4_thump';
        thumpTextId = controlsId.SLIDER_EQ4_THUMP;

        var parentElement = document.getElementById('slider_track_eq4');
        var targetElement = document.getElementById('slider_eq4_thump');
        var nowY = ev.pageY - curtainTop;
        // console.log('y: ' + nowY);
        var disY = nowY - eqPageYBase;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_eq4_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);
        document.getElementById('slider_eq4_thump').focus();
        focusElementId =  'text_eq4_gain';
        thumpRresponse(ev, 'slider_track_eq4', 'slider_eq4_thump', controlsId.SLIDER_EQ4_THUMP, 'slider_eq4_thump')
    }
    document.getElementById('slider_ruler_eq4').onmouseup = function () {
        document.getElementById('slider_eq4_thump').focus();
        focusElementId =  'text_eq4_gain';
    }
}

function addEq5SliderClickResponse() {
    document.getElementById('slider_ruler_eq5').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_eq5_thump';
        thumpTextId = controlsId.SLIDER_EQ5_THUMP;

        var parentElement = document.getElementById('slider_track_eq5');
        var targetElement = document.getElementById('slider_eq5_thump');
        var nowY = ev.pageY - curtainTop;
        // console.log('y: ' + nowY);
        var disY = nowY - eqPageYBase;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_eq5_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);
        document.getElementById('slider_eq5_thump').focus();
        focusElementId =  'text_eq5_gain';
        thumpRresponse(ev, 'slider_track_eq5', 'slider_eq5_thump', controlsId.SLIDER_EQ5_THUMP, 'slider_eq5_thump')
    }
    document.getElementById('slider_ruler_eq5').onmouseup = function () {
        document.getElementById('slider_eq5_thump').focus();
        focusElementId =  'text_eq5_gain';
    }
}

function addEq6SliderClickResponse() {
    document.getElementById('slider_ruler_eq6').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_eq6_thump';
        thumpTextId = controlsId.SLIDER_EQ6_THUMP;

        var parentElement = document.getElementById('slider_track_eq6');
        var targetElement = document.getElementById('slider_eq6_thump');
        var nowY = ev.pageY - curtainTop;
        // console.log('y: ' + nowY);
        var disY = nowY - eqPageYBase;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_eq6_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);
        document.getElementById('slider_eq6_thump').focus();
        focusElementId =  'text_eq6_gain';
        thumpRresponse(ev, 'slider_track_eq6', 'slider_eq6_thump', controlsId.SLIDER_EQ6_THUMP, 'slider_eq6_thump');
    }
    document.getElementById('slider_ruler_eq6').onmouseup = function () {
        document.getElementById('slider_eq6_thump').focus();
        focusElementId =  'text_eq6_gain';
    }
}

function addInput1SliderClickResponse() {
    document.getElementById('slider_track_input_a').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_input_a_thump';
        thumpTextId = controlsId.SLIDER_GAIN_INPUT_A;

        var parentElement = document.getElementById('slider_track_input_a');
        var targetElement = document.getElementById('slider_input_a_thump');
        var nowY = ev.pageY - curtainTop;
        console.log('y: ' + nowY);
        var disY = nowY - 22;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_input_a_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_input_a_thump').focus();
        focusElementId =  'text_volume_a';
        thumpRresponse(ev, 'slider_track_input_a', 'slider_input_a_thump', controlsId.SLIDER_GAIN_INPUT_A, 'slider_input_a_thump');
    }
    document.getElementById('slider_track_input_a').onmouseup = function () {
        document.getElementById('slider_input_a_thump').focus();
        focusElementId =  'text_volume_a';
    }
}


function addInput2SliderClickResponse() {
    document.getElementById('slider_track_input_b').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_input_b_thump';
        thumpTextId = controlsId.SLIDER_GAIN_INPUT_B;

        var parentElement = document.getElementById('slider_track_input_b');
        var targetElement = document.getElementById('slider_input_b_thump');
        var nowY = ev.pageY - curtainTop;
        console.log('y: ' + nowY);
        var disY = nowY - 198;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_input_b_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_input_b_thump').focus();
        focusElementId =  'text_volume_b';
        thumpRresponse(ev, 'slider_track_input_b', 'slider_input_b_thump', controlsId.SLIDER_GAIN_INPUT_B, 'slider_input_b_thump');
    }
    document.getElementById('slider_track_input_b').onmouseup = function () {
        document.getElementById('slider_input_b_thump').focus();
        focusElementId =  'text_volume_b';
    }
}


function addInput3SliderClickResponse() {
    document.getElementById('slider_track_input_c').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_input_c_thump';
        thumpTextId = controlsId.SLIDER_GAIN_INPUT_C;

        var parentElement = document.getElementById('slider_track_input_c');
        var targetElement = document.getElementById('slider_input_c_thump');
        var nowY = ev.pageY - curtainTop;
        console.log('y: ' + nowY);
        var disY = nowY - 375;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_input_c_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_input_c_thump').focus();
        focusElementId =  'text_volume_c';
        thumpRresponse(ev, 'slider_track_input_c', 'slider_input_c_thump', controlsId.SLIDER_GAIN_INPUT_C, 'slider_input_c_thump');
    }
    document.getElementById('slider_track_input_c').onmouseup = function () {
        document.getElementById('slider_input_c_thump').focus();
        focusElementId =  'text_volume_c';
    }
}


function addInput4SliderClickResponse() {
    document.getElementById('slider_track_input_d').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_input_d_thump';
        thumpTextId = controlsId.SLIDER_GAIN_INPUT_D;

        var parentElement = document.getElementById('slider_track_input_d');
        var targetElement = document.getElementById('slider_input_d_thump');
        var nowY = ev.pageY - curtainTop;
        console.log('y: ' + nowY);
        var disY = nowY - 552;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_input_d_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_input_d_thump').focus();
        focusElementId =  'text_volume_d';
        thumpRresponse(ev, 'slider_track_input_d', 'slider_input_d_thump', controlsId.SLIDER_GAIN_INPUT_D, 'slider_input_d_thump');
    }
    document.getElementById('slider_track_input_d').onmouseup = function () {
        document.getElementById('slider_input_d_thump').focus();
        focusElementId =  'text_volume_d';
    }
}


function addOutput1SliderClickResponse() {
    document.getElementById('slider_track_out1').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_out1_thump';
        thumpTextId = controlsId.SLIDER_GAIN_OUT1;

        var parentElement = document.getElementById('slider_track_out1');
        var targetElement = document.getElementById('slider_out1_thump');
        var nowY = ev.pageY - curtainTop;
        console.log('y: ' + nowY);
        var disY = nowY - 19;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_out1_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_out1_thump').focus();
        focusElementId =  'text_volume_out1';
        thumpRresponse(ev, 'slider_track_out1', 'slider_out1_thump', controlsId.SLIDER_GAIN_OUT1, 'slider_out1_thump');
    }
    document.getElementById('slider_track_out1').onmouseup = function () {
        document.getElementById('slider_out1_thump').focus();
        focusElementId =  'text_volume_out1';
    }
}

function addOutput2SliderClickResponse() {
    document.getElementById('slider_track_out2').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_out2_thump';
        thumpTextId = controlsId.SLIDER_GAIN_OUT2;

        var parentElement = document.getElementById('slider_track_out2');
        var targetElement = document.getElementById('slider_out2_thump');
        var nowY = ev.pageY - curtainTop;
        console.log('y: ' + nowY);
        var disY = nowY - 107;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_out2_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_out2_thump').focus();
        focusElementId =  'text_volume_out2';
        thumpRresponse(ev, 'slider_track_out2', 'slider_out2_thump', controlsId.SLIDER_GAIN_OUT2, 'slider_out2_thump');
    }
    document.getElementById('slider_track_out2').onmouseup = function () {
        document.getElementById('slider_out2_thump').focus();
        focusElementId =  'text_volume_out2';
    }
}

function addOutput3SliderClickResponse() {
    document.getElementById('slider_track_out3').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_out3_thump';
        thumpTextId = controlsId.SLIDER_GAIN_OUT3;

        var parentElement = document.getElementById('slider_track_out3');
        var targetElement = document.getElementById('slider_out3_thump');
        var nowY = ev.pageY - curtainTop;
        console.log('y: ' + nowY);
        var disY = nowY - 195;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_out3_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_out3_thump').focus();
        focusElementId =  'text_volume_out3';
        thumpRresponse(ev, 'slider_track_out3', 'slider_out3_thump', controlsId.SLIDER_GAIN_OUT3, 'slider_out3_thump');
    }
    document.getElementById('slider_track_out3').onmouseup = function () {
        document.getElementById('slider_out3_thump').focus();
        focusElementId =  'text_volume_out3';
    }
}

function addOutput4SliderClickResponse() {
    document.getElementById('slider_track_out4').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_out4_thump';
        thumpTextId = controlsId.SLIDER_GAIN_OUT4;

        var parentElement = document.getElementById('slider_track_out4');
        var targetElement = document.getElementById('slider_out4_thump');
        var nowY = ev.pageY - curtainTop;
        console.log('y: ' + nowY);
        var disY = nowY - 283;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_out4_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_out4_thump').focus();
        focusElementId =  'text_volume_out4';
        thumpRresponse(ev, 'slider_track_out4', 'slider_out4_thump', controlsId.SLIDER_GAIN_OUT4, 'slider_out4_thump');
    }
    document.getElementById('slider_track_out4').onmouseup = function () {
        document.getElementById('slider_out4_thump').focus();
        focusElementId =  'text_volume_out4';
    }
}

function addOutput5SliderClickResponse() {
    document.getElementById('slider_track_out5').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_out5_thump';
        thumpTextId = controlsId.SLIDER_GAIN_OUT5;

        var parentElement = document.getElementById('slider_track_out5');
        var targetElement = document.getElementById('slider_out5_thump');
        var nowY = ev.pageY - curtainTop;
        console.log('y: ' + nowY);
        var disY = nowY - 371;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_out5_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_out5_thump').focus();
        focusElementId =  'text_volume_out5';
        thumpRresponse(ev, 'slider_track_out5', 'slider_out5_thump', controlsId.SLIDER_GAIN_OUT5, 'slider_out5_thump');
    }
    document.getElementById('slider_track_out5').onmouseup = function () {
        document.getElementById('slider_out5_thump').focus();
        focusElementId =  'text_volume_out5';
    }
}

function addOutput6SliderClickResponse() {
    document.getElementById('slider_track_out6').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_out6_thump';
        thumpTextId = controlsId.SLIDER_GAIN_OUT6;

        var parentElement = document.getElementById('slider_track_out6');
        var targetElement = document.getElementById('slider_out6_thump');
        var nowY = ev.pageY - curtainTop;
        console.log('y: ' + nowY);
        var disY = nowY - 460;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_out6_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_out6_thump').focus();
        focusElementId =  'text_volume_out6';
        thumpRresponse(ev, 'slider_track_out6', 'slider_out6_thump', controlsId.SLIDER_GAIN_OUT6, 'slider_out6_thump');
    }
    document.getElementById('slider_track_out6').onmouseup = function () {
        document.getElementById('slider_out6_thump').focus();
        focusElementId =  'text_volume_out6';
    }
}

function addOutput7SliderClickResponse() {
    document.getElementById('slider_track_out7').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_out7_thump';
        thumpTextId = controlsId.SLIDER_GAIN_OUT7;

        var parentElement = document.getElementById('slider_track_out7');
        var targetElement = document.getElementById('slider_out7_thump');
        var nowY = ev.pageY - curtainTop;
        console.log('y: ' + nowY);
        var disY = nowY - 548;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_out7_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_out7_thump').focus();
        focusElementId =  'text_volume_out7';
        thumpRresponse(ev, 'slider_track_out7', 'slider_out7_thump', controlsId.SLIDER_GAIN_OUT7, 'slider_out7_thump');
    }
    document.getElementById('slider_track_out7').onmouseup = function () {
        document.getElementById('slider_out7_thump').focus();
        focusElementId =  'text_volume_out7';
    }
}

function addOutput8SliderClickResponse() {
    document.getElementById('slider_track_out8').onmousedown = function (ev) {
        if (isThumpOver) {
            return;
        }
        targetId = 'slider_out8_thump';
        thumpTextId = controlsId.SLIDER_GAIN_OUT8;

        var parentElement = document.getElementById('slider_track_out8');
        var targetElement = document.getElementById('slider_out8_thump');
        var nowY = ev.pageY - curtainTop;
        console.log('y: ' + nowY);
        var disY = nowY - 635;
        var topT =  disY + 'px';
        if (getCss(parentElement, 'height') !== 'auto') {
            var parentHeight = getCss(parentElement, 'height');
        }

        if (getCss(targetElement, 'height') !== 'auto') {
            var targetHeight = getCss(targetElement, 'height');
        }
        params.top_max = parseFloat(parentHeight) - parseFloat(targetHeight) + 'px';
        params.top_min = 0; // half of mark height
        if(parseFloat(topT) < parseFloat(params.top_min)){
            topT = params.top_min;
        }else if(parseFloat(topT) > parseFloat(params.top_max)){
            topT = params.top_max;
        }
        var thumpElement = document.getElementById('slider_out8_thump');
        thumpElement.style.top = topT;
        var range = parseInt(thumpElement.style.top)/parseInt(params.top_max);
        refreshSliderData( range);

        document.getElementById('slider_out8_thump').focus();
        focusElementId =  'text_volume_out8';
        thumpRresponse(ev, 'slider_track_out8', 'slider_out8_thump', controlsId.SLIDER_GAIN_OUT8, 'slider_out8_thump');
    }
    document.getElementById('slider_track_out8').onmouseup = function () {
        document.getElementById('slider_out8_thump').focus();
        focusElementId =  'text_volume_out8';
    }
}

var isThumpOver;
function addSliderFocusEvent(id) {
    var elementID;
    switch (id) {
        case 'slider_gain_thump':
            elementID = 'text_gain';
            break;
        case 'slider_eq1_thump':
            elementID = 'text_eq1_gain';
            break;
        case 'slider_eq2_thump':
            elementID = 'text_eq2_gain';
            break;
        case 'slider_eq3_thump':
            elementID = 'text_eq3_gain';
            break;
        case 'slider_eq4_thump':
            elementID = 'text_eq4_gain';
            break;
        case 'slider_eq5_thump':
            elementID = 'text_eq5_gain';
            break;
        case 'slider_eq6_thump':
            elementID = 'text_eq6_gain';
            break;
        case 'slider_input_a_thump':
            elementID = 'text_volume_a';
            break;
        case 'slider_input_b_thump':
            elementID = 'text_volume_b';
            break;
        case 'slider_input_c_thump':
            elementID = 'text_volume_c';
            break;
        case 'slider_input_d_thump':
            elementID = 'text_volume_d';
            break;
        case 'slider_out1_thump':
            elementID = 'text_volume_out1';
            break;
        case 'slider_out2_thump':
            elementID = 'text_volume_out2';
            break;
        case 'slider_out3_thump':
            elementID = 'text_volume_out3';
            break;
        case 'slider_out4_thump':
            elementID = 'text_volume_out4';
            break;
        case 'slider_out5_thump':
            elementID = 'text_volume_out5';
            break;
        case 'slider_out6_thump':
            elementID = 'text_volume_out6';
            break;
        case 'slider_out7_thump':
            elementID = 'text_volume_out7';
            break;
        case 'slider_out8_thump':
            elementID = 'text_volume_out8';
            break;
        default:
            break;
    }
    var currentEditControl = document.getElementById(id);
    currentEditControl.onmouseover = function () {
        isThumpOver = true;
    }
    currentEditControl.onmouseleave = function () {
        isThumpOver = false;
    }
    currentEditControl.onclick = function () {
        currentEditControl.focus();
        focusElementId = elementID
        // console.log('focus:' + elementID);
    }
    currentEditControl.onblur = function (ev) {
        focusElementId = 'null';
        // console.log('onblur: ' + elementID);
    }
}