import React, { useCallback, Dispatch } from 'react'
import { Styled } from './styles';
import CellSquare from './CellSquare';
import ControlsBar from './ControlsBar';
import { Cell, showNeighbors, isWinConditionMet, revealGameBoard } from '../../utils';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import { GameBoardActions } from '../../redux/actions/GameBoardActions';
import { GameState } from '../../redux/reducers/gameBoardReducer';

const GameBoard: React.FC = () => {
    const { width, height, gameState, cells: gameBoardState, headerText } = useSelector((state: AppState) => state.gameBoard)
    const gameBoardDispatch = useDispatch<Dispatch<GameBoardActions>>();

    const handleClickCellSquare = useCallback((e: React.MouseEvent<HTMLDivElement>, cell: Cell) => {
        e.preventDefault();
        if(gameState === GameState.Playing) {
            let tempGameBoardState: Cell[][] = _.cloneDeep(gameBoardState);
            let tempCell: Cell = tempGameBoardState[cell.x][cell.y];

            // handle left click
            if(e.type === "click" && !tempCell.isFlagged) {
        
                tempCell.isVisible = true;

                if(tempCell.hasMine) {
                    revealGameBoard(tempGameBoardState);
                    gameBoardDispatch({type: 'SET_GAME_STATE', payload: GameState.Lose})
                } 
                else {
                    showNeighbors(tempGameBoardState, cell); 

                    if(isWinConditionMet(tempGameBoardState)) {
                        gameBoardDispatch({type: 'SET_GAME_STATE', payload: GameState.Win})
                    }
                }        
    
            // handle right click
            } else if(e.type === "contextmenu") {   
                tempCell.isFlagged = !tempCell.isFlagged;
            }
    
            gameBoardDispatch({type: 'SET_GAME_BOARD_STATE', payload: tempGameBoardState})

        }
        
    }, [gameBoardState, gameState, gameBoardDispatch]);
    
    const handleCreateNewGame = (): void => {
        gameBoardDispatch({type: 'CREATE_NEW_GAME_BOARD'})
    }

    return (
        <>
        <h1>{headerText}</h1>
        <Styled.Container>
            <ControlsBar handleCreateNewGame={handleCreateNewGame}/>
            
            <Styled.GameBoard width={width} height={height}>
                {gameBoardState.map((row: Cell[]) => 
                    row.map((cell: Cell) => 
                        <CellSquare 
                            key={`(${cell.x},${cell.y})`}                       
                            cell={cell}  
                            handleClickCellSquare={handleClickCellSquare}         
                        />
                        )
                    )
                }
            </Styled.GameBoard>
        </Styled.Container>
        </>
    )
}

export default GameBoard;
