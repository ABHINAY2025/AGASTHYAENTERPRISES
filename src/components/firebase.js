// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'; // Firebase initialization
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkZ2fnyYua7-jC7_Iw7S_o7HVkzm9o3p0",
  authDomain: "agasthya-enterprises.firebaseapp.com",
  projectId: "agasthya-enterprises",
  storageBucket: "agasthya-enterprises.firebasestorage.app",
  messagingSenderId: "47614470315",
  appId: "1:47614470315:web:06e21f22cda64667cc2fee",
  measurementId: "G-2RHC16R8NN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app); // Firestore instance (db)

// Default export Firestore instance
export default db;

// Named exports for Firestore functions
export { getFirestore, collection, addDoc, getDocs };
