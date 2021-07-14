import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging'; 

const firebaseConfig = {
    apiKey: "AIzaSyBVX9U5QKfsnK_riVTVz_EPhx5OK1OVRZc",
    authDomain: "bransanprogressbars.firebaseapp.com",
    projectId: "bransanprogressbars",
    storageBucket: "bransanprogressbars.appspot.com",
    messagingSenderId: "664667945076",
    appId: "1:664667945076:web:1e644f710444ce7c6a3921"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
let messaging = null;
try {
    messaging = firebaseApp.messaging();
}
catch (err) {
    console.log("This browser doesn't support Firebase Messaging.");
}
export {db, messaging};
