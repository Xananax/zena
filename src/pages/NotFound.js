import React from 'react'
import { Content } from '../wrappers/Content'

export const NotFound = ({url, title, children}) => (
  <Content title={title | "Not found"}>
    <h3>We couldn't find the page {url}</h3>
    {children}
  </Content>
)
