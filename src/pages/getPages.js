import React from 'react'
import { About as AboutPage } from './About'
import { Contact as ContactPage } from './Contact'
import { Gallery as GalleryPage } from './Gallery'
import { Home as HomePage } from './Home'
import { Press as PressPage } from './Press'
import { Exhibitions as ExhibitionsPage } from './Exhibitions'
import { NotFound as NotFoundPage } from './NotFound'


export const getPages = (context) => {
 
  const withContext = (Comp) => ({match}) => <Comp url={match.url} params={match.params} {...context}/>
  return {
    About: withContext(AboutPage),
    Gallery: withContext(GalleryPage),
    Press: withContext(PressPage),
    Exhibitions: withContext(ExhibitionsPage),
    Home: withContext(HomePage),
    NotFound: withContext(NotFoundPage),
    Contact: withContext(ContactPage)
  }
}

export default getPages
