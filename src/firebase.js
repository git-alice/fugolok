import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyARhtmm26jC_ESVqK-4FPYNnQE8ezOum0U",
    authDomain: "ugolok-auth.firebaseapp.com",
    databaseURL: "https://ugolok-auth.firebaseio.com",
    projectId: "ugolok-auth",
    storageBucket: "ugolok-auth.appspot.com",
    messagingSenderId: "101088774157",
    appId: "1:101088774157:web:06e90df93e5c23d90b6d44"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()


// collection references
const usersCollection = db.collection('users')

// export utils/refs
export {
    db,
    auth,
    storage,
    usersCollection
}