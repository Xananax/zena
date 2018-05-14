import React, { createElement as el } from 'react'
import LazyLoad from 'react-lazyload';
import { FirebaseProvider, upload, removeFile, CREATE, DELETE, UPDATE } from '../Components/FirebaseProvider' 
import { toast } from 'react-toastify';
import { Content } from '../Components/Content'

const prepare = (item, action, batch) => {
  if(action === CREATE || action === UPDATE ){
    const { file, ...rest } = item
    const category = Object.keys(rest.categories)[0]
    if(file){
      const toastId = toast(`⏳ uploading ${file.name} 0%`, { type: toast.TYPE.INFO, autoClose: false });
      const onProgress = ( file, progress ) => toast.update(toastId, { render:`⏳ uploading ${file.name} ${ parseInt(progress*100,10) }%` });
      return upload(`/galleries/${category}`,file, {}, onProgress).then( ({ free, image:img, ...image }) => {
        toast.update(toastId, { render:`✓ ${file.name} uploaded!`, autoClose:3000 });
        free && free()
        return ({ ...rest, image })
      })
    }
    return rest
  }
  if( action === DELETE && item.image && item.image.id ){
    const image = item.image
    const id = image.id
    const toastId = toast(`⏳ deleting ${image.name}`, { type: toast.TYPE.INFO, autoClose: false });
    return removeFile(id)
      .catch(e=>{
        toast.update(toastId, { render:`❌ error deleting {file.name}`,type:'error', autoClose:3000})
        return true
      })
      .then((isError)=>{
        !isError && toast.update(toastId, { render:`✓ ${image.name} deleted`, autoClose:3000})
        return item
      })
  }
}

const handleFiles = (category, process) => (evt) => {
  const files = Array.prototype.slice.call(evt.target.files)
    .filter( file => file.type.split('/').shift() === 'image')
    .map( file => {
      const name = file.name.replace(/\.*?$/,'')
      const obj = { id:file.name, name, categories:{[category]:true}, file, order:0, description:'' }
      return obj
    })
  if(files.length){
    process(CREATE, files)
  }
}

const Image = ({ratioWidth, url, description, process, id}) =>
  <div className="gallery-image" style={{width:'100%', paddingBottom:(ratioWidth*100)+'%'}} title={description}>
    <LazyLoad height={'100%'}>
        <img alt={description} src={url} width="100%" height="100%"/>
    </LazyLoad>
    <div className="controls">
      <button onClick={()=>process(DELETE,{id})}>×</button>
    </div>
  </div>

const Gallery = (category) => ({ process, items, loading, updating }) => 
  <Content>
    { items.filter(({categories})=>(categories && categories[category])).map(({id, description, image:{ratioWidth, url}}) => el(Image, { key:id, id, ratioWidth, url, description, process }))}
    <input type="file" multiple onChange={handleFiles(category,process)}/>
  </Content>

export const Galleries = ({match:{ params:{category} }}) => 
  <FirebaseProvider collection='images' prepare={prepare} orderBy="image.id">
    { Gallery(category) }
  </FirebaseProvider>