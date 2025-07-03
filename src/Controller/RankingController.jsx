import React, { useState, useEffect } from 'react';
import RankingSettingsModal from '../Modal/RankingSettingsModal';
import { toast } from 'react-toastify';

function RankingController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
    const [RankingData, setRankingData] = useState({});

    useEffect(() => {
        if (!Item.id) return;
        if (!RankingData?.title || !RankingData?.helpText || !RankingData?.options?.length > 0) toast.error("boş değerler var");
        const updatedItem = {
            ...Item,
            label: Item.label,
            title: RankingData.title,
            helpText: RankingData.helpText,
            options: RankingData.options,
            SurveyNumberVisible: RankingData.SurveyNumberVisible,
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
    }, [RankingData]);

    return (
        <RankingSettingsModal
            isOpen={isOpen}
            onClose={() => { setControllerOpen(false); SetEdit(false) }}
            onSave={(data) => setRankingData(data)}
            count={count}
            initialData={Edit ? Item : {}}
        />
    );
}

export default RankingController;