import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/storage'

import { readImageFromFile } from '../utils/readImageFromFile'
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
export const storageRef = firebase.storage().ref();

export const upload = (path, file, meta) => (
  file
  ? readImageFromFile(file)
    .then(  metadata => ({ ...metadata, contentType:file.type, file }) )
    .then( ({ file, image, ...rest }) => {
      const metadata = { ...rest, ...meta }
      return storageRef
        .child( path + '/' + file.name )
        .put( file,  metadata )
        .then( snapshot => snapshot.ref.getDownloadURL() )
        .then( url => ({ ...metadata, image, url }) )
        .catch( err => { throw err })
    })
  : Promise.resolve({})
)
export const uploadImage = (file, meta) => upload( 'images', file, meta )