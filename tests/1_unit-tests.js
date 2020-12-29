const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
const PuzzleSamples = require("../controllers/puzzle-strings.js");
let solver = new Solver();
const puzzleSamples = PuzzleSamples.puzzlesAndSolutions;
const goodPuzzle = puzzleSamples[0][0];
// console.log("testing below:");
// console.log(solver.checkRowPlacement(goodPuzzle, 5, 2, 4));

suite("UnitTests", () => {
  suite("Function solver.validate(puzzleString)", () => {
    test("Logic handles a valid puzzle string of 81 characters", () => {
      assert.isFalse(solver.validate(goodPuzzle), "should return false");
    });
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
      const badCharacters = goodPuzzle.replace(/^\S{6}/, "sudoku");
      assert.equal(
        solver.validate(badCharacters),
        "Invalid characters in puzzle"
      );
    });
    test("Logic handles a puzzle string that is not 81 characters in length", () => {
      const tooLong = `1.2.3.4.${goodPuzzle}`;
      assert.equal(
        solver.validate(tooLong),
        "Expected puzzle to be 81 characters long"
      );
    });
  });
  suite(
    "Function solver.checkRowPlacement(puzzleString, row, column, value)",
    () => {
      test("Logic handles a valid row placement", () => {
        assert.isTrue(
          solver.checkRowPlacement(goodPuzzle, 0, 1, 3),
          "should return true"
        );
      });
      test("Logic handles an invalid row placement", () => {
        assert.isFalse(
          solver.checkRowPlacement(goodPuzzle, 0, 1, 4),
          "should return false"
        );
      });
      test("Logic handles a valid column placement", () => {
        assert.isTrue(
          solver.checkColPlacement(goodPuzzle, 0, 1, 3),
          "should return true"
        );
      });
      test("Logic handles an invalid column placement", () => {
        assert.isFalse(
          solver.checkColPlacement(goodPuzzle, 0, 1, 7),
          "should return false"
        );
      });
      test("Logic handles a valid region placement", () => {
        assert.isTrue(
          solver.checkRegionPlacement(goodPuzzle, 0, 1, 3),
          "should return true"
        );
      });
      test("Logic handles an invalid region placement", () => {
        assert.isFalse(
          solver.checkRegionPlacement(goodPuzzle, 0, 1, 2),
          "should return false"
        );
      });
    }
  );
  suite("Function solver.solve(puzzleString)", () => {
    test("Valid puzzle strings pass the solver", () => {
      assert.notInclude(
        solver.solve(puzzleSamples[0][0]),
        ".",
        `should not contain any "."`
      );
      assert.match(
        solver.solve(puzzleSamples[1][0]),
        /^\d{81}$/,
        "should contain exactly 81 digits"
      );
    });
    test("Invalid puzzle strings fail the solver", () => {
      const badPuzzle = goodPuzzle.replace(/^\S{2}/, "15");
      assert.include(solver.solve(badPuzzle), ".");
    });
    test("Solver returns the the expected solution for an incomplete puzzle", () => {
      assert.equal(solver.solve(puzzleSamples[0][0]), puzzleSamples[0][1]);
      assert.equal(solver.solve(puzzleSamples[1][0]), puzzleSamples[1][1]);
      assert.equal(solver.solve(puzzleSamples[2][0]), puzzleSamples[2][1]);
      assert.equal(solver.solve(puzzleSamples[3][0]), puzzleSamples[3][1]);
      assert.equal(solver.solve(puzzleSamples[4][0]), puzzleSamples[4][1]);
    });
  });
});
