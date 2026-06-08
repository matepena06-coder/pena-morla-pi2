import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBSX7BozeMge8BuvRmqQsi71EUzyF_H28s",
  authDomain: "pi-pena-morla-2.firebaseapp.com",
  projectId: "pi-pena-morla-2",
  storageBucket: "pi-pena-morla-2.firebasestorage.app",
  messagingSenderId: "42076583863",
  appId: "1:42076583863:web:bc99e36ddb3ce4ddaa1a32"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.firestore()