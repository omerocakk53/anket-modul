// hooks/useChartOptions.js
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables, ChartDataLabels);

const baseFont = {
  family: "'Inter', 'Roboto', sans-serif",
  size: 13,
};

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        boxWidth: 10,
        padding: 15,
        color: "#374151",
        font: { ...baseFont, weight: "500" },
      },
    },
    tooltip: {
      backgroundColor: "#111827",
      titleColor: "#f9fafb",
      bodyColor: "#f3f4f6",
      padding: 20,
      cornerRadius: 8,
      displayColors: true,
    },
  },
  layout: { padding: 20 },
  scales: {
    x: {
      grid: { color: "#e5e7eb", borderDash: [3, 3] },
      ticks: { font: baseFont, color: "#4b5563" },
    },
    y: {
      beginAtZero: true,
      grid: { color: "#e5e7eb", borderDash: [3, 3] },
      ticks: { font: baseFont, color: "#4b5563" },
    },
  },
};

export default function useChartOptions() {
  const tooltipCallbacks = {
    title: () => "",
    label: function (context) {
      const value = context.raw;
      return [`Cevap Veren Kişi Sayısı : ${value}`];
    },
  };

  return {
    barOptions: {
      ...defaultOptions,
      elements: { bar: { borderRadius: 12 } },
      plugins: {
        ...defaultOptions.plugins,
        tooltip: { callbacks: tooltipCallbacks },
        datalabels: {
          color: "#fff",
          font: { weight: "600", size: 12 },
          formatter: (value) => value,
        },
      },
    },
    horizontalBarOptions: {
      ...defaultOptions,
      indexAxis: "y",
      elements: { bar: { borderRadius: 12 } },
      scales: {
        x: { ...defaultOptions.scales.y },
        y: { ...defaultOptions.scales.x },
      },
      plugins: {
        ...defaultOptions.plugins,
        tooltip: { callbacks: tooltipCallbacks },
        datalabels: {
          color: "#fff",
          font: { weight: "600", size: 12 },
          formatter: (value) => value,
        },
      },
    },
    lineOptions: {
      ...defaultOptions,
      plugins: {
        ...defaultOptions.plugins,
        legend: { display: false },
        tooltip: { callbacks: tooltipCallbacks },
        datalabels: {
          color: "#fff",
          font: { weight: "600", size: 12 },
          formatter: (value) => value,
        },
      },
      elements: {
        line: { tension: 0.4, borderWidth: 3 },
        point: { radius: 7, hoverRadius: 7, backgroundColor: "#111827" },
      },
    },
    pieOptions: {
      ...defaultOptions,
      borderRadius: 6,
      cutout: "55%",
      plugins: {
        ...defaultOptions.plugins,
        tooltip: { callbacks: tooltipCallbacks },
        datalabels: {
          color: "#fff",
          font: { weight: "600", size: 12 },
          formatter: (value, ctx) => {
            const sum = ctx.chart.data.datasets[0].data.reduce(
              (a, b) => a + b,
              0,
            );
            return ((value / sum) * 100).toFixed(0) + "%";
          },
        },
      },
    },
  };
}
