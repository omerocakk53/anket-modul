import React, { useRef, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { FaTable, FaChartPie, FaDownload } from 'react-icons/fa';
import { PiChartBarDuotone, PiChartBarHorizontalDuotone, PiChartLine } from 'react-icons/pi';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';
import domtoimage from 'dom-to-image';
import ColorPickerRow from './ColorPickerRow';
import { calculateSatisfactionRate  } from '../../analysis/hooks/satisfaction'
Chart.register(...registerables, ChartDataLabels);

function AnswerChartSwitcher({ view, setView, labels, data, rawCounts, questionType, questionData, questionMemberSatificaitonMatris }) {
  const chartRef = useRef(null);
  const tableRef = useRef(null);

  const [colors, setColors] = useState([
    '#4caf50', '#2196f3', '#ff9800', '#e91e63', '#9c27b0',
    '#00bcd4', '#ffc107', '#8bc34a', '#f44336', '#607d8b',
  ]);

  const onColorChange = (index, newColor) => {
    setColors((prev) => {
      const copy = [...prev];
      copy[index] = newColor;
      return copy;
    });
  };

  const total = data.reduce((a, b) => a + b, 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Cevaplar',
        data,
        backgroundColor: colors.slice(0, data.length),
        borderRadius: 6,
        borderSkipped: false,
        datalabels: {
          color: '#111',
          anchor: 'end',
          align: 'end',
          font: { weight: '600', size: 12 },
        },
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 400 },
    plugins: {
      legend: {
        position: 'left',
        labels: { boxWidth: 16, padding: 15, color: '#111', font: { size: 14 } },
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
      },
    },
    layout: { padding: 40 },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      x: {
        grid: { display: true },
        ticks: {
          maxRotation: 45,
          autoSkip: true,
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: '#e5e7eb' },
        ticks: { font: { size: 12 } },
      },
    },
  };

  const horizontalBarOptions = {
    ...commonOptions,
    indexAxis: 'y',
    scales: {
      y: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
      x: {
        beginAtZero: true,
        grid: { color: '#e5e7eb' },
        ticks: { font: { size: 12 } },
      },
    },
  };

  const lineOptions = {
    ...commonOptions,
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 12 } } },
      y: {
        beginAtZero: true,
        grid: { color: '#e5e7eb' },
        ticks: { font: { size: 12 } },
      },
    },
    elements: {
      line: { tension: 0.3, borderWidth: 3 },
      point: { radius: 5, hoverRadius: 7 },
    },
  };

  const pieOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
    },
  };

  const handleDownload = () => {
    const node = view === 'table' ? tableRef.current : chartRef.current;
    if (!node) return;

    domtoimage
      .toPng(node, { cacheBust: true, bgcolor: '#fff' })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${questionType || 'chart'}-${view}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Görsel indirilemedi:', error);
      });
  };



  const renderTable = () => (
    <div className="overflow-x-auto w-full mt-4">
      <table
        className="min-w-[480px] w-full text-sm border border-gray-300 rounded-md"
        ref={tableRef}
        style={{ backgroundColor: '#fff' }}
      >
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700 font-semibold">
            <th className="px-3 py-2 border border-gray-300">Seçenek</th>
            <th className="px-3 py-2 border border-gray-300">Sıklık</th>
            <th className="px-3 py-2 border border-gray-300">Yüzdesi</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, i) => {
            const count = data[i];
            const percentage = total > 0 ? ((count / total) * 100).toFixed(1) + '%' : '0%';
            return (
              <tr
                key={label}
                className="hover:bg-blue-50 transition-colors cursor-default even:bg-gray-50"
              >
                <td className="px-3 py-2 border border-gray-300">{label}</td>
                <td className="px-3 py-2 border border-gray-300">{count}</td>
                <td className="px-3 py-2 border border-gray-300">{percentage}</td>
              </tr>
            );
          })}
          <tr className="bg-gray-200 font-semibold text-gray-800">
            <td className="px-3 py-2 border border-gray-300">Toplam</td>
            <td className="px-3 py-2 border border-gray-300">{total}</td>
            <td className="px-3 py-2 border border-gray-300">100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  function parseRawCounts(rawCounts) {
    const rowSet = new Set();
    const columnSet = new Set();

    Object.keys(rawCounts).forEach((key) => {
      const [rowStr, colLabel] = key.split(':').map((s) => s.trim());
      rowSet.add(rowStr);
      columnSet.add(colLabel);
    });

    const rowLabels = Array.from(rowSet).sort((a, b) => parseInt(a) - parseInt(b));
    const columnLabels = Array.from(columnSet).sort();
    const matrixData = rowLabels.map(() => columnLabels.map(() => 0));

    Object.entries(rawCounts).forEach(([key, value]) => {
      const [rowStr, colLabel] = key.split(':').map((s) => s.trim());
      const rowIdx = rowLabels.indexOf(rowStr);
      const colIdx = columnLabels.indexOf(colLabel);
      if (rowIdx !== -1 && colIdx !== -1) {
        matrixData[rowIdx][colIdx] = value.count;
      }
    });

    return { rowLabels, columnLabels, matrixData };
  }

  const renderMatrisTable = ({ rowLabels, columnLabels, matrixData }) => {
    const rowTotals = matrixData.map((row) => row.reduce((a, b) => a + b, 0));
    const columnTotals = columnLabels.map((_, colIdx) =>
      matrixData.reduce((sum, row) => sum + (row[colIdx] || 0), 0)
    );
    const grandTotal = rowTotals.reduce((a, b) => a + b, 0);

    return (
      <div className="overflow-auto w-full mt-4" style={{ maxHeight: '450px' }}>
        <table
          className="min-w-[600px] w-full text-sm border border-gray-300 rounded-md"
          ref={tableRef}
          style={{ backgroundColor: '#fff' }}
        >
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700 font-semibold">
              <th className="px-3 py-2 border border-gray-300">Satır / Sütun</th>
              {columnLabels.map((label) => (
                <th key={label} className="px-3 py-2 border border-gray-300">
                  {label}
                </th>
              ))}
              <th className="px-3 py-2 border border-gray-300">Toplam</th>
            </tr>
          </thead>
          <tbody>
            {rowLabels.map((rowLabel, i) => (
              <tr
                key={rowLabel}
                className="hover:bg-blue-50 transition-colors cursor-default even:bg-gray-50"
              >
                <td className="px-3 py-2 border border-gray-300">{rowLabel}</td>
                {matrixData[i].map((value, j) => (
                  <td key={j} className="px-3 py-2 border border-gray-300">
                    {value}
                  </td>
                ))}
                <td className="px-3 py-2 border border-gray-300 font-semibold">{rowTotals[i]}</td>
              </tr>
            ))}
            <tr className="bg-gray-200 font-semibold text-gray-800">
              <td className="px-3 py-2 border border-gray-300">Toplam</td>
              {columnTotals.map((total, idx) => (
                <td key={idx} className="px-3 py-2 border border-gray-300">
                  {total}
                </td>
              ))}
              <td className="px-3 py-2 border border-gray-300">{grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };


  const generateFullMatrixData = (rawMatrix, rowLabels, columnLabels, questionData) => {
    const rowMap = Object.fromEntries(questionData.rows.map((r, i) => [r, i]));
    const colMap = Object.fromEntries(questionData.columns.map((c, i) => [c, i]));

    const fullMatrix = questionData.rows.map(() =>
      questionData.columns.map(() => 0)
    );

    rowLabels.forEach((rowLabel, i) => {
      columnLabels.forEach((colLabel, j) => {
        const value = rawMatrix[i][j] || 0;

        const rowIndex = rowMap[rowLabel];
        const colIndex = colMap[colLabel];

        if (rowIndex !== undefined && colIndex !== undefined) {
          fullMatrix[rowIndex][colIndex] = value;
        }
      });
    });

    return fullMatrix;
  };

  const MemberSatificationRenderMatrisTable = ({ rowLabels, columnLabels, matrixData, questionData }) => {
    const fullMatrixData = generateFullMatrixData(matrixData, rowLabels, columnLabels, questionData);

    const rowTotals = fullMatrixData.map((row) => row.reduce((a, b) => a + b, 0));
    const columnTotals = questionData.columns.map((_, colIdx) =>
      fullMatrixData.reduce((sum, row) => sum + (row[colIdx] || 0), 0)
    );
    const grandTotal = columnTotals.reduce((a, b) => a + b, 0);

    const satisfactionRate = calculateSatisfactionRate(fullMatrixData, questionData.columns);

    return (
      <div className="overflow-auto w-full mt-4" style={{ maxHeight: '450px' }}>
        <table className="min-w-[600px] w-full text-sm border border-gray-300 rounded-md" style={{ backgroundColor: '#fff' }}>
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700 font-semibold">
              <th className="px-3 py-2 border border-gray-300">Satır / Sütun</th>
              {questionData.columns.map((label) => (
                <th key={label} className="px-3 py-2 border border-gray-300">
                  {label}
                </th>
              ))}
              <th className="px-3 py-2 border border-gray-300">Toplam</th>
            </tr>
          </thead>
          <tbody>
            {questionData.rows.map((rowLabel, i) => (
              <tr key={rowLabel} className="hover:bg-blue-50 transition-colors cursor-default even:bg-gray-50">
                <td className="px-3 py-2 border border-gray-300">{rowLabel}</td>
                {questionData.columns.map((_, j) => (
                  <td key={j} className="px-3 py-2 border border-gray-300">
                    {fullMatrixData[i][j]}
                  </td>
                ))}
                <td className="px-3 py-2 border border-gray-300 font-semibold">{rowTotals[i]}</td>
              </tr>
            ))}
            <tr className="bg-gray-200 font-semibold text-gray-800">
              <td className="px-3 py-2 border border-gray-300">Toplam</td>
              {columnTotals.map((total, idx) => (
                <td key={idx} className="px-3 py-2 border border-gray-300">
                  {total}
                </td>
              ))}
              <td className="px-3 py-2 border border-gray-300">{grandTotal}</td>
            </tr>
          </tbody>
        </table>

        {/* Memnuniyet oranı gösterimi */}
        <div className="text-right mt-4 text-base font-medium text-green-700">
          Genel Memnuniyet: <span className="font-bold">{satisfactionRate.toFixed(2)}%</span>
        </div>
      </div>
    );
  };

  const { rowLabels, columnLabels, matrixData } = parseRawCounts(rawCounts || {});

  return (
    <div className="p-6 max-w-screen-xl mx-auto relative z-1 bg-white rounded-lg shadow-lg">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 justify-start mb-6">
        <div className="flex gap-3 items-center flex-wrap">
          {[
            { key: 'table', icon: <FaTable size={20} />, label: 'Tablo' },
            { key: 'pie', icon: <FaChartPie size={20} />, label: 'Pasta Grafik' },
            { key: 'bar', icon: <PiChartBarDuotone size={20} />, label: 'Dikey Bar' },
            { key: 'horizantalbar', icon: <PiChartBarHorizontalDuotone size={20} />, label: 'Yatay Bar' },
            { key: 'line', icon: <PiChartLine size={20} />, label: 'Çizgi Grafik' },
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`p-2 rounded-md hover:bg-gray-100 transition ${view === key ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600'
                }`}
              aria-label={label}
              title={label}
              type="button"
            >
              {icon}
            </button>
          ))}

          <button
            onClick={handleDownload}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
            aria-label="İndir"
            title="Grafik veya tabloyu indir"
            type="button"
          >
            <FaDownload size={20} />
          </button>
        </div>

        <div className="flex-1 min-w-[160px] overflow-x-auto">
          <ColorPickerRow colors={colors} onColorChange={onColorChange} />
        </div>
      </div>

      {/* Grafik veya Tablo */}
      <div className='flex justify-center'>
        <div
          className={`relative rounded-lg bg-white
    ${view === 'table' ? 'max-h-[600px] overflow-auto min-w-full' : 'flex justify-center items-center'}`}
          style={{
            height: '30vw',
            width: '80vw',
            overflow: 'visible', // dışa taşan datalabels görünsün
          }}
          ref={view === 'table' ? tableRef : chartRef}
        >
          {view !== 'table' && (
            <>
              {view === 'bar' && <Bar data={chartData} options={barOptions} />}
              {view === 'horizantalbar' && <Bar data={chartData} options={horizontalBarOptions} />}
              {view === 'line' && <Line data={chartData} options={lineOptions} />}
              {view === 'pie' && <Pie data={chartData} options={pieOptions} />}
            </>
          )}
          {view === 'table' && (
            <>
              {questionType === 'Matris'
                ? questionMemberSatificaitonMatris ? MemberSatificationRenderMatrisTable({ rowLabels, columnLabels, matrixData, questionData }) : renderMatrisTable({ rowLabels, columnLabels, matrixData })
                : renderTable()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnswerChartSwitcher;
