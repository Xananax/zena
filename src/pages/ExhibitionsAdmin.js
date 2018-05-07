import React from 'react'
import { Content } from '../wrappers/Content'
import { Image } from '../utils/Image'
import { Event, MainEvent } from './Exhibitions'
import { EditableContent, EditableCollection } from '../utils/EditableContent'
import { Field } from '../utils/Field'
import { uploadImage, db } from '../data/firebase'

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

export const ExhibitionsAdminList = ({ events, mainEvent, onSubmit }) => (
  <Content className="" title="Events & Exhibitions">
    { mainEvent && <EditableContent name="events" action="update" component={MainEvent} form={EventForm} onSubmit={onSubmit} {...mainEvent}/>}
    <EditableCollection name="events" elements={events} component={Event} form={EventForm} onSubmit={onSubmit}/>
  </Content>
)

export class ExhibitionsAdmin extends React.Component{
  state = { events: [], error:null }
  onSubmit = (props) => {
    const { action, fields } = props;
    if(!fields.title){
      alert('oh noes! a title is necessary')
      return
    }
    uploadImage(fields.image).then( image => {
      const event = image ? {...fields,image:{width:image.width,height:image.height,url:image.url}} : fields
      if( action === 'create' ){
        return db.collection('events').add(event)
        .then(({ id }) => this.setState({ events:[...this.state.events, { ...event, id }] }))
        .catch( error => this.setState({error:error.message}));
      }else if(props.id){
        return db.collection('events').doc(props.id).set(event)
        .then(() => this.setState({ events:this.state.events.map(evt=>evt.id===props.id?event:evt)}))
        .catch( error => this.setState({error:error.message}))
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