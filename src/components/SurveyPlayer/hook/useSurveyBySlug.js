import { useState, useEffect } from "react";
import useSurveyLoader from "./useSurveyLoader";

export default function useSurveyBySlug(slug, fetchAllSurvey, fetchSurveyById) {
  const [surveyId, setSurveyId] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [loadingSurveys, setLoadingSurveys] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      try {
        const res = await fetchAllSurvey();
        setSurveys(res || []);
      } finally {
        setLoadingSurveys(false);
      }
    };
    fetchData();
  }, [slug, fetchAllSurvey]);

  useEffect(() => {
    if (surveys.length > 0) {
      const match = surveys.find((s) => s.link === slug);
      if (match) setSurveyId(match._id);
    }
  }, [surveys, slug]);

  // useSurveyLoader her zaman çağrılıyor, ama surveyId yoksa fetch yapmıyor
  const { data, survey, variables, loading } = useSurveyLoader(
    surveyId,
    fetchSurveyById,
  );

  return {
    surveyId,
    surveys,
    loadingSurveys,
    data,
    survey,
    variables,
    loadingSurveyData: loading,
  };
}
