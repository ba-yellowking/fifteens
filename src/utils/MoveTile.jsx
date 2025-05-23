import {findEmptyTile} from "./FindEmptyTile.jsx";

// Передвижение числа в пустую ячейку
export function moveTile(
  row, col, tiles, setTiles, gameState, setBoardState, setMoveCounter, victoryState, setVictoryState, inputLeader,
  setInputLeader) {

  const victoryPattern = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
  ];

  if (victoryState === "achieved") return;

  const emptyTile = findEmptyTile(tiles);
  const emptyRow = emptyTile.row;
  const emptyCol = emptyTile.col;

  if (gameState === "started" && gameState !== "paused") {
    if (
      row === emptyRow && (col === emptyCol - 1 || col === emptyCol + 1) ||
      col === emptyCol && (row === emptyRow - 1 || row === emptyRow + 1)
    ) {
      const newTiles = [...tiles];
      newTiles[emptyRow][emptyCol] = newTiles[row][col];
      newTiles[row][col] = 0;
      setTiles(newTiles);
      if (victoryState !== "achieved") {
        setMoveCounter(prev => prev + 1);
      }
      setBoardState("active");

      // Логика победы
      const isVictory = newTiles.every((row, rowIndex) =>
        row.every((tile, colIndex) => tile === victoryPattern[rowIndex][colIndex])
      );
      if (isVictory) {
        setInputLeader(true);
        setVictoryState("achieved");
      }
    }
  } else {
    setBoardState("inactive");
  }
}