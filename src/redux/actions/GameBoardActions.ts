import { GameState } from "../reducers/gameBoardReducer";
import { Cell } from "../../utils";

interface ICreateNewGameBoardAction {
    readonly type: "CREATE_NEW_GAME_BOARD",
}

interface ISetGameStateAction {
    readonly type: "SET_GAME_STATE",
    payload: GameState
}

interface ISetGameBoardStateAction {
    readonly type: "SET_GAME_BOARD_STATE",
    payload: Cell[][];
}

interface ILeftClickCellAction {
    readonly type: "LEFT_CLICK_CELL",
    payload: Cell;
}

interface IRightClickCellAction {
    readonly type: "RIGHT_CLICK_CELL",
    payload: Cell;
}

export type GameBoardActions =
| ICreateNewGameBoardAction
| ISetGameStateAction
| ISetGameBoardStateAction
| ILeftClickCellAction
| IRightClickCellAction