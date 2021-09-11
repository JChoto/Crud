
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD9ri-i_4vMyMzDUUh-kwZ7o_EMDQ3CGiA",
    authDomain: "react-957c5.firebaseapp.com",
    projectId: "react-957c5",
    storageBucket: "react-957c5.appspot.com",
    messagingSenderId: "911805713912",
    appId: "1:911805713912:web:d3a481148457a0397a9a0d"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const store = app.firestore();

  export{store}