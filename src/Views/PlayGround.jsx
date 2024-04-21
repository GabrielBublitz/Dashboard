import React from 'react';
import Header from '../Components/Header.jsx';
import { DataProvider } from '../Context/DataRefresh.jsx';
import DashContainer from '../Components/DashContainer.jsx';

const PlayGround = () => {
    return (
        <section className='home main-container'>
            <DataProvider>
                <Header name={'PlayGround'} updateData={false} />
                <div className='container'>
                    <DashContainer name={''}></DashContainer>
                </div>
            </DataProvider>
        </section>);
};

export default PlayGround;