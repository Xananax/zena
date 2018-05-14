import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ScrollToTopOnPageChange } from './Components/ScrollToTopOnPageChange'
import { Galleries } from './Pages/Galleries'
import { Press } from './Pages/Press'
import { Articles } from './Pages/Articles'
import { Events } from './Pages/Events'
import { NotFound } from './Pages/NotFound'
import { ToastContainer } from 'react-toastify';
import './styles/App.css'

export const App = () =>
  <ScrollToTopOnPageChange>
    <Switch>
      <Redirect from='/' exact to='/articles/home'/>
      <Route path="/events/:event?"     component={Events}/>
      <Route path="/articles/:article?" component={Articles}/>
      <Route path="/press/:year?"       component={Press}/>
      <Route path="/gallery/:category"  component={Galleries}/>
      <Route component={NotFound}/>
    </Switch>
    <ToastContainer/>
  </ScrollToTopOnPageChange>