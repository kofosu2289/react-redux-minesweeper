import styled, { css } from 'styled-components';
import { Cell } from '../../utils';
import { Theme } from '../../styles/theme';
import tinygradient from 'tinygradient';
import tinycolor from 'tinycolor2';

const cellWidth: number = 30;

type GameBoardProps = {
    width: number;
    height: number;
    theme: Theme;
}

const GameBoard = styled.div(({width, height, theme}: GameBoardProps) => css`
    display: grid;
    grid-template-columns: repeat(${width}, 1fr);
    grid-template-rows: repeat(${height}, 1fr);
    width: ${width * cellWidth}px;
    height: ${height * cellWidth}px;
    margin: 0 auto;  
`);

type CellSquareProps = {
    cell: Cell;
    theme: Theme;
}

const CellSquare = styled.div(({ cell, theme }: CellSquareProps) => {
    let background = theme.grey;
    if(cell.isVisible) background = theme.lightGrey
    if(cell.isVisible && cell.hasMine) background = theme.warn;

    const gradient = tinygradient(tinycolor(theme.primary), tinycolor(theme.warn));
    const colors: tinycolor.Instance[] = gradient.rgb(7);
    let color: string = theme.dark;
    if(cell.neighborMines > 0) {
        color = colors[cell.neighborMines - 1].toHexString()
    }

    return css`
    color: ${color};
    display: flex;
    background: ${background};
    justify-content: center;
    align-items: center;
    ${cell.isVisible && `
    border-top: ${cell.x === 0 ? `1px solid ${theme.darkGrey}` : 0};
    border-left: ${cell.y === 0 ? `1px solid ${theme.darkGrey}` : 0};
    border-right: 1px solid ${theme.darkGrey};
    border-bottom: 1px solid ${theme.darkGrey};`
    }   
    box-shadow: ${!cell.isVisible ? `inset 1px 1px 1px ${theme.light}, inset -1px -1px 0px ${theme.dark}` : 0};

    &:hover {
        cursor: pointer;
    }

    img {
        width: ${cellWidth/2}px;
    }
`});

type ButtonProps = {
    theme: Theme,
}

const Button = styled.button(({ theme }: ButtonProps) => css`
    margin-bottom: 10px;
    border: 1px solid ${theme.darkGrey};
    border-radius: 0;
    padding: 5px 10px;
    background: ${theme.grey};
    box-shadow: inset 1px 1px 1px ${theme.light}, inset -1px -1px 0px ${theme.dark};
    color: ${theme.dark};

    &:focus {
        outline: none;
    }

    &:active {
        box-shadow: none;
        background: ${theme.lightGrey};
    }
`);

type ContainerProps = {
    theme: Theme,
}

const Container = styled.div(({ theme }: ContainerProps) => css`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${theme.grey};
    padding: 20px;
    box-shadow: inset 1px 1px 1px ${theme.light}, inset -1px -1px 0px ${theme.dark};
    border: 2px solid ${theme.primary};

    h1 {
        color: ${theme.warn};
    }
`);

type ControlsBarProps = {
    theme: Theme,
}

const ControlsBar = styled.div(({ theme }: ControlsBarProps) => css`
    display: flex;
    justify-content: center;
`);

export const Styled = { 
    GameBoard,
    CellSquare, 
    Button,
    Container,
    ControlsBar,
}