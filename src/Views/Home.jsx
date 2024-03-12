import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

const Home = () => {

    const [fileContent, setFileContent] = useState('');

    useEffect(() => {
      ipcRenderer.send('read-file', 'userConfig.json');
  
      ipcRenderer.on('file-content', (event, content) => {
        setFileContent(content);
        console.log('Conteúdo do arquivo:', content);
      });
  
      return () => {
        ipcRenderer.removeAllListeners('file-content');
      };
    }, []);

    return (
        <div>
            Home
        </div>);
};

export default Home;