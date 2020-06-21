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
        onClick={(e) => handleClickCellSquare(e, cell)} 
        onContextMenu={(e) => handleClickCellSquare(e, cell)}
        cell={cell}
    >
        {cell.isVisible && !cell.hasMine && cell.neighborMines > 0 && cell.neighborMines}
        {cell.isVisible && cell.hasMine && <img src={'/mine.png'} alt={'mine'} />}
        {cell.isFlagged && !cell.isVisible && <img src={'/flag.png'} alt={'flag'} />}
    </Styled.CellSquare>
)
}
 
export default React.memo(CellSquare);