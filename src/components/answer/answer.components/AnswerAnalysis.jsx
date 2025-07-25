import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import getAnswerCounts from '../analysis/hooks/getanswerCounts'; 
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables, ChartDataLabels);
Chart.register(...registerables);

const COLORS = [
    '#4caf50', '#2196f3', '#ff9800', '#e91e63', '#9c27b0', '#00bcd4', '#ffc107', '#8bc34a', '#f44336', '#607d8b'
];

function VerticalBarChart({ data, rawCounts }) {
    const canvasRef = useRef(null);
    useEffect(() => {
        if (!data || Object.keys(data).length === 0) return;
        const ctx = canvasRef.current.getContext('2d');
        if (canvasRef.current.chartInstance) {
            canvasRef.current.chartInstance.destroy();
        }
        const labels = Object.keys(data);
        const counts = Object.values(data);
        const backgroundColors = labels.map((_, i) => COLORS[i % COLORS.length]);
        const chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Cevaplar',
                    data: counts,
                    backgroundColor: backgroundColors,
                }]
            },
            options: {
                indexAxis: 'x',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            title: (tooltipItems) => tooltipItems[0].label,
                            label: (tooltipItem) => {
                                const label = tooltipItem.label;
                                const users = rawCounts[label]?.users || [];
                                if (users.length === 0) return 'Cevap yok';
                                return users.map(u =>
                                    `${u.user} (${new Date(u.date).toLocaleString()})`
                                );
                            }
                        }
                    },
                    datalabels: {
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 12
                        },
                        align: 'start',
                        offset: -5,
                        formatter: (value) => value
                    }
                },
                scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true, precision: 0 }
                }
            }
        });
        canvasRef.current.chartInstance = chartInstance;
        return () => chartInstance.destroy();
    }, [data, rawCounts]);
    if (!data || Object.keys(data).length === 0) return <div>Cevap yok</div>;
    return <canvas ref={canvasRef} height={200} />;
}

function AnswerAnalysis({ survey, answers }) {
    if (!survey?.items || !Array.isArray(answers)) return null;
    const analyzableTypes = [
        'MultipleChoice',
        'Dropdown',
        'ImageChoice',
        'Scale',
        'Rating',
        'Numeric',
        'Matris',
    ];
    console.log(
        survey.items
            .filter(q => analyzableTypes.includes(q.type))
            .map((question) => {
                const { counts, rawCounts } = getAnswerCounts(question, answers);
                return (
                    <div
                        className="p-4 rounded shadow-md mx-auto"
                        key={question.id}
                        style={{
                            marginBottom: 32,
                            maxWidth: 600,
                            width: '100%',
                            boxSizing: 'border-box'
                        }}
                    >
                        <h4>
                            {question.type} - {question.title}
                        </h4>
                        <div style={{ width: '100%', height: '37%' }}>
                            <VerticalBarChart data={counts} rawCounts={rawCounts} />
                        </div>
                    </div>
                );
            })
    )

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-3xl font-bold mb-3 text-gray-900 text-center">Cevap Analizi</h2>
            <div className="flex flex-wrap items-center justify-center">
                {survey.items
                    .filter(q => analyzableTypes.includes(q.type))
                    .map((question) => {
                        const { counts, rawCounts } = getAnswerCounts(question, answers);
                        return (
                            <div
                                className="p-4 rounded shadow-md mx-auto"
                                key={question.id}
                                style={{
                                    marginBottom: 32,
                                    maxWidth: 600,
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}
                            >
                                <h4>
                                    {question.type} - {question.title}
                                </h4>
                                <div style={{ width: '100%', height: '37%' }}>
                                    <VerticalBarChart data={counts} rawCounts={rawCounts} />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default AnswerAnalysis;