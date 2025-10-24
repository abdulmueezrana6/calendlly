// src/firebase.js (hoặc tạo một tệp tương tự)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAT75KLZOf_kDgIHpFYtYgRFa0oFI4YOjA",
  authDomain: "linkpham-acf36.firebaseapp.com",
  projectId: "linkpham-acf36",
  storageBucket: "linkpham-acf36.firebasestorage.app",
  messagingSenderId: "1054816055803",
  appId: "1:1054816055803:web:3fbe48447c7d7a1eb9db5e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
