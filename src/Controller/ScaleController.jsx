import React, { useState, useEffect } from 'react';
import ScaleSettingsModal from '../Modal/ScaleSettingsModal';
import { toast } from '../utils/toastUtils'; // toast ekle // toast ekle
import { data } from 'react-router-dom';

function ScaleController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
    const [ScaleData, setScaleData] = useState({});

    useEffect(() => {
        if (!Item.id) return;
        if (!ScaleData?.title || !ScaleData?.helpText || !ScaleData?.data.min || !ScaleData?.data.max) toast.error("boş değerler var");
        const updatedItem = {
            ...Item,
            title: ScaleData.title,
            helpText: ScaleData.helpText,
            data: {
                min: ScaleData.data.min,
                max: ScaleData.data.max,
            },
            complusory:ScaleData.complusory,
            SurveyNumberVisible: ScaleData.SurveyNumberVisible,
        };
        if (Edit) {
            const updatedItems = items.map((i) => (i.id === Item.id ? updatedItem : i));
            setItems(updatedItems);
            toast.success("Bileşen güncellendi");
            SetEdit(false);
        } else {
            const newItem = {
                ...updatedItem,
                id: Item.id + '-' + count,
            };
            setItems([...items, newItem]);
            toast.success("Yeni bileşen eklendi");
        }
        setControllerOpen(false);
    }, [ScaleData]);

    return (
        <ScaleSettingsModal
            isOpen={isOpen}
            onClose={() => { setControllerOpen(false); SetEdit(false) }}
            onSave={(data) => setScaleData(data)}
            count={count}
            initialData={Edit ? Item : {}}
        />
    );
}

export default ScaleController;