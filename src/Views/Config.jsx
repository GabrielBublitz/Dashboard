import React, { useState } from 'react';
import JSONEditor from '../Components/JSONEditor.jsx';
import { useToast } from '../Context/ToastContext.jsx';

const Config = () => {
    const [data, setData] = useState(false);
    const { showToast } = useToast();

    const SaveFile = () => {
        setData(!data);
        showToast(true, 'Atualizado com sucesso', 'ok');
    }

    return (
        <section className='home'> 
            <div className='container-header'>
                <div className='text'>JSON Editor</div>
                <button className='btn button-primary' onClick={SaveFile}>Save</button>
            </div>
            <JSONEditor save={data}/>
        </section>);
};

export default Config;