import React, { useEffect, useState } from 'react';
import { FiHelpCircle, FiBell, FiArrowLeft, FiEdit, FiCalendar, FiCheckCircle, FiXCircle, FiFolder } from 'react-icons/fi';
import EditSurveyModal from './EditSurveyModal';
import { FaPoll } from 'react-icons/fa';
import { CiMenuKebab } from 'react-icons/ci';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';

export default function Header({
    isEditMode = false,
    isAnswerMode = false,
    surveyData = {},
    onBackToMain,
    selectedGroup,
    onUpdateSurvey,
    Sidebar,
    isShareMode,
    updatesurveyfeature,
    chamberName
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        Sidebar(sidebarOpen)
    }, [sidebarOpen])
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (isEditMode) {
        return (
            <>
                <header className="bg-neutral/0 shadow-sm mb-4">
                    <div className="px-3 py-2 sm:px-6 sm:py-3 space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-primary font-bold text-lg">
                                <FaPoll className="h-6 w-6 animate-pulse-slow" />
                                <h1 className="tracking-tight animate-fade-in-slide">OdaAnket</h1>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(prev => !prev)}
                                className="sm:hidden px-2 py-1 text-xs text-primary-darktext hover:text-primary  transition"
                            >
                                <CiMenuKebab size={24} />
                            </button>
                        </div>

                        {/* Başlık ve Açıklama */}
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
                                    {surveyData.title}
                                </h2>
                            </div>
                            <p className="text-sm text-neutral-600 truncate">{surveyData.description || "Açıklama Yok"}</p>
                        </div>

                        {/* Etiketler - daha küçük boy ve kaydırılabilir */}
                        <div className="flex gap-2 overflow-x-auto text-xs pb-1">
                            <div className="flex items-center gap-1 border border-primary px-2 py-0.5 rounded-full text-primary-dark shrink-0">
                                <FiFolder size={14} />
                                <span>{surveyData.group || 'Belirtilmemiş'}</span>
                            </div>
                            <div className="flex items-center gap-1 border border-primary px-2 py-0.5 rounded-full text-primary-dark shrink-0">
                                <FiCalendar size={14} />
                                <span>
                                    {new Date(surveyData.createdAt).toLocaleDateString("tr-TR")}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 border border-primary px-2 py-0.5 rounded-full text-primary-dark shrink-0">
                                <FiEdit size={14} />
                                <span>
                                    {new Date(surveyData.lastModified).toLocaleDateString("tr-TR")}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 border border-primary px-2 py-0.5 rounded-full text-primary-dark shrink-0">
                                <MdOutlineFeaturedPlayList size={14} />
                                <span>
                                    {surveyData.surveyType ? (surveyData.surveyType == "Normal" ? "Normal Anket" : surveyData.surveyType == "MemberSatisfaction" ? "Üye Memnuniyet Anketi" : "Anket Tipi Yok") : "Anket Tipi Yok"}
                                </span>
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium shrink-0
                                ${surveyData.active ? 'text-success bg-success/10 border-success' : 'text-danger bg-danger/10 border-danger'}`}>
                                {surveyData.active ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
                                {surveyData.active ? "Açık" : "Kapalı"}
                            </div>
                        </div>

                        {/* Düzenle Butonu */}
                        <div className="flex">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-1 px-3 py-1 text-xs font-medium border rounded text-primary-dark border-primary hover:bg-primary hover:text-white transition"
                            >
                                <FiEdit size={14} />
                                Düzenle
                            </button>
                        </div>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <EditSurveyModal
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


            </>
        );
    } else if (isAnswerMode) {
        return (
            <>
                <header className="bg-neutral/0 shadow-sm mb-4">
                    <div className="px-3 py-2 sm:px-6 sm:py-3 space-y-2">

                        {/* Logo ve Menü Butonu */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-primary font-bold text-lg">
                                <FaPoll className="h-6 w-6 animate-pulse-slow" />
                                <h1 className="tracking-tight animate-fade-in-slide">OdaAnket</h1>
                            </div>
                        </div>

                        {/* Başlık ve Açıklama */}
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
                                    {surveyData.title} Cevapları
                                </h2>
                            </div>
                            <p className="text-sm text-neutral-600 truncate">{surveyData.description || "Açıklama Yok"}</p>
                        </div>

                        {/* Etiketler - daha küçük boy ve kaydırılabilir */}
                        <div className="flex gap-2 overflow-x-auto text-xs pb-1">
                            <div className="flex items-center gap-1 border border-primary px-2 py-0.5 rounded-full text-primary-dark shrink-0">
                                <FiFolder size={14} />
                                <span>{surveyData.group || 'Belirtilmemiş'}</span>
                            </div>
                            <div className="flex items-center gap-1 border border-primary px-2 py-0.5 rounded-full text-primary-dark shrink-0">
                                <FiCalendar size={14} />
                                <span>
                                    {new Date(surveyData.createdAt).toLocaleDateString("tr-TR")}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 border border-primary px-2 py-0.5 rounded-full text-primary-dark shrink-0">
                                <FiEdit size={14} />
                                <span>
                                    {new Date(surveyData.lastModified).toLocaleDateString("tr-TR")}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 border border-primary px-2 py-0.5 rounded-full text-primary-dark shrink-0">
                                <MdOutlineFeaturedPlayList size={14} />
                                <span>
                                    {surveyData.surveyType ? (surveyData.surveyType == "Normal" ? "Normal Anket" : surveyData.surveyType == "MemberSatisfaction" ? "Üye Memnuniyet Anketi" : "Anket Tipi Yok") : "Anket Tipi Yok"}
                                </span>
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium shrink-0
                            ${surveyData.active ? 'text-success bg-success/10 border-success' : 'text-danger bg-danger/10 border-danger'}`}>
                                {surveyData.active ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
                                {surveyData.active ? "Açık" : "Kapalı"}
                            </div>
                        </div>
                    </div>
                </header>
            </>
        )
    } else if (isShareMode) {
        return (
            <>
                <header className="bg-neutral/0 shadow-sm mb-4">
                    <div className="px-3 py-2 sm:px-6 sm:py-3 space-y-2">

                        {/* Logo ve Menü Butonu */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-primary font-bold text-lg">
                                <FaPoll className="h-6 w-6 animate-pulse-slow" />
                                <h1 className="tracking-tight animate-fade-in-slide">OdaAnket</h1>
                            </div>
                        </div>

                        {/* Başlık ve Açıklama */}
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
                                    {surveyData.title}
                                </h2>
                            </div>
                            <p className="text-sm text-neutral-600 truncate">{surveyData.description || "Açıklama Yok"}</p>
                        </div>

                        {/* Etiketler - daha küçük boy ve kaydırılabilir */}
                        <div className="flex gap-2 overflow-x-auto text-xs pb-1">
                            <div className="flex items-center gap-1 border border-primary px-2 py-0.5 rounded-full text-primary-dark shrink-0">
                                <FiFolder size={14} />
                                <span>{surveyData.group || 'Belirtilmemiş'}</span>
                            </div>
                            <div className="flex items-center gap-1 border border-primary px-2 py-0.5 rounded-full text-primary-dark shrink-0">
                                <FiCalendar size={14} />
                                <span>
                                    {new Date(surveyData.createdAt).toLocaleDateString("tr-TR")}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 border border-primary px-2 py-0.5 rounded-full text-primary-dark shrink-0">
                                <FiEdit size={14} />
                                <span>
                                    {new Date(surveyData.lastModified).toLocaleDateString("tr-TR")}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 border border-primary px-2 py-0.5 rounded-full text-primary-dark shrink-0">
                                <MdOutlineFeaturedPlayList size={14} />
                                <span>
                                    {surveyData.surveyType ? (surveyData.surveyType == "Normal" ? "Normal Anket" : surveyData.surveyType == "MemberSatisfaction" ? "Üye Memnuniyet Anketi" : "Anket Tipi Yok") : "Anket Tipi Yok"}
                                </span>
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium shrink-0
                            ${surveyData.active ? 'text-success bg-success/10 border-success' : 'text-danger bg-danger/10 border-danger'}`}>
                                {surveyData.active ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
                                {surveyData.active ? "Açık" : "Kapalı"}
                            </div>
                        </div>
                    </div>
                </header>
            </>
        )
    }
    // Ana sayfa header
    return (
        <header className="flex items-center justify-between p-6 bg-neutral-white border-b border-neutral shadow-sm">
            <div className='flex items-center justify-start'>
                <div className="flex items-center gap-3 px-1 rounded-xl text-primary-dark text-2xl">
                    <FiFolder />
                    <span>{selectedGroup || 'Klasör İsmi Yok'}</span>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setSidebarOpen(prev => !prev)}
                    className="p-2 focus:outline-none xl:hidden"
                >
                    <CiMenuKebab size={24} />
                </button>
                <button
                    className="btn btn-ghost btn-circle text-neutral-dark hover:text-primary tooltip tooltip-bottom"
                    data-tip="Destek"
                >
                    <FiHelpCircle size={24} />
                </button>
                <button
                    className="btn btn-ghost btn-circle text-neutral-dark hover:text-primary tooltip tooltip-bottom"
                    data-tip="Bildirimler"
                >
                    <FiBell size={24} />
                </button>
            </div>
        </header>
    );
}
