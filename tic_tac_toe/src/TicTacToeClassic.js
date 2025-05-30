import React, { useState } from "react";

/**
 * Color theme variables
 */
const THEME = {
  primary: "#222831",
  secondary: "#393e46",
  accent: "#00adb5",
  text: "#f8f9fa",
};

/**
 * Inline styles for the game
 */
const styles = {
  wrapper: {
    minHeight: "100vh",
    background: THEME.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter','Roboto','Helvetica','Arial',sans-serif",
  },
  container: {
    background: THEME.secondary,
    borderRadius: "18px",
    padding: "40px 32px 32px 32px",
    boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: THEME.accent,
    fontSize: "2.1rem",
    marginBottom: "6px",
    fontWeight: 700,
    letterSpacing: "0.03em",
  },
  status: {
    margin: "10px 0 20px 0",
    fontSize: "1.2rem",
    fontWeight: 500,
    color: THEME.text,
    minHeight: "1.7em",
    textAlign: "center",
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 64px)",
    gridTemplateRows: "repeat(3, 64px)",
    gap: "12px",
    marginBottom: "26px",
    background: THEME.secondary,
    padding: "10px",
    borderRadius: "18px",
    boxShadow: "0 1px 8px rgba(0,0,0,0.08)",
  },
  cell: {
    width: "64px",
    height: "64px",
    background: THEME.primary,
    border: `2.5px solid ${THEME.accent}`,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5rem",
    color: THEME.accent,
    fontWeight: 700,
    cursor: "pointer",
    userSelect: "none",
    transition: "background 0.15s",
  },
  cellDisabled: {
    background: "#444851",
    cursor: "default",
    color: "#8Ed7dB",
  },
  resetButton: {
    marginTop: "6px",
    padding: "10px 32px",
    fontSize: "1.05rem",
    background: THEME.accent,
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.02em",
    boxShadow: "0 0.5px 3px rgba(0,0,0,0.06)",
    transition: "background 0.16s",
  },
  resetButtonHover: {
    background: "#008f9c",
  }
};

/**
 * Utility to check for a win condition.
 * Returns {winner: "X"|"O"|null, line: [number,number,number]|null}
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diags
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line };
    }
  }
  return { winner: null, line: null };
}

/**
 * PUBLIC_INTERFACE
 * Main container for the TicTacToe Classic game.
 */
function TicTacToeClassic() {
  // "X" starts first
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isResetHover, setIsResetHover] = useState(false);

  // Game logic
  const { winner, line } = calculateWinner(squares);
  const isDraw = !winner && squares.every((sq) => sq !== null);

  let statusMessage = "";
  if (winner) statusMessage = `Winner: ${winner}`;
  else if (isDraw) statusMessage = "It's a draw!";
  else statusMessage = `Next Turn: ${xIsNext ? "X" : "O"}`;

  // Handler for clicking a cell
  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (squares[idx] || winner || isDraw) return;
    const squaresNext = squares.slice();
    squaresNext[idx] = xIsNext ? "X" : "O";
    setSquares(squaresNext);
    setXIsNext((prev) => !prev);
  }

  // Handler for resetting the game
  // PUBLIC_INTERFACE
  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.title}>Tic Tac Toe Classic</div>
        <div style={styles.status}>
          {statusMessage}
        </div>
        <div style={styles.board}>
          {squares.map((val, idx) => {
            let cellStyle = { ...styles.cell };
            // Highlight win line
            if (winner && line && line.includes(idx)) {
              cellStyle = {
                ...cellStyle,
                background: THEME.accent,
                color: "#fff",
              };
            }
            // Disable cell if game over or occupied
            if (val || winner || isDraw) {
              cellStyle = {
                ...cellStyle,
                ...styles.cellDisabled,
              };
            }
            return (
              <div
                key={idx}
                style={cellStyle}
                onClick={() => handleCellClick(idx)}
                aria-label={`cell-${idx} ${val || ""}`}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (!val && !winner && !isDraw && (e.key === "Enter" || e.key === " ")) {
                    handleCellClick(idx);
                  }
                }}
              >
                {val}
              </div>
            );
          })}
        </div>
        <button
          style={{
            ...styles.resetButton,
            ...(isResetHover ? styles.resetButtonHover : {}),
          }}
          onClick={handleReset}
          onMouseEnter={() => setIsResetHover(true)}
          onMouseLeave={() => setIsResetHover(false)}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default TicTacToeClassic;
