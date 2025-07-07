// components/analytics/GraphView/ChartRenderer.jsx
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell,
} from "recharts";
import {
  groupByDate,
  averageByQuestion,
  countMultipleChoiceAnswers,
} from "./chartUtils";

const COLORS = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6",
];

export default function ChartRenderer({ 
  allAnswers, 
  survey, 
  questionId, 
  chartType, 
  groupBy 
}) {
  const numericTypes = ["Numeric", "Scale", "Rating"];
  const question = survey.items.find((i) => i.id === questionId);

  if (!question) return <p>Soru bulunamadı.</p>;

  // Gruplanmış cevaplar
  const grouped = groupByDate(allAnswers, groupBy);

  // Veri seti hazırlanıyor
  let data = [];

  if (numericTypes.includes(question.type)) {
    data = averageByQuestion(grouped, questionId, numericTypes);
  } else if (
    question.type === "MultipleChoice" ||
    question.type === "Dropdown"
  ) {
    data = countMultipleChoiceAnswers(grouped, questionId, question.options || []);
  } else {
    return <p>Bu soru tipi için grafik desteklenmiyor.</p>;
  }

  if (data.length === 0) return <p>Gösterilecek veri yok.</p>;

  // Grafik içerikleri farklı tiplerde
  if (chartType === "bar") {
    // Çoktan seçmeli için özel Bar çizimi
    if (question.type === "MultipleChoice" || question.type === "Dropdown") {
      const keys = question.options;
      return (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {keys.map((key, idx) => (
              <Bar key={key} dataKey={key} fill={COLORS[idx % COLORS.length]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    }

    // Numeric tipler için bar chart
    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill={COLORS[0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "line") {
    if (question.type === "MultipleChoice" || question.type === "Dropdown") {
      const keys = question.options;
      return (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {keys.map((key, idx) => (
              <Line key={key} type="monotone" dataKey={key} stroke={COLORS[idx % COLORS.length]} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke={COLORS[0]} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === "pie") {
    // Pasta grafiği sadece en son tarih için gösterilecek, toplam değerlerle
    if (question.type === "MultipleChoice" || question.type === "Dropdown") {
      const lastDateData = data[data.length - 1];
      if (!lastDateData) return <p>Veri yok.</p>;

      const pieData = question.options.map((opt) => ({
        name: opt,
        value: lastDateData[opt] || 0,
      }));

      return (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill={COLORS[0]}
              label
            >
              {pieData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    // Numeric tipler için pasta grafik genellikle uygun değil
    return <p>Pasta grafik sadece çoktan seçmeli ve açılır liste için destekleniyor.</p>;
  }

  return <p>Desteklenmeyen grafik tipi.</p>;
}
