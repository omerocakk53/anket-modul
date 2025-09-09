import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchInput({ searchText, onSearchChange }) {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        value={searchText}
        onChange={onSearchChange}
        placeholder="Ara..."
        className="w-full pl-10 pr-4 py-2 text-sm border border-neutral rounded-lg shadow-md border-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-neutral-darkest"
      />
      <FiSearch className="absolute left-3 top-[25px] transform -translate-y-1/2 text-primary w-4 h-4" />
    </div>
  );
}
