import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-hot-toast";
import Header from "../../components/common/Header";

import ViewSelector from "./answerComponents/ViewSelector";
import ConfirmDialog from "../../components/confirm/ConfirmDelete";

export default function AnswerPage({
  answerget,
  fetchsurveyById,
  answerdelete,
}) {
  const { surveyId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [survey, setSurvey] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveyAndAnswers = async () => {
      try {
        const [surveyData, answersData] = await Promise.all([
          fetchsurveyById(surveyId),
          answerget(surveyId),
        ]);
        setSurvey(surveyData);
        setAnswers(answersData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSurveyAndAnswers();
  }, [surveyId]);

  const handleDelete = async (answerId) => {
    toast(
      ConfirmDialog({
        title: "Cevabı silmek istediğinize emin misiniz?",
        description: "Bu işlem geri alınamaz.",
        confirmText: "Evet",
        cancelText: "Hayır",
        onConfirm: async () => {
          try {
            const status = await answerdelete(surveyId, answerId);
            setAnswers(await answerget(surveyId));
            toast.success(status.message || "Cevap başarıyla silindi");
          } catch {
            toast.error("Cevap silinemedi");
          }
        },
      }),
    );
  };

  function yonlendir() {
    navigate("/anket", { replace: true });
  }

  return (
    <>
      <Header
        isAnswerMode={true}
        surveyData={survey}
        onBackToMain={() => yonlendir()}
        Sidebar={() => {}}
      />
      <ViewSelector
        survey={survey}
        answers={answers}
        handleDelete={handleDelete}
      />
    </>
  );
}
