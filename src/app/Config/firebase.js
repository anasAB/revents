import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2Ll84AVGdw9cPmkhI_iHDKcl93VohzpY",
  authDomain: "revents-4a681.firebaseapp.com",
  databaseURL: "https://revents-4a681.firebaseio.com",
  projectId: "revents-4a681",
  storageBucket: "revents-4a681.appspot.com",
  messagingSenderId: "709160805742",
  appId: "1:709160805742:web:ffdbb94320d6dc12170d7f",
  measurementId: "G-BP72RDS31M",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
