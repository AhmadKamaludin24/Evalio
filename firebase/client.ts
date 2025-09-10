// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_nYyIvycgPOu6yypTTV6TCl-kTFh49KY",
  authDomain: "evalio-a6721.firebaseapp.com",
  projectId: "evalio-a6721",
  storageBucket: "evalio-a6721.firebasestorage.app",
  messagingSenderId: "74073434469",
  appId: "1:74073434469:web:7a37ba0a841c85b972d98c",
  measurementId: "G-P93Z094J0Z"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);