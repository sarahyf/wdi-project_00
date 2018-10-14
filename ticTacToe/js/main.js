$(document).ready(function () {
    var ticTacToe = {
        1: { result: [{ id: "cell1", xo: "" }, { id: "cell2", xo: "" }, { id: "cell3", xo: "" }], matching: "" },
        2: { result: [{ id: "cell4", xo: "" }, { id: "cell5", xo: "" }, { id: "cell6", xo: "" }], matching: "" },
        3: { result: [{ id: "cell7", xo: "" }, { id: "cell8", xo: "" }, { id: "cell9", xo: "" }], matching: "" },
        4: { result: [{ id: "cell1", xo: "" }, { id: "cell4", xo: "" }, { id: "cell7", xo: "" }], matching: "" },
        5: { result: [{ id: "cell2", xo: "" }, { id: "cell5", xo: "" }, { id: "cell8", xo: "" }], matching: "" },
        6: { result: [{ id: "cell3", xo: "" }, { id: "cell6", xo: "" }, { id: "cell9", xo: "" }], matching: "" },
        7: { result: [{ id: "cell1", xo: "" }, { id: "cell5", xo: "" }, { id: "cell9", xo: "" }], matching: "" },
        8: { result: [{ id: "cell3", xo: "" }, { id: "cell5", xo: "" }, { id: "cell7", xo: "" }], matching: "" }
    };

    var $xoChoice = "";
    var $player1 = "";
    var $player2 = "";
    var $playersNames = "";
    var $counter = 0;

    $("#board").hide();
    $(".result").hide();

    $("#start").click(function () {
        $player1 = $("#player1").val();
        $xoChoice = $("#xo1").val();

        $player2 = $("#player2").val();
        var $xo2 = $("#xo2").val();

        console.log($player1);
        console.log($xoChoice);
        console.log($player2);
        console.log($xo2);

        if ($xoChoice !== "" && $player1 !== "" && $player2 !== "") {
            $(".players").hide();
            $("#board").fadeToggle(1000);
        } else {
            alert("Please enter your names");
        }
    });

    $(document).click(function (event) {
        var $id = event.target.id;
        $playersNames = $player1 === $playersNames || "" ? $player2 : $player1;

        loop1: for (var keys in ticTacToe) {
            loop2: for (var indexes in ticTacToe[keys].result) {
                if (ticTacToe[keys].result[indexes].id === $id) {
                    console.log($id);
                    if ($("#" + $id).text() === "" && $xoChoice === "X") {
                        if (ticTacToe[keys].result[indexes].xo === "") {
                            $("#" + $id).text($xoChoice);
                            $("#" + $id).css("color", "navy");
                            for (var keys2 in ticTacToe) {
                                for (var indexes2 in ticTacToe[keys2].result) {
                                    if (ticTacToe[keys2].result[indexes2].id === $id) {
                                        ticTacToe[keys2].result[indexes2].xo = $xoChoice;
                                        ticTacToe[keys2].matching += $xoChoice;
                                        console.log(ticTacToe[keys2].result[indexes2].xo);
                                        console.log(ticTacToe[keys2].matching);
                                    }
                                }
                            }
                        }
                        $xoChoice = "O";
                        $counter++;
                    } else if ($("#" + $id).text() === "" && $xoChoice === "O") {
                        if (ticTacToe[keys].result[indexes].xo === "") {
                            $("#" + $id).text($xoChoice);
                            $("#" + $id).css("color", "darkred");
                            for (var keys2 in ticTacToe) {
                                for (var indexes2 in ticTacToe[keys2].result) {
                                    if (ticTacToe[keys2].result[indexes2].id === $id) {
                                        ticTacToe[keys2].result[indexes2].xo = $xoChoice;
                                        ticTacToe[keys2].matching += $xoChoice;
                                        console.log(ticTacToe[keys2].result[indexes2].xo);
                                        console.log(ticTacToe[keys2].matching);
                                    }
                                }
                            }
                        }
                        $xoChoice = "X";
                        $counter++;
                    }
                    if (ticTacToe[keys].matching === "XXX" || ticTacToe[keys].matching === "OOO") {
                        $counter = 0;
                        $(document).off("click");
                        console.log("STOP");
                        $("#board").hide();
                        $(".result").show();
                        $(".result").text("Congratulations " + ($playersNames === $player1 ? $player2 : $player1));
                        break loop1;
                    }
                }
            }
        }
        if ($counter === 9) {
            console.log("STOP");
            $("#board").hide();
            $(".result").show();
            $(".result").text("TIE");
        }
    });
});