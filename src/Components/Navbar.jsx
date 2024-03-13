import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const toggle = () => {
    document.querySelector('.sidebar').classList.toggle('close');
  };

  const searchBtn = () => {
    document.querySelector('.sidebar').classList.remove('close');
  }

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
            {/* <img alt='logo' /> */}
          </span>
          <div className="text header-text">
            <span className="name">Dashboard</span>
            <span className="profession">Gestora</span>
          </div>
        </div>
        <i className="toggle" onClick={toggle}><svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox='0 0 22 22' className='test'><path d="M.366 19.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 0 0 0-2.827L1.768.292A1.063 1.063 0 0 0 .314.282a.976.976 0 0 0-.011 1.425l7.894 7.617a.975.975 0 0 1 0 1.414L.366 18.295a.974.974 0 0 0 0 1.413"></path></svg></i>
      </header>
      <div className='menu-bar'>
        <div className="menu">
          <li className="search-box" onClick={searchBtn}>
            <i className="icon"><svg xmlns="http://www.w3.org/2000/svg" width='26px' height='26px' viewBox="0 0 96 96"><path d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z"></path></svg></i>
            <input type='text' placeholder='Search...'></input>
          </li>
          <ul className="menu-links">
            <li className="nav-links">
              <NavLink to="/main_window">
                <i className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                    <path d="M 23.951172 4 A 1.50015 1.50015 0 0 0 23.072266 4.3222656 L 8.859375 15.519531 C 7.0554772 16.941163 6 19.113506 6 21.410156 L 6 40.5 C 6 41.863594 7.1364058 43 8.5 43 L 18.5 43 C 19.863594 43 21 41.863594 21 40.5 L 21 30.5 C 21 30.204955 21.204955 30 21.5 30 L 26.5 30 C 26.795045 30 27 30.204955 27 30.5 L 27 40.5 C 27 41.863594 28.136406 43 29.5 43 L 39.5 43 C 40.863594 43 42 41.863594 42 40.5 L 42 21.410156 C 42 19.113506 40.944523 16.941163 39.140625 15.519531 L 24.927734 4.3222656 A 1.50015 1.50015 0 0 0 23.951172 4 z M 24 7.4101562 L 37.285156 17.876953 C 38.369258 18.731322 39 20.030807 39 21.410156 L 39 40 L 30 40 L 30 30.5 C 30 28.585045 28.414955 27 26.5 27 L 21.5 27 C 19.585045 27 18 28.585045 18 30.5 L 18 40 L 9 40 L 9 21.410156 C 9 20.030807 9.6307412 18.731322 10.714844 17.876953 L 24 7.4101562 z" />
                  </svg>
                </i>
                <span className='text nav-text'>Home</span>
              </NavLink>
            </li>
            <li className="nav-links">
              <NavLink to="dashboard">
                <i className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5zM4 15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4zM4 5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm8 10a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-4z"></path></svg>
                </i>
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