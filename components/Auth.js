import AuthForm from "../components/AuthForm";

import "../styles/auth.scss";
export const Auth = () => {
  return (
    <div className="container flex-auth">
      <h3 className="auth-title">D.ach Login</h3>
      <AuthForm />
    </div>
  );
};
