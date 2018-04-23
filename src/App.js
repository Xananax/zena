import React, { Component } from 'react';
import Gallery from './utils/Gallery'
import Nav from './utils/Nav'
import Image from './utils/Image'
import signature from './images/signature.jpg'
import styles from './App.module.css';

class App extends Component {
  state = {
    image:'',
    images:[]
  }
  componentDidMount(){
    const images = []
    for(let i = 1; i < 9; i++){
      const src = './images/a0'+i+'.jpg'
      images.push(src)
    }
    this.setState({images})
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
