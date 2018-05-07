import React from 'react'
import { processSubmit } from './serializeForm'
import { container, editableContent, buttons, formOverlay, closeButton, form as formClass, editMode as editModeClass } from './EditableContent.module.css'
import { onEscape } from './onKeyDown'

export class EditableContent extends React.Component{
  static defaultProps = {
    deleteInside:true,
    deleteOutside:false
  }
  state = { editMode: false }
  toggle = () => this.setState({editMode:!this.state.editMode})
  onCancel = () => this.setState({editMode:false})
  onSubmit = processSubmit((data) => {
    this.setState({editMode:false});
    if(this.props.onSubmit){
      this.props.onSubmit(data)
    }
  })
  componentDidMount(){
    onEscape(this.onCancel)
  }
  render(){
    const { onSubmit:_remove, onDelete, action, method, isCreateForm, form:Form, component:Comp, deleteOutside, deleteInside, ...props } = this.props
    const { editMode } = this.state
    const { onSubmit, onCancel, toggle } = this
    const buttonText = editMode ? '⎌' : '✎'
    return (
      <div className={container +(editMode ? ' '+editModeClass:'')}>
        <div className={editableContent}> 
          <div className={formClass}>
            <div className={formOverlay} onClick={onCancel}/>
            <form onSubmit={onSubmit} onAbort={onCancel} action={action} method={method}>
              <Form {...props}/>
              <input type="submit" value="ok" className="ok"/>
              <input type="reset" value="cancel" onClick={onCancel}/>
              { !isCreateForm && deleteInside && <input type="reset" className="no" onClick={onDelete} value="delete"/> }
              <input type="reset" className={closeButton} onClick={onCancel} value="✕"/>
            </form>
          </div>
          { Comp && <Comp {...props}/> }
        </div>
        { isCreateForm 
        ? <button onClick={toggle} className="ok big">+</button>
        : <div className={buttons}>
            <button className="ok" onClick={toggle}>{buttonText}</button>
            { deleteOutside && <button className="no" onClick={onDelete}>✕</button> }
          </div>
        }
      </div>
    )
  }
}

export const EditableCollection = ({elements, component, form, onDelete, onSubmit }) => (
  <>
  { elements.map( item => <EditableContent action="update" {...{ component, form, onDelete, onSubmit,...item}}/>) }
  <EditableContent action="create" isCreateForm={true} {...{ component, form, onDelete, onSubmit}}/>
  </>
)

export default EditableContent