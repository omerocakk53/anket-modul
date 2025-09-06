import React, { useState, useEffect } from 'react';
import MatrisSettingsModal from '../modal/MatrisSettingsModal';
import { toast } from 'react-hot-toast';

function MatrisController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit, SurveyType }) {
    const [MatrisData, setMatrisData] = useState({});

    useEffect(() => {
        if (!Item.id) return;
        if (!MatrisData?.title || (!MatrisData.MemberSatificaitonMatris && (!MatrisData?.data?.rows?.length > 0 || !MatrisData?.data?.columns?.length > 0))) {
            toast.error("boş değerler var")
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
            SurveyNumberVisible: MatrisData.SurveyNumberVisible,
            MemberSatificaitonMatris: MatrisData.MemberSatificaitonMatris
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
            surveyType={SurveyType}
        />
    );
}

export default MatrisController;