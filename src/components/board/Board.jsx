import "./Board.css";
import Tile from "../../ui/tile/Tile.jsx";

function Board({ tiles, onTileClick }) {

  return (
    <div className="body">
      <div className="board">
        {tiles.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              tile={tile}
              onClick={() => onTileClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Board;