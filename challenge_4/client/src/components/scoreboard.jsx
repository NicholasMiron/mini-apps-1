import React, {Component} from 'react';
import Player from './player.jsx';


class Scoreboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerOneScore: 0,
      playerTwoScore: 0
    }
  }

  render() {
    return (
      <div className='scoreboard'>
        <Player name="One" score={this.state.playerOneScore}/>
        <Player name="Two" score={this.state.playerTwoScore}/>
      </div>
    )
  }
}

export default Scoreboard;