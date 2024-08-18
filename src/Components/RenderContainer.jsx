const React = require('react');

const RenderContainter = ({ components }) => {
    return (
        <div className='dash-container'>
            {components && components.map((Component, index) => (
                <div key={index}>
                    <h1 className='dash-container-title'>{Component.name}</h1>
                    <div className="card-container padding-15">

                        {Component.data && Component.data.map((CollapsedCardItem, index) => (
                            <Component.component key={index} data={CollapsedCardItem} />
                        ))}

                    </div>
                </div>
            ))}
        </div>
    );
}

export default RenderContainter;