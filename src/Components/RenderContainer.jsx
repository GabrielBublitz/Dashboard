const React = require('react');

const RenderContainter = ({ components }) => {
    return (
        <div className='dash-container'>
            <h1 className='dash-container-title'>{ }</h1>
            <div className="card-container padding-15">
                {components.map((Component, index) => {
                    return <Component.component key={index} data={Component.data} />;
                })}
            </div>
        </div>);
}

export default RenderContainter;