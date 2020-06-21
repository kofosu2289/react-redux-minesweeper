import React, { Dispatch } from 'react'
import { Styled } from './styles'
import { Cell } from '../../utils'
import { useDispatch } from 'react-redux'
import { GameBoardActions } from '../../redux/actions/GameBoardActions'

type CellSquareProps = {
    cell: Cell;
}

const CellSquare: React.FC<CellSquareProps> = ({ cell }) => {
    const gameBoardDispatch = useDispatch<Dispatch<GameBoardActions>>();

    const handleClick = (): void => {
        gameBoardDispatch({type: "LEFT_CLICK_CELL", payload: cell})
    }

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        gameBoardDispatch({type: "RIGHT_CLICK_CELL", payload: cell})
    }

    return (
        <Styled.CellSquare 
            onClick={handleClick} 
            onContextMenu={handleRightClick}
            cell={cell}
        >
            {cell.isVisible && !cell.hasMine && cell.neighborMines > 0 && cell.neighborMines}
            {cell.isVisible && cell.hasMine && <img src={'/mine.png'} alt={'mine'} />}
            {cell.isFlagged && !cell.isVisible && <img src={'/flag.png'} alt={'flag'} />}
        </Styled.CellSquare>
    )
}

export default React.memo(CellSquare);
