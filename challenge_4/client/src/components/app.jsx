import React from 'react';
import Board from './board.jsx';
import Scoreboard from './scoreboard.jsx';

const App = () => {
  return(
    <div id='app'>
      <Scoreboard />
      <Board />
    </div>
  )  
}

export default App;