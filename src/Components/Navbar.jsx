import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const toggle = () => {
    document.querySelector('.sidebar').classList.toggle('close');
  };

  const toggleDarkMode = () => {
    var body = document.querySelector('body');
    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
      document.querySelector('.mode-text').innerText = 'Light Mode';
    } else {
      document.querySelector('.mode-text').innerText = 'Dark Mode';
    }
  };

  // Navbar
  return (
    //Separar em componentes
    <nav className='sidebar close'>
      <header>
        <div className='image-text'>
          <span className='image'>
            <img src='' alt='logo' />
          </span>
          <div className="text header-text">
            <span className="name">Dashboard</span>
            <span className="profession">Gestora</span>
          </div>
        </div>
        <i className="toggle" onClick={toggle}>&gt;</i>
      </header>
      <div className='menu-bar'>
        <div className="menu">
          <li className="search-box">
            <i className="icon"></i>
            <input type='search' placeholder='Search...'></input>
          </li>
          <ul className="menu-links">
            <li className="nav-links">
              <NavLink to="/main_window">
                <i className="icon"></i>
                <span className='text nav-text'>Home</span>
              </NavLink>
            </li>
            <li className="nav-links">
              <NavLink to="dashboard">
                <i className="icon"></i>
                <span className='text nav-text'>Dashboard</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li className="mode">
            <div className="moon-sun">
              <i className="icon moon"></i>
              <i className="icon sun"></i>
            </div>
            <span className="mode-text text">Dark Mode</span>
            <div className="toggle-switch" onClick={toggleDarkMode}>
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;