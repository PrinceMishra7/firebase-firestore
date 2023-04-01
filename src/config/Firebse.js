import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBcvQt-cNWYXZ4lXRVYbpPrAmMO2Qw56L4",
  authDomain: "adbmsexp6-4525d.firebaseapp.com",
  projectId: "adbmsexp6-4525d",
  storageBucket: "adbmsexp6-4525d.appspot.com",
  messagingSenderId: "798362824321",
  appId: "1:798362824321:web:8003d0f2c7105d7e29a780",
  measurementId: "G-TY0EKXS1ME"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider() 

export const db=getFirestore(app)


