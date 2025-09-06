import ChartDataLabels from "chartjs-plugin-datalabels";

export const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 400 },
  plugins: {
    legend: {
      position: "left",
      labels: {
        boxWidth: 16,
        padding: 15,
        color: "#111",
        font: { size: 14 },
      },
    },
    tooltip: {
      enabled: true,
      mode: "nearest",
      intersect: false,
      callbacks: {
        label: (context) => {
          let label = context.dataset.label || "";
          const value =
            context.parsed?.y ?? context.parsed?.x ?? context.parsed;
          return label + ": " + (value?.toFixed(1) ?? 0) + "%";
        },
      },
    },
    datalabels: {
      color: "#111",
      anchor: "end",
      align: "end",
      font: { weight: "600", size: 12 },
      formatter: (value) => `${value.toFixed(1)}%`,
    },
  },
  layout: { padding: 40 },
};

export const getChartOptions = (type) => {
  const isHorizontal = type === "horizantalbar";
  const axisOptions = isHorizontal ? { indexAxis: "y" } : {};
  return {
    ...commonOptions,
    ...axisOptions,
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "#e5e7eb" },
        ticks: { font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#e5e7eb" },
        ticks: { font: { size: 12 } },
      },
    },
    plugins: {
      ...commonOptions.plugins,
      datalabels: {
        ...commonOptions.plugins.datalabels,
        offset: -10,
      },
    },
  };
};

export const pieOptions = {
  ...commonOptions,
  plugins: {
    ...commonOptions.plugins,
    legend: {
      position: "right",
      labels: {
        boxWidth: 16,
        padding: 15,
        color: "#111",
        font: { size: 14 },
      },
    },
    datalabels: {
      color: "#fff",
      textAlign: "center",
      font: { size: 12, weight: "bold" },
      formatter: (value, context) => {
        const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
        const percentage = ((value / total) * 100).toFixed(1);
        return `${context.chart.data.labels[context.dataIndex]}\n${percentage}%`;
      },
    },
  },
};
