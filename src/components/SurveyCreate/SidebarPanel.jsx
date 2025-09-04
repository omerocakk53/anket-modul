import React from 'react';
import Component from '../iconRenderComponent';
import toast from 'react-hot-toast';

export default function SidebarPanel({ surveyActive, handleAddItem, sidebarOpen, setSidebarOpen }) {
    return (
        <div>
            <Component
                onAddItem={surveyActive ? () => toast.error("Aktif anket düzenlenemez.") : handleAddItem}
                sideBar={sidebarOpen}
                setSidebarOpen={() => setSidebarOpen(false)}
            />
        </div>
    );
}
