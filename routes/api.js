"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  const letter = ["0", "A", "B", "C", "D", "E", "F", "G", "H", "I"];

  app.route("/api/check").post((req, res) => {
    console.log("_____POST/solve_____");
    console.log("req.body:", req.body);
    res.json({ test: "works!" });
  });

  app.route("/api/solve").post((req, res) => {
    console.log("_____POST/solve_____");
    console.log("req.body:", req.body);
    const puzzleString = req.body.puzzle;

    if (!puzzleString.match(/^[\d.]{81}$/)) throw "invalid Sudoku string";
    else {
      let numberPosition = 0;
      let sudokuGrid = {};
      for (let row = 1; row <= 9; row++) {
        // console.log("row:", row)
        for (let colNum = 1; colNum <= 9; colNum++) {
          const col = letter[colNum];
          const num = puzzleString[numberPosition];
          console.log(`Square ${col}:${row} => ${num}`);
          sudokuGrid[row][col] = num;
          // solver.validate([col, row]);
          charPosition++;
        }
      }
      console.log(sudokuGrid);
    }

    res.json({ test: "Let's solve this!" });
  });
};
