var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var count = 0;
var ready = false;

$(document).keydown(function () {
  if (!ready) {
    $("#level-title").text("Level " + count);
    nextSequence();
    ready = true;
  }
});

$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  $("#" + userChosenColour)
    .fadeOut(10)
    .fadeIn(10)
    .fadeOut(10)
    .fadeIn(10);
  var audio = new Audio("sounds/" + userChosenColour + ".mp3");
  audio.play();

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key To Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  count++;
  $("#level-title").text("Level " + count);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(10)
    .fadeIn(10)
    .fadeOut(10)
    .fadeIn(10);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

function startOver() {
  count = 0;
  gamePattern = [];
  ready = false;
}
