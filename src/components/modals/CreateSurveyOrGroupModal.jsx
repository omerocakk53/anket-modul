import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";

export default function CreateSurveyOrGroupModal({
  isOpen,
  onClose,
  onCreate,
  mode,
  selectedGroup,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [newGroupName, setNewGroupName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [surveyType, setSurveyType] = useState("Normal");

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setNewGroupName("");
      setTitle("");
      setDescription("");
      setSurveyType("Normal");
    }
  }, [isOpen]);

  const handleNext = () => {
    if (mode === "group" && currentStep === 1 && !newGroupName.trim()) {
      toast.error("Klasör adı boş bırakılamaz.");
      return;
    }
    if ((mode === "group" && currentStep === 2) || (mode === "survey" && currentStep === 1)) {
      if (!title.trim()) {
        toast.error("Anket başlığı boş bırakılamaz.");
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleCreate = () => {
    const data = {
      title: title.trim(),
      description: description.trim(),
      surveyType: surveyType,
    };

    if (mode === "group") {
      data.newGroupName = newGroupName.trim();
    } else {
      data.group = selectedGroup;
    }

    onCreate(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-8 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-700 hover:text-red-600 transition"
        >
          <IoMdClose size={26} />
        </button>

        <h3 className="text-2xl font-semibold text-center text-neutral-800 mb-6">
          {mode === "group" ? "Yeni Klasör ve Anket Oluştur" : "Anket Oluştur"}
        </h3>

        {/* Step 1: Grup adı */}
        {mode === "group" && currentStep === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Yeni Klasör Adı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full border border-neutral-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition"
                placeholder="Yeni klasörünüz için bir isim girin"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark transition"
                disabled={!newGroupName.trim()}
              >
                İleri
              </button>
            </div>
          </form>
        )}

        {/* Step 1 (survey) veya Step 2 (group): Anket bilgileri */}
        {(mode === "survey" && currentStep === 1) || (mode === "group" && currentStep === 2) ? (
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Anket Başlığı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-neutral-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition"
                placeholder="Anket başlığı girin"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Açıklama (İsteğe Bağlı)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-neutral-300 rounded-xl px-4 py-2 h-24 resize-y focus:ring-2 focus:ring-primary focus:outline-none transition"
                placeholder="Anketin amacı hakkında bilgi verin"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Anket Tipi
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="surveyType"
                    value="Normal"
                    checked={surveyType === "Normal"}
                    onChange={() => setSurveyType("Normal")}
                    className="cursor-pointer"
                  />
                  Normal Anket
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="surveyType"
                    value="MemberSatisfaction"
                    checked={surveyType === "MemberSatisfaction"}
                    onChange={() => setSurveyType("MemberSatisfaction")}
                    className="cursor-pointer"
                  />
                  Üye Memnuniyet Anketi
                </label>
              </div>
            </div>

            <div className="flex justify-between">
              {mode === "group" && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="border border-secondary text-secondary px-6 py-2 rounded-xl hover:bg-secondary/10 transition"
                >
                  Geri
                </button>
              )}
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark transition disabled:opacity-50"
                disabled={!title.trim()}
              >
                İleri
              </button>
            </div>
          </form>
        ) : null}

        {/* Onay ekranı */}
        {((mode === "group" && currentStep === 3) || (mode === "survey" && currentStep === 2)) && (
          <div className="space-y-6">
            <p className="text-center text-neutral-800">
              {mode === "group"
                ? "Yeni klasör ve ilk anketinizi oluşturmak üzeresiniz:"
                : "Anketinizi oluşturmak üzeresiniz:"}
            </p>
            <div className="bg-neutral-100 p-4 rounded-xl space-y-2 border border-neutral-300">
              {mode === "group" && (
                <p>
                  <strong>Klasör Adı:</strong>{" "}
                  <span className="text-primary">{newGroupName}</span>
                </p>
              )}
              <p>
                <strong>Anket Başlığı:</strong>{" "}
                <span className="text-primary">{title}</span>
              </p>
              <p>
                <strong>Açıklama:</strong>{" "}
                {description || <span className="italic text-neutral-500">Yok</span>}
              </p>
              <p>
                <strong>Anket Tipi:</strong>{" "}
                <span className="text-primary">
                  {surveyType === "Normal" ? "Normal" : "Üye Memnuniyet"}
                </span>
              </p>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setCurrentStep((prev) => (mode === "group" ? 2 : 1))}
                className="border border-secondary text-secondary px-6 py-2 rounded-xl hover:bg-secondary/10 transition"
              >
                Geri
              </button>
              <button
                onClick={handleCreate}
                className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark transition"
              >
                Oluştur
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
