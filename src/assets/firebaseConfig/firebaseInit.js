import firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"
import firebaseconfig from "./firebaseconfig"

const db = firebase.initializeApp(firebaseconfig)

export default db.firestore()