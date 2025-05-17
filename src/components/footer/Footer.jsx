import "./Footer.css";
import {handleExit, handlePause, handleShuffleTiles} from "../../handlers/Handlers.jsx";

function Footer(
  {
    gameState, victoryState, setTiles, tiles, boardState, setGameState, setBoardState, setMoveCounter, setTime,
    setVictoryState, isPaused, setIsPaused
  }) {
  return (
    <div className="footer">
      {/*Добавляем условие if, поэтому () => {}*/}
      <button className="btn btn-small" onClick={() => {
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

      <button className={`btn btn-small ${victoryState === "achieved" || gameState === "stopped" ? "hidden" : ""}`} onClick={() => {
        handleExit(setBoardState, setGameState, setTime, setMoveCounter, setTiles, setVictoryState, setIsPaused)
      }}>Exit</button>

    </div>
  )
}

export default Footer;