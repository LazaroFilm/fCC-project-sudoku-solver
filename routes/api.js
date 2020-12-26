"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    console.log("_____POST/solve_____");
    console.log("req.body:", req.body);
    const puzzle = req.body.puzzle;
    solver(puzzle).validate;
    res.json({ test: "works!" });
  });

  app.route("/api/solve").post((req, res) => {
    console.log("_____POST/solve_____");
    console.log("req.body:", req.body);
    res.json({ test: "Let's solve this!" });
  });
};
