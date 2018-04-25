import React from 'react'
import { Content } from '../wrappers/Content'
import { Image } from '../utils/Image'
import { exhibition, image, info, galleryName, galleryDate, galleryLocation } from './Exhibitions.module.css'
import assets from '../assets'

export const Exhibitions = () => (
  <Content className="">
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
      <Image cover className={image} loaded src={assets.items[7].src}/>
    </article>
  </Content>
)