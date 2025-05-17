import "./Header.css";
import {formatTimer} from "../../utils/FormatTimer.jsx";

function Header({ handleLeaderboard, moveCounter, time }) {
  return (
    <div className="header">
      <button className="btn btn-small" onClick={handleLeaderboard}>Top-15</button>
      <div className="results">
        <p>{`Moves: ${moveCounter}`}</p>
        <p>{`Time: ${formatTimer(time)}`}</p>
      </div>
    </div>
  )
}

export default Header;