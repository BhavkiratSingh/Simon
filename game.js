var buttonColour = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomChosenColour = buttonColour[Math.floor(Math.random()*4)];
  gamePattern.push(randomChosenColour);
  $("#" + gamePattern[gamePattern.length - 1]).fadeOut(150).fadeIn(150);
  playSound(gamePattern[gamePattern.length - 1]);
  userClickedPattern = [];
}

function animatePress(currentButton) {
  $("." + currentButton).addClass("pressed");
  setTimeout(function () {
    $("." + currentButton).removeClass("pressed");
  }, 100);

}

function playSound(sound) {
  var audio = new Audio("D:\\Compressed\\original\\sounds\\" + sound + ".mp3");
  audio.play();
}

function checker() {
  var status = true;
  for(var i = 0; i < userClickedPattern.length; i++) {
    if(gamePattern[i] != userClickedPattern[i]) {
      status = false;
    }
  }
  if(status && userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {
      nextSequence();
    },1000);
  }
  if(userClickedPattern.length === gamePattern.length && !status) {
    $("h1").text("Game Over press any key to start again");
    $("body").addClass("game-over");
    started = false;
    setTimeout(function () {
      $("body").removeClass("game-over");
    },400);
    gamePattern = [];
    level = 0;
  }
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checker();
});

$(document).keypress(function(event) {
  if(!started) {
    $("h1").text("LEVEL " + level);
    nextSequence();
    started = true;
  }
});

$("#green").click(function() {
  $("#green").fadeOut(150).fadeIn(150);
  playSound("green");
  userClickedPattern.push("green");
});
$("#red").click(function() {
  $("#red").fadeOut(150).fadeIn(150);
  playSound("red");
  userClickedPattern.push("red");
});
$("#blue").click(function() {
  $("#blue").fadeOut(150).fadeIn(150);
  playSound("blue");
  userClickedPattern.push("blue");
});
$("#yellow").click(function() {
  $("#yellow").fadeOut(150).fadeIn(150);
  playSound("yellow");
  userClickedPattern.push("yellow");
});
