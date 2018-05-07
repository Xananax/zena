import React from 'react'
import classnames from 'classnames'
import { image, failed, inside, transparent, inverted, element, spinner, loading, loaded, cover, contain } from './Image.module.css'
import { Spinner } from './Spinner'
import blankGif from './blank.png'

export const url = (src) => `url("${src}")`
export const backgroundImage = (src) => ({ backgroundImage:url(src)})

export const Image = ({ src, alt, height, width, className, proportionalHeight, transparent:isTransparent, invert:isInverted, style, loading:isLoading, loaded:isLoaded, failed:isFailed, cover:isCover, contain:isContain=true, imageRef }) => (
  <span ref={imageRef} title={alt} className={classnames((isTransparent ? transparent : (isInverted ? inverted : (isFailed?failed:image))), className,'Image')} style={style}>
    <span className={classnames(isLoaded ? loaded : inside, (isCover ? cover : isContain !== false && contain ))} style={backgroundImage(src)}/>
    <Spinner className={classnames(isLoading ? loading : spinner )}/>
    <img className={element} alt={alt} height={height} width={width} style={proportionalHeight ? {width:'100%',height:0, paddingBottom:proportionalHeight}:null} src={isLoaded ? src : blankGif }/>
  </span>
)

export default Image