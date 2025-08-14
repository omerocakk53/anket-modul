import React from "react";
import { FiCheckCircle, FiHelpCircle, FiXCircle } from "react-icons/fi";

export default function SurveyHeader({ title, description, active, handleActiveSurvey }) {
    return (
        <div>
            <style>
                {`.custom-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.custom-tooltip-text {
  position: absolute;
  bottom: -35px; 
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out;
  z-index: 50;
}

.custom-tooltip-wrapper:hover .custom-tooltip-text {
  opacity: 1;
  visibility: visible;
}`}
            </style>
            <h3 className="text-xl font-bold text-neutral-darkest truncate">{title}</h3>
            <h3 className="text-sm text-neutral-darkest truncate">{description}</h3>
            <div className="flex items-center gap-3">
                <div
                    onClick={handleActiveSurvey}
                    className={`relative w-12 h-6 flex items-center rounded-full cursor-pointer border transition-colors
                    ${active ? 'bg-success/10 border-success' : 'bg-danger/10 border-danger'}`}>
                    <div
                        className={`absolute top-0.5 w-5 h-4 rounded-full flex items-center justify-center transition-all duration-300
                        ${active ? 'translate-x-6 text-success' : 'translate-x-0 text-danger'}`}>
                        {active ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
                    </div>
                </div>

                <div className="custom-tooltip-wrapper">
                    <button className="btn btn-ghost btn-circle text-neutral-dark hover:text-primary mt-2 animate-pulse">
                        <FiHelpCircle size={20} />
                    </button>
                    <div className="custom-tooltip-text ">
                        Durumu Değiştirmek İçin Tıklayınız
                    </div>
                </div>
            </div>
        </div>
    );
}
