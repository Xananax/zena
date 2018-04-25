import images from './images'
import articles from './articles'

const removePath = ( p ) => p.replace(/^\.?\//,'')
const getFile = (repo, id) => repo.items[id]
const convertList = (repo, list) => list.map(getFile.bind(null,repo))
const SKIP = {}
const mapIndex = (obj, fn) => {
  const newObj = {}
  if(!obj){ return newObj }
  Object.keys(obj).forEach( oldKey => {
    const list = obj[oldKey]
    const result = fn(oldKey,list);
    if(result === SKIP || result === undefined ){ return }
    const [ key, value ] = result
    newObj[key] = value
  })
  return newObj
}


images.types.image
  .forEach( id => {
    const file = getFile(images, id)
    const src = removePath(file.filePath).replace(/^images\//,'')
    file.src = require('./images/'+src)
    file.key = src
    return file
  })

  articles.types.document = articles.types.document
  .map( id => {
    const file = getFile(articles, id)
    const src = removePath(file.filePath).replace(/^articles\//,'')
    const title = file.basename.replace(/^[0-9a-zA-Z]-/,'').replace(/-/g,' ')
    file.title = title
    file.src = require('./articles/'+src)
    file.key = src
    return file
  })

images.directories = mapIndex(images.directories,(dir,list)=>{
  const key = removePath(dir).replace(/^images\//,'')
  const value = convertList(images, list)
  return [ key, value ]
})


images.tags = mapIndex(images.tags, (tag, list)=>{
  if(/src|images/.test(tag)){ 
    return SKIP
  }
  const value = convertList(images, list)
  return [ tag, value ]
})


articles.tags = mapIndex(articles.tags, (tag, list)=>{
  if(/src/.test(tag)){ 
    return SKIP
  }
  const value = convertList(articles, list)
  return [ tag, value ]
})

export { images, articles }
export default images