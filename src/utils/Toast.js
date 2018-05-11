import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import css from './Toast.module.css'
import classnames from 'classnames'

let node = null
const getDomNode = () => {
  if(!node){
    node = document.createElement('div')
    node.style =`z-index:30; position:fixed;top:0;right:0`
    document.body.appendChild(node)
  }
  return node
}

export const Toast = ({ text, type, closeButton, onClose, index }) => (
  <div className={classnames( css.toast )} data-index={index}>
    <div className={classnames(css.inside, css[type])}>
      {text}
      { closeButton && <button className={css.close} onClick={onClose}>✕</button> }
    </div>
  </div>
)

let listener

export const addToast = (text,options={}) => listener.addToast(text,options)

export class Toaster extends Component{

  constructor(props,context){
    super(props,context)
    this.state = {
      toasts:[]
    }
    listener = this
  }
  
  addToast = (text,options={}) => {
    const id = this.state.toasts.length
    const key = id
    const onClose = this.onClose(id)
    const { type='ok', closeButton=true } = options
    const toast = { text, type, id, key, onClose, closeButton }
    this.setState({toasts:[...this.state.toasts,toast]})
  }

  onClose = (_id) => () => this.setState({toasts:this.state.toasts.filter(({id})=>id!==_id)})
  
  render(){
    return ReactDOM.createPortal(
      this.state.toasts.map(( toast, index )=><Toast {...toast} index={index}/>)
    , getDomNode()
    )
  }
}