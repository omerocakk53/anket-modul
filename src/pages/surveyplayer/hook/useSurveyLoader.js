import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function useSurveyLoader(surveyId, fetchsurveyById) {
  const [data, setData] = useState([]);
  const [survey, setSurvey] = useState({});
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!surveyId) return; // id yoksa fetch yapma

    async function loadSurvey() {
      setLoading(true);
      try {
        const survey = await fetchsurveyById(surveyId);

        const sorted = [
          ...survey.FinishWelcomeitems.filter((q) => q.id.includes("welcome")),
          ...survey.items.filter(
            (q) => !q.id.includes("welcome") && !q.id.includes("finish"),
          ),
          ...survey.FinishWelcomeitems.filter((q) => q.id.includes("finish")),
        ];

        setData(sorted);
        setSurvey(survey);
        setVariables(survey.variables || []);
      } catch (err) {
        console.error("Anket yüklenemedi:", err);
        toast.error("Anket yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    }

    loadSurvey();
  }, [surveyId, fetchsurveyById]);

  return { data, survey, variables, loading };
}
