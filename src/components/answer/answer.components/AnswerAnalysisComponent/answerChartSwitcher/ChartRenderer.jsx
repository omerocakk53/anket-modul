import React, { forwardRef } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import useChartOptions from './hooks/useChartOptions';

const ChartRenderer = forwardRef(({ view, labels, data, colors }, ref) => {
  const { barOptions, horizontalBarOptions, lineOptions, pieOptions } = useChartOptions();

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Cevaplar',
        data,
        backgroundColor: colors.slice(0, data.length),
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

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
