// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import  { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyCYRCSvovS2A9-vtx7XuhhR8S4wdP49vVc",

  authDomain: "pantrytrackerapp-e7603.firebaseapp.com",

  projectId: "pantrytrackerapp-e7603",

  storageBucket: "pantrytrackerapp-e7603.appspot.com",

  messagingSenderId: "443503216677",

  appId: "1:443503216677:web:625189f5214c221ebe57cc",

  measurementId: "G-S58K7LV521"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore= getFirestore(app)
const storage = getStorage(app);
export { app, firestore, storage}