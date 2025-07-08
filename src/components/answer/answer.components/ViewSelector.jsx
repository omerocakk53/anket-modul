import React, { useState } from 'react';
import AnswerTable from './AnswerTable';
import AnswerContentDisplay from './AnswerContentDisplay';
import AnswerGraph from './AnswerGraph';
import AnswerAnalysis from './AnswerAnalysis'; 
import { CiViewTable } from 'react-icons/ci';
import { GoGraph } from 'react-icons/go';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';

const ViewSelector = ({ survey, cevaplar, handleDelete }) => {
    const [viewType, setViewType] = useState('table');
    const [contentDisplay, setContentDisplay] = useState(null);

    const handleViewChange = (newViewType) => {
        setViewType(newViewType);
    };

    return (
        <div>
            <div className="flex p-4 gap-4 mb-4">
                <button
                    onClick={() => handleViewChange('table')}
                    className={`px-4 py-2 rounded ${viewType === 'table' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <div className="flex items-center gap-2"><CiViewTable /> Tablo Görünümü</div>
                </button>
                <button
                    onClick={() => handleViewChange('graph')}
                    className={`px-4 py-2 rounded ${viewType === 'graph' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <div className="flex items-center gap-2"><GoGraph /> Grafik Görünümü</div>
                </button>
                <button
                    onClick={() => handleViewChange('analysis')}
                    className={`px-4 py-2 rounded ${viewType === 'analysis' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <div className="flex items-center gap-2"><TbBrandGoogleAnalytics />Cevap Analizi</div>
                </button>
            </div>
            {viewType === 'table' && (
                contentDisplay ? (
                    <AnswerContentDisplay
                        data={contentDisplay}
                        surveyItems={survey.items || []}
                        onClose={() => setContentDisplay(null)}
                    />
                ) : (
                    <AnswerTable
                        answers={cevaplar}
                        onDelete={handleDelete}
                        onContentDisplay={setContentDisplay}
                    />
                )
            )}
            {viewType === 'graph' && (
                contentDisplay ? (
                    <AnswerContentDisplay
                        data={contentDisplay}
                        surveyItems={survey.items || []}
                        onClose={() => setContentDisplay(null)}
                    />
                ) : (
                    <AnswerGraph
                        data={cevaplar}
                        onContentDisplay={setContentDisplay}
                        onDelete={handleDelete}
                    />
                )
            )}
            {viewType === 'analysis' && (
                <AnswerAnalysis
                    survey={survey}
                    answers={cevaplar}
                />
            )}
        </div>
    );
};

export default ViewSelector;