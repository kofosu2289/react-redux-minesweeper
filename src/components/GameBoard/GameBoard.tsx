import React, { useState, useCallback } from 'react'
import { Styled } from './styles';
import CellSquare from './CellSquare';
import { Cell, createGameState, getNeighbors } from '../../utils';
import _ from 'lodash';

type GameBoardProps = { 
  width: number,
  height: number,
  mines: number
}

const GameBoard: React.FC<GameBoardProps> = ({width, height, mines}) => {
  const [gameState, setGameState] = useState<Cell[][]>(createGameState(width, height, mines));

  const handleClickCellSquare = useCallback((cell: Cell) => {
    let tempGameState = _.cloneDeep(gameState);

    // set clicked CellSquare to visible
    tempGameState[cell.x][cell.y].isVisible = true;

    const showNeighbors = (gameState: Cell[][], cell: Cell) => {
      const neighborsArr: Cell[] = getNeighbors(gameState, cell)
    
      // check if any neighbors have a mine
      let nearbyMine = false;
    
      neighborsArr.forEach(neighbor => {
        if(neighbor.hasMine) nearbyMine = true;
      })
            
      // TODO: set to visible all neighbor cells that dont have mines
      if(!nearbyMine) {
        neighborsArr.forEach(neighbor => {
          if(neighbor.neighborMines === 0 && !neighbor.isVisible && !neighbor.hasMine) {
            neighbor.isVisible = true;
            showNeighbors(gameState, neighbor)
          }
          else if (!neighbor.hasMine && !neighbor.isVisible) {
            neighbor.isVisible = true;
          }
                   
        })
      }

    }

    showNeighbors(tempGameState, cell)

    setGameState(tempGameState);
  }, [gameState, setGameState]);
    
  return (
    <Styled.GameBoard width={width} height={height}>
      {gameState.map((row: Cell[]) => 
        row.map((cell: Cell) => 
          <CellSquare 
            key={`(${cell.x},${cell.y})`}                       
            cell={cell}  
            handleClickCellSquare={handleClickCellSquare}         
          />
        )
      )}
    </Styled.GameBoard>
  )
}

export default GameBoard
