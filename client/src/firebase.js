// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLNu8z_6rGQFIyzq4mmxTYuhcrpHabmEs",
  authDomain: "sample-17fcf.firebaseapp.com",
  projectId: "sample-17fcf",
  storageBucket: "sample-17fcf.firebasestorage.app",
  messagingSenderId: "169020471492",
  appId: "1:169020471492:web:64b5facce374b7848bb191",
  measurementId: "G-W22SD1L034"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
