import React, { useEffect, useState } from "react";
import Numeric from "../components/Numeric"; // Preview için doğrudan Numeric bileşeni kullanıyoruz
import ModalLayout from "../components/layouts/ModalLayout";
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
    onSave({ title, helpText, complusory, SurveyNumberVisible, allowDecimal, charLimit, thousandSeparator });
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
    <div className="tw-space-y-4">
      <h2 className="tw-text-lg tw-font-bold">Sayısal Girdi Ayarları</h2>

      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Başlık</label>
        <input
          className="tw-w-full tw-border tw-rounded tw-p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sorunun başlığı"
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

      <div className="tw-flex tw-items-center tw-space-x-3">
        <label
          className="tw-text-sm tw-font-medium tw-text-primary-dark tw-select-none tw-cursor-pointer"
          onClick={() => setComplusory((prev) => !prev)}
        >
          Zorunlu alan
        </label>
        <button
          type="button"
          aria-pressed={complusory}
          onClick={() => setComplusory((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${complusory ? "bg-primary" : "bg-neutral-light"
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${complusory ? "translate-x-6" : "translate-x-0"
              }`}
          />
        </button>
      </div>

      <div className="tw-flex tw-items-center tw-space-x-3">
        <label
          className="tw-text-sm tw-font-medium tw-text-primary-dark tw-select-none tw-cursor-pointer"
          onClick={() => setSurveyNumberVisible((prev) => !prev)}
        >
          Soru Numarası Gözüksün
        </label>
        <button
          type="button"
          aria-pressed={SurveyNumberVisible}
          onClick={() => setSurveyNumberVisible((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${SurveyNumberVisible ? "bg-primary" : "bg-neutral-light"
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${SurveyNumberVisible ? "translate-x-6" : "translate-x-0"
              }`}
          />
        </button>
      </div>

      {/* Yeni ayarlar */}
      <div className="tw-flex tw-items-center tw-space-x-3">
        <label
          className="tw-text-sm tw-font-medium tw-text-primary-dark tw-select-none tw-cursor-pointer"
          onClick={() => setAllowDecimal((prev) => !prev)}
        >
          Ondalık giriş izinli
        </label>
        <button
          type="button"
          aria-pressed={allowDecimal}
          onClick={() => setAllowDecimal((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${allowDecimal ? "bg-primary" : "bg-neutral-light"
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${allowDecimal ? "translate-x-6" : "translate-x-0"
              }`}
          />
        </button>
      </div>
      <div className="tw-flex tw-items-center tw-space-x-3">
        <label
          className="tw-text-sm tw-font-medium tw-text-primary-dark tw-select-none tw-cursor-pointer"
          onClick={() => setThousandSeparator(prev => !prev)}
        >
          Binlik Ayırıcı Nokta (.)
        </label>
        <button
          type="button"
          aria-pressed={thousandSeparator}
          onClick={() => setThousandSeparator(prev => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${thousandSeparator ? 'bg-primary' : 'bg-neutral-light'}`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${thousandSeparator ? 'translate-x-6' : 'translate-x-0'}`}
          />
        </button>
      </div>
      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
          Karakter Sınırı (0 = Sınırsız)
        </label>
        <InputNumber
          min={0}
          max={10000}
          value={charLimit}
          onChange={(value) => setCharLimit(value || 0)}
          className="tw-w-full tw-border tw-rounded tw-p-2"
        />
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
