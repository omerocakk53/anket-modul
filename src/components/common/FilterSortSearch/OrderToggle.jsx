import React from "react";

export default function OrderToggle({ sortOrder, setSortOrder }) {
  const handleOrderToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="relative w-full max-w-md">
      <button
        onClick={handleOrderToggle}
        className={`flex items-center gap-1 px-3 py-1.5 text-sm border rounded-lg transition
      ${
        sortOrder === "asc"
          ? "hover:text-primary-text text-success border-success hover:bg-success/80"
          : "hover:text-primary-text text-danger border-danger hover:bg-danger/80"
      }`}
      >
        {sortOrder === "asc" ? "Artan ↑" : "Azalan ↓"}
      </button>
    </div>
  );
}
