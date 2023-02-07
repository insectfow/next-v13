import Header from "../components/Header";
import { Auth } from "../components/Auth";

const Router = ({ children, isLoggedIn, refreshUser, userObj, pageProps }) => {
  console.log("router", pageProps);
  return (
    <>
      {isLoggedIn && <Header />}
      {isLoggedIn ? children : <Auth />}
    </>
  );
};

export default Router;
