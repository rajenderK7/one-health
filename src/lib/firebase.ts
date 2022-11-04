// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBCek6kMcNgo3LKiZvAkK5mPI5QO8Vq84",
  authDomain: "one-health1.firebaseapp.com",
  projectId: "one-health1",
  storageBucket: "one-health1.appspot.com",
  messagingSenderId: "536459228305",
  appId: "1:536459228305:web:3af773a07631a304817b30",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth(app);
const storage = getStorage(app);
const googleAuthProvider = new GoogleAuthProvider();

// method to signup with google with extra props
const signUpWithGoogle = async (role: number) => {
  console.log("Selected role: " + role);

  try {
    const res = await signInWithPopup(auth, googleAuthProvider);
    const user = res.user;
    const userRef = doc(db, "users", user.uid);
    const firebaseUser = await getDoc(userRef);
    if (!firebaseUser.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: Number(role),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export { app, auth, db, storage, signUpWithGoogle, logout };
