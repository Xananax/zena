import React from 'react'
import { Content } from '../wrappers/Content'

export const About = ({zena}) => (
  <Content>
    <h1>Zena Assi</h1>
    <img src={zena[0].src} alt={zena[0].basename.replace('-',' ')}/>
    <p>Really beautiful professional abstracts! Sophisticated color sensitivity, unique limited palette, strong composition, plenty of unstructured space, dynamic balance of cools and warms, restrained balance of techniques, strong focal point, variety of textures-form-line & wash… Superb paintings! </p>
    <p>Really beautiful professional abstracts! Sophisticated color sensitivity, unique limited palette, strong composition, plenty of unstructured space, dynamic balance of cools and warms, restrained balance of techniques, strong focal point, variety of textures-form-line & wash… Superb paintings! </p>
    <img src={zena[1].src} alt={zena[1].basename.replace('-',' ')}/>
  </Content>
)
