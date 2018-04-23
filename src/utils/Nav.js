import React, { Children } from 'react'
import { nav, overlay, menu, open, menuItem, menuItems } from './Nav.module.css'
import { onEscape } from './onKeyDown'

export const Nav = ({ isOpen, children, toggle }) => (
  <nav className={isOpen ? open : nav }>
    <div className={overlay} onClick={toggle}/>
    <div className={menu}>
      <div className={menuItems}>
        { Children.map(children, (child,index) => <div className={menuItem} key={child.key || index }>{child}</div>)}
      </div>
    </div>
    <button onClick={toggle}>...</button>
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
    return (
      <Nav isOpen={isOpen} toggle={this.toggle}>
        { this.props.children }
      </Nav>
    )
  }
}

export default Navigation