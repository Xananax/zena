import React, { Children } from 'react'
import { NavLink } from 'react-router-dom'
import { nav, overlay, image, menu, header, open, menuItem, menuItems } from './Nav.module.css'
import { onEscape } from './onKeyDown'

export const Nav = ({ isOpen, children, toggle, title, image:src }) => (
  <nav className={isOpen ? open : nav }>
    <div className={overlay} onClick={toggle}/>
    <div className={menu}>
      <div className={menuItems}>
        { (title || src) && (
          <div className={header}>
            <NavLink to="/"><img className={image}  src={src} alt={title}/></NavLink>
          </div>
        )}
        { Children.map(children, (child,index) => <div className={menuItem} key={child.key || index }>{child}</div>)}
      </div>
    </div>
    <button onClick={toggle}>☰</button>
  </nav>
)


export class Navigation extends React.Component{
  state = { isOpen: false}
  close = () => this.setState({isOpen:false})
  toggle = () => this.setState({isOpen:!this.state.isOpen})
  componentDidMount(){
    onEscape(this.close)
  }
  render(){
    const { isOpen } = this.state
    const props = {...this.props,  isOpen, toggle:this.toggle}
    return (
      <Nav {...props}/>
    )
  }
}

export default Navigation