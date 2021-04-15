import firebaseapp from "firebase/app";

import "firebase/firebase-auth";
import "firebase/firebase-firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBMsPH_ERKd4bRB3fEEChaPHC1o5qyoe5o",
  authDomain: "linkenator-firebase.firebaseapp.com",
  projectId: "linkenator-firebase",
  storageBucket: "linkenator-firebase.appspot.com",
  messagingSenderId: "552644696274",
  appId: "1:552644696274:web:f2b1ecdd057da623b3350b",
  measurementId: "G-1LKQC7RGRT",
};

export const firebase = firebaseapp.initializeApp(firebaseConfig)


