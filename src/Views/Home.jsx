import React, { useState, useEffect } from 'react';
import DashContainer from '../Components/DashContainer.jsx';
const { customers_services } = require('../../userConfig.json');

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        var json = [];

        customers_services.map((item) => {
            json.push(item);
        });

        setData(json);
        
        return () => { };
    }, []);

    return (
        <section className='home'>
            <div className='text'>Home</div>
            <div className='container'>
                {data.map((item, index) => (
                    <DashContainer key={index} name={item.company} base_url={item.services_base_url} services={item.services_mw} />
                ))}
            </div>
        </section>);
};

export default Home;