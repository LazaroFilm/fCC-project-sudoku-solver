class SudokuSolver {
  validate(puzzleString) {
    console.log("validating:");
    // check for row, then col, the reg.
    // if all clears, return value
    // if multiple possibilities, return array of numbers
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
