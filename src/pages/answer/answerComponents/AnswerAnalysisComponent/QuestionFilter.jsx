import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiSearch, FiCalendar, FiXCircle } from "react-icons/fi";
import { tr } from "date-fns/locale";
import { AiOutlineClose } from "react-icons/ai";

function QuestionFilter({
  searchTerm,
  setSearchTerm,
  dateRange,
  setDateRange,
}) {
  const clearFilters = () => {
    setSearchTerm("");
    setDateRange([null, null]);
  };
  return (
    <div className="flex flex-col gap-6 mb-5 max-w-xl">
      <div className="relative flex items-center w-full">
        <FiSearch
          className={`absolute left-3 text-lg transition-colors duration-200 ${
            searchTerm ? "text-blue-500" : "text-gray-400"
          }`}
        />
        <input
          type="text"
          placeholder="Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10 py-2 w-full rounded-xl border border-gray-300 bg-white
                 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                 focus:border-blue-500 transition-colors duration-200
                 hover:shadow-md placeholder-gray-400 text-gray-700"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 text-gray-400 hover:text-red-500 transition-colors"
          >
            <AiOutlineClose />
          </button>
        )}
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-blue-500 text-xl" />
            <h3 className="font-semibold text-lg text-gray-700">
              Tarih Filtreleme
            </h3>
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
              locale={tr}
              selected={dateRange[0]}
              onChange={(date) => setDateRange([date, dateRange[1]])}
              selectsStart
              startDate={dateRange[0]}
              endDate={dateRange[1]}
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
              locale={tr}
              selected={dateRange[1]}
              onChange={(date) => setDateRange([dateRange[0], date])}
              selectsEnd
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              placeholderText="Bitiş tarihi"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionFilter;
