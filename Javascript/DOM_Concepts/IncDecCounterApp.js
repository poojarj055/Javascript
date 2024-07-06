// https://www.naukri.com/code360/problems/counter-app-part-2_10708323?leftPanelTabValue=SUBMISSION
// <button id="increase" onclick=ince()>Increase</button>
// <button id="decrease" onclick=dece()>Decrease</button>

 let c=0;

function uc(){
    document.getElementById('count').textContent = c;
}
function ince(){
   c++;
    uc();
}
function dece(){
    c--;
    uc();
}
