import React, { useState } from "react";

const ModalLayout = ({ leftPanel, rightPanel }) => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      {/* Mobil sekmeler */}
      <div className="absolute top-0 md:hidden flex justify-between gap-2 shadow-md w-full bg-neutral z-50">
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

      <div className="bg-white rounded-md shadow-lg w-full h-full flex overflow-hidden">
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
