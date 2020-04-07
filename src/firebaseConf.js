import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCHz_TK2F9WlTDilwArSCvGubgNW8K7AVw",
  authDomain: "chat-app-in-30-minutes.firebaseapp.com",
  databaseURL: "https://chat-app-in-30-minutes.firebaseio.com",
  projectId: "chat-app-in-30-minutes",
  storageBucket: "chat-app-in-30-minutes.appspot.com",
  messagingSenderId: "319229764033",
  appId: "1:319229764033:web:bd47fba4f3eecb04964f40"
}

firebase.initializeApp(firebaseConfig)

export const database = firebase.database()
export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()