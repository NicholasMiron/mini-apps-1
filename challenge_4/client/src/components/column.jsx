import React from 'react';
import Cell from './cell.jsx';

const Column = (props) => {
  let renderCells = () => {
    let output = [];
    for (let i = 0; i < props.height; i++) {
      output.push(<Cell key={i} col={props.column} row={i} maCol={props['data-maCol'][i]}/>);
    }
    return output;
  };

  return(
    <div className='col' data-col={props.column} onClick={(e) => props.doStuff(e)}>
      {renderCells()}
    </div>
  )
}

export default Column;