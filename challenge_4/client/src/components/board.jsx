import React, {Component} from 'react';
import Column from './column.jsx';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 6,
      width: 7,
      connect: 4,
      playerOneTurn: true,
      weHaveAWinner: false,
      score: [0, 0]
    }

    this.handleColClick = this.handleColClick.bind(this);
  }
  
  componentWillMount() {
    this.createMatrix();
  }

  componentDidMount() {
    let userheight = parseInt(window.prompt('How tall do you want your board? (Default 6)')) || 6;
    let userwidth = parseInt(window.prompt('How wide do you want your board? (Default 7)')) || 7;
    // Breaks if user input is too big???
    // let userconnect = parseInt(window.prompt('How many do you want to connect? (Default 4')) || 4;
    console.log('hello');
    this.createMatrix(userheight, userwidth)

    this.setState({
      height: userheight,
      width: userwidth,
      // connect: userconnect
    } );
  }

  resetGame() {
    this.createMatrix();
    this.setState({
      playerOneTurn: true,
      weHaveAWinner: false
    })
  }

  createMatrix(height = this.state.height, width = this.state.width) {
    const matrix = [];
    for (let i = 0; i < width; i++) {
      let col = [];
      for (let j = 0; j < height; j++) {
        col.push(null)
      }
      matrix.push(col);
    }

    this.setState({
      matrix: matrix
    });
  }

  handleColClick(e) {
    // e.preventDefault();
    if (!this.state.weHaveAWinner) {

      let tempMatrix = this.state.matrix
      let targetCol = e.target.dataset.col
      
      //Don't overfill the board
      if (tempMatrix[targetCol][this.state.height - 1] === null) {

        tempMatrix = this.addPlayerMoveToCol(tempMatrix, targetCol)

        //Change matrix in state. Once done check for win
        this.setState({
          matrix: tempMatrix,
          playerOneTurn: !this.state.playerOneTurn
        }, () => this.checkForWin(tempMatrix, targetCol));
      }
    }
  }


  checkForWin(tempMatrix, targetCol) {
    let targetPlayer;
    let targetRow;

    if (this.state.playerOneTurn) {
      targetPlayer = 1;
    } else {
      targetPlayer = 0;
    }

    targetRow = this.state.matrix[targetCol].lastIndexOf(targetPlayer);

    this.checkForAnyWin(tempMatrix, targetCol, targetRow, targetPlayer);
  }


  addPlayerMoveToCol(tempMatrix, targetCol) {
    for (let i = 0; i < tempMatrix[targetCol].length; i++) {
      if (tempMatrix[targetCol][i] === null) {
        if (this.state.playerOneTurn) {
          tempMatrix[targetCol][i] = 0;
        } else {
          tempMatrix[targetCol][i] = 1;
        }
        break;
      }
    }
    return tempMatrix
  }
  

  checkForAnyWin(matrix, col, row, targetPlayer) {
    let someoneWon = false;

    if (!someoneWon) {
      someoneWon = this.checkRowForWin(matrix, row, targetPlayer);
    }
    if (!someoneWon) {
      someoneWon = this.checkColForWin(matrix, col, targetPlayer);
    }
    if (!someoneWon) {
      someoneWon = this.checkForMajorDiagWin(matrix, targetPlayer);
    }
    if (!someoneWon) {
      someoneWon = this.checkForMinorDiagWin(matrix, targetPlayer);
    }

    if (someoneWon) {
      this.setState({
        weHaveAWinner: true
      }, () => {
        this.props.handleWin(targetPlayer);
      })
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
      console.log(inARow, this.state.connect)
      if (inARow === this.state.connect) {
        return true;
      }
    }
    return false;
  }


  checkRowForWin(matrix, row, targetPlayer) {
    let inARow = 0;
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][row] === targetPlayer) {
        inARow++;
      } else {
        inARow = 0;
      }
      if (inARow === this.state.connect) {
        return true;
      }
    }
    return false;
  }


  checkForMajorDiagWin(matrix, targetPlayer) {
    let inARow = 0;
    for (let i = 0; i < matrix.length - 3; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        let tempI = i;
        let tempJ = j;
        for (let k = 1; k <= this.state.connect; k++) {
          if (matrix[tempI][tempJ] === targetPlayer) {
            inARow++;
          } else {
            inARow = 0;
          }
          if(inARow === this.state.connect) {
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


  checkForMinorDiagWin(matrix, targetPlayer) {
    let inARow = 0;
    for (let i = 0; i < matrix.length - 3; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        let tempI = i;
        let tempJ = j;
        for (let k = 1; k <= this.state.connect; k++) {
          if (matrix[tempI][tempJ] === targetPlayer) {
            inARow++;
          } else {
            inARow = 0;
          }
          if (inARow === this.state.connect) {
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



  renderColumns() {
    let output = [];
    for (let i = 0; i < this.state.width; i++) {
      output.push(<Column key={i} column={i} height={this.state.height} data-maCol={this.state.matrix[i]} doStuff={this.handleColClick}/>);
    }
    return output;
  }

  render() {
    return (
      <>
        <button onClick={this.resetGame.bind(this)}>Reset</button>
        <div className='board'>
          {this.renderColumns()} 
        </div>
      </>
    )
  }
}

export default Board;