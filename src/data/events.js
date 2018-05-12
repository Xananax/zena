import { uploadImage, removeFile, collectionToArray, db } from './firebase'
import { slugify } from '../utils/slugify'

const collection = db.collection('events')

export const validators = {
  title(val){
    if(!val){
      throw new Error('title is mandatory')
    }
  },
  image(val){
    if(!val){ return }
    const { file, free, image } = val
    if(!image){
      throw new Error('file must be a valid image')
    }
    free && free()
    return file
  },
  rank(val){
    if(!val){ return 0 }
    val = parseInt(val)
    if(isNaN(val)){ throw new Error('rank must be a number')}
    return val;
  }
}

export const defaults = {
  title:'',
  date:'',
  image:null,
  rank:0,
  description:''
}

const processDocs = cb => docList => cb(collectionToArray(docList))

export const get = (cb) => collection.get().then(processDocs(cb)).catch(e=>{throw e})

export const subscribe = (cb) => collection.orderBy('rank','desc').onSnapshot(processDocs(cb))

export const process = ({ action,id,values }) => {
  return uploadImage(values && values.image).then( image => {
    const event = image && image.url ? {...values,image:{id:image.id, width:image.width,height:image.height,url:image.url}} : values
    if( action === 'create' ){
      return collection.add({...event, slug:slugify(event.title)})
    }else if(id){
      const doc = collection.doc(id)
      if(action === 'update'){
        return doc.set(event,{merge:true})
      }else if(action === 'delete'){
        console.log('ddddd')
        return doc.get().then( item => {
          const {image} = item.data();
          if(image){
            return removeFile(image.id).catch(e=>{console.log(e)})
          }
          return null
        })
        .then( () => doc.delete())
      }
    }
  })
}