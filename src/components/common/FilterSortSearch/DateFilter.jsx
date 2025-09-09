import React, { useState, useRef, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { DateRange } from "react-date-range";
import { tr } from "date-fns/locale"; // Türkçe locale'i import et
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateFilter({ dateRange, setDateRange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleRangeChange = (ranges) => {
    const { selection } = ranges;
    setDateRange({
      startDate: selection.startDate,
      endDate: selection.endDate,
    });
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("tr-TR");
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 border border-primary text-primary-darktext hover:bg-primary hover:text-primary-text transition w-full justify-center text-sm rounded-lg"
      >
        <FiCalendar className="w-5 h-5" />
        {dateRange.startDate && dateRange.endDate
          ? `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`
          : "Tarih Aralığı Seç"}
      </button>

      {open && (
        <div
          ref={ref}
          className="absolute top-full mt-2 z-20 shadow-lg rounded-lg"
        >
          <DateRange
            editableDateInputs={true}
            onChange={handleRangeChange}
            moveRangeOnFirstSelection={false}
            ranges={[
              {
                startDate: dateRange.startDate || new Date(),
                endDate: dateRange.endDate || new Date(),
                key: "selection",
              },
            ]}
            locale={tr}
            maxDate={new Date()}
            className="shadow-md rounded-md"
          />
        </div>
      )}
    </div>
  );
}
