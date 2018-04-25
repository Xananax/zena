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
const tags = Object.keys(assets.tags)

class App extends Component {
  componentDidMount(){

  }
  render() {
    return (
      <div className="App">
        <Exhibitions/>
        <Press/>
        <About/>
        <Gallery/>
        <Nav image={logo} title="Zena Assi">
          { tags.map(tag=><NavLink key={tag} to={tag}>{tag}</NavLink>)}
        </Nav>
      </div>
    );
  }
}

export default App;
