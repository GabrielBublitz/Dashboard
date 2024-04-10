import React from 'react';
import { useDataRefresh } from '../Context/DataRefresh.jsx';
import { useToast } from '../Context/ToastContext.jsx';

const Header = (props) => {
    const { data, setDataAndNotify } = useDataRefresh();
    const { showToast } = useToast();

    const handleUpdateData = () => {
        setDataAndNotify(!data);
        showToast(true, 'Atualizado com sucesso', 'ok');
    };

    return (
        <div className='container-header'>
            <div className='text'>{props.name}</div>
            {
                props.updateData ? (<button className='btn button-primary' onClick={handleUpdateData}>Refresh</button>) : null
            }
        </div>);
};

export default Header;