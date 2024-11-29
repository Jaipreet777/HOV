// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "h-o-v-fd687.firebaseapp.com",
  projectId: "h-o-v-fd687",
  storageBucket: "h-o-v-fd687.firebasestorage.app",
  messagingSenderId: "909555483126",
  appId: "1:909555483126:web:05f662a5c4dcbd2652c7d7",
  measurementId: "G-DEQ13N0S0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export required Firebase services and providers
const googleProvider = new GoogleAuthProvider();

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, googleProvider, signInWithPopup };
