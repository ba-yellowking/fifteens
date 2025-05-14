import "./Modal.css";

function Modal(props) {

  function handleModalContent(event) {
    event.stopPropagation();
  }

  return (
    <div className={`modal ${props.open ? "visible" : ""}`}>
      <div className="modal__shade" onClick={props.close}>
        <div className="modal__content" onClick={handleModalContent}>
          {props.children}
          <span className="modal__close" onClick={props.close}>
            &times;
          </span>
        </div>
      </div>
    </div>
  )
}

export default Modal;