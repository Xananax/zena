import React, { Component } from 'react';
import Nav from './utils/Nav'
import { NavLink, Switch, Route } from 'react-router-dom'
import { About as AboutPage } from './pages/About'
import { Gallery as GalleryPage } from './pages/Gallery'
import { Press as PressPage } from './pages/Press'
import { Exhibitions as ExhibitionsPage } from './pages/Exhibitions'
import { ScrollToTop } from './utils/ScrollToTop'
//import styles from './App.module.css';
import logo from './assets/images/zena.svg'
import assets from './assets'

const tags = Object.keys(assets.tags).filter(tag=>tag!=='zena')

const withContext = (Comp) => ({match}) => <Comp url={match.url} params={match.params} assets={assets}/>

const About = withContext(AboutPage)
const Gallery = withContext(GalleryPage)
const Press = withContext(PressPage)
const Exhibitions = withContext(ExhibitionsPage)

const links = [
  { children:'Press',key:'press', to:'/press', component:Press },
  { children:'Exhibitions',key:'exh', to:'/exhibitions', component:Exhibitions },
  { children:'Zena',key:'zena', to:'/zena', component:About }
]
const galleryLinks = tags.map(tag=>({children:tag, key:tag,to:'/gallery/'+tag}))

const pages = [ {children:'gallery', key:'gallery', to:'/gallery/:category', component:Gallery}, ...links]

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
            { pages.map(({component,to:path,key})=><Route path={path} key={key} component={component}/>)}
            <Route render={()=><div>hello</div>}/>
          </Switch>
        </div>
      </ScrollToTop>
    );
  }
}

export default App;
