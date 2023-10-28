
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



export const environment = {
  firebase: {
    apiKey: "AIzaSyAIzKf90lPGWkkfK0OFB606Q0XSgcXIOsE",
  authDomain: "storeinventory-6a08b.firebaseapp.com",
  projectId: "storeinventory-6a08b",
  storageBucket: "storeinventory-6a08b.appspot.com",
  messagingSenderId: "292249956400",
  appId: "1:292249956400:web:739a8107d8afaec35a7df5",
  measurementId: "G-SWVN1G8CE4"
  },
};


// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);
