import Image from 'next/image';

export default function FullPages({ section, pages, pageRef, currentPage }) {
  return (
    <div ref={section} id="fullPage" className="fullpage-container">
      {pages.map(({ title, color, idx, image }) => {
        const style = {
          background: '#' + color,
        };
        return (
          <div
            ref={(el) => (pageRef.current[idx] = el)}
            id={idx}
            className="fullpage-section"
            style={style}
            key={'section' + idx}
          >
            <h1 className={currentPage == idx ? 'active' : null}>{title}</h1>
            {image && <Image src={image} width={400} height={400} alt="ummm"></Image>}
          </div>
        );
      })}
    </div>
  );
}
