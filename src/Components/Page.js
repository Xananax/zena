import React from 'react'
import logo from '../assets/signature.svg'

export const Page = ({ children }) => 
  <div>
    <div>
      { children }
    </div>
    <nav className="demo">
      <a href="#" className="brand">
        <img className="logo" src={logo} alt="zena assi's signature"/>
        <span>Picnic CSS</span>
      </a>
      <input id="bmenub" type="checkbox" className="show"/>
      <label htmlFor="bmenub" className="burger pseudo button">
        <span>menu</span>
      </label>

      <div className="menu">
        <a href="#" className="pseudo button icon-picture">Demo</a>
        <a href="#" className="button icon-puzzle">Plugins</a>
      </div>
    </nav>


  </div>