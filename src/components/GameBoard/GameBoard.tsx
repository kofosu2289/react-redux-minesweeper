import React, { useState, useCallback, Dispatch } from 'react'
import { Styled } from './styles';
import CellSquare from './CellSquare';
import ControlsBar from './ControlsBar';
import { Cell, createGameBoardState, showNeighbors, isWinConditionMet, revealGameBoard } from '../../utils';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { UIActions } from '../../redux/actions/UIActions';
import { AppState } from '../../redux/reducers/rootReducer';

enum GameState {
    Start,
    Win,
    Lose,
    Playing
}

const GameBoard: React.FC = () => {
    const { width, height, mines } = useSelector((state: AppState) => state.gameBoard)

    const [gameBoardState, setGameBoardState] = useState<Cell[][]>(createGameBoardState(width, height, mines));
    const [gameState, setGameState] = useState<GameState>(GameState.Playing);
    const UIDispatch = useDispatch<Dispatch<UIActions>>();

    const handleClickCellSquare = useCallback((e: React.MouseEvent<HTMLDivElement>, cell: Cell) => {
        e.preventDefault();
        UIDispatch({ type: 'TEST', payload: 'it works!'})
        if(gameState === GameState.Playing) {
            let tempGameBoardState = _.cloneDeep(gameBoardState);
            let tempCell: Cell = tempGameBoardState[cell.x][cell.y];

            // handle left click
            if(e.type === "click" && !tempCell.isFlagged) {
        
                tempCell.isVisible = true;

                if(tempCell.hasMine) {
                    revealGameBoard(tempGameBoardState);
                    setGameState(GameState.Lose);
                } 
                else {
                    showNeighbors(tempGameBoardState, cell); 

                    if(isWinConditionMet(tempGameBoardState)) {
                        setGameState(GameState.Win);
                    }
                }        
    
            // handle right click
            } else if(e.type === "contextmenu") {   
                tempCell.isFlagged = !tempCell.isFlagged;
            }
    
            setGameBoardState(tempGameBoardState);

        }
        
    }, [gameBoardState, setGameBoardState, gameState, setGameState, UIDispatch]);
    
    const handleCreateNewGame = (): void => {
        setGameBoardState(createGameBoardState(width, height, mines));
        setGameState(GameState.Playing);
    }

    let header: string;
    switch(gameState) {
        case GameState.Lose: 
            header = "You Lose!"
            break;
        case GameState.Win:
            header = "You Win!"
            break;
        default: header = "Minesweeper"
    }

    return (
        <>
        <h1>{header}</h1>
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
