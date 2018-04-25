import React from 'react'
import { Gallery as Gal } from '../utils/Gallery'
import { Content } from '../wrappers/Content'
import assets from '../assets'

const images = assets.tags.portraits

export const Gallery = () => (
  <Content>
    <Gal images={images}/>
  </Content>
)


