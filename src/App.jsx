import "./App.css";
import Tile from "./ui/tile/Tile.jsx";
import {useState} from "react";
import {shuffleTiles} from "./utils/ShuffleTiles.jsx";
import {moveTile} from "./utils/MoveTile.jsx";

function App() {

  const [tiles, setTiles] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
  ])

  const handleShuffleTiles = () => {
    shuffleTiles(setTiles);
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
                onClick={() => moveTile(rowIndex, colIndex, tiles, setTiles)}
              />
            ))
          ))}
        </div>
      </div>
      <button onClick={handleShuffleTiles}>Start</button>
    </div>
  )
}

export default App
