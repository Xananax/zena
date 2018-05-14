import React, { createElement as el } from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../Components/Img'
import { toast } from 'react-toastify'
import { FirebaseProvider, upload, removeFile, CREATE, DELETE, UPDATE } from '../Components/FirebaseProvider' 
import { slugify } from '../utils/slugify'
import { serializeForm } from '../utils/serializeForm'
import { render } from '../utils/markdown'
import { isEditMode } from '../utils/isEditMode'
import { Content } from '../Components/Content'
import { Page } from '../Components/Page'

const prepare = (item, action, batch) => {
  if(action === CREATE || action === UPDATE ){
    const { image, title, text, slug:_slug, id } = item
    const slug = _slug || slugify(title)
    const props = {
      title,
      text,
      html:render(text),
      slug,
      id:id||slug
    }
    if(image){
      const toastId = toast(`⏳ uploading ${image.name} 0%`, { type: toast.TYPE.INFO, autoClose: false });
      const onProgress = ( file, progress ) => toast.update(toastId, { render:`⏳ uploading ${file.name} ${ parseInt(progress*100,10) }%` });
      return upload(`/articles`,image, {}, onProgress).then( ({ free, image:img, ...image }) => {
        toast.update(toastId, { render:`✓ ${image.name} uploaded!`, autoClose:3000 });
        free && free()
        return ({ ...props, image })
      })
    }
    return props
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

const Pane = ({value:__html}) => (
  <div dangerouslySetInnerHTML={{__html}}/>
)

class Editor extends React.Component{
  state = { html:'' }
  handleForm = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    const form = evt.target;
    const data = serializeForm(form)
    const { action, process } = this.props
    const { title, date_from } = data.values
    if(!title){ return this.setState({error:`title is mandatory`}) }
    if(!date_from){ return this.setState({error:`starting date is mandatory`}) }
    this.setState({error:null})
    console.log(data.values)
    //process(action, data.values)
  }
  onChange = (evt) => {
    const value = evt.target.value
    this.setState({html:render(value)})
  }
  render(){
    const { id, slug, title, text, date_from, date_to } = this.props
    const { html, error } = this.state
    return (
      <form onSubmit={this.handleForm}>
        { error && <div>{error}</div>}
        <input type="hidden" name="id" defaultValue={id}/>
        <input type="hidden" name="slug" defaultValue={slug}/>
        <input name="title" placeholder="title" defaultValue={title}/>
        <input name="date_from" placeholder="starting date" type="date" defaultValue={date_from}/>
        <input name="date_to" placeholder="end date" type="date" defaultValue={date_to}/>
        <textarea onChange={this.onChange} name="text" placeholder="text" defaultValue={text}/>
        <input type="file" name="image"/>
        <Pane value={html}/>
        <input type="submit" value="ok"/>
      </form>
    )
  }
} 

const Image = ({ratioHeight, url, description, process, id}) =>
  <div className="article-image">
    <Img alt={description} src={url} width="100%" height="100%"/>
  </div>

const Event = ({ id, slug, html, title, text, image, process, editMode }) => 
  <div>
    <Image {...image}/>
    <h1>{title}</h1>
    <button onClick={()=>process(DELETE,{id})}>delete</button>
    <Pane value={html}/>
    { editMode && <Editor action="update" text={text} title={title} id={id} slug={slug} process={process}/> }
  </div>


const EventsList = (id) => ({ process, items, loading, updating }) => {
  let content;
  if(!id){
    content = items.map( event => el(Event, { key:event.id, process, ...event }))
  }else{
    if(id==='new'){
      content = <Editor action="create" process={process}/>
    }else{
      const item = items.find(({slug})=>(slug===id))
      if(item){
        content = el(Event, { process, ...item })
      }
    }
  }
  return (
    <Page>
      { content }
    </Page>
  )
}

export const Events = ({match:{ params:{event} }}) => 
  <FirebaseProvider collection='events' prepare={prepare}>
    { EventsList(event) }
  </FirebaseProvider>