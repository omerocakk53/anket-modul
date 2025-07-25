import React, { useState } from 'react';
import AnswerAnalysis from './AnswerAnalysisComponent/AnswerAnalysis';
import { GoGraph } from 'react-icons/go';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { MdCompare } from 'react-icons/md';
import { PiScalesLight } from "react-icons/pi";
import AnswerScales from './AnswerScales';
import TableWrapper from './AnswerTableComponent/TableWrapper';
import AnswerComparison from './AnswerComparison';
const ViewSelector = ({ survey, cevaplar, handleDelete, answerDelete }) => {
    const [viewType, setViewType] = useState('scales');

    const handleViewChange = (newViewType) => {
        setViewType(newViewType);
    };

    return (
        <div>
            <div className="flex p-4 gap-4 mb-4">
                <button
                    onClick={() => handleViewChange('scales')}
                    className={`px-4 py-2 rounded ${viewType === 'scales' ? 'border border-primary text-primary' : 'border border-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <div className="flex items-center gap-2"><PiScalesLight size={20} /> Yanıt Ölçümü</div>
                </button>
                <button
                    onClick={() => handleViewChange('table')}
                    className={`px-4 py-2 rounded ${viewType === 'table' ? 'border border-primary text-primary' : 'border border-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <div className="flex items-center gap-2"><GoGraph size={20} /> Sonuç Tablosu</div>
                </button>
                <button
                    onClick={() => handleViewChange('graph')}
                    className={`px-4 py-2 rounded ${viewType === 'graph' ? 'border border-primary text-primary' : 'border border-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <div className="flex items-center gap-2"><TbBrandGoogleAnalytics size={20} /> Analiz</div>
                </button>
                <button
                    onClick={() => handleViewChange('compare')}
                    className={`px-4 py-2 rounded ${viewType === 'compare' ? 'border border-primary text-primary' : 'border border-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <div className="flex items-center gap-2"><MdCompare size={20} /> Karşılaştırma</div>
                </button>
            </div>

            {viewType === 'scales' && (
                <AnswerScales
                    shareData={{}}
                />
            )}
            {viewType === 'graph' && (
                <AnswerAnalysis
                    survey={survey}
                    answers={cevaplar}
                />
            )}
            {viewType === 'table' && (
                <TableWrapper
                    survey={survey}
                    answers={cevaplar}
                    onDelete={handleDelete}
                    answerDelete={answerDelete}
                />
            )}
            {viewType === 'compare' && (
                <AnswerComparison
                    survey={survey}
                    answers={cevaplar}
                />
            )}
        </div>
    );
};

export default ViewSelector;