import "./App.css";
import Tile from "./ui/Tile.jsx";
import {useState} from "react";

function App() {

  const [tiles, setTiles] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
  ])

  // Генерация массива со случайными элементами (алгоритм Фишера Йейтса)
  function fisherYates() {
    const numbers = Array.from({length: 16}, (_, i) => i);
    // i - это индекс, который начинается с 0. => возвращает индекс, таким образом получается массив от 0 до 15

    for (let i = numbers.length - 1; i > 0; i--) { // Перебор с конца массива до i > 0
      const j = Math.floor(Math.random() * (i + 1));
      // Math.floor() - округляет в меньшую сторону
      // Math.random() - возвращает случайное число от 0.0000 до 0.9999
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]] // Перестановка
    }
    return numbers;
  }

  // Массив от 0 до 15 необходимо превратить в двумерный массив
  function twoDimensionArray(numbers) {
    const result = [];
    for (let i = 0; i < 4; i++) { // Одна строка будет содержать 4 числа (0, 1, 2, 3)
      result.push(numbers.slice(i * 4, i * 4 + 4)); // i=0, тогда начинается с 0 и до 0 + 4, то есть [0, 1, 2, 3]
    }
    return result;
  }

  function shuffleTiles() {
    const shuffled = fisherYates();
    const newTiles = twoDimensionArray(shuffled);
    setTiles(newTiles);
  }

  // find an empty tile
  function findEmptyTile() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (tiles[row][col] === 0) {
          return { row: row, col: col}
        }
      }
    }
    // return -1 if the function is invalid
    return { row: -1, col: -1 }
  }

  // move a tile to an empty space
  function moveTile(row, col) {
    const emptyTile = findEmptyTile();
    const emptyRow = emptyTile.row;
    const emptyCol = emptyTile.col;

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

  return (
    <div className="fifteens">
      <div className="container">
        <div className="field">
          {tiles.map((row, rowIndex) => (
            row.map((tile, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                tile={tile}
                onClick={() => moveTile(rowIndex, colIndex)}
              />
            ))
          ))}
        </div>
      </div>
      <button onClick={shuffleTiles}>Start</button>
    </div>
  )
}

export default App
