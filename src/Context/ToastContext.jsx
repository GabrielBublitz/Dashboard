import React, { createContext, useContext, useState } from 'react';
import ToastMessage from '../Components/ToastMessage.jsx';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toastMessage, setToastMessage] = useState({show: false, message: '', type: ''});

    const showToast = (show ,message, type) => {
        setToastMessage({show: show, message: message, type: type});
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastMessage message={toastMessage.message} type={toastMessage.type} show={toastMessage.show} />
        </ToastContext.Provider>
    );
};