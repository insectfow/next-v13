import '../../styles/modals.scss';
import { useEffect } from 'react';

export default function AlertModal({ modalInfo, toggleModal, goCommit }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
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
