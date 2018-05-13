import React from 'react'
import { Content } from '../wrappers/Content'
// import { Image } from '../utils/Image'
import { GalleryImage } from '../utils/GalleryImage'
import { validators, subscribe, defaults } from '../data/galleries'
import { dispatch } from '../data/controller'
import { NotFound } from './NotFound'
import { Gallery as Gal } from '../utils/Gallery'
import { Editable, Hidden } from '../utils/form/Editable'
import { ReactFire } from '../utils/ReactFire'
import css from './Gallery.module.css'

export const Image = ({ url, width, height, children,  className }) => {
  return ( <span className={className}>
      <GalleryImage src={url} width={width} height={height}/>
      {children}
    </span>
  )
}

export const Picture = ({ action, editMode, ...values}) =>
  <Editable action={action} collection="images" dispatch={dispatch} className={css.event} values={values} validators={validators} defaults={defaults}>
    <Image contain loaded className={css.image} name="image" inputType="file"/>
    <h2 className={css.title} name="title"/>
    <h4 className={css.date} name="date"/>
    <Hidden className={css.rank} name="rank" inputType="number"/>
    <Hidden className={css.categories} name="categories" inputType="text"/>
    <div className={css.description} name="description" inputType="textarea"/>
  </Editable>


export class Gallery extends ReactFire{
  static Component = Picture
  static subscribe = subscribe

  renderCreateForm(){
    const Comp = this.constructor.Component
    const { params:{category} } = this.props
    return <Comp action="create" editMode={this.isAdminMode()} categories={[category]}/>
  }

  renderCollection(){
    const Comp = this.constructor.Component
    const { params:{category} } = this.props
    const items = category ? this.state.items.filter(({categories})=>categories && categories.includes(category)) : this.state.items
    if(!items.length){
      return <div>no image from the `{ category }` gallery were found</div>
    }
    const images = items.map(event=><Comp editMode={this.isAdminMode()} action="update" key={event.id} {...event}/>)
    return images
    //return <Gal images={images}/>
  }

  render(){
    const { params:{category} } = this.props
    return (
      <Content title={category}>
        { this.renderContent() }
      </Content>
    )
  }
}