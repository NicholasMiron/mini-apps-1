import React, {Component} from 'react';
import Player from './player.jsx';


class Scoreboard extends Component {

  render() {
    return (
      <div className='scoreboard'>
        <Player name="One" score={this.props.score[0]}/>
        <Player name="Two" score={this.props.score[1]}/>
      </div>
    )
  }
}

export default Scoreboard;