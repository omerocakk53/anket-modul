import React, { useEffect, useState } from "react";
import Dropdown from "../Components/Dropdown";
import { FaTrash } from 'react-icons/fa';
import ModalLayout from "../Components/layouts/ModalLayout";
function DropdownSettingsModal({ isOpen, onClose, onSave, initialData, count }) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [options, setOptions] = useState([]);
  const [complusory, setComplusory] = useState(true);
  const [value, setValue] = useState("");
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  useEffect(() => {
    if (Object.keys(initialData).length !== 0) {
      setTitle(initialData?.title);
      setHelpText(initialData?.helpText)
      setComplusory(initialData?.complusory)
      setOptions(Array.isArray(initialData?.options) ? initialData.options : []);
      setSurveyNumberVisible(initialData?.SurveyNumberVisible)
    } else {
      setHelpText("");
      setTitle("");
      setComplusory(true);
      setOptions([]);
    }
  }, [initialData]);

  const handleSave = () => {
    onSave({
      title,
      helpText,
      options,
      complusory, SurveyNumberVisible
    });
    setHelpText("");
    setTitle("");
    setOptions([]); setSurveyNumberVisible(true)
  };

  if (!isOpen) return null;


  const leftPanel = (
    <div className="space-y-4">
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
        <label className="block text-sm font-medium mb-1">Yardım Metni</label>
        <input
          className="w-full border rounded p-2"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Seçenekler</label>
        {options.map((opt, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-1">
            <input
              className="flex-1 border rounded p-2"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              placeholder={`Seçenek ${idx + 1}`}
            />
            <button
              onClick={() => removeOption(idx)}
              className="text-red-500 text-sm font-bold px-2"
              title="Seçeneği Sil"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button className="mt-2 text-blue-600" onClick={addOption}>
          + Seçenek Ekle
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <label
          className="text-sm font-medium text-primary-dark select-none cursor-pointer"
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
      <div className="flex items-center space-x-3">
        <label
          className="text-sm font-medium text-primary-dark select-none cursor-pointer"
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
      <div className="flex gap-2 p-5 absolute left-0 bottom-0 bg-neutral w-1/2">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
          Vazgeç
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
          Kaydet
        </button>
      </div>
    </div>
  );

  const rightPanel = (
    <Dropdown title={title} helpText={helpText} options={options} onChange={(value) => { setValue(value) }} value={value} count={count} SurveyNumberVisible={SurveyNumberVisible} />
  );
  
  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default DropdownSettingsModal;
