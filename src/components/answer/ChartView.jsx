import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
} from "recharts";

// Türlere göre Türkçe etiket karşılıkları
const typeLabels = {
  Numeric: "Numara",
  Scale: "Derecelendirme",
  Rating: "Puanlama",
};

export default function GraphView({ allAnswers }) {
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const numericTypes = ["Numeric", "Scale", "Rating"];

  // Benzersiz sayısal soruları toplamak için Map kullanılır
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

  const numericQuestions = Array.from(questionMap.values());

  const chartData = allAnswers
    .map((entry) => {
      const answer = entry.answers.find((a) => a.itemId === selectedQuestionId);
      if (!answer || typeof answer.value !== "number") return null;
      return {
        date: new Date(entry.createdAt).toLocaleDateString(),
        value: answer.value,
      };
    })
    .filter(Boolean);

  return (
    <div className="p-4 space-y-4">
      <select
        value={selectedQuestionId}
        onChange={(e) => setSelectedQuestionId(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Soru seçiniz</option>
        {numericQuestions.map((q) => {
          const label = typeLabels[q.itemType] || q.itemType;
          return (
            <option key={q.itemId} value={q.itemId}>
              {label} ({q.itemType})
            </option>
          );
        })}
      </select>

      {selectedQuestionId && chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#6366f1" label={{ position: "top", fill: "#333" }} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-gray-500">Veri bulunamadı veya soru seçilmedi.</p>
      )}
    </div>
  );
}
