import {shuffleTiles} from "../utils/ShuffleTiles.jsx";

// Перемешиваем массив
export const handleShuffleTiles = (setTiles, tiles, boardState, setGameState, setBoardState, setMoveCounter) => {
  shuffleTiles(setTiles, tiles, boardState);
  setGameState("started");
  setBoardState("active");
  setMoveCounter(0);
};

// Пауза. Функциональное обновление (см. return) - используем текущее значение isPaused, setIsPaused
export const handlePause = (isPaused, setIsPaused, setGameState, setBoardState) => {
  setIsPaused(prev => {
    const newPaused = !prev;
    setGameState(newPaused ? "paused" : "started");
    return newPaused;
  });
  setBoardState("inactive");
};

// Выход из игры. Сброс времени, ходов, возврат на начальный экран
export const handleExit = (setBoardState, setGameState, setTime, setMoveCounter, setTiles) => {
  setBoardState("");
  setGameState("stopped");
  setTime(0);
  setMoveCounter(0);
  setTiles([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
  ]);
};