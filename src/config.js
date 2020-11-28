import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCbZrsMAV_q20cPVRAo9NEYj4Ssc0nIf1w",
    authDomain: "winter-moon-6261b.firebaseapp.com",
    databaseURL: "https://winter-moon-6261b.firebaseio.com",
    projectId: "winter-moon-6261b",
    storageBucket: "winter-moon-6261b.appspot.com",
    messagingSenderId: "329227805047",
    appId: "1:329227805047:web:c1ade674549d48bae80172",
    measurementId: "G-NNGZRHDR72"
};

firebase.initializeApp(firebaseConfig); //For initializing the App
const db = firebase.firestore(); //Connecting to firebase db
const auth = firebase.auth(); //For firebase authentication
const storage = firebase.storage(); //For saving images in firebase cloud

export { db, auth, storage };