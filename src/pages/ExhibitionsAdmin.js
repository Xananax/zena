import React from 'react'
import { Content } from '../wrappers/Content'
import { Image } from '../utils/Image'
import { Event, MainEvent } from './Exhibitions'
import { EditableContent, NewContent } from '../utils/EditableContent'
import { Field } from '../utils/Field'
import { uploadImage, db } from '../data/firebase'
import { Form } from '../utils/Form'
import { addToast } from '../utils/Toast'
import { slugify } from '../utils/slugify'

const validators = {
  title(val){
    if(!val){
      throw new Error('title is mandatory')
    }
  }
}

export const EventForm = ({ id, name, action, title, date, description, rank, image:src, onSubmit, onCancel }) => (
  <Form onSubmit={onSubmit} validators={validators} onCancel={onCancel} name={name} action={action}>
    { ( { errors } ) => <>
        <h3>Edit Event</h3>
        <Field type="hidden" name="id" defaultValue={id}/>
        <Field type="text"     error={errors.title} name="title" value={title}/>
        <Field type="text"     error={errors.date} name="date" value={date}/>
        <Field type="number"   error={errors.rank} name="rank" value={rank}/>
        <Field type="textarea" error={errors.description} name="description" value={description}/>
        <Field type="file" error={errors.file} name="image" className="ok"/>
        <br/>
        { src 
        ? <Image cover style={{width:100,height:100}} loaded src={src}/>
        : <span>no image</span>
        }
    </>}
  </Form>
)

export const EventDeleteForm = ({ id, name, onSubmit }) => (
  <Form onSubmit={onSubmit} name={name} action='delete' okLabel="delete" okClassName="no">
    { ()=> <Field type="hidden" name="id" defaultValue={id}/>}
  </Form>
)

export const EventUpdateForm = (props) => (
  <>
    <EventForm action='update' {...props}/>
    <EventDeleteForm {...props}/>
  </>
)

export const ExhibitionsAdminList = ({ events, onSubmit }) => (
  <Content title="Events & Exhibitions">
    { events.length 
    ? <>
        <EditableContent name="events" action="update" component={MainEvent} form={EventUpdateForm} onSubmit={onSubmit} {...events[0]}/>
        { events.slice().map( (event) =>
            <EditableContent key={event.id} name="events" action="update" component={Event} form={EventUpdateForm} onSubmit={onSubmit} {...event}/>
        )}
      </>
    : null
    }
  <NewContent name="events" action="create" form={EventForm} onSubmit={onSubmit}/>
  </Content>
)

export class ExhibitionsAdmin extends React.Component{
  state = { events: [], error:null }
  onSubmit = (props) => {
    const { action, fields } = props;
    console.log(action,fields)
    uploadImage(fields.image).then( image => {
      const event = image && image.url ? {...fields,image:{width:image.width,height:image.height,url:image.url}} : fields
      if( action === 'create' ){
        return db.collection('events').add({...event, slug:slugify(event.title)})
        .then(({ id }) => addToast(`new event '${fields.title}' created`))
        .catch(this.onError);
      }else if(fields.id){
        if(action === 'update'){
          return db.collection('events').doc(fields.id).set(event,{merge:true})
          .then(() => addToast(`event '${fields.title}' updated`))
          .catch(this.onError)
        }else if(action === 'delete'){
          return db.collection('events').doc(fields.id).delete()
          .then(() => addToast(`event '${fields.title}' deleted`))
          .catch(this.onError)
        }
      }
    }) 
  }
  componentDidMount(){
    this.unsubscribe = db.collection('events').onSnapshot( docList =>{
      const docs = []
      docList.forEach(doc=>docs.push({...doc.data(),id:doc.id}))
      docs.sort(({rank:a},{rank:b})=>a-b)
      this.setState({events:docs})
    })
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  onError = (error) => {
    const { message } = error
    addToast(message,{type:'no'})
    this.setState({error:message})
  }
  render(){
    const { events } = this.state
    const { onSubmit } = this
    const props = { events, onSubmit }
    return <ExhibitionsAdminList {...props}/>
  }
}