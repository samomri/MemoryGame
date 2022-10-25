import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCBfWQ7U_mmvKMzwGcQgpH1C_dNnlzZajU',
  authDomain: 'memorygame-cec19.firebaseapp.com',
  projectId: 'memorygame-cec19',
  storageBucket: 'memorygame-cec19.appspot.com',
  messagingSenderId: '255426498689',
  appId: '1:255426498689:web:7466b4f7847601de9e3d80'
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);