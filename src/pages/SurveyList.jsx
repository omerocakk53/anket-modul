// src/Pages/AnketListele.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

import SurveyCard from "../components/common/SurveyCard";
import { IoMdClose } from "react-icons/io";

export default function AnketListele({ visibleSurveys, setRefreshKey, deletesurvey, deletesurveyshareById, allanswerdelete }) {
    const [qrData, setQrData] = useState(null);
    const navigate = useNavigate();
    const url = window.location.origin;

    const handleDelete = async (id, title) => {
        toast((t) => (
            <div className="tw-flex tw-flex-col tw-items-center tw-p-4 tw-bg-white tw-rounded-lg tw-">
                <p className="tw-text-lg tw-font-semibold tw-mb-4 tw-text-gray-800">
                    Anketi silmek istediğinize emin misiniz?
                </p>
                <p className="tw-text-sm tw-text-gray-600 tw-mb-6">Bu işlem geri alınamaz.</p>
                <div className="tw-flex tw-gap-4">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await deletesurveyshareById(id);
                                await allanswerdelete(id);
                                await deletesurvey(id);
                                setRefreshKey(prev => prev + 1);
                                toast.success(`"${title}" anketi silindi.`);
                            } catch (err) {
                                toast.error(`Silinemedi: "${title}"`);
                                console.error("Silme hatası:", err);
                            }
                        }}
                        className="tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-hover:bg-red-700 tw-transition"
                    >
                        Evet, Sil
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="tw-bg-gray-200 tw-text-gray-700 tw-px-4 tw-py-2 tw-rounded tw-hover:bg-gray-300 tw-transition"
                    >
                        Vazgeç
                    </button>
                </div>
            </div>
        ), { autoClose: false });
    };
    const formatSurveyLink = (link) => {
        if (!link || typeof link !== 'string') return '';

        // Trim ve boşlukları tireye çevir
        return link.trim().replace(/\s+/g, '-');
    };

    const handleCopyLink = (id, surveyLink) => {
        const safeLink = formatSurveyLink(surveyLink);
        const link = `${url}${safeLink ? `/${safeLink}` : ''}/${id}`;
        navigator.clipboard.writeText(link)
            .then(() => toast.success("Anket linki panoya kopyalandı!"))
            .catch(() => toast.error("Link kopyalanamadı!"));
    };

    const handleShowQr = (id, surveyLink) => {
        const safeLink = formatSurveyLink(surveyLink);
        const link = `${url}${safeLink ? `/${safeLink}` : ''}/${id}`;
        setQrData(link);
        document.getElementById('qr_modal')
    };

    const handleCloseQr = () => setQrData(null);

    const handleDownloadPng = () => {
        const canvas = document.querySelector("#qr-code-png canvas");
        if (!canvas) return;

        const pngUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = "qr-kodu.png";
        a.click();
    };

    const handleDownloadSvg = () => {
        const svg = document.querySelector("#qr-code-svg svg");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "qr-kodu.svg";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            {visibleSurveys?.map(survey => (
                <SurveyCard
                    key={survey._id}
                    survey={survey}
                    handleDelete={handleDelete}
                    handleCopyLink={handleCopyLink}
                    handleShowQr={handleShowQr}
                    navigate={navigate}
                />
            ))}

            {qrData && (
                <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-backdrop-blur-xs">
                    <div className="tw-relative tw-bg-white tw-rounded-lg tw-shadow-lg tw-p-6 tw-max-w-xs">
                        <button
                            className="tw-absolute tw-top-2 tw-right-2 tw-text-gray-600 tw-hover:text-gray-800"
                            onClick={handleCloseQr}
                        >
                            <IoMdClose size={30} />
                        </button>

                        <h2 className="tw-text-lg tw-font-semibold tw-mb-4 tw-text-center">QR Kodu</h2>

                        {/* PNG görünüm için canvas */}
                        <div className="tw-flex tw-justify-center">
                            <div id="qr-code-png">
                                <QRCodeCanvas value={qrData} size={200} />
                            </div>
                        </div>

                        {/* SVG görünüm için svg (gizli ama indirilebilir) */}
                        <div id="qr-code-svg" className="tw-hidden">
                            <QRCodeSVG value={qrData} size={200} />
                        </div>

                        <p className="tw-mt-4 tw-text-center tw-text-sm tw-break-all tw-text-primary tw-underline">{qrData}</p>

                        <div className="tw-mt-6 tw-flex tw-justify-center tw-space-x-4">
                            <button
                                onClick={handleDownloadPng}
                                className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-bg-gradient-to-r tw-from-secondary tw-to-primary-darktext tw-text-white tw-text-sm tw-font-medium tw-rounded-xl tw-shadow-md tw-hover:shadow-lg tw-transition-all tw-duration-300 tw-hover:scale-105"
                            >
                                PNG İndir
                            </button>

                            <button
                                onClick={handleDownloadSvg}
                                className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-bg-gradient-to-r tw-from-secondary tw-to-primary-darktext tw-text-white tw-text-sm tw-font-medium tw-rounded-xl tw-shadow-md tw-hover:shadow-lg tw-transition-all tw-duration-300 tw-hover:scale-105"
                            >
                                SVG İndir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
