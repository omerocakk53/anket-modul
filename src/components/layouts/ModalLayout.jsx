import React, { useState } from "react";

const ModalLayout = ({ leftPanel, rightPanel }) => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="tw-fixed tw-inset-0 tw-z-50 tw-backdrop-blur-sm tw-flex tw-items-center tw-justify-center">
      {/* Mobil sekmeler */}
      <div className="tw-absolute tw-top-0 tw-md:hidden tw-flex tw-justify-between tw-gap-2 tw-shadow-md tw-w-full tw-bg-neutral tw-z-50">
        <button
          onClick={() => setActiveTab("create")}
          className={`w-1/2 py-2 text-center font-semibold ${activeTab === "create" ? "bg-primary text-primary-text" : "text-gray-500"}`}
        >
          Oluştur
        </button>
        <button
          onClick={() => setActiveTab("design")}
          className={`w-1/2 py-2 text-center font-semibold ${activeTab === "design" ? "bg-primary text-primary-text" : "text-gray-500"}`}
        >
          Tasarla
        </button>
      </div>

      <div className="tw-bg-white tw-rounded-md tw-shadow-lg tw-w-full tw-h-full tw-flex tw-overflow-hidden">
        {/* Sol Panel */}
        <div
          className={`
            w-full md:w-1/2 h-full p-6 pt-16 md:pt-6  overflow-y-auto 
            ${activeTab === "create" ? "block" : "hidden"} md:block
          `}
        >
          {leftPanel}
        </div>

        {/* Sağ Panel */}
        <div
          className={`
            w-full md:w-1/2 h-full p-6 bg-black overflow-y-auto flex items-center justify-center 
            ${activeTab === "design" ? "flex" : "hidden"} md:flex
          `}
        >
          {rightPanel}
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
