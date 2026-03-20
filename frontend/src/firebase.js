
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from 'firebase/auth';


// const firebaseConfig = {
//   apiKey: "AIzaSyAbPzHU1H7B6d0brgALHXegrxOCqWA6GlU",
//   authDomain: "outreachaicalling.firebaseapp.com",
//   projectId: "outreachaicalling",
//   storageBucket: "outreachaicalling.firebasestorage.app",
//   messagingSenderId: "589301280148",
//   appId: "1:589301280148:web:8ffd1e760f99b42654f381",
//   measurementId: "G-8R047BFS6Q"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logOut = () => signOut(auth);
export { onAuthStateChanged };