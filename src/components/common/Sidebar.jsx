import React, { useEffect, useState } from 'react';
import { FiPlus, FiFolderPlus, FiLogOut, FiFolder } from 'react-icons/fi';
import { FaPoll } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

export default function Sidebar({
    groupedSurveysData,
    selectedGroup,
    setSelectedGroup,
    username,
    handleLogout,
    openCreateSurveyModal,
    openCreateNewGroupModal,
    sidebar // dışarıdan gelen prop
}) {

    const [isVisible, setIsVisible] = useState(sidebar); // DOM'da görünüyor mu
    const [animationClass, setAnimationClass] = useState(""); // animasyon sınıfı

    useEffect(() => {
        if (sidebar) {
            setIsVisible(true); // görünür yap
            setAnimationClass("animate-slide-down-in"); // açılış animasyonu
        } else {
            setAnimationClass("animate-slide-down-out"); // kapanış animasyonu
            setTimeout(() => {
                setIsVisible(false); // animasyon bittikten sonra DOM'dan kaldır
            }, 400); // animasyon süresi (ms)
        }
    }, [sidebar]);

    const validGroupNames = Object.keys(groupedSurveysData)
        .filter(groupName => groupName !== "Geçersiz Klasör Adı");

    return (
        <div className={`xl:flex flex-col w-72 bg-neutral-white border-r border-neutral shadow-lg z-10  ${isVisible ? `absolute w-full ${animationClass}` : "hidden"}`}>
            {/* Logo ve Başlık */}
            <div className="tw-p-6 tw-border-b tw-border-neutral tw-bg-primary tw-text-neutral-white tw-flex tw-items-center tw-justify-center">
                <FaPoll className="tw-h-8 tw-w-8 tw-mr-3 tw-animate-pulse-slow" />
                <h1 className="tw-text-2xl tw-font-extrabold tw-tracking-tight tw-animate-fade-in-slide">
                    OdaAnket
                </h1>
            </div>

            {/* Yeni Anket Oluştur Butonu */}
            <div className="tw-p-6 tw-border-b tw-border-neutral-light tw-flex tw-justify-between">
                <button
                    className="tw-flex tw-items-center tw-gap-1 tw-px-4 tw-py-2 tw-text-sm tw-text-primary-dark tw-border tw-border-primary tw-rounded tw-hover:bg-primary tw-hover:text-white tw-transition"
                    onClick={openCreateSurveyModal}
                >
                    <FiPlus className="tw-h-6 tw-w-6" />
                    Yeni Anket Oluştur
                </button>
                {isVisible ? (<button
                    onClick={() => setAnimationClass("animate-slide-down-out")}
                    className="tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-text-sm tw-text-primary-dark tw-rounded tw-transition"
                >
                    <IoMdClose className="tw-hover:text-danger" size={24} />
                </button>) : (<></>)}
            </div>

            {/* Klasörler Listesi */}
            <nav className="tw-flex-1 tw-overflow-y-auto tw-p-4 tw-space-y-2">
                <h2 className="tw-text-xs tw-font-bold tw-text-neutral-dark tw-mb-3 tw-px-2">Klasörler</h2>
                <ul className="tw-space-y-1">
                    <li>
                        <button
                            className="tw-w-full tw-text-left tw-px-4 tw-py-2 tw-rounded-lg tw-text-neutral-darkest tw-hover:bg-neutral-light tw-hover:text-primary tw-transition-colors tw-duration-200 tw-flex tw-items-center tw-gap-3 tw-font-medium"
                            onClick={openCreateNewGroupModal}
                        >
                            <FiFolderPlus className="tw-h-5 tw-w-5 tw-text-primary" />
                            Yeni Klasör Oluştur
                        </button>
                    </li>

                    {validGroupNames.length === 0 ? (
                        <li className="tw-px-4 tw-py-2 tw-text-sm tw-text-neutral-dark">Henüz klasör oluşturulmadı.</li>
                    ) : (
                        validGroupNames.map((groupName) => (
                            <li
                                key={groupName}
                                className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200
                  ${selectedGroup === groupName
                                        ? 'bg-primary-light text-primary-text font-semibold shadow-sm'
                                        : 'text-neutral-darkest hover:bg-neutral-light hover:text-primary'
                                    }`}
                                onClick={() => setSelectedGroup(groupName)}
                            >
                                <div className="tw-flex tw-items-center tw-gap-3 tw-truncate">
                                    <FiFolder className={`h-5 w-5 ${selectedGroup === groupName ? 'text-primary-text' : 'text-primary-dark'}`} />
                                    <span className="tw-truncate">{groupName}</span>
                                </div>
                                <span className="tw-text-xs tw-text-neutral-dark tw-font-normal">{groupedSurveysData[groupName].length}</span>
                            </li>
                        ))
                    )}
                </ul>
            </nav>

            {/* Kullanıcı Bilgisi ve Çıkış */}
            <div className="tw-p-6 tw-border-t tw-border-neutral-light tw-mt-auto">
                <div className="tw-flex tw-items-center tw-justify-between tw-text-neutral-darkest tw-mb-3">
                    <div className="tw-flex tw-items-center tw-gap-2">
                        <div className="tw-avatar tw-placeholder">
                            <div className="tw-bg-primary tw-text-neutral-white tw-rounded-full tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-font-bold tw-text-sm">
                                {username ? username.charAt(0).toUpperCase() : 'U'}
                            </div>
                        </div>
                        <span className="tw-font-medium tw-text-sm tw-truncate">{username || 'Kullanıcı'}</span>
                    </div>
                    {/* <button
                        onClick={handleLogout}
                        className="tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-text-sm tw-text-danger tw-border tw-border-danger tw-rounded tw-hover:bg-danger tw-hover:text-white tw-transition"
                    >
                        Çıkış
                        <FiLogOut className="tw-h-5 tw-w-5" />
                    </button> */}
                </div>
            </div>
        </div>
    );
}
