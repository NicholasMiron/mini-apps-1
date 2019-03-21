import React, {Component} from 'react';
import Column from './column.jsx';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 6,
      width: 7,
      connect: 4,
      playerOneTurn: true
    }

    this.handleColClick = this.handleColClick.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
    this.checkColForWin = this.checkColForWin.bind(this);
    this.checkRowForWin = this.checkRowForWin.bind(this);
  }
  
  componentWillMount() {
    this.createMatrix();
  }

  createMatrix() {
    const matrix = [];
    for (let i = 0; i < this.state.width; i++) {
      let col = [];
      for (let j = 0; j < this.state.height; j++) {
        col.push(null)
      }
      matrix.push(col);
    }

    this.setState({
      matrix: matrix
    });
  }

  handleColClick(e) {
    let tempMatrix = this.state.matrix
    let targetCol = e.target.dataset.col
    let targetRow;
    if(tempMatrix[targetCol][this.state.height - 1] === null) {

      for (let i = 0; i < tempMatrix[targetCol].length; i++) {
        if (tempMatrix[targetCol][i] === null) {
          if(this.state.playerOneTurn) {
            tempMatrix[targetCol][i] = 0;
          } else {
            tempMatrix[targetCol][i] = 1;
          }
          break;
        }
      }
      this.setState({
        matrix: tempMatrix,
        playerOneTurn: !this.state.playerOneTurn
      }, () => {
        let targetPlayer;
        if(this.state.playerOneTurn) {
          targetPlayer = 1;
        } else {
          targetPlayer = 0;
        }
        if (this.state.playerOneTurn) {
          targetRow = this.state.matrix[targetCol].lastIndexOf(targetPlayer);
        } else {
          targetRow = this.state.matrix[targetCol].lastIndexOf(targetPlayer);
        }
        this.checkForWin(tempMatrix, targetCol, targetRow, targetPlayer);

      });
    }
  }
  
  checkForWin(matrix, col, row, targetPlayer) {
    let someoneWon = false;
    someoneWon = this.checkRowForWin(matrix, row, targetPlayer);
    if(!someoneWon) {
      someoneWon = this.checkColForWin(matrix, col, targetPlayer);
    }
    if(!someoneWon) {
      someoneWon = this.checkForAnyMajorDiagWin(matrix, targetPlayer);
    }

    if(someoneWon) {
      console.log('Youre a winner')
    }
  }

  checkColForWin(matrix, col, targetPlayer) {
    let inARow = 0;
    for (let i = 0; i < matrix[col].length; i++) {
      if (matrix[col][i] === targetPlayer) {
        inARow++;
      } else {
        inARow = 0;
      }
      if(inARow === 4) {
        return true;
      }
    }
    return false;
  }

  checkRowForWin(matrix, row, targetPlayer) {
    let inARow = 0;
    for(let i = 0; i < matrix.length; i++) {
      if (matrix[i][row] === targetPlayer) {
        inARow++;
      } else {
        inARow = 0;
      }
      if (inARow === 4) {
        return true;
      }
    }
    return false;
  }

  checkMajorDiagForWin(row, column, targetPlayer, matrix) {
    let inARow = 0;
    let aRow = row;
    console.log(row,column)
    let aCol = column;
    for (let i = 0; i < this.state.connect; i++) {
      console.log(matrix[aRow])
      if (matrix[aRow[aCol]] !== undefined && matrix[aRow[aCol]] === targetPlayer) {
        inARow++;
      } else {
        inARow = 0;
      }
      console.log(inARow)
      if (inARow === this.state.connect) {
        return true;
      }
      aRow++;
      aCol++;
    }
    return false;
  }

  checkForAnyMajorDiagWin(matrix, targetPlayer) {
    for (let i = 0; i < matrix.length - 3; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        let temp = [];
        let tempI = i;
        let tempJ = j;
        for (let k = 0; k < this.state.connect; k++) {
          temp.push(matrix[tempI][tempJ])
          tempI++;
          tempJ++;
        }
        if(temp[0] !== null && temp[0] === temp[1] && temp[1] === temp[2] && temp[2] === temp[3]) {
          return true;
        }
      }
    }
    return false;
  }

  renderColumns() {
    let output = [];
    for (let i = 0; i < this.state.width; i++) {
      output.push(<Column key={i} column={i} height={this.state.height} data-maCol={this.state.matrix[i]} doStuff={this.handleColClick}/>);
    }
    return output;
  }

  render() {
    return (
      <div className='board'>
        {this.renderColumns()}
      </div>
    )
  }
}