import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

const Card = (props) => {
    const [data] = useState(props.server);
    const [service_response, setResponse] = useState({});
    const [response_data, setResponseData] = useState({});

    useEffect(() => {
        const handleDataReceived = (event, response) => {
            setResponse(response);
        };

        ipcRenderer.send('fetch-data', `${data.base_url}${data.port}${data.path}`);

        ipcRenderer.on('data-fetched', handleDataReceived);

        return () => {
            ipcRenderer.removeListener('data-fetched', handleDataReceived);
        };
    }, []);

    useEffect(() => {
        if (service_response.data && service_response.data.length > 0) {
            setResponseData(service_response.data[0]);
            console.log(response_data)
        }
    }, [service_response]);

    return (
        <div className={service_response.status === 200 ? 'card ok' : 'card'}>
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