import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-hot-toast";
import Header from "../common/Header";

import ViewSelector from "./answerComponents/ViewSelector";

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
    toast((t) => (
      <div className="p-4 max-w-xs">
        <p className="text-lg font-semibold mb-4 text-primary-darktext">
          Cevabı silmek istediğinize emin misiniz?
        </p>
        <p className="text-sm text-primary-darktext mb-6">
          Bu işlem geri alınamaz.
        </p>
        <div className="flex gap-4">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const status = await answerdelete(surveyId, answerId);
                setAnswers(await answerget(surveyId));
                toast.success(status.message || "Cevap başarıyla silindi");
              } catch {
                toast.error("Cevap silinemedi");
              }
            }}
            className="bg-danger text-white px-4 py-2 rounded hover:bg-danger-dark transition"
          >
            Evet
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-neutral-light text-neutral-darkest px-4 py-2 rounded hover:bg-neutral-dark transition"
          >
            Hayır
          </button>
        </div>
      </div>
    ));
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
