import { createElement as el, Component } from 'react'
import { readImageFromFile } from '../readImageFromFile'
import { field, fieldSelect, fieldRadio, fieldText, fieldTextArea, fieldInput, error as errorClass, hasError } from './Field.module.css'
import classnames from 'classnames'

export const ErrorLabel = ({ error, htmlFor }) => el('span',{ className:( error ? hasError : errorClass) },el('label',{htmlFor},error && error.message))

export const Select = ({ htmlFor, error, labelId:id, label, items, ...props }) => (
  el('label',{ id, htmlFor, className:classnames(field,fieldSelect)},
    el('span',null,label),
    items && items.length && 
    el('select',props,...items.map(item=>el('option',normalizeItem(item)))),
    el(ErrorLabel,{ error, htmlFor })
  )
)

export const Radio = ({ id, error, name, items, ...props }) => (
  el('span',{ id, className:classnames(field,fieldRadio), ...props},
  items && items.length && items.map( item => {
     const { children, value, key } = normalizeItem(item)
     return el('label',{ key },el('input',{type:'radio', name, value },el('span',null,children)))
    }),
  el(ErrorLabel,{ error })
  )
)

export const Input = ({ htmlFor, labelId:id, error, label, ...props }) => 
  el('label',{ id, htmlFor, className:classnames(field,fieldText)},el('span',null,label),el('input',props), el(ErrorLabel,{ error, htmlFor }))

export const NumberInput = ({ value:v, ...props }) => {
  const value = (typeof v !== 'undefined' && v!=='' && v!==null) ? parseInt(v) : v
  if(isNaN(value)){ return el(Input,{...props,value:0})}
  return el(Input,{...props,value}) 
}

export const TextArea = ({ htmlFor, error, labelId:id, label, ...props }) => 
  el('label',{ id, htmlFor,className:classnames(field,fieldTextArea)},el('span',null,label),el('textarea',props), el(ErrorLabel,{ error, htmlFor }))

export const Fieldset = ({ label, children, ...props }) => 
  el('fieldset', props, el('legend',null,label),children)

export const FileInputButton = ({ htmlFor, error, labelId:id, label, className, value, ...props }) => 
  el('label',{ id, htmlFor,className:classnames(field,fieldText,fieldInput,className),'data-button':true},el('span',null,label),el('input',props),el(ErrorLabel,{ error, htmlFor })) 

export class FileInput extends Component{
  state = { files:[], value:this.props.value, error:null }
  onChange = (evt) => {

    evt.persist()
    const target = evt.target
    const files =Array.prototype.slice.call(evt.target.files)
    const { name, multiple }= this.props
    
    if(files.length){
      Promise.all(files.map(readImageFromFile))
        .then( files => {
          this.setState({files,error:null})
          return files
        })
        .catch( error => this.setState({error}))
        .then( ( files ) => files && this.props.onChange && this.props.onChange({...evt, target:{...target,name, multiple, type:'file',files:(multiple?files:files[0])}}) )
        .catch( err => { throw err })
    }
  }
  renderItems(){
    const { files, error } = this.state;
    if(error){ return el('div',null,error) }
    return files.map(this.renderItem)
  }
  renderItem = ({ file, image }) => {
    const key = file.name
    if(image){
      const style = {display:'inline-block',width:100,height:100,backgroundSize:'cover',backgroundPosition:'center center',backgroundImage:`url("${image.src}")`}
      return el('span',{key,style})
    }
    return el('span',{key},file.name)
  }
  render(){
    const { renderItems, error:propErr, ...rest} = this.props
    const { error:stateErr } = this.state
    const onChange = this.onChange
    const error = stateErr || propErr
    const props = { ...rest, onChange, error}
    if(renderItems){
      return el('span',null,el(FileInputButton,props),this.renderItems())
    }
    return el(FileInputButton,props)
  }
}

export const normalizeItem = (item) => {
  if(typeof item === 'string'){
    return {key:item,value:item,children:item}
  }
  if(Array.isArray(item)){
    const [children,value] = item
    const key = value
    return {key, children, value}
  }
  const children = item.label || item.text || item.children
  const value = item.value || item.id || item.key || children+''
  const key = item.key || item.id || value
  return {
    children,
    value,
    key
  }
}

let ids = 0

const getIdForField  = ( props ) => {
  if(props.id){ return props.id }
  return 'field-'+( props.name || (props.label && props.label.replace(/\s+/g,'-')) || '' ) + (ids++)
}

export const normalizeFieldProps = ({value,defaultValue,...props}) => {
  const id = getIdForField(props)
  const htmlFor = id
  const labelId = props.labelId || 'label-'+id
  const type = props.type || 'text'
  const name = props.name || id
  const label = props.label || name
  const placeholder = props.placeholder || label
  const valueKey = props.onChange ? 'value' : 'defaultValue'
  const valueProp = typeof value !== 'undefined' ? value : typeof defaultValue !== 'undefined' ? defaultValue : null;
  return { ...props, [valueKey]:valueProp, type, htmlFor, name, label, placeholder, id, labelId }
}

export const Field = (_props) => {
  const type = _props.type
  if(type==='hidden'){
    return el('input',_props)
  }
  const props = normalizeFieldProps(_props)
  if(type === 'select'){
    return el(Select, props)
  }
  if(type === 'radio'){
    return el(Radio,props)
  }
  if(type === 'textarea'){
    return el(TextArea,props)
  }
  if(type === 'file'){
    return el(FileInput,props)
  }
  if(type === 'number' || type === 'range'){
    return el(Input,props)
  }
  return el(Input,props)
}

export default Field