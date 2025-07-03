import { React, useState, useEffect } from 'react'

import WelcomeTextSettingsModel from '../Modal/WelcomeTextSettingsModel';
import { toast } from '../utils/toastUtils'; // toast ekle // toast ekle

function FinishTextController({ isOpen, setControllerOpen, items, Item, setItems, Edit, SetEdit }) {

    const [FinishText, setFinishText] = useState({});


    useEffect(() => {
        if (!Item.id) return;

        if (!FinishText?.title || !FinishText?.helpText) {
            toast("boş değerler var")
            return;
        };

        const updatedItem = {
            ...Item,
            title: FinishText.title,
            helpText: FinishText.helpText,
        };
        if (Edit) {
            const updatedItems = items.map((i) => (i.id === Item.id ? updatedItem : i));
            setItems(updatedItems);
            toast.success("Bileşen güncellendi");
            SetEdit(false);
        } else {
            const newItem = {
                ...updatedItem,
                id: Item.id,
            };
            setItems([...items, newItem]);
            toast.success("Yeni bileşen eklendi");
        }
        setControllerOpen(false);
    }, [FinishText]);

    return (
        <>
            <WelcomeTextSettingsModel
                isOpen={isOpen}
                onClose={() => {setControllerOpen(false); SetEdit(false) }}
                onSave={(FinishTextData) => { setFinishText(FinishTextData) }}
                initialData={Edit ? Item : {}}
            />
        </>
    )
}

export default FinishTextController