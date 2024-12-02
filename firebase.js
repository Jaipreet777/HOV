import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
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
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Export required Firebase services and providers
export { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  googleProvider, 
  signInWithPopup, 
  db, // Export Firestore
  storage // Export Storage
};
