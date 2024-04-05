import React, { useState, useEffect } from 'react';
import { useData } from '../Context/DataContext.jsx';

const { ipcRenderer } = window.require('electron');

const Card = (props) => {
    const [cardData] = useState(props.server);
    const [service_response, setResponse] = useState({});
    const [response_data, setResponseData] = useState({});
    const { data } = useData();

    function GetStatus() {
        var className = 'card ';

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

        className += service_response.status === 200 ? 'ok' : 'card';

        return className;
    }

    function fetchData() {
        ipcRenderer.send('fetch-data', {
            url: cardData.url
        });
    }

    useEffect(() => {
        const interval = setInterval(fetchData, 60000);

        const handleDataReceived = (event, response) => {
            if (response.identifier === cardData.url) {
                setResponse(response);
            }
        };

        const handleError = (event, response) => {
            setResponse(response);
        }

        fetchData();

        ipcRenderer.on('data-fetched', handleDataReceived);

        ipcRenderer.on('fetch-error', handleError);

        return () => {
            ipcRenderer.removeListener('data-fetched', handleDataReceived);
            clearInterval(interval);
        };
    }, [cardData, data]);

    useEffect(() => {
        if (service_response.data && service_response.data.length > 0) {
            setResponseData(service_response.data[0]);
        }
    }, [service_response]);

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
                <div className='white-text'>Fails: {response_data.rogues || response_data.rogues == 0 ? `${response_data.rogues}` : ' -'}</div>
            </div>
        </div>
    );
}

export default Card;