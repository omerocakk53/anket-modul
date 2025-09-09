import React from "react";
import { FiHelpCircle } from "react-icons/fi";

export default function SurveyHeader({
  title,
  description,
  active,
  handleActiveSurvey,
}) {
  return (
    <div>
      <h3 className="text-xl font-bold text-neutral-darkest truncate">
        {title}
      </h3>
      <h3 className="text-sm text-neutral-darkest truncate">{description}</h3>
      <div className="flex items-center justify-start gap-3">
        <div
          onClick={handleActiveSurvey}
          className={`relative w-12 h-6 flex items-center justify-center rounded-lg cursor-pointer border transition-colors ${active ? "bg-success/10 border-success" : "bg-danger/10 border-danger"}`}
        >
          <div
            className={`absolute flex items-center justify-center transition-all duration-300 w-10 ${active ? "text-success" : "text-danger"}`}
          >
            <span className="flex items-center justify-center gap-1 text-sm">
              {active ? "Aktif" : "Pasif"}
            </span>
          </div>
        </div>
        <div className="relative inline-block group">
          <button className="btn btn-ghost btn-circle text-neutral-dark hover:text-primary mt-2 animate-pulse">
            <FiHelpCircle size={20} />
          </button>

          <div className="absolute -top-5 -right-5 bg-black text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50">
            Durumu Değiştirmek İçin Tıklayınız
          </div>
        </div>
      </div>
    </div>
  );
}
