// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz9pYHcn1zlXHK1UAHcMR7F9XGllzOc7s",
  authDomain: "one-health-38728.firebaseapp.com",
  projectId: "one-health-38728",
  storageBucket: "one-health-38728.appspot.com",
  messagingSenderId: "422615539322",
  appId: "1:422615539322:web:4efa316031e5fe4189e5c3",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth(app);
const storage = getStorage(app);
const googleAuthProvider = new GoogleAuthProvider();

// method to signup with google with extra props
const signUpWithGoogle = async (role: number) => {
  console.log(role);

  try {
    const res = await signInWithPopup(auth, googleAuthProvider);
    const user = res.user;
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      name: user.displayName,
      role: Number(role),
    });
  } catch (error) {
    console.log(error);
  }
};

export { app, auth, db, storage, signUpWithGoogle };
