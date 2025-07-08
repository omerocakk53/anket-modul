import React from "react";
import { useParams } from "react-router-dom";

// Kullanıcı Bilgileri Komponenti
const UserInfo = ({ data }) => {
    return (
        <div className="p-4 rounded shadow-md">
            <p className="text-lg font-bold mb-2">Kullanıcı Adı: {data.userName}</p>
            <p className="text-lg font-bold mb-2">Cevap ID: {data._id}</p>
            <p className="text-lg font-bold mb-2">Cevap Tarihi: {new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(data.createdAt))}</p>
        </div>
    );
};

// Cevap Komponenti
const Answer = ({ answer }) => {
    switch (answer.itemType) {
        case "ShortText":
            return <input type="text" value={answer.value} className="p-2 border rounded shadow-md" disabled readOnly />;
        case "LongText":
            return <textarea value={answer.value} className="p-2 border rounded shadow-md" disabled readOnly></textarea>;
        case "QuestionGroup":
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 border rounded shadow-md">
                    {Object.keys(answer.value[0]).map((key, idx) => (
                        <div key={idx} className="w-full md:w-1/2 xl:w-1/3 p-4">
                            <div className="grid grid-cols-2 gap-4 p-4 border rounded shadow-md">
                                <p className="text-lg font-bold">Soru: {key}</p>
                                <p className="text-lg">Cevap: {answer.value[0][key]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        case "MultipleChoice":
            return (
                <div className="flex flex-wrap justify-center">
                    {answer.value.map((choice, idx) => (
                        <div key={idx} className="w-full md:w-1/2 xl:w-1/3 p-4 border rounded shadow-md">
                            <p className="text-lg font-bold mb-2">Cevap: {choice}</p>
                        </div>
                    ))}
                </div>
            );
        case "ImageChoice":
            return (
                <div className="flex flex-wrap justify-center">
                    {answer.value.map((image, idx) => (
                        <div key={idx} className="w-full md:w-1/2 xl:w-1/3 p-4 border rounded shadow-md">
                            <img className="w-full h-auto object-cover rounded shadow-md" src={image.url} alt={image.title} />
                        </div>
                    ))}
                </div>
            );
        case "Matris":
            return (
                <div className="flex flex-wrap justify-center">
                    {Object.keys(answer.value).map((key, idx) => (
                        <div key={idx} className="w-full md:w-1/2 xl:w-1/3 p-4 border rounded shadow-md">
                            <div className="grid grid-cols-2 gap-4 p-4">
                                <p className="text-lg font-bold">Soru: {key}</p>
                                <p className="text-lg">Cevap: {answer.value[key]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        default:
            return <p className="text-lg font-bold mb-2 p-4 border rounded shadow-md">{answer.value}</p>;
    }
};

// Cevaplar Komponenti
const Answers = ({ data }) => {
    return (
        <div className="p-4 rounded shadow-md">
            {data.answers.map((answer, index) => (
                <div key={index} className="mb-4">
                    <h4 className="text-xl font-bold mb-1 text-gray-700">{answer.itemType}</h4>
                    <Answer answer={answer} />
                </div>
            ))}
        </div>
    );
};

// Ana Komponent
export default function AnswerContentDisplay({ data, onClose, surveyItem }) {
    if (!data) return <div>Loading...</div>;

    return (
        <div className="mx-auto p-4 bg-white rounded">
            <h2 className="text-3xl font-bold mb-3 text-gray-900 text-center">Cevap Detayları</h2>
            <button
                onClick={onClose}
                className="position-absolute top-3 right-3 mb-4 bg-danger hover:bg-danger-dark text-white font-bold py-2 px-4 rounded"
            >
                Kapat
            </button>
            <div className="mb-4">
                <UserInfo data={data} />
                <Answers data={data} />
            </div>
        </div>
    );
}