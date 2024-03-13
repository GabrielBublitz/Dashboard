import React from 'react';

const Card = (props) => {
    return (
        <div className={props.status == '200' ? 'card ok' : 'card'}>
            <div className="title">Server A</div>
            <div className='stats'>
                <div className=''>Status: {props.name}</div>
                <div className=''>Workers: </div>
                <div className=''>Rogues: </div>
            </div>
        </div>
    );
}

export default Card;