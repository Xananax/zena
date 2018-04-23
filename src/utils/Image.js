import React from 'react'
import classnames from 'classnames'
import { image, inside, element, spinner, loading, loaded, cover, contain } from './Image.module.css'
import { Spinner } from './Spinner'

export const url = (src) => `url("${src}")`
export const backgroundImage = (src) => ({ backgroundImage:url(src)})

export const Image = ({ src, alt, className, style, loading:isLoading, loaded:isLoaded, failed:isFailed, cover:isCover, contain:isContain=true, imageRef }) => (
  <span ref={imageRef} title={alt} className={classnames(image, className)} style={style}>
    <span className={classnames(isLoaded ? loaded : inside, (isCover ? cover : isContain !== false && contain ))} style={backgroundImage(src)}/>
    <Spinner className={classnames(isLoading ? loading : spinner )}/>
    <img className={element} alt={alt} src={src}/>
  </span>
)

export default Image