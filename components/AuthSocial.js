import { signInWithPopup } from "firebase/auth";
import { authService, googleProvider, githubProvider } from "../lib/firebase";

import Image from "next/image";

import githubImage from "../public/github.svg";
import googleImage from "../public/google.svg";

export default function AuthSocial({ onError }) {
  const socialLogin = async (e) => {
    const {
      target: { name },
    } = e;
    try {
      await signInWithPopup(
        authService,
        name === "google"
          ? googleProvider
          : name === "github"
          ? githubProvider
          : null
      )
        .then((result) => {})
        .catch((error) => {
          onError({ code: error.code, message: error.message });
        });
    } catch (error) {
      onError({ code: error.code, message: error.message });
    }
  };
  return (
    <>
      <div className="auth-social">
        <button type="button">
          <Image
            width={40}
            height={40}
            src={googleImage}
            alt="google logo"
            name="google"
            onClick={socialLogin}
          />
        </button>
        <button type="button">
          <Image
            width={40}
            height={40}
            src={githubImage}
            alt="github logo"
            name="github"
            onClick={socialLogin}
          />
        </button>
      </div>
    </>
  );
}
