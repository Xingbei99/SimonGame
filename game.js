alert("Welcome to the game!");
var gameStarted = false;
var curLevel = 0;

var buttonColorsList = ["red", "blue", "green", "yellow"];

var sampleSeq = [];
var userClickSeq = [];

// Starts the game when the user presses a key.
$("body").keypress(function(){
  if (!gameStarted){
    nextLevel();
    gameStarted = true;
  }
});

// When the user clicks on a button, animate the button
// , play its sound and check if the user answer is correct.
$(".btn").click(function(){
  var userClickColor = $(this).attr("id");
  animateButtonPress(userClickColor);
  playSound(userClickColor);

  userClickSeq.push(userClickColor);
  checkUserAnswer(userClickSeq.length - 1);
})

// Generates the next button to press.
function nextLevel(){
  // increments level count and display that level title at top of the game
  curLevel++;
  $("#level-title").text("Level " + curLevel);
  userClickSeq = [];

  // Randomly choose the next color and add it to the pattern.
  var nextNum = Math.floor(Math.random() * 4);
  var nextColor = buttonColorsList[nextNum];
  sampleSeq.push(nextColor);

  // Flash the button with the color to notify user of the next color
  $("#" + nextColor).fadeOut(100)
                    .fadeIn(100)
                    .fadeOut(100)
                    .fadeIn(100);

  playSound(nextColor);
}

function playSound(colorName){
  var colorSound = new Audio("sounds/" + colorName + ".mp3");
  colorSound.play();
}

// The button displays a shadow lasting for 200 ms when user presses a button.
function animateButtonPress(colorName){
  $("#" + colorName).addClass("pressed");
  // remove the shadow with a delay of 200ms.
  setTimeout(function(){
    $("#" + colorName).removeClass("pressed");
  }, 200);
}

// Checks if the user enters the right answer, unlocks the next level or ends the game based on
// user input.
function checkUserAnswer(curLevel){
  
  // If the user's most recently entered color differs from that in the game pattern,
  // game over.
  if (sampleSeq[curLevel] != userClickSeq[curLevel]){
    // add the game-over flash to the body of the website
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    // Displays the game over title
    $("h1").text("Game over. Press any key to restart a new game."); 
    playSound("wrong");
    
    // Restarts the game if the user presses a key.
    $("body").keypress(function(){
      restartGame();
    });
    return;
  }

  // If the user clicks the right button and has finished the sequence, trigger the next level
  if (sampleSeq.length == userClickSeq.length){
    setTimeout(function(){
      nextLevel();
    }, 200);
  }
}

// Restarts the game.
function restartGame(){
  gameStarted = false;
  curLevel = 0;
  sampleSeq = [];
  nextLevel();
}
