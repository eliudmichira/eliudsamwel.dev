import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

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
const auth: Auth = getAuth(app);

// Only this Google account can open the #admin dashboard.
// Keep in sync with isAdmin() in firestore.rules, which is what actually enforces it.
const ADMIN_EMAIL = "eliudmichira7@gmail.com";

export { app, analytics, db, auth, ADMIN_EMAIL };
