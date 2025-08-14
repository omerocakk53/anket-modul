import React, { useEffect, useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const QuestionsGuidancePopUp = ({ guidance, closeGuidance, variables, onDelete }) => {
    const emptyLogic = {
        itemId: "",
        expectedValue: "",
        conditionType: "",
        trueDestinationItemId: "",
        falseDestinationItemId: ""
    };

    const [item, setItem] = useState(null);
    const [finishWelcomeitems, setFinishWelcomeitems] = useState([]);
    const [items, setItems] = useState([]);
    const [logics, setLogics] = useState([emptyLogic]);

    useEffect(() => {
        if (guidance.item) {
            setItem(guidance.item);
            setItems(guidance.items);
            setFinishWelcomeitems(guidance.finishWelcomeitems);

            // Varolan mantıkları al, matris/tabloysa Row ve Col ekle (UI için)
            const existing = variables.filter(v => v.itemId === guidance.item.id)
                .map(v => {
                    if (guidance.item.type === "Matris" || guidance.item.type === "Table") {
                        // expectedValue 'Row|Col' formatında ise ayır
                        const [Row, Col] = (v.expectedValue || "").split("|");
                        return {
                            ...emptyLogic,
                            ...v,
                            Row: Row || "",
                            Col: Col || ""
                        };
                    }
                    return { ...emptyLogic, ...v };
                });

            if (existing.length) {
                setLogics(existing);
            } else {
                if (guidance.item.type === "Matris" || guidance.item.type === "Table") {
                    setLogics([{ ...emptyLogic, itemId: guidance.item.id, Row: "", Col: "" }]);
                } else {
                    setLogics([{ ...emptyLogic, itemId: guidance.item.id }]);
                }
            }
        }
    }, [guidance, variables]);

    if (!guidance.isOpen || !item) return null;

    const isOpenEnded = [
        "ShortText", "LongText", "Numeric", "Email", "QuestionGroup",
        "Scale", "Rating", "FileUpload"
    ].includes(item.type);

    const onAdd = () => {
        if (item.type === "Matris" || item.type === "Table") {
            setLogics(prev => [...prev, { ...emptyLogic, itemId: item.id, Row: "", Col: "" }]);
        } else {
            setLogics(prev => [...prev, { ...emptyLogic, itemId: item.id }]);
        }
    };

    const onChangeLogic = (index, field, value) => {
        setLogics(prev => {
            const newLogics = [...prev];
            const updatedLogic = { ...newLogics[index], [field]: value };

            if ((item.type === "Matris" || item.type === "Table") && (field === "Row" || field === "Col")) {
                if (updatedLogic.Row && updatedLogic.Col) {
                    updatedLogic.expectedValue = `${updatedLogic.Row}|${updatedLogic.Col}`;
                    updatedLogic.conditionType = "match";
                } else {
                    updatedLogic.expectedValue = "";
                    updatedLogic.conditionType = "";
                }
            } else if (field === "expectedValue") {
                // Matris ve Tablo dışında expectedValue ve conditionType set et
                updatedLogic.conditionType = "match";
            }

            newLogics[index] = updatedLogic;
            return newLogics;
        });
    };

    const removeLogic = (index) => {
        const updated = logics.filter((_, i) => i !== index);
        setLogics(updated);
        if (onDelete) onDelete(updated, item.id);  // itemId'yi de gönderiyoruz
    };

    // Backend'e göndermeden Row ve Col kaldır
    const prepareLogicsForBackend = (logics) => {
        return logics.map(({ Row, Col, ...rest }) => rest);
    };

    const handleClose = () => {
        const cleanedLogics = prepareLogicsForBackend(logics);
        closeGuidance(cleanedLogics);
    };

    const getFilteredOptions = (currentIndex) => {
        if (isOpenEnded) return [];

        const usedValues = logics
            .filter((_, i) => i !== currentIndex)
            .map(l => l.expectedValue)
            .filter(v => v);

        const allOptions = [
            ...(item.value || []),
            ...(item.options || []),
            ...(item.images || [])
        ];

        return allOptions.filter(o => !usedValues.includes(o));
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-md shadow-lg w-[80%] p-5 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Soru Yönlendirmesi</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-red-500"
                    >
                        <AiOutlineClose size={20} />
                    </button>
                </div>

                <div className="bg-gray-50 p-3 rounded mb-4 text-sm text-gray-600 flex flex-col gap-1">
                    <div><span className="font-medium">Komponent:</span> {item.label}</div>
                    <div><span className="font-medium">Soru:</span> {item.title}</div>
                </div>

                {logics.map((logic, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-4 flex-wrap">
                        {isOpenEnded ? (
                            <select
                                value={logic.conditionType}
                                onChange={(e) => onChangeLogic(idx, "conditionType", e.target.value)}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                            >
                                <option value="">Seçiniz</option>
                                <option value="exists">VARSA</option>
                                <option value="not_exists">YOKSA</option>
                            </select>
                        ) : (
                            <>
                                {(item.type === "Matris" || item.type === "Table") ? (
                                    <>
                                        <select
                                            value={logic.Row || ""}
                                            onChange={e => onChangeLogic(idx, "Row", e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                                        >
                                            <option value="">Satır Seçiniz</option>
                                            {item.data.rows.map(r => (
                                                <option key={r} value={r}>{r}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={logic.Col || ""}
                                            onChange={e => onChangeLogic(idx, "Col", e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                                        >
                                            <option value="">Sütun Seçiniz</option>
                                            {item.data.columns.map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </>
                                ) : (
                                    <>
                                        <select
                                            value={logic.expectedValue && !logic.expectedValue.includes("|") ? logic.expectedValue : ""}
                                            onChange={(e) => {
                                                onChangeLogic(idx, "expectedValue", e.target.value);
                                            }}
                                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                                        >
                                            <option value="">Seçiniz</option>
                                            {getFilteredOptions(idx).map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </>
                                )}
                            </>
                        )}

                        <span className="text-sm text-gray-600">Yanıtı</span>
                        <label className="text-sm font-medium text-gray-700">→ Bu soruya git:</label>
                        <select
                            value={logic.trueDestinationItemId}
                            onChange={(e) => onChangeLogic(idx, "trueDestinationItemId", e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm w-[160px]"
                        >
                            <option value="">Seçiniz</option>
                            {[...items.filter(itm => itm.id !== item.id), ...finishWelcomeitems].map((itm, index) => (
                                <option key={itm.id} value={itm.id}>
                                    {index + 1}. {itm.title} - {itm.label}
                                </option>
                            ))}
                        </select>

                        <label className="text-sm font-medium text-gray-700">Değilse:</label>
                        <select
                            value={logic.falseDestinationItemId}
                            onChange={(e) => onChangeLogic(idx, "falseDestinationItemId", e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm w-[160px]"
                        >
                            <option value="">Seçiniz</option>
                            {[...items.filter(itm => itm.id !== item.id), ...finishWelcomeitems].map((itm, index) => (
                                <option key={itm.id} value={itm.id}>
                                    {index + 1}. {itm.title} - {itm.label}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() => removeLogic(idx)}
                            className="bg-danger text-white px-2 py-1 rounded hover:bg-danger/30"
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                ))}

                <div className="flex justify-between mt-4">
                    <button
                        onClick={onAdd}
                        className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/30 text-sm"
                    >
                        <FiPlus size={20} />
                    </button>
                    <div>
                        <button
                            onClick={handleClose}
                            className="bg-success text-white px-4 py-2 rounded-xl hover:bg-success/30 text-sm"
                        >
                            <AiOutlineCheck size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionsGuidancePopUp;
