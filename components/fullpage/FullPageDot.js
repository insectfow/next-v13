export default function FullPageDot({ pages, heightCheck, btnRef, currentPage }) {
  const onClick = (e) => {
    heightCheck(e);
  };
  return (
    <nav className="fullpage-middle-nav">
      {pages.map(({ idx }) => {
        return (
          <button
            type="button"
            ref={(el) => (btnRef.current[idx] = el)}
            name={idx}
            className={currentPage == idx ? 'active' : null}
            key={'middle-nav' + idx}
            onClick={onClick}
          ></button>
        );
      })}
    </nav>
  );
}
