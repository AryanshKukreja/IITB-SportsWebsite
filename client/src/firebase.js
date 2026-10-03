import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYJYcY8g0HlTlYE6URz1RjwT-pU12hxeo",
  authDomain: "iitb-gc-26-27.firebaseapp.com",
  databaseURL: "https://iitb-gc-26-27-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "iitb-gc-26-27",
  storageBucket: "iitb-gc-26-27.firebasestorage.app",
  messagingSenderId: "469460404402",
  appId: "1:469460404402:web:4889301de41890e49621ab",
  measurementId: "G-LLG7KP2KMV"
};

const app = initializeApp(firebaseConfig);
const feedbackApp = initializeApp(firebaseConfig, "feedback");
export const db = getDatabase(app);
export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
export const adminStorage = getStorage(app);
export const feedbackAuth = getAuth(feedbackApp);
export const feedbackDb = getFirestore(feedbackApp);
export const feedbackStorage = getStorage(feedbackApp);
