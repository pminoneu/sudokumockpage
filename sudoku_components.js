const { useEffect, useState } = React
const { createRoot } = ReactDOM
const e = React.createElement


// Generates Sudoku board of given size (6 or 9) - this is partially filled
function sudokuBoard(size) {
  const board = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(0);
    }
    board.push(row);
  }
  for (let i = 0; i < size * (size / 2); ) {
    const randomRow = Math.floor(Math.random() * size);
    const randomCol = Math.floor(Math.random() * size);
    if (board[randomRow][randomCol] !== 0) {
      continue;
    }
    let placed = false;
    while (!placed) {
      const randomNum = Math.floor(Math.random() * size) + 1;
      let conflict = false;
      // Check row
      for (let k = 0; k < size; k++) {
        if (board[randomRow][k] === randomNum) {
          conflict = true;
          break;
        }
      }
      if (conflict) continue;
      // Check column
      for (let k = 0; k < size; k++) {
        if (board[k][randomCol] === randomNum) {
          conflict = true;
          break;
        }
      }
      if (conflict) continue;
      const boxSize = size === 9 ? 3 : 2;
      const boxRowStart = Math.floor(randomRow / boxSize) * boxSize;
      const boxColStart = Math.floor(randomCol / 3) * 3;
      
      for (let m = boxRowStart; m < boxRowStart + boxSize; m++) {
        for (let n = boxColStart; n < boxColStart + 3; n++) {
          if (board[m][n] === randomNum) {
            conflict = true;
            break;
          }
        }
        if (conflict) break;
      }
      if (conflict) continue;
      board[randomRow][randomCol] = randomNum;
      placed = true;
    }
    i++; 
  }
  return board;
}

// Calls function with hard Sudoku
function hardSudoku() {
  const b = sudokuBoard(9);
  console.table(b);
  return b;
}

// Calls function with Easy Sudoku
function easySudoku() {
  const b = sudokuBoard(6);
  console.table(b);
  return b;
}