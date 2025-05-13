import "./Tile.css";

function Tile({ tile, onClick }) {

  return (
    <div className={`tile ${tile === 0 ? "empty" : ""}`} onClick={onClick}>
      {tile !== 0 && tile}
    </div>
  )
}

export default Tile;