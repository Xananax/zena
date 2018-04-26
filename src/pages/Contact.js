import React from 'react'
import { Content } from '../wrappers/Content'

export const Contact = ({zena}) => (
  <Content>
    <h1>Zena Assi</h1>
    <img src={zena[0].src} alt={zena[0].basename.replace('-',' ')}/>
    <p>za@zenaassi.com</p>
    <p>+804448883</p>
  </Content>
)