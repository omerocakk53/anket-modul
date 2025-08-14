import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function useSurveyLoader(fetchsurveyById, surveyId) {
    const [survey, setSurvey] = useState({});
    const [items, setItems] = useState([]);
    const [finishWelcomeItems, setFinishWelcomeItems] = useState([]);
    const [variables, setVariables] = useState([]);
    const [shouldReload, setShouldReload] = useState(false);

    useEffect(() => {
        async function loadSurvey() {
            try {
                const survey = await fetchsurveyById(surveyId);
                setSurvey(survey);
                setItems(survey?.items);
                setFinishWelcomeItems(survey?.FinishWelcomeitems);
                setVariables(survey?.variables);
            } catch (err) {
                console.error("Anket yüklenemedi:", err);
            }
        }

        loadSurvey();
        setShouldReload(false);
    }, [fetchsurveyById, surveyId, shouldReload]);

    // Mantıksal bağlantılar için temizlik
    useEffect(() => {
        if (!variables.length) return;
        const cleaned = variables.filter(v => items.some(item => item.id === v.itemId));

        if (cleaned.length !== variables.length) {
            setVariables(cleaned);
            toast.error("Bazı mantıklar silindi çünkü ilgili sorular artık yok.");
        }
    }, [items]);

    return {
        survey, setSurvey,
        items, setItems,
        finishWelcomeItems, setFinishWelcomeItems,
        variables, setVariables,
        shouldReload, setShouldReload
    };
}
