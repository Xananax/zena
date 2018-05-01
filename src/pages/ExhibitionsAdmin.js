import React from 'react'
import { Content } from '../wrappers/Content'
import { Event, MainEvent } from './Exhibitions'
import { processSubmit } from '../utils/serializeForm'

class EditableContent extends React.Component{
  state = { editMode: false }
  toggle = () => this.setState({editMode:!this.state.editMode})
  onCancel = () => this.setState({editMode:false})
  onSubmit = processSubmit((data) => {
    this.setState({editMode:false});
    if(this.props.onSubmit){
      this.props.onSubmit(data)
    }
  })
  render(){
    const { onSubmit:_remove, onDelete, form:Form, component:Comp, ...props } = this.props
    const { editMode } = this.state
    const { onSubmit, onCancel, toggle } = this
    const buttonText = editMode ? 'cancel editing' : 'edit'
    return (
      <div>
        { editMode && 
          <form onSubmit={onSubmit} onAbort={onCancel}>
            <Form {...props}/>
            <input type="submit" value="ok"/>
            <input type="cancel" value="cancel"/>
          </form> 
        }
        <Comp {...props}/>
        <button onClick={toggle}>{buttonText}</button>
        <button onClick={onDelete}>delete</button>
      </div>
    )
  }
}

const EditableCollection = ({elements, component, form, onDelete, onSubmit }) => (
  <>
  { elements.map( item => <EditableContent {...{ component, form, onDelete, onSubmit,...item}}/>) }
  </>
) 

export const EventForm = ({ onSubmit, onCancel, title, date, description, image }) => (
  <fieldset>
    <input name="title" type="text" placeholder="title" value={title}/>
    <input name="date" type="text" placeholder="date" value={date}/>
    <textarea name="description" placeholder="description" value={description}/>
    <input type="file" name="image"/>
  </fieldset>
)

export const ExhibitionsAdmin = ({ galleries, events, mainEvent }) => (
  <Content className="" title="Events & Exhibitions">
    { mainEvent && <MainEvent {...mainEvent}/>}
    <EditableCollection elements={events} component={Event} form={EventForm}/>
  </Content>
)