"use client";

import { signOut } from "firebase/auth";
import { authService } from "../../lib/firebase";

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
    <>
      <p>profile</p>
      <button onClick={onSignOut}>로그아웃</button>
    </>
  );
};

export default profile;
