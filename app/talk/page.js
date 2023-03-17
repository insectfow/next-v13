'use client';

import '../../styles/talk.scss';
import Link from 'next/link';

import MyProfile from '../../components/talk/friend/MyProfile';
import FriendTemplete from '../../components/talk/friend/FriendTemplete';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import FixProfile from '../../components/talk/friend/modals/FixProfile';

export default function Page() {
  const userObj = useSelector((state) => state.user.userInfo);
  const [modal, setModal] = useState(false);
  const [friends, setFriends] = useState([
    {
      name: '주영이',
      image:
        'https://images.unsplash.com/photo-1678794108772-bdb4dc890070?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      updateAt: '2023-03-16',
      birth: '03-16',
      favorit: true,
      statusMs: '안녕 나 주영이야',
    },
    {
      name: '양수철대지',
      image:
        'https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      updateAt: '2023-03-10',
      birth: '05-20',
      favorit: false,
      statusMs: '',
    },
    {
      name: '강태공',
      image:
        'https://images.unsplash.com/photo-1678872537245-296b738873ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      updateAt: '2023-01-10',
      birth: '02-16',
      favorit: false,
      statusMs: '오우싯',
    },
    {
      name: '지우',
      image:
        'https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG1vbnN0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      updateAt: '2023-01-12',
      birth: '12-25',
      favorit: false,
      statusMs: '',
    },
    {
      name: '조와꾸',
      image:
        'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGZhc2hpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      updateAt: '2023-01-12',
      birth: '11-25',
      favorit: false,
      statusMs: '애인구함',
    },
    {
      name: '병연이',
      image:
        'https://images.unsplash.com/photo-1678815927938-0fb01822962c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      updateAt: '2023-01-12',
      birth: '11-25',
      favorit: false,
      statusMs: '예',
    },
  ]);

  const birthFriend = friends.filter((v) => {
    if (v.birth === dayjs().format('MM-DD')) return v;
  });

  const favoritFriend = friends.filter((v) => {
    if (v.favorit === true) return v;
  });

  const updateFriend = friends.filter((v) => {
    if (v.favorit === true) return v;
  });

  const sortFriend = friends.sort(function (a, b) {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();

    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {}, []);

  return (
    <>
      <title>talk - D.ach</title>
      <div className="container talk">
        <aside className="talk-nav-wrap">
          <nav className="nav-top">
            <ul>
              <li>
                <Link href="/talk" title="친구">
                  <img />1
                </Link>
              </li>
              <li>
                <Link href="/talk" title="채팅">
                  <img />2
                </Link>
              </li>
              <li>
                <Link href="/talk" title="더보기">
                  <img />3
                </Link>
              </li>
            </ul>
          </nav>
          <nav className="nav-bottom">
            <ul>
              <li>
                <Link href="/talk" title="카카오 이모티콘샵">
                  <img />1
                </Link>
              </li>
              <li>
                <Link href="/talk" title="알림">
                  <img />
                </Link>
              </li>
              <li>
                <Link href="/talk" title="설정">
                  <img />
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <article className="talk-content-wrap">
          <header className="talk-content-header">
            <h3 className="talk-content-title">친구</h3>
            <nav className="talk-header-nav">
              <ul>
                <li>
                  <button title="통합검색">
                    <img></img>
                  </button>
                </li>
                <li>
                  <button title="친구추가">
                    <img></img>
                  </button>
                </li>
              </ul>
            </nav>
          </header>
          <section className="talk-content-container">
            <MyProfile
              myData={{
                img: userObj.photoURL,
                name: userObj.displayName ? userObj.displayName : '이름을 적어주세요',
                statusMs: '',
                modal: () => setModal((prev) => !prev),
              }}
            />
            <hr className="line"></hr>
            <FriendTemplete title={'내 멀티 프로필'} type={'multi'} list={[]} />
            <hr className="line"></hr>
            <FriendTemplete title={'생일인 친구'} type={'birth'} list={birthFriend} />
            <hr className="line"></hr>
            <FriendTemplete title={'업데이트한 친구'} type={'update'} list={updateFriend} />
            <hr className="line"></hr>
            <FriendTemplete title={'즐겨찾기'} type={'favorit'} list={favoritFriend} />
            <hr className="line"></hr>
            <FriendTemplete title={'채널'} type={'chnnel'} list={[]} />
            <hr className="line"></hr>
            <FriendTemplete title={'친구'} type={'friend'} list={sortFriend} />
          </section>
        </article>
        {/* 상태 올리기 모달 */}
        {modal && (
          <FixProfile close={() => setModal((prev) => !prev)}>
            <h4>기본프로필 편집</h4>
          </FixProfile>
        )}
      </div>
    </>
  );
}
