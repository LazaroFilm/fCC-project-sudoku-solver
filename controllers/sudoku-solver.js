class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.match(/^[\d.]{81}$/)) return true;
    else return false;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowBump = (row - 1) * 9;
    const pos = column + rowBump;
    const fullRow = puzzleString.slice(rowBump, rowBump + 9);
    if (!fullRow.includes(value)) {
      return value;
    } else {
      return false;
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    // not sure how to do this:
    const rowBump = (row - 1) * 9;
    const pos = column + rowBump;
    const fullRow = puzzleString.slice(rowBump, rowBump + 9);
    if (!fullRow.includes(value)) {
      return value;
    } else {
      return false;
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {
    for (let row = 1; row <= 9; row++) {
      for (let column = 1; column <= 9; column++) {
        console.log("_____");
        let possible = [];
        for (let value = 1; value <= 9; value++) {
          // Checking row
          let checkRow = this.checkRowPlacement(
            puzzleString,
            row,
            column,
            value
          );
          if (checkRow) {
            let checkColumn = this.checkColPlacement(
              puzzleString,
              row,
              column,
              value
            );
            if (checkColumn) {
              possible.push(checkColumn);
            }
          }
          // Checking Column
        }
        const letter = ["0", "A", "B", "C", "D", "E", "F", "G", "H", "I"];
        const col = letter[column];
        console.log(`Square ${col}:${row} => ${possible}`);
      }
    }
  }
}

module.exports = SudokuSolver;
