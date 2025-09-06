import React, { useState } from "react";
import { FaTable, FaChartPie, FaDownload } from "react-icons/fa";
import {
  PiChartBarDuotone,
  PiChartBarHorizontalDuotone,
  PiChartLine,
} from "react-icons/pi";
import ColorPickerRow from "../ColorPickerRow";
import ChartRenderer from "./ChartRenderer";
import TableRenderer from "./TableRenderer";
import useDownload from "./hooks/useDownload";

function AnswerChartSwitcher({
  view,
  setView,
  labels,
  data,
  questionType,
  rawCounts,
  questionMemberSatificaitonMatris,
  tableData,
}) {
  const [colors, setColors] = useState([
    "#4caf50",
    "#2196f3",
    "#ff9800",
    "#e91e63",
    "#9c27b0",
    "#00bcd4",
    "#ffc107",
    "#8bc34a",
    "#f44336",
    "#607d8b",
  ]);

  const handleColorChange = (index, color) => {
    const copy = [...colors];
    copy[index] = color;
    setColors(copy);
  };

  const { handleDownload, chartRef, tableRef } = useDownload(
    view,
    questionType,
  );

  return (
    <div className="p-6 max-w-screen-xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Kontroller */}
      <div className="flex flex-wrap items-center gap-3 justify-start mb-6">
        {[
          { key: "table", icon: <FaTable />, label: "Tablo" },
          { key: "pie", icon: <FaChartPie />, label: "Pasta" },
          { key: "bar", icon: <PiChartBarDuotone />, label: "Dikey Bar" },
          {
            key: "horizantalbar",
            icon: <PiChartBarHorizontalDuotone />,
            label: "Yatay Bar",
          },
          { key: "line", icon: <PiChartLine />, label: "Çizgi" },
        ].map(({ key, icon, label }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`p-2 rounded-md hover:bg-gray-100 transition ${view === key ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-600"}`}
          >
            {icon}
          </button>
        ))}

        <button
          onClick={handleDownload}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
        >
          <FaDownload size={20} />
        </button>

        <div className="flex-1 min-w-[160px] overflow-x-auto">
          <ColorPickerRow colors={colors} onColorChange={handleColorChange} />
        </div>
      </div>

      {/* İçerik */}
      {view !== "table" ? (
        <ChartRenderer
          ref={chartRef}
          view={view}
          labels={labels}
          data={data}
          colors={colors}
        />
      ) : (
        <TableRenderer
          ref={tableRef}
          labels={labels}
          data={data}
          total={data.reduce((a, b) => a + b, 0)}
          questionType={questionType}
          rawCounts={rawCounts}
          tableData={tableData}
          questionMemberSatificaitonMatris={questionMemberSatificaitonMatris}
        />
      )}
    </div>
  );
}

export default AnswerChartSwitcher;
