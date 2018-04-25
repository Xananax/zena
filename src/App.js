import React, { Component } from 'react';
import Nav from './utils/Nav'
import { NavLink } from 'react-router-dom'
import { About } from './pages/About'
import { Gallery } from './pages/Gallery'
import { Press } from './pages/Press'
import { Exhibitions } from './pages/Exhibitions'
//import styles from './App.module.css';
import logo from './assets/images/zena.svg'
import assets from './assets'

const tags = Object.keys(assets.tags).filter(tag=>tag!=='zena')

class App extends Component {
  componentDidMount(){

  }
  render() {
    return (
      <div className="App">
        <Nav image={logo} title="Zena Assi">
          <h3>Work</h3>
          { tags.map(tag=><NavLink key={tag} to={tag}>{tag}</NavLink>)}
          <hr/>
          <NavLink to="/press">Press</NavLink>
          <NavLink to="/zena">Zena</NavLink>
        </Nav>
        <Exhibitions/>
        <Press/>
        <About/>
        <Gallery/>
      </div>
    );
  }
}

export default App;
