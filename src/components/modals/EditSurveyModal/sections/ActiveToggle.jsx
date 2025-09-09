import React from "react";

export default function ActiveToggle({ active, setActive }) {
  return (
    <div className="flex items-center space-x-3">
      <label
        className="text-sm font-medium text-primary-dark select-none cursor-pointer"
        onClick={() => setActive(!active)}
      >
        Anket Aktif mi?
      </label>
      <button
        type="button"
        aria-pressed={active}
        onClick={() => setActive(!active)}
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
          active ? "bg-primary" : "bg-neutral-light"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
            active ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
