// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tgamesreview-fd88c.firebaseapp.com",
  projectId: "tgamesreview-fd88c",
  storageBucket: "tgamesreview-fd88c.appspot.com",
  messagingSenderId: "340643088356",
  appId: "1:340643088356:web:0c5cfe5319988fbbcce9f1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);