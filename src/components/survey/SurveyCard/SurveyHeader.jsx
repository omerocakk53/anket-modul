import React from "react";
import { FiHelpCircle } from "react-icons/fi";
import Tooltip from "../../common/Tooltip";
import ActiveToggle from "../../common/ActiveToggle";

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
      <div className="flex items-center gap-4">
        <ActiveToggle active={active} onToggle={handleActiveSurvey} />
        <Tooltip text="Durumu değiştirmek için tıklayınız">
          <button
            type="button"
            className="p-2 rounded-full text-neutral-dark hover:text-primary transition-colors"
          >
            <FiHelpCircle size={20} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
