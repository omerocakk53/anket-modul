// src/Pages/AnketListele.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSurveyById } from "../services/AnketleriSil";
import { toast } from "react-toastify";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

import SurveyCard from "../components/common/SurveyCard";
import { IoMdClose } from "react-icons/io";
import { deleteSurveyShareById } from "../services/surveyShareService";
import { AllAnswerDelete } from "../services/cevaplariSil";

export default function AnketListele({ visibleSurveys, setRefreshKey }) {
    const [qrData, setQrData] = useState(null);
    const navigate = useNavigate();
    const url = window.location.origin;

    const handleDelete = async (id, title) => {
        toast((t) => (
            <div className="flex flex-col items-center p-4 bg-white rounded-lg ">
                <p className="text-lg font-semibold mb-4 text-gray-800">
                    Anketi silmek istediğinize emin misiniz?
                </p>
                <p className="text-sm text-gray-600 mb-6">Bu işlem geri alınamaz.</p>
                <div className="flex gap-4">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await deleteSurveyShareById(id);
                                await AllAnswerDelete(id);
                                await deleteSurveyById(id);
                                setRefreshKey(prev => prev + 1);
                                toast.success(`"${title}" anketi silindi.`);
                            } catch (err) {
                                toast.error(`Silinemedi: "${title}"`);
                                console.error("Silme hatası:", err);
                            }
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                        Evet, Sil
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
                    <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-xs">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={handleCloseQr}
                        >
                            <IoMdClose size={30} />
                        </button>

                        <h2 className="text-lg font-semibold mb-4 text-center">QR Kodu</h2>

                        {/* PNG görünüm için canvas */}
                        <div className="flex justify-center">
                            <div id="qr-code-png">
                                <QRCodeCanvas value={qrData} size={200} />
                            </div>
                        </div>

                        {/* SVG görünüm için svg (gizli ama indirilebilir) */}
                        <div id="qr-code-svg" className="hidden">
                            <QRCodeSVG value={qrData} size={200} />
                        </div>

                        <p className="mt-4 text-center text-sm break-all text-primary underline">{qrData}</p>

                        <div className="mt-6 flex justify-center space-x-4">
                            <button
                                onClick={handleDownloadPng}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary to-primary-darktext text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                PNG İndir
                            </button>

                            <button
                                onClick={handleDownloadSvg}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary to-primary-darktext text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
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
