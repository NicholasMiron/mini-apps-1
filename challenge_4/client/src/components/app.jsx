import React, {Component} from 'react';
import Board from './board.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <>
        <Board />
      </>
    )
  }
}

