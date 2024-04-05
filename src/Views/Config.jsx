import React, { useState } from 'react';
import JSONEditor from '../Components/JSONEditor.jsx';

const Config = () => {
    const [data, setData] = useState(false);

    const SaveFile = (event) => {
        event.preventDefault();
        setData(!data);
    }

    return (
        <section className='home'>
            <div className='container-header'>
                <div className='text'>Editor JSON</div>
                <button className='btn button-primary' onClick={SaveFile}>Save</button>
            </div>
            <JSONEditor save={data}/>
        </section>);
};

export default Config;