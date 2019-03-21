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
    });
  }

  renderColumns() {
    let output = [];
    for (let i = 0; i < this.state.width; i++) {
      output.push(<Column key={i} column={i} height={this.state.height} data-maCol={this.state.matrix[i]} doStuff={this.handleColClick.bind(this)}/>);
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