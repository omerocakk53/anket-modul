// AnketOynatıcısı.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast'; // Import toast

import Description from './Description';
import Dropdown from './Dropdown';
import Email from './Email';
import FileUpload from './FileUpload';
import FinishText from './FinishText';
import ImageChoice from './ImageChoice';
import Link from './Link';
import LongText from './LongText';
import Matris from './Matris';
import MultipleChoice from './MultipleChoice';
import Numeric from './Numeric';
import Payment from './Payment';
import QuestionGroup from './QuestionGroup';
import Ranking from './Ranking';
import Rating from './Rating';
import Scale from './Scale';
import ShortText from './ShortText';
import WelcomeText from './WelcomeText';
import { showSuccess } from "./successMesage/successController";

export default function SurveyPlayer({ surveyId, user, fetchsurveyById, answersave }) {
    const [data, setData] = useState([]);
    const [survey, setSurvey] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const currentItem = data[currentIndex];

    const handleChange = (id, value) => {
        setAnswers(prev => {
            if (typeof value === 'object' && !Array.isArray(value)) {
                return {
                    ...prev,
                    [id]: {
                        ...prev[id],
                        ...value
                    }
                };
            } else {
                return { ...prev, [id]: value };
            }
        });
        // Error state no longer directly used for display in the component
    };

    const isRequired = (item) => {
        return item?.complusory === true;
    };

    const isEmpty = (item, value) => {
        if (value === null || value === undefined || value === '') return true;

        if (item?.allowCustomValue) {
            const rows = item?.data?.rows || [];
            const columns = item?.data?.columns || [];

            for (let row of rows) {
                for (let col of columns) {
                    const cellValue = value?.[row]?.[col];
                    if (cellValue === undefined || cellValue === null || cellValue === '') {
                        return true;
                    }
                }
            }
            return false;
        }

        const subQuestionIds = item?.questions || item?.data?.rows || item?.data?.columns || [];

        if (typeof value === 'object' && !Array.isArray(value)) {
            if (subQuestionIds.length === 0) {
                return Object.values(value).some(subValue => subValue === null || subValue === undefined || subValue === '');
            }
            for (let subId of subQuestionIds) {
                if (!value.hasOwnProperty(subId) || value[subId] === null || value[subId] === undefined || value[subId] === '') {
                    return true;
                }
            }
            return false;
        } else {
            return value === '';
        }
    };

    const handleNext = async () => {
        const currentValue = answers[currentItem?.id];

        if (isRequired(currentItem) && isEmpty(currentItem, currentValue)) {
            toast.error("Bu alan zorunludur."); // Show error with toast
            return;
        }

        if (currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setSubmitted(true);
            try {
                const formattedAnswers = Object.entries(answers).map(([id, value]) => {
                    const item = data.find(q => q.id === id);
                    return {
                        itemId: id,
                        itemType: item?.type || "Unknown",
                        value: value
                    };
                });
                await answersave(surveyId, user.name, formattedAnswers);
                showSuccess("Anket Cevabınız Alındı");
            } catch (err) {
                console.error("Cevaplar kaydedilemedi:", err);
                toast.error("Cevaplar kaydedilemedi");
            }
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            // No error message needed when going back
        }
    };

    const questionLabels = [
        'Kısa Metin',
        'Çoktan Seçmeli',
        'Uzun Metin',
        'Resimli Çoktan Seçmeli',
        'Soru Grubu',
        'Açılan Liste',
        'Sayısal Cevap',
        'Değerlendirme Ölçeği',
        'E-posta',
        'Derecelendirme',
        'Bağlantı/Site Adresi',
        'Sıralama',
        'Dosya Yükleme',
        'Matris',
    ];


    const renderComponent = (item) => {
        // Sadece soru olan bileşenleri ayıkla
        const questionItems = data.filter(i => questionLabels.includes(i.label));

        // Bu item bir soruysa kaçıncı sırada olduğunu bul
        const questionIndex = questionItems.findIndex(i => i.id === item.id);
        const count = questionIndex !== -1 ? questionIndex + 1 : undefined;

        const commonProps = {
            ...item,
            id: item?.id,
            value: answers[item?.id],
            count, // sadece gerçek sorulara count verilir
            onChange: (value) => handleChange(item?.id, value),
        };

        switch (item?.label) {
            case 'Hoşgeldin Sayfası': return <WelcomeText {...item} />;
            case 'Bitiş Sayfası': return <FinishText {...item} />;
            case 'Kısa Metin': return <ShortText {...commonProps} />;
            case 'Çoktan Seçmeli': return <MultipleChoice {...commonProps} />;
            case 'Uzun Metin': return <LongText {...commonProps} />;
            case 'Resimli Çoktan Seçmeli': return <ImageChoice {...commonProps} />;
            case 'Soru Grubu': return <QuestionGroup {...commonProps} />;
            case 'Açılan Liste': return <Dropdown {...commonProps} />;
            case 'Sayısal Cevap': return <Numeric {...commonProps} />;
            case 'Değerlendirme Ölçeği': return <Scale {...commonProps} />;
            case 'E-posta': return <Email {...commonProps} />;
            case 'Derecelendirme': return <Rating {...commonProps} />;
            case 'Bağlantı/Site Adresi': return <Link {...commonProps} />;
            case 'Sıralama': return <Ranking {...commonProps} />;
            case 'Açıklama': return <Description {...item} />;
            case 'Dosya Yükleme': return <FileUpload {...commonProps} />;
            case 'Ödeme': return <Payment {...commonProps} />;
            case 'Matris': return <Matris {...commonProps} />;
            default: return null;
        }
    };


    useEffect(() => {
        async function loadSurvey() {
            try {
                const survey = await fetchsurveyById(surveyId);
                const sorted = [
                    ...survey.FinishWelcomeitems.filter(q => q.id.includes("welcome")),
                    ...survey.items.filter(q => !q.id.includes("welcome") && !q.id.includes("finish")),
                    ...survey.FinishWelcomeitems.filter(q => q.id.includes("finish"))
                ];
                setData(sorted);
                setSurvey(survey);
            } catch (err) {
                console.error("Anket yüklenemedi:", err);
                toast.error("Anket yüklenirken bir hata oluştu."); // Show toast for survey loading error
            } finally {
                setLoading(false);
            }
        }
        loadSurvey();
    }, [surveyId]);


    if (loading) return <div className="p-4 text-primary">Anket yükleniyor...</div>;

    if (!loading && data.length === 0) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="p-6 rounded text-neutral-darkest text-3xl font-semibold">
                    Anket boş.
                </div>
            </div>
        );
    }

    if (survey.active || (user?.role === 'admin' || user?.role === 'superAdmin')) {
        // Survey ön izleme ekranını göster
    } else {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="p-6 rounded text-neutral-darkest text-3xl font-semibold">
                    Bu Anket Kapalıdır.
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen overflow-hidden flex items-center justify-center">

            <div className="w-full h-full bg-neutral-dark shadow-lg rounded-md relative flex flex-col">
                {submitted ? (
                    <></>
                ) : (
                    <>
                        <div className="absolute top-4 left-0 right-0 text-center text-sm text-primary-text">
                            {questionLabels.includes(currentItem?.label)
                                ? `Soru ${data.filter(i => questionLabels.includes(i.label)).findIndex(i => i.id === currentItem.id) + 1} / ${data.filter(i => questionLabels.includes(i.label)).length}`
                                : null}
                        </div>
                        <div className="flex-grow flex items-center justify-center max-w-10/12 mx-auto w-full relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {currentItem && (
                                    <motion.div
                                        key={currentItem?.id}
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -100 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full"
                                    >
                                        {renderComponent(currentItem)}
                                        {/* Error message moved to toast notifications */}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="flex mb-10 justify-between max-w-2xl mx-auto w-full px-4">
                            <button
                                onClick={handleBack}
                                disabled={currentIndex === 0}
                                className="px-6 py-2 rounded bg-neutral-darkest text-primary-text hover:bg-primary-darktext disabled:opacity-50 transition-colors duration-200"
                            >
                                Geri
                            </button>
                            <button
                                onClick={handleNext}
                                className="px-6 py-2 rounded bg-primary text-primary-text hover:bg-primary-dark transition-colors duration-200"
                            >
                                {currentIndex === data.length - 1 ? 'Gönder' : 'İleri'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}