import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import ModalLayout from "../components/layouts/ModalLayout";
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import ImageChoice from "../components/ImageChoice";

function ImageChoiceSettingsModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  count,
}) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [images, setImages] = useState([]);
  const [complusory, setComplusory] = useState(true);
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);
  const [Design, setHorizontalDesign] = useState(false);
  const [MultiselectActive, setMultiselectActive] = useState(false);
  const [MultiSelectLimit, setMultiSelectLimit] = useState(0);
  const [imageTitles, setImageTitles] = useState([]);

  useEffect(() => {
    if (Object.keys(initialData).length !== 0) {
      setTitle(initialData.title || "");
      setHelpText(initialData.helpText || "");
      setComplusory(initialData.complusory ?? true);
      setImages(Array.isArray(initialData.images) ? initialData.images : []);
      setSurveyNumberVisible(initialData?.SurveyNumberVisible);
      setHorizontalDesign(initialData?.Design);
      setMultiselectActive(initialData?.MultiselectActive);
      setMultiSelectLimit(initialData?.MultiSelectLimit);
      setImageTitles(initialData?.imageTitles || []);
    } else {
      setTitle("");
      setHelpText("");
      setComplusory(true);
      setImages([]);
      setSurveyNumberVisible(true);
      setHorizontalDesign(false);
      setMultiselectActive(false);
      setMultiSelectLimit(0);
      setImageTitles([]);
    }
  }, [initialData]);

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleTitleChange = (index, title) => {
    const newTitles = [...imageTitles];
    newTitles[index] = title;
    setImageTitles(newTitles);
  };

  const handleSave = () => {
    console.log("geldi")
    onSave({
      title,
      helpText,
      images,
      imageTitles,
      complusory,
      SurveyNumberVisible,
      Design,
      MultiselectActive,
      MultiSelectLimit,
    });
    setHelpText("");
    setImages([]);
    setImageTitles([]);
    setTitle("");
    setSurveyNumberVisible(false)
  };

  const addImage = () => {
    setImages([...images, ""]);
    setImageTitles([...imageTitles, ""]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newTitles = imageTitles.filter((_, i) => i !== index);
    setImages(newImages);
    setImageTitles(newTitles);
  };
  if (!isOpen) return null;
  const leftPanel = (
    <div className="space-y-4 mb-24">
      <h2 className="text-lg font-bold mb-4">Görsel Seçim Ayarları</h2>

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
        <label className="block text-sm font-medium mb-1">Görseller</label>
        {images.map((img, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              className="flex-1 border rounded p-2"
              value={img}
              onChange={(e) => handleImageChange(idx, e.target.value)}
              placeholder={`Görsel ${idx + 1} URL'si`}
              type="text"
            />
            <input
              className="flex-1 border rounded p-2"
              value={imageTitles[idx]}
              onChange={(e) => handleTitleChange(idx, e.target.value)}
              placeholder={`Görsel ${idx + 1} Başlık`}
              type="text"
            />
            <button
              onClick={() => removeImage(idx)}
              className="text-red-500 hover:text-red-700"
              title="Görseli Sil"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="mt-2 text-blue-600 hover:underline"
          onClick={addImage}
        >
          + Görsel Ekle
        </button>
      </div>

      <div className="flex items-center space-x-3">
        <label
          className="text-sm font-medium text-primary-dark select-none cursor-pointer"
          onClick={() => setHorizontalDesign((prev) => !prev)}
        >
          Görselleri büyüt
        </label>
        <button
          type="button"
          aria-pressed={Design}
          onClick={() => setHorizontalDesign((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${Design ? "bg-primary" : "bg-neutral-light"
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${Design ? "translate-x-6" : "translate-x-0"
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
          onClick={() => setMultiselectActive((prev) => !prev)}
        >
          Çoklu Seçim
        </label>
        <button
          type="button"
          aria-pressed={MultiselectActive}
          onClick={() => setMultiselectActive((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${MultiselectActive ? "bg-primary" : "bg-neutral-light"
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${MultiselectActive ? "translate-x-6" : "translate-x-0"
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
      {MultiselectActive && (
        <div>
          <label className="block text-sm font-medium mb-1 text-primary-dark">
            Çoklu Seçim Sınırı
          </label>
          <InputNumber
            min={0}
            max={images.length}
            value={MultiSelectLimit}
            onChange={(val) => setMultiSelectLimit(val || 0)}
            style={{ width: 120 }}
          />
          <p className="text-xs text-gray-500">0 ' ise sınırsız seçim</p>
        </div>
      )}

      <div className="flex gap-2 p-5 absolute left-0 bottom-0 bg-neutral md:w-1/2 w-full">
        <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
          Vazgeç
        </button>
        <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleSave}>
          Kaydet
        </button>
      </div>
    </div>
  );

  const rightPanel = (
    <ImageChoice title={title} helpText={helpText} images={images} id={images} onChange={() => { }} count={count} SurveyNumberVisible={SurveyNumberVisible} Design={Design} MultiSelectLimit={MultiSelectLimit} MultiselectActive={MultiselectActive} imageTitles={imageTitles} />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default ImageChoiceSettingsModal;
