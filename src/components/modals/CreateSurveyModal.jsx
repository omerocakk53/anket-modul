import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";

export default function CreateSurveyModal({ isOpen, onClose, onCreate }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [surveyType, setSurveyType] = useState("Normal");

  if (!isOpen) return null;

  const handleNext = () => {
    if (!title.trim()) {
      toast.error("Anket başlığı boş bırakılamaz.");
      return;
    }
    // description opsiyonel olabilir istersen kontrol ekle
    setCurrentStep(2);
  };

  const handleCreate = () => {
    onCreate({ title, description, surveyType });
    // istersen modalı kapat veya temizle burada
    setCurrentStep(1);
    setTitle("");
    setDescription("");
    setSurveyType("Normal");
  };

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
          Anket Oluştur
        </h3>

        {currentStep === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="space-y-6"
          >
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

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark transition disabled:opacity-50"
                disabled={!title.trim()}
              >
                İleri
              </button>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <p className="text-center text-neutral-800">
              Anketinizi oluşturmak üzeresiniz:
            </p>
            <div className="bg-neutral-100 p-4 rounded-xl space-y-2 border border-neutral-300">
              <p>
                <strong>Anket Başlığı:</strong> <span className="text-primary">{title}</span>
              </p>
              <p>
                <strong>Açıklama:</strong> {description || <em>Yok</em>}
              </p>
              <p>
                <strong>Anket Tipi:</strong> <span className="text-primary">{surveyType === "Normal" ? "Normal" : "Üye Memnuniyet"}</span>
              </p>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setCurrentStep(1)}
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
