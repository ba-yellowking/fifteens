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
  function twoDArray(numbers) {
    const result = [];
    for (let i = 0; i < 4; i++) { // Одна строка будет содержать 4 числа (0, 1, 2, 3)
      result.push(numbers.slice(i * 4, i * 4 + 4)); // i=0, тогда начинается с 0 и до 0 + 4, то есть [0, 1, 2, 3]
    }
    return result;
  }


  // Формирование перемешанной доски
  function shuffleTiles() {
    let newTiles;
    do { // Цикл перемешивает поле до тех пор, пока isSolvable не станет true
      const shuffled = fisherYates();
      newTiles = twoDArray(shuffled);
    } while (!isSolvable(newTiles));
    setTiles(newTiles); // setTiles устанавливает правильное значение один раз, когда isSolvable = true
  }


  // Нахождение пустой ячейки
  function findEmptyTile() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (tiles[row][col] === 0) {
          return { row: row, col: col}
        }
      }
    }
    // Возвращаем -1 если пустая ячейка не найдена
    return { row: -1, col: -1 }
  }


  // Передвижение числа в пустую ячейку
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


  // Проверка на решаемость
  function isSolvable(array2D) {
    const flatArray = array2D.flat(); // Превращаем shuffled array (передаваемый в array2D) в одномерный массив
    const withoutZero = flatArray.filter(n => n !== 0); // Избавляемся от 0 для подсчета инверсий

    let inversions = 0; // Число инверсий
    for (let i = 0; i < withoutZero.length; i++) { // Сравниваем число а и а + 1 (следующее)
      for (let j = i + 1; j < withoutZero.length; j++) {
        if (withoutZero[i] > withoutZero[j]) { // Если первое число больше второго, инверсия +1
          inversions++
        }
      }
    }

    const rowWithZero = array2D.findIndex(row => row.includes(0)); // Индекс строки сверху вниз
    const rowFromBottom = 4 - rowWithZero; // Индекс строки снизу вверх

    // Правило решаемости
    if (4 % 2 === 0) { // 4 - длина поля, если четное, тогда:
      if (rowFromBottom % 2 === 0) { // Если строка с нулем снизу вверх четная:
        return inversions % 2 === 1; // Количество инверсий должно быть нечетное
      } else {
        return inversions % 2 === 0; // И наоборот
      }
    } else {
      return inversions % 2 === 0; // Если поле меньше, достаточно условия, что количество инверсий четное
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
