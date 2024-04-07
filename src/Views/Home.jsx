import React, { useState, useEffect } from 'react';
import DashContainer from '../Components/DashContainer.jsx';
import { useData } from '../Context/DataContext.jsx';

const Home = () => {
    const [jsonConfig, setJsonConfig] = useState([]);
    const { data, setDataAndNotify, userConfig } = useData();

    const handleUpdateData = () => {
        setDataAndNotify(!data);
    };

    useEffect(() => {
        var json = [];
        
        userConfig.customers_services.map((item) => {
            json.push(item);
        });

        setJsonConfig(json);

        return () => { };
    }, [userConfig]);

    return (
        <section className='home main-container'>
            <div className='container-header'>
                <div className='text'>Home</div>
                <button className='btn button-primary' onClick={handleUpdateData}>Refresh</button>
            </div>
            <div className='container'>
                {jsonConfig.map((item, index) => (
                    <DashContainer key={index} name={item.company} base_url={item.services_base_url} services={item.services_mw} />
                ))}
            </div>
        </section>);
};

export default Home;