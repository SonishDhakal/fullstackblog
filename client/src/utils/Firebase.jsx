// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "fullstackblogapp.firebaseapp.com",
  projectId: "fullstackblogapp",
  storageBucket: "fullstackblogapp.appspot.com",
  messagingSenderId: "864839429790",
  appId: "1:864839429790:web:fb95caa73eb76af0a6158f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =  getAuth(app);
export const storage = getStorage(app);

