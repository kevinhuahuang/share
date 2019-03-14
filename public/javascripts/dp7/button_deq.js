
//==============================================================================
// DEQ
//==============================================================================
function initDeq(){
    document.getElementById('button_deq1').onclick = deq1ClickResponse;
    document.getElementById('button_deq2').onclick = deq2ClickResponse;
}


var oldDeq1 = [0,0,0,0];
function deq1ClickResponse(){
    if(curButtonNo > 4){
        return;
    }
    if(controlsData.buttonStates.buttonDeqStatus[0]){
        controlsData.buttonStates.buttonDeqStatus[0] = false;
        oldDeq1[curButtonNo-1] = controlsData.inputData.InDeq1.level;
        controlsData.inputData.InDeq1.level = 0;
        document.getElementById('button_deq1').setAttribute('class', 'button_deq_false');
        document.getElementById('text_deq1_level').value = getDeqLevelDisplay(0);
        keepLinkInputDeq1Button(curButtonNo, 0);
    }else{
        if(oldDeq1[curButtonNo-1] === 0){
            return;
        }
        controlsData.buttonStates.buttonDeqStatus[0] = true;
        controlsData.inputData.InDeq1.level = oldDeq1[curButtonNo-1];
        document.getElementById('button_deq1').setAttribute('class', 'button_deq_true');
        document.getElementById('text_deq1_level').value = getDeqLevelDisplay(controlsData.inputData.InDeq1.level);
        keepLinkInputDeq1Button(curButtonNo, oldDeq1[curButtonNo-1]);
    }
}


var oldDeq2 = [0,0,0,0];
function deq2ClickResponse(){
    if(curButtonNo > 4){
        return;
    }
    if(controlsData.buttonStates.buttonDeqStatus[1]){
        controlsData.buttonStates.buttonDeqStatus[1] = false;
        oldDeq2[curButtonNo-1] = controlsData.inputData.InDeq2.level;
        controlsData.inputData.InDeq2.level = 0;
        document.getElementById('button_deq2').setAttribute('class', 'button_deq_false');
        document.getElementById('text_deq2_level').value = getDeqLevelDisplay(0);
        keepLinkInputDeq2Button(curButtonNo, 0);
    }else{
        if(oldDeq2[curButtonNo-1] === 0){
            return;
        }
        controlsData.buttonStates.buttonDeqStatus[1] = true;
        controlsData.inputData.InDeq2.level = oldDeq2[curButtonNo-1];
        document.getElementById('button_deq2').setAttribute('class', 'button_deq_true');
        document.getElementById('text_deq2_level').value = getDeqLevelDisplay(controlsData.inputData.InDeq2.level);
        keepLinkInputDeq2Button(curButtonNo, oldDeq1[curButtonNo-1]);
    }
}

function updateDeqButton(){
    var textElement,buttonElement;
    textElement = document.getElementById('text_deq1_level');
    buttonElement = document.getElementById('button_deq1');

    if(textElement.value === 'OFF'){
        controlsData.buttonStates.buttonDeqStatus[0] = false;
        buttonElement.setAttribute('class', 'button_deq_false');
        oldDeq1[curButtonNo-1] = 0;
    }else{
        controlsData.buttonStates.buttonDeqStatus[0] = true;
        buttonElement.setAttribute('class', 'button_deq_true');
    }

    textElement = document.getElementById('text_deq2_level');
    buttonElement = document.getElementById('button_deq2');

    if(textElement.value === 'OFF'){
        controlsData.buttonStates.buttonDeqStatus[1] = false;
        buttonElement.setAttribute('class', 'button_deq_false');
        oldDeq2[curButtonNo-1] = 0;
    }else{
        controlsData.buttonStates.buttonDeqStatus[1] = true;
        buttonElement.setAttribute('class', 'button_deq_true');

    }
}