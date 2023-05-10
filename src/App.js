import React, { useState } from 'react'
import './App.css';
import { Board } from './components/Board'
import { Scoreboard } from './components/Scoreboard';

const WIN = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 7],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

function App() {
  const [board, setBoard] = useState([null, null, null, null, null, null, null, null, null]);
  const [playerX, setPlayerX] = useState(true);
  const [scores, setScores] = useState({xScore: 0, oScore: 0});
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = (boxIndex) => {
    const newBoard = board.map((value, index) => {
      if (index === boxIndex) {
        return playerX === true ? 'X' : 'O';
      } else {
        return value;
      }
    })
    const winner = checkWin(newBoard);

    if (winner) {
      if (winner === 'O') {
        let {oScore} = scores;
        oScore++;
        setScores(() => ({...scores, oScore}));
      } else {
        let {xScore} = scores;
        xScore++;
        setScores(() => ({...scores, xScore}));
      }
    }

    setBoard(() => newBoard);
    setPlayerX(() => !playerX);
  }

  const checkWin = (board) => {
    for (const winCondition of WIN) {
      const [x, y, z] = winCondition;
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(() => true);
        return board[x];
      }
    }
  }

  const resetGame = (board) => {
    setGameOver(() => false);
    setBoard(() => [null, null, null, null, null, null, null, null, null]);
  }

  return (
    <div className="App">
      <Scoreboard scores={scores} playerX={playerX} />
      <Board board={board} onClick={gameOver ? resetGame : handleBoxClick} />
    </div>
  );
}

export default App;
