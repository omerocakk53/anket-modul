import React, { useEffect, useState } from "react";
import Scale from "../components/Scale";
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
      SurveyNumberVisible
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
      setSurveyNumberVisible(initialData?.SurveyNumberVisible)
    } else {
      setTitle("");
      setHelpText("");
      setComplusory(true);
      setMin(1);
      setMax(5);
      setSurveyNumberVisible(true)
    }
  }, [initialData]);

  if (!isOpen) return null;

  const leftPanel = (
    <div className="tw-space-y-4">
      <h2 className="tw-text-lg tw-font-bold">Skala Soru Ayarları</h2>

      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Başlık</label>
        <input
          className="tw-w-full tw-border tw-rounded tw-p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sorunuzu yazın..."
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
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Min Değer</label>
        <Slider
          min={1}
          max={10}
          value={min}
          onChange={(val) => setMin(val)} // Slider ile min değeri ayarlıyoruz
          className="tw-w-full"
        />
        <div className="tw-flex tw-justify-between tw-text-sm tw-mt-2">
          <span>1</span>
          <span>{min}</span>
        </div>
      </div>

      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Max Değer</label>
        <Slider
          min={1}
          max={10}
          value={max}
          onChange={(val) => setMax(val)} // Slider ile max değeri ayarlıyoruz
          className="tw-w-full"
        />
        <div className="tw-flex tw-justify-between tw-text-sm tw-mt-2">
          <span>1</span>
          <span>{max}</span>
        </div>
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
    <Scale
      title={title}
      helpText={helpText}
      data={{ min, max }}
      count={count}
      onChange={(value) => { setValue(value) }}
      value={value}
      SurveyNumberVisible={SurveyNumberVisible}
    />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default ScaleSettingsModal;
