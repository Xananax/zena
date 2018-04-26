import React from 'react'
import { Gallery as Gal } from '../utils/Gallery'
import { Content } from '../wrappers/Content'
import { NotFound } from './NotFound'

export const Gallery = ({params:{category}, url, galleries}) => { 
  const list = galleries[category]
  if(!list){
    return (
      <NotFound title="Gallery not found" url={url}>
          <h4>This gallery does not exist</h4>
      </NotFound>
      )
  }
  return (
    <Content>
      <Gal images={list.filter(({src})=>!!src)}/>
    </Content>
  )
}