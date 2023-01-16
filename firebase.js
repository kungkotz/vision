// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBU9yQLsyPCPGolI64Ge5tfLfY6DA48ffU",
	authDomain: "vision-kotz.firebaseapp.com",
	projectId: "vision-kotz",
	storageBucket: "vision-kotz.appspot.com",
	messagingSenderId: "301080240403",
	appId: "1:301080240403:web:8a5d9e43de36770fdf7ae6",
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); // If no app is initialized, then initialize the app, else get the current app that we initialized,
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
