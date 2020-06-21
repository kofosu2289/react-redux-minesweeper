import styled, { css } from 'styled-components';

type GameBoardProps = {
  width: number;
  height: number;
}
const GameBoard = styled.div(({width, height}: GameBoardProps) => css`
  display: grid;
  grid-template-columns: repeat(${width}, 1fr);
  grid-template-rows: repeat(${height}, 1fr);
  gap: 1px;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  border: 1px solid red;
  padding: 20px;
`);

type CellSquareProps = {
  hasMine: boolean;
  isVisible: boolean;
}

const CellSquare = styled.div(({ hasMine, isVisible }: CellSquareProps) => css`
  display: flex;
  background: ${hasMine && isVisible ? "red" : "white"};
  justify-content: center;
  align-items: center;
  border: 1px solid red;

  &:hover {
    cursor: pointer;
  }
`);


export const Styled = { 
  GameBoard,
  CellSquare
}