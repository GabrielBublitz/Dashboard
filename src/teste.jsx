import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
const config = require('../userConfig.json');

const App = () => {

  useEffect(() => {
    if (config.darkmode) {
      var body = document.querySelector('body');

      body.classList.add('dark');

      if (body.classList.contains('dark')) {
        document.querySelector('.mode-text').innerText = 'Light Mode';
      } else {
        document.querySelector('.mode-text').innerText = 'Dark Mode';
      }
    }

    return () => { };
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;