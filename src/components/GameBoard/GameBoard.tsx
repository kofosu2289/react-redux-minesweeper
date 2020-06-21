import React, { Dispatch, useCallback } from 'react'
import { Styled } from './styles';
import CellSquare from './CellSquare';
import ControlsBar from './ControlsBar';
import { Cell } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import { GameBoardActions } from '../../redux/actions/GameBoardActions';

const GameBoard: React.FC = () => {
    const { width, height, cells: gameBoardState, headerText } = useSelector((state: AppState) => state.gameBoard)

    const gameBoardDispatch = useDispatch<Dispatch<GameBoardActions>>();

    const handleClickCell = useCallback((e: React.MouseEvent<HTMLDivElement>, x: number, y: number): void => {
        e.preventDefault();
        if(e.type === "click") {
            gameBoardDispatch({type: "LEFT_CLICK_CELL", payload: {x, y}})
        } 
        else if (e.type === "contextmenu") {
            gameBoardDispatch({type: "RIGHT_CLICK_CELL", payload: {x, y}})
        }
    }, [gameBoardDispatch])

    return (
        <>
            <h1>{headerText}</h1>
            <Styled.Container>
                <ControlsBar />            
                <Styled.GameBoard width={width} height={height}>
                    {gameBoardState.map((row: Cell[]) => 
                        row.map((cell: Cell) => 
                            <CellSquare 
                                key={`(${cell.x},${cell.y})`}                       
                                isVisible={cell.isVisible}
                                isFlagged={cell.isFlagged}
                                hasMine={cell.hasMine}
                                neighborMines={cell.neighborMines}
                                x = {cell.x}
                                y = {cell.y}
                                handleClick={handleClickCell}                                      
                            />
                            )
                        )
                    }
                </Styled.GameBoard>
            </Styled.Container>
        </>
    )
}

export default React.memo(GameBoard);
