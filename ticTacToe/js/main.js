$(document).ready(function () {
  // an object that has objects inside it which are the game directions
  var ticTacToe = {
    1: { result: ["cell1", "cell2", "cell3"], matching: "" },
    2: { result: ["cell4", "cell5", "cell6"], matching: "" },
    3: { result: ["cell7", "cell8", "cell9"], matching: "" },
    4: { result: ["cell1", "cell4", "cell7"], matching: "" },
    5: { result: ["cell2", "cell5", "cell8"], matching: "" },
    6: { result: ["cell3", "cell6", "cell9"], matching: "" },
    7: { result: ["cell1", "cell5", "cell9"], matching: "" },
    8: { result: ["cell3", "cell5", "cell7"], matching: "" }
  };

  var $player1 = "";
  var $player2 = "";
  var $playersNames = "";
  var $xoChoice = "";
  var $xo1 = "";
  var $xo2 = "";
  var $counter = 0;
  var computer = false;

  $(".container").hide();
  $(".container").slideToggle(1234);
  $(".players").hide();
  $("#board").hide();
  $(".result").hide();

  // this function is to display either X or O
  function game(id) {
    $("#" + id).text($xoChoice);
    $("#" + id).css("color", $xoChoice === "X" ? "navy" : "darkred");
    // assign the value to all elements in the array that has the same id
    for (var keys in ticTacToe) {
      for (var indexes in ticTacToe[keys].result) {
        if (ticTacToe[keys].result[indexes] === id) {
          console.log(ticTacToe[keys].result[indexes]);
          ticTacToe[keys].matching += $xoChoice;
          console.log(ticTacToe[keys].matching);
        }
      }
    }
    $playersNames = $playersNames === $player1 ? $player2 : $player1;
    $xoChoice = $xoChoice === "X" ? "O" : "X";
    $counter++;
  }

  // this function works when the player plays with the computer
  function computerTurn() {
    var count = 0;
    var check = true;
    var match = $xo2 + $xo2;
    // check if computer can win or play in a place that prevent the player to win
    while (check === true) {
      count++;
      for (var keys in ticTacToe) {
        if (ticTacToe[keys].matching === match) {
          for (var indexes in ticTacToe[keys].result) {
            if ($("#" + ticTacToe[keys].result[indexes]).text() === "") {
              game(ticTacToe[keys].result[indexes]);
              result($xo2);
              check = false;
              return;
            }
          }
        }
      }
      if (count === 1) {
        match = $xo1 + $xo1;
      }
      else if (count === 2) {
        match = $xo2;
      }
      else if (count === 3) {
        check = false;
      }
    }

    check = true;
    // if neither the player nor computer has a chance to win
    while (check === true) {
      var random = "cell" + (Math.floor(Math.random() * 8) + 1);
      if ($("#" + random).text() === "") {
        game(random);
        result($xo2);
        check = false;
      }
    }
  }

  // this function is to display the result
  function result(recentValue) {
    for (var keys in ticTacToe) {
      if (ticTacToe[keys].matching === recentValue + recentValue + recentValue) {
        $counter = 0;
        $(document).off("click");
        console.log("STOP");
        $("#board").hide();
        $(".result").slideDown();
        $(".result").text(($playersNames === $player1 ? $player2 : $player1) + " won");
        return true;
      }
    }
    // check for the tie
    if ($counter === 9) {
      $(document).off("click");
      console.log("TIE");
      $("#board").hide();
      $(".result").slideDown();
      $(".result").text("TIE");
      return true;
    }
    return false;
  }

  // when the player wants to play with his/her friend
  $("#friend").click(function () {
    $(".players").slideToggle(1234);
    $(".main").hide();
  });

  // when the player wants to play with computer
  $("#computer").click(function () {
    $(".players").slideToggle(1234);
    $(".main").hide();
    $(".second").hide();
    computer = true;
  });

  // when the start button clicked
  $("#start").click(function () {
    $player1 = $("#player1").val();
    $xo1 = $("#xo1").val();
    $xoChoice = $("#xo1").val();

    $player2 = computer === true ? "Computer" : $("#player2").val();

    $xo2 = $xoChoice === "X" ? "O" : "X";

    // to make sure the users entered their names
    if ($xoChoice !== "" && $player1 !== "" && $player2 !== "") {
      console.log("Player 1: " + $player1 + ", " + $xoChoice);
      console.log("Player 2: " + $player2 + ", " + $xo2);
      $playersNames = $player1;
      $(".players").hide();
      $("#board").fadeToggle(1000);
    } else {
      swal("Please enter your names");
    }
  });

  $(document).click(function (event) {
    // to get the id of the clicked element
    var $id = event.target.id;

    loop1: for (var keys in ticTacToe) {
      for (var indexes in ticTacToe[keys].result) {
        if (ticTacToe[keys].result[indexes] === $id) {
          if ($("#" + $id).text() === "") {
            game($id);

            // check if player 1 could win
            if (result($xo1) === true) {
              break loop1;
            }

            if (computer === true) {
              setTimeout(() => {
                computerTurn();
              }, 1000);
            }
          }
          if (computer === false) {
            // check if player 2 could win
            if (result($xo2) === true) {
              break loop1;
            }
          }
        }
      }
    }
  });
});
