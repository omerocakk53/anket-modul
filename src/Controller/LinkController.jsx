import React, { useState, useEffect } from 'react';
import LinkSettingsModal from '../Modal/LinkSettingsModal';
import { toast } from 'react-toastify';

function LinkController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
    const [LinkData, setLinkData] = useState({});

    useEffect(() => {
        if (!Item.id) return;
        if (!LinkData?.title || !LinkData?.url) toast.warning("boş değerler var");
        const updatedItem = {
            ...Item,
            title: LinkData.title,
            url: LinkData.url,
            helpText: LinkData.helpText,
            SurveyNumberVisible: LinkData.SurveyNumberVisible,
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
    }, [LinkData]);

    return (
        <LinkSettingsModal
            isOpen={isOpen}
            onClose={() => { setControllerOpen(false); SetEdit(false) }}
            onSave={(data) => setLinkData(data)}
            count={count}
            initialData={Edit ? Item : {}}
        />
    );
}

export default LinkController;