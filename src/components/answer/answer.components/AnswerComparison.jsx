import React, { useState, useMemo, useRef } from "react";
import DateSelector from "./AnswerCompareComponent/DateSelector";
import PeriotSelector from "./AnswerCompareComponent/PeriotSelector";
import Modal from "./AnswerCompareComponent/popUp/Modal";
import { SurveyComparison } from "./AnswerCompareComponent/utils/SurveyComparison.js";
import { UserSurveyComparison } from "./AnswerCompareComponent/utils/UserSurveyComparison.js";
import { MixedSurveyComparison } from "./AnswerCompareComponent/utils/MixedSurveyComparison.js";
import ItemUserDeltaChart from "./AnswerCompareComponent/ComparisonView/ItemUserDeltaChart/ItemUserDeltaChart.jsx";
import ItemUserDeltaTable from "./AnswerCompareComponent/ComparisonView/ItemUserDeltaTable.jsx";
import { FaChartPie, FaDownload, FaTable } from "react-icons/fa";
import { PiChartBarDuotone, PiChartBarHorizontalDuotone, PiChartLine } from "react-icons/pi";
import ColorPickerRow from "./AnswerAnalysisComponent/ColorPickerRow.jsx";
import domtoimage from 'dom-to-image';
import MixedItemUserDeltaTable from "./AnswerCompareComponent/ComparisonView/MixedItemUserDeltaTable.jsx";
import MixedChart from "./AnswerCompareComponent/ComparisonView/MixedChart/MixedChart.jsx";
export default function AnswerComparison({ survey, answers }) {
    const [surveyPeriod1, setSurveyPeriod1] = useState({});
    const [surveyPeriod2, setSurveyPeriod2] = useState({});
    const [openModal, setOpenModal] = useState(null);
    const [ViewType, setViewType] = useState("bar");
    const [selectedItemId, setSelectedItemId] = useState("");
    const isGraphSupported = ["rating", "scale"].includes(selectedItemId?.split("-")[0]);

    const chartRef = useRef(null);
    const tableRef = useRef(null);

    const [colors, setColors] = useState([
        '#34d399', '#60a5fa'
    ]);

    const onColorChange = (index, newColor) => {
        setColors((prev) => {
            const copy = [...prev];
            copy[index] = newColor;
            return copy;
        });
    };

    const periods = useMemo(() => {
        return survey.activePeriodDates.map((p) => ({
            _id: p._id,
            startDate: p.startDate,
            endDate: p.endDate,
        }));
    }, [survey.activePeriodDates]);

    const SurveyType = useMemo(() => survey.surveyType, [survey.surveyType]);


    const Survey = useMemo(
        () => SurveyComparison(survey, answers, { surveyPeriod1, surveyPeriod2 }),
        [survey, answers, surveyPeriod1, surveyPeriod2]
    );
    const UserSurvey = useMemo(
        () => UserSurveyComparison(survey, answers, { surveyPeriod1, surveyPeriod2 }),
        [survey, answers, surveyPeriod1, surveyPeriod2]
    );

    const MixedSurvey = useMemo(
        () => MixedSurveyComparison(survey, answers, { surveyPeriod1, surveyPeriod2 }),
        [survey, answers, surveyPeriod1, surveyPeriod2]
    );

    const handleDateSelectorChange = ({ surveyPeriod1, surveyPeriod2 }) => {
        setSurveyPeriod1(surveyPeriod1);
        setSurveyPeriod2(surveyPeriod2);
    };
    const handleDownload = () => {
        if (ViewType === 'table') {
            if (!chartRef.current || !tableRef.current) return;

            // Grafik indir
            domtoimage.toPng(chartRef.current, { cacheBust: true, bgcolor: '#fff' })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'table1.png';
                    link.href = dataUrl;
                    link.click();

                    // Tabloyu indir (grafik indirildikten sonra)
                    return domtoimage.toPng(tableRef.current, { cacheBust: true, bgcolor: '#fff' });
                })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = 'table2.png';
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.error('Görsel indirilemedi:', err);
                });

        } else {
            // Sadece grafik indir
            if (!chartRef.current) return;

            domtoimage.toPng(chartRef.current, { cacheBust: true, bgcolor: '#fff' })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = `chart-${ViewType}.png`;
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.error('Görsel indirilemedi:', err);
                });
        }
    };


    return (
        <div className="relative w-full h-full p-4">
            <div className="flex gap-4 justify-start mb-6">
                {SurveyType !== "Normal" && (
                    <button
                        onClick={() => setOpenModal("period")}
                        className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark transition"
                    >
                        Periyot Seç
                    </button>
                )}
                <button
                    onClick={() => setOpenModal("date")}
                    className="px-4 py-2 rounded bg-success text-white hover:bg-green-700 transition"
                >
                    Tarih Seç
                </button>
                <select
                    className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700"
                    value={selectedItemId}
                    onChange={(e) => setSelectedItemId(e.target.value)}
                >
                    <option value="">Soru Seçiniz</option>
                    {survey.items.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.title} ({item.type})
                        </option>
                    ))}
                </select>
            </div>

            <Modal isOpen={openModal === "period"} onClose={() => setOpenModal(null)}>
                <h3 className="text-lg font-semibold mb-4">Periyot Seçiniz</h3>
                <PeriotSelector
                    periods={periods}
                    onChangePeriod1={setSurveyPeriod1}
                    onChangePeriod2={setSurveyPeriod2}
                />
            </Modal>

            <Modal isOpen={openModal === "date"} onClose={() => setOpenModal(null)}>
                <h3 className="text-lg font-semibold mb-4">Tarih Seçiniz</h3>
                <DateSelector handleDateChange={handleDateSelectorChange} />
            </Modal>

            <div className="p-6 max-w-screen-xl mx-auto relative z-1 bg-white rounded-lg shadow-lg">
                <div className="flex flex-wrap items-center gap-3 justify-start mb-6">
                    <div className="flex gap-3 items-center flex-wrap">
                        {[
                            { key: 'table', icon: <FaTable size={20} />, label: 'Tablo' },
                            { key: 'pie', icon: <FaChartPie size={20} />, label: 'Pasta Grafik' },
                            { key: 'bar', icon: <PiChartBarDuotone size={20} />, label: 'Dikey Bar' },
                            { key: 'horizantalbar', icon: <PiChartBarHorizontalDuotone size={20} />, label: 'Yatay Bar' },
                            { key: 'line', icon: <PiChartLine size={20} />, label: 'Çizgi Grafik' },
                        ].map(({ key, icon, label }) => {
                            const isDisabled = !isGraphSupported && key !== "table";

                            return (
                                <button
                                    key={key}
                                    onClick={() => !isDisabled && setViewType(key)}
                                    disabled={isDisabled}
                                    className={`p-2 rounded-md transition
          ${ViewType === key ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600'}
          ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'}
        `}
                                    aria-label={label}
                                    title={label}
                                    type="button"
                                >
                                    {icon}
                                </button>
                            );
                        })}

                        <button
                            onClick={handleDownload}
                            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
                            aria-label="İndir"
                            title="Grafik veya tabloyu indir"
                            type="button"
                        >
                            <FaDownload size={20} />
                        </button>
                    </div>
                    <div className="flex-1 min-w-[160px] overflow-x-auto">
                        <ColorPickerRow colors={colors} onColorChange={onColorChange} />
                    </div>
                </div>
                <div className="flex justify-center">
                    {selectedItemId ? (
                        ["rating", "scale"].includes(selectedItemId.split("-")[0]) ? (
                            <>
                                <ItemUserDeltaChart
                                    item={Survey}           // SurveyComparison sonucu grafik için
                                    ItemTip={selectedItemId}
                                    color={colors}
                                    ChartType={ViewType}
                                    ref={chartRef}
                                />
                                {
                                    ViewType === "table" && (
                                        <ItemUserDeltaTable
                                            item={UserSurvey}       // UserSurveyComparison sonucu tablo için
                                            ItemTip={selectedItemId}
                                            ref={tableRef}
                                        />
                                    )

                                }
                            </>
                        ) : (
                            <>
                                <MixedItemUserDeltaTable
                                    item={MixedSurvey}      // MixedSurveyComparison sonucu tablo için
                                    ItemTip={selectedItemId}
                                    ref={tableRef}
                                />
                            </>
                        )
                    ) : (
                        <div className="text-gray-500 text-center mt-10">
                            Lütfen listeden bir soru seçiniz.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
