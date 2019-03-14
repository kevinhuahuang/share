function DrawWithSVG() {
    this.linePhaseElement;
    this.lineInputElement = new Array(4);
    this.lineOutElement = new Array(8);

    this.eqChannelTextElement = new Array(8);
    this.eqInChannelTextElement = new Array(8);
    this.eqOutChannelTextElement = new Array(8);

    this.eqDataTextElement = new Array(8);
    this.eqDataTextElement1 = new Array(8);

    this.eqRRectElement = new Array(8);
    this.eqInRRectElement = new Array(8);
    this.eqOutRRectElement = new Array(8)

    this.eqLRectElement = new Array(8);
    this.eqInLRectElement = new Array(8);
    this.eqOutLRectElement = new Array(8)

    this.inputCurveLineID = ['curve_line_inputA', 'curve_line_inputB', 'curve_line_inputC', 'curve_line_inputD'];
    this.outCurveLineID = ['curve_line_out1', 'curve_line_out2', 'curve_line_out3', 'curve_line_out4',
        'curve_line_out5', 'curve_line_out6', 'curve_line_out7', 'curve_line_out8'];

    this.eqChannelTextID = ['eq1ChannelText', 'eq2ChannelText', 'eq3ChannelText', 'eq4ChannelText',
        'eq5ChannelText', 'eq6ChannelText', 'hpChannelText', 'lpChannelText'];
    this.eqInChannelTextID = ['eq1InChannelText', 'eq2InChannelText', 'eq3InChannelText', 'eq4InChannelText',
        'eq5InChannelText', 'eq6InChannelText', 'hpInChannelText', 'lpInChannelText'];
    this.eqOutChannelTextID = ['eq1OutChannelText', 'eq2OutChannelText', 'eq3OutChannelText', 'eq4OutChannelText',
        'eq5OutChannelText', 'eq6OutChannelText', 'hpOutChannelText', 'lpOutChannelText'];

    this.eqDataTextID = ['eq1DataText', 'eq2DataText', 'eq3DataText', 'eq4DataText',
        'eq5DataText', 'eq6DataText', 'hpDataText', 'lpDataText'];
    this.eqDataTextID1 = ['eq1DataText1', 'eq2DataText1', 'eq3DataText1', 'eq4DataText1',
        'eq5DataText1', 'eq6DataText1', 'hpDataText1', 'lpDataText1'];

    this.eqInRRectElementID = ['eq1InRRect', 'eq2InRRect', 'eq3InRRect', 'eq4InRRect', 'eq5InRRect', 'eq6InRRect'];
    this.eqOutRRectElementID = ['eq1OutRRect', 'eq2OutRRect', 'eq3OutRRect', 'eq4OutRRect', 'eq5OutRRect', 'eq6OutRRect'];
    this.eqRRectElementID = ['eq1RRect', 'eq2RRect', 'eq3RRect', 'eq4RRect', 'eq5RRect', 'eq6RRect'];

    this.eqInLRectElementID = ['eq1InLRect', 'eq2InLRect', 'eq3InLRect', 'eq4InLRect', 'eq5InLRect', 'eq6InLRect'];
    this.eqOutLRectElementID = ['eq1OutLRect', 'eq2OutLRect', 'eq3OutLRect', 'eq4OutLRect', 'eq5OutLRect', 'eq6OutLRect'];
    this.eqLRectElementID = ['eq1LRect', 'eq2LRect', 'eq3LRect', 'eq4LRect', 'eq5LRect', 'eq6LRect'];

    DrawWithSVG.prototype.initCurveSvg = function () {

        this.linePhaseElement = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        this.linePhaseElement.setAttribute('id', 'phase_line');
        this.linePhaseElement.setAttribute('stroke', 'white');
        this.linePhaseElement.setAttribute('fill', 'none');
        this.linePhaseElement.setAttribute('stroke-width', '1px');

        for (var i = 0; i < 4; i++) {
            this.lineInputElement[i] = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            this.lineInputElement[i].setAttribute('id', this.inputCurveLineID[i]);
            this.lineInputElement[i].setAttribute('stroke', COLOR_INPUT[i]);
            this.lineInputElement[i].setAttribute('fill', 'none');
            this.lineInputElement[i].setAttribute('stroke-width', CURVE_LINE_WIDTH);
        }

        for (i = 0; i < 8; i++) {
            this.lineOutElement[i] = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            this.lineOutElement[i].setAttribute('id', this.outCurveLineID[i]);
            this.lineOutElement[i].setAttribute('stroke', COLOR_OUT[i]);
            this.lineOutElement[i].setAttribute('fill', 'none');
            this.lineOutElement[i].setAttribute('stroke-width', CURVE_LINE_WIDTH);
        }

        for (i = 0; i < 8; i++) {
            // 曲线通道名称  1 2 3 4 5 6 HP LP
            this.eqChannelTextElement[i] = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.eqChannelTextElement[i].setAttribute('id', this.eqChannelTextID[i]);
            if((i === 6) || (i === 7) ){
                this.eqChannelTextElement[i].setAttribute('cursor', 'w-resize');
            } else {
                // this.eqChannelTextElement[i].setAttribute('cursor', 'move');
            }

            this.eqInChannelTextElement[i] = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            this.eqInChannelTextElement[i].setAttribute('id', this.eqInChannelTextID[i]);
            this.eqInChannelTextElement[i].setAttribute('fill', '#ffffff');
            this.eqInChannelTextElement[i].setAttribute('font-size', '15');
            this.eqInChannelTextElement[i].setAttribute('font-weight', 'bolder');

            this.eqOutChannelTextElement[i] = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            this.eqOutChannelTextElement[i].setAttribute('id', this.eqOutChannelTextID[i]);
            this.eqOutChannelTextElement[i].setAttribute('width', '24');
            this.eqOutChannelTextElement[i].setAttribute('height', '24');
            this.eqOutChannelTextElement[i].setAttribute('stroke-width', '1');
            this.eqOutChannelTextElement[i].setAttribute('fill', 'transparent');
            this.eqOutChannelTextElement[i].setAttribute('stroke', 'red');
            this.eqOutChannelTextElement[i].setAttribute('stroke', 'transparent');

            this.eqChannelTextElement[i].appendChild(this.eqInChannelTextElement[i]);
            this.eqChannelTextElement[i].appendChild(this.eqOutChannelTextElement[i]);

            // 曲线参数文本
            this.eqDataTextElement[i] = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            this.eqDataTextElement[i].setAttribute('id', this.eqDataTextID[i]);
            this.eqDataTextElement[i].setAttribute('fill', '#ffffff');
            this.eqDataTextElement[i].setAttribute('font-size', '15');
            this.eqDataTextElement[i].setAttribute('font-weight', 'bolder');

            this.eqDataTextElement1[i] = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            this.eqDataTextElement1[i].setAttribute('id', this.eqDataTextID1[i]);
            this.eqDataTextElement1[i].setAttribute('fill', '#ffffff');
            this.eqDataTextElement1[i].setAttribute('font-size', '15');
            this.eqDataTextElement1[i].setAttribute('font-weight', 'bolder');

            // 左小矩形
            this.eqLRectElement[i] = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.eqLRectElement[i].setAttribute('id', this.eqLRectElementID[i]);
            this.eqLRectElement[i].setAttribute('cursor', 'w-resize');
            // this.eqLRectElement[i].setAttribute('width', '24');
            // this.eqLRectElement[i].setAttribute('height', '24');

            this.eqInLRectElement[i] = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            this.eqInLRectElement[i].setAttribute('id', this.eqInLRectElementID[i]);
            this.eqInLRectElement[i].setAttribute('width', '8');
            this.eqInLRectElement[i].setAttribute('height', '8');
            this.eqInLRectElement[i].setAttribute('x', '4');
            this.eqInLRectElement[i].setAttribute('y', '4');
            this.eqInLRectElement[i].setAttribute('stroke-width', '1');
            this.eqInLRectElement[i].setAttribute('fill', 'transparent');

            this.eqOutLRectElement[i] = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            this.eqOutLRectElement[i].setAttribute('id', this.eqOutLRectElementID[i]);
            this.eqOutLRectElement[i].setAttribute('width', '16');
            this.eqOutLRectElement[i].setAttribute('height', '16');
            this.eqOutLRectElement[i].setAttribute('stroke-width', '');
            this.eqOutLRectElement[i].setAttribute('fill', 'transparent');
            this.eqOutLRectElement[i].setAttribute('stroke', 'transparent');

            this.eqLRectElement[i].appendChild(this.eqOutLRectElement[i]);
            this.eqLRectElement[i].appendChild(this.eqInLRectElement[i]);

            // 右小矩形
            this.eqRRectElement[i] = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.eqRRectElement[i].setAttribute('id', this.eqRRectElementID[i]);
            this.eqRRectElement[i].setAttribute('cursor', 'w-resize');
            // this.eqRRectElement[i].setAttribute('width', '24');
            // this.eqRRectElement[i].setAttribute('height', '24');

            this.eqInRRectElement[i] = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            this.eqInRRectElement[i].setAttribute('id', this.eqInRRectElementID[i]);
            this.eqInRRectElement[i].setAttribute('width', '8');
            this.eqInRRectElement[i].setAttribute('height', '8');
            this.eqInRRectElement[i].setAttribute('x', '4');
            this.eqInRRectElement[i].setAttribute('y', '4');
            this.eqInRRectElement[i].setAttribute('stroke-width', '1');
            this.eqInRRectElement[i].setAttribute('fill', 'transparent');

            this.eqOutRRectElement[i] = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            this.eqOutRRectElement[i].setAttribute('id', this.eqOutRRectElementID[i]);
            this.eqOutRRectElement[i].setAttribute('width', '16');
            this.eqOutRRectElement[i].setAttribute('height', '16');
            this.eqOutRRectElement[i].setAttribute('stroke-width', '');
            this.eqOutRRectElement[i].setAttribute('fill', 'transparent');
            this.eqOutRRectElement[i].setAttribute('stroke', 'transparent');

            this.eqRRectElement[i].appendChild(this.eqOutRRectElement[i]);
            this.eqRRectElement[i].appendChild(this.eqInRRectElement[i]);
        }
    };

    //
    // DrawWithSVG.prototype.removeAllLittleRect = function () {
    //     for (var i = 0; i < 8; i++) {
    //         if (document.getElementById(this.eqLRectElementID[i])) {
    //             curve_svg.removeChild(this.eqLRectElement[i]);
    //         }
    //
    //         if (document.getElementById(this.eqRRectElementID[i])) {
    //             curve_svg.removeChild(this.eqRRectElement[i]);
    //         }
    //     }
    // };

    DrawWithSVG.prototype.drawLeftRect = function (point, index) {
        var svgElement;
        switch (index) {
            case 1:
                if (document.getElementById(this.eqLRectElementID[0])) {
                    //curve_svg.removeChild(this.eqLRectElement[0]);
                }
                svgElement = this.eqLRectElement[0];
                break;
            case 2:
                if (document.getElementById(this.eqLRectElementID[1])) {
                    //curve_svg.removeChild(this.eqLRectElement[1]);
                }
                svgElement = this.eqLRectElement[1];
                break;
            case 3:
                if (document.getElementById(this.eqLRectElementID[2])) {
                    //curve_svg.removeChild(this.eqLRectElement[2]);
                }
                svgElement = this.eqLRectElement[2];
                break;
            case 4:
                if (document.getElementById(this.eqLRectElementID[3])) {
                    //curve_svg.removeChild(this.eqLRectElement[3]);
                }
                svgElement = this.eqLRectElement[3];
                break;
            case 5:
                if (document.getElementById(this.eqLRectElementID[4])) {
                    //curve_svg.removeChild(this.eqLRectElement[4]);
                }
                svgElement = this.eqLRectElement[4];
                break;
            case 6:
                if (document.getElementById(this.eqLRectElementID[5])) {
                    //curve_svg.removeChild(this.eqLRectElement[5]);
                }
                svgElement = this.eqLRectElement[5];
                break;
            default:

                break;

        }

        var color;
        if (curButtonNo < 5) {
            color = COLOR_INPUT[curButtonNo - 1];
        } else {
            color = COLOR_OUT[curButtonNo - 5];
        }
        svgElement.setAttribute('x', point.x - 4);
        svgElement.setAttribute('y', point.y - 4);
        svgElement.setAttribute('stroke', color);

        curve_svg.appendChild(svgElement);

        setLittleLRectHover(svgElement);
        setLittleLRectDown(svgElement, index, true);
        
    };


    DrawWithSVG.prototype.drawRightRect = function (point, index) {
        var svgElement;
        switch (index) {
            case 1:
                if (document.getElementById(this.eqRRectElementID[0])) {
                    //curve_svg.removeChild(this.eqRRectElement[0]);
                }
                svgElement = this.eqRRectElement[0];
                break;
            case 2:
                if (document.getElementById(this.eqRRectElementID[1])) {
                    //curve_svg.removeChild(this.eqRRectElement[1]);
                }
                svgElement = this.eqRRectElement[1];
                break;
            case 3:
                if (document.getElementById(this.eqRRectElementID[2])) {
                    //curve_svg.removeChild(this.eqRRectElement[2]);
                }
                svgElement = this.eqRRectElement[2];
                break;
            case 4:
                if (document.getElementById(this.eqRRectElementID[3])) {
                    //curve_svg.removeChild(this.eqRRectElement[3]);
                }
                svgElement = this.eqRRectElement[3];
                break;
            case 5:
                if (document.getElementById(this.eqRRectElementID[4])) {
                    //curve_svg.removeChild(this.eqRRectElement[4]);
                }
                svgElement = this.eqRRectElement[4];
                break;
            case 6:
                if (document.getElementById(this.eqRRectElementID[5])) {
                    //curve_svg.removeChild(this.eqRRectElement[5]);
                }
                svgElement = this.eqRRectElement[5];
                break;
            default:

                break;

        }
        var color;
        if (curButtonNo < 5) {
            color = COLOR_INPUT[curButtonNo - 1];
        } else {
            color = COLOR_OUT[curButtonNo - 5];
        }
        svgElement.setAttribute('x', point.x - 4);
        svgElement.setAttribute('y', point.y - 4);
        svgElement.setAttribute('stroke', color);

        curve_svg.appendChild(svgElement);

        setLittleRRectHover(svgElement);
        setLittleRRectDown(svgElement, index, false);

    };


    DrawWithSVG.prototype.setCurrentEqLine = function (oldNo, curNo) {
        if (oldNo > 4) {
            m_nCurOut_EQLine[oldNo - 5] = 0;
        } else {
            m_nCurIn_EQLine[oldNo - 1] = 0;
        }

        if (curNo > 4) {
            m_nCurOut_EQLine[curNo - 5] = 1;
        } else {
            m_nCurIn_EQLine[curNo - 1] = 1;
        }
    };


    DrawWithSVG.prototype.drawCurveLine = function (index, pointArray) {
        var svgElement;

        switch (index) {
            case 1:
                svgElement = this.lineInputElement[0];
                break;
            case 2:
                svgElement = this.lineInputElement[1];
                break;
            case 3:
                svgElement = this.lineInputElement[2];
                break;
            case 4:
                svgElement = this.lineInputElement[3];
                break;
            case 5:
                svgElement = this.lineOutElement[0];
                break;
            case 6:
                svgElement = this.lineOutElement[1];
                break;
            case 7:
                svgElement = this.lineOutElement[2];
                break;
            case 8:
                svgElement = this.lineOutElement[3];
                break;
            case 9:
                svgElement = this.lineOutElement[4];
                break;
            case 10:
                svgElement = this.lineOutElement[5];
                break;
            case 11:
                svgElement = this.lineOutElement[6];
                break;
            case 12:
                svgElement = this.lineOutElement[7];
                break;
            case 21:
                svgElement = this.linePhaseElement;
                svgElement.setAttribute('stroke', COLOR_INPUT[0]);
                break;
            case 22:
                svgElement = this.linePhaseElement;
                svgElement.setAttribute('stroke', COLOR_INPUT[1]);
                break;
            case 23:
                svgElement = this.linePhaseElement;
                svgElement.setAttribute('stroke', COLOR_INPUT[2]);
                break;
            case 24:
                svgElement = this.linePhaseElement;
                svgElement.setAttribute('stroke', COLOR_INPUT[3]);
                break;
            case 25:
                svgElement = this.linePhaseElement;
                svgElement.setAttribute('stroke', COLOR_OUT[0]);
                break;
            case 26:
                svgElement = this.linePhaseElement;
                svgElement.setAttribute('stroke', COLOR_OUT[1]);
                break;
            case 27:
                svgElement = this.linePhaseElement;
                svgElement.setAttribute('stroke', COLOR_OUT[2]);
                break;
            case 28:
                svgElement = this.linePhaseElement;
                svgElement.setAttribute('stroke', COLOR_OUT[3]);
                break;
            case 29:
                svgElement = this.linePhaseElement;
                svgElement.setAttribute('stroke', COLOR_OUT[4]);
                break;
            case 30:
                svgElement = this.linePhaseElement;
                svgElement.setAttribute('stroke', COLOR_OUT[5]);
                break;
            case 31:
                svgElement = this.linePhaseElement;
                svgElement.setAttribute('stroke', COLOR_OUT[6]);
                break;
            case 32:
                svgElement = this.linePhaseElement;
                svgElement.setAttribute('stroke', COLOR_OUT[7]);
                break;
            default:
                break;
        }

        var pointsString = pointArray[0].x + ',' + pointArray[0].y;
        for (var i = 1; i < pointArray.length; i++) {
            pointsString = pointsString + ' ' + pointArray[i].x + ',' + pointArray[i].y;
        }
        svgElement.setAttribute('points', pointsString);

        curve_svg.appendChild(svgElement);
        //console.log("appendChild index: " + (index-1));
    };


    DrawWithSVG.prototype.drawOtherCurveLine = function () {
        var inputLinkArray = getLinkInputArray(curButtonNo);
        var outLinkArray = getLinkOutArray(curButtonNo);
        var linkMark;

        for (var i = 0; i < 4; i++) {
            if (m_nCurIn_EQLine[i] || m_nLinkIn_EQLine[i]) {  //m_nCurIn_EQLine 当前选择的通道曲线
                if (document.getElementById(this.inputCurveLineID[i])) {
                    //this.drawCurveLine(i+1, m_nCurIn_EQLine[i].m_nPointF);
                    // console.log("输入 current:" + i);
                    linkMark = false;
                    for(var t=0; t<inputLinkArray.length; t++) {
                        if( i === inputLinkArray[t]){
                            // linkMark = true; //联调的曲线不显示
                            break;
                        }
                    }
                    if (linkMark) {
                        svgDrawCurve.lineInputElement[i].setAttribute('visibility','hidden');
                    } else {
                        svgDrawCurve.lineInputElement[i].setAttribute('visibility','visible');
                    }
                }
                // console.log('显示输入曲线：' + i);
                // console.log('m_nCurIn_EQLine:' + m_nCurIn_EQLine[i] + '   m_nLinkIn_EQLine:' + m_nLinkIn_EQLine[i]);
            } else {
                if (document.getElementById(this.inputCurveLineID[i])) {
                    //console.log("old:" + i + "  Instance: " + document.getElementById(this.inputCurveLineID[i]));
                    //curve_svg.removeChild(this.lineInputElement[i]);
                    svgDrawCurve.lineInputElement[i].setAttribute('visibility','hidden');
                    // console.log('隐藏输入曲线：' + i);
                }
            }
        }

        for (i = 0; i < 8; i++) {
            if (m_nCurOut_EQLine[i] || m_nLinkOut_EQLine[i]) {
                if (document.getElementById(this.outCurveLineID[i])) {
                    //this.drawCurveLine(i+5, m_nCurOut_EQLine[i].m_nPointF);
                    // console.log("输出 current:" + i);
                    linkMark = false;
                    for( t=0; t<outLinkArray.length; t++) {
                        if( i === outLinkArray[t]){
                            // linkMark = true; //联调的曲线不显示
                            break;
                        }
                    }
                    if (linkMark) {
                        svgDrawCurve.lineOutElement[i].setAttribute('visibility','hidden');
                    } else {
                        svgDrawCurve.lineOutElement[i].setAttribute('visibility','visible');
                    }
                }
            } else {
                if (document.getElementById(this.outCurveLineID[i])) {
                    //curve_svg.removeChild(this.lineOutElement[i]);
                    svgDrawCurve.lineOutElement[i].setAttribute('visibility','hidden');

                }
            }
        }

        //console.log('m_nCurIn_EQLine:' + m_nCurIn_EQLine);
        //console.log('m_nCurOut_EQLine:' + m_nCurOut_EQLine);
        //console.log('m_nLinkIn_EQLine:' + m_nLinkIn_EQLine);
        //console.log('m_nLinkOut_EQLine:' + m_nLinkOut_EQLine);
    };


    DrawWithSVG.prototype.drawChannelText = function (point, index, color) {
        var textElement;
        var textShowElement;
        var strText = index.toString();
        switch (index) {
            case 1:
                textElement = this.eqChannelTextElement[0];
                textShowElement = this.eqInChannelTextElement[0];
                break;
            case 2:
                textElement = this.eqChannelTextElement[1];
                textShowElement = this.eqInChannelTextElement[1];
                break;
            case 3:
                textElement = this.eqChannelTextElement[2];
                textShowElement = this.eqInChannelTextElement[2];
                break;
            case 4:
                textElement = this.eqChannelTextElement[3];
                textShowElement = this.eqInChannelTextElement[3];
                break;
            case 5:
                textElement = this.eqChannelTextElement[4];
                textShowElement = this.eqInChannelTextElement[4];
                break;
            case 6:
                textElement = this.eqChannelTextElement[5];
                textShowElement = this.eqInChannelTextElement[5];
                break;
            case 10:
                if(currentLockData.nOut_LockData.nOut_Xover){
                    this.eqChannelTextElement[6].setAttribute('visibility','hidden');
                    return;
                }
                textElement = this.eqChannelTextElement[6];
                textShowElement = this.eqInChannelTextElement[6];
                strText = 'HP';
                break;
            case 11:
                if(currentLockData.nOut_LockData.nOut_Xover){
                    this.eqChannelTextElement[7].setAttribute('visibility','hidden');
                    return;
                }
                textElement = this.eqChannelTextElement[7];
                textShowElement = this.eqInChannelTextElement[7];
                strText = 'LP';
                break;
            default:
                textElement = this.eqChannelTextElement[7];
                textShowElement = this.eqInChannelTextElement[7];
                strText = '0';
                break;
        }
        textElement.setAttribute('x', point.x - 10);
        textElement.setAttribute('y', point.y - 12);
        textShowElement.setAttribute('x', '8');
        textShowElement.setAttribute('y', '17px');
        textShowElement.setAttribute('fill', color);
        textShowElement.textContent = strText;

        curve_svg.appendChild(textElement);

        setChannelNameHover(textElement,index);
        setChannelEqDown(textElement,index);
    };

    DrawWithSVG.prototype.myMouseOver = function (even) {
        alert('over');
    };

    // DrawWithSVG.prototype.removeAllDataText = function () {
    //     for (var i = 0; i < 8; i++) {
    //         if (document.getElementById(this.eqDataTextID[i])) {
    //             curve_svg.removeChild(this.eqDataTextElement[i]);
    //         }
    //         if (document.getElementById(this.eqDataTextID1[i])) {
    //             curve_svg.removeChild(this.eqDataTextElement1[i]);
    //         }
    //     }
    // };

    DrawWithSVG.prototype.drawDataText = function (point, index, strText,color,isFirst) {
        var textElement, textElement1;
        var gapX = 70;
        var gapY = 18;
        var gapX2 = 0;
        if(isFirst){
            gapX2 = 20;
        }
        switch (index) {
            case 1:
                textElement = this.eqDataTextElement[0];
                textElement1 = this.eqDataTextElement1[0];
                break;
            case 2:
                textElement = this.eqDataTextElement[1];
                textElement1 = this.eqDataTextElement1[1];
                break;
            case 3:
                textElement = this.eqDataTextElement[2];
                textElement1 = this.eqDataTextElement1[2];
                break;
            case 4:
                textElement = this.eqDataTextElement[3];
                textElement1 = this.eqDataTextElement1[3];
                break;
            case 5:
                textElement = this.eqDataTextElement[4];
                textElement1 = this.eqDataTextElement1[4];
                break;
            case 6:
                textElement = this.eqDataTextElement[5];
                textElement1 = this.eqDataTextElement1[5];
                break;
            case 10: //高通
                textElement = this.eqDataTextElement[6];
                textElement.setAttribute('x', point.x - 20);
                textElement.setAttribute('y', point.y);
                textElement.textContent = strText[0];
                textElement.setAttribute('fill', color);
                curve_svg.appendChild(textElement);
                return;
            case 11: //低通
                textElement = this.eqDataTextElement[7];
                textElement.setAttribute('x', point.x - 20);
                textElement.setAttribute('y', point.y);
                textElement.textContent = strText[0];
                textElement.setAttribute('fill', color);
                curve_svg.appendChild(textElement);
                return;
            default:
                textElement = this.eqDataTextElement[7];
                textElement1 = this.eqDataTextElement1[7];
                strText = 'LP';
                break;

        }
        textElement.setAttribute('x', point.x + gapX);
        textElement.setAttribute('y', point.y);
        textElement.textContent = strText[0];
        textElement.setAttribute('fill', color);
        curve_svg.appendChild(textElement);

        textElement1.setAttribute('x', point.x + gapX2);
        textElement1.setAttribute('y', point.y + gapY);
        textElement1.textContent = strText[1];
        textElement1.setAttribute('fill', color);
        curve_svg.appendChild(textElement1);
    };
}
    function isEqPassMode(index) {
        var type;
        switch (index) {
            case 1:
                type = eqData.EQ1.type;
                break;
            case 2:
                type = eqData.EQ2.type;
                break;
            case 3:
                type = eqData.EQ3.type;
                break;
            case 4:
                type = eqData.EQ4.type;
                break;
            case 5:
                type = eqData.EQ5.type;
                break;
            case 6:
                type = eqData.EQ6.type;
                break;
        }
        return type > 2;
    }

    function setChannelNameHover  (element,index) {
        element.onmouseover = function (event) {
            if(paramsOfLRect.isDown || paramsOfRRect.isDown || paramsOfEQ.isDown){
                return;
            }
            // if((index === 10) || (index === 11) ){
            //     document.documentElement.style.cursor = 'w-resize';
            // } else {
            //     document.documentElement.style.cursor = 'move';
            // }
            paramsOfEQ.isHover = true;
            curEqChannel = index;
            changeCursorStyle();
            showOrHideLittleRect();
            showOrHideEqData();
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        };

        element.onmouseout = function (event) {
            if(paramsOfLRect.isDown || paramsOfRRect.isDown){
                return;
            }
            if(paramsOfEQ.isDown === false) {
               document.documentElement.style.cursor = 'default';
            }

            // paramsOfEQ.isHover = false;
            // paramsOfEQ.isDown = false;
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        };

        element.onmouseup = function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
            // paramsOfEQ.isHover = false;
        };
    }

        function setChannelEqDown (element, index) {
        element.onmousedown = function (event) {
            paramsOfEQ.index = index;
            paramsOfEQ.currentX = event.pageX - curtainLeft;
            paramsOfEQ.currentY = event.pageY - curtainTop;
            paramsOfEQ.isDown = true;
            paramsOfEQ.flag = true;
            //alert('true');
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
            clearTextFocusEvent();
        };
    }

    function setLittleLRectHover (element) {
        element.onmouseover = function (event) {
            document.documentElement.style.cursor = 'w-resize';
            paramsOfLRect.isHover = true;
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        };

        element.onmouseout = function (event) {
            if(paramsOfLRect.isDown === false){
                document.documentElement.style.cursor = 'default';
            }
            paramsOfLRect.isHover = false;
            //paramsOfLRect.isDown = false;
           // paramsOfLRect.flag = false;
            //console.log("LEFT RECT OUT");
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        };

        element.onmouseup = function (event) {
            //document.documentElement.style.cursor = 'default';
            paramsOfLRect.isHover = false;
            paramsOfLRect.isDown = false;
            paramsOfLRect.flag = false;
            //console.log("LEFT RECT UP");
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        };
    }

    function setLittleLRectDown(element, index, isleft) {

        element.onmousedown = function (event) {
            paramsOfLRect.index = index;
            paramsOfLRect.currentX = event.pageX - curtainLeft;
            paramsOfLRect.currentY = event.pageY - curtainTop;
            paramsOfLRect.isDown = true;
            paramsOfLRect.flag = true;
            //console.log("LEFT RECT DOWN");
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
            clearTextFocusEvent();
        };
    }

  function setLittleRRectHover (element) {
        element.onmouseover = function (event) {
            document.documentElement.style.cursor = 'w-resize';
            paramsOfRRect.isHover = true;
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        };

        element.onmouseout = function (event) {
            if(paramsOfRRect.isDown === false){
               document.documentElement.style.cursor = 'default';
            }
            paramsOfRRect.isHover = false;
            //paramsOfRRect.isDown = false;
            //paramsOfRRect.flag = false;
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        };

        element.onmouseup = function (event) {
            //document.documentElement.style.cursor = 'default';
            paramsOfRRect.isHover = false;
            paramsOfRRect.isDown = false;
            paramsOfRRect.flag = false;
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        };
    }

    function changeCursorStyle() {
        var type;
        if(curButtonNo < 5) {
            type = m_nInMapEQ[curButtonNo-1].filterArray[curEqChannel-1].GetFilterType();
            if ((type === eqType.AllPass_Shelf1) || (type === eqType.AllPass_Shelf2)) {
                document.documentElement.style.cursor = 'w-resize';
            } else {
                document.documentElement.style.cursor = 'move';
            }
        } else {
            type = m_nOutMapEQ[curButtonNo-5].filterArray[curEqChannel-1].GetFilterType();
            if ((type ===eqType.AllPass_Shelf1)  || (type === eqType.AllPass_Shelf2)) {
                document.documentElement.style.cursor = 'w-resize';
            } else {
                document.documentElement.style.cursor = 'move';
            }
        }
    }

    function setLittleRRectDown(element, index, isleft) {

        element.onmousedown = function (event) {
            paramsOfRRect.index = index;
            paramsOfRRect.currentX = event.pageX - curtainLeft;
            paramsOfRRect.currentY = event.pageY - curtainTop;
            paramsOfRRect.isDown = true;
            paramsOfRRect.flag = true;
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
            clearTextFocusEvent();
        };
    }



    function showOrHideLittleRect() {
        // if(index === 10) index = 7;
        // if(index === 11) index = 8;
        svgDrawCurve.eqLRectElement[0].setAttribute('visibility','hidden');
        svgDrawCurve.eqLRectElement[1].setAttribute('visibility','hidden');
        svgDrawCurve.eqLRectElement[2].setAttribute('visibility','hidden');
        svgDrawCurve.eqLRectElement[3].setAttribute('visibility','hidden');
        svgDrawCurve.eqLRectElement[4].setAttribute('visibility','hidden');
        svgDrawCurve.eqLRectElement[5].setAttribute('visibility','hidden');

        svgDrawCurve.eqRRectElement[0].setAttribute('visibility','hidden');
        svgDrawCurve.eqRRectElement[1].setAttribute('visibility','hidden');
        svgDrawCurve.eqRRectElement[2].setAttribute('visibility','hidden');
        svgDrawCurve.eqRRectElement[3].setAttribute('visibility','hidden');
        svgDrawCurve.eqRRectElement[4].setAttribute('visibility','hidden');
        svgDrawCurve.eqRRectElement[5].setAttribute('visibility','hidden');

        if(curEqChannel<=0 || curEqChannel > 6){
            return;
        }

        var type;
        if(curButtonNo < 5) {
            type = m_nInMapEQ[curButtonNo-1].filterArray[curEqChannel-1].GetFilterType();
            // console.log('input type: ' + type + '   eqType.Li_SEQ:' + eqType.Li_SEQ);
            if ((type === eqType.Li_SEQ) || (type ===eqType.Hi_Shelf)  || (type ===eqType.AllPass_Shelf1)) {
                return;
            }
        } else {
            type = m_nOutMapEQ[curButtonNo-5].filterArray[curEqChannel-1].GetFilterType();
            if ((type === eqType.Li_SEQ) || (type ===eqType.Hi_Shelf)  || (type ===eqType.AllPass_Shelf1)) {
                return;
            }
        }

        svgDrawCurve.eqLRectElement[curEqChannel-1].setAttribute('visibility','visible');
        svgDrawCurve.eqRRectElement[curEqChannel-1].setAttribute('visibility','visible');
    }

    function showOrHideEqData() {
        if(curEqChannel === 10) curEqChannel = 7;
        if(curEqChannel === 11) curEqChannel = 8;
        svgDrawCurve.eqDataTextElement[0].setAttribute('visibility','hidden');
        svgDrawCurve.eqDataTextElement[1].setAttribute('visibility','hidden');
        svgDrawCurve.eqDataTextElement[2].setAttribute('visibility','hidden');
        svgDrawCurve.eqDataTextElement[3].setAttribute('visibility','hidden');
        svgDrawCurve.eqDataTextElement[4].setAttribute('visibility','hidden');
        svgDrawCurve.eqDataTextElement[5].setAttribute('visibility','hidden');
        svgDrawCurve.eqDataTextElement[6].setAttribute('visibility','hidden');  //HP
        svgDrawCurve.eqDataTextElement[7].setAttribute('visibility','hidden');  //LP

        svgDrawCurve.eqDataTextElement1[0].setAttribute('visibility','hidden');
        svgDrawCurve.eqDataTextElement1[1].setAttribute('visibility','hidden');
        svgDrawCurve.eqDataTextElement1[2].setAttribute('visibility','hidden');
        svgDrawCurve.eqDataTextElement1[3].setAttribute('visibility','hidden');
        svgDrawCurve.eqDataTextElement1[4].setAttribute('visibility','hidden');
        svgDrawCurve.eqDataTextElement1[5].setAttribute('visibility','hidden');
        svgDrawCurve.eqDataTextElement1[6].setAttribute('visibility','hidden');  //HP
        svgDrawCurve.eqDataTextElement1[7].setAttribute('visibility','hidden');  //LP
        if(curEqChannel<=0 || curEqChannel > 8){
            return;
        }

        svgDrawCurve.eqDataTextElement[curEqChannel-1].setAttribute('visibility','visible');
        svgDrawCurve.eqDataTextElement1[curEqChannel-1].setAttribute('visibility','visible');
    }

    function hideHLPFChannelName() {
        svgDrawCurve.eqChannelTextElement[6].setAttribute('visibility','hidden');
        svgDrawCurve.eqChannelTextElement[7].setAttribute('visibility','hidden');
    }

    function showHLPFChannelName() {
        svgDrawCurve.eqChannelTextElement[6].setAttribute('visibility','visible');
        svgDrawCurve.eqChannelTextElement[7].setAttribute('visibility','visible');
    }