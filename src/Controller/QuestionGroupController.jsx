import React, { useState, useEffect } from 'react';
import QuestionGroupSettingsModal from '../Modal/QuestionGroupSettingsModal';
import { toast } from 'react-hot-toast';

function QuestionGroupController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
    const [QuestionGroupData, setQuestionGroupData] = useState({});

    useEffect(() => {
        if (!Item.id) return;
        if (!QuestionGroupData?.title  || !QuestionGroupData?.questions?.length > 0) {  toast.warning("boş değerler var")};
        const updatedItem = {
            ...Item,
            title: QuestionGroupData.title,
            helpText: QuestionGroupData.helpText,
            questions: QuestionGroupData.questions,
            complusory:QuestionGroupData.complusory,
            SurveyNumberVisible: QuestionGroupData.SurveyNumberVisible,
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
    }, [QuestionGroupData]);

    return (
        <QuestionGroupSettingsModal
            isOpen={isOpen}
            onClose={() => { setControllerOpen(false); SetEdit(false) }}
            onSave={(data) => setQuestionGroupData(data)}
            count={count}
            initialData={Edit ? Item : {}}
        />
    );
}

export default QuestionGroupController;