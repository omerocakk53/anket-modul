import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import {
    FaSquareWhatsapp,
    FaTelegram,
    FaSquareXTwitter,
    FaSquareFacebook,
    FaLinkedin
} from 'react-icons/fa6';

function Share({ fetchsurveyById, savesurveyshare, getsurveyshare }) {
    const { surveyId } = useParams();
    const [survey, setSurvey] = useState({});
    const [shareData, setShareData] = useState({});
    const navigate = useNavigate();
    const BASE_URL = window.location.origin;
    const fileInputRef = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const surveyRes = await fetchsurveyById(surveyId);
                setSurvey(surveyRes);

                let shareRes;
                try {
                    shareRes = await getsurveyshare(surveyId);
                } catch (error) {
                    shareRes = null; // veri yoksa null kabul et
                }

                // Eğer veri varsa onu kullan, yoksa anket verilerinden başlangıç oluştur
                setShareData({
                    title: shareRes?.title || surveyRes.title || '',
                    description: shareRes?.description || surveyRes.description || '',
                    image: shareRes?.image || '', // burada backend'den gelen resim path olabilir
                });
            } catch (err) {
                console.error("Veri getirilemedi:", err);
            }
        };
        fetchData();
    }, [surveyId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShareData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setShareData(prev => ({
            ...prev,
            image: file,  // sadece image dosyasını güncelle
        }));
    };

    const handleAutoSave = async () => {
        const formData = new FormData();
        formData.append("surveyId", surveyId);
        formData.append("title", shareData.title ? shareData.title : survey.title);
        formData.append("description", shareData.description ? shareData.description : survey.description);
        if (shareData?.image) {
            formData.append("image", shareData.image);
        }
        try {
            await savesurveyshare(formData);
        } catch (err) {
            console.error("Paylaşım kaydedilemedi", err);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            handleAutoSave();
        }, 1000);
        return () => clearTimeout(timeout);
    }, [shareData]);

    const surveyLink = `${BASE_URL}/v1/survey/s/${survey.link}/${surveyId}`;

    const shareButtons = [
        {
            name: "WhatsApp",
            color: "text-green-600",
            url: `https://wa.me/?text=${encodeURIComponent(shareData?.title + '\n' + surveyLink)}`,
            icon: <FaSquareWhatsapp size={32} />,
        },
        {
            name: "Telegram",
            color: "text-sky-500",
            url: `https://t.me/share/url?url=${encodeURIComponent(surveyLink)}&text=${encodeURIComponent(shareData?.title)}`,
            icon: <FaTelegram size={32} />,
        },
        {
            name: "X (Twitter)",
            color: "text-black",
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(surveyLink)}&text=${encodeURIComponent(shareData?.title)}`,
            icon: <FaSquareXTwitter size={32} />,
        },
        {
            name: "LinkedIn",
            color: "text-blue-700",
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(surveyLink)}`,
            icon: <FaLinkedin size={32} />,
        },
        {
            name: "Facebook",
            color: "text-blue-600",
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(surveyLink)}`,
            icon: <FaSquareFacebook size={32} />,
        },
    ];



    const goBack = () => {
        navigate('/anket', { replace: true });
    };

    return (

        <>
            <Header isShareMode={true} surveyData={survey} onBackToMain={goBack} Sidebar={() => { }} />

            <div className="tw-max-w-6xl tw-mx-auto tw-px-4 tw-py-8 tw-overflow-x-hidden">
                <div className="tw-grid tw-gap-8 tw-lg:grid-cols-2">

                    {/* SOL PANEL: Form Alanı */}
                    <div className="tw-bg-white tw-rounded-2xl tw-shadow-xl tw-p-6 tw-md:p-8 tw-space-y-6">
                        <h2 className="tw-text-xl tw-md:text-2xl tw-font-bold tw-text-gray-800">Paylaşım Ayarları</h2>

                        <div>
                            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Paylaşım Başlığı</label>
                            <input
                                type="text"
                                name="title"
                                value={shareData?.title}
                                onChange={handleChange}
                                placeholder="Anket başlığı girin..."
                                className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-text-sm"
                            />
                        </div>

                        <div>
                            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Paylaşım Açıklaması</label>
                            <textarea
                                name="description"
                                value={shareData?.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Kısa açıklama yazın..."
                                className="tw-mt-1 tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-xl tw-focus:ring-2 tw-focus:ring-blue-500 tw-text-sm"
                            />
                        </div>

                        <div>
                            <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">Open Graph Görseli</label>
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className="tw-mt-2 tw-flex tw-items-center tw-justify-center tw-h-36 tw-sm:h-40 tw-border-2 tw-border-dashed tw-rounded-xl tw-cursor-pointer tw-hover:border-blue-400 tw-hover:text-blue-500 tw-transition tw-text-center tw-px-2"
                            >
                                <span className="tw-text-sm tw-text-gray-500">
                                    {shareData.image === "" ? 'Yeni görsel seç' : 'Görsel seçmek için tıklayın'}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="tw-hidden"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SAĞ PANEL: Önizleme + Paylaşım */}
                    <div className="tw-bg-gray-50 tw-rounded-2xl tw-shadow-lg tw-p-6 tw-md:p-8 tw-space-y-6">
                        <h2 className="tw-text-xl tw-md:text-2xl tw-font-bold tw-text-gray-800">Open Graph Önizleme</h2>

                        {/* Önizleme Kartı */}
                        <div className="tw-rounded-xl tw-overflow-hidden tw-border tw-bg-white">
                            <img
                                src={
                                    shareData?.image
                                        ? (typeof shareData.image === "string"
                                            ? `${BASE_URL}${shareData.image}`
                                            : URL.createObjectURL(shareData.image))
                                        : `${BASE_URL}/uploads/fixShareimg.png`
                                }
                                alt="OpenGraph"
                                className="tw-w-full tw-h-40 tw-sm:h-48 tw-object-cover"
                            />
                            <div className="tw-p-4">
                                <h3 className="tw-text-base tw-md:text-lg tw-font-semibold tw-break-words">
                                    {shareData?.title || 'Başlık bulunamadı'}
                                </h3>
                                <p className="tw-text-sm tw-text-gray-600 tw-break-words">
                                    {shareData?.description || 'Açıklama eklenmemiş.'}
                                </p>
                                <a
                                    href={surveyLink}
                                    className="tw-mt-2 tw-inline-block tw-text-blue-500 tw-text-xs tw-hover:underline tw-break-all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {surveyLink}
                                </a>
                            </div>
                        </div>

                        {/* Sosyal Medya Paylaşım Butonları */}
                        <div>
                            <h3 className="tw-text-base tw-md:text-lg tw-font-semibold tw-mb-2">Sosyal Medyada Paylaş</h3>
                            <div className="tw-flex tw-flex-wrap tw-gap-4 tw-justify-start tw-min-w-0">
                                {shareButtons.map((btn, i) => (
                                    <a
                                        key={i}
                                        href={btn.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group relative inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl transition-all duration-300 ease-in-out shadow-md bg-white hover:scale-110 hover:shadow-lg ${btn.color}`}
                                        aria-label={`${btn.name} ile paylaş`}
                                        title={`${btn.name} ile paylaş`}
                                    >
                                        <div className="tw-transition-transform tw-duration-300 tw-group-hover:rotate-[12deg] tw-group-hover:scale-110">
                                            {btn.icon}
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Share;
