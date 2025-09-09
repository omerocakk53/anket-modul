import React from "react";

export default function Tooltip({ children, text }) {
  return (
    <div className="relative inline-block items-center justify-center group ">
      {children}
      <div className="absolute mt-2 bg-black text-white text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        {text}
      </div>
    </div>
  );
}
