import React from "react";

export default function ToolbarButton({ onClick, isActive, children, title }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-200 ${
        isActive ? "bg-blue-100 text-blue-600" : ""
      }`}
      title={title}
    >
      {children}
    </button>
  );
}
