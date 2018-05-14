import { createElement as el } from 'react'

export const Pane = ({value:__html}) => el('div',{dangerouslySetInnerHTML:{__html}})