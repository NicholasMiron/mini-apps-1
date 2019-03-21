import React, {Component} from 'react';
import Column from './column.jsx';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 6,
      width: 7,
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
        if (!this.state.playerOneTurn) {
          targetRow = this.state.matrix[targetCol].lastIndexOf(0);
        } else {
          targetRow = this.state.matrix[targetCol].lastIndexOf(1);
        }
        this.checkForWin(targetCol, targetRow);

      });
    }
  }
  
  checkForWin(col, row) {
    let someoneWon = false;
    someoneWon = this.checkRowForWin(row);
    if(!someoneWon) {
      someoneWon = this.checkColForWin(col);
    }

    if(someoneWon) {
      console.log('Youre a winner')
    }
  }

  checkColForWin(col) {
    let tempMatrix = this.state.matrix;
    let inARow = 0;
    let targetPlayer;
    if(this.state.playerOneTurn) {
      targetPlayer = 1;
    } else {
      targetPlayer = 0;
    }
    for (let i = 0; i < tempMatrix[col].length; i++) {
      if (tempMatrix[col][i] === targetPlayer) {
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

  checkRowForWin(row) {
    let tempMatrix = this.state.matrix;
    let inARow = 0;
    let targetPlayer;
    if(this.state.playerOneTurn) {
      targetPlayer = 1;
    } else {
      targetPlayer = 0;
    }
    for(let i = 0; i < tempMatrix.length; i++) {
      if (tempMatrix[i][row] === targetPlayer) {
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