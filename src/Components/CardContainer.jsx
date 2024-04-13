import React, { useState } from 'react';
import Card from '../Components/Card.jsx';

const CardContainer = (props) => {
    const [data] = useState(props.item);

    return (
        <div>
            <h2 className='padding-5'>{data.name}</h2>
            <div className='card-container'>
                {data.servers.map((item, index) => {
                    // console.log(data)
                    item = {
                        url: `${props.base_url}${data.port}${data.service_path}${item}`,
                        server: item,
                        index: index,
                        alertLog: data.alert_log
                    };

                    return <Card key={index} server={item} serviceName={data.name} companyName={props.companyName} />;
                })}
            </div>
        </div>
    );
}

export default CardContainer;