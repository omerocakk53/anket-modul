import { React, useState, useEffect } from 'react'
import WelcomeTextSettingsModel from '../Modal/WelcomeTextSettingsModel';
import { toast } from 'react-hot-toast';

function WelcomeTextController({ isOpen, setControllerOpen, items, Item, setItems, Edit, SetEdit }) {

    const [WelcomeText, setWelcomeText] = useState({});
    const [ImageData, setImageData] = useState({});

    useEffect(() => {
        if (!Item.id) return;

        console.log(WelcomeText);
        console.log(ImageData);

        const updatedItem = {
            ...Item,
            title: WelcomeText.title,
            helpText: WelcomeText.helpText,
        };

        if (!WelcomeText?.title) {
            toast.error("boş değerler var")
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
    }, [WelcomeText, ImageData]);

    return (
        <>
            <WelcomeTextSettingsModel
                isOpen={isOpen}
                onClose={() => { setControllerOpen(false); SetEdit(false) }}
                onSave={(WelcomeTextData, ImageData) => { setWelcomeText(WelcomeTextData); setImageData(ImageData); }}
                initialData={Edit ? Item : {}}
            />
        </>
    )
}

export default WelcomeTextController