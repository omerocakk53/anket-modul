import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
    return (<Toaster
        position="top-right"
        toastOptions={{
            // Varsayılan stiller ve ayarlar
            duration: 4000,
            style: {
                fontSize: '16px',
                borderRadius: '8px',
            },
            success: {
                style: {
                    background: 'green',
                    color: 'white',
                },
            },
            error: {
                style: {
                    background: 'red',
                    color: 'white',
                },
            },
        }}
    />);
};

export default ToastProvider;
