import React, { useState, useRef, useEffect } from "react";
import { FiTag, FiChevronDown } from "react-icons/fi";

export default function SearchModeDropdown({
  searchMode,
  setSearchMode,
  toast,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectMode = (mode) => {
    setSearchMode(mode);
    toast(`Arama modu:
        ${mode === "title" ? "Başlık araması" : "Etiket araması"}`);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-1.5 text-sm border border-primary-light text-primary-darktext rounded-lg hover:bg-primary-dark hover:text-primary-text transition"
      >
        <FiTag className="w-4 h-4" />
        {searchMode === "title" ? "Başlık" : "Etiket"}
        <FiChevronDown className="w-4 h-4 ml-1" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-primary-light rounded-md shadow-lg z-10">
          <button
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary-light hover:text-primary-text ${searchMode === "title" ? "font-bold bg-primary-light text-primary-text" : ""}`}
            onClick={() => handleSelectMode("title")}
          >
            Başlık
          </button>
          <button
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary-light hover:text-primary-text ${searchMode === "tags" ? "font-bold bg-primary-light text-primary-text" : ""}`}
            onClick={() => handleSelectMode("tags")}
          >
            Etiket
          </button>
        </div>
      )}
    </div>
  );
}
