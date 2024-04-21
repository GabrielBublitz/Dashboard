import React from 'react';
import CardContainer from './CardContainer.jsx';

const DashContainer = (props) => {

    return (
        <div className='dash-container'>
            <h1 className='dash-container-title'>{props.name}</h1>
            <div className="card-container padding-15">
                {props.services && props.services.map((item, index) => {
                    return <CardContainer key={index} item={item} base_url={props.base_url} companyName={props.name} />;
                })}
            </div>
        </div>
    );
};

export default DashContainer;