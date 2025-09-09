import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Matris from "../Items/Matris";
import ModalLayout from "../../../layouts/ModalLayout";

function MatrisSettingsModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  count,
  surveyType,
}) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [complusory, setComplusory] = useState(true);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [value, setValue] = useState({});
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);
  const [MemberSatificaitonMatris, setMemberSatificaitonMatris] =
    useState(false);
  const memberSatisfactionGroups = [
    {
      title: "1. Memnuniyet Sütunu",
      questions: [
        "Kesinlikle Katılmıyorum",
        "Katılmıyorum",
        "Kararsızım",
        "Katılıyorum",
        "Kesinlikle Katılıyorum",
      ],
    },
    {
      title: "2. Memnuniyet Sütunu",
      questions: ["Çok Kötü", "Kötü", "Orta", "İyi", "Çok İyi"],
    },
  ];
  const handleRowChange = (index, value) => {
    const newRows = [...rows];
    newRows[index] = value;
    setRows(newRows);
  };

  const handleColumnChange = (index, value) => {
    const newColumns = [...columns];
    newColumns[index] = value;
    setColumns(newColumns);
  };

  const addRow = () => setRows([...rows, ""]);
  const addColumn = () => setColumns([...columns, ""]);

  const removeRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const removeColumn = (index) => {
    const newColumns = columns.filter((_, i) => i !== index);
    setColumns(newColumns);
  };

  const handleSave = () => {
    onSave({
      title,
      helpText,
      data: {
        rows,
        columns,
      },
      complusory,
      SurveyNumberVisible,
      MemberSatificaitonMatris,
    });
    setColumns([]);
    setRows([]);
    setHelpText("");
    setTitle("");
    setMemberSatificaitonMatris(false);
  };

  useEffect(() => {
    if (Object.keys(initialData).length !== 0) {
      setTitle(initialData?.title || "");
      setHelpText(initialData?.helpText || "");
      setComplusory(initialData?.complusory ?? true);
      setColumns(
        Array.isArray(initialData?.data?.columns)
          ? initialData.data.columns
          : [],
      );
      setRows(
        Array.isArray(initialData?.data?.rows) ? initialData.data.rows : [],
      );
      setSurveyNumberVisible(initialData?.SurveyNumberVisible);
      setMemberSatificaitonMatris(initialData?.MemberSatificaitonMatris);
    } else {
      setTitle("");
      setHelpText("");
      setComplusory(true);
      setColumns([]);
      setRows([]);
      setSurveyNumberVisible(true);
      setMemberSatificaitonMatris(false);
    }
  }, [initialData]);

  if (!isOpen) return null;
  const leftPanel = (
    <div className="space-y-2 mb-24">
      <h2 className="text-lg font-bold">Soru Ayarları</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Başlık</label>
        <input
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Yardım Metni (isteğe bağlı)
        </label>{" "}
        <input
          className="w-full border rounded p-2"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Satırlar</label>
        {rows.map((r, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-1">
            <input
              className="flex-1 border rounded p-2"
              value={r}
              onChange={(e) => handleRowChange(idx, e.target.value)}
            />
            <button
              onClick={() => removeRow(idx)}
              className="text-red-500 text-sm font-bold px-2"
              title="Satırı Sil"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button className="mt-2 text-blue-600" onClick={addRow}>
          + Satır Ekle
        </button>
        {!(surveyType === "MemberSatisfaction" && MemberSatificaitonMatris) && (
          <>
            <label className="block text-sm font-medium mb-1 mt-4">
              Sütunlar
            </label>
            {columns.map((c, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-1">
                <input
                  className="flex-1 border rounded p-2"
                  value={c}
                  onChange={(e) => handleColumnChange(idx, e.target.value)}
                />
                <button
                  onClick={() => removeColumn(idx)}
                  className="text-red-500 text-sm font-bold px-2"
                  title="Sütunu Sil"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button className="mt-2 text-blue-600" onClick={addColumn}>
              + Sütun Ekle
            </button>
          </>
        )}
        {surveyType === "MemberSatisfaction" && MemberSatificaitonMatris && (
          <div className="mt-4 space-y-2">
            <label className="text-sm font-semibold text-gray-800 block">
              Hazır Memnuniyet Grupları
            </label>
            <div className="flex flex-wrap gap-2">
              {memberSatisfactionGroups.map((group, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setColumns(group.questions)}
                  className={`
          px-4 py-2 rounded-2xl shadow-sm
          bg-gradient-to-br from-blue-50 to-blue-100
          text-blue-800 font-medium text-sm
          hover:from-blue-100 hover:to-blue-200 hover:shadow-md
          active:scale-[0.97] transition-all
          border border-blue-200
          ${String(columns) === String(group.questions) ? "border-success shadow-success" : ""}
        `}
                >
                  {group.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <label
          className="text-sm font-medium text-primary-dark select-none cursor-pointer"
          onClick={() => setComplusory((prev) => !prev)}
        >
          Zorunlu alan
        </label>
        <button
          type="button"
          aria-pressed={complusory}
          onClick={() => setComplusory((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
            complusory ? "bg-primary" : "bg-neutral-light"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
              complusory ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      {surveyType === "MemberSatisfaction" && (
        <div className="flex items-center space-x-3">
          <label
            className="text-sm font-medium text-primary-dark select-none cursor-pointer"
            onClick={() => setMemberSatificaitonMatris((prev) => !prev)}
          >
            Üye Memnuniyet Matris
          </label>
          <button
            type="button"
            aria-pressed={MemberSatificaitonMatris}
            onClick={() => setMemberSatificaitonMatris((prev) => !prev)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
              MemberSatificaitonMatris ? "bg-primary" : "bg-neutral-light"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                MemberSatificaitonMatris ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      )}
      <div className="flex items-center space-x-3">
        <label
          className="text-sm font-medium text-primary-dark select-none cursor-pointer"
          onClick={() => setSurveyNumberVisible((prev) => !prev)}
        >
          Soru Numarası Gözüksün
        </label>
        <button
          type="button"
          aria-pressed={SurveyNumberVisible}
          onClick={() => setSurveyNumberVisible((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
            SurveyNumberVisible ? "bg-primary" : "bg-neutral-light"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
              SurveyNumberVisible ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className="flex gap-2 p-5 absolute left-0 bottom-0 bg-neutral md:w-1/2 w-full ">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
          Vazgeç
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSave}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
  const rightPanel = (
    <Matris
      title={title}
      helpText={helpText}
      data={{ rows, columns }}
      id={"matris-" + count}
      value={value}
      onChange={(value) => {
        setValue(value);
      }}
      count={count}
      SurveyNumberVisible={SurveyNumberVisible}
    />
  );
  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default MatrisSettingsModal;
