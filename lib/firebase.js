import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi9CKhv55SsCbQRgTY9jO7lsQvMLy7ypg",
  authDomain: "dh-2023.firebaseapp.com",
  projectId: "dh-2023",
  storageBucket: "dh-2023.appspot.com",
  messagingSenderId: "374716664446",
  appId: "1:374716664446:web:a7f9c294a2012b4bd0262f",
  measurementId: "G-QYEDCFYB55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authService = getAuth();

export const googleProvider = new GoogleAuthProvider();

export const githubProvider = new GithubAuthProvider();

export const dbService = getFirestore(app);
