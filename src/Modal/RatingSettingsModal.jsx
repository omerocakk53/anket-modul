import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
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
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Derecelendirme Soru Ayarları</h2>

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
        <label className="block text-sm font-medium mb-1">Yardım Metni</label>
        <input
          className="w-full border rounded p-2"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Puanlama Değeri</label>
        <Slider
          min={1}
          max={10}
          value={maxValue}
          onChange={(val) => setMaxValue(val)} // Slider ile değeri güncelliyoruz
          className="w-full"
          thumbClassName="thumb-class" // Slider başlığına stil eklemek isterseniz
          trackClassName="track-class" // Track'e stil eklemek isterseniz
        />
        <div className="flex justify-between text-sm mt-2">
          <span>1</span>
          <span>{maxValue}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Simge Seçin</label>
        <div className="flex space-x-4 text-primary">
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

      <div className="flex gap-2 p-5 absolute left-0 bottom-0 bg-neutral md:w-1/2 w-full ">
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
