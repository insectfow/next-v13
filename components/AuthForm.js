import { useState, useRef } from "react";
import Image from "next/image";
import { authService } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import eyesOn from "../public/eyes_on.svg";
import eyesOff from "../public/eyes_off.svg";
import AuthSocial from "./AuthSocial";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginToggle, setLoginToggle] = useState(true);
  const [autoLogin, setAutoLogin] = useState(false);
  const [error, setError] = useState({
    code: "",
    message: "",
  });
  const [isEyes, setIsEyes] = useState(false);
  const passwordRef = useRef(null);

  const createUser = () => {
    setPersistence(
      authService,
      autoLogin ? browserLocalPersistence : browserSessionPersistence
    )
      .then(async () => {
        try {
          await createUserWithEmailAndPassword(authService, email, password);
        } catch (error) {
          let errorObj = {
            code: error.code,
            message: error.message,
          };

          if (error?.code.includes("email-already-in-use")) {
            errorObj = {
              code: "중복 가입",
              message: "이미 가입된 이메일입니다.",
            };
          }
          setError(errorObj);
        }
      })
      .catch((error) => {
        setError({ code: error.code, message: error.message });
      });
  };

  const signIn = () => {
    setPersistence(
      authService,
      autoLogin ? browserLocalPersistence : browserSessionPersistence
    )
      .then(async () => {
        try {
          await signInWithEmailAndPassword(authService, email, password);
        } catch (error) {
          let errorObj = {
            code: error.code,
            message: error.message,
          };
          if (error?.code.includes("wrong-password")) {
            errorObj = {
              code: "로그인 에러",
              message: "이메일 또는 비밀번호를 다시 입력하세요.",
            };
          }

          setError(errorObj);
        }
      })
      .catch((error) => {
        setError({ code: error.code, message: error.message });
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    errorReset();

    if (email === "" || password === "") {
      return setError({ code: "미입력 에러", message: "다시 입력해주세요." });
    }

    if (loginToggle) {
      signIn();
    } else {
      createUser();
    }
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "autoLogin") {
      setAutoLogin(value);
    }
  };

  const errorReset = () => {
    setError({
      code: "",
      message: "",
    });
  };

  const onToggle = () => {
    setLoginToggle((prev) => !prev);
  };

  const onToggleShowPw = (e) => {
    console.log(e);
    setIsEyes((prev) => !prev);
  };

  const onError = (error) => {
    setError(error);
  };

  return (
    <>
      <form className="auth-form" onSubmit={onSubmit}>
        <div className="auth-input-box">
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="auth-input-box pw">
          <input
            ref={passwordRef}
            type={isEyes ? "text" : "password"}
            placeholder="password"
            name="password"
            onChange={onChange}
          />
          <button type="button" className="eyes-box" onClick={onToggleShowPw}>
            <Image
              width={36}
              height={36}
              src={isEyes ? eyesOn : eyesOff}
              alt="eyes icon"
            />
          </button>
        </div>
        <label>
          <input type="checkbox" name="autoLogin" onChange={onChange} />
          자동 로그인
        </label>
        <button type="submit">{loginToggle ? "로그인" : "회원가입"}</button>
        {error?.code && (
          <p className="error">{error.code + " : " + error.message}</p>
        )}
      </form>
      <div className="auth-switch">
        <span className={loginToggle ? "text-on" : "text-off"}>Login</span>
        <button
          type="button"
          onClick={onToggle}
          className={loginToggle ? "switch-on" : "switch-off"}
        >
          <span className={loginToggle ? null : "on"}></span>
        </button>
        <span className={loginToggle ? "text-off" : "text-on"}>Join</span>
      </div>
      <AuthSocial onError={onError} />
    </>
  );
};

export default AuthForm;
