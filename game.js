alert("Welcome to the game!");
var gameStarted = false;
var curLevel = 0;

var buttonColorsList = ["red", "blue", "green", "yellow"];

var sampleSeq = [];
var userClickSeq = [];

$("body").keypress(function(){
  if (!gameStarted){
    nextNumInSeq();
    gameStarted = true;
  }
});

$(".btn").click(function(){
  var userClickColor = $(this).attr("id");
  animateButtonPress(userClickColor);
  playSound(userClickColor);

  userClickSeq.push(userClickColor);
  console.log(userClickSeq);
})

// Generates the number of the next button to press.
function nextNumInSeq(){
  // increments level count and display that level title at top of the game
  curLevel++;
  $("#level-title").text("Level " + curLevel);

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

// When we press a button, the button displays a shadow lasting for 200 ms.
function animateButtonPress(colorName){
  $("#" + colorName).addClass("pressed");
  // remove the shadow with a delay of 200ms.
  setTimeout(function(){
    $("#" + colorName).removeClass("pressed");
  }, 200);
}