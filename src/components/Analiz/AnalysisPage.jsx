import { useState } from 'react'
import DateRangeSelector from './components/DateRangeSelector'
import SurveyComparisonChart from './components/SurveyComparisonChart'
import ChangeHighlights from './components/ChangeHighlights'
import { calculateItemAverages, mergeAverages } from '../../utils/analysisUtils'

const AnalysisPage = ({ answerget }) => {
    const { surveyId } = useParams();
    const [range1, setRange1] = useState(null)
    const [range2, setRange2] = useState(null)
    const [comparisonData, setComparisonData] = useState([])

    const handleCompare = async () => {
        const allAnswers = await answerget(surveyId)

        const data1 = allAnswers.filter(a => {
            const d = new Date(a.createdAt)
            return d >= range1.startDate && d <= range1.endDate
        })

        const data2 = allAnswers.filter(a => {
            const d = new Date(a.createdAt)
            return d >= range2.startDate && d <= range2.endDate
        })

        const avg1 = calculateItemAverages(data1)
        const avg2 = calculateItemAverages(data2)

        const comparison = mergeAverages(avg1, avg2, {
            "rating-13": "Genel Memnuniyet",
            "scale-12": "Personel İlgisi",
            "numeric-4": "Bekleme Süresi (dk)"
        })

        setComparisonData(comparison)
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-neutral-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-primary-darktext mb-6">📊 Anket Analizi – Karşılaştırmalı Görünüm</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-neutral-light p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-primary-dark mb-2">1. Tarih Aralığı</h4>
                    <DateRangeSelector onRangeChange={setRange1} />
                </div>
                <div className="bg-neutral-light p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-primary-dark mb-2">2. Tarih Aralığı</h4>
                    <DateRangeSelector onRangeChange={setRange2} />
                </div>
            </div>

            <button
                onClick={handleCompare}
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition mb-6"
            >
                Karşılaştır
            </button>

            {comparisonData.length > 0 && (
                <div className="space-y-6">
                    <ChangeHighlights data={comparisonData} />
                    <SurveyComparisonChart data={comparisonData} />
                </div>
            )}
        </div>
    )
}

export default AnalysisPage
