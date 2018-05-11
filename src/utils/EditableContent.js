import React from 'react'
import { container,  buttons, editableContent } from './EditableContent.module.css'
import { onEscape } from './onKeyDown'
import { Modal } from './Modal'

export class TogglableContent extends React.Component{
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
}

export class EditableContent extends TogglableContent{
  static defaultProps = {
    deleteInside:true,
    deleteOutside:false
  }
  render(){
    const { onSubmit:_remove, onDelete, form:Form, component:Comp, ...props } = this.props
    const { editMode } = this.state
    const { onSubmit, onCancel, toggle } = this
    const buttonText = editMode ? '⎌' : '✎'
    return (
      <div className={container}>
        <Modal show={editMode} closeButton={true} onClose={onCancel}>
          <Form {...props} action="update" onSubmit={ onSubmit } onCancel={ onCancel }/>
        </Modal>
        <div className={editableContent}>
        < Comp {...props}/>
        </div>
        <div className={buttons}>
          <button className="ok" onClick={toggle}>{buttonText}</button>
        </div>
      </div>
    )
  }
}

export class NewContent extends TogglableContent{
  render(){
    const { onSubmit:_remove, onDelete, form:Form, ...props } = this.props
    const { editMode } = this.state
    const { onSubmit, onCancel, toggle } = this
    const buttonText = editMode ? '⎌' : '+'
    return (
      <div className={container}>
        <Modal show={editMode} closeButton={true} onClose={onCancel}>
          <Form {...props} action="create" onSubmit={ onSubmit } onCancel={ onCancel }/>
        </Modal>
        <button onClick={toggle} className="ok big">{buttonText}</button>
      </div>
    )
  }
}

export default EditableContent