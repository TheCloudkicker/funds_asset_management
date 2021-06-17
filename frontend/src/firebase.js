import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCzDO1ejrs55AFD_jByuZvTGoJe3ODDvWk",
    authDomain: "waibe-7c032.firebaseapp.com",
    databaseURL: "https://waibe-7c032.firebaseio.com",
    projectId: "waibe-7c032",
    storageBucket: "waibe-7c032.appspot.com",
    messagingSenderId: "651857132930",
    appId: "1:651857132930:web:7368c88d3d7e32b7fa639b",
    measurementId: "G-J70D8TRMZK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;