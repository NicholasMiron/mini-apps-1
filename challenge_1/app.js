
let board = document.getElementById('board');

//Creates a board of a given size
let populateBoard = function(size) {
  for (let i = 1; i <= size; i++) {
    let row = document.createElement('div');
    row.className = 'row';

    for(let j = 1; j <= size; j++) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.innerText = 'x' + j;
      cell.addEventListener('click', () => console.log(cell.innerHTML))
      row.appendChild(cell);
    }

    board.appendChild(row);
  }
  
}

  // document.getElementsById('board').addEventListener('click', console.log('he'));

populateBoard(3);
// handleCellClick();