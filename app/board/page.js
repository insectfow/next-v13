'use client';

import { useState, useEffect } from 'react';
import '../../styles/board.scss';

import { dbService } from '../../lib/firebase';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import dayjs from 'dayjs';

import { useContext } from 'react';
import { globalContext } from '../layout';

export default function board() {
  const { userObj } = useContext(globalContext);
  const [commit, setCommit] = useState(null);
  const [error, setError] = useState(null);

  const [commitList, setCommitList] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();

    if (!commit) {
      return;
    }
    dataPush();
  };

  const dataPush = async () => {
    const data = {
      commit: commit,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      uid: userObj.uid,
      like: 0,
      displayName: userObj.displayName,
    };

    try {
      await addDoc(collection(dbService, 'board'), data);
      setCommit(null);
    } catch (error) {
      setError(error.code);
      setCommit(null);
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setCommit(value);
  };

  const likeUpdate = async (e) => {
    // const {
    //   target: { name },
    // } = e;
    // try {
    //   const docRef = doc(dbService, "board", name);
    //   // Update the timestamp field with the value from the server
    //   const updateTimestamp = await updateDoc(docRef, {
    //     like: 2,
    //   });
    // } catch (error) {}
  };

  useEffect(() => {
    const q = query(collection(dbService, 'board'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapShot) => {
      const dweetArr = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCommitList(dweetArr);
    });
  }, []);

  return (
    <div className="container board-page">
      <h3>방명록을 남겨보아요</h3>

      <form onSubmit={onSubmit}>
        <input placeholder="입력해주세요" onChange={onChange} />
        <button type="submit">문의하기</button>
        {error && <p>{error}</p>}
      </form>

      <ul>
        {commitList.map(({ id, commit, createdAt, displayName }) => {
          return (
            <li key={id}>
              <ul>
                <li className="nikname">{displayName}</li>
                <li className="time">{createdAt}</li>

                <li className="commit">{commit}</li>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
