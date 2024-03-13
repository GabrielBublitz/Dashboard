import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
const { ipcRenderer } = window.require('electron');

const App = () => {

  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    ipcRenderer.send('read-file', 'userConfig.json');

    ipcRenderer.on('file-content', (event, content) => {
      setFileContent(content);

      if (JSON.parse(content).darkmode) {
        var body = document.querySelector('body');

        body.classList.add('dark');

        if (body.classList.contains('dark')) {
          document.querySelector('.mode-text').innerText = 'Light Mode';
        } else {
          document.querySelector('.mode-text').innerText = 'Dark Mode';
        }
      }
    });

    return () => {
      ipcRenderer.removeAllListeners('file-content');
    };
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;