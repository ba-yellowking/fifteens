import "./App.css";
import Tile from "./ui/tile/Tile.jsx";
import {useState} from "react";
import {shuffleTiles} from "./utils/ShuffleTiles.jsx";
import {moveTile} from "./utils/MoveTile.jsx";
import Modal from "./ui/modal/Modal.jsx";
import useModal from "./hooks/useModal.jsx";
import LeaderboardModal from "./components/modals/LeaderboardModal.jsx";

function App() {

  const [gameState, setGameState] = useState("stopped")

  // Лидерборд: хук и открытие
  const [isLeaderboardOpen, openLeaderboard, closeLeaderboard] = useModal();
  const handleLeaderboard = () => {openLeaderboard();};

  const [tiles, setTiles] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
  ])

  const handleShuffleTiles = () => {
    shuffleTiles(setTiles);
    setGameState("started");
  };

  return (
    <div className="fifteens">
      <div className="container">
        <div className="field">
          {tiles.map((row, rowIndex) => (
            row.map((tile, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                tile={tile}
                onClick={() => moveTile(rowIndex, colIndex, tiles, setTiles, gameState)}
              />
            ))
          ))}
        </div>
      </div>
      <button onClick={handleShuffleTiles}>Start</button>
      <button onClick={handleLeaderboard}>Leaderboard</button>

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        open={openLeaderboard}
        close={closeLeaderboard}
      />
    </div>
  )
}

export default App
