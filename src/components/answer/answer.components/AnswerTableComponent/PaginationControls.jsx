import React from 'react';
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';

const PaginationControls = ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center my-6 gap-4">
      {/* Sayfalama Butonları */}
      <div className="flex items-center flex-wrap gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          <FiChevronsLeft />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          <FiChevronLeft />
        </button>

        <span className="text-sm font-medium px-2 text-gray-700">
          Sayfa <span className="font-semibold">{currentPage}</span> / {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          <FiChevronRight />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          <FiChevronsRight />
        </button>
      </div>

      {/* Sayfa Boyutu Seçimi */}
      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-600 font-medium">
          Sayfa başına:
        </label>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-gray-300 px-2 py-1 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          {[10, 20, 30, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PaginationControls;
