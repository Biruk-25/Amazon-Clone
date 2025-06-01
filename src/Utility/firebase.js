
import { initializeApp } from "firebase/app";

//Firebase Authentication
import { getAuth } from "firebase/auth";  
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh5Y_IEclzHtqHAi-1-nl1l3RVAJS6AHE",
  authDomain: "clone-c5a71.firebaseapp.com",
  projectId: "clone-c5a71",
  storageBucket: "clone-c5a71.appspot.com",
  messagingSenderId: "1045673008660",
  appId: "1:1045673008660:web:e0392959f501415556d101",
  measurementId: "G-CDNZ5L9H1G"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 
