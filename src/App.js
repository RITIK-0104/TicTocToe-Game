import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({
    Blue: 0,
    Red: 0,
    Draw: 0,
  });

  useEffect(() => {
    const storedScores = localStorage.getItem('ticTacToeScores');
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'Blue' : 'Red';

    if (calculateWinner(newBoard)) {
      setScores({ ...scores, [newBoard[i]]: scores[newBoard[i]] + 1 });
    } else if (newBoard.every((square) => square !== null)) {
      setScores({ ...scores, Draw: scores.Draw + 1 });
    }

    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const status = calculateWinner(board)
    ? `Winner: ${calculateWinner(board)}`
    : board.every((square) => square !== null)
    ? 'Draw'
    : `Next player: ${xIsNext ? 'Blue' : 'Red'}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  useEffect(() => {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
  }, [scores]);

  return (
    <div className="app">
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <div className="board">
            {board.map((square, i) => (
              <div
                key={i}
                className={`square ${square}`}
                onClick={() => handleClick(i)}
              >
                {square}
              </div>
            ))}
          </div>
          <button onClick={resetGame}>Reset Game</button>
        </div>
        <div className="game-info">
          <div>
            <span className="score">Blue: {scores.Blue}</span>
          </div>
          <div>
            <span className="score">Red: {scores.Red}</span>
          </div>
          <div>
            <span className="score">Draw: {scores.Draw}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
