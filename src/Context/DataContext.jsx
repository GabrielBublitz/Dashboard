import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);

    const setDataAndNotify = newData => {
        setData(newData);
    }

    const [darkMode, setdarkMode] = useState(false);

    const setdarkModeData = darkMode => {
        setdarkMode(darkMode);
    }

    return (
        <DataContext.Provider value={{ data, setDataAndNotify, darkMode, setdarkModeData }}>
            {children}
        </DataContext.Provider>
    );
};