import React, { useState, useEffect } from 'react';
import MatrisSettingsModal from '../Modal/MatrisSettingsModal';
import toast from 'react-hot-toast' // toast ekle

function MatrisController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
    const [MatrisData, setMatrisData] = useState({});

    useEffect(() => {
        if (!Item.id) return;
        if (!MatrisData?.title || !MatrisData?.data?.rows?.length > 0 || !MatrisData?.data?.columns?.length > 0) {
            toast.error("Boş değerler var");
            return;
        }

        const updatedItem = {
            ...Item,
            title: MatrisData.title,
            helpText: MatrisData.helpText,
            data: {
                rows: MatrisData.data.rows,
                columns: MatrisData.data.columns,
            },
            complusory: MatrisData.complusory,
            allowCustomValue: MatrisData.allowCustomValue || false,
            SurveyNumberVisible: MatrisData.SurveyNumberVisible,
        };

        if (Edit) {
            const updatedItems = items.map((i) => (i.id === Item.id ? updatedItem : i));
            setItems(updatedItems);
            toast.success("Bileşen güncellendi");
        } else {
            const newItem = {
                ...updatedItem,
                id: Item.id + '-' + count,
            };
            setItems([...items, newItem]);
            toast.success("Yeni bileşen eklendi");
        }

        SetEdit(false);
        setControllerOpen(false);
    }, [MatrisData]);

    return (
        <MatrisSettingsModal
            isOpen={isOpen}
            onClose={() => { setControllerOpen(false); SetEdit(false); }}
            onSave={(data) => setMatrisData(data)}
            count={count}
            initialData={Edit ? Item : {}}
        />
    );
}

export default MatrisController;