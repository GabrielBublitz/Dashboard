import React from 'react';

const TestCard = ({ data }) => {

    function GetStatus() {
        var className = 'card card-size-2 ' + data.data.cardClass;

        return className;
    }
    console.log(data.data)
    return (
        <div className={GetStatus()}>
            <div className='title white-text'>{data.data.title}</div>
                {data.data.visual}
        </div>
    );
}

export default TestCard;