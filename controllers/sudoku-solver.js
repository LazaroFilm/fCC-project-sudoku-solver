class SudokuSolver {
  validate(puzzleString) {
    console.log("validating:");
    try {
      if (!puzzleString.match(/^[\d.]{81}$/)) throw "invalid Sudoku string";

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
