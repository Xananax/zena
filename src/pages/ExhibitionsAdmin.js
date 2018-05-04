import React from 'react'
import { Content } from '../wrappers/Content'
import { Event, MainEvent } from './Exhibitions'
import { EditableContent, EditableCollection } from '../utils/EditableContent'
import { Field } from '../utils/Field'


export const EventForm = ({ id, onSubmit, onCancel, title, date, description, image }) => (
  <fieldset>
    <Field type="hidden"   name="id" value={id}/>
    <Field type="text"     name="title" value={title}/>
    <Field type="text"     name="date" value={date}/>
    <Field type="textarea" name="description" value={description}/>
    <Field type="file" name="image"/>
  </fieldset>
)

export const ExhibitionsAdmin = ({ galleries, events, mainEvent }) => (
  <Content className="" title="Events & Exhibitions">
    { mainEvent && <EditableContent component={MainEvent} form={EventForm} onSubmit={thing=>console.log(thing)} {...mainEvent}/>}
    <EditableCollection elements={events} component={Event} form={EventForm} onSubmit={(thing)=>console.log(thing)}/>
  </Content>
)