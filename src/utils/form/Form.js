import { Component, createElement as el } from 'react'
import classnames from 'classnames'
import { validate } from './validateSerializedForm'
import { serializeForm } from './serializeForm'
import { serializeAndValidate } from './serializeAndValidate'

export class Form extends Component{

  form = null

  static defaultProps = {
    okLabel:'Ok',
    cancelLabel:'cancel'
  }

  state = {
    name:'',
    action:'',
    method:'',
    errors:{},
    hasErrors:false,
    values:{}
  }

  ref = (el) => this.form = el 

  process = (form) => new Promise(( ok )=>{
    const { validators } = this.props
    const serialized = validators ? serializeAndValidate(validators, form) : serializeForm( form )
    this.setState({serialized},()=>{ ok(serialized) })
  })

  onChange = (evt) => {
    const key = evt.target.name
    const { validators } = this.props
    if(validators && validators[key]){
      const { newValue, error } = validate(validators[key],this.state.values[key])
      if(error || typeof newValue !== 'undefined'){
        const errors = error ? { ...this.state.errors, [key]:error} : this.state.errors
        const values = typeof newValue !== 'undefined' ? { ...this.state.values, [key]:newValue } : this.state.values
        const hasErrors = !!error || this.state.hasErrors
        this.setState({ errors, values, hasErrors })
      }
    }
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation(); 
    this.process(this.form).then( serialized => {
      if(!serialized.hasErrors && this.props.onSubmit){
        this.props.onSubmit(serialized)
      }
    }).catch( e => { throw e })
  }

  render(){
    
    const { name, action, method, children:renderFunction, className, okClassName='ok', okLabel, cancelLabel, cancelClassName, onCancel } = this.props
    const { errors } = this.state
    const { onSubmit, onChange, ref } = this
    const okButton = el('input',{type:'submit', value:okLabel, className:classnames(okClassName), onClick:onSubmit })
    const cancelButton = onCancel && el('input',{type:'reset',value:cancelLabel, onClick:onCancel, className:classnames(cancelClassName) })
    const buttons = el('nav',null,okButton,cancelButton)
    const children = renderFunction && renderFunction( {errors, onChange} )
    const formProps = { className, ref, onSubmit, name, action, method }
    return el('form', formProps, children, buttons)
  }
}
