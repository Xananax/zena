import React from 'react'
import { Content } from '../wrappers/Content'
import { press, yearTitle } from './Press.module.css'

export const DocumentLink = ({extension,title,src}) => {
  return <a href={src} title={title+'.'+extension}>{title}</a>
}

export const Year = ({year, documents}) => (
  <div className={press}>
    <h2 className={yearTitle}>{year}</h2>
    <p>
    { documents.map((doc)=><DocumentLink {...doc}/>) }
    </p>
  </div>
)

export const Press = ({ documents }) => (
  <Content title="Press & Media">
    <Year year={2018} documents={documents}/>
    <Year year={2017} documents={documents}/>
    <Year year={2016} documents={documents}/>
    <Year year={2015} documents={documents}/>
  </Content>
)
