'use client';

import { useState, useRef, useEffect } from 'react';

import { signOut, updateProfile } from 'firebase/auth';

import { authService, dbService, storageService } from '../../lib/firebase';

import '../../styles/profile.scss';

import { collection, query, onSnapshot, orderBy, where, limit } from 'firebase/firestore';

import { ref, uploadString, getDownloadURL } from 'firebase/storage';

import imageCompression from 'browser-image-compression';

import uploadImage from '../../public/upload.svg';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../../store/user/index';
import BoardList from '../../components/board/BoardList';

const profile = () => {
  const userObj = useSelector((state) => state.user.userInfo);

  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName ? userObj.displayName : '',
  );
  const [photoURL, setPhotoURL] = useState(userObj.photoURL);
  const [error, setError] = useState(null);
  const fileUploadRef = useRef();

  const dispatch = useDispatch();

  const [commitList, setCommitList] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let updateObj = {};

      if (userObj.displayName === newDisplayName && photoURL === '') {
        return;
      }

      if (userObj.displayName !== newDisplayName) {
        updateObj = { displayName: newDisplayName };
      }

      if (photoURL !== '') {
        const attachmentRef = ref(storageService, `${userObj.uid}/profile-image`);
        const response = await uploadString(attachmentRef, String(photoURL), 'data_url');
        const attachmentUrl = await getDownloadURL(response.ref);

        updateObj = { ...updateObj, photoURL: attachmentUrl };
      }

      await updateProfile(authService.currentUser, updateObj);
      dispatch(updateUserInfo(updateObj));
    } catch (error) {
      setError(error.message);
    }
  };

  const onFileChange = async (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];

    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 500,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      // resize??? ???????????? url??? ?????? fileUrl??? ??????
      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then((result) => {
        setPhotoURL(result);
      });
    } catch (error) {
      setError(error.message);
    }
    event.target.value = '';
  };

  const fileUploadClick = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNewDisplayName(value);
  };

  const onSignOut = () => {
    signOut(authService)
      .then(() => {
        // Sign-out successful.
        // console.log('???????????? ??????');
      })
      .catch((error) => {
        // console.log('???????????? ??????');
        // An error happened.
      });
  };

  useEffect(() => {
    const q = query(
      collection(dbService, 'board'),
      orderBy('createdAt', 'desc'),
      where('uid', '==', userObj.uid),
    );
    onSnapshot(q, (snapShot) => {
      const dweetArr = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCommitList(dweetArr);
    });
  }, []);

  return (
    <>
      <title>Profile - D.ach</title>
      <div className="container profile-page">
        <h3 className="title">????????? ?????????</h3>
        <p>
          ???????????? ????????? ?????????, ????????? ???????????? ?????? ??? ?????? ????????? ?????? ??? ????????? ????????????
          ???????????????.
        </p>
        <form onSubmit={onSubmit} className="profile-form">
          <div className="profile-image-fix-box">
            <input type="file" accept="image/*" ref={fileUploadRef} onChange={onFileChange} />
            <div className="image-box">
              <button onClick={fileUploadClick}>
                <Image src={uploadImage} width={16} height={16} alt="upload image" />
              </button>
              <figure onClick={fileUploadClick}>
                {photoURL && (
                  <Image
                    priority
                    src={photoURL !== '' ? photoURL : userObj.photoURL}
                    width={120}
                    height={120}
                    alt="profile image"
                  />
                )}
              </figure>
            </div>
          </div>
          <label>?????????</label>
          <input
            className="profile-input"
            type="text"
            placeholder="Display name"
            value={newDisplayName}
            onChange={onChange}
          />
          <input type="submit" value="Update Profile" />
          {error ? <span>{error}</span> : null}
        </form>
        <BoardList commitList={commitList} />
        <button className="logout-btn" onClick={onSignOut}>
          ????????????
        </button>
      </div>
    </>
  );
};

export default profile;
