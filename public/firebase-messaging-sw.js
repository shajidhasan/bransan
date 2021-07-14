importScripts('https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.3/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBVX9U5QKfsnK_riVTVz_EPhx5OK1OVRZc",
    authDomain: "bransanprogressbars.firebaseapp.com",
    projectId: "bransanprogressbars",
    storageBucket: "bransanprogressbars.appspot.com",
    messagingSenderId: "664667945076",
    appId: "1:664667945076:web:1e644f710444ce7c6a3921"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const messaging = firebaseApp.messaging();
