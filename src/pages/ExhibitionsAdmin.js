import React from 'react'
import { Content } from '../wrappers/Content'
import { Image } from '../utils/Image'
import { Event, MainEvent } from './Exhibitions'
import { EditableContent, EditableCollection } from '../utils/EditableContent'
import { Field } from '../utils/Field'
import { uploadImage, db } from '../data/firebase'
import { Form } from '../utils/Form'

const validators = {
  title(val){
    if(!val){
      throw new Error('title is mandatory')
    }
  }
}

export const EventForm = ({ id, name, action, title, date, description, image:src, onSubmit, onCancel }) => (
  <Form onSubmit={onSubmit} validators={validators} onCancel={onCancel} name={name} action={action}>
    { ( { errors } ) => <>
        <h3>Edit Event</h3>
        <Field type="hidden" name="id" value={id}/>
        <Field type="text"     error={errors.title} name="title" value={title}/>
        <Field type="text"     error={errors.date} name="date" value={date}/>
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

export const ExhibitionsAdminList = ({ events, mainEvent, onSubmit }) => (
  <Content title="Events & Exhibitions">
    { mainEvent && <EditableContent name="events" action="update" component={MainEvent} form={EventForm} onSubmit={onSubmit} {...mainEvent}/>}
    { <EditableCollection name="events" elements={events} component={Event} form={EventForm} onSubmit={onSubmit}/> }
  </Content>
)

export class ExhibitionsAdmin extends React.Component{
  state = { events: [], error:null }
  onSubmit = (props) => {
    const { action, fields } = props;
    console.log(props);
    return;
    uploadImage(fields.image).then( image => {
      const event = image ? {...fields,image:{width:image.width,height:image.height,url:image.url}} : fields
      if( action === 'create' ){
        return db.collection('events').add(event)
        .then(({ id }) => this.setState({ events:[...this.state.events, { ...event, id }] }))
        .catch( error => this.setState({error:error.message}));
      }else if(props.id){
        if(action === 'update'){
          return db.collection('events').doc(props.id).set(event)
          .then(() => this.setState({ events:this.state.events.map(evt=>evt.id===props.id?event:evt)}))
          .catch( error => this.setState({error:error.message}))
        }else if(action === 'delete'){
          return db.collection('events').doc(props.id).delete()
          .then(() => this.setState({ events:this.state.events.filter(evt=>evt.id!==props.id)}))
          .catch( error => this.setState({error:error.message}))
        }
      }
    })
    
  }
  render(){
    const { events, mainEvent } = this.props
    const { onSubmit } = this
    const props = { events, mainEvent, onSubmit }
    return <ExhibitionsAdminList {...props}/>
  }
}