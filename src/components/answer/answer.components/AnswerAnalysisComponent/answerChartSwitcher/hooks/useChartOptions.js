import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'left',
      labels: { boxWidth: 16, padding: 15, color: '#111', font: { size: 14 } },
    },
  },
  layout: { padding: 40 },
};

export default function useChartOptions() {
  return {
    barOptions: {
      ...commonOptions,
      scales: {
        x: { grid: { display: true }, ticks: { font: { size: 12 } } },
        y: { beginAtZero: true, grid: { color: '#e5e7eb' }, ticks: { font: { size: 12 } } },
      },
    },
    horizontalBarOptions: {
      ...commonOptions,
      indexAxis: 'y',
      scales: {
        y: { grid: { display: false }, ticks: { font: { size: 12 } } },
        x: { beginAtZero: true, grid: { color: '#e5e7eb' }, ticks: { font: { size: 12 } } },
      },
    },
    lineOptions: {
      ...commonOptions,
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 12 } } },
        y: { beginAtZero: true, grid: { color: '#e5e7eb' }, ticks: { font: { size: 12 } } },
      },
      elements: { line: { tension: 0.3, borderWidth: 3 }, point: { radius: 5 } },
    },
    pieOptions: commonOptions,
  };
}
