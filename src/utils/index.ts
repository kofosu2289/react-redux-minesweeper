export type Cell = {
  hasMine: boolean;
  isVisible: boolean;
  neighborMines: number;
  x: number;
  y: number;
}

export const getNeighbors = (gameState: Cell[][], cell: Cell): Cell[] => {
  let neighbors: Cell[] = [];

  for(let x = -1; x <= 1; x++) {
    for(let y = -1; y <= 1; y++) {
      if(cell.x + x < 0 || cell.x + x >= gameState.length) continue;
      if(cell.y + y < 0 || cell.y + y >= gameState[0].length) continue;
      if(x === 0 && y === 0) continue;
      neighbors.push(gameState[cell.x + x][cell.y + y])
    }
  }
  return neighbors;
}

export const calculateNeighborMines = (gameState: Cell[][], cell: Cell): number => {
  const neighborsArr: Cell[] = getNeighbors(gameState, cell)
  
  let neighborMines: number = 0;
  
  neighborsArr.forEach(neighbor => {
    if(neighbor.hasMine) neighborMines++
  })

  return neighborMines;
}

export const createGameState = (width: number, height: number, mines: number): Cell[][] => {

  const state: Cell[][] = new Array(height);
  const totalCells: number = width * height;    

  let currentMines: number = mines;
  let cellsChecked: number = 0;

  for (let x = 0; x < height; x++) {
    state[x] = new Array(width)
    for(let y = 0; y < width; y++) {
      if(Math.random() * (totalCells - cellsChecked) < currentMines) {
        state[x][y] = {
          hasMine: true,
          isVisible: false,
          neighborMines: 0,
          x,
          y,
        };
        currentMines--;
      }
      else {
        state[x][y] = {
          hasMine: false,
          isVisible: false,
          neighborMines: 0,
          x,
          y,
        };
      }
      cellsChecked++;
    }
  }

  state.forEach(row => row.forEach(cell => {
    cell.neighborMines = calculateNeighborMines(state, cell)
  }))

  return state;
}