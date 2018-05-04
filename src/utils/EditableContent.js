import React from 'react'
import { processSubmit } from './serializeForm'
import { editableContent, buttons, editMode as editModeClass } from './EditableContent.module.css'

export class EditableContent extends React.Component{
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
      <div className={editMode && editModeClass}>
        <div className={editableContent}>
          { editMode && 
            <form onSubmit={onSubmit} onAbort={onCancel}>
              <Form {...props}/>
              <input type="submit" value="ok"/>
              <input type="reset" value="cancel" onClick={onCancel}/>
            </form> 
          }
          <Comp {...props}/>
        </div>
        { !editMode && 
          <div className={buttons}>
            <button onClick={toggle}>{buttonText}</button>
            <button onClick={onDelete}>delete</button>
          </div>
        }
      </div>
    )
  }
}

export const EditableCollection = ({elements, component, form, onDelete, onSubmit }) => (
  <>
  { elements.map( item => <EditableContent {...{ component, form, onDelete, onSubmit,...item}}/>) }
  </>
)

export default EditableContent