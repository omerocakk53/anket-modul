import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import QuestionRenderer from './QuestionRenderer';
import NavigationButtons from './NavigationButtons';
import QuestionProgress from './QuestionProgress';
import Loading from './Loading';
import SurveyEmpty from './SurveyEmpty';
import SurveyClosed from './SurveyClosed';
import useSurveyBySlug from "./hook/useSurveyBySlug";
import useSurveyNavigation from './hook/useSurveyNavigation';
import { submitAnswers } from './utils/submitAnswers';

export default function SurveyPlayer({ slug, tester, user, fetchsurveyById, answersave, viewsCount, fetchallsurvey }) {
    const [answers, setAnswers] = useState({});
    const [startDate] = useState(new Date());
    // Hook çağrılarını koşulsuz, en üstte yapıyoruz
    const {
        surveyId,
        data,
        survey,
        variables,
        loadingSurveys,
        loadingSurveyData
    } = useSurveyBySlug(slug, fetchallsurvey, fetchsurveyById); 
                                                                  
    if (!survey) return null;

    // Yalnızca surveyId varsa viewsCount fonksiyonunu çağır
    useEffect(() => {
        if (tester) return;  // tester true ise çalıştırma
        viewsCount(surveyId).catch(console.error);
    }, [viewsCount, tester,surveyId]);

    const wrappedSubmitAnswers = async (...args) => {
        if (tester) return; // tester ise submit işlemi yapılmaz
        return submitAnswers(...args);
    };

    const {
        currentIndex,
        submitted,
        goNext,
        goBack,
        setSubmitted
    } = useSurveyNavigation({
        data,
        variables,
        answers,
        setAnswers,
        submitAnswersFn: wrappedSubmitAnswers,
        surveyId,
        user,
        startDate,
        answersave
    });

    // Render koşulları sadece JSX return öncesinde kontrol edilir
    if (loadingSurveys || loadingSurveyData) return <Loading />;
    if (!data.length) return <SurveyEmpty />;
    if (!survey.active && !(user?.role === "admin" || user?.role === "superAdmin")) return <SurveyClosed />;

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
    };
    return (
        <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-neutral-dark">
            {tester && (
                <div className="sticky top-0 left-0 w-full mb-2 bg-danger text-white text-center py-2 px-4 text-sm font-medium shadow-md z-50 select-none">
                    Siz anketinizin <strong>ön izlemesini</strong> görmektesiniz. Bu durumda hiç bir yanıt kaydolmayacaktır.
                    Ön izleme durumundan çıkmak ve yanıt kaydı imkanı için{' '}
                    <a href={`/anket/${slug}`} className="font-semibold hover:text-yellow-300 transition-colors">
                        burayı tıklayınız
                    </a>
                </div>
            )}

            <div className={`w-full h-full shadow-lg relative flex flex-col flex-grow`}>
                {!submitted && (
                    <>
                        <QuestionProgress currentItem={currentItem} data={data} />
                        <div className="flex-grow flex items-center justify-center max-w-10/12 mx-auto w-full relative overflow-hidden px-2 py-2">
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
                                        <QuestionRenderer item={currentItem} answers={answers} onChange={handleChange} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <NavigationButtons
                            currentIndex={currentIndex}
                            maxIndex={data.length - 1}
                            onBack={goBack}
                            onNext={async () => {
                                try {
                                    await goNext();
                                } catch (err) {
                                    toast.error(err.message);
                                }
                            }}
                            disableBack={currentIndex === 0}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
