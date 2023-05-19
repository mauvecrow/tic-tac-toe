export default function Square({ value, onSquareClick, isHighlight }) {
  return (
    <button
      className={isHighlight ? "square highlight" : "square"}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
