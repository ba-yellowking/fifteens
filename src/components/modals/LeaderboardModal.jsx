import Modal from "../../ui/modal/Modal.jsx";
import {formatTimer} from "../../utils/FormatTimer.jsx";
import {useEffect, useState} from "react";

function LeaderboardModal({ isOpen, close }) {
  const [results, setResults] = useState([]);

  // Очистить localStorage
  function handleClear() {
    localStorage.clear();
    setResults([]);
  }

  // Обновление информации при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      const storedResults = JSON.parse(localStorage.getItem("leaderboard")) || [];
      storedResults.sort((a, b) => a.time - b.time);
      setResults(storedResults);
    }
  }, [isOpen]);

  return (
    <Modal open={isOpen} close={close}>
      <div className="leaderboard__modal">
        <div className="leaderboard__header">
          <p>Таблица рекордов</p>
        </div>

        <div className="leaderboard__body">
          {results.length === 0 && <p>Нет результатов</p>}

          {results.map((item, index) => (
            <div key={index} className="leaderboard__item">
              <p><strong>{index + 1}. {item.name}</strong></p>
              <p>⏱ Время: {formatTimer(item.time)}</p>
              <p>🎯 Ходов: {item.moveCounter}</p>
            </div>
          ))}
        </div>

        <button onClick={handleClear} className="btn">Очистить данные</button>
      </div>
    </Modal>
  )
}

export default LeaderboardModal;
