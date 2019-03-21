import React, {Component} from 'react';
import Column from './column.jsx';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 6,
      width: 7,
    }
  }
  
  componentDidMount() {
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
    console.log(matrix);
  }

  renderColumns() {
    let output = [];
    for (let i = 0; i < this.state.width; i++) {
      output.push(<Column key={i} className='col' height={this.state.height}/>);
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