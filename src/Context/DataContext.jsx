import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);

    const setDataAndNotify = newData => {
        setData(newData);
    }

    return (
        <DataContext.Provider value={{ data, setDataAndNotify }}>
            {children}
        </DataContext.Provider>
    );
};