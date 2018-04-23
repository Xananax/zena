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
  render(){
    const { inView:load } = this.state
    const { alt, src, onSuccess, onError, onLoad, className } = this.props
    const { imageRef } = this
    const lazy = true
    
    const props = { load, lazy, alt, src, imageRef, onSuccess, onError, onLoad, className }

    return (
      <ImageLoader {...props}>
        { 
          (imageProps) => <Image {...imageProps}/>
        }
      </ImageLoader>
    )
  }
}

export default GalleryImage
