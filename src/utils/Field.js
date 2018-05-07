import { createElement as el } from 'react'
import { field, fieldSelect, fieldRadio, fieldText, fieldTextArea, fieldInput } from './Field.module.css'
import classnames from 'classnames'

export const Select = ({ id, label, items, ...props }) => (
  el('label',{id,className:field+' '+fieldSelect},
    el('span',null,label),
    items && items.length && 
    el('select',props,...items.map(item=>el('option',normalizeItem(item))))
  )
)

export const Radio = ({ id, name, items, ...props }) => (
  el('span',{className:classnames(field,fieldRadio), ...props},
  items && items.length && items.map( item => {
     const { children, value, key } = normalizeItem(item)
     return el('label',{ key },el('input',{type:'radio', name, value },el('span',null,children)))
    })
  )
)

export const Input = ({ id, label, ...props }) => 
  el('label',{id,className:field+' '+fieldText},el('span',null,label),el('input',props))

export const TextArea = ({ id, label, ...props }) => 
  el('label',{id,className:classnames(field,fieldTextArea)},el('span',null,label),el('textarea',props))

export const Fieldset = ({ label, children, ...props }) => 
  el('fieldset',props,el('legend',null,label),children)

export const FileInput  = ({ id, label, className, ...props }) => 
  el('label',{id,className:classnames(field,fieldText,fieldInput,className),'data-button':true},el('span',null,label),el('input',props)) 

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

export const normalizeFieldProps = ({value,defaultValue,...props}) => {
  const type = props.type || 'text'
  const name = props.name || props.id
  const label = props.label || name
  const placeholder = props.placeholder || label
  const valueKey = props.onChange ? 'value' : 'defaultValue'
  const valueProp = value || defaultValue
  return { ...props, [valueKey]:valueProp,type, name, label, placeholder }
}

export const Field = (_props) => {
  const props = normalizeFieldProps(_props)
  const type = props.type
  if(type === 'select'){
    return el(Select, props)
  }
  if(type === 'radio'){
    return el(Radio,props)
  }
  if(type === 'textarea'){
    return el(TextArea,props)
  }
  if(type==='hidden'){
    return el('input',props)
  }
  if(type === 'file'){
    return el(FileInput,props)
  }
  return el(Input,props)
}

export default Field