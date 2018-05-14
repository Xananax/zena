import React from 'react'
import { Page, Content } from '../Components'

export const NotFound = ({match:{ url }}) => 
  <Page>
    <Content title={`404 Not Found`}>
      the url {url} is invalid
    </Content>
  </Page>