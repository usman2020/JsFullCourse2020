/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//var scores, roundScore, activePlayer;

//scores = [0,0];
//roundScore = 0;
//activePlayer = 1;




// document.querySelector('#current-' + activePlayer).textContent = dice;    // changes only plaint text with .textContent


// with .innerHTML method we can manipulate DOM elements -> put html in the slected element 
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; 


// read elements from the webpage and store them in a variable 

//var a = document.querySelector('#score-0').textContent;
//console.log(a);


// hide the dice in the beginning by opening the game by setting the css property to none
// for selecting class use dot, for selecting id use # 
// style is the method display is the property and value is none
//document.querySelector('.dice').style.display = 'none';


// Events : Notification that are sent to notify the code that something happened on the webpage.
// Example: clicking a button, resizing a window, scrollig down or pressing a key
// Event listener: A function that performs an action based on certain event. It waits for a specific event to happen

//document.querySelector('.btn-roll').addEventListener('click',function(){

    // here we have a anonymous function
    // 1. random number
  //  var dice = Math.floor(Math.random() * 6) +1;
    // 2. Display the result -> use the display property and set it to block 
   // var diceDom = document.querySelector('.dice');
    //diceDom.style.diplay = 'block';
    //diceDom.src = 'dice-' + dice + '.png';

    // 3. Update the round score only if the rolled number was NOT a 1 
//});




/*

DOM: Document Object Model:
- Structured representation of an HTML document
- The DOM is used to connect webpages to scripts like javaScript
- For each HTML box, there is an object in the DOM that we can access and interact
*/



var scores , roundScore, activePlayer, gamePlaying, lastDice;



// use of the init function declared below
init();

// the object that gives us the access to the DOM is the document object 


// adding plain text to the DOM -- textContent -> only for plain text querySelector method for manipulate values and elements of our webpage
// document.querySelector('#score-0').textContent = dice; // a setter because we set a value 

// querySelector can be also used to read values from the webpage --> a getter in this case 
//var x = document.querySelector('#score-1').textContent;
//console.log(x);





// adding html using inner html (html code must be a string) method instead of textContent method
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';



/*
What are events ? 
- Events are Notifications that are sent to notify the code that something happened on the webpage.
- Examples: clicking a button, resizing a window, scrolling down or pressing a key.
Eventlistener: A function that performs an action based on a certain event. It waits for a specific event to happen.

*/


document.querySelector('.btn-roll').addEventListener('click', function(){

  if(gamePlaying){  
     // 1. random number 
  var dice1 = Math.floor(Math.random() * 6) + 1;
  var dice2 = Math.floor(Math.random() * 6) + 1;


  // 2. display the result
  document.getElementById('dice-1').style.display='block';
  document.getElementById('dice-2').style.display='block';
  document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
  document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

  if(dice1 !==1 && dice2!==1){
    roundScore+= dice1 + dice2;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }else{
    nextPlayer();
  }

  /*
  // 3. update the round score if the rolled number was NOT a 1 and plyer rolled twice a 6
  if(lastDice === 6 && dice === 6){
    // player looses the score
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = '0';
    nextPlayer();
  }else if(dice !== 1){
    roundScore+= dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }else{

    // Next player
   nextPlayer();
    
  }

  lastDice = dice;
  */
  }
 
});



// hold btn
document.querySelector('.btn-hold').addEventListener('click',function(){

  if (gamePlaying){
     // add current score to the global score

scores[activePlayer] += roundScore;


// Update the UI 
document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
// read the final score from the text input UI and store it to input
var input = document.querySelector('.final-score').value;
var winningScore;
// Undefined, 0, null or "" are coerced to false 
// Anything else will be coerced to true 
if(input){ // input will be coerced to a true or false value -> boolean 
  winningScore = input;
}else{
  winningScore = 100;
}

// Check if the player won the game
if(scores[activePlayer] >= winningScore){
  document.querySelector('#name-' + activePlayer).textContent = 'Winner';
  document.getElementById('dice-1').style.display='none';
  document.getElementById('dice-2').style.display='none';
  // apply the winner class css
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  gamePlaying = false;
}else{
  nextPlayer();
}


  }
 

});

function nextPlayer(){
  
    activePlayer ===  0 ? activePlayer = 1: activePlayer= 0;
    roundScore = 0;
    
    document.querySelector('#current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    // changing the active class to player one if player 2 and vice versa
    //document.querySelector('.player-0-panel').classList.remove('active'); // active is the name of the class
    //document.querySelector('.player-1-panel').classList.add('active');

    // toggle active
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';
};


// start a new game
document.querySelector('.btn-new').addEventListener('click',init);




// initializing the game, calling this function as soon as we load the function
function init(){  
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;

  gamePlaying = true;

  //changing the CSS of elements
  document.getElementById('dice-1').style.display='none';
  document.getElementById('dice-2').style.display='none';
// use document.getElementById for id's
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;
document.getElementById('name-0').textContent = 'Player-1';
document.getElementById('name-1').textContent = 'Player-2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

}


