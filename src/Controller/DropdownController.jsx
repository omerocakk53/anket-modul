import React, { useState, useEffect } from 'react';
import DropdownSettingsModal from '../Modal/DropdownSettingsModal';
import { toast } from 'react-toastify'

function DropdownController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
    const [DropdownData, setDropdownData] = useState([]);
    useEffect(() => {
        if (!Item.id) return;
        if (!DropdownData?.title || !DropdownData?.options?.length > 0) toast.warn("boş değerler var");

        const updatedItem = {
            ...Item,
            title: DropdownData.title,
            helpText: DropdownData.helpText,
            options: DropdownData.options,
            complusory: DropdownData.complusory,
            SurveyNumberVisible: DropdownData.SurveyNumberVisible,
        };

        if (Edit) {
            const updatedItems = items.map((i) => (i.id === Item.id ? updatedItem : i));
            setItems(updatedItems);
            toast.success("Bileşen güncellendi");
            SetEdit(false);
            setControllerOpen(false);
        } else {
            const newItem = {
                ...updatedItem,
                id: Item.id + '-' + count,
            };
            setItems([...items, newItem]);
            toast.success("Yeni bileşen eklendi");
            setControllerOpen(false);
        }
    }, [DropdownData]);

    return (
        <DropdownSettingsModal
            isOpen={isOpen}
            onClose={() => { setControllerOpen(false); SetEdit(false) }}
            onSave={(data) => setDropdownData(data)}
            count={count}
            initialData={Edit ? Item : {}}
        />
    );
}

export default DropdownController;