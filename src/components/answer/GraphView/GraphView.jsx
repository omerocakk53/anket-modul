import React, { useState, useMemo } from "react";
import QuestionSelector from "./QuestionSelector";
import ChartSelector from "./ChartSelector";
import TimeFilter from "./TimeFilter";
import ChartRenderer from "./ChartRenderer";

export default function GraphView({ allAnswers, survey }) {
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const [chartType, setChartType] = useState("bar");
  const [groupBy, setGroupBy] = useState("daily");
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  // Filtreli ve tarih aralığına göre filtrelenmiş cevaplar
  const filteredAnswers = useMemo(() => {
    if (!dateRange.startDate || !dateRange.endDate) return allAnswers;

    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    end.setHours(23, 59, 59, 999);

    return allAnswers.filter((entry) => {
      const created = new Date(entry.createdAt);
      return created >= start && created <= end;
    });
  }, [allAnswers, dateRange]);


  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">İleri Düzey Anket Analizi ve Grafikleme</h1>

      {/* Soru Seçimi */}
      <QuestionSelector
        items={survey.items}
        selectedQuestionId={selectedQuestionId}
        setSelectedQuestionId={setSelectedQuestionId}
      />

      {/* Grafik Tipi Seçimi */}
      <ChartSelector chartType={chartType} setChartType={setChartType} />

      {/* Tarih ve Grup Seçimi */}
      <TimeFilter
        dateRange={dateRange}
        setDateRange={setDateRange}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
      />

      {/* Grafik Çizimi */}
      {selectedQuestionId ? (
        <ChartRenderer
          allAnswers={filteredAnswers}
          survey={survey}
          questionId={selectedQuestionId}
          chartType={chartType}
          groupBy={groupBy}
        />
      ) : (
        <p className="text-gray-500 mt-4">Lütfen analiz için bir soru seçin.</p>
      )}
    </div>
  );
}
