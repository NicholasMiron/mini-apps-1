  import React from 'react';

  const Player = (props) => {
    return (
      <div className='player'>
        <div className='playername'>Player {props.name}</div>
        <div className='playerscore'>Score: {props.score}</div>
      </div>
    )
  }

  export default Player;