import React, { useState } from 'react';
import Card from '../Components/Card.jsx';

const CardContainer = (props) => {
    const [data] = useState(props.item);

    return (
        <div>
            <h2 className=''>{data.name}</h2>
            <div className='card-container'>
                {data.servers.map((item, index) => {
                    item = {
                        url: `${props.base_url}${data.port}${data.service_path}${item}`,
                        server: item
                    };

                    return <Card key={index} server={item} />;
                })}
            </div>
        </div>
    );
}

export default CardContainer;