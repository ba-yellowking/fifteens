import "./App.css";
import {useEffect, useState} from "react";
import useModal from "./hooks/useModal.jsx";
import LeaderboardModal from "./components/modals/LeaderboardModal.jsx";
import InputLeaderboardModal from "./components/modals/InputLeaderboardModal.jsx";
import {handleTileClick} from "./handlers/Handlers.jsx";
import Board from "./components/board/Board.jsx";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import './i18n.jsx';
import {useTranslation} from "react-i18next";

function App() {

  const { i18n } = useTranslation();
  const toggleLanguage = () => {
    const newLang = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(newLang);
  };

  const [gameState, setGameState] = useState("stopped"); // started, paused, stopped
  const [boardState, setBoardState] = useState("inactive"); // active, inactive
  const [victoryState, setVictoryState] = useState("notAchieved"); // achieved, notAchieved

  const [moveCounter, setMoveCounter] = useState(0); // moves
  const [time, setTime] = useState(0); // timer

  const [isLeaderboardOpen, openLeaderboard, closeLeaderboard] = useModal(); // leaderboard hook

  const [isPaused, setIsPaused] = useState(false);
  const handleLeaderboard = () => {openLeaderboard();}; // open modal
  const [showInputLeader, setShowInputLeader] = useState(false);

  const [isLimited, setIsLimited] = useState(false);

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

      <Header
        handleLeaderboard={handleLeaderboard}
        moveCounter={moveCounter}
        time={time}
        toggleLanguage={toggleLanguage}
      />

      <Board
        tiles={tiles}
        onTileClick={(rowIndex, colIndex) =>
          handleTileClick(
            rowIndex, colIndex, tiles, setTiles, gameState, setBoardState, setMoveCounter, victoryState, setVictoryState,
            showInputLeader, setShowInputLeader
          )
        }
      />

      <Footer
        gameState={gameState}
        victoryState={victoryState}
        setTiles={setTiles}
        tiles={tiles}
        boardState={boardState}
        setGameState={setGameState}
        setBoardState={setBoardState}
        setMoveCounter={setMoveCounter}
        setTime={setTime}
        setVictoryState={setVictoryState}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />

      {/*Кнопка для быстрой проверки завершения игры*/}
      <button onClick={() => {
        setVictoryState("achieved");
        setShowInputLeader(true);
      }}>
        Завершить игру
      </button>

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        open={openLeaderboard}
        close={closeLeaderboard}
        setIsLimited={setIsLimited}
      />

      <InputLeaderboardModal
        isOpen={showInputLeader}
        close={() => { setShowInputLeader(false); }}
        moveCounter={moveCounter}
        time={time}
        isLimited={isLimited}
        setIsLimited={setIsLimited}
      />

    </div>
  )
}

export default App
