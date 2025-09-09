import React, { useState } from "react";
import { FiHelpCircle, FiBell, FiFolder } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";

export default function MainHeader({ selectedGroup, Sidebar }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-6 bg-neutral-white border-b border-neutral shadow-sm">
      <div className="flex items-center gap-3 px-1 rounded-xl text-primary-dark text-2xl">
        <FiFolder />
        <span>{selectedGroup || "Klasör İsmi Yok"}</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            setSidebarOpen((prev) => !prev);
            Sidebar(!sidebarOpen);
          }}
          className="p-2 focus:outline-none xl:hidden"
        >
          <CiMenuKebab size={24} />
        </button>
        <IconButton icon={<FiHelpCircle size={24} />} tooltip="Destek" />
        <IconButton icon={<FiBell size={24} />} tooltip="Bildirimler" />
      </div>
    </header>
  );
}

const IconButton = ({ icon, tooltip }) => (
  <button
    className="btn btn-ghost btn-circle text-neutral-dark hover:text-primary tooltip tooltip-bottom"
    data-tip={tooltip}
  >
    {icon}
  </button>
);
