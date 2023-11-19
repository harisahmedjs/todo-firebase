import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyC85HCqQUN2qH9CpA_29BDLH7i92NOfp18",
  authDomain: "haris-todo.firebaseapp.com",
  projectId: "haris-todo",
  storageBucket: "haris-todo.appspot.com",
  messagingSenderId: "826431249546",
  appId: "1:826431249546:web:e2a499918380de3ea86173",
  measurementId: "G-4GVT3R0YMR"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);