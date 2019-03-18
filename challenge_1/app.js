
let board = document.getElementById('board');
let Xturn = true

//Creates a board of a given size
let populateBoard = function(size) {
  for (let i = 1; i <= size; i++) {
    let row = document.createElement('div');
    row.className = 'row';

    for(let j = 1; j <= size; j++) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.innerText = i + '' + j;
      cell.addEventListener('click', () => handleCellClick(cell))
      row.appendChild(cell);
    }

    board.appendChild(row);
  }
  
}

let handleCellClick = function(cell) {
  cell.innerText = getXorO();
  console.log(cell.innerText);
}

let getXorO = function() {
  if (Xturn) {
    Xturn = false;
    return 'X';
  } else {
    Xturn = true;
    return 'O';
  }
}

populateBoard(3);
// handleCellClick();