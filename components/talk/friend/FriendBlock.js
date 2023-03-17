import Image from 'next/image';

export default function FriendBlock({ list }) {
  return (
    <div className="friend-block-contents">
      <div className="profile">
        <div className="profile-image">
          <button title="프로필 보기">
            {list.image ? (
              <Image src={list.image} width={44} height={44} alt="my img" priority></Image>
            ) : (
              <span></span>
            )}
          </button>
        </div>
        <div className="profile-info">
          <h4>{list.name}</h4>
          <p className="textover">{list.statusMs}</p>
        </div>
      </div>
      {/* <div className="my-status-btn">
        <button title="선물하기">선물하기</button>
      </div> */}
    </div>
  );
}
