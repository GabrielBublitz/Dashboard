import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

const Card = (props) => {
    const [data] = useState(props.server);
    const [service_response, setResponse] = useState({});
    const [response_data, setResponseData] = useState({});

    function GetStatus() {
        var className = 'card ';

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

    function FetchData(){
        ipcRenderer.send('fetch-data', {
            url: data.url
        });
    }

    useEffect(() => {

        const handleDataReceived = (event, response) => {
            if (response.identifier === data.url) {
                setResponse(response);
            }
        };

        FetchData();

        const interval = setInterval(FetchData, 20000);

        ipcRenderer.on('data-fetched', handleDataReceived);

        return () => {
            clearInterval(interval);
            ipcRenderer.removeListener('data-fetched', handleDataReceived);
        };
    }, []);

    useEffect(() => {
        if (service_response.data && service_response.data.length > 0) {
            setResponseData(service_response.data[0]);
        }
    }, [service_response]);

    return (
        <div className={GetStatus()}>
            <div className='title white-text'>Server {data.server.toUpperCase()}</div>
            <div className='stats'>
                <div className='white-text'>Status: {service_response.status}</div>
                <div className='white-text'>Workers:
                    {
                        response_data.workers && Array.isArray(response_data.workers) ? ` ${response_data.workers.length}` : 'Loading...'
                    }
                </div>
                <div className='white-text'>Rogues: {response_data.rogues}</div>
            </div>
        </div>
    );
}

export default Card;