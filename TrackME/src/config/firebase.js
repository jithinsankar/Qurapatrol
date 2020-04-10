import * as firebase from 'firebase';
import '@firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyAu8yC4jjRKBxx4sARHJtd4soo8j89TTic",
    authDomain: "rnfbaspardo.firebaseapp.com",
    databaseURL: "https://rnfbaspardo.firebaseio.com",
    projectId: "rnfbaspardo",
    storageBucket: "rnfbaspardo.appspot.com",
    messagingSenderId: "251105491963",
    appId: "1:251105491963:web:34f1ef69eab963d7eae95e"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
export { auth, db, firebaseConfig, firebase, };
