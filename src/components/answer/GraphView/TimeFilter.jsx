import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { tr } from "date-fns/locale";

const groupByOptions = [
  { value: "daily", label: "Günlük" },
  { value: "weekly", label: "Haftalık" },
  { value: "monthly", label: "Aylık" },
];

export default function TimeFilter({ dateRange, setDateRange, groupBy, setGroupBy }) {
  const ranges = [
    {
      startDate: dateRange.startDate || new Date(),
      endDate: dateRange.endDate || new Date(),
      key: "selection",
    },
  ];

  return (
    <div className="mt-6 flex flex-col md:flex-row md:items-center md:gap-8">
      <div>
        <label className="block font-semibold mb-2">Tarih Aralığı Seçiniz:</label>
        <DateRange
          ranges={ranges}
          onChange={(item) => {
            setDateRange({
              startDate: item.selection.startDate,
              endDate: item.selection.endDate,
            });
          }}
          locale={tr}
          maxDate={new Date()}
          rangeColors={["#3b82f6"]}
          showMonthAndYearPickers={true}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
        />
      </div>
      <div className="mt-4 md:mt-0">
        <label className="block font-semibold mb-2">Gruplama:</label>
        <select
          className="p-2 border rounded"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
        >
          {groupByOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
