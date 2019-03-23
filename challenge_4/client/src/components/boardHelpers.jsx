const checkForAnyWin = (matrix, col, row, targetPlayer, connect, cb) => {
    let someoneWon = false;
    if (!someoneWon) {
      someoneWon = checkRowForWin(matrix, row, targetPlayer, connect);
    }
    if (!someoneWon) {
      someoneWon = checkColForWin(matrix, col, targetPlayer, connect);
    }
    if (!someoneWon) {
      someoneWon = checkForMajorDiagWin(matrix, targetPlayer, connect);
    }
    if (!someoneWon) {
      someoneWon = checkForMinorDiagWin(matrix, targetPlayer, connect);
    }

    if (someoneWon) {
      cb(true)
    } else {
      cb(false)
    }
  }


const checkColForWin = (matrix, col, targetPlayer, connect) => {
  let inARow = 0;
  for (let i = 0; i < matrix[col].length; i++) {
    if (matrix[col][i] === targetPlayer) {
      inARow++;
    } else {
      inARow = 0;
    }
    if (inARow === connect) {
      return true;
    }
  }
  return false;
}


const checkRowForWin = (matrix, row, targetPlayer, connect) => {
  let inARow = 0;
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][row] === targetPlayer) {
      inARow++;
    } else {
      inARow = 0;
    }
    if (inARow === connect) {
      return true;
    }
  }
  return false;
}


const checkForMajorDiagWin = (matrix, targetPlayer, connect) => {
  let inARow = 0;
  for (let i = 0; i < matrix.length - 3; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let tempI = i;
      let tempJ = j;
      for (let k = 1; k <= connect; k++) {
        if (matrix[tempI][tempJ] === targetPlayer) {
          inARow++;
        } else {
          inARow = 0;
        }
        if(inARow === connect) {
          return true;
        }
        tempI++;
        tempJ++;
      }
      inARow = 0;
    }
  }
  return false;
}


const checkForMinorDiagWin = (matrix, targetPlayer, connect) => {
  let inARow = 0;
  for (let i = 0; i < matrix.length - 3; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let tempI = i;
      let tempJ = j;
      for (let k = 1; k <= connect; k++) {
        if (matrix[tempI][tempJ] === targetPlayer) {
          inARow++;
        } else {
          inARow = 0;
        }
        if (inARow === connect) {
          return true;
        }          
        tempI++;
        tempJ--;
      }
      inARow = 0;
    }
  }
  return false;
}

export default checkForAnyWin;