import {fisherYates} from "./FisherYates.jsx";
import {twoDArray} from "./TwoDimensionArray.jsx";
import {isSolvable} from "./IsSolvable.jsx";

// Формирование перемешанной доски
export function shuffleTiles(setTiles) {
  let newTiles;
  do { // Цикл перемешивает поле до тех пор, пока isSolvable не станет true
    const shuffled = fisherYates();
    newTiles = twoDArray(shuffled);
  } while (!isSolvable(newTiles));
  setTiles(newTiles); // setTiles устанавливает правильное значение один раз, когда isSolvable = true
}