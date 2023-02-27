import '../../styles/modals.scss';

export default function AlertModal({ modalInfo, toggleModal, goCommit }) {
  return (
    <div className="modalWrap">
      <div className="modalBox">
        <p>
          <span>{modalInfo}</span>
        </p>
        <div className="buttonWrap">
          <button type="button" onClick={goCommit}>
            남기기
          </button>
          <button type="button" onClick={toggleModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
