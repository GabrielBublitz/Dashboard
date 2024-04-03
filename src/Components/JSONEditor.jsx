import React, { useState, useEffect } from 'react';
const fs = window.require("fs")
const userConfig = require('../../userConfig.json');

document.getElementsByClassName('json-editor').value += JSON.stringify(userConfig)

const JSONEditor = (props) => {
    const [jsonData, setJsonData] = useState(userConfig);

    const updateJsonData = (newData) => {
        setJsonData(newData);
    };

    const handleJsonChange = () => {
        if (document.getElementsByClassName('json-editor')[0].value) {
            try {
                const newData = JSON.parse(document.getElementsByClassName('json-editor')[0].value);
                updateJsonData(newData);

                fs.writeFile('userConfig.json', JSON.stringify(newData, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Erro ao salvar o arquivo JSON:', err);
                    } else {
                        console.log('Arquivo JSON atualizado com sucesso.');
                    }
                });
            } catch (error) {
                console.error('Erro ao analisar o JSON:', error);
            }
        }
    };

    useEffect(() => {
        handleJsonChange();
    }, [props.save]);

    useEffect(() => {
        document.getElementsByClassName('json-editor')[0].value = JSON.stringify(jsonData, null, 2, 'utf8');
    }, [jsonData]);

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
