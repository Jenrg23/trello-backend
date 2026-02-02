// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChlxltia9sBOrSJO7EoUOOGZYVsW8Jbn4",
  authDomain: "trello-ce899.firebaseapp.com",
  projectId: "trello-ce899",
  storageBucket: "trello-ce899.firebasestorage.app",
  messagingSenderId: "394511651760",
  appId: "1:394511651760:web:371538c8aaf9941cdb3c75",
  measurementId: "G-SMBNCR96QF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);