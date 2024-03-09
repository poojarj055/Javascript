'use strict';




const secretNum=Math.trunc(Math.random()*20)+1;

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
  };
  

//console.log(secretNum);
let score=20;
let highscore=0;
document.querySelector('.highscore').value=highscore;
document.querySelector('.message').textContent="Start Guessing!";
document.querySelector('.check').addEventListener('click', function(){
  const guess= Number(document.querySelector('.guess').value);

//when there is no input
if(!guess){
   // document.querySelector('.message').textContent='⛔️ No number';
   displayMessage('⛔️ No number');
}

//when player wins
else if(guess===secretNum){
   // document.querySelector('.message').textContent="🆒 You WON the game 🏆 ";
   displayMessage('🆒 You WON the game 🏆 ');
    document.querySelector('.number').textContent=guess;
    document.querySelector('body').style.background='linear-gradient(319deg, #ba2d0b 0%, #fe7f2d 37%, #ffbf46 100%)';
    document.querySelector('.number').style.width = '30rem';
    if(score>highscore){
        highscore=score;
    }
    document.querySelector('.highscore').textContent=highscore;
}
else if (guess !== secretNumber) {
    if (score > 1) {
        displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
        score--;
        document.querySelector('.score').textContent = score;

//when guess is too high
// else if(guess>secretNum){
//     score--;
//     document.querySelector('.message').textContent="Guess is too high 📈";
//     document.querySelector('.score').textContent=score;
// }

// ///when guess is too low
// else if(guess<secretNum){
//     score--;
//     document.querySelector('.message').textContent="Guess is too low 📉";
//     document.querySelector('.score').textContent=score;
// }
    }
}
else{
    if(score==0){
   // document.querySelector('.message').textContent="you LOST the game 🙉";
    document.querySelector('.message').textContent="you LOST the game 🙉";
}
}
});

document.querySelector('.again').addEventListener('click',function(){
    score=20;
    document.querySelector('.guess').value=null;
    document.querySelector('.number').textContent='?';
    document.querySelector('body').style.background='linear-gradient(319deg, #ba2d0b 0%, #222 37%, #222 100%)';
    document.querySelector('.message').textContent="Start Guessing!";
    document.querySelector('.score').textContent=0;
});