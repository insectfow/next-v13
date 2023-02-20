import Header from '../components/Header';
import { Auth } from '../components/Auth';
import { useContext } from 'react';
import { globalContext } from '../app/layout';

const Router = ({ children }) => {
  const { isLoggedIn } = useContext(globalContext);

  return (
    <>
      {isLoggedIn && <Header />}
      {isLoggedIn ? children : <Auth />}
    </>
  );
};

export default Router;
