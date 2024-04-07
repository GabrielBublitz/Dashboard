import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [darkMode, setdarkMode] = useState(false);
    const [userConfig, setConfig] = useState(null);
    
    const setDataAndNotify = newData => {
        setData(newData);
    }

    const setDarkModeData = darkMode => {
        setdarkMode(darkMode);
    }

    const setUserConfig = (config) =>{
        setConfig(config);
    }

    return (
        <DataContext.Provider value={{ data, setDataAndNotify, darkMode, setDarkModeData, userConfig, setUserConfig }}>
            {children}
        </DataContext.Provider>
    );
};