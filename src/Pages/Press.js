import React, { createElement as el } from 'react'
import { FirebaseProvider, upload, removeFile, CREATE, DELETE, UPDATE } from '../Components/FirebaseProvider' 
import { toast } from 'react-toastify';
import { isEditMode } from '../utils/isEditMode'
import { Content } from '../Components/Content'

const prepare = (item, action, batch) => {
  if(action === CREATE || action === UPDATE ){
    const { file, year:_year, month:_month, day:_day, title, ...rest } = item
    const year = _year || '2000'
    const month = _month || '01'
    const day = _day || '01'
    const time = [year,month,day].join('-')
    const id = time+'-'+title
    const props = { year, month, day, time, title, id, ...rest }
    if(file){
      const toastId = toast(`⏳ uploading ${file.name} 0%`, { type: toast.TYPE.INFO, autoClose: false });
      const onProgress = ( file, progress ) => toast.update(toastId, { render:`⏳ uploading ${file.name} ${ parseInt(progress*100,10) }%` });
      return upload(`/press/${year}`,file, {}, onProgress).then( (file) => {
        toast.update(toastId, { render:`✓ ${file.name} uploaded!`, autoClose:3000 });
        const obj = ({ ...props, file })
        console.log(obj)
        return obj
      })
    }
    return props
  }
  if( action === DELETE && item.file && item.file.id ){
    const file = item.file
    const id = file.id
    const toastId = toast(`⏳ deleting ${file.name}`, { type: toast.TYPE.INFO, autoClose: false });
    return removeFile(id)
      .catch(e=>{
        toast.update(toastId, { render:`❌ error deleting {file.name}`,type:'error', autoClose:3000})
        return true
      })
      .then((isError)=>{
        !isError && toast.update(toastId, { render:`✓ ${file.name} deleted`, autoClose:3000})
        return item
      })
  }
}

const handleFiles = (process) => (evt) => {
  const files = Array.prototype.slice.call(evt.target.files)
    .filter( file => {
      const type = file.type.split('/')[1]
      return type === 'pdf' || type === 'documents'
    })
    .map( file => {
      const name = file.name.replace(/\.*?$/,'')
      const [ year, month, day, ...rest ] = name.split('-')
      const title = rest.join(' ')
      const obj = { title, name, year, month, day, file }
      return obj
    })
  if(files.length){
    process(CREATE, files)
  }
}

const PressItem = ({ year, month, name, day, url, extension }) =>
  <div className="file">{name}</div>

const Page = (_year) => ({ process, items, loading, updating }) => 
  <Content>
    { (_year ? items.filter(({year})=>(year === _year)) : items ).map(({id, title, file}) => el(PressItem, { key:id, ...file }))}
    { isEditMode() && <input type="file" multiple onChange={handleFiles(process)}/> }
  </Content>

export const Press = ({match:{ params:{year} }}) => 
  <FirebaseProvider collection="press" prepare={prepare} orderBy="year">
    { Page(year) }
  </FirebaseProvider>