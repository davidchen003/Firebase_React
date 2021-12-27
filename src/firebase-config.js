// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from '@firebase/firestore' 

// shoud put these data in .env file
const firebaseConfig = {
    apiKey: "AIzaSyB5qOouIWoWRGBHLiLlcc0JtPKYhZ6lhiU",
    authDomain: "fireship-demos-87aa8.firebaseapp.com",
    projectId: "fireship-demos-87aa8",
    storageBucket: "fireship-demos-87aa8.appspot.com",
    messagingSenderId: "944066302130",
    appId: "1:944066302130:web:c9ca27c6f4afea9362b9ab", 
    measurementId: "G-M4WQDZ9B9E"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// connect Firebase
export const db = getFirestore(app)