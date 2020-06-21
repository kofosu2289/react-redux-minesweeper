import React from 'react'
import { Styled } from './styles';
import CellSquare from './CellSquare';
import ControlsBar from './ControlsBar';
import { Cell } from '../../utils';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';

const GameBoard: React.FC = () => {
    const { width, height, cells: gameBoardState, headerText } = useSelector((state: AppState) => state.gameBoard)

    return (
        <>
            <h1>{headerText}</h1>
            <Styled.Container>
                <ControlsBar />            
                <Styled.GameBoard width={width} height={height}>
                    {gameBoardState.map((row: Cell[]) => 
                        row.map((cell: Cell) => 
                            <CellSquare 
                                key={`(${cell.x},${cell.y})`}                       
                                cell={cell}                                        
                            />
                            )
                        )
                    }
                </Styled.GameBoard>
            </Styled.Container>
        </>
    )
}

export default React.memo(GameBoard);
