import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCczxbF4PKESrMw6HXuQE5CuK4J23kib0I",
  authDomain: "frequencia-cc90a.firebaseapp.com",
  projectId: "frequencia-cc90a",
  storageBucket: "frequencia-cc90a.firebasestorage.app",
  messagingSenderId: "979020215687",
  appId: "1:979020215687:web:d19f33c6866a9f796e4f22"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const loginWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return signOut(auth);
};