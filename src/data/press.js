import { upload, removeFile, db, collectionToArray } from './firebase'
import { slugify } from '../utils/slugify'
import { dateToString } from '../utils/dateToString'

const collection = db.collection('press')

export const validators = {
  title(val){
    if(!val){
      throw new Error('title is mandatory')
    }
  },
  file(val){
    if(!val){
      throw new Error('file is mandatory')
    }
    return val.file
  },
  date(val){
    if(!val){
      throw new Error('file is mandatory')
    }
  }
}

export const defaults = {
  title:'',
  date:dateToString(new Date()),
  description:'',
  file:{}
}

const processDocs = cb => docList => cb(collectionToArray(docList))

export const get = (cb) => collection.get().then(processDocs(cb)).catch(e=>{throw e})

export const subscribe = (cb) => collection.orderBy('date','desc').onSnapshot(processDocs(cb))

export const process = ({ action,id,values }) => {
  console.log(action,values)
  return upload('press', values && values.file).then( file => {
    const item = file && file.url ? { ...values, file:{id:file.id, url:file.url, type:file.extension}} : values
    if( action === 'create' ){
      console.log(item)
      return collection.add({...item, slug:slugify(item.title)})
    }else if(id){
      const doc = collection.doc(id)
      if(action === 'update'){
        return doc.set(item,{merge:true})
      }else if(action === 'delete'){
        return doc.get().then( item => {
          const {file} = item.data();
          if(file){
            return removeFile(file.id).catch(e=>{console.log(e)})
          }
          return null
        })
        .then( () => doc.delete())
      }
    }
  }).catch(err=>{throw err})
}