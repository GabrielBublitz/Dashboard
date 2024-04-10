import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [darkMode, setdarkMode] = useState(false);
    const [userConfig, setConfig] = useState(null);

    const setDarkModeData = darkMode => {
        setdarkMode(darkMode);
    }

    const setUserConfig = (config) =>{
        setConfig(config);
    }

    return (
        <DataContext.Provider value={{ darkMode, setDarkModeData, userConfig, setUserConfig }}>
            {children}
        </DataContext.Provider>
    );
};