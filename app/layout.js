"use client";

import { useEffect, useState, createContext } from "react";
import { authService } from "../lib/firebase";
import Router from "../components/Router";
import "../styles/global.css";
import Loading from "./Loading";

// import { store } from "../store/index";
// import { Provider } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

export const globalContext = createContext({});

export default function RootLayout({ children }) {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          photoURL: user.photoURL,
          updateProfile: (arg) =>
            updateProfile(user, {
              displayName: user.displayName,
              photoURL: user.photoURL,
            }),
        });

        setIsLoggedIn(true);
      } else {
        setUserObj(null);
        setIsLoggedIn(false);
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

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userObj,
    setUserObj,
    refreshUser,
  };

  return (
    <html lang="ko">
      <head />
      <body>
        <globalContext.Provider value={value}>
          {init ? <Router children={children} /> : <Loading />}
        </globalContext.Provider>
        {/* <Provider store={store}></Provider> */}
      </body>
    </html>
  );
}
