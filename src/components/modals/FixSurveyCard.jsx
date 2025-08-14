import React from 'react';
import { FiCalendar, FiEdit } from 'react-icons/fi';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';

export default function FixSurveyCard({ survey, onSelect }) {
  const formattedCreatedAt = new Date(survey.createdAt).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-md border p-5 flex flex-col justify-between h-[280px] hover:shadow-lg transition-shadow">
      <div>
        <h3 className="text-lg font-bold text-neutral-darkest truncate">{survey.title}</h3>
        <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{survey.description}</p>
      </div>
      <div className="mt-3">
        {survey.tags && survey.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {survey.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full truncate max-w-[8rem]"
                title={tag}
              >
                {tag}
              </span>
            ))}
            {survey.tags.length > 3 && (
              <span
                className="text-xs font-medium bg-indigo-300 text-indigo-900 px-3 py-1 rounded-full cursor-default"
                title={survey.tags.slice(3).join(', ')}
              >
                +{survey.tags.length - 3} daha
              </span>
            )}
          </div>
        ) : (
          <p className="text-xs text-neutral-500">Etiket yok</p>
        )}
      </div>
      <div className="mt-3 text-xs text-neutral-dark flex flex-col gap-2">
        <span className="flex items-center gap-2 border px-2 py-0.5 rounded text-primary-dark">
          <MdOutlineFeaturedPlayList size={14} />
          {survey.surveyType === "MemberSatisfaction"
            ? "Üye Memnuniyet Anketi" :
            survey.surveyType === "ActivitySatisfaction"
              ? "Etkinlik Memnuniyet Anketi" :
              survey.surveyType === "EducationSatisfaction"
                ? "Eğitim Memnuniyet Anketi" :
                survey.surveyType === "Normal"
                  ? "Normal Anket" :
                  "Anket Tipi Yok"}
        </span>
        <span className="flex items-center gap-2 border px-2 py-0.5 rounded text-primary-dark">
          <FiCalendar size={14} />
          {formattedCreatedAt}
        </span>
      </div>
      <button
        onClick={() => onSelect(survey)}
        className="mt-4 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Şablonu Kullan
      </button>
    </div>
  );
}
