import React, { useState } from 'react';
import Card from '../Components/Card.jsx';

const CardContainer = (props) => {
    const [data] = useState(props.item);

    return (
        <>
            <h2 className=''>{data.name}</h2>
            <div className='card-container'>
                {data.servers.map((item, index) => {
                    item = {
                        path: data.service_path,
                        server: item,
                        base_url: props.base_url,
                        port: data.port
                    };

                    return <Card key={index} server={item} />;
                })}
            </div>
        </>
    );
}

export default CardContainer;