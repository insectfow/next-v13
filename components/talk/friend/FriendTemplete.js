'use client';

import { useState } from 'react';
import FriendBlock from './FriendBlock';
import MultiBlock from './MultiBlock';

export default function FriendTemplete({ title, type, list }) {
  // title = '제목', type = 'multi' or ...
  const [isShow, setIsShow] = useState(true);

  console.log(title + ':' + list.length);

  return (
    <div className="friend-templete">
      <h2>
        <span>
          {title} {list.length > 0 ? list.length : null}
        </span>
        <button
          className={isShow ? 'arrow' : 'arrow-reverse'}
          onClick={() => setIsShow((prev) => !prev)}
        ></button>
      </h2>
      {type === 'multi' && isShow && <MultiBlock />}
      {(type === 'birth' || type === 'friend' || type === 'favorit' || type === 'update') &&
        isShow &&
        list.map((v, idx) => {
          return <FriendBlock key={idx + title + type} list={v} />;
        })}
    </div>
  );
}
