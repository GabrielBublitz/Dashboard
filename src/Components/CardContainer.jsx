import React, { useState } from 'react';
import Card from '../Components/Card.jsx';
import CardItem from '../Class/CardItem.js';

const CardContainer = (props) => {
    const [data] = useState(props.item);

    return (
        <div>
            <h2 className='padding-5'>{data.name}</h2>
            <div className='card-container'>
                {data.servers && data.servers.map((item, index) => {
                    let cardItem = new CardItem(
                        `${props.base_url}${data.port}${data.service_path}${item}`,
                        item,
                        index,
                        data.alert_log
                    );
                    return <Card key={index} server={cardItem} serviceName={data.name} companyName={props.companyName} />;
                })}
            </div>
        </div>
    );
}

export default CardContainer;