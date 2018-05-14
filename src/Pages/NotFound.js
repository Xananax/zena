import React from 'react'
import { Content } from '../Components/Content'
import { Page } from '../Components/Page'

export const NotFound = ({match:{ url }}) => 
  <Page>
    <Content title={`404 Not Found`}>
      the url {url} is invalid
    </Content>
  </Page>