import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiSearch } from 'react-icons/fi';
import { tr } from 'date-fns/locale';

function QuestionFilter({ searchTerm, setSearchTerm, dateRange, setDateRange }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
        <input
          type="text"
          placeholder="Ara..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        />
      </div>
      <div className="my-4 p-4 border border-gray-200 rounded-2xl shadow-sm bg-white max-w-xl h-[160px]">
        <h3 className="font-semibold text-lg mb-3 text-gray-700">Tarih Filtreleme</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Başlangıç Tarihi
            </label>
            <DatePicker
              locale={tr}
              selected={dateRange[0]}
              onChange={date => setDateRange([date, dateRange[1]])}
              selectsStart
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              placeholderText="Başlangıç"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Bitiş Tarihi
            </label>
            <DatePicker
              locale={tr}
              selected={dateRange[1]}
              onChange={date => setDateRange([dateRange[0], date])}
              selectsEnd
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              placeholderText="Bitiş"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionFilter;
