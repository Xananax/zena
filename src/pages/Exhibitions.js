import React from 'react'
import { Content } from '../wrappers/Content'
import { Image } from '../utils/Image'
import { validators, subscribe, defaults } from '../data/events'
import { dispatch } from '../data/controller'
import { Editable, Hidden } from '../utils/form/Editable'
import { ReactFire } from '../utils/ReactFire'
import css from './Exhibitions.module.css'

export const Event = ({ action, ...values}) =>
  <Editable action={action} collection="events" dispatch={dispatch} className={css.event} values={values} validators={validators} defaults={defaults}>
    <h2 className={css.title} name="title"/>
    <h4 className={css.date} name="date"/>
    <Hidden className={css.rank} name="rank" inputType="number"/>
    <div className={css.description} name="description" inputType="textarea"/>
    <Image cover className={css.image} loaded name="image" inputType="file"/>
  </Editable>


export class Exhibitions extends ReactFire{
  static Component = Event
  static subscribe = subscribe
  render(){
    return (
      <Content title="Events & Exhibitions">
        { this.renderContent() }
      </Content>
    )
  }
}