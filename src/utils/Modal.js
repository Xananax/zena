import React from 'react'
import ReactDOM from 'react-dom'
import { overlay, wrapper, inside, closeButton as closeButtonClass, modal, showWrapper } from './Modal.module.css'

let node = null
const getDomNode = () => {
  if(!node){
    node = document.createElement('div')
    node.style =`z-index:20; position:fixed;`
    document.body.appendChild(node)
  }
  return node
}

export const Modal = ({ show, closeButton=true, onClose, children }) => ReactDOM.createPortal(
  <div className={( show ? showWrapper : wrapper )}>
    <div className={overlay} onClick={onClose}></div>
    <div className={modal}>
      <div className={inside}>
        { children }
      </div>
      { closeButton && <button className={closeButtonClass} onClick={onClose}>✕</button>}
    </div>
  </div>
  , getDomNode()
)