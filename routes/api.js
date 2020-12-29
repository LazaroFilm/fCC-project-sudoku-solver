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

    res.json({ error: "work in progress" });
    // solve the puzzle, then if it matches, good
    // if it doesn't match check each row, col reg for
    // this and return what goes wrong.
  });

  app.route("/api/solve").post((req, res) => {
    console.info(info("_____POST/solve_____"));
    try {
      const puzzleString = req.body.puzzle;
      const error = solver.validate(puzzleString);
      if (error) throw error;
      const solution = solver.solve(puzzleString);
      if (solution.includes(".")) throw "Puzzle cannot be solved";
      res.json({ solution });
    } catch (err) {
      console.log(error(`error: ${err}`));
      res.json({ error: err });
    }
  });
};
