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
    <div className="tw-space-y-4 tw-mb-24">
      <h2 className="tw-text-lg tw-font-bold tw-mb-4">Görsel Seçim Ayarları</h2>

      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1" htmlFor="title">
          Başlık
        </label>
        <input
          id="title"
          className="tw-w-full tw-border tw-rounded tw-p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sorunun başlığı"
          type="text"
        />
      </div>

      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1" htmlFor="helpText">
          Yardım Metni
        </label>
        <input
          id="helpText"
          className="tw-w-full tw-border tw-rounded tw-p-2"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
          type="text"
        />
      </div>

      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Görseller</label>
        {images.map((img, idx) => (
          <div key={idx} className="tw-flex tw-items-center tw-gap-2 tw-mb-2">
            <input
              className="tw-flex-1 tw-border tw-rounded tw-p-2"
              value={img}
              onChange={(e) => handleImageChange(idx, e.target.value)}
              placeholder={`Görsel ${idx + 1} URL'si`}
              type="text"
            />
            <input
              className="tw-flex-1 tw-border tw-rounded tw-p-2"
              value={imageTitles[idx]}
              onChange={(e) => handleTitleChange(idx, e.target.value)}
              placeholder={`Görsel ${idx + 1} Başlık`}
              type="text"
            />
            <button
              onClick={() => removeImage(idx)}
              className="tw-text-red-500 tw-hover:text-red-700"
              title="Görseli Sil"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          className="tw-mt-2 tw-text-blue-600 tw-hover:underline"
          onClick={addImage}
        >
          + Görsel Ekle
        </button>
      </div>

      <div className="tw-flex tw-items-center tw-space-x-3">
        <label
          className="tw-text-sm tw-font-medium tw-text-primary-dark tw-select-none tw-cursor-pointer"
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
      <div className="tw-flex tw-items-center tw-space-x-3">
        <label
          className="tw-text-sm tw-font-medium tw-text-primary-dark tw-select-none tw-cursor-pointer"
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
      {MultiselectActive && (
        <div>
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-1 tw-text-primary-dark">
            Çoklu Seçim Sınırı
          </label>
          <InputNumber
            min={0}
            max={images.length}
            value={MultiSelectLimit}
            onChange={(val) => setMultiSelectLimit(val || 0)}
            style={{ width: 120 }}
          />
          <p className="tw-text-xs tw-text-gray-500">0 ' ise sınırsız seçim</p>
        </div>
      )}

      <div className="tw-flex tw-gap-2 tw-p-5 tw-absolute tw-left-0 tw-bottom-0 tw-bg-neutral tw-md:w-1/2 tw-w-full">
        <button type="button" className="tw-px-4 tw-py-2 tw-bg-gray-300 tw-rounded" onClick={onClose}>
          Vazgeç
        </button>
        <button type="button" className="tw-px-4 tw-py-2 tw-bg-blue-600 tw-text-white tw-rounded tw-hover:bg-blue-700" onClick={handleSave}>
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
