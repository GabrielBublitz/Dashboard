import React, { useState, useEffect } from 'react';
import { useDataRefresh } from '../Context/DataRefresh.jsx';
import { useToast } from '../Context/ToastContext.jsx';

const { ipcRenderer } = window.require('electron');

const Card = (props) => {
    const [cardData] = useState(props.server);
    const [service_response, setResponse] = useState({});
    const [response_data, setResponseData] = useState({});
    const { data } = useDataRefresh();
    const { showToast } = useToast();

    const fetchData = () => {
        ipcRenderer.send('fetch-data', {
            url: cardData.url,
            index: cardData.index
        });

        ipcRenderer.on(cardData.url + cardData.index, handleDataReceived);
        ipcRenderer.on(cardData.url + 'error' + cardData.index, handleError);
    }

    const handleDataReceived = (event, response) => {
        if (response.identifier === cardData.url) {
            if (response) {
                setResponse(response);
                if (response.data) {
                    setResponseData(response.data);
                }
                else if (response.status !== 200) {
                    setResponseData({})
                }
            }
        }

        ipcRenderer.removeListener(cardData.url + cardData.index, handleDataReceived);
        ipcRenderer.removeListener(cardData.url + 'error' + cardData.index, handleError);
    };

    const handleError = (event, response) => {
        if (response.identifier === cardData.url) {
            if (response) {
                setResponse(response);
                if (response.data) {
                    setResponseData(response.data);
                }
                else if (response.status !== 200) {
                    setResponseData({})

                    if (cardData.alertLog) {
                        showToast(true, `Falha ao carregar ${props.companyName}`, 'error');

                        ipcRenderer.send('log-error', { filePath: './log.txt', content: `Company: ${props.companyName}\nMessage: ${response.errorMessage}\nStackTrace: ${response.stack}` });
                    }
                }
            }
        }

        ipcRenderer.removeListener(cardData.url + cardData.index, handleDataReceived);
        ipcRenderer.removeListener(cardData.url + 'error' + cardData.index, handleError);
    }

    useEffect(() => {
        fetchData();
        const newInterval = setInterval(fetchData, 10000);

        return () => {
            clearInterval(newInterval);
            ipcRenderer.removeListener(cardData.url + cardData.index, handleDataReceived);
            ipcRenderer.removeListener(cardData.url + 'error' + cardData.index, handleError);
        };
    }, [data]);

    function GetStatus() {
        var className = 'card ';

        if (Object.keys(service_response).length === 0) {
            return className;
        }

        if (service_response.errorMessage) {
            className += 'error'
            return className;
        }

        if ((response_data.workers != undefined && Array.isArray(response_data.workers)) && response_data.workers.length == 0) {
            className += 'error'
            return className;
        }

        if ((response_data.workers != undefined && Array.isArray(response_data.workers)) && response_data.workers.length != 2) {
            className += 'warning'
            return className;
        }

        className += service_response.status === 200 ? 'ok' : 'error';

        return className;
    }

    return (
        <div className={GetStatus()}>
            <div className='title white-text'>Server {cardData.server ? cardData.server.toUpperCase() : '-'}</div>
            <div className='stats'>
                <div className='white-text'>Status: {service_response.status ? service_response.status : ' -'}</div>
                <div className='white-text'>Workers:
                    {
                        response_data.workers && Array.isArray(response_data.workers) ? ` ${response_data.workers.length}` : ' -'
                    }
                </div>
                <div className='white-text'>UnitsDone: {response_data.unitsDone || response_data.unitsDone == 0 ? `${response_data.unitsDone}` : ' -'}</div>
                <div className='white-text'>Fails: {response_data.rogues || response_data.rogues == 0 ? `${response_data.rogues}` : ' -'}</div>
            </div>
        </div>
    );
}

export default Card;