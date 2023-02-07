"use client";

import { useEffect, useState } from "react";
import Router from "../components/Router";
import { authService } from "../lib/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import Loading from "../components/Loading";
import "./global.css";

export default function RootLayout({ children }) {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          updateProfile: (args) =>
            updateProfile(user, {
              displayName: user.displayName,
              photoURL: user.photoURL,
            }),
        });
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      updateProfile: (args) =>
        updateProfile(user, {
          displayName: user.displayName,
          photoURL: user.photoURL,
        }),
    });
  };

  return (
    <html lang="ko">
      <head />
      <body>
        {init ? (
          <Router
            children={children}
            isLoggedIn={isLoggedIn}
            refreshUser={refreshUser}
            userObj={userObj}
          />
        ) : (
          <Loading />
        )}
      </body>
    </html>
  );
}
