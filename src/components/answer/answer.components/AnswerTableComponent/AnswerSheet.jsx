// src/pages/AnswerSheet.jsx
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

export default function AnswerSheet({ survey, answers, id, backToList }) {
    const [answer, setAnswer] = useState(null);

    useEffect(() => {
        const found = answers.find((a) => a._id === id);
        if (found) setAnswer(found);
    }, [id, answers]);

    if (!answer) return <div className="p-6">Cevap bulunamadı.</div>;

    const renderAnswerValue = (value, itemType) => {
        if (!value) return <span className="text-gray-400 italic">-</span>;

        // Düz metin veya sayı
        if (typeof value === 'string' || typeof value === 'number') {
            return <div className="text-blue-800 font-medium">{value}</div>;
        }

        // Görsel seçim
        if (Array.isArray(value) && itemType === 'ImageSelection') {
            return (
                <div className="flex flex-wrap gap-4">
                    {value.map((img, idx) => (
                        <div key={idx} className="w-32 rounded shadow text-center border bg-white">
                            <img src={img.url} alt={img.title} className="w-full h-24 object-cover rounded-t" />
                            <div className="p-2 text-xs text-gray-700">{img.title}</div>
                        </div>
                    ))}
                </div>
            );
        }

        // Dizi ama içinde obje var (örneğin grup, matris)
        if (Array.isArray(value) && value.every(v => typeof v === 'object')) {
            return (
                <div className="overflow-x-auto">
                    <table className="min-w-[300px] text-sm border border-gray-300 rounded bg-white">
                        <thead>
                            <tr className="bg-blue-100 text-blue-800 text-left">
                                {Object.keys(value[0]).map((key) => (
                                    <th key={key} className="p-2 border-r">{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {value.map((obj, rowIdx) => (
                                <tr key={rowIdx} className="even:bg-gray-50">
                                    {Object.values(obj).map((val, colIdx) => (
                                        <td key={colIdx} className="p-2 border-r">{val}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        // Dizi içinde düz değerler (çoktan seçmeli vs.)
        if (Array.isArray(value)) {
            return (
                <ul className="list-disc pl-15 text-blue-700 space-y-1">
                    {value.map((v, i) => (
                        <li key={i}>{String(v)}</li>
                    ))}
                </ul>
            );
        }

        // Obje
        if (typeof value === 'object') {
            return (
                <div className="overflow-x-auto">
                    <table className="min-w-[300px] text-sm border border-gray-300 rounded bg-white">
                        <thead>
                            <tr className="bg-blue-100 text-blue-800 text-left">
                                <th className="p-2 border-r">Alan</th>
                                <th className="p-2">Değer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(value).map(([key, val], idx) => (
                                <tr key={idx} className="even:bg-gray-50">
                                    <td className="p-2 border-r text-gray-600">{key}</td>
                                    <td className="p-2 text-gray-800">{String(val)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        return <div className="text-red-600 italic">Desteklenmeyen format</div>;
    };

    return (
        <div className="p-8 max-w-screen-lg mx-auto bg-gradient-to-br from-white to-blue-50">
            <button
                onClick={() => backToList()}
                className="mb-6 inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 transition"
            >
                <FaArrowLeft />
                Geri Dön
            </button>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">Cevap Kağıdı</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                <div className="bg-white p-4 rounded-xl shadow border">
                    <div className="text-gray-500">Cevap ID</div>
                    <div className="text-gray-900 font-semibold">{answer._id}</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow border">
                    <div className="text-gray-500">Yanıt Tarihi</div>
                    <div className="text-gray-900 font-semibold">
                        {new Date(answer.createdAt).toLocaleString('tr-TR')}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {answer.answers.map((a, i) => {
                    const question = survey.items.find((q) => q.id === a.itemId);
                    const title = question?.title || a.itemId;
                    const itemType = question?.type || 'Unknown';

                    return (
                        <div key={i} className="bg-white p-5 border rounded-xl shadow-sm">
                            <div className="text-sm text-gray-500 mb-1">Soru</div>
                            <div className="text-lg font-semibold text-gray-800 mb-2">{title}</div>

                            <div>{renderAnswerValue(a.value, itemType)}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
