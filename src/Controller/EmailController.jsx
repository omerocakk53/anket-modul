import React, { useState, useEffect } from 'react';
import EmailSettingsModal from '../Modal/EmailSettingsModal';
import toast from 'react-hot-toast' // toast ekle

function EmailController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
    const [EmailData, setEmailData] = useState({});

    useEffect(() => {
        if (!Item.id) return;
        if (!EmailData?.title || !EmailData.helpText) toast.error("boş değerler var");

        const updatedItem = {
            ...Item,
            title: EmailData.title,
            helpText: EmailData.helpText,
            complusory: EmailData.complusory,
            SurveyNumberVisible: EmailData.SurveyNumberVisible,
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
    }, [EmailData]);

    return (
        <EmailSettingsModal
            isOpen={isOpen}
            onClose={() => { setControllerOpen(false); SetEdit(false) }}
            onSave={(data) => setEmailData(data)}
            count={count}
            initialData={Edit ? Item : {}}
        />
    );
}

export default EmailController;