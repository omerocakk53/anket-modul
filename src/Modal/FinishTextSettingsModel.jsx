import { React, useState, useEffect, useRef } from "react";
import FinishText from "../components/Items/FinishText";
import ModalLayout from "../components/layouts/ModalLayout";

function WelcomeTextSettingsModel({
  isOpen,
  onClose,
  onSave,
  onChange,
  initialData,
}) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  useEffect(() => {
    onChange?.({ title, helpText });
  }, [title, helpText]);

  useEffect(() => {
    setTitle(initialData?.title || "");
    setHelpText(initialData?.helpText || "");
  }, [initialData]);

  if (!isOpen) return null;
  const leftPanel = (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Bitiş Sayfası Metni Ayarları</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Mesajınız</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ankete hoş geldiniz!"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Alt Mesaj (isteğe bağlı)
        </label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />
      </div>

      <div className="flex gap-2 p-5 absolute left-0 bottom-0 bg-neutral md:w-1/2 w-full ">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
          Vazgeç
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            onSave({ title, helpText });
            setTitle("");
            setHelpText("");
          }}
        >
          Kaydet
        </button>
      </div>
    </div>
  );

  const rightPanel = <FinishText title={title} helpText={helpText} />;

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default WelcomeTextSettingsModel;
