import React, { useState } from "react";
import { DateRange } from "react-date-range";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { tr } from 'date-fns/locale';

const typeLabels = {
    Numeric: "Numara",
    Scale: "Derecelendirme",
    Rating: "Puanlama",
};

export default function ComparisonPage({ allAnswers, survey }) {
    const numericTypes = ["Numeric", "Scale", "Rating"];

    // Tarih aralıkları state, varsayılan 1 günlük
    const [survey1Range, setSurvey1Range] = useState([
        { startDate: new Date(), endDate: new Date(), key: "survey1" },
    ]);
    const [survey2Range, setSurvey2Range] = useState([
        { startDate: new Date(), endDate: new Date(), key: "survey2" },
    ]);

    // Tarih aralıklarının en az 1 gün olmasını sağlamak için helper
    const normalizeRange = (range) => {
        const start = new Date(range[0].startDate);
        const end = new Date(range[0].endDate);

        if (start > end) return [{ startDate: end, endDate: start, key: range[0].key }];

        // endDate'i 23:59:59.999 olarak ayarla
        end.setHours(23, 59, 59, 999);

        return [{ startDate: start, endDate: end, key: range[0].key }];
    };

    // Sayısal soruları bul
    const questionMap = new Map();

    allAnswers.forEach((entry) => {
        entry.answers.forEach((a) => {
            if (numericTypes.includes(a.itemType)) {
                if (!questionMap.has(a.itemId)) {
                    questionMap.set(a.itemId, {
                        itemId: a.itemId,
                        itemType: a.itemType,
                    });
                }
            }
        });
    });

    const numericQuestions = Array.from(questionMap.values()).map((q) => ({
        ...q,
        label: `${typeLabels[q.itemType]} - ${survey.items.find((i) => i.id === q.itemId)?.title}`,
    }));

    // Verilen tarih aralığında seçilen sorunun sayısal cevaplarını al
    const getAvgByQuestionInRange = (range) => {
        const start = range[0].startDate;
        const end = range[0].endDate;

        // Her sorunun cevaplarını toplayacağız
        const answersByQuestion = {};

        allAnswers.forEach((entry) => {
            const created = new Date(entry.createdAt);
            if (created >= start && created <= end) {
                entry.answers.forEach((a) => {
                    if (numericTypes.includes(a.itemType) && typeof a.value === "number") {
                        if (!answersByQuestion[a.itemId]) {
                            answersByQuestion[a.itemId] = [];
                        }
                        answersByQuestion[a.itemId].push(a.value);
                    }
                });
            }
        });

        // Ortalama hesapla
        const avgByQuestion = {};
        Object.entries(answersByQuestion).forEach(([itemId, values]) => {
            avgByQuestion[itemId] = values.reduce((a, b) => a + b, 0) / values.length;
        });

        return avgByQuestion;
    };

    // Ortalamalar hesapla
    const avgSurvey1 = getAvgByQuestionInRange(normalizeRange(survey1Range));
    const avgSurvey2 = getAvgByQuestionInRange(normalizeRange(survey2Range));

    // Grafik için ortak itemId'leri ve verileri hazırla
    const chartData = numericQuestions.map((q) => {
        const avg1 = avgSurvey1[q.itemId] || 0;
        const avg2 = avgSurvey2[q.itemId] || 0;
        return {
            name: typeLabels[q.itemType] || q.itemType,
            [`${q.itemId}_1`]: avg1,
            [`${q.itemId}_2`]: avg2,
            label: `Soru ${q.itemId}`,
        };
    });

    // Grafik tooltip için özel gösterim
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border rounded shadow">
                    {payload.map((p) => (
                        <p key={p.dataKey} style={{ color: p.color }}>
                            {p.name}: {p.value.toFixed(2)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold mb-4">Memnuniyet Anketleri Analiz</h1>

            <div className="flex justify-between flex-wrap">
                <div>
                    <h2 className="font-semibold mb-2">1. Anket Tarih Aralığı</h2>
                    <DateRange
                        ranges={survey1Range}
                        onChange={(item) => setSurvey1Range([item.survey1 || item.selection])}
                        maxDate={new Date()}
                        rangeColors={["#3b82f6"]}
                        locale={tr}
                        className="bg-white rounded-lg shadow-md"
                    />
                </div>
                <div>
                    <h2 className="font-semibold mb-2">2. Anket Tarih Aralığı</h2>
                    <DateRange
                        ranges={survey2Range}
                        onChange={(item) => setSurvey2Range([item.survey2 || item.selection])}
                        maxDate={new Date()}
                        rangeColors={["#10b981"]}
                        locale={tr}
                        className="bg-white rounded-lg shadow-md"
                    />
                </div>
            </div>

            <div className="mt-8" style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        barGap={15}
                        barCategoryGap="30%"
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            payload={[
                                { id: "survey1", value: "1. Anket Ortalaması", type: "square", color: "#3b82f6" },
                                { id: "survey2", value: "2. Anket Ortalaması", type: "square", color: "#10b981" },
                            ]}
                        />
                        {numericQuestions.map((q) => (
                            <Bar
                                key={`${q.itemId}_1`}
                                dataKey={`${q.itemId}_1`}
                                fill="#3b82f6"
                                name={`Soru ${q.itemId} - 1. Anket`}
                                maxBarSize={35}
                            />
                        ))}
                        {numericQuestions.map((q) => (
                            <Bar
                                key={`${q.itemId}_2`}
                                dataKey={`${q.itemId}_2`}
                                fill="#10b981"
                                name={`Soru ${q.itemId} - 2. Anket`}
                                maxBarSize={35}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

