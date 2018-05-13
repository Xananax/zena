import React from 'react'
import { Content } from '../wrappers/Content'

export const Contact = ({zena}) => (
  <Content>
    <h1>Zena Assi</h1>
    <img src={zena[0].src} alt={zena[0].basename.replace('-',' ')}/>
    <p>za@zenaassi.com</p>
    <p>London - Uk</p>
    <p>ARTSAWA gallery www.artsawa.com, DIFC, Dubai, UAE</p>
    <p>ALWANE gallery 00961 1975250, Saifi Village, Beirut, Lebanon</p>
  </Content>
)