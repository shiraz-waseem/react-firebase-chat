import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9NzPk4Oiik0jW5iBpwHw7-4VtOY50L8g",
  authDomain: "reactchat-f83c3.firebaseapp.com",
  projectId: "reactchat-f83c3",
  storageBucket: "reactchat-f83c3.appspot.com",
  messagingSenderId: "496498578953",
  appId: "1:496498578953:web:69e01853deeb7600868ad8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
