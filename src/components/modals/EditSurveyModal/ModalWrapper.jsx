import React from "react";
import { FiX } from "react-icons/fi";

export default function ModalWrapper({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm px-2">
      <div className="bg-neutral-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto relative border border-neutral-light">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-dark hover:text-danger-dark transition"
        >
          <FiX size={28} />
        </button>
        {children}
      </div>
    </div>
  );
}
