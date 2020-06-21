import React, { Dispatch } from 'react'
import { Styled } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { GameBoardActions } from '../../redux/actions/GameBoardActions';
import { AppState } from '../../redux/reducers/rootReducer';
import Timer from './Timer';

const ControlsBar: React.FC = () => {
    const gameBoardDispatch = useDispatch<Dispatch<GameBoardActions>>();
    const { unflaggedMines } = useSelector((state: AppState) => state.gameBoard)

    const handleCreateNewGame = () => {
        gameBoardDispatch({type: 'CREATE_NEW_GAME_BOARD'})
    }
    
    return (
        <Styled.ControlsBar>  
            <Styled.MinesDisplay>{unflaggedMines}</Styled.MinesDisplay>         
            <Styled.Button onClick={() => handleCreateNewGame()}>new game</Styled.Button> 
            <Timer />
        </Styled.ControlsBar>
    )
}

export default React.memo(ControlsBar)
