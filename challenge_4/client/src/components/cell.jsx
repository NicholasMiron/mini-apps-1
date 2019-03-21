import React from 'react';

const Cell = (props) => {
  return(
    <div className='cell' onClick={() => console.log('Im a cell')}></div>
  )
}

export default Cell;