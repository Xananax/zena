import { uploadImage, removeFile, collectionToArray, db } from './firebase'
import { slugify } from '../utils/slugify'

const collection = db.collection('images')

export const validators = {
  image(val){
    if(!val){ 
      throw new Error(`image is mandatory`)
    }
    const { file, free, image } = val
    if(!image){
      throw new Error('file must be a valid image')
    }
    free && free()
    return file
  },
  categories(val){
    if(!val || !val.length){
      throw new Error(`you need to include at least one category`)
    }
    if(typeof val === 'string'){
      return val.split(',').map(s=>s.trim())
    }
  }
}

export const defaults = {
  title:'',
  image:null,
  rank:0,
  description:'',
  categories:[]
}

const processDocs = cb => docList => cb(collectionToArray(docList))

export const get = (cb) => collection.get().then(processDocs(cb)).catch(e=>{throw e})

export const subscribe = (cb) => collection.onSnapshot(processDocs(cb))

export const process = ({ action,id,values }) => {
  console.log(action,id,values)
  return uploadImage(values && values.image).then( image => {
    const item = image && image.url ? {...values,image:{id:image.id, width:image.width,height:image.height,url:image.url}} : values
    if( action === 'create' ){
      return collection.add({...item, slug:item.title && slugify(item.title) || '' })
    }else if(id){
      const doc = collection.doc(id)
      if(action === 'update'){
        return doc.set(item,{merge:true})
      }else if(action === 'delete'){
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