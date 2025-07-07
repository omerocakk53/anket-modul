import React from "react";

const chartTypes = [
  { id: "bar", label: "Bar Grafik" },
  { id: "line", label: "Çizgi Grafik" },
  { id: "pie", label: "Pasta Grafik" },
];

export default function ChartSelector({ chartType, setChartType }) {
  return (
    <div className="mb-6 flex flex-col items-start">
      <label className="block font-semibold mb-2">Grafik Tipi:</label>
      <div className="flex gap-4 flex-wrap items-center">
        {chartTypes.map((type) => (
          <label key={type.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="chartType"
              value={type.id}
              checked={chartType === type.id}
              onChange={() => setChartType(type.id)}
            />
            {type.label}
          </label>
        ))}
      </div>
    </div>
  );
}
