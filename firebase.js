// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyArB9tHEq6FpIBOV9TBRsiX4Dc_rEiZfYo",
	authDomain: "kotz-vision-project.firebaseapp.com",
	projectId: "kotz-vision-project",
	storageBucket: "kotz-vision-project.appspot.com",
	messagingSenderId: "545756176214",
	appId: "1:545756176214:web:84598e78027823498480f7",
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); // If no app is initialized, then initialize the app, else get the current app that we initialized,
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
