import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { FaTable, FaChartPie, FaChartBar } from "react-icons/fa";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function AnswerScales({ shareData, getsurveyshare, surveyId }) {
  const [visitCounts, setVisitCounts] = useState([]);
  const [deviceCounts, setDeviceCounts] = useState([]);

  useEffect(() => {
    const fetchVisitCounts = async () => {
      if (getsurveyshare && surveyId) {
        try {
          const data = await getsurveyshare(surveyId);
          setVisitCounts(data.visitCounts);
          setDeviceCounts(data.deviceCounts);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchVisitCounts();
  }, [getsurveyshare, surveyId]);

  const metrics = [
    { name: "Görüntüleme sayısı", value: shareData.viewCount },
    { name: "Yanıt sayısı", value: shareData.answerCount },
    { name: "Yanıt Oranı", value: shareData.answerRate },
    { name: "Ortalama Yanıtlama Süresi", value: shareData.averageAnswerTime },
  ];

  // --- Cihaz verileri (şimdilik örnek) ---
  const deviceLabels = [
    { label: "Cep Telefonu", ref: "mobile" },
    { label: "Tablet", ref: "tablet" },
    { label: "Bilgisayar", ref: "desktop" },
    { label: "Başka", ref: "other" },
  ];
  const deviceData = deviceLabels.map((d) => deviceCounts?.[d.ref] ?? 0);

  // --- Dağıtım kanalları ---
  const distributionLabels = [
    { label: "Twitter", ref: "tw" },
    { label: "WhatsApp", ref: "wa" },
    { label: "Telegram", ref: "tg" },
    { label: "LinkedIn", ref: "li" },
    { label: "Facebook", ref: "fb" },
    { label: "Başka", ref: "other" },
  ];

  // visitCounts objesini diziye dönüştür
  const distributionValues = distributionLabels.map(
    (d) => visitCounts?.[d.ref] ?? 0
  );

  const [deviceView, setDeviceView] = useState("pie");
  const [distributionView, setDistributionView] = useState("pie");

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 10 } },
    },
  };

  const chartColors = [
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
  ];
  const chartBorderColors = chartColors.map((c) => c.replace("0.6", "1"));

  /**
   * Dinamik ChartJS data oluşturucu
   * @param {Array} labels - string veya {label} objesi
   * @param {Array<number>} values - sayısal değerler
   * @param {"pie"|"bar"} type
   */
  const generateChartData = (labels, values, type) => {
    const labelStrings = labels.map((l) =>
      typeof l === "string" ? l : l.label
    );
    const dataset = {
      data: values,
      backgroundColor: chartColors.slice(0, labels.length),
      borderColor: chartBorderColors.slice(0, labels.length),
      borderWidth: 1,
    };

    if (type === "pie") {
      return { labels: labelStrings, datasets: [dataset] };
    }
    return {
      labels: labelStrings,
      datasets: [{ ...dataset, label: "Değerler" }],
    };
  };

  const renderChartView = (type, labels, values, isDistribution = false) => {
    if (type === "bar" || type === "pie") {
      const chartData = generateChartData(labels, values, type);
      const ChartComponent = type === "bar" ? Bar : Pie;
      return (
        <div className="w-full h-[300px]">
          <ChartComponent data={chartData} options={chartOptions} />
        </div>
      );
    }

    // --- Tablo görünümü ---
    return (
      <table className="w-full text-sm border border-gray-200 rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left border">Kategori</th>
            <th className="px-3 py-2 text-left border">Değer</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((lb, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="px-3 py-2 border">
                {typeof lb === "string" ? lb : lb.label}
              </td>
              <td className="px-3 py-2 border">
                {isDistribution ? visitCounts?.[lb.ref] ?? 0 : values[i]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="p-6 flex flex-col items-center gap-8 w-full max-w-6xl mx-auto">
      {/* --- Üst metrik kartları --- */}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full bg-white shadow p-6 rounded-xl border">
        {metrics.map((metric, i) => (
          <li key={i} className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {metric.value}
            </div>
            <div className="text-sm text-gray-500">{metric.name}</div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col md:flex-row gap-3 w-full">
        {/* --- Cihazlar --- */}
        <div className="w-full max-w-2xl bg-white shadow rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Cihazlar</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setDeviceView("table")}
                className="hover:text-blue-500 text-gray-600"
              >
                <FaTable size={18} />
              </button>
              <button
                onClick={() => setDeviceView("pie")}
                className="hover:text-blue-500 text-gray-600"
              >
                <FaChartPie size={18} />
              </button>
              <button
                onClick={() => setDeviceView("bar")}
                className="hover:text-blue-500 text-gray-600"
              >
                <FaChartBar size={18} />
              </button>
            </div>
          </div>
          {renderChartView(deviceView, deviceLabels, deviceData)}
        </div>

        {/* --- Dağıtım Ağları --- */}
        <div className="w-full max-w-2xl bg-white shadow rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Dağıtım Ağları
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setDistributionView("table")}
                className="hover:text-blue-500 text-gray-600"
              >
                <FaTable size={18} />
              </button>
              <button
                onClick={() => setDistributionView("pie")}
                className="hover:text-blue-500 text-gray-600"
              >
                <FaChartPie size={18} />
              </button>
              <button
                onClick={() => setDistributionView("bar")}
                className="hover:text-blue-500 text-gray-600"
              >
                <FaChartBar size={18} />
              </button>
            </div>
          </div>
          {renderChartView(
            distributionView,
            distributionLabels,
            distributionValues,
            true,
          )}
        </div>
      </div>
    </div>
  );
}

export default AnswerScales;
