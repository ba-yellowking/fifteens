import Modal from "../../ui/modal/Modal.jsx";
import {formatTimer} from "../../utils/FormatTimer.jsx";
import {useState} from "react";
import LeaderboardModal from "./LeaderboardModal.jsx";
import {useTranslation} from "react-i18next";

function InputLeaderboardModal({ isOpen, close, moveCounter, time, isLimited, setIsLimited }) {

  const { t } = useTranslation();

  const [name, setName] = useState("");

  function submitWinInfo() {

    const storedResults = JSON.parse(localStorage.getItem("leaderboard")) || [];

    if (storedResults.length < 15) {
      const newResult = {
        name,
        time,
        moveCounter,
      };

      storedResults.push(newResult);
      localStorage.setItem("leaderboard", JSON.stringify(storedResults));

      close();
      setName("");
    } else {
      setIsLimited(true);
    }
  }


  return (
    <>
      <Modal open={isOpen} close={close}>
        <div className="input__modal">
          <div className="input__header">
            <h3 className="input__title">{t("victory")}</h3>
          </div>

          <div className="input__body">
            <p>{`${t("time")}: ${formatTimer(time)}`}</p>
            <p>{`${t("moves")}: ${moveCounter}`}</p>
          </div>

          <div className="input__footer">
            <input
              type="text"
              className="input__name"
              placeholder={t("placeholder")}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <button className={`${isLimited ? "btn-inactive" : "input__save"}`} onClick={submitWinInfo}>
              {isLimited ? t("isLimited") : t("save")}
            </button>
          </div>
        </div>

      </Modal>
    </>
  )
}

export default InputLeaderboardModal;