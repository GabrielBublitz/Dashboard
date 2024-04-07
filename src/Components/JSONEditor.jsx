import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');
import { useData } from '../Context/DataContext.jsx';

const JSONEditor = (props) => {
    const { darkMode, setDarkModeData } = useData();

    const handleJsonChange = () => {
        var jsonEditor = document.getElementsByClassName('json-editor')[0]

        if (jsonEditor.value) {
            try {
                const newData = JSON.parse(jsonEditor.value);

                ipcRenderer.send('write-file', { filePath: './config.json', content: newData });

            } catch (error) {
                console.error('Erro ao analisar o JSON:', error);
            }
        }
    };

    const handleResponse = (event, response) => {
        setDarkModeData(response.darkmode);
    };

    const handleFileContent = (event, content) => {
        var jsonEditor = document.getElementsByClassName('json-editor')[0];
        jsonEditor.value = JSON.stringify(content, null, 2, 'utf8');

        ipcRenderer.removeListener('file-content', handleFileContent);
    }

    const loadEditorContent = () => {
        ipcRenderer.send('read-file', './config.json');

        ipcRenderer.on('file-content', handleFileContent);
    }

    useEffect(() => {
        handleJsonChange();

        ipcRenderer.on('receive', handleResponse);
    }, [props.save]);

    useEffect(() => {
        loadEditorContent();
    }, [darkMode]);

    useEffect(() => {
        var jsonEditor = document.getElementsByClassName('json-editor')[0];

        loadEditorContent();

        return () => {
            ipcRenderer.removeListener('file-content', (event, content) => {
                jsonEditor.value = JSON.stringify(content, null, 2, 'utf8');
            })
        }
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
