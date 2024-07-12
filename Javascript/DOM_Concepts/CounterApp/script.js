//Write your javascript code here
let countVal=0;
function uc(){
document.getElementById("count").textContent=countVal;
}

function increment(){
    if(countVal>=0)
        countVal++;
    uc();
}
function decrement(){
    if(countVal>0)
        countVal--;
    uc();
}
function reset(){
    countVal=0;
    uc();
}
