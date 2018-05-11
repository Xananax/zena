import React from 'react'
import { Content } from '../wrappers/Content'
import { Image } from '../utils/Image'
import { exhibition, event, image, info, galleryName, galleryDate, galleryLocation } from './Exhibitions.module.css'

export const Event = ({title, date, description}) =>
  <div className={event}>
    <h3>{title}</h3>
    { date && <h4>{date}</h4> }
    { description && <p>{description}</p> }
  </div>

export const MainEvent = ({title, date, description, image:src }) => (
  <article className={exhibition}>
    <div className={info}>
      <h2 className={galleryName}>{title}</h2>
      { date && <p className={galleryDate}>{date}</p> }
      { description && <div className={galleryLocation}>
          { description }
        </div> 
      }
    </div>
    { src && <Image cover className={image} loaded src={src}/> }
  </article>
)

export const Exhibitions = ({ events, mainEvent }) => (
  <Content title="Events & Exhibitions">
    { mainEvent && <MainEvent {...mainEvent}/>}
    { events.map(event=><Event {...event}/>) }
  </Content>
)