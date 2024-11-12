import { initializeApp }  from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAlcuwwvy3wQp0jc9ZVK3k3ncd-mOtq8bg",
    authDomain: "hov24-c7777.firebaseapp.com",
    projectId: "hov24-c7777",
    storageBucket: "hov24-c7777.firebasestorage.app",
    messagingSenderId: "817065914087",
    appId: "1:817065914087:web:21e20e825c5dfa356fbc42",
    measurementId: "G-P6CYCFFRB4"
};
    
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);