// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import 'dotenv/config'
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "webdev-4e0bf.firebaseapp.com",
  projectId: "webdev-4e0bf",
  storageBucket: "webdev-4e0bf.firebasestorage.app",
  messagingSenderId: "161805839735",
  appId: "1:161805839735:web:7b0e2c04648355b04fc572",
  measurementId: "G-B8B6VZ6TMR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // <-- ADD THIS LINE



export { auth }; // <-- ADD THIS LINE
export { db }; // <-- Add this line

export async function addClient(name, email) {
  try {
    const docRef = await addDoc(collection(db, "clients"), {
      name,
      email,
      createdAt: new Date(),
    });
    console.log("Client added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding client: ", e);
  }
}
