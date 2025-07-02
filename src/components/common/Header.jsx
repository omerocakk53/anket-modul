import React, { useEffect, useState } from 'react';
import { FiHelpCircle, FiBell, FiArrowLeft, FiEdit, FiCalendar, FiCheckCircle, FiXCircle, FiFolder } from 'react-icons/fi';
import EditSurveyModal from './EditSurveyModal';
import { FaPoll } from 'react-icons/fa';
import { IoColorFillOutline } from "react-icons/io5";
import { CiMenuKebab } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';

export default function Header({
    isEditMode = false,
    isAnswerMode = false,
    surveyData = {},
    onBackToMain,
    selectedGroup,
    onUpdateSurvey,
    UserId,
    Sidebar,
    isShareMode,
    updatesurveyfeature
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        Sidebar(sidebarOpen)
    }, [sidebarOpen])
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (isEditMode) {
        return (
            <>
                <header className="tw-bg-neutral/0 tw-shadow-sm tw-mb-4">
                    <div className="tw-px-3 tw-py-2 tw-sm:px-6 tw-sm:py-3 tw-space-y-2">

                        {/* Logo ve Menü Butonu */}
                        <div className="tw-flex tw-items-center tw-justify-between">
                            <div className="tw-flex tw-items-center tw-gap-2 tw-text-primary tw-font-bold tw-text-lg">
                                <FaPoll className="tw-h-6 tw-w-6 tw-animate-pulse-slow" />
                                <h1 className="tw-tracking-tight tw-animate-fade-in-slide">OdaAnket</h1>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(prev => !prev)}
                                className="tw-sm:hidden tw-px-2 tw-py-1 tw-text-xs tw-text-primary-darktext tw-hover:text-primary tw- tw-transition"
                            >
                                <CiMenuKebab size={24} />
                            </button>
                        </div>

                        {/* Başlık ve Açıklama */}
                        <div className="tw-space-y-1">
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <button
                                    onClick={onBackToMain}
                                    className="tw-p-1 tw-rounded-full tw-bg-neutral-100 tw-hover:bg-neutral-200 tw-text-primary tw-transition"
                                    title="Ana Menüye Dön"
                                >
                                    <FiArrowLeft size={16} />
                                </button>
                                <h2 className="tw-text-base tw-sm:text-lg tw-font-medium tw-text-neutral-800 tw-truncate tw-max-w-[80%]">
                                    {surveyData.title}
                                </h2>
                            </div>
                            <p className="tw-text-sm tw-text-neutral-600 tw-truncate">{surveyData.description || "Açıklama Yok"}</p>
                        </div>

                        {/* Etiketler - daha küçük boy ve kaydırılabilir */}
                        <div className="tw-flex tw-gap-2 tw-overflow-x-auto tw-text-xs tw-pb-1">
                            <div className="tw-flex tw-items-center tw-gap-1 tw-border tw-border-primary tw-px-2 tw-py-0.5 tw-rounded-full tw-text-primary-dark tw-shrink-0">
                                <FiFolder size={14} />
                                <span>{surveyData.group || 'Belirtilmemiş'}</span>
                            </div>
                            <div className="tw-flex tw-items-center tw-gap-1 tw-border tw-border-primary tw-px-2 tw-py-0.5 tw-rounded-full tw-text-primary-dark tw-shrink-0">
                                <FiCalendar size={14} />
                                <span>
                                    {new Date(surveyData.createdAt).toLocaleDateString("tr-TR")}
                                </span>
                            </div>
                            <div className="tw-flex tw-items-center tw-gap-1 tw-border tw-border-primary tw-px-2 tw-py-0.5 tw-rounded-full tw-text-primary-dark tw-shrink-0">
                                <FiEdit size={14} />
                                <span>
                                    {new Date(surveyData.lastModified).toLocaleDateString("tr-TR")}
                                </span>
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium shrink-0
        ${surveyData.active ? 'text-success bg-success/10 border-success' : 'text-danger bg-danger/10 border-danger'}`}>
                                {surveyData.active ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
                                {surveyData.active ? "Açık" : "Kapalı"}
                            </div>
                        </div>

                        {/* Düzenle Butonu */}
                        <div className="tw-flex">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="tw-flex tw-items-center tw-gap-1 tw-px-3 tw-py-1 tw-text-xs tw-font-medium tw-border tw-rounded tw-text-primary-dark tw-border-primary tw-hover:bg-primary tw-hover:text-white tw-transition"
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
                <header className="tw-bg-neutral/0 tw-shadow-sm tw-mb-4">
                    <div className="tw-px-3 tw-py-2 tw-sm:px-6 tw-sm:py-3 tw-space-y-2">

                        {/* Logo ve Menü Butonu */}
                        <div className="tw-flex tw-items-center tw-justify-between">
                            <div className="tw-flex tw-items-center tw-gap-2 tw-text-primary tw-font-bold tw-text-lg">
                                <FaPoll className="tw-h-6 tw-w-6 tw-animate-pulse-slow" />
                                <h1 className="tw-tracking-tight tw-animate-fade-in-slide">OdaAnket</h1>
                            </div>
                        </div>

                        {/* Başlık ve Açıklama */}
                        <div className="tw-space-y-1">
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <button
                                    onClick={onBackToMain}
                                    className="tw-p-1 tw-rounded-full tw-bg-neutral-100 tw-hover:bg-neutral-200 tw-text-primary tw-transition"
                                    title="Ana Menüye Dön"
                                >
                                    <FiArrowLeft size={16} />
                                </button>
                                <h2 className="tw-text-base tw-sm:text-lg tw-font-medium tw-text-neutral-800 tw-truncate tw-max-w-[80%]">
                                    {surveyData.title} Cevapları
                                </h2>
                            </div>
                            <p className="tw-text-sm tw-text-neutral-600 tw-truncate">{surveyData.description || "Açıklama Yok"}</p>
                        </div>

                        {/* Etiketler - daha küçük boy ve kaydırılabilir */}
                        <div className="tw-flex tw-gap-2 tw-overflow-x-auto tw-text-xs tw-pb-1">
                            <div className="tw-flex tw-items-center tw-gap-1 tw-border tw-border-primary tw-px-2 tw-py-0.5 tw-rounded-full tw-text-primary-dark tw-shrink-0">
                                <FiFolder size={14} />
                                <span>{surveyData.group || 'Belirtilmemiş'}</span>
                            </div>
                            <div className="tw-flex tw-items-center tw-gap-1 tw-border tw-border-primary tw-px-2 tw-py-0.5 tw-rounded-full tw-text-primary-dark tw-shrink-0">
                                <FiCalendar size={14} />
                                <span>
                                    {new Date(surveyData.createdAt).toLocaleDateString("tr-TR")}
                                </span>
                            </div>
                            <div className="tw-flex tw-items-center tw-gap-1 tw-border tw-border-primary tw-px-2 tw-py-0.5 tw-rounded-full tw-text-primary-dark tw-shrink-0">
                                <FiEdit size={14} />
                                <span>
                                    {new Date(surveyData.lastModified).toLocaleDateString("tr-TR")}
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
                <header className="tw-bg-neutral/0 tw-shadow-sm tw-mb-4">
                    <div className="tw-px-3 tw-py-2 tw-sm:px-6 tw-sm:py-3 tw-space-y-2">

                        {/* Logo ve Menü Butonu */}
                        <div className="tw-flex tw-items-center tw-justify-between">
                            <div className="tw-flex tw-items-center tw-gap-2 tw-text-primary tw-font-bold tw-text-lg">
                                <FaPoll className="tw-h-6 tw-w-6 tw-animate-pulse-slow" />
                                <h1 className="tw-tracking-tight tw-animate-fade-in-slide">OdaAnket</h1>
                            </div>
                        </div>

                        {/* Başlık ve Açıklama */}
                        <div className="tw-space-y-1">
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <button
                                    onClick={onBackToMain}
                                    className="tw-p-1 tw-rounded-full tw-bg-neutral-100 tw-hover:bg-neutral-200 tw-text-primary tw-transition"
                                    title="Ana Menüye Dön"
                                >
                                    <FiArrowLeft size={16} />
                                </button>
                                <h2 className="tw-text-base tw-sm:text-lg tw-font-medium tw-text-neutral-800 tw-truncate tw-max-w-[80%]">
                                    {surveyData.title}
                                </h2>
                            </div>
                            <p className="tw-text-sm tw-text-neutral-600 tw-truncate">{surveyData.description || "Açıklama Yok"}</p>
                        </div>

                        {/* Etiketler - daha küçük boy ve kaydırılabilir */}
                        <div className="tw-flex tw-gap-2 tw-overflow-x-auto tw-text-xs tw-pb-1">
                            <div className="tw-flex tw-items-center tw-gap-1 tw-border tw-border-primary tw-px-2 tw-py-0.5 tw-rounded-full tw-text-primary-dark tw-shrink-0">
                                <FiFolder size={14} />
                                <span>{surveyData.group || 'Belirtilmemiş'}</span>
                            </div>
                            <div className="tw-flex tw-items-center tw-gap-1 tw-border tw-border-primary tw-px-2 tw-py-0.5 tw-rounded-full tw-text-primary-dark tw-shrink-0">
                                <FiCalendar size={14} />
                                <span>
                                    {new Date(surveyData.createdAt).toLocaleDateString("tr-TR")}
                                </span>
                            </div>
                            <div className="tw-flex tw-items-center tw-gap-1 tw-border tw-border-primary tw-px-2 tw-py-0.5 tw-rounded-full tw-text-primary-dark tw-shrink-0">
                                <FiEdit size={14} />
                                <span>
                                    {new Date(surveyData.lastModified).toLocaleDateString("tr-TR")}
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
        <header className="tw-flex tw-items-center tw-justify-between tw-p-6 tw-bg-neutral-white tw-border-b tw-border-neutral tw-shadow-sm">
            <div className="tw-flex tw-items-center tw-gap-3 tw-px-1 tw-rounded-xl tw-text-primary-dark tw-text-2xl">
                <FiFolder />
                <span>{selectedGroup || 'Belirtilmemiş'}</span>
            </div>
            <div className="tw-flex tw-items-center tw-space-x-4">
                <button
                    onClick={() => setSidebarOpen(prev => !prev)}
                    className="tw-p-2 tw-focus:outline-none tw-xl:hidden"
                >
                    <CiMenuKebab size={24} />
                </button>
                <button
                    className="tw-btn tw-btn-ghost tw-btn-circle tw-text-neutral-dark tw-hover:text-primary tw-tooltip tw-tooltip-bottom"
                    data-tip="Destek"
                >
                    <FiHelpCircle size={24} />
                </button>
                <button
                    className="tw-btn tw-btn-ghost tw-btn-circle tw-text-neutral-dark tw-hover:text-primary tw-tooltip tw-tooltip-bottom"
                    data-tip="Bildirimler"
                >
                    <FiBell size={24} />
                </button>
            </div>
        </header>
    );
}
