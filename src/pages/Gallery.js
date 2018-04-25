import React from 'react'
import { Gallery as Gal } from '../utils/Gallery'
import { Content } from '../wrappers/Content'
import assets from '../assets'

const images = assets.tags

export const Gallery = ({params:{category}}) => { 
  const list = images[category]
  if(!list){
    return (
        <Content title="Gallery not found">
          <h4>This gallery does not exist</h4>
        </Content>
      )
  }
  return (
    <Content>
      <Gal images={list.filter(({src})=>!!src)}/>
    </Content>
  )
}