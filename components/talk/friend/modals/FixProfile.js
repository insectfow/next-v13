export default function FixProfile({ close, children }) {
  return (
    <div className="modal-wrap">
      <div className="modal-box">
        <div className="close-btn">
          <button className="close" onClick={close}></button>
        </div>
        <div className="content-box">{children}</div>
      </div>
      <div className="back-block" onClick={close}></div>
    </div>
  );
}
