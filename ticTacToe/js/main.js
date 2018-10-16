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
  var js = false;

  $(".container").hide();
  $(".container").slideToggle(1234);
  $(".players").hide();
  $("#board").hide();
  $(".result").hide();

  function game(id) {
    $("#" + id).text($xoChoice);
    $("#" + id).css("color", $xoChoice === "X" ? "navy" : "darkred");
    // assign the value to all elements in the array that has the same id
    for (var keys in ticTacToe) {
      for (var indexes in ticTacToe[keys].result) {
        if (ticTacToe[keys].result[indexes] === id) {
          ticTacToe[keys].matching += $xoChoice;
          console.log(ticTacToe[keys].matching);
        }
      }
    }
    $playersNames = $playersNames === $player1 ? $player2 : $player1;
    $xoChoice = $xoChoice === "X" ? "O" : "X";
    $counter++;
  }

  function jsTurn() {
    var count= 0;
    var check = true;
    var match = $xo2 + $xo2;

    while (check === true) {
      count++;
      for (var keys in ticTacToe) {
        if (ticTacToe[keys].matching.length === 2) {
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
      }
      if (count === 2)
        check = false;
      match = $xo1 + $xo1;
    }
    check = true;

    while (check === true) {
      var random = "cell" + (Math.floor(Math.random() * 8) + 1);
      if ($("#" + random).text() === "") {
        game(random);
        result($xo2);
        check = false;
      }
    }
  }

  function result(recentValue) {
    loop1: for (var keys in ticTacToe) {
      if (ticTacToe[keys].matching === recentValue + recentValue + recentValue) {
        $counter = 0;
        $(document).off("click");
        console.log("STOP");
        $("#board").hide();
        $(".result").slideDown();
        $(".result").text(
          "Congratulations " +
          ($playersNames === $player1 ? $player2 : $player1)
        );
        break loop1;
      }
    }
    // check for the tie
    if ($counter === 9) {
      console.log("TIE");
      $("#board").hide();
      $(".result").slideDown();
      $(".result").text("TIE");
    }
  }

  $("#friend").click(function () {
    $(".players").slideToggle(1234);
    $(".main").hide();
  });

  $("#js").click(function () {
    $(".players").slideToggle(1234);
    $(".main").hide();
    $(".second").hide();
    js = true;
  });

  // when the start button clicked
  $("#start").click(function () {
    $player1 = $("#player1").val();
    $xo1 = $("#xo1").val();
    $xoChoice = $("#xo1").val();

    $player2 = js === true ? "JS" : $("#player2").val();

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

    for (var keys in ticTacToe) {
      for (var indexes in ticTacToe[keys].result) {
        if (ticTacToe[keys].result[indexes] === $id) {
          console.log($id);
          if ($("#" + $id).text() === "") {
            game($id);

            if (js === true) {
              setTimeout(() => {
                jsTurn();
              }, 1000);
            }
          }
          // check for the winner
          result($xo1);
          result($xo2);
        }
      }
    }
  });
});
