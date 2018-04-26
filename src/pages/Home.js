import React from 'react'
import { Content } from '../wrappers/Content'
import { GalleryImage } from  '../utils/GalleryImage'
import { homeImage } from './Home.module.css'

export const Home = ({galleries}) => (
  <Content>
    <div className={homeImage}>
      <GalleryImage {...galleries.bouquets[1]}>
        <h1>A painting</h1>
        <p>Explore Aachen holidays and discover the best time and places to visit. | Aachen has been around for millennia. The Romans nursed their war wounds and stiff joints in the steaming waters of Aachen's mineral springs, but it was Charlemagne who put the city firmly on the European map.</p>
      </GalleryImage>
    </div>
  </Content>
)
