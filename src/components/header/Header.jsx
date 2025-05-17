import "./Header.css";
import { formatTimer } from "../../utils/FormatTimer.jsx";
import { useTranslation } from "react-i18next";

function Header({ handleLeaderboard, moveCounter, time, toggleLanguage }) {

  const { t } = useTranslation();

  return (
    <div className="header">
      <button className="btn btn-small" onClick={handleLeaderboard}>
        {t('top15')}
      </button>

      <button className="btn" onClick={toggleLanguage}>{t('language_switch')}</button>

      <div className="results">
        <p className="moves">{`${t('moves')}: ${moveCounter}`}</p>
        <p className="time">{`${t('time')}: ${formatTimer(time)}`}</p>
      </div>
    </div>
  );
}

export default Header;
