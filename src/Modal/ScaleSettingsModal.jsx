import React, { useEffect, useState } from "react";
import Scale from "../components/Items/Scale";
import ModalLayout from "../components/layouts/ModalLayout";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Slider stilini ekle

function ScaleSettingsModal({ isOpen, onClose, onSave, initialData, count }) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [complusory, setComplusory] = useState(true);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(5);
  const [value, setValue] = useState();
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);

  const handleSave = () => {
    onSave({
      title,
      helpText,
      data: {
        min,
        max,
      },
      complusory,
      SurveyNumberVisible,
    });

    setTitle("");
    setHelpText("");
    setMin(1);
    setMax(5);
  };

  useEffect(() => {
    if (Object.keys(initialData).length !== 0) {
      setTitle(initialData?.title || "");
      setHelpText(initialData?.helpText || "");
      setComplusory(initialData?.complusory ?? true);
      setMin(initialData?.data?.min || 1);
      setMax(initialData?.data?.max || 5);
      setSurveyNumberVisible(initialData?.SurveyNumberVisible);
    } else {
      setTitle("");
      setHelpText("");
      setComplusory(true);
      setMin(1);
      setMax(5);
      setSurveyNumberVisible(true);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const leftPanel = (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Skala Soru Ayarları</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Başlık</label>
        <input
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sorunuzu yazın..."
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
        <label className="block text-sm font-medium mb-1">Min Değer</label>
        <Slider
          min={1}
          max={10}
          value={min}
          onChange={(val) => setMin(val)} // Slider ile min değeri ayarlıyoruz
          className="w-full"
        />
        <div className="flex justify-between text-sm mt-2">
          <span>1</span>
          <span>{min}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Max Değer</label>
        <Slider
          min={1}
          max={10}
          value={max}
          onChange={(val) => setMax(val)} // Slider ile max değeri ayarlıyoruz
          className="w-full"
        />
        <div className="flex justify-between text-sm mt-2">
          <span>1</span>
          <span>{max}</span>
        </div>
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
    <Scale
      title={title}
      helpText={helpText}
      data={{ min, max }}
      count={count}
      onChange={(value) => {
        setValue(value);
      }}
      value={value}
      SurveyNumberVisible={SurveyNumberVisible}
    />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default ScaleSettingsModal;
