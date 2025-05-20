import "./Footer.css";
import {handleExit, handlePause, handleShuffleTiles} from "../../handlers/Handlers.jsx";
import {useTranslation} from "react-i18next";

function Footer(
  {
    gameState, victoryState, setTiles, tiles, boardState, setGameState, setBoardState, setMoveCounter, setTime,
    setVictoryState, isPaused, setIsPaused, setShowInputLeader
  }) {

  const { t } = useTranslation();

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
          ? t("start")
          : isPaused
            ? t("continue")
            : t("pause")}
      </button>

      <button className={`btn btn-small ${victoryState === "achieved" || gameState === "stopped" ? "hidden" : ""}`} onClick={() => {
        handleExit(setBoardState, setGameState, setTime, setMoveCounter, setTiles, setVictoryState, setIsPaused)
      }}>{t("exit")}</button>

      {/*Кнопка для быстрой проверки завершения игры*/}
      {/*<button className="btn" onClick={() => {*/}
      {/*  setVictoryState("achieved");*/}
      {/*  setShowInputLeader(true);*/}
      {/*}}>*/}
      {/*  Завершить игру*/}
      {/*</button>*/}

    </div>
  )
}

export default Footer;