import React from 'react'
import { Content } from '../wrappers/Content'
import { Image } from '../utils/Image'
import { Event, MainEvent } from './Exhibitions'
import { EditableContent, NewContent } from '../utils/EditableContent'
import { Field, Form } from '../utils/form'
import { subscribe, process, validators } from '../data/events'
import { addToast } from '../utils/Toast'
import { Spinner } from '../utils/Spinner'

export const EventForm = ({ id, name, action, title, date, description, rank, image:src, onSubmit, onCancel, children }) => (
  <Form onSubmit={onSubmit} validators={validators} onCancel={onCancel} name={name} action={action}>
    { ( { errors } ) => <>
        <h3>Edit Event</h3>
        <Field type="hidden"   name="id" defaultValue={id}/>
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
        { children }
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

export class ExhibitionsAdmin extends React.Component{

  state = { events: [], error:null, loading:true }
  
  onSubmit = ({ action, values }) => process(action,values).catch(this.onError)

  componentDidMount(){ this.unsubscribe = subscribe( events => this.setState({events,loading:false})) }

  componentWillUnmount(){ this.unsubscribe && this.unsubscribe(); }

  onError = ({ message:error }) => this.setState({error}, () => addToast(error,{type:'no'}))
  
  render(){
    const { onSubmit, state:{ events, loading } } = this
    return (
      <Content title="Events & Exhibitions">
        { loading 
        ? <Spinner inverted/>
        : <>
            <EditableContent name="events" action="update" component={MainEvent} form={EventUpdateForm} onSubmit={onSubmit} {...events[0]}/>
            { events.slice(1).map( (event) =>
                <EditableContent key={event.id} name="events" action="update" component={Event} form={EventUpdateForm} onSubmit={onSubmit} {...event}/>
            )}
            <NewContent name="events" action="create" form={EventForm} onSubmit={onSubmit}/>
          </>
        }
      </Content>
    )
  }
}