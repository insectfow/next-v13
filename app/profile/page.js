"use client";

import { signOut } from "firebase/auth";
import { authService } from "../../lib/firebase";

import "../../styles/profile.scss";

const profile = () => {
  const onSignOut = () => {
    signOut(authService)
      .then(() => {
        // Sign-out successful.
        console.log("로그아웃 성공");
      })
      .catch((error) => {
        console.log("로그아웃 실패");
        // An error happened.
      });
  };

  return (
    <div className="container profile-page">
      <h3 className="title">프로필 페이지 준비중</h3>
      <button className="logout-btn" onClick={onSignOut}>
        로그아웃
      </button>
    </div>
  );
};

export default profile;
