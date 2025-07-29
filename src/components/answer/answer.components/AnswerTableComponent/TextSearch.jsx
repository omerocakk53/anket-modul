import React from 'react';
import { FiSearch } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";

const TextSearch = ({ searchText, setSearchText }) => {
  return (
    <div className="my-4 mx-auto max-w-xl">
      <div className="relative flex items-center w-full ">
        <FiSearch 
          className={`absolute left-3 text-lg transition-colors duration-200 
                      ${searchText ? 'text-blue-500' : 'text-gray-400'}`} 
        />
        <input
          type="text"
          placeholder="Ara..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="pl-10 pr-10 py-2 w-full rounded-xl border border-gray-200 bg-white 
                     shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 
                     focus:border-blue-400 transition-all duration-200 
                     hover:shadow-md placeholder-gray-400 text-gray-700"
        />
        {searchText && (
          <button
            onClick={() => setSearchText('')}
            className="absolute right-3 text-gray-400 hover:text-red-500 transition-colors"
          >
            <AiOutlineClose />
          </button>
        )}
      </div>
    </div>
  );
};

export default TextSearch;
