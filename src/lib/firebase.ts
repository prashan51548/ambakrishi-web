import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBjy9wjwtrvb9Xor15pvoWYGRJmMtf_4v4",
  authDomain: "krishi-kalyan-8ed9c.firebaseapp.com",
  databaseURL: "https://krishi-kalyan-8ed9c-default-rtdb.firebaseio.com",
  projectId: "krishi-kalyan-8ed9c",
  storageBucket: "krishi-kalyan-8ed9c.firebasestorage.app",
  messagingSenderId: "8561902289",
  appId: "1:8561902289:web:5fd85580e0eb038938bbf0",
  measurementId: "G-NFB4CLXXE7",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
