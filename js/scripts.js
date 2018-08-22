//Back-end
function Player(name) {
  this.name = name;
  this.score = 0;
  this.turn = false;
}

var playerOne = new Player("");
var playerTwo = new Player("");
var computerAI = new Player("Computer AI");

var allPlayers = {};
allPlayers["p1"] = playerOne;
allPlayers["p2"] = playerTwo;
allPlayers["comp"] = computerAI;
console.log(allPlayers);

// //Find key by object value
// function getKeyByValue(object, value) {
//   return Object.keys(object).find(key => object[key] === value);
// }

//Function to switch turn
function switchTurn() {
  allPlayers.p1.turn = !allPlayers.p1.turn;
  allPlayers.p2.turn = !allPlayers.p2.turn;
  if (allPlayers.p1.turn) {
    $(".playerTurnName").text(allPlayers.p1.name);
    return "p1";
  } else if (allPlayers.p2.turn) {
    $(".playerTurnName").text(allPlayers.p2.name);
    return "p2";
  }
}

//Function to get a number between 1 and 6.
function rollDice() {
  var roll = Math.floor(Math.random() * 6) + 1;
  return roll;
}

//Function to update score board
function updateScoreBoard() {
  $(".scoreBoardPlayerOneScore").text(allPlayers.p1.score);
  $(".scoreBoardPlayerTwoScore").text(allPlayers.p2.score);
}

//Function to reset the game.
function resetGame() {
  $(".form-container").slideDown()
  allPlayers.p1.name = "";
  allPlayers.p2.name = "";
  allPlayers.p1.score = 0;
  allPlayers.p2.score = 0;
  updateScoreBoard()
  $(".img-holder").children().remove();
  $(".game-container").hide()
  $("#resetGameButton").hide()
}

//clear input boxes
function clearInputBox() {
  $("#playerOneInput").val("");
  $("#playerTwoInput").val("");
}

//User Interface
$(document).ready(function() {
  $("#resetGameButton").hide()
  //Function to get player names and start game.
  var activeTurn;
  var tempScore;

  $("#playerNameInputs").submit(function(event) {
    event.preventDefault();
    var playerOneName = $("#playerOneInput").val();
    var playerTwoName = $("#playerTwoInput").val();

    if (playerOneName && playerTwoName) {
      allPlayers.p1.name = playerOneName;
      allPlayers.p2.name = playerTwoName;
      allPlayers.p1.turn = !allPlayers.p1.turn;
      $(".scoreBoardPlayerOneName").text(allPlayers.p1.name);
      $(".scoreBoardPlayerTwoName").text(allPlayers.p2.name);
      updateScoreBoard();
      $(".playerTurnName").text(allPlayers.p1.name);
      $("#game-container").slideDown();
      activeTurn = "p1";
      tempScore = 0;
      $(".scoreBoardTempScore").text(tempScore);
      $(".game-container").fadeIn()
      $("#resetGameButton").fadeIn()
      $(".form-container").hide()
      clearInputBox();
    } else {
      alert("Please enter valid names for both players.");
    }
  })

  //roll click functionality
  $("#rollDiceButton").click(function() {
    var roll = rollDice();
    $(".img-holder").hide();
    $(".img-holder").children().remove();
    $(".img-holder").fadeIn();
    $(".img-holder").append("<img src='img/dice" + roll + ".png' alt='" + roll + " roll picture' height=500px>");
    $(".img-holder").append("<h3>You've rolled a " + roll + "!</h3>");
    if (roll === 1) {
      $(".img-holder").append("<h3>" + allPlayers[activeTurn].name + "'s turn is over!</h3>");
      tempScore = 0;
      activeTurn = switchTurn();
    } else {
      $(".img-holder").append("<h3>Roll again or hold.</h3>");
      tempScore += roll;
    }
    $(".scoreBoardTempScore").text(tempScore);
  })

  //Hold click functionality
  $("#holdButton").click(function() {
    if (tempScore !== 0) {
      allPlayers[activeTurn].score += tempScore;
      $(".img-holder").children().remove();
      updateScoreBoard();
      if (allPlayers[activeTurn].score < 100) {
        $(".img-holder").append("<h3>You have added " + tempScore + " to your total. " + allPlayers[activeTurn].name + "'s turn is over.</h3>");
        tempScore = 0;
        $(".scoreBoardTempScore").text(tempScore);
        activeTurn = switchTurn();
      } else if (allPlayers[activeTurn].score >= 100) {
        alert(allPlayers[activeTurn].name + " has won the game!");
        tempScore = 0;
        $(".scoreBoardTempScore").text(tempScore);
        resetGame();
      }
    } else {
      alert("You can't hold with zero points!")
    }
  })

  $("#resetGameButton").click(function() {
    resetGame();
  })
})
