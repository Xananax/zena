import React from 'react'
import {Image} from './Image'
import {ImageLoader} from './ImageLoader'
import { checkIfInView } from './checkIfInView'

export class GalleryImage extends React.Component{
  state = { inView: false }
  imageRef = React.createRef()
  componentDidMount(){
    this.removeListener = checkIfInView(this.getRef,this.whenInView,true)
  }
  getRef = () => {
    return this.imageRef.current
  }
  componentWillUnmount(){
    this.removeListener && this.removeListener()
  }
  whenInView = (inView) => {
    this.setState({inView})
  }
  mixImageProps(imageProps,initialWidth,initialHeight){
    if(typeof initialWidth !== 'undefined' && typeof initialHeight !== 'undefined'){
      const ratio = 100 / initialWidth
      const proportionalHeight = (( initialHeight * ratio ) )+'%'
      return {...imageProps,initialWidth,initialHeight,proportionalHeight}
    }
    else if(typeof initialWidth !== 'undefined'){
      return {...imageProps,initialWidth}
    }
    else if(typeof initialHeight !== 'undefined'){
      return {...imageProps,initialHeight}
    }
    return imageProps
  }
  render(){
    const { inView:load } = this.state
    const { alt, src, onSuccess, onError, onLoad, className, width, height, caption } = this.props
    const { imageRef } = this
    const lazy = true
    
    const props = { load, lazy, alt, src, imageRef, onSuccess, onError, onLoad, className }

    return (
      <ImageLoader {...props}>
        { 
          (imageProps) => 
            <>
              <Image {...this.mixImageProps(imageProps,width,height) }/>
              <p>{ caption }</p>
            </>
        }
      </ImageLoader>
    )
  }
}

export default GalleryImage
