import React, { createContext, useState, useContext } from 'react';

const DataRefresh = createContext();

export const useDataRefresh = () => useContext(DataRefresh);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);

    const setDataAndNotify = newData => {
        setData(newData);
    }

    return (
        <DataRefresh.Provider value={{ data, setDataAndNotify }}>
            {children}
        </DataRefresh.Provider>
    );
};