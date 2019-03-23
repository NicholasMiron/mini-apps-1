  import React from 'react';

  const Player = (props) => {

    const changeName = (e) => {
      e.preventDefault();
      let newName = window.prompt('Change yo name') || e.target.innerText;
      e.target.innerText = newName;
    }
    return (
      <div className='player'>
        <div className='playername' onClick={(e) => changeName(e)}>Player {props.name}</div>
        <div className='playerscore'>Score: {props.score}</div>
      </div>
    )
  }

  export default Player;