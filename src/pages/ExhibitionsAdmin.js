import React from 'react'
import { Content } from '../wrappers/Content'
import { Image } from '../utils/Image'
import { Event, MainEvent } from './Exhibitions'
import { EditableContent, EditableCollection } from '../utils/EditableContent'
import { Field } from '../utils/Field'
// import { upload } from '../data/firebase'

export const EventForm = ({ id, title, date, description, image:src }) => (
  <fieldset>
    <Field type="hidden"   name="id" value={id}/>
    <Field type="text"     name="title" value={title}/>
    <Field type="text"     name="date" value={date}/>
    <Field type="textarea" name="description" value={description}/>
    <Field type="file" name="image" className="ok"/>
    <br/>
    { src 
    ? <Image cover style={{width:100,height:100}} loaded src={src}/>
    : <span>no image</span>
    }
  </fieldset>
)

export const ExhibitionsAdmin = ({ events, mainEvent }) => (
  <Content className="" title="Events & Exhibitions">
    { mainEvent && <EditableContent component={MainEvent} form={EventForm} onSubmit={thing=>console.log(thing)} {...mainEvent}/>}
    <EditableCollection elements={events} component={Event} form={EventForm} onSubmit={(thing)=>console.log(thing)}/>
  </Content>
)