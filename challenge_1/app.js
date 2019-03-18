//Logic for my tic tac toe game
//Author: Nick Miron
//March 18, 2019
let board = document.getElementById('board');
let boardSize = 3;
let Xturn = true
let boardArr = [];
let weHaveAWinner = false;


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

//Handle reset game
document.getElementById('reset').addEventListener('click', () => {
  board.innerHTML = ''; //Clear the board
  document.body.style.backgroundColor = '#d3d3d3';
  boardArr = [];        //Reset internal board
  Xturn = true;         //Set x to go first
  weHaveAWinner = false;//We no longer have a winner
  populateBoard(boardSize); //Put the board back on the screen
});

//Do stuff on cell click
let handleCellClick = function(row, cell) {
  if(!weHaveAWinner) {
    let cellValue = getXorO(cell); //Returns string x or o
    let cellLoc = parseCellLocation(row.classList, cell.classList); //Returns matrix loc of clicked cell
    
    cell.innerText = cellValue; //Update inner value of cell
    updateInternalBoard(cellLoc, cellValue); //Update value of internal board
    
    //Handle winning condition
    if(checkForWinner(cellLoc)) {
      weHaveAWinner = true;
      handleWinning();
    }
  }
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
    return cell.innerText;
  }
}

//Checks a given row for a winning combination
let checkRowForWinner = function(row) {
  let firstVal = boardArr[row][0];
  for (let i = 0; i < boardArr[row].length; i++) {
    if (boardArr[row][i] === null) {
      return false;
    } 
    if (boardArr[row][i] !== firstVal) {
      return false;
    }
  }
  return true;
}

//Checks a given column for a winning combination
let checkColForWinner = function(col) {
  let firstVal = boardArr[0][col];
  for (let i = 0; i < boardArr.length; i++) {
    if (boardArr[i][col] === null) {
      return false;
    }
    if (boardArr[i][col] !== firstVal) {
      return false;
    }
  }
  return true;
}

//Checks the internal board for a winning minor diagonal
let checkMinorDiagonalForWinner = function() {
  let firstVal = boardArr[0][0];

  for (let i = 0; i < boardArr.length; i++) {
    if (boardArr[i][i] === null) {
      return false;
    }
    if (boardArr[i][i] !== firstVal) {
      return false;
    }
  }
  return true;
}

//Checks the internal board for a winning major diagonal
let checkMajorDiagonalForWinner = function() {
  let firstVal = boardArr[0][boardArr.length - 1];
  let count = boardArr.length - 1;
  for (let i = 0; i < boardArr.length; i++) {
    if (boardArr[i][count] === null) {
      return false;
    }
    if (boardArr[i][count] !== firstVal) {
      return false;
    }
    count--;
  }
  return true;
}

//Combines the row col and diagnoal checks
let checkForWinner = function(loc) {
  let weGotAWinner = false;
  if(!weGotAWinner) {
    weGotAWinner = checkRowForWinner(loc[0]);
  }
  if(!weGotAWinner) {
    weGotAWinner = checkColForWinner(loc[1]);
  }
  if(!weGotAWinner) {
    weGotAWinner = checkMinorDiagonalForWinner();
  }
  if(!weGotAWinner) {
    weGotAWinner = checkMajorDiagonalForWinner();
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

let handleWinning = function() {
  if(weHaveAWinner) {
    let randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    document.body.style.backgroundColor = randomColor;
    setTimeout(() => handleWinning(), 100);
  }
}

populateBoard(boardSize);
// handleCellClick();