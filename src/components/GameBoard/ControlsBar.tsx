import React from 'react'
import { Styled } from './styles';

type ControlsBarProps = {
    handleCreateNewGame: Function;
}

const ControlsBar: React.FC<ControlsBarProps> = ({ handleCreateNewGame }) => {
    return (
        <Styled.ControlsBar>            
            <Styled.Button onClick={() => handleCreateNewGame()}>new game</Styled.Button> 
        </Styled.ControlsBar>
    )
}

export default ControlsBar
