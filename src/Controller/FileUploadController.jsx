import React, { useState, useEffect } from 'react';
import FileUploadSettingsModal from '../Modal/FileUploadSettingsModal';
import { Toaster, toast } from 'react-hot-toast' // toast ekle

function FileUploadController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
    const [FileData, setFileData] = useState({});

    useEffect(() => {
        if (!Item.id) return;
        if (!FileData?.title || !FileData?.helpText) toast.error("boş değerler var");

        const updatedItem = {
            ...Item,
            title: FileData.title,
            helpText: FileData.helpText,
            complusory: FileData.complusory,
            SurveyNumberVisible: FileData.SurveyNumberVisible,
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
    }, [FileData]);

    return (
        <FileUploadSettingsModal
            isOpen={isOpen}
            onClose={() => { setControllerOpen(false); SetEdit(false) }}
            onSave={(data) => setFileData(data)}
            count={count}
            initialData={Edit ? Item : {}}
        />
    );
}

export default FileUploadController;