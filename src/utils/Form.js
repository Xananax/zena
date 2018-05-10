import React, { Component } from 'react'
import { serializeForm, serializeAndValidate } from './serializeForm'

export class Form extends Component{

  form = React.createRef()

  static defaultProps = {
    okLabel:'Ok',
    cancelLabel:'cancel',
    showCancel:true
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
    const { name, action, method, children:renderFunction, className, okLabel, cancelLabel, onCancel, showCancel } = this.props
    const { errors } = this.state
    const { onSubmit, onChange } = this
    return (
      <form className={className} ref={this.form} onSubmit={onSubmit} name={name} action={action} method={method}>
        { renderFunction( errors, onChange ) }
        <input type="submit" value={okLabel} className="ok"/>
        { showCancel && <input type="reset" value={cancelLabel} onClick={onCancel}/> }
      </form>
    );
  }
}