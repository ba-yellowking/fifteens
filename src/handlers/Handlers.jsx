import {shuffleTiles} from "../utils/ShuffleTiles.jsx";
import {moveTile} from "../utils/MoveTile.jsx";

// Перемешиваем массив
export const handleShuffleTiles = (setTiles, tiles, boardState, setGameState, setBoardState, setMoveCounter, setTime, setVictoryState) => {
  shuffleTiles(setTiles);
  setGameState("started");
  setBoardState("active");
  setMoveCounter(0);
  setTime(0);
  setVictoryState("notAchieved");
};

// Пауза. Функциональное обновление (см. return) - используем текущее значение isPaused, setIsPaused
export const handlePause = (isPaused, setIsPaused, setGameState, setBoardState, boardState, gameState) => {
  setIsPaused(prev => {
    const newPaused = !prev;
    setGameState(newPaused ? "paused" : "started");
    return newPaused;
  });

  if (gameState === "paused") {
    setBoardState("inactive")
  } else {
    setBoardState("active")
  }
};

// Выход из игры. Сброс времени, ходов, возврат на начальный экран
export const handleExit = (setBoardState, setGameState, setTime, setMoveCounter, setTiles, setVictoryState, setIsPaused) => {
  setGameState("stopped");
  setBoardState("inactive");
  setVictoryState("notAchieved")
  setMoveCounter(0);
  setTime(0);
  setTiles([
    ["⠀", "⠀", "⠀", "⠀"],
    ["⠀", "⠀", "⠀", "⠀"],
    ["⠀", "⠀", "⠀", "⠀"],
    ["⠀", "⠀", "⠀", 0]
  ]);
  setIsPaused(false);
};

export const handleTileClick = (
  rowIndex, colIndex, tiles, setTiles, gameState, setBoardState, setMoveCounter, victoryState, setVictoryState,
  showInputLeader, setShowInputLeader
) => {
  moveTile(
    rowIndex, colIndex, tiles, setTiles, gameState, setBoardState, setMoveCounter, victoryState, setVictoryState,
    showInputLeader, setShowInputLeader
  );
};