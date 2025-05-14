import Modal from "../../ui/modal/Modal.jsx";

function LeaderboardModal({ isOpen, close }) {
  return (
    <Modal open={isOpen} close={close}>
      <div className="modal__leaderboard">
        <h2>Лучшие результаты:</h2>
      </div>
    </Modal>
  )
}

export default LeaderboardModal;