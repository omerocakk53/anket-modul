import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Header from "../common/Header";
import ViewSelector from "./answer.components/ViewSelector";

export default function AnswerPage({ answerget, fetchsurveyById, answerdelete }) {
    const { surveyId } = useParams();
    const [cevaplar, setCevaplar] = useState([]);
    const [survey, setSurvey] = useState({});
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchSurveyAndAnswers = async () => {
            try {
                const [surveyData, answersData] = await Promise.all([
                    fetchsurveyById(surveyId),
                    answerget(surveyId),
                ]);
                setSurvey(surveyData);
                setCevaplar(answersData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSurveyAndAnswers();
    }, [surveyId]);

    const handleDelete = async (answerId) => {
        toast(
            (t) => (
                <div className="p-4 max-w-xs">
                    <p className="text-lg font-semibold mb-4 text-primary-text">
                        Cevabı silmek istediğinize emin misiniz?
                    </p>
                    <p className="text-sm text-primary-darktext mb-6">Bu işlem geri alınamaz.</p>
                    <div className="flex gap-4">
                        <button
                            onClick={async () => {
                                toast.dismiss(t.id);
                                try {
                                    await answerdelete(surveyId, answerId);
                                    const updatedCevaplar = await fetchsurveyById(surveyId);
                                    setIsDeleting(true);
                                    setCevaplar(updatedCevaplar);
                                    toast.success("Cevap başarıyla silindi");
                                } catch {
                                    toast.warning("Cevap silinemedi");
                                } finally {
                                    setIsDeleting(false);
                                }
                            }}
                            className="bg-danger text-white px-4 py-2 rounded hover:bg-danger-dark transition"
                            disabled={isDeleting}
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
            ),
            { duration: 3000, closeButton: false, position: "top-left", style: { zIndex: 9999 } }
        );
    };

    function yonlendir() {
        navigate('/anket', { replace: true });
    }

    return (
        <>
            <Header
                isAnswerMode={true}
                surveyData={survey}
                onBackToMain={() => yonlendir()}
                Sidebar={() => { }}
            />
            <ViewSelector survey={survey} cevaplar={cevaplar} handleDelete={handleDelete} answerDelete={answerdelete} />
        </>
    );

}