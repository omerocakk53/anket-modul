import React from 'react';
import {
    FiEdit,
    FiLink,
    FiTrash2,
    FiBarChart2,
} from 'react-icons/fi';
import { RiSurveyLine } from 'react-icons/ri';
import { AiOutlineQrcode } from 'react-icons/ai';
import { TbLocationShare } from 'react-icons/tb';

export default function SurveyActions({
    survey,
    navigate,
    handleDelete,
    handleCopyLink,
    handleShowQr
}) {
    const goToEdit = () => navigate(`/anket/tasarim/${survey._id}`);
    const goToResults = () => navigate(`/anket/analiz/${survey._id}`);
    const goToPreview = () => navigate(`/anket/${survey.link}/${true}`);
    const goToShare = () => navigate(`/anket/share/${survey._id}`);

    const desktopActions = (
        <div className={`inset-0 flex flex-col justify-center items-center gap-3 rounded-lg z-20 transition-opacity duration-300`}>
            <div className="w-full px-4 grid grid-cols-2 gap-2">
                <button
                    onClick={goToEdit}
                    className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md
                     text-primary-text bg-primary hover:bg-primary-dark transition duration-200 hover:scale-105
                     shadow-sm hover:shadow-lg"
                >
                    <FiEdit className="h-4 w-4" /> Düzenle
                </button>
                <button
                    onClick={goToResults}
                    className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md
                     text-white bg-success hover:bg-success/90 transition duration-200 hover:scale-105
                     shadow-sm hover:shadow-lg"
                >
                    <FiBarChart2 className="h-4 w-4" /> Cevaplar
                </button>
            </div>
            <div className="w-full px-4 grid grid-cols-2 gap-2">
                <button
                    onClick={goToPreview}
                    className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md
                     text-white bg-info hover:bg-info/90 transition duration-200 hover:scale-105
                     shadow-sm hover:shadow-lg"
                >
                    <RiSurveyLine className="h-4 w-4" /> Önizle
                </button>
                <button
                    onClick={() => handleCopyLink(survey._id, survey.link)}
                    className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md
                     text-white bg-warning hover:bg-warning/90 transition duration-200 hover:scale-105
                     shadow-sm hover:shadow-lg"
                >
                    <FiLink className="h-4 w-4" /> Link
                </button>
            </div>
            <div className="w-full px-4 flex justify-between gap-2">
                <button
                    onClick={() => handleShowQr(survey._id, survey.link)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md
                     text-white bg-secondary hover:bg-secondary-dark transition duration-200 hover:scale-105
                     shadow-sm hover:shadow-lg"
                >
                    <AiOutlineQrcode className="h-4 w-4" /> QR Kod
                </button>
                <button
                    onClick={() => handleDelete(survey._id, survey.title)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md
                     text-white bg-danger hover:bg-danger-dark transition duration-200 hover:scale-105
                     shadow-sm hover:shadow-lg"
                >
                    <FiTrash2 className="h-4 w-4" /> Sil
                </button>
            </div>
            <div className="w-full px-4 grid grid-cols-2 gap-2">
                <button
                    onClick={goToShare}
                    className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium rounded-md
                     text-primary-text bg-primary hover:bg-primary-dark transition duration-200 hover:scale-105
                     shadow-sm hover:shadow-lg"
                >
                    <TbLocationShare className="h-4 w-4" /> Paylaş
                </button>
            </div>
        </div>
    );

    return (
        <>
            {desktopActions}
        </>
    );
}
