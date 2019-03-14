function AgcExtDraw() {
    this.circle_agc_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.circle_comp_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.circle_agc  = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.circle_target = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.circle_comp = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    this.line_agc_origin = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.line_agc_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.line_target_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.line_target_comp = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.line_comp_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    AgcExtDraw.prototype.initPointAndLine = function (){
        this.circle_target = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.circle_target.setAttribute('id', "circle_target");
        //this.circle_target.setAttribute('stroke', AGC_Threshold_Rect_Col);
        this.circle_target.setAttribute('fill', AGC_Level_Rect_Col);

        this.circle_agc_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.circle_agc_ratio.setAttribute('id', "circle_agc_ratio");
        //this.circle_agc_ratio.setAttribute('stroke', AGC_Threshold_Rect_Col);
        this.circle_agc_ratio.setAttribute('fill', AGC_Ratio_Rect_Col);

        this.circle_comp_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.circle_comp_ratio.setAttribute('id', "circle_comp_ratio");
        //this.circle_comp_ratio.setAttribute('stroke', AGC_Threshold_Rect_Col);
        this.circle_comp_ratio.setAttribute('fill', Comp_Ratio_Rect_Col);

        this.circle_agc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.circle_agc.setAttribute('id', "circle_agc");
        //this.circle_agc.setAttribute('stroke', AGC_Threshold_Rect_Col);
        this.circle_agc.setAttribute('fill', AGC_Threshold_Rect_Col);

        this.circle_comp = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.circle_comp.setAttribute('id', "circle_comp");
        //this.circle_comp.setAttribute('stroke', AGC_Threshold_Rect_Col);
        this.circle_comp.setAttribute('fill', Comp_Level_Rect_Col);
        //===================================================================================
        this.line_agc_origin = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.line_agc_origin.setAttribute('id', "line_agc_origin");
        this.line_agc_origin.setAttribute('stroke', Comp_Level_Rect_Col);
        this.line_agc_origin.setAttribute('stroke-width', "2");

        this.line_agc_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.line_agc_ratio.setAttribute('id', "line_agc_ratio");
        this.line_agc_ratio.setAttribute('stroke', Comp_Level_Rect_Col);
        this.line_agc_ratio.setAttribute('stroke-width', "2");

        this.line_target_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.line_target_ratio.setAttribute('id', "line_target_ratio");
        this.line_target_ratio.setAttribute('stroke', Comp_Level_Rect_Col);
        this.line_target_ratio.setAttribute('stroke-width', "2");

        this.line_target_comp = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.line_target_comp.setAttribute('id', "line_target_comp");
        this.line_target_comp.setAttribute('stroke', Comp_Level_Rect_Col);
        this.line_target_comp.setAttribute('stroke-width', "2");

        this.line_comp_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.line_comp_ratio.setAttribute('id', "line_comp_ratio");
        this.line_comp_ratio.setAttribute('stroke', Comp_Level_Rect_Col);
        this.line_comp_ratio.setAttribute('stroke-width', "2");

        this.setEvent();
    };


    AgcExtDraw.prototype.drawPoint = function(index,point,diameter) {
        //index : 1: agc  2: target  3:comp  4:agc_ratio  5:comp_ratio
        switch(index){
            case 1:
                this.circle_agc.setAttribute('cx', point.x);
                this.circle_agc.setAttribute('cy', point.y);
                this.circle_agc.setAttribute('r', diameter);
                input_svg.appendChild(this.circle_agc);

                break;
            case 2:
                this.circle_target.setAttribute('cx', point.x);
                this.circle_target.setAttribute('cy', point.y);
                this.circle_target.setAttribute('r', diameter);
                input_svg.appendChild(this.circle_target);

                break;
            case 3:
                this.circle_comp.setAttribute('cx', point.x);
                this.circle_comp.setAttribute('cy', point.y);
                this.circle_comp.setAttribute('r', diameter);
                input_svg.appendChild(this.circle_comp);

                break;
            case 4:
                this.circle_agc_ratio.setAttribute('cx', point.x);
                this.circle_agc_ratio.setAttribute('cy', point.y);
                this.circle_agc_ratio.setAttribute('r', diameter);
                input_svg.appendChild(this.circle_agc_ratio);

                break;
            case 5:
                this.circle_comp_ratio.setAttribute('cx', point.x);
                this.circle_comp_ratio.setAttribute('cy', point.y);
                this.circle_comp_ratio.setAttribute('r', diameter);
                input_svg.appendChild(this.circle_comp_ratio);

                break;
            default:

                break;
        }
    };

    AgcExtDraw.prototype.drawLine = function(index,startPoint,endPoint,color) {
        //index : 1: agc_origin  2: agc_ratio  3:target_ratio  4:target_comp  5:comp_ratio
        switch(index){
            case 1:
                this.line_agc_origin.setAttribute('x1', startPoint.x);
                this.line_agc_origin.setAttribute('y1', startPoint.y);
                this.line_agc_origin.setAttribute('x2', endPoint.x);
                this.line_agc_origin.setAttribute('y2', endPoint.y);
                this.line_agc_origin.setAttribute('stroke', color);
                input_svg.appendChild(this.line_agc_origin);


                break;
            case 2:
                this.line_agc_ratio.setAttribute('x1', startPoint.x);
                this.line_agc_ratio.setAttribute('y1', startPoint.y);
                this.line_agc_ratio.setAttribute('x2', endPoint.x);
                this.line_agc_ratio.setAttribute('y2', endPoint.y);
                this.line_agc_ratio.setAttribute('stroke', color);
                input_svg.appendChild(this.line_agc_ratio);


                break;
            case 3:
                this.line_target_ratio.setAttribute('x1', startPoint.x);
                this.line_target_ratio.setAttribute('y1', startPoint.y);
                this.line_target_ratio.setAttribute('x2', endPoint.x);
                this.line_target_ratio.setAttribute('y2', endPoint.y);
                this.line_target_ratio.setAttribute('stroke', color);
                input_svg.appendChild(this.line_target_ratio);


                break;
            case 4:
                this.line_target_comp.setAttribute('x1', startPoint.x);
                this.line_target_comp.setAttribute('y1', startPoint.y);
                this.line_target_comp.setAttribute('x2', endPoint.x);
                this.line_target_comp.setAttribute('y2', endPoint.y);
                this.line_target_comp.setAttribute('stroke', color);
                input_svg.appendChild(this.line_target_comp);


                break;
            case 5:
                this.line_comp_ratio.setAttribute('x1', startPoint.x);
                this.line_comp_ratio.setAttribute('y1', startPoint.y);
                this.line_comp_ratio.setAttribute('x2', endPoint.x);
                this.line_comp_ratio.setAttribute('y2', endPoint.y);
                this.line_comp_ratio.setAttribute('stroke', color);
                input_svg.appendChild(this.line_comp_ratio);


                break;
            default:

                break;
        }

    };


    AgcExtDraw.prototype.setEvent = function() {
        setInputPointHover(this.circle_agc,1);
        setInputPointHover(this.circle_target,2);
        setInputPointHover(this.circle_comp,3);
        setInputPointHover(this.circle_agc_ratio,4);
        setInputPointHover(this.circle_comp_ratio,5);

        setInputPointDown(this.circle_agc,1);
        setInputPointDown(this.circle_target,2);
        setInputPointDown(this.circle_comp,3);
        setInputPointDown(this.circle_agc_ratio,4);
        setInputPointDown(this.circle_comp_ratio,5);
    };

    AgcExtDraw.prototype.drawGrid = function() {
        var lineHorizontal = new Array(11);
        var lineVertical = new Array(11);
        var value;

        for(var i=0; i<11; i++){
            value = i*16 + 12.5;
            lineHorizontal[i] = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            lineHorizontal[i].setAttribute('stroke-width', "1");
            lineHorizontal[i].setAttribute('x1', "20");
            lineHorizontal[i].setAttribute('y1', value);
            lineHorizontal[i].setAttribute('x2', "180.5");
            lineHorizontal[i].setAttribute('y2', value);
            lineHorizontal[i].setAttribute('stroke', "green");
            input_svg.appendChild(lineHorizontal[i]);
        }

        for(i=0; i<11; i++){
            value = i*16 + 20.5;
            lineVertical[i] = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            lineVertical[i].setAttribute('stroke-width', "1");
            lineVertical[i].setAttribute('x1', value);
            lineVertical[i].setAttribute('y1', "12.5");
            lineVertical[i].setAttribute('x2', value);
            lineVertical[i].setAttribute('y2', "172.5");
            lineVertical[i].setAttribute('stroke', "green");
            input_svg.appendChild(lineVertical[i]);
        }

        var diagonal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        diagonal.setAttribute('stroke-width', "1.5");
        diagonal.setAttribute('x1', "179.5");
        diagonal.setAttribute('y1', "13.5");
        diagonal.setAttribute('x2', "20");
        diagonal.setAttribute('y2', "172.5");
        diagonal.setAttribute('stroke', "white");
        diagonal.setAttribute('stroke-dasharray', "4");
        input_svg.appendChild(diagonal);
    }
}


function setInputPointHover (element, index) {
    element.onmouseover = function (event) {
        switch(index){
            case 1:
            case 2:
            case 3:
                document.documentElement.style.cursor = 'sw-resize';
                break;
            case 4:
            case 5:
                document.documentElement.style.cursor = 's-resize';
                break;
            default:
                document.documentElement.style.cursor = 'default';
                break;
        }
        paramsOfInputPoint.isHover = true;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };

    element.onmouseout = function (event) {
        if(paramsOfInputPoint.isDown === false){
           document.documentElement.style.cursor = 'default';
        }
        paramsOfInputPoint.isHover = false;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };

    element.onmouseup = function (event) {
        paramsOfInputPoint.isHover = false;
        paramsOfInputPoint.isDown = false;
        paramsOfInputPoint.flag = false;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };
}

function setInputPointDown(element, index) {

    element.onmousedown = function (event) {
        paramsOfInputPoint.index = index;
        paramsOfInputPoint.currentX = event.pageX - curtainLeft;
        paramsOfInputPoint.currentY = event.pageY - curtainTop;
        paramsOfInputPoint.isDown = true;
        paramsOfInputPoint.flag = true;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
        clearTextFocusEvent();
    };
}