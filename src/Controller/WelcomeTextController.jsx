import { React, useState, useEffect } from 'react'

import WelcomeTextSettingsModel from '../Modal/WelcomeTextSettingsModel';
import { toast } from '../utils/toastUtils'; // toast ekle // toast ekle

function WelcomeTextController({ isOpen, setControllerOpen, items, Item, setItems, Edit, SetEdit }) {

    const [WelcomeText, setWelcomeText] = useState({});

    useEffect(() => {
        if (!Item.id) return;

        const updatedItem = {
            ...Item,
            title: WelcomeText.title,
            helpText: WelcomeText.helpText,
        };

        if (!WelcomeText?.title || !WelcomeText?.helpText) {
            toast.error("boş değerler var")
            return;
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
    }, [WelcomeText]);

    return (
        <>
            <WelcomeTextSettingsModel
                isOpen={isOpen}
                onClose={() => {setControllerOpen(false); SetEdit(false) }}
                onSave={(WelcomeTextData) => { setWelcomeText(WelcomeTextData) }}
                initialData={Edit ? Item : {}}
            />
        </>
    )
}

export default WelcomeTextController