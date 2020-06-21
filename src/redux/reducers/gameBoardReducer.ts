import { GameBoardActions } from '../actions/GameBoardActions';
import { Cell, createGameBoardState } from '../../utils';

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

        default:
            return state;
    }
}

export default gameBoardReducer;