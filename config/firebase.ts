import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGvkdWkDyQZPzSLtNllnJaCJ4XIWvtyQo",
  authDomain: "eliudsamwel-dev.firebaseapp.com",
  projectId: "eliudsamwel-dev",
  storageBucket: "eliudsamwel-dev.firebasestorage.app",
  messagingSenderId: "268606828310",
  appId: "1:268606828310:web:c1a6e8a3c925215b4dea37",
  measurementId: "G-WHNLGQ6TS6"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);
const db: Firestore = getFirestore(app);

export { app, analytics, db };
