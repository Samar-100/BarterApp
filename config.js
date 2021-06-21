import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDglM5fdINdgowtLH_8KhDkDT1YP-h4PCQ",
  authDomain: "barter-app-25225.firebaseapp.com",
  projectId: "barter-app-25225",
  storageBucket: "barter-app-25225.appspot.com",
  messagingSenderId: "427300520039",
  appId: "1:427300520039:web:c19639aa872eb0130014c2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
