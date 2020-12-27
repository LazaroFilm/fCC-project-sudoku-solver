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
    const puzzle = req.body.puzzle;

    if (!puzzleString.match(/^[\d.]{81}$/)) throw "invalid Sudoku string";
    else {
      for (let row = 1; row <= 9; row++) {
        // console.log("row:", row)
        for (let col = 1; col <= 9; col++) {
          console.log("Square:", row, letter[col]);
          // solver.validate([col, row]);
        }
      }
    }

    res.json({ test: "Let's solve this!" });
  });
};
