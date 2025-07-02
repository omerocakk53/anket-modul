import React, { useEffect, useState } from "react";
import Rating from "../components/Rating.jsx";
import ModalLayout from "../components/layouts/ModalLayout.jsx";
import { FaStar, FaHeart, FaThumbsUp } from 'react-icons/fa'; // Yıldız, Kalp ve Ok simgeleri
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Slider stilini ekle

function RatingSettingsModal({ isOpen, onClose, onSave, initialData, count }) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [complusory, setComplusory] = useState(true);
  const [maxValue, setMaxValue] = useState(5);
  const [value, setValue] = useState(0);
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState('star'); // Başlangıçta yıldız simgesi

  const handleSave = () => {
    onSave({
      title,
      helpText,
      maxValue,
      complusory,
      SurveyNumberVisible,
      selectedIcon, // Simgeyi kaydediyoruz
    });

    // Kaydedildikten sonra formu sıfırla
    setTitle("");
    setHelpText("");
    setMaxValue(5);
    setValue(0);
  };

  useEffect(() => {
    if (Object.keys(initialData).length !== 0) {
      setTitle(initialData?.title || "");
      setHelpText(initialData?.helpText || "");
      setComplusory(initialData?.complusory ?? true);
      setMaxValue(initialData?.maxValue || 5);
      setSurveyNumberVisible(initialData?.SurveyNumberVisible);
      setSelectedIcon(initialData?.selectedIcon || 'star'); // Başlangıç simgesi
    } else {
      setTitle("");
      setHelpText("");
      setComplusory(true);
      setMaxValue(5);
      setSurveyNumberVisible(true);
      setSelectedIcon('star'); // Varsayılan simge
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleIconChange = (icon) => {
    setSelectedIcon(icon); // Simgeyi değiştir
  };

  const leftPanel = (
    <div className="tw-space-y-4">
      <h2 className="tw-text-lg tw-font-bold">Derecelendirme Soru Ayarları</h2>

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
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Puanlama Değeri</label>
        <Slider
          min={1}
          max={10}
          value={maxValue}
          onChange={(val) => setMaxValue(val)} // Slider ile değeri güncelliyoruz
          className="tw-w-full"
          thumbClassName="thumb-class" // Slider başlığına stil eklemek isterseniz
          trackClassName="track-class" // Track'e stil eklemek isterseniz
        />
        <div className="tw-flex tw-justify-between tw-text-sm tw-mt-2">
          <span>1</span>
          <span>{maxValue}</span>
        </div>
      </div>

      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Simge Seçin</label>
        <div className="tw-flex tw-space-x-4 tw-text-primary">
          <button
            onClick={() => handleIconChange('star')}
            className={`p-2 ${selectedIcon === 'star' ? 'text-success' : ''}`}
          >
            <FaStar size={20} />
          </button>
          <button
            onClick={() => handleIconChange('heart')}
            className={`p-2 ${selectedIcon === 'heart' ? 'text-success' : ''}`}
          >
            <FaHeart size={20} />
          </button>
          <button
            onClick={() => handleIconChange('thumb')}
            className={`p-2 ${selectedIcon === 'thumb' ? 'text-success' : ''}`}
          >
            <FaThumbsUp size={20} />
          </button>
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
    <Rating
      title={title}
      helpText={helpText}
      maxValue={maxValue}
      count={count}
      onChange={(value) => { setValue(value) }}
      value={value}
      SurveyNumberVisible={SurveyNumberVisible}
      selectedIcon={selectedIcon} // Simgeyi rating bileşenine ilet
    />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default RatingSettingsModal;
