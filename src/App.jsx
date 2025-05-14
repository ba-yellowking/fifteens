import "./App.css";
import Tile from "./ui/tile/Tile.jsx";
import {useEffect, useState} from "react";
import {moveTile} from "./utils/MoveTile.jsx";
import useModal from "./hooks/useModal.jsx";
import LeaderboardModal from "./components/modals/LeaderboardModal.jsx";
import {formatTimer} from "./utils/FormatTimer.jsx";
import {handleShuffleTiles, handlePause, handleExit} from "./handlers/Handlers.js";

function App() {

  const [gameState, setGameState] = useState("stopped"); // started, paused, stopped
  const [isPaused, setIsPaused] = useState(false);
  const [boardState, setBoardState] = useState(""); // active, inactive
  const [moveCounter, setMoveCounter] = useState(0);

  const [isLeaderboardOpen, openLeaderboard, closeLeaderboard] = useModal(); // leaderboard hook
  const handleLeaderboard = () => {openLeaderboard();}; // open modal

  const [time, setTime] = useState(0); // timer
  useEffect(() => {
    let interval;
    if (gameState === "started") {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1_000)
    }
    return () => clearInterval(interval)
  }, [gameState])

  const [tiles, setTiles] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
  ])


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
                onClick={() => moveTile(rowIndex, colIndex, tiles, setTiles, gameState, setBoardState, setMoveCounter)}
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
              handleShuffleTiles(setTiles, tiles, boardState, setGameState, setBoardState, setMoveCounter);
            } else {
              handlePause(isPaused, setIsPaused, setGameState, setBoardState);
            }
          }}>
            {gameState === "stopped"
              ? "Start"
              : isPaused
                ? "Continue"
                : "Pause"}
          </button>

          <button className="btn" onClick={() => {
            handleExit(setBoardState, setGameState, setTime, setMoveCounter, setTiles)
          }}>Exit</button>
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
