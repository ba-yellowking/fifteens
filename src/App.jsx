import "./App.css";
import Tile from "./ui/tile/Tile.jsx";
import {useEffect, useState} from "react";
import {moveTile} from "./utils/MoveTile.jsx";
import useModal from "./hooks/useModal.jsx";
import LeaderboardModal from "./components/modals/LeaderboardModal.jsx";
import {formatTimer} from "./utils/FormatTimer.jsx";
import {handleShuffleTiles, handlePause, handleExit} from "./handlers/Handlers.jsx";
import InputLeaderboardModal from "./components/modals/InputLeaderboardModal.jsx";

function App() {

  const [gameState, setGameState] = useState("stopped"); // started, paused, stopped
  const [boardState, setBoardState] = useState("inactive"); // active, inactive
  const [victoryState, setVictoryState] = useState("notAchieved"); // achieved, notAchieved

  const [moveCounter, setMoveCounter] = useState(0); // moves
  const [time, setTime] = useState(0); // timer

  const [isLeaderboardOpen, openLeaderboard, closeLeaderboard] = useModal(); // leaderboard hook

  const [isPaused, setIsPaused] = useState(false);
  const handleLeaderboard = () => {openLeaderboard();}; // open modal
  const [showInputLeader, setShowInputLeader] = useState(false);


  const victoryPattern = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
  ];


  // timer
  useEffect(() => {
    let interval;
    if (gameState === "started") {
      interval = setInterval(() => {
        setTime(prev => {
          if (victoryState !== "achieved") {
            return prev + 1;
          }
          return prev;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState, victoryState]);


  // default board
  const [tiles, setTiles] = useState([
    ["⠀", "⠀", "⠀", "⠀"],
    ["⠀", "⠀", "⠀", "⠀"],
    ["⠀", "⠀", "⠀", "⠀"],
    ["⠀", "⠀", "⠀", 0]
  ]);


  return (
    <div className="fifteens">

      <div className="header">
        <button className="btn" onClick={handleLeaderboard}>Top-15</button>
        <div className="results">
          <p className="results-moves">{`Moves: ${moveCounter}`}</p>
          <p className="results-time">{`Time: ${formatTimer(time)}`}</p>
        </div>
      </div>

      <div className="container">
        <div className="field">
          {tiles.map((row, rowIndex) => (
            row.map((tile, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                tile={tile}
                onClick={() => moveTile(rowIndex, colIndex, tiles, setTiles, gameState, setBoardState, setMoveCounter, victoryState, setVictoryState, victoryPattern, showInputLeader, setShowInputLeader)}
              />
            ))
          ))}
        </div>
      </div>

      <div className="footer">
        {/*Добавляем условие if, поэтому () => {}*/}
        <button className="btn" onClick={() => {
          if (gameState === "stopped" || victoryState === "achieved") {
            handleShuffleTiles(setTiles, tiles, boardState, setGameState, setBoardState, setMoveCounter, setTime, setVictoryState);
          } else {
            handlePause(isPaused, setIsPaused, setGameState, setBoardState, boardState, gameState);
          }
        }}>
          {gameState === "stopped" || victoryState === "achieved"
            ? "Start"
            : isPaused
              ? "Continue"
              : "Pause"}
        </button>

        <button className={`btn ${victoryState === "achieved" || gameState === "stopped" ? "hidden" : ""}`} onClick={() => {
          handleExit(setBoardState, setGameState, setTime, setMoveCounter, setTiles, setVictoryState, setIsPaused)
        }}>Exit</button>

        {/*Кнопка для быстрой проверки завершения игры*/}
        {/*<button onClick={() => {*/}
        {/*  setTiles(victoryPattern);*/}
        {/*  setVictoryState("achieved");*/}
        {/*  setShowInputLeader(true);*/}
        {/*}}>*/}
        {/*  Завершить игру*/}
        {/*</button>*/}

      </div>

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        open={openLeaderboard}
        close={closeLeaderboard}
      />

      <InputLeaderboardModal
        isOpen={showInputLeader}
        close={() => { setShowInputLeader(false); }}
        moveCounter={moveCounter}
        time={time}
      />

    </div>
  )
}

export default App
