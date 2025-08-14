import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useGuidance(items, finishWelcomeItems, variables, setVariables, updatesurvey, surveyId, setShouldReload) {
    const [questionsGuidanceMenuData, setquestionsGuidanceMenuData] = useState({
        items: [],
        item: [],
        finishWelcomeitems: [],
        isOpen: false
    });



    function handleQuestionGuidance(logics, isOpen) {
        setquestionsGuidanceMenuData({ items, item: null, finishWelcomeitems: null, isOpen });

        if (Array.isArray(logics) && logics.length) {
            const invalidLogic = logics.find(l => !items.some(item => item.id === l.itemId));
            if (invalidLogic) {
                toast.error("ItemId mevcut değil.");
                return;
            }
            // const hasEmpty = logics.some(l =>
            //     !l.conditionType?.trim() ||
            //     !l.trueDestinationItemId?.trim()
            // );
            // if (hasEmpty) {
            //     toast.error("Boş alanlar var, kaydedilmedi.");
            //     return;
            // }
            let newVariables = [...variables];
            logics.forEach(logic => {
                const index = newVariables.findIndex(item =>
                    item.itemId === logic.itemId &&
                    item.expectedValue === logic.expectedValue
                );

                if (index !== -1) {
                    // Güncelle
                    const existing = newVariables[index];
                    const isSame =
                        existing.expectedValue === logic.expectedValue &&
                        existing.conditionType === logic.conditionType &&
                        existing.trueDestinationItemId === logic.trueDestinationItemId &&
                        existing.falseDestinationItemId === logic.falseDestinationItemId;

                    if (!isSame) {
                        newVariables[index] = logic;
                        toast.success(`Mantık güncellendi: ${logic.expectedValue || logic.conditionType}`);
                    }
                } else {
                    // Yeni ekle
                    newVariables.push(logic);
                    toast.success(`Mantık eklendi: ${logic.expectedValue || logic.conditionType}`);
                }
            });
            setVariables(newVariables);
            updatesurvey(surveyId, { variables: newVariables });
        }

        setShouldReload(true);
    }


    function handleDeleteGuidance(updatedLogics, itemId) {
        setVariables(prevVariables => {
            // itemId'ye ait eski mantıkları filtrele, yerine updatedLogics ekle
            const filtered = prevVariables.filter(v => v.itemId !== itemId);
            return [...filtered, ...updatedLogics];
        });
        updatesurvey(surveyId, {
            variables: variables => {
                // Aynı şekilde backend'e de güncel tüm mantık dizisini gönder
                const filtered = variables.filter(v => v.itemId !== itemId);
                return [...filtered, ...updatedLogics];
            }
        });
        toast.success("Mantık silindi.");
    }




    return {
        questionsGuidanceMenuData,
        setquestionsGuidanceMenuData,
        handleQuestionGuidance,
        handleDeleteGuidance
    };
}
