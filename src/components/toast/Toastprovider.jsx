import React from 'react';
import { ToastContainer, toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';

const ToastProvider = ({ children }) => {
    return (
        <>
            {children}
            <ToastContainer
                position="top-right"      // Toast'un çıkacağı yer
                autoClose={3000}          // Otomatik kapanma süresi (ms)
                hideProgressBar={false}   // İlerleme barı gösterilsin mi
                newestOnTop={false}       // Yeni toast en üste mi
                closeOnClick              // Tıklayınca kapanır
                rtl={false}               // Sağdan sola dil için false
                pauseOnFocusLoss          // Sekme değişince duraklat
                draggable                // Sürüklenebilir
                pauseOnHover             // Üzerine gelince duraklat
                theme="light"            // light | dark | colored
                transition={Slide}       // Slide, Zoom, Flip, Bounce
            />
        </>
    );
};

export default ToastProvider;

