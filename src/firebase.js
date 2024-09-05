import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC3d0L3sht1HIzlFzOddbMbTZQ6TqBLxIo",
  authDomain: "sadakatasi-1.firebaseapp.com",
  projectId: "sadakatasi-1",
  storageBucket: "sadakatasi-1.appspot.com",
  messagingSenderId: "961190121816",
  appId: "1:961190121816:web:0119c26e7bd599e303552d",
  measurementId: "G-EWDWEZZYSZ",
  databaseURL: "https://sadakatasi-1-default-rtdb.europe-west1.firebasedatabase.app/" // Realtime Database URL
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Auth, Firestore ve Realtime Database referanslarını al
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export { auth, db, realtimeDb };
