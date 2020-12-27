class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.match(/^[\d.]{81}$/)) return true;
    else return false;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowBump = (row - 1) * 9;
    const pos = column + rowBump;
    const fullRow = puzzleString.slice(rowBump, rowBump + 9);
    return fullRow.includes(value) ? false : true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    const rowBump = (row - 1) * 9;
    const pos = column + rowBump;
    let fullColumn = "";
    for (let i = 0; i <= 8; i++) {
      const iBump = (i - 1) * 9;
      fullColumn += puzzleString[iBump + column];
    }
    console.log(`col: ${column} -- ${fullColumn} -- ${value}`);
    return fullColumn.includes(value) ? false : true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    return true;
  }

  solve(puzzleString) {
    for (let row = 1; row <= 9; row++) {
      for (let column = 1; column <= 9; column++) {
        console.log("_____");
        let possibleRow = [];
        let possibleColumn = [];
        for (let value = 1; value <= 9; value++) {
          // Checking row
          if (this.checkRowPlacement(puzzleString, row, column, value)) {
            // console.log(value);
            possibleRow.push(value);
            if (this.checkColPlacement(puzzleString, row, column, value)) {
              possibleColumn.push(value);
              if (this.checkRegionPlacement(puzzleString, row, column, value)) {
                // possible.push(value);
                //if only one number left in possible,
                // add it to the puzzleString
              }
            }
          }
        }
        const letter = ["0", "A", "B", "C", "D", "E", "F", "G", "H", "I"];
        const col = letter[column];
        console.log(
          `Square ${col}:${row} => Row: ${possibleRow} Column: ${possibleColumn}`
        );
      }
    }
  }
}

module.exports = SudokuSolver;
