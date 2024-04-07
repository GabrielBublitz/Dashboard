import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import { useData } from './Context/DataContext.jsx';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const { darkMode, setDarkModeData } = useData();

  const handleResponse = (event, response) => {
    setDarkModeData(response.darkmode);
  };

  ipcRenderer.on('receive', handleResponse);

  useEffect(() => {
    ipcRenderer.send('read-file', './config.json');

    ipcRenderer.on('file-content', (event, content) => {
      setDarkModeData(content.darkmode);
    });
  }, []);

  useEffect(() => {
    var body = document.querySelector('body');
    var modeText = document.querySelector('.mode-text')

    if(darkMode){
      body.classList.add('dark');
      modeText.innerText = 'Light Mode';
    }else{
      body.classList.remove('dark');
      modeText.innerText = 'Dark Mode';
    }

  }, [darkMode]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;