// src/components/QuestionSettingsModal.jsx
import { React, useState, useEffect } from "react";
import ShortText from "../components/Items/ShortText";
import ModalLayout from "../components/layouts/ModalLayout";
import InputNumber from "rc-input-number";
import "rc-input-number/assets/index.css";
function ShortTextModal({
  isOpen,
  onClose,
  onSave,
  onChange,
  initialData,
  count,
}) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [complusory, setComplusory] = useState(true);
  const [value, setValue] = useState();
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);
  const [inputType, setInputType] = useState("text");
  const [charLimit, setCharLimit] = useState(0);
  // Her değişiklikte onChange fonksiyonunu tetikle
  useEffect(() => {
    onChange?.({ title, helpText, inputType, charLimit });
  }, [title, helpText, inputType, charLimit]);

  useEffect(() => {
    if (Object.keys(initialData).length != 0) {
      setTitle(initialData?.title);
      setHelpText(initialData?.helpText);
      setComplusory(initialData?.complusory);
      setSurveyNumberVisible(initialData?.SurveyNumberVisible);
      setInputType(initialData?.inputType || "text");
      setCharLimit(initialData?.charLimit);
    } else {
      setTitle("");
      setHelpText("");
      setComplusory(true);
      setSurveyNumberVisible(true);
      setInputType("text");
      setCharLimit(0);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const leftPanel = (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Soru Ayarları</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Başlık</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Yardım Metni (isteğe bağlı)
        </label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Giriş Türü</label>
        <select
          className="w-full border rounded p-2"
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="text">Serbest Metin</option>
          <option value="tel">Telefon Numarası</option>
          <option value="date">Tarih</option>
          <option value="tc">TC Kimlik No</option>
          <option value="zip">Posta Kodu</option>
        </select>
      </div>
      {inputType === "text" && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Karakter Sınırı (0 = Sınırsız)
          </label>
          <InputNumber
            min={0}
            max={1000}
            value={charLimit}
            onChange={setCharLimit}
            className="w-full border rounded p-2"
          />
        </div>
      )}
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
      <div className="flex gap-2 p-5 absolute left-0 bottom-0 bg-neutral md:w-1/2 w-full ">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
          Vazgeç
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            onSave({
              title,
              helpText,
              complusory,
              SurveyNumberVisible,
              inputType,
              charLimit,
            });
            setTitle("");
            setHelpText("");
          }}
        >
          Kaydet
        </button>
      </div>
    </div>
  );

  const rightPanel = (
    <ShortText
      title={title}
      helpText={helpText}
      onChange={(value) => {
        setValue(value);
      }}
      value={value}
      count={count}
      SurveyNumberVisible={SurveyNumberVisible}
      inputType={inputType}
      charLimit={charLimit}
    />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default ShortTextModal;
