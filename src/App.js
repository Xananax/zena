import React, { Component } from 'react';
import Nav from './utils/Nav'
import { NavLink, Switch } from 'react-router-dom'
import { ScrollToTop } from './utils/ScrollToTop'
import { ContextRoute } from './utils/ContextRoute'
import { Press, Exhibitions, About, Gallery, Home, NotFound, Contact } from './pages'
// import { ExhibitionsAdmin } from './pages/adminPages'
import { Toaster } from './utils/Toast'
import data from './data'

const links = [
  { children:'Press',key:'press', to:'/press', component:Press },
  { children:'Exhibitions',key:'exh', to:'/exhibitions', component:Exhibitions },
  { children:'Zena',key:'zena', to:'/zena', component:About },
  { children:'Contact',key:'con', to:'/contact', component:Contact }
]

const galleryLinks = Object.keys(data.galleries).filter(tag=>tag && tag!=='zena').map(tag=>({children:tag, key:tag,to:'/gallery/'+tag}))

const pages = [ {children:'Home', exact:true, key:'home', to:'/', component:Home}, {children:'gallery', key:'gallery', to:'/gallery/:category', component:Gallery}, ...links]

class App extends Component {
  render() {
    return (
      <ScrollToTop>
        <div className="App">
          <Nav image={data.logo} title="Zena Assi">
            <h3>Work</h3>
            { galleryLinks.map((props)=><NavLink {...props}/>) }
            <hr/>
            { links.map(({component,...props})=><NavLink {...props}/>) }
          </Nav>
          <Switch>
            { pages.map(({component,to:path,key,exact})=><ContextRoute path={path} key={key} exact={exact} component={component} context={data}/>)}
            <ContextRoute component={NotFound} context={data}/>
          </Switch>
          <Toaster/>
        </div>
      </ScrollToTop>
    );
  }
}

export default App;
