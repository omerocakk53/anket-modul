import React, { useEffect, useState } from "react";
import Link from "../components/Link";
import ModalLayout from "../components/layouts/ModalLayout";

function LinkSettingsModal({ isOpen, onClose, onSave, initialData, count }) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [url, setUrl] = useState("");
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);

  const handleSave = () => {
    onSave({
      title,
      helpText,
      url,
      SurveyNumberVisible
    });
    setHelpText("")
    setTitle("")
    setUrl("")
  };

  useEffect(() => {
    if (Object.keys(initialData).length != 0) {
      setTitle(initialData?.title);
      setHelpText(initialData?.helpText)
      setUrl(initialData?.url)
      setSurveyNumberVisible(initialData?.SurveyNumberVisible)
    } else {
      setTitle("");
      setHelpText("")
      setUrl(""); setSurveyNumberVisible(true)
    }
  }, [initialData])

  if (!isOpen) return null;
  const leftPanel = (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Soru Ayarları</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Başlık</label>
        <input className="w-full border rounded p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Yardım Metni</label>
        <input className="w-full border rounded p-2" value={helpText} onChange={(e) => setHelpText(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bağlantı URL</label>
        <input
          className="w-full border rounded p-2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />
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
      <div className="flex gap-2 p-5 absolute left-0 bottom-0 bg-neutral md:w-1/2 w-full ">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Vazgeç</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>Kaydet</button>
      </div>
    </div>
  );
  const rightPanel = (
    <Link title={title} helpText={helpText} url={url} count={count} SurveyNumberVisible={SurveyNumberVisible} />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;

}

export default LinkSettingsModal;