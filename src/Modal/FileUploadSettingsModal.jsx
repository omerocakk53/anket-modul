import React, { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import ModalLayout from "../components/layouts/ModalLayout";

function FileUploadSettingsModal({ isOpen, onClose, onSave, initialData, count }) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [complusory, setComplusory] = useState(true);
  const [value, setValue] = useState();
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);
  const handleSave = () => {
    onSave({
      title,
      helpText, complusory, SurveyNumberVisible
    });
    setHelpText("")
    setTitle("")
  };
  useEffect(() => {
    if (Object.keys(initialData).length != 0) {
      setHelpText(initialData?.helpText);
      setTitle(initialData?.title);
      setComplusory(initialData?.complusory);
      setSurveyNumberVisible(initialData?.SurveyNumberVisible)
    } else {
      setHelpText("");
      setTitle("");
      setComplusory(true); setSurveyNumberVisible(true)
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
        <button className="tw-px-4 tw-py-2 tw-bg-gray-300 tw-rounded" onClick={onClose}>Vazgeç</button>
        <button className="tw-px-4 tw-py-2 tw-bg-blue-500 tw-text-white tw-rounded" onClick={handleSave}>Kaydet</button>
      </div>
    </div>
  );
  const rightPanel = (
    <FileUpload title={title} helpText={helpText} onChange={(value) => { setValue(value) }} value={value} count={count} SurveyNumberVisible={SurveyNumberVisible} />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default FileUploadSettingsModal;