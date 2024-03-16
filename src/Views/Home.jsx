import React, { useState, useEffect } from 'react';
import DashContainer from '../Components/DashContainer.jsx';
const { ipcRenderer } = window.require('electron');

const Home = () => {

    const [data, setData] = useState([
        {
            "name": "Empresa 1",
            "services": [
                {
                    'status': 200,
                    'workers': 2,
                },
                {
                    'status': 200,
                    'workers': 2,
                }
                ,
                {
                    'status': 200,
                    'workers': 2,
                }
                ,
                {
                    'status': 200,
                    'workers': 2,
                }
            ],
        },
        {
            
            "name": "Empresa 2",
            "services": [
                {
                    'status': 200,
                    'workers': 2,
                },
                {
                    'status': 200,
                    'workers': 2,
                }
            ],
        }
    ]);

    // useEffect(() => {
    //     const handleDataReceived = (event, response) => {
    //         setData(response);
    //     };

    //     ipcRenderer.send('fetch-data', 'https://pokeapi.co/api/v2/pokemon/ditto');

    //     ipcRenderer.on('data-fetched', handleDataReceived);

    //     return () => {
    //         ipcRenderer.removeListener('data-fetched', handleDataReceived);
    //     };
    // }, []);

    return (
        <section className='home'>
            <div className="text">Home</div>
            <div className="container">
                {data.map((item, index) => (
                    <DashContainer key={index} name={item.name} services={item.services} />
                ))}
            </div>
        </section>);
};

export default Home;