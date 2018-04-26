import React from 'react'
import { Content } from '../wrappers/Content'
import { press } from './Press.module.css'

export const DocumentLink = ({extension,title,src}) => {
  return <a href={src} title={title}>{title}</a>
}

export const Press = ({ documents }) => (
  <Content title="Press & Media">
    <div className={press}>
      <p>
      { documents.map((doc)=><DocumentLink {...doc}/>) }
      </p>
    </div>
  </Content>
)
