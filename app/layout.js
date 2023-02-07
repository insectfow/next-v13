"use client";

import { useEffect, useState, Suspense } from "react";
import { authService } from "../lib/firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import Router from "../components/Router";
import "./global.css";
import Loading from "./Loading";

export default function RootLayout({ children, ...pageProps }) {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  console.log("layout", children.props, pageProps);

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
        {children}
        {/* {init ? (
          <Router
            children={children}
            pageProps={pageProps}
            isLoggedIn={isLoggedIn}
            refreshUser={refreshUser}
            userObj={userObj}
          />
        ) : (
          <Loading />
        )} */}
      </body>
    </html>
  );
}
