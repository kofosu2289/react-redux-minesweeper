interface ICreateNewGameBoardAction {
  type: "CREATE_NEW_GAME_BOARD",
  height: number,
  width: number,
  mines: number,
}

export type GameBoardActions =
| ICreateNewGameBoardAction