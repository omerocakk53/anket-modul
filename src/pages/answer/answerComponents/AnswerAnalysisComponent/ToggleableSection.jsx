import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function ToggleableSection({ title, children, isVisible, onToggle }) {
  const sectionId = `toggle-section-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    // ToggleableSection.jsx içinde
    <section
      className="border border-gray-200 rounded-lg shadow-lg mb-6 w-full max-w-full"
      aria-labelledby={sectionId + "-header"}
      role="region"
    >
      <button
        type="button"
        id={sectionId + "-header"}
        aria-expanded={isVisible}
        onClick={onToggle}
        className="w-full bg-gray-100 p-3 flex justify-between items-center cursor-pointer
               rounded-t-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <h4 className="text-base md:text-lg font-semibold select-none">
          {title}
        </h4>
        <span className="text-lg" aria-hidden="true">
          {isVisible ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </span>
      </button>
      {isVisible && (
        <div
          className="p-6 bg-white rounded-b-lg border-t border-gray-200"
          style={{ minWidth: "600px", maxWidth: "100%", overflowX: "auto" }}
        >
          {children}
        </div>
      )}
    </section>
  );
}

export default ToggleableSection;
