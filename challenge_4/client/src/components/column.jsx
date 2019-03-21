import React from 'react';
import Cell from './cell.jsx';

const Column = (props) => {

  let renderCells = () => {
    let output = [];
    for (let i = 0; i < props.height; i++) {
      output.push(<Cell key={i} />);
    }
    return output;
  };

  return(
    <div className={props.className}>
      {renderCells()}
    </div>
  )
}

export default Column;