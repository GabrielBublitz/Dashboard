import React from 'react';
import Card from './Card.jsx';

const DashContainer = (props) => {
    return (
        <div className='dash-container'>
            <h1 className='dash-container-title'>{props.name}</h1>
            <div className="card-container">
                {props.services.map((item, index) => {
                    return <Card key={index} status={item.status} workers={item.workers}  />
                })}
            </div>
        </div>
    );
}

export default DashContainer;