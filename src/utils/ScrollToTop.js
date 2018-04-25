import { withRouter } from 'react-router-dom'
import React from 'react'

class ScrollToTop_ extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }
  render() {
    return this.props.children
  }
}


export const ScrollToTop = withRouter(ScrollToTop_)

export default ScrollToTop