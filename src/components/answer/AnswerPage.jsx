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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };
    return (
        <>

            <Header
                isAnswerMode={true}
                surveyData={survey}
                onBackToMain={() => yonlendir()}
                Sidebar={() => { }}
            />
            <div className="container mx-auto p-4 space-y-4 mt-4">

                {survey.surveyType === "MemberSatisfaction" && (
                    <select
                        className="block w-full max-w-xs p-2 border border-neutral-light rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        value={
                            survey.activePeriodDates?.find(
                                (p) => p.startDate === dateRange.start && p.endDate === dateRange.end
                            )?._id || ""
                        }
                        onChange={(e) => {
                            const selectedPeriodId = e.target.value;
                            if (!selectedPeriodId) {
                                setDateRange({ start: "", end: "" });
                                return;
                            }
                            const period = survey.activePeriodDates?.find(
                                (p) => p._id === selectedPeriodId
                            );
                            if (period) {
                                setDateRange({ start: period.startDate, end: period.endDate });
                            }
                        }}
                    >
                        <option value="">Tüm Periyotlar</option>
                        {survey.activePeriodDates?.map((period) => (
                            <option key={period._id} value={period._id}>
                                {formatDate(period.startDate)} - {formatDate(period.endDate)}
                            </option>
                        ))}
                    </select>
                )}

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
