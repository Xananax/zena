import React, { Component } from 'react';
import Gallery from './utils/Gallery'
import Nav from './utils/Nav'
import Image from './utils/Image'
import { NavLink } from 'react-router-dom'
import signature from './images/signature.jpg'
// import styles from './App.module.css';
import assets from './assets'
const tags = Object.keys(assets.tags)

class App extends Component {
  state = {
    image:'',
    images:assets.tags.portraits.map(({src})=>src)
  }
  componentDidMount(){

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Image src={signature} alt="logo" style={{width:100,height:100}} />
        </header>
        <Gallery images={this.state.images}/>
        <Nav>
          { tags.map(tag=><NavLink key={tag} to={tag}>{tag}</NavLink>)}
        </Nav>
      </div>
    );
  }
}

export default App;
