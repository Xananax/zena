import React from 'react'
import classnames from 'classnames'
import css from './Spinner.module.css'

export const Spinner = ({ className, inverted }) => <span className={classnames(css.spinner,inverted && css.inverted,className)}/>

export default Spinner