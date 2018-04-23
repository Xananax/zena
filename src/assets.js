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

for(const dir in files.directories){
  const list = files.directories[dir]
  delete files.directories[dir]
  const key = removePath(dir)
  files.directories[key] = convertList(list)
}

for(const tag in files.tags){
  const list = files.tags[tag]
  files.tags[tag] = convertList(list)
}

module.exports = files