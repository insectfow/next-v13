'use client';

import '../../styles/board.scss';

export default function BoardList({ commitList }) {
  return (
    <ul className="board-list">
      {commitList.map(({ id, commit, createdAt, displayName, uid }) => (
        <li key={`commit${id}`}>
          <ul>
            <li className="nikname">{displayName ? displayName : 'user'}</li>
            <li className="time">{createdAt}</li>
            <li className="commit">{commit}</li>
            {/* {uid === userObj.uid ? (
                  <li className="buttons">
                    <button>수정하기</button>
                  </li>
                ) : null} */}
          </ul>
        </li>
      ))}
    </ul>
  );
}
