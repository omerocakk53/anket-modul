import React, { useState, useEffect } from "react";
import { FaPoll } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import {
  FiArrowLeft,
  FiFolder,
  FiCalendar,
  FiEdit,
  FiCheckCircle,
  FiXCircle,
  FiEye,
} from "react-icons/fi";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import EditSurveyModal from "../../modals/EditSurveyModal/index";
import { useNavigate } from "react-router-dom";
import Tag from "./Tag";

export default function EditHeader({
  surveyData,
  surveys,
  onBackToMain,
  onUpdateSurvey,
  Sidebar,
  updatesurveyfeature,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Sidebar(sidebarOpen);
  }, [sidebarOpen]);

  return (
    <header className="bg-neutral/0 shadow-sm mb-4">
      <div className="px-3 py-2 sm:px-6 sm:py-3 space-y-2">
        {/* Logo & Menü */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <FaPoll className="h-6 w-6 animate-pulse-slow" />
            <h1 className="tracking-tight animate-fade-in-slide">OdaAnket</h1>
          </div>
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="sm:hidden px-2 py-1 text-xs text-primary-darktext hover:text-primary transition"
          >
            <CiMenuKebab size={24} />
          </button>
        </div>

        {/* Başlık */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToMain}
              className="p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-primary transition"
            >
              <FiArrowLeft size={16} />
            </button>
            <h2 className="text-base sm:text-lg font-medium text-neutral-800 truncate max-w-[80%]">
              {surveyData.title}
            </h2>
          </div>
          <p className="text-sm text-neutral-600 truncate">
            {surveyData.description || "Açıklama Yok"}
          </p>
        </div>

        {/* Etiketler */}
        <div className="flex gap-2 overflow-x-auto text-xs pb-1">
          <Tag
            icon={<FiFolder size={14} />}
            text={surveyData.group || "Belirtilmemiş"}
          />
          <Tag
            icon={<FiCalendar size={14} />}
            text={new Date(surveyData.createdAt).toLocaleDateString("tr-TR")}
          />
          <Tag
            icon={<FiEdit size={14} />}
            text={new Date(surveyData.lastModified).toLocaleDateString("tr-TR")}
          />
          <Tag
            icon={<MdOutlineFeaturedPlayList size={14} />}
            text={surveyData.surveyType || "Anket Tipi Yok"}
          />

          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium shrink-0
              ${surveyData.active ? "text-success bg-success/10 border-success" : "text-danger bg-danger/10 border-danger"}`}
          >
            {surveyData.active ? (
              <FiCheckCircle size={14} />
            ) : (
              <FiXCircle size={14} />
            )}
            {surveyData.active ? "Açık" : "Kapalı"}
          </div>
        </div>

        {/* Butonlar */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1 text-xs font-medium border rounded text-primary-dark border-primary hover:bg-primary hover:text-white transition"
          >
            <FiEdit size={14} />
            Düzenle
          </button>
          <button
            onClick={() => navigate(`/anket/${surveyData.link}/${true}`)}
            className="flex items-center gap-1 px-3 py-1 text-xs font-medium border rounded text-primary-dark border-primary hover:bg-primary hover:text-white transition"
          >
            <FiEye size={14} />
            Ön İzle
          </button>
        </div>
      </div>

      {isModalOpen && (
        <EditSurveyModal
          surveys={surveys}
          survey={surveyData}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(updated) => {
            onUpdateSurvey(updated);
            setIsModalOpen(false);
          }}
          updatesurveyfeature={updatesurveyfeature}
        />
      )}
    </header>
  );
}
