const React = require('react');

const RenderContainter = ({ components }) => {

    return (
        <div className='dash-container' style={{display: 'flex', flexWrap: 'wrap', columnGap: '60px'}}>
            {components && components.map((Component, index) => (
                <div key={index}>
                    <h1 className='dash-container-title'>{Component.name}</h1>
                    <div className="card-container padding-15">
                        {Component.data && Component.data.map((CollapsedCardItem, index) => (
                            <Component.component key={index} data={CollapsedCardItem.data} 
                            id={index + CollapsedCardItem.data.firstUrl} />
                        ))}

                    </div>
                </div>
            ))}
        </div>
    );
}

export default RenderContainter;