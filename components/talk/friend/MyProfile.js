import Image from 'next/image';

export default function MyProfile({ myData }) {
  // myData Odj {  img : '', name: '', statusMs: '' }

  return (
    <div className="my">
      <div className="my-profile">
        <div className="profile-image">
          <button title="프로필 보기">
            <Image src={myData.img} width={58} height={58} alt="my img" priority></Image>
          </button>
        </div>
        <div className="profile-info">
          <h4>{myData.name}</h4>
          <p className="textover">{myData.statusMs}</p>
        </div>
      </div>
      <div className="my-status-btn">
        <button title="상태메세지 올리기" onClick={myData.modal}>
          상태메세지 올리기
        </button>
      </div>
    </div>
  );
}
