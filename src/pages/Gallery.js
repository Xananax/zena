import React from 'react'
import { Content } from '../wrappers/Content'
import { Image } from '../utils/Image'
import { validators, subscribe, defaults } from '../data/galleries'
import { dispatch } from '../data/controller'
import { Editable, Hidden } from '../utils/form/Editable'
import { ReactFire } from '../utils/ReactFire'
import css from './Gallery.module.css'

export const Picture = ({ action, ...values}) =>
  <Editable action={action} collection="images" dispatch={dispatch} className={css.event} values={values} validators={validators} defaults={defaults}>
    <h2 className={css.title} name="title"/>
    <h4 className={css.date} name="date"/>
    <Hidden className={css.rank} name="rank" inputType="number"/>
    <Hidden className={css.categories} name="categories" inputType="text"/>
    <div className={css.description} name="description" inputType="textarea"/>
    <Image contain loaded className={css.image} name="image" inputType="file"/>
  </Editable>


export class Gallery extends ReactFire{
  static Component = Picture
  static subscribe = subscribe
  renderCollection(){
    const Comp = this.constructor.Component
    const { params:{category} } = this.props
    const items = category ? this.state.items.filter(({categories})=>categories && categories.includes(category)) : this.state.items
    return items.map(event=><Comp action="update" key={event.id} {...event}/>)
  }

  render(){
    return (
      <Content>
        { this.renderContent() }
      </Content>
    )
  }
}