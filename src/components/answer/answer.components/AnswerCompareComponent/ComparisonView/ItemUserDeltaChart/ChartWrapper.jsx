import React from "react";
import { Bar, Pie, Line } from 'react-chartjs-2';
import { getChartOptions, pieOptions } from "./chartOptions";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

function ChartWrapper({ itemData, ChartType, color, ref }) {
    const barData = {
        labels: ["Periyot 1", "Periyot 2"],
        datasets: [
            {
                label: 'Değerler',
                data: [itemData.period1Percent, itemData.period2Percent],
                backgroundColor: [color[0] || "#34d399", color[1] || "#60a5fa"],
                borderRadius: 6,
                borderWidth: 1,
                barThickness: ChartType === "bar" ? 40 : 30,
            },
        ],
    };

    const lineData = {
        labels: ["Periyot 1", "Periyot 2"],
        datasets: [
            {
                label: itemData.itemTitle,
                data: [itemData.period1Percent, itemData.period2Percent],
                fill: false,
                borderColor: color[0] || "#34d399",
                backgroundColor: color[1] || "#34d399",
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };


    return (
        <>
            <div ref={ref} className="flex justify-center w-full p-5">
                <div
                    className={`p-6 mb-8 w-full max-w-screen-xl ${ChartType === 'table' ? 'max-h-[600px] overflow-auto' : 'flex flex-col justify-center items-start'}`}
                    style={{
                        height: '32vw',
                        overflow: 'visible',
                    }}
                >
                    {ChartType !== 'table' && (<div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            {itemData.itemTitle}
                        </h3>
                        <p className="text-sm  mt-1">
                            Değişim:{" "}
                            <span
                                className={
                                    itemData.changePercent > 0
                                        ? "text-green-500"
                                        : itemData.changePercent < 0
                                            ? "text-red-500"
                                            : ""
                                }
                            >
                                {itemData.changePercent.toFixed(1)}%
                            </span>
                        </p>
                    </div>)}

                    {ChartType !== 'table' ? (
                        <>
                            {ChartType === "bar" && <Bar data={barData} options={getChartOptions("bar")} />}
                            {ChartType === "horizantalbar" && <Bar data={barData} options={getChartOptions("horizantalbar")} />}
                            {ChartType === "pie" && <Pie data={barData} options={pieOptions} />}
                            {ChartType === "line" && <Line data={lineData} options={getChartOptions("line")} />}
                        </>
                    ) : (
                        <div
                            className="rounded-xl border bg-gray-50 p-4 shadow-sm space-y-2"
                        >
                            <h3 className="text-md font-semibold text-gray-700 mb-2">
                                {itemData.itemTitle} ({itemData.itemType})
                            </h3>
                            <div className="overflow-x-auto">
                                <table ref={ref} className="min-w-full text-sm text-gray-700">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-3 py-2 text-left border">Kategori</th>
                                            <th className="px-3 py-2 text-left border">Değer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-3 py-2 border">Periyot 1</td>
                                            <td className="flex justify-center items-center px-3 py-2 border">{parseFloat(itemData.period1Percent).toFixed(1)}%</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 border">Periyot 2</td>
                                            <td className="flex justify-center items-center px-3 py-2 border">{parseFloat(itemData.period2Percent).toFixed(1)}%</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 border">Değişim</td>
                                            <td className="flex justify-center items-center px-3 py-2 border">
                                                <span
                                                    className={
                                                        itemData.changePercent > 0
                                                            ? "text-green-500"
                                                            : itemData.changePercent < 0
                                                                ? "text-red-500"
                                                                : ""
                                                    }
                                                >
                                                    {parseFloat(itemData.changePercent).toFixed(1)}%
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ChartWrapper;