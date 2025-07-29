import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { tr } from 'date-fns/locale';
import { FiCalendar, FiXCircle } from 'react-icons/fi';
const DateFilter = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };
  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-md p-5 mx-auto max-w-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiCalendar className="text-blue-500 text-xl" />
          <h3 className="font-semibold text-lg text-gray-700">Tarih Filtreleme</h3>
        </div>
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors text-sm font-medium"
        >
          <FiXCircle />
          Temizle
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
            Başlangıç
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            locale={tr}
            dateFormat="dd/MM/yyyy"
            placeholderText="Başlangıç tarihi"
            className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
            Bitiş
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            locale={tr}
            dateFormat="dd/MM/yyyy"
            placeholderText="Bitiş tarihi"
            className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
