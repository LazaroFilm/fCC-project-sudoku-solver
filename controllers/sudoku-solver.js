class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.match(/^[\d.]{81}$/)) return true;
    else return false;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowBump = (row - 1) * 9;
    const fullRow = puzzleString.slice(rowBump, rowBump + 9);
    console.log(`row: ${row} -- ${fullRow} -- ${value}`);
    return fullRow.includes(value) ? false : true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let fullColumn = "";
    for (let c = 0; c <= 8; c++) {
      const cBump = (c - 1) * 9;
      fullColumn += puzzleString[cBump + column];
    }
    console.log(`col: ${column} -- ${fullColumn} -- ${value}`);
    return fullColumn.includes(value) ? false : true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let fullRegion = "";
    // name regions 1-9. assing ranges of coordinates possible for each region.
    // gather the regions in fullRegion
    let region = [];
    for (let r = 0; r <= 8; r++) {
      fullRegion += "0";
    }
    console.log(`reg: ${region} -- ${fullRegion} -- ${value}`);
    return fullRegion.includes(value) ? false : true;
  }

  solve(puzzleString) {
    for (let row = 1; row <= 9; row++) {
      for (let column = 1; column <= 9; column++) {
        console.log("_____");
        let possibleRow = [];
        let possibleColumn = [];
        let possibleRegion = [];
        for (let value = 1; value <= 9; value++) {
          if (this.checkRowPlacement(puzzleString, row, column, value)) {
            possibleRow.push(value);
            if (this.checkColPlacement(puzzleString, row, column, value)) {
              possibleColumn.push(value);
              if (this.checkRegionPlacement(puzzleString, row, column, value)) {
                possibleRegion.push(value);
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
          `Square ${col}:${row} => Row: ${possibleRow} Column: ${possibleColumn} Region: ${possibleRegion}`
        );
      }
    }
  }
}

module.exports = SudokuSolver;
