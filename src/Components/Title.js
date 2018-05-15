import React from 'react'
import Helmet from 'react-helmet'

export const Title = ({value}) =>
  <Helmet>
    <title>{value}</title>
  </Helmet>