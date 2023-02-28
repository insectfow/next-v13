'use client';

import { useState, useRef, useContext } from 'react';

import { signOut, updateProfile } from 'firebase/auth';

import { authService, dbService, storageService } from '../../lib/firebase';

import '../../styles/profile.scss';

import { collection, query, where, getDocs } from 'firebase/firestore';

import { ref, uploadString, getDownloadURL } from 'firebase/storage';

import imageCompression from 'browser-image-compression';

import uploadImage from '../../public/upload.svg';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../../store/user/index';

const profile = () => {
  const userObj = useSelector((state) => state.user.userInfo);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState(null);
  const fileUploadRef = useRef();

  const dispatch = useDispatch();

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
        const response = await uploadString(attachmentRef, photoURL, 'data_url');
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
      // resize된 이미지의 url을 받아 fileUrl에 저장
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
        console.log('로그아웃 성공');
      })
      .catch((error) => {
        console.log('로그아웃 실패');
        // An error happened.
      });
  };

  return (
    <>
      <title>Profile - D.ach</title>
      <div className="container profile-page">
        <h3 className="title">프로필 페이지</h3>
        <form onSubmit={onSubmit} className="profile-form">
          <div className="profile-image-fix-box">
            <input type="file" accept="image/*" ref={fileUploadRef} onChange={onFileChange} />
            <div className="image-box">
              <button onClick={fileUploadClick}>
                <Image src={uploadImage} width={16} height={16} alt="upload image" />
              </button>
              <figure onClick={fileUploadClick}>
                <Image
                  priority
                  src={photoURL ? photoURL : userObj.photoURL}
                  width={120}
                  height={120}
                  alt="profile image"
                />
              </figure>
            </div>
          </div>
          <label>닉네임</label>
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
        <button className="logout-btn" onClick={onSignOut}>
          로그아웃
        </button>
      </div>
    </>
  );
};

export default profile;
