import React, { useState, useEffect } from 'react';
import ImageChoiceSettingsModal from '../Modal/ImageChoiceSettingsModal';
import { toast } from 'react-hot-toast';

function ImageChoiceController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
    const [ImageChoiceData, setImageChoiceData] = useState({});

    useEffect(() => {
        if (!Item.id) return;
        if (!ImageChoiceData?.title || !ImageChoiceData?.images?.length > 0) {  toast.warning("boş değerler var")};

        const updatedItem = {
            ...Item,
            title: ImageChoiceData.title,
            helpText: ImageChoiceData.helpText,
            images: ImageChoiceData.images,
            complusory: ImageChoiceData.complusory,
            SurveyNumberVisible: ImageChoiceData.SurveyNumberVisible,
            Design: ImageChoiceData.Design,
            MultiselectActive: ImageChoiceData.MultiselectActive,
            MultiSelectLimit: ImageChoiceData.MultiSelectLimit,
            imageTitles: ImageChoiceData.imageTitles,
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
    }, [ImageChoiceData]);

    return (
        <ImageChoiceSettingsModal
            isOpen={isOpen}
            onClose={() => { setControllerOpen(false); SetEdit(false) }}
            onSave={(data) => setImageChoiceData(data)}
            count={count}
            initialData={Edit ? Item : {}}
        />
    );
}

export default ImageChoiceController;