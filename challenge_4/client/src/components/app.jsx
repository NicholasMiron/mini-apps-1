import React, {Component} from 'react';
import Board from './board.jsx';
import Scoreboard from './scoreboard.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: [0, 0]
    }
  }

  handleWin(winningPlayer) {
    let newScore = this.state.score;
    newScore[winningPlayer]++;
    this.setState({
      score: newScore
    })
  }
  
  render() {
    return(
      <div id='app'>
        <Scoreboard score={this.state.score}/>
        <Board handleWin={this.handleWin.bind(this)}/>
      </div>
    )  
  }
}

export default App;