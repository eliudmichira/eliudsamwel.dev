// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd0qxb840NOp5X-0GUZs1UAo2ZDURlGpc",
  authDomain: "eliudsamwels-b7195.firebaseapp.com",
  projectId: "eliudsamwels-b7195",
  storageBucket: "eliudsamwels-b7195.firebasestorage.app",
  messagingSenderId: "845406943446",
  appId: "1:845406943446:web:27d12312a5f8dcb97ef177",
  measurementId: "G-EQC4CW0EX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; 