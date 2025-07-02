import React, { useEffect, useState } from "react";
import { FaTrash } from 'react-icons/fa';
import Matris from "../components/Matris";
import ModalLayout from "../components/layouts/ModalLayout";

function MatrisSettingsModal({ isOpen, onClose, onSave, initialData, count }) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [complusory, setComplusory] = useState(true);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [allowCustomValue, setAllowCustomValue] = useState(false);
  const [value, setValue] = useState({});
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);

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
      allowCustomValue,
      SurveyNumberVisible
    });
    setColumns([]);
    setRows([]);
    setHelpText("");
    setTitle("");
  };

  useEffect(() => {
    if (Object.keys(initialData).length !== 0) {
      setTitle(initialData?.title || "");
      setHelpText(initialData?.helpText || "");
      setComplusory(initialData?.complusory ?? true);
      setColumns(Array.isArray(initialData?.data?.columns) ? initialData.data.columns : []);
      setRows(Array.isArray(initialData?.data?.rows) ? initialData.data.rows : []);
      setAllowCustomValue(initialData?.allowCustomValue || false);
      setSurveyNumberVisible(initialData?.SurveyNumberVisible)
    } else {
      setTitle("");
      setHelpText("");
      setComplusory(true);
      setColumns([]);
      setRows([]);
      setAllowCustomValue(false); setSurveyNumberVisible(true)
    }
  }, [initialData]);

  if (!isOpen) return null;
  const leftPanel = (
    <div className="tw-space-y-4">
      <h2 className="tw-text-lg tw-font-bold">Soru Ayarları</h2>

      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Başlık</label>
        <input
          className="tw-w-full tw-border tw-rounded tw-p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Yardım Metni</label>
        <input
          className="tw-w-full tw-border tw-rounded tw-p-2"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />
      </div>

      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Satırlar</label>
        {rows.map((r, idx) => (
          <div key={idx} className="tw-flex tw-items-center tw-gap-2 tw-mb-1">
            <input
              className="tw-flex-1 tw-border tw-rounded tw-p-2"
              value={r}
              onChange={(e) => handleRowChange(idx, e.target.value)}
            />
            <button
              onClick={() => removeRow(idx)}
              className="tw-text-red-500 tw-text-sm tw-font-bold tw-px-2"
              title="Satırı Sil"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button className="tw-mt-2 tw-text-blue-600" onClick={addRow}>
          + Satır Ekle
        </button>

        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1 tw-mt-4">Sütunlar</label>
        {columns.map((c, idx) => (
          <div key={idx} className="tw-flex tw-items-center tw-gap-2 tw-mb-1">
            <input
              className="tw-flex-1 tw-border tw-rounded tw-p-2"
              value={c}
              onChange={(e) => handleColumnChange(idx, e.target.value)}
            />
            <button
              onClick={() => removeColumn(idx)}
              className="tw-text-red-500 tw-text-sm tw-font-bold tw-px-2"
              title="Sütunu Sil"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button className="tw-mt-2 tw-text-blue-600" onClick={addColumn}>
          + Sütun Ekle
        </button>
      </div>
      <div className="tw-flex tw-items-center tw-space-x-3">
        <label
          className="tw-text-sm tw-font-medium tw-text-primary-dark tw-select-none tw-cursor-pointer"
          onClick={() => setAllowCustomValue(prev => !prev)}
        >
          Tablo Görünümü (Değer Girişli)
        </label>
        <button
          type="button"
          aria-pressed={allowCustomValue}
          onClick={() => setAllowCustomValue(prev => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${allowCustomValue ? 'bg-primary' : 'bg-neutral-light'
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${allowCustomValue ? 'translate-x-6' : 'translate-x-0'
              }`}
          />
        </button>
      </div>
      <div className="tw-flex tw-items-center tw-space-x-3">
        <label
          className="tw-text-sm tw-font-medium tw-text-primary-dark tw-select-none tw-cursor-pointer"
          onClick={() => setComplusory(prev => !prev)}
        >
          Zorunlu alan
        </label>
        <button
          type="button"
          aria-pressed={complusory}
          onClick={() => setComplusory(prev => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${complusory ? 'bg-primary' : 'bg-neutral-light'
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${complusory ? 'translate-x-6' : 'translate-x-0'
              }`}
          />
        </button>
      </div>
      <div className="tw-flex tw-items-center tw-space-x-3">
        <label
          className="tw-text-sm tw-font-medium tw-text-primary-dark tw-select-none tw-cursor-pointer"
          onClick={() => setSurveyNumberVisible(prev => !prev)}
        >
          Soru Numarası Gözüksün
        </label>
        <button
          type="button"
          aria-pressed={SurveyNumberVisible}
          onClick={() => setSurveyNumberVisible(prev => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${SurveyNumberVisible ? 'bg-primary' : 'bg-neutral-light'
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${SurveyNumberVisible ? 'translate-x-6' : 'translate-x-0'
              }`}
          />
        </button>
      </div>
      <div className="tw-flex tw-gap-2 tw-p-5 tw-absolute tw-left-0 tw-bottom-0 tw-bg-neutral tw-md:w-1/2 tw-w-full tw-">
        <button className="tw-px-4 tw-py-2 tw-bg-gray-300 tw-rounded" onClick={onClose}>
          Vazgeç
        </button>
        <button className="tw-px-4 tw-py-2 tw-bg-blue-500 tw-text-white tw-rounded" onClick={handleSave}>
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
      onChange={(value) => { setValue(value) }}
      allowCustomValue={allowCustomValue}
      count={count}
      SurveyNumberVisible={SurveyNumberVisible}
    />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
  
}

export default MatrisSettingsModal;
