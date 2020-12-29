const consoleLog = (...message) => {
  if (process.env.COMMENTS == "true") console.log(...message);
};
class SudokuSolver {
  validate(puzzleString) {
    try {
      if (!puzzleString) return "Required field missing";
      if (puzzleString.length != 81)
        return "Expected puzzle to be 81 characters long";
      if (!puzzleString.match(/^[\d.]{81}$/))
        return "Invalid characters in puzzle";
      return false;
    } catch (err) {
      return err;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rBump = row * 9;
    // generating the row of known numbers
    const fullRow = puzzleString.slice(rBump, rBump + 9);
    // does the row already contain the value?
    return fullRow.includes(value) ? false : true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    // generating the column of known numbers
    let fullColumn = "";
    for (let c = 0; c <= 8; c++) {
      const cBump = c * 9;
      const cNum = cBump + column;
      fullColumn += puzzleString[cNum];
    }
    // does the column already contain the value?
    return fullColumn.includes(value) ? false : true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // hard coded regions
    const regions = {
      0: [0, 1, 2, 9, 10, 11, 18, 19, 20],
      1: [3, 4, 5, 12, 13, 14, 21, 22, 23],
      2: [6, 7, 8, 15, 16, 17, 24, 25, 26],
      3: [27, 28, 29, 36, 37, 38, 45, 46, 47],
      4: [30, 31, 32, 39, 40, 41, 48, 49, 50],
      5: [33, 34, 35, 42, 43, 44, 51, 52, 53],
      6: [54, 55, 56, 63, 64, 65, 72, 73, 74],
      7: [57, 58, 59, 66, 67, 68, 75, 76, 77],
      8: [60, 61, 62, 69, 70, 71, 78, 79, 80],
    };
    const position = column + row * 9;
    // generating the region of known numbers
    let fullRegion = "";
    for (const region in regions) {
      if (regions[region].includes(position)) {
        regions[region].forEach((rNum) => {
          fullRegion += puzzleString[rNum];
        });
      }
    }
    // does the region already contain the value?
    return fullRegion.includes(value) ? false : true;
  }

  solve(puzzleString) {
    let passes = 0;
    let done = false;
    let prevPuzzleString = "";
    consoleLog(puzzleString);
    while (!done) {
      // checking for each row and column
      for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
          let possibleRow = [];
          let possibleColumn = [];
          let possibleRegion = [];
          const position = column + row * 9;
          // testing only for "."
          if (puzzleString[position] == ".") {
            for (let value = 1; value <= 9; value++) {
              // thinning out the possible numbers
              if (this.checkRowPlacement(puzzleString, row, column, value)) {
                possibleRow.push(value);
                if (this.checkColPlacement(puzzleString, row, column, value)) {
                  possibleColumn.push(value);
                  if (
                    this.checkRegionPlacement(puzzleString, row, column, value)
                  ) {
                    possibleRegion.push(value);
                  }
                }
              }
            }
          }
          // add the answer when only one possible number is left
          if (possibleRegion.length == 1) {
            let puzzleArray = puzzleString.split("");
            position = column + row * 9;
            puzzleArray[position] = possibleRegion[0];
            puzzleString = puzzleArray.join("");
            // displaying the beautiful solving process
            consoleLog(puzzleString);
          }
        }
      }
      // stop solving if all numbers are found
      // or if no new numbers are found
      // of if we tried it 100 times (to avoid infinite loop)
      if (
        !puzzleString.includes(".") ||
        puzzleString == prevPuzzleString ||
        passes == 100
      ) {
        done = true;
      } else {
        prevPuzzleString = puzzleString;
        passes++;
      }
    }
    return puzzleString;
  }
}

module.exports = SudokuSolver;
