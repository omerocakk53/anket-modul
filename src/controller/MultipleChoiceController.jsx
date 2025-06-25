import React, { useState, useEffect } from 'react';
import MultipleChoiceSettingsModal from '../Modal/MultipleChoiceSettingsModal';
import { toast } from 'react-toastify';

function MultipleChoiceController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
    const [MultipleChoiceData, setMultipleChoiceData] = useState({});

    useEffect(() => {
        if (!Item.id) return;
        if (!MultipleChoiceData?.title || !MultipleChoiceData?.helpText || !MultipleChoiceData?.options?.length > 0) toast.warning("boş değerler var");
        const updatedItem = {
            ...Item,
            title: MultipleChoiceData.title,
            helpText: MultipleChoiceData.helpText,
            options: MultipleChoiceData.options,
            allowCustomOption: MultipleChoiceData.allowCustomOption,
            complusory: MultipleChoiceData.complusory,
            SurveyNumberVisible: MultipleChoiceData.SurveyNumberVisible,
            HorizontalDesign: MultipleChoiceData.HorizontalDesign,
            MultiselectActive: MultipleChoiceData.MultiselectActive,
            MultiSelectLimit: MultipleChoiceData.MultiSelectLimit,
            fixedOptions: MultipleChoiceData.fixedOptions,
        };
        if (Edit) {
            const updatedItems = items.map((i) => (i.id === Item.id ? updatedItem : i));
            setItems(updatedItems);
            toast.success("Bileşen güncellendi");
            SetEdit(false);
            setControllerOpen(false);
        } else {
            const newItem = {
                ...updatedItem,
                id: Item.id + '-' + count,
            };
            setItems([...items, newItem]);
            toast.success("Yeni bileşen eklendi");
            setControllerOpen(false);

        }

    }, [MultipleChoiceData]);

    return (
        <MultipleChoiceSettingsModal
            isOpen={isOpen}
            onClose={() => { setControllerOpen(false); SetEdit(false) }}
            onSave={(data) => setMultipleChoiceData(data)}
            count={count}
            initialData={Edit ? Item : {}}
        />
    );
}

export default MultipleChoiceController;