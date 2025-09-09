import React from "react";

export default function ActiveToggle({ active, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`relative px-2 py-1 rounded-lg cursor-pointer border transition-colors select-none
        ${active ? "bg-success/10 border-success text-success" : "bg-danger/10 border-danger text-danger"}`}
    >
      <span className="text-sm font-medium flex items-center gap-1">
        {active ? "Aktif" : "Pasif"}
      </span>
    </div>
  );
}
