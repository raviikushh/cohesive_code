// Setup firebaase config and make sure only one instance of app is runnning 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXTiJZbO7uujaR22vX0LSZzRLZrzjcxQs",
  authDomain: "reat-182d1.firebaseapp.com",
  projectId: "reat-182d1",
  storageBucket: "reat-182d1.appspot.com",
  messagingSenderId: "850675467640",
  appId: "1:850675467640:web:4a18c9bd0c5d2d3e79b48d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);