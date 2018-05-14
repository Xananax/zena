import React from 'react'
import logo from '../assets/signature.svg'
import { links } from '../data/links'
import { NavLink } from 'react-router-dom'

export const Nav = () => 
  <nav className="demo">
    <a href="/" className="brand">
      <img className="logo" src={logo} alt="zena assi's signature"/>
    </a>
    <input id="bmenub" type="checkbox" className="show"/>
    <label htmlFor="bmenub" className="burger pseudo button">
      <span>menu</span>
    </label>

    <div className="menu">
      <img className="logo" src={logo} alt="zena assi's signature"/>      
      { links.map(link=><NavLink {...link}/>)}
    </div>
  </nav>