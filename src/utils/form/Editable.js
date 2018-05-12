import { createElement as el, Component, Children } from 'react'
import { Field as Input } from './Field'
import { onEscape } from '../onKeyDown'
import css from './Editable.module.css'
import classnames from 'classnames'

export class Field extends Component{
  
  render(){
    const { tag, editMode, onChange, disabled, error, onSubmit:_remove, className, name, value, type, validator, editor:Editor, ...rest } = this.props
    const props = { ...rest, tabIndex:1, className:classnames(className, css.editable, editMode && 'edit-mode') }

    const editor = editMode ? el(Input, {name,value,type,onChange,disabled,error}) : null
    
    const element = type === 'file' ? el(tag, value ? {...props,...value } : props, editor ) : el(tag, props, value, editor)
    
    return element
  }
}

export const Hidden = ({ className, children }) => children ? el('span',{className},children) : null

export class Editable extends Component{
  state = {
    editMode:false,
    message:null,
    messageType:css.message,
    dirty:{}
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.values && nextProps.values !== prevState.original){
      const state = {
        values:  nextProps.values,
        original:nextProps.values,
        locked:false,
        valid:true,
        dirty:{},
        errors:{},
        error:null
      }
      return state
    }
  }

  toggle = () => this.setState({editMode:!this.state.editMode})

  off = () => this.setState({editMode:false})

  on = () => this.setState({editMode:true})

  onBlur = this.off

  submit = () => {
    const { values:{id, ...fields }, dirty } = this.state
    const { collection, dispatch, action, validators } = this.props
    const errors = {}
    const values = {}
    let hasErrors = false;
    const keys = action === 'create' ? Object.keys(validators) : Object.keys(dirty)
    keys.forEach( key => {
      const validator = validators[key]
      const value = fields[key]
      if(!validator){
        values[key] = value
        return
      }
      try{
        const result = validator(value)
        values[key] = ( typeof result !== 'undefined' && typeof result !== fields[key]
        ? result
        : value
        )
      }catch(e){
        hasErrors = true
        errors[key] = e
      }
    })
    if(hasErrors){
      this.setState({ errors, valid:false }) 
      return 
    }
    const command = { action, collection, id, values }
    this.setState({locked:true, valid:true})
    dispatch(command).then(this.setMessage).catch(this.setError)
  }

  setError = (error) => {
    this.setState({message:error.message, messageType:css.errorMessage})
    console.error(error)
  }

  setMessage = ({action}) => this.setState({message:`${action} successful!`, messageType:css.message})

  removeMessage = () => this.setState({message:null})

  reset = () => {
    const values = {...this.state.original}
    this.setState({values, errors:{}, valid:true, dirty:{} })
  }

  delete = () => {
    const { values:{ id } } = this.state
    const { collection, dispatch } = this.props
    const command = { action:'delete', collection, id }
    const yep = window.confirm('are you sure you want to delete this item?')
    if(!yep){ return }
    this.setState({locked:true})
    dispatch(command).catch(this.setError)
  }

  componentDidMount(){
    this.removeListener = onEscape(this.off)
  }

  componentWillUnmount(){
    this.removeListener && this.removeListener()
  }

  isDirty(){
    return Object.keys(this.state.dirty).length !== 0
  } 

  onDoubleClick = this.on

  onChange = (evt) => {
    
    const input = evt.target;
    const name = input.name;
    const type = input.type;
    const value = type==='file' ? input.files : type ==='checkbox' ? input.checked : input.value
    const values = {...this.state.values, [name]:value}

    if(values[name] === this.state.original[name]){
      const {[name]:remove, ...dirty } = this.state.dirty
      this.setState({ dirty })
    }else{
      const dirty = { ...this.state.dirty, [name]:true }
      this.setState({ dirty })
    }


    if(!this.state.valid && this.props.validators && this.props.validators[name]){
      const validator = this.props.validators[name]
      try{
        validator(value)
        const { [name]:remove, ...errors } = this.state.errors
        const valid = Object.keys(errors).length === 0
        this.setState({errors,valid})
      }catch(e){
        this.setState({errors:{...this.state.errors,[name]:e}})
      }
    }

    this.setState({values})
  }

  renderControls(){
    const { locked, valid } = this.state
    const dirty = this.isDirty()
    const { action, okLabel=action, cancelLabel='revert', deleteLabel='delete' } = this.props
    return el('div',{className:css.controls},
    el('button',{className:'ok',disabled:locked||!valid||!dirty, onClick:this.submit}, locked ? '⌛' : valid ? okLabel : '🛇'),
    dirty && el('button',{className:'', disabled:locked, onClick:this.reset},cancelLabel),
    action !== 'create' && el('button',{className:'no',disabled:locked, onClick:this.delete},deleteLabel)
    )
  }

  isEditMode(){
    const { editMode } = this.state;
    const { action } = this.props
    return (action === 'create') || editMode
  }

  renderMessage(){
    const { message, messageType } = this.state
    const messageLabel = message ? el('div',{className:messageType},message, el('button',{className:css.close, onClick:this.removeMessage},'✕')) : null
    return messageLabel
  }

  render(){

    const editMode = this.isEditMode()
    const { values, original, locked:disabled, errors } = this.state
    const { children, className, defaults } = this.props
    const { onSubmit, onDoubleClick, onChange } = this

    const _children = Children.map( children, child => {
      const { type:tag, props:{ inputType, ...props } } = child
      if(('name' in props) && props.name){
        const name = props.name
        const defaultValue = name in defaults ? defaults[name] : ''
        const isHidden = tag === Hidden
        const value = ( editMode 
          ? ( name in values 
            ? values[name]
            : defaultValue
            )
          : ( isHidden
            ? undefined
            : original[name] || defaultValue 
            )
        )
        const fieldProps = { ...props, editMode, disabled, tag, type:inputType, value, onChange, onSubmit, error:errors[props.name] }
        return el(Field,fieldProps)
      }
      return child
    })

    const props = {className:classnames(className, editMode && 'edit-mode'), tabIndex:1, onDoubleClick }

    const controls = editMode ? this.renderControls() : null
    
    return el('div',props, this.renderMessage(),..._children, controls)
  }
} 