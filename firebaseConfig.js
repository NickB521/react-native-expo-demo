// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/auth';
import 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsbYhMgPHYeLXwhjc64ZC6y6SSwkp8i04",
  authDomain: "react-native-expo-1e170.firebaseapp.com",
  projectId: "react-native-expo-1e170",
  storageBucket: "react-native-expo-1e170.appspot.com",
  messagingSenderId: "1054144152048",
  appId: "1:1054144152048:web:a2e1f2dcb79aa5065edd35",
  measurementId: "G-SHJFRNTP59"
};

// Initialize Firebase
if(!firebaseConfig.apps.length){
    firebaseConfig.initializeApp(firebaseConfig)
}
export { firebase }