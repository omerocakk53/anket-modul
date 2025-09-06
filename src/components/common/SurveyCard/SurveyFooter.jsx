import React from "react";
import { FiCalendar, FiEdit } from "react-icons/fi";
import { MdOutlineFeaturedPlayList } from "react-icons/md";

export default function SurveyFooter({ createdAt, lastModified, surveyType }) {
  const formattedCreatedAt = new Date(createdAt).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedLastModified = new Date(lastModified).toLocaleDateString(
    "tr-TR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    },
  );

  const getSurveyTypeText = (type) => {
    switch (type) {
      case "MemberSatisfaction":
        return "Üye Memnuniyet Anketi";
      case "ActivitySatisfaction":
        return "Etkinlik Memnuniyet Anketi";
      case "EducationSatisfaction":
        return "Eğitim Memnuniyet Anketi";
      case "Normal":
        return "Normal Anket";
      default:
        return "Anket Tipi Yok";
    }
  };

  return (
    <div className="text-xs text-neutral-dark flex flex-col space-y-0.5 gap-2 w-[101%]">
      <span className="flex items-center gap-3 border border-primary px-1 rounded-xl text-primary-dark">
        <MdOutlineFeaturedPlayList /> {getSurveyTypeText(surveyType)}
      </span>
      <span className="flex items-center gap-3 border border-primary px-1 rounded-xl text-primary-dark">
        <FiCalendar /> {formattedCreatedAt}
      </span>
      <span className="flex items-center gap-3 border border-primary px-1 rounded-xl text-primary-dark">
        <FiEdit /> {formattedLastModified}
      </span>
    </div>
  );
}
