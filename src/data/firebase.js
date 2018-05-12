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
db.settings({timestampsInSnapshots: true})
export const storageRef = firebase.storage().ref();

export const upload = (path, file, meta) => (
  file
  ? readImageFromFile(file)
    .then(  metadata => ({ ...metadata, contentType:file.type, file }) )
    .then( ({ file, image, ...rest }) => {
      const metadata = { ...rest, ...meta }
      const id = path + '/' + file.name
      return storageRef
        .child( id )
        .put( file,  metadata )
        .then( snapshot => snapshot.ref.getDownloadURL() )
        .then( url => ({ ...metadata, image, id, url }) )
        .catch( err => { throw err })
    })
  : Promise.resolve(null)
)

export const collectionToArray = docList =>{
  const docs = []
  docList.forEach(doc=>docs.push({...doc.data(),id:doc.id}))
  return docs
}

export const removeFile = (id) => storageRef.child(id).delete()

export const uploadImage = (file, meta) => upload( 'images', file, meta )