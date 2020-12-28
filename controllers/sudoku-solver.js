const chalk = require("chalk");

class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.match(/^[\d.]{81}$/)) return true;
    else return false;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rBump = row * 9;
    const fullRow = puzzleString.slice(rBump, rBump + 9);
    return fullRow.includes(value) ? false : true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let fullColumn = "";
    for (let c = 0; c <= 8; c++) {
      const cBump = c * 9;
      const cNum = cBump + column;
      fullColumn += puzzleString[cNum];
    }
    return fullColumn.includes(value) ? false : true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
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
    let fullRegion = "";
    for (const region in regions) {
      if (regions[region].includes(position)) {
        regions[region].forEach((rNum) => {
          fullRegion += puzzleString[rNum];
        });
      }
    }
    return fullRegion.includes(value) ? false : true;
  }

  solve(puzzleString) {
    let passes = 0;
    let done = false;
    let prevPuzzleString = "";
    while (!done) {
      for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
          let possibleRow = [];
          let possibleColumn = [];
          let possibleRegion = [];
          const letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
          const col = letter[column];
          const position = column + row * 9;
          if (puzzleString[position] == ".") {
            for (let value = 1; value <= 9; value++) {
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

          if (possibleRegion.length == 1) {
            let puzzleArray = puzzleString.split("");
            position = column + row * 9;
            // console.log(
            //   chalk.bold.cyan(
            //     `swapping ${puzzleArray[position]} to ${possibleRegion[0]} at ${col}${row}`
            //   )
            // );
            puzzleArray[position] = possibleRegion[0];
            puzzleString = puzzleArray.join("");
            console.log("puzzleString:", puzzleString);
          }
        }
      }
      // checks if the puzzle is solved and under 10 passes.
      if (
        !puzzleString.includes(".") ||
        puzzleString == prevPuzzleString ||
        passes == 100
      ) {
        done = true;
      } else {
        console.log("one more pass:", passes + 1);
        prevPuzzleString = puzzleString;
        passes++;
      }
    }
    console.log("DONE         ", puzzleString);
    return puzzleString;
  }
}

module.exports = SudokuSolver;
