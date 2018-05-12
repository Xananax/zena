import { uploadImage, db } from './firebase'
import { slugify } from '../utils/slugify'

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
    if(!val){ return }
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

const processDocs = cb => docList =>{
  const docs = []
  docList.forEach(doc=>docs.push({...doc.data(),id:doc.id}))
  docs.sort(({rank:a},{rank:b})=>a-b)
  cb(docs)
}

export const get = (cb) => db.collection('events').get().then(processDocs(cb)).catch(e=>{throw e})

export const subscribe = (cb) => db.collection('events').onSnapshot(processDocs(cb))

export const process = ({ action,id,values }) => {
  console.log(action,id,values)
  return uploadImage(values.image).then( image => {
    const event = image && image.url ? {...values,image:{width:image.width,height:image.height,url:image.url}} : values
    if( action === 'create' ){
      return db.collection('events').add({...event, slug:slugify(event.title)})
    }else if(id){
      if(action === 'update'){
        return db.collection('events').doc(id).set(event,{merge:true})
      }else if(action === 'delete'){
        return db.collection('events').doc(id).delete()
      }
    }
  })
}