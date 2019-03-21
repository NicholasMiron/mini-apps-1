import React from 'react';

const Cell = (props) => {
  
  const divStyle = {
    'backgroundColor': 'white'
  }

  if(props.maCol === 0) {
    divStyle['backgroundColor'] = 'black';
  } else if (props.maCol === 1) {
    divStyle['backgroundColor'] = 'red';
  }

  return(
    <div className='cell' data-row={props.row} data-col={props.col} style={divStyle}></div>
  )
}

export default Cell;