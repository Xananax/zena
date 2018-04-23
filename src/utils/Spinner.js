import React from 'react'
import classnames from 'classnames'
import { spinner } from './Spinner.module.css'

export const Spinner = ({ className }) => <span className={classnames(spinner,className)}/>

export default Spinner