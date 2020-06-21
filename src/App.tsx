import React from 'react';
import GameBoard from './components/GameBoard/GameBoard';

function App() {
  return (
    <div>
      <h1>Minesweeper</h1>
      <GameBoard width={10} height={10} mines={10} />
    </div>
  );
}

export default App;