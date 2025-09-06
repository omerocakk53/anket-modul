import React, { useEffect, useState } from "react";
import {
  FiEdit,
  FiLink,
  FiTrash2,
  FiBarChart2,
  FiChevronDown,
} from "react-icons/fi";
import { RiSurveyLine } from "react-icons/ri";
import { AiOutlineQrcode } from "react-icons/ai";
import { TbLocationShare } from "react-icons/tb";
import { BiCopy } from "react-icons/bi";
import { MdAutoFixNormal } from "react-icons/md";
import CopyPage from "./CopyPage";
import { SaveSurvey } from "./utils/surveyUtils";

export default function SurveyActions({
  setRefreshKey,
  surveys,
  survey,
  createSurvey,
  createTemplate,
  user,
  navigate,
  handleDelete,
  handleCopyLink,
  handleShowQr,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopyOpen, setisCopyOpen] = useState({
    data: {},
    isOpen: false,
  });

  useEffect(() => {
    if (isCopyOpen.isOpen == false && isCopyOpen.data != {}) {
      SaveSurvey(isCopyOpen.data, createSurvey, setRefreshKey);
    } else {
    }
  }, [isCopyOpen.data]);

  const goToEdit = () => navigate(`/anket/tasarim/${survey._id}`);
  const goToResults = () => navigate(`/anket/analiz/${survey._id}`);
  const goToPreview = () => navigate(`/anket/${survey.link}/${true}`);
  const goToShare = () => navigate(`/anket/share/${survey._id}`);
  const goToCopy = (survey) => {
    setisCopyOpen({ data: survey, isOpen: true });
  };
  const goToTemplate = (survey) => {
    createTemplate(survey);
    setRefreshKey((prev) => prev + 1);
  };

  const actionsList = [
    {
      label: "Düzenle",
      icon: <FiEdit className="h-4 w-4" />,
      handler: goToEdit,
      bg: "bg-primary",
      text: "text-primary-text",
    },
    {
      label: "Cevaplar",
      icon: <FiBarChart2 className="h-4 w-4" />,
      handler: goToResults,
      bg: "bg-success",
      text: "text-white",
    },
    {
      label: "Önizle",
      icon: <RiSurveyLine className="h-4 w-4" />,
      handler: goToPreview,
      bg: "bg-info",
      text: "text-white",
    },
    {
      label: "Link",
      icon: <FiLink className="h-4 w-4" />,
      handler: () => handleCopyLink(survey._id, survey.link),
      bg: "bg-warning",
      text: "text-white",
    },
    {
      label: "QR Kod",
      icon: <AiOutlineQrcode className="h-4 w-4" />,
      handler: () => handleShowQr(survey._id, survey.link),
      bg: "bg-secondary",
      text: "text-white",
    },
    {
      label: "Sil",
      icon: <FiTrash2 className="h-4 w-4" />,
      handler: () => handleDelete(survey._id, survey.title),
      bg: "bg-danger",
      text: "text-white",
    },
    {
      label: "Paylaş",
      icon: <TbLocationShare className="h-4 w-4" />,
      handler: goToShare,
      bg: "bg-primary",
      text: "text-primary-text",
    },
    {
      label: "Kopyala",
      icon: <BiCopy className="h-4 w-4" />,
      handler: () => goToCopy(survey),
      bg: "bg-primary",
      text: "text-primary-text",
    },
    {
      label: "Şbln Ekle",
      icon: <MdAutoFixNormal className="h-4 w-4" />,
      handler: () => goToTemplate(survey),
      bg: "bg-warning",
      text: "text-primary-text",
      access: user.role == "superAdmin" ? true : false,
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center px-4 py-3 text-left font-medium  text-primary bg-gray-100 hover:bg-gray-200 duration-300 rounded-t-lg ${isOpen ? "" : "rounded-b-lg"}`}
      >
        <span className="text-sm">Aksiyonlar</span>
        <FiChevronDown
          className={`h-5 w-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div className="hidden md:block">
        {isOpen && (
          <div className="absolute top-10 left-0 w-full bg-gray-100 hover:bg-gray-200 rounded-b-lg p-3 z-30 duration-300">
            <div className="grid grid-cols-2 gap-2">
              {actionsList.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.handler}
                  className={`${action.access == false ? "hidden" : ""} flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md
                                    ${action.text} ${action.bg} hover:opacity-90 transition duration-200 hover:scale-105 shadow-sm hover:shadow-lg`}
                >
                  {action.icon} {action.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="md:hidden">
        {isOpen && (
          <div className="grid grid-cols-2 gap-2 bg-gray-100 hover:bg-gray-200 rounded-b-lg p-3 z-30 duration-300">
            {actionsList.map((action, idx) => (
              <button
                key={idx}
                onClick={action.handler}
                className={`flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md
                                ${action.text} ${action.bg} hover:opacity-90 transition duration-200 hover:scale-105 shadow-sm hover:shadow-lg`}
              >
                {action.icon} {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {isCopyOpen.isOpen && (
        <CopyPage
          surveys={surveys}
          data={isCopyOpen.data}
          close={(editingData) =>
            setisCopyOpen({ data: editingData, isOpen: false })
          }
        />
      )}
    </div>
  );
}
