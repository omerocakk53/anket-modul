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

function Share({fetchSurveyById,saveSurveyShare, getSurveyShare }) {
    const { surveyId } = useParams();
    const [survey, setSurvey] = useState({});
    const [shareData, setShareData] = useState({});
    const navigate = useNavigate();
    console.log(survey)
    const BASE_URL = window.location.origin;
    const fileInputRef = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const surveyRes = await fetchSurveyById(surveyId);
                setSurvey(surveyRes);

                let shareRes;
                try {
                    shareRes = await getSurveyShare(surveyId);
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
            await saveSurveyShare(formData);
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

    const surveyLink = `${BASE_URL}/v1/s/${survey.link}/${surveyId}`;

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
        navigate('/anketolustur',{replace: true }); 
    };

    return (

        <>
            <Header isShareMode={true} surveyData={survey} onBackToMain={goBack} Sidebar={() => { }} />

            <div className="max-w-6xl mx-auto px-4 py-8 overflow-x-hidden">
                <div className="grid gap-8 lg:grid-cols-2">

                    {/* SOL PANEL: Form Alanı */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Paylaşım Ayarları</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Paylaşım Başlığı</label>
                            <input
                                type="text"
                                name="title"
                                value={shareData?.title}
                                onChange={handleChange}
                                placeholder="Anket başlığı girin..."
                                className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Paylaşım Açıklaması</label>
                            <textarea
                                name="description"
                                value={shareData?.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Kısa açıklama yazın..."
                                className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Open Graph Görseli</label>
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className="mt-2 flex items-center justify-center h-36 sm:h-40 border-2 border-dashed rounded-xl cursor-pointer hover:border-blue-400 hover:text-blue-500 transition text-center px-2"
                            >
                                <span className="text-sm text-gray-500">
                                    {shareData.image === "" ? 'Yeni görsel seç' : 'Görsel seçmek için tıklayın'}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SAĞ PANEL: Önizleme + Paylaşım */}
                    <div className="bg-gray-50 rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Open Graph Önizleme</h2>

                        {/* Önizleme Kartı */}
                        <div className="rounded-xl overflow-hidden border bg-white">
                            <img
                                src={
                                    shareData?.image
                                        ? (typeof shareData.image === "string"
                                            ? `${BASE_URL}${shareData.image}`
                                            : URL.createObjectURL(shareData.image))
                                        : `${BASE_URL}/uploads/fixShareimg.png`
                                }
                                alt="OpenGraph"
                                className="w-full h-40 sm:h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-base md:text-lg font-semibold break-words">
                                    {shareData?.title || 'Başlık bulunamadı'}
                                </h3>
                                <p className="text-sm text-gray-600 break-words">
                                    {shareData?.description || 'Açıklama eklenmemiş.'}
                                </p>
                                <a
                                    href={surveyLink}
                                    className="mt-2 inline-block text-blue-500 text-xs hover:underline break-all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {surveyLink}
                                </a>
                            </div>
                        </div>

                        {/* Sosyal Medya Paylaşım Butonları */}
                        <div>
                            <h3 className="text-base md:text-lg font-semibold mb-2">Sosyal Medyada Paylaş</h3>
                            <div className="flex flex-wrap gap-4 justify-start min-w-0">
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
                                        <div className="transition-transform duration-300 group-hover:rotate-[12deg] group-hover:scale-110">
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
