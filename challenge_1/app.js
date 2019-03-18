//Logic for my tic tac toe game
//Author: Nick Miron
//March 18, 2019
let board = document.getElementById('board');
let boardSize = 3;
let Xturn = true
let boardArr = [];


//Creates a board of a given size
let populateBoard = function(size) {
  for (let i = 0; i < size; i++) {
    let boardArrRow = [];
    let row = document.createElement('div');
    row.className = 'row row' + i;

    for(let j = 0; j < size; j++) {
      boardArrRow.push(null);
      let cell = document.createElement('div')  ;
      cell.className = 'cell col' + j;
      cell.innerText = '';
      cell.addEventListener('click', () => handleCellClick(row, cell))
      row.appendChild(cell);
    }
    boardArr.push(boardArrRow);
    board.appendChild(row);
  }
  
}

//Do stuff on cell click
let handleCellClick = function(row, cell) {
  let cellValue = getXorO(cell); //Returns string x or o
  let cellLoc = parseCellLocation(row.classList, cell.classList); //Returns matrix loc of clicked cell



  cell.innerText = cellValue; //Update inner value of cell
  updateInternalBoard(cellLoc, cellValue); //Update value of internal board


  checkForWinner(cellLoc); //Check for a winner
}

//Returns the value for whos turn it is X or O
let getXorO = function(cell) {
  if(cell.innerText === '') {
    if (Xturn) {
      Xturn = false;
      return 'X';
    } else {
      Xturn = true;
      return 'O';
    }
  } else {
    console.log("You can't do that!!!!!");
    return cell.innerText;
  }
}

let checkRowForWinner = function(row) {
  console.log('im in here', row);
  return false;
}

let checkColForWinner = function(col) {
  return false;
}

let checkDiagonalForWinner = function(board) {
  return false;
}

//Combines the row col and diagnoal checks
let checkForWinner = function(loc) {
  let weGotAWinner = false;
  if(!weGotAWinner) {
    weGotAWinner = checkRowForWinner(loc[0]);
  }
  if(!weGotAWinner) {
    weGotAWinner = checkColForWinner(boardArr, loc[1]);
  }
  if(!weGotAWinner) {
    weGotAWinner = checkDiagonalForWinner(boardArr);
  }
  return weGotAWinner;
}

//Get the matrix index for cell
let parseCellLocation = function(rowClasses, colClasses) {
  let rowIndex = parseInt(rowClasses[1].slice(3));
  let colIndex = parseInt(colClasses[1].slice(3));
  return [rowIndex, colIndex];
}

//Add 1 or 0 to internal board corresponding to X or O
let updateInternalBoard = function(loc, value) {
  let row = loc[0];
  let col = loc[1];
  if(value === 'X') {
    boardArr[row][col] = 1;
  } else {
    boardArr[row][col] = 0;
  }
}

populateBoard(boardSize);
// handleCellClick();