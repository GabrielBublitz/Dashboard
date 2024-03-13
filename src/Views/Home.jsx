import React, { useState, useEffect } from 'react';
import Card from '../Components/Card.jsx';
const { ipcRenderer } = window.require('electron');

const Home = () => {

    const [data, setData] = useState('');

    useEffect(() => {
        const handleDataReceived = (event, response) => {
            setData(response);
        };

        ipcRenderer.send('fetch-data', 'https://pokeapi.co/api/v2/pokemon/ditto');

        ipcRenderer.on('data-fetched', handleDataReceived);

        return () => {
            ipcRenderer.removeListener('data-fetched', handleDataReceived);
        };
    }, []);

    return (
        <section className='home'>
            <div className="text">Home</div>
            <div className="container">
                {data && <Card name={data.data.name} status={data.status}/>}
            </div>
        </section>);
};

export default Home;