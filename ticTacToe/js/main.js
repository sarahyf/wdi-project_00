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
    var $counter = 0;

    $(".container").hide();
    $(".container").slideToggle(1234);
    $("#board").hide();
    $(".result").hide();

    // when the start button clicked
    $("#start").click(function () {
        $player1 = $("#player1").val();
        $xoChoice = $("#xo1").val();

        $player2 = $("#player2").val();
        var $xo2 = $("#xo2").val();

        console.log("Player 1: " + $player1 + ", " + $xoChoice);
        console.log("Player 2: " + $player2 + ", " + $xo2);

        // to make sure the users entered their names
        if ($xoChoice !== "" && $player1 !== "" && $player2 !== "") {
            $playersNames = $player1;
            $(".players").hide();
            $("#board").fadeToggle(1000);
        } else {
            alert("Please enter your names");
        }
    });

    $(document).click(function (event) {
        // to get the id of the clicked element
        var $id = event.target.id;

        loop1: for (var keys in ticTacToe) {
            loop2: for (var indexes in ticTacToe[keys].result) {
                if (ticTacToe[keys].result[indexes] === $id) {
                    console.log($id);
                    // check if the element wasn't clicked before and the turn is X
                    if ($("#" + $id).text() === "" && $xoChoice === "X") {
                        $("#" + $id).text($xoChoice);
                        $("#" + $id).css("color", "navy");
                        // assign the value to all elements in the array that has the same id
                        for (var keys2 in ticTacToe) {
                            for (var indexes2 in ticTacToe[keys2].result) {
                                if (ticTacToe[keys2].result[indexes2] === $id) {
                                    ticTacToe[keys2].matching += $xoChoice;
                                    console.log(ticTacToe[keys2].matching);
                                }
                            }
                        }
                        $playersNames = $playersNames === $player1 ? $player2 : $player1;
                        $xoChoice = "O";
                        $counter++;
                    }
                    // check if the element wasn't clicked before and the turn is O
                    else if ($("#" + $id).text() === "" && $xoChoice === "O") {
                        $("#" + $id).text($xoChoice);
                        $("#" + $id).css("color", "darkred");
                        // assign the value to all elements in the array that has the same id
                        for (var keys2 in ticTacToe) {
                            for (var indexes2 in ticTacToe[keys2].result) {
                                if (ticTacToe[keys2].result[indexes2] === $id) {
                                    ticTacToe[keys2].matching += $xoChoice;
                                    console.log(ticTacToe[keys2].matching);
                                }
                            }
                        }
                        $playersNames = $playersNames === $player1 ? $player2 : $player1;
                        $xoChoice = "X";
                        $counter++;
                    }
                    // check for the winner
                    if (ticTacToe[keys].matching === "XXX" || ticTacToe[keys].matching === "OOO") {
                        $counter = 0;
                        $(document).off("click");
                        console.log("STOP");
                        $("#board").hide();
                         $(".result").slideDown();
                        $(".result").text("Congratulations " + ($playersNames === $player1 ? $player2 : $player1));
                        break loop1;
                    }
                }
            }
        }
        // check for the tie
        if ($counter === 9) {
            console.log("TIE");
            $("#board").hide();
            $(".result").slideDown();
            $(".result").text("TIE");
        }
    });
});