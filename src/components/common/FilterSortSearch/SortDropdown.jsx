import React, { useState, useRef, useEffect } from "react";
import { FiList, FiChevronDown } from "react-icons/fi";

export default function SortDropdown({ sortBy, setSortBy, toast }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortChange = (field) => {
    setSortBy(field);
    toast(
      `Sıralama: ${
        field === "title"
          ? "Başlık"
          : field === "tags"
            ? "Etiket"
            : "Oluşturulma Tarihi"
      }`,
    );
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-1.5 text-sm border border-secondary rounded-lg hover:bg-secondary hover:text-primary-text transition"
      >
        <FiList className="w-4 h-4" />
        Sırala
        <FiChevronDown className="w-4 h-4 ml-1" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-secondary-light rounded-md shadow-lg z-10">
          <button
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary-light hover:text-primary-text ${sortBy === "title" ? "font-bold bg-secondary-light text-primary-text" : ""}`}
            onClick={() => handleSortChange("title")}
          >
            Başlığa Göre
          </button>
          <button
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary-light hover:text-primary-text ${sortBy === "tags" ? "font-bold bg-secondary-light text-primary-text" : ""}`}
            onClick={() => handleSortChange("tags")}
          >
            Etikete Göre
          </button>
          <button
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary-light hover:text-primary-text ${sortBy === "createTime" ? "font-bold bg-secondary-light text-primary-text" : ""}`}
            onClick={() => handleSortChange("createTime")}
          >
            Oluşturulma Tarihine Göre
          </button>
        </div>
      )}
    </div>
  );
}
