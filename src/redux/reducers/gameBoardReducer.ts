import { GameBoardActions } from '../actions/GameBoardActions';
import { Cell, createGameBoardState } from '../../utils';

type GameBoardState = {
    height: number,
    width: number,
    mines: number,
    cells: Cell[][],
}

const initialgameBoardState = {
    height: 10,
    width: 10,
    mines: 10,
    cells: createGameBoardState(10, 10, 10),
}

const gameBoardReducer = (state: GameBoardState = initialgameBoardState, action: GameBoardActions) => {
    switch(action.type) {
        case 'CREATE_NEW_GAME_BOARD':
            return {
                ...state,
                cells: createGameBoardState(state.width, state.height, state.mines),
            }
        default:
            return state;
    }
}

export default gameBoardReducer;