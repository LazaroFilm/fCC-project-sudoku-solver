"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    console.log("_____POST_____");
    console.log("res:", res);
  });

  app.route("/api/solve").post((req, res) => {});
};