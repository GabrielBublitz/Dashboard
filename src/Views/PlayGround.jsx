import React from 'react';
import Header from '../Components/Header.jsx';
import TestCard from '../Components/testCard.jsx';
import RenderContainer from '../Components/RenderContainer.jsx';
import { DataProvider } from '../Context/DataRefresh.jsx';

const PlayGround = () => {
    const components = [
        {
            component: TestCard,
            data:
            {
                title: 'Empresa 1',
                cardClass: 'error',
                visual: (
                    <div className='stats'>
                        <div className='baseline'>
                            <div className='white-text space-between'>Log On <div className='text-font'><b>19/20</b></div></div>
                        </div>
                    </div>
                )
            }
        },
        {
            component: TestCard,
            data:
            {
                title: `Empresa 2 ${'OK'}`,
                cardClass: 'ok',
                visual: (
                    <div className='stats'>
                        <div className='baseline'>
                            <div className='white-text space-between'>Log On <div className='text-font'><b>20/20</b></div></div>
                        </div>
                    </div>
                )
            }
        }
    ];

    return (
        <section className='home main-container'>
            <DataProvider>
                <Header name={'Biluk mode'} updateData={false} />
                <div className='container'>
                    <RenderContainer components={components} />
                </div>
            </DataProvider>
        </section>);
};

export default PlayGround;