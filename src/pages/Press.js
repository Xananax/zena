import React from 'react'
import { Content } from '../wrappers/Content'
import css from './Press.module.css'
import { validators, subscribe, defaults } from '../data/press'
import { dispatch } from '../data/controller'
import { Editable } from '../utils/form/Editable'
import { ReactFire } from '../utils/ReactFire'

export const DocumentLink = ({url,type, children}) => {
  return <div><a href={url}>{type}</a>{children}</div>
}

export const DocumentDate = ({ children, ...props }) => 
  <h4 {...props}>
    { children }
  </h4>

export const PressItem = ({action,...values}) =>
  <Editable action={action} collection="press" dispatch={dispatch} className={css.item} values={values} validators={validators} defaults={defaults}>
    <h2 className={css.title} name="title"/>
    <DocumentDate className={css.date} name="date" inputType="date"/>
    <div className={css.description} name="description" inputType="textarea"/>
    {/* <DocumentLink className={css.file} name="file" inputType="text"/> */}
    <h4 className={css.title} name="file" inputType="file"/>
  </Editable>


export const Year = ({year, documents}) => (
  <div className={css.press}>
    <h2 className={css.yearTitle}>{year}</h2>
    <p>.orderBy('date','desc')
    { documents.map((doc)=><DocumentLink {...doc}/>) }
    </p>
  </div>
)

export class Press extends ReactFire{
  static Component = PressItem
  static subscribe = subscribe
  render(){
    return (
      <Content title="Press & Media">
        { this.renderContent() }
      </Content>
    )
  }
}