//Back-end
function Player(name) {
  this.name = name;
  this.score = 0;
}

var playerOne = new Player("");
var playerTwo = new Player("");
var computerAI = new Player("Computer AI");

var allPlayers = {};
allPlayers["p1"] = playerOne;
allPlayers["p2"] = playerTwo;
allPlayers["comp"] = computerAI;
console.log(allPlayers);

//Function to get a number between 1 and 6.
function rollDice() {
  var roll = Math.floor(Math.random() * 6) + 1;
  $(".img-holder").hide();
  $(".img-holder").fadeIn();
  $(".img-holder").children().remove();
  $(".img-holder").append("<img src='img/dice" + roll + ".png' alt='" + roll + " roll picture' height=500px>");
  $(".img-holder").append("<h3>You've rolled a " + roll + "!</h3>");
  return roll;
}

//User Interface
$(document).ready(function() {
  //Function to get player names and start game.
  $("#playerNameInputs").submit(function(event) {
    event.preventDefault();
    var playerOneName = $("#playerOneInput").val();
    var playerTwoName = $("#playerTwoInput").val();
    if (playerOneName && playerTwoName) {
      allPlayers.p1.name = playerOneName;
      allPlayers.p2.name = playerTwoName;
      $("#game-container").slideDown();
    } else {
      alert("Please enter valid names for both players.");
    }
  })

  //roll click
  $("#rollDiceButton").click(function() {
    rollDice();
  })


})
