import React, { useState, useCallback } from 'react'
import { Styled } from './styles';
import CellSquare from './CellSquare';
import { Cell, createGameBoardState, showNeighbors, isWinConditionMet, revealGameBoard } from '../../utils';
import _ from 'lodash';

enum GameState {
    Win,
    Lose,
    Playing
}

const GameBoard: React.FC = () => {
    const [gameDetails, setGameDetails] = useState({
        width: 10,
        height: 10,
        mines: 10,
    });

    const { width, height, mines } = gameDetails;
    const [gameBoardState, setGameBoardState] = useState<Cell[][]>(createGameBoardState(width, height, mines));
    const [gameState, setGameState] = useState<GameState>(GameState.Playing);

    const handleClickCellSquare = useCallback((e: React.MouseEvent<HTMLDivElement>, cell: Cell) => {
        e.preventDefault();
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
        
    }, [gameBoardState, setGameBoardState, gameState, setGameState]);
    
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
        <Styled.Container>
            <h1>{header}</h1>
            <Styled.Button onClick={handleCreateNewGame}>new game</Styled.Button>
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
    )
}

export default React.memo(GameBoard);
