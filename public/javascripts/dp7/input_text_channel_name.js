

function addChannelNameChangeListener() {
    addChannelNameChangeEvent('text_input_a' , inputAChangeRespond);
    addChannelNameChangeEvent('text_input_b' , inputBChangeRespond);
    addChannelNameChangeEvent('text_input_c' , inputCChangeRespond);
    addChannelNameChangeEvent('text_input_d' , inputDChangeRespond);

    addChannelNameChangeEvent('text_out_1' , out1ChangeRespond);
    addChannelNameChangeEvent('text_out_2' , out2ChangeRespond);
    addChannelNameChangeEvent('text_out_3' , out3ChangeRespond);
    addChannelNameChangeEvent('text_out_4' , out4ChangeRespond);
    addChannelNameChangeEvent('text_out_5' , out5ChangeRespond);
    addChannelNameChangeEvent('text_out_6' , out6ChangeRespond);
    addChannelNameChangeEvent('text_out_7' , out7ChangeRespond);
    addChannelNameChangeEvent('text_out_8' , out8ChangeRespond);
 }


function addChannelNameChangeEvent(id, fn){
   var  editControl = document.getElementById(id);
    editControl.addEventListener('change',fn);

}

function inputAChangeRespond() {
    var editControl = document.getElementById('text_input_a');
    currentGroupData.dataInputA.name = editControl.value;
}

function inputBChangeRespond() {
    var editControl = document.getElementById('text_input_b');
    currentGroupData.dataInputB.name = editControl.value;
}

function inputCChangeRespond() {
    var editControl = document.getElementById('text_input_c');
    currentGroupData.dataInputC.name = editControl.value;
}

function inputDChangeRespond() {
    var editControl = document.getElementById('text_input_d');
    currentGroupData.dataInputD.name = editControl.value;
}

function out1ChangeRespond() {
    var editControl = document.getElementById('text_out_1');
    currentGroupData.dataOut1.name = editControl.value;
}

function out2ChangeRespond() {
    var editControl = document.getElementById('text_out_2');
    currentGroupData.dataOut2.name = editControl.value;
}

function out3ChangeRespond() {
    var editControl = document.getElementById('text_out_3');
    currentGroupData.dataOut3.name = editControl.value;
}

function out4ChangeRespond() {
    var editControl = document.getElementById('text_out_4');
    currentGroupData.dataOut4.name = editControl.value;
}

function out5ChangeRespond() {
    var editControl = document.getElementById('text_out_5');
    currentGroupData.dataOut5.name = editControl.value;
}

function out6ChangeRespond() {
    var editControl = document.getElementById('text_out_6');
    currentGroupData.dataOut6.name = editControl.value;
}

function out7ChangeRespond() {
    var editControl = document.getElementById('text_out_7');
    currentGroupData.dataOut7.name = editControl.value;
}

function out8ChangeRespond() {
    var editControl = document.getElementById('text_out_8');
    currentGroupData.dataOut8.name = editControl.value;
}

//============================================================================
function addChannelNameKepUpListener() {//make sure input format correct
    addChannelNameKeyUpEvent('text_input_a' , inputAKeyUpRespond);
    addChannelNameKeyUpEvent('text_input_b' , inputBKeyUpRespond);
    addChannelNameKeyUpEvent('text_input_c' , inputCKeyUpRespond);
    addChannelNameKeyUpEvent('text_input_d' , inputDKeyUpRespond);

    addChannelNameKeyUpEvent('text_out_1' , out1KeyUpRespond);
    addChannelNameKeyUpEvent('text_out_2' , out2KeyUpRespond);
    addChannelNameKeyUpEvent('text_out_3' , out3KeyUpRespond);
    addChannelNameKeyUpEvent('text_out_4' , out4KeyUpRespond);
    addChannelNameKeyUpEvent('text_out_5' , out5KeyUpRespond);
    addChannelNameKeyUpEvent('text_out_6' , out6KeyUpRespond);
    addChannelNameKeyUpEvent('text_out_7' , out7KeyUpRespond);
    addChannelNameKeyUpEvent('text_out_8' , out8KeyUpRespond);
}


function addChannelNameKeyUpEvent(id, fn){
    var  editControl = document.getElementById(id);
    editControl.addEventListener('keyup',fn);
}

function inputAKeyUpRespond(){
    var editControl = document.getElementById('text_input_a');
    var str = editControl.value;
    editControl.value = keepChannelNameRight(str);
}

function inputBKeyUpRespond(){
    var editControl = document.getElementById('text_input_b');
    var str = editControl.value;
    editControl.value = keepChannelNameRight(str);
}

function inputCKeyUpRespond(){
    var editControl = document.getElementById('text_input_c');
    var str = editControl.value;
    editControl.value = keepChannelNameRight(str);
}

function inputDKeyUpRespond(){
    var editControl = document.getElementById('text_input_d');
    var str = editControl.value;
    editControl.value = keepChannelNameRight(str);
}

function out1KeyUpRespond(){
    var editControl = document.getElementById('text_out_1');
    var str = editControl.value;
    editControl.value = keepChannelNameRight(str);
}

function out2KeyUpRespond(){
    var editControl = document.getElementById('text_out_2');
    var str = editControl.value;
    editControl.value = keepChannelNameRight(str);
}

function out3KeyUpRespond(){
    var editControl = document.getElementById('text_out_3');
    var str = editControl.value;
    editControl.value = keepChannelNameRight(str);
}

function out4KeyUpRespond(){
    var editControl = document.getElementById('text_out_4');
    var str = editControl.value;
    editControl.value = keepChannelNameRight(str);
}

function out5KeyUpRespond(){
    var editControl = document.getElementById('text_out_5');
    var str = editControl.value;
    editControl.value = keepChannelNameRight(str);
}

function out6KeyUpRespond(){
    var editControl = document.getElementById('text_out_6');
    var str = editControl.value;
    editControl.value = keepChannelNameRight(str);
}

function out7KeyUpRespond(){
    var editControl = document.getElementById('text_out_7');
    var str = editControl.value;
    editControl.value = keepChannelNameRight(str);
}

function out8KeyUpRespond(){
    var editControl = document.getElementById('text_out_8');
    var str = editControl.value;
    editControl.value = keepChannelNameRight(str);
}


function keepChannelNameRight(str) {
    str = str.match(/[0-9a-zA-Z]{1,6}/);
    return str;
}




