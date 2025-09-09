import React from "react";
import { FiHelpCircle } from "react-icons/fi";

export default function ActiveToggle({ active, setActive }) {
  const handleActiveToggle = () => {
    setActive((prev) => {
      if (prev === "active") return "passive";
      if (prev === "passive") return null;
      return "active";
    });
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleActiveToggle}
        className={`px-3 py-1 text-sm border rounded-lg transition 
          ${
            active === "active"
              ? "hover:text-primary-text text-success border-success hover:bg-success"
              : active === "passive"
                ? "hover:text-primary-text text-danger border-danger hover:bg-danger"
                : "hover:text-primary-text text-primary border-primary hover:bg-primary"
          }`}
      >
        <span>
          {active === "active"
            ? "Aktif Anketler"
            : active === "passive"
              ? "Pasif Anketler"
              : "Tüm Anketler"}
        </span>
      </button>

      <div className="relative -left-12 -top-10 group">
        <button
          className={`btn btn-ghost btn-circle hover:text-primary animate-pulse ${
            active === "active"
              ? "text-success border-success"
              : active === "passive"
                ? "text-danger border-danger"
                : "text-primary border-primary"
          }`}
        >
          <FiHelpCircle size={18} />
        </button>
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50">
          <span>
            {active === "active"
              ? "Aktif Anketleri Listele"
              : active === "passive"
                ? "Pasif Anketleri Listele"
                : "Tüm Anketleri Listele"}
          </span>
        </div>
      </div>
    </div>
  );
}
