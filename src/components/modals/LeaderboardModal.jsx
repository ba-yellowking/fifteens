import Modal from "../../ui/modal/Modal.jsx";
import {formatTimer} from "../../utils/FormatTimer.jsx";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

function LeaderboardModal({ isOpen, close, setIsLimited }) {

  const { t } = useTranslation();

  const [results, setResults] = useState([]);

  // Очистить localStorage
  function handleClear() {
    localStorage.clear();
    setResults([]);
    setIsLimited(false);
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
          <p>{t("leaderboard")}</p>
        </div>

        <div className="leaderboard__body">
          {results.length === 0 && <p>{t("noResults")}</p>}

          <div className="leaderboard__grid">
            {results.map((item, index) => {
              const medals = ['🥇', '🥈', '🥉'];
              const medal = medals[index] || '';

              return (
                <div key={index} className="leaderboard__item">
                  <p><strong>{medal} {index + 1}. {item.name}</strong></p>
                  <p>{t("time")}: {formatTimer(item.time)}</p>
                  <p>{t("moves")}: {item.moveCounter}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="leaderboard__footer">
          <button onClick={handleClear} className="btn btn-medium">{t("resetData")}</button>
        </div>
      </div>
    </Modal>
  )
}

export default LeaderboardModal;
