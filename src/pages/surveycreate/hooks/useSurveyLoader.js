import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useSurveyLoader(
  fetchsurveyById,
  fetchsurveychamberById,
  surveyId,
) {
  // 🔒 Her zaman dolu bir obje
  const DEFAULT_SURVEY = {
    _id: null,
    title: "",
    description: "",
    group: "",
    chamber: null,
    active: false,
    tags: [],
    link: "",
    activePeriodDates: [],
    items: [],
    FinishWelcomeitems: [],
    variables: [],
  };

  const [survey, setSurvey] = useState(DEFAULT_SURVEY);
  const [surveys, setSurveys] = useState([]);
  const [items, setItems] = useState([]);
  const [finishWelcomeItems, setFinishWelcomeItems] = useState([]);
  const [variables, setVariables] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Tekil survey yükle
  useEffect(() => {
    if (!surveyId) return;

    let cancelled = false;
    (async () => {
      try {
        setIsLoading(true);
        const s = await fetchsurveyById(surveyId);
        if (cancelled) return;

        const safe = s || DEFAULT_SURVEY; // null gelse bile güvenli
        setSurvey(safe);
        setItems(safe.items || []);
        setFinishWelcomeItems(safe.FinishWelcomeitems || []);
        setVariables(safe.variables || []);
      } catch (err) {
        console.error("Anket yüklenemedi:", err);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          setShouldReload(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fetchsurveyById, surveyId, shouldReload]);

  // Chamber'a ait tüm anketler
  useEffect(() => {
    if (!survey.chamber) return;

    let cancelled = false;
    (async () => {
      try {
        const result = await fetchsurveychamberById(survey.chamber);
        if (!cancelled) setSurveys(result || []);
      } catch (err) {
        console.error("Chamber anketleri yüklenemedi:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [survey.chamber, fetchsurveychamberById]);

  // Mantık temizliği
  useEffect(() => {
    if (!variables.length) return;
    const cleaned = variables.filter((v) =>
      items.some((item) => item.id === v.itemId),
    );
    if (cleaned.length !== variables.length) {
      setVariables(cleaned);
      toast.error("Bazı mantıklar silindi çünkü ilgili sorular artık yok.");
    }
  }, [items, variables]);

  return {
    survey,
    setSurvey,
    surveys,
    setSurveys,
    items,
    setItems,
    finishWelcomeItems,
    setFinishWelcomeItems,
    variables,
    setVariables,
    shouldReload,
    setShouldReload,
    isLoading,
  };
}
