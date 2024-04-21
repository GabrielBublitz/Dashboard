import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');
import { useData } from '../Context/DataContext.jsx';
import { useToast } from '../Context/ToastContext.jsx';

const JSONEditor = (props) => {
    const { darkMode, setDarkModeData, setUserConfig } = useData();
    const { showToast } = useToast();

    const handleJsonChange = () => {
        var jsonEditor = document.getElementsByClassName('json-editor')[0];

        if (jsonEditor.value) {
            try {
                var jsonSemHTML = jsonEditor.innerHTML.replace(/<\/?[^>]+(>|$)|&nbsp;/g, "");
                jsonSemHTML = jsonSemHTML.trim();
                const newData = JSON.parse(jsonSemHTML);

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
        jsonEditor.innerHTML = colorizeJSON(content, false);

        var jsonSemHTML = jsonEditor.innerHTML.replace(/<\/?[^>]+(>|$)|&nbsp;/g, "");
        jsonSemHTML = jsonSemHTML.trim();
        jsonEditor.value = JSON.parse(jsonSemHTML);

        ipcRenderer.removeListener('file-content', handleFileContent);
    }

    const handleError = (event, error) => {
        showToast(true, error.message, 'error');

        ipcRenderer.send('log-error', { content: error.error.stack });
        ipcRenderer.removeListener('write-file-error', handleError);
    };

    const loadEditorContent = () => {
        ipcRenderer.send('read-file', './config.json');

        ipcRenderer.on('file-content', handleFileContent);
    }

    function colorizeJSON(jsonObj, indentLevel = 0) {
        const indent = '&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(indentLevel);

        if (typeof jsonObj === 'object') {
            if (Array.isArray(jsonObj)) {
                let result = `${indent}<span style="color: #d6cc3c;">[</span><br>`;
                jsonObj.forEach((item, index) => {
                    result += `${indent}&nbsp;&nbsp;&nbsp;&nbsp;${colorizeJSON(item, indentLevel + 1)}`;
                    if (index < jsonObj.length - 1) {
                        result += ',<br>';
                    }
                });
                result += `<br>${indent}<span style="color: #d6cc3c;">]</span>`;
                return result;
            } else {
                let result = `${indent}<span style="color: #d6cc3c;">{</span><br>`;
                const keys = Object.keys(jsonObj);
                keys.forEach((key, index) => {
                    result += `${indent}&nbsp;&nbsp;&nbsp;&nbsp;<b><span style="color: #695cfe;">"${key}"</span>:</b> `;
                    result += colorizeJSON(jsonObj[key], indentLevel + 1);
                    if (index < keys.length - 1) {
                        result += ',<br>';
                    }
                });
                result += `<br>${indent}<span style="color: #d6cc3c;">}</span>`;
                return result;
            }
        } else {
            if (typeof jsonObj === 'string') {
                return `<span style="color: white;">"${jsonObj}"</span>`;
            } else {
                return jsonObj;
            }
        }
    }

    useEffect(() => {
        handleJsonChange();

        ipcRenderer.on('receive', handleResponse);

        return () => {
            ipcRenderer.removeListener('file-content', (event, content) => {
                jsonEditor.value = JSON.stringify(content, null, 2, 'utf8');
            });

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
            <div className='json-editor white-text' contentEditable='true' />
        </div>
    );
};

export default JSONEditor;
