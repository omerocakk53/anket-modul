import React, { useEffect, useState } from 'react';
import { FiEdit, FiLink, FiTrash2, FiBarChart2, FiCalendar, FiXCircle, FiCheckCircle } from 'react-icons/fi';
import { RiSurveyLine } from 'react-icons/ri';
import { AiOutlineQrcode } from 'react-icons/ai';
import { TbLocationShare } from "react-icons/tb";

export default function SurveyCard({ survey, handleDelete, handleCopyLink, handleShowQr, navigate }) {
    const [isHovered, setIsHovered] = useState(false);
    // Anket önizleme rotası için
    const handleNavigateToPreview = () => {
        navigate(`/anket/${survey._id}`); // Anketin canlı önizlemesi için rota
    };

    // Anket düzenleme rotası için
    const handleNavigateToEdit = () => {
        navigate(`/anket/tasarim/${survey._id}`); // Anket tasarım/düzenleme sayfası için rota
    };

    // Anket cevapları/sonuçları rotası için
    const handleNavigateToResults = () => {
        navigate(`/anket/analiz/${survey._id}`); // Anketin cevaplarını görüntüleme sayfası için rota
    };

    const handleNavigateToShare = () => {
        navigate(`/anket/share/${survey._id}`); // Anketin cevaplarını görüntüleme sayfası için rota
    }

    const formattedCreatedAt = new Date(survey.createdAt).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const formattedLastModified = new Date(survey.lastModified).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return (
        <div
            className="tw-bg-neutral-white tw-rounded-lg tw-shadow-md tw-border tw-border-neutral tw-p-6 tw-flex tw-flex-col tw-justify-between tw-relative tw-overflow-hidden tw-cursor-pointer tw-h-[420px] tw-sm:h-70 tw-hover:shadow-xl tw-transition-shadow tw-duration-300 tw-transform tw-hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Üst Kısım: Başlık ve Grup */}
            <div className="">
                <h3 className="tw-text-xl tw-font-bold tw-text-neutral-darkest tw-truncate">{survey.title}</h3>
                <h3 className="tw-text-sm tw-text-neutral-darkest tw-truncate">{survey.description}</h3>
                <span>
                    <div className={`text-xs flex items-center gap-1 py-0.5 rounded-full w-16 justify-center mt-1 mb-1 border font-medium shrink-0
                        ${survey.active ? 'text-success bg-success/10 border-success' : 'text-danger bg-danger/10 border-danger'}`}>
                        {survey.active ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
                        {survey.active ? "Açık" : "Kapalı"}
                    </div>
                </span>
                <div>
                    <h2 className="tw-text-lg tw-font-semibold tw-mb-2">Anket Etiketleriniz</h2>

                    {survey.tags && survey.tags.length > 0 ? (
                        <><div className="tw-flex tw-flex-wrap tw-gap-2 tw-mb-7">
                            {survey.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="tw-text-xs tw-font-medium tw-bg-indigo-100 tw-text-indigo-700 tw-px-3 tw-py-1 tw-rounded-full tw-select-none tw-truncate tw-max-w-[8rem]"
                                    title={tag}
                                >
                                    {tag}
                                </span>
                            ))}
                            {survey.tags.length > 3 && (
                                <span
                                    className="tw-text-xs tw-font-medium tw-bg-indigo-300 tw-text-indigo-900 tw-px-3 tw-py-1 tw-rounded-full tw-select-none tw-cursor-default"
                                    title={survey.tags.slice(3).join(', ')}
                                >
                                    +{survey.tags.length - 3} daha
                                </span>
                            )}
                        </div>
                        </>
                    ) : (
                        <><p className="tw-text-sm tw-text-neutral-500 tw-mb-8">Henüz etiket yok.</p></>
                    )}
                </div>
                {/* Mobil buton bloğu */}

            </div>



            {/* Alt Kısım: Açıklama veya Aksiyonlar */}
            <div
                className={`
    absolute inset-0 flex flex-col justify-center items-center gap-3
    bg-white/90 backdrop-blur-xs rounded-lg z-20
    transition-opacity duration-300
    ${isHovered ? 'md:opacity-100 md:pointer-events-auto' : 'md:opacity-0 md:pointer-events-none'}
    hidden md:flex 
  `}
            >
                <div className="tw-absolute tw-right-[7px] tw-bottom-[7px]">
                    <button
                        onClick={handleNavigateToShare}
                        className="tw-flex tw-items-center tw-justify-center tw-gap-1 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-rounded-md tw-text-primary-text tw-bg-primary tw-hover:bg-primary-dark tw-transition tw-duration-200 tw-hover:scale-105 tw-shadow-sm tw-hover:shadow-lg"
                    >
                        <TbLocationShare className="tw-h-4 tw-w-4" /> Paylaş
                    </button>
                </div>
                <div className="tw-w-full tw-px-4 tw-grid tw-grid-cols-2 tw-gap-2">
                    <button
                        onClick={handleNavigateToEdit}
                        className="tw-flex tw-items-center tw-justify-center tw-gap-1 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-rounded-md tw-text-primary-text tw-bg-primary tw-hover:bg-primary-dark tw-transition tw-duration-200 tw-hover:scale-105 tw-shadow-sm tw-hover:shadow-lg"
                    >
                        <FiEdit className="tw-h-4 tw-w-4" /> Düzenle
                    </button>
                    <button
                        onClick={handleNavigateToResults}
                        className="tw-flex tw-items-center tw-justify-center tw-gap-1 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-rounded-md tw-text-white tw-bg-success tw-hover:bg-success/90 tw-transition tw-duration-200 tw-hover:scale-105 tw-shadow-sm tw-hover:shadow-lg"
                    >
                        <FiBarChart2 className="tw-h-4 tw-w-4" /> Cevaplar
                    </button>
                </div>

                <div className="tw-w-full tw-px-4 tw-grid tw-grid-cols-2 tw-gap-2 tw-mt-2">
                    <button
                        onClick={handleNavigateToPreview}
                        className="tw-flex tw-items-center tw-justify-center tw-gap-1 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-rounded-md tw-text-white tw-bg-info tw-hover:bg-info/90 tw-transition tw-duration-200 tw-hover:scale-105 tw-shadow-sm tw-hover:shadow-lg"
                    >
                        <RiSurveyLine className="tw-h-4 tw-w-4" /> Önizle
                    </button>
                    <button
                        onClick={() => handleCopyLink(survey._id, survey.link)}
                        className="tw-flex tw-items-center tw-justify-center tw-gap-1 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-rounded-md tw-text-white tw-bg-warning tw-hover:bg-warning/90 tw-transition tw-duration-200 tw-hover:scale-105 tw-shadow-sm tw-hover:shadow-lg"
                    >
                        <FiLink className="tw-h-4 tw-w-4" /> Link
                    </button>
                </div>

                <div className="tw-w-full tw-px-4 tw-flex tw-justify-between tw-gap-2 tw-mt-2">
                    <button
                        onClick={() => handleShowQr(survey._id, survey.link)}
                        className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-gap-1 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-rounded-md tw-text-white tw-bg-secondary tw-hover:bg-secondary-dark tw-transition tw-duration-200 tw-hover:scale-105 tw-shadow-sm tw-hover:shadow-lg"
                    >
                        <AiOutlineQrcode className="tw-h-4 tw-w-4" /> QR Kod
                    </button>
                    <button
                        onClick={() => handleDelete(survey._id, survey.title)}
                        className="tw-flex-1 tw-flex tw-items-center tw-justify-center tw-gap-1 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-rounded-md tw-text-white tw-bg-danger tw-hover:bg-danger-dark tw-transition tw-duration-200 tw-hover:scale-105 tw-shadow-sm tw-hover:shadow-lg"
                    >
                        <FiTrash2 className="tw-h-4 tw-w-4" /> Sil
                    </button>
                </div>
            </div>
            <div className="tw-space-y-3 tw-md:hidden">
                <div className="tw-absolute tw-right-[7px] tw-bottom-[7px]">
                    <button
                        onClick={handleNavigateToShare}
                        className="tw-flex tw-items-center tw-justify-center tw-gap-1 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-rounded-md tw-text-primary-text tw-bg-primary tw-hover:bg-primary-dark tw-transition tw-duration-200 tw-hover:scale-105 tw-shadow-sm tw-hover:shadow-lg"
                    >
                        <TbLocationShare className="tw-h-4 tw-w-4" /> Paylaş
                    </button>
                </div>
                {/* 1. Satır */}
                <div className="tw-grid tw-grid-cols-2 tw-gap-3">
                    <button onClick={handleNavigateToEdit} className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-rounded-lg tw-text-primary-text tw-bg-primary tw-hover:bg-primary-dark tw-transition tw-duration-200 tw-shadow">
                        <FiEdit className="tw-h-4 tw-w-4" /> Düzenle
                    </button>
                    <button onClick={handleNavigateToResults} className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-rounded-lg tw-text-white tw-bg-success tw-hover:bg-success/90 tw-transition tw-duration-200 tw-shadow">
                        <FiBarChart2 className="tw-h-4 tw-w-4" /> Cevaplar
                    </button>
                </div>

                {/* 2. Satır */}
                <div className="tw-grid tw-grid-cols-2 tw-gap-3">
                    <button onClick={handleNavigateToPreview} className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-rounded-lg tw-text-white tw-bg-info tw-hover:bg-info/90 tw-transition tw-duration-200 tw-shadow">
                        <RiSurveyLine className="tw-h-4 tw-w-4" /> Önizle
                    </button>
                    <button onClick={() => handleCopyLink(survey._id, survey.link)} className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-rounded-lg tw-text-white tw-bg-warning tw-hover:bg-warning/90 tw-transition tw-duration-200 tw-shadow">
                        <FiLink className="tw-h-4 tw-w-4" /> Link
                    </button>
                </div>

                {/* 3. Satır */}
                <div className="tw-grid tw-grid-cols-2 tw-gap-3">
                    <button onClick={() => handleShowQr(survey._id, survey.link)} className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-rounded-lg tw-text-white tw-bg-secondary tw-hover:bg-secondary-dark tw-transition tw-duration-200 tw-shadow">
                        <AiOutlineQrcode className="tw-h-4 tw-w-4" /> QR Kod
                    </button>
                    <button onClick={() => handleDelete(survey._id, survey.title)} className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-rounded-lg tw-text-white tw-bg-danger tw-hover:bg-danger-dark tw-transition tw-duration-200 tw-shadow">
                        <FiTrash2 className="tw-h-4 tw-w-4" /> Sil
                    </button>
                </div>
            </div>
            {/* Oluşturulma Tarihi (sol altta) */}
            <div className="tw-mt-5 tw-text-xs tw-text-neutral-dark tw-flex tw-flex-col tw-space-y-0.5 tw-gap-2 tw-w-[200px] tw-sm:w-[175px] tw-">
                <span className="tw-flex tw-items-center tw-gap-3 tw-border tw-border-primary tw-px-1 tw-rounded-xl tw-text-primary-dark"> <FiCalendar /> {formattedCreatedAt}</span>
                <span className="tw-flex tw-items-center tw-gap-3 tw-border tw-border-primary tw-px-1 tw-rounded-xl tw-text-primary-dark"><FiEdit /> {formattedLastModified}</span>
            </div>
        </div>
    );
}