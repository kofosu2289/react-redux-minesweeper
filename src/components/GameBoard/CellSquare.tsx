import React from 'react';
import { Styled } from './styles';
import { Cell } from '../../utils';

type CellSquareProps = {
  cell: Cell;
  handleClickCellSquare: Function;
}

const CellSquare: React.FC<CellSquareProps> = ({ cell, handleClickCellSquare }) => {
  return (
    <Styled.CellSquare
      onClick={() => handleClickCellSquare(cell)}
      hasMine={cell.hasMine}
      isVisible={cell.isVisible}
    >
      {cell.isVisible && cell.neighborMines}
    </Styled.CellSquare>
  )
}
 
export default React.memo(CellSquare);