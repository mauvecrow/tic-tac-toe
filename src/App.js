import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [positionHistory, setPositionHistory] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const [flip, setFlip] = useState(false);

  function handlePlay(nextSquares, input) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextPositions = [
      ...positionHistory,
      `${Math.floor(input / 3) + 1},${(input % 3) + 1}`,
    ];
    setPositionHistory(nextPositions);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    const resetHistory = [...history.slice(0, nextMove + 1)];
    setHistory(resetHistory); //reset history
    setCurrentMove(nextMove);
    const resetPosition = [...positionHistory.slice(0, nextMove)];
    setPositionHistory(resetPosition);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      move = flip ? move : history.length - move;
      description = "Redo turn #" + move;
    } else {
      // description = "Go to game start";
      return;
    }

    return (
      <li key={move}>
        <span>
          {`Played: ${positionHistory[move - 1]} | move=${move}`}
          <button onClick={() => jumpTo(move - 1)}>{description}</button>
        </span>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={() => jumpTo(0)}>Start Over</button>
        <button onClick={() => setFlip(!flip)}>
          {flip ? "Ascending" : "Descending"}
        </button>
        <h3>Current Turn: {currentMove + 1}</h3>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
