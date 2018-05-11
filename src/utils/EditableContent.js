import React from 'react'
import { container,  buttons } from './EditableContent.module.css'
import { onEscape } from './onKeyDown'
import { Modal } from './Modal'

export class EditableContent extends React.Component{
  static defaultProps = {
    deleteInside:true,
    deleteOutside:false
  }
  state = { editMode: false }
  toggle = () => this.setState({editMode:!this.state.editMode})
  onCancel = () => this.setState({editMode:false})
  onSubmit = (data) => {
    this.setState({editMode:false});
    if(this.props.onSubmit){
      this.props.onSubmit(data)
    }
  }
  componentDidMount(){
    onEscape(this.onCancel)
  }
  render(){
    const { onSubmit:_remove, onDelete, form:Form, component:Comp, deleteOutside, deleteInside, ...props } = this.props
    const { editMode } = this.state
    const { onSubmit, onCancel, toggle } = this
    const buttonText = editMode ? '⎌' : '✎'
    return (
      <div className={container}>
        <Modal show={editMode} closeButton={true} onClose={onCancel}>
          <Form {...props} onSubmit={ onSubmit } onCancel={ onCancel }/>
        </Modal>
        <Comp {...props}/>
        <div className={buttons}>
          <button className="ok" onClick={toggle}>{buttonText}</button>
          { deleteOutside && <button className="no" onClick={onDelete}>✕</button> }
        </div>
      </div>
    )
  }
}

export const EditableCollection = ({elements, component, form, onDelete, onSubmit }) => (
  <>
  { elements.map( item => <EditableContent {...{ action:'update', component, form, onDelete, onSubmit,...item}}/>) }
  <EditableContent action="create" isCreateForm={true} {...{ component, form, onDelete, onSubmit}}/>
  </>
)

export default EditableContent