"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");
const chalk = require("chalk");

const red = chalk.bold.red;
const blue = chalk.bold.blue;

const consoleLog = (...message) => {
  if (process.env.COMMENTS == "true") console.log(...message);
};
const consoleInfo = (...message) => {
  if (process.env.INFOS == "true") console.info(blue(...message));
};
const consoleError = (...message) => {
  if (process.env.ERRORS == "true") console.error(red(...message));
};

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    consoleInfo("_____POST/check_____");
    consoleLog("req.body:", req.body);
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
      consoleLog(response);
      res.json(response);
    } catch (error) {
      consoleError(`error: ${error}`);
      res.json({ error });
    }
  });

  app.route("/api/solve").post((req, res) => {
    consoleInfo("_____POST/solve_____");
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
      consoleError(`error: ${err}`);
      res.json({ error: err });
    }
  });
};
