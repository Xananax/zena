import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyDp5UfD6wY-VDWqUlqy56T9pbJUCfvp2xw",
  authDomain: "test-d72ad.firebaseapp.com",
  databaseURL: "https://test-d72ad.firebaseio.com",
  projectId: "test-d72ad",
  storageBucket: "test-d72ad.appspot.com",
  messagingSenderId: "749984511813"
};

firebase.initializeApp(config);
export const db = firebase.firestore();

db.settings({timestampsInSnapshots: true})
export const storage = firebase.storage().ref();