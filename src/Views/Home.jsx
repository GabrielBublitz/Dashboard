import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

const Home = () => {
    return (
        <section className='home'>
            <div className="text">Home</div>
        </section>);
};

export default Home;