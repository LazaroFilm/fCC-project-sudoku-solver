"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");
const chalk = require("chalk");

const red = chalk.bold.red;
const blue = chalk.bold.blue;

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    console.info(blue("_____POST/check_____"));
    console.log("req.body:", req.body);
    try {
      if (!req.body.coordinate || !req.body.value)
        throw "Required field(s) missing";
      const coordinate = req.body.coordinate;
      const value = +req.body.value;
      const columnLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
      let [column, row] = coordinate.split("");
      column = columnLetter.indexOf(column);
      row--;
      // checking value
      if (!Number.isInteger(value) || !(1 <= value <= 9)) throw "Invalid value";
      // checking coordinate
      if (
        !Number.isInteger(row) ||
        !Number.isInteger(column) ||
        !(0 <= row <= 8) ||
        !(0 <= column <= 8)
      )
        throw "Invalid coordinate";
      const position = column + row * 9;
      // checking puzzle
      const puzzleString = req.body.puzzle;
      const error = solver.validate(puzzleString);
      if (error) throw error;

      let conflict = [];
      if (!solver.checkRowPlacement(puzzleString, row, column, value)) {
        conflict.push("row");
      }
      if (!solver.checkColPlacement(puzzleString, row, column, value)) {
        conflict.push("column");
      }
      if (!solver.checkRegionPlacement(puzzleString, row, column, value)) {
        conflict.push("region");
      }
      const response =
        conflict.length == 0 ? { valid: true } : { valid: false, conflict };
      console.log(response);
      res.json(response);
    } catch (error) {
      console.error(red(`error: ${error}`));
      res.json({ error });
    }
  });

  app.route("/api/solve").post((req, res) => {
    console.info(blue("_____POST/solve_____"));
    try {
      // checking for errors
      const puzzleString = req.body.puzzle;
      const error = solver.validate(puzzleString);
      if (error) throw error;
      // generating the solution
      const solution = solver.solve(puzzleString);
      // error if "." remains
      if (solution.includes(".")) throw "Puzzle cannot be solved";
      // send it!
      res.json({ solution });
    } catch (err) {
      console.error(red(`error: ${err}`));
      res.json({ error: err });
    }
  });
};
