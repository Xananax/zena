import React from 'react'
import GalleryImage from './GalleryImage'
import { galleryImage, gallery, galleryItem } from './Gallery.module.css'

export class Gallery extends React.Component{
  static getDerivedStateFromProps({ images }, prevState) {
    if (images !== prevState.images) {
      const newImages = { }
      let hasNewImages = false
      images.forEach( (image) => {
        const src = typeof image === 'string' ? image : image.src
        if(!(src in prevState.loaded)){
          hasNewImages = true
          newImages[src] = { status: 'none' }
        }
      })
      if(hasNewImages){
        const loaded = { ...prevState.loaded, ...newImages }
        const newState = { images, loaded }
        return newState
      }
    }
    return null;
  }
  
  state = { images:[],  loaded:{} }
  
  onSuccess = ({src}) => this.setImageStatus(src,'success')
  onError = ({src}) => this.setImageStatus(src,'error')
  onLoad = ({src}) => this.setImageStatus(src,'load')
  setImageStatus = (src,status) => this.setState((prevState)=>({...prevState,loaded:{...prevState.loaded,[src]:{status}}}))

  renderImage(image){
    const { src, width, height } = typeof image === 'string' ? {src:image} : image
    const { onSuccess, onError, onLoad } = this
    const props = { onSuccess, onError, onLoad, src, width, height, className:galleryImage }
    return <div key={src} className={galleryItem}><GalleryImage alt="" {...props}/></div>
  }
  render(){
    return (
      <div className={gallery}>
        { this.state.images.map(image=>this.renderImage(image))}
      </div>
    )
  }
}

export default Gallery