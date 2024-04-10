import React, { useState, useEffect } from 'react';
import { useDataRefresh } from '../Context/DataRefresh.jsx';
const { ipcRenderer } = window.require('electron');

const Card = (props) => {
    const [cardData] = useState(props.server);
    const [service_response, setResponse] = useState({});
    const [response_data, setResponseData] = useState({});
    const [interval, setIntervalData] = useState(null);
    const { data } = useDataRefresh();

    const fetchData = () => {
        ipcRenderer.send('fetch-data', {
            url: cardData.url
        });
    }

    const handleDataReceived = (event, response) => {
        if (response.identifier === cardData.url) {
            if (response) {
                setResponse(response);
                if (response.data && response.data.length > 0) {
                    setResponseData(response.data[0]);
                }
                else if (response.status !== 200) {
                    setResponseData({})
                }
            }
        }
    };

    const handleError = (event, response) => {
        if (response.identifier === cardData.url) {
            if (response) {
                setResponse(response);
                if (response.data && response.data.length > 0) {
                    setResponseData(response.data[0]);
                }
                else if (response.status !== 200) {
                    setResponseData({})
                }
            }
        }
    }

    useEffect(() => {
        setIntervalData(setInterval(fetchData, 10000));

        ipcRenderer.addListener('data-fetched', handleDataReceived);

        ipcRenderer.addListener('fetch-error', handleError);

        return () => {
            clearInterval(interval);
            setIntervalData(null);
            ipcRenderer.removeListener('data-fetched', handleDataReceived);
            ipcRenderer.removeListener('fetch-error', handleError);
        };
    }, []);

    useEffect(() => {
        fetchData();
        clearInterval(interval);
        setIntervalData(null);
    }, [data])

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