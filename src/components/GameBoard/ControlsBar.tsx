import React, { Dispatch } from 'react'
import { Styled } from './styles';
import { useDispatch } from 'react-redux';
import { GameBoardActions } from '../../redux/actions/GameBoardActions';

const ControlsBar: React.FC = () => {
    const gameBoardDispatch = useDispatch<Dispatch<GameBoardActions>>();

    const handleCreateNewGame = () => {
        gameBoardDispatch({type: 'CREATE_NEW_GAME_BOARD'})
    }
    
    return (
        <Styled.ControlsBar>            
            <Styled.Button onClick={() => handleCreateNewGame()}>new game</Styled.Button> 
        </Styled.ControlsBar>
    )
}

export default React.memo(ControlsBar)
