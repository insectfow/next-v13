import Header from "../components/Header";
import { Auth } from "../components/Auth";

const Router = ({ children, isLoggedIn, refreshUser, userObj }) => {
  console.log(isLoggedIn, userObj, refreshUser);
  return (
    <>
      {isLoggedIn && <Header />}
      {isLoggedIn ? children : <Auth />}
    </>
  );
};

export default Router;
