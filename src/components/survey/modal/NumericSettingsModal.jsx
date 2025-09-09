import React, { useEffect, useState } from "react";
import Numeric from "../Items/Numeric";
import ModalLayout from "../../../layouts/ModalLayout";
import InputNumber from "rc-input-number";
import "rc-input-number/assets/index.css";
function NumericSettingsModal({ isOpen, onClose, onSave, initialData, count }) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [complusory, setComplusory] = useState(true);
  const [value, setValue] = useState();
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);

  // Yeni özellikler
  const [allowDecimal, setAllowDecimal] = useState(false);
  const [charLimit, setCharLimit] = useState(0);
  const [thousandSeparator, setThousandSeparator] = useState(false); // boolean

  const handleSave = () => {
    onSave({
      title,
      helpText,
      complusory,
      SurveyNumberVisible,
      allowDecimal,
      charLimit,
      thousandSeparator,
    });
    setTitle("");
    setHelpText("");
    setComplusory(true);
    setAllowDecimal(false);
    setCharLimit(0);
    setThousandSeparator(false);
  };

  useEffect(() => {
    if (initialData && Object.keys(initialData).length !== 0) {
      setTitle(initialData.title || "");
      setHelpText(initialData.helpText || "");
      setComplusory(initialData.complusory ?? true);
      setSurveyNumberVisible(initialData?.SurveyNumberVisible ?? true);
      setAllowDecimal(initialData.allowDecimal ?? false);
      setCharLimit(initialData.charLimit ?? 0);
      setThousandSeparator(initialData.thousandSeparator);
    } else {
      setTitle("");
      setHelpText("");
      setComplusory(true);
      setSurveyNumberVisible(true);
      setAllowDecimal(false);
      setCharLimit(0);
      setThousandSeparator(false);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const leftPanel = (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Sayısal Girdi Ayarları</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Başlık</label>
        <input
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sorunun başlığı"
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

      {/* Yeni ayarlar */}
      <div className="flex items-center space-x-3">
        <label
          className="text-sm font-medium text-primary-dark select-none cursor-pointer"
          onClick={() => setAllowDecimal((prev) => !prev)}
        >
          Ondalık giriş izinli
        </label>
        <button
          type="button"
          aria-pressed={allowDecimal}
          onClick={() => setAllowDecimal((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
            allowDecimal ? "bg-primary" : "bg-neutral-light"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
              allowDecimal ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <label
          className="text-sm font-medium text-primary-dark select-none cursor-pointer"
          onClick={() => setThousandSeparator((prev) => !prev)}
        >
          Binlik Ayırıcı Nokta (.)
        </label>
        <button
          type="button"
          aria-pressed={thousandSeparator}
          onClick={() => setThousandSeparator((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${thousandSeparator ? "bg-primary" : "bg-neutral-light"}`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${thousandSeparator ? "translate-x-6" : "translate-x-0"}`}
          />
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Karakter Sınırı (0 = Sınırsız)
        </label>
        <InputNumber
          min={0}
          max={10000}
          value={charLimit}
          onChange={(value) => setCharLimit(value || 0)}
          className="w-full border rounded p-2"
        />
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
    <Numeric
      title={title}
      helpText={helpText}
      id="preview-numeric"
      onChange={(value) => {
        setValue(value);
      }}
      value={value}
      count={count}
      SurveyNumberVisible={SurveyNumberVisible}
      allowDecimal={allowDecimal}
      charLimit={charLimit}
      thousandSeparator={thousandSeparator}
    />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default NumericSettingsModal;
