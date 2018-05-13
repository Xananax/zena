import React from 'react'
import { Content } from '../wrappers/Content'
import css from './Press.module.css'
import { validators, subscribe, defaults } from '../data/press'
import { dispatch } from '../data/controller'
import { Editable } from '../utils/form/Editable'
import { ReactFire } from '../utils/ReactFire'

export const DocumentLink = ({ className, url, id, type, children}) => {
  return <span className={className}><a title={(id||'').split('/').pop()} href={url}>download</a>{children}</span>
}

export const PressItem = ({action,...values}) =>
  <Editable action={action} collection="press" dispatch={dispatch} className={css.item} values={values} validators={validators} defaults={defaults}>
    <span className={css.title} name="title"/>
    <span className={css.date} name="date" inputType="date"/>
    <DocumentLink className={css.file} name="file" inputType="file"/>
  </Editable>

export class Press extends ReactFire{
  static Component = PressItem
  static subscribe = subscribe
  render(){
    return (
      <Content title="Press & Media">
        <div className={css.main}>
          { this.renderContent() }
        </div>
      </Content>
    )
  }
}