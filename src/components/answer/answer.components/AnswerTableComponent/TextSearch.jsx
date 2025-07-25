// components/TextSearch.jsx
import React from 'react';
import { FiSearch } from "react-icons/fi";

const TextSearch = ({ searchText, setSearchText }) => {
  return (
    <div className="my-4">
      <div className="relative w-full">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
        <input
          type="text"
          placeholder="Ara..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        />
      </div>
    </div>
  );
};


export default TextSearch;
