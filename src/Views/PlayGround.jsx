import React from 'react';
import Header from '../Components/Header.jsx';
import RenderContainer from '../Components/RenderContainer.jsx';
import { DataProvider } from '../Context/DataRefresh.jsx';

const PlayGround = () => {
    return (
        <section className='home main-container'>
            <DataProvider>
                <Header name={'Test mode'} updateData={false} />
                <div className='container'>
                </div>
            </DataProvider>
        </section>);
};

export default PlayGround;