import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

import { useInterval } from '../components/hooks/UseInterval';

import '../styles/count.scss';

export default function Count({ list }) {
  const [count, setCount] = useState(0);

  const listsRef = useRef([]);

  useEffect(() => {
    listsRef.current[0].classList.add('active');
  }, []);

  useInterval(() => {
    if (count >= listsRef.current.length - 1) {
      setCount(0);
    } else {
      setCount((prev) => prev + 1);
    }
    for (let i = 0; i < listsRef.current.length; i++) {
      if (count === i) {
        listsRef.current[i].classList.add('active');
      } else {
        if (listsRef.current[i].className === 'active') {
          listsRef.current[i].classList.remove('active');
        }
      }
    }
  }, 4000);
  return (
    <>
      <ul className="list">
        {list.map(({ title }, index) => {
          return (
            <li ref={(el) => (listsRef.current[index] = el)}>
              <Link href="/design" title={title}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
