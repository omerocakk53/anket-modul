import React from "react";
import { FaPoll } from "react-icons/fa";
import { FiArrowLeft, FiFolder, FiCalendar, FiEdit } from "react-icons/fi";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import Tag from "./Tag";
import StatusTag from "./StatusTag";

export default function ShareHeader({ surveyData, onBackToMain }) {
  return (
    <header className="bg-neutral/0 shadow-sm mb-4">
      <div className="px-3 py-2 sm:px-6 sm:py-3 space-y-2">
        {/* Logo */}
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          <FaPoll className="h-6 w-6 animate-pulse-slow" />
          <h1 className="tracking-tight animate-fade-in-slide">OdaAnket</h1>
        </div>

        {/* Başlık */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToMain}
              className="p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-primary transition"
              title="Ana Menüye Dön"
            >
              <FiArrowLeft size={16} />
            </button>
            <h2 className="text-base sm:text-lg font-medium text-neutral-800 truncate max-w-[80%]">
              {surveyData?.title}
            </h2>
          </div>
          <p className="text-sm text-neutral-600 truncate">
            {surveyData?.description || "Açıklama Yok"}
          </p>
        </div>

        {/* Etiketler */}
        <div className="flex gap-2 overflow-x-auto text-xs pb-1">
          <Tag
            icon={<FiFolder size={14} />}
            text={surveyData?.group || "Belirtilmemiş"}
          />
          <Tag
            icon={<FiCalendar size={14} />}
            text={new Date(surveyData?.createdAt).toLocaleDateString("tr-TR")}
          />
          <Tag
            icon={<FiEdit size={14} />}
            text={new Date(surveyData?.lastModified).toLocaleDateString(
              "tr-TR",
            )}
          />
          <Tag
            icon={<MdOutlineFeaturedPlayList size={14} />}
            text={surveyData?.surveyType || "Anket Tipi Yok"}
          />
          <StatusTag active={surveyData?.active} />
        </div>
      </div>
    </header>
  );
}
