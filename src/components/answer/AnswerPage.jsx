import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ViewSwitcher from "./ViewSwitcher";
import FilterBar from "./FilterBar";
import ChartView from "./ChartView";
import AnswerTable from "./AnswerTable";
import ComparisonPage from "./ComparisonPage";
import Header from "../common/Header";

export default function AnswerPage({ answerget, answerdelete, fetchsurveyById }) {
    const { surveyId } = useParams();
    const [cevaplar, setCevaplar] = useState([]);
    const [sorular, setSorular] = useState([]);
    const [search, setSearch] = useState("");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [selectedView, setSelectedView] = useState("Tablo");
    const [isDeleting, setIsDeleting] = useState(false);
    const [survey, setSurvey] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cevapData, survey] = await Promise.all([
                    answerget(surveyId),
                    fetchsurveyById(surveyId),
                ]);
                setSurvey(survey);
                setCevaplar(cevapData);
                setSorular([
                    ...survey.FinishWelcomeitems.filter((q) => q.id.includes("welcome")),
                    ...survey.items,
                    ...survey.FinishWelcomeitems.filter((q) => q.id.includes("finish")),
                ]);
            } catch (err) {
                console.error("Veri getirilemedi:", err);
            }
        };
        fetchData();
    }, [surveyId]);

    const handleDelete = async (answerId) => {
        toast(
            (t) => (
                <div className="tw-p-4">
                    <p className="tw-font-semibold tw-text-lg tw-mb-2">Silmek istediğinize emin misiniz?</p>
                    <p className="tw-text-sm tw-mb-4 tw-text-neutral-dark">Bu işlem geri alınamaz.</p>
                    <div className="tw-flex tw-gap-3">
                        <button
                            onClick={async () => {
                                toast.dismiss(t.id);
                                try {
                                    setIsDeleting(true);
                                    await answerdelete(surveyId, answerId);
                                    const updatedCevaplar = await answerget(surveyId);
                                    setCevaplar(updatedCevaplar);
                                    toast.success("Cevap başarıyla silindi");
                                } catch {
                                    toast.error("Cevap silinemedi");
                                } finally {
                                    setIsDeleting(false);
                                }
                            }}
                            className="tw-bg-danger tw-text-white tw-px-4 tw-py-2 tw-rounded-md"
                            disabled={isDeleting}
                        >
                            Evet
                        </button>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="tw-bg-gray-200 tw-px-4 tw-py-2 tw-rounded-md"
                        >
                            Hayır
                        </button>
                    </div>
                </div>
            ),
            { duration: 5000, closeButton: false }
        );
    };


    const filteredCevaplar = (selectedView === "Tablo" || selectedView === "Grafik")
        ? cevaplar?.filter((cevap) => {
            const created = new Date(cevap.createdAt);
            const start = dateRange.start ? new Date(dateRange.start) : null;
            const end = dateRange.end ? new Date(dateRange.end) : null;

            const dateInRange =
                (!start || created >= start) && (!end || created <= end);

            const textMatch = cevap.answers.some((answer) => {
                const val = answer.value;
                if (typeof val === "string") {
                    return val.toLowerCase().includes(search.toLowerCase());
                } else if (typeof val === "object" && val !== null) {
                    const findMatch = (obj) =>
                        Object.values(obj).some((innerVal) => {
                            if (typeof innerVal === "string") {
                                return innerVal.toLowerCase().includes(search.toLowerCase());
                            } else if (typeof innerVal === "object" && innerVal !== null) {
                                return findMatch(innerVal);
                            }
                            return false;
                        });
                    return findMatch(val);
                }
                return false;
            });

            return dateInRange || textMatch;
        })
        : cevaplar;


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
            <div className="tw-max-w-6xl tw-mx-auto tw-p-6 tw-bg-neutral-light tw-rounded-lg tw-shadow-inner">
                <ViewSwitcher selectedView={selectedView} setSelectedView={setSelectedView} />
                {selectedView === "Tablo" || selectedView === "Grafik" ? (
                    <FilterBar
                        search={search}
                        setSearch={setSearch}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                    />
                ) : (<></>)}
                {filteredCevaplar.length === 0 ? (
                    <div className="tw-bg-neutral-white tw-border tw-border-neutral-DEFAULT tw-rounded-lg tw-p-6 tw-text-center tw-text-neutral-dark">
                        <p className="tw-text-lg tw-font-semibold tw-mb-2">Gösterilecek cevap bulunamadı.</p>
                        <p className="tw-text-sm">Tarih aralığı veya arama kriterlerini değiştirin.</p>
                    </div>
                ) : (
                    <>
                        {selectedView === "Tablo" && (
                            <AnswerTable
                                cevaplar={filteredCevaplar}
                                sorular={sorular}
                                onDelete={handleDelete}
                                isDeleting={isDeleting}
                            />
                        )}


                        {selectedView === "Grafik" && (
                            <ChartView allAnswers={filteredCevaplar} />
                        )}

                        {selectedView === "Karşılaştırma" && (
                            <ComparisonPage allAnswers={cevaplar} />
                        )}

                    </>
                )}
            </div>
        </>
    );
}
