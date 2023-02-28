'use client';
import { useState, useEffect, useRef } from 'react';
import FullPageDot from '../../components/fullpage/FullPageDot';

import FullPageHeader from '../../components/fullpage/FullPageHeader';
import FullPageNav from '../../components/fullpage/FullPageNav';
import FullPages from '../../components/fullpage/FullPages';

import '../../styles/fullpage.scss';

export default function FullPage() {
  // 부모
  const section = useRef();
  // 자식
  const pageRef = useRef([]);
  // 자식 버튼
  const btnRef = useRef([]);
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(0);
  // 페이지 리스트
  const [pages, setPages] = useState([
    {
      idx: 0,
      title: '첫번째 세션입니다.',
      color: '3541b1',
      image: null,
    },
    {
      idx: 1,
      title: '2번째 세션입니다.',
      color: 'BB2649',
      image: null,
    },
    {
      idx: 2,
      title: '3번째 세션입니다.',
      color: '768852',
      image: null,
    },
  ]);
  // 페이지 이동 중인지 체크하는 변수
  const [isStop, setIsStop] = useState(false);

  // 클릭시 세션 이동 함수
  const heightCheck = (e) => {
    const {
      target: { name },
    } = e;
    setIsStop(true);
    pageRef.current[name].scrollIntoView();
  };

  useEffect(() => {
    let options = {
      root: document.querySelector('.fullpage-container'),
      rooMargin: '0px',
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!isStop) {
          setCurrentPage(Number(entry.target.id));
        }
      }
    }, options);

    pageRef.current.map((v) => {
      observer.observe(v);
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  // 현재 페이지 변경 감지
  useEffect(() => {
    if (!isStop) {
      const height = section.current.clientHeight;
      section.current.scrollTop = height * currentPage;
    }
  }, [currentPage]);

  // 페이지 이동 중인지 감지
  useEffect(() => {
    const timer = setInterval(() => {
      setIsStop(false);
      clearInterval(timer);
    }, pages.length * 500);
  }, [isStop]);

  return (
    <>
      <title>fullpage - D.ach</title>

      <main className="fullpage">
        <FullPageHeader />
        <FullPageNav pages={pages} heightCheck={heightCheck} currentPage={currentPage} />
        <FullPageDot
          pages={pages}
          heightCheck={heightCheck}
          btnRef={btnRef}
          currentPage={currentPage}
        />
        <FullPages section={section} pages={pages} pageRef={pageRef} currentPage={currentPage} />
      </main>
    </>
  );
}
