"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    console.log("_____POST_____");
    console.log("req:", req.body);
    res.json({ test: "works!" });
  });

  app.route("/api/solve").post((req, res) => {});
};
