import React, { useState, useEffect } from 'react';
import { useDataRefresh } from '../Context/DataRefresh.jsx';

const { ipcRenderer } = window.require('electron');

const TestCard = ({ data, id }) => {
    const [service_response, setResponse] = useState({});
    const [response_data, setResponseData] = useState({});
    const { dataRefresh } = useDataRefresh();

    const fetchData = () => {

        ipcRenderer.send('fetch-data', {
            url: data.firstUrl,
            index: id
        });

        ipcRenderer.on(data.firstUrl + id, handleDataReceived);
        ipcRenderer.on(data.firstUrl + 'error' + id, handleError);
    }

    const handleDataReceived = (event, response) => {
        if (response.identifier === data.firstUrl) {
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

        ipcRenderer.removeListener(data.firstUrl + id, handleDataReceived);
        ipcRenderer.removeListener(data.firstUrl + 'error' + id, handleError);
    };

    const handleError = (event, response) => {
        if (response.identifier === data.firstUrl) {
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

        ipcRenderer.removeListener(data.firstUrl + id, handleDataReceived);
        ipcRenderer.removeListener(data.firstUrl + 'error' + id, handleError);
    }

    function GetStatus() {
        var className = 'card card-size-2 ';
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

    useEffect(() => {
        fetchData();
        const newInterval = setInterval(fetchData, 10000);

        return () => {
            clearInterval(newInterval);
            ipcRenderer.removeListener(data.firstUrl + id, handleDataReceived);
            ipcRenderer.removeListener(data.firstUrl + 'error' + id, handleError);
        };
    }, [dataRefresh]);

    return (
        <div className={GetStatus()}>
            <div className='title white-text'>{data && data.title.slice(0, 11)}</div>
            <div className='stats'>
                <div className='baseline align-end'>
                    <div className='white-text text-font'>
                        <b>
                            {
                                response_data.workers && Array.isArray(response_data.workers) ? ` ${response_data.workers.length}/2` : ' -'
                            }
                        </b>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestCard;