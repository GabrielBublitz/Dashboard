import React from 'react';
import { useDataRefresh } from '../Context/DataRefresh.jsx';

const Header = (props) => {
    const { data, setDataAndNotify } = useDataRefresh();
    const handleUpdateData = () => {
        setDataAndNotify(!data);
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