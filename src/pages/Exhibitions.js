import React from 'react'
import { Content } from '../wrappers/Content'
import { Image } from '../utils/Image'
import { exhibition, event, image, info, galleryName, galleryDate, galleryLocation } from './Exhibitions.module.css'

const events = [
  { key:'0',
    title:"SYRI ARTS exhibition and auction",
    date:"30th of October 2013 till 9th of November 2013",
    description:"Beirut Exhibition Center - Biel - Beirut - Lebanon"
  },
  { key:'1',
    title:"ABU DHABI ART FAIR",
    date:"20th of November 2013 till 23rd of April 2013",
    description:"Opening : 20- NOV-2013 @ARTSAWA gallery booth - Abu Dhabi - UAE"
  },
  { key:'2',
    title:"SOLO SHOW",
    date:"14th of March 2014 till 1st of April 2014",
    description:"ALWANE Gallery - Saifi Village - Beirut - Lebanon"
  }
]

export const Event = ({title, date, description}) =>
  <div className={event}>
    <h3>{title}</h3>
    <h4>{date}</h4>
    <p>{description}</p>
  </div>

export const Exhibitions = ({galleries}) => (
  <Content className="" title="Events & Exhibitions">
    <article className={exhibition}>
      <div className={info}>
        <h2 className={galleryName}>J.Cacciola Gallery</h2>
        <p className={galleryDate}>february 24 - april 10</p>
        <div className={galleryLocation}>
          <p>35 Mill Street</p>
          <p>Bernardsville, NJ 07924</p>
          <p>908-204-1972</p>
          <p>Gallery hours:</p>
          <p>Tuesday - Friday 10 am - 6 pm</p>
          <p>Saturday 10 am - 5 pm     Sun/Mon closed</p>
        </div>
      </div>
      <Image cover className={image} loaded src={galleries.bouquets[7].src}/>
    </article>
    { events.map(event=><Event {...event}/>) }
  </Content>
)