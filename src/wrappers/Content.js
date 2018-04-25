import React from 'react'
import classnames from 'classnames'
import { content } from './Content.module.css'

export const Content = ({children, className}) => (
  <div className={classnames(content,className)}>
    { children }
  </div>
)

export default Content;