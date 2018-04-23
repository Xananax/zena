import React from 'react'
import { loadImage } from './loadImage'

const state_loading = { loading: true, loaded: false, failure: false }
const state_loaded = { loading: false, loaded: true, failure: false }
const state_failure = { loading: false, loaded: false, failure: true }
const state_none = { loading: false, loaded: false, failure: false }

const getOrientation = (width,height) => ( width === height 
  ? 'square'
  : ( width > height
    ? 'landscape'
    : 'portrait'
    )
)

export class ImageLoader extends React.Component {
  static getDerivedStateFromProps({ src }, prevState) {
    if (src !== prevState.src) {
      return { src, ...state_none }
    }
    return null;
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      src: props.src,
      image: false,
      loading: false,
      loaded: false,
      failure: false,
      error: false,
      width:0,
      height:0
    }
  }
  load(src) {
    if (!src) { return; }
    this.setState((s) => ({ ...s, src, ...state_loading }), () => {
      if (this.props.onLoad) { this.props.onLoad({src}) }
      loadImage(src)
        .then(image => {
          const { width, height } = image
          this.setState((s) => ({ ...s, image, width, height, ...state_loaded }))
          if (this.props.onSuccess) {
            this.props.onSuccess(image)
          }
        })
        .catch(error => {
          this.setState((s) => ({ ...src, error, ...state_failure }))
          if (this.props.onError) {
            this.props.onError({src, error})
          }
        })
    })
  }
  shouldLoad() {
    if (!this.state.src) { return false; }
    if (this.state.image && this.state.image.src === this.state.src) { return false; }
    if (this.state.loading || this.state.failure || this.state.loaded) { return false; }
    if (this.props.lazy && !this.props.load) { return false }
    return true;
  }
  loadIfShould() {
    if (this.shouldLoad()) {
      this.load(this.state.src)
    }
  }
  componentDidMount() {
    this.loadIfShould()
  }
  componentDidUpdate() {
    this.loadIfShould()
  }
  render() {
    const { src, image, loading, loaded, failure, error, width:naturalWidth, height:naturalHeight } = this.state
    const { lazy, alt, children: renderFunction, width, height, imageRef, className:givenClassName } = this.props
    const orientation = getOrientation( naturalWidth, naturalHeight )
    const className = `image-${orientation}`+(givenClassName ? ' '+givenClassName:'')
    const props = { 
      src,
      image,
      loading,
      loaded,
      failure,
      error,
      lazy,
      alt,
      width,
      height,
      naturalWidth,
      naturalHeight,
      orientation,
      className,
      imageRef
    }
    return renderFunction(props)
  }
}

export default ImageLoader