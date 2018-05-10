import { React, Component, createElement as el } from 'react'

const toArray = (thing) =>Array.prototype.slice.call(thing)

export const serializeForm = (form) => {
  const url = window.location.protocol+'//'+window.location.host
  const regex = new RegExp('^'+url+'/?','ig')
  const { elements, name, action:_action, method } = form;
  const action = _action.replace(regex,'')
  const inputs = toArray(elements)
  const serialized = {}
  inputs.forEach( input =>{
    const { nodeName, name, type, value, checked } = input
    if(!name || nodeName === 'BUTTON'){ return; }
    if(type === 'checkbox'){
      serialized[name] = checked; return;
    }
    if(type === 'radio' && checked){
      serialized[name] = value; return;
    }
    if(type === 'number' || type === 'range'){
      if(!value){
        serialized[name] = 0; return;  
      }
      serialized[name] = parseFloat(value); return;
    }
    if(type === 'date' || type === 'datetime' || type === 'datetime-local'){
      serialized[name] = new Date(value); return;
    }
    if( type === 'file' ){
      const files = toArray(input.files)
      if(input.multiple){
        serialized[name] = files; return
      }
      serialized[name] = files[0]; return
    }
    serialized[name] = value
  })
  return { name, action, method, fields:serialized }
}

export const validate = ( validators, fields, stopAtFirst ) => {
  let hasErrors = false
  const newValues = {}
  const errors = {}
  for (const [key, validator] of Object.entries(validators)) {
    const value = fields[key]
    try{
      const newValue = validator(value)
      if(typeof newValue !== 'undefined' && newValue !== value && !errors.length){
        hasErrors = true
        newValues[key] = newValue
      }
    }catch(e){
      errors[key] = e
      if(stopAtFirst){
        return { fields, errors, hasErrors }
      }
    }
  }
  if(hasErrors){
    return { fields:{...fields,...newValues}, errors, hasErrors }
  }
  return { fields, errors, hasErrors }
}

export const serializeAndValidate = ( validators, form, stopAtFirst ) => {
  const { fields, ...rest } = serializeForm(form)
  const validatedProps = validate(validators, fields, stopAtFirst)
  const final = { ...rest, ...validatedProps }
  return final;
}

export const processSubmit = (validators) => (cb) => (evt) => {
  evt.preventDefault();
  evt.stopPropagation(); 
  const form = evt.target;
  const serialized = validators ? serializeAndValidate(validators, form) : serializeForm( form )
  cb(serialized)
}


export class Form extends Component{

  form = React.createRef()

  static defaultProps = {
    okLabel:'Ok',
    cancelLabel:'cancel'
  }

  state = {
    errors:{},
    hasErrors:false
  }

  process = (form) => {
    const { validators } = this.props
    const serialized = validators ? serializeAndValidate(validators, form) : serializeForm( form )
    if(serialized.hasErrors){
      this.setState({ errors:{...serialized.errors}, hasErrors:true });
      return serialized
    }else if(this.hasErrors){
      this.setState({ errors:{}, hasErrors:false });
    }
    return serialized
  }

  onChange = (evt) => {
    const name = evt.target.name
    const { validators } = this.props
    if(validators && validators[name]){
      try{
        validators[name](evt.target.value)
        if(!this.state.hasErrors){ return }
        if(this.state[name]){
          const {[name]:remove, ...errors} = this.state.errors
          if(!Object.keys(errors).length){
            this.setState({ errors:{}, hasErrors:false })
          }else{
            this.setState({ errors })
          }
        }
      }catch(e){
        this.setState({errors:{...this.state.errors,[name]:e.message}, hasErrors:true})
      }
    }
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation(); 
    const serialized = process(this.form)
    if(!serialized.hasErrors && this.props.onSubmit){
      this.props.onSubmit(serialized)
    }
  }

  render(){
    
    const { name, action, method, children:renderFunction, className, okLabel, cancelLabel, onCancel } = this.props
    const { errors } = this.state
    const { onSubmit, onChange, form:ref } = this

    const okButton = el('input',{type:'submit', value:okLabel, className:'ok', onClick:onSubmit })
    const cancelButton = onCancel && el('input',{type:'reset',value:cancelLabel, onClick:onCancel })

    const buttons = el('frameset',null,okButton,cancelButton)
    const children = renderFunction( errors, onChange )
    const formProps = { className, ref, onSubmit, name, action, method }
    return el('form', formProps, children, buttons)
  }
}
