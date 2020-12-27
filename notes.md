# Sudoku

## Rules:

- Each row has to have all the numbers for 1 to 9
- Each column has to have all the numbers for 1 to 9
- Each region has to have all the numbers for 1 to 9

## Lay out the board

Attach each value with it's square.
Start with the first square and move on.

## Sequence of checks

1. Pick a square, check the possible numbers in row, col, reg
   then save them in an array.
2. If there are multiple possibilities, move on to the next square and so on.
3. When all the boxes are done, go back from the first square and so on again.

## Naming the squares:

- Rows are numbers 1, 2, 3...
- Columns are letters A, B, C...
- A1 B2 C3 D4 E5 F6 G7 H8 I9
