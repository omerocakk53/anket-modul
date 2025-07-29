import React, { useState, useEffect } from 'react';
import RatingSettingsModal from '../Modal/RatingSettingsModal';
import { toast } from 'react-hot-toast';

function RatingController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
    const [RatingData, setRatingData] = useState({});

    useEffect(() => {
        if (!Item.id) return;
        if (!RatingData?.title  || !RatingData?.maxValue) {  toast.warning("boş değerler var")};
        const updatedItem = {
            ...Item,
            title: RatingData.title,
            helpText: RatingData.helpText,
            maxValue: RatingData.maxValue,
            complusory: RatingData.complusory,
            SurveyNumberVisible: RatingData.SurveyNumberVisible,
            selectedIcon: RatingData.selectedIcon,
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
    }, [RatingData]);

    return (
        <RatingSettingsModal
            isOpen={isOpen}
            onClose={() => { setControllerOpen(false); SetEdit(false) }}
            onSave={(data) => setRatingData(data)}
            count={count}
            initialData={Edit ? Item : {}}
        />
    );
}

export default RatingController;