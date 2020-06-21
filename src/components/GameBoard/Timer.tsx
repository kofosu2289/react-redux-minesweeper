import React, { useEffect, useState } from 'react'
import { Styled } from './styles'
import { useSelector } from 'react-redux'
import { AppState } from '../../redux/reducers/rootReducer'
import { GameState } from '../../redux/reducers/gameBoardReducer'

const Timer = () => {
    const { gameState } = useSelector((state: AppState) => state.gameBoard)
    const [ seconds, setSeconds ] = useState<number>(0); 
    
    useEffect(() => {
        let interval: number = 0;

        if(gameState === GameState.Start) {
            clearInterval(interval);
            setSeconds(0);
        }

        if(gameState === GameState.Playing) {
            interval = setInterval(() => {
                setSeconds(s => s + 1)
            }, 1000)
        }

        if(gameState === GameState.Win || gameState === GameState.Lose) {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        }
    }, [gameState])

    let s = seconds % 60;
    let m = Math.floor(seconds / 60);
    let h = Math.floor(m / 60);

    let timeString = `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`

    return (
        <Styled.Timer>
            {timeString}
        </Styled.Timer>
    )
}

export default Timer
