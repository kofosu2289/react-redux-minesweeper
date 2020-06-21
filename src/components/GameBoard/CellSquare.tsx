import React from 'react'
import { Styled } from './styles'

type CellSquareProps = {
    isVisible: boolean,
    isFlagged: boolean,
    hasMine: boolean,
    neighborMines: number,
    x: number,
    y: number,
    handleClick: Function,
}

const CellSquare: React.FC<CellSquareProps> = ({ isVisible, isFlagged, hasMine, neighborMines, x, y, handleClick }) => {

    const cell = {
        isVisible,
        isFlagged,
        hasMine,
        neighborMines,
        x,
        y,
    }

    return (
        <Styled.CellSquare 
            onClick={(e) => handleClick(e, x, y)} 
            onContextMenu={(e) => handleClick(e, x, y)}
            cell={cell}
        >
            {cell.isVisible && !cell.hasMine && cell.neighborMines > 0 && cell.neighborMines}
            {cell.isVisible && cell.hasMine && <img src={'/mine.png'} alt={'mine'} />}
            {cell.isFlagged && !cell.isVisible && <img src={'/flag.png'} alt={'flag'} />}
        </Styled.CellSquare>
    )
}

export default React.memo(CellSquare);
