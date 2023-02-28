export default function FullPageNav({ pages, heightCheck, currentPage }) {
  return (
    <nav className="fullpage-nav">
      {pages.map(({ title, color, idx }) => {
        return (
          <button
            onClick={heightCheck}
            className={currentPage == idx ? 'active' : null}
            name={idx}
            key={'nav' + idx}
          >
            {'section' + (idx + 1)}
          </button>
        );
      })}
    </nav>
  );
}
