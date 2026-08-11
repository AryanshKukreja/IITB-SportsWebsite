import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey:            "AIzaSyCZwMj0rXIv7q1io0PkozWrHoSuw10q840",
  authDomain:        "matchpredictions-iitbsportsweb.firebaseapp.com",
  databaseURL:       "https://matchpredictions-iitbsportsweb-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId:         "matchpredictions-iitbsportsweb",
  storageBucket:     "matchpredictions-iitbsportsweb.firebasestorage.app",
  messagingSenderId: "271440988360",
  appId:             "1:271440988360:web:3f25b47160ceb7615efdfd",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);