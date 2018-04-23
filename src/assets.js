const files = require('./images/images.json')
const items = files.items

const removePath = (p) => p.replace(/^\.?\/?src\/images\//,'')
const getFile = id => items[id]
const convertList = list => list.map(getFile)

files.types.image
  .forEach(id=>{
    const file = getFile(id)
    const src = removePath(file.filePath)
    file.src = require('./images/'+src)
    return file
  })

const newDirs = {}
Object.keys(files.directories).forEach(dir=>{
  const list = files.directories[dir]
  const key = removePath(dir)
  newDirs[key] = convertList(list)
})
files.directories = newDirs

const newTags = {}
Object.keys(files.tags).forEach(tag=>{
  const list = files.tags[tag]
  if(!/src|images/.test(tag)){ 
    newTags[tag] = convertList(list)
  }
})
files.tags = newTags

module.exports = files