import React, { Component } from 'react';
import Nav from './utils/Nav'
import { NavLink, Switch } from 'react-router-dom'
import { ScrollToTop } from './utils/ScrollToTop'
import { ContextRoute } from './utils/ContextRoute'
import { Press, Exhibitions, About, Gallery, Home, NotFound, Contact } from './pages'
//import styles from './App.module.css';
import logo from './assets/images/zena.svg'
import * as files from './assets'

const galleries = files.images.tags
const documents = files.articles.types.document
const images = files.images.items

const mainEventId = 'x'
const events_list = [
  { key:'x',
    title:"J.Cacciola Gallery",
    date:"february 24 - april 10",
    description:"35 Mill Street\nBernardsville, NJ 0792\n908-204-197\nGallery hours\nTuesday - Friday 10 am - 6 p\nSaturday 10 am - 5 pm\nSun/Mon closed",
    image:galleries.bouquets[7].src
  },
  { key:'0',
    title:"SYRI ARTS exhibition and auction",
    date:"30th of October 2013 till 9th of November 2013",
    description:"Beirut Exhibition Center - Biel - Beirut - Lebanon"
  },
  { key:'1',
    title:"ABU DHABI ART FAIR",
    date:"20th of November 2013 till 23rd of April 2013",
    description:"Opening : 20- NOV-2013 @ARTSAWA gallery booth - Abu Dhabi - UAE"
  },
  { key:'2',
    title:"SOLO SHOW",
    date:"14th of March 2014 till 1st of April 2014",
    description:"ALWANE Gallery - Saifi Village - Beirut - Lebanon"
  }
]
const events = events_list.filter(event=>event.key!==mainEventId)
const mainEvent = events_list.find( event => event.key === mainEventId)
const assets = { galleries, documents, images, zena:files.images.directories.zena, events, mainEvent }
console.log(assets)


const links = [
  { children:'Press',key:'press', to:'/press', component:Press },
  { children:'Exhibitions',key:'exh', to:'/exhibitions', component:Exhibitions },
  { children:'Zena',key:'zena', to:'/zena', component:About },
  { children:'Contact',key:'con', to:'/contact', component:Contact }
]
const galleryLinks = Object.keys(galleries).filter(tag=>tag && tag!=='zena').map(tag=>({children:tag, key:tag,to:'/gallery/'+tag}))

const pages = [ {children:'Home', exact:true, key:'home', to:'/', component:Home}, {children:'gallery', key:'gallery', to:'/gallery/:category', component:Gallery}, ...links]

class App extends Component {
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
            { pages.map(({component,to:path,key,exact})=><ContextRoute path={path} key={key} exact={exact} component={component} context={assets}/>)}
            <ContextRoute component={NotFound} context={assets}/>
          </Switch>
        </div>
      </ScrollToTop>
    );
  }
}

export default App;
