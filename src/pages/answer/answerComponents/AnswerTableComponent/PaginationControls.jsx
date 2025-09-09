import React from "react";
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";

const PaginationControls = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const buttonClass = (disabled) =>
    `flex items-center justify-center w-9 h-9 rounded-lg border text-gray-600 shadow-sm
     transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 
     ${disabled ? "opacity-40 cursor-not-allowed" : "bg-white"}`;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center my-6 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      {/* Sayfalama Butonları */}
      <div className="flex items-center flex-wrap gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={buttonClass(currentPage === 1)}
        >
          <FiChevronsLeft />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={buttonClass(currentPage === 1)}
        >
          <FiChevronLeft />
        </button>

        <span className="text-sm font-medium px-2 text-gray-700 bg-gray-50 py-1 rounded-lg border border-gray-200">
          Sayfa <span className="font-semibold">{currentPage}</span> /{" "}
          {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={buttonClass(currentPage === totalPages)}
        >
          <FiChevronRight />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={buttonClass(currentPage === totalPages)}
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
          className="border border-gray-300 px-3 py-1.5 rounded-lg shadow-sm bg-white 
          focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none text-sm"
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
