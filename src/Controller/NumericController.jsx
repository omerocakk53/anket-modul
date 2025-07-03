import React, { useState, useEffect } from 'react';
import NumericSettingsModal from '../Modal/NumericSettingsModal';
import { toast } from 'react-toastify';

function NumericController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
    const [NumericData, setNumericData] = useState({});

    useEffect(() => {
        if (!Item.id) return;
        if (!NumericData?.title || !NumericData?.helpText) toast.error("boş değerler var");
        const updatedItem = {
            ...Item,
            title: NumericData.title,
            helpText: NumericData.helpText,
            complusory: NumericData.complusory,
            SurveyNumberVisible: NumericData.SurveyNumberVisible,
            allowDecimal: NumericData.allowDecimal,
            thousandSeparator: NumericData.thousandSeparator,
            charLimit: NumericData.charLimit,
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
    }, [NumericData]);

    return (
        <NumericSettingsModal
            isOpen={isOpen}
            onClose={() => { setControllerOpen(false); SetEdit(false) }}
            onSave={(data) => setNumericData(data)}
            count={count}
            initialData={Edit ? Item : {}}
        />
    );
}

export default NumericController;