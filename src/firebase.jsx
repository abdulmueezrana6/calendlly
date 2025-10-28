// src/firebase.js (hoặc tạo một tệp tương tự)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCaVsRlCZ22L79bvwLNqihMNtqVbf3hwCc",
  authDomain: "rebull8725376457623.firebaseapp.com",
  projectId: "rebull8725376457623",
  storageBucket: "rebull8725376457623.firebasestorage.app",
  messagingSenderId: "76926474168",
  appId: "1:76926474168:web:97a9d330f339193337214d"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
