import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');
import { useData } from '../Context/DataContext.jsx';
import { useToast } from '../Context/ToastContext.jsx';

const JSONEditor = (props) => {
    const { darkMode, setDarkModeData, setUserConfig } = useData();
    const { showToast } = useToast();

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
        setUserConfig(response);

        ipcRenderer.removeListener('receive', handleResponse)
    };

    const handleFileContent = (event, content) => {
        var jsonEditor = document.getElementsByClassName('json-editor')[0];
        jsonEditor.value = JSON.stringify(content, null, 2, 'utf8');

        ipcRenderer.removeListener('file-content', handleFileContent);
    }

    const handleError = (event, error) => {
        console.log(error);
        showToast(true, error.message, 'error'); 

        ipcRenderer.send('log-error', {filePath: './log.txt', content: error.error.stack}); 
        ipcRenderer.removeListener('write-file-error', handleError);
    };

    const loadEditorContent = () => {
        ipcRenderer.send('read-file', './config.json');

        ipcRenderer.on('file-content', handleFileContent);
    }

    useEffect(() => {
        handleJsonChange();

        ipcRenderer.on('receive', handleResponse);

        return () => {
            ipcRenderer.removeListener('file-content', (event, content) => {
                jsonEditor.value = JSON.stringify(content, null, 2, 'utf8');
            });
            console.log('save')
            ipcRenderer.on('write-file-error', handleError);
        }
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
            });

            ipcRenderer.on('write-file-error', handleError);
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
