import Header from '../components/Header';

import { Auth } from '../components/Auth';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from '../lib/firebase';

import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, updateLoggedIn, updateInits } from '../store/user/index';

import { useEffect } from 'react';
import Loading from '../app/Loading';

const Router = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn.payload);
  const isInit = useSelector((state) => state.user.isInit.payload);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        dispatch(
          getUserInfo({
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
          }),
        );

        dispatch(updateLoggedIn(true));
      } else {
        dispatch(getUserInfo(null));
        dispatch(updateLoggedIn(false));
      }
      dispatch(updateInits(true));
    });
  }, []);

  return (
    <>
      <>
        {isInit ? (
          <>
            {isLoggedIn && <Header />}
            {isLoggedIn ? children : <Auth />}
          </>
        ) : (
          <Loading />
        )}
      </>
    </>
  );
};

export default Router;
