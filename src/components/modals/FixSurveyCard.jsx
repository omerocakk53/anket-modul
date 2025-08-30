import React, { useEffect, useState } from 'react';
import { FiCalendar, FiEye, FiTrash } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';

export default function FixSurveyCard({ AddAnimateRef, edit, survey, onSelect, onClose, onDelete, chamberName }) {
  const formattedCreatedAt = new Date(survey.createdAt).toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  useEffect(() => {
    if (survey) {
      if (!survey.title.includes(chamberName)) {
        survey.title = chamberName + " - " + survey.title;
      }
      survey.items = survey.items.map((element) => {
        if (element.title.includes("?") && !element.title.includes(chamberName)) {
          element.title = element.title.replace("?", "");
          return {
            ...element,
            title: chamberName + " " + element.title,
          };
        }
        return element; 
      });
    }
  }, [survey, chamberName]);



  return (
    <div ref={AddAnimateRef} className="bg-white rounded-lg shadow-md border p-5 flex flex-col justify-between hover:shadow-lg transition-shadow">
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
      <div className='flex justify-center gap-2'>
        <button
          onClick={() => { setIsPreviewModalOpen(true); }}
          className="mt-4  bg-success text-white text-sm px-2 py-1 rounded hover:bg-green-700 transition flex justify-center items-center gap-2"
        >
          <FiEye size={20} />
          Ön İzle
        </button>
        {
          edit &&
          <button
            onClick={() => { onDelete(survey._id); }}
            className="mt-4  bg-danger text-white text-sm px-2 py-1 rounded hover:bg-red-700 transition flex justify-center items-center gap-2"
          >
            <FiTrash size={20} />
            Sil
          </button>
        }
      </div>
      <button
        onClick={() => { onSelect(survey); onClose(); }}
        className="mt-4 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Şablonu Kullan
      </button>

      {isPreviewModalOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-8 relative animate-fade-in">
              <button
                onClick={() => { setIsPreviewModalOpen(false); }}
                className="absolute top-4 right-4 text-neutral-700 hover:text-red-600 transition"
              >
                <IoMdClose size={26} />
              </button>
              <h3 className="text-2xl font-semibold text-center text-neutral-800 mb-6">
                <span className='truncate'>"{survey.title}"</span> Anket Ön İzleme
              </h3>
              <hr className='mb-4' />
              <div className='flex flex-col gap-4 h-[300px] mb-5 overflow-auto'>
                {
                  survey.items.map((item, index) => (
                    <div key={index} className=" w-full max-w-5xl p-5 relative animate-fade-in">
                      <div><span>{index + 1}. Soru</span><h3 className="text-lg font-semibold text-neutral-800 mb-4 truncate">{item.title}</h3> - Soru Tipi ({item.label})</div>
                      <hr className='mt-1' />
                    </div>
                  ))
                }
              </div>
              <button
                onClick={() => { onSelect(survey); onClose(); setIsPreviewModalOpen(false); }}
                className="mt-4 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Şablonu Kullan
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
