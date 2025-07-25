import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

import { FaTable, FaChartPie, FaChartBar } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function AnswerScales({shareData}) {
  const [metrics] = useState([
    { name: 'Görüntüleme sayısı', value: 0 },
    { name: 'Yanıt sayısı', value: 0 },
    { name: 'Yanıt Oranı', value: '0%' },
    { name: 'Ortalama Yanıtlama Süresi', value: '00:00' },
  ]);

  const deviceLabels = ['Cep Telefonu', 'Tablet', 'Bilgisayar', 'Başka'];
  const deviceData = [0, 0, 0, 0];

  const distributionLabels = ['Twitter', 'WhatsApp', 'Telegram', 'Linkedin', 'Başka'];
  const distributionData = [0, 0, 0, 0, 0];

  const [deviceView, setDeviceView] = useState('pie');
  const [distributionView, setDistributionView] = useState('pie');

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10
        }
      }
    }
  };

  const generateChartData = (labels, data) => ({
    labels,
    datasets: [
      {
        label: 'Veriler',
        data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const renderChartView = (type, labels, data) => {
    const chartData = generateChartData(labels, data);
    if (type === 'bar') {
      return (
        <div className='w-full h-[300px]'>
          <Bar data={chartData} options={chartOptions} />
        </div>
      );
    }
    if (type === 'pie') {
      return (
        <div className='w-full h-[300px]'>
          <Pie data={chartData} options={chartOptions} />
        </div>
      );
    }
    return (
      <table className='w-full text-sm border border-gray-200 rounded overflow-hidden'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-3 py-2 text-left border'>Kategori</th>
            <th className='px-3 py-2 text-left border'>Değer</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, i) => (
            <tr key={i} className='hover:bg-gray-50'>
              <td className='px-3 py-2 border'>{label}</td>
              <td className='px-3 py-2 border'>{data[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className='p-6 flex flex-col items-center gap-8 w-full max-w-6xl mx-auto'>
      {/* METRİK PANELİ */}
      <ul className='grid grid-cols-2 md:grid-cols-4 gap-6 w-full bg-white shadow p-6 rounded-xl border'>
        {metrics.map((metric, i) => (
          <li key={i} className='text-center'>
            <div className='text-2xl font-bold text-gray-800'>{metric.value}</div>
            <div className='text-sm text-gray-500'>{metric.name}</div>
          </li>
        ))}
      </ul>

      {/* CİHAZLAR */}
      <div className='w-full max-w-2xl bg-white shadow rounded-xl p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold text-gray-800'>Cihazlar</h2>
          <div className='flex gap-2'>
            <button onClick={() => setDeviceView('table')} className='hover:text-blue-500 text-gray-600'><FaTable size={18} /></button>
            <button onClick={() => setDeviceView('pie')} className='hover:text-blue-500 text-gray-600'><FaChartPie size={18} /></button>
            <button onClick={() => setDeviceView('bar')} className='hover:text-blue-500 text-gray-600'><FaChartBar size={18} /></button>
          </div>
        </div>
        {renderChartView(deviceView, deviceLabels, deviceData)}
      </div>

      {/* DAĞITIM AĞLARI */}
      <div className='w-full max-w-2xl bg-white shadow rounded-xl p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold text-gray-800'>Dağıtım Ağları</h2>
          <div className='flex gap-2'>
            <button onClick={() => setDistributionView('table')} className='hover:text-blue-500 text-gray-600'><FaTable size={18} /></button>
            <button onClick={() => setDistributionView('pie')} className='hover:text-blue-500 text-gray-600'><FaChartPie size={18} /></button>
            <button onClick={() => setDistributionView('bar')} className='hover:text-blue-500 text-gray-600'><FaChartBar size={18} /></button>
          </div>
        </div>
        {renderChartView(distributionView, distributionLabels, distributionData)}
      </div>
    </div>
  );
}

export default AnswerScales;
