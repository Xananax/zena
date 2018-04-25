import React from 'react'
import { Content } from '../wrappers/Content'
import { articles } from '../assets'
import { press } from './Press.module.css'

export const DocumentLink = ({extension,title,src}) => {
  return <a href={src} title={title}>{title}</a>
}

export const Press = () => (
  <Content>
    <div className={press}>
      <p>
      { articles.types.document.map((doc)=><DocumentLink {...doc}/>) }
      </p>
    </div>
  </Content>
)
