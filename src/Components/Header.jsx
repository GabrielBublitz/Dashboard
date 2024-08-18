import React from 'react';
import { useDataRefresh } from '../Context/DataRefresh.jsx';
import { useToast } from '../Context/ToastContext.jsx';
import { useData } from '../Context/DataContext.jsx';

const { ipcRenderer } = window.require('electron');

const Header = (props) => {
    const { data, setDataAndNotify } = useDataRefresh();
    const { userConfig, setUserConfig } = useData();
    const { showToast } = useToast();

    const handleUpdateData = () => {
        setDataAndNotify(!data);
        showToast(true, 'Atualizado com sucesso', 'ok');
    };

    const changeBoardView = () =>{
        userConfig.fullview = !userConfig.fullview;
        ipcRenderer.send('write-file', { filePath: './config.json', content: userConfig });
    }

    const handleResponse = (event, response) => {
        setUserConfig(response);

        ipcRenderer.removeListener('receive', handleResponse)
    };

    return (
        <div className='container-header'>
            <div className='col-3'>
                <div className='title'>{props.name}</div>
            </div>
            <div className='container-fluid gap-1 padding-1 items-end'>
                {
                    props.updateData ? (<button className='btn button-primary' onClick={handleUpdateData}>Refresh</button>) : null
                }
                <button className='btn button-primary' onClick={changeBoardView}>View</button>
            </div>
        </div>);
};

export default Header;