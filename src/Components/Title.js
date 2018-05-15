import React from 'react'
import Helmet from 'react-helmet'

export const Title = ({value}) =>
  <Helmet>
    <title>
      { value
      ? `Zena Assi | ${value}`
      : `Zena Assi`
      }
    </title>
  </Helmet>