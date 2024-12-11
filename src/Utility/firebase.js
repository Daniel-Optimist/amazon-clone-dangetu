// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";//modify this by adding /compat after firebase and comment it out 
import firebase from "firebase/compat/app";

//DKG- additional import I made for getauth function (notice these import setup may differ in previous and future setups); 
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiDmVhvnCtDy8YgE6uqiG864NW1m-D400",
  authDomain: "clone-dangetu.firebaseapp.com",
  projectId: "clone-dangetu",
  storageBucket: "clone-dangetu.firebasestorage.app",
  messagingSenderId: "218545011729",
  appId: "1:218545011729:web:655ef64653cae1ebf8c5b0",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig) // Use this line for compat

//DKG exports I made to make them available for use by other components 
export const auth= getAuth(app)
// export const db=app.firestore()
export const db = firebase.firestore(); // Use firebase.firestore() for compat ; Bek suggested export const db =app.firestore() could also work

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
