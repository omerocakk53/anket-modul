import React, { forwardRef } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import useChartOptions from './hooks/useChartOptions';
import { da } from 'date-fns/locale';

const ChartRenderer = forwardRef(({ view, labels, data, colors }, ref) => {
  const { barOptions, horizontalBarOptions, lineOptions, pieOptions } = useChartOptions();
  const getColor = (i) => colors[i % colors.length];


  let chartData;

  if (view === 'pie') {
    chartData = {
      labels:  labels.map((l) => "Cevap: " + l),
      datasets: [
        {
          label: 'Cevap Veren Kişi Sayısı',
          data,
          backgroundColor: data.map((_, i) => getColor(i)),
        },
      ],
    };
  } else if (view === 'bar' || view === 'horizantalbar') {
    chartData = {
      labels: ["Değerler"],
      datasets: data.map((d, i) => ({
        label: "Cevap: " + labels[i],
        data:  [d],
        backgroundColor: getColor(i),
      }))
    };
  } else if (view === 'line') {
    chartData = {
      labels:  labels.map((l) => "Cevap: " + l),
      datasets: [
        {
          label: 'Cevap Veren Kişi Sayısı ',
          data,
          backgroundColor: labels.map((_, i) => getColor(i)),
        },
      ]
    };
  }

  return (
    <div ref={ref} className="flex justify-center items-center h-[30vw] w-[80vw]">
      {view === 'bar' && <Bar data={chartData} options={barOptions} />}
      {view === 'horizantalbar' && <Bar data={chartData} options={horizontalBarOptions} />}
      {view === 'line' && <Line data={chartData} options={lineOptions} />}
      {view === 'pie' && <Pie data={chartData} options={pieOptions} />}
    </div>
  );
});

export default ChartRenderer;
