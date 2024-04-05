import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');
import { useData } from '../Context/DataContext.jsx';
// const userConfig = require('../../userConfig.json');

const JSONEditor = (props) => {
    const [jsonData, setJsonData] = useState({});
    const { darkMode, setdarkModeData } = useData();

    const updateJsonData = (newData) => {
        setJsonData(newData);
    };

    const handleUpdateTheme = (request) =>{
        setdarkModeData(request.darkmode)
        console.log(darkMode);
    }

    const handleJsonChange = (event) => {
        if (document.getElementsByClassName('json-editor')[0].value) {
            try {
                const newData = JSON.parse(document.getElementsByClassName('json-editor')[0].value);
                updateJsonData(newData);
                setdarkModeData(newData.darkmode)
            
                ipcRenderer.send('write-file', { filePath: './userConfig.json', content: newData});
                
                // ipcRenderer.on('receive', (response) => {
                //     setJsonData(response);
                //     console.log('response');
                // })
            } catch (error) {
                console.error('Erro ao analisar o JSON:', error);
            }
        }
    };

    useEffect(() => {
        handleJsonChange();
        // // handleUpdateTheme();
        // ipcRenderer.removeAllListeners();
        console.log('a')

    }, [props.save]);

    useEffect(() => {
        ipcRenderer.send('read-file', './userConfig.json');
        ipcRenderer.on('file-content', (event, content) => {
            document.getElementsByClassName('json-editor')[0].value = JSON.stringify(content, null, 2, 'utf8');
        });
    }, []);

    return (
        <div className='editor-container'>
            <textarea className='json-editor white-text default-component'
                rows={35}
                cols={50}
            />
        </div>
    );
};

export default JSONEditor;
