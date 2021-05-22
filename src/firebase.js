import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    // Here your firebase API key
})

const db = firebaseApp.firestore();
export default db;