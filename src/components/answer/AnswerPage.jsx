import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
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
                                    const updatedCevaplar = await answerget(surveyId);
                                    setIsDeleting(true);
                                    setCevaplar(updatedCevaplar);
                                    toast.success("Cevap başarıyla silindi");
                                } catch {
                                    toast.error("Cevap silinemedi");
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

    const filteredCevaplar = (selectedView === "Tablo" || selectedView === "Grafik")
        ? cevaplar?.filter((cevap) => {
            const created = new Date(cevap.createdAt);
            const selectedPeriod = survey.activePeriodDates.find((period) => period._id === dateRange);
            if (selectedPeriod) {
                const start = new Date(selectedPeriod.startDate);
                const end = new Date(selectedPeriod.endDate);
                return created >= start && created <= end;
            }
            return true; // Tüm tarihler seçili ise
        })
        : cevaplar;


    function yonlendir() {
        navigate('/anket', { replace: true });
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };
    console.log(survey.activePeriodDates);
    return (
        <>

            <Header
                isAnswerMode={true}
                surveyData={survey}
                onBackToMain={() => yonlendir()}
                Sidebar={() => { }}
            />
            <div className="max-w-6xl mx-auto p-6 bg-neutral-light rounded-lg shadow-inner">
                <ViewSwitcher selectedView={selectedView} setSelectedView={setSelectedView} />
                {selectedView === "Tablo" || selectedView === "Grafik" ? (
                    <><FilterBar
                        search={search}
                        setSearch={setSearch}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                    />

                        {survey.activePeriodDates && (
                            <Select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                options={[
                                    { value: "", label: "Tüm Tarihler" },
                                    ...survey.activePeriodDates.map((period, index) => ({
                                        value: "period " + index + 1,
                                        label: `${formatDate(period.startDate)} - ${formatDate(period.endDate)}`,
                                    })),
                                ]}
                            />
                        )}
                    </>
                ) : (<></>)}
                {filteredCevaplar.length === 0 ? (
                    <div className="bg-neutral-white border border-neutral-DEFAULT rounded-lg p-6 text-center text-neutral-dark">
                        <p className="text-lg font-semibold mb-2">Gösterilecek cevap bulunamadı.</p>
                        <p className="text-sm">Tarih aralığı veya arama kriterlerini değiştirin.</p>
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
