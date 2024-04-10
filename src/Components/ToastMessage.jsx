import React, { useState, useEffect } from 'react';
import { useToast } from '../Context/ToastContext.jsx';

const ToastMessage = ({ message, show, type }) => {
    const { showToast } = useToast();

    useEffect(() => {
        const timeout = setTimeout(() =>{}, 0);
        const animation = setTimeout(() =>{}, 0);

        if(show == true){
            const timeout = setTimeout(() => {
                showToast(false, '', '');
            }, 5000); // Oculta o toast após 5 segundos

            const animation = setTimeout(() => {
                document.querySelector('.toast').classList.add('hide');
            }, 4500);
        }

        return () => {
            clearTimeout(timeout);
            clearTimeout(animation);
        }
    }, [show]);

    return (
        <>
            {
                <div className={show ? "toast " + type : "toast hide"}>
                    <span>{message}</span>
                </div>
            }
        </>
    );
};

export default ToastMessage;
