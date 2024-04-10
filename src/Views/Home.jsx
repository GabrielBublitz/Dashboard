import React from 'react';
import DashContainer from '../Components/DashContainer.jsx';
import Header from '../Components/Header.jsx';
import { useData } from '../Context/DataContext.jsx';
import { DataProvider } from '../Context/DataRefresh.jsx';

const Home = React.memo(() => {
    const { userConfig } = useData();

    return (
        <section className='home main-container'>
            <DataProvider>
                <Header name={'Home'} updateData={true} />
                <div className='container'>
                    {userConfig && userConfig.customers_services.map((item, index) => (
                        <DashContainer key={index} name={item.company} base_url={item.services_base_url} services={item.services_mw} />
                    ))}
                </div>
            </DataProvider>
        </section>);
});

export default Home;