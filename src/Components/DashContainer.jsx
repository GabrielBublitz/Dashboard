import React, { useState, useEffect } from 'react';
import CardContainer from './CardContainer.jsx';
import { useDataRefresh } from '../Context/DataRefresh.jsx';

const { ipcRenderer } = window.require('electron');

const DashContainer = (props) => {
    const [containerData] = useState(props);
    const [service_response, setResponse] = useState({});
    const [serviceStatus, setServiceStatus] = useState("");
    const { data } = useDataRefresh();

    const handleDataReceived = (event, response) => {
        if (response.identifier === containerData.web_service) {
            if (response) {
                setResponse(response);
            }
        }

        ipcRenderer.removeListener(containerData.web_service + "wsStatus", handleDataReceived);
    };

    const RequestWebServiceStatus = () => {
        ipcRenderer.send('fetch-data', {
            url: containerData.web_service,
            index: "wsStatus"
        });

        ipcRenderer.on(containerData.web_service + "wsStatus", handleDataReceived);
        ipcRenderer.on(containerData.web_service + 'error' + "wsStatus", handleDataReceived);
    }

    useEffect(() => {
        RequestWebServiceStatus();
        const newInterval = setInterval(RequestWebServiceStatus, 10000);

        return () => {
            clearInterval(newInterval);
            ipcRenderer.removeListener(containerData.web_service + "wsStatus", handleDataReceived);
        };
    }, [data]);

    useEffect(() => {
        if(service_response.status && service_response.status === 200){
            setServiceStatus("(WS ✅)");
        } else {
            setServiceStatus("(WS ❌)");
        }
    }, [service_response]);

    return (
        <div className='dash-container'>
            <h1 className='dash-container-title'>{props.name} <span className='dash-container-status'>- {serviceStatus}</span></h1>
            <div className="card-container padding-15">
                {props.services && props.services.map((item, index) => {
                    return <CardContainer key={index} item={item} base_url={props.base_url} companyName={props.name} />;
                })}
            </div>
        </div>
    );
};

export default DashContainer;