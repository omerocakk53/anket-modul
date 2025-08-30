// src/Pages/AnketListele.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';;
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import SurveyCard from "../components/Common/SurveyCard/index.jsx";
import { IoMdClose } from "react-icons/io";

export default function AnketListele(props) {
    const {
        allSurveys,
        user,
        createTemplate,
        visibleSurveys, setRefreshKey,
        createSurvey, deletesurvey,
        deletesurveyshareById,
        allanswerdelete,
        updatesurveyfeature
    } = props;

    const [qrData, setQrData] = useState(null);
    const navigate = useNavigate();
    const url = window.location.origin;

    const handleDelete = async (id, title) => {
        toast(
            (t) => (
                <div className="flex flex-col items-center p-4 rounded-lg max-w-sm">
                    <p className="text-lg font-semibold mb-4 text-primary-darktext">
                        Anketi silmek istediğinize emin misiniz?
                    </p>
                    <p className="text-sm text-primary-darktext mb-6">Bu işlem geri alınamaz.</p>
                    <div className="flex gap-4">
                        <button
                            onClick={async () => {
                                toast.dismiss(t.id);
                                try {
                                    await deletesurvey(id);
                                    await allanswerdelete(id);
                                    await deletesurveyshareById(id);
                                    setRefreshKey((prev) => prev + 1);
                                    toast.success(`"${title}" anketi silindi.`);
                                } catch (err) {
                                    toast.error(`Silinemedi: "${title}"`);
                                    console.error("Silme hatası:", err);
                                }
                            }}
                            className="bg-danger text-white px-4 py-2 rounded hover:bg-danger-dark transition"
                        >
                            Evet
                        </button>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="bg-neutral-light text-neutral-darkest px-4 py-2 rounded hover:bg-neutral-dark transition"
                        >
                            Hayır
                        </button>
                    </div>
                </div>
            ),
            { duration: 3000, closeButton: false, position: "top-left", style: { zIndex: 9999 } }
        );
    };
    const formatSurveyLink = (link) => {
        if (!link || typeof link !== 'string') return '';

        // Trim ve boşlukları tireye çevir
        return link.trim().replace(/\s+/g, '-');
    };

    const handleCopyLink = (id, surveyLink) => {
        const safeLink = formatSurveyLink(surveyLink);
        const link = `${url}${safeLink ? `/anket/${safeLink}` : ''}`;
        navigator.clipboard.writeText(link)
            .then(() => toast.success("Anket linki panoya kopyalandı!"))
            .catch(() => toast("Link kopyalanamadı!"));
    };

    const handleShowQr = (id, surveyLink) => {
        const safeLink = formatSurveyLink(surveyLink);
        const link = `${url}${safeLink ? `/anket/${safeLink}` : ''}`;
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
            {visibleSurveys?.map((survey, idx) => (
                <div key={idx}>
                    <SurveyCard
                        setRefreshKey={setRefreshKey}
                        createSurvey={createSurvey}
                        allSurveys={allSurveys}
                        survey={survey}
                        navigate={navigate}
                        handleDelete={handleDelete}
                        handleCopyLink={handleCopyLink}
                        handleShowQr={handleShowQr}
                        updatesurveyfeature={updatesurveyfeature}
                        createTemplate={createTemplate}
                        user={user}
                    />
                </div>
            ))}

            {qrData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r bg-primary-darktext text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                PNG İndir
                            </button>

                            <button
                                onClick={handleDownloadSvg}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r bg-primary-darktext text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
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
