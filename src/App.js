import React, { Component } from 'react';
import Nav from './utils/Nav'
import { NavLink } from 'react-router-dom'
import { About } from './pages/About'
import { Gallery } from './pages/Gallery'
// import styles from './App.module.css';
import logo from './images/zena.svg'
import assets from './assets'
const tags = Object.keys(assets.tags)

/*
<Nav image={logo} title="Zena Assi">
          { tags.map(tag=><NavLink key={tag} to={tag}>{tag}</NavLink>)}
        </Nav>
*/

class App extends Component {
  componentDidMount(){

  }
  render() {
    return (
      <div className="App">
        
        <About/>
        <Gallery/>
      </div>
    );
  }
}

export default App;
