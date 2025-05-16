import Modal from "../../ui/modal/Modal.jsx";
import {formatTimer} from "../../utils/FormatTimer.jsx";
import {useState} from "react";
import LeaderboardModal from "./LeaderboardModal.jsx";

function InputLeaderboardModal({ isOpen, close, moveCounter, time }) {

  const [name, setName] = useState("");

  function submitWinInfo() {
    const newResult = {
      name,
      time,
      moveCounter,
    };

    const storedResults = JSON.parse(localStorage.getItem("leaderboard")) || [];
    storedResults.push(newResult);
    localStorage.setItem("leaderboard", JSON.stringify(storedResults));

    close();
    setName("");
  }


  return (
    <>
      <Modal open={isOpen} close={close}>
        <div className="input__modal">
          <div className="input__header">
            <h3 className="input__title">Победа!</h3>
          </div>

          <div className="input__body">
            <p>{`Время: ${formatTimer(time)}`}</p>
            <p>{`Ходов: ${moveCounter}`}</p>
          </div>

          <div className="input__footer">
            <input
              type="text"
              className="input__name"
              placeholder="Введите имя в таблицу рекордов"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <button className="input__save" onClick={submitWinInfo}>
              Сохранить
            </button>
          </div>
        </div>

      </Modal>
    </>
  )
}

export default InputLeaderboardModal;