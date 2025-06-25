import React, { useEffect, useState } from 'react';
import { FiEdit, FiLink, FiTrash2, FiBarChart2, FiCalendar, FiXCircle, FiCheckCircle } from 'react-icons/fi';
import { RiSurveyLine } from 'react-icons/ri';
import { AiOutlineQrcode } from 'react-icons/ai';
import { TbLocationShare } from "react-icons/tb";

export default function SurveyCard({ survey, handleDelete, handleCopyLink, handleShowQr, navigate }) {
    const [isHovered, setIsHovered] = useState(false);
    // Anket önizleme rotası için
    const handleNavigateToPreview = () => {
        navigate(`/${survey._id}`); // Anketin canlı önizlemesi için rota
    };

    // Anket düzenleme rotası için
    const handleNavigateToEdit = () => {
        navigate(`/tasarim/${survey._id}`); // Anket tasarım/düzenleme sayfası için rota
    };

    // Anket cevapları/sonuçları rotası için
    const handleNavigateToResults = () => {
        navigate(`/cevaplar/${survey._id}`); // Anketin cevaplarını görüntüleme sayfası için rota
    };

    const handleNavigateToShare = () => {
        navigate(`/share/${survey._id}`); // Anketin cevaplarını görüntüleme sayfası için rota
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
            className="bg-neutral-white rounded-lg shadow-md border border-neutral p-6 flex flex-col justify-between
                       relative overflow-hidden cursor-pointer h-[420px] sm:h-70
                       hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Üst Kısım: Başlık ve Grup */}
            <div className="">
                <h3 className="text-xl font-bold text-neutral-darkest truncate">{survey.title}</h3>
                <h3 className="text-sm text-neutral-darkest truncate">{survey.description}</h3>
                <span>
                    <div className={`text-xs flex items-center gap-1 py-0.5 rounded-full w-16 justify-center mt-1 mb-1 border font-medium shrink-0
                        ${survey.active ? 'text-success bg-success/10 border-success' : 'text-danger bg-danger/10 border-danger'}`}>
                        {survey.active ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
                        {survey.active ? "Açık" : "Kapalı"}
                    </div>
                </span>
                <div>
                    <h2 className="text-lg font-semibold mb-2">Anket Etiketleriniz</h2>

                    {survey.tags && survey.tags.length > 0 ? (
                        <><div className="flex flex-wrap gap-2 mb-7">
                            {survey.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-xs font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full select-none truncate max-w-[8rem]"
                                    title={tag}
                                >
                                    {tag}
                                </span>
                            ))}
                            {survey.tags.length > 3 && (
                                <span
                                    className="text-xs font-medium bg-indigo-300 text-indigo-900 px-3 py-1 rounded-full select-none cursor-default"
                                    title={survey.tags.slice(3).join(', ')}
                                >
                                    +{survey.tags.length - 3} daha
                                </span>
                            )}
                        </div>
                        </>
                    ) : (
                        <><p className="text-sm text-neutral-500 mb-8">Henüz etiket yok.</p></>
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
                <div className="absolute right-[7px] bottom-[7px]">
                    <button
                        onClick={handleNavigateToShare}
                        className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md text-primary-text bg-primary hover:bg-primary-dark transition duration-200 hover:scale-105 shadow-sm hover:shadow-lg"
                    >
                        <TbLocationShare className="h-4 w-4" /> Paylaş
                    </button>
                </div>
                <div className="w-full px-4 grid grid-cols-2 gap-2">
                    <button
                        onClick={handleNavigateToEdit}
                        className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md text-primary-text bg-primary hover:bg-primary-dark transition duration-200 hover:scale-105 shadow-sm hover:shadow-lg"
                    >
                        <FiEdit className="h-4 w-4" /> Düzenle
                    </button>
                    <button
                        onClick={handleNavigateToResults}
                        className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md text-white bg-success hover:bg-success/90 transition duration-200 hover:scale-105 shadow-sm hover:shadow-lg"
                    >
                        <FiBarChart2 className="h-4 w-4" /> Cevaplar
                    </button>
                </div>

                <div className="w-full px-4 grid grid-cols-2 gap-2 mt-2">
                    <button
                        onClick={handleNavigateToPreview}
                        className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md text-white bg-info hover:bg-info/90 transition duration-200 hover:scale-105 shadow-sm hover:shadow-lg"
                    >
                        <RiSurveyLine className="h-4 w-4" /> Önizle
                    </button>
                    <button
                        onClick={() => handleCopyLink(survey._id, survey.link)}
                        className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md text-white bg-warning hover:bg-warning/90 transition duration-200 hover:scale-105 shadow-sm hover:shadow-lg"
                    >
                        <FiLink className="h-4 w-4" /> Link
                    </button>
                </div>

                <div className="w-full px-4 flex justify-between gap-2 mt-2">
                    <button
                        onClick={() => handleShowQr(survey._id, survey.link)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark transition duration-200 hover:scale-105 shadow-sm hover:shadow-lg"
                    >
                        <AiOutlineQrcode className="h-4 w-4" /> QR Kod
                    </button>
                    <button
                        onClick={() => handleDelete(survey._id, survey.title)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md text-white bg-danger hover:bg-danger-dark transition duration-200 hover:scale-105 shadow-sm hover:shadow-lg"
                    >
                        <FiTrash2 className="h-4 w-4" /> Sil
                    </button>
                </div>
            </div>
            <div className="space-y-3 md:hidden">
                <div className="absolute right-[7px] bottom-[7px]">
                    <button
                        onClick={handleNavigateToShare}
                        className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md text-primary-text bg-primary hover:bg-primary-dark transition duration-200 hover:scale-105 shadow-sm hover:shadow-lg"
                    >
                        <TbLocationShare className="h-4 w-4" /> Paylaş
                    </button>
                </div>
                {/* 1. Satır */}
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleNavigateToEdit} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-primary-text bg-primary hover:bg-primary-dark transition duration-200 shadow">
                        <FiEdit className="h-4 w-4" /> Düzenle
                    </button>
                    <button onClick={handleNavigateToResults} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-success hover:bg-success/90 transition duration-200 shadow">
                        <FiBarChart2 className="h-4 w-4" /> Cevaplar
                    </button>
                </div>

                {/* 2. Satır */}
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleNavigateToPreview} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-info hover:bg-info/90 transition duration-200 shadow">
                        <RiSurveyLine className="h-4 w-4" /> Önizle
                    </button>
                    <button onClick={() => handleCopyLink(survey._id, survey.link)} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-warning hover:bg-warning/90 transition duration-200 shadow">
                        <FiLink className="h-4 w-4" /> Link
                    </button>
                </div>

                {/* 3. Satır */}
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleShowQr(survey._id, survey.link)} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-secondary hover:bg-secondary-dark transition duration-200 shadow">
                        <AiOutlineQrcode className="h-4 w-4" /> QR Kod
                    </button>
                    <button onClick={() => handleDelete(survey._id, survey.title)} className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-danger hover:bg-danger-dark transition duration-200 shadow">
                        <FiTrash2 className="h-4 w-4" /> Sil
                    </button>
                </div>
            </div>
            {/* Oluşturulma Tarihi (sol altta) */}
            <div className="mt-5 text-xs text-neutral-dark flex flex-col space-y-0.5 gap-2 w-[200px] sm:w-[175px] ">
                <span className='flex items-center gap-3 border border-primary px-1 rounded-xl text-primary-dark'> <FiCalendar /> {formattedCreatedAt}</span>
                <span className='flex items-center gap-3 border border-primary px-1 rounded-xl text-primary-dark'><FiEdit /> {formattedLastModified}</span>
            </div>
        </div>
    );
}