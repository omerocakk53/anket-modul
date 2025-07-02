import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import MultipleChoice from "../components/MultipleChoice";
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import ModalLayout from "../components/layouts/ModalLayout";

function MultipleChoiceSettingsModal({ isOpen, onClose, onSave, initialData, count }) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [options, setOptions] = useState([]);
  const [allowCustomOption, setAllowCustomOption] = useState(false);
  const [complusory, setComplusory] = useState(true);
  const [value, setValue] = useState();
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);
  const [HorizontalDesign, setHorizontalDesign] = useState(false);
  const [MultiselectActive, setMultiselectActive] = useState(false);
  const [MultiSelectLimit, setMultiSelectLimit] = useState(0);
  const [fixedOptions, setFixedOptions] = useState([]);
  useEffect(() => {
    if (Object.keys(initialData).length !== 0) {
      setTitle(initialData.title || "");
      setHelpText(initialData.helpText || "");
      setComplusory(initialData.complusory ?? true);
      setOptions(Array.isArray(initialData.options) ? initialData.options : []);
      setAllowCustomOption(initialData.allowCustomOption || false);
      setSurveyNumberVisible(initialData?.SurveyNumberVisible)
      setHorizontalDesign(initialData?.HorizontalDesign)
      setMultiselectActive(initialData?.MultiselectActive)
      setMultiSelectLimit(initialData?.MultiSelectLimit)
      setFixedOptions(initialData?.fixedOptions)
    } else {
      setTitle("");
      setHelpText("");
      setComplusory(true);
      setOptions([]);
      setAllowCustomOption(false);
      setHorizontalDesign(false);
      setMultiselectActive(false);
      setSurveyNumberVisible(true)
      setMultiSelectLimit(0)
      setFixedOptions([])
    }
  }, [initialData]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const handleDropdownChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption && !fixedOptions.includes(selectedOption)) {
      setFixedOptions([...fixedOptions, selectedOption]);
    }
  };

  const removeFixedOption = (option) => {
    setFixedOptions(fixedOptions.filter((opt) => opt !== option));
  };
  const addOption = () => setOptions([...options, ""]);

  const removeOption = (index) => setOptions(options.filter((_, i) => i !== index));

  const handleSave = () => {
    onSave({ title, helpText, count, options, allowCustomOption, complusory, SurveyNumberVisible, HorizontalDesign, MultiselectActive, MultiSelectLimit, fixedOptions });
    setTitle("");
    setHelpText("");
    setOptions([]);
    setFixedOptions([]);
    setAllowCustomOption(false);
    setComplusory(true);
  };

  if (!isOpen) return null;
  const leftPanel = (
    <div className="space-y-4 mb-24">
      <h2 className="text-lg font-bold mb-4">Çoktan Seçmeli Soru Ayarları</h2>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Başlık
        </label>
        <input
          id="title"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sorunun başlığı"
          type="text"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="helpText">
          Yardım Metni
        </label>
        <input
          id="helpText"
          className="w-full border rounded p-2"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
          type="text"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sabit Seçenek Ekle</label>
        <select onChange={handleDropdownChange} className="w-full border rounded p-2">
          <option value="">Seçenek Seçin...</option>
          <option value="Hepsi">Hepsi</option>
          <option value="Hiçbiri">Hiçbiri</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sabit Seçenekler</label>
        <div>
          {fixedOptions.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <span className="flex-1">{opt}</span>
              <button
                type="button"
                onClick={() => removeFixedOption(opt)}
                className="text-red-500 hover:text-red-700"
                title="Sabit Seçeneği Sil"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Seçenekler</label>
        {options.map((opt, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              className="flex-1 border rounded p-2"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              placeholder={`Seçenek ${idx + 1}`}
              type="text"
            />
            <button
              type="button"
              onClick={() => removeOption(idx)}
              className="text-red-500 hover:text-red-700"
              title="Seçeneği Sil"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="mt-2 text-blue-600 hover:underline"
          onClick={addOption}
        >
          + Seçenek Ekle
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <label
          className="text-sm font-medium text-primary-dark select-none cursor-pointer"
          onClick={() => setHorizontalDesign(prev => !prev)}
        >
          Yatay Sırala
        </label>
        <button
          type="button"
          aria-pressed={HorizontalDesign}
          onClick={() => setHorizontalDesign(prev => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${HorizontalDesign ? 'bg-primary' : 'bg-neutral-light'
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${HorizontalDesign ? 'translate-x-6' : 'translate-x-0'
              }`}
          />
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <label
          className="text-sm font-medium text-primary-dark select-none cursor-pointer"
          onClick={() => setAllowCustomOption(prev => !prev)}
        >
          Cevaplayan kişi seçenek ekleyebilsin
        </label>
        <button
          type="button"
          aria-pressed={complusory}
          onClick={() => setAllowCustomOption(prev => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${allowCustomOption ? 'bg-primary' : 'bg-neutral-light'
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${allowCustomOption ? 'translate-x-6' : 'translate-x-0'
              }`}
          />
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
      <div className="flex items-center space-x-3">
        <label
          className="text-sm font-medium text-primary-dark select-none cursor-pointer"
          onClick={() => setMultiselectActive(prev => !prev)}
        >
          Çoklu Seçim
        </label>
        <button
          type="button"
          aria-pressed={MultiselectActive}
          onClick={() => setMultiselectActive(prev => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${MultiselectActive ? 'bg-primary' : 'bg-neutral-light'
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${MultiselectActive ? 'translate-x-6' : 'translate-x-0'
              }`}
          />
        </button>
      </div>
      {
        MultiselectActive ? (<div>
          <label className="block text-sm font-medium mb-1 text-primary-dark">
            Çoklu Seçim Sınırı
          </label>
          <InputNumber
            min={0}
            max={options.length}
            value={MultiSelectLimit}
            onChange={(val) => setMultiSelectLimit(val || 0)}
            style={{ width: 120 }}
          />
          <p className="text-xs text-gray-500">0 ' ise sınırsız seçim</p>
        </div>) : (<></>)
      }
      <div className="flex gap-2 p-5 absolute left-0 bottom-0 bg-neutral md:w-1/2 w-full ">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={onClose}
        >
          Vazgeç
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
  const rightPanel = (
    <MultipleChoice
      title={title}
      helpText={helpText}
      options={options}
      fixedOptions={fixedOptions}
      allowCustomOption={allowCustomOption}
      id={null}
      onChange={(value) => { setValue(value) }}
      value={value}
      count={count}
      SurveyNumberVisible={SurveyNumberVisible}
      HorizontalDesign={HorizontalDesign}
      MultiselectActive={MultiselectActive}
      MultiSelectLimit={MultiSelectLimit}
    />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default MultipleChoiceSettingsModal;
