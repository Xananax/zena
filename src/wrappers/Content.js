import React from 'react'
import { content } from './Content.module.css'

export const Content = ({children}) => (
  <div className={content}>
    { children }
  </div>
)

export default Content;