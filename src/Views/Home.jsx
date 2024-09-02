import React from 'react';
import DashContainer from '../Components/DashContainer.jsx';
import Header from '../Components/Header.jsx';
import { useData } from '../Context/DataContext.jsx';
import { DataProvider } from '../Context/DataRefresh.jsx';
import RenderContainer from '../Components/RenderContainer.jsx';
import CollapsedCardItem from '../Class/CollapsedCardItem.js';
import TestCard from '../Components/testCard.jsx';
import CollapsedInfo from '../Class/CollapsedInfo.js';

const Home = () => {
    const { userConfig } = useData();

    const BuildComponents = () => {
        var configs = [];

        if (userConfig) {
            userConfig.customers_services.forEach(element => {
                if (element.enable) {
                    var cards = [];

                    element.services_mw.forEach(service => {
                        var card = new CollapsedCardItem(
                            service.name,
                            `${element.services_base_url}${service.port}${service.service_path}${service.servers[0]}`,
                            `${element.services_base_url}${service.port}${service.service_path}${service.servers[1]}`,
                            (
                                <div className='stats'>
                                    <div className='baseline align-end'>
                                        <div className='white-text text-font'><b>1/2</b></div>
                                    </div>
                                </div>
                            )
                        );

                        cards.push(card);
                    });

                    var data = new CollapsedInfo(
                        TestCard,
                        element.company,
                        cards
                    );

                    configs.push(data);
                }
            });
        }

        return configs;
    }

    return (
        <section className='home main-container'>
            <DataProvider>
                <Header name={'Home'} updateData={true} />
                <div className='container'>
                    {userConfig && (!userConfig.fullview ? (userConfig.customers_services.map((item, index) => (
                        item.enable === true && (
                            <DashContainer key={index} name={item.company} base_url={item.services_base_url} services={item.services_mw} web_service={item.web_service} />
                        )
                    ))
                    ) : (
                        <RenderContainer components={BuildComponents()} />
                    )
                    )}
                </div>
            </DataProvider>
        </section>);
};

export default Home;