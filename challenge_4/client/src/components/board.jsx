import React, {Component} from 'react';
import Column from './column.jsx';
import checkForAnyWin from './boardHelpers.jsx' 

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

  // componentDidMount() {
  
  // }

  resetGame() {
    this.createMatrix();
    this.setState({
      playerOneTurn: true,
      weHaveAWinner: false
    })
  }

  handleBoardSizeChange() {
    let userheight = parseInt(window.prompt('How tall do you want your board? (Default 6)')) || 6;
    let userwidth = parseInt(window.prompt('How wide do you want your board? (Default 7)')) || 7;
    // Breaks if user input is too big???
    // let userconnect = parseInt(window.prompt('How many do you want to connect? (Default 4')) || 4;
    this.createMatrix(userheight, userwidth)

    this.setState({
      height: userheight,
      width: userwidth,
      weHaveAWinner: false
      // connect: userconnect
    } );
  }

  createMatrix(height = this.state.height, width = this.state.width) {
    const matrix = [];
    for (let i = 0; i < width; i++) {
      const col = [];
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
        }, () => this.checkForWin(tempMatrix, targetCol, this.state.playerOneTurn, this.state.connect));
      }
    }
  }

  checkForWin(tempMatrix, targetCol, playerOneTurn, connect) {
    let targetPlayer;
    if (playerOneTurn) targetPlayer = 1 
    else targetPlayer = 0
    
    let targetRow;
    targetRow = this.state.matrix[targetCol].lastIndexOf(targetPlayer);

    checkForAnyWin(tempMatrix, targetCol, targetRow, targetPlayer, connect, winner => {
      if (winner) {
        this.setState({
          weHaveAWinner: true
        }, () => {
          this.props.handleWin(targetPlayer);
        }) 
      }
    });
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
  
  renderColumns() {
    let output = [];
    for (let i = 0; i < this.state.width; i++) {
      output.push(<Column key={i} column={i} height={this.state.height} data-maCol={this.state.matrix[i]} doStuff={this.handleColClick}/>);
    }
    return output;
  }

  render() {
    let winStyle = {'display': this.state.weHaveAWinner ? 'block' : 'none'}
    return (
      <>
        <button onClick={this.resetGame.bind(this)}>Reset</button>
        <button onClick={this.handleBoardSizeChange.bind(this)}>Change Board Size</button>
        <div className='board'>
          {this.renderColumns()} 
        </div>
        <div className='winnerWinnerChickenDinner' style={winStyle}>WINNER!</div>
      </>
    )
  }
}

export default Board;