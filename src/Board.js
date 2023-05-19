import { useState } from "react";
import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
  const initStyle = Array(9).fill(false);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);
  let status = winner
    ? "Winner " + squares[winner[0]] + "!"
    : turnCount() < 9
    ? "Next player: " + (xIsNext ? "X" : "O")
    : "Draw Game!";

  function turnCount() {
    const newSq = squares.slice();
    return newSq
      .map((e) => {
        if (e === "X" || e === "O") {
          return 1;
        } else return 0;
      })
      .reduce((prev, cur) => prev + cur, 0);
  }

  let styles = winner ? applyStyles(winner) : initStyle;

  return (
    <>
      <div className="status">{status}</div>
      {buildRows(3, 3)}
    </>
  );
  //----------------------------------------------------------------------
  function applyStyles(trio) {
    let result = initStyle.slice();
    trio.forEach((e) => (result[e] = true));
    return result;
  }
  function buildSquares(numOfCells, index, offset) {
    let cells = [];
    for (let j = 0; j < numOfCells; j++) {
      let keyValue = j + index + offset;
      cells.push(
        <Square
          key={keyValue}
          value={squares[keyValue]}
          onSquareClick={() => handleClick(keyValue)}
          isHighlight={styles[keyValue]}
        />
      );
    }
    return cells;
  }

  function buildRows(numOfRows, numOfCells) {
    let rows = [];
    let offset = 0;
    for (let i = 0; i < numOfRows; i++) {
      rows.push(
        <div key={"row_" + i} className="board-row">
          {buildSquares(numOfCells, i, offset)}
        </div>
      );
      offset += numOfCells - 1;
    }
    return rows;
  }
}

function calculateWinner(squares) {
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
      // return squares[a];
      return lines[i];
    }
  }
  return null;
}
