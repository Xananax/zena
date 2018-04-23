import React, { Component } from 'react';
import Gallery from './utils/Gallery'
import Nav from './utils/Nav'
import Image from './utils/Image'
import signature from './images/signature.jpg'
// import styles from './App.module.css';
import assets from './assets'

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
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Gallery images={this.state.images}/>
        <Nav/>
      </div>
    );
  }
}

export default App;
