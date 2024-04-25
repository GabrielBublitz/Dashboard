import React from 'react';

const TestCard = ({ data }) => {

    function GetStatus() {
        var className = 'card ' + data.cardClass;

        return className;
    }

    return (
        <div className={GetStatus()}>
            <div className='title white-text'>{data.title}</div>
                {data.visual}
        </div>
    );
}

export default TestCard;