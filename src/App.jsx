import "./App.css";
import Tile from "./ui/tile/Tile.jsx";
import {useEffect, useState} from "react";
import {shuffleTiles} from "./utils/ShuffleTiles.jsx";
import {moveTile} from "./utils/MoveTile.jsx";
import Modal from "./ui/modal/Modal.jsx";
import useModal from "./hooks/useModal.jsx";
import LeaderboardModal from "./components/modals/LeaderboardModal.jsx";
import {formatTimer} from "./utils/FormatTimer.jsx";

function App() {

  // started, paused, stopped
  const [gameState, setGameState] = useState("stopped");
  const [isPaused, setIsPaused] = useState(false);

  // active, inactive
  const [boardState, setBoardState] = useState("");

  // counter
  const [moveCounter, setMoveCounter] = useState(0);

  // timer
  const [time, setTime] = useState(0);
  useEffect(() => {
    let interval;
    if (gameState === "started") {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1_000)
    }
    return () => clearInterval(interval)
  }, [gameState])

  // Лидерборд: хук и открытие модального окна
  const [isLeaderboardOpen, openLeaderboard, closeLeaderboard] = useModal();
  const handleLeaderboard = () => {openLeaderboard();};

  const [tiles, setTiles] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
  ])

  // Перемешиваем массив
  const handleShuffleTiles = () => {
    shuffleTiles(setTiles, tiles, boardState);
    setGameState("started");
    setBoardState("active");
    setMoveCounter(0);
  };

  // Пауза. Функциональное обновление (см. return) - используем текущее значение isPaused, setIsPaused
  const handlePause = () => {
    setIsPaused(prev => {
      const newPaused = !prev;
      setGameState(newPaused ? "paused" : "started");
      return newPaused;
    });
    setBoardState("inactive")
  }

  // Выход из игры. Сброс времени, ходов, возврат на начальный экран
  const handleExit = () => {
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

  return (
    <div className="fifteens">

      <div className="header">
        <button className="btn" onClick={handleLeaderboard}>Top-15</button>
        <div>{`Moves: ${moveCounter}`}</div>
        <div>{`Time: ${formatTimer(time)}`}</div>
      </div>

      <div className="container">
        <div className="field">
          {tiles.map((row, rowIndex) => (
            row.map((tile, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                tile={tile}
                onClick={() => moveTile(
                  rowIndex,
                  colIndex,
                  tiles,
                  setTiles,
                  gameState,
                  setBoardState,
                  setMoveCounter,
                )}
              />
            ))
          ))}
        </div>
      </div>

      <div className="footer">
        <div className="footer">
          {/*Добавляем условие if, поэтому () => {}*/}
          <button className="btn" onClick={() => {
            if (gameState === "stopped") {
              handleShuffleTiles();
            } else {
              handlePause();
            }
          }}>
            {gameState === "stopped"
              ? "Start"
              : isPaused
                ? "Continue"
                : "Pause"}
          </button>

          <button className="btn" onClick={handleExit}>Exit</button>
        </div>

      </div>

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        open={openLeaderboard}
        close={closeLeaderboard}
      />
    </div>
  )
}

export default App
