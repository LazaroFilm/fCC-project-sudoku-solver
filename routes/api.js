"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");
const chalk = require("chalk");

const error = chalk.bold.red;
const info = chalk.bold.blue;

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    console.info(info("_____POST/check_____"));
    console.log("req.body:", req.body);
  });

  app.route("/api/solve").post((req, res) => {
    console.info(info("_____POST/solve_____"));
    const puzzleString = req.body.puzzle;
    console.log("puzzle:", puzzleString);
    if (solver.validate(puzzleString)) solver.solve(puzzleString);
    else console.error(error("bad puzzle string"));
  });
};
