import React, { useState, useEffect } from "react";

const DateSelector = ({ handleDateChange, initialPeriods = {} }) => {
  const [periods, setPeriods] = useState({
    startDate1: "",
    endDate1: "",
    startDate2: "",
    endDate2: "",
    ...initialPeriods,
  });

  useEffect(() => {
    handleDateChange({
      surveyPeriod1: {
        startDate: periods.startDate1,
        endDate: periods.endDate1,
      },
      surveyPeriod2: {
        startDate: periods.startDate2,
        endDate: periods.endDate2,
      },
    });
  }, [periods]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPeriods((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-6 max-w-md">
      {/* Periyot 1 */}
      <div>
        <div className="mb-2 font-semibold text-gray-700">Periyot 1</div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Başlangıç
            </label>
            <input
              type="date"
              name="startDate1"
              value={periods.startDate1}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bitiş
            </label>
            <input
              type="date"
              name="endDate1"
              value={periods.endDate1}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
      </div>
      {/* Periyot 2 */}
      <div>
        <div className="mb-2 font-semibold text-gray-700">Periyot 2</div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Başlangıç
            </label>
            <input
              type="date"
              name="startDate2"
              value={periods.startDate2}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bitiş
            </label>
            <input
              type="date"
              name="endDate2"
              value={periods.endDate2}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
