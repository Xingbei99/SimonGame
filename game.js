alert("Welcome to the game!");
var buttonColorsList = ["red", "blue", "green", "yellow"];
var pattern = [];

nextNumInSeq();

// Generates the number of the next button to press.
function nextNumInSeq(){
  // Randomly choose the next color and add it to the pattern.
  var nextNum = Math.floor(Math.random() * 4);
  var nextColor = buttonColorsList[nextNum];
  pattern.push(nextColor);

  // Flash the button with the color to notify user of the next color
  $("#" + nextColor).fadeOut(100)
                    .fadeIn(100)
                    .fadeOut(100)
                    .fadeIn(100);

  var nextColorSound = new Audio("sounds/" + nextColor + ".mp3");
  nextColorSound.play();
}