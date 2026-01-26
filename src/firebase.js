// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3nIYgnol7rJkn-Bc-5lKQDlIsymT_fWQ",
  authDomain: "sheworks-f3273.firebaseapp.com",
  projectId: "sheworks-f3273",
  storageBucket: "sheworks-f3273.firebasestorage.app",
  messagingSenderId: "489970831957",
  appId: "1:489970831957:web:8f01743ca257715ea73adc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);