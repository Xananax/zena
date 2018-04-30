import React from 'react'
import { Route } from 'react-router-dom'

export const ContextRoute = ({ component:Comp, path, exact, context }) => 
  <Route path={path} exact={exact} render={({match})=><Comp url={match.url} params={match.params} {...context}/>}/>

export default ContextRoute