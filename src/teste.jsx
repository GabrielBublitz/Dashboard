import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import { useData } from './Context/DataContext.jsx';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const { darkMode, setDarkModeData, setUserConfig } = useData();

  const handleResponse = (event, response) => {
    setUserConfig(response);
    setDarkModeData(response.darkmode);

    ipcRenderer.removeListener('receive', handleResponse);
  };

  ipcRenderer.on('receive', handleResponse);

  useEffect(() => {
    ipcRenderer.send('read-file', './config.json');

    const handleFileContent = (event, content) => {
      setDarkModeData(content.darkmode);
      setUserConfig(content);

      ipcRenderer.removeListener('file-content', handleFileContent);
    }

    ipcRenderer.on('file-content', handleFileContent);

  }, []);

  useEffect(() => {
    var body = document.querySelector('body');
    var modeText = document.querySelector('.mode-text')

    if (darkMode) {
      body.classList.add('dark');
      modeText.innerText = 'Light Mode';
    } else {
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