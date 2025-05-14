import {findEmptyTile} from "./FindEmptyTile.jsx";

// Передвижение числа в пустую ячейку
export function moveTile(row, col, tiles, setTiles, gameState) {
  const emptyTile = findEmptyTile(tiles);
  const emptyRow = emptyTile.row;
  const emptyCol = emptyTile.col;

  if (gameState === "started") {
    if (
      row === emptyRow && (col === emptyCol - 1 || col === emptyCol + 1) ||
      col === emptyCol && (row === emptyRow - 1 || row === emptyRow + 1)
    ) {
      const newTiles = [...tiles];
      newTiles[emptyRow][emptyCol] = newTiles[row][col];
      newTiles[row][col] = 0;
      setTiles(newTiles);
    }
  }
}