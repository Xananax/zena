import React, { Component } from 'react';
import Nav from './utils/Nav'
import { NavLink, Switch, Route } from 'react-router-dom'
import { getPages } from './pages'
import { ScrollToTop } from './utils/ScrollToTop'
//import styles from './App.module.css';
import logo from './assets/images/zena.svg'
import * as files from './assets'

const galleries = files.images.tags
const documents = files.articles.types.document
const images = files.images.items

const assets = { galleries, documents, images, zena:files.images.directories.zena }


const { Press, Exhibitions, About, Gallery, Home, NotFound, Contact } = getPages(assets)

const links = [
  { children:'Press',key:'press', to:'/press', component:Press },
  { children:'Exhibitions',key:'exh', to:'/exhibitions', component:Exhibitions },
  { children:'Zena',key:'zena', to:'/zena', component:About },
  { children:'Contact',key:'con', to:'/contact', component:Contact }
]
const galleryLinks = Object.keys(galleries).filter(tag=>tag && tag!=='zena').map(tag=>({children:tag, key:tag,to:'/gallery/'+tag}))

const pages = [ {children:'Home', exact:true, key:'home', to:'/', component:Home}, {children:'gallery', key:'gallery', to:'/gallery/:category', component:Gallery}, ...links]

class App extends Component {
  componentonentDidMount(){

  }
  render() {
    return (
      <ScrollToTop>
        <div className="App">
          <Nav image={logo} title="Zena Assi">
            <h3>Work</h3>
            { galleryLinks.map((props)=><NavLink {...props}/>) }
            <hr/>
            { links.map(({component,...props})=><NavLink {...props}/>) }
          </Nav>
          <Switch>
            { pages.map(({component,to:path,key,exact})=><Route path={path} key={key} exact={exact} component={component}/>)}
            <Route component={NotFound}/>
          </Switch>
        </div>
      </ScrollToTop>
    );
  }
}

export default App;
