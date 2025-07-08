import React, { useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const AnswerGraph = ({ data, onContentDisplay, onDelete }) => {
    const chartRef = useRef(null);
    const [contextMenu, setContextMenu] = useState(null);

    const chartData = {
        labels: data.map((item) => item.userName || item._id),
        datasets: [
            {
                label: 'Cevaplanan Soru Sayısı',
                data: data.map((item) => item.answers.length),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {

        scales: {
            x: {
                stacked: true,
                grid: { display: false },
                title: { display: true, text: 'Cevaplayan Kullanıcılar' },
                ticks: { autoSkip: false, maxRotation: 180, minRotation: 45 }
            },
            y: {
                title: { display: true, text: 'Soru Sayısı' },
                ticks: { stepSize: 1, beginAtZero: true }
            }
        }
    };
    document.addEventListener('click', function (event) {
        setContextMenu(null);
    });
    const handleContextMenu = (event) => {
        event.preventDefault();

        const chart = chartRef.current;
        if (!chart) return;

        const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);

        if (!elements.length) {
            setContextMenu(null);
            return;
        }

        const index = elements[0].index;
        const selectedItem = data[index];

        setContextMenu({
            x: event.nativeEvent.offsetX,
            y: event.nativeEvent.offsetY,
            item: selectedItem
        });
    };

    return (
        <div className="relative p-4 bg-white rounded shadow-md">
            <h2 className="text-3xl font-bold mb-10 text-gray-900 text-center">Cevap Grafiği</h2>

            <div onContextMenu={handleContextMenu} className="relative">
                <Bar
                    ref={chartRef}
                    width={100}
                    height={50}
                    className="mb-4"
                    data={chartData}
                    options={chartOptions}
                />
            </div>

            {contextMenu && (
                <div
                    className="absolute grid gap-2 bg-white border rounded shadow p-2 text-sm"
                    style={{ top: contextMenu.y, left: contextMenu.x, zIndex: 50 }}
                >
                    <p className="font-bold">{contextMenu.item.userName}</p>
                    <button
                        className="p-2 block rounded-sm bg-primary text-primary-text hover:bg-primary-dark font-bold "
                        onClick={() => {
                            onContentDisplay(contextMenu.item);
                            setContextMenu(null);
                        }}
                    >
                        Cevapları Gör
                    </button>
                    <button
                        className="p-2 block rounded-sm bg-danger hover:bg-danger-dark text-primary-text font-bold "
                        onClick={() => {
                            onDelete(contextMenu.item._id);
                            setContextMenu(null);
                        }}
                    >
                        Sil
                    </button>
                </div>
            )}
        </div>
    );
};

export default AnswerGraph;
