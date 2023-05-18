import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // console.log("handleClick - input: " + i);
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares, i);
  }

  const winner = calculateWinner(squares);
  let status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");

  return (
    <>
      <div className="status">{status}</div>
      {buildRows(3, 3)}
    </>
  );

  function buildSquares(numOfCells, index, offset) {
    let cells = [];
    for (let j = 0; j < numOfCells; j++) {
      let keyValue = j + index + offset;
      cells.push(
        <Square
          key={keyValue}
          value={squares[keyValue]}
          onSquareClick={() => handleClick(keyValue)}
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
      return squares[a];
    }
  }
  return null;
}
