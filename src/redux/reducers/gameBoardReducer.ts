import _ from 'lodash';
import { GameBoardActions } from '../actions/GameBoardActions';
import { Cell, createGameBoardState, revealGameBoard, showNeighbors, isWinConditionMet } from '../../utils';

export enum GameState {
    Start,
    Win,
    Lose,
    Playing
}

type GameBoardState = {
    gameState: GameState,
    height: number,
    width: number,
    mines: number,
    cells: Cell[][],
    headerText: string,
}

const initialgameBoardState = {
    gameState: GameState.Playing,
    height: 10,
    width: 10,
    mines: 10,
    cells: createGameBoardState(10, 10, 10),
    headerText: "Minesweeper",
}

const gameBoardReducer = (state: GameBoardState = initialgameBoardState, action: GameBoardActions) => {
    switch(action.type) {

        case 'CREATE_NEW_GAME_BOARD':
            return {
                ...state,
                cells: createGameBoardState(state.width, state.height, state.mines),
                gameState: GameState.Playing,
                headerText: "Minesweeper",
            }

        case 'SET_GAME_STATE':
            let headerText;
            switch(action.payload) {
                case GameState.Lose: 
                    headerText = "You Lose!"
                    break;
                case GameState.Win:
                    headerText = "You Win!"
                    break;
                default: headerText = "Minesweeper"
            }
            return {
                ...state,
                gameState: action.payload,
                headerText,
            }

        case 'SET_GAME_BOARD_STATE':
            return {
                ...state,
                cells: action.payload,
            }
        
        case 'LEFT_CLICK_CELL': {
            let tempCells = _.cloneDeep(state.cells);
            let tempCell = tempCells[action.payload.x][action.payload.y];

            if(!tempCell.isFlagged && state.gameState === GameState.Playing) {
        
                tempCell.isVisible = true;

                if(tempCell.hasMine) {
                    revealGameBoard(tempCells);
                    return {
                        ...state,
                        cells: tempCells,
                        gameState: GameState.Lose,
                        headerText: "You Lose!",
                    }
                } 
                else {
                    showNeighbors(tempCells, tempCell); 

                    if(isWinConditionMet(tempCells)) {
                        return {
                            ...state,
                            cells: tempCells,
                            gameState: GameState.Win,
                            headerText: "You Win!",
                        }
                    }
                }  
            }
            return {
                ...state,
                cells: tempCells,
            }
        }

        case 'RIGHT_CLICK_CELL': {
            let tempCells = _.cloneDeep(state.cells);
            let tempCell = tempCells[action.payload.x][action.payload.y]
            if(state.gameState === GameState.Playing) {
                tempCell.isFlagged = !tempCell.isFlagged;
            }
            return {
                ...state,
                cells: tempCells,
            }
        }

        default:
            return state;
    }
}

export default gameBoardReducer;