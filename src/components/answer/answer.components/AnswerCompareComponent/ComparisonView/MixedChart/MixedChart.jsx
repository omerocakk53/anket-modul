import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

function MixedChart({ item, ItemTip, color = ['#60a5fa', '#34d399'], ChartType = "bar", ref }) {
  if (!Array.isArray(item)) return null;

  // İlgili itemId'ye göre veriyi bul
  const dataItem = item.find(d => d.itemId === ItemTip);
  if (!dataItem) return null;

  let chartData = [];

  if (dataItem.changes) {
    // Kullanıcı bazlı değişim varsa, onları gösterelim
    chartData = dataItem.changes.map((ch) => ({
      name: ch.userName,
      period1: ch.period1Value ?? 0,
      period2: ch.period2Value ?? 0,
    }));
  } else {
    // Aggregate ise, periyot değerleri:
    chartData = [
      { name: "Periyot 1", value: dataItem.period1Value ?? 0 },
      { name: "Periyot 2", value: dataItem.period2Value ?? 0 },
    ];
  }

  switch (ChartType) {
    case "pie":
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey={dataItem.changes ? "period2" : "value"}
              nameKey={dataItem.changes ? "name" : "name"}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill={color[0]}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={color[index % color.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );

    case "line":
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataItem.changes ? "name" : "name"} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={dataItem.changes ? "period1" : "value"} stroke={color[0]} />
            <Line type="monotone" dataKey={dataItem.changes ? "period2" : "value"} stroke={color[1]} />
          </LineChart>
        </ResponsiveContainer>
      );

    case "horizantalbar":
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey={dataItem.changes ? "name" : "name"} />
            <Tooltip />
            <Bar dataKey={dataItem.changes ? "period1" : "value"} fill={color[0]} />
            <Bar dataKey={dataItem.changes ? "period2" : "value"} fill={color[1]} />
          </BarChart>
        </ResponsiveContainer>
      );

    case "bar":
    default:
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataItem.changes ? "name" : "name"} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataItem.changes ? "period1" : "value"} fill={color[0]} />
            <Bar dataKey={dataItem.changes ? "period2" : "value"} fill={color[1]} />
          </BarChart>
        </ResponsiveContainer>
      );
  }
}

export default MixedChart;
