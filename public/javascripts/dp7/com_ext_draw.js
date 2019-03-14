function ComExtDraw() {
    // this.circle_level  = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    // this.circle_limit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    // this.circle_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    // this.line_level = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    // this.line_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    // this.line_limit = document.createElementNS('http://www.w3.org/2000/svg', 'line');


    ComExtDraw.prototype.initPointAndLine = function (){
        this.circle_level = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.circle_level.setAttribute('id', "circle_level");
        this.circle_level.setAttribute('fill', RectMap_Line1);

        this.circle_limit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.circle_limit.setAttribute('id', "circle_limit");
        this.circle_limit.setAttribute('fill', AGC_Ratio_Rect_Col);

        this.circle_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.circle_ratio.setAttribute('id', "circle_ratio");
        this.circle_ratio.setAttribute('fill', AGC_Comp_Line_Col_F);
        //===================================================================================
        this.line_level_start = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.line_level_start.setAttribute('id', "line_level_start");
        this.line_level_start.setAttribute('stroke', AGC_Line_Col_F);
        this.line_level_start.setAttribute('stroke-width', "2");

        this.line_level_end = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.line_level_end.setAttribute('id', "line_level_end");
        this.line_level_end.setAttribute('stroke', "white");
        this.line_level_end.setAttribute('stroke-dasharray', "4");
        this.line_level_end.setAttribute('stroke-width', "1.5");

        this.line_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.line_ratio.setAttribute('id', "line_ratio");
        this.line_ratio.setAttribute('stroke', AGC_Line_Col_F);
        this.line_ratio.setAttribute('stroke-width', "2");

        this.line_limit = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.line_limit.setAttribute('id', "line_limit");
        this.line_limit.setAttribute('stroke', "white");
        this.line_limit.setAttribute('stroke-width', "1.5");
        this.line_limit.setAttribute('stroke-dasharray', "4");

        this.polyline_ratio = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        this.polyline_ratio.setAttribute('id', "polyline_ratio");
        this.polyline_ratio.setAttribute('stroke', AGC_Line_Col_F);
        this.polyline_ratio.setAttribute('stroke-width', "2");
        this.polyline_ratio.setAttribute('fill', 'none');

        this.setEvent();

    };


    ComExtDraw.prototype.drawPoint = function(index,point,diameter) {
        //index : 1: circle_level  2: circle_limit  3:circle_ratio
        switch(index){
            case 1:
                this.circle_level.setAttribute('cx', point.x);
                this.circle_level.setAttribute('cy', point.y);
                this.circle_level.setAttribute('r', diameter);
                out_svg.appendChild(this.circle_level);

                break;
            case 2:
                this.circle_limit.setAttribute('cx', point.x);
                this.circle_limit.setAttribute('cy', point.y);
                this.circle_limit.setAttribute('r', diameter);
                out_svg.appendChild(this.circle_limit);

                break;
            case 3:
                this.circle_ratio.setAttribute('cx', point.x);
                this.circle_ratio.setAttribute('cy', point.y);
                this.circle_ratio.setAttribute('r', diameter);
                out_svg.appendChild(this.circle_ratio);

                break;
            default:

                break;
        }
    };

    ComExtDraw.prototype.drawLine = function(index,startPoint,endPoint,color) {
        //index : 1: line_level_start  2: line_limit  3:line_ratio 4:line_level_end 5:line_ratio_polyline
        switch(index){
            case 1:
                this.line_level_start.setAttribute('x1', startPoint.x);
                this.line_level_start.setAttribute('y1', startPoint.y);
                this.line_level_start.setAttribute('x2', endPoint.x);
                this.line_level_start.setAttribute('y2', endPoint.y);
                this.line_level_start.setAttribute('stroke', color);
                out_svg.appendChild(this.line_level_start);
                //console.log("drawline 1");
                break;
            case 2:
                this.line_limit.setAttribute('x1', startPoint.x);
                this.line_limit.setAttribute('y1', startPoint.y);
                this.line_limit.setAttribute('x2', endPoint.x);
                this.line_limit.setAttribute('y2', endPoint.y);
                out_svg.appendChild(this.line_limit);
                //console.log("drawline 2");
                break;
            case 3:
                this.line_ratio.setAttribute('x1', startPoint.x);
                this.line_ratio.setAttribute('y1', startPoint.y);
                this.line_ratio.setAttribute('x2', endPoint.x);
                this.line_ratio.setAttribute('y2', endPoint.y);
                this.line_ratio.setAttribute('stroke', color);
                out_svg.appendChild(this.line_ratio);
                if(document.getElementById("polyline_ratio")){
                    out_svg.removeChild(this.polyline_ratio);
                }
                //console.log("drawline 3");

                break;
            case 4:
                this.line_level_end.setAttribute('x1', startPoint.x);
                this.line_level_end.setAttribute('y1', startPoint.y);
                this.line_level_end.setAttribute('x2', endPoint.x);
                this.line_level_end.setAttribute('y2', endPoint.y);
                out_svg.appendChild(this.line_level_end);
                //console.log("drawline 4");
                break;

            default:

                break;
        }
    };

    ComExtDraw.prototype.drawPolyline = function(startPoint,middlePoint,endPoint,color){

        var pointsString = startPoint.x + "," + startPoint.y + " " + middlePoint.x + "," + middlePoint.y + " " + endPoint.x + "," + endPoint.y;
        this.polyline_ratio.setAttribute('stroke', color);
        this.polyline_ratio.setAttribute('points', pointsString);
        out_svg.appendChild(this.polyline_ratio);
        if(document.getElementById("line_ratio")){
            out_svg.removeChild(this.line_ratio);
        }

        //console.log("drawline 5");
    };


    ComExtDraw.prototype.setEvent = function() {
        setOutPointHover(this.circle_level,1);
        setOutPointHover(this.circle_limit,2);
        setOutPointHover(this.circle_ratio,3);


        setOutPointDown(this.circle_level,1);
        setOutPointDown(this.circle_limit,2);
        setOutPointDown(this.circle_ratio,3);
    };

    ComExtDraw.prototype.drawGrid = function() {
        var lineHorizontal = new Array(7);
        var lineVertical = new Array(7);
        var value;

        for(var i=0; i<7; i++){
            value = i*27 + 8.5;
            lineHorizontal[i] = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            lineHorizontal[i].setAttribute('stroke-width', "1");
            lineHorizontal[i].setAttribute('x1', "20");
            lineHorizontal[i].setAttribute('y1', value);
            lineHorizontal[i].setAttribute('x2', "181.5");
            lineHorizontal[i].setAttribute('y2', value);
            lineHorizontal[i].setAttribute('stroke', "green");
            out_svg.appendChild(lineHorizontal[i]);
        }

        for(i=0; i<7; i++){
            value = i*27 + 20.5;
            lineVertical[i] = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            lineVertical[i].setAttribute('stroke-width', "1");
            lineVertical[i].setAttribute('x1', value);
            lineVertical[i].setAttribute('y1', "8.5");
            lineVertical[i].setAttribute('x2', value);
            lineVertical[i].setAttribute('y2', "170.5");
            lineVertical[i].setAttribute('stroke', "green");
            out_svg.appendChild(lineVertical[i]);
        }

        // var diagonal = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        // diagonal.setAttribute('stroke-width', "3");
        // diagonal.setAttribute('x1', "181.5");
        // diagonal.setAttribute('y1', "10.5");
        // diagonal.setAttribute('x2', "20.5");
        // diagonal.setAttribute('y2', "172.5");
        // diagonal.setAttribute('stroke', "white");
        // diagonal.setAttribute('stroke-dasharray', "4");
        // out_svg.appendChild(diagonal);
    }

}

function setOutPointHover (element, index) {
    element.onmouseover = function (event) {
        switch(index){
            case 1:
            case 2:
                document.documentElement.style.cursor = 'sw-resize';
                break;
            case 3:
                document.documentElement.style.cursor = 's-resize';
                break;
            default:
                document.documentElement.style.cursor = 'default';
                break;
        }
        paramsOfOutPoint.isHover = true;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };

    element.onmouseout = function (event) {
        if(paramsOfOutPoint.isDown === false){
           document.documentElement.style.cursor = 'default';
        }
        paramsOfOutPoint.isHover = false;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };

    element.onmouseup = function (event) {
        paramsOfOutPoint.isHover = false;
        paramsOfOutPoint.isDown = false;
        paramsOfOutPoint.flag = false;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };
}

function setOutPointDown(element, index) {

    element.onmousedown = function (event) {
        paramsOfOutPoint.index = index;
        paramsOfOutPoint.currentX = event.pageX - curtainLeft;
        paramsOfOutPoint.currentY = event.pageY - curtainTop;
        paramsOfOutPoint.isDown = true;
        paramsOfOutPoint.flag = true;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
        clearTextFocusEvent();
    };
}