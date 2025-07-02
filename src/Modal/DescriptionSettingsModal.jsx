import React, { useState, useEffect } from "react";
import Description from "../components/Description";
import ModalLayout from "../components/layouts/ModalLayout";

function DescriptionSettingsModal({ isOpen, onClose, onSave, onChange, initialData, count }) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("create"); // "create" | "design"
  useEffect(() => {
    onChange?.({ title, helpText });
  }, [title, helpText]);

  useEffect(() => {
    if (Object.keys(initialData).length !== 0) {
      setTitle(initialData?.title);
      setHelpText(initialData?.helpText)
      setSurveyNumberVisible(initialData?.SurveyNumberVisible)
    } else {
      setHelpText("");
      setTitle("");
      setSurveyNumberVisible(true)
    }
  }, [initialData])

  if (!isOpen) return null;
  const leftPanel = (
    <div className="tw-space-y-4">
      <h2 className="tw-text-lg tw-font-bold">Soru Ayarları</h2>
      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Başlık</label>
        <input className="tw-w-full tw-border tw-rounded tw-p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Yardım Metni</label>
        <input className="tw-w-full tw-border tw-rounded tw-p-2" value={helpText} onChange={(e) => setHelpText(e.target.value)} />
      </div>
      <div className="tw-flex tw-items-center tw-space-x-3 tw-mt-2">
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
        <button className="tw-px-4 tw-py-2 tw-bg-gray-300 tw-rounded" onClick={onClose}>Vazgeç</button>
        <button className="tw-px-4 tw-py-2 tw-bg-blue-500 tw-text-white tw-rounded" onClick={() => { onSave({ title, helpText, SurveyNumberVisible }), setTitle(""), setHelpText("") }}>Kaydet</button>
      </div>
    </div>
  );

  const rightPanel = (
    <Description
      title={title}
      helpText={helpText}
      count={count}
      SurveyNumberVisible={SurveyNumberVisible}
    />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default DescriptionSettingsModal;