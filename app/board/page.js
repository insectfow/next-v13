'use client';

import { useState, useEffect } from 'react';
import '../../styles/board.scss';

import { dbService } from '../../lib/firebase';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import dayjs from 'dayjs';

import AlertModal from '../../components/modals/AlertModal';

import { useSelector } from 'react-redux';
import BoardList from '../../components/board/BoardList';

export default function board() {
  const userObj = useSelector((state) => state.user.userInfo);

  const [commit, setCommit] = useState('');
  const [error, setError] = useState(null);
  const [isShow, setIsShow] = useState(false);

  const [commitList, setCommitList] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (commit === '') {
      return;
    }
    toggleModal();
  };

  const dataPush = async () => {
    const data = {
      commit: commit,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      uid: userObj.uid,
      like: 0,
      displayName: userObj.displayName ? userObj.displayName : 'user',
    };
    try {
      await addDoc(collection(dbService, 'board'), data);
      setCommit('');
      toggleModal();
    } catch (error) {
      setError('firebase error' + error.code);
      setCommit('');
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setCommit(value);
  };

  const toggleModal = () => {
    setIsShow((prev) => !prev);
  };

  const goCommit = () => {
    dataPush();
  };

  useEffect(() => {
    const q = query(collection(dbService, 'board'), orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapShot) => {
      const dweetArr = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCommitList(dweetArr);
    });
  }, []);

  return (
    <>
      <title>Board - D.ach</title>
      <div className="container">
        <h3>방명록을 남겨보아요</h3>
        <p>인사말이나 건의사항 남겨주세요 반영 해보도록 하겠습니다~</p>

        <form className="board-form" onSubmit={onSubmit}>
          <input placeholder="입력해주세요" value={commit} onChange={onChange} />
          <button type="submit">남기기</button>
          {error && <p>{error}</p>}
        </form>
        <BoardList commitList={commitList} />
      </div>
      {isShow && (
        <AlertModal
          className={isShow ? 'on' : 'hide'}
          modalInfo={'방명록을 남기시겠습니까?'}
          toggleModal={toggleModal}
          goCommit={goCommit}
        />
      )}
    </>
  );
}
