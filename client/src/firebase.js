import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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
export const db = getDatabase(app);
