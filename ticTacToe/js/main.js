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

    var temp = "x";

    $(document).click(function (event) {
        var $id = event.target.id;

        loop1: for (var keys in ticTacToe) {
            loop2: for (var indexes in ticTacToe[keys].result) {
                if (ticTacToe[keys].result[indexes].id === $id) {
                    console.log($id);
                    if ($("#" + $id).text() === "" && temp === "x") {
                        temp = "o";
                        if (ticTacToe[keys].result[indexes].xo === "") {
                            ticTacToe[keys].result[indexes].xo = "O";
                            $("#" + $id).text("O");
                            for (var keys in ticTacToe) {
                                for (var indexes in ticTacToe[keys].result) {
                                    if (ticTacToe[keys].result[indexes].id === $id) {
                                        ticTacToe[keys].matching += "O";
                                        console.log(ticTacToe[keys].matching);
                                    }
                                }
                            }
                        }
                    } else if ($("#" + $id).text() === "" && temp === "o") {
                        temp = "x";
                        if (ticTacToe[keys].result[indexes].xo === "") {
                            ticTacToe[keys].result[indexes].xo = "X";
                            $("#" + $id).text("X");
                            for (var keys in ticTacToe) {
                                for (var indexes in ticTacToe[keys].result) {
                                    if (ticTacToe[keys].result[indexes].id === $id) {
                                        ticTacToe[keys].matching += "X";
                                        console.log(ticTacToe[keys].matching);
                                    }
                                }
                            }
                        }
                    }
                    if (ticTacToe[keys].matching === "XXX" || ticTacToe[keys].matching === "OOO") {
                        $(document).off("click");
                        console.log("STOP");
                        break loop1;
                    }
                }
            }
        }
    });
});